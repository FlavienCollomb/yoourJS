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
    if(settings == undefined) settings = {};
    /**
     * @property parts
     * @type Array
     * @description Parts of UrLine
     */
    this.parts=[];

    UrWidget.call(this, settings, "UrLine");

    for(var i=0; i<settings.partsNumber; i++)
        this.parts.push(new UrWidget({"parent":this,"className":settings.partsClassName,"style":settings.partsStyle}));
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