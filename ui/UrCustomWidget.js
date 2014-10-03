/**
 * The UrCustomWidget object is used to construct a widget with choiced type.
 * The future behaviour of UrCustomWidget may be unstable: you must create an input with existing type. Be careful!
 * @param {string} widgetType
 * @param {Object} settings
 *      @param {string}         [settings.name]
 *      @param {UrDom}          [settings.parent]
 *      @param {string}         [settings.id]
 *      @param {string}         [settings.className]
 *      @param {Object|UrStyle} [settings.style]
 *      @param {string}         [settings.html]
 * @constructor
 */
var UrCustomWidget = function(widgetType, settings){
    if(settings == undefined) settings = {};
    settings.element = document.createElement(widgetType);

    var tmp = new UrString(widgetType);
    UrWidget.call(this, settings, "Ur"+tmp.capitalize());
};
UrCustomWidget.prototype=new UrWidget();
UrCustomWidget.prototype.constructor=UrCustomWidget;