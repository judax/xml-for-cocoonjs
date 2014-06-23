/**
 * @class Notation
 * @param {string} publicId
 * @param {string} systemId
 */
function Notation(publicId, systemId) {
    Node.call(this);
    this.nodeName = "notationName";
    this.attributes = null;
    this.publicId = publicId;
    this.systemId = systemId;
}

Notation.prototype = {
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

Notation.prototype = Object.create(Notation.prototype);
Notation.prototype.constructor = Notation;
