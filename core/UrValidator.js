/**
 * The UrValidator class provides validation of field.
 * @class UrValidator
 * @extends UrObject
 * @param {Object} settings
 *      @param {Boolean} [settings.mandatory] Mandatory field ?
 *      @param {Object} [settings.messages] Messages used for each error
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
    this.messages;
    /**
     * @property error
     * @type String
     * @description Current error message
     */
    this.error;

    if(settings!=undefined){
        this.messages = {};

        var json = new UrJson(settings);
        json.checkType({"name":["string"],"type":["string"],"mandatory":["boolean"],"messages":[Object]});

        UrObject.call(this, settings.type, settings.name);

        this.setMessages(settings.messages);
        this.setMandatory(settings.mandatory);
    }
};
UrValidator.prototype=new UrObject();
UrValidator.prototype.constructor=UrValidator;
/**
 * Is mandatory?
 * @method setMandatory
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
/**
 * Get current error
 * @method getError
 * @for UrValidator
 * @return {String}
 */
UrValidator.prototype.getError = function(){
    return this.error;
};