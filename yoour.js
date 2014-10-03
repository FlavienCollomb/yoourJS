/* VERSION 1.0 \|/ Copyright (C) 2014 Flavien Collomb Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
/**
 * UrObject object is the base object of Core and Ui.
 * @param {string} type
 * @param {string} [name]
 * @constructor
 */
var UrObject = function(type, name){
    this.type = type;
    this.name = name;
};
/**
 * @returns {string}
 */
UrObject.prototype.getName = function(){ return this.name; };
/**
 * @param {string} name
 */
UrObject.prototype.setName = function(name){ this.name = name; };
/**
 * @returns {string}
 */
UrObject.prototype.getType = function(){ return this.type; };
/**
 * @param {string} type
 */
UrObject.prototype.setType = function(type){ this.type = type; };
/**
 * The UrString class provides a Unicode character string.
 * @param {string} str
 * @param {string} [name]
 * @constructor
 */
var UrString = function(str, name){
    UrObject.call(this, "UrString", name);
    this.str = str;
};
UrString.prototype=new UrObject();
UrString.prototype.constructor=UrString;
/**
 * @returns {string}
 */
UrString.prototype.capitalize = function(){
    return this.str.charAt(0).toUpperCase() + this.str.slice(1);
};
/**
 * @returns {string}
 */
UrString.prototype.toCamelCase = function(separator){
    if(separator == undefined) separator = "-";
    if(this.str.indexOf(separator) != -1){
        var tmp = this.str.split(separator);
        this.str = "";
        for(var i = 0; i < tmp.length; i++){
            if(i == 0) this.str += tmp[i];
            else {
                var str = new UrString(tmp[i]);
                this.str += str.capitalize();
            }
        }
    }
    return this.str;
};
/**
 * The UrJson class provides an interface for JSON
 * @param {Object} json
 * @param {string} [name]
 * @constructor
 */
var UrJson = function(json, name){
    UrObject.call(this, "UrJson", name);
    this.json = json;
};
UrJson.prototype=new UrObject();
UrJson.prototype.constructor=UrJson;
/**
 * @param {string} oldKey
 * @param {string} newKey
 * @param {string|number|Object|Function|Node|boolean} value
 */
UrJson.prototype.replace = function(oldKey, newKey, value){
    this.json[newKey] = value;
    delete this.json[oldKey];
};
/**
 * @param {Function} callback
 * @param {Object} context
 */
UrJson.prototype.each = function(callback, context){
    for(var i in this.json) {
        if(context == undefined)
            callback(i, this.json[i]);
        else
            callback.call(context, i, this.json[i]);
    }
};
/**
 * @returns {Object}
 */
UrJson.prototype.get = function(){ return this.json; };
/**
 * @param {string} key
 * @returns {*}
 */
UrJson.prototype.getValue = function(key){ return this.json[key]; };
/**
 * @param {string} key
 * @returns {*}
 */
UrJson.prototype.setValue = function(key, value){ this.json[key] = value; };
/**
 * The UrStyle class is the base class that encapsulates the look and feel of one UrDom
 * @param {Object} style
 * @param {UrDom} element
 * @constructor
 */
var UrStyle = function(style, element){
    UrObject.call(this, "UrStyle");
    /** @type UrDom */ this.element = element;

    if(style != undefined){
        this.json = new UrJson(style);
        this.design();
    }
    else
        this.json = new UrJson({});
};
UrStyle.prototype=new UrObject();
UrStyle.prototype.constructor=UrStyle;

UrStyle.prototype.design = function(){
    this.element.style = this;
    if(this.element != undefined) this.json.each(this.set, this);
};
/**
 * @param {string} attribute
 * @param {string|number} style
 */
UrStyle.prototype.set = function(attribute, style){
    attribute = new UrString(attribute).toCamelCase();
    this.json.setValue(attribute, style);
    this.element.getElement().style[attribute] = style;
};
/**
 * @param {string} attribute
 * @returns {*}
 */
