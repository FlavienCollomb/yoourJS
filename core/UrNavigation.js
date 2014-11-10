/**
 * The UrNavigation object let you manage your website navigation thanks JavaScript. Must be created once!
 * @class UrNavigation
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {Function} settings.defaultAction Function called when anchor in URL is not managed
 *      @param {string} [settings.name] UrNavigation name
 * @constructor
 * @example
 *      var navigation = new UrNavigation({
 *          "defaultAction":function(){
 *              console.log("Default action!");
 *          }
 *      });
 *      navigation.add({
 *          "anchor":"#link1",
 *          "action":function(){
 *              console.log("Action called on anchor #link1!");
 *          }
 *      });
 *      navigation.load();
 */
var UrNavigation=function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this,"UrNavigation",settings.name);
    /**
     * @property anchor
     * @description This property store anchors and associated callback
     * @type Object
     */
    this.anchor = {};
    /**
     * @property defaultAction
     * @description This property store functions called when anchor in URL is not in anchor property
     * @type Function
     */
    this.defaultAction;

    this.setDefaultAction(settings.defaultAction);
    this.current = window.location.hash;
    /**
     * @property _that
     * @type {UrNavigation}
     * @private
     */
    var _that = this;
    if(("onhashchange" in window))
        window.onhashchange = function(){
            _that.load.call(_that);
        }
};
UrNavigation.prototype=new UrObject();
UrNavigation.prototype.constructor=UrNavigation;
/**
 * Set default action
 * @method setDefaultAction
 * @for UrNavigation
 * @param {Function} defaultAction
 */
UrNavigation.prototype.setDefaultAction=function(defaultAction){
    this.defaultAction = defaultAction;
    if(this.defaultAction == undefined)
        this.defaultAction = function(){};
};
/**
 * Add anchor and associated action
 * @method add
 * @for UrNavigation
 * @param {Object} settings
 *      @param {String} settings.anchor
 *      @param {Function} settings.action
 */
UrNavigation.prototype.add=function(settings){
    if(settings == undefined) settings = {};
    if(settings.anchor != undefined)
        this.anchor[settings.anchor] = settings.action;
};
/**
 * Launch JavaScript navigation management
 * @method load
 * @for UrNavigation
 */
UrNavigation.prototype.load=function(){
    this.current = window.location.hash;

    if(this.anchor[this.current] != undefined)
        this.anchor[this.current](this.current);
    else
        this.defaultAction();
};
/**
 * Get current anchor in URL
 * @method getCurrent
 * @for UrNavigation
 * @return {String}
 */
UrNavigation.prototype.getCurrent=function(){
    return this.current;
};
