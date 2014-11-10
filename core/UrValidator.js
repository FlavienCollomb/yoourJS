/**
 * The UrValidator class provides validation of field.
 * @class UrValidator
 * @extends UrObject
 * @param {Object} settings
 *      @param {string} [settings.mandatory] Mandatory field ?
 *      @param {string} [settings.message] Messages used for each error
 *      @param {string} [settings.type] UrValidator type
 *      @param {string} [settings.name] UrValidator name
 * @example
 *      var validator = new UrValidator({
 *          "mandatory" : true,
 *          "messages" : {"mandatory":"Mandatory field..."}
 *      });
 * @constructor
 */
var UrValidator = function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, settings.type, settings.name);
    /**
     * @property mandatory
     * @type Boolean
     * @description Mandatory field ?
     * @default false
     */
    this.mandatory;
    /**
     * @property messages
     * @type Object
     * @description Message(s) for the error(s)
     */
    this.messages = {};

    this.setMessages(settings.messages);
    this.setMandatory(settings.mandatory);
};
UrValidator.prototype=new UrObject();
UrValidator.prototype.constructor=UrValidator;
/**
 * Is mandatory?
 * @method SetMandatory
 * @for UrValidator
 * @param {Boolean} mandatory
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
 * Get mandatory property value
 * @method getMandatory
 * @for UrValidator
 * @return {Boolean}
 */
UrValidator.prototype.getMandatory=function(){
    return this.mandatory;
};
/**
 * Set messages property
 * @method setMessages
 * @for UrValidator
 * @param {Object} messages
 */
UrValidator.prototype.setMessages=function(messages){
    if(messages != undefined)
        this.messages = messages;
};
/**
 * Get messages property value
 * @method getMessages
 * @for UrValidator
 * @return {Object}
 */
UrValidator.prototype.getMessages=function(){
    return this.messages;
};
/**
 * Set a message for en error type
 * @method setMessage
 * @for UrValidator
 * @param {String} type
 * @param {String} message
 */
UrValidator.prototype.setMessage=function(type, message){
    if(type != undefined && message != undefined)
        this.messages[type] = message;
};
/**
 * Validate value
 * @method validate
 * @for UrValidator
 * @param {String} value
 * @return {Boolean}
 */
UrValidator.prototype.validate = function(value){
    this.error = undefined;
    if(this.mandatory == true && value == ""){
        this.error = this.messages["mandatory"];
        return false;
    }
    return true;
};