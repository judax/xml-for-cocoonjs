/**
 * @class Comment
 * @param {string} string The content of the node
 * @param {XmlElement} parentNode The parent of this node
 */
function Comment(string, parentNode) {
    this.data = string;
    this.name = "#comment";
    this.attributes = null;
    this.parentNode = parentNode;
    if (this.parentNode.nodeType !== 1) {
        this.parentElement = null;
    } else {
        this.parentElement = parentNode;
    }
    this.nodeType = 8;
}

Comment.prototype = Object.create(Comment.prototype);
Comment.prototype.constructor = Comment;

/**
 * The nodeName of the Comment
 *
 * @property nodeName
 * @type String
 * @default false
 */
Object.defineProperty(Comment.prototype, "nodeName", {
    get: function() {
        return this.name;
    }
});

/**
 * The nodeValue of the Comment
 *
 * @property nodeValue
 * @type String
 * @default false
 */
Object.defineProperty(Comment.prototype, "nodeValue", {
    get: function() {
        return this.data;
    }
});