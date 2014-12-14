/**
 * The UrLabel object create a label
 * @class UrLabel
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrLabel name
 *      @param {UrWidget}       [settings.parent] UrLabel's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrLabel
 *      @param {String}         [settings.className] HTML attribute "class" of UrLabel
 *      @param {Object|UrStyle} [settings.style] Style of UrLabel
 *      @param {string}         [settings.html] HTML content of UrLabel
 *      @param {string}         [settings.for] HTML attribute "for" of UrLabel
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var label = new UrLabel({
 *          "parent":body,
 *          "htmlFor":"input-id",
 *          "html":"Label 1"
 *      });
 * @constructor
 */
var UrLabel = function(settings){
    /**
     * @property htmlFor
     * @type String
     * @description HTML attribute "for" of UrLabel
     */
    this.htmlFor;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"for":["string","number"]});

        settings.element = document.createElement("label");

        UrWidget.call(this, settings, "UrLabel");

        this.setHtmlFor(settings.htmlFor);
    }
};
UrLabel.prototype=new UrWidget();
UrLabel.prototype.constructor=UrLabel;
/**
 * Set HTML attribute "for" of UrLabel
 * @method setFor
 * @for UrLabel
 * @param {String} htmlFor
 */
UrLabel.prototype.setHtmlFor = function(htmlFor){
    this.htmlFor = htmlFor;
    if(this.htmlFor != undefined) this.element.htmlFor = this.htmlFor;
};
/**
 * Get HTML attribute "for" of UrLabel
 * @method getHtmlFor
 * @for UrLabel
 * @return {String}
 */
UrLabel.prototype.getHtmlFor = function(){
    return this.htmlFor;
};