UrStyle.prototype.get = function(attribute){
    attribute = new Urtring(attribute).toCamelCase();
    if(this.json.getValue(attribute) != undefined) return this.json[attribute];
    else return this.elem.getNode().style[attribute];
};
/**
 * @param {UrDom} elem
 * @returns {UrStyle}
 */
UrStyle.prototype.copy = function(elem){
    return new UrStyle(this.json.get(), elem);
};
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
/**
 * The UrValidatorRegExp class is used to check a string against a regular expression.
 * @param {Object} settings
 *      @param {string} settings.pattern
 *      @param {string} [settings.modifiers]
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.message]
 *      @param {string} [settings.type]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorRegExp = function(settings){
    if(settings == undefined) settings = {};

    UrValidator.call(this, settings);
    this.setType(settings.type);

    /** @type {RegExp} */ this.regexp;

    this.setRegExp(settings.pattern,settings.modifiers);
};
UrValidatorRegExp.prototype=new UrValidator();
UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;
/**
 * @param {string} type
 */
UrValidatorRegExp.prototype.setType = function(type){
    this.type = type;
    if(this.type == type)
        this.type = "UrValidatorRegExp";
};
/**
 * @param {string} pattern
 * @param {string} [modifiers]
 */
UrValidatorRegExp.prototype.setRegExp = function(pattern, modifiers){
    if(modifiers != undefined) this.regexp = new RegExp(pattern, modifiers);
    else this.regexp = new RegExp(pattern);

    if(this.messages["regexp"] == undefined)
        this.messages["regexp"] = "The field doesn't respect the pattern";
};
/**
 * @param value
 * @returns {boolean}
 */
UrValidatorRegExp.prototype.validate = function(value){
    this.error = undefined;
    if(!UrValidator.prototype.validate.call(this, value)){
        this.error = this.messages["mandatory"];
        return false;
    }
    else{
        if(value != ""){
            if(!this.regexp.test(value)){
                this.error =  this.messages["regexp"];
                return false;
            }
        }
    }

    return true;
};
/**
 * @param {string} type
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {UrDom}          [settings.element]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 * @constructor
 */
var UrDom = function(type, settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, type, settings.name);
    /** @type UrDom */ this.parent = settings.parent;
    /** @type HTMLElement|Node|DocumentFragment */ this.element = settings.element;

    this.style, this.id, this.name, this.className;
    var that = this;
    /**
     * Use in case a pure UrDom is created
     */
    (function setNode(){
        if(that.element == undefined) that.element = document.createElement("div");
        else{
            try { if(that.element instanceof jQuery) that.element = that.element[0]; } catch(e) {}
        }
    })();

    this.setStyle(settings.style);
    this.setId(settings.id);
    this.setName(settings.name);
    this.setClassName(settings.className);

    if(this.parent != undefined) this.parent.addChild(this);
};
UrDom.prototype=new UrObject();
UrDom.prototype.constructor=UrDom;

UrDom.prototype.remove = function(){ this.getParent().getElement().removeChild(this.getElement()); };
/**
 * @param {UrDom} object
 */
UrDom.prototype.setParent = function(object){ this.parent = object; };
/**
 * @returns {UrDom}
 */
UrDom.prototype.getParent = function(){ return this.parent; };
/**
 * @returns {HTMLElement|Node|DocumentFragment}
 */
UrDom.prototype.getElement = function(){ return this.element; };
/**
 * @param {Object|UrStyle} style
 */
UrDom.prototype.setStyle = function(style){
    this.style = style;
    if(this.style != undefined){
        if(this.style instanceof UrStyle)
            this.style.copy(this);
        else
            this.style = new UrStyle(style, this);
    }
    else
        this.style = new UrStyle(undefined, this);
};
/**
 * @param {string} id
 */
