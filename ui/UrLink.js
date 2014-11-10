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