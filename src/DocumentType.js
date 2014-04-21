/**
 * @namespace DocumentType 
 */

function DocumentType() {
    this.name = ""; //DOMString
    this.entities = new NamedNodeMap();
    this.notations = new NamedNodeMap();
    this.publicId = ""; //DOMString
    this.systemId = ""; //DOMString
    this.internalSubset = ""; //DOMString
    Node.call(this); //Bind as a "node"
}

DocumentType.prototype = Object.create(DocumentType.prototype);
DocumentType.prototype.constructor = DocumentType;