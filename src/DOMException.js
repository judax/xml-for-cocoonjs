/**
 * @namespace DOMException
 * @class DOMException
 * @param {string}  errorCode The error code to invoke
 */
function DOMException(errorCode) {

    var exceptions = {
        //DOM Core Level 1 Errors
        "INDEX_SIZE_ERR": 1,
        "DOMSTRING_SIZE_ERR": 2,
        "HIERARCHY_REQUEST_ERR": 3,
        "WRONG_DOCUMENT_ERR": 4,
        "INVALID_CHARACTER_ERR": 5,
        "NO_DATA_ALLOWED_ERR": 6,
        "NO_MODIFICATION_ALLOWED_ERR": 7,
        "NOT_FOUND_ERR": 8,
        "NOT_SUPPORTED_ERR": 9,
        "INUSE_ATTRIBUTE_ERR": 10,
        //DOM Core Level 2 Errors
        "INVALID_STATE_ERR": 11,
        "SYNTAX_ERR": 12,
        "INVALID_MODIFICATION_ERR": 13,
        "NAMESPACE_ERR": 14,
        "INVALID_ACCESS_ERR": 15
    };

    var messages = {
        1: "Index or size is negative, or greater than the allowed value.",
        2: "The specified range of text does not fit into a DOMString.",
        3: "Node is inserted somewhere it does not belong.",
        4: "Node is used in a different document than the one that created it.",
        5: "Invalid or illegal character is specified, such as in a name.",
        6: "Data is specified for a node which does not support data.",
        7: "An attempt is made to modify an object where modifications are not allowed.",
        8: "An attempt is made to reference a node in a context where it does not exist.",
        9: "The implementation does not support the requested type of object or operation.",
        10: "An attempt is made to add an attribute that is already in use elsewhere.",
        11: "An attempt is made to use an object that is not, or is no longer, usable.",
        12: "An invalid or illegal string is specified.",
        13: "An attempt is made to modify the type of the underlying object.",
        14: "An attempt is made to create or change an object in a way which is incorrect with regard to namespaces.",
        15: "A parameter or an operation is not supported by the underlying object."
    };

    this.name = errorCode;
    this.message = messages[exceptions[errorCode]];
}

DOMException.prototype = Object.create(Error.prototype);
DOMException.prototype.constructor = DOMException;