/**
 * The UrSession object provides an interface for server-side SESSION
 * @param {Object} settings
 *      @param {string} settings.stopKeyword
 *      @param {Object} settings.endCallback
 *      @param {Object} settings.session
 *      @param {string} [settings.name]
 */
var UrSession=function(settings){
    UrObject.call(this, "UrSession", name);
    /** @type {string} */ this.endKeyword;
    /** @type {Function} */ this.endCallback;
    /** @type {Object} */ this.session = {};
    this.set(settings.session);
    this.setEndKeyword(settings.endKeyword);
    this.setEndCallback(settings.endCallback);
};
UrSession.prototype=new UrObject();
UrSession.prototype.constructor=UrSession;
/**
 * @param {string} endKeyword
 */
UrSession.prototype.setEndKeyword=function(endKeyword){
    this.endKeyword=endKeyword;
};
/**
 * @param {Function} endCallback
 */
UrSession.prototype.setEndCallback=function(endCallback){
    this.endCallback=endCallback;
    if(this.endCallback == undefined)
        this.endCallback = function(){};
};
/**
 * @param {string} keyword
 * @returns {boolean}
 */
UrSession.prototype.isStop=function(keyword){
    if(keyword==this.endKeyword){
        this.endCallback();
        return true;
    }
    else
        return false;
};
/**
 * @param {Object} session
 */
UrSession.prototype.set=function(session){
    this.session = session;
    if(this.session == undefined)
        this.session = {};
};
/**
 * @returns {Object}
 */
UrSession.prototype.get=function(){
    return this.session;
};
/**
 * @param {string} key
 * @param {*} value
 */
UrSession.prototype.setKey=function(key,value){
    this.session[key]=value;
};
/**
 * @param {string} key
 * @returns {*}
 */
UrSession.prototype.getValue=function(key){
    return this.session[key];
};
/**
 * @param {string} key
 */
UrSession.prototype.removeKey=function(key){
    delete this.session[key];
};
UrSession.prototype.clear=function(){
    this.session = {};
};
