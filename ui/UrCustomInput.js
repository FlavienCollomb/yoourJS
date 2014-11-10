/**
 * The ui module contains GUI functionality.
 * @module ui
 */

/**
 * The UrCustomInput object is used to construct an input with choiced HTML attribute type.
 * The future behaviour of UrCustomInput may be unstable: you must create an input with existing type. Be careful!
 * @class UrCustomInput
 * @extends UrInput
 * @author Flavien Collomb
 * @param {string} inputType Input type, for example "text"
 * @param {Object} settings
 *      @param {string}         [settings.name] UrCustomInput name
 *      @param {UrWidget}       [settings.parent] UrCustomInput's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrCustomInput
 *      @param {string}         [settings.className] HTML attribute "class" of UrCustomInput
 *      @param {Object|UrStyle} [settings.style] Style of UrCustomInput
 *      @param {boolean}        [settings.enable] The input element is enabled ?
 *      @param {string}         [settings.defaultValue] Default value in the input element
 *      @param {UrValidator}    [settings.validator] Validator used for input validation
 *      @param {string}         [settings.placeholder] HTML attribute placeholder of UrCustomInput
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var submit = new UrCustomInput(
 *          "submit",
 *          {
 *              "parent":body,
 *              "name":"submit",
 *              "defaultValue":"SAVE"
 *          }
 *      );
 * @constructor
 */
var UrCustomInput = function(inputType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    var tmp = new UrString(inputType);
    UrInput.call(this, settings, "Ur"+tmp.capitalize());
    /**
     * @property inputType
     * @type {String}
     * @description Input type, for example "text"
     */
    this.inputType = this.element.type = inputType;
};
UrCustomInput.prototype=new UrInput();
UrCustomInput.prototype.constructor=UrCustomInput;