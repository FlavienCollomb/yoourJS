/**
 * The UrOption object create an option for select
 * @class UrOption
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrOption name
 *      @param {UrWidget}       [settings.parent] UrOption's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrOption
 *      @param {String}         [settings.className] HTML attribute "class" of UrOption
 *      @param {Object|UrStyle} [settings.style] Style of UrOption
 *      @param {string}         [settings.html] HTML content of UrOption
 *      @param {String|Number}  [settings.value] Value of UrOption
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 * @constructor
 */
var UrOption = function(settings){
    /**
     * @property value
     * @type String
     * @description Value of UrLabel
     */
    this.value;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"value":["string","number"]});

        settings.element = document.createElement("option");

        UrWidget.call(this, settings, "UrOption");

        this.setValue(settings.value);
    }
};
UrOption.prototype=new UrWidget();
UrOption.prototype.constructor=UrOption;
/**
 * Set value of UrOption
 * @method setValue
 * @for UrOption
 * @param {String|Number} value
 */
UrOption.prototype.setValue = function(value){
    this.value = value;
    if(this.value != undefined) this.element.value = this.value;
};
/**
 * Get value of UrOption
 * @method getValue
 * @for UrOption
 * @return {String}
 */
UrOption.prototype.getValue = function(){
    return this.value;
};