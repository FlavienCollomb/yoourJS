/**
 * The UrInputText is used to construct input of type text
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {boolean}        [settings.enable]
 *      @param {string}         [settings.defaultValue]
 *      @param {UrValidator}    [settings.validator]
 *      @param {string}         [settings.placeholder]
 * @constructor
 */
var UrInputText = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    UrInput.call(this, settings, "UrInputText");
    this.inputType = this.element.type = "text";
};
UrInputText.prototype=new UrInput();
UrInputText.prototype.constructor=UrInputText;