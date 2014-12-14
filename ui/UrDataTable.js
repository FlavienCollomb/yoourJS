/**
 * The UrDataTable object create a table of result thanks a description JSON of correspondence.
 * @class UrDataTable
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {string}         [settings.name] UrDataTable name
 *      @param {UrWidget}       [settings.parent] UrDataTable's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrDataTable
 *      @param {string}         [settings.className] HTML attribute "class" of UrDataTable
 *      @param {Object|UrStyle} [settings.style] Style of UrDataTable
 *      @param {Array}          settings.datas Datas for display in UrDataTable
 *      @param {Object}         settings.description Description object used to create UrDataTable
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var result = new UrDataTable({
 *          "parent": body,
 *          "className": "table",
 *          "description": {
 *              "key1": {"title": "Key 1"},
 *              "key2": {
 *                  "title": "Key 2",
 *                  "improve": function (json) {
 *                      var html = json["parent"].getHtml();
 *                      json["parent"].setHtml("");
 *                      new UrWidget({"parent": json["parent"], "html": html + " " + json["index"]})
 *                  },
 *                  "params": ["key1", "key2", "test"]
 *              }
 *          },
 *          "datas": [{"key1": "Test 1.1", "key2": "Test 1.2"}, {"key1": "Test 2.1", "key2": "Test 2.2"}]
 *      });
 * @constructor
 */
var UrDataTable = function(settings){
    /**
     * @property head
     * @type UrCustomWidget
     * @description Thead of the HTML table of UrDataTable
     */
    this.head;
    /**
     * @property body
     * @type UrCustomWidget
     * @description Tbody of the HTML table of the UrDataTable
     */
    this.body;
    /**
     * @property lines
     * @type Array
     * @description Array of each Tr of the HTML table of UrDataTable
     */
    this.lines;
    /**
     * @property description
     * @type Object
     * @description Array Description object used to create UrDataTable
     */
    this.description;

    if(settings != undefined){
        /**
         * @property that
         * @type UrDataTable
         * @private
         */
        var that = this;
        /**
         * Set the Thead of the HTML table of UrDataTable
         * @method head
         * @for UrDataTable
         * @private
         */
        head=function(){
            that.head = new UrCustomWidget("thead", {"parent":that});
            var tr = new UrCustomWidget("tr", {"parent":that.head});
            for(var i in that.description)
                if(that.description[i]["hide"] == undefined){
                    var th = new UrCustomWidget("th", {"parent":tr,"html":that.description[i]["title"]});
                }
        };

        var json = new UrJson(settings);
        json.checkType({"datas":[Array],"description":[Object]});

        this.lines = [];
        this.description = settings.description;

        if(settings.datas != undefined && settings.datas instanceof Array && settings.datas.length > 0){
            settings.element = document.createElement("table");
            UrWidget.call(this, settings, "UrDataTable");
            head();
            this.body = new UrCustomWidget("tbody", {"parent":this});
            this.add(settings.datas);
        }
    };
};
UrDataTable.prototype=new UrWidget();
UrDataTable.prototype.constructor=UrDataTable;
/**
 * Add one or several lines in UrDataTable
 * @method add
 * @for UrDataTable
 * @param {Array} datas
 */
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
 * Get Thead of the HTML table of UrDataTable
 * @method getHead
 * @for UrDataTable
 * @return {UrCustomWidget}
 */
UrDataTable.prototype.getHead = function(){ return this.head; };
/**
 * Get TBody of the HTML table of UrDataTable
 * @method getBody
 * @for UrDataTable
 * @return {UrCustomWidget}
 */
UrDataTable.prototype.getBody = function(){ return this.body; };
/**
 * Get Tr of the HTML table of UrDataTable
 * @method getLines
 * @for UrDataTable
 * @return {Array}
 */
UrDataTable.prototype.getLines = function(){ return this.lines; };
