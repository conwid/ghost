<<<<<<< HEAD
var _ = require('lodash'),
=======
const merge = require('lodash/merge'),
    each = require('lodash/each'),
>>>>>>> newversion/master
    util = require('util'),
    errors = require('ghost-ignition').errors;

function GhostError(options) {
    options = options || {};
    this.value = options.value;

    errors.IgnitionError.call(this, options);
}

<<<<<<< HEAD
var ghostErrors = {
    DataExportError: function DataExportError(options) {
        GhostError.call(this, _.merge({
=======
const ghostErrors = {
    DataExportError: function DataExportError(options) {
        GhostError.call(this, merge({
>>>>>>> newversion/master
            statusCode: 500,
            errorType: 'DataExportError'
        }, options));
    },
    DataImportError: function DataImportError(options) {
<<<<<<< HEAD
        GhostError.call(this, _.merge({
=======
        GhostError.call(this, merge({
>>>>>>> newversion/master
            statusCode: 500,
            errorType: 'DataImportError'
        }, options));
    },
    DatabaseVersionError: function DatabaseVersionError(options) {
<<<<<<< HEAD
        GhostError.call(this, _.merge({
=======
        GhostError.call(this, merge({
>>>>>>> newversion/master
            hideStack: true,
            statusCode: 500,
            errorType: 'DatabaseVersionError'
        }, options));
    },
<<<<<<< HEAD
    DatabaseNotPopulatedError: function DatabaseNotPopulatedError(options) {
        GhostError.call(this, _.merge({
            statusCode: 500,
            errorType: 'DatabaseNotPopulatedError'
        }, options));
    },
    DatabaseNotSeededError: function DatabaseNotSeededError(options) {
        GhostError.call(this, _.merge({
            statusCode: 500,
            errorType: 'DatabaseNotSeededError'
        }, options));
    },
    EmailError: function EmailError(options) {
        GhostError.call(this, _.merge({
=======
    EmailError: function EmailError(options) {
        GhostError.call(this, merge({
>>>>>>> newversion/master
            statusCode: 500,
            errorType: 'EmailError'
        }, options));
    },
    ThemeValidationError: function ThemeValidationError(options) {
<<<<<<< HEAD
        GhostError.call(this, _.merge({
=======
        GhostError.call(this, merge({
>>>>>>> newversion/master
            statusCode: 422,
            errorType: 'ThemeValidationError',
            errorDetails: {}
        }, options));
    },
    DisabledFeatureError: function DisabledFeatureError(options) {
<<<<<<< HEAD
        GhostError.call(this, _.merge({
=======
        GhostError.call(this, merge({
>>>>>>> newversion/master
            statusCode: 409,
            errorType: 'DisabledFeatureError'
        }, options));
    },
    UpdateCollisionError: function UpdateCollisionError(options) {
<<<<<<< HEAD
        GhostError.call(this, _.merge({
            statusCode: 409,
            errorType: 'UpdateCollisionError'
        }, options));
=======
        GhostError.call(this, merge({
            statusCode: 409,
            errorType: 'UpdateCollisionError'
        }, options));
    },
    HelperWarning: function HelperWarning(options) {
        GhostError.call(this, merge({
            errorType: 'HelperWarning',
            hideStack: true
        }, options));
>>>>>>> newversion/master
    }
};

util.inherits(GhostError, errors.IgnitionError);
<<<<<<< HEAD
_.each(ghostErrors, function (error) {
=======
each(ghostErrors, function (error) {
>>>>>>> newversion/master
    util.inherits(error, GhostError);
});

// we need to inherit all general errors from GhostError, otherwise we have to check instanceof IgnitionError
<<<<<<< HEAD
_.each(errors, function (error) {
=======
each(errors, function (error) {
>>>>>>> newversion/master
    if (error.name === 'IgnitionError' || typeof error === 'object') {
        return;
    }

    util.inherits(error, GhostError);
});

<<<<<<< HEAD
module.exports = _.merge(ghostErrors, errors);
=======
module.exports = merge(ghostErrors, errors);
>>>>>>> newversion/master
module.exports.GhostError = GhostError;
