<<<<<<< HEAD
const urlService = require('../../services/url');

function redirectAdminUrls(req, res, next) {
    const subdir = urlService.utils.getSubdir(),
=======
const urlUtils = require('../../lib/url-utils');

function redirectAdminUrls(req, res, next) {
    const subdir = urlUtils.getSubdir(),
>>>>>>> newversion/master
        ghostPathRegex = new RegExp(`^${subdir}/ghost/(.+)`),
        ghostPathMatch = req.originalUrl.match(ghostPathRegex);

    if (ghostPathMatch) {
<<<<<<< HEAD
        return res.redirect(urlService.utils.urlJoin(urlService.utils.urlFor('admin'), '#', ghostPathMatch[1]));
=======
        return res.redirect(urlUtils.urlJoin(urlUtils.urlFor('admin'), '#', ghostPathMatch[1]));
>>>>>>> newversion/master
    }

    next();
}

module.exports = [
    redirectAdminUrls
];
