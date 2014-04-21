/**
 * @class DocumentFragment
 */
function DocumentFragment() {
    this.name = "#document-fragment";
    this.nodeType = 11;
    this.attributes = null;
    Document.call(this);
}

DocumentFragment.prototype = Object.create(DocumentFragment.prototype);
DocumentFragment.prototype.constructor = Document;

/**
 * The nodeName of the DocumentFragment
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(DocumentFragment.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the DocumentFragment
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(DocumentFragment.prototype, "nodeValue", {
    get: function() {
        return null;
    }
});