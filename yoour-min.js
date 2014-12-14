/*Copyright (C) 2014 Flavien Collomb Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
var UrObject=function(b,a){this.type=b;this.name=a;};UrObject.prototype.getName=function(){return this.name;};UrObject.prototype.setName=function(a){this.name=a;};UrObject.prototype.getType=function(){return this.type;};UrObject.prototype.setType=function(a){this.type=a;};var UrValidator=function(b){this.mandatory;this.messages;this.error;if(b!=undefined){this.messages={};var a=new UrJson(b);a.checkType({"name":["string"],"type":["string"],"mandatory":["boolean"],"messages":[Object]});UrObject.call(this,b.type,b.name);this.setMessages(b.messages);this.setMandatory(b.mandatory);}};UrValidator.prototype=new UrObject();UrValidator.prototype.constructor=UrValidator;UrValidator.prototype.setMandatory=function(a){this.mandatory=false;if(typeof a=="boolean"){this.mandatory=a;if(this.mandatory&&this.messages["mandatory"]==undefined){this.messages["mandatory"]="This field is mandatory";}}};UrValidator.prototype.getMandatory=function(){return this.mandatory;};UrValidator.prototype.setMessages=function(a){if(a!=undefined){this.messages=a;}};UrValidator.prototype.getMessages=function(){return this.messages;};UrValidator.prototype.setMessage=function(a,b){if(a!=undefined&&b!=undefined){this.messages[a]=b;}};UrValidator.prototype.validate=function(a){this.error=undefined;if(this.mandatory==true&&a==""){this.error=this.messages["mandatory"];return false;}return true;};UrValidator.prototype.getError=function(){return this.error;};var UrValidatorRegExp=function(b){this.regexp;if(b!=undefined){var a=new UrJson(b);a.checkType({"pattern":["string"],"modifiers":["string"]});UrValidator.call(this,b);this.setType(b.type);this.setRegExp(b.pattern,b.modifiers);}};UrValidatorRegExp.prototype=new UrValidator();UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;UrValidatorRegExp.prototype.setType=function(a){this.type=a;if(this.type==undefined){this.type="UrValidatorRegExp";}};UrValidatorRegExp.prototype.setRegExp=function(b,a){if(a!=undefined){this.regexp=new RegExp(b,a);}else{this.regexp=new RegExp(b);
}if(this.messages["regexp"]==undefined){this.messages["regexp"]="The field doesn't respect the pattern";}};UrValidatorRegExp.prototype.validate=function(a){this.error=undefined;if(!UrValidator.prototype.validate.call(this,a)){this.error=this.messages["mandatory"];return false;}else{if(a!=""){if(!this.regexp.test(a)){this.error=this.messages["regexp"];return false;}}}return true;};var UrString=function(b,a){UrObject.call(this,"UrString",a);this.str=b;};UrString.prototype=new UrObject();UrString.prototype.constructor=UrString;UrString.prototype.capitalize=function(){return this.str.charAt(0).toUpperCase()+this.str.slice(1);};UrString.prototype.toCamelCase=function(c){if(c==undefined){c="-";}if(this.str.indexOf(c)!=-1){var b=this.str.split(c);this.str="";for(var a=0;a<b.length;a++){if(a==0){this.str+=b[a];}else{var d=new UrString(b[a]);this.str+=d.capitalize();}}}return this.str;};UrString.prototype.htmlEntities=function(){};var UrJson=function(b,a){if(!b instanceof Object){throw new TypeError("UrJson first attribute 'json' must be an {}");}UrObject.call(this,"UrJson",a);this.json=b;};UrJson.prototype=new UrObject();UrJson.prototype.constructor=UrJson;UrJson.prototype.replace=function(b,c,a){this.json[c]=a;delete this.json[b];};UrJson.prototype.each=function(c,b){for(var a in this.json){if(b==undefined){c(a,this.json[a]);}else{c.call(b,a,this.json[a]);}}};UrJson.prototype.get=function(){return this.json;};UrJson.prototype.getValue=function(a){return this.json[a];};UrJson.prototype.setValue=function(a,b){this.json[a]=b;};UrJson.prototype.checkType=function(b){var a="";this.each(function(d,f){if(b[d]!=undefined){var c=0;var e=false;while(c<b[d].length&&e==false){if(typeof b[d][c]=="string"){if(typeof f==b[d][c]){e=true;}c++;}else{if(f instanceof b[d][c]==true){e=true;}c++;}}if(e==false){a+=d+" has an invalid type. Type expected "+b[d];}}});if(a==""){return true;}throw new TypeError(a);};var UrStyle=function(b,a){UrObject.call(this,"UrStyle");this.element=a;this.json;if(b!=undefined){this.json=new UrJson(b);
this.design();}else{this.json=new UrJson({});}};UrStyle.prototype=new UrObject();UrStyle.prototype.constructor=UrStyle;UrStyle.prototype.design=function(){this.element.style=this;if(this.element!=undefined){this.json.each(this.set,this);}};UrStyle.prototype.set=function(b,a){b=new UrString(b).toCamelCase();this.json.setValue(b,a);this.element.getElement().style[b]=a;};UrStyle.prototype.get=function(a){a=new UrString(a).toCamelCase();if(this.json.getValue(a)!=undefined){return this.json[a];}else{return this.element.getElement().style[a];}};UrStyle.prototype.copy=function(a){return new UrStyle(this.json.get(),a);};var UrDom=function(d,c){this.parent;this.element;this.style;this.id;this.name;this.className;if(c!=undefined){var b=new UrJson(c);b.checkType({"name":["string"],"parent":[UrWidget],"element":[Node],"id":["string"],"className":["string"],"style":[Object,UrStyle]});UrObject.call(this,d,c.name);this.parent=c.parent;this.element=c.element;var e=this;(function a(){if(e.element==undefined){e.element=document.createElement("div");}else{try{if(e.element instanceof jQuery){e.element=e.element[0];}}catch(f){}}})();this.setStyle(c.style);this.setId(c.id);this.setName(c.name);this.setClassName(c.className);if(this.parent!=undefined){this.parent.addChild(this);}}};UrDom.prototype=new UrObject();UrDom.prototype.constructor=UrDom;UrDom.prototype.remove=function(){this.getParent().getElement().removeChild(this.getElement());};UrDom.prototype.setParent=function(a){this.parent=a;};UrDom.prototype.getParent=function(){return this.parent;};UrDom.prototype.getElement=function(){return this.element;};UrDom.prototype.setStyle=function(a){this.style=a;if(this.style!=undefined){if(this.style instanceof UrStyle){this.style.copy(this);}else{this.style=new UrStyle(a,this);}}else{this.style=new UrStyle(undefined,this);}};UrDom.prototype.setId=function(a){this.id=a;if(this.id!=undefined){this.element.id=a;}};UrDom.prototype.setClassName=function(a){this.className=a;if(this.className!=undefined){this.element.className=a;
}};UrDom.prototype.getId=function(){return this.id;};UrDom.prototype.getClassName=function(){return this.className;};UrDom.prototype.getStyle=function(){return this.style;};UrDom.prototype.click=function(a){this.element.onclick=a;};UrDom.prototype.twoClick=function(a){this.element.ondblclick=a;};UrDom.prototype.mouseIn=function(a){this.element.onmouseover=a;};UrDom.prototype.mouseOut=function(a){this.element.onmouseout=a;};UrDom.prototype.mouseLeave=function(a){this.element.onmouseleave=a;};UrDom.prototype.focus=function(a){this.element.onfocus=a;};UrDom.prototype.blur=function(a){this.element.onblur=a;};UrDom.prototype.keyUp=function(a){this.element.onkeyup=a;};UrDom.prototype.keyDown=function(a){this.element.onkeydown=a;};UrDom.prototype.keyPress=function(a){this.element.onkeypress=a;};var UrWidget=function(c,b){this.html;this.children;if(c!=undefined){this.children=[];this.children["types"]={};this.children["names"]={};var a=new UrJson(c);a.checkType({"html":["string","number"]});if(b==""||b==undefined){b="UrWidget";}UrDom.call(this,b,c);this.setHtml(c.html);}};UrWidget.prototype=new UrDom();UrWidget.prototype.constructor=UrWidget;UrWidget.prototype.addChild=function(a){this.children.push(a);if(a.getType()!=undefined){if(this.children["types"][a.getType()]==undefined){this.children["types"][a.getType()]=[];}this.children["types"][a.getType()].push(a);}if(a.getName()!=undefined){this.children["names"][a.getName()]=a;}this.element.appendChild(a.element);a.setParent(this);};UrWidget.prototype.setHtml=function(a){this.html=a;if(this.html!=undefined){this.element.innerHTML=a;}};UrWidget.prototype.getHtml=function(){this.html=this.element.innerHTML;return this.html;};UrWidget.prototype.getChildren=function(){return this.children;};UrWidget.prototype.getChildByName=function(a){return this.children["names"][a];};UrWidget.prototype.remove=function(){this.removeAllChildren();UrDom.prototype.remove.call(this);};UrWidget.prototype.removeChildByName=function(a){this.element.removeChild(this.children["names"][a].getElement());
delete this.children["names"][a];};UrWidget.prototype.removeAllChildren=function(){while(this.element.firstChild){this.element.removeChild(this.element.firstChild);}this.children={};};var UrField=function(c,b){this.enable;this.defaultValue;this.validator;this.valid;if(c!=undefined){var a=new UrJson(c);a.checkType({"enable":["boolean"],"defaultValue":["string","number"],"validator":[UrValidator]});UrDom.call(this,b,c);this.setEnable(c.enable);this.setDefault(c.defaultValue);this.setValidator(c.validator);this.setFieldName(c.name);this.valid=true;}};UrField.prototype=new UrDom();UrField.prototype.constructor=UrField;UrField.prototype.setFieldName=function(a){if(a!=undefined){this.element.name=a;}};UrField.prototype.setEnable=function(a){if(a==false){this.enable=a;this.element.disabled=true;}else{this.element.disabled=false;this.enable=true;}};UrField.prototype.setDefault=function(a){this.defaultValue=a;if(this.defaultValue!=undefined){this.element.value=this.defaultValue;}};UrField.prototype.setValue=function(a){this.element.value=a;};UrField.prototype.getValue=function(){return this.element.value;};UrField.prototype.setValidator=function(a){this.validator=a;};UrField.prototype.getValidator=function(){return this.validator;};UrField.prototype.validate=function(){if(this.validator!=undefined){return this.validator.validate(this.getValue());}return true;};UrField.prototype.change=function(a){this.element.onchange=a;};var UrInput=function(c,b){this.placeholder;this.inputType;if(c!=undefined){var a=new UrJson(c);a.checkType({"placeholder":["string","number"]});UrField.call(this,c,b);this.setPlaceholder(c.placeholder);}};UrInput.prototype=new UrField();UrInput.prototype.constructor=UrInput;UrInput.prototype.getInputType=function(){return this.inputType;};UrInput.prototype.setPlaceholder=function(a){this.placeholder=a;if(this.placeholder!=undefined){this.element.placeholder=this.placeholder;}};UrInput.prototype.getPlaceholder=function(){return this.placeholder;};var UrNavigation=function(b){if(b==undefined){b={};
}UrObject.call(this,"UrNavigation",b.name);this.anchor={};this.defaultAction;this.setDefaultAction(b.defaultAction);this.current=window.location.hash;var a=this;if(("onhashchange" in window)){window.onhashchange=function(){a.load.call(a);};}};UrNavigation.prototype=new UrObject();UrNavigation.prototype.constructor=UrNavigation;UrNavigation.prototype.setDefaultAction=function(a){this.defaultAction=a;if(this.defaultAction==undefined){this.defaultAction=function(){};}};UrNavigation.prototype.add=function(a){if(a==undefined){a={};}if(a.anchor!=undefined){this.anchor[a.anchor]=a.action;}};UrNavigation.prototype.load=function(){this.current=window.location.hash;if(this.anchor[this.current]!=undefined){this.anchor[this.current](this.current);}else{this.defaultAction();}};UrNavigation.prototype.getCurrent=function(){return this.current;};var UrSession=function(a){if(a==undefined){a={};}UrObject.call(this,"UrSession",a.name);this.endKeyword;this.endCallback;this.session={};this.set(a.session);this.setEndKeyword(a.endKeyword);this.setEndCallback(a.endCallback);};UrSession.prototype=new UrObject();UrSession.prototype.constructor=UrSession;UrSession.prototype.setEndKeyword=function(a){this.endKeyword=a;};UrSession.prototype.getEndKeyword=function(){return this.endKeyword;};UrSession.prototype.setEndCallback=function(a){this.endCallback=a;if(this.endCallback==undefined){this.endCallback=function(){};}};UrSession.prototype.isStop=function(a){if(a==this.endKeyword){this.endCallback();return true;}else{return false;}};UrSession.prototype.set=function(a){this.session=a;if(this.session==undefined){this.session={};}};UrSession.prototype.get=function(){return this.session;};UrSession.prototype.setKey=function(a,b){this.session[a]=b;};UrSession.prototype.getValue=function(a){return this.session[a];};UrSession.prototype.removeKey=function(a){delete this.session[a];};UrSession.prototype.clear=function(){this.session={};};var UrValidatorEmail=function(a){if(a!=undefined){a["pattern"]="^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$";
a["modifiers"]="i";a["type"]="UrValidatorEmail";UrValidatorRegExp.call(this,a);}};UrValidatorEmail.prototype=new UrValidatorRegExp();UrValidatorEmail.prototype.constructor=UrValidatorEmail;UrValidatorEmail.prototype.validate=function(a){return UrValidatorRegExp.prototype.validate.call(this,a);};var UrValidatorURL=function(a){if(a!=undefined){a["pattern"]="(^|s)((https?://)?[w-]+(.[w-]+)+.?(:\d+)?(/S*)?)";a["modifiers"]="i";a["type"]="UrValidatorURL";UrValidatorRegExp.call(this,a);}};UrValidatorURL.prototype=new UrValidatorRegExp();UrValidatorURL.prototype.constructor=UrValidatorURL;UrValidatorURL.prototype.validate=function(a){return UrValidatorRegExp.prototype.validate.call(this,a);};var UrCustomInput=function(d,c){this.inputType;if(d!=undefined&&c!=undefined){var b=new UrJson({"inputType":d});b.checkType({"inputType":["string"]});c.element=document.createElement("input");var a=new UrString(d);UrInput.call(this,c,"Ur"+a.capitalize());this.inputType=this.element.type=d;}};UrCustomInput.prototype=new UrInput();UrCustomInput.prototype.constructor=UrCustomInput;var UrCustomWidget=function(d,c){if(d!=undefined&&c!=undefined){var b=new UrJson({"widgetType":d});b.checkType({"widgetType":["string"]});c.element=document.createElement(d);var a=new UrString(d);UrWidget.call(this,c,"Ur"+a.capitalize());}};UrCustomWidget.prototype=new UrWidget();UrCustomWidget.prototype.constructor=UrCustomWidget;var UrDataTable=function(b){this.head;this.body;this.lines;this.description;if(b!=undefined){var c=this;head=function(){c.head=new UrCustomWidget("thead",{"parent":c});var f=new UrCustomWidget("tr",{"parent":c.head});for(var d in c.description){if(c.description[d]["hide"]==undefined){var e=new UrCustomWidget("th",{"parent":f,"html":c.description[d]["title"]});}}};var a=new UrJson(b);a.checkType({"datas":[Array],"description":[Object]});this.lines=[];this.description=b.description;if(b.datas!=undefined&&b.datas instanceof Array&&b.datas.length>0){b.element=document.createElement("table");
UrWidget.call(this,b,"UrDataTable");head();this.body=new UrCustomWidget("tbody",{"parent":this});this.add(b.datas);}}};UrDataTable.prototype=new UrWidget();UrDataTable.prototype.constructor=UrDataTable;UrDataTable.prototype.add=function(a){for(var d in a){var e=new UrCustomWidget("tr",{"parent":this.body});this.lines.push(e);for(var c in this.description){var h=new UrCustomWidget("td",{"parent":e,"html":a[d][c]});if(this.description[c]["improve"]!=undefined){var g={"parent":h,"index":d};for(var b=0;b<this.description[c]["params"].length;b++){var f=this.description[c]["params"][b];if(this.description[f]!=undefined){g[f]=a[d][f];}else{g[f]=f;}}(function(k,l){var j=l[c]["improve"];j(k);}(g,this.description));}}}};UrDataTable.prototype.getHead=function(){return this.head;};UrDataTable.prototype.getBody=function(){return this.body;};UrDataTable.prototype.getLines=function(){return this.lines;};var UrForm=function(b){this.method;this.action;this.enctype;this.formElement={};if(b!=undefined){var a=new UrJson(b);a.checkType({"method":["string"],"action":["string"],"enctype":["string"]});b.element=document.createElement("form");UrWidget.call(this,b,"UrForm");this.setMethod(b.method);this.setAction(b.action);this.setEnctype(b.enctype);}};UrForm.prototype=new UrWidget();UrForm.prototype.constructor=UrForm;UrForm.prototype.add=function(a,b){if(b==undefined){this.addChild(a);}else{b.addChild(a);}this.formElement[a.getName()]=a;};UrForm.prototype.setMethod=function(a){this.method=a;if(this.method!=undefined){this.element.setAttribute("method",this.method);}};UrForm.prototype.setAction=function(a){this.action=a;if(this.action!=undefined){this.element.setAttribute("action",this.action);}};UrForm.prototype.setEnctype=function(a){this.enctype=a;if(this.enctype!=undefined){this.element.setAttribute("enctype",this.enctype);}};UrForm.prototype.getFormElement=function(){return this.formElement;};UrForm.prototype.serialize=function(){var a={};for(i in this.formElement){a[i]=this.formElement[i].getValue();
}return a;};UrForm.prototype.submit=function(a){this.element.onsubmit=a;};var UrFragment=function(a){var b={};b.name=a;b.element=document.createDocumentFragment();UrWidget.call(this,b,"UrFragment");};UrFragment.prototype=new UrWidget();UrFragment.prototype.constructor=UrFragment;var UrImage=function(b){this.src;this.alt;this.width;this.height;if(b!=undefined){var a=new UrJson(b);a.checkType({"src":["string"],"alt":["string","number"],"width":["number"],"height":["number"]});b.element=document.createElement("img");UrDom.call(this,"UrImage",b);this.setSrc(b.src);this.setAlt(b.alt);this.setWidth(b.width);this.setHeight(b.height);}};UrImage.prototype=new UrDom();UrImage.prototype.constructor=UrImage;UrImage.prototype.setSrc=function(a){this.src=a;if(this.src!=undefined){this.element.src=this.src;}};UrImage.prototype.setAlt=function(a){this.alt=a;if(this.alt!=undefined){this.element.alt=this.alt;}};UrImage.prototype.setWidth=function(a){this.width=a;if(this.width!=undefined){this.element.width=this.width;}};UrImage.prototype.setHeight=function(a){this.height=a;if(this.height!=undefined){this.element.height=this.height;}};var UrInputText=function(a){if(a!=undefined){a.element=document.createElement("input");UrInput.call(this,a,"UrInputText");this.inputType=this.element.type="text";}};UrInputText.prototype=new UrInput();UrInputText.prototype.constructor=UrInputText;var UrLabel=function(b){this.htmlFor;if(b!=undefined){var a=new UrJson(b);a.checkType({"for":["string","number"]});b.element=document.createElement("label");UrWidget.call(this,b,"UrLabel");this.setHtmlFor(b.htmlFor);}};UrLabel.prototype=new UrWidget();UrLabel.prototype.constructor=UrLabel;UrLabel.prototype.setHtmlFor=function(a){this.htmlFor=a;if(this.htmlFor!=undefined){this.element.htmlFor=this.htmlFor;}};UrLabel.prototype.getHtmlFor=function(){return this.htmlFor;};var UrLine=function(c){this.parts;if(c!=undefined){this.parts=[];var b=new UrJson(c);b.checkType({"partsNumber":["number"],"partsClassName":["string"],"partsStyle":[Object,UrStyle]});
UrWidget.call(this,c,"UrLine");if(c.partsStyle==undefined){c.partsStyle={};}for(var a=0;a<c.partsNumber;a++){this.parts.push(new UrWidget({"parent":this,"className":c.partsClassName,"style":c.partsStyle}));}}};UrLine.prototype=new UrWidget();UrLine.prototype.constructor=UrLine;UrLine.prototype.getPart=function(a){return this.parts[a];};var UrLink=function(b){this.href;this.target;if(b!=undefined){var a=new UrJson(b);a.checkType({"href":["string"],"target":["string"]});b.element=document.createElement("a");UrWidget.call(this,b,"UrLink");this.setHref(b.href);this.setTarget(b.target);}};UrLink.prototype=new UrWidget();UrLink.prototype.constructor=UrLink;UrLink.prototype.setHref=function(a){this.href=a;if(this.href!=undefined){this.element.href=this.href;}};UrLink.prototype.setTarget=function(a){this.target=a;if(this.target!=undefined){this.element.setAttribute("target",this.target);}};UrLink.prototype.getHref=function(){return this.href;};UrLink.prototype.getTarget=function(){return this.target;};var UrNotification=function(b){this.kind;this.time;this.title;this.text;this.header;this.closeWidget;this.hoverState;if(b!=undefined){var c=this;var a=new UrJson(b);a.checkType({"title":[UrWidget],"text":[UrWidget],"kind":["string"],"time":["number"],"closeWidget":[UrWidget]});if(b.style==undefined){b.style={"float":"right","margin":"15px","border":"2px solid white"};}UrWidget.call(this,b,"UrNotification");this.hoverState=false;this.setKind(b.kind);this.setTime(b.time);this.header=new UrWidget({"parent":this});this.setCloseWidget(b.close);this.setTitle(b.title);this.setText(b.text);this.mouseIn(function(){c.hover=true;});this.mouseLeave(function(){c.hover=false;c.remove();});setTimeout(function(){try{if(c.hoverState==false){c.remove();}}catch(d){}},c.time);}};UrNotification.prototype=new UrWidget();UrNotification.prototype.constructor=UrNotification;UrNotification.prototype.setKind=function(a){this.kind=a||"info";if(this.kind=="default"){this.getStyle().set("background","#fcf8e3");
}if(this.kind=="info"){this.getStyle().set("background","lightblue");}if(this.kind=="success"){this.getStyle().set("background","#dff0d8");}if(this.kind=="warn"){this.getStyle().set("background","#ebb275");}if(this.kind=="error"){this.getStyle().set("background","#f2dede");}};UrNotification.prototype.setTime=function(a){this.time=a||3000;};UrNotification.prototype.setTitle=function(a){if(this.title!=undefined){this.title.remove();}this.title=a;if(this.title!=undefined){this.addChild(this.title);}};UrNotification.prototype.setText=function(a){if(this.text!=undefined){this.text.remove();}this.text=a;if(this.text!=undefined){this.addChild(this.text);}};UrNotification.prototype.setCloseWidget=function(a){var b=this;if(this.closeWidget!=undefined){this.closeWidget.remove();}this.closeWidget=a;if(this.closeWidget==undefined){this.closeWidget=new UrWidget({"html":"x","style":{"margin":"0 5px 0 5px","float":"right","font-weight":"bold","cursor":"pointer"}});}this.closeWidget.click(function(){b.remove();});this.addChild(this.closeWidget);};var UrPopup=function(c){this.bg;this.closeWidgetContainer;this.closeWidget;this.content;if(c!=undefined){var b=new UrJson(c);b.checkType({"content":[UrWidget],"closeWidget":[UrDom],"modal":["boolean"]});if(c.style==undefined){c.style={"position":"absolute","left":"50%","top":"150px","background":"white","width":"600px","margin-left":"-300px"};}var a=document.getElementsByTagName("body")[0];this.body=new UrWidget({"element":a});c.parent=this.body;this.setBg();UrWidget.call(this,c,"UrPopup");this.setCloseWidget(c.closeWidget);this.setModal(c.modal);this.setContent(c.content);}};UrPopup.prototype=new UrWidget();UrPopup.prototype.constructor=UrPopup;UrPopup.prototype.setBg=function(){if(this.bg!=undefined){this.bg.remove();}this.bg=new UrWidget({"parent":this.body,"style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}});};UrPopup.prototype.getBg=function(){return this.bg;};UrPopup.prototype.setCloseWidget=function(b){var a=this;
if(this.closeWidgetContainer!=undefined){this.closeWidgetContainer.remove();}this.closeWidget=b;if(this.closeWidget!=undefined){this.closeWidgetContainer=new UrWidget({"parent":this});this.closeWidgetContainer.addChild(this.closeWidget);this.closeWidgetContainer.addChild(new UrWidget({"parent":this.closeWidgetContainer,"style":{"clear":"both"}}));this.closeWidget.click(function(){a.bg.remove();a.remove();});}};UrPopup.prototype.setModal=function(b){var a=this;if(b==true){if(this.closeWidget!=undefined){this.closeWidget.remove();}if(this.bg!=undefined){this.bg.click(function(){});}}else{if(this.bg!=undefined){this.bg.click(function(){a.bg.remove();a.remove();});}}};UrPopup.prototype.setContent=function(a){if(this.content!=undefined){this.content.remove();}this.content=a;if(this.content!=undefined){this.addChild(this.content);}};UrPopup.prototype.close=function(){this.bg.remove();this.remove();};var UrProgressBar=function(b){this.width;this.currentVal;this.interval;this.speed;if(b!=undefined){var a=new UrJson(b);a.checkType({"speed":["number"]});if(b.style==undefined){b.style={"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};}this.width=0;this.currentVal=0;UrWidget.call(this,b,"UrProgressBar");this.setSpeed(b.speed);}};UrProgressBar.prototype=new UrWidget();UrProgressBar.prototype.constructor=UrProgressBar;UrProgressBar.prototype.setSpeed=function(a){this.speed=a;if(this.speed==undefined){this.speed=400;}};UrProgressBar.prototype.less=function(c,d){if(this.interval!=undefined){clearInterval(this.interval);this.set(this.currentVal);}this.currentVal=this.width-c;var b=this.speed/c;var a=this;this.interval=setInterval(function(){a.width-=1;a.getStyle().set("width",a.width+"%");if(a.width==a.currentVal){clearInterval(a.interval);a.interval=undefined;if(d!=undefined){d();}}},b);};UrProgressBar.prototype.more=function(c,d){if(this.interval!=undefined){clearInterval(this.interval);this.set(this.currentVal);}this.currentVal=this.width+c;
var b=this.speed/c;var a=this;this.interval=setInterval(function(){a.width+=1;a.getStyle().set("width",a.width+"%");if(a.width==a.currentVal||a.width==100){clearInterval(a.interval);a.interval=undefined;if(d!=undefined){d();}}},b);};UrProgressBar.prototype.set=function(a){this.currentVal=this.width=a;this.getStyle().set("width",this.width+"%");};UrProgressBar.prototype.done=function(c){var b=100-this.width;var a=this;this.more(b,function(){a.remove();if(c!=undefined){c();}});};var UrTab=function(b){this.tab;this.current;this.styleActive;this.styleInactive;this.tabParent;this.container;if(b!=undefined){var a=new UrJson(b);a.checkType({"container":[UrWidget],"styleActive":[Object,UrStyle],"styleInactive":[Object,UrStyle]});UrWidget.call(this,b,"UrTab");this.tab=[];this.tabParent=new UrWidget({"parent":this});this.setStyleActive(b.styleActive);this.setStyleInactive(b.styleInactive);this.setContainer(b.container);}};UrTab.prototype=new UrWidget();UrTab.prototype.constructor=UrTab;UrTab.prototype.setContainer=function(a){this.container=a;if(this.container==undefined){this.container=new UrWidget({});}this.addChild(this.container);};UrTab.prototype.setStyleActive=function(a){if(a==undefined){a={"background":"black","color":"white","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"};}this.styleActive=a;if(this.tab.length>0){this.setCurrentTab(this.current);}};UrTab.prototype.setStyleInactive=function(a){if(a==undefined){a={"background":"white","color":"black","cssFloat":"left","styleFloat":"left","cursor":"pointer","padding":"20px","text-align":"center"};}this.styleInactive=a;if(this.tab.length>0){this.setCurrentTab(this.current);}};UrTab.prototype.add=function(d){var e=this;var c=this.styleInactive;if(d.active){c=this.styleActive;}var b=new UrWidget({"parent":this.tabParent,"style":c,"html":d.lib});var a=e.tab.length;this.tab.push({"lib":d.lib,"tab":b,"content":d.content});this.container.addChild(d.content);if(d.active==false||d.active==undefined){d.content.getStyle().set("display","none");
}if(d.active==true){this.current=a;}b.click(function(){e.setCurrentTab(a);});};UrTab.prototype.getTabParent=function(){return this.tabParent;};UrTab.prototype.getCurrent=function(){return this.current;};UrTab.prototype.getCurrentTab=function(){return this.tab[this.current]["tab"];};UrTab.prototype.getCurrentTabContent=function(){return this.tab[this.current]["content"];};UrTab.prototype.getCurrentTabLib=function(){return this.tab[this.current]["lib"];};UrTab.prototype.getContainer=function(){return this.container;};UrTab.prototype.removeTab=function(a){if(this.tab[a]!=undefined){this.tab[a]["tab"].remove();this.tab[a]["content"].remove();this.tab[a]=undefined;}};UrTab.prototype.removeAllTab=function(){for(var a=0;a<this.tab;a++){this.removeTab(a);}};UrTab.prototype.setCurrentTab=function(a){for(var b=0;b<this.tab.length;b++){if(this.tab[b]!=undefined){this.tab[b]["tab"].setStyle(this.styleInactive);this.tab[b]["content"].getStyle().set("display","none");}}this.tab[a]["tab"].setStyle(this.styleActive);this.tab[a]["content"].getStyle().set("display","block");this.current=a;};UrTab.prototype.tryMakeEqualTabWidth=function(){for(var a=0;a<this.tab.length;a++){this.tab[a]["tab"].getStyle().set("margin-left","0");this.tab[a]["tab"].getStyle().set("margin-right","0");this.tab[a]["tab"].getStyle().set("padding-left","0");this.tab[a]["tab"].getStyle().set("padding-right","0");this.tab[a]["tab"].getStyle().set("width",100/this.tab.length+"%");}};var UrTable=function(b){this.head;this.body;this.lines=[];if(b!=undefined){var c=this;head=function(){if(b.head!=undefined){c.head=new UrCustomWidget("thead",{"parent":c});var f=new UrCustomWidget("tr",{"parent":c.head});for(var d=0;d<b.head.length;d++){var e=new UrCustomWidget("th",{"parent":f,"html":b.head[d]});}}};var a=new UrJson(b);a.checkType({"columnNumber":["number"],"head":[Array]});this.setColumnNumber(b.columnNumber);b.element=document.createElement("table");UrWidget.call(this,b,"UrTable");head();this.body=new UrCustomWidget("tbody",{"parent":this});
}};UrTable.prototype=new UrWidget();UrTable.prototype.constructor=UrTable;UrTable.prototype.setColumnNumber=function(a){this.columnNumber=0;if(a!=undefined){this.columnNumber=a;}};UrTable.prototype.add=function(){var b=new UrCustomWidget("tr",{"parent":this.body});this.lines.push(b);for(var a=0;a<this.columnNumber;a++){new UrCustomWidget("td",{"parent":b});}return b;};UrTable.prototype.getHead=function(){return this.head;};UrTable.prototype.getBody=function(){return this.body;};UrTable.prototype.getLines=function(){return this.lines;};var UrTextarea=function(b){this.row;this.cols;if(b!=undefined){var a=new UrJson(b);a.checkType({"rows":["number"],"cols":["number"]});b.element=document.createElement("textarea");UrInput.call(this,b,"UrTextarea");this.setRows(b.rows);this.setCols(b.cols);}};UrTextarea.prototype=new UrInput();UrTextarea.prototype.constructor=UrTextarea;UrTextarea.prototype.setRows=function(a){this.rows=a;if(this.rows!=undefined){this.element.rows=this.rows;}};UrTextarea.prototype.setCols=function(a){this.cols=a;if(this.cols!=undefined){this.element.cols=this.cols;}};var UrTypeahead=function(b){this.data;this.dataLib;this.list;this.callbackClick;this.callbackEnter;this.focused;if(b!=undefined){var a=new UrJson(b);a.checkType({"data":[Array],"callbackEnter":[Function],"callbackClick":[Function],"styleList":[Object,UrStyle]});var c=this;this.focused=false;if(b.style==undefined){b.style={"background":"white","border-bottom":"1px solid black","height":"25px"};}UrWidget.call(this,b,"UrTypeahead");this.setData(b.data);this.setList(this.dataId,this.dataLib);this.setListStyle(b.styleList);this.setCallbackClick(b.callbackClick);this.setCallbackEnter(b.callbackEnter);this.element.contentEditable=true;this.focus(function(){c.focused=true;c.list.getStyle().set("display","block");});this.keyDown(function(d){if(d.keyCode==13){d.preventDefault();c.callbackEnter(c.getHtml());}if(d.keyCode==27&&c.focused==true){c.getElement().blur();}});this.keyUp(function(d){if(d.keyCode==13){d.preventDefault();
}else{c.list.getStyle().set("display","block");c.search();}});this.blur(function(){c.focused=false;setTimeout(function(){c.list.getStyle().set("display","none");},200);});}};UrTypeahead.prototype=new UrWidget();UrTypeahead.prototype.constructor=UrTypeahead;UrTypeahead.prototype.setData=function(b){this.data={};this.dataId=[];this.dataLib=[];if(b!=undefined){for(var a=0;a<b.length;a++){this.data[b[a]["id"]]=b[a]["lib"];this.dataId.push(b[a]["id"]);this.dataLib.push(b[a]["lib"]);}}};UrTypeahead.prototype.setList=function(a,b){var d=this;if(this.list==undefined){this.list=new UrWidget({"parent":this.parent});}else{this.list.setHtml("");}for(var c=0;c<b.length;c++){(function(e){var f=new UrWidget({"parent":d.list,"html":b[c]});f.click(function(){d.setHtml(b[e]);d.callbackClick(a[e],b[e]);d.search(b[e]);});}(c));}};UrTypeahead.prototype.setListStyle=function(a){if(a==undefined){a={"position":"absolute","background":"white","border":"1px solid #eee","cursor":"pointer"};}this.list.setStyle(a);this.list.getStyle().set("width",this.element.offsetWidth+"px");this.list.getStyle().set("display","none");};UrTypeahead.prototype.setCallbackClick=function(a){if(a==undefined){this.callbackClick=function(){};}else{this.callbackClick=a;}};UrTypeahead.prototype.setCallbackEnter=function(a){if(a==undefined){this.callbackEnter=function(){};}else{this.callbackEnter=a;}};UrTypeahead.prototype.search=function(){if(this.getHtml()==""){this.setList(this.dataId,this.dataLib);}else{var a=[];var b=[];var d=new RegExp(this.getElement().textContent.trim(),"i");for(var c=0;c<this.dataLib.length;c++){if(d.test(this.dataLib[c])){a.push(this.dataId[c]);b.push(this.dataLib[c]);}}this.setList(a,b);}};UrTypeahead.prototype.getList=function(){return this.list;};
