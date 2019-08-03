const SimpleDom = require('simple-dom');
const Renderer = require('mobiledoc-dom-renderer').default;
const common = require('../../common');
const atoms = require('../atoms');
const cards = require('../cards');
const options = {
    dom: new SimpleDom.Document(),
    cards: cards,
    atoms: atoms,
    unknownCardHandler: function (args) {
        common.logging.error(new common.errors.InternalServerError({
            message: 'Mobiledoc card \'' + args.env.name + '\' not found.'
        }));
    }
};

<<<<<<< HEAD
=======
const walkDom = function (node, func) {
    func(node);
    node = node.firstChild;

    while (node) {
        walkDom(node, func);
        node = node.nextSibling;
    }
};

const nodeTextContent = function (node) {
    let textContent = '';

    walkDom(node, (node) => {
        if (node.nodeType === 3) {
            textContent += node.nodeValue;
        }
    });

    return textContent;
};

>>>>>>> newversion/master
// used to walk the rendered SimpleDOM output and modify elements before
// serializing to HTML. Saves having a large HTML parsing dependency such as
// jsdom that may break on malformed HTML in MD or HTML cards
class DomModifier {
    constructor() {
        this.usedIds = [];
    }

    addHeadingId(node) {
        if (!node.firstChild || node.getAttribute('id')) {
            return;
        }

<<<<<<< HEAD
        let text = this.getTextValue(node);
=======
        let text = nodeTextContent(node);
>>>>>>> newversion/master
        let id = text
            .replace(/[<>&"?]/g, '')
            .trim()
            .replace(/[^\w]/g, '-')
            .replace(/-{2,}/g, '-')
            .toLowerCase();

        if (this.usedIds[id] !== undefined) {
            this.usedIds[id] += 1;
            id += `-${this.usedIds[id]}`;
        } else {
            this.usedIds[id] = 0;
        }

        node.setAttribute('id', id);
    }

<<<<<<< HEAD
    // extract to util?
    getTextValue(node) {
        let buffer = '';
        let next = node.firstChild;
        while (next !== null) {
            buffer += this._extractTextValue(next);
            next = next.nextSibling;
        }

        return buffer;
    }

    _extractTextValue(node) {
        let buffer = '';

        if (node.nodeType === 3) {
            buffer += node.nodeValue;
        }

        buffer += this.getTextValue(node);

        return buffer;
    }

    modifyChildren(node) {
        let next = node.firstChild;
        while (next !== null) {
            this.modify(next);
            next = next.nextSibling;
        }
=======
    modifyChildren(node) {
        walkDom(node, this.modify.bind(this));
>>>>>>> newversion/master
    }

    modify(node) {
        // add id attributes to H* tags
        if (node.nodeType === 1 && node.nodeName.match(/^h\d$/i)) {
            this.addHeadingId(node);
        }
<<<<<<< HEAD

        this.modifyChildren(node);
=======
>>>>>>> newversion/master
    }
}

module.exports = {
    render(mobiledoc, version) {
        /**
         * @deprecated: version 1 === Ghost 1.0 markdown-only mobiledoc
         *              We keep the version 1 logic till Ghost 3.0 to be able to rollback posts.
         *
         * version 2 (latest) === Ghost 2.0 full mobiledoc
         */
        version = version || 2;

<<<<<<< HEAD
        let versionedOptions = Object.assign({}, options, {
            cardOptions: {version}
        });

        let renderer = new Renderer(versionedOptions);
        let rendered = renderer.render(mobiledoc);
        let serializer = new SimpleDom.HTMLSerializer(SimpleDom.voidMap);

        // Koenig keeps a blank paragraph at the end of a doc but we want to
        // make sure it doesn't get rendered
        let lastChild = rendered.result.lastChild;
        if (lastChild && lastChild.tagName === 'P' && !lastChild.firstChild) {
            rendered.result.removeChild(lastChild);
=======
        const versionedOptions = Object.assign({}, options, {
            cardOptions: {version}
        });

        const renderer = new Renderer(versionedOptions);
        const rendered = renderer.render(mobiledoc);
        const serializer = new SimpleDom.HTMLSerializer(SimpleDom.voidMap);

        // Koenig keeps a blank paragraph at the end of a doc but we want to
        // make sure it doesn't get rendered
        const lastChild = rendered.result.lastChild;
        if (lastChild && lastChild.tagName === 'P') {
            if (!nodeTextContent(lastChild)) {
                rendered.result.removeChild(lastChild);
            }
>>>>>>> newversion/master
        }

        // Walk the DOM output and modify nodes as needed
        // eg. to add ID attributes to heading elements
<<<<<<< HEAD
        let modifier = new DomModifier();
=======
        const modifier = new DomModifier();
>>>>>>> newversion/master
        modifier.modifyChildren(rendered.result);

        return serializer.serializeChildren(rendered.result);
    },

    blankStructure() {
        return {
            version: '0.3.1',
            markups: [],
            atoms: [],
            cards: [],
            sections: [
                [1, 'p', [
                    [0, [], 0, '']
                ]]
            ]
        };
    }
};
