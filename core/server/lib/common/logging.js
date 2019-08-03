<<<<<<< HEAD
var config = require('../../config'),
    logging = require('ghost-ignition').logging;

module.exports = logging({
=======
const config = require('../../config'),
    {logging} = require('ghost-ignition');

module.exports = logging({
    name: config.get('logging:name'),
>>>>>>> newversion/master
    env: config.get('env'),
    path: config.get('logging:path') || config.getContentPath('logs'),
    domain: config.get('url'),
    mode: config.get('logging:mode'),
    level: config.get('logging:level'),
    transports: config.get('logging:transports'),
<<<<<<< HEAD
=======
    gelf: config.get('logging:gelf'),
>>>>>>> newversion/master
    loggly: config.get('logging:loggly'),
    rotation: config.get('logging:rotation')
});
