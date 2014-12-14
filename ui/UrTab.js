/**
 * The UrTab object create a tab manager.
 * @class UrTab
 * @extends UrWidget
 * @author Flavien Collomb
 * @param {Object} settings
 *      @param {String}         [settings.name] UrTab name
 *      @param {String}         [settings.id] HTML attribute "id" of UrTab main container
 *      @param {String}         [settings.className] HTML attribute "class" of UrTab main container
 *      @param {UrWidget}       settings.container UrWidget container for the each tab
 *      @param {Object|UrStyle} settings.styleActive Style of active tab of UrTab
 *      @param {Object|UrStyle} settings.styleInactive Style of inactive tab(s) UrTab
 *      @param {Object|UrStyle} [settings.style] Style of UrTab main container
 * @example
 *      var body = document.getElementsByTagName("body")[0];
 *      body = new UrWidget({"element": body});
 *      var tab = new UrTab({
*           "parent":container,
*           "style":{"border-top":"2px solid gray"},
*           "container":new UrWidget({
*               "style":{
*                   "border":"2px solid gray",
*                   "padding":"25px"
*                }
*            }),
*            "styleActive":{"background":"black","color":"white","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"},
*            "styleInactive":{"background":"white","color":"black","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"}
*        });
 *       tab.add({
 *          "lib":"TEST TAB 1",
 *          "content":new UrWidget({
 *              "html":"CONTENT 1"
 *          }),
 *          "active":true
 *       });
 *       tab.add({
 *          "lib":"TEST TAB 2",
 *          "content":new UrWidget({
 *              "html":"CONTENT 2"
 *           }),
 *           "active":false
 *        });
 *        tab.getTabParent().addChild(new UrWidget({
 *          "style":{
 *              "clear":"both"
 *          }
 *        }));
 *        tab.tryMakeEqualTabWidth();
 * @constructor
 */
var UrTab=function(settings){
    /**
     * @property tab
     * @type Array<UrWidget>
     * @description UrTab list of tab
     */
    this.tab;
    /**
     * @property current
     * @type Number
     * @description UrTab current tab
     */
    this.current;
    /**
     * @property styleActive
     * @type {Object|UrStyle}
     * @description Style of active tab of UrTab
     */
    this.styleActive;
    /**
     * @property styleInactive
     * @type {Object|UrStyle}
     * @description Style of inactive tab(s) of UrTab
     */
    this.styleInactive;
    /**
     * @property tabParent
     * @type {UrWidget}
     * @description Parent for each tab ui
     */
    this.tabParent;
    /**
     * @property container
     * @type {UrWidget}
     * @description Container for each tab content of UrTab
     */
    this.container;

    if(settings != undefined){
        var json = new UrJson(settings);
        json.checkType({"container":[UrWidget],"styleActive":[Object,UrStyle],"styleInactive":[Object,UrStyle]});

        UrWidget.call(this, settings, "UrTab");

        this.tab = [];
        this.tabParent = new UrWidget({"parent":this});

        this.setStyleActive(settings.styleActive);
        this.setStyleInactive(settings.styleInactive);
        this.setContainer(settings.container);
    }
};
UrTab.prototype=new UrWidget();
UrTab.prototype.constructor=UrTab;
/**
 * Set container for each tab content of UrTab
 * @method setContainer
 * @for UrTab
 * @param {UrWidget} container
 */
UrTab.prototype.setContainer=function(container){
    this.container = container;
    if(this.container==undefined)
        this.container = new UrWidget({});
    this.addChild(this.container);
};
/**
 * Set style for active tab of UrTab
 * @method setStyleActive
 * @for UrTab
 * @param {Object|UrStyle} styleActive
 */
UrTab.prototype.setStyleActive=function(styleActive){
    if(styleActive == undefined)
        styleActive = {"background":"black","color":"white","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"};
    this.styleActive = styleActive;
    if(this.tab.length > 0)
        this.setCurrentTab(this.current);
};
/**
 * Set style for inactive tab(s) of UrTab
 * @method setStyleInactive
 * @for UrTab
 * @param {Object|UrStyle} styleInactive
 */
