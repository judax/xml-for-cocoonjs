/**
 * @namespace Element
 * @class Element
 * @param tag An object containing as its own properties those to be applied to Element 
 */

function Element(tag) {

    Node.call(this);
    this.nodeType = 1;
    this.nodeValue = null;

    if (tag) {

        if (tag.hasOwnProperty('name')) {
            this.nodeName = tag.name;
        }

        if (tag.hasOwnProperty('parentNode')) {
            this.parentNode = tag.parentNode;
        }

        if (tag.hasOwnProperty('attributes')) {
            this.attributes = new NamedNodeMap();
            for (var attribute in tag.attributes) {
                var node = new Node();
                node.nodeName = tag.attributes[attribute].name;
                node.nodeValue = tag.attributes[attribute].value;
                node.nodeType = 2;
                node.localName = tag.attributes[attribute].local;
                this.attributes.setNamedItem(node);
            }
        }

        if (tag.hasOwnProperty('namespaceURI')) {
            this.namespaceURI = tag.namespaceURI;
        }
        
        if (tag.hasOwnProperty('localName')) {
            this.localName = tag.localName;
        }
    }

    return this;
}

Element.prototype = {
    /** 
     * Function called for each opening tag found
     * Pushes a new child node, sets first/lastChild, and adds the tag to the working stack
     * @method Element._opentag
     * @param {object} tag An object containing as its own properties those to be applied to Element
     * @private
     */
    _opentag: function(tag) {
        var child = new Element(tag);
        child.parentNode = this;
        this.childNodes.push(child);
        delegates.unshift(child);
    },
    /**
     * Function called for each closing tag found 
     * Takes the last tag off the stack
     * @method Element._closetag
     * @private
     */
    _closetag: function() {
        delegates.shift();
    },
    /**
     * Creates and pushes a new Text node to the childNodes array
     * Will not accept text that is purely whitespace only
     * @method Element._text
     * @param {string} text The text to be used for creation of a Text node
     * @private
     */
    _text: function(text) {
        if (text)
        {
            if (/[^\s]/.test(text)) {
                var child = new Text(text, this);
                this.childNodes.push(child);
            }
        }
    },
    /**
     * Creates and pushes a new Comment node to the childNodes array
     * @method Element._comment
     * @param {string} text The text to be used for creation of a Comment node
     * @private
     */
    _comment: function(text) {
        if (text)
        {
            var child = new Comment(text);
            child.parentNode = this;
            this.childNodes.push(child);
        }
    },
    /**
     * Creates and pushes a new ProcessingInstruction node to the childNodes array
     * @method Element._processingInstruction
     * @param {string} text The text to be used for creation of a ProcessingInstruction node
     * @private
     */
    _processingInstruction: function(text) {
        if (text)
        {
            var child = new ProcessingInstruction(text);
            child.parentNode = this;
            this.childNodes.push(child);
        }
    },
    /**
     * Creates and pushes a new CDATA node to the childNodes array
     * @method Element._cdata
     * @param {string} cdata The text to be used for creation of a CDATA node
     * @private
     */
    _cdata: function(cdata) {
        if (cdata)
        {
            var child = new CDATA(cdata);
            child.parentNode = this;
            this.childNodes.push(child);
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
        return Node.prototype.appendChild.call(this, node);
    },
    /**
     * Removes the child node indicated by oldChild from the list of children, and returns it. 
     * @param {Node} oldChild The node being removed.
     * @returns {Node} The node removed.
     */
    removeChild: function(oldChild) {
        return Node.prototype.removeChild.call(this, oldChild);
    },
    /**
     * Returns whether this node (if it is an element) has any attributes. 
     * @method Node.hasAttributes
     * @returns {boolean} If Node has attributes
     * @public
     */
    hasAttributes: function() {
        return Node.prototype.hasAttributes.call(this);
    },
    /**
     * Returns if Node has any childNodes
     * @method Node.hasChildNodes
     * @returns {boolean} If the Node has any childNodes
     * @public
     */
    hasChildNodes: function() {
        return Node.prototype.hasChildNodes.call(this);
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
     * Replaces the child node oldChild with newChild in the
     *  list of children, and returns the oldChild node.
     * @method Node.replaceChild
     * @param {Node} newChild The node to insert
     * @param {Node} oldChild The reference node
     * @returns {Node} The node replaced
     * @public
     */
    replaceChild: function(newChild, oldChild) {
        return Node.prototype.replaceChild.call(this, newChild, oldChild);
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
      return Node.prototype.insertBefore.call(this, newChild, refChild);  
    },
    /**
     * Retrieves an attribute value by name.
     * @method Element.getAttribute
     * @param {string} name The name of the attribute to retrieve.
     * @returns {string} The Attr value as a string or the empty string
     * @public
     */
    getAttribute: function(name) {
        var node = this.attributes.getNamedItem(name);
        if (node) {
            return "" + node.nodeValue;
        } else {
            return "";
        }
    },
    /**
     * Sets (or creates) an attribute of name to value
     * @method Element.setAttribute
     * @param {string} name The attribute of name to test for
     * @param {*} value The value to set the attribute name to
     * @public
     */
    setAttribute: function(name, value) {
        var node = this.attributes.getNamedItem(name);
        if (node) {
            node.nodeValue = value;
        }
        else {
            node = new Node();
            node.nodeName = name;
            node.nodeValue = value;
            this.attributes.setNamedItem(node);
        }
    },
    /**
     * Deletes an attribute, if it exists
     * @method Element.removeAttribute
     * @param {string} name The attribute of name to test for
     * @public
     */
    removeAttribute: function(name) {
        this.attributes.removeNamedItem(name);
    },
    /**
     * Returns a Attr node representing the named attribute
     * @method Element.getAttributeNode
     * @param {string}  name  The name of the attribute to return
     * @returns {Attr | null} If found, a new Attr node, else null
     * @public
     */
    getAttributeNode: function(name) {
        if (this.hasAttribute(name)) {
            return new Attr(name, this.getAttribute(name), this);
        }
        else {
            return null;
        }
    },
    /**
     * Sets the Attr node name and value as an attribute to the current node
     * @method Element.createAttribute
     * @param {Attr}  node  The name of the attribute to return
     * @public
     */
    setAttributeNode: function(node) {
        if (node instanceof Attr) {
            if (node.ownerElement !== this) {
                //Raised if node is already an attribute of another Element object.
                throw new DOMException("INUSE_ATTRIBUTE_ERR");
            } else {
                if (node.ownerElement.ownerDocument !== this.ownerDocument) {
                    //Raised if node was created from a different document 
                    // than the one that created the element.
                    throw new DOMException("WRONG_DOCUMENT_ERR");
                } else {
                    this.setAttribute(node.name, node.value);
                }
            }
        }
    },
    /**
     * Removes and returns an Attr node, if found
     * @method Element.removeAttributeNode
     * @param {Attr}  node  The name of the attribute to return
     * @public
     */
    removeAttributeNode: function(node) {
        if (node instanceof Attr) {
            if (this.hasAttribute(node.name)) {
                var temp = this.getAttributeNode(node.name);
                this.removeAttribute(node.name);
                return temp;
            } else {
                //Raised if node is not an attribute of the element.
                throw new DOMException("NOT_FOUND_ERR");
            }
        }
    },
    /**
     * Retrieves an array of elements matching the name specified.
     * Will return all element childNodes with "*"
     * @method Element.getElementsByTagName
     * @param {string} name The tag name to search for
     * @returns {NodeList} An array containing any matches
     * @public
     */
    getElementsByTagName: function(name) {
        var results = new NodeList(), r;

        for (var i = 0; i < this.childNodes.length; i += 1) {
            if (this.childNodes[i].nodeType === 1) {
                if (this.childNodes[i].nodeName === name || name === "*") {
                    results.push(this.childNodes[i]);
                }
                if (!!this.childNodes[i].childNodes && this.childNodes[i].childNodes.length > 0) {
                    if ((r = this.childNodes[i].getElementsByTagName(name))) {
                        results = results.concat(r);
                    }
                }
            }
        }
        return results;
    },
    /**
     * Retrieves an attribute value by name.
     * @method Element.getAttributeNS
     * @param {string} namespaceURI The namespace URI of the attribute to retrieve.
     * @param {string} localName The local name of the attribute to retrieve.
     * @returns {string} The Attr value as a string or the empty string
     * @public
     */
    getAttributeNS: function(namespaceURI, localName) {
    },
    setAttributeNS: function(namespaceURI, qualifiedName, value) {
    },
    removeAttributeNS: function(namespaceURI, localName) {
    },
    getAttributeNodeNS: function(namespaceURI, localName) {
    },
    setAttributeNodeNS: function(newAttr) {
    },
    getElementsByTagNameNS: function(namespaceURI, localName) {
    },
    /**
     * Returns if Element has an attribute or not
     * @method Element.hasAttribute
     * @param {string} name The attribute of name to test for
     * @returns {boolean} If Element has that attribute or not
     * @public
     */
    hasAttribute: function(name) {
        return !!this.attributes.getNamedItem(name);
    },
    hasAttributeNS: function(namespaceURI, localName) {
    },
    /**
       * Retrieves an array matching the selector specified.
       * @method Element.querySelectorAll
       * @param {string} selector The selector to search for
       * @returns {Array} An array with the matches found
       * @public
       */
      querySelectorAll: function (selector) {

        var run = function (searchNode, selector) {

          var checkNode = function (node, selectorPartInfos) {
            var ok = true;
            var selectorPartInfosLength = selectorPartInfos.length;
            for (var selectorPartInfosIndex = 0; selectorPartInfosIndex < selectorPartInfosLength; selectorPartInfosIndex++) {
              var selectorPartInfo = selectorPartInfos[selectorPartInfosIndex];
              switch (selectorPartInfo.charAt(0)) {
              case "[":
                var attr = selectorPartInfo.substr(1, selectorPartInfo.length - 2).split("=");
                var attrName = attr[0];
                var attrValue = attr[1];
                if (!node.getAttribute(attrName)) {
                  ok = false;
                } else if (attrValue) {
                  attrValue = attrValue.replace(/^['"]|['"]$/g, "");
                  if (node.getAttribute(attrName) != attrValue)
                    ok = false;
                }
                break;
              default:
                if (node.nodeName.toLowerCase() != selectorPartInfo.toLowerCase())
                  ok = false;
                break;
              }
              if (!ok)
                break;
            }
            return ok;
          };

          var selectorParts = selector.split(/[ >]+/),
            selectorDividers = selector.match(/[ >]+/g) || [],
            currentResultNodes = [searchNode];

          var selectorPartLength = selectorParts.length;
          while (selectorDividers.length < selectorPartLength) {
            selectorDividers.unshift(" ");
          }

          for (var selectorPartIndex = 0; selectorPartIndex < selectorPartLength; selectorPartIndex++) {
            var selectorPart = selectorParts[selectorPartIndex];
            var selectorDivider = selectorDividers[selectorPartIndex];
            if (selectorDivider)
              selectorDivider = selectorDivider.replace(/^ +| +$/g, "");

            var nodes = currentResultNodes.slice(0);
            currentResultNodes = [];
            var selectorPartInfos = selectorPart.match(/[#.[]?[a-z_-]+(?:='[^']+'|="[^"]+")?]?/gi);
            var nodesLength = nodes.length;

            if (selectorPartIndex === 0 && selectorPartLength > 1 && nodesLength === 1) {
              var firstNode = nodes[0];
              if (checkNode(firstNode, selectorPartInfos))
                currentResultNodes.push(firstNode);
            }

            for (var nodeIndex = 0; nodeIndex < nodesLength; nodeIndex++) {
              var node = nodes[nodeIndex];
              var nodesToCheck = selectorDivider === ">" ? node.children : node.getElementsByTagName("*");
              if (!nodesToCheck)
                continue;
              var nodesToCheckLength = nodesToCheck.length;
              for (var nodesToCheckIndex = 0; nodesToCheckIndex < nodesToCheckLength; nodesToCheckIndex++) {
                var nodeToCheck = nodesToCheck[nodesToCheckIndex];
                if (checkNode(nodeToCheck, selectorPartInfos))
                  currentResultNodes.push(nodeToCheck);
              }
            }
          }
          return currentResultNodes;
        };

        var selectors = selector.split(","),
          selectorsLength = selectors.length,
          foundNodes = [];

        for (var i = 0; i < selectorsLength; i++) {
          foundNodes = foundNodes.concat(run(this, selectors[i]));
        }

        return foundNodes;
      },
      /**
       * Retrieves the first element matching the selector specified.
       * @method Element.querySelector
       * @param {string} selector The selector to search for
       * @returns {Element|null} If any matches were found, an element. If not, "null"
       * @public
       */
      querySelector: function (selector) {
        var foundNodes = this.querySelectorAll(selector);
        return foundNodes.length > 0 ? foundNodes[0] : null;
      }

};

Element.prototype = Object.create(Element.prototype);
Element.prototype.constructor = Element;

Object.defineProperty(Element.prototype, 'ownerDocument', {
    get: function() {
        return Node.prototype._ownerDocument.call(this);
    }
});

Object.defineProperty(Element.prototype, 'previousSibling', {
    get: function() {
        return Node.prototype._previousSibling.call(this);
    }
});

Object.defineProperty(Element.prototype, 'nextSibling', {
    get: function() {
        return Node.prototype._nextSibling.call(this);
    }
});

Object.defineProperty(Element.prototype, 'firstChild', {
    get: function() {
        return Node.prototype._firstChild.call(this);
    }
});

Object.defineProperty(Element.prototype, 'lastChild', {
    get: function() {
        return Node.prototype._lastChild.call(this);
    }
});

Object.defineProperty(Element.prototype, 'textContent', {
    get: function() {
        function textContentRecursive(node) {
            var text = "";
            if (node.nodeType === 3) {
                text += node.data;
            }
            else if (node.childNodes) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    text += textContentRecursive(node.childNodes[i]);
                }
            }
            return text;
        }
        return textContentRecursive(this);
    }
});
