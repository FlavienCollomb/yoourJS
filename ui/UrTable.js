/**
 * The UrTable object create a table.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {number}         settings.columnNumber
 *      @param {Array}          [settings.head]
 * @constructor
 */
var UrTable=function(settings){
    /**
     * PRIVATE
     */
    head=function(){
        if (settings.head != undefined) {
            that.head = new UrCustomWidget("thead", {"parent":that});
            var tr = new UrCustomWidget("tr", {"parent":that.head});

            for(var i=0; i<settings.head.length;i++)
                var th = new UrCustomWidget("th", {"parent":tr,"html":settings.head[i]});
        }
    };

    /**
     * @type {UrTable}
     */
    var that = this;

    if(settings == undefined) settings = {};

    /** @type number */ this.columnNumber;
    /** @type UrCustomWidget */ this.head;
    /** @type UrCustomWidget */ this.body;
    /** @type Array<UrCustomWidget> */ this.lines = [];

    this.setColumnNumber(settings.columnNumber);
    settings.element = document.createElement("table");
    UrWidget.call(this, settings, "UrTable");
    head();
    this.body = new UrCustomWidget("tbody", {"parent":this});
};
UrTable.prototype=new UrWidget();
UrTable.prototype.constructor=UrTable;
/**
 * @param columnNumber
 */
UrTable.prototype.setColumnNumber = function(columnNumber){
    this.columnNumber = 0;
    if(columnNumber !=  undefined)
        this.columnNumber = columnNumber;
};
UrTable.prototype.add = function(){
    var tr = new UrCustomWidget("tr", {"parent":this.body});
    this.lines.push(tr);
    for(var i=0; i < this.columnNumber; i++)
        new UrCustomWidget("td", {"parent":tr});
    return tr;
};
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getHead = function(){ return this.head; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getBody = function(){ return this.body; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrTable.prototype.getLines = function(){ return this.lines; };