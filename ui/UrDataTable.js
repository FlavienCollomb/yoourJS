/**
 * The UrDataTable object create a table of result thanks a JSON of correspondence.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {Array<Object>}  settings.datas
 *      @param {Object}         settings.description
 * @constructor
 */
var UrDataTable = function(settings){
    /**
     * PRIVATE
     */
    head=function(description){
        that.head = new UrCustomWidget("thead", {"parent":that});
        var tr = new UrCustomWidget("tr", {"parent":that.head});
        for(var i in that.description)
            if(that.description[i]["hide"] == undefined){
                var th = new UrCustomWidget("th", {"parent":tr,"html":that.description[i]["title"]});
        }
    };
    /**
     * @type {UrDataTable}
     */
    var that = this;

    if(settings == undefined) settings = {};

    /** @type UrCustomWidget */ this.head;
    /** @type UrCustomWidget */ this.body;
    /** @type Array<UrCustomWidget> */ this.lines = [];
    /** @type Object */ this.description = settings.description;


    if(settings.datas != undefined && settings.datas instanceof Array && settings.datas.length > 0){
        settings.element = document.createElement("table");
        UrWidget.call(this, settings, "UrDataTable");
        head();
        this.body = new UrCustomWidget("tbody", {"parent":this});
        this.add(settings.datas);
    }
};
UrDataTable.prototype=new UrWidget();
UrDataTable.prototype.constructor=UrDataTable;

UrDataTable.prototype.add = function(datas){
    for(var i in datas){
        var tr = new UrCustomWidget("tr", {"parent":this.body});
        this.lines.push(tr);

        for(var j in this.description){
            var td = new UrCustomWidget("td", {"parent":tr, "html": datas[i][j]});

            if(this.description[j]["improve"] != undefined){
                var params = {"parent":td, "index": i};
                for(var k = 0; k<this.description[j]["params"].length;k++){
                    var param = this.description[j]["params"][k];
                    if(this.description[param] != undefined)
                        params[param] = datas[i][param];
                    else
                        params[param] = param;
                }

                (function(json, description){
                    var funct = description[j]["improve"];
                    funct(json);
                }(params, this.description));
            }
        }
    }
};
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getHead = function(){ return this.head; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getBody = function(){ return this.body; };
/**
 * @returns {Array<UrCustomWidget>}
 */
UrDataTable.prototype.getLines = function(){ return this.lines; }
