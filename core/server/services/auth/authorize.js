<<<<<<< HEAD
var labs = require('../labs'),
    common = require('../../lib/common'),
    authorize;

authorize = {
=======
const labs = require('../labs');
const common = require('../../lib/common');

const authorize = {
>>>>>>> newversion/master
    // Workaround for missing permissions
    // TODO: rework when https://github.com/TryGhost/Ghost/issues/3911 is  done
    requiresAuthorizedUser: function requiresAuthorizedUser(req, res, next) {
        if (req.user && req.user.id) {
            return next();
        } else {
<<<<<<< HEAD
            return next(new common.errors.NoPermissionError({message: common.i18n.t('errors.middleware.auth.pleaseSignIn')}));
=======
            return next(new common.errors.NoPermissionError({
                message: common.i18n.t('errors.middleware.auth.pleaseSignIn')
            }));
>>>>>>> newversion/master
        }
    },

    // ### Require user depending on public API being activated.
    requiresAuthorizedUserPublicAPI: function requiresAuthorizedUserPublicAPI(req, res, next) {
        if (labs.isSet('publicAPI') === true) {
            return next();
        } else {
            if (req.user && req.user.id) {
                return next();
            } else {
<<<<<<< HEAD
                return next(new common.errors.NoPermissionError({message: common.i18n.t('errors.middleware.auth.pleaseSignIn')}));
=======
                // CASE: has no user access and public api is disabled
                if (labs.isSet('publicAPI') !== true) {
                    return next(new common.errors.NoPermissionError({
                        message: common.i18n.t('errors.middleware.auth.publicAPIDisabled.error'),
                        context: common.i18n.t('errors.middleware.auth.publicAPIDisabled.context'),
                        help: common.i18n.t('errors.middleware.auth.forInformationRead', {url: 'https://ghost.org/docs/api/content/'})
                    }));
                }

                return next(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.middleware.auth.pleaseSignIn')
                }));
>>>>>>> newversion/master
            }
        }
    },

    // Requires the authenticated client to match specific client
    requiresAuthorizedClient: function requiresAuthorizedClient(client) {
        return function doAuthorizedClient(req, res, next) {
            if (client && (!req.client || !req.client.name || req.client.name !== client)) {
<<<<<<< HEAD
                return next(new common.errors.NoPermissionError({message: common.i18n.t('errors.permissions.noPermissionToAction')}));
=======
                return next(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.permissions.noPermissionToAction')
                }));
>>>>>>> newversion/master
            }

            return next();
        };
<<<<<<< HEAD
=======
    },

    authorizeContentApi(req, res, next) {
        const hasApiKey = req.api_key && req.api_key.id;
        const hasMember = req.member;
        if (hasApiKey) {
            return next();
        }
        if (labs.isSet('members') && hasMember) {
            return next();
        }
        return next(new common.errors.NoPermissionError({
            message: common.i18n.t('errors.middleware.auth.authorizationFailed'),
            context: common.i18n.t('errors.middleware.auth.missingContentMemberOrIntegration')
        }));
    },

    authorizeAdminApi(req, res, next) {
        const hasUser = req.user && req.user.id;
        const hasApiKey = req.api_key && req.api_key.id;

        if (hasUser || hasApiKey) {
            return next();
        } else {
            return next(new common.errors.NoPermissionError({
                message: common.i18n.t('errors.middleware.auth.authorizationFailed'),
                context: common.i18n.t('errors.middleware.auth.missingAdminUserOrIntegration')
            }));
        }
>>>>>>> newversion/master
    }
};

module.exports = authorize;
