/**
 * The UrTag object create a tag (text with close element).
 * @class UrTag
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrPopup name
 *      @param {String}         [settings.id] HTML attribute "id" of UrPopup main window widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrPopup main window widget
 *      @param {Object|UrStyle} [settings.style] Style of UrPopup main window widget
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrPopup (for example UrImage with cross).
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      new UrTag({
 *          "parent":body,
 *          "html":text,
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"5px","height":"5px"}})
 *      });
 * @constructor
 */
var UrTag=function(settings){
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close
     */
    this.closeWidget;
    /**
     * @property exist
     * @type Boolean
     * @description UrTag exists?
     */
    this.exist;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"closeWidget":[UrDom]});

        this.exist = true;

        if(settings.style == undefined)
            settings.style = {
                "border":"1px solid gray",
                "background":"white",
                "float":"left"
            };
        UrWidget.call(this, settings, "UrTag");
        this.setCloseWidget(settings.closeWidget);
    }
};
UrTag.prototype=new UrWidget();
UrTag.prototype.constructor=UrTag;
/**
 * Set UrWidget close of UrTag
 * @method setCloseWidget
 * @for UrTag
 * @param {UrWidget} closeWidget
 */
UrTag.prototype.setCloseWidget=function(closeWidget){
    var that = this;

    if(this.closeWidgetContainer != undefined)
        this.closeWidgetContainer.remove();

    this.closeWidget = closeWidget;

    if(this.closeWidget == undefined)
        this.closeWidget = new UrWidget({
            "parent":this,
            "html":"x",
            "style":{
                "float":"right",
                "font-weight":"bold",
                "cursor":"pointer",
                "margin":"-5px 2px 0 5px"
            }
        });
    this.addChild(new UrWidget({"parent":this,"style":{"clear":"both"}}));

    this.closeWidget.click(function(){
        that.remove();
        that.exist = false;
    });
};