/**
 * @namespace Node
 * @class Node
 */
function Node()
{
    this.nodeName = null;
    this.nodeValue = null;
    this.nodeType = 0;
    this.parentNode = null;
    this.childNodes = new NodeList();
    this.attributes = null;
    this.namespaceURI = null;
    this.prefix = null;
    this.localName = null;
}

Node.prototype = {
    //NodeType
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12,
    /**
     * Traverses the childNode's trees searching if node is a part of it
     *  and, if so, removes it.
     * @param {Node} node The node to search for
     * @private
     */
    _removeFromTree: function(node) {
        for (var i = 0; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i] === node) {
                Node.prototype.removeChild.call(this, node);
            } else {
                Node.prototype._removeFromTree.call(this.childNodes[i], node);
            }
        }
    },
    /**
     * Adds the node newChild to the end of the list of children of this node. 
     *  If the newChild is already in the tree, it is first removed.
     * @method Node.appendChild
     * @param {Node | DocumentFragment} node  The node to add
     * @returns {Node} The node added
     * @public
     */
    appendChild: function(node) {
        Node.prototype._removeFromTree.call(this, node);
        if (node.nodeType === 11) {
            //For DocumentFragment, all of its children are added.
            for (var k = 0; k < node.childNodes.length; k += 1) {
                node.childNodes[k].parentNode = this;
                this.childNodes.push(node.childNodes[k]);
            }
        } else {
            node.parentNode = this;
            this.childNodes.push(node);
        }
        return node;
    },
    /**
     * The node immediately preceding this node.
     * If there is no such node, this returns null.
     * @method Node._previousSibling
     * @returns {Node | null} Previous sibling or null
     * @private
     */
    _previousSibling: function() {
        if (this.parentNode !== null && this.parentNode.childNodes.length > 0) {
            for (var i = 0; i < this.parentNode.childNodes.length; i += 1) {
                if (this.parentNode.childNodes[i] === this &&
                        i !== 0) {
                    return this.parentNode.childNodes[i - 1];
                }
            }
        }
        return null;
    },
    /**
     * Returns node immediately following this node. 
     * If there is no such node, this returns null.
     * @method Node._nextSibling
     * @returns {Node | null} Next sibling or null
     * @private
     */
    _nextSibling: function() {
        if (this.parentNode !== null && this.parentNode.childNodes.length > 0) {
            for (var i = 0; i < this.parentNode.childNodes.length; i += 1) {
                if (this.parentNode.childNodes[i] === this &&
                        i + 1 < this.parentNode.childNodes.length) {
                    return this.parentNode.childNodes[i + 1];
                }
            }
        }
        return null;
    },
    /**
     * Returns the first node of this node's childNodes 
     * If there is no such node, this returns null.
     * @method Node._firstChild
     * @returns {Node | null} firstChild or null
     * @private
     */
    _firstChild: function() {
        if (this.childNodes.length > 0) {
            return this.childNodes[0];
        } else {
            return null;
        }
    },
    /**
     * Returns the last node of this node's childNodes 
     * If there is no such node, this returns null.
     * @method Node._lastChild
     * @returns {Node | null} firstChild or null
     * @private
     */
    _lastChild: function() {
        if (this.childNodes.length > 0) {
            return this.childNodes[this.childNodes.length - 1];
        } else {
            return null;
        }
    },
    /**
     * Returns the ownerDocument, if it is set
     * Otherwise, this returns null.
     * @method Node._ownerDocument
     * @returns {Node | null} ownerDocument or null
     * @private
     */
    _ownerDocument: function() {
        if (this.parentNode !== null) {
            if (this.parentNode.nodeType === 9) {
                return this.parentNode;
            } else {
                return this.parentNode.ownerDocument;
            }
        } else {
            return null;
        }
    },
    /**
     * Inserts the node newChild before the existing child node refChild.
     * @method Node.insertBefore
     * @param {Node} newChild The node to insert
     * @param {Node} refChild The reference node
     * @returns {Node} The node being inserted
     * @public
     */
    insertBefore: function(newChild, refChild) {

        var childFound = false, i = 0;

        //If newChild has a different ownerDocument, throw an exception
        if (newChild.ownerDocument !== this.ownerDocument) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }

        //If refChild is null, insert newChild at the end of the list of children.
        if (refChild === null) {
            newChild.parentNode = this;
            this.childNodes.push(newChild);
            return newChild;
        }

        //Search the childNodes for the refChild
        for (; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i] === refChild) {
                childFound = true;
            }
        }

        //If refChild is not found, throw an exception
        if (!childFound) {
            throw new DOMException("NOT_FOUND_ERR");
        }

        //If the newChild is already in the tree, it is first removed.
        Node.prototype._removeFromTree.call(this, newChild);

        if (newChild.nodeType === 11) {
            //For DocumentFragment, all of its children are inserted before refChild.
            for (var k = 0; k < newChild.childNodes.length; k += 1) {
                newChild.childNodes[k].parentNode = this;
                if (i === 0 && k === 0) {
                    this.childNodes.unshift(newChild.childNodes[k]);
                } else {
                    this.childNodes.splice(i - 1 + k, 0, newChild.childNodes[k]);
                }
            }
        } else {
            newChild.parentNode = this;
            if (i === 0) {
                this.childNodes.unshift(newChild);
            } else {
                this.childNodes.splice(i - 1, 0, newChild);
            }
        }

        return newChild;
    },
    /**
     * Replaces the child node oldChild with newChild in the
     *  list of children, and returns the oldChild node.
     * @method Node.replaceChild
     * @param {Node} newChild The node to insert
     * @param {Node} oldChild The reference node
     * @returns {Node} The node replaced
     * @public
     */
    replaceChild: function(newChild, oldChild) {
        var childFound = false, i = 0, removedChild = null;

        //If newChild has a different ownerDocument, throw an exception
        if (newChild.ownerDocument !== this.ownerDocument) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }

        //Search the childNodes for the oldChild
        for (; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i] === oldChild) {
                childFound = true;
            }
        }

        //If oldChild is not found, throw an exception
        if (!childFound) {
            throw new DOMException("NOT_FOUND_ERR");
        }

        //If the newChild is already in the tree, it is first removed.
        Node.prototype._removeFromTree.call(this, newChild);

        if (i === 0) {
            removedChild = this.childNodes.shift();
        } else {
            removedChild = this.childNodes.splice(i - 1, 1);
        }
        removedChild[0].parentNode = null;

        if (newChild.nodeType === 11) {
            //If newChild is a DocumentFragment object,
            // oldChild is replaced by all of the DocumentFragment children
            for (var k = 0; k < newChild.childNodes.length; k += 1) {
                newChild.childNodes[k].parentNode = this;
                this.childNodes.splice(i + k, 0, newChild.childNodes[k]);
            }
        } else {
            newChild.parentNode = this;
            if (i === 0) {
                this.childNodes.unshift(newChild);
            } else {
                this.childNodes.splice(i, 0, newChild);
            }
        }

        return removedChild[0];
    },
    /**
     * Removes the child node indicated by oldChild from the list of children, and returns it. 
     * @param {Node} oldChild The node being removed.
     * @returns {Node} The node removed.
     */
    removeChild: function(oldChild) {
        var foundNode = false, i = 0, removedNode = null;
        for (; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i] === oldChild) {
                foundNode = true;
                break;
            }
        }
        if (!foundNode) {
            //NOT_FOUND_ERR: Raised if oldChild is not a child of this node.
            throw new DOMException("NOT_FOUND_ERR");
        } else {
            removedNode = this.childNodes.splice(i, 1);
        }
        removedNode.parentNode = null;
        return removedNode;
    },
    /**
     * Returns if Node has any childNodes
     * @method Node.hasChildNodes
     * @returns {boolean} If the Node has any childNodes
     * @public
     */
    hasChildNodes: function() {
        if (this.childNodes.length > 0 && this.childNodes !== null) {
            return true;
        } else {
            return false;
        }
    },
    cloneNode: function(deep) {
        // Node cloneNode(in boolean deep);
        deep = null;
    },
    /**
     * Puts all Text nodes in the full depth of the sub-tree
     *  underneath this Node, including attribute nodes, into
     *  a "normal" form
     * @method Node.normalize
     * @public
     */
    normalize: function() {
        // void normalize();
    },
    /**
     * Tests whether the DOM implementation implements a
     *  specific feature and that feature is supported by this node. 
     * @method Node.isSupported
     * @param {string} feature The feature to test for
     * @param {string} version The version of the feature
     * @returns {boolean} Always returns true
     * @public
     */
    isSupported: function(feature, version) {
        return true;
    },
    /**
     * Returns whether this node (if it is an element) has any attributes. 
     * @method Node.hasAttributes
     * @returns {boolean} If Node has attributes
     * @public
     */
    hasAttributes: function() {
        return this.attributes !== null ? this.attributes.length > 0 : false;
    }
};

Node.prototype = Object.create(Node.prototype);
Node.prototype.constructor = Node;

Object.defineProperty(Node.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Node.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Node.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(Node.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Node.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});