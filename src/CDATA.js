/**
 * @class CDATASection
 * @param {string} string The content of the node
 */
function CDATASection(string) {
    Node.call(this);
    this.nodeValue = string;
    this.nodeName = "#cdata-section";
    this.attributes = null;
    this.nodeType = 4;
}

CDATASection.prototype = {
    /**
     * Adds a node to the list of childNodes
     * @method CDATASection.appendChild
     * @param {Node | DocumentFragment} node  The node to add
     * @public
     */
    appendChild: function(node) {
        throw new DOMException("HIERARCHY_REQUEST_ERR");
    },
    /**
     * Removes a node from the list of childNodes
     * @method CDATASection.removeChild
     * @param {Node} node  The node to remove
     * @public
     */
    removeChild: function(node) {
        throw new DOMException("HIERARCHY_REQUEST_ERR");
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
};

CDATASection.prototype = Object.create(CDATASection.prototype);
CDATASection.prototype.constructor = CDATASection;

/**
 * The parentElement of the CDATASection
 *
 * @property parentElement
 * @type Node | null
 * @default false
 */
Object.defineProperty(CDATASection.prototype, "parentElement", {
    get: function() {
        if (this.parentNode.nodeType !== 1) {
            return null;
        } else {
            return this.parentNode;
        }
    }
});

Object.defineProperty(CDATASection.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(CDATASection.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(CDATASection.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(CDATASection.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(CDATASection.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});