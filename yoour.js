/*Copyright (C) 2015 Flavien Collomb Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
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
    /**
     * @property regexp
     * @type String
     * @description RegExp used for the validation
     */
    this.regexp;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"pattern":["string"],"modifiers":["string"]});

        UrValidator.call(this, settings);
        this.setType(settings.type);
        this.setRegExp(settings.pattern,settings.modifiers);
    }
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
 * Pad left
 * @method lpad
 * @for UrString
 * @param {Number} width
 * @param {String} lchar
 * @return {String}
 */
UrString.prototype.lpad = function(width, lchar){
    lchar = lchar || '0';
    this.str = this.str + '';
    this.str = this.str.length >= width ? this.str : new Array(width - this.str.length + 1).join(lchar) + this.str;
    return this.str;
};
/**
 * UTF8 encode
 * @method utf8Encode
 * @for UrString
 * @return {String}
 */
UrString.prototype.utf8Encode=function(){
    this.str = unescape(encodeURIComponent(this.str));
    return this.str;
};
/**
 * UTF8 decode
 * @method utf8Decode
 * @for UrString
 * @return {String}
 */
UrString.prototype.utf8Decode=function(){
    try{
        this.str = decodeURIComponent(escape(this.str));
        return this.str;
    }catch(e){ return this.str; }
};
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
    if(!json instanceof Object)
        throw new TypeError("UrJson first attribute 'json' must be an {}");

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
 * Check each value type thanks a json control
 * @method checkType
 * @for UrJson
 * @param {Object} jsonControl Example : {"id":["string"],"parent":[UrWidget],"style":[Array]}
 */
UrJson.prototype.checkType = function(jsonControl){
    var error = "";

    this.each(function(key,value){
        if(jsonControl[key]!=undefined){
            var i = 0;
            var checked = false;
            while(i<jsonControl[key].length && checked == false){
                if(typeof jsonControl[key][i] == "string"){
                    if(typeof value == jsonControl[key][i])
                        checked = true;
                    i++;
                }
                else{
                    if(value instanceof jsonControl[key][i] == true)
                        checked = true;
                    i++;
                }
            }
            if(checked==false)
                error += key +" has an invalid type. Type expected " + jsonControl[key];
        }
    });

    if(error == "")
        return true;
    throw new TypeError(error);
};
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
    attribute = new UrString(attribute).toCamelCase();
    if(this.json.getValue(attribute) != undefined) return this.json[attribute];
    else return this.element.getElement().style[attribute];
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
 *      @param {Node}           [settings.element] Node HTML element already existing in the DOM
 *      @param {String}         [settings.id] HTML attribute "id" of UrDom
 *      @param {String}         [settings.className]  HTML attribute "class" of UrDom
 *      @param {Object|UrStyle} [settings.style] Style of UrDom
 * @constructor
 */
var UrDom = function(type, settings){
    /**
     * @property parent
     * @type UrWidget
     * @description UrDom's parent in DOM (UrWidget or specialised UrWidget)
     */
    this.parent;
    /**
     * @property element
     * @type HTMLElement|Node|DocumentFragment
     * @description UrDom's HTML element already existing in the DOM
     */
    this.element;
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

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"name":["string"],"parent":[UrWidget],"element":[Node],"id":["string"],"className":["string"],"style":[Object,UrStyle]});

        UrObject.call(this, type, settings.name);

        this.parent = settings.parent;
        this.element = settings.element;

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
    }
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
 * Add event on focus
 * @method focus
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.focus = function(method){ this.element.onfocus =  method; };
/**
 * Add event on blur
 * @method blur
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.blur = function(method){ this.element.onblur =  method; };
/**
 * Add event on key up
 * @method keyUp
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.keyUp = function(method){ this.element.onkeyup =  method; };
/**
 * Add event on key down
 * @method keyDown
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.keyDown = function(method){ this.element.onkeydown =  method; };
/**
 * Add event on key press
 * @method keyPress
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.keyPress = function(method){ this.element.onkeypress =  method; };
/**
 * Add event on change
 * @method change
 * @for UrDom
 * @param {Function} method
 */
UrDom.prototype.change = function(method){ this.element.onchange = method; };
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
    this.children;

    if(settings!=undefined){
        this.children = {};
        /**
         * @property children.all
         * @type Object
         * @description Children added in UrWidget
         */
        this.children["all"] = [];
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

        var json = new UrJson(settings);
        json.checkType({"html":["string","number"]});

        if(type == "" || type == undefined) type = "UrWidget";
        UrDom.call(this, type, settings);

        this.setHtml(settings.html);
    }
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
	this.children["all"].push(object);

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
    this.html = this.element.innerHTML;
    return this.html;
};
/**
 * Get all children of UrWidget
 * @method getChildren
 * @for UrWidget
 * @return {Array}
 */
UrWidget.prototype.getChildren = function(){ return this.children["all"]; };
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
    this.children["all"] = [];
    this.children["types"] = {};
    this.children["names"] = {};
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

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"placeholder":["string","number"]});

        UrField.call(this, settings, type);
        this.setPlaceholder(settings.placeholder);
    }
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
 * Return placeholder of UrInput
 * @method getPlaceholder
 * @for UrInput
 * @return {String}
 */
UrInput.prototype.getPlaceholder = function(){
    return this.placeholder;
};
/**
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrDate object create a representation of date
 * @class UrDate
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Date} date Javascript pure Date
 * @param {string} [name] UrDate name
 * @example
 *      var date = new UrDate();
 * @constructor
 */
var UrDate = function(date,name){
    /**
     * @property date
     * @type Date
     * @description Javascript pure Date
     */
    this.date;

    if(date != undefined){
        this.date = date;

        var json = new UrJson({"date":date});
        json.checkType({"date":[Date]});

        UrObject.call(this, "UrDate", name);
    }
};
UrDate.prototype=new UrObject();
UrDate.prototype.constructor=UrDate;
/**
 * Get Javascript pure Date
 * @method getDate
 * @for UrDate
 * @return {Date}
 */
