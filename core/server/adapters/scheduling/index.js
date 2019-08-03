const postScheduling = require(__dirname + '/post-scheduling');

/**
<<<<<<< HEAD
 * scheduling modules:
 *   - post scheduling: publish posts/pages when scheduled
=======
 * @description Initialise all scheduler modules.
 *
 * We currently only support post-scheduling: publish posts/pages when scheduled.
 *
 * @param {Object} options
 *                 {
 *                      schedulerUrl: [String] Remote scheduler domain.
 *                      active:       [String] Name of the custom scheduler.
 *                      apiUrl:       [String] Target Ghost API url.
 *                      internalPath: [String] Folder path where to find the default scheduler.
 *                      contentPath:  [String] Folder path where to find custom schedulers.
 *                  }
 *
 * @TODO: Simplify the passed in options.
>>>>>>> newversion/master
 */
exports.init = function init(options) {
    options = options || {};

    return postScheduling.init(options);
};
