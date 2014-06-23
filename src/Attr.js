/**
 * @class Attr
 * @param {string} name The name of the attribute
 */
function Attr(name) {
    Node.call(this);
    this.nodeName = name;
    this.specified = true;
    this.nodeType = 2;
    this.attributes = null;
}

Attr.prototype = {
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
     * Returns if Node has any childNodes
     * @method Node.hasChildNodes
     * @returns {boolean} If the Node has any childNodes
     * @public
     */
    hasChildNodes: function() {
        return Node.prototype.hasChildNodes.call(this);
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

Attr.prototype = Object.create(Attr.prototype);
Attr.prototype.constructor = Attr;

Object.defineProperty(Attr.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Attr.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Attr.prototype, 'nextSibling', {
    get: function() {
       return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(Attr.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Attr.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});
