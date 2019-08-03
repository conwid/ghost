<<<<<<< HEAD
var debug = require('ghost-ignition').debug('app'),
    express = require('express'),

    // App requires
    config = require('../config'),

    // middleware
    compress = require('compression'),
    netjet = require('netjet'),

    // local middleware
    ghostLocals = require('./middleware/ghost-locals'),
    logRequest = require('./middleware/log-request');

module.exports = function setupParentApp(options = {}) {
    debug('ParentApp setup start');
    var parentApp = express();
=======
const debug = require('ghost-ignition').debug('web:parent');
const express = require('express');
const config = require('../config');
const compress = require('compression');
const netjet = require('netjet');
const shared = require('./shared');

module.exports = function setupParentApp(options = {}) {
    debug('ParentApp setup start');
    const parentApp = express();
>>>>>>> newversion/master

    // ## Global settings

    // Make sure 'req.secure' is valid for proxied requests
    // (X-Forwarded-Proto header will be checked, if present)
    parentApp.enable('trust proxy');

<<<<<<< HEAD
    parentApp.use(logRequest);
=======
    parentApp.use(shared.middlewares.logRequest);

    // Register event emmiter on req/res to trigger cache invalidation webhook event
    parentApp.use(shared.middlewares.emitEvents);
>>>>>>> newversion/master

    // enabled gzip compression by default
    if (config.get('compress') !== false) {
        parentApp.use(compress());
    }

    // Preload link headers
    if (config.get('preloadHeaders')) {
        parentApp.use(netjet({
            cache: {
                max: config.get('preloadHeaders')
            }
        }));
    }

    // This sets global res.locals which are needed everywhere
<<<<<<< HEAD
    parentApp.use(ghostLocals);

    // Mount the  apps on the parentApp
    // API
    // @TODO: finish refactoring the API app
    // @TODO: decide what to do with these paths - config defaults? config overrides?
    parentApp.use('/ghost/api/v0.1/', require('./api/app')());
=======
    parentApp.use(shared.middlewares.ghostLocals);

    // Mount the  apps on the parentApp

    // API
    // @TODO: finish refactoring the API app
    parentApp.use('/ghost/api', require('./api')());
>>>>>>> newversion/master

    // ADMIN
    parentApp.use('/ghost', require('./admin')());

    // BLOG
    parentApp.use(require('./site')(options));

    debug('ParentApp setup end');

    return parentApp;
};
