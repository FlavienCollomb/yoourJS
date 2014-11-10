/**
 * The UrFragment object is used to construct DocumentFragment
 * @class UrFragment
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {String} [name] UrFragment name
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var fragment = new UrFragment();
 *      var widget=new UrWidget({"parent":fragment});
 *      body.addChild(fragment);
 * @constructor
 */
var UrFragment = function(name){
    var settings = {};
    settings.name = name;
    settings.element = document.createDocumentFragment();

    UrWidget.call(this, settings, "UrFragment");
};
UrFragment.prototype=new UrWidget();
UrFragment.prototype.constructor=UrFragment;

