/**
 * The UrValidatorRegExp class is used to check a string against a regular expression.
 * @param {Object} settings
 *      @param {string} settings.pattern
 *      @param {string} [settings.modifiers]
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.message]
 *      @param {string} [settings.type]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorRegExp = function(settings){
    if(settings == undefined) settings = {};

    UrValidator.call(this, settings);
    this.setType(settings.type);

    /** @type {RegExp} */ this.regexp;

    this.setRegExp(settings.pattern,settings.modifiers);
};
UrValidatorRegExp.prototype=new UrValidator();
UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;
/**
 * @param {string} type
 */
UrValidatorRegExp.prototype.setType = function(type){
    this.type = type;
    if(this.type == type)
        this.type = "UrValidatorRegExp";
};
/**
 * @param {string} pattern
 * @param {string} [modifiers]
 */
UrValidatorRegExp.prototype.setRegExp = function(pattern, modifiers){
    if(modifiers != undefined) this.regexp = new RegExp(pattern, modifiers);
    else this.regexp = new RegExp(pattern);

    if(this.messages["regexp"] == undefined)
        this.messages["regexp"] = "The field doesn't respect the pattern";
};
/**
 * @param value
 * @returns {boolean}
 */
UrValidatorRegExp.prototype.validate = function(value){
    this.error = undefined;
    if(!UrValidator.prototype.validate.call(this, value)){
        this.error = this.messages["mandatory"];
        return false;
    }
    else{
        if(value != ""){
            if(!this.regexp.test(value)){
                this.error =  this.messages["regexp"];
                return false;
            }
        }
    }

    return true;
};