UrDate.prototype.get = function(){
    return this.date;
};
/**
 * Get time
 * @method getTime
 * @for UrDate
 * @return {Number}
 */
UrDate.prototype.getTime = function(){
    return this.date.getTime();
};
/**
 * Get day
 * @method getDay
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getDay = function(){
    var str = new UrString(this.date.getDate());
    return str.lpad(2);
};
/**
 * Get month
 * @method getMonth
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getMonth = function(){
    var str = new UrString(this.date.getMonth() + 1);
    return str.lpad(2);
};
/**
 * Get year
 * @method getYear
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getYear = function(){
    var str = new UrString(this.date.getFullYear());
    return str.lpad(4);
};
/**
 * Get hours
 * @method getHours
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getHours = function(){
    var str = new UrString(this.date.getHours());
    return str.lpad(2);
};
/**
 * Get minutes
 * @method getMinutes
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getMinutes = function(){
    var str = new UrString(this.date.getMinutes());
    return str.lpad(2);
};
/**
 * Get secondes
 * @method getSeconds
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSeconds = function(){
    var str = new UrString(this.date.getSeconds());
    return str.lpad(2);
};
/**
 * Get date with dd/mm/yyyy format
 * @method getFrenchDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getFrenchDate = function(){
    return this.getDay() + "/" + this.getMonth() + "/" + this.getYear();
};
/**
 * Get date and time with dd/mm/yyyy HH:ii:ss format
 * @method getFrenchDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getFrenchDateTime = function(){
    return this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds() + " " + this.getDay() + "/" + this.getMonth() + "/" + this.getYear();
};
/**
 * Get date and time with yyyymmdd format
 * @method getEnglishDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getEnglishDate = function(){
    return this.getYear() + this.getMonth() + this.getDay();
};
/**
 * Get date and time with yyyymmdd HH:ii:ss format
 * @method getEnglishDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getEnglishDateTime = function(){
    return this.getYear() + this.getMonth() + this.getDay() + " " + this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds();
};
/**
 * Get date and time with yyyy-mm-dd format
 * @method getSqlDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSqlDate = function(){
    return this.getYear() + "-" + this.getMonth() + "-" + this.getDay();
};
/**
 * Get date and time with yyyy-mm-dd HH:ii:ss format
 * @method getSqlDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSqlDateTime = function(){
    return this.getYear() + "-" + this.getMonth() + "-" + this.getDay() + " " + this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds();
};
/**
 * Add X day
 * @method addDay
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addDay = function(add){
    var result = new Date(this.date);
    result.setDate(this.date.getDate() + add);
    this.date = result;
    return this;
};
/**
 * Add X month
 * @method addMonth
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addMonth = function(add){
    var result = new Date(this.date);
    result.setMonth(this.date.getMonth() + add);
    this.date = result;
    return this;
};
/**
 * Add X year
 * @method addYear
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addYear = function(add){
    var result = new Date(this.date);
    result.setYear(this.date.getFullYear() + add);
    this.date = result;
    return this;
};
/**
 * Less X day
 * @method lessDay
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessDay = function(less){
    var result = new Date(this.date);
    result.setDate(this.date.getDate() - less);
    this.date = result;
    return this;
};
/**
 * Less X month
 * @method lessMonth
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessMonth = function(less){
    var result = new Date(this.date);
    result.setMonth(this.date.getMonth() - less);
    this.date = result;
    return this;
};
/**
 * Less X year
 * @method lessYear
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessYear = function(less){
    var result = new Date(this.date);
    result.setYear(this.date.getFullYear() - less);
    this.date = result;
    return this;
};
/**
 * Get the difference in day between two UrDate
 * @method differenceInDay
 * @for UrDate
 * @param {UrDate} date
 * @return {Number}
 */
UrDate.prototype.differenceInDay = function(date){
    var tmp = Math.abs(this.getTime() - date.getTime());
    return Math.ceil(tmp / (1000 * 3600 * 24));
};
/**
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrDownload object is used to force a download
 * @class UrDownload
 * @extends UrObject
 * @author Flavien Collomb
 * @param {string} path Path of file to download
 * @param {string} [name] UrDownload name
 * @example
 *      var dl = new UrDownload("test.pdf");
 *      dl.go();
 * @constructor
 */
var UrDownload = function(path,name){
    /**
     * @property path
     * @type string
     * @description Path of file to download
     */
    this.path;

    if(path != undefined){
        this.path = path;

        var json = new UrJson({"path":path});
        json.checkType({"path":["string"]});

        UrObject.call(this, "UrDownload", name);
    }
};
UrDownload.prototype=new UrObject();
UrDownload.prototype.constructor=UrDownload;
/**
 * Launch download
 * @method go
 * @for UrDownload
 */
