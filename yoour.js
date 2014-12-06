/*Copyright (C) 2014 Flavien Collomb Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
/**
 * UrObject object is the base object of Core and Ui.
 * @class UrObject
 * @author Flavien Collomb
 * @param {String} type UrObject type
 * @param {String} name UrObject name
 * @constructor
 */
var UrObject = function(type, name){
    /**
     * @property type
     * @type String
     */
    this.type = type;
    /**
     * @property name
     * @type String
     */
    this.name = name;
};
/**
 * Get the name of the UrObject
 * @method getName
 * @for UrObject
 * @return {String}
 */
UrObject.prototype.getName = function(){ return this.name; };
/**
 * Set the name of the UrObject
 * @method setName
 * @for UrObject
 * @param {String} name
 */
UrObject.prototype.setName = function(name){ this.name = name; };
/**
 * Get the type of the UrObject
 * @method getType
 * @for UrObject
 * @return {String}
 */
UrObject.prototype.getType = function(){ return this.type; };
/**
 * Set the type of the UrObject
 * @method setType
 * @for UrObject
 * @param {String} type
 */
UrObject.prototype.setType = function(type){ this.type = type; };
/**
 * The UrValidator class provides validation of field.
 * @class UrValidator
 * @extends UrObject
 * @param {Object} settings
 *      @param {string} [settings.mandatory] Mandatory field ?
 *      @param {string} [settings.messages] Messages used for each error
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
    /**
     * @property error
     * @type String
     * @description Current error message
     */
    this.error;

    this.setMessages(settings.messages);
    this.setMandatory(settings.mandatory);
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
/**
 * The UrValidatorRegExp class is used to check a string against a regular expression.
 * @class UrValidatorRegExp
 * @extends UrValidator
 * @param {Object} settings
 *      @param {String} settings.pattern Pattern used for the Regexp validation
 *      @param {String} [settings.modifiers] Modifiers used for the Regexp validation
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.type] UrValidatorRegExp type
 *      @param {String} [settings.name] UrValidatorRegExp name
 * @example
 *      var validator = new UrValidatorRegExp({
 *          "mandatory" : true,
 *          "pattern" : "toto",
 *          "messages" : {
 *              "mandatory":"Field 'toto' is mandatory",
 *              "regexp":"Must be 'toto'"
 *           }
 *       });
 * @constructor
 */
var UrValidatorRegExp = function(settings){
    if(settings == undefined) settings = {};

    UrValidator.call(this, settings);
    this.setType(settings.type);
    /**
     * @property regexp
     * @type String
     * @description RegExp used for the validation
     */
    this.regexp;

    this.setRegExp(settings.pattern,settings.modifiers);
};
UrValidatorRegExp.prototype=new UrValidator();
UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;
/**
 * Set UrValidatorRegExp type
 * @method setType
 * @for UrValidatorRegExp
 * @param {String} type
 */
UrValidatorRegExp.prototype.setType = function(type){
    this.type = type;
    if(this.type == undefined)
        this.type = "UrValidatorRegExp";
};
/**
 * Set the regexp of UrValidatorRegExp
 * @method setRegExp
 * @for UrValidatorRegExp
 * @param {String} pattern
 * @param {String} [modifiers]
 */
UrValidatorRegExp.prototype.setRegExp = function(pattern, modifiers){
    if(modifiers != undefined) this.regexp = new RegExp(pattern, modifiers);
    else this.regexp = new RegExp(pattern);

    if(this.messages["regexp"] == undefined)
        this.messages["regexp"] = "The field doesn't respect the pattern";
};
/**
 * Validate value
 * @method validate
 * @for UrValidatorRegExp
 * @param {String} value
 * @return {Boolean}
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
 * The UrString class provides a Unicode character string.
 * @class UrString
 * @extends UrObject
 * @author Flavien Collomb
 * @param {String} str Encapsulated String in UrString
 * @param {String} [name] UrString name
 * @constructor
 */
var UrString = function(str, name){
    UrObject.call(this, "UrString", name);
    /**
     * @property str
     * @type String
     * @description String encapsulated in UrString
     */
    this.str = str;
};
UrString.prototype=new UrObject();
UrString.prototype.constructor=UrString;
/**
 * Capitalize the string
 * @method capitalize
 * @for UrString
 * @return {String}
 */
UrString.prototype.capitalize = function(){
    return this.str.charAt(0).toUpperCase() + this.str.slice(1);
};
/**
 * Create CamelCase text thanks a separator
 * @method toCamelCase
 * @for UrString
 * @param {String} separator
 * @return {String}
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
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrJson class provides an interface for JSON
 * @class UrJson
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} json Object encapsulated in UrJson
 * @param {string} [name] UrJson name
 * @example
 *      var json = new UrJSON({"key1":"Key number 1","key2":"Key number 2"},"Your first UrJSON");
 * @constructor
 */
var UrJson = function(json, name){
    UrObject.call(this, "UrJson", name);
    /**
     * @property json
     * @type Object
     * @description Object encapsulated in UrJson
     */
    this.json = json;
};
UrJson.prototype=new UrObject();
UrJson.prototype.constructor=UrJson;
/**
 * Replace old key in UrJson by a new key with value in parameter
 * @method replace
 * @for UrJson
 * @param {string} oldKey Old key in object
 * @param {string} newKey New key in object
 * @param {*} value Value associated with the new key
 */
UrJson.prototype.replace = function(oldKey, newKey, value){
    this.json[newKey] = value;
    delete this.json[oldKey];
};
/**
 * Apply function on each key of UrJson
 * @method each
 * @for UrJson
 * @param {Function} callback Function called on each key of the object
 * @param {Object} context Given "this" value for call callback function
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
 * Get object encapsulate in UrJson
 * @method get
 * @for UrJson
 * @return {Object}
 */
UrJson.prototype.get = function(){ return this.json; };
/**
 * Get value of a key in UrJson
 * @method getValue
 * @for UrJson
 * @param {String} key
 * @return {*}
 */
UrJson.prototype.getValue = function(key){ return this.json[key]; };
/**
 * Set value with key in UrJson
 * @method setValue
 * @for UrJson
 * @param {String} key
 */
UrJson.prototype.setValue = function(key, value){ this.json[key] = value; };
/**
 * The UrStyle class is the base class that encapsulates the look and feel of one UrDom
 * @class UrStyle
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} style Object with style attributes
 * @param {UrDom} UrDom element stylized
 * @example
 *      var style = new UrStyle(
 *          {"background":"black"},
 *          new UrWidget({"element": document.getElementsByTagName("body")[0]})
 *      );
 * @constructor
 */
