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
 *      @param {UrWidget}       [settings.resetWidget] UrWidget to reset UrTypeahead
 *      @param {UrWidget}       [settings.placeholder] UrWidget Placeholder of UrTypeahead
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      new UrTypeahead({
 *          "parent":body,
 *          "data":[{"id":1,"lib":"Test"}]
 *      });
 * @constructor
 */
var UrTypeahead=function(settings){
    /**
     * @property dataId
     * @type Array<String>
     * @description Ids of data
     */
    this.dataId;
    /**
     * @property dataLib
     * @type Array<String>
     * @description Libs of data
     */
    this.dataLib;
    /**
     * @property currentDataId
     * @type Array<String>
     * @description Current searched ids of data
     */
    this.currentDataId;
    /**
     * @property currentDataLib
     * @type Array<String>
     * @description Current searched libs of data
     */
    this.currentDataLib;
    /**
     * @property content
     * @type UrWidget
     * @description Content of UrTypeahead
     */
    this.content;
    /**
     * @property valueWidget
     * @type UrWidget
     * @description Value widget of UrTypeahead
     */
    this.valueWidget;
    /**
     * @property resetWidget
     * @type UrWidget
     * @description Reset widget of UrTypeahead
     */
    this.resetWidget;
    /**
     * @property placeholder
     * @type UrWidget
     * @description Placeholder of UrTypeahead
     */
    this.placeholder;
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
                "border":"1px solid #c9c9c9",
                "border-bottom":"2px solid #eee",
                "height":"20px",
                "padding":"5px 0 0 0",
                "overflow-y":"hidden",
                "font-size":"16px"
            };

        UrWidget.call(this, settings, "UrTypeahead");

        this.setPlaceholder(settings.placeholder);
        this.setContent(settings.resetWidget);
        this.setResetWidget(settings.resetWidget);
        this.setData(settings.data);
        this.setList(this.dataId,this.dataLib);
        this.setListStyle(settings.styleList);
        this.setCallbackClick(settings.callbackClick);
        this.setCallbackEnter(settings.callbackEnter);
    }
};
UrTypeahead.prototype=new UrWidget();
UrTypeahead.prototype.constructor=UrTypeahead;
/**
 * Set content of UrTypeahead
 * @method setContent
 * @for UrTypeahead
 * @param {Object|UrStyle} style
 * @param {UrWidget} resetWidget
 */
UrTypeahead.prototype.setContent=function(resetWidget){
    var that = this;

    this.content        = new UrWidget({"parent":this,"style":{"display":"none"}});

    this.valueWidget    = new UrWidget({
        "parent":this.content,
        "style":{
            "width":"95%",
            "styleFloat":"left",
            "cssFloat":"left"
        }
    });
    this.valueWidget.getElement().contentEditable = true;

    this.valueWidget.focus(function(){
        that.focused = true;
        that.content.getStyle().set("display","block");
        that.placeholder.getStyle().set("display","none");
        that.list.getStyle().set("display","block");
    });
    this.valueWidget.blur(function(){
        that.focused = false;

        setTimeout(function(){
            if(that.valueWidget.getHtml() == ""){
                that.content.getStyle().set("display","none");
                that.placeholder.getStyle().set("display","block");
            }

            that.list.getStyle().set("display","none");
        },200);
    });

    this.valueWidget.keyDown(function(e){
        var evt = e || window.event;
        if(evt.keyCode == 13) {
            evt.preventDefault();

            var text  = that.list.getElement().textContent || that.list.getElement().innerText;
            if(that.currentDataLib.length == 1 && text == that.currentDataLib[0])
                that.callbackEnter({"id":that.currentDataId[0],"lib":that.currentDataLib[0]});
            else
                that.callbackEnter({"id":undefined,"lib":that.content.getHtml()});
        }
        if (evt.keyCode == 27 && that.focused == true)
            that.content.getElement().blur();
    });
    this.valueWidget.keyUp(function(e){
        var evt = e || window.event;
        if(evt.keyCode == 13)
            evt.preventDefault();
        else{
            that.list.getStyle().set("display","block");
            that.search();
        }
    });

    this.setResetWidget(resetWidget);
};
/**
 * Set placeholder of UrTypeahead
 * @method setPlaceholder
 * @for UrTypeahead
 * @param {String} placeholder
 */
UrTypeahead.prototype.setPlaceholder=function(placeholder){
    var that = this;

    this.placeholder = placeholder;

    if(this.placeholder == undefined)
        this.placeholder = new UrWidget({
            "html":"Click here",
            "style":{
                "background":"white",
                "height":"20px",
                "padding":"0 0 0 15px",
                "overflow-y":"hidden",
                "font-size":"11px",
                "color": "gray",
                "font-style": "italic",
                "text-align":"left"
            }
        });

    this.addChild(this.placeholder);

    this.placeholder.click(function(){
        that.placeholder.getStyle().set("display","none");
        that.content.getStyle().set("display","block");
        that.valueWidget.getElement().focus();
    });
};
/**
 * Set UrWidget reset of UrTypeahead
 * @method setResetWidget
 * @for UrTypeahead
 * @param {UrWidget} resetWidget
 */
