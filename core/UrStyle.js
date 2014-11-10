/**
 * The UrStyle class is the base class that encapsulates the look and feel of one UrDom
 * @param {Object} style
 * @param {UrDom} element
 * @constructor
 */
var UrStyle = function(style, element){
    UrObject.call(this, "UrStyle");
    /** @type UrDom */ this.element = element;

    if(style != undefined){
        this.json = new UrJson(style);
        this.design();
    }
    else
        this.json = new UrJson({});
};
UrStyle.prototype=new UrObject();
UrStyle.prototype.constructor=UrStyle;

UrStyle.prototype.design = function(){
    this.element.style = this;
    if(this.element != undefined) this.json.each(this.set, this);
};
/**
 * @param {string} attribute
 * @param {string|number} style
 */
UrStyle.prototype.set = function(attribute, style){
    attribute = new UrString(attribute).toCamelCase();
    this.json.setValue(attribute, style);
    this.element.getElement().style[attribute] = style;
};
/**
 * @param {string} attribute
 * @returns {*}
 */
UrStyle.prototype.get = function(attribute){
    attribute = new Urtring(attribute).toCamelCase();
    if(this.json.getValue(attribute) != undefined) return this.json[attribute];
    else return this.elem.getNode().style[attribute];
};
/**
 * @param {UrDom} elem
 * @returns {UrStyle}
 */
UrStyle.prototype.copy = function(elem){
    return new UrStyle(this.json.get(), elem);
};
