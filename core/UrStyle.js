/**
 * The UrStyle class is the base class that encapsulates the look and feel of one UrDom
 * @class UrStyle
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} style Object with style attributes
 * @param {UrDom} UrDom element stylized
 * @example
 *      var style = new UrStyle(
 *          {"background":"black"},
 *          new UrWidget({"element": document.getElementsByTagName("body")[0]})
 *      );
 * @constructor
 */
var UrStyle = function(style, element){
    UrObject.call(this, "UrStyle");
    /**
     * @property element
     * @type UrDom
     */
    this.element = element;
    /**
     * @property json
     * @type UrJson
     */
    this.json;

    if(style != undefined){
        this.json = new UrJson(style);
        this.design();
    }
    else
        this.json = new UrJson({});
};
UrStyle.prototype=new UrObject();
UrStyle.prototype.constructor=UrStyle;
/**
 * Apply style on UrDom element
 * @method design
 * @for UrStyle
 */
UrStyle.prototype.design = function(){
    this.element.style = this;
    if(this.element != undefined) this.json.each(this.set, this);
};
/**
 * Set a style attribute
 * @method set
 * @for UrStyle
 * @param {String} attribute
 * @param {String|Number} style
 */
UrStyle.prototype.set = function(attribute, style){
    attribute = new UrString(attribute).toCamelCase();
    this.json.setValue(attribute, style);
    this.element.getElement().style[attribute] = style;
};
/**
 * Get a style attribute
 * @method set
 * @for UrStyle
 * @param {String} attribute
 * @return {*}
 */
UrStyle.prototype.get = function(attribute){
    attribute = new Urtring(attribute).toCamelCase();
    if(this.json.getValue(attribute) != undefined) return this.json[attribute];
    else return this.elem.getNode().style[attribute];
};
/**
 * Copy the style in other UrDom element
 * @method set
 * @for UrStyle
 * @param {UrDom} elem
 * @return {UrStyle}
 */
UrStyle.prototype.copy = function(elem){
    return new UrStyle(this.json.get(), elem);
};