UrDom.prototype.setId = function(id){
    this.id = id;
    if(this.id != undefined) this.element.id = id;
};
/**
 * @param {string} id
 */
UrDom.prototype.setName = function(name){
    this.name = name;
    if(this.name != undefined) this.element.name = name;
};
/**
 * @param {string} className
 */
UrDom.prototype.setClassName = function(className){
    this.className = className;
    if(this.className != undefined) this.element.className = className;
};
/**
 * @returns {string}
 */
UrDom.prototype.getId = function(){ return this.id; };
/**
 * @returns {UrStyle}
 */
UrDom.prototype.getStyle = function(){ return this.style; };
/**
 * @param {Function} method
 */
UrDom.prototype.click = function(method) { this.element.onclick =  method; };
/**
 * @param {Function} method
 */
UrDom.prototype.twoClick = function(method) { this.element.ondblclick = method; };
/**
 * @param {Function} method
 */
UrDom.prototype.mouseIn = function(method){ this.element.onmouseover = method; };
/**
 * @param {Function} method
 */
UrDom.prototype.mouseOut = function(method){ this.element.onmouseout = method; };
/**
 * @param {Function} method
 */
UrDom.prototype.mouseLeave = function(method){ this.element.onmouseleave = method; };
/**
 * The UrWidget object is the base object of all user node.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {UrDom}          [settings.element]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 * @param {string} [type]
 * @constructor
 */
var UrWidget = function(settings, type){
    if(type == "" || type == undefined) type = "UrWidget";
    if(settings == undefined) settings = {};
    UrDom.call(this, type, settings);

    /** @type string */ this.html;
    this.children = [];
    this.children["types"] = {};
    this.children["names"] = {};

    this.setHtml(settings.html);
};
UrWidget.prototype=new UrDom();
UrWidget.prototype.constructor=UrWidget;
/**
 * @param {UrDom} object
 */
UrWidget.prototype.addChild = function(object){
	this.children.push(object);

    if(object.getType() != undefined){
        if(this.children["types"][object.getType()] == undefined)
            this.children["types"][object.getType()] = [];
        this.children["types"][object.getType()].push(object);
    }

    if(object.getName() != undefined) this.children["names"][object.getName()] = object;

    this.element.appendChild(object.element);

    object.setParent(this);
};
/**
 * @param {string} html
 */
UrWidget.prototype.setHtml = function(html){
    this.html = html;
    if(this.html != undefined) this.element.innerHTML = html;
};
/**
 * @returns {string}
 */
UrWidget.prototype.getHtml = function(){
    return this.html;
};
/**
 * @returns {UrDom}
 */
UrWidget.prototype.getChildren = function(){ return this.children; };
/**
 * @param {string} name
 * @returns {UrDom}
 */
UrWidget.prototype.getChildByName = function(name){
    return this.children["names"][name];
};
/**
 * @param type
 * @returns {Array<UrDom>}
 */
UrWidget.prototype.getChildrenByType = function(type){
//    var children = [];
//    for(var i in this.children)
//        if(this.children[i].getType() == type)
//            children.push(this.children[i]);
//    return children;
};
UrWidget.prototype.remove = function(){
    this.removeAllChildren();
    UrDom.prototype.remove.call(this);
};
/**
 * @param {string} name
 */
UrWidget.prototype.removeChildByName = function(name){
    this.element.removeChild(this.children["names"][name].getElement());
    delete this.children["names"][name];
};
UrWidget.prototype.removeAllChildren = function(){
    while (this.element.firstChild)
        this.element.removeChild(this.element.firstChild);
    this.children = {};
};
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
/**
 * The UrValidatorEmail class is used to check an email.
 * @param {Object} settings
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.messages]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorEmail = function(settings){
    if(settings == undefined) settings = {};
    settings["pattern"] = "^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$";
    settings["modifiers"] = "i";
    settings["type"] = "UrValidatorEmail";

    UrValidatorRegExp.call(this, settings);
};
UrValidatorEmail.prototype=new UrValidatorRegExp();
UrValidatorEmail.prototype.constructor=UrValidatorEmail;

UrValidatorEmail.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};
/**
 * The UrValidatorEmail class is used to check an URL.
 * @param {Object} settings
 *      @param {string} [settings.mandatory]
 *      @param {string} [settings.messages]
 *      @param {string} [settings.name]
 * @constructor
 */
