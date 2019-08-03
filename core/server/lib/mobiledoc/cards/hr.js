<<<<<<< HEAD
module.exports = {
=======
const createCard = require('../create-card');

module.exports = createCard({
>>>>>>> newversion/master
    name: 'hr',
    type: 'dom',
    render(opts) {
        return opts.env.dom.createElement('hr');
    }
<<<<<<< HEAD
};
=======
});
>>>>>>> newversion/master
