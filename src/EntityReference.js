/*
 * @namespace EntityReference
 * @class EntityReference
 * @param {string} name The name of the attribute
 */

function EntityReference(name) {
    Node.call(this);
    this.nodeName = name;
    this.nodevalue = null;
    this.attributes = null;
    this.specified = true;
    this.nodeType = 2;
}

EntityReference.prototype = Object.create(EntityReference.prototype);
EntityReference.prototype.constructor = EntityReference;