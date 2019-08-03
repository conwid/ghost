<<<<<<< HEAD
var debug = require('ghost-ignition').debug('utils:image-size'),
    sizeOf = require('image-size'),
    url = require('url'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    request = require('../request'),
    urlService = require('../../services/url'),
    common = require('../common'),
    config = require('../../config'),
    storage = require('../../adapters/storage'),
    storageUtils = require('../../adapters/storage/utils'),
    getImageSizeFromUrl,
    getImageSizeFromFilePath;

/**
 * @description processes the Buffer result of an image file
 * @param {Object} options
 * @returns {Object} dimensions
 */
function fetchDimensionsFromBuffer(options) {
    var buffer = options.buffer,
        imagePath = options.imagePath,
        imageObject = {},
        dimensions;

    imageObject.url = imagePath;

    try {
        // Using the Buffer rather than an URL requires to use sizeOf synchronously.
        // See https://github.com/image-size/image-size#asynchronous
        dimensions = sizeOf(buffer);

        // CASE: `.ico` files might have multiple images and therefore multiple sizes.
        // We return the largest size found (image-size default is the first size found)
        if (dimensions.images) {
            dimensions.width = _.maxBy(dimensions.images, function (w) {
                return w.width;
            }).width;
            dimensions.height = _.maxBy(dimensions.images, function (h) {
                return h.height;
            }).height;
        }

        imageObject.width = dimensions.width;
        imageObject.height = dimensions.height;

        return Promise.resolve(imageObject);
    } catch (err) {
        return Promise.reject(new common.errors.InternalServerError({
            code: 'IMAGE_SIZE',
            err: err,
            context: imagePath
        }));
    }
=======
const debug = require('ghost-ignition').debug('utils:image-size');
const sizeOf = require('image-size');
const probeSizeOf = require('probe-image-size');
const url = require('url');
const Promise = require('bluebird');
const _ = require('lodash');
const request = require('../request');
const urlUtils = require('../../lib/url-utils');
const common = require('../common');
const config = require('../../config');
const storage = require('../../adapters/storage');
const storageUtils = require('../../adapters/storage/utils');
const validator = require('../../data/validation').validator;

// these are formats supported by image-size but not probe-image-size
const FETCH_ONLY_FORMATS = [
    'cur', 'icns', 'ico', 'dds'
];

const REQUEST_OPTIONS = {
    // we need the user-agent, otherwise some https request may fail (e.g. cloudfare)
    headers: {
        'User-Agent': 'Mozilla/5.0 Safari/537.36'
    },
    timeout: config.get('times:getImageSizeTimeoutInMS') || 10000,
    retry: 0, // for `got`, used with image-size
    encoding: null
};

// processes the Buffer result of an image file using image-size
// returns promise which resolves dimensions
function _imageSizeFromBuffer(buffer) {
    return new Promise((resolve, reject) => {
        try {
            const dimensions = sizeOf(buffer);

            // CASE: `.ico` files might have multiple images and therefore multiple sizes.
            // We return the largest size found (image-size default is the first size found)
            if (dimensions.images) {
                dimensions.width = _.maxBy(dimensions.images, img => img.width).width;
                dimensions.height = _.maxBy(dimensions.images, img => img.height).height;
            }

            return resolve(dimensions);
        } catch (err) {
            return reject(err);
        }
    });
}

// use probe-image-size to download enough of an image to get it's dimensions
// returns promise which resolves dimensions
function _probeImageSizeFromUrl(url) {
    // probe-image-size uses `request` npm module which doesn't have our `got`
    // override with custom URL validation so it needs duplicating here
    if (_.isEmpty(url) || !validator.isURL(url)) {
        return Promise.reject(new common.errors.InternalServerError({
            message: 'URL empty or invalid.',
            code: 'URL_MISSING_INVALID',
            context: url
        }));
    }

    return probeSizeOf(url, REQUEST_OPTIONS);
}

// download full image then use image-size to get it's dimensions
// returns promise which resolves dimensions
function _fetchImageSizeFromUrl(url) {
    return request(url, REQUEST_OPTIONS).then((response) => {
        return _imageSizeFromBuffer(response.body);
    });
}

// wrapper for appropriate probe/fetch method for getting image dimensions from a URL
// returns promise which resolves dimensions
function _imageSizeFromUrl(imageUrl) {
    return new Promise((resolve, reject) => {
        let parsedUrl;

        try {
            parsedUrl = url.parse(imageUrl);
        } catch (err) {
            reject(err);
        }

        // check if we got an url without any protocol
        if (!parsedUrl.protocol) {
            // CASE: our gravatar URLs start with '//' and we need to add 'http:'
            // to make the request work
            imageUrl = 'http:' + imageUrl;
        }

        const extensionMatch = imageUrl.match(/(?:\.)([a-zA-Z]{3,4})(\?|$)/) || [];
        const extension = (extensionMatch[1] || '').toLowerCase();

        if (FETCH_ONLY_FORMATS.includes(extension)) {
            return resolve(_fetchImageSizeFromUrl(imageUrl));
        } else {
            return resolve(_probeImageSizeFromUrl(imageUrl));
        }
    });
>>>>>>> newversion/master
}

// Supported formats of https://github.com/image-size/image-size:
// BMP, GIF, JPEG, PNG, PSD, TIFF, WebP, SVG, ICO
// ***
// Takes the url of the image and an optional timeout
// getImageSizeFromUrl returns an Object like this
// {
//     height: 50,
//     url: 'http://myblog.com/images/cat.jpg',
//     width: 50
// };
// if the dimensions can be fetched, and rejects with error, if not.
// ***
// In case we get a locally stored image, which is checked withing the `isLocalImage`
<<<<<<< HEAD
// function we switch to read the image from the local file storage with `getImageSizeFromFilePath`.
=======
// function we switch to read the image from the local file storage with `getImageSizeFromStoragePath`.
>>>>>>> newversion/master
// In case the image is not stored locally and is missing the protocol (like //www.gravatar.com/andsoon),
// we add the protocol and use urlFor() to get the absolute URL.
// If the request fails or image-size is not able to read the file, we reject with error.

/**
 * @description read image dimensions from URL
 * @param {String} imagePath as URL
 * @returns {Promise<Object>} imageObject or error
 */
<<<<<<< HEAD
getImageSizeFromUrl = function getImageSizeFromUrl(imagePath) {
    var requestOptions,
        parsedUrl,
        timeout = config.get('times:getImageSizeTimeoutInMS') || 10000;

    if (storageUtils.isLocalImage(imagePath)) {
        // don't make a request for a locally stored image
        return getImageSizeFromFilePath(imagePath);
=======
const getImageSizeFromUrl = (imagePath) => {
    if (storageUtils.isLocalImage(imagePath)) {
        // don't make a request for a locally stored image
        return getImageSizeFromStoragePath(imagePath);
>>>>>>> newversion/master
    }

    // CASE: pre 1.0 users were able to use an asset path for their blog logo
    if (imagePath.match(/^\/assets/)) {
<<<<<<< HEAD
        imagePath = urlService.utils.urlJoin(urlService.utils.urlFor('home', true), urlService.utils.getSubdir(), '/', imagePath);
    }

    parsedUrl = url.parse(imagePath);

    // check if we got an url without any protocol
    if (!parsedUrl.protocol) {
        // CASE: our gravatar URLs start with '//' and we need to add 'http:'
        // to make the request work
        imagePath = 'http:' + imagePath;
    }

    debug('requested imagePath:', imagePath);
    requestOptions = {
        headers: {
            'User-Agent': 'Mozilla/5.0 Safari/537.36'
        },
        timeout: timeout,
        encoding: null
    };

    return request(
        imagePath,
        requestOptions
    ).then(function (response) {
        debug('Image fetched (URL):', imagePath);

        return fetchDimensionsFromBuffer({
            buffer: response.body,
            // we need to return the URL that's accessible for network requests as this imagePath
            // value will be used as the URL for structured data
            imagePath: parsedUrl.href
        });
    }).catch({code: 'URL_MISSING_INVALID'}, function (err) {
=======
        imagePath = urlUtils.urlJoin(urlUtils.urlFor('home', true), urlUtils.getSubdir(), '/', imagePath);
    }

    debug('requested imagePath:', imagePath);

    return _imageSizeFromUrl(imagePath).then((dimensions) => {
        debug('Image fetched (URL):', imagePath);

        return {
            url: imagePath,
            width: dimensions.width,
            height: dimensions.height
        };
    }).catch({code: 'URL_MISSING_INVALID'}, (err) => {
>>>>>>> newversion/master
        return Promise.reject(new common.errors.InternalServerError({
            message: err.message,
            code: 'IMAGE_SIZE_URL',
            statusCode: err.statusCode,
            context: err.url || imagePath
        }));
<<<<<<< HEAD
    }).catch({code: 'ETIMEDOUT'}, {statusCode: 408}, function (err) {
=======
    }).catch({code: 'ETIMEDOUT'}, {statusCode: 408}, (err) => {
>>>>>>> newversion/master
        return Promise.reject(new common.errors.InternalServerError({
            message: 'Request timed out.',
            code: 'IMAGE_SIZE_URL',
            statusCode: err.statusCode,
            context: err.url || imagePath
        }));
<<<<<<< HEAD
    }).catch({code: 'ENOENT'}, {statusCode: 404}, function (err) {
=======
    }).catch({code: 'ENOENT'}, {statusCode: 404}, (err) => {
>>>>>>> newversion/master
        return Promise.reject(new common.errors.NotFoundError({
            message: 'Image not found.',
            code: 'IMAGE_SIZE_URL',
            statusCode: err.statusCode,
            context: err.url || imagePath
        }));
    }).catch(function (err) {
        if (common.errors.utils.isIgnitionError(err)) {
            return Promise.reject(err);
        }

        return Promise.reject(new common.errors.InternalServerError({
            message: 'Unknown Request error.',
            code: 'IMAGE_SIZE_URL',
            statusCode: err.statusCode,
            context: err.url || imagePath,
            err: err
        }));
    });
};

// Supported formats of https://github.com/image-size/image-size:
// BMP, GIF, JPEG, PNG, PSD, TIFF, WebP, SVG, ICO
// ***
// Takes the url or filepath of the image and reads it form the local
// file storage.
<<<<<<< HEAD
// getImageSizeFromFilePath returns an Object like this
=======
// getImageSizeFromStoragePath returns an Object like this
>>>>>>> newversion/master
// {
//     height: 50,
//     url: 'http://myblog.com/images/cat.jpg',
//     width: 50
// };
// if the image is found and dimensions can be fetched, and rejects with error, if not.
/**
 * @description read image dimensions from local file storage
 * @param {String} imagePath
 * @returns {object} imageObject or error
 */
<<<<<<< HEAD
getImageSizeFromFilePath = function getImageSizeFromFilePath(imagePath) {
    var filePath;

    imagePath = urlService.utils.urlFor('image', {image: imagePath}, true);
=======
const getImageSizeFromStoragePath = (imagePath) => {
    let filePath;

    imagePath = urlUtils.urlFor('image', {image: imagePath}, true);
>>>>>>> newversion/master

    // get the storage readable filePath
    filePath = storageUtils.getLocalFileStoragePath(imagePath);

    return storage.getStorage()
        .read({path: filePath})
<<<<<<< HEAD
        .then(function readFile(buf) {
            debug('Image fetched (storage):', filePath);

            return fetchDimensionsFromBuffer({
                buffer: buf,
                // we need to return the URL that's accessible for network requests as this imagePath
                // value will be used as the URL for structured data
                imagePath: imagePath
            });
        }).catch({code: 'ENOENT'}, function (err) {
=======
        .then((buf) => {
            debug('Image fetched (storage):', filePath);
            return _imageSizeFromBuffer(buf);
        })
        .then((dimensions) => {
            return {
                url: imagePath,
                width: dimensions.width,
                height: dimensions.height
            };
        })
        .catch({code: 'ENOENT'}, (err) => {
>>>>>>> newversion/master
            return Promise.reject(new common.errors.NotFoundError({
                message: err.message,
                code: 'IMAGE_SIZE_STORAGE',
                err: err,
                context: filePath,
                errorDetails: {
                    originalPath: imagePath,
                    reqFilePath: filePath
                }
            }));
<<<<<<< HEAD
        }).catch(function (err) {
=======
        }).catch((err) => {
>>>>>>> newversion/master
            if (common.errors.utils.isIgnitionError(err)) {
                return Promise.reject(err);
            }

            return Promise.reject(new common.errors.InternalServerError({
                message: err.message,
                code: 'IMAGE_SIZE_STORAGE',
                err: err,
                context: filePath,
                errorDetails: {
                    originalPath: imagePath,
                    reqFilePath: filePath
                }
            }));
        });
};

<<<<<<< HEAD
module.exports.getImageSizeFromUrl = getImageSizeFromUrl;
module.exports.getImageSizeFromFilePath = getImageSizeFromFilePath;
=======
/**
 * Supported formats of https://github.com/image-size/image-size:
 * BMP, GIF, JPEG, PNG, PSD, TIFF, WebP, SVG, ICO
 * Get dimensions for a file from its real file storage path
 * Always returns {object} getImageDimensions
 * @param {string} path
 * @returns {Promise<Object>} getImageDimensions
 * @description Takes a file path and returns width and height.
 */
const getImageSizeFromPath = (path) => {
    return new Promise(function getSize(resolve, reject) {
        let dimensions;

        try {
            dimensions = sizeOf(path);

            if (dimensions.images) {
                dimensions.width = _.maxBy(dimensions.images, (w) => {
                    return w.width;
                }).width;
                dimensions.height = _.maxBy(dimensions.images, (h) => {
                    return h.height;
                }).height;
            }

            return resolve({
                width: dimensions.width,
                height: dimensions.height
            });
        } catch (err) {
            return reject(new common.errors.ValidationError({
                message: common.i18n.t('errors.utils.images.invalidDimensions', {
                    file: path,
                    error: err.message
                })
            }));
        }
    });
};

module.exports.getImageSizeFromUrl = getImageSizeFromUrl;
module.exports.getImageSizeFromStoragePath = getImageSizeFromStoragePath;
module.exports.getImageSizeFromPath = getImageSizeFromPath;
>>>>>>> newversion/master
