/**
 * @class Document
 * @param xml A string representing the XML to be parsed 
 */
function Document(xml) {

    this.attributes = null;
    this.implementation = new DOMImplementation();

    if (xml)
    {
        xml = xml.toString().trim();
        var parser = SAX.parser(true, {xmlns: true});
        parser.onopentag = function() {
            delegates[0]._opentag.apply(delegates[0], arguments);
        };
        parser.onclosetag = function() {
            delegates[0]._closetag.apply(delegates[0], arguments);
        };
        parser.ontext = function() {
            delegates[0]._text.apply(delegates[0], arguments);
        };
        parser.oncdata = function() {
            delegates[0]._cdata.apply(delegates[0], arguments);
        };
        parser.oncomment = function() {
            delegates[0]._comment.apply(delegates[0], arguments);
        };

        delegates = [this];

        parser.write(xml);
    }
}

Document.prototype = {
    /** 
     * Function called for each opening tag found
     * Pushes a new child node, sets first/lastChild, and adds the tag to the working stack
     * @method Document._opentag
     * @param {object} tag An object containing as its own properties those to be applied
     * @private
     */
    _opentag: function(tag) {

        if (typeof this.documentElement === 'undefined')
        {
            this.ownerDocument = null;
            this.name = "#document";
            this.nodeType = 9;
            this.val = null;
            this.documentElement = new Element(tag);
            this.firstChild = this.documentElement;
            this.lastChild = this.documentElement;
            this.parentNode = null;
        }
        else
        {
            tag.ownerDocument = this;
            Element.prototype._opentag.apply(this.documentElement, arguments);
        }
    },
    /**
     * Function called for each closing tag found 
     * Takes the last tag off the stack
     * @method Document._closetag
     * @private
     */
    _closetag: function() {
        delegates.shift();
        this.children = [this.documentElement];
    },
    /**
     * Creates and pushes a new Text node to the children array
     * Will not accept text that is purely whitespace only
     * @method Document._text
     * @param {string} text The text to be used for creation of a Text node
     * @private
     */
    _text: function(text) {
        Element.prototype._text.apply(this.documentElement, text);
    },
    /**
     * Creates and pushes a new ProcessingInstruction node to the children array
     * @method Document._processingInstruction
     * @param {string} text The text to be used for creation of a ProcessingInstruction node
     * @private
     */
    _processingInstruction: function(text) {
        Element.prototype._processingInstruction.apply(this.documentElement, text);
    },
    /**
     * Creates and pushes a new Comment node to the children array
     * @method Document._comment
     * @param {string} comment The comment to be used for creation of a Comment node
     * @private
     */
    _comment: function(comment) {
        Element.prototype._comment.apply(this.documentElement, comment);
    },
    /**
     * Creates and pushes a new CDATA node to the children array
     * @method Document._cdata
     * @param {string} cdata The text to be used for creation of a CDATA node
     * @private
     */
    _cdata: function(cdata) {
        Element.prototype._cdata.apply(this.documentElement, cdata);
    },
    /**
     * Retrieves an array matching the name specified.
     * Will return all children with "*"
     * @method Document.getElementsByTagName
     * @param {string} name The tag name to search for
     * @returns {Array} An array containing any matches
     * @public
     */
    getElementsByTagName: function(name) {
        var results = [];
        var r;

        for (var i = 0; i < this.children.length; i += 1) {
            if (this.children[i].name === name || name === "*") {
                results.push(this.children[i]);
            }
            if (!!this.children[i].children && this.children[i].children.length > 0) {
                if ((r = this.children[i].getElementsByTagName(name))) {
                    results = results.concat(r);
                }
            }
        }
        return results;
    },
    /**
     * Retrieves an array matching the attribute of name specified.
     * @method Document.getElementsByName
     * @param {string} name The attribute of name to search for
     * @returns {Array} An array containing any matches
     * @public
     */
    getElementsByName: function(name) {
        var results = [];
        var r;

        for (var i = 0; i < this.children.length; i += 1) {
            if ((name && this.children[i].attr["name"] === name) ||
                    (!name && this.children[i].attr["name"])) {
                results.push(this.children[i]);
            }
            if (!!this.children[i].children && this.children[i].children.length > 0) {
                if ((r = this.children[i].getElementsByName(name))) {
                    results = results.concat(r);
                }
            }
        }
        return results;
    },
    /**
     * Creates a Element node of tag name and returns it
     * @method Document.createElement
     * @param {string} name The name of the element to create
     * @returns {Element}  A new Element of name
     * @public
     */
    createElement: function(name) {
        return new Element({name: name, ownerDocument: this, parentNode: null});
    },
    /**
     * Returns if Document has any children
     * @method Document.hasChildNodes
     * @returns {boolean} If the Document has any children
     * @public
     */
    hasChildNodes: function() {
        if (this.children.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Adds a node to the list of children
     * @method Document.appendChild
     * @param {Element} node  The Element to add
     * @public
     */
    appendChild: function(node) {
        if (node instanceof Element) {
            node.parentNode = this;
            this.children.push(node);
            this.firstChild = this.children[0];
            this.lastChild = this.children[this.children.length];
        }
    },
    /**
     * Creates a new Text node with content
     * @method Document.createTextNode
     * @param {string} content  The content of the Text Node
     * @returns {Text}  A new Text node
     * @public
     */
    createTextNode: function(content) {
        return new Text(content, this);
    },
    /**
     * Creates a new Comment node with content
     * @method Document.createComment
     * @param {string} content  The content of the Comment Node
     * @returns {Comment} A new Comment node
     * @public
     */
    createComment: function(content) {
        return new Comment(content, this);
    },
    /**
     * Creates a new CDATA node with content
     * @method Document.createCDATASection
     * @param {string} content  The content of the CDATA Node
     * @returns {CDATA} A new CDATA node
     * @public
     */
    createCDATASection: function(content) {
        return new CDATA(content, this);
    },
    /**
     * Creates a new ProcessingInstruction node with target and node
     * @method Document.createProcessingInstruction
     * @param {Element} target  The target
     * @param {Element} node The node to process
     * @returns {ProcessingInstruction} A new ProcessingInstruction node
     * @public
     */
    createProcessingInstruction: function(target, node) {
        return new ProcessingInstruction(target, node, this);
    },
    /**
     * Creates a new DocumentFragment node
     * @method Document.createDocumentFragment
     * @returns {DocumentFragment} A new DocumentFragment node
     * @public
     */
    createDocumentFragment: function() {
        return new DocumentFragment();
    }
};

Document.prototype = Object.create(Document.prototype);
Document.prototype.constructor = Document;

/**
 * The nodeName of the Document
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(Document.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the Document
 *
 * @property nodeValue
 * @type null
 * @default false
 */
Object.defineProperty(Document.prototype, "nodeValue", {
    get: function() {
        return null;
    }
});

/**
 * The childNodes of the Document
 *
 * @property childNodes
 * @type Array
 * @default false
 */
Object.defineProperty(Document.prototype, "childNodes", {
    get: function() {
        return this.children;
    }
});

/**
 * The tagName of the Document
 *
 * @property tagName
 * @type String
 * @default ""
 */
Object.defineProperty(Document.prototype, "tagName", {
    get: function() {
        return this.name;
    },
    set: function(n) {
        this.name = n;
    }
});