XML for CocoonJS
================

Version 0.9 (beta)

0.9 is a major revision of the project before the upcoming 1.0 release. Starting with 0.9, all objects are named after and try to match their corresponding entries in the DOM Core specification. 

##DOM Core Level 1 differences:
* All nodes are  implemented as JavaScript OBJECTS, not their corresponding object names in the specification. (NodeLists are not "live".)

* DocumentType is a work-in-progress

* EntityReference will be implemented in final 0.9
 
* Notation will be implemented in final 0.9

##TODO for 0.9
* All nodes need to inherit from Node, not Element. (Nearly everything is a node; however, all nodes are not Elements.)

* Instead of Arrays, "get" functions will return NodeList or NamedNodeMap, which will act either as arrays or maps accordingly.

* Implement check for DocumentFragment nodes in appendChild, add its children to tree

* Implement insertBefore(), removeChild(), replaceChild(), and cloneNode()

* Add splitText() to Text nodes

* Support DOM Core Level 2 namespace functionality

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
