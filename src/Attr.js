/**
 * @class Attr
 * @param {string} name The name of the attribute
 * @param {string} value The value of the attribute
 * @param {XmlElement}  ownerElement  The owner of this attribute
 */
function Attr(name, value, ownerElement) {
    this.name = name;
    this.value = value;
    this.ownerElement = ownerElement;
    this.attributes = null;
    this.specified = true;
    this.nodeType = 2;
}

Attr.prototype = Object.create(Attr.prototype);
Attr.prototype.constructor = Attr;

/**
 * The nodeName of the Attr
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(Attr.prototype, "nodeName", {
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
Object.defineProperty(Attr.prototype, "nodeValue", {
    get: function() {
        return this.value;
    }
});