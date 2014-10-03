/**
 * The UrValidator class provides validation of field.
 * @param {Object} settings
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.message]
 *      @param {string} [settings.type]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidator = function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, settings.type, settings.name);

    /** @type {boolean} */ this.mandatory;
    /** @type {Object} */ this.messages = {};
    /** @type {Object} */ this.error;

    this.setMessages(settings.messages);
    this.setMandatory(settings.mandatory);
};
UrValidator.prototype=new UrObject();
UrValidator.prototype.constructor=UrValidator;
/**
 * @param {boolean} mandatory
 */
UrValidator.prototype.setMandatory = function(mandatory){
    this.mandatory = false;
    if(typeof mandatory == "boolean"){
        this.mandatory = mandatory;
        if(this.mandatory && this.messages["mandatory"] == undefined)
            this.messages["mandatory"] = "This field is mandatory";
    }
};
/**
 * @returns {boolean}
 */
UrValidator.prototype.getMandatory=function(){
    return this.mandatory;
};
/**
 * @param {Object} messages
 */
UrValidator.prototype.setMessages=function(messages){
    if(messages != undefined)
        this.messages = messages;
};
/**
 * @returns {Object}
 */
UrValidator.prototype.getMessages=function(){
    return this.messages;
};
/**
 * @param {string} type
 * @param {string} message
 */
UrValidator.prototype.setMessage=function(type, message){
    if(type != undefined && message != undefined)
        this.messages[type] = message;
};
/**
 * @returns {string}
 */
UrValidator.prototype.getError=function(){
    return this.error;
}
/**
 * @param value
 * @returns {boolean|int}
 */
UrValidator.prototype.validate = function(value){
    this.error = undefined;
    if(this.mandatory == true && value == ""){
        this.error = this.messages["mandatory"];
        return false;
    }
    return true;
};