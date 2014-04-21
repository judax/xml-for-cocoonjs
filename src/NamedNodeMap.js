/**
 * @namespace NamedNodeMap
 */

/**
 * @class NamedNodeMap
 */

function NamedNodeMap()
{
    //readonly attribute unsigned long length;
    this.length = 0;
    this.nodes = [];
    this.ownerDocument = null;
}

NamedNodeMap.prototype = {
    getNamedItem: function(name) {
        var result = null;
        for (var i = 0; i < this.nodes.length; i += 1) {
            if (this.nodes[i].nodeName === name) {
                result = this.nodes[i];
            }
        }
        return result;
    },
    setNamedItem: function(node) {
        //Node setNamedItem(in Node arg) raises(DOMException);
        if (node.ownerDocument === this.ownerDocument) {
            node = null;
        }
        //Raised if arg was created from a different document than the one that created this map.
    },
    removeNamedItem: function(name) {
        //Node removeNamedItem(in DOMString name) raises(DOMException);
        name = null;
    },
    item: function(index) {
        //Node item(in unsigned long index);
        index = null;
    },
    getNamedItemNS: function(namespaceURI, localName) {
        //Node getNamedItemNS(in DOMString namespaceURI, in DOMString localName);
        namespaceURI = localName = null;
    },
    setNamedItemNS: function(node) {
        //Node setNamedItemNS(in Node arg) raises(DOMException);
        node = null;
    },
    removeNamedItemNS: function(namespaceURI, localName) {
        //Node removeNamedItemNS(in DOMString namespaceURI, in DOMString localName) raises(DOMException);
        namespaceURI = localName = null;
    }
};

NamedNodeMap.prototype = Object.create(NamedNodeMap.prototype);
NamedNodeMap.prototype.constructor = NamedNodeMap;

Object.defineProperty(NamedNodeMap.prototype, 'length', {
    get: function() {
        return this.length;
    }
});