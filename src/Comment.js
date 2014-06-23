/**
 * @class Comment
 * @param {string} string The content of the node
 */
function Comment(string) {
    Node.call(this);
    this.nodeValue = string;
    this.nodeName = "#comment";
    this.attributes = null;
    this.nodeType = 8;
}

Comment.prototype = {
    /**
     * Adds a node to the list of childNodes
     * @method Comment.appendChild
     * @param {Node | DocumentFragment} node  The node to add
     * @public
     */
    appendChild: function(node) {
        throw new DOMException("HIERARCHY_REQUEST_ERR");
    },
    /**
     * Removes a node from the list of childNodes
     * @method Comment.removeChild
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

Comment.prototype = Object.create(Comment.prototype);
Comment.prototype.constructor = Comment;

/**
 * The parentElement of the Comment
 *
 * @property parentElement
 * @type Node | null
 * @default false
 */
Object.defineProperty(Comment.prototype, "parentElement", {
    get: function() {
        if (this.parentNode.nodeType !== 1) {
            return null;
        } else {
            return this.parentNode;
        }
    }
});

Object.defineProperty(Comment.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Comment.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Comment.prototype, 'nextSibling', {
    get: function() {
       return Node.prototype._nextSibling.call(this);
    }
});

OObject.defineProperty(Comment.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Comment.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});