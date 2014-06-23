/**
 * @class DOMImplementation
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
    /**
     * Creates a new Document
     * @method DOMImplementation.createDocument
     * @param {string} namespaceURI The namespace URI of the document element to create.
     * @param {string} qualifiedName The qualified name of the document element to be created.
     * @param {DocumentType} docType The type of document to be created or null.
     * @public
     */
    createDocument: function(namespaceURI, qualifiedName, doctype) {
        /*
         * 
         * When doctype is not null, 
         * its Node.ownerDocument attribute is set to the document being created.
         * 
         * DOMExceptions
         INVALID_CHARACTER_ERR:
         NAMESPACE_ERR: Raised if the qualifiedName is malformed,
         if the qualifiedName has a prefix and the namespaceURI is null,
         or if the qualifiedName has a prefix that is "xml"
         and the namespaceURI is different from "http://www.w3.org/XML/1998/namespace" [Namespaces].
         WRONG_DOCUMENT_ERR: Raised if doctype has already been used with a different
         document or was created from a different implementation.
         */

        return new Document();
    },
    /**
     * Checks for features (always returns true for non-null values)
     * @method DOMImplementation.hasFeature
     * @param {string} name  The name to test for
     * @param {string} value The value to test for
     * @returns {boolean} Always returns true for non-null values
     * @public
     */
    hasFeature: function(name, value) {
        if (name !== null && value !== null) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Create a new document type
     * @method DOMImplementation.createDocumentType
     * @param {string} qualifiedName The qualified name of the document type to be created.
     * @param {string} publicId The external subset public identifier.
     * @param {string} systemId The external subset system identifier.
     * @returns {DocumentType} Always returns true
     * @public
     */
    createDocumentType: function(qualifiedName, publicId, systemId) {
        /*
         *  DocumentType       createDocumentType(in DOMString qualifiedName, 
         in DOMString publicId, 
         in DOMString systemId)
         raises(DOMException);
         */
        /*
         * DOMException
         INVALID_CHARACTER_ERR: Raised if the specified qualified name 
         contains an illegal character.
         NAMESPACE_ERR: Raised if the qualifiedName is malformed.
         */
        // return A new DocumentType node with Node.ownerDocument set to null.
    }



};

DOMImplementation.prototype = Object.create(DOMImplementation.prototype);
DOMImplementation.prototype.constructor = DOMImplementation;