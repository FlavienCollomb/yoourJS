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
 *      @param {String}         [settings.kind] Kind of UrNotification (default, info, success, warn, error)
 *      @param {Number}         [settings.time] UrNotification display time
 *      @param {UrWidget}       [settings.closeWidget] UrWidget for close UrNotification (for example UrImage).
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var notification = new UrNotification({
 *          "parent":body,
 *          "title":new UrWidget({"html":"Title example"}),
 *          "text":new UrWidget({"html":"Text example"}),
 *          "closeWidget":new UrImage({"src":"your-link/your-image.png","style":{"float":"right","width":"25px","height":"25px"}})
 *       });
 * @constructor
 */
var UrNotification=function(settings){
    /**
     * @property kind
     * @type String
     * @description Kind of UrNotification
     */
    this.kind;
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
    this.hoverState;

    if(settings != undefined){
        /**
         * @property _this
         * @type {UrNotification}
         * @private
         */
        var _this = this;

        var json = new UrJson(settings);
        json.checkType({"title":[UrWidget],"text":[UrWidget],"kind":["string"],"time":["number"],"closeWidget":[UrWidget]});

        if(settings.style == undefined)
            settings.style = {
                "float"     :"right",
                "margin"    :"15px",
                "border"    :"2px solid white"
            };
        UrWidget.call(this, settings, "UrNotification");

        this.hoverState = false;

        this.setKind(settings.kind);
        this.setTime(settings.time);
        this.header = new UrWidget({"parent":this});
        this.setCloseWidget(settings.close);
        this.setTitle(settings.title);
        this.setText(settings.text);

        this.mouseIn(function(){ _this.hover = true; });
        this.mouseLeave(function(){
            _this.hover = false;
            _this.remove();
        });

        setTimeout(function(){
            try{
                if(_this.hoverState == false)
                    _this.remove();
            }catch(e){}
        },_this.time);
    }
};
UrNotification.prototype=new UrWidget();
UrNotification.prototype.constructor=UrNotification;
/**
 * Set UrNotification type : modify its background
 * @method setType
 * @for UrNotification
 * @param {String} kind
 */
UrNotification.prototype.setKind=function(kind){
    this.kind = kind || "info";
    if(this.kind == "default")
        this.getStyle().set("background","#fcf8e3");
    if(this.kind == "info")
        this.getStyle().set("background","lightblue");
    if(this.kind == "success")
        this.getStyle().set("background","#dff0d8");
    if(this.kind == "warn")
        this.getStyle().set("background","#ebb275");
    if(this.kind == "error")
        this.getStyle().set("background","#f2dede");
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