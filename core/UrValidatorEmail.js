/**
 * The UrValidatorEmail class is used to check an email.
 * @class UrValidatorEmail
 * @extends UrValidator
 * @param {Object} settings
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.name] UrValidatorEmail name
 * @example
 *      var validator = new UrValidatorEmail({
 *          "mandatory" : true,
 *          "messages" : {"mandatory":"Email is mandatory","regexp":"Invalid email"}
 *      });
 * @constructor
 */
var UrValidatorEmail = function(settings){
    if(settings!=undefined){
        settings["pattern"] = "^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$";
        settings["modifiers"] = "i";
        settings["type"] = "UrValidatorEmail";

        UrValidatorRegExp.call(this, settings);
    }
};
UrValidatorEmail.prototype=new UrValidatorRegExp();
UrValidatorEmail.prototype.constructor=UrValidatorEmail;
/**
 * Validate value
 * @method validate
 * @for UrValidatorEmail
 * @param {String} value
 * @return {Boolean}
 */
UrValidatorEmail.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};