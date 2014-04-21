/**
 * @class CDATA
 * @param {string} string The content of the node
 * @param {XmlElement} parentNode The parent of this node
 */
function CDATA(string, parentNode) {
    this.data = string;
    this.name = "#cdata-section";
    this.attributes = null;
    this.parentNode = parentNode;
    if (this.parentNode.nodeType !== 1) {
        this.parentElement = null;
    } else {
        this.parentElement = parentNode;
    }
    this.nodeType = 4;
}

CDATA.prototype = Object.create(CDATA.prototype);
CDATA.prototype.constructor = CDATA;

/**
 * The nodeName of the CDATA
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(CDATA.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the CDATA
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(CDATA.prototype, "nodeValue", {
    get: function() {
        return this.data;
    }
});