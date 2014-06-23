/**
 * @namespace NodeList
 * @class NodeList
 */
function NodeList()
{
    this.nodes = new Array();
    /**
     * Returns an item (node) from the list
     * @method NodeList.item
     * @param {number} index
     * @returns {Node}
     * @public
     */
    this.nodes.item = function(index) {
        if (index < this.length && index > -1) {
            return this[index];
        }
    };
    return this.nodes;
}

NodeList.prototype = Object.create(NodeList.prototype);
NodeList.prototype.constructor = NodeList;