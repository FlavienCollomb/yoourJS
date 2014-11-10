/**
 * The UrField object is the base object of all user form elements
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {UrDom}          [settings.element]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {boolean}        [settings.enable]
 *      @param {string}         [settings.defaultValue]
 *      @param {UrValidator}    [settings.validator]
 * @param {String} [type]
 * @constructor
 */
var UrField = function(settings, type){
    if(settings == undefined) settings = {};
    UrDom.call(this, type, settings);

    /**@type boolean*/this.enable;
    /**@type string*/this.defaultValue;
    /**@type UrValidator*/this.validator;

    this.setEnable(settings.enable);
    this.setDefault(settings.defaultValue);
    this.setValidator(settings.validator);

    /**@type boolean*/this.valid = true;
    /**@type boolean*/this.modified = false;
};
UrField.prototype=new UrDom();
UrField.prototype.constructor=UrField;
/**
 * @param {boolean} enable
 */
UrField.prototype.setEnable = function(enable){
    if(enable == false){
        this.enable = enable;
        this.element.disabled = true;
    }
    else
        this.enable = true;
};
/**
 * @param {string} defaultValue
 */
UrField.prototype.setDefault = function(defaultValue){
    this.defaultValue = defaultValue;
    if(this.defaultValue != undefined)
        this.element.value = this.defaultValue;
};
/**
 * @param {string} value
 */
UrField.prototype.setValue = function(value){
    this.element.value = value;
};
/*
return {string}
 */
UrField.prototype.getValue = function(){ return this.element.value; };
/**
 * @param {UrValidator} validator
 */
UrField.prototype.setValidator = function(validator){
    this.validator = validator;
};
/**
 * @returns {UrValidator|undefined}
 */
UrField.prototype.getValidator = function(){
    return this.validator;
};
/**
 * @returns {boolean}
 */
UrField.prototype.validate = function(){
    return this.validator.validate(this.getValue());
};
/**
 * @param {function} method
 */
UrField.prototype.focus = function(method){ this.element.onfocus =  method; };
/**
 * @param {function} method
 */
UrField.prototype.blur = function(method){ this.element.onblur =  method; };
/**
 * @param {function} method
 */
UrField.prototype.change = function(method){ this.element.onchange =  method; };