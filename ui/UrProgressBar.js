/**
 * The UrProgressBar object create a progress bar. Default : progress bar like Youtube
 * @class UrProgressBar
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrProgressBar name
 *      @param {UrWidget}       [settings.parent] UrProgressBar's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {String}         [settings.id] HTML attribute "id" of UrProgressBar
 *      @param {String}         [settings.className] HTML attribute "class" of UrProgressBar
 *      @param {Object|UrStyle} [settings.style] Style of UrProgressBar
 *      @param {Number}         [settings.speed] Speed of progress animation
 * @example
 *      var progress = new UrProgressBar({
 *          "parent":body,
 *          "speed" : 100
 *       });
 *       progress.done();
 * @constructor
 */
var UrProgressBar=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};
    /**
     * @property width
     * @type Number
     * @description Current width of UrProgressBar
     */
    this.width = 0;
    /**
     * @property currentVal
     * @type String
     * @description Current value of UrProgressBar
     */
    this.currentVal = 0;
    /**
     * @property interval
     * @type Number
     * @description Interval use for animation
     */
    this.interval;
    /**
     * @property interval
     * @type Number
     * @description Speed of progress animation
     */
    this.speed;

    UrWidget.call(this, settings, "UrProgressBar");

    this.setSpeed(settings.speed);
};
UrProgressBar.prototype=new UrWidget();
UrProgressBar.prototype.constructor=UrProgressBar;
/**
 * Set speed of progress animation
 * @method setSpeed
 * @for UrProgressBar
 * @param {Number} speed New speed
 */
UrProgressBar.prototype.setSpeed = function(speed){
    this.speed = speed;
    if(this.speed == undefined) this.speed = 400;
};
/**
 * Reduce UrProgressBar width with animation
 * @method less
 * @for UrProgressBar
 * @param {Number} val New value
 * @param {Function} callback Function called when animation is over
 */
UrProgressBar.prototype.less = function(val, callback){
    if(this.interval != undefined){
        clearInterval(this.interval);
        this.set(this.currentVal);
    }

    this.currentVal = this.width - val;
    var time = this.speed / val;
    var that = this;

    this.interval = setInterval(function(){
        that.width -= 1;

        that.getStyle().set("width",that.width + "%");
        if(that.width == that.currentVal){
            clearInterval(that.interval);
            that.interval = undefined;
            if(callback!=undefined) callback();
        }
    },time);
};
/**
 * Increase UrProgressBar width with animation
 * @method more
 * @for UrProgressBar
 * @param {Number} val New value
 * @param {Function} callback Function called when animation is over
 */
UrProgressBar.prototype.more = function(val, callback){
    if(this.interval != undefined){
        clearInterval(this.interval);
        this.set(this.currentVal);
    }

    this.currentVal = this.width + val;
    var time = this.speed / val;
    var that = this;

    this.interval = setInterval(function(){
        that.width += 1;
        that.getStyle().set("width",that.width + "%");
        if(that.width == that.currentVal || that.width == 100){
            clearInterval(that.interval);
            that.interval = undefined;
            if(callback!=undefined) callback();
        }
    },time);
};
/**
 * Set UrProgressBar width without animation
 * @method set
 * @for UrProgressBar
 * @param {Number} val New value
 */
UrProgressBar.prototype.set = function(val){
    this.currentVal = this.width = val;
    this.getStyle().set("width",this.width + "%");
};
/**
 * Set UrProgressBar width to 100% with animation and remove it
 * @method done
 * @for UrProgressBar
 * @param {Function} callback Function called when animation is over
 */
UrProgressBar.prototype.done = function(callback){
    var val = 100 - this.width;
    var that = this;

    this.more(val,function(){
        that.remove();
        if(callback != undefined) callback();
    });
};