/**
 * @class ProcessingInstruction
 * @param {XmlElement} target The target Node
 * @param {string}  data  The data
 */
function ProcessingInstruction(target, data) {
    Node.call(this);
    this.nodeName = target;
    this.nodeValue = data;
    this.attributes = null;
}

ProcessingInstruction.prototype = Object.create(ProcessingInstruction.prototype);
ProcessingInstruction.prototype.constructor = ProcessingInstruction;

Object.defineProperty(ProcessingInstruction.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(ProcessingInstruction.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(ProcessingInstruction.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(ProcessingInstruction.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});