var UrStyle = function(style, element){
    UrObject.call(this, "UrStyle");
    /**
     * @property element
     * @type UrDom
     */
    this.element = element;
    /**
     * @property json
     * @type UrJson
     */
    this.json;

    if(style != undefined){
        this.json = new UrJson(style);
        this.design();
    }
    else
        this.json = new UrJson({});
};
UrStyle.prototype=new UrObject();
UrStyle.prototype.constructor=UrStyle;
/**
 * Apply style on UrDom element
 * @method design
 * @for UrStyle
 */
UrStyle.prototype.design = function(){
    this.element.style = this;
    if(this.element != undefined) this.json.each(this.set, this);
};
/**
 * Set a style attribute
 * @method set
 * @for UrStyle
 * @param {String} attribute
 * @param {String|Number} style
 */
UrStyle.prototype.set = function(attribute, style){
    attribute = new UrString(attribute).toCamelCase();
    this.json.setValue(attribute, style);
    this.element.getElement().style[attribute] = style;
};
/**
 * Get a style attribute
 * @method set
 * @for UrStyle
 * @param {String} attribute
 * @return {*}
 */
UrStyle.prototype.get = function(attribute){
    attribute = new Urtring(attribute).toCamelCase();
    if(this.json.getValue(attribute) != undefined) return this.json[attribute];
    else return this.elem.getNode().style[attribute];
};
/**
 * Copy the style in other UrDom element
 * @method set
 * @for UrStyle
 * @param {UrDom} elem
 * @return {UrStyle}
 */
UrStyle.prototype.copy = function(elem){
    return new UrStyle(this.json.get(), elem);
};
/**
 * The UrDom object is the base object of all ui objects.
 * @class UrDom
 * @extends UrObject
 * @author Flavien Collomb
 * @param {String} type
 * @param {Object} settings
 *      @param {String}         [settings.name] UrDom name
 *      @param {UrWidget}       [settings.parent] UrDom's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {UrDom}          [settings.element] UrDom's HTML element already existing in the DOM
 *      @param {String}         [settings.id] HTML attribute "id" of UrDom
 *      @param {String}         [settings.className]  HTML attribute "class" of UrDom
 *      @param {Object|UrStyle} [settings.style] Style of UrDom
 * @constructor
 */
var UrDom = function(type, settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, type, settings.name);
    /**
     * @property parent
     * @type UrWidget
     * @description UrDom's parent in DOM (UrWidget or specialised UrWidget)
     */
    this.parent = settings.parent;
    /**
     * @property element
     * @type HTMLElement|Node|DocumentFragment
     * @description UrDom's HTML element already existing in the DOM
     */
    this.element = settings.element;
    /**
     * @property style
     * @type Object|UrStyle
     * @description Style of UrDom
     */
    this.style;
    /**
     * @property id
     * @type String
     * @description HTML attribute "id" of UrDom
     */
    this.id;
    /**
     * @property name
     * @type String
     * @description UrDom name
     */
    this.name;
    /**
     * @property className
     * @type String
     * @description HTML attribute "class" of UrDom
     */
    this.className;
    /**
     * @property that
     * @type UrDom
     * @private
     */
    var that = this;

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
/**
 * Remove UrDom element in DOM
 * @method remove
 * @for UrDom
 */
UrDom.prototype.remove = function(){ this.getParent().getElement().removeChild(this.getElement()); };
/**
 * Set UrWidget (or specialised object) parent of UrDom
 * @method setParent
 * @for UrDom
 * @param {UrDom} object
 */
UrDom.prototype.setParent = function(object){ this.parent = object; };
/**
 * Get UrDom's parent
 * @method getParent
 * @for UrDom
 * @return {UrDom}
 */
UrDom.prototype.getParent = function(){ return this.parent; };
/**
 * Get HTML element encapsulated in UrDom
 * @method getParent
 * @for UrDom
 * @return {HTMLElement|Node|DocumentFragment}
 */
UrDom.prototype.getElement = function(){ return this.element; };
/**
 * Set style of UrDom
 * @method setStyle
 * @for UrDom
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
 * Set HTML attribute "id" of UrDom
 * @method setId
 * @for UrDom
 * @param {String} id
 */
UrDom.prototype.setId = function(id){
    this.id = id;
    if(this.id != undefined) this.element.id = id;
};
/**
 * Set HTML attribute "className" of UrDom
 * @method setClassName
 * @for UrDom
 * @param {String} className
 */
UrDom.prototype.setClassName = function(className){
    this.className = className;
    if(this.className != undefined) this.element.className = className;
};
/**
 * Get HTML attribute "id" of UrDom
 * @method getId
 * @for UrDom
 * @return {String}
 */
UrDom.prototype.getId = function(){ return this.id; };
/**
 * Get HTML attribute "class" of UrDom
 * @method getClassName
 * @for UrDom
 * @return {String}
 */
UrDom.prototype.getClassName = function(){ return this.className; };
/**
 * Get style of UrDom
 * @method getStyle
 * @for UrDom
 * @return {UrStyle}
 */
UrDom.prototype.getStyle = function(){ return this.style; };
/**
 * Add event on click
 * @method click
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.click = function(method) { this.element.onclick =  method; };
/**
 * Add event on double click
 * @method twoClick
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.twoClick = function(method) { this.element.ondblclick = method; };
/**
 * Add event on mouse in
 * @method mouseIn
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.mouseIn = function(method){ this.element.onmouseover = method; };
/**
 * Add event on mouse out
 * @method mouseOut
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.mouseOut = function(method){ this.element.onmouseout = method; };
/**
 * Add event on mouse leave
 * @method mouseLeave
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.mouseLeave = function(method){ this.element.onmouseleave = method; };
/**
 * The UrWidget object is the base object of all user node.
 * @class UrWidget
 * @extends UrDom
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrWidget name
 *      @param {UrWidget}       [settings.parent] UrWidget's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {UrDom}          [settings.element] UrWidget's HTML element already existing in the DOM
 *      @param {String}         [settings.id] HTML attribute "id" of UrWidget
 *      @param {String}         [settings.className]  HTML attribute "class" of UrWidget
 *      @param {Object|UrStyle} [settings.style] Style of UrWidget
 *      @param {string}         [settings.html] HTML content of UrWidget
 * @param {string} [type] UrWidget type
 * @example
 *      var html = document.getElementsByTagName("html")[0];
 *      html = new UrWidget({
 *          "element": html,
 *          "id":"html",
 *          "className":"horizontalFull verticalFull",
 *          "style":{"fontSize":"146%"}
 *       });
 *       var widget = new UrWidget({
 *          "parent":html,
 *          "html":"First UrWidget"
 *       });
 *       html.addChild(new UrWidget({
 *          "parent":html,
 *          "html":"Second UrWidget"
 *       }));
 * @constructor
 */
