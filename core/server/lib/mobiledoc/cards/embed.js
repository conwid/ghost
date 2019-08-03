<<<<<<< HEAD
module.exports = {
=======
const createCard = require('../create-card');

module.exports = createCard({
>>>>>>> newversion/master
    name: 'embed',
    type: 'dom',
    render(opts) {
        if (!opts.payload.html) {
            return '';
        }

        let {payload, env: {dom}} = opts;

        let figure = dom.createElement('figure');
<<<<<<< HEAD
        figure.setAttribute('class', 'kg-embed-card');
=======
        figure.setAttribute('class', 'kg-card kg-embed-card');
>>>>>>> newversion/master

        let html = dom.createRawHTMLSection(payload.html);
        figure.appendChild(html);

        if (payload.caption) {
            let figcaption = dom.createElement('figcaption');
            figcaption.appendChild(dom.createRawHTMLSection(payload.caption));
            figure.appendChild(figcaption);
<<<<<<< HEAD
=======
            figure.setAttribute('class', `${figure.getAttribute('class')} kg-card-hascaption`);
>>>>>>> newversion/master
        }

        return figure;
    }
<<<<<<< HEAD
};
=======
});
>>>>>>> newversion/master
