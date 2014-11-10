/**
 * The UrNavigation object let you manage your website navigation thanks JavaScript
 * @param {Object} settings
 *      @param {Function} settings.defaultAction
 *      @param {string} [settings.name]
 */
var UrNavigation=function(settings){
    UrObject.call(this,"UrNavigation",settings.name);

    this.anchor = {};
    /** @type {Function} */ this.defaultAction;

    this.setDefaultAction(settings.defaultAction);
    this.current = window.location.hash;

    var _that = this;
    if(("onhashchange" in window))
        window.onhashchange = function(){
            _that.load.call(_that);
        }
};
UrNavigation.prototype=new UrObject();
UrNavigation.prototype.constructor=UrNavigation;
/**
 * @param {Function} defaultAction
 */
UrNavigation.prototype.setDefaultAction=function(defaultAction){
    this.defaultAction = defaultAction;
    if(this.defaultAction == undefined)
        this.defaultAction = function(){};
};
/**
 * @param {Object} settings
 *      @param {string} settings.anchor
 *      @param {Function} settings.action
 */
UrNavigation.prototype.add=function(settings){
    if(settings == undefined) settings = {};
    if(settings.anchor != undefined)
        this.anchor[settings.anchor] = settings.action;
};
UrNavigation.prototype.load=function(){
    this.current = window.location.hash;

    if(this.anchor[this.current] != undefined)
        this.anchor[this.current](this.current);
    else
        this.defaultAction();
};
/**
 * @returns {string}
 */
UrNavigation.prototype.getCurrent=function(){
    return this.current;
};
