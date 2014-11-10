/**
 * The UrTextarea is used to construct textarea
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {boolean}        [settings.enable]
 *      @param {string}         [settings.defaultValue]
 *      @param {UrValidator}    [settings.validator]
 *      @param {string}         [settings.placeholder]
 *      @param {number}         [settings.rows]
 *      @param {number}         [settings.cols]
 * @constructor
 */
var UrTextarea = function(settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement("textarea");

    this.rows, this.cols;

    UrInput.call(this, settings, "UrTextarea");

    this.setRows(settings.rows);
    this.setCols(settings.cols);
};
UrTextarea.prototype=new UrInput();
UrTextarea.prototype.constructor=UrTextarea;
/**
 * @param {number} rows
 */
UrTextarea.prototype.setRows = function(rows){
    this.rows = rows;
    if(this.rows != undefined) this.element.rows = this.rows;
};
/**
 * @param {number} cols
 */
UrTextarea.prototype.setCols = function(cols){
    this.cols = cols;
    if(this.cols != undefined) this.element.cols = this.cols;
};

