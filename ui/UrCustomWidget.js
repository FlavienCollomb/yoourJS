/**
 * The UrCustomWidget object is used to construct a widget with choiced type.
 * The future behaviour of UrCustomWidget may be unstable: you must create an input with existing type. Be careful!
 * @class UrCustomWidget
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {string} widgetType Widget type, for example "text"
 * @param {Object} settings
 *      @param {string}         [settings.name] UrCustomWidget name
 *      @param {UrWidget}       [settings.parent] UrCustomWidget's parent in DOM (UrWidget or specialised UrWidget)
 *      @param {string}         [settings.id] HTML attribute "id" of UrCustomWidget
 *      @param {string}         [settings.className] HTML attribute "class" of UrCustomWidget
 *      @param {Object|UrStyle} [settings.style] Style of UrCustomWidget
 *      @param {string}         [settings.html] HTML attribute "innerHTML" of UrCustomWidget
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var customWidget = new UrCustomWidget("h1",{"html":"Title 1","parent":body});
 * @constructor
 */
var UrCustomWidget = function(widgetType, settings){
    if(widgetType!= undefined && settings != undefined){
        var json = new UrJson({"widgetType":widgetType});
        json.checkType({"widgetType":["string"]});

        settings.element = document.createElement(widgetType);

        var tmp = new UrString(widgetType);
        UrWidget.call(this, settings, "Ur"+tmp.capitalize());
    }
};
UrCustomWidget.prototype=new UrWidget();
UrCustomWidget.prototype.constructor=UrCustomWidget;