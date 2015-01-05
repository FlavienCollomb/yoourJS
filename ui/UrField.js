/**
 * The UrField object is the base object of all user form elements
 * @class UrField
 * @extends UrDom
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrField name
 *      @param {UrWidget}       [settings.parent] UrField's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {UrDom}          [settings.element] UrField's HTML element already existing in the DOM
 *      @param {String}         [settings.id] HTML attribute "id" of UrField
 *      @param {String}         [settings.className] HTML attribute "class" of UrField
 *      @param {Object|UrStyle} [settings.style] Style of UrField
 *      @param {Boolean}        [settings.enable] HTML attribute "disable" of UrField
 *      @param {String}         [settings.defaultValue] Default value of UrField
 *      @param {UrValidator}    [settings.validator] Validator used for UrField validation
 * @param {String} [type] Type of UrField
 * @constructor
 */
var UrField = function(settings, type){
    /**
     * @property enable
     * @type Boolean
     * @description HTML attribute "enable" of UrField
     */
    this.enable;
    /**
     * @property defaultValue
     * @type String
     * @description Default value of UrField
     */
    this.defaultValue;
    /**
     * @property validator
     * @type UrValidator
     * @description Validator used for field validation
     */
    this.validator;
    /**
     * @property valid
     * @type Boolean
     * @description Result of last validation of UrField
     */
    this.valid;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"enable":["boolean"],"defaultValue":["string","number"],"validator":[UrValidator]});

        UrDom.call(this, type, settings);

        this.setEnable(settings.enable);
        this.setDefault(settings.defaultValue);
        this.setValidator(settings.validator);
        this.setFieldName(settings.name);

        this.valid= true;
    }
};
UrField.prototype=new UrDom();
UrField.prototype.constructor=UrField;
/**
 * Set html name of UrField
 * @method setFieldName
 * @for UrField
 * @param {string} name
 */
UrField.prototype.setFieldName = function(name){
    this.element.name = name;
};
/**
 * Enable or disable UrField
 * @method setEnable
 * @for UrField
 * @param {Boolean} enable
 */
UrField.prototype.setEnable = function(enable){
    if(enable == false){
        this.enable = enable;
        this.element.disabled = true;
    }
    else{
        this.element.disabled = false;
        this.enable = true;
    }
};
/**
 * Set default value of UrField and reset UrField with this value
 * @method setDefault
 * @for UrField
 * @param {String} defaultValue
 */
UrField.prototype.setDefault = function(defaultValue){
    this.defaultValue = defaultValue;
    if(this.defaultValue != undefined)
        this.element.value = this.defaultValue;
};
/**
 * Set current value of UrField
 * @method setValue
 * @for UrField
 * @param {string} value
 */
UrField.prototype.setValue = function(value){
    this.element.value = value;
};
/**
 * Get current value of UrField
 * @method getValue
 * @for UrField
 * @return {String}
 */
UrField.prototype.getValue = function(){ return this.element.value; };
/**
 * Set UrField's validator
 * @method setValidator
 * @for UrField
 * @param {UrValidator} validator
 */
UrField.prototype.setValidator = function(validator){
    this.validator = validator;
};
/**
 * Get UrField's validator
 * @method getValidator
 * @for UrField
 * @return {UrValidator|undefined}
 */
UrField.prototype.getValidator = function(){
    return this.validator;
};
/**
 * Validate UrField
 * @method validate
 * @for UrField
 * @return {Boolean}
 */
UrField.prototype.validate = function(){
    if(this.validator!=undefined)
        return this.validator.validate(this.getValue());
    return true;
};