/**
 * The UrSession object provides an interface for server-side SESSION
 * @class UrSession
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {string} [settings.endKeyword] Keyword of end of session / logout
 *      @param {Object} [settings.endCallback] Function called when session is finished / logout
 *      @param {Object} [settings.session] Object equal of server-side session
 *      @param {string} [settings.name] UrSession name
 * @example
 *      var session = new UrSession({
 *          "endKeyword":"logout",
 *          "endCallback":function(){
 *              window.location.href = "login.html"
 *          }
 *      });
 *      if(!session.isStop("logout"))
 *          console.log("Session is active!");
 * @constructor
 */
var UrSession=function(settings){
    if(settings == undefined) settings = {};
    UrObject.call(this, "UrSession", settings.name);
    /**
     * @property endKeyword
     * @type String
     * @description Keyword of end of session / logout
     */
    this.endKeyword;
    /**
     * @property endCallback
     * @type Function
     * @description Function called when session is finished / logout
     */
    this.endCallback;
    /**
     * @property session
     * @type Object
     * @description Object equal of server-side session
     */
    this.session = {};
    this.set(settings.session);
    this.setEndKeyword(settings.endKeyword);
    this.setEndCallback(settings.endCallback);
};
UrSession.prototype=new UrObject();
UrSession.prototype.constructor=UrSession;
/**
 * Set end of session keyword
 * @method setEndKeyword
 * @for UrSession
 * @param {string} endKeyword
 */
UrSession.prototype.setEndKeyword=function(endKeyword){
    this.endKeyword=endKeyword;
};
/**
 * Get end of session keyword
 * @method getEndKeyword
 * @for UrSession
 * @return {String}
 */
UrSession.prototype.getEndKeyword=function(){
    return this.endKeyword;
};
/**
 * Set end of session callback function
 * @method setEndKeyword
 * @for UrSession
 * @param {Function} endCallback
 */
UrSession.prototype.setEndCallback=function(endCallback){
    this.endCallback=endCallback;
    if(this.endCallback == undefined)
        this.endCallback = function(){};
};
/**
 * Check if a keyword passed in parameter equal end of session keyword
 * @method isStop
 * @for UrSession
 * @param {String} keyword
 * @return {Boolean}
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
 * Set session object
 * @method set
 * @for UrSession
 * @param {Object} session
 */
UrSession.prototype.set=function(session){
    this.session = session;
    if(this.session == undefined)
        this.session = {};
};
/**
 * Get session object
 * @method get
 * @for UrSession
 * @return {Object}
 */
UrSession.prototype.get=function(){
    return this.session;
};
/**
 * Set a value in session object
 * @method setKey
 * @for UrSession
 * @param {Object} key
 * @param {*} value
 */
UrSession.prototype.setKey=function(key,value){
    this.session[key]=value;
};
/**
 * Get a value in session object
 * @method getValue
 * @for UrSession
 * @param {String} key
 * @return {*}
 */
UrSession.prototype.getValue=function(key){
    return this.session[key];
};
/**
 * Remove key in session object
 * @method removeKey
 * @for UrSession
 * @param {String} key
 */
UrSession.prototype.removeKey=function(key){
    delete this.session[key];
};
/**
 * Clear session object
 * @method clear
 * @for UrSession
 */
UrSession.prototype.clear=function(){
    this.session = {};
};
