/**
 * The UrString class provides a Unicode character string.
 * @param {string} str
 * @param {string} [name]
 * @constructor
 */
var UrString = function(str, name){
    UrObject.call(this, "UrString", name);
    this.str = str;
};
UrString.prototype=new UrObject();
UrString.prototype.constructor=UrString;
/**
 * @returns {string}
 */
UrString.prototype.capitalize = function(){
    return this.str.charAt(0).toUpperCase() + this.str.slice(1);
};
/**
 * @returns {string}
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
