const Promise = require('bluebird'),
    ghostBookshelf = require('./base'),
    common = require('../lib/common');

let Subscriber,
    Subscribers;

Subscriber = ghostBookshelf.Model.extend({
    tableName: 'subscribers',

    emitChange: function emitChange(event, options) {
        const eventToTrigger = 'subscriber' + '.' + event;
        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    defaults: function defaults() {
        return {
            status: 'subscribed'
        };
    },

    onCreated: function onCreated(model, response, options) {
<<<<<<< HEAD
=======
        ghostBookshelf.Model.prototype.onCreated.apply(this, arguments);

>>>>>>> newversion/master
        model.emitChange('added', options);
    },

    onUpdated: function onUpdated(model, response, options) {
<<<<<<< HEAD
=======
        ghostBookshelf.Model.prototype.onUpdated.apply(this, arguments);

>>>>>>> newversion/master
        model.emitChange('edited', options);
    },

    onDestroyed: function onDestroyed(model, options) {
<<<<<<< HEAD
=======
        ghostBookshelf.Model.prototype.onDestroyed.apply(this, arguments);

>>>>>>> newversion/master
        model.emitChange('deleted', options);
    }
}, {

    orderDefaultOptions: function orderDefaultOptions() {
        return {};
    },
<<<<<<< HEAD
    /**
     * @deprecated in favour of filter
     */
    processOptions: function processOptions(options) {
        return options;
    },

    permittedOptions: function permittedOptions(methodName) {
        var options = ghostBookshelf.Model.permittedOptions(),
=======

    permittedOptions: function permittedOptions(methodName) {
        var options = ghostBookshelf.Model.permittedOptions.call(this, methodName),
>>>>>>> newversion/master

            // whitelists for the `options` hash argument on methods, by method name.
            // these are the only options that can be passed to Bookshelf / Knex.
            validOptions = {
<<<<<<< HEAD
                findPage: ['page', 'limit', 'columns', 'filter', 'order'],
=======
>>>>>>> newversion/master
                findAll: ['columns']
            };

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    },

<<<<<<< HEAD
    permissible: function permissible(postModelOrId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission) {
=======
    permissible: function permissible(postModelOrId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission, hasApiKeyPermission) {
>>>>>>> newversion/master
        // CASE: external is only allowed to add and edit subscribers
        if (context.external) {
            if (['add', 'edit'].indexOf(action) !== -1) {
                return Promise.resolve();
            }
        }

<<<<<<< HEAD
        if (hasUserPermission && hasAppPermission) {
=======
        if (hasUserPermission && hasAppPermission && hasApiKeyPermission) {
>>>>>>> newversion/master
            return Promise.resolve();
        }

        return Promise.reject(new common.errors.NoPermissionError({message: common.i18n.t('errors.models.subscriber.notEnoughPermission')}));
    },

    // TODO: This is a copy paste of models/user.js!
    getByEmail: function getByEmail(email, unfilteredOptions) {
        var options = ghostBookshelf.Model.filterOptions(unfilteredOptions, 'getByEmail');
        options.require = true;

        return Subscribers.forge().fetch(options).then(function then(subscribers) {
            var subscriberWithEmail = subscribers.find(function findSubscriber(subscriber) {
                return subscriber.get('email').toLowerCase() === email.toLowerCase();
            });

            if (subscriberWithEmail) {
                return subscriberWithEmail;
            }
        }).catch(function (error) {
            if (error.message === 'NotFound' || error.message === 'EmptyResponse') {
                return Promise.resolve();
            }

            return Promise.reject(error);
        });
    }
});

Subscribers = ghostBookshelf.Collection.extend({
    model: Subscriber
});

module.exports = {
    Subscriber: ghostBookshelf.model('Subscriber', Subscriber),
    Subscribers: ghostBookshelf.collection('Subscriber', Subscribers)
};
