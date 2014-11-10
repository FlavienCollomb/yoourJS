/**
 * UrObject object is the base object of Core and Ui.
 * @class UrObject
 * @author Flavien Collomb
 * @param {String} type UrObject type
 * @param {String} name UrObject name
 * @constructor
 */
var UrObject = function(type, name){
    /**
     * @property type
     * @type String
     */
    this.type = type;
    /**
     * @property name
     * @type String
     */
    this.name = name;
};
/**
 * Get the name of the UrObject
 * @method getName
 * @for UrObject
 * @return {String}
 */
UrObject.prototype.getName = function(){ return this.name; };
/**
 * Set the name of the UrObject
 * @method setName
 * @for UrObject
 * @param {String} name
 */
UrObject.prototype.setName = function(name){ this.name = name; };
/**
 * Get the type of the UrObject
 * @method getType
 * @for UrObject
 * @return {String}
 */
UrObject.prototype.getType = function(){ return this.type; };
/**
 * Set the type of the UrObject
 * @method setType
 * @for UrObject
 * @param {String} type
 */
UrObject.prototype.setType = function(type){ this.type = type; };