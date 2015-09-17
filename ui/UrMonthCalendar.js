/**
 * The UrMonthCalendar object create a month calendar.
 * @class UrPopup
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {UrDate}         settings.date Reference date for UrMonthCalendar
 *      @param {String}         [settings.name] UrMonthCalendar name
 *      @param {String}         [settings.id] HTML attribute "id" of UrMonthCalendar
 *      @param {String}         [settings.className] HTML attribute "class" of UrMonthCalendar
 *      @param {Object|UrStyle} [settings.style] Style of UrMonthCalendar
 *      @param {Object|UrStyle} [settings.styleRowHead] Style of the first row
 *      @param {Object|UrStyle} [settings.styleCellHead] Style of the cells in the first row
 *      @param {Object|UrStyle} [settings.styleRow] Style of the other rows
 *      @param {Object|UrStyle} [settings.styleCell] Style of the other cells
 *      @param {Array<String>} [settings.libs] Libs of the days
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *
 *      var popup = new UrMonthCalendar({
 *          "parent":body
 *       });
 * @constructor
 */
var UrMonthCalendar=function(settings){
    /**
     * @property date
     * @type UrDate
     * @description reference date
     */
    this.date;
    /**
     * @property styleRowHead
     * @type String|UrStyle
     * @description style of the first row
     */
    this.styleRowHead;
    /**
     * @property styleCellHead
     * @type String|UrStyle
     * @description style of the cells of the first row
     */
    this.styleCellHead;
    /**
     * @property styleRow
     * @type String|UrStyle
     * @description style of the other rows
     */
    this.styleRow;
    /**
     * @property styleCell
     * @type String|UrStyle
     * @description style of the other cells
     */
    this.styleCell;
    /**
     * @property libs
     * @type Array<String>
     * @description libs of the days
     */
    this.libs;
    /**
     * @property head
     * @type UrWidget
     * @description first row
     */
    this.head;
    /**
     * @property rows
     * @type Array<UrWidget>
     * @description rows of the UrMonthCalendar
     */
    this.rows = [];
    /**
     * @property cells
     * @type Array<UrWidget>
     * @description cells of the UrMonthCalendar
     */
    this.cells = [];
    /**
     * @property cells
     * @type UrJson
     * @description let you acces of each cell by number of day
     */
    this.cellsJSON;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"date":[UrDate],"styleRowHead":[Object,UrDom],"styleCellHead":[Object,UrDom],"styleRow":[Object,UrDom],"styleCell":[Object,UrDom]});

        UrWidget.call(this, settings, "UrMonthCalendar");

        this.setDate(settings.date);
        this.setStyleRowHead(settings.styleRowHead);
        this.setStyleCellHead(settings.styleCellHead);
        this.setStyleRow(settings.styleRow);
        this.setStyleCell(settings.styleCell);
        this.setLibs(settings.libs);
        this.setHead();
        this.setUi();
    }
};
UrMonthCalendar.prototype=new UrWidget();
UrMonthCalendar.prototype.constructor=UrPopup;
/**
 * Set reference date
 * @method setDate
 * @param {UrDate} date
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setDate=function(date){
    if(date == undefined)
        date = new UrDate(new Date());
    this.date = date;
};
/**
 * Set style of the first row
 * @method setStyleRowHead
 * @param {String|UrStyle} style
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setStyleRowHead=function(style){
    if(style == undefined){
        style = {
            "float":"left",
            "width":"100%",
            "background":"#f6f6f6",
            "box-shadow": "inset 0 1px 0 rgba(255,255,255,0.2)",
            "border-top":"5px solid black",
            "height": "40px",
            "line-height": "40px"
        }
    }
    this.styleRowHead = style;
};
/**
 * Set style of the first cells of the first row
 * @method setStyleCellHead
 * @param {String|UrStyle} style
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setStyleCellHead=function(style){
    if(style == undefined){
        style = {
            "float":"left",
            "color": "black",
            "font-weight": "300",
            "text-transform": "uppercase",
            "font-size": "14px",
            "letter-spacing": "3px",
            "text-shadow": "0 1px 1px rgba(0,0,0,0.4)",
            "width": "14.2%",
            "text-align":"center"
        }
    }
    this.styleCellHead = style;
};
/**
 * Set style of the other rows
 * @method setStyleRow
 * @param {String|UrStyle} style
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setStyleRow=function(style){
    if(style == undefined){
        style = {
            "float":"left",
            "width":"100%"
        }
    }
    this.styleRow = style;
};
/**
 * Set style of the other cells
 * @method setStyleCell
 * @param {String|UrStyle} style
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setStyleCell=function(style){
    if(style == undefined){
        style = {
            "float":"left",
            "border":"1px solid lightgray",
            "cursor": "pointer",
            "width": "14%",
            "height":"100px"
        }
    }
    this.styleCell = style;
};
/**
 * Set libs of the days
 * @method setLibs
 * @param {Array<String>} libs
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setLibs=function(libs){
    if(libs == undefined)
        this.libs = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    else
        this.libs = libs;
};
/**
 * Creates the first row of UrMonthCalendar
 * @method setHead
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setHead=function(){
    this.head = new UrWidget({
        "parent":this.parent,
        "style":this.styleRowHead
    });

    for(var i=0;i<this.libs.length;i++)
        new UrWidget({
            "parent":this.head,
            "style":this.styleCellHead,
            "html":this.libs[i]
        });
};
/**
 * Creates the general ui of UrMonthCalendar
 * @method setUi
 * @for UrMonthCalendar
 */
UrMonthCalendar.prototype.setUi=function(){
    for(var i=0;i<6;i++){
        var row = new UrWidget({
            "parent":this.parent,
            "style":this.styleRow
        });
        this.rows.push(row);

        for(var j=0;j<7;j++){
            var cell = new UrWidget({
                "parent":row,
                "style":this.styleCell
            });
            this.cells.push(cell);
        }

        new UrWidget({
            "parent":row,
            "style":{
                "clear":"both"
            }
        });
    }

    var firstDay = new Date(this.date.get().getFullYear(), this.date.get().getMonth(), 1).getDay();
    var lastDay = new Date(this.date.get().getFullYear(), this.date.get().getMonth() + 1, 0).getDay();
    var numberOfDay = new Date(this.date.get().getYear(), this.date.get().getMonth() + 1, 0).getDate();

    if(firstDay == 0)
        firstDay = 7;
    var begin = firstDay - 1;

    var tmp = {};
    for(var i=0;i<numberOfDay;i++){
        this.cells[begin].setHtml("<b>" + (i+1) + "</b>");
        tmp[i+1] = this.cells[begin];
        begin++;
    }

    this.cellsJSON = new UrJson(tmp);

    for(var i=0;i<this.cells.length;i++)
        if(this.cells[i].getHtml() == undefined || this.cells[i].getHtml() == "")
            this.cells[i].getStyle().set("visibility","hidden");
};
/**
 * Get cells in a UrJson to get them by number of day
 * @method getCellJSON
 * @for UrMonthCalendar
 * @return {UrJson}
 */
UrMonthCalendar.prototype.getCellJSON = function(){
    return this.cellsJSON;
};
/**
 * Get cell by number of day
 * @method getCellByDayNumber
 * @for UrMonthCalendar
 * @param {Array<String>} day
 * @return {UrWidget}
 */
UrMonthCalendar.prototype.getCellByDayNumber = function(day){
    return this.cellsJSON.getValue(day);
};