var UrWidget = function(settings, type){
    if(type == "" || type == undefined) type = "UrWidget";
    if(settings == undefined) settings = {};
    UrDom.call(this, type, settings);

    /**
     * @property html
     * @type String
     * @description HTML content of UrWidget
     */
    this.html;
    /**
     * @property children
     * @type Array
     * @description Children added in UrWidget
     */
    this.children = [];
    /**
     * @property children.types
     * @type Object
     * @description Children added in UrWidget by type
     */
    this.children["types"] = {};
    /**
     * @property children.names
     * @type Object
     * @description Children added in UrWidget by name
     */
    this.children["names"] = {};

    this.setHtml(settings.html);
};
UrWidget.prototype=new UrDom();
UrWidget.prototype.constructor=UrWidget;
/**
 * Add child in UrWidget and in the DOM
 * @method addChild
 * @for UrWidget
 * @param {UrDom|UrWidget} object
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
 * Set HTML content of UrWidget
 * @method setHtml
 * @for UrWidget
 * @param {String} html
 */
UrWidget.prototype.setHtml = function(html){
    this.html = html;
    if(this.html != undefined) this.element.innerHTML = html;
};
/**
 * Get HTML content of UrWidget
 * @method getHtml
 * @for UrWidget
 * @return {String}
 */
UrWidget.prototype.getHtml = function(){
    return this.html;
};
/**
 * Get all children of UrWidget
 * @method getChildren
 * @for UrWidget
 * @return {Array}
 */
UrWidget.prototype.getChildren = function(){ return this.children; };
/**
 * Get a child of UrWidget thanks its name
 * @method getChildByName
 * @for UrWidget
 * @param {String} name
 * @return {UrDom}
 */
UrWidget.prototype.getChildByName = function(name){
    return this.children["names"][name];
};
/**
 * Remove UrWidget and children
 * @method remove
 * @for UrWidget
 */
UrWidget.prototype.remove = function(){
    this.removeAllChildren();
    UrDom.prototype.remove.call(this);
};
/**
 * Remove a child of UrWidget thanks its name
 * @method removeChildByName
 * @for UrWidget
 * @param {String} name
 */
UrWidget.prototype.removeChildByName = function(name){
    this.element.removeChild(this.children["names"][name].getElement());
    delete this.children["names"][name];
};
/**
 * Remove all children of UrWidget
 * @method removeAllChildren
 * @for UrWidget
 */
UrWidget.prototype.removeAllChildren = function(){
    while (this.element.firstChild)
        this.element.removeChild(this.element.firstChild);
    this.children = {};
};
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
    if(settings == undefined) settings = {};
    UrDom.call(this, type, settings);
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

    this.setEnable(settings.enable);
    this.setDefault(settings.defaultValue);
    this.setValidator(settings.validator);
    /**
     * @property valid
     * @type Boolean
     * @description Result of last validation of UrField
     */
    this.valid = true;
};
UrField.prototype=new UrDom();
UrField.prototype.constructor=UrField;
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
/**
 * Add event on focus
 * @method focus
 * @for UrField
 * @param {Function} method
 */
UrField.prototype.focus = function(method){ this.element.onfocus =  method; };
/**
 * Add event on blur
 * @method blur
 * @for UrField
 * @param {Function} method
 */
UrField.prototype.blur = function(method){ this.element.onblur =  method; };
/**
 * Add event on change
 * @method change
 * @for UrField
 * @param {Function} method
 */
UrField.prototype.change = function(method){ this.element.onchange = method; };
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
/**
 * The UrNavigation object let you manage your website navigation thanks JavaScript. Must be created once!
 * @class UrNavigation
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {Function} settings.defaultAction Function called when anchor in URL is not managed
 *      @param {string} [settings.name] UrNavigation name
 * @constructor
 * @example
 *      var navigation = new UrNavigation({
 *          "defaultAction":function(){
 *              console.log("Default action!");
 *          }
 *      });
 *      navigation.add({
 *          "anchor":"#link1",
 *          "action":function(){
 *              console.log("Action called on anchor #link1!");
 *          }
 *      });
 *      navigation.load();
 */
var UrNavigation=function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this,"UrNavigation",settings.name);
    /**
     * @property anchor
     * @description This property store anchors and associated callback
     * @type Object
     */
    this.anchor = {};
    /**
     * @property defaultAction
     * @description This property store functions called when anchor in URL is not in anchor property
     * @type Function
     */
    this.defaultAction;

    this.setDefaultAction(settings.defaultAction);
    this.current = window.location.hash;
    /**
     * @property _that
     * @type {UrNavigation}
     * @private
     */
    var _that = this;
    if(("onhashchange" in window))
        window.onhashchange = function(){
            _that.load.call(_that);
        }
};
UrNavigation.prototype=new UrObject();
UrNavigation.prototype.constructor=UrNavigation;
/**
 * Set default action
 * @method setDefaultAction
 * @for UrNavigation
 * @param {Function} defaultAction
 */
UrNavigation.prototype.setDefaultAction=function(defaultAction){
    this.defaultAction = defaultAction;
    if(this.defaultAction == undefined)
        this.defaultAction = function(){};
};
/**
 * Add anchor and associated action
 * @method add
 * @for UrNavigation
 * @param {Object} settings
 *      @param {String} settings.anchor
 *      @param {Function} settings.action
 */
UrNavigation.prototype.add=function(settings){
    if(settings == undefined) settings = {};
    if(settings.anchor != undefined)
        this.anchor[settings.anchor] = settings.action;
};
/**
 * Launch JavaScript navigation management
 * @method load
 * @for UrNavigation
 */
UrNavigation.prototype.load=function(){
    this.current = window.location.hash;

    if(this.anchor[this.current] != undefined)
        this.anchor[this.current](this.current);
    else
        this.defaultAction();
};
/**
 * Get current anchor in URL
 * @method getCurrent
 * @for UrNavigation
 * @return {String}
 */
UrNavigation.prototype.getCurrent=function(){
    return this.current;
};
/**
 * The UrSession object provides an interface for server-side SESSION
 * @class UrSession
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {string} [settings.endKeyword] Keyword of end of session / logout
 *      @param {Object} [settings.endCallback] Function called when session is finished / logout
 *      @param {Object} [settings.session] Object equal of server-side session
 *      @param {string} [settings.name] UrSession name
 * @example
 *      var session = new UrSession({
 *          "endKeyword":"logout",
 *          "endCallback":function(){
 *              window.location.href = "login.html"
 *          }
 *      });
 *      if(!session.isStop("logout"))
 *          console.log("Session is active!");
 * @constructor
 */
