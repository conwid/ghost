<<<<<<< HEAD
var passport = require('./passport'),
    authorize = require('./authorize'),
    authenticate = require('./authenticate'),
    oauth = require('./oauth');

exports.init = function (options) {
    oauth.init(options);
    return passport.init(options);
};

exports.oauth = oauth;
exports.authorize = authorize;
exports.authenticate = authenticate;
=======
module.exports = {
    get authorize() {
        return require('./authorize');
    },

    get authenticate() {
        return require('./authenticate');
    },

    get session() {
        return require('./session');
    },

    get setup() {
        return require('./setup');
    },

    get passwordreset() {
        return require('./passwordreset');
    },

    /*
     * TODO: Get rid of these when v0.1 is gone
     */
    get init() {
        return (options) => {
            require('./oauth').init(options);
            return require('./passport').init(options);
        };
    },
    get oauth() {
        return require('./oauth');
    }
};
>>>>>>> newversion/master
