/**
 * @class ProcessingInstruction
 * @param {XmlElement} target The target XmlElement
 * @param {string}  data  The data
 * @param {XmlElement} parentNode The parent of this node
 */
function ProcessingInstruction(target, data, parentNode) {
    this.target = target;
    this.data = data;
    this.name = target;
    this.attributes = null;
    this.parentNode = parentNode;
    if (this.parentNode.nodeType !== 1) {
        this.parentElement = null;
    } else {
        this.parentElement = parentNode;
    }
}

ProcessingInstruction.prototype = Object.create(ProcessingInstruction.prototype);
ProcessingInstruction.prototype.constructor = ProcessingInstruction;

/**
 * The nodeName of the ProcessingInstruction
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(ProcessingInstruction.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the ProcessingInstruction
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(ProcessingInstruction.prototype, "nodeValue", {
    get: function() {
        return this.data;
    }
});