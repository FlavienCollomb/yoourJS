/**
 * The UrInputCheckbox is used to construct input of type checkbox
 * @class UrInputCheckbox
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputCheckbox name
 *      @param {UrWidget}       [settings.parent] UrInputCheckbox's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputCheckbox
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputCheckbox
 *      @param {Object|UrStyle} [settings.style] Style of UrInputCheckbox
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputCheckbox
 *      @param {String}         [settings.defaultValue] Default value of UrInputCheckbox
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputCheckbox validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputCheckbox
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      new UrInputCheckbox({
 *          "name":"test-checkbox",
 *          "defaultValue":"Test checkbox 1"
 *      })
 * @constructor
 */
var UrInputCheckbox = function(settings){
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputCheckbox");
        this.inputType = this.element.type = "checkbox";
    }
};
UrInputCheckbox.prototype=new UrInput();
UrInputCheckbox.prototype.constructor=UrInputCheckbox;