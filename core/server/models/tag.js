const ghostBookshelf = require('./base');
<<<<<<< HEAD
=======

>>>>>>> newversion/master
let Tag, Tags;

Tag = ghostBookshelf.Model.extend({

    tableName: 'tags',

    defaults: function defaults() {
        return {
            visibility: 'public'
        };
    },

    emitChange: function emitChange(event, options) {
        const eventToTrigger = 'tag' + '.' + event;
        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    onCreated: function onCreated(model, attrs, options) {
<<<<<<< HEAD
=======
        ghostBookshelf.Model.prototype.onCreated.apply(this, arguments);

>>>>>>> newversion/master
        model.emitChange('added', options);
    },

    onUpdated: function onUpdated(model, attrs, options) {
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
    },

    onSaving: function onSaving(newTag, attr, options) {
        var self = this;

        ghostBookshelf.Model.prototype.onSaving.apply(this, arguments);

        // name: #later slug: hash-later
        if (/^#/.test(newTag.get('name'))) {
            this.set('visibility', 'internal');
        }

<<<<<<< HEAD
        if (this.hasChanged('slug') || !this.get('slug')) {
=======
        if (this.hasChanged('slug') || (!this.get('slug') && this.get('name'))) {
>>>>>>> newversion/master
            // Pass the new slug through the generator to strip illegal characters, detect duplicates
            return ghostBookshelf.Model.generateSlug(Tag, this.get('slug') || this.get('name'),
                {transacting: options.transacting})
                .then(function then(slug) {
                    self.set({slug: slug});
                });
        }
    },

<<<<<<< HEAD
    emptyStringProperties: function emptyStringProperties() {
        // CASE: the client might send empty image properties with "" instead of setting them to null.
        // This can cause GQL to fail. We therefore enforce 'null' for empty image properties.
        // See https://github.com/TryGhost/GQL/issues/24
        return ['feature_image'];
    },

=======
>>>>>>> newversion/master
    posts: function posts() {
        return this.belongsToMany('Post');
    },

    toJSON: function toJSON(unfilteredOptions) {
        var options = Tag.filterOptions(unfilteredOptions, 'toJSON'),
            attrs = ghostBookshelf.Model.prototype.toJSON.call(this, options);

<<<<<<< HEAD
=======
        // @NOTE: this serialization should be moved into api layer, it's not being moved as it's not used
>>>>>>> newversion/master
        attrs.parent = attrs.parent || attrs.parent_id;
        delete attrs.parent_id;

        return attrs;
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
                findAll: ['columns'],
                findOne: ['visibility'],
=======
                findAll: ['columns'],
                findOne: ['columns', 'visibility'],
>>>>>>> newversion/master
                destroy: ['destroyAll']
            };

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    },

    destroy: function destroy(unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'destroy', {extraAllowedProperties: ['id']});
        options.withRelated = ['posts'];

        return this.forge({id: options.id})
            .fetch(options)
            .then(function destroyTagsAndPost(tag) {
                return tag.related('posts')
                    .detach(null, options)
                    .then(function destroyTags() {
                        return tag.destroy(options);
                    });
            });
    }
});

Tags = ghostBookshelf.Collection.extend({
    model: Tag
});

module.exports = {
    Tag: ghostBookshelf.model('Tag', Tag),
    Tags: ghostBookshelf.collection('Tags', Tags)
};