var UrValidatorURL = function(settings){
    if(settings == undefined) settings = {};
    settings["pattern"] = "(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)";
    settings["modifiers"] = "i";
    settings["type"] = "UrValidatorURL";

    UrValidatorRegExp.call(this, settings);
};
UrValidatorURL.prototype=new UrValidatorRegExp();
UrValidatorURL.prototype.constructor=UrValidatorURL;

UrValidatorURL.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};
/**
 * The UrCustomInput object is used to construct an input with choiced type.
 * The future behaviour of UrCustomInput may be unstable: you must create an input with existing type. Be careful!
 * @param {string} inputType
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
 * @constructor
 */
var UrCustomInput = function(inputType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    var tmp = new UrString(inputType);
    UrInput.call(this, settings, "Ur"+tmp.capitalize());
    this.inputType = this.element.type = inputType;
};
UrCustomInput.prototype=new UrInput();
UrCustomInput.prototype.constructor=UrCustomInput;
/**
 * The UrCustomWidget object is used to construct a widget with choiced type.
 * The future behaviour of UrCustomWidget may be unstable: you must create an input with existing type. Be careful!
 * @param {string} widgetType
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 * @constructor
 */
var UrCustomWidget = function(widgetType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement(widgetType);

    var tmp = new UrString(widgetType);
    UrWidget.call(this, settings, "Ur"+tmp.capitalize());
};
UrCustomWidget.prototype=new UrWidget();
UrCustomWidget.prototype.constructor=UrCustomWidget;
/**
 * The UrDataTable object create a table of result thanks a JSON of correspondence.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {Array<Object>}  settings.datas
 *      @param {Object}         settings.description
 * @constructor
 */
var UrDataTable = function(settings){
    /**
     * PRIVATE
     */
    head=function(description){
        that.head = new UrCustomWidget("thead", {"parent":that});
        var tr = new UrCustomWidget("tr", {"parent":that.head});
        for(var i in that.description)
            if(that.description[i]["hide"] == undefined){
                var th = new UrCustomWidget("th", {"parent":tr,"html":that.description[i]["title"]});
        }
    };
    /**
     * @type {UrDataTable}
     */
    var that = this;

    if(settings == undefined) settings = {};

    /** @type UrCustomWidget */ this.head;
    /** @type UrCustomWidget */ this.body;
    /** @type Array<UrCustomWidget> */ this.lines = [];
    /** @type Object */ this.description = settings.description;


    if(settings.datas != undefined && settings.datas instanceof Array && settings.datas.length > 0){
        settings.element = document.createElement("table");
        UrWidget.call(this, settings, "UrDataTable");
        head();
        this.body = new UrCustomWidget("tbody", {"parent":this});
        this.add(settings.datas);
    }
};
UrDataTable.prototype=new UrWidget();
UrDataTable.prototype.constructor=UrDataTable;

