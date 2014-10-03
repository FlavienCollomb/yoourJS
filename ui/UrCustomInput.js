/**
 * The UrCustomInput object is used to construct an input with choiced type.
 * The future behaviour of UrCustomInput may be unstable: you must create an input with existing type. Be careful!
 * @param {string} inputType
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
var UrCustomInput = function(inputType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    var tmp = new UrString(inputType);
    UrInput.call(this, settings, "Ur"+tmp.capitalize());
    this.inputType = this.element.type = inputType;
};
UrCustomInput.prototype=new UrInput();
UrCustomInput.prototype.constructor=UrCustomInput;