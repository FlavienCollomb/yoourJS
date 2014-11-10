/**
 * The UrProgressBar object create a progress bar. Default : progress bar like Youtube
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {number} [settings.speed]
 * @constructor
 */
var UrProgressBar=function(settings){
    if(settings == undefined) settings = {};
    if(settings.style == undefined)
        settings.style = {"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};

    /** @type {number} */ this.width = this.currentVal = 0;
    /** @type {Object} */ this.interval;

    /**@type string*/this.speed;

    UrWidget.call(this, settings, "UrProgressBar");

    this.setSpeed(settings.speed);
};
UrProgressBar.prototype=new UrWidget();
UrProgressBar.prototype.constructor=UrProgressBar;
/**
 * @param {number} speed
 */
UrProgressBar.prototype.setSpeed = function(speed){
    this.speed = speed;
    if(this.speed == undefined) this.speed = 400;
};
/**
 * @param {number} val
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
 * @param {number} val
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
UrProgressBar.prototype.set = function(val){
    this.currentVal = this.width = val;
    this.getStyle().set("width",this.width + "%");
};
UrProgressBar.prototype.done = function(callback){
    var val = 100 - this.width;
    var that = this;

    this.more(val,function(){
        that.remove();
        if(callback != undefined) callback();
    });
};