UrDownload.prototype.go = function(){
    var extension = this.path.split('.').pop();

    if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "gif" || extension == "bmp" || extension == "pdf" || extension == "txt")
        window.open(this.path);
    else{
        var body = document.getElementsByTagName("body")[0];
        body = new UrWidget({"element": body});

        var iframe = new UrIFrame({
            "parent":body,
            "style":{ "display":"none" },
            "src":this.path
        });
        setTimeout(function(){iframe.remove()},100);
    }
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
    if(settings!=undefined){
        settings["pattern"] = "^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$";
        settings["modifiers"] = "i";
        settings["type"] = "UrValidatorEmail";

        UrValidatorRegExp.call(this, settings);
    }
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
    if(settings!=undefined){
        settings["pattern"] = "(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)";
        settings["modifiers"] = "i";
        settings["type"] = "UrValidatorURL";

        UrValidatorRegExp.call(this, settings);
    }
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
    /**
     * @property inputType
     * @type {String}
     * @description Input type, for example "text"
     */
    this.inputType;

    if(inputType!= undefined && settings != undefined){
        var json = new UrJson({"inputType":inputType});
        json.checkType({"inputType":["string"]});

        settings.element = document.createElement("input");

        var tmp = new UrString(inputType);
        UrInput.call(this, settings, "Ur"+tmp.capitalize());
        /**
         * @property inputType
         * @type {String}
         * @description Input type, for example "text"
         */
        this.inputType = this.element.type = inputType;
    }
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
    if(widgetType!= undefined && settings != undefined){
        var json = new UrJson({"widgetType":widgetType});
        json.checkType({"widgetType":["string"]});

        settings.element = document.createElement(widgetType);

        var tmp = new UrString(widgetType);
        UrWidget.call(this, settings, "Ur"+tmp.capitalize());
    }
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
 *      @param {Array}          settings.datas Datas for display in UrDataTable
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
    this.lines;
    /**
     * @property description
     * @type Object
     * @description Array Description object used to create UrDataTable
     */
    this.description;

    if(settings != undefined){
        /**
         * @property that
         * @type UrDataTable
         * @private
         */
        var that = this;
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

        var json = new UrJson(settings);
        json.checkType({"datas":[Array],"description":[Object]});

        this.lines = [];
        this.description = settings.description;

        if(settings.datas != undefined && settings.datas instanceof Array && settings.datas.length > 0){
            settings.element = document.createElement("table");
            UrWidget.call(this, settings, "UrDataTable");
            head();
            this.body = new UrCustomWidget("tbody", {"parent":this});
            this.add(settings.datas);
        }
    };
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
    if(settings.name != undefined)
        settings.name = name;
    settings.element = document.createDocumentFragment();

    UrWidget.call(this, settings, "UrFragment");
};
UrFragment.prototype=new UrWidget();
UrFragment.prototype.constructor=UrFragment;

/**
 * The UrIFrame object creates an Iframe
 * @class UrIFrame
 * @extends UrDom
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrIFrame name
 *      @param {UrWidget}       [settings.parent] UrIFrame's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {UrDom}          [settings.element] UrIFrame's HTML element already existing in the DOM
 *      @param {String}         [settings.id] HTML attribute "id" of UrIFrame
 *      @param {String}         [settings.className] HTML attribute "class" of UrIFrame
 *      @param {Object|UrStyle} [settings.style] Style of UrIFrame
 *      @param {String}         [settings.src] Src of UrIFrame
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var iframe = new UrIFrame({
 *          "parent":body,
 *          "id":"TEST",
 *          "className":"TEST",
 *          "style":{
 *              "width":"100%",
 *              "height":"100px"
 *          }
 *       });
 * @constructor
 */
var UrIFrame = function(settings){
    /**
     * @property src
     * @type String
     * @description Src of UrIFrame
     */
    this.src;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"src":["string"]});

        settings.element = document.createElement("iframe");
        UrDom.call(this, "UrIframe", settings);

        this.setSrc(settings.src);
    }
};
UrIFrame.prototype=new UrDom();
UrIFrame.prototype.constructor=UrIFrame;
/**
 * Set src of UrIFrame
 * @method setSrc
 * @for UrIFrame
 * @param {string} src
 */
UrIFrame.prototype.setSrc = function(src){
    this.src = src;
    if(src!=undefined)
        this.element.src = src;
};
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
 *          "alt":"ALT",
 *          "width":50,
 *          "height":50
 *      });
 * @constructor
 */
var UrImage = function(settings){
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

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"src":["string"],"alt":["string","number"],"width":["number"],"height":["number"]});

        settings.element = document.createElement("img");
        UrDom.call(this, "UrImage", settings);

        this.setSrc(settings.src);
        this.setAlt(settings.alt);
        this.setWidth(settings.width);
        this.setHeight(settings.height);
    }
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
 * The UrInputCheckbox is used to construct input of type checkbox
 * @class UrInputCheckbox
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputCheckbox name
 *      @param {UrWidget}       [settings.parent] UrInputCheckbox's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputCheckbox
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputCheckbox
 *      @param {Object|UrStyle} [settings.style] Style of UrInputCheckbox
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputCheckbox
 *      @param {String}         [settings.defaultValue] Default value of UrInputCheckbox
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputCheckbox validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputCheckbox
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      new UrInputCheckbox({
 *          "name":"test-checkbox",
 *          "defaultValue":"Test checkbox 1"
 *      })
 * @constructor
 */
var UrInputCheckbox = function(settings){
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputCheckbox");
        this.inputType = this.element.type = "checkbox";
    }
};
UrInputCheckbox.prototype=new UrInput();
UrInputCheckbox.prototype.constructor=UrInputCheckbox;
/**
 * The UrInputRadio is used to construct input of type radio
 * @class UrInputRadio
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrInputRadio name
 *      @param {UrWidget}       [settings.parent] UrInputRadio's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrInputRadio
 *      @param {String}         [settings.className] HTML attribute "class" of UrInputRadio
 *      @param {Object|UrStyle} [settings.style] Style of UrInputRadio
 *      @param {Boolean}        [settings.enable] HTML attribute "enable" of UrInputRadio
 *      @param {String}         [settings.defaultValue] Default value of UrInputRadio
 *      @param {UrValidator}    [settings.validator] Validator used for UrInputRadio validation
 *      @param {String}         [settings.placeholder] HTML attribute placeholder of UrInputRadio
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      form.add(new UrInputRadio({
 *          "name":"test-radio",
 *          "defaultValue":"Test radio 1"
 *      }));
 * @constructor
 */
