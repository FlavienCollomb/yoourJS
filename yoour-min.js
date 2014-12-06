/*Copyright (C) 2014 Flavien Collomb Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
var UrObject=function(b,a){this.type=b;this.name=a;};UrObject.prototype.getName=function(){return this.name;};UrObject.prototype.setName=function(a){this.name=a;};UrObject.prototype.getType=function(){return this.type;};UrObject.prototype.setType=function(a){this.type=a;};var UrValidator=function(a){if(a==undefined){a={};}UrObject.call(this,a.type,a.name);this.mandatory;this.messages={};this.error;this.setMessages(a.messages);this.setMandatory(a.mandatory);};UrValidator.prototype=new UrObject();UrValidator.prototype.constructor=UrValidator;UrValidator.prototype.setMandatory=function(a){this.mandatory=false;if(typeof a=="boolean"){this.mandatory=a;if(this.mandatory&&this.messages["mandatory"]==undefined){this.messages["mandatory"]="This field is mandatory";}}};UrValidator.prototype.getMandatory=function(){return this.mandatory;};UrValidator.prototype.setMessages=function(a){if(a!=undefined){this.messages=a;}};UrValidator.prototype.getMessages=function(){return this.messages;};UrValidator.prototype.setMessage=function(a,b){if(a!=undefined&&b!=undefined){this.messages[a]=b;}};UrValidator.prototype.validate=function(a){this.error=undefined;if(this.mandatory==true&&a==""){this.error=this.messages["mandatory"];return false;}return true;};UrValidator.prototype.getError=function(){return this.error;};var UrValidatorRegExp=function(a){if(a==undefined){a={};}UrValidator.call(this,a);this.setType(a.type);this.regexp;this.setRegExp(a.pattern,a.modifiers);};UrValidatorRegExp.prototype=new UrValidator();UrValidatorRegExp.prototype.constructor=UrValidatorRegExp;UrValidatorRegExp.prototype.setType=function(a){this.type=a;if(this.type==undefined){this.type="UrValidatorRegExp";}};UrValidatorRegExp.prototype.setRegExp=function(b,a){if(a!=undefined){this.regexp=new RegExp(b,a);}else{this.regexp=new RegExp(b);}if(this.messages["regexp"]==undefined){this.messages["regexp"]="The field doesn't respect the pattern";}};UrValidatorRegExp.prototype.validate=function(a){this.error=undefined;if(!UrValidator.prototype.validate.call(this,a)){this.error=this.messages["mandatory"];
return false;}else{if(a!=""){if(!this.regexp.test(a)){this.error=this.messages["regexp"];return false;}}}return true;};var UrString=function(b,a){UrObject.call(this,"UrString",a);this.str=b;};UrString.prototype=new UrObject();UrString.prototype.constructor=UrString;UrString.prototype.capitalize=function(){return this.str.charAt(0).toUpperCase()+this.str.slice(1);};UrString.prototype.toCamelCase=function(c){if(c==undefined){c="-";}if(this.str.indexOf(c)!=-1){var b=this.str.split(c);this.str="";for(var a=0;a<b.length;a++){if(a==0){this.str+=b[a];}else{var d=new UrString(b[a]);this.str+=d.capitalize();}}}return this.str;};var UrJson=function(b,a){UrObject.call(this,"UrJson",a);this.json=b;};UrJson.prototype=new UrObject();UrJson.prototype.constructor=UrJson;UrJson.prototype.replace=function(b,c,a){this.json[c]=a;delete this.json[b];};UrJson.prototype.each=function(c,b){for(var a in this.json){if(b==undefined){c(a,this.json[a]);}else{c.call(b,a,this.json[a]);}}};UrJson.prototype.get=function(){return this.json;};UrJson.prototype.getValue=function(a){return this.json[a];};UrJson.prototype.setValue=function(a,b){this.json[a]=b;};var UrStyle=function(b,a){UrObject.call(this,"UrStyle");this.element=a;this.json;if(b!=undefined){this.json=new UrJson(b);this.design();}else{this.json=new UrJson({});}};UrStyle.prototype=new UrObject();UrStyle.prototype.constructor=UrStyle;UrStyle.prototype.design=function(){this.element.style=this;if(this.element!=undefined){this.json.each(this.set,this);}};UrStyle.prototype.set=function(b,a){b=new UrString(b).toCamelCase();this.json.setValue(b,a);this.element.getElement().style[b]=a;};UrStyle.prototype.get=function(a){a=new Urtring(a).toCamelCase();if(this.json.getValue(a)!=undefined){return this.json[a];}else{return this.elem.getNode().style[a];}};UrStyle.prototype.copy=function(a){return new UrStyle(this.json.get(),a);};var UrDom=function(c,b){if(b==undefined){b={};}UrObject.call(this,c,b.name);this.parent=b.parent;this.element=b.element;this.style;
this.id;this.name;this.className;var d=this;(function a(){if(d.element==undefined){d.element=document.createElement("div");}else{try{if(d.element instanceof jQuery){d.element=d.element[0];}}catch(f){}}})();this.setStyle(b.style);this.setId(b.id);this.setName(b.name);this.setClassName(b.className);if(this.parent!=undefined){this.parent.addChild(this);}};UrDom.prototype=new UrObject();UrDom.prototype.constructor=UrDom;UrDom.prototype.remove=function(){this.getParent().getElement().removeChild(this.getElement());};UrDom.prototype.setParent=function(a){this.parent=a;};UrDom.prototype.getParent=function(){return this.parent;};UrDom.prototype.getElement=function(){return this.element;};UrDom.prototype.setStyle=function(a){this.style=a;if(this.style!=undefined){if(this.style instanceof UrStyle){this.style.copy(this);}else{this.style=new UrStyle(a,this);}}else{this.style=new UrStyle(undefined,this);}};UrDom.prototype.setId=function(a){this.id=a;if(this.id!=undefined){this.element.id=a;}};UrDom.prototype.setClassName=function(a){this.className=a;if(this.className!=undefined){this.element.className=a;}};UrDom.prototype.getId=function(){return this.id;};UrDom.prototype.getClassName=function(){return this.className;};UrDom.prototype.getStyle=function(){return this.style;};UrDom.prototype.click=function(a){this.element.onclick=a;};UrDom.prototype.twoClick=function(a){this.element.ondblclick=a;};UrDom.prototype.mouseIn=function(a){this.element.onmouseover=a;};UrDom.prototype.mouseOut=function(a){this.element.onmouseout=a;};UrDom.prototype.mouseLeave=function(a){this.element.onmouseleave=a;};var UrWidget=function(b,a){if(a==""||a==undefined){a="UrWidget";}if(b==undefined){b={};}UrDom.call(this,a,b);this.html;this.children=[];this.children["types"]={};this.children["names"]={};this.setHtml(b.html);};UrWidget.prototype=new UrDom();UrWidget.prototype.constructor=UrWidget;UrWidget.prototype.addChild=function(a){this.children.push(a);if(a.getType()!=undefined){if(this.children["types"][a.getType()]==undefined){this.children["types"][a.getType()]=[];
}this.children["types"][a.getType()].push(a);}if(a.getName()!=undefined){this.children["names"][a.getName()]=a;}this.element.appendChild(a.element);a.setParent(this);};UrWidget.prototype.setHtml=function(a){this.html=a;if(this.html!=undefined){this.element.innerHTML=a;}};UrWidget.prototype.getHtml=function(){return this.html;};UrWidget.prototype.getChildren=function(){return this.children;};UrWidget.prototype.getChildByName=function(a){return this.children["names"][a];};UrWidget.prototype.remove=function(){this.removeAllChildren();UrDom.prototype.remove.call(this);};UrWidget.prototype.removeChildByName=function(a){this.element.removeChild(this.children["names"][a].getElement());delete this.children["names"][a];};UrWidget.prototype.removeAllChildren=function(){while(this.element.firstChild){this.element.removeChild(this.element.firstChild);}this.children={};};var UrField=function(b,a){if(b==undefined){b={};}UrDom.call(this,a,b);this.enable;this.defaultValue;this.validator;this.setEnable(b.enable);this.setDefault(b.defaultValue);this.setValidator(b.validator);this.valid=true;};UrField.prototype=new UrDom();UrField.prototype.constructor=UrField;UrField.prototype.setEnable=function(a){if(a==false){this.enable=a;this.element.disabled=true;}else{this.element.disabled=false;this.enable=true;}};UrField.prototype.setDefault=function(a){this.defaultValue=a;if(this.defaultValue!=undefined){this.element.value=this.defaultValue;}};UrField.prototype.setValue=function(a){this.element.value=a;};UrField.prototype.getValue=function(){return this.element.value;};UrField.prototype.setValidator=function(a){this.validator=a;};UrField.prototype.getValidator=function(){return this.validator;};UrField.prototype.validate=function(){if(this.validator!=undefined){return this.validator.validate(this.getValue());}return true;};UrField.prototype.focus=function(a){this.element.onfocus=a;};UrField.prototype.blur=function(a){this.element.onblur=a;};UrField.prototype.change=function(a){this.element.onchange=a;
};var UrInput=function(b,a){if(b==undefined){b={};}UrField.call(this,b,a);this.placeholder;this.inputType;this.setPlaceholder(b.placeholder);};UrInput.prototype=new UrField();UrInput.prototype.constructor=UrInput;UrInput.prototype.getInputType=function(){return this.inputType;};UrInput.prototype.setPlaceholder=function(a){this.placeholder=a;if(this.placeholder!=undefined){this.element.placeholder=this.placeholder;}};UrInput.prototype.getPlaceholder=function(){return this.placeholder;};var UrNavigation=function(b){if(b==undefined){b={};}UrObject.call(this,"UrNavigation",b.name);this.anchor={};this.defaultAction;this.setDefaultAction(b.defaultAction);this.current=window.location.hash;var a=this;if(("onhashchange" in window)){window.onhashchange=function(){a.load.call(a);};}};UrNavigation.prototype=new UrObject();UrNavigation.prototype.constructor=UrNavigation;UrNavigation.prototype.setDefaultAction=function(a){this.defaultAction=a;if(this.defaultAction==undefined){this.defaultAction=function(){};}};UrNavigation.prototype.add=function(a){if(a==undefined){a={};}if(a.anchor!=undefined){this.anchor[a.anchor]=a.action;}};UrNavigation.prototype.load=function(){this.current=window.location.hash;if(this.anchor[this.current]!=undefined){this.anchor[this.current](this.current);}else{this.defaultAction();}};UrNavigation.prototype.getCurrent=function(){return this.current;};var UrSession=function(a){if(a==undefined){a={};}UrObject.call(this,"UrSession",a.name);this.endKeyword;this.endCallback;this.session={};this.set(a.session);this.setEndKeyword(a.endKeyword);this.setEndCallback(a.endCallback);};UrSession.prototype=new UrObject();UrSession.prototype.constructor=UrSession;UrSession.prototype.setEndKeyword=function(a){this.endKeyword=a;};UrSession.prototype.getEndKeyword=function(){return this.endKeyword;};UrSession.prototype.setEndCallback=function(a){this.endCallback=a;if(this.endCallback==undefined){this.endCallback=function(){};}};UrSession.prototype.isStop=function(a){if(a==this.endKeyword){this.endCallback();
return true;}else{return false;}};UrSession.prototype.set=function(a){this.session=a;if(this.session==undefined){this.session={};}};UrSession.prototype.get=function(){return this.session;};UrSession.prototype.setKey=function(a,b){this.session[a]=b;};UrSession.prototype.getValue=function(a){return this.session[a];};UrSession.prototype.removeKey=function(a){delete this.session[a];};UrSession.prototype.clear=function(){this.session={};};var UrValidatorEmail=function(a){if(a==undefined){a={};}a["pattern"]="^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$";a["modifiers"]="i";a["type"]="UrValidatorEmail";UrValidatorRegExp.call(this,a);};UrValidatorEmail.prototype=new UrValidatorRegExp();UrValidatorEmail.prototype.constructor=UrValidatorEmail;UrValidatorEmail.prototype.validate=function(a){return UrValidatorRegExp.prototype.validate.call(this,a);};var UrValidatorURL=function(a){if(a==undefined){a={};}a["pattern"]="(^|s)((https?://)?[w-]+(.[w-]+)+.?(:\d+)?(/S*)?)";a["modifiers"]="i";a["type"]="UrValidatorURL";UrValidatorRegExp.call(this,a);};UrValidatorURL.prototype=new UrValidatorRegExp();UrValidatorURL.prototype.constructor=UrValidatorURL;UrValidatorURL.prototype.validate=function(a){return UrValidatorRegExp.prototype.validate.call(this,a);};var UrCustomInput=function(c,b){if(b==undefined){b={};}b.element=document.createElement("input");var a=new UrString(c);UrInput.call(this,b,"Ur"+a.capitalize());this.inputType=this.element.type=c;};UrCustomInput.prototype=new UrInput();UrCustomInput.prototype.constructor=UrCustomInput;var UrCustomWidget=function(c,b){if(b==undefined){b={};}b.element=document.createElement(c);var a=new UrString(c);UrWidget.call(this,b,"Ur"+a.capitalize());};UrCustomWidget.prototype=new UrWidget();UrCustomWidget.prototype.constructor=UrCustomWidget;var UrDataTable=function(a){head=function(){b.head=new UrCustomWidget("thead",{"parent":b});var e=new UrCustomWidget("tr",{"parent":b.head});for(var c in b.description){if(b.description[c]["hide"]==undefined){var d=new UrCustomWidget("th",{"parent":e,"html":b.description[c]["title"]});
}}};var b=this;if(a==undefined){a={};}this.head;this.body;this.lines=[];this.description=a.description;if(a.datas!=undefined&&a.datas instanceof Array&&a.datas.length>0){a.element=document.createElement("table");UrWidget.call(this,a,"UrDataTable");head();this.body=new UrCustomWidget("tbody",{"parent":this});this.add(a.datas);}};UrDataTable.prototype=new UrWidget();UrDataTable.prototype.constructor=UrDataTable;UrDataTable.prototype.add=function(a){for(var d in a){var e=new UrCustomWidget("tr",{"parent":this.body});this.lines.push(e);for(var c in this.description){var h=new UrCustomWidget("td",{"parent":e,"html":a[d][c]});if(this.description[c]["improve"]!=undefined){var g={"parent":h,"index":d};for(var b=0;b<this.description[c]["params"].length;b++){var f=this.description[c]["params"][b];if(this.description[f]!=undefined){g[f]=a[d][f];}else{g[f]=f;}}(function(k,l){var j=l[c]["improve"];j(k);}(g,this.description));}}}};UrDataTable.prototype.getHead=function(){return this.head;};UrDataTable.prototype.getBody=function(){return this.body;};UrDataTable.prototype.getLines=function(){return this.lines;};var UrForm=function(a){if(a==undefined){a={};}a.element=document.createElement("form");this.method;this.action;this.enctype;this.formElement={};UrWidget.call(this,a,"UrForm");this.setMethod(a.method);this.setAction(a.action);this.setEnctype(a.enctype);};UrForm.prototype=new UrWidget();UrForm.prototype.constructor=UrForm;UrForm.prototype.add=function(a,b){if(b==undefined){this.addChild(a);}else{b.addChild(a);}this.formElement[a.getName()]=a;};UrForm.prototype.setMethod=function(a){this.method=a;if(this.method!=undefined){this.element.setAttribute("method",this.method);}};UrForm.prototype.setAction=function(a){this.action=a;if(this.action!=undefined){this.element.setAttribute("action",this.action);}};UrForm.prototype.setEnctype=function(a){this.enctype=a;if(this.enctype!=undefined){this.element.setAttribute("enctype",this.enctype);}};UrForm.prototype.getFormElement=function(){return this.formElement;
};UrForm.prototype.serialize=function(){var a={};for(i in this.formElement){a[i]=this.formElement[i].getValue();}return a;};UrForm.prototype.submit=function(a){this.element.onsubmit=a;};var UrFragment=function(a){var b={};b.name=a;b.element=document.createDocumentFragment();UrWidget.call(this,b,"UrFragment");};UrFragment.prototype=new UrWidget();UrFragment.prototype.constructor=UrFragment;var UrImage=function(a){if(a==undefined){a={};}a.element=document.createElement("img");this.src;this.alt;this.width;this.height;UrDom.call(this,"UrImage",a);this.setSrc(a.src);this.setAlt(a.alt);this.setWidth(a.width);this.setHeight(a.height);};UrImage.prototype=new UrDom();UrImage.prototype.constructor=UrImage;UrImage.prototype.setSrc=function(a){this.src=a;if(this.src!=undefined){this.element.src=this.src;}};UrImage.prototype.setAlt=function(a){this.alt=a;if(this.alt!=undefined){this.element.alt=this.alt;}};UrImage.prototype.setWidth=function(a){this.width=a;if(this.width!=undefined){this.element.width=this.width;}};UrImage.prototype.setHeight=function(a){this.height=a;if(this.height!=undefined){this.element.height=this.height;}};var UrInputText=function(a){if(a==undefined){a={};}a.element=document.createElement("input");UrInput.call(this,a,"UrInputText");this.inputType=this.element.type="text";};UrInputText.prototype=new UrInput();UrInputText.prototype.constructor=UrInputText;var UrLabel=function(a){if(a==undefined){a={};}a.element=document.createElement("label");this.htmlFor;UrWidget.call(this,a,"UrLabel");this.setHtmlFor(a.htmlFor);};UrLabel.prototype=new UrWidget();UrLabel.prototype.constructor=UrLabel;UrLabel.prototype.setHtmlFor=function(a){this.htmlFor=a;if(this.htmlFor!=undefined){this.element.htmlFor=this.htmlFor;}};UrLabel.prototype.getHtmlFor=function(){return this.htmlFor;};var UrLine=function(b){if(b==undefined){b={};}this.parts=[];UrWidget.call(this,b,"UrLine");for(var a=0;a<b.partsNumber;a++){this.parts.push(new UrWidget({"parent":this,"className":b.partsClassName,"style":b.partsStyle}));
}};UrLine.prototype=new UrWidget();UrLine.prototype.constructor=UrLine;UrLine.prototype.getPart=function(a){return this.parts[a];};var UrLink=function(a){if(a==undefined){a={};}a.element=document.createElement("a");this.href;this.target;UrWidget.call(this,a,"UrLink");this.setHref(a.href);this.setTarget(a.target);};UrLink.prototype=new UrWidget();UrLink.prototype.constructor=UrLink;UrLink.prototype.setHref=function(a){this.href=a;if(this.href!=undefined){this.element.href=this.href;}};UrLink.prototype.setTarget=function(a){this.target=a;if(this.target!=undefined){this.element.setAttribute("target",this.target);}};UrLink.prototype.getHref=function(){return this.href;};UrLink.prototype.getTarget=function(){return this.target;};var UrNotification=function(a){var b=this;if(a==undefined){a={};}if(a.style==undefined){a.style={"float":"right","margin":"15px","border":"2px solid white","color":"white"};}this.type;this.time;this.title;this.text;this.header;this.closeWidget;this.hoverState=false;UrWidget.call(this,a,"UrNotification");this.setType(a.type);this.setTime(a.time);this.header=new UrWidget({"parent":this});this.setCloseWidget(a.close);this.setTitle(a.title);this.setText(a.text);this.mouseIn(function(){b.hoverState=true;});this.mouseLeave(function(){b.hoverState=false;b.remove();});setTimeout(function(){try{if(b.hoverState==false){b.remove();}}catch(c){}},b.time);};UrNotification.prototype=new UrWidget();UrNotification.prototype.constructor=UrNotification;UrNotification.prototype.setType=function(a){this.type=a||"default";if(this.type=="default"){this.getStyle().set("background","#eaeaea");this.getStyle().set("color","black");}if(this.type=="info"){this.getStyle().set("background","#50b6d4");}if(this.type=="success"){this.getStyle().set("background","#55ab55");}if(this.type=="warn"){this.getStyle().set("background","#fbaf44");}if(this.type=="error"){this.getStyle().set("background","#ca403a");}if(this.type=="inverse"){this.getStyle().set("background","#3c3c3c");}};UrNotification.prototype.setTime=function(a){this.time=a||3000;
};UrNotification.prototype.setTitle=function(a){if(this.title!=undefined){this.title.remove();}this.title=a;if(this.title!=undefined){this.addChild(this.title);}};UrNotification.prototype.setText=function(a){if(this.text!=undefined){this.text.remove();}this.text=a;if(this.text!=undefined){this.addChild(this.text);}};UrNotification.prototype.setCloseWidget=function(a){var b=this;if(this.closeWidget!=undefined){this.closeWidget.remove();}this.closeWidget=a;if(this.closeWidget==undefined){this.closeWidget=new UrWidget({"html":"x","style":{"margin":"0 5px 0 5px","float":"right","font-weight":"bold","cursor":"pointer"}});}this.closeWidget.click(function(){b.remove();});this.addChild(this.closeWidget);};var UrPopup=function(b){if(b==undefined){b={};}if(b.style==undefined){b.style={"position":"absolute","left":"50%","top":"150px","background":"white","width":"600px","margin-left":"-300px"};}var a=document.getElementsByTagName("body")[0];this.body=new UrWidget({"element":a});b.parent=this.body;this.bg;this.closeWidgetContainer;this.closeWidget;this.content;this.setBg();UrWidget.call(this,b,"UrPopup");this.setCloseWidget(b.closeWidget);this.setModal(b.modal);this.setContent(b.content);};UrPopup.prototype=new UrWidget();UrPopup.prototype.constructor=UrPopup;UrPopup.prototype.setBg=function(){if(this.bg!=undefined){this.bg.remove();}this.bg=new UrWidget({"parent":this.body,"style":{"background":"black","position":"fixed","top":0,"left":0,"width":"2000px","height":"2000px"}});};UrPopup.prototype.getBg=function(){return this.bg;};UrPopup.prototype.setCloseWidget=function(b){var a=this;if(this.closeWidgetContainer!=undefined){this.closeWidgetContainer.remove();}this.closeWidget=b;if(this.closeWidget!=undefined){this.closeWidgetContainer=new UrWidget({"parent":this});this.closeWidgetContainer.addChild(this.closeWidget);this.closeWidgetContainer.addChild(new UrWidget({"parent":this.closeWidgetContainer,"style":{"clear":"both"}}));this.closeWidget.click(function(){a.bg.remove();a.remove();
});}};UrPopup.prototype.setModal=function(b){var a=this;if(b==true){if(this.closeWidget!=undefined){this.closeWidget.remove();}if(this.bg!=undefined){this.bg.click(function(){});}}else{if(this.bg!=undefined){this.bg.click(function(){a.bg.remove();a.remove();});}}};UrPopup.prototype.setContent=function(a){if(this.content!=undefined){this.content.remove();}this.content=a;if(this.content!=undefined){this.addChild(this.content);}};UrPopup.prototype.close=function(){this.bg.remove();this.remove();};var UrProgressBar=function(a){if(a==undefined){a={};}if(a.style==undefined){a.style={"background":"white","height":"5px","width":"0%","position":"fixed","top":"0","left":"0","z-index":"10000"};}this.width=0;this.currentVal=0;this.interval;this.speed;UrWidget.call(this,a,"UrProgressBar");this.setSpeed(a.speed);};UrProgressBar.prototype=new UrWidget();UrProgressBar.prototype.constructor=UrProgressBar;UrProgressBar.prototype.setSpeed=function(a){this.speed=a;if(this.speed==undefined){this.speed=400;}};UrProgressBar.prototype.less=function(c,d){if(this.interval!=undefined){clearInterval(this.interval);this.set(this.currentVal);}this.currentVal=this.width-c;var b=this.speed/c;var a=this;this.interval=setInterval(function(){a.width-=1;a.getStyle().set("width",a.width+"%");if(a.width==a.currentVal){clearInterval(a.interval);a.interval=undefined;if(d!=undefined){d();}}},b);};UrProgressBar.prototype.more=function(c,d){if(this.interval!=undefined){clearInterval(this.interval);this.set(this.currentVal);}this.currentVal=this.width+c;var b=this.speed/c;var a=this;this.interval=setInterval(function(){a.width+=1;a.getStyle().set("width",a.width+"%");if(a.width==a.currentVal||a.width==100){clearInterval(a.interval);a.interval=undefined;if(d!=undefined){d();}}},b);};UrProgressBar.prototype.set=function(a){this.currentVal=this.width=a;this.getStyle().set("width",this.width+"%");};UrProgressBar.prototype.done=function(c){var b=100-this.width;var a=this;this.more(b,function(){a.remove();if(c!=undefined){c();
}});};var UrTable=function(a){head=function(){if(a.head!=undefined){b.head=new UrCustomWidget("thead",{"parent":b});var e=new UrCustomWidget("tr",{"parent":b.head});for(var c=0;c<a.head.length;c++){var d=new UrCustomWidget("th",{"parent":e,"html":a.head[c]});}}};var b=this;if(a==undefined){a={};}this.head;this.body;this.lines=[];this.setColumnNumber(a.columnNumber);a.element=document.createElement("table");UrWidget.call(this,a,"UrTable");head();this.body=new UrCustomWidget("tbody",{"parent":this});};UrTable.prototype=new UrWidget();UrTable.prototype.constructor=UrTable;UrTable.prototype.setColumnNumber=function(a){this.columnNumber=0;if(a!=undefined){this.columnNumber=a;}};UrTable.prototype.add=function(){var b=new UrCustomWidget("tr",{"parent":this.body});this.lines.push(b);for(var a=0;a<this.columnNumber;a++){new UrCustomWidget("td",{"parent":b});}return b;};UrTable.prototype.getHead=function(){return this.head;};UrTable.prototype.getBody=function(){return this.body;};UrTable.prototype.getLines=function(){return this.lines;};var UrTextarea=function(a){if(a==undefined){a={};}a.element=document.createElement("textarea");this.row;this.cols;UrInput.call(this,a,"UrTextarea");this.setRows(a.rows);this.setCols(a.cols);};UrTextarea.prototype=new UrInput();UrTextarea.prototype.constructor=UrTextarea;UrTextarea.prototype.setRows=function(a){this.rows=a;if(this.rows!=undefined){this.element.rows=this.rows;}};UrTextarea.prototype.setCols=function(a){this.cols=a;if(this.cols!=undefined){this.element.cols=this.cols;}};
