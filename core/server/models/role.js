var _ = require('lodash'),
    ghostBookshelf = require('./base'),
    Promise = require('bluebird'),
    common = require('../lib/common'),

    Role,
    Roles;

Role = ghostBookshelf.Model.extend({

    tableName: 'roles',

<<<<<<< HEAD
=======
    relationships: ['permissions'],

    relationshipBelongsTo: {
        permissions: 'permissions'
    },

>>>>>>> newversion/master
    users: function users() {
        return this.belongsToMany('User');
    },

    permissions: function permissions() {
        return this.belongsToMany('Permission');
<<<<<<< HEAD
=======
    },

    api_keys: function apiKeys() {
        return this.hasMany('ApiKey');
>>>>>>> newversion/master
    }
}, {
    /**
     * Returns an array of keys permitted in a method's `options` hash, depending on the current method.
     * @param {String} methodName The name of the method to check valid options for.
     * @return {Array} Keys allowed in the `options` hash of the model's method.
     */
    permittedOptions: function permittedOptions(methodName) {
<<<<<<< HEAD
        var options = ghostBookshelf.Model.permittedOptions(),
=======
        var options = ghostBookshelf.Model.permittedOptions.call(this, methodName),
>>>>>>> newversion/master

            // whitelists for the `options` hash argument on methods, by method name.
            // these are the only options that can be passed to Bookshelf / Knex.
            validOptions = {
                findOne: ['withRelated'],
                findAll: ['withRelated']
            };

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    },

<<<<<<< HEAD
    permissible: function permissible(roleModelOrId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission) {
        var self = this,
            checkAgainst = [],
            origArgs;

        // If we passed in an id instead of a model, get the model
        // then check the permissions
        if (_.isNumber(roleModelOrId) || _.isString(roleModelOrId)) {
            // Grab the original args without the first one
            origArgs = _.toArray(arguments).slice(1);

            // Get the actual role model
            return this.findOne({id: roleModelOrId, status: 'all'})
                .then(function then(foundRoleModel) {
=======
    permissible: function permissible(roleModelOrId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission, hasApiKeyPermission) {
        // If we passed in an id instead of a model, get the model
        // then check the permissions
        if (_.isNumber(roleModelOrId) || _.isString(roleModelOrId)) {
            // Get the actual role model
            return this.findOne({id: roleModelOrId, status: 'all'})
                .then((foundRoleModel) => {
>>>>>>> newversion/master
                    if (!foundRoleModel) {
                        throw new common.errors.NotFoundError({
                            message: common.i18n.t('errors.models.role.roleNotFound')
                        });
                    }

<<<<<<< HEAD
                    // Build up the original args but substitute with actual model
                    var newArgs = [foundRoleModel].concat(origArgs);

                    return self.permissible.apply(self, newArgs);
                });
        }

        if (action === 'assign' && loadedPermissions.user) {
=======
                    // Grab the original args without the first one
                    const origArgs = _.toArray(arguments).slice(1);

                    return this.permissible(foundRoleModel, ...origArgs);
                });
        }

        const roleModel = roleModelOrId;

        if (action === 'assign' && loadedPermissions.user) {
            let checkAgainst;
>>>>>>> newversion/master
            if (_.some(loadedPermissions.user.roles, {name: 'Owner'})) {
                checkAgainst = ['Owner', 'Administrator', 'Editor', 'Author', 'Contributor'];
            } else if (_.some(loadedPermissions.user.roles, {name: 'Administrator'})) {
                checkAgainst = ['Administrator', 'Editor', 'Author', 'Contributor'];
            } else if (_.some(loadedPermissions.user.roles, {name: 'Editor'})) {
                checkAgainst = ['Author', 'Contributor'];
            }

            // Role in the list of permissible roles
<<<<<<< HEAD
            hasUserPermission = roleModelOrId && _.includes(checkAgainst, roleModelOrId.get('name'));
        }

        if (hasUserPermission && hasAppPermission) {
=======
            hasUserPermission = roleModelOrId && _.includes(checkAgainst, roleModel.get('name'));
        }

        if (action === 'assign' && loadedPermissions.apiKey) {
            // apiKey cannot 'assign' the 'Owner' role
            if (roleModel.get('name') === 'Owner') {
                return Promise.reject(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.models.role.notEnoughPermission')
                }));
            }
        }

        if (hasUserPermission && hasAppPermission && hasApiKeyPermission) {
>>>>>>> newversion/master
            return Promise.resolve();
        }

        return Promise.reject(new common.errors.NoPermissionError({message: common.i18n.t('errors.models.role.notEnoughPermission')}));
    }
});

Roles = ghostBookshelf.Collection.extend({
    model: Role
});

module.exports = {
    Role: ghostBookshelf.model('Role', Role),
    Roles: ghostBookshelf.collection('Roles', Roles)
};
