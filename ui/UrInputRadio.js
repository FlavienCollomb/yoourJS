/**
 * The UrInputRadio is used to construct input of type radio
 * @class UrInputRadio
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputRadio name
 *      @param {UrWidget}       [settings.parent] UrInputRadio's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputRadio
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputRadio
 *      @param {Object|UrStyle} [settings.style] Style of UrInputRadio
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputRadio
 *      @param {String}         [settings.defaultValue] Default value of UrInputRadio
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputRadio validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputRadio
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      form.add(new UrInputRadio({
 *          "name":"test-radio",
 *          "defaultValue":"Test radio 1"
 *      }));
 * @constructor
 */
var UrInputRadio = function(settings){
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputRadio");
        this.inputType = this.element.type = "radio";
    }
};
UrInputRadio.prototype=new UrInput();
UrInputRadio.prototype.constructor=UrInputRadio;