UrDataTable.prototype.add = function(datas){
    for(var i in datas){
        var tr = new UrCustomWidget("tr", {"parent":this.body});
        this.lines.push(tr);

        for(var j in this.description){
            var td = new UrCustomWidget("td", {"parent":tr, "html": datas[i][j]});

            if(this.description[j]["improve"] != undefined){
                var params = {"parent":td, "index": i};
                for(var k = 0; k<this.description[j]["params"].length;k++){
                    var param = this.description[j]["params"][k];
                    if(this.description[param] != undefined)
                        params[param] = datas[i][param];
                    else
                        params[param] = param;
                }

                (function(json, description){
                    var funct = description[j]["improve"];
                    funct(json);
                }(params, this.description));
            }
        }
    }
};
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getHead = function(){ return this.head; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getBody = function(){ return this.body; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getLines = function(){ return this.lines; }
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
/**
 * @param {string} [name]
 * @constructor
 */
var UrFragment = function(name){
    var settings = {};
    settings.name = name;
    settings.element = document.createDocumentFragment();

    UrWidget.call(this, settings, "UrFragment");
};
UrFragment.prototype=new UrWidget();
UrFragment.prototype.constructor=UrFragment;

/**
 * The UrImage object provides an image widget.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.src]
 *      @param {string}         [settings.alt]
 *      @param {string}         [settings.width]
 *      @param {string}         [settings.height]
 *
 * @constructor
 */
var UrImage = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("img");

    /**@type string*/this.src,
    /**@type string*/this.alt,
    /**@type int*/this.width,
    /**@type string*/ this.height;

    UrDom.call(this, "UrImage", settings);

    this.setSrc(settings.src);
    this.setTarget(settings.target);
    this.setWidth(settings.width);
    this.setHeight(settings.height);
};
UrImage.prototype=new UrDom();
UrImage.prototype.constructor=UrImage;
/**
 * @param {string} src
 */
UrImage.prototype.setSrc = function(src){
    this.src = src;
    if(this.src != undefined) this.element.src = this.src;
}
/**
 * @param {string} alt
 */
UrImage.prototype.setTarget = function(alt){
    this.alt = alt;
    if(this.alt != undefined) this.element.alt = this.alt;
}
/**
 * @param {int} width
 */
UrImage.prototype.setWidth = function(width){
    this.width = width;
    if(this.width != undefined) this.element.width = this.width;
};
/**
 * @param {int} height
 */
UrImage.prototype.setHeight = function(height){
    this.height = height;
    if(this.height != undefined) this.element.height = this.height;
};


/**
 * The UrInputText is used to construct input of type text
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
 * @constructor
 */
var UrInputText = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    UrInput.call(this, settings, "UrInputText");
    this.inputType = this.element.type = "text";
};
UrInputText.prototype=new UrInput();
UrInputText.prototype.constructor=UrInputText;
/**
 * The UrLine object create a line with X parts to facilitate your UI creation
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 *      @param {number}         settings.partsNumber
 *      @param {string}         [settings.partsClassName]
 *      @param {Object|UrStyle} [settings.partsStyle]
 * @constructor
 */
var UrLine = function(settings){
    if(settings == undefined) settings = {};

    /**@type Array<UrWidget>*/this.parts=[];

    UrWidget.call(this, settings, "UrLine");

    for(var i=0; i<settings.partsNumber; i++)
        this.parts.push(new UrWidget({"parent":this,"className":settings.partsClassName,"style":settings.partsStyle}));
};
UrLine.prototype=new UrWidget();
UrLine.prototype.constructor=UrLine;
/**
 * @param {number} index
 * @returns {UrWidget}
 */
UrLine.prototype.getPart=function(index){
    return this.parts[index];
};
/**
 * The UrLink object create a link
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 *      @param {string}         [settings.href]
 *      @param {string}         [settings.target]
 * @constructor
 */
var UrLink = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("a");

    /**@type string*/this.href,
    /**@type string*/this.target;

    UrWidget.call(this, settings, "UrLink");

    this.setHref(settings.href);
    this.setTarget(settings.target);
};
UrLink.prototype=new UrWidget();
UrLink.prototype.constructor=UrLink;
/**
 * @param {string} href
 */
UrLink.prototype.setHref = function(href){
    this.href = href;
    if(this.href != undefined) this.element.href = this.href;
};
/**
 * @param {string} target
 */
