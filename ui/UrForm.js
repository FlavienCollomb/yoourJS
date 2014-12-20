/**
 * The UrForm object is used to construct form
 * @class UrForm
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrForm name
 *      @param {UrWidget}       [settings.parent] UrForm's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrForm
 *      @param {String}         [settings.className] HTML attribute "class" of UrForm
 *      @param {Object|UrStyle} [settings.style] Style of UrForm
 *      @param {String}         [settings.html] HTML content of UrForm
 *      @param {String}         [settings.method] Method of UrForm
 *      @param {String}         [settings.action] Action of UrForm
 *      @param {String}         [settings.enctype] Enctype of UrForm
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body,
 *          "method":"post",
 *          "action":"test.php",
 *          "style":{"height":"250px","background":"black"}
 *      });
 *      var input1 = new UrInputText({"name":"input1"});
 *      form.add(input1);
 * @constructor
 */
var UrForm = function(settings){
    /**
     * @property method
     * @type String
     * @description Method of UrForm
     */
    this.method;
    /**
     * @property action
     * @type String
     * @description Action of UrForm
     */
    this.action;
    /**
     * @property enctype
     * @type String
     * @description Enctype of UrForm
     */
    this.enctype;
    /**
     * @property formElement
     * @type Object
     * @description UrDom/UrWidget elements in UrForm
     */
    this.formElement = {};

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"method":["string"],"action":["string"],"enctype":["string"]});

        settings.element = document.createElement("form");

        UrWidget.call(this, settings, "UrForm");

        this.setMethod(settings.method);
        this.setAction(settings.action);
        this.setEnctype(settings.enctype);
    }
};
UrForm.prototype=new UrWidget();
UrForm.prototype.constructor=UrForm;
/**
 * Add UrField in UrForm and save it in formElement property
 * @method add
 * @for UrForm
 * @param {UrField} element
 * @param {UrWidget} [element]
 */
UrForm.prototype.add = function(element,parent){
    if(parent==undefined)
        this.addChild(element);
    else
        parent.addChild(element);

    if(element instanceof UrInputRadio || element instanceof UrInputCheckbox){
        if(this.formElement[element.getName()] == undefined)
            this.formElement[element.getName()] = [];
        this.formElement[element.getName()].push(element);
    }
    else
        this.formElement[element.getName()] = element;
};
/**
 * Set method of UrForm
 * @method setMethod
 * @for UrForm
 * @param {String} method
 */
UrForm.prototype.setMethod = function(method){
    this.method = method;
    if(this.method != undefined)
        this.element.setAttribute("method", this.method);
};
/**
 * Set action of UrForm
 * @method setMethod
 * @for UrForm
 * @param {String} action
 */
UrForm.prototype.setAction = function(action){
    this.action = action;
    if(this.action != undefined)
        this.element.setAttribute("action", this.action);
};
/**
 * Set enctype of UrForm
 * @method setEnctype
 * @for UrForm
 * @param {String} enctype
 */
UrForm.prototype.setEnctype = function(enctype){
    this.enctype = enctype;
    if(this.enctype != undefined)
        this.element.setAttribute("enctype", this.enctype);
};
/**
 * Get UrForm's UrField
 * @method getFormElement
 * @for UrForm
 * @return {Array}
 */
UrForm.prototype.getFormElement=function(){
    return this.formElement;
};
/**
 * Serialize (Object of value) UrForm's UrField
 * @method serialize
 * @for UrForm
 * @return {Object}
 */
UrForm.prototype.serialize = function(){
    var tmp = {};
    for(i in this.formElement){
        if(this.formElement[i] instanceof Array){
            tmp[i] = [];
            for(var j=0; j<this.formElement[i].length; j++)
                if(this.formElement[i][j].getElement().checked)
                    tmp[i].push(this.formElement[i][j].getValue());
        }
        else
            tmp[i] = this.formElement[i].getValue();
    }

    return tmp;
};
/**
 * Add event on submit
 * @method submit
 * @for UrForm
 * @param {Function} method
 */
UrForm.prototype.submit = function(method){ this.element.onsubmit = method; };