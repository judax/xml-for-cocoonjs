/**
 * @namespace documentFragment
 * @class documentFragment
 */
function documentFragment() {
    Node.call(this);
    this.nodeName = "#document-fragment";
    this.nodeType = 11;
    this.attributes = null;
}

documentFragment.prototype = Object.create(Document.prototype);
documentFragment.prototype.constructor = Document;

Object.defineProperty(documentFragment.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(documentFragment.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(documentFragment.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(documentFragment.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(documentFragment.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});