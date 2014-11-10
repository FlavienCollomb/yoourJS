/**
 * The UrInput object is the base object of all user form input
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
 * @param {String} [type]
 * @constructor
 */
var UrInput = function(settings, type){
    if(settings == undefined) settings = {};
	UrField.call(this, settings, type);
    /**@type string*/this.placeholder;
    /**@type string*/this.inputType;

    this.setPlaceholder(settings.placeholder);
};
UrInput.prototype=new UrField();
UrInput.prototype.constructor=UrInput;
/**
 *
 * @returns {string}
 */
UrInput.prototype.getInputType = function(){ return this.inputType; };
/**
 * @param {string} placeholder
 */
UrInput.prototype.setPlaceholder = function(placeholder){
    this.placeholder = placeholder;
    if(this.placeholder != undefined)
        this.node.placeholder = this.placeholder;
};