UrLink.prototype.setTarget = function(target){
    this.target = target;
    if(this.target != undefined) this.element.setAttribute("target", this.target);
};
/**
 * @returns {string}
 */
UrLink.prototype.getHref = function(){
    return this.href;
};
/**
 * @returns {string}
 */
UrLink.prototype.getTarget = function(){
    return this.target;
};
/**
 * The UrPopup object create a popup.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {UrWidget}       [settings.closeWidget]
 *      @param {boolean}        [settings.modal]
 * @constructor
 */
var UrPopup=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {
            "position":"absolute",
            "left":"50%",
            "top":"150px",
            "background":"white",
            "width":"600px",
            "margin-left":"-300px"
        };

//    settings.style["z-index"]=11;

    var body = document.getElementsByTagName("body")[0];
    this.body = new UrWidget({"element": body});
    settings.parent = this.body;

    /** @type UrWidget */ this.bg;
    /** @type UrWidget */ this.closeWidgetContainer;
    /** @type UrWidget */ this.closeWidget;
    /** @type UrWidget */ this.content;

    this.setBg();
    UrWidget.call(this, settings, "UrPopup");
    this.setCloseWidget(settings.closeWidget);
    this.setModal(settings.modal);
    this.setContent(settings.content);
};
UrPopup.prototype=new UrWidget();
UrPopup.prototype.constructor=UrPopup;

UrPopup.prototype.setBg=function(){
    this.bg=new UrWidget({
        "parent":this.body,
        "style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}
    });
};
/**
 * @returns {UrWidget}
 */
UrPopup.prototype.getBg=function(){ return this.bg; };
/**
 * @param {UrWidget} closeWidget
 */
UrPopup.prototype.setCloseWidget=function(closeWidget){
    var that = this;

    if(this.closeWidgetContainer != undefined)
        this.closeWidgetContainer.remove();

    this.closeWidget = closeWidget;
    if(this.closeWidget != undefined){
        this.closeWidgetContainer = new UrWidget({"parent":this});
        this.closeWidgetContainer.addChild(this.closeWidget);
        this.closeWidgetContainer.addChild(new UrWidget({"parent":this.closeWidgetContainer,"style":{"clear":"both"}}));

        this.closeWidget.click(function(){
            that.bg.remove();
            that.remove();
        });
    }
};
/**
 * @param {boolean} modal
 */
UrPopup.prototype.setModal=function(modal){
    var that = this;

    if(modal == true){
        if(this.closeWidget != undefined)
            this.closeWidget.remove();
        this.bg.click(function(){});
    }
    else
        this.bg.click(function(){
            that.bg.remove();
            that.remove();
        });
};
/**
 * @param {UrWidget} content
 */
UrPopup.prototype.setContent=function(content){
    if(this.content != undefined)
        this.content.remove();

    this.content = content;
    if(this.content != undefined){
        this.addChild(this.content);
    }
};
UrPopup.prototype.close=function(){
    this.bg.remove();
    this.remove();
};
/**
 * The UrProgressBar object create a progress bar. Default : progress bar like Youtube
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {number} [settings.speed]
 * @constructor
 */
var UrProgressBar=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};

    /** @type {number} */ this.width = this.currentVal = 0;
    /** @type {Object} */ this.interval;

    /**@type string*/this.speed;

    UrWidget.call(this, settings, "UrProgressBar");

    this.setSpeed(settings.speed);
};
UrProgressBar.prototype=new UrWidget();
UrProgressBar.prototype.constructor=UrProgressBar;
/**
 * @param {number} speed
 */
UrProgressBar.prototype.setSpeed = function(speed){
    this.speed = speed;
    if(this.speed == undefined) this.speed = 400;
};
/**
 * @param {number} val
 */
