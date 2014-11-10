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