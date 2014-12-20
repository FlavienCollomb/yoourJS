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