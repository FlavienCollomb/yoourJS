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