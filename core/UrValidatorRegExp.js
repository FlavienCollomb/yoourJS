/**
 * The UrValidatorRegExp class is used to check a string against a regular expression.
 * @class UrValidatorRegExp
 * @extends UrValidator
 * @param {Object} settings
 *      @param {String} settings.pattern Pattern used for the Regexp validation
 *      @param {String} [settings.modifiers] Modifiers used for the Regexp validation
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.type] UrValidatorRegExp type
 *      @param {String} [settings.name] UrValidatorRegExp name
 * @example
 *      var validator = new UrValidatorRegExp({
 *          "mandatory" : true,
 *          "pattern" : "toto",
 *          "messages" : {
 *              "mandatory":"Field 'toto' is mandatory",
 *              "regexp":"Must be 'toto'"
 *           }
 *       });
 * @constructor
 */
var UrValidatorRegExp = function(settings){
    if(settings == undefined) settings = {};

    UrValidator.call(this, settings);
    this.setType(settings.type);
    /**
     * @property regexp
     * @type String
     * @description RegExp used for the validation
     */
    this.regexp;

    this.setRegExp(settings.pattern,settings.modifiers);
};
UrValidatorRegExp.prototype=new UrValidator();
UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;
/**
 * Set UrValidatorRegExp type
 * @method setType
 * @for UrValidatorRegExp
 * @param {String} type
 */
UrValidatorRegExp.prototype.setType = function(type){
    this.type = type;
    if(this.type == undefined)
        this.type = "UrValidatorRegExp";
};
/**
 * Set the regexp of UrValidatorRegExp
 * @method setRegExp
 * @for UrValidatorRegExp
 * @param {String} pattern
 * @param {String} [modifiers]
 */
UrValidatorRegExp.prototype.setRegExp = function(pattern, modifiers){
    if(modifiers != undefined) this.regexp = new RegExp(pattern, modifiers);
    else this.regexp = new RegExp(pattern);

    if(this.messages["regexp"] == undefined)
        this.messages["regexp"] = "The field doesn't respect the pattern";
};
/**
 * Validate value
 * @method validate
 * @for UrValidatorRegExp
 * @param {String} value
 * @return {Boolean}
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
