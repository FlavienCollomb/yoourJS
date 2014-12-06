/**
 * The UrNotification object create a popup.
 * @class UrNotification
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrNotification name
 *      @param {String}         [settings.id] HTML attribute "id" of UrNotification main widget
 *      @param {String}         [settings.className] HTML attribute "class" of UrNotification main widget
 *      @param {Object|UrStyle} [settings.style] Style of UrNotification main widget
 *      @param {UrWidget}       [settings.title] UrWidget title of UrNotification
 *      @param {UrWidget}       [settings.text] UrWidget text of UrNotification
 *      @param {String}         [settings.type] Type of UrNotification (default, info, success, warn, error)
 *      @param {Number}         [settings.time] UrNotification display time
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrNotification (for example UrImage).
 * @example
 *      var notification = new UrNotification({
 *          "title":"Title example",
 *          "text":"Text example",
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 * @constructor
 */
var UrNotification=function(settings){
    /**
     * @type {UrNotification}
     * @private
     */
    var _this = this;

    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {
            "float"     :"right",
            "margin"    :"15px",
            "border"    :"2px solid white",
            "color"     :"white"
        };
    /**
     * @property type
     * @type String
     * @description Type of UrNotification
     */
    this.type;
    /**
     * @property time
     * @type Number
     * @description UrNotification display time
     */
    this.time;
    /**
     * @property title
     * @type UrWidget
     * @description UrWidget title of UrNotification
     */
    this.title;
    /**
     * @property text
     * @type UrWidget
     * @description UrWidget text of UrNotification
     */
    this.text;
    /**
     * @property header
     * @type UrWidget
     * @description UrWidget header of UrNotification
     */
    this.header;
    /**
     * @property closeWidget
     * @type UrWidget
     * @description UrWidget close of UrNotification
     */
    this.closeWidget;
    /**
     * @property hoverState
     * @type UrWidget
     * @description Hover state of UrNotification
     */
    this.hoverState = false;

    UrWidget.call(this, settings, "UrNotification");
    this.setType(settings.type);
    this.setTime(settings.time);
    this.header = new UrWidget({"parent":this});
    this.setCloseWidget(settings.close);
    this.setTitle(settings.title);
    this.setText(settings.text);

    this.mouseIn(function(){ _this.hoverState = true; });
    this.mouseLeave(function(){
        _this.hoverState = false;
        _this.remove();
    });

    setTimeout(function(){
        try{
            if(_this.hoverState == false)
                _this.remove();
        }catch(e){}
    },_this.time);
};
UrNotification.prototype=new UrWidget();
UrNotification.prototype.constructor=UrNotification;
/**
 * Set UrNotification type : modify its background
 * @method setType
 * @for UrNotification
 * @param {String} type
 */
UrNotification.prototype.setType=function(type){
    this.type = type || "default";
    if(this.type == "default"){
        this.getStyle().set("background","#eaeaea");
        this.getStyle().set("color","black");
    }
    if(this.type == "info")
        this.getStyle().set("background","#50b6d4");
    if(this.type == "success")
        this.getStyle().set("background","#55ab55");
    if(this.type == "warn")
        this.getStyle().set("background","#fbaf44");
    if(this.type == "error")
        this.getStyle().set("background","#ca403a");
    if(this.type == "inverse")
        this.getStyle().set("background","#3c3c3c");
};
/**
 * Set UrNotification time display
 * @method setTime
 * @for UrNotification
 * @param {Number} time
 */
UrNotification.prototype.setTime=function(time){
    this.time = time || 3000;
};
/**
 * Set UrWidget title of UrNotification
 * @method setTitle
 * @for UrNotification
 * @param {UrWidget} title
 */
UrNotification.prototype.setTitle=function(title){
    if(this.title != undefined)
        this.title.remove();

    this.title = title;
    if(this.title != undefined){
        this.addChild(this.title);
    }
};
/**
 * Set UrWidget text of UrNotification
 * @method setText
 * @for UrNotification
 * @param {UrWidget} text
 */
UrNotification.prototype.setText=function(text){
    if(this.text != undefined)
        this.text.remove();

    this.text = text;
    if(this.text != undefined){
        this.addChild(this.text);
    }
};
/**
 * Set UrWidget close of UrNotification
 * @method setCloseWidget
 * @for UrNotification
 * @param {UrWidget} close
 */
UrNotification.prototype.setCloseWidget=function(closeWidget){
    var _this = this;

    if(this.closeWidget != undefined)
        this.closeWidget.remove();

    this.closeWidget = closeWidget;
    if(this.closeWidget == undefined)
        this.closeWidget = new UrWidget({
            "html":"x",
            "style":{
                "margin":"0 5px 0 5px",
                "float":'right',
                "font-weight":"bold",
                "cursor":"pointer"
            }
        });

    this.closeWidget.click(function(){
        _this.remove();
    });
    this.addChild(this.closeWidget);
};