var UrInputRadio = function(settings){
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputRadio");
        this.inputType = this.element.type = "radio";
    }
};
UrInputRadio.prototype=new UrInput();
UrInputRadio.prototype.constructor=UrInputRadio;
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
    if(settings != undefined){
        settings.element = document.createElement("input");

        UrInput.call(this, settings, "UrInputText");
        this.inputType = this.element.type = "text";
    }
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
    /**
     * @property htmlFor
     * @type String
     * @description HTML attribute "for" of UrLabel
     */
    this.htmlFor;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"for":["string","number"]});

        settings.element = document.createElement("label");

        UrWidget.call(this, settings, "UrLabel");

        this.setHtmlFor(settings.htmlFor);
    }
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
    /**
     * @property parts
     * @type Array
     * @description Parts of UrLine
     */
    this.parts;

    if(settings != undefined){
        this.parts = [];

        var json = new UrJson(settings);
        json.checkType({"partsNumber":["number"],"partsClassName":["string"],"partsStyle":[Object,UrStyle]});

        UrWidget.call(this, settings, "UrLine");

        if(settings.partsStyle == undefined) settings.partsStyle = {};
        for(var i=0; i<settings.partsNumber; i++)
            this.parts.push(new UrWidget({"parent":this,"className":settings.partsClassName,"style":settings.partsStyle}));
    }
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

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"href":["string"],"target":["string"]});

        settings.element = document.createElement("a");
        UrWidget.call(this, settings, "UrLink");

        this.setHref(settings.href);
        this.setTarget(settings.target);
    }
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
 *      @param {String}         [settings.kind] Kind of UrNotification (default, info, success, warn, error)
 *      @param {Number}         [settings.time] UrNotification display time
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrNotification (for example UrImage).
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var notification = new UrNotification({
 *          "parent":body,
 *          "title":new UrWidget({"html":"Title example"}),
 *          "text":new UrWidget({"html":"Text example"}),
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 * @constructor
 */
var UrNotification=function(settings){
    /**
     * @property kind
     * @type String
     * @description Kind of UrNotification
     */
    this.kind;
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
    this.hoverState;

    if(settings != undefined){
        /**
         * @property _this
         * @type {UrNotification}
         * @private
         */
        var _this = this;

        var json = new UrJson(settings);
        json.checkType({"title":[UrWidget],"text":[UrWidget],"kind":["string"],"time":["number"],"closeWidget":[UrWidget]});

        if(settings.style == undefined)
            settings.style = {
                "float"     :"right",
                "margin"    :"15px",
                "border"    :"2px solid white"
            };
        UrWidget.call(this, settings, "UrNotification");

        this.hoverState = false;

        this.setKind(settings.kind);
        this.setTime(settings.time);
        this.header = new UrWidget({"parent":this});
        this.setCloseWidget(settings.close);
        this.setTitle(settings.title);
        this.setText(settings.text);

        this.mouseIn(function(){ _this.hover = true; });
        this.mouseLeave(function(){
            _this.hover = false;
            _this.remove();
        });

        setTimeout(function(){
            try{
                if(_this.hoverState == false)
                    _this.remove();
            }catch(e){}
        },_this.time);
    }
};
UrNotification.prototype=new UrWidget();
UrNotification.prototype.constructor=UrNotification;
/**
 * Set UrNotification type : modify its background
 * @method setType
 * @for UrNotification
 * @param {String} kind
 */
UrNotification.prototype.setKind=function(kind){
    this.kind = kind || "info";
    if(this.kind == "default")
        this.getStyle().set("background","#fcf8e3");
    if(this.kind == "info")
        this.getStyle().set("background","lightblue");
    if(this.kind == "success")
        this.getStyle().set("background","#dff0d8");
    if(this.kind == "warn")
        this.getStyle().set("background","#ebb275");
    if(this.kind == "error")
        this.getStyle().set("background","#f2dede");
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
 * The UrOption object creates an option for UrSelect
 * @class UrOption
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrOption name
 *      @param {UrWidget}       [settings.parent] UrOption's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrOption
 *      @param {String}         [settings.className] HTML attribute "class" of UrOption
 *      @param {Object|UrStyle} [settings.style] Style of UrOption
 *      @param {string}         [settings.html] HTML content of UrOption
 *      @param {String|Number}  [settings.value] Value of UrOption
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 * @constructor
 */
var UrOption = function(settings){
    /**
     * @property value
     * @type String
     * @description Value of UrLabel
     */
    this.value;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"value":["string","number"]});

        settings.element = document.createElement("option");

        UrWidget.call(this, settings, "UrOption");

        this.setValue(settings.value);
    }
};
UrOption.prototype=new UrWidget();
UrOption.prototype.constructor=UrOption;
/**
 * Set value of UrOption
 * @method setValue
 * @for UrOption
 * @param {String|Number} value
 */
UrOption.prototype.setValue = function(value){
    this.value = value;
    if(this.value != undefined) this.element.value = this.value;
};
/**
 * Get value of UrOption
 * @method getValue
 * @for UrOption
 * @return {String}
 */
UrOption.prototype.getValue = function(){
    return this.value;
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

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"content":[UrWidget],"closeWidget":[UrDom],"modal":["boolean"]});

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

        this.setBg();
        UrWidget.call(this, settings, "UrPopup");
        this.setCloseWidget(settings.closeWidget);
        this.setModal(settings.modal);
        this.setContent(settings.content);
    }
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
    /**
     * @property width
     * @type Number
     * @description Current width of UrProgressBar
     */
    this.width;
    /**
     * @property currentVal
     * @type String
     * @description Current value of UrProgressBar
     */
    this.currentVal;
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

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"speed":["number"]});

        if(settings.style == undefined)
            settings.style = {"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};

        this.width = 0;
        this.currentVal = 0;

        UrWidget.call(this, settings, "UrProgressBar");

        this.setSpeed(settings.speed);
    }
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
 * The UrSelect is used to construct a HTML select
 * @class UrSelect
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}             [settings.name] UrSelect name
 *      @param {UrWidget}           [settings.parent] UrSelect's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}             [settings.id] HTML attribute "id" of UrSelect
 *      @param {String}             [settings.className] HTML attribute "class" of UrSelect
 *      @param {Object|UrStyle}     [settings.style] Style of UrSelect
 *      @param {Boolean}            [settings.enable]  HTML attribute "disable" of UrSelect
 *      @param {Array<UrOption>}    [settings.options] Options in UrSelect
 *      @param {Boolean}            [settings.multiple] UrSelect is multiple ?
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      var select = new UrSelect({
 *          "name":"test-select",
 *          "options":[
 *              new UrOption({
 *                  "html":"TEST",
 *                  "value":"test"
 *              })
 *          ]
 *      });
 * @constructor
 */
