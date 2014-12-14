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


