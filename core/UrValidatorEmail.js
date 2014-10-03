/**
 * The UrValidatorEmail class is used to check an email.
 * @param {Object} settings
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.messages]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorEmail = function(settings){
    if(settings == undefined) settings = {};
    settings["pattern"] = "^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$";
    settings["modifiers"] = "i";
    settings["type"] = "UrValidatorEmail";

    UrValidatorRegExp.call(this, settings);
};
UrValidatorEmail.prototype=new UrValidatorRegExp();
UrValidatorEmail.prototype.constructor=UrValidatorEmail;

UrValidatorEmail.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};