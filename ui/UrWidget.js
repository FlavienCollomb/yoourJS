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