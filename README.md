XML for CocoonJS
================

Version 0.5 (beta)

Combining [xmldoc](https://github.com/nfarina/xmldoc) and [sax](https://github.com/isaacs/sax-js) Node.js modules, this serves to re-create the DOMParser object in user agents (like CocoonJS) that do not have native XML support.

Currently, this parses XML into a document-like tree object with the root element of the XML as a "XmlDocument" and all of its elements, and their own children, as "XmlElement" objects.

(Will overwrite the window['DOMParser'] property in CocoonJS through detection of "navigator.isCocoonJS".)

## Features:
* getElementsByTagName and getElementsByName
* hasAttribute, getAttribute, removeAttribute, and setAttribute for XmlElement
* createElement and appendChild
* hasChildNodes
* 'nodeValue' and 'nodeName' properties for all nodes 

##TODO
* Support nodeType detection
* Support all operations that depend on nodeType detection

## Basic Example

```javascript
 window['DOMParser'] = domParser; //Assuming not isCocoonJS
 var xmlhttp = new XMLHttpRequest();
     xmlhttp.open("GET", "example.xml", true);
     xmlhttp.onreadystatechange = handler;
     xmlhttp.send();

     function handler()
     {
       if (xmlhttp.readyState === 4) {
         if (xmlhttp.status === 200) {
           var tmp = new DOMParser();
           var xml = tmp.parseFromString(xmlhttp.responseText, "text/xml");
         }
       }
     }
```
