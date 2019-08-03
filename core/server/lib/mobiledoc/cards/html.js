<<<<<<< HEAD
module.exports = {
=======
const createCard = require('../create-card');

module.exports = createCard({
>>>>>>> newversion/master
    name: 'html',
    type: 'dom',
    render(opts) {
        if (!opts.payload.html) {
            return '';
        }

        // use the SimpleDOM document to create a raw HTML section.
        // avoids parsing/rendering of potentially broken or unsupported HTML
        return opts.env.dom.createRawHTMLSection(opts.payload.html);
    }
<<<<<<< HEAD
};
=======
});
>>>>>>> newversion/master
