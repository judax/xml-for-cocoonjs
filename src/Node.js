/**
 * @namespace Node
 */

/**
 * @class Node
 */

function Node()
{
    //attribute DOMString nodeName;
    this.nodeName = ""; //DOMString
    //attribute DOMString nodeValue;
    this.nodeValue = ""; //DOMString
    //unsigned short   nodeType;
    this.nodeType = 0;
    //Node             parentNode;
    this.parentNode = null;
    //NodeList         childNodes;
    this.childNodes = new NodeList();
    //Node             firstChild;
    this.firstChild = null;
    //Node             lastChild;
    this.lastChild = null;
    //Node             previousSibling;
    this.previousSibling = null;
    //Node             nextSibling;
    this.nextSibling = null;
    //NamedNodeMap     attributes;
    this.attributes = new NamedNodeMap();
    //Document         ownerDocument;
    this.ownerDocument = null;
    //DOMString        namespaceURI;
    this.namespaceURI = "";
    //DOMString        prefix;
    this.prefix = "";
    //DOMString        localName;
    this.localName = "";
}

Node.prototype = {
    insertBefore: function(newChild, refChild) {
        // Node insertBefore(in Node newChild, in Node refChild) raises(DOMException);
        newChild = refChild = null;
    },
    replaceChild: function(newChild, oldChild) {
        // Node replaceChild(in Node newChild, in Node oldChild) raises(DOMException);
        newChild = oldChild = null;
    },
    removeChild: function(oldChild) {
        // Node removeChild(in Node oldChild) raises(DOMException);
        oldChild = null;
    },
    appendChild: function (newChild) {
        // Node appendChild(in Node newChild) raises(DOMException);
        newChild = null;
    },
    hasChildNodes: function () {
        // boolean hasChildNodes();
    },
    cloneNode: function (deep) {
        // Node cloneNode(in boolean deep);
        deep = null;
    },
    normalize: function () {
        // void normalize();
    },
    isSupported: function (feature, version) {
        // boolean isSupported(in DOMString feature, in DOMString version);
        feature = version = null;
    },
    hasAttributes: function() {
        // boolean hasAttributes();
    }
};