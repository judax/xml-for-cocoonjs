/**
 * @namespace DocumentType
 * @class DocumentType
 * @param {string} name
 * @param {string} publicId
 * @param {string} systemId
 */

function DocumentType(name, publicId, systemId) {
    Node.call(this);
    this.nodeName = name;
    this.nodeValue = null;
    this.attributes = null;
    this.publicId = publicId; 
    this.systemId = systemId;
    this.nodeType = 10;
}

DocumentType.prototype = {
    /**
     * Adds a node to the list of childNodes
     * @method DocumentType.appendChild
     * @param {Node | DocumentFragment} node  The node to add
     * @public
     */
    appendChild: function(node) {
        throw new DOMException("HIERARCHY_REQUEST_ERR");
    }
};

DocumentType.prototype = Object.create(DocumentType.prototype);
DocumentType.prototype.constructor = DocumentType;

Object.defineProperty(DocumentType.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(DocumentType.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(DocumentType.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(DocumentType.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(DocumentType.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});