/**
 * @namespace Document
 * @class Document
 * @param xml A string representing the XML to be parsed
 */
function Document(xml) {

    this.doctype = null;
    this.implementation = new DOMImplementation();
    this.documentElement = null;

    Node.call(this);
    this.attributes = null;
    this.nodeName = "#document";
    this.nodeType = 9;

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
        var self = this;
        parser.ondoctype = function(doctype) {
            var doctypeList = doctype.split(" ");
            var name = "", publicId = "", systemId = "", idList = [];
            //Was there a name listed?
            if (doctypeList.length > 1) {
                name = doctypeList[1];
            }
            idList = doctype.match(/"((?:.|\n)*?)"/g);
            //Was there a publicId?
            if (idList.length > 1) {
                publicId = idList[0];
                //Was there a systemId?
                if (idList.length >= 2) {
                    systemId = idList[1];
                }
            }
            self.doctype = new DocumentType(name, publicId, systemId);
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

        if (this.documentElement === null)
        {
            tag.parentNode = this;
            this.documentElement = new Element(tag);
        }
        else
        {
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
        this.childNodes = [this.documentElement];
    },
    /**
     * Creates and pushes a new Text node to the childNodes array
     * Will not accept text that is purely whitespace only
     * @method Document._text
     * @param {string} text The text to be used for creation of a Text node
     * @private
     */
    _text: function(text) {
        Element.prototype._text.apply(this.documentElement, text);
    },
    /**
     * Creates and pushes a new ProcessingInstruction node to the childNodes array
     * @method Document._processingInstruction
     * @param {string} text The text to be used for creation of a ProcessingInstruction node
     * @private
     */
    _processingInstruction: function(text) {
        Element.prototype._processingInstruction.apply(this.documentElement, text);
    },
    /**
     * Creates and pushes a new Comment node to the childNodes array
     * @method Document._comment
     * @param {string} comment The comment to be used for creation of a Comment node
     * @private
     */
    _comment: function(comment) {
        Element.prototype._comment.apply(this.documentElement, comment);
    },
    /**
     * Creates and pushes a new CDATA node to the childNodes array
     * @method Document._cdata
     * @param {string} cdata The text to be used for creation of a CDATA node
     * @private
     */
    _cdata: function(cdata) {
        Element.prototype._cdata.apply(this.documentElement, cdata);
    },
    /**
     * Adds the node newChild to the end of the list of children of this node. 
     *  If the newChild is already in the tree, it is first removed.
     * @method Node.appendChild
     * @param {Node | documentFragment} node  The node to add
     * @returns {Node} The node added
     * @public
     */
    appendChild: function(node) {
        return Node.prototype.appendChild.call(this, node);
    },
    /**
     * Removes the child node indicated by oldChild from the list of children, and returns it. 
     * @param {Node} oldChild The node being removed.
     * @returns {Node} The node removed.
     */
    removeChild: function(oldChild) {
        return Node.prototype.removeChild.call(this, oldChild);
    },
    /**
     * Returns whether this node (if it is an element) has any attributes. 
     * @method Node.hasAttributes
     * @returns {boolean} If Node has attributes
     * @public
     */
    hasAttributes: function() {
        return Node.prototype.hasAttributes.call(this);
    },
    /**
     * Tests whether the DOM implementation implements a
     *  specific feature and that feature is supported by this node. 
     * @method Node.isSupported
     * @param {string} feature The feature to test for
     * @param {string} version The version of the feature
     * @returns {boolean} Always returns true
     * @public
     */
    isSupported: function(feature, version) {
        return true;
    },
    /**
     * Replaces the child node oldChild with newChild in the
     *  list of children, and returns the oldChild node.
     * @method Node.replaceChild
     * @param {Node} newChild The node to insert
     * @param {Node} oldChild The reference node
     * @returns {Node} The node replaced
     * @public
     */
    replaceChild: function(newChild, oldChild) {
        return Node.prototype.replaceChild.call(this, newChild, oldChild);
    },
    /**
     * Inserts the node newChild before the existing child node refChild.
     * @method Node.insertBefore
     * @param {Node} newChild The node to insert
     * @param {Node} refChild The reference node
     * @returns {Node} The node being inserted
     * @public
     */
    insertBefore: function(newChild, refChild) {
      return Node.prototype.insertBefore.call(this, newChild, refChild);  
    },
    /**
     * Creates a Element node of tag name and returns it
     * @method Document.createElement
     * @param {string} tagName The name of the element to create
     * @returns {Element}  A new Element of name
     * @public
     */
    createElement: function(tagName) {
        return new Element({name: tagName, ownerDocument: this, parentNode: null});
    },
    /**
     * Creates a new documentFragment node
     * @method Document.createDocumentFragment
     * @returns {documentFragment} A new documentFragment node
     * @public
     */
    createDocumentFragment: function() {
        return new documentFragment();
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
     * @param {string} data The content of the CDATA Node
     * @returns {CDATA} A new CDATA node
     * @public
     */
    createCDATASection: function(data) {
        return new CDATA(data, this);
    },
    /**
     * Creates a new ProcessingInstruction node with target and node
     * @method Document.createProcessingInstruction
     * @param {Element} target The target
     * @param {Element} node The node to process
     * @returns {ProcessingInstruction} A new ProcessingInstruction node
     * @public
     */
    createProcessingInstruction: function(target, node) {
        return new ProcessingInstruction(target, node, this);
    },
    /**
     * Creates a new Attr of name
     * @method Document.createAttribute
     * @param {string} name The name of the attribute
     * @returns {Attr} A new Attr node
     * @public
     */
    createAttribute: function(name) {
        return new Attr(name, this);
    },
    /**
     * Creates a new EnityReference
     * @method Document.createEntityReference
     * @param {string} name The name of the entity reference
     * @returns {EntityReference} A new Entity Reference
     * @public
     */
    createEntityReference: function(name) {
        return new EntityReference(name, this);
    },
    /**
     * Retrieves an array of elements matching the name specified.
     * Will return all element childNodes with "*"
     * @method Document.getElementsByTagName
     * @param {string} name The tag name to search for
     * @returns {Array} An array containing any matches
     * @public
     */
    getElementsByTagName: function(name) {
        var results = [], r;

        for (var i = 0; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i].nodeType === 1) {
                if (this.childNodes[i].name === name || name === "*") {
                    results.push(this.childNodes[i]);
                }
                if (!!this.childNodes[i].childNodes && this.childNodes[i].childNodes.length > 0) {
                    if ((r = this.childNodes[i].getElementsByTagName(name))) {
                        results = results.concat(r);
                    }
                }
            }
        }
        return results;
    },
    /**
     * Import a node into a document
     * @method Document.importNode
     * @param {Node} importedNode The node to import
     * @param {boolean} deep If deep recursion should happen
     * @returns {Node} 
     * @public
     */
    importNode: function(importedNode, deep) {

    },
    /**
     * Create an element namespace
     * @method Document.createElementNS
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     * @public
     */
    createElementNS: function(namespaceURI, qualifiedName) {

    },
    /**
     * Create an attribute namespace
     * @method Document.createAttributeNS
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     * @public
     */
    createAttributeNS: function(namespaceURI, qualifiedName) {

    },
    /**
     * Get elements by namespace and name
     * @method Document.getElementsByTagNameNS
     * @param {string} namespaceURI
     * @param {string} localName
     * @returns {NodeList} An array containing any matches
     * @public
     */
    getElementsByTagNameNS: function(namespaceURI, localName) {

    },
    /**
     * Get element by id
     * @method Document.getElementById
     * @param {string} elementId
     * @returns {Element} An element
     * @public
     */
    getElementById: function(elementId) {

    }
};

Document.prototype = Object.create(Document.prototype);
Document.prototype.constructor = Document;

Object.defineProperty(Document.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Document.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Document.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(Document.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Document.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});