UrTypeahead.prototype.setResetWidget=function(resetWidget){
    var that = this;

    if(this.resetWidget != undefined)
        this.resetWidget.remove();

    this.resetWidget = resetWidget;

    if(this.resetWidget == undefined)
        this.resetWidget = new UrWidget({
            "parent":this.content,
            "html":"x",
            "style":{
                "width":"3%",
                "font-weight":"bold",
                "cursor":"pointer",
                "text-align":"right",
                "styleFloat":"left",
                "cssFloat":"left"
            }
        });
    else
        this.content.addChild(resetWidget);

    this.addChild(new UrWidget({"parent":this,"style":{"clear":"both"}}));

    this.resetWidget.click(function(){
        that.reset();
    });
};
/**
 * Set datas of UrTypeahead
 * @method setData
 * @for UrTypeahead
 * @param {Array<Object>} data
 */
UrTypeahead.prototype.setData=function(data){
    this.dataId     = [];
    this.dataLib    = [];

    if(data != undefined){
        for(var i=0;i<data.length;i++){
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

    this.currentDataId = dataId;
    this.currentDataLib = dataLib;

    if(this.list==undefined)
        this.list=new UrWidget({
            "parent":this.parent
        });
    else
        this.list.removeAllChildren();

    for(var i=0;i<dataLib.length;i++){
        (function(index){
            var element = new UrWidget({
                "parent":_this.list,
                "html":dataLib[i]
            });

            element.click(function(){
                _this.valueWidget.setHtml(dataLib[index]);
                _this.callbackClick({"id":dataId[index],"lib":dataLib[index]});
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
            "cursor":"pointer",
            "padding":"0 0 0 15px"
        };

    this.list.setStyle(style);
    this.list.getStyle().set("width",this.getElement().offsetWidth+"px");
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
    if(this.valueWidget.getHtml()=="")
        this.setList(this.dataId,this.dataLib);
    else{
        var dataId = [];
        var dataLib = [];

        var text = this.valueWidget.getElement().textContent ||this.valueWidget.getElement().innerText;
        var search = new RegExp(text.replace(/^\s+|\s+$/g, ''),"i");

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
/**
 * Reset content of UrTypeahead
 * @method reset
 * @for UrTypeahead
 * @param {Boolean} focus
 */
UrTypeahead.prototype.reset=function(focus){
    this.valueWidget.setHtml("");

    if(focus == true)
        this.valueWidget.getElement().focus();
    else{
        this.placeholder.getStyle().set("display","block");
        this.content.getStyle().set("display","none");
    }

    this.search();
};
/**
 * Get current data of UrTypeahead
 * @method getCurrentData
 * @for UrTypeahead
 */
UrTypeahead.prototype.getCurrentData=function(){
    var current = [];
    for(var i=0;i<this.currentDataId.length;i++)
        current.push({"id":this.currentDataId[i],"lib":this.currentDataLib[i]});

    return current;
};
/**
 * Get current data of UrTypeahead
 * @method getCurrent
 * @for UrTypeahead
 */
UrTypeahead.prototype.getCurrent=function(){
    if(this.currentDataLib.length == 1 && this.list.getElement().innerText == this.currentDataLib[0])
        return {"id":this.currentDataId[0],"lib":this.currentDataLib[0]};
    else{
        var result = undefined;
        var find = false;
        var i = 0;
        while(find == false && i < this.currentDataId.length){
            if(this.valueWidget.getElement().innerText == this.currentDataLib[i]){
                result =  {"id":this.currentDataId[i],"lib":this.currentDataLib[i]};
                find = true;
            }
            i++;
        }
        return result;
    }
};
/**
 * Get current value of UrTypeahead
 * @method getValue
 * @for UrTypeahead
 */
UrTypeahead.prototype.getValue=function(){
    var text = this.valueWidget.getElement().textContent || this.valueWidget.getElement().innerText;
    return text.replace(/^\s+|\s+$/g, '');
};
/**
 * Get placeholder widget of UrTypeahead
 * @method getPlaceholder
 * @for UrTypeahead
 */
UrTypeahead.prototype.getPlaceholder=function(){
    return this.placeholder;
};
/**
 * Set current value for UrTypeahead
 * @method setCurrent
 * @for UrTypeahead
 * @param {String} text
 */
UrTypeahead.prototype.setCurrent=function(text){
    var that = this;
    if(this.placeholder != undefined)
        that.placeholder.getStyle().set("display","none");
    this.content.getStyle().set("display","block");
    this.valueWidget.setHtml(text);
};