var UrSession=function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, "UrSession", settings.name);
    /**
     * @property endKeyword
     * @type String
     * @description Keyword of end of session / logout
     */
    this.endKeyword;
    /**
     * @property endCallback
     * @type Function
     * @description Function called when session is finished / logout
     */
    this.endCallback;
    /**
     * @property session
     * @type Object
     * @description Object equal of server-side session
     */
    this.session = {};
    this.set(settings.session);
    this.setEndKeyword(settings.endKeyword);
    this.setEndCallback(settings.endCallback);
};
UrSession.prototype=new UrObject();
UrSession.prototype.constructor=UrSession;
/**
 * Set end of session keyword
 * @method setEndKeyword
 * @for UrSession
 * @param {string} endKeyword
 */
UrSession.prototype.setEndKeyword=function(endKeyword){
    this.endKeyword=endKeyword;
};
/**
 * Get end of session keyword
 * @method getEndKeyword
 * @for UrSession
 * @return {String}
 */
UrSession.prototype.getEndKeyword=function(){
    return this.endKeyword;
};
/**
 * Set end of session callback function
 * @method setEndKeyword
 * @for UrSession
 * @param {Function} endCallback
 */
UrSession.prototype.setEndCallback=function(endCallback){
    this.endCallback=endCallback;
    if(this.endCallback == undefined)
        this.endCallback = function(){};
};
/**
 * Check if a keyword passed in parameter equal end of session keyword
 * @method isStop
 * @for UrSession
 * @param {String} keyword
 * @return {Boolean}
 */
UrSession.prototype.isStop=function(keyword){
    if(keyword==this.endKeyword){
        this.endCallback();
        return true;
    }
    else
        return false;
};
/**
 * Set session object
 * @method set
 * @for UrSession
 * @param {Object} session
 */
UrSession.prototype.set=function(session){
    this.session = session;
    if(this.session == undefined)
        this.session = {};
};
/**
 * Get session object
 * @method get
 * @for UrSession
 * @return {Object}
 */
UrSession.prototype.get=function(){
    return this.session;
};
/**
 * Set a value in session object
 * @method setKey
 * @for UrSession
 * @param {Object} key
 * @param {*} value
 */
UrSession.prototype.setKey=function(key,value){
    this.session[key]=value;
};
/**
 * Get a value in session object
 * @method getValue
 * @for UrSession
 * @param {String} key
 * @return {*}
 */
UrSession.prototype.getValue=function(key){
    return this.session[key];
};
/**
 * Remove key in session object
 * @method removeKey
 * @for UrSession
 * @param {String} key
 */
UrSession.prototype.removeKey=function(key){
    delete this.session[key];
};
/**
 * Clear session object
 * @method clear
 * @for UrSession
 */
UrSession.prototype.clear=function(){
    this.session = {};
};
/**
 * The UrValidatorEmail class is used to check an email.
 * @class UrValidatorEmail
 * @extends UrValidator
 * @param {Object} settings
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.name] UrValidatorEmail name
 * @example
 *      var validator = new UrValidatorEmail({
 *          "mandatory" : true,
 *          "messages" : {"mandatory":"Email is mandatory","regexp":"Invalid email"}
 *      });
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
/**
 * Validate value
 * @method validate
 * @for UrValidatorEmail
 * @param {String} value
 * @return {Boolean}
 */
UrValidatorEmail.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};
/**
 * The UrValidatorURL class is used to check an URL.
 * @class UrValidatorURL
 * @extends UrValidatorRegExp
 * @param {Object} settings
 *      @param {String} [settings.mandatory] Mandatory field ?
 *      @param {String} [settings.messages] Messages used for each error
 *      @param {String} [settings.name] UrValidatorURL name
 * @example
 *      var validator = new UrValidatorURL({
 *          "mandatory" : true,
 *          "messages" : {"mandatory":"URL is mandatory","regexp":"Invalid URL"}
 *      });
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
/**
 * Validate value
 * @method validate
 * @for UrValidatorURL
 * @param {String} value
 * @return {Boolean}
 */
UrValidatorURL.prototype.validate = function(value){
    return UrValidatorRegExp.prototype.validate.call(this, value);
};
/**
 * The ui module contains GUI functionality.
 * @module ui
 */

/**
 * The UrCustomInput object is used to construct an input with choiced HTML attribute type.
 * The future behaviour of UrCustomInput may be unstable: you must create an input with existing type. Be careful!
 * @class UrCustomInput
 * @extends UrInput
 * @author Flavien Collomb
 * @param {string} inputType Input type, for example "text"
 * @param {Object} settings
 *      @param {string}         [settings.name] UrCustomInput name
 *      @param {UrWidget}       [settings.parent] UrCustomInput's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrCustomInput
 *      @param {string}         [settings.className] HTML attribute "class" of UrCustomInput
 *      @param {Object|UrStyle} [settings.style] Style of UrCustomInput
 *      @param {boolean}        [settings.enable] The input element is enabled ?
 *      @param {string}         [settings.defaultValue] Default value in the input element
 *      @param {UrValidator}    [settings.validator] Validator used for input validation
 *      @param {string}         [settings.placeholder] HTML attribute placeholder of UrCustomInput
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var submit = new UrCustomInput(
 *          "submit",
 *          {
 *              "parent":body,
 *              "name":"submit",
 *              "defaultValue":"SAVE"
 *          }
 *      );
 * @constructor
 */
var UrCustomInput = function(inputType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("input");

    var tmp = new UrString(inputType);
    UrInput.call(this, settings, "Ur"+tmp.capitalize());
    /**
     * @property inputType
     * @type {String}
     * @description Input type, for example "text"
     */
    this.inputType = this.element.type = inputType;
};
UrCustomInput.prototype=new UrInput();
UrCustomInput.prototype.constructor=UrCustomInput;
/**
 * The UrCustomWidget object is used to construct a widget with choiced type.
 * The future behaviour of UrCustomWidget may be unstable: you must create an input with existing type. Be careful!
 * @class UrCustomWidget
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {string} widgetType Widget type, for example "text"
 * @param {Object} settings
 *      @param {string}         [settings.name] UrCustomWidget name
 *      @param {UrWidget}       [settings.parent] UrCustomWidget's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrCustomWidget
 *      @param {string}         [settings.className] HTML attribute "class" of UrCustomWidget
 *      @param {Object|UrStyle} [settings.style] Style of UrCustomWidget
 *      @param {string}         [settings.html] HTML attribute "innerHTML" of UrCustomWidget
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var customWidget = new UrCustomWidget("h1",{"html":"Title 1","parent":body});
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
 * The UrDataTable object create a table of result thanks a description JSON of correspondence.
 * @class UrDataTable
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {string}         [settings.name] UrDataTable name
 *      @param {UrWidget}       [settings.parent] UrDataTable's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrDataTable
 *      @param {string}         [settings.className] HTML attribute "class" of UrDataTable
 *      @param {Object|UrStyle} [settings.style] Style of UrDataTable
 *      @param {Array}  settings.datas Datas for display in UrDataTable
 *      @param {Object}         settings.description Description object used to create UrDataTable
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var result = new UrDataTable({
 *          "parent": body,
 *          "className": "table",
 *          "description": {
 *              "key1": {"title": "Key 1"},
 *              "key2": {
 *                  "title": "Key 2",
 *                  "improve": function (json) {
 *                      var html = json["parent"].getHtml();
 *                      json["parent"].setHtml("");
 *                      new UrWidget({"parent": json["parent"], "html": html + " " + json["index"]})
 *                  },
 *                  "params": ["key1", "key2", "test"]
 *              }
 *          },
 *          "datas": [{"key1": "Test 1.1", "key2": "Test 1.2"}, {"key1": "Test 2.1", "key2": "Test 2.2"}]
 *      });
 * @constructor
 */
