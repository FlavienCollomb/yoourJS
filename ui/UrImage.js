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


