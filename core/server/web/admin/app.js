<<<<<<< HEAD
const debug = require('ghost-ignition').debug('admin'),
    express = require('express'),

    // App requires
    config = require('../../config'),
    constants = require('../../lib/constants'),
    urlService = require('../../services/url'),

    // Middleware
    // Admin only middleware
    adminMiddleware = require('./middleware'),
    serveStatic = require('express').static,

    // Global/shared middleware
    cacheControl = require('../middleware/cache-control'),
    urlRedirects = require('../middleware/url-redirects'),
    errorHandler = require('../middleware/error-handler'),
    maintenance = require('../middleware/maintenance'),
    prettyURLs = require('../middleware/pretty-urls');
=======
const debug = require('ghost-ignition').debug('web:admin:app');
const express = require('express');
const serveStatic = require('express').static;
const config = require('../../config');
const constants = require('../../lib/constants');
const urlUtils = require('../../lib/url-utils');
const shared = require('../shared');
const adminMiddleware = require('./middleware');
>>>>>>> newversion/master

module.exports = function setupAdminApp() {
    debug('Admin setup start');
    const adminApp = express();

<<<<<<< HEAD
    // First determine whether we're serving admin or theme content
    // @TODO finish refactoring this away.
    adminApp.use(function setIsAdmin(req, res, next) {
        res.isAdmin = true;
        next();
    });

=======
>>>>>>> newversion/master
    // Admin assets
    // @TODO ensure this gets a local 404 error handler
    const configMaxAge = config.get('caching:admin:maxAge');
    adminApp.use('/assets', serveStatic(
        config.get('paths').clientAssets,
        {maxAge: (configMaxAge || configMaxAge === 0) ? configMaxAge : constants.ONE_YEAR_MS, fallthrough: false}
    ));

    // Service Worker for offline support
    adminApp.get(/^\/(sw.js|sw-registration.js)$/, require('./serviceworker'));

    // Ember CLI's live-reload script
    if (config.get('env') === 'development') {
<<<<<<< HEAD
        adminApp.get('/ember-cli-live-reload.js', function (req, res) {
            res.redirect(`http://localhost:4200${urlService.utils.getSubdir()}/ghost/ember-cli-live-reload.js`);
=======
        adminApp.get('/ember-cli-live-reload.js', function emberLiveReload(req, res) {
            res.redirect(`http://localhost:4200${urlUtils.getSubdir()}/ghost/ember-cli-live-reload.js`);
>>>>>>> newversion/master
        });
    }

    // Render error page in case of maintenance
<<<<<<< HEAD
    adminApp.use(maintenance);

    // Force SSL if required
    // must happen AFTER asset loading and BEFORE routing
    adminApp.use(urlRedirects);

    // Add in all trailing slashes & remove uppercase
    // must happen AFTER asset loading and BEFORE routing
    adminApp.use(prettyURLs);

    // Cache headers go last before serving the request
    // Admin is currently set to not be cached at all
    adminApp.use(cacheControl('private'));
=======
    adminApp.use(shared.middlewares.maintenance);

    // Force SSL if required
    // must happen AFTER asset loading and BEFORE routing
    adminApp.use(shared.middlewares.urlRedirects.adminRedirect);

    // Add in all trailing slashes & remove uppercase
    // must happen AFTER asset loading and BEFORE routing
    adminApp.use(shared.middlewares.prettyUrls);

    // Cache headers go last before serving the request
    // Admin is currently set to not be cached at all
    adminApp.use(shared.middlewares.cacheControl('private'));
>>>>>>> newversion/master
    // Special redirects for the admin (these should have their own cache-control headers)
    adminApp.use(adminMiddleware);

    // Finally, routing
    adminApp.get('*', require('./controller'));

<<<<<<< HEAD
    adminApp.use(errorHandler.pageNotFound);
    adminApp.use(errorHandler.handleHTMLResponse);
=======
    adminApp.use(shared.middlewares.errorHandler.pageNotFound);
    adminApp.use(shared.middlewares.errorHandler.handleHTMLResponse);
>>>>>>> newversion/master

    debug('Admin setup end');

    return adminApp;
};