var UrDataTable = function(settings){
    /**
     * Set the Thead of the HTML table of UrDataTable
     * @method head
     * @for UrDataTable
     * @private
     */
    head=function(){
        that.head = new UrCustomWidget("thead", {"parent":that});
        var tr = new UrCustomWidget("tr", {"parent":that.head});
        for(var i in that.description)
            if(that.description[i]["hide"] == undefined){
                var th = new UrCustomWidget("th", {"parent":tr,"html":that.description[i]["title"]});
        }
    };
    /**
     * @property that
     * @type UrDataTable
     * @private
     */
    var that = this;

    if(settings == undefined) settings = {};
    /**
     * @property head
     * @type UrCustomWidget
     * @description Thead of the HTML table of UrDataTable
     */
    this.head;
    /**
     * @property body
     * @type UrCustomWidget
     * @description Tbody of the HTML table of the UrDataTable
     */
    this.body;
    /**
     * @property lines
     * @type Array
     * @description Array of each Tr of the HTML table of UrDataTable
     */
    this.lines = [];
    /**
     * @property description
     * @type Object
     * @description Array Description object used to create UrDataTable
     */
    this.description = settings.description;

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
/**
 * Add one or several lines in UrDataTable
 * @method add
 * @for UrDataTable
 * @param {Array} datas
 */
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
 * Get Thead of the HTML table of UrDataTable
 * @method getHead
 * @for UrDataTable
 * @return {UrCustomWidget}
 */
UrDataTable.prototype.getHead = function(){ return this.head; };
/**
 * Get TBody of the HTML table of UrDataTable
 * @method getBody
 * @for UrDataTable
 * @return {UrCustomWidget}
 */
UrDataTable.prototype.getBody = function(){ return this.body; };
/**
 * Get Tr of the HTML table of UrDataTable
 * @method getLines
 * @for UrDataTable
 * @return {Array}
 */
UrDataTable.prototype.getLines = function(){ return this.lines; };
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
    if(settings == undefined) settings = {};
    settings.element = document.createElement("form");
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

    UrWidget.call(this, settings, "UrForm");

    this.setMethod(settings.method);
    this.setAction(settings.action);
    this.setEnctype(settings.enctype);
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
    for(i in this.formElement)
        tmp[i] = this.formElement[i].getValue();
    return tmp;
}
/**
 * Add event on submit
 * @method submit
 * @for UrForm
 * @param {Function} method
 */
UrForm.prototype.submit = function(method){ this.element.onsubmit = method; };
/**
 * The UrFragment object is used to construct DocumentFragment
 * @class UrFragment
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {String} [name] UrFragment name
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var fragment = new UrFragment();
 *      var widget=new UrWidget({"parent":fragment});
 *      body.addChild(fragment);
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
 * The UrImage object provides an image widget
 * @class UrImage
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrImage name
 *      @param {UrWidget}       [settings.parent] UrImage's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrImage
 *      @param {String}         [settings.className] HTML attribute "class" of UrImage
 *      @param {Object|UrStyle} [settings.style] Style of UrImage
 *      @param {String}         [settings.src] Source of UrImage
 *      @param {String}         [settings.alt] Alt of UrImage
 *      @param {String}         [settings.width] Width of UrImage
 *      @param {String}         [settings.height] Height of UrImage
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var image = new UrImage({
 *          "parent":body,
 *          "src":"your-link/your-image.png",
 *          "width":50,
 *          "height":50
 *      });
 * @constructor
 */
var UrImage = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("img");
    /**
     * @property src
     * @type String
     * @description Source of UrImage
     */
    this.src;
    /**
     * @property alt
     * @type String
     * @description Alt of UrImage
     */
    this.alt;
    /**
     * @property width
     * @type Number
     * @description Width of UrImage
     */
    this.width;
    /**
     * @property height
     * @type Number
     * @description Height of UrImage
     */
    this.height;

    UrDom.call(this, "UrImage", settings);

    this.setSrc(settings.src);
    this.setAlt(settings.alt);
    this.setWidth(settings.width);
    this.setHeight(settings.height);
};
UrImage.prototype=new UrDom();
UrImage.prototype.constructor=UrImage;
/**
 * Set source of UrImage
 * @method setSrc
 * @for UrImage
 * @param {String} src
 */
UrImage.prototype.setSrc = function(src){
    this.src = src;
    if(this.src != undefined) this.element.src = this.src;
};
/**
 * Set alt of UrImage
 * @method setAlt
 * @for UrImage
 * @param {String} alt
 */
UrImage.prototype.setAlt = function(alt){
    this.alt = alt;
    if(this.alt != undefined) this.element.alt = this.alt;
};
/**
 * Set width of UrImage
 * @method setWidth
 * @for UrImage
 * @param {Number} width
 */
UrImage.prototype.setWidth = function(width){
    this.width = width;
    if(this.width != undefined) this.element.width = this.width;
};
/**
 * Set height of UrImage
 * @method setHeight
 * @for UrImage
 * @param {Number} height
 */
UrImage.prototype.setHeight = function(height){
    this.height = height;
    if(this.height != undefined) this.element.height = this.height;
};


/**
 * The UrInputText is used to construct input of type text
 * @class UrInputText
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputText name
 *      @param {UrWidget}       [settings.parent] UrInputText's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputText
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputText
 *      @param {Object|UrStyle} [settings.style] Style of UrInputText
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputText
 *      @param {String}         [settings.defaultValue] Default value of UrInputText
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputText validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputText
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var input1 = new UrInputText({"parent":body});
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
 * The UrLabel object create a label
 * @class UrLabel
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrLabel name
 *      @param {UrWidget}       [settings.parent] UrLabel's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrLabel
 *      @param {String}         [settings.className] HTML attribute "class" of UrLabel
 *      @param {Object|UrStyle} [settings.style] Style of UrLabel
 *      @param {string}         [settings.html] HTML content of UrLabel
 *      @param {string}         [settings.for] HTML attribute "for" of UrLabel
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var label = new UrLabel({
 *          "parent":body,
 *          "htmlFor":"input-id",
 *          "html":"Label 1"
 *      });
 * @constructor
 */
