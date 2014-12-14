/**
 * The UrTable object create a table.
 * @class UrTable
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTable name
 *      @param {UrWidget}       [settings.parent] UrTable's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrTable
 *      @param {String}         [settings.className] HTML attribute "class" of UrTable
 *      @param {Object|UrStyle} [settings.style] Style of UrTable
 *      @param {Number}         settings.columnNumber Number of column of UrTable
 *      @param {Array}          [settings.head] Columns titles
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var table = new UrTable({
 *          "parent":content,
 *          "className":"table",
 *          "head":["Column 1","Column 2","Column 3","Column 4","Column 5","Column 6","Column 7"],
 *          "columnNumber":7
 *      });
 *      var line = table.add();
 *      var cells = line.getChildren();
 *      cells[0].setHtml("Test 1");
 *      cells[1].setHtml("Test 2");
 *      cells[2].setHtml("Test 3");
 *      cells[3].setHtml("Test 4");
 *      cells[4].setHtml("Test 5");
 *      cells[5].setHtml("Test 6");
 *      cells[6].setHtml("Test 7");
 * @constructor
 */
var UrTable=function(settings){
    /**
     * @property head
     * @type UrCustomWidget
     * @description Thead of the HTML table of UrTable
     */
    this.head;
    /**
     * @property body
     * @type UrCustomWidget
     * @description Tbody of the HTML table of the UrTable
     */
    this.body;
    /**
     * @property lines
     * @type Array
     * @description Array of each Tr of the HTML table of UrTable
     */
    this.lines = [];

    if(settings != undefined){
        /**
         * @property that
         * @type UrDataTable
         * @private
         */
        var that = this;

        head=function(){
            if (settings.head != undefined) {
                that.head = new UrCustomWidget("thead", {"parent":that});
                var tr = new UrCustomWidget("tr", {"parent":that.head});

                for(var i=0; i<settings.head.length;i++)
                    var th = new UrCustomWidget("th", {"parent":tr,"html":settings.head[i]});
            }
        };

        var json = new UrJson(settings);
        json.checkType({"columnNumber":["number"],"head":[Array]});

        this.setColumnNumber(settings.columnNumber);
        settings.element = document.createElement("table");
        UrWidget.call(this, settings, "UrTable");
        head();
        this.body = new UrCustomWidget("tbody", {"parent":this});
    }
};
UrTable.prototype=new UrWidget();
UrTable.prototype.constructor=UrTable;
/**
 * Set number of column of UrTable
 * @method setColumnNumber
 * @for UrTable
 * @param columnNumber
 */
UrTable.prototype.setColumnNumber = function(columnNumber){
    this.columnNumber = 0;
    if(columnNumber !=  undefined)
        this.columnNumber = columnNumber;
};
/**
 * Add one empty line in UrTable
 * @method add
 * @for UrTable
 */
UrTable.prototype.add = function(){
    var tr = new UrCustomWidget("tr", {"parent":this.body});
    this.lines.push(tr);
    for(var i=0; i < this.columnNumber; i++)
        new UrCustomWidget("td", {"parent":tr});
    return tr;
};
/**
 * Get Thead of the HTML table of UrTable
 * @method getHead
 * @for UrTable
 * @return {UrCustomWidget}
 */
UrTable.prototype.getHead = function(){ return this.head; };
/**
 * Get TBody of the HTML table of UrTable
 * @method getBody
 * @for UrTable
 * @return {UrCustomWidget}
 */
UrTable.prototype.getBody = function(){ return this.body; };
/**
 * Get Tr of the HTML table of UrTable
 * @method getLines
 * @for UrTable
 * @return {Array}
 */
UrTable.prototype.getLines = function(){ return this.lines; };