/**
 * The UrTag object create a tag (text with close element).
 * @class UrTag
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTag name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTag main window widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrTag main window widget
 *      @param {Object|UrStyle} [settings.style] Style of UrTag main window widget
 *      @param {String}         [settings.html] HTML content of UrTag
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrTag (for example UrImage with cross).
 *      @param {Function}       [settings.next] Function called when close is clicked
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
        this.setCloseWidget(settings.closeWidget,settings.next);
    }
};
UrTag.prototype=new UrWidget();
UrTag.prototype.constructor=UrTag;
/**
 * Set UrWidget close of UrTag
 * @method setCloseWidget
 * @for UrTag
 * @param {UrWidget} closeWidget
 * @param {Function} next
 */
UrTag.prototype.setCloseWidget=function(closeWidget,next){
    var that = this;

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
    else
        this.addChild(closeWidget);

    this.addChild(new UrWidget({"parent":this,"style":{"clear":"both"}}));

    this.closeWidget.click(function(){
        that.remove();
        that.exist = false;

        if(next!=undefined)
            next();
    });
};
