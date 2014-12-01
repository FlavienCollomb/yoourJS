/**
 * The UrInput object is the base object of all user form input
 * @class UrInput
 * @extends UrField
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInput name
 *      @param {UrWidget}       [settings.parent] UrInput's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInput
 *      @param {String}         [settings.className] HTML attribute "class" of UrInput
 *      @param {Object|UrStyle} [settings.style] Style of UrInput
 *      @param {Boolean}        [settings.enable] HTML attribute "disable" of UrInput
 *      @param {String}         [settings.defaultValue] Default value of UrInput
 *      @param {UrValidator}    [settings.validator] Validator used for UrInput validation
 *      @param {String}         [settings.placeholder] HTML attribute "placeholder" of UrInput
 * @param {String} [type] Type of UrInput
 * @constructor
 */
var UrInput = function(settings, type){
    if(settings == undefined) settings = {};
	UrField.call(this, settings, type);
    /**
     * @property placeholder
     * @type {String}
     * @description HTML attribute placeholder of UrInput
     */
    this.placeholder;
    /**
     * @property inputType
     * @type {String}
     * @description Type of UrInput
     */
    this.inputType;

    this.setPlaceholder(settings.placeholder);
};
UrInput.prototype=new UrField();
UrInput.prototype.constructor=UrInput;
/**
 * Get type of UrInput
 * @method getInputType
 * @for UrInput
 * @return {String}
 */
UrInput.prototype.getInputType = function(){ return this.inputType; };
/**
 * Set HTML attribute placeholder of UrInput
 * @method setPlaceholder
 * @for UrInput
 * @param {String} placeholder
 */
UrInput.prototype.setPlaceholder = function(placeholder){
    this.placeholder = placeholder;
    if(this.placeholder != undefined)
        this.element.placeholder = this.placeholder;
};