/**
 * @param {string} [name]
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