var UrSelect = function(settings){
    /**
     * @property options
     * @type Array<UrOption>
     * @description UrOption list in UrSelect
     */
    this.options;
    /**
     * @property multiple
     * @type Boolean
     * @description UrSelect is multiple ?
     */
    this.multiple;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"options":[Array],"multiple":["boolean"]});

        this.options = [];

        settings.element = document.createElement("select");
        UrWidget.call(this, settings, "UrSelect");

        if(settings.options == undefined)
            settings.options = [];

        for(var i=0;i<settings.options.length;i++)
            this.add(settings.options[i]);
        this.setMultiple(settings.multiple);
    }
};
UrSelect.prototype=new UrWidget();
UrSelect.prototype.constructor=UrSelect;
/**
 * Add UrOption in UrSelect
 * @method add
 * @for UrSelect
 * @param {UrOption} option
 */
UrSelect.prototype.add = function(option){
    this.options.push(option);
    this.addChild(option);
};
/**
 * Set UrSelect multiple
 * @method setMultiple
 * @for UrSelect
 * @param {Boolean} multiple
 */
UrSelect.prototype.setMultiple = function(multiple){
    this.multiple = multiple;
    if(this.multiple)
        this.element.multiple = "multiple";
};
/**
 * Get UrOption list in UrSelect
 * @method getOptions
 * @for UrSelect
 * @return {Array<UrOption>}
 */
UrSelect.prototype.getOptions = function(){
    return this.options;
};
/**
 * Get current UrOption list value in UrSelect
 * @method getOptions
 * @for UrSelect
 * @return {Array<String>}
 */
UrSelect.prototype.getValue= function(){
    var tmp = [];

    for(var i=0;i<this.options.length;i++)
        if(this.options[i].getElement().selected)
            tmp.push(this.options[i].getValue());

    return tmp;
};
/**
 * Get current UrOption list in UrSelect
 * @method getCurrent
 * @for UrSelect
 * @return {UrOption}
 */
UrSelect.prototype.getCurrent = function(){
    var tmp = [];

    for(var i=0;i<this.options.length;i++)
        if(this.options[i].getElement().selected)
            tmp.push(this.options[i]);

    return tmp;
};
/**
 * Get multiple attribute of UrSelect
 * @method getMultiple
 * @for UrSelect
 * @return {Boolean}
 */
UrSelect.prototype.getMultiple = function(){
    return this.multiple;
};
/**
 * The UrTab object create a tab manager.
 * @class UrTab
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTab name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTab main container
 *      @param {String}         [settings.className] HTML attribute "class" of UrTab main container
 *      @param {UrWidget}       settings.container UrWidget container for the each tab
 *      @param {Object|UrStyle} settings.styleActive Style of active tab of UrTab
 *      @param {Object|UrStyle} settings.styleInactive Style of inactive tab(s) UrTab
 *      @param {Object|UrStyle} [settings.style] Style of UrTab main container
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var tab = new UrTab({
*           "parent":container,
*           "style":{"border-top":"2px solid gray"},
*           "container":new UrWidget({
*               "style":{
*                   "border":"2px solid gray",
*                   "padding":"25px"
*                }
*            }),
*            "styleActive":{"background":"black","color":"white","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"},
*            "styleInactive":{"background":"white","color":"black","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"}
*        });
 *       tab.add({
 *          "lib":"TEST TAB 1",
 *          "content":new UrWidget({
 *              "html":"CONTENT 1"
 *          }),
 *          "active":true
 *       });
 *       tab.add({
 *          "lib":"TEST TAB 2",
 *          "content":new UrWidget({
 *              "html":"CONTENT 2"
 *           }),
 *           "active":false
 *        });
 *        tab.getTabParent().addChild(new UrWidget({
 *          "style":{
 *              "clear":"both"
 *          }
 *        }));
 *        tab.tryMakeEqualTabWidth();
 * @constructor
 */
var UrTab=function(settings){
    /**
     * @property tab
     * @type Array<UrWidget>
     * @description UrTab list of tab
     */
    this.tab;
    /**
     * @property current
     * @type Number
     * @description UrTab current tab
     */
    this.current;
    /**
     * @property styleActive
     * @type {Object|UrStyle}
     * @description Style of active tab of UrTab
     */
    this.styleActive;
    /**
     * @property styleInactive
     * @type {Object|UrStyle}
     * @description Style of inactive tab(s) of UrTab
     */
    this.styleInactive;
    /**
     * @property tabParent
     * @type {UrWidget}
     * @description Parent for each tab ui
     */
    this.tabParent;
    /**
     * @property container
     * @type {UrWidget}
     * @description Container for each tab content of UrTab
     */
    this.container;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"container":[UrWidget],"styleActive":[Object,UrStyle],"styleInactive":[Object,UrStyle]});

        UrWidget.call(this, settings, "UrTab");

        this.tab = [];
        this.tabParent = new UrWidget({"parent":this});

        this.setStyleActive(settings.styleActive);
        this.setStyleInactive(settings.styleInactive);
        this.setContainer(settings.container);
    }
};
UrTab.prototype=new UrWidget();
UrTab.prototype.constructor=UrTab;
/**
 * Set container for each tab content of UrTab
 * @method setContainer
 * @for UrTab
 * @param {UrWidget} container
 */
UrTab.prototype.setContainer=function(container){
    this.container = container;
    if(this.container==undefined)
        this.container = new UrWidget({});
    this.addChild(this.container);
};
/**
 * Set style for active tab of UrTab
 * @method setStyleActive
 * @for UrTab
 * @param {Object|UrStyle} styleActive
 */
UrTab.prototype.setStyleActive=function(styleActive){
    if(styleActive == undefined)
        styleActive = {"background":"black","color":"white","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"};
    this.styleActive = styleActive;
    if(this.tab.length > 0)
        this.setCurrentTab(this.current);
};
/**
 * Set style for inactive tab(s) of UrTab
 * @method setStyleInactive
 * @for UrTab
 * @param {Object|UrStyle} styleInactive
 */
