/**
 * @class Element
 * @param tag An object containing as its own properties those to be applied to Element 
 */

function Element(tag) {

    this.nodeType = 1;
    this.val = "";
    this.children = [];
    this.firstChild = null;
    this.lastChild = null;

    if (tag) {

        if (tag.hasOwnProperty('name')) {
            this.name = tag.name;
        }

        if (tag.hasOwnProperty('ownerDocument')) {
            this.ownerDocument = tag.ownerDocument;
        }

        if (tag.hasOwnProperty('parentNode')) {
            this.parentNode = tag.parentNode;
        }

        if (tag.hasOwnProperty('parentNode')) {
            if (tag.parentNode !== null && tag.parentNode.nodeType === 1)
            {
                this.parentElement = tag.parentNode;
            }
        }

        if (tag.hasOwnProperty('nodeType')) {
            this.nodeType = tag.nodeType;
        }

        if (tag.hasOwnProperty('attributes')) {
            this.attr = tag.attributes;
        }
    }

    return this;
}

Element.prototype = {
    /** 
     * Function called for each opening tag found
     * Pushes a new child node, sets first/lastChild, and adds the tag to the working stack
     * @method Element._opentag
     * @param {object} tag An object containing as its own properties those to be applied to Element
     * @private
     */
    _opentag: function(tag) {

        var child = new Element(tag);

        child.parentNode = this;
        this.children.push(child);

        if (this.firstChild === null)
        {
            this.firstChild = child;
        }
        this.lastChild = child;

        delegates.unshift(child);
    },
    /**
     * Function called for each closing tag found 
     * Takes the last tag off the stack
     * @method Element._closetag
     * @private
     */
    _closetag: function() {
        delegates.shift();
    },
    /**
     * Creates and pushes a new Text node to the children array
     * Will not accept text that is purely whitespace only
     * @method Element._text
     * @param {string} text The text to be used for creation of a Text node
     * @private
     */
    _text: function(text) {
        if (text)
        {
            if (/[^\s]/.test(text)) {

                var child = new Text(text, this);

                this.children.push(child);

                if (this.firstChild === null)
                {
                    this.firstChild = child;
                }
                this.lastChild = child;
            }
        }
    },
    /**
     * Creates and pushes a new Comment node to the children array
     * @method Element._comment
     * @param {string} text The text to be used for creation of a Comment node
     * @private
     */
    _comment: function(text) {
        if (text)
        {
            var child = new Comment(text, this);

            this.children.push(child);

            if (this.firstChild === null)
            {
                this.firstChild = child;
            }
            this.lastChild = child;

        }
    },
    /**
     * Creates and pushes a new ProcessingInstruction node to the children array
     * @method Element._processingInstruction
     * @param {string} text The text to be used for creation of a ProcessingInstruction node
     * @private
     */
    _processingInstruction: function(text) {
        if (text)
        {
            var child = new ProcessingInstruction(text, this);

            this.children.push(child);

            if (this.firstChild === null)
            {
                this.firstChild = child;
            }
            this.lastChild = child;
        }
    },
    /**
     * Creates and pushes a new CDATA node to the children array
     * @method Element._cdata
     * @param {string} cdata The text to be used for creation of a CDATA node
     * @private
     */
    _cdata: function(cdata) {
        if (cdata)
        {
            var child = new CDATA(cdata, this);

            this.children.push(child);

            if (this.firstChild === null)
            {
                this.firstChild = child;
            }
            this.lastChild = child;
        }
    },
    /**
     * Retrieves an array matching the name specified.
     * Will return all children with "*"
     * @method Element.getElementsByTagName
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
     * @method Element.getElementsByName
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
     * Returns if Element has an attribute or not
     * @method Element.hasAttribute
     * @param {string} name The attribute of name to test for
     * @returns {boolean} If Element has that attribute or not
     * @public
     */
    hasAttribute: function(name) {
        if (this.attr[name]) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Returns if Element has any attributes at all or not
     * @method Element.hasAttributes
     * @returns {boolean} If Element has attributes
     * @public
     */
    hasAttributes: function() {
        var size = 0;

        for (var key in this.attr) {
            if (this.attr.hasOwnProperty(key)) {
                size += 1;
                break;
            }
        }

        if (size > 0) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Returns the value of an attribute, if it exists
     * @method Element.getAttribute
     * @param {string} name The attribute name to test for
     * @returns {*} The value, or null if it did not exist
     * @public
     */
    getAttribute: function(name) {
        if (this.attr[name]) {
            return this.attr[name].value;
        } else {
            return null;
        }
    },
    /**
     * Deletes an attribute, if it exists
     * @method Element.removeAttribute
     * @param {string} name The attribute of name to test for
     * @public
     */
    removeAttribute: function(name) {
        if (this.attr[name]) {
            delete this.attr[name];
        }
    },
    /**
     * Sets (or creates) an attribute of name to value
     * @method Element.setAttribute
     * @param {string} name The attribute of name to test for
     * @param {*} value The value to set the attribute name to
     * @public
     */
    setAttribute: function(name, value) {
        this.attr[name].value = value;
    },
    /**
     * Creates a Element node of tag name and returns it
     * @method Element.createElement
     * @param {string} name The name of the element to create
     * @returns {Element}  A new Element of name
     * @public
     */
    createElement: function(name) {
        return new Element({name: name, ownerDocument: this, parentNode: null});
    },
    /**
     * Returns if Element has any children
     * @method Element.hasChildNodes
     * @returns {boolean} If the Element has any children
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
     * @method Element.appendChild
     * @param {Element} node  The Element to add
     * @public
     */
    appendChild: function(node) {
        if (node instanceof Element) {
            this.children.push(node);
            this.firstChild = this.children[0];
            this.lastChild = this.children[this.children.length];
        }
    },
    /**
     * The previous sibling of this node
     * @method Element.previousSibling
     * @returns {Element | null} If a sibling, that node, else null
     * @public
     */
    previousSibling: function() {
        if (this.parentNode !== null && this.parentNode.children.length > 1) {
            for (var i = 0; i < this.parentNode.children.length; i += 1) {
                if (this.parentNode.children[i] === this && i !== 0) {
                    return this.parentNode.children[i - 1];
                }
            }
        }
        return null;
    },
    /**
     * The next sibling of this node
     * @method Element.nextSibling
     * @returns {Element | null} If a sibling, that node, else null
     * @public
     */
    nextSibling: function() {
        if (this.parentNode !== null && this.parentNode.children.length > 1) {
            for (var i = 0; i < this.parentNode.children.length; i += 1) {
                if (this.parentNode.children[i] === this && i + 1 < this.parentNode.children.length) {
                    return this.parentNode.children[i + 1];
                }
            }
        }
        return null;
    },
    /**
     * Returns a Attr node representing the named attribute
     * @method Element.getAttributeNode
     * @param {string}  name  The name of the attribute to return
     * @returns {Attr | null} If found, a new Attr node, else null
     * @public
     */
    getAttributeNode: function(name) {
        if (this.hasAttribute(name)) {
            return new Attr(name, this.getAttribute(name), this);
        }
        else {
            return null;
        }
    },
    /**
     * Creates an Attr node of given name and value
     * @method Element.createAttribute
     * @param {string}  name  The name of the attribute to return
     * @param {*} value The value to set the named attribute to
     * @returns {Attr | null} If a sibling, that node. Else, null
     * @public
     */
    createAttribute: function(name, value) {
        if (/^[a-zA-Z_:][a-zA-Z0-9\.\-_:]*$/.test(name)) {
            return new Attr(name, value, this);
        } else {
            //Raised if the specified name contains an invalid character.
            throw new Error("INVALID_CHARACTER_ERR");
        }
    },
    /**
     * Sets the Attr node name and value as an attribute to the current node
     * @method Element.createAttribute
     * @param {Attr}  node  The name of the attribute to return
     * @public
     */
    setAttributeNode: function(node) {
        if (node instanceof Attr) {
            if (node.ownerElement !== this) {
                //Raised if node is already an attribute of another Element object.
                throw new Error("INUSE_ATTRIBUTE_ERR");
            } else {
                if (node.ownerElement.ownerDocument !== this.ownerDocument) {
                    //Raised if node was created from a different document 
                    // than the one that created the element.
                    throw new Error("WRONG_DOCUMENT_ERR");
                } else {
                    this.setAttribute(node.name, node.value);
                }
            }
        }
    },
    /**
     * Removes and returns an Attr node, if found
     * @method Element.removeAttributeNode
     * @param {Attr}  node  The name of the attribute to return
     * @public
     */
    removeAttributeNode: function(node) {
        if (node instanceof Attr) {
            if (this.hasAttribute(node.name)) {
                var temp = this.getAttributeNode(node.name);
                this.removeAttribute(node.name);
                return temp;
            } else {
                //Raised if node is not an attribute of the element.
                throw new Error("NOT_FOUND_ERR");
            }
        }
    },
    /**
     * Removes and returns an Attr node, if found
     * @method Element.removeAttributeNode
     * @param {Node}  node  The name of the attribute to return
     * @public
     */
    insertBefore: function(node) {
        node = null;
    }
};

Element.prototype = Object.create(Element.prototype);
Element.prototype.constructor = Element;

/**
 * The nodeName of the Element
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(Element.prototype, "nodeName", {
    get: function() {
        return this.name;
    },
    set: function(name) {
        this.name = name;
    }
});

/**
 * The nodeValue of the Element
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(Element.prototype, "nodeValue", {
    get: function() {
        return this.val;
    },
    set: function(value) {
        this.val = value;
    }
});

/**
 * The childNodes of the Element
 *
 * @property childNodes
 * @type Array
 * @default false
 */
Object.defineProperty(Element.prototype, "childNodes", {
    get: function() {
        return this.children;
    }
});

/**
 * The attributes of the Element
 *
 * @property attributes
 * @type Object
 * @default false
 */
Object.defineProperty(Element.prototype, "attributes", {
    get: function() {
        return this.attr;
    }
});

/**
 * The tagName of the Element
 *
 * @property tagName
 * @type String
 * @default ""
 */
Object.defineProperty(Element.prototype, "tagName", {
    get: function() {
        return this.name;
    },
    set: function(name) {
        this.name = name;
    }
});