UrTab.prototype.setStyleInactive=function(styleInactive){
    if(styleInactive == undefined)
        styleInactive = {"background":"white","color":"black","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"}
    this.styleInactive = styleInactive;
    if(this.tab.length > 0)
        this.setCurrentTab(this.current);
};
/**
 * Add a tab in UrTab
 * @method add
 * @for UrTab
 * @param {Object} settings
 *      @param {String} settings.lib
 *      @param {UrWidget} settings.content
 *      @param {Boolean} settings.active
 */
UrTab.prototype.add=function(settings){
    var _this = this;
    var style = this.styleInactive;
    if(settings.active)
        style = this.styleActive;

    var tab = new UrWidget({
        "parent":this.tabParent,
        "style":style,
        "html":settings.lib
    });
    var index = _this.tab.length;
    this.tab.push({"lib":settings.lib,"tab":tab,"content":settings.content});

    this.container.addChild(settings.content);
    if(settings.active == false || settings.active == undefined)
        settings.content.getStyle().set("display","none");
    if(settings.active == true)
        this.current = index;

    tab.click(function(){
        _this.setCurrentTab(index);
    });
};
/**
 * Get UrWidget tab parent
 * @method getTabParent
 * @for UrTab
 * @returns {UrWidget}
 */
UrTab.prototype.getTabParent=function(){
    return this.tabParent;
};
/**
 * Get current tab index
 * @method getCurrent
 * @for UrTab
 * @returns {Number}
 */
UrTab.prototype.getCurrent=function(){
    return this.current;
};
/**
 * Get current tab
 * @method getCurrentTab
 * @for UrTab
 * @returns {UrWidget}
 */
UrTab.prototype.getCurrentTab=function(){
    return this.tab[this.current]["tab"];
};
/**
 * Get current tab content
 * @method getCurrentTabContent
 * @for UrTab
 * @returns {UrWidget}
 */
UrTab.prototype.getCurrentTabContent=function(){
    return this.tab[this.current]["content"];
};
/**
 * Get current tab lib
 * @method getCurrentTabLib
 * @for UrTab
 * @returns {UrWidget}
 */
UrTab.prototype.getCurrentTabLib=function(){
    return this.tab[this.current]["lib"];
};
/**
 * Get container of UrTab
 * @method getContainer
 * @for UrTab
 * @returns {UrWidget}
 */
UrTab.prototype.getContainer=function(){
    return this.container;
};
/**
 * Remove one tab of UrTab
 * @method removeTab
 * @param {Number} index
 */
UrTab.prototype.removeTab=function(index){
    if(this.tab[index] != undefined){
        this.tab[index]["tab"].remove();
        this.tab[index]["content"].remove();

        this.tab[index] = undefined;
    }
};
/**
 * Remove all tab of UrTab
 * @method removeAllTab
 */
UrTab.prototype.removeAllTab=function(){
    for(var i = 0; i < this.tab; i++){
        this.removeTab(i);
    }
};
/**
 * Get current tab
 * @method setCurrentTab
 * @for UrTab
 * @param {Number} index
 */
UrTab.prototype.setCurrentTab=function(index){
    for(var i=0;i<this.tab.length;i++) {
        if(this.tab[i]!=undefined) {
            this.tab[i]["tab"].setStyle(this.styleInactive);
            this.tab[i]["content"].getStyle().set("display", "none");
        }
    }

    this.tab[index]["tab"].setStyle(this.styleActive);
    this.tab[index]["content"].getStyle().set("display","block");
    this.current = index;
};
UrTab.prototype.tryMakeEqualTabWidth=function(){
    for(var i=0;i<this.tab.length;i++){
        this.tab[i]["tab"].getStyle().set("margin-left","0");
        this.tab[i]["tab"].getStyle().set("margin-right","0");
        this.tab[i]["tab"].getStyle().set("padding-left","0");
        this.tab[i]["tab"].getStyle().set("padding-right","0");
        this.tab[i]["tab"].getStyle().set("width",100/this.tab.length+"%");
    }
};