<<<<<<< HEAD
var Promise = require('bluebird');
=======
const Promise = require('bluebird');
>>>>>>> newversion/master

/**
 * expects an array of functions returning a promise
 */
function sequence(tasks /* Any Arguments */) {
<<<<<<< HEAD
    var args = Array.prototype.slice.call(arguments, 1);

    return Promise.reduce(tasks, function (results, task) {
        return task.apply(this, args).then(function (result) {
            results.push(result);
            return results;
        });
=======
    const args = Array.prototype.slice.call(arguments, 1);

    return Promise.reduce(tasks, function (results, task) {
        const response = task.apply(this, args);

        if (response && response.then) {
            return response.then(function (result) {
                results.push(result);
                return results;
            });
        } else {
            return Promise.resolve().then(() => {
                results.push(response);
                return results;
            });
        }
>>>>>>> newversion/master
    }, []);
}

module.exports = sequence;
