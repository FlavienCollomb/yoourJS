/**
 * The UrInputText is used to construct input of type text
 * @class UrInputText
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputText name
 *      @param {UrWidget}       [settings.parent] UrInputText's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputText
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputText
 *      @param {Object|UrStyle} [settings.style] Style of UrInputText
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputText
 *      @param {String}         [settings.defaultValue] Default value of UrInputText
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputText validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputText
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var input1 = new UrInputText({"parent":body});
 * @constructor
 */
var UrInputText = function(settings){
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputText");
        this.inputType = this.element.type = "text";
    }
};
UrInputText.prototype=new UrInput();
UrInputText.prototype.constructor=UrInputText;