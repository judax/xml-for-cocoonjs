/**
 * @class DOMImplementation
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
    /**
     * Creates a new XmlDocument
     * @method DOMImplementation.createDocument
     * @public
     */
    createDocument: function() {
        return new Document();
    },
    /**
     * Checks for features (always returns true)
     * @method DOMImplementation.hasFeature
     * @param {string}  name  The name to test for
     * @param {string} value The value to test for
     * @returns {boolean} Always returns true
     * @public
     */
    hasFeature: function(name, value) {
        if (name !== null && value !== null) {
            return true;
        }
    }
};

DOMImplementation.prototype = Object.create(DOMImplementation.prototype);
DOMImplementation.prototype.constructor = DOMImplementation;