UrProgressBar.prototype.less = function(val, callback){
    if(this.interval != undefined){
        clearInterval(this.interval);
        this.set(this.currentVal);
    }

    this.currentVal = this.width - val;
    var time = this.speed / val;
    var that = this;

    this.interval = setInterval(function(){
        that.width -= 1;

        that.getStyle().set("width",that.width + "%");
        if(that.width == that.currentVal){
            clearInterval(that.interval);
            that.interval = undefined;
            if(callback!=undefined) callback();
        }
    },time);
};
/**
 * @param {number} val
 */
UrProgressBar.prototype.more = function(val, callback){
    if(this.interval != undefined){
        clearInterval(this.interval);
        this.set(this.currentVal);
    }

    this.currentVal = this.width + val;
    var time = this.speed / val;
    var that = this;

    this.interval = setInterval(function(){
        that.width += 1;
        that.getStyle().set("width",that.width + "%");
        if(that.width == that.currentVal || that.width == 100){
            clearInterval(that.interval);
            that.interval = undefined;
            if(callback!=undefined) callback();
        }
    },time);
};
UrProgressBar.prototype.set = function(val){
    this.currentVal = this.width = val;
    this.getStyle().set("width",this.width + "%");
};
UrProgressBar.prototype.done = function(callback){
    var val = 100 - this.width;
    var that = this;

    this.more(val,function(){
        that.remove();
        if(callback != undefined) callback();
    });
};
/**
 * The UrTable object create a table.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {number}         settings.columnNumber
 *      @param {Array}          [settings.head]
 * @constructor
 */
var UrTable=function(settings){
    /**
     * PRIVATE
     */
    head=function(){
        if (settings.head != undefined) {
            that.head = new UrCustomWidget("thead", {"parent":that});
            var tr = new UrCustomWidget("tr", {"parent":that.head});

            for(var i=0; i<settings.head.length;i++)
                var th = new UrCustomWidget("th", {"parent":tr,"html":settings.head[i]});
        }
    };

    /**
     * @type {UrTable}
     */
    var that = this;

    if(settings == undefined) settings = {};

    /** @type number */ this.columnNumber;
    /** @type UrCustomWidget */ this.head;
    /** @type UrCustomWidget */ this.body;
    /** @type Array<UrCustomWidget> */ this.lines = [];

    this.setColumnNumber(settings.columnNumber);
    settings.element = document.createElement("table");
    UrWidget.call(this, settings, "UrTable");
    head();
    this.body = new UrCustomWidget("tbody", {"parent":this});
};
UrTable.prototype=new UrWidget();
UrTable.prototype.constructor=UrTable;
/**
 * @param columnNumber
 */
UrTable.prototype.setColumnNumber = function(columnNumber){
    this.columnNumber = 0;
    if(columnNumber !=  undefined)
        this.columnNumber = columnNumber;
};
UrTable.prototype.add = function(){
    var tr = new UrCustomWidget("tr", {"parent":this.body});
    this.lines.push(tr);
    for(var i=0; i < this.columnNumber; i++)
        new UrCustomWidget("td", {"parent":tr});
    return tr;
};
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getHead = function(){ return this.head; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getBody = function(){ return this.body; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getLines = function(){ return this.lines; };
/**
 * The UrTextarea is used to construct textarea
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
 *      @param {number}         [settings.rows]
 *      @param {number}         [settings.cols]
 * @constructor
 */
var UrTextarea = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("textarea");

    this.rows, this.cols;

    UrInput.call(this, settings, "UrTextarea");

    this.setRows(settings.rows);
    this.setCols(settings.cols);
};
UrTextarea.prototype=new UrInput();
UrTextarea.prototype.constructor=UrTextarea;
/**
 * @param {number} rows
 */
UrTextarea.prototype.setRows = function(rows){
    this.rows = rows;
    if(this.rows != undefined) this.element.rows = this.rows;
};
/**
 * @param {number} cols
 */
UrTextarea.prototype.setCols = function(cols){
    this.cols = cols;
    if(this.cols != undefined) this.element.cols = this.cols;
};

