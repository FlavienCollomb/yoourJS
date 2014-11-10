/**
 * The UrValidatorURL class is used to check an URL.
 * @class UrValidatorURL
 * @extends UrValidatorRegExp
 * @param {Object} settings
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.name] UrValidatorURL name
 * @example
 *      var validator = new UrValidatorURL({
 *          "mandatory" : true,
 *          "messages" : {"mandatory":"URL is mandatory","regexp":"Invalid URL"}
 *      });
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
/**
 * Validate value
 * @method validate
 * @for UrValidatorURL
 * @param {String} value
 * @return {Boolean}
 */
UrValidatorURL.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};