UrTab.prototype.setStyleInactive=function(styleInactive){
    if(styleInactive == undefined)
        styleInactive = {"background":"white","color":"black","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"}
    this.styleInactive = styleInactive;
    if(this.tab.length > 0)
        this.setCurrentTab(this.current);
};
/**
 * Add a tab in UrTab
 * @method add
 * @for UrTab
 * @param {Object} settings
 *      @param {String} settings.lib
 *      @param {UrWidget} settings.content
 *      @param {Boolean} settings.active
 */
UrTab.prototype.add=function(settings){
    var _this = this;
    var style = this.styleInactive;
    if(settings.active)
        style = this.styleActive;

    var tab = new UrWidget({
        "parent":this.tabParent,
        "style":style,
        "html":settings.lib
    });
    var index = _this.tab.length;
    this.tab.push({"lib":settings.lib,"tab":tab,"content":settings.content});

    this.container.addChild(settings.content);
    if(settings.active == false || settings.active == undefined)
        settings.content.getStyle().set("display","none");
    if(settings.active == true)
        this.current = index;

    tab.click(function(){
        _this.setCurrentTab(index);
    });
};
/**
 * Get UrWidget tab parent
 * @method getTabParent
 * @for UrTab
 * @return {UrWidget}
 */
UrTab.prototype.getTabParent=function(){
    return this.tabParent;
};
/**
 * Get current tab index
 * @method getCurrent
 * @for UrTab
 * @return {Number}
 */
UrTab.prototype.getCurrent=function(){
    return this.current;
};
/**
 * Get current tab
 * @method getCurrentTab
 * @for UrTab
 * @return {UrWidget}
 */
UrTab.prototype.getCurrentTab=function(){
    return this.tab[this.current]["tab"];
};
/**
 * Get current tab content
 * @method getCurrentTabContent
 * @for UrTab
 * @return {UrWidget}
 */
UrTab.prototype.getCurrentTabContent=function(){
    return this.tab[this.current]["content"];
};
/**
 * Get current tab lib
 * @method getCurrentTabLib
 * @for UrTab
 * @return {UrWidget}
 */
UrTab.prototype.getCurrentTabLib=function(){
    return this.tab[this.current]["lib"];
};
/**
 * Get container of UrTab
 * @method getContainer
 * @for UrTab
 * @return {UrWidget}
 */
UrTab.prototype.getContainer=function(){
    return this.container;
};
/**
 * Remove one tab of UrTab
 * @method removeTab
 * @param {Number} index
 */
UrTab.prototype.removeTab=function(index){
    if(this.tab[index] != undefined){
        this.tab[index]["tab"].remove();
        this.tab[index]["content"].remove();

        this.tab[index] = undefined;
    }
};
/**
 * Remove all tab of UrTab
 * @method removeAllTab
 */
UrTab.prototype.removeAllTab=function(){
    for(var i = 0; i < this.tab; i++){
        this.removeTab(i);
    }
};
/**
 * Get current tab
 * @method setCurrentTab
 * @for UrTab
 * @param {Number} index
 */
UrTab.prototype.setCurrentTab=function(index){
    for(var i=0;i<this.tab.length;i++) {
        if(this.tab[i]!=undefined) {
            this.tab[i]["tab"].setStyle(this.styleInactive);
            this.tab[i]["content"].getStyle().set("display", "none");
        }
    }

    this.tab[index]["tab"].setStyle(this.styleActive);
    this.tab[index]["content"].getStyle().set("display","block");
    this.current = index;
};
/**
 * Equalize width of each tab
 * @method tryMakeEqualTabWidth
 * @for UrTab
 */
UrTab.prototype.tryMakeEqualTabWidth=function(){
    for(var i=0;i<this.tab.length;i++){
        this.tab[i]["tab"].getStyle().set("margin-left","0");
        this.tab[i]["tab"].getStyle().set("margin-right","0");
        this.tab[i]["tab"].getStyle().set("padding-left","0");
        this.tab[i]["tab"].getStyle().set("padding-right","0");
        this.tab[i]["tab"].getStyle().set("width",100/this.tab.length+"%");
    }
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

    if(settings != undefined){
        /**
         * @property that
         * @type UrDataTable
         * @private
         */
        var that = this;

        head=function(){
            if (settings.head != undefined) {
                that.head = new UrCustomWidget("thead", {"parent":that});
                var tr = new UrCustomWidget("tr", {"parent":that.head});

                for(var i=0; i<settings.head.length;i++)
                    var th = new UrCustomWidget("th", {"parent":tr,"html":settings.head[i]});
            }
        };

        var json = new UrJson(settings);
        json.checkType({"columnNumber":["number"],"head":[Array]});

        this.setColumnNumber(settings.columnNumber);
        settings.element = document.createElement("table");
        UrWidget.call(this, settings, "UrTable");
        head();
        this.body = new UrCustomWidget("tbody", {"parent":this});
    }
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
 * The UrTag object create a tag (text with close element).
 * @class UrTag
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTag name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTag main window widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrTag main window widget
 *      @param {Object|UrStyle} [settings.style] Style of UrTag main window widget
 *      @param {String}         [settings.html] HTML content of UrTag
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrTag (for example UrImage with cross).
 *      @param {Function}       [settings.next] Function called when close is clicked
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      new UrTag({
 *          "parent":body,
 *          "html":text,
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"5px","height":"5px"}})
 *      });
 * @constructor
 */
var UrTag=function(settings){
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close
     */
    this.closeWidget;
    /**
     * @property exist
     * @type Boolean
     * @description UrTag exists?
     */
    this.exist;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"closeWidget":[UrDom]});

        this.exist = true;

        if(settings.style == undefined)
            settings.style = {
                "border":"1px solid gray",
                "background":"white",
                "float":"left"
            };
        UrWidget.call(this, settings, "UrTag");
        this.setCloseWidget(settings.closeWidget,settings.next);
    }
};
UrTag.prototype=new UrWidget();
UrTag.prototype.constructor=UrTag;
/**
 * Set UrWidget close of UrTag
 * @method setCloseWidget
 * @for UrTag
 * @param {UrWidget} closeWidget
 * @param {Function} next
 */
