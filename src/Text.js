/**
 * @class Text
 * @param {string} string The content of the node
 * @param {XmlElement} parentNode The parent of this node
 */
function Text(string, parentNode) {
    this.data = string;
    this.name = "#text";
    this.attributes = null;
    this.parentNode = parentNode;
    if (this.parentNode.nodeType !== 1) {
        this.parentElement = null;
    } else {
        this.parentElement = parentNode;
    }
    this.nodeType = 3;
}

Text.prototype = Object.create(Text.prototype);
Text.prototype.constructor = Text;

/**
 * The nodeName of the Text
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(Text.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the Attr
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(Text.prototype, "nodeValue", {
    get: function() {
        return this.data;
    }
});