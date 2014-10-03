/**
 * The UrPopup object create a popup.
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {UrWidget}       [settings.closeWidget]
 *      @param {boolean}        [settings.modal]
 * @constructor
 */
var UrPopup=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {
            "position":"absolute",
            "left":"50%",
            "top":"150px",
            "background":"white",
            "width":"600px",
            "margin-left":"-300px"
        };

//    settings.style["z-index"]=11;

    var body = document.getElementsByTagName("body")[0];
    this.body = new UrWidget({"element": body});
    settings.parent = this.body;

    /** @type UrWidget */ this.bg;
    /** @type UrWidget */ this.closeWidgetContainer;
    /** @type UrWidget */ this.closeWidget;
    /** @type UrWidget */ this.content;

    this.setBg();
    UrWidget.call(this, settings, "UrPopup");
    this.setCloseWidget(settings.closeWidget);
    this.setModal(settings.modal);
    this.setContent(settings.content);
};
UrPopup.prototype=new UrWidget();
UrPopup.prototype.constructor=UrPopup;

UrPopup.prototype.setBg=function(){
    this.bg=new UrWidget({
        "parent":this.body,
        "style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}
    });
};
/**
 * @returns {UrWidget}
 */
UrPopup.prototype.getBg=function(){ return this.bg; };
/**
 * @param {UrWidget} closeWidget
 */
UrPopup.prototype.setCloseWidget=function(closeWidget){
    var that = this;

    if(this.closeWidgetContainer != undefined)
        this.closeWidgetContainer.remove();

    this.closeWidget = closeWidget;
    if(this.closeWidget != undefined){
        this.closeWidgetContainer = new UrWidget({"parent":this});
        this.closeWidgetContainer.addChild(this.closeWidget);
        this.closeWidgetContainer.addChild(new UrWidget({"parent":this.closeWidgetContainer,"style":{"clear":"both"}}));

        this.closeWidget.click(function(){
            that.bg.remove();
            that.remove();
        });
    }
};
/**
 * @param {boolean} modal
 */
UrPopup.prototype.setModal=function(modal){
    var that = this;

    if(modal == true){
        if(this.closeWidget != undefined)
            this.closeWidget.remove();
        this.bg.click(function(){});
    }
    else
        this.bg.click(function(){
            that.bg.remove();
            that.remove();
        });
};
/**
 * @param {UrWidget} content
 */
UrPopup.prototype.setContent=function(content){
    if(this.content != undefined)
        this.content.remove();

    this.content = content;
    if(this.content != undefined){
        this.addChild(this.content);
    }
};
UrPopup.prototype.close=function(){
    this.bg.remove();
    this.remove();
};