UrTag.prototype.setCloseWidget=function(closeWidget,next){
    var that = this;

    this.closeWidget = closeWidget;

    if(this.closeWidget == undefined)
        this.closeWidget = new UrWidget({
            "parent":this,
            "html":"x",
            "style":{
                "float":"right",
                "font-weight":"bold",
                "cursor":"pointer",
                "margin":"-5px 2px 0 5px"
            }
        });
    else
        this.addChild(closeWidget);

    this.addChild(new UrWidget({"parent":this,"style":{"clear":"both"}}));

    this.closeWidget.click(function(){
        that.remove();
        that.exist = false;

        if(next!=undefined)
            next();
    });
};
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

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"rows":["number"],"cols":["number"]});

        settings.element = document.createElement("textarea");
        UrInput.call(this, settings, "UrTextarea");

        this.setRows(settings.rows);
        this.setCols(settings.cols);
    }
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

/**
 * The UrTypeahead object create a typeahead
 * @class UrTypeahead
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTypeahead name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTypeahead
 *      @param {String}         [settings.className] HTML attribute "class" of UrTypeahead
 *      @param {Object|UrStyle} [settings.style] Style of UrTypeahead
 *      @param {Array}          settings.data Data of UrTypeahead  Must be like [{"id":0,"lib":"Line 1"},{"id":1,"lib":"Line 2"}]
 *      @param {Array}          settings.callbackEnter Callback called when "enter" is pressed on keyboard
 *      @param {Array}          settings.callbackClick Callback called when user click on list element
 *      @param {Object|UrStyle} [settings.styleList] Style of UrTypeahead list
 *      @param {UrWidget}       [settings.resetWidget] UrWidget to reset UrTypeahead
 *      @param {UrWidget}       [settings.placeholder] UrWidget Placeholder of UrTypeahead
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      new UrTypeahead({
 *          "parent":body,
 *          "data":[{"id":1,"lib":"Test"}]
 *      });
 * @constructor
 */
var UrTypeahead=function(settings){
    /**
     * @property dataId
     * @type Array<String>
     * @description Ids of data
     */
    this.dataId;
    /**
     * @property dataLib
     * @type Array<String>
     * @description Libs of data
     */
    this.dataLib;
    /**
     * @property currentDataId
     * @type Array<String>
     * @description Current searched ids of data
     */
    this.currentDataId;
    /**
     * @property currentDataLib
     * @type Array<String>
     * @description Current searched libs of data
     */
    this.currentDataLib;
    /**
     * @property content
     * @type UrWidget
     * @description Content of UrTypeahead
     */
    this.content;
    /**
     * @property valueWidget
     * @type UrWidget
     * @description Value widget of UrTypeahead
     */
    this.valueWidget;
    /**
     * @property resetWidget
     * @type UrWidget
     * @description Reset widget of UrTypeahead
     */
    this.resetWidget;
    /**
     * @property placeholder
     * @type UrWidget
     * @description Placeholder of UrTypeahead
     */
    this.placeholder;
    /**
     * @property list
     * @type UrWidget
     * @description Data of UrTypeahead
     */
    this.list;
    /**
     * @property callbackClick
     * @type Function
     * @description Function called when an element was clicked in list
     */
    this.callbackClick;
    /**
     * @property callbackEnter
     * @type Function
     * @description Function called when "enter" was pressed on keyboard
     */
    this.callbackEnter;
    /**
     * @property focused
     * @type boolean
     * @description UrTypeahead has the focus ?
     */
    this.focused;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"data":[Array],"callbackEnter":[Function],"callbackClick":[Function],"styleList":[Object,UrStyle]});

        var _this = this;
        this.focused = false;

        if(settings.style == undefined)
            settings.style = {
                "background":"white",
                "border":"1px solid #c9c9c9",
                "border-bottom":"2px solid #eee",
                "height":"20px",
                "padding":"5px 0 0 0",
                "overflow-y":"hidden",
                "font-size":"16px"
            };

        UrWidget.call(this, settings, "UrTypeahead");

        this.setPlaceholder(settings.placeholder);

        this.setContent(settings.resetWidget);

        this.setPlaceholder(settings.placeholder);
        this.setResetWidget(settings.resetWidget);
        this.setData(settings.data);
        this.setList(this.dataId,this.dataLib);
        this.setListStyle(settings.styleList);
        this.setCallbackClick(settings.callbackClick);
        this.setCallbackEnter(settings.callbackEnter);
    }
};
UrTypeahead.prototype=new UrWidget();
UrTypeahead.prototype.constructor=UrTypeahead;
/**
 * Set content of UrTypeahead
 * @method setContent
 * @for UrTypeahead
 * @param {Object|UrStyle} style
 * @param {UrWidget} resetWidget
 */
UrTypeahead.prototype.setContent=function(resetWidget){
    var that = this;

    this.content        = new UrWidget({"parent":this,"style":{"display":"none"}});

    this.valueWidget    = new UrWidget({"parent":this.content,"style":{"width":"95%","float":"left"}});
    this.valueWidget.getElement().contentEditable = true;

    this.valueWidget.focus(function(){
        that.focused = true;
        that.content.getStyle().set("display","block");
        that.placeholder.getStyle().set("display","none");
        that.list.getStyle().set("display","block");
    });
    this.valueWidget.blur(function(){
        that.focused = false;

        setTimeout(function(){
            if(that.valueWidget.getHtml() == ""){
                that.content.getStyle().set("display","none");
                that.placeholder.getStyle().set("display","block");
            }

            that.list.getStyle().set("display","none");
        },200);
    });

    this.valueWidget.keyDown(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();

            if(that.currentDataLib.length == 1 && that.list.getElement().textContent == that.currentDataLib[0])
                that.callbackEnter({"id":that.currentDataId[0],"lib":that.currentDataLib[0]});
            else
                that.callbackEnter({"id":undefined,"lib":that.content.getHtml()});
        }
        if (e.keyCode == 27 && that.focused == true)
            that.content.getElement().blur();
    });
    this.valueWidget.keyUp(function(e){
        if(e.keyCode == 13)
            e.preventDefault();
        else{
            that.list.getStyle().set("display","block");
            that.search();
        }
    });

    this.setResetWidget(resetWidget);
};
/**
 * Set placeholder of UrTypeahead
 * @method setPlaceholder
 * @for UrTypeahead
 * @param {String} placeholder
 */
