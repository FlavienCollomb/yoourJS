/**
 * The UrPopup object create a popup.
 * @class UrPopup
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrPopup name
 *      @param {String}         [settings.id] HTML attribute "id" of UrPopup main window widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrPopup main window widget
 *      @param {Object|UrStyle} [settings.style] Style of UrPopup main window widget
 *      @param {UrWidget}       [settings.content] UrWidget content for UrPopup
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrPopup (for example UrImage with cross).
 *      @param {boolean}        [settings.modal] UrPopup is modal ? (If true, must be close programmaticaly by developer)
 * @example
 *      var popup = new UrPopup({
 *          "modal":false,
 *          "content":new UrWidget({"html":"Example of content"}),
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 *       $(popup.getBg().getElement()).animate({"opacity":0.7},10);
 * @constructor
 */
var UrPopup=function(settings){
    /**
     * @property bg
     * @type UrWidget
     * @description UrWidget which creates fade background
     */
    this.bg;
    /**
     * @property closeWidgetContainer
     * @type UrWidget
     * @description Parent of UrWidget close
     */
    this.closeWidgetContainer;
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close
     */
    this.closeWidget;
    /**
     * @property content
     * @type UrWidget
     * @description UrWidget content of UrPopup
     */
    this.content;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"content":[UrWidget],"closeWidget":[UrDom],"modal":["boolean"]});

        if(settings.style == undefined)
            settings.style = {
                "position":"absolute",
                "left":"50%",
                "top":"150px",
                "background":"white",
                "width":"600px",
                "margin-left":"-300px"
            };

        var body = document.getElementsByTagName("body")[0];
        this.body = new UrWidget({"element": body});
        settings.parent = this.body;

        this.setBg();
        UrWidget.call(this, settings, "UrPopup");
        this.setCloseWidget(settings.closeWidget);
        this.setModal(settings.modal);
        this.setContent(settings.content);
    }
};
UrPopup.prototype=new UrWidget();
UrPopup.prototype.constructor=UrPopup;
/**
 * Creates fade background
 * @method setBg
 * @for UrPopup
 */
UrPopup.prototype.setBg=function(){
    if(this.bg!=undefined)
        this.bg.remove();

    this.bg=new UrWidget({
        "parent":this.body,
        "style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}
    });
};
/**
 * Get fade background
 * @method getBg
 * @for UrPopup
 * @return {UrWidget}
 */
UrPopup.prototype.getBg=function(){ return this.bg; };
/**
 * Set UrWidget close of UrPopup
 * @method setCloseWidget
 * @for UrPopup
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
 * Set if UrPopup is modal
 * @method setModal
 * @for UrPopup
 * @param {Boolean} modal
 */
UrPopup.prototype.setModal=function(modal){
    var that = this;

    if(modal == true){
        if(this.closeWidget != undefined)
            this.closeWidget.remove();
        if(this.bg != undefined)
            this.bg.click(function(){});
    }
    else{
        if(this.bg != undefined){
            this.bg.click(function(){
                that.bg.remove();
                that.remove();
            });
        }
    }
};
/**
 * Set UrWidget content of UrPopup
 * @method setContent
 * @for UrPopup
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
/**
 * Close (and remove) UrPopup
 * @method close
 * @for UrPopup
 */
UrPopup.prototype.close=function(){
    this.bg.remove();
    this.remove();
};