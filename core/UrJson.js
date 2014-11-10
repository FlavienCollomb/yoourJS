/**
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrJson class provides an interface for JSON
 * @class UrJson
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} json Object encapsulated in UrJson
 * @param {string} [name] UrJson name
 * @example
 *      var json = new UrJSON({"key1":"Key number 1","key2":"Key number 2"},"Your first UrJSON");
 * @constructor
 */
var UrJson = function(json, name){
    UrObject.call(this, "UrJson", name);
    /**
     * @property json
     * @type Object
     * @description Object encapsulated in UrJson
     */
    this.json = json;
};
UrJson.prototype=new UrObject();
UrJson.prototype.constructor=UrJson;
/**
 * Replace old key in UrJson by a new key with value in parameter
 * @method replace
 * @for UrJson
 * @param {string} oldKey Old key in object
 * @param {string} newKey New key in object
 * @param {*} value Value associated with the new key
 */
UrJson.prototype.replace = function(oldKey, newKey, value){
    this.json[newKey] = value;
    delete this.json[oldKey];
};
/**
 * Apply function on each key of UrJson
 * @method each
 * @for UrJson
 * @param {Function} callback Function called on each key of the object
 * @param {Object} context Given "this" value for call callback function
 */
UrJson.prototype.each = function(callback, context){
    for(var i in this.json) {
        if(context == undefined)
            callback(i, this.json[i]);
        else
            callback.call(context, i, this.json[i]);
    }
};
/**
 * Get object encapsulate in UrJson
 * @method get
 * @for UrJson
 * @return {Object}
 */
UrJson.prototype.get = function(){ return this.json; };
/**
 * Get value of a key in UrJson
 * @method getValue
 * @for UrJson
 * @param {String} key
 * @return {*}
 */
UrJson.prototype.getValue = function(key){ return this.json[key]; };
/**
 * Set value with key in UrJson
 * @method setValue
 * @for UrJson
 * @param {String} key
 */
UrJson.prototype.setValue = function(key, value){ this.json[key] = value; };