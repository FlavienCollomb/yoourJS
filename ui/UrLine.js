/**
 * The UrLine object create a line with X parts to facilitate your UI creation
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 *      @param {number}         settings.partsNumber
 *      @param {string}         [settings.partsClassName]
 *      @param {Object|UrStyle} [settings.partsStyle]
 * @constructor
 */
var UrLine = function(settings){
    if(settings == undefined) settings = {};

    /**@type Array<UrWidget>*/this.parts=[];

    UrWidget.call(this, settings, "UrLine");

    for(var i=0; i<settings.partsNumber; i++)
        this.parts.push(new UrWidget({"parent":this,"className":settings.partsClassName,"style":settings.partsStyle}));
};
UrLine.prototype=new UrWidget();
UrLine.prototype.constructor=UrLine;
/**
 * @param {number} index
 * @returns {UrWidget}
 */
UrLine.prototype.getPart=function(index){
    return this.parts[index];
};