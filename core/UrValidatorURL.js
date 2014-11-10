/**
 * The UrValidatorEmail class is used to check an URL.
 * @param {Object} settings
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.messages]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorURL = function(settings){
    if(settings == undefined) settings = {};
    settings["pattern"] = "(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)";
    settings["modifiers"] = "i";
    settings["type"] = "UrValidatorURL";

    UrValidatorRegExp.call(this, settings);
};
UrValidatorURL.prototype=new UrValidatorRegExp();
UrValidatorURL.prototype.constructor=UrValidatorURL;

UrValidatorURL.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};