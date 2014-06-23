/**
 * @class Entity
 * @param {string} publicId
 * @param {string} systemId
 * @param {string} notationName
 */
function Entity(publicId, systemId, notationName) {
    Node.call(this);
    this.nodeName = notationName;
    this.attributes = null;
    //The public identifier associated with the entity, if specified. 
    //If the public identifier was not specified, this is null.
    this.publicId = publicId;
    //The system identifier associated with the entity, if specified. 
    //If the system identifier was not specified, this is null.
    this.systemId = systemId;
    //For unparsed entities, the name of the notation for the entity. 
    //For parsed entities, this is null.
    this.notationName = notationName;
}

Entity.prototype = {
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

Entity.prototype = Object.create(Entity.prototype);
Entity.prototype.constructor = Entity;