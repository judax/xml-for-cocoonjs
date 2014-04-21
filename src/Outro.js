
    /**
     * Internal version of parseFromString
     * @method domParser.parseFromString
     * @param {string} text  The text to parse
     * @param {string} mimeType The mimeType to create
     * @returns {XmlDocument} A XmlDocument representing the XML data
     * @public
     */
    this.parseFromString = function(text, mimeType) {
       if(mimeType === 'text/xml' || mimeType === 'application/xml') {
             return new Document(text);
        }
    };
  };

  /**
   * External version of parseFromString
   * @method domParser.parseFromString
   * @param {string} text  The text to parse
   * @param {string} mimeType The mimeType to create
   * @returns {XmlDocument} A XmlDocument representing the XML data (from internal function)
   * @public
   */
  domParser.prototype.parseFromString = function(text, mimeType) {
    if(mimeType === 'text/xml' || mimeType === 'application/xml') {
        return this.parseFromString(text, mimeType);
    }
  };

  return domParser;

});
if (navigator.isCocoonJS) {
  window['DOMParser'] = domParser;
}