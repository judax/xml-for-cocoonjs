/**
 * @namespace NamedNodeMap
 * @class NamedNodeMap
 */

function NamedNodeMap()
{
    this.nodes = new Array();
    /**
     * Retrieves a node specified by name. 
     * @method NamedNodeMap.getNamedItem
     * @param {string} name The nodeName of a node to retrieve.
     * @returns {Node} A Node (of any type) with the specified nodeName, 
     *                 or null if it does not identify any node in this map.
     */
    this.nodes.getNamedItem = function(name) {
        var result = null;
        for (var i = 0; !result && i < this.length; i += 1) {
            if (this[i].nodeName === name) {
                result = this[i];
            }
        }
        return result;
    };
    /**
     * Retrieves a node specified by local name and namespace URI.
     * @method NamedNodeMap.getNamedItemNS
     * @param {string} namespaceURI The namespace URI of the node to retrieve.
     * @param {string} localName  The local name of the node to retrieve.
     * @returns {Node} A Node (of any type) with the specified nodeName, 
     *                 or null if it does not identify any node in this map.
     */
    this.nodes.getNamedItemNS = function(namespaceURI, localName) {
        var result = null;
        for (var i = 0; i < this.length; i += 1) {
            if (this[i].localName === localName && this[i].namespaceURI === namespaceURI) {
                result = this[i];
            }
        }
        return result;
    };
    /**
     * Adds a node using its nodeName attribute.
     * @method NamedNodeMap.setNamedItem
     * @param {type} node
     * @returns {Node | null} Node If the new Node replaces an existing node
     *                             the replaced Node is returned, otherwise null is returned.
     */
    this.nodes.setNamedItem = function(node) {
        if (this.length >= 1) {
            if (node.ownerDocument !== this[0].ownerDocument) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            } else {
                if (node.ownerElement !== this[0].ownerElement) {
                    throw new DOMException("INUSE_ATTRIBUTE_ERR");
                } else {
                    for (var i = 0; i < this.length; i += 1) {
                        if (this[i].nodeName === node.nodeName) {
                            var temp = this[i];
                            this[i] = node;
                            return temp;
                        }
                    }
                    this.push(node);
                }
            }
        } else {
            this.push(node);
        }
        return null;
    };
    /**
     * Adds a node using its nodeName attribute.
     * @method NamedNodeMap.setNamedItemNS
     * @param {type} node
     * @returns {Node | null} Node If the new Node replaces an existing node
     *                             the replaced Node is returned, otherwise null is returned.
     */
    this.nodes.setNamedItemNS = function(node) {
        if (this.length >= 1) {
            if (node.ownerDocument !== this[0].ownerDocument) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            } else {
                if (node.ownerElement !== this[0].ownerElement) {
                    throw new DOMException("INUSE_ATTRIBUTE_ERR");
                } else {
                    for (var i = 0; i < this.length; i += 1) {
                        if (this[i].localName === node.localName &&
                                this[i].namespaceURI === node.namespaceURI) {
                            var temp = this[i];
                            this[i] = node;
                            return temp;
                        }
                    }
                }
            }
        } else {
            this.push(node);
        }
        return null;
    };
    /**
     * Returns an item (node) from the list
     * @method NamedNodeMap.item
     * @param {number} index
     * @returns {Node}
     * @public
     */
    this.nodes.item = function(index) {
        if (index < this.length && index > -1) {
            return this[index];
        } else {
            return null;
        }
    };
    /**
     * Removes a node specified by local name and namespace URI.
     * @method NamedNodeMap.removeNamedItem
     * @param {string} name The nodeName of the node to remove.
     * @returns {Node} The node removed from this map if a node with such
     *                 a local name and namespace URI exists.
     */
    this.nodes.removeNamedItem = function(name) {
        for (var i = 0; i < this.length; i += 1) {
            if (this[i].nodeName === name) {
                return this.splice(i, 1);
            }
        }
    };
    /**
     * Removes a node specified by local name and namespace URI.
     * @method NamedNodeMap.removeNamedItemNS
     * @param {string} namespaceURI The namespace URI of the node to retrieve.
     * @param {string} localName  The local name of the node to retrieve.
     * @returns {Node} The node removed from this map if a node with such
     *                 a local name and namespace URI exists.
     */
    this.nodes.removeNamedItemNS = function(namespaceURI, localName) {
        for (var i = 0; i < this.length; i += 1) {
            if (this[i].localName === localName && this[i].namespaceURI === namespaceURI) {
                return this.splice(i, 1);
            }
        }
    };

    return this.nodes;
}

NamedNodeMap.prototype = Object.create(NamedNodeMap.prototype);
NamedNodeMap.prototype.constructor = NamedNodeMap;