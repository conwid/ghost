<<<<<<< HEAD
const routing = require('../../services/routing');
=======
const routing = require('../../../frontend/services/routing');
>>>>>>> newversion/master

module.exports = function siteRoutes(options = {}) {
    return routing.bootstrap.init(options);
};
