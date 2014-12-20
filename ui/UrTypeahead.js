/**
 * The UrTypeahead object create a typeahead
 * @class UrTypeahead
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTypeahead name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTypeahead
 *      @param {String}         [settings.className] HTML attribute "class" of UrTypeahead
 *      @param {Object|UrStyle} [settings.style] Style of UrTypeahead
 *      @param {Array}          settings.data Data of UrTypeahead  Must be like [{"id":0,"lib":"Line 1"},{"id":1,"lib":"Line 2"}]
 *      @param {Array}          settings.callbackEnter Callback called when "enter" is pressed on keyboard
 *      @param {Array}          settings.callbackClick Callback called when user click on list element
 *      @param {Object|UrStyle} [settings.styleList] Style of UrTypeahead list
 * @example

 * @constructor
 */
var UrTypeahead=function(settings){
    /**
     * @property data
     * @type {Object}
     * @description Data of UrTypeahead.
     */
    this.data;
    /**
     * @property dataLib
     * @type Array<String>
     * @description Libs of data
     */
    this.dataLib;
    /**
     * @property list
     * @type UrWidget
     * @description Data of UrTypeahead
     */
    this.list;
    /**
     * @property callbackClick
     * @type Function
     * @description Function called when an element was clicked in list
     */
    this.callbackClick;
    /**
     * @property callbackEnter
     * @type Function
     * @description Function called when "enter" was pressed on keyboard
     */
    this.callbackEnter;
    /**
     * @property focused
     * @type boolean
     * @description UrTypeahead has the focus ?
     */
    this.focused;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"data":[Array],"callbackEnter":[Function],"callbackClick":[Function],"styleList":[Object,UrStyle]});

        var _this = this;
        this.focused = false;

        if(settings.style == undefined)
            settings.style = {
                "background":"white",
                "border-bottom":"1px solid black",
                "height":"25px"
            };

        UrWidget.call(this, settings, "UrTypeahead");

        this.setData(settings.data);
        this.setList(this.dataId,this.dataLib);
        this.setListStyle(settings.styleList);
        this.setCallbackClick(settings.callbackClick);
        this.setCallbackEnter(settings.callbackEnter);

        this.element.contentEditable = true;
        this.focus(function(){
            _this.focused = true;
            _this.list.getStyle().set("display","block");
        });
        this.keyDown(function(e){
            if(e.keyCode == 13) {
                e.preventDefault();
                _this.callbackEnter(_this.getHtml());
            }
            if (e.keyCode == 27 && _this.focused == true)
                _this.getElement().blur();
        });
        this.keyUp(function(e){
            if(e.keyCode == 13)
                e.preventDefault();
            else{
                _this.list.getStyle().set("display","block");
                _this.search();
            }
        });
        this.blur(function(){
            _this.focused = false;
            setTimeout(function(){
                _this.list.getStyle().set("display","none");
            },200);
        });
    }
};
UrTypeahead.prototype=new UrWidget();
UrTypeahead.prototype.constructor=UrTypeahead;
/**
 * Set datas of UrTypeahead
 * @method setData
 * @for UrTypeahead
 * @param {Array<Object>} data
 */
UrTypeahead.prototype.setData=function(data){
    this.data       = {};
    this.dataId     = [];
    this.dataLib    = [];

    if(data != undefined){
        for(var i=0;i<data.length;i++){
            this.data[data[i]["id"]] = data[i]["lib"];
            this.dataId.push(data[i]["id"]);
            this.dataLib.push(data[i]["lib"]);
        }
    }
};
/**
 * Creates list UrWidget
 * @method setList
 * @for UrTypeahead
 * @param {Array<Number>} dataId
 * @param {Array<String>} dataLib
 */
UrTypeahead.prototype.setList=function(dataId,dataLib){
    var _this = this;

    if(this.list==undefined)
        this.list=new UrWidget({
            "parent":this.parent
        });
    else
        this.list.setHtml("");

    for(var i=0;i<dataLib.length;i++){
        (function(index){
            var element = new UrWidget({
                "parent":_this.list,
                "html":dataLib[i]
            });

            element.click(function(){
                _this.setHtml(dataLib[index]);
                _this.callbackClick(dataId[index],dataLib[index]);
                _this.search(dataLib[index]);
            });
        }(i));
    }
};
/**
 * Set style of list UrWidget
 * @method setListStyle
 * @for UrTypeahead
 * @param {Object|UrStyle} style
 */
UrTypeahead.prototype.setListStyle=function(style){
    if(style == undefined)
        style = {
            "position":"absolute",
            "background":"white",
            "border":"1px solid #eee",
            "cursor":"pointer"
        };

    this.list.setStyle(style);
    this.list.getStyle().set("width",this.element.offsetWidth+"px");
    this.list.getStyle().set("display","none");
};
/**
 * Set function called when an element was clicked in list
 * @method setCallbackClick
 * @for UrTypeahead
 * @param {Function} foo
 */
UrTypeahead.prototype.setCallbackClick=function(foo){
    if(foo==undefined)
        this.callbackClick = function(){};
    else
        this.callbackClick = foo;
};
/**
 * Set function called when "enter" was pressed on keyboard
 * @method setCallbackEnter
 * @for UrTypeahead
 * @param {Function} foo
 */
UrTypeahead.prototype.setCallbackEnter=function(foo){
    if(foo==undefined)
        this.callbackEnter = function(){};
    else
        this.callbackEnter = foo;
};
/**
 * Search a word in data
 * @method search
 * @for UrTypeahead
 */
UrTypeahead.prototype.search=function(){
    if(this.getHtml()=="")
        this.setList(this.dataId,this.dataLib);
    else{
        var dataId = [];
        var dataLib = [];

        var search = new RegExp(this.getElement().textContent.trim(),"i");

        for(var i = 0; i < this.dataLib.length; i++){
            if(search.test(this.dataLib[i])){
                dataId.push(this.dataId[i]);
                dataLib.push(this.dataLib[i]);
            }
        }
        this.setList(dataId,dataLib);
    }
};
/**
 * Get list UrWidget
 * @method getList
 * @for UrTypeahead
 * @return {UrWidget}
 */
UrTypeahead.prototype.getList=function(){
    return this.list;
};