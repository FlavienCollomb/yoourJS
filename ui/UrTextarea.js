/**
 * The UrTextarea is used to construct textarea
 * @class UrTextarea
 * @extends UrInput
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTextarea name
 *      @param {UrWidget}       [settings.parent] UrTextarea's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrTextarea
 *      @param {String}         [settings.className] HTML attribute "class" of UrTextarea
 *      @param {Object|UrStyle} [settings.style] Style of UrTextarea
 *      @param {Boolean}        [settings.enable]  HTML attribute "disable" of UrTextarea
 *      @param {String}         [settings.defaultValue] Default value of UrTextarea
 *      @param {UrValidator}    [settings.validator] Validator used for UrTextarea validation
 *      @param {String}         [settings.placeholder] HTML attribute "placeholder" of UrTextarea
 *      @param {Number}         [settings.rows] Number of rows of UrTextarea
 *      @param {Number}         [settings.cols] Number of cols of UrTextarea
 * @constructor
 */
var UrTextarea = function(settings){
    /**
     * @property row
     * @type Number
     * @description Number of rows of UrTextarea
     */
    this.row;
    /**
     * @property cols
     * @type Number
     * @description Number of cols of UrTextarea
     */
    this.cols;

    if(settings!=undefined){
        var json = new UrJson(settings);
        json.checkType({"rows":["number"],"cols":["number"]});

        settings.element = document.createElement("textarea");
        UrInput.call(this, settings, "UrTextarea");

        this.setRows(settings.rows);
        this.setCols(settings.cols);
    }
};
UrTextarea.prototype=new UrInput();
UrTextarea.prototype.constructor=UrTextarea;
/**
 * Set number of rows of UrTextarea
 * @method setRows
 * @for UrTextarea
 * @param {Number} rows
 */
UrTextarea.prototype.setRows = function(rows){
    this.rows = rows;
    if(this.rows != undefined) this.element.rows = this.rows;
};
/**
 * Set number of cols of UrTextarea
 * @method setCols
 * @for UrTextarea
 * @param {Number} cols
 */
UrTextarea.prototype.setCols = function(cols){
    this.cols = cols;
    if(this.cols != undefined) this.element.cols = this.cols;
};

