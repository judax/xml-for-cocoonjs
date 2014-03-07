XML for CocoonJS
================

Version 0.2 (beta)

Combining [xmldoc](https://github.com/nfarina/xmldoc) and [sax](https://github.com/isaacs/sax-js) Node.js modules, this serves to re-create the DOMParser object in user agents (like CocoonJS) that do not have XML support.

Currently, this parses XML into a document-like tree object with the root element of the XML as a "XmlDocument" and all of its elements, and their own children, as "XmlElement" objects.

It can accessed through the global "domParser" object with calls to its one and only function "parseFromString(xml)" to receive back the tree object.

## Features:
* getElementsByTagName for XmlDocument and XmlElement (non-recursive)
* getElementsByName for XmlElement (non-recursive)
* hasAttribute, getAttribute, removeAttribute, and setAttribute for XmlElement
* createElement for XmlElement

## Basic Example

```javascript
 var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "example.xml", true);
      xmlhttp.onreadystatechange = handler;
      xmlhttp.send();

      function handler()
      {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            var xml = domParser.parseFromString(xmlhttp.responseText);
          }
        }
      }
```
