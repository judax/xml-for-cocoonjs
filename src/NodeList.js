/**
 * @namespace NodeList
 */

/**
 * @class NodeList
 */

function NodeList()
{
    this.length = 0;
    this.nodes = [];
}

NodeList.prototype = {
    /**
     * Returns an item (node) from the list
     * @method NodeList.item
     * @param {number} index
     * @returns {Node}
     * @public
     */
    item: function(index)
    {
        if (index < this.length) {
            return this.nodes[index];
        }
    }
};

NodeList.prototype = Object.create(NodeList.prototype);
NodeList.prototype.constructor = NodeList;

Object.defineProperty(NodeList.prototype, 'length', {
    get: function() {
        return this.nodes.length;
    }
});