/**
 * UrObject object is the base object of Core and Ui.
 * @param {string} type
 * @param {string} [name]
 * @constructor
 */
var UrObject = function(type, name){
    this.type = type;
    this.name = name;
};
/**
 * @returns {string}
 */
UrObject.prototype.getName = function(){ return this.name; };
/**
 * @param {string} name
 */
UrObject.prototype.setName = function(name){ this.name = name; };
/**
 * @returns {string}
 */
UrObject.prototype.getType = function(){ return this.type; };
/**
 * @param {string} type
 */
UrObject.prototype.setType = function(type){ this.type = type; };