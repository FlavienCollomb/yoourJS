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