var UrLabel = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("label");
    /**
     * @property htmlFor
     * @type String
     * @description HTML attribute "for" of UrLabel
     */
    this.htmlFor;

    UrWidget.call(this, settings, "UrLabel");

    this.setHtmlFor(settings.htmlFor);
};
UrLabel.prototype=new UrWidget();
UrLabel.prototype.constructor=UrLabel;
/**
 * Set HTML attribute "for" of UrLabel
 * @method setFor
 * @for UrLabel
 * @param {String} htmlFor
 */
UrLabel.prototype.setHtmlFor = function(htmlFor){
    this.htmlFor = htmlFor;
    if(this.htmlFor != undefined) this.element.htmlFor = this.htmlFor;
};
/**
 * Get HTML attribute "for" of UrLabel
 * @method getHtmlFor
 * @for UrLabel
 * @return {String}
 */
UrLabel.prototype.getHtmlFor = function(){
    return this.htmlFor;
};
/**
 * The UrLine object create a line with X parts to facilitate your UI creation
 * @class UrLine
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrLine name
 *      @param {UrWidget}       [settings.parent] UrLine's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrLine
 *      @param {String}         [settings.className] HTML attribute "class" of UrLine
 *      @param {Object|UrStyle} [settings.style] Style of UrLine
 *      @param {string}         [settings.html] HTML content of UrLine
 *      @param {number}         settings.partsNumber Number of parts in UrLine
 *      @param {string}         [settings.partsClassName] HTML attribute "class" of UrLine's parts
 *      @param {Object|UrStyle} [settings.partsStyle] Style of UrLine's parts
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var line2part = new UrLine({
 *          "parent":body,
 *          "className":"row-fluid",
 *          "partsNumber":2,
 *          "partsClassName":"span6"
 *       });
 * @constructor
 */
var UrLine = function(settings){
    if(settings == undefined) settings = {};
    /**
     * @property parts
     * @type Array
     * @description Parts of UrLine
     */
    this.parts=[];

    UrWidget.call(this, settings, "UrLine");

    for(var i=0; i<settings.partsNumber; i++)
        this.parts.push(new UrWidget({"parent":this,"className":settings.partsClassName,"style":settings.partsStyle}));
};
UrLine.prototype=new UrWidget();
UrLine.prototype.constructor=UrLine;
/**
 * Get a part thanks its index
 * @method getPart
 * @for UrLine
 * @param {Number} index
 * @return {UrWidget}
 */
UrLine.prototype.getPart=function(index){
    return this.parts[index];
};
/**
 * The UrLink object create a link
 * @class UrLink
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrLink name
 *      @param {UrWidget}       [settings.parent] UrLink's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrLink
 *      @param {String}         [settings.className] HTML attribute "class" of UrLink
 *      @param {Object|UrStyle} [settings.style] Style of UrLink
 *      @param {string}         [settings.html] HTML content of UrLink
 *      @param {string}         [settings.href] HTML attribute "href" of UrLink
 *      @param {string}         [settings.target] HTML attribute "target" of UrLink
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var link1 = new UrLink({
 *          "parent":body,
 *          "href":"#link1",
 *          "html":"Link 1"
 *      });
 * @constructor
 */
var UrLink = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("a");
    /**
     * @property href
     * @type String
     * @description HTML attribute "href" of UrLink
     */
    this.href;
    /**
     * @property target
     * @type String
     * @description HTML attribute "target" of UrLink
     */
    this.target;

    UrWidget.call(this, settings, "UrLink");

    this.setHref(settings.href);
    this.setTarget(settings.target);
};
UrLink.prototype=new UrWidget();
UrLink.prototype.constructor=UrLink;
/**
 * Set HTML attribute "href" of UrLink
 * @method setHref
 * @for UrLink
 * @param {String} href
 */
UrLink.prototype.setHref = function(href){
    this.href = href;
    if(this.href != undefined) this.element.href = this.href;
};
/**
 * Set HTML attribute "target" of UrLink
 * @method setTarget
 * @for UrLink
 * @param {String} target
 */
UrLink.prototype.setTarget = function(target){
    this.target = target;
    if(this.target != undefined) this.element.setAttribute("target", this.target);
};
/**
 * Get HTML attribute "href" of UrLink
 * @method getHref
 * @for UrLink
 * @return {String}
 */
UrLink.prototype.getHref = function(){
    return this.href;
};
/**
 * Get HTML attribute "target" of UrLink
 * @method getTarget
 * @for UrLink
 * @return {String}
 */
UrLink.prototype.getTarget = function(){
    return this.target;
};
/**
 * The UrNotification object create a popup.
 * @class UrNotification
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrNotification name
 *      @param {String}         [settings.id] HTML attribute "id" of UrNotification main widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrNotification main widget
 *      @param {Object|UrStyle} [settings.style] Style of UrNotification main widget
 *      @param {UrWidget}       [settings.title] UrWidget title of UrNotification
 *      @param {UrWidget}       [settings.text] UrWidget text of UrNotification
 *      @param {String}         [settings.type] Type of UrNotification (default, info, success, warn, error)
 *      @param {Number}         [settings.time] UrNotification display time
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrNotification (for example UrImage).
 * @example
 *      var notification = new UrNotification({
 *          "title":"Title example",
 *          "text":"Text example",
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 * @constructor
 */
var UrNotification=function(settings){
    /**
     * @type {UrNotification}
     * @private
     */
    var _this = this;

    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {
            "float"     :"right",
            "margin"    :"15px",
            "border"    :"2px solid white",
            "color"     :"white"
        };
    /**
     * @property type
     * @type String
     * @description Type of UrNotification
     */
    this.type;
    /**
     * @property time
     * @type Number
     * @description UrNotification display time
     */
    this.time;
    /**
     * @property title
     * @type UrWidget
     * @description UrWidget title of UrNotification
     */
    this.title;
    /**
     * @property text
     * @type UrWidget
     * @description UrWidget text of UrNotification
     */
    this.text;
    /**
     * @property header
     * @type UrWidget
     * @description UrWidget header of UrNotification
     */
    this.header;
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close of UrNotification
     */
    this.closeWidget;
    /**
     * @property hoverState
     * @type UrWidget
     * @description Hover state of UrNotification
     */
    this.hoverState = false;

    UrWidget.call(this, settings, "UrNotification");
    this.setType(settings.type);
    this.setTime(settings.time);
    this.header = new UrWidget({"parent":this});
    this.setCloseWidget(settings.close);
    this.setTitle(settings.title);
    this.setText(settings.text);

    this.mouseIn(function(){ _this.hoverState = true; });
    this.mouseLeave(function(){
        _this.hoverState = false;
        _this.remove();
    });

    setTimeout(function(){
        try{
            if(_this.hoverState == false)
                _this.remove();
        }catch(e){}
    },_this.time);
};
UrNotification.prototype=new UrWidget();
UrNotification.prototype.constructor=UrNotification;
/**
 * Set UrNotification type : modify its background
 * @method setType
 * @for UrNotification
 * @param {String} type
 */
