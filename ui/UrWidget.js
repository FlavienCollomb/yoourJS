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