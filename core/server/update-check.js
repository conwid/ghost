<<<<<<< HEAD
// # Update Checking Service
//
// Makes a request to Ghost.org to check if there is a new version of Ghost available.
// The service is provided in return for users opting in to anonymous usage data collection.
//
// Blog owners can opt-out of update checks by setting `privacy: { useUpdateCheck: false }` in their config.js
//
// The data collected is as follows:
//
// - blog id - a hash of the blog hostname, pathname and db_hash. No identifiable info is stored.
// - ghost version
// - node version
// - npm version
// - env - production or development
// - database type - SQLite, MySQL
// - email transport - mail.options.service, or otherwise mail.transport
// - created date - database creation date
// - post count - total number of posts
// - user count - total number of users
// - theme - name of the currently active theme
// - apps - names of any active apps
=======
/**
 * Update Checking Unit
 *
 * Makes a request to Ghost.org to request release & custom notifications.
 * The service is provided in return for users opting in to anonymous usage data collection.
 *
 * Blog owners can opt-out of update checks by setting `privacy: { useUpdateCheck: false }` in their config file.
 */
>>>>>>> newversion/master

const crypto = require('crypto'),
    exec = require('child_process').exec,
    moment = require('moment'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    url = require('url'),
    debug = require('ghost-ignition').debug('update-check'),
<<<<<<< HEAD
    api = require('./api'),
    config = require('./config'),
    urlService = require('./services/url'),
=======
    api = require('./api').v2,
    config = require('./config'),
    urlUtils = require('./lib/url-utils'),
>>>>>>> newversion/master
    common = require('./lib/common'),
    request = require('./lib/request'),
    ghostVersion = require('./lib/ghost-version'),
    internal = {context: {internal: true}},
    allowedCheckEnvironments = ['development', 'production'];

function nextCheckTimestamp() {
    var now = Math.round(new Date().getTime() / 1000);
    return now + (24 * 3600);
}

<<<<<<< HEAD
=======
/**
 * @description Centralised error handler for the update check unit.
 *
 * CASES:
 *   - the update check service returns an error
 *   - error during collecting blog stats
 *
 * We still need to ensure that we set the "next_update_check" to a new value, otherwise no more
 * update checks will happen.
 *
 * @param err
 */
>>>>>>> newversion/master
function updateCheckError(err) {
    api.settings.edit({
        settings: [{
            key: 'next_update_check',
            value: nextCheckTimestamp()
        }]
    }, internal);

    err.context = common.i18n.t('errors.updateCheck.checkingForUpdatesFailed.error');
<<<<<<< HEAD
    err.help = common.i18n.t('errors.updateCheck.checkingForUpdatesFailed.help', {url: 'https://docs.ghost.org'});
=======
    err.help = common.i18n.t('errors.updateCheck.checkingForUpdatesFailed.help', {url: 'https://ghost.org/docs/'});
>>>>>>> newversion/master
    common.logging.error(err);
}

/**
<<<<<<< HEAD
 * If the custom message is intended for current version, create and store a custom notification.
 * @param {Object} notification
 * @return {*|Promise}
=======
 * @description Create a Ghost notification and call the API controller.
 *
 * @param {Object} notification
 * @return {Promise}
>>>>>>> newversion/master
 */
function createCustomNotification(notification) {
    if (!notification) {
        return Promise.resolve();
    }

    return Promise.each(notification.messages, function (message) {
        let toAdd = {
<<<<<<< HEAD
=======
            // @NOTE: the update check service returns "0" or "1" (https://github.com/TryGhost/UpdateCheck/issues/43)
>>>>>>> newversion/master
            custom: !!notification.custom,
            createdAt: moment(notification.created_at).toDate(),
            status: message.status || 'alert',
            type: message.type || 'info',
            id: message.id,
<<<<<<< HEAD
            dismissible: message.hasOwnProperty('dismissible') ? message.dismissible : true,
=======
            dismissible: Object.prototype.hasOwnProperty.call(message, 'dismissible') ? message.dismissible : true,
>>>>>>> newversion/master
            top: !!message.top,
            message: message.content
        };

        debug('Add Custom Notification', toAdd);
        return api.notifications.add({notifications: [toAdd]}, {context: {internal: true}});
    });
}

<<<<<<< HEAD
=======
/**
 * @description Collect stats from your blog.
 * @returns {Promise}
 */
>>>>>>> newversion/master
function updateCheckData() {
    let data = {},
        mailConfig = config.get('mail');

    data.ghost_version = ghostVersion.original;
    data.node_version = process.versions.node;
    data.env = config.get('env');
    data.database_type = config.get('database').client;
    data.email_transport = mailConfig &&
        (mailConfig.options && mailConfig.options.service ?
            mailConfig.options.service :
            mailConfig.transport);

    return Promise.props({
        hash: api.settings.read(_.extend({key: 'db_hash'}, internal)).reflect(),
        theme: api.settings.read(_.extend({key: 'active_theme'}, internal)).reflect(),
<<<<<<< HEAD
        apps: api.settings.read(_.extend({key: 'active_apps'}, internal))
            .then(function (response) {
                var apps = response.settings[0];

                apps = JSON.parse(apps.value);

                return _.reduce(apps, function (memo, item) {
                    return memo === '' ? memo + item : memo + ', ' + item;
                }, '');
            }).reflect(),
=======
>>>>>>> newversion/master
        posts: api.posts.browse().reflect(),
        users: api.users.browse(internal).reflect(),
        npm: Promise.promisify(exec)('npm -v').reflect()
    }).then(function (descriptors) {
        var hash = descriptors.hash.value().settings[0],
            theme = descriptors.theme.value().settings[0],
<<<<<<< HEAD
            apps = descriptors.apps.value(),
            posts = descriptors.posts.value(),
            users = descriptors.users.value(),
            npm = descriptors.npm.value(),
            blogUrl = url.parse(urlService.utils.urlFor('home', true)),
=======
            posts = descriptors.posts.value(),
            users = descriptors.users.value(),
            npm = descriptors.npm.value(),
            blogUrl = url.parse(urlUtils.urlFor('home', true)),
>>>>>>> newversion/master
            blogId = blogUrl.hostname + blogUrl.pathname.replace(/\//, '') + hash.value;

        data.blog_id = crypto.createHash('md5').update(blogId).digest('hex');
        data.theme = theme ? theme.value : '';
<<<<<<< HEAD
        data.apps = apps || '';
=======
>>>>>>> newversion/master
        data.post_count = posts && posts.meta && posts.meta.pagination ? posts.meta.pagination.total : 0;
        data.user_count = users && users.users && users.users.length ? users.users.length : 0;
        data.blog_created_at = users && users.users && users.users[0] && users.users[0].created_at ? moment(users.users[0].created_at).unix() : '';
        data.npm_version = npm.trim();
<<<<<<< HEAD
        data.lts = false;
=======
>>>>>>> newversion/master

        return data;
    }).catch(updateCheckError);
}

/**
<<<<<<< HEAD
 * With the privacy setting `useUpdateCheck` you can control if you want to expose data from your blog to the
 * Update Check Service. Enabled or disabled, you will receive the latest notification available from the service.
=======
 * @description Perform request to update check service.
 *
 * With the privacy setting `useUpdateCheck` you can control if you want to expose data/stats from your blog to the
 * service. Enabled or disabled, you will receive the latest notification available from the service.
 *
 * @see https://ghost.org/docs/concepts/config/#privacy
 * @returns {Promise}
>>>>>>> newversion/master
 */
function updateCheckRequest() {
    return updateCheckData()
        .then(function then(reqData) {
            let reqObj = {
                    timeout: 1000,
                    headers: {}
                },
                checkEndpoint = config.get('updateCheck:url'),
                checkMethod = config.isPrivacyDisabled('useUpdateCheck') ? 'GET' : 'POST';

<<<<<<< HEAD
=======
            // CASE: Expose stats and do a check-in
>>>>>>> newversion/master
            if (checkMethod === 'POST') {
                reqObj.json = true;
                reqObj.body = reqData;
                reqObj.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(reqData));
                reqObj.headers['Content-Type'] = 'application/json';
            } else {
                reqObj.json = true;
                reqObj.query = {
                    ghost_version: reqData.ghost_version
                };
            }

            debug('Request Update Check Service', checkEndpoint);

            return request(checkEndpoint, reqObj)
                .then(function (response) {
                    return response.body;
                })
                .catch(function (err) {
                    // CASE: no notifications available, ignore
                    if (err.statusCode === 404) {
                        return {
                            next_check: nextCheckTimestamp(),
                            notifications: []
                        };
                    }

<<<<<<< HEAD
=======
                    // CASE: service returns JSON error, deserialize into JS error
>>>>>>> newversion/master
                    if (err.response && err.response.body && typeof err.response.body === 'object') {
                        err = common.errors.utils.deserialize(err.response.body);
                    }

                    throw err;
                });
        });
}

/**
<<<<<<< HEAD
 * Handles the response from the update check
 * Does three things with the information received:
 * 1. Updates the time we can next make a check
 * 2. Create custom notifications is response from UpdateCheck as "messages" array which has the following structure:
 *
 * "messages": [{
 *   "id": ed9dc38c-73e5-4d72-a741-22b11f6e151a,
 *   "version": "0.5.x",
 *   "content": "<p>Hey there! 0.6 is available, visit <a href=\"https://ghost.org/download\">Ghost.org</a> to grab your copy now<!/p>",
 *   "dismissible": true | false,
 *   "top": true | false
 * ]}
 *
 * Example for grouped custom notifications in config:
 *
 * notificationGroups: ['migration', 'something']
 *
 * 'all' is a reserved name for general custom notifications.
=======
 * @description This function handles the response from the update check service.
 *
 * The helper does three things:
 *
 * 1. Updates the time in the settings table to know when we can execute the next update check request.
 * 2. Iterates over the received notifications and filters them out based on your notification groups.
 * 3. Calls a custom helper to generate a Ghost notification for the database.
 *
 * The structure of the response is:
 *
 * {
 *  id: 20,
 *  version: 'all4',
 *  messages:
 *     [{
 *          id: 'f8ff6c80-aa61-11e7-a126-6119te37e2b8',
 *          version: '^2',
 *          content: 'Hallouuuu custom',
 *          top: true,
 *          dismissible: true,
 *          type: 'info'
 *      }],
 *  created_at: '2021-10-06T07:00:00.000Z',
 *  custom: 1,
 *  next_check: 1555608722
 * }
 *
 *
 * Example for grouped custom notifications in config:
 *
 *  "notificationGroups": ["migration", "something"]
 *
 * The group 'all' is a reserved name for general custom notifications, which every self hosted blog can receive.
>>>>>>> newversion/master
 *
 * @param {Object} response
 * @return {Promise}
 */
function updateCheckResponse(response) {
    let notifications = [],
        notificationGroups = (config.get('notificationGroups') || []).concat(['all']);

    debug('Notification Groups', notificationGroups);
    debug('Response Update Check Service', response);

    return api.settings.edit({settings: [{key: 'next_update_check', value: response.next_check}]}, internal)
        .then(function () {
<<<<<<< HEAD
            // CASE: Update Check Service returns multiple notifications.
            if (_.isArray(response)) {
                notifications = response;
            } else if ((response.hasOwnProperty('notifications') && _.isArray(response.notifications))) {
                notifications = response.notifications;
            } else {
=======
            /**
             * @NOTE:
             *
             * When we refactored notifications in Ghost 1.20, the service did not support returning multiple messages.
             * But we wanted to already add the support for future functionality.
             * That's why this helper supports two ways: returning an array of messages or returning an object with
             * a "notifications" key. The second one is probably the best, because we need to support "next_check"
             * on the root level of the response.
             */
            if (_.isArray(response)) {
                notifications = response;
            } else if ((Object.prototype.hasOwnProperty.call(response, 'notifications') && _.isArray(response.notifications))) {
                notifications = response.notifications;
            } else {
                // CASE: default right now
>>>>>>> newversion/master
                notifications = [response];
            }

            // CASE: Hook into received notifications and decide whether you are allowed to receive custom group messages.
            if (notificationGroups.length) {
                notifications = notifications.filter(function (notification) {
<<<<<<< HEAD
=======
                    // CASE: release notification, keep
>>>>>>> newversion/master
                    if (!notification.custom) {
                        return true;
                    }

<<<<<<< HEAD
=======
                    // CASE: filter out messages based on your groups
>>>>>>> newversion/master
                    return _.includes(notificationGroups.map(function (groupIdentifier) {
                        if (notification.version.match(new RegExp(groupIdentifier))) {
                            return true;
                        }

                        return false;
                    }), true) === true;
                });
            }

            return Promise.each(notifications, createCustomNotification);
        });
}

<<<<<<< HEAD
=======
/**
 * @description Entry point to trigger the update check unit.
 *
 * Based on a settings value, we check if `next_update_check` is less than now to decide whether
 * we should request the update check service (http://updates.ghost.org) or not.
 *
 * @returns {Promise}
 */
>>>>>>> newversion/master
function updateCheck() {
    // CASE: The check will not happen if your NODE_ENV is not in the allowed defined environments.
    if (_.indexOf(allowedCheckEnvironments, process.env.NODE_ENV) === -1) {
        return Promise.resolve();
    }

    return api.settings.read(_.extend({key: 'next_update_check'}, internal))
        .then(function then(result) {
<<<<<<< HEAD
            var nextUpdateCheck = result.settings[0];

            // CASE: Next update check should happen now?
=======
            const nextUpdateCheck = result.settings[0];

            // CASE: Next update check should happen now?
            // @NOTE: You can skip this check by adding a config value. This is helpful for developing.
>>>>>>> newversion/master
            if (!config.get('updateCheck:forceUpdate') && nextUpdateCheck && nextUpdateCheck.value && nextUpdateCheck.value > moment().unix()) {
                return Promise.resolve();
            }

            return updateCheckRequest()
                .then(updateCheckResponse)
                .catch(updateCheckError);
        })
        .catch(updateCheckError);
}

module.exports = updateCheck;
