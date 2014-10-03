/**
 * The UrForm object is used to construct form
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 *      @param {string}         [settings.method]
 *      @param {string}         [settings.action]
 *      @param {string}         [settings.enctype]
 * @constructor
 */
var UrForm = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("form");

    /**@type string*/this.method;
    /**@type string*/this.action;
    /**@type string*/this.enctype;

    /**@type Array<UrDom>*/ this.formElement = {};

    UrWidget.call(this, settings, "UrForm");

    this.setMethod(settings.method);
    this.setAction(settings.action);
    this.setEnctype(settings.enctype);
};
UrForm.prototype=new UrWidget();
UrForm.prototype.constructor=UrForm;
/**
 * @param {UrField} element
 */
UrForm.prototype.add = function(element){
    this.addChild(element);
    this.formElement[element.getName()] = element;
};
/**
 * @param {string} method
 */
UrForm.prototype.setMethod = function(method){
    this.method = method;
    if(this.method != undefined)
        this.element.setAttribute("method", this.method);
};
/**
 * @param {string} action
 */
UrForm.prototype.setAction = function(action){
    this.action = action;
    if(this.action != undefined)
        this.element.setAttribute("action", this.action);
};
/**
 * @param {string} enctype
 */
UrForm.prototype.setEnctype = function(enctype){
    this.enctype = enctype;
    if(this.enctype != undefined)
        this.element.setAttribute("enctype", this.enctype);
};
/**
 * @returns {Array<UrDom>}
 */
UrForm.prototype.getFormElement=function(){
    return this.formElement;
}
/**
 * @returns {{}}
 */
UrForm.prototype.serialize = function(){
    var tmp = {};
    for(i in this.formElement)
        tmp[i] = this.formElement[i].getValue();
    return tmp;
}
/**
 * @param {function} method
 */
UrForm.prototype.submit = function(method){ this.element.onsubmit = method; };