UrNotification.prototype.setType=function(type){
    this.type = type || "default";
    if(this.type == "default"){
        this.getStyle().set("background","#eaeaea");
        this.getStyle().set("color","black");
    }
    if(this.type == "info")
        this.getStyle().set("background","#50b6d4");
    if(this.type == "success")
        this.getStyle().set("background","#55ab55");
    if(this.type == "warn")
        this.getStyle().set("background","#fbaf44");
    if(this.type == "error")
        this.getStyle().set("background","#ca403a");
    if(this.type == "inverse")
        this.getStyle().set("background","#3c3c3c");
};
/**
 * Set UrNotification time display
 * @method setTime
 * @for UrNotification
 * @param {Number} time
 */
UrNotification.prototype.setTime=function(time){
    this.time = time || 3000;
};
/**
 * Set UrWidget title of UrNotification
 * @method setTitle
 * @for UrNotification
 * @param {UrWidget} title
 */
UrNotification.prototype.setTitle=function(title){
    if(this.title != undefined)
        this.title.remove();

    this.title = title;
    if(this.title != undefined){
        this.addChild(this.title);
    }
};
/**
 * Set UrWidget text of UrNotification
 * @method setText
 * @for UrNotification
 * @param {UrWidget} text
 */
UrNotification.prototype.setText=function(text){
    if(this.text != undefined)
        this.text.remove();

    this.text = text;
    if(this.text != undefined){
        this.addChild(this.text);
    }
};
/**
 * Set UrWidget close of UrNotification
 * @method setCloseWidget
 * @for UrNotification
 * @param {UrWidget} close
 */
UrNotification.prototype.setCloseWidget=function(closeWidget){
    var _this = this;

    if(this.closeWidget != undefined)
        this.closeWidget.remove();

    this.closeWidget = closeWidget;
    if(this.closeWidget == undefined)
        this.closeWidget = new UrWidget({
            "html":"x",
            "style":{
                "margin":"0 5px 0 5px",
                "float":'right',
                "font-weight":"bold",
                "cursor":"pointer"
            }
        });

    this.closeWidget.click(function(){
        _this.remove();
    });
    this.addChild(this.closeWidget);
};
/**
 * The UrPopup object create a popup.
 * @class UrPopup
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrPopup name
 *      @param {String}         [settings.id] HTML attribute "id" of UrPopup main window widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrPopup main window widget
 *      @param {Object|UrStyle} [settings.style] Style of UrPopup main window widget
 *      @param {UrWidget}       [settings.content] UrWidget content for UrPopup
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrPopup (for example UrImage with cross).
 *      @param {boolean}        [settings.modal] UrPopup is modal ? (If true, must be close programmaticaly by developer)
 * @example
 *      var popup = new UrPopup({
 *          "modal":false,
 *          "content":new UrWidget({"html":"Example of content"}),
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 *       $(popup.getBg().getElement()).animate({"opacity":0.7},10);
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

    var body = document.getElementsByTagName("body")[0];

    this.body = new UrWidget({"element": body});
    settings.parent = this.body;
    /**
     * @property bg
     * @type UrWidget
     * @description UrWidget which creates fade background
     */
    this.bg;
    /**
     * @property closeWidgetContainer
     * @type UrWidget
     * @description Parent of UrWidget close
     */
    this.closeWidgetContainer;
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close
     */
    this.closeWidget;
    /**
     * @property content
     * @type UrWidget
     * @description UrWidget content of UrPopup
     */
    this.content;

    this.setBg();
    UrWidget.call(this, settings, "UrPopup");
    this.setCloseWidget(settings.closeWidget);
    this.setModal(settings.modal);
    this.setContent(settings.content);
};
UrPopup.prototype=new UrWidget();
UrPopup.prototype.constructor=UrPopup;
/**
 * Creates fade background
 * @method setBg
 * @for UrPopup
 */
UrPopup.prototype.setBg=function(){
    if(this.bg!=undefined)
        this.bg.remove();

    this.bg=new UrWidget({
        "parent":this.body,
        "style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}
    });
};
/**
 * Get fade background
 * @method getBg
 * @for UrPopup
 * @return {UrWidget}
 */
UrPopup.prototype.getBg=function(){ return this.bg; };
/**
 * Set UrWidget close of UrPopup
 * @method setCloseWidget
 * @for UrPopup
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
 * Set if UrPopup is modal
 * @method setModal
 * @for UrPopup
 * @param {Boolean} modal
 */
UrPopup.prototype.setModal=function(modal){
    var that = this;

    if(modal == true){
        if(this.closeWidget != undefined)
            this.closeWidget.remove();
        if(this.bg != undefined)
            this.bg.click(function(){});
    }
    else{
        if(this.bg != undefined){
            this.bg.click(function(){
                that.bg.remove();
                that.remove();
            });
        }
    }
};
/**
 * Set UrWidget content of UrPopup
 * @method setContent
 * @for UrPopup
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
/**
 * Close (and remove) UrPopup
 * @method close
 * @for UrPopup
 */
UrPopup.prototype.close=function(){
    this.bg.remove();
    this.remove();
};
/**
 * The UrProgressBar object create a progress bar. Default : progress bar like Youtube
 * @class UrProgressBar
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrProgressBar name
 *      @param {UrWidget}       [settings.parent] UrProgressBar's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrProgressBar
 *      @param {String}         [settings.className] HTML attribute "class" of UrProgressBar
 *      @param {Object|UrStyle} [settings.style] Style of UrProgressBar
 *      @param {Number}         [settings.speed] Speed of progress animation
 * @example
 *      var progress = new UrProgressBar({
 *          "parent":body,
 *          "speed" : 100
 *       });
 *       progress.done();
 * @constructor
 */
var UrProgressBar=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};
    /**
     * @property width
     * @type Number
     * @description Current width of UrProgressBar
     */
    this.width = 0;
    /**
     * @property currentVal
     * @type String
     * @description Current value of UrProgressBar
     */
    this.currentVal = 0;
    /**
     * @property interval
     * @type Number
     * @description Interval use for animation
     */
    this.interval;
    /**
     * @property interval
     * @type Number
     * @description Speed of progress animation
     */
    this.speed;

    UrWidget.call(this, settings, "UrProgressBar");

    this.setSpeed(settings.speed);
};
UrProgressBar.prototype=new UrWidget();
UrProgressBar.prototype.constructor=UrProgressBar;
/**
 * Set speed of progress animation
 * @method setSpeed
 * @for UrProgressBar
 * @param {Number} speed New speed
 */
