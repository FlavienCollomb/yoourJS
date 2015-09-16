/**
 * The core module contains core non-GUI functionality.
 * @module core
 */

/**
 * The UrDate object create a representation of date
 * @class UrDate
 * @extends UrObject
 * @author Flavien Collomb
 * @param {Date} date Javascript pure Date
 * @param {string} [name] UrDate name
 * @example
 *      var date = new UrDate();
 * @constructor
 */
var UrDate = function(date,name){
    /**
     * @property date
     * @type Date
     * @description Javascript pure Date
     */
    this.date;

    if(date != undefined){
        this.date = date;

        var json = new UrJson({"date":date});
        json.checkType({"date":[Date]});

        UrObject.call(this, "UrDate", name);
    }
};
UrDate.prototype=new UrObject();
UrDate.prototype.constructor=UrDate;
/**
 * Get Javascript pure Date
 * @method getDate
 * @for UrDate
 * @return {Date}
 */
UrDate.prototype.get = function(){
    return this.date;
};
/**
 * Get time
 * @method getTime
 * @for UrDate
 * @return {Number}
 */
UrDate.prototype.getTime = function(){
    return this.date.getTime();
};
/**
 * Get day
 * @method getDay
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getDay = function(){
    var str = new UrString(this.date.getDate());
    return str.lpad(2);
};
/**
 * Get month
 * @method getMonth
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getMonth = function(){
    var str = new UrString(this.date.getMonth() + 1);
    return str.lpad(2);
};
/**
 * Get year
 * @method getYear
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getYear = function(){
    var str = new UrString(this.date.getFullYear());
    return str.lpad(4);
};
/**
 * Get hours
 * @method getHours
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getHours = function(){
    var str = new UrString(this.date.getHours());
    return str.lpad(2);
};
/**
 * Get minutes
 * @method getMinutes
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getMinutes = function(){
    var str = new UrString(this.date.getMinutes());
    return str.lpad(2);
};
/**
 * Get secondes
 * @method getSeconds
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSeconds = function(){
    var str = new UrString(this.date.getSeconds());
    return str.lpad(2);
};
/**
 * Get date with dd/mm/yyyy format
 * @method getFrenchDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getFrenchDate = function(){
    return this.getDay() + "/" + this.getMonth() + "/" + this.getYear();
};
/**
 * Get date and time with dd/mm/yyyy HH:ii:ss format
 * @method getFrenchDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getFrenchDateTime = function(){
    return this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds() + " " + this.getDay() + "/" + this.getMonth() + "/" + this.getYear();
};
/**
 * Get date and time with yyyymmdd format
 * @method getEnglishDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getEnglishDate = function(){
    return this.getYear() + this.getMonth() + this.getDay();
};
/**
 * Get date and time with yyyymmdd HH:ii:ss format
 * @method getEnglishDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getEnglishDateTime = function(){
    return this.getYear() + this.getMonth() + this.getDay() + " " + this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds();
};
/**
 * Get date and time with yyyy-mm-dd format
 * @method getSqlDate
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSqlDate = function(){
    return this.getYear() + "-" + this.getMonth() + "-" + this.getDay();
};
/**
 * Get date and time with yyyy-mm-dd HH:ii:ss format
 * @method getSqlDateTime
 * @for UrDate
 * @return {String}
 */
UrDate.prototype.getSqlDateTime = function(){
    return this.getYear() + "-" + this.getMonth() + "-" + this.getDay() + " " + this.getHours()+ ":" + this.getMinutes() + ":" + this.getSeconds();
};
/**
 * Add X day
 * @method addDay
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addDay = function(add){
    var result = new Date(this.date);
    result.setDate(this.date.getDate() + add);
    this.date = result;
    return this;
};
/**
 * Add X month
 * @method addMonth
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addMonth = function(add){
    var result = new Date(this.date);
    result.setMonth(this.date.getMonth() + add);
    this.date = result;
    return this;
};
/**
 * Add X year
 * @method addYear
 * @for UrDate
 * @param {Number} add
 * @return {UrDate}
 */
UrDate.prototype.addYear = function(add){
    var result = new Date(this.date);
    result.setYear(this.date.getFullYear() + add);
    this.date = result;
    return this;
};
/**
 * Less X day
 * @method lessDay
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessDay = function(less){
    var result = new Date(this.date);
    result.setDate(this.date.getDate() - less);
    this.date = result;
    return this;
};
/**
 * Less X month
 * @method lessMonth
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessMonth = function(less){
    var result = new Date(this.date);
    result.setMonth(this.date.getMonth() - less);
    this.date = result;
    return this;
};
/**
 * Less X year
 * @method lessYear
 * @for UrDate
 * @param {Number} less
 * @return {UrDate}
 */
UrDate.prototype.lessYear = function(less){
    var result = new Date(this.date);
    result.setYear(this.date.getFullYear() - less);
    this.date = result;
    return this;
};
/**
 * Get the difference in day between two UrDate
 * @method differenceInDay
 * @for UrDate
 * @param {UrDate} date
 * @return {Number}
 */
UrDate.prototype.differenceInDay = function(date){
    var tmp = Math.abs(this.getTime() - date.getTime());
    return Math.ceil(tmp / (1000 * 3600 * 24));
};
/**
 * Get the current week number in year
 * @method getWeekNumber
 * @for UrDate
 * @return {Number}
 */
UrDate.prototype.getWeekNumber = function(){
    var date = new Date(this.date);
    date.setHours(0,0,0);
    date.setDate(date.getDate()+4-(date.getDay()||7));
    return Math.ceil((((date-new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
};
