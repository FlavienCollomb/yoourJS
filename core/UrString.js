/**
 * The UrString class provides a Unicode character string.
 * @class UrString
 * @extends UrObject
 * @author Flavien Collomb
 * @param {String} str Encapsulated String in UrString
 * @param {String} [name] UrString name
 * @constructor
 */
var UrString = function(str, name){
    UrObject.call(this, "UrString", name);
    /**
     * @property str
     * @type String
     * @description String encapsulated in UrString
     */
    this.str = str;
};
UrString.prototype=new UrObject();
UrString.prototype.constructor=UrString;
/**
 * Capitalize the string
 * @method capitalize
 * @for UrString
 * @return {String}
 */
UrString.prototype.capitalize = function(){
    return this.str.charAt(0).toUpperCase() + this.str.slice(1);
};
/**
 * Create CamelCase text thanks a separator
 * @method toCamelCase
 * @for UrString
 * @param {String} separator
 * @return {String}
 */
UrString.prototype.toCamelCase = function(separator){
    if(separator == undefined) separator = "-";
    if(this.str.indexOf(separator) != -1){
        var tmp = this.str.split(separator);
        this.str = "";
        for(var i = 0; i < tmp.length; i++){
            if(i == 0) this.str += tmp[i];
            else {
                var str = new UrString(tmp[i]);
                this.str += str.capitalize();
            }
        }
    }
    return this.str;
};