UrProgressBar.prototype.setSpeed = function(speed){
    this.speed = speed;
    if(this.speed == undefined) this.speed = 400;
};
/**
 * Reduce UrProgressBar width with animation
 * @method less
 * @for UrProgressBar
 * @param {Number} val New value
 * @param {Function} callback Function called when animation is over
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
 * Increase UrProgressBar width with animation
 * @method more
 * @for UrProgressBar
 * @param {Number} val New value
 * @param {Function} callback Function called when animation is over
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
/**
 * Set UrProgressBar width without animation
 * @method set
 * @for UrProgressBar
 * @param {Number} val New value
 */
UrProgressBar.prototype.set = function(val){
    this.currentVal = this.width = val;
    this.getStyle().set("width",this.width + "%");
};
/**
 * Set UrProgressBar width to 100% with animation and remove it
 * @method done
 * @for UrProgressBar
 * @param {Function} callback Function called when animation is over
 */
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
 * @class UrTable
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTable name
 *      @param {UrWidget}       [settings.parent] UrTable's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrTable
 *      @param {String}         [settings.className] HTML attribute "class" of UrTable
 *      @param {Object|UrStyle} [settings.style] Style of UrTable
 *      @param {Number}         settings.columnNumber Number of column of UrTable
 *      @param {Array}          [settings.head] Columns titles
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var table = new UrTable({
 *          "parent":content,
 *          "className":"table",
 *          "head":["Column 1","Column 2","Column 3","Column 4","Column 5","Column 6","Column 7"],
 *          "columnNumber":7
 *      });
 *      var line = table.add();
 *      var cells = line.getChildren();
 *      cells[0].setHtml("Test 1");
 *      cells[1].setHtml("Test 2");
 *      cells[2].setHtml("Test 3");
 *      cells[3].setHtml("Test 4");
 *      cells[4].setHtml("Test 5");
 *      cells[5].setHtml("Test 6");
 *      cells[6].setHtml("Test 7");
 * @constructor
 */
var UrTable=function(settings){
    head=function(){
        if (settings.head != undefined) {
            that.head = new UrCustomWidget("thead", {"parent":that});
            var tr = new UrCustomWidget("tr", {"parent":that.head});

            for(var i=0; i<settings.head.length;i++)
                var th = new UrCustomWidget("th", {"parent":tr,"html":settings.head[i]});
        }
    };
    /**
     * @property that
     * @type UrTable
     * @private
     */
    var that = this;

    if(settings == undefined) settings = {};
    /**
     * @property head
     * @type UrCustomWidget
     * @description Thead of the HTML table of UrTable
     */
    this.head;
    /**
     * @property body
     * @type UrCustomWidget
     * @description Tbody of the HTML table of the UrTable
     */
    this.body;
    /**
     * @property lines
     * @type Array
     * @description Array of each Tr of the HTML table of UrTable
     */
    this.lines = [];

    this.setColumnNumber(settings.columnNumber);
    settings.element = document.createElement("table");
    UrWidget.call(this, settings, "UrTable");
    head();
    this.body = new UrCustomWidget("tbody", {"parent":this});
};
UrTable.prototype=new UrWidget();
UrTable.prototype.constructor=UrTable;
/**
 * Set number of column of UrTable
 * @method setColumnNumber
 * @for UrTable
 * @param columnNumber
 */
UrTable.prototype.setColumnNumber = function(columnNumber){
    this.columnNumber = 0;
    if(columnNumber !=  undefined)
        this.columnNumber = columnNumber;
};
/**
 * Add one empty line in UrTable
 * @method add
 * @for UrTable
 */
UrTable.prototype.add = function(){
    var tr = new UrCustomWidget("tr", {"parent":this.body});
    this.lines.push(tr);
    for(var i=0; i < this.columnNumber; i++)
        new UrCustomWidget("td", {"parent":tr});
    return tr;
};
/**
 * Get Thead of the HTML table of UrTable
 * @method getHead
 * @for UrTable
 * @return {UrCustomWidget}
 */
UrTable.prototype.getHead = function(){ return this.head; };
/**
 * Get TBody of the HTML table of UrTable
 * @method getBody
 * @for UrTable
 * @return {UrCustomWidget}
 */
UrTable.prototype.getBody = function(){ return this.body; };
/**
 * Get Tr of the HTML table of UrTable
 * @method getLines
 * @for UrTable
 * @return {Array}
 */
UrTable.prototype.getLines = function(){ return this.lines; };
/**
 * The UrTextarea is used to construct textarea
 * @class UrTextarea
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTextarea name
 *      @param {UrWidget}       [settings.parent] UrTextarea's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrTextarea
 *      @param {String}         [settings.className] HTML attribute "class" of UrTextarea
 *      @param {Object|UrStyle} [settings.style] Style of UrTextarea
 *      @param {Boolean}        [settings.enable]  HTML attribute "disable" of UrTextarea
 *      @param {String}         [settings.defaultValue] Default value of UrTextarea
 *      @param {UrValidator}    [settings.validator] Validator used for UrTextarea validation
 *      @param {String}         [settings.placeholder] HTML attribute "placeholder" of UrTextarea
 *      @param {Number}         [settings.rows] Number of rows of UrTextarea
 *      @param {Number}         [settings.cols] Number of cols of UrTextarea
 * @constructor
 */
var UrTextarea = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("textarea");
    /**
     * @property row
     * @type Number
     * @description Number of rows of UrTextarea
     */
    this.row;
    /**
     * @property cols
     * @type Number
     * @description Number of cols of UrTextarea
     */
    this.cols;

    UrInput.call(this, settings, "UrTextarea");

    this.setRows(settings.rows);
    this.setCols(settings.cols);
};
UrTextarea.prototype=new UrInput();
UrTextarea.prototype.constructor=UrTextarea;
/**
 * Set number of rows of UrTextarea
 * @method setRows
 * @for UrTextarea
 * @param {Number} rows
 */
UrTextarea.prototype.setRows = function(rows){
    this.rows = rows;
    if(this.rows != undefined) this.element.rows = this.rows;
};
/**
 * Set number of cols of UrTextarea
 * @method setCols
 * @for UrTextarea
 * @param {Number} cols
 */
UrTextarea.prototype.setCols = function(cols){
    this.cols = cols;
    if(this.cols != undefined) this.element.cols = this.cols;
};

