/**
 * The UrSelect is used to construct a HTML select
 * @class UrSelect
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}             [settings.name] UrSelect name
 *      @param {UrWidget}           [settings.parent] UrSelect's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}             [settings.id] HTML attribute "id" of UrSelect
 *      @param {String}             [settings.className] HTML attribute "class" of UrSelect
 *      @param {Object|UrStyle}     [settings.style] Style of UrSelect
 *      @param {Boolean}            [settings.enable]  HTML attribute "disable" of UrSelect
 *      @param {Array<UrOption>}    [settings.options] Options in UrSelect
 *      @param {Boolean}            [settings.multiple] UrSelect is multiple ?
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var form = new UrForm({
 *          "parent":body
 *      });
 *      var select = new UrSelect({
 *          "name":"test-select",
 *          "options":[
 *              new UrOption({
 *                  "html":"TEST",
 *                  "value":"test"
 *              })
 *          ]
 *      });
 * @constructor
 */
var UrSelect = function(settings){
    /**
     * @property options
     * @type Array<UrOption>
     * @description UrOption list in UrSelect
     */
    this.options;
    /**
     * @property multiple
     * @type Boolean
     * @description UrSelect is multiple ?
     */
    this.multiple;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"options":[Array],"multiple":["boolean"]});

        this.options = [];

        settings.element = document.createElement("select");
        UrWidget.call(this, settings, "UrSelect");

        if(settings.options == undefined)
            settings.options = [];

        for(var i=0;i<settings.options.length;i++)
            this.add(settings.options[i]);
        this.setMultiple(settings.multiple);
    }
};
UrSelect.prototype=new UrWidget();
UrSelect.prototype.constructor=UrSelect;
/**
 * Add UrOption in UrSelect
 * @method add
 * @for UrSelect
 * @param {UrOption} option
 */
UrSelect.prototype.add = function(option){
    this.options.push(option);
    this.addChild(option);
};
/**
 * Set UrSelect multiple
 * @method setMultiple
 * @for UrSelect
 * @param {Boolean} multiple
 */
UrSelect.prototype.setMultiple = function(multiple){
    this.multiple = multiple;
    if(this.multiple)
        this.element.multiple = "multiple";
};
/**
 * Get UrOption list in UrSelect
 * @method getOptions
 * @for UrSelect
 * @return {Array<UrOption>}
 */
UrSelect.prototype.getOptions = function(){
    return this.options;
};
/**
 * Get current UrOption list value in UrSelect
 * @method getOptions
 * @for UrSelect
 * @return {Array<String>}
 */
UrSelect.prototype.getValue= function(){
    var tmp = [];

    for(var i=0;i<this.options.length;i++)
        if(this.options[i].getElement().selected)
            tmp.push(this.options[i].getValue());

    return tmp;
};
/**
 * Get current UrOption list in UrSelect
 * @method getCurrent
 * @for UrSelect
 * @return {UrOption}
 */
UrSelect.prototype.getCurrent = function(){
    var tmp = [];

    for(var i=0;i<this.options.length;i++)
        if(this.options[i].getElement().selected)
            tmp.push(this.options[i]);

    return tmp;
};
/**
 * Get multiple attribute of UrSelect
 * @method getMultiple
 * @for UrSelect
 * @return {Boolean}
 */
UrSelect.prototype.getMultiple = function(){
    return this.multiple;
};