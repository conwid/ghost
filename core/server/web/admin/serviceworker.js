<<<<<<< HEAD
const debug = require('ghost-ignition').debug('admin:serviceworker'),
    path = require('path');
=======
const debug = require('ghost-ignition').debug('web:admin:serviceworker');
const path = require('path');
>>>>>>> newversion/master

// Route: index
// Path: /ghost/sw.js|sw-registration.js
// Method: GET
module.exports = function adminController(req, res) {
    debug('serviceworker called');

    const sw = path.join(__dirname, '..', '..', '..', 'built', 'assets', 'sw.js'),
        swr = path.join(__dirname, '..', '..', '..', 'built', 'assets', 'sw-registration.js'),
        fileToSend = req.url === '/sw.js' ? sw : swr;

    res.sendFile(fileToSend);
};
