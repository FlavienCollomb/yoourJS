/**
 * The UrJson class provides an interface for JSON
 * @param {Object} json
 * @param {string} [name]
 * @constructor
 */
var UrJson = function(json, name){
    UrObject.call(this, "UrJson", name);
    this.json = json;
};
UrJson.prototype=new UrObject();
UrJson.prototype.constructor=UrJson;
/**
 * @param {string} oldKey
 * @param {string} newKey
 * @param {string|number|Object|Function|Node|boolean} value
 */
UrJson.prototype.replace = function(oldKey, newKey, value){
    this.json[newKey] = value;
    delete this.json[oldKey];
};
/**
 * @param {Function} callback
 * @param {Object} context
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
 * @returns {Object}
 */
UrJson.prototype.get = function(){ return this.json; };
/**
 * @param {string} key
 * @returns {*}
 */
UrJson.prototype.getValue = function(key){ return this.json[key]; };
/**
 * @param {string} key
 * @returns {*}
 */
UrJson.prototype.setValue = function(key, value){ this.json[key] = value; };