UrTypeahead.prototype.setPlaceholder=function(placeholder){
    var that = this;

    this.placeholder = placeholder;

    if(this.placeholder == undefined)
        this.placeholder = new UrWidget({
            "html":"Click here",
            "style":{
                "background":"white",
                "height":"20px",
                "padding":"0 0 0 15px",
                "overflow-y":"hidden",
                "font-size":"11px",
                "color": "gray",
                "font-style": "italic",
                "text-align":"left"
            }
        });

    this.addChild(this.placeholder);

    this.placeholder.click(function(){
        that.placeholder.getStyle().set("display","none");
        that.content.getStyle().set("display","block");
        that.valueWidget.getElement().focus();
    });
};
/**
 * Set UrWidget reset of UrTypeahead
 * @method setResetWidget
 * @for UrTypeahead
 * @param {UrWidget} resetWidget
 */
UrTypeahead.prototype.setResetWidget=function(resetWidget){
    var that = this;

    if(this.resetWidget != undefined)
        this.resetWidget.remove();

    this.resetWidget = resetWidget;

    if(this.resetWidget == undefined)
        this.resetWidget = new UrWidget({
            "parent":this.content,
            "html":"x",
            "style":{
                "width":"3%",
                "font-weight":"bold",
                "cursor":"pointer",
                "text-align":"right",
                "float":"left"
            }
        });
    else
        this.content.addChild(resetWidget);

    this.addChild(new UrWidget({"parent":this,"style":{"clear":"both"}}));

    this.resetWidget.click(function(){
        that.reset();
    });
};
/**
 * Set datas of UrTypeahead
 * @method setData
 * @for UrTypeahead
 * @param {Array<Object>} data
 */
UrTypeahead.prototype.setData=function(data){
    this.dataId     = [];
    this.dataLib    = [];

    if(data != undefined){
        for(var i=0;i<data.length;i++){
            this.dataId.push(data[i]["id"]);
            this.dataLib.push(data[i]["lib"]);
        }
    }
};
/**
 * Creates list UrWidget
 * @method setList
 * @for UrTypeahead
 * @param {Array<Number>} dataId
 * @param {Array<String>} dataLib
 */
UrTypeahead.prototype.setList=function(dataId,dataLib){
    var _this = this;

    this.currentDataId = dataId;
    this.currentDataLib = dataLib;

    if(this.list==undefined)
        this.list=new UrWidget({
            "parent":this.parent
        });
    else
        this.list.removeAllChildren();

    for(var i=0;i<dataLib.length;i++){
        (function(index){
            var element = new UrWidget({
                "parent":_this.list,
                "html":dataLib[i]
            });

            element.click(function(){
                _this.valueWidget.setHtml(dataLib[index]);
                _this.callbackClick({"id":dataId[index],"lib":dataLib[index]});
                _this.search(dataLib[index]);
            });
        }(i));
    }
};
/**
 * Set style of list UrWidget
 * @method setListStyle
 * @for UrTypeahead
 * @param {Object|UrStyle} style
 */
UrTypeahead.prototype.setListStyle=function(style){
    if(style == undefined)
        style = {
            "position":"absolute",
            "background":"white",
            "border":"1px solid #eee",
            "cursor":"pointer",
            "padding":"0 0 0 15px"
        };

    this.list.setStyle(style);
    this.list.getStyle().set("width",this.getElement().offsetWidth+"px");
    this.list.getStyle().set("display","none");
};
/**
 * Set function called when an element was clicked in list
 * @method setCallbackClick
 * @for UrTypeahead
 * @param {Function} foo
 */
UrTypeahead.prototype.setCallbackClick=function(foo){
    if(foo==undefined)
        this.callbackClick = function(){};
    else
        this.callbackClick = foo;
};
/**
 * Set function called when "enter" was pressed on keyboard
 * @method setCallbackEnter
 * @for UrTypeahead
 * @param {Function} foo
 */
UrTypeahead.prototype.setCallbackEnter=function(foo){
    if(foo==undefined)
        this.callbackEnter = function(){};
    else
        this.callbackEnter = foo;
};
/**
 * Search a word in data
 * @method search
 * @for UrTypeahead
 */
UrTypeahead.prototype.search=function(){
    if(this.valueWidget.getHtml()=="")
        this.setList(this.dataId,this.dataLib);
    else{
        var dataId = [];
        var dataLib = [];

        var search = new RegExp(this.valueWidget.getElement().textContent.trim(),"i");

        for(var i = 0; i < this.dataLib.length; i++){
            if(search.test(this.dataLib[i])){
                dataId.push(this.dataId[i]);
                dataLib.push(this.dataLib[i]);
            }
        }

        this.setList(dataId,dataLib);
    }
};
/**
 * Get list UrWidget
 * @method getList
 * @for UrTypeahead
 * @return {UrWidget}
 */
UrTypeahead.prototype.getList=function(){
    return this.list;
};
/**
 * Reset content of UrTypeahead
 * @method reset
 * @for UrTypeahead
 * @param {Function} focus
 */
UrTypeahead.prototype.reset=function(focus){
    this.valueWidget.setHtml("");

    if(focus == true)
        this.valueWidget.getElement().focus();
    else{
        this.placeholder.getStyle().set("display","block");
        this.content.getStyle().set("display","none");
    }

    this.search();
};
/**
 * Get current data of UrTypeahead
 * @method getCurrentData
 * @for UrTypeahead
 * @param {Function} focus
 */
UrTypeahead.prototype.getCurrentData=function(){
    var current = [];
    for(var i=0;i<this.currentDataId.length;i++)
        current.push({"id":this.currentDataId[i],"lib":this.currentDataLib[i]});

    return current;
};
/**
 * Get current valueof UrTypeahead
 * @method getValue
 * @for UrTypeahead
 */
UrTypeahead.prototype.getValue=function(){
    return this.valueWidget.getElement().textContent.trim();
};
