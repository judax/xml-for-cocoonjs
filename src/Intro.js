
!function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.domParser = factory();
    }
}(this, function() {

/**
 * @namespace domParser
 */
var domParser = function domParser() {

/*
 * Delegates is the tag stack used by the SAX Parser itself via calls from XmlDocument
 */
var delegates = null;
    