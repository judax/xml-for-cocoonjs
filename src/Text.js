/**
 * @class Text
 * @param {string} string The content of the node
 */
function Text(string) {
    Node.call(this);
    this.nodeValue = string;
    this.nodeName = "#text";
    this.attributes = null;
    this.nodeType = 3;
}

Text.prototype = {
    /**
     * Adds a node to the list of childNodes
     * @method Text.appendChild
     * @param {Node | DocumentFragment} node  The node to add
     * @public
     */
    appendChild: function(node) {
        throw new DOMException("HIERARCHY_REQUEST_ERR");
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
};

Text.prototype = Object.create(Text.prototype);
Text.prototype.constructor = Text;

/**
 * The parentElement of the Text
 *
 * @property parentElement
 * @type Node | null
 * @default false
 */
Object.defineProperty(Text.prototype, "parentElement", {
    get: function() {
        if (this.parentNode.nodeType !== 1) {
            return null;
        } else {
            return this.parentNode;
        }
    }
});

Object.defineProperty(Text.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Text.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Text.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(Text.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Text.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});