ATUtil = {
	randomRange : function(min, max) {
		return min + Math.random() * (max - min);
	},
	randomInt : function(min,max){
		return Math.floor(min + Math.random() * (max - min + 1));
	},
	map : function(value, min1, max1, min2, max2) {
		return ATUtil.lerp(min2, max2, ATUtil.norm(value, min1, max1));
	},
	lerp : function(amt, min, max){
		return min + (max -min) * amt;
	},
	norm : function(value , min, max){
		return (value - min) / (max - min);
	},
	shuffle : function(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
};
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 20` Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var dat=dat||{};dat.gui=dat.gui||{};dat.utils=dat.utils||{};dat.controllers=dat.controllers||{};dat.dom=dat.dom||{};dat.color=dat.color||{};dat.utils.css=function(){return{load:function(e,a){var a=a||document,c=a.createElement("link");c.type="text/css";c.rel="stylesheet";c.href=e;a.getElementsByTagName("head")[0].appendChild(c)},inject:function(e,a){var a=a||document,c=document.createElement("style");c.type="text/css";c.innerHTML=e;a.getElementsByTagName("head")[0].appendChild(c)}}}();
dat.utils.common=function(){var e=Array.prototype.forEach,a=Array.prototype.slice;return{BREAK:{},extend:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(a[f])||(c[f]=a[f])},this);return c},defaults:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(c[f])&&(c[f]=a[f])},this);return c},compose:function(){var c=a.call(arguments);return function(){for(var d=a.call(arguments),f=c.length-1;f>=0;f--)d=[c[f].apply(this,d)];return d[0]}},
each:function(a,d,f){if(e&&a.forEach===e)a.forEach(d,f);else if(a.length===a.length+0)for(var b=0,n=a.length;b<n;b++){if(b in a&&d.call(f,a[b],b)===this.BREAK)break}else for(b in a)if(d.call(f,a[b],b)===this.BREAK)break},defer:function(a){setTimeout(a,0)},toArray:function(c){return c.toArray?c.toArray():a.call(c)},isUndefined:function(a){return a===void 0},isNull:function(a){return a===null},isNaN:function(a){return a!==a},isArray:Array.isArray||function(a){return a.constructor===Array},isObject:function(a){return a===
Object(a)},isNumber:function(a){return a===a+0},isString:function(a){return a===a+""},isBoolean:function(a){return a===false||a===true},isFunction:function(a){return Object.prototype.toString.call(a)==="[object Function]"}}}();
dat.controllers.Controller=function(e){var a=function(a,d){this.initialValue=a[d];this.domElement=document.createElement("div");this.object=a;this.property=d;this.__onFinishChange=this.__onChange=void 0};e.extend(a.prototype,{onChange:function(a){this.__onChange=a;return this},onFinishChange:function(a){this.__onFinishChange=a;return this},setValue:function(a){this.object[this.property]=a;this.__onChange&&this.__onChange.call(this,a);this.updateDisplay();return this},getValue:function(){return this.object[this.property]},
updateDisplay:function(){return this},isModified:function(){return this.initialValue!==this.getValue()}});return a}(dat.utils.common);
dat.dom.dom=function(e){function a(b){if(b==="0"||e.isUndefined(b))return 0;b=b.match(d);return!e.isNull(b)?parseFloat(b[1]):0}var c={};e.each({HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},function(b,a){e.each(b,function(b){c[b]=a})});var d=/(\d+(\.\d+)?)px/,f={makeSelectable:function(b,a){if(!(b===void 0||b.style===void 0))b.onselectstart=a?function(){return false}:function(){},b.style.MozUserSelect=a?"auto":"none",b.style.KhtmlUserSelect=
a?"auto":"none",b.unselectable=a?"on":"off"},makeFullscreen:function(b,a,d){e.isUndefined(a)&&(a=true);e.isUndefined(d)&&(d=true);b.style.position="absolute";if(a)b.style.left=0,b.style.right=0;if(d)b.style.top=0,b.style.bottom=0},fakeEvent:function(b,a,d,f){var d=d||{},m=c[a];if(!m)throw Error("Event type "+a+" not supported.");var l=document.createEvent(m);switch(m){case "MouseEvents":l.initMouseEvent(a,d.bubbles||false,d.cancelable||true,window,d.clickCount||1,0,0,d.x||d.clientX||0,d.y||d.clientY||
0,false,false,false,false,0,null);break;case "KeyboardEvents":m=l.initKeyboardEvent||l.initKeyEvent;e.defaults(d,{cancelable:true,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false,keyCode:void 0,charCode:void 0});m(a,d.bubbles||false,d.cancelable,window,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.keyCode,d.charCode);break;default:l.initEvent(a,d.bubbles||false,d.cancelable||true)}e.defaults(l,f);b.dispatchEvent(l)},bind:function(b,a,d,c){b.addEventListener?b.addEventListener(a,d,c||false):b.attachEvent&&
b.attachEvent("on"+a,d);return f},unbind:function(b,a,d,c){b.removeEventListener?b.removeEventListener(a,d,c||false):b.detachEvent&&b.detachEvent("on"+a,d);return f},addClass:function(b,a){if(b.className===void 0)b.className=a;else if(b.className!==a){var d=b.className.split(/ +/);if(d.indexOf(a)==-1)d.push(a),b.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")}return f},removeClass:function(b,a){if(a){if(b.className!==void 0)if(b.className===a)b.removeAttribute("class");else{var d=b.className.split(/ +/),
c=d.indexOf(a);if(c!=-1)d.splice(c,1),b.className=d.join(" ")}}else b.className=void 0;return f},hasClass:function(a,d){return RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)").test(a.className)||false},getWidth:function(b){b=getComputedStyle(b);return a(b["border-left-width"])+a(b["border-right-width"])+a(b["padding-left"])+a(b["padding-right"])+a(b.width)},getHeight:function(b){b=getComputedStyle(b);return a(b["border-top-width"])+a(b["border-bottom-width"])+a(b["padding-top"])+a(b["padding-bottom"])+a(b.height)},
getOffset:function(a){var d={left:0,top:0};if(a.offsetParent){do d.left+=a.offsetLeft,d.top+=a.offsetTop;while(a=a.offsetParent)}return d},isActive:function(a){return a===document.activeElement&&(a.type||a.href)}};return f}(dat.utils.common);
dat.controllers.OptionController=function(e,a,c){var d=function(f,b,e){d.superclass.call(this,f,b);var h=this;this.__select=document.createElement("select");if(c.isArray(e)){var j={};c.each(e,function(a){j[a]=a});e=j}c.each(e,function(a,b){var d=document.createElement("option");d.innerHTML=b;d.setAttribute("value",a);h.__select.appendChild(d)});this.updateDisplay();a.bind(this.__select,"change",function(){h.setValue(this.options[this.selectedIndex].value)});this.domElement.appendChild(this.__select)};
d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue());return a},updateDisplay:function(){this.__select.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.NumberController=function(e,a){var c=function(d,f,b){c.superclass.call(this,d,f);b=b||{};this.__min=b.min;this.__max=b.max;this.__step=b.step;d=this.__impliedStep=a.isUndefined(this.__step)?this.initialValue==0?1:Math.pow(10,Math.floor(Math.log(this.initialValue)/Math.LN10))/10:this.__step;d=d.toString();this.__precision=d.indexOf(".")>-1?d.length-d.indexOf(".")-1:0};c.superclass=e;a.extend(c.prototype,e.prototype,{setValue:function(a){if(this.__min!==void 0&&a<this.__min)a=this.__min;
else if(this.__max!==void 0&&a>this.__max)a=this.__max;this.__step!==void 0&&a%this.__step!=0&&(a=Math.round(a/this.__step)*this.__step);return c.superclass.prototype.setValue.call(this,a)},min:function(a){this.__min=a;return this},max:function(a){this.__max=a;return this},step:function(a){this.__step=a;return this}});return c}(dat.controllers.Controller,dat.utils.common);
dat.controllers.NumberControllerBox=function(e,a,c){var d=function(f,b,e){function h(){var a=parseFloat(l.__input.value);c.isNaN(a)||l.setValue(a)}function j(a){var b=o-a.clientY;l.setValue(l.getValue()+b*l.__impliedStep);o=a.clientY}function m(){a.unbind(window,"mousemove",j);a.unbind(window,"mouseup",m)}this.__truncationSuspended=false;d.superclass.call(this,f,b,e);var l=this,o;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"change",h);
a.bind(this.__input,"blur",function(){h();l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())});a.bind(this.__input,"mousedown",function(b){a.bind(window,"mousemove",j);a.bind(window,"mouseup",m);o=b.clientY});a.bind(this.__input,"keydown",function(a){if(a.keyCode===13)l.__truncationSuspended=true,this.blur(),l.__truncationSuspended=false});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,e.prototype,{updateDisplay:function(){var a=this.__input,
b;if(this.__truncationSuspended)b=this.getValue();else{b=this.getValue();var c=Math.pow(10,this.__precision);b=Math.round(b*c)/c}a.value=b;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.NumberController,dat.dom.dom,dat.utils.common);
dat.controllers.NumberControllerSlider=function(e,a,c,d,f){var b=function(d,c,f,e,l){function o(b){b.preventDefault();var d=a.getOffset(g.__background),c=a.getWidth(g.__background);g.setValue(g.__min+(g.__max-g.__min)*((b.clientX-d.left)/(d.left+c-d.left)));return false}function y(){a.unbind(window,"mousemove",o);a.unbind(window,"mouseup",y);g.__onFinishChange&&g.__onFinishChange.call(g,g.getValue())}b.superclass.call(this,d,c,{min:f,max:e,step:l});var g=this;this.__background=document.createElement("div");
this.__foreground=document.createElement("div");a.bind(this.__background,"mousedown",function(b){a.bind(window,"mousemove",o);a.bind(window,"mouseup",y);o(b)});a.addClass(this.__background,"slider");a.addClass(this.__foreground,"slider-fg");this.updateDisplay();this.__background.appendChild(this.__foreground);this.domElement.appendChild(this.__background)};b.superclass=e;b.useDefaultStyles=function(){c.inject(f)};d.extend(b.prototype,e.prototype,{updateDisplay:function(){this.__foreground.style.width=
(this.getValue()-this.__min)/(this.__max-this.__min)*100+"%";return b.superclass.prototype.updateDisplay.call(this)}});return b}(dat.controllers.NumberController,dat.dom.dom,dat.utils.css,dat.utils.common,".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
dat.controllers.FunctionController=function(e,a,c){var d=function(c,b,e){d.superclass.call(this,c,b);var h=this;this.__button=document.createElement("div");this.__button.innerHTML=e===void 0?"Fire":e;a.bind(this.__button,"click",function(a){a.preventDefault();h.fire();return false});a.addClass(this.__button,"button");this.domElement.appendChild(this.__button)};d.superclass=e;c.extend(d.prototype,e.prototype,{fire:function(){this.__onChange&&this.__onChange.call(this);this.__onFinishChange&&this.__onFinishChange.call(this,
this.getValue());this.getValue().call(this.object)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.BooleanController=function(e,a,c){var d=function(c,b){d.superclass.call(this,c,b);var e=this;this.__prev=this.getValue();this.__checkbox=document.createElement("input");this.__checkbox.setAttribute("type","checkbox");a.bind(this.__checkbox,"change",function(){e.setValue(!e.__prev)},false);this.domElement.appendChild(this.__checkbox);this.updateDisplay()};d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&
this.__onFinishChange.call(this,this.getValue());this.__prev=this.getValue();return a},updateDisplay:function(){this.getValue()===true?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=true):this.__checkbox.checked=false;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.color.toString=function(e){return function(a){if(a.a==1||e.isUndefined(a.a)){for(a=a.hex.toString(16);a.length<6;)a="0"+a;return"#"+a}else return"rgba("+Math.round(a.r)+","+Math.round(a.g)+","+Math.round(a.b)+","+a.a+")"}}(dat.utils.common);
dat.color.interpret=function(e,a){var c,d,f=[{litmus:a.isString,conversions:{THREE_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString()+a[1].toString()+a[2].toString()+a[2].toString()+a[3].toString()+a[3].toString())}},write:e},SIX_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9]{6})$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString())}},write:e},CSS_RGB:{read:function(a){a=a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3])}},write:e},CSS_RGBA:{read:function(a){a=a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3]),a:parseFloat(a[4])}},write:e}}},{litmus:a.isNumber,conversions:{HEX:{read:function(a){return{space:"HEX",hex:a,conversionName:"HEX"}},write:function(a){return a.hex}}}},{litmus:a.isArray,conversions:{RGB_ARRAY:{read:function(a){return a.length!=
3?false:{space:"RGB",r:a[0],g:a[1],b:a[2]}},write:function(a){return[a.r,a.g,a.b]}},RGBA_ARRAY:{read:function(a){return a.length!=4?false:{space:"RGB",r:a[0],g:a[1],b:a[2],a:a[3]}},write:function(a){return[a.r,a.g,a.b,a.a]}}}},{litmus:a.isObject,conversions:{RGBA_OBJ:{read:function(b){return a.isNumber(b.r)&&a.isNumber(b.g)&&a.isNumber(b.b)&&a.isNumber(b.a)?{space:"RGB",r:b.r,g:b.g,b:b.b,a:b.a}:false},write:function(a){return{r:a.r,g:a.g,b:a.b,a:a.a}}},RGB_OBJ:{read:function(b){return a.isNumber(b.r)&&
a.isNumber(b.g)&&a.isNumber(b.b)?{space:"RGB",r:b.r,g:b.g,b:b.b}:false},write:function(a){return{r:a.r,g:a.g,b:a.b}}},HSVA_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)&&a.isNumber(b.a)?{space:"HSV",h:b.h,s:b.s,v:b.v,a:b.a}:false},write:function(a){return{h:a.h,s:a.s,v:a.v,a:a.a}}},HSV_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)?{space:"HSV",h:b.h,s:b.s,v:b.v}:false},write:function(a){return{h:a.h,s:a.s,v:a.v}}}}}];return function(){d=
false;var b=arguments.length>1?a.toArray(arguments):arguments[0];a.each(f,function(e){if(e.litmus(b))return a.each(e.conversions,function(e,f){c=e.read(b);if(d===false&&c!==false)return d=c,c.conversionName=f,c.conversion=e,a.BREAK}),a.BREAK});return d}}(dat.color.toString,dat.utils.common);
dat.GUI=dat.gui.GUI=function(e,a,c,d,f,b,n,h,j,m,l,o,y,g,i){function q(a,b,r,c){if(b[r]===void 0)throw Error("Object "+b+' has no property "'+r+'"');c.color?b=new l(b,r):(b=[b,r].concat(c.factoryArgs),b=d.apply(a,b));if(c.before instanceof f)c.before=c.before.__li;t(a,b);g.addClass(b.domElement,"c");r=document.createElement("span");g.addClass(r,"property-name");r.innerHTML=b.property;var e=document.createElement("div");e.appendChild(r);e.appendChild(b.domElement);c=s(a,e,c.before);g.addClass(c,k.CLASS_CONTROLLER_ROW);
g.addClass(c,typeof b.getValue());p(a,c,b);a.__controllers.push(b);return b}function s(a,b,d){var c=document.createElement("li");b&&c.appendChild(b);d?a.__ul.insertBefore(c,params.before):a.__ul.appendChild(c);a.onResize();return c}function p(a,d,c){c.__li=d;c.__gui=a;i.extend(c,{options:function(b){if(arguments.length>1)return c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[i.toArray(arguments)]});if(i.isArray(b)||i.isObject(b))return c.remove(),q(a,c.object,c.property,
{before:c.__li.nextElementSibling,factoryArgs:[b]})},name:function(a){c.__li.firstElementChild.firstElementChild.innerHTML=a;return c},listen:function(){c.__gui.listen(c);return c},remove:function(){c.__gui.remove(c);return c}});if(c instanceof j){var e=new h(c.object,c.property,{min:c.__min,max:c.__max,step:c.__step});i.each(["updateDisplay","onChange","onFinishChange"],function(a){var b=c[a],H=e[a];c[a]=e[a]=function(){var a=Array.prototype.slice.call(arguments);b.apply(c,a);return H.apply(e,a)}});
g.addClass(d,"has-slider");c.domElement.insertBefore(e.domElement,c.domElement.firstElementChild)}else if(c instanceof h){var f=function(b){return i.isNumber(c.__min)&&i.isNumber(c.__max)?(c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[c.__min,c.__max,c.__step]})):b};c.min=i.compose(f,c.min);c.max=i.compose(f,c.max)}else if(c instanceof b)g.bind(d,"click",function(){g.fakeEvent(c.__checkbox,"click")}),g.bind(c.__checkbox,"click",function(a){a.stopPropagation()});
else if(c instanceof n)g.bind(d,"click",function(){g.fakeEvent(c.__button,"click")}),g.bind(d,"mouseover",function(){g.addClass(c.__button,"hover")}),g.bind(d,"mouseout",function(){g.removeClass(c.__button,"hover")});else if(c instanceof l)g.addClass(d,"color"),c.updateDisplay=i.compose(function(a){d.style.borderLeftColor=c.__color.toString();return a},c.updateDisplay),c.updateDisplay();c.setValue=i.compose(function(b){a.getRoot().__preset_select&&c.isModified()&&B(a.getRoot(),true);return b},c.setValue)}
function t(a,b){var c=a.getRoot(),d=c.__rememberedObjects.indexOf(b.object);if(d!=-1){var e=c.__rememberedObjectIndecesToControllers[d];e===void 0&&(e={},c.__rememberedObjectIndecesToControllers[d]=e);e[b.property]=b;if(c.load&&c.load.remembered){c=c.load.remembered;if(c[a.preset])c=c[a.preset];else if(c[w])c=c[w];else return;if(c[d]&&c[d][b.property]!==void 0)d=c[d][b.property],b.initialValue=d,b.setValue(d)}}}function I(a){var b=a.__save_row=document.createElement("li");g.addClass(a.domElement,
"has-save");a.__ul.insertBefore(b,a.__ul.firstChild);g.addClass(b,"save-row");var c=document.createElement("span");c.innerHTML="&nbsp;";g.addClass(c,"button gears");var d=document.createElement("span");d.innerHTML="Save";g.addClass(d,"button");g.addClass(d,"save");var e=document.createElement("span");e.innerHTML="New";g.addClass(e,"button");g.addClass(e,"save-as");var f=document.createElement("span");f.innerHTML="Revert";g.addClass(f,"button");g.addClass(f,"revert");var m=a.__preset_select=document.createElement("select");
a.load&&a.load.remembered?i.each(a.load.remembered,function(b,c){C(a,c,c==a.preset)}):C(a,w,false);g.bind(m,"change",function(){for(var b=0;b<a.__preset_select.length;b++)a.__preset_select[b].innerHTML=a.__preset_select[b].value;a.preset=this.value});b.appendChild(m);b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);if(u){var b=document.getElementById("dg-save-locally"),l=document.getElementById("dg-local-explain");b.style.display="block";b=document.getElementById("dg-local-storage");
localStorage.getItem(document.location.href+".isLocal")==="true"&&b.setAttribute("checked","checked");var o=function(){l.style.display=a.useLocalStorage?"block":"none"};o();g.bind(b,"change",function(){a.useLocalStorage=!a.useLocalStorage;o()})}var h=document.getElementById("dg-new-constructor");g.bind(h,"keydown",function(a){a.metaKey&&(a.which===67||a.keyCode==67)&&x.hide()});g.bind(c,"click",function(){h.innerHTML=JSON.stringify(a.getSaveObject(),void 0,2);x.show();h.focus();h.select()});g.bind(d,
"click",function(){a.save()});g.bind(e,"click",function(){var b=prompt("Enter a new preset name.");b&&a.saveAs(b)});g.bind(f,"click",function(){a.revert()})}function J(a){function b(f){f.preventDefault();e=f.clientX;g.addClass(a.__closeButton,k.CLASS_DRAG);g.bind(window,"mousemove",c);g.bind(window,"mouseup",d);return false}function c(b){b.preventDefault();a.width+=e-b.clientX;a.onResize();e=b.clientX;return false}function d(){g.removeClass(a.__closeButton,k.CLASS_DRAG);g.unbind(window,"mousemove",
c);g.unbind(window,"mouseup",d)}a.__resize_handle=document.createElement("div");i.extend(a.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});var e;g.bind(a.__resize_handle,"mousedown",b);g.bind(a.__closeButton,"mousedown",b);a.domElement.insertBefore(a.__resize_handle,a.domElement.firstElementChild)}function D(a,b){a.domElement.style.width=b+"px";if(a.__save_row&&a.autoPlace)a.__save_row.style.width=b+"px";if(a.__closeButton)a.__closeButton.style.width=
b+"px"}function z(a,b){var c={};i.each(a.__rememberedObjects,function(d,e){var f={};i.each(a.__rememberedObjectIndecesToControllers[e],function(a,c){f[c]=b?a.initialValue:a.getValue()});c[e]=f});return c}function C(a,b,c){var d=document.createElement("option");d.innerHTML=b;d.value=b;a.__preset_select.appendChild(d);if(c)a.__preset_select.selectedIndex=a.__preset_select.length-1}function B(a,b){var c=a.__preset_select[a.__preset_select.selectedIndex];c.innerHTML=b?c.value+"*":c.value}function E(a){a.length!=
0&&o(function(){E(a)});i.each(a,function(a){a.updateDisplay()})}e.inject(c);var w="Default",u;try{u="localStorage"in window&&window.localStorage!==null}catch(K){u=false}var x,F=true,v,A=false,G=[],k=function(a){function b(){localStorage.setItem(document.location.href+".gui",JSON.stringify(d.getSaveObject()))}function c(){var a=d.getRoot();a.width+=1;i.defer(function(){a.width-=1})}var d=this;this.domElement=document.createElement("div");this.__ul=document.createElement("ul");this.domElement.appendChild(this.__ul);
g.addClass(this.domElement,"dg");this.__folders={};this.__controllers=[];this.__rememberedObjects=[];this.__rememberedObjectIndecesToControllers=[];this.__listening=[];a=a||{};a=i.defaults(a,{autoPlace:true,width:k.DEFAULT_WIDTH});a=i.defaults(a,{resizable:a.autoPlace,hideable:a.autoPlace});if(i.isUndefined(a.load))a.load={preset:w};else if(a.preset)a.load.preset=a.preset;i.isUndefined(a.parent)&&a.hideable&&G.push(this);a.resizable=i.isUndefined(a.parent)&&a.resizable;if(a.autoPlace&&i.isUndefined(a.scrollable))a.scrollable=
true;var e=u&&localStorage.getItem(document.location.href+".isLocal")==="true";Object.defineProperties(this,{parent:{get:function(){return a.parent}},scrollable:{get:function(){return a.scrollable}},autoPlace:{get:function(){return a.autoPlace}},preset:{get:function(){return d.parent?d.getRoot().preset:a.load.preset},set:function(b){d.parent?d.getRoot().preset=b:a.load.preset=b;for(b=0;b<this.__preset_select.length;b++)if(this.__preset_select[b].value==this.preset)this.__preset_select.selectedIndex=
b;d.revert()}},width:{get:function(){return a.width},set:function(b){a.width=b;D(d,b)}},name:{get:function(){return a.name},set:function(b){a.name=b;if(m)m.innerHTML=a.name}},closed:{get:function(){return a.closed},set:function(b){a.closed=b;a.closed?g.addClass(d.__ul,k.CLASS_CLOSED):g.removeClass(d.__ul,k.CLASS_CLOSED);this.onResize();if(d.__closeButton)d.__closeButton.innerHTML=b?k.TEXT_OPEN:k.TEXT_CLOSED}},load:{get:function(){return a.load}},useLocalStorage:{get:function(){return e},set:function(a){u&&
((e=a)?g.bind(window,"unload",b):g.unbind(window,"unload",b),localStorage.setItem(document.location.href+".isLocal",a))}}});if(i.isUndefined(a.parent)){a.closed=false;g.addClass(this.domElement,k.CLASS_MAIN);g.makeSelectable(this.domElement,false);if(u&&e){d.useLocalStorage=true;var f=localStorage.getItem(document.location.href+".gui");if(f)a.load=JSON.parse(f)}this.__closeButton=document.createElement("div");this.__closeButton.innerHTML=k.TEXT_CLOSED;g.addClass(this.__closeButton,k.CLASS_CLOSE_BUTTON);
this.domElement.appendChild(this.__closeButton);g.bind(this.__closeButton,"click",function(){d.closed=!d.closed})}else{if(a.closed===void 0)a.closed=true;var m=document.createTextNode(a.name);g.addClass(m,"controller-name");f=s(d,m);g.addClass(this.__ul,k.CLASS_CLOSED);g.addClass(f,"title");g.bind(f,"click",function(a){a.preventDefault();d.closed=!d.closed;return false});if(!a.closed)this.closed=false}a.autoPlace&&(i.isUndefined(a.parent)&&(F&&(v=document.createElement("div"),g.addClass(v,"dg"),g.addClass(v,
k.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(v),F=false),v.appendChild(this.domElement),g.addClass(this.domElement,k.CLASS_AUTO_PLACE)),this.parent||D(d,a.width));g.bind(window,"resize",function(){d.onResize()});g.bind(this.__ul,"webkitTransitionEnd",function(){d.onResize()});g.bind(this.__ul,"transitionend",function(){d.onResize()});g.bind(this.__ul,"oTransitionEnd",function(){d.onResize()});this.onResize();a.resizable&&J(this);d.getRoot();a.parent||c()};k.toggleHide=function(){A=!A;i.each(G,
function(a){a.domElement.style.zIndex=A?-999:999;a.domElement.style.opacity=A?0:1})};k.CLASS_AUTO_PLACE="a";k.CLASS_AUTO_PLACE_CONTAINER="ac";k.CLASS_MAIN="main";k.CLASS_CONTROLLER_ROW="cr";k.CLASS_TOO_TALL="taller-than-window";k.CLASS_CLOSED="closed";k.CLASS_CLOSE_BUTTON="close-button";k.CLASS_DRAG="drag";k.DEFAULT_WIDTH=245;k.TEXT_CLOSED="Close Controls";k.TEXT_OPEN="Open Controls";g.bind(window,"keydown",function(a){document.activeElement.type!=="text"&&(a.which===72||a.keyCode==72)&&k.toggleHide()},
false);i.extend(k.prototype,{add:function(a,b){return q(this,a,b,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(a,b){return q(this,a,b,{color:true})},remove:function(a){this.__ul.removeChild(a.__li);this.__controllers.slice(this.__controllers.indexOf(a),1);var b=this;i.defer(function(){b.onResize()})},destroy:function(){this.autoPlace&&v.removeChild(this.domElement)},addFolder:function(a){if(this.__folders[a]!==void 0)throw Error('You already have a folder in this GUI by the name "'+
a+'"');var b={name:a,parent:this};b.autoPlace=this.autoPlace;if(this.load&&this.load.folders&&this.load.folders[a])b.closed=this.load.folders[a].closed,b.load=this.load.folders[a];b=new k(b);this.__folders[a]=b;a=s(this,b.domElement);g.addClass(a,"folder");return b},open:function(){this.closed=false},close:function(){this.closed=true},onResize:function(){var a=this.getRoot();if(a.scrollable){var b=g.getOffset(a.__ul).top,c=0;i.each(a.__ul.childNodes,function(b){a.autoPlace&&b===a.__save_row||(c+=
g.getHeight(b))});window.innerHeight-b-20<c?(g.addClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height=window.innerHeight-b-20+"px"):(g.removeClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height="auto")}a.__resize_handle&&i.defer(function(){a.__resize_handle.style.height=a.__ul.offsetHeight+"px"});if(a.__closeButton)a.__closeButton.style.width=a.width+"px"},remember:function(){if(i.isUndefined(x))x=new y,x.domElement.innerHTML=a;if(this.parent)throw Error("You can only call remember on a top level GUI.");
var b=this;i.each(Array.prototype.slice.call(arguments),function(a){b.__rememberedObjects.length==0&&I(b);b.__rememberedObjects.indexOf(a)==-1&&b.__rememberedObjects.push(a)});this.autoPlace&&D(this,this.width)},getRoot:function(){for(var a=this;a.parent;)a=a.parent;return a},getSaveObject:function(){var a=this.load;a.closed=this.closed;if(this.__rememberedObjects.length>0){a.preset=this.preset;if(!a.remembered)a.remembered={};a.remembered[this.preset]=z(this)}a.folders={};i.each(this.__folders,function(b,
c){a.folders[c]=b.getSaveObject()});return a},save:function(){if(!this.load.remembered)this.load.remembered={};this.load.remembered[this.preset]=z(this);B(this,false)},saveAs:function(a){if(!this.load.remembered)this.load.remembered={},this.load.remembered[w]=z(this,true);this.load.remembered[a]=z(this);this.preset=a;C(this,a,true)},revert:function(a){i.each(this.__controllers,function(b){this.getRoot().load.remembered?t(a||this.getRoot(),b):b.setValue(b.initialValue)},this);i.each(this.__folders,
function(a){a.revert(a)});a||B(this.getRoot(),false)},listen:function(a){var b=this.__listening.length==0;this.__listening.push(a);b&&E(this.__listening)}});return k}(dat.utils.css,'<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory=function(e,a,c,d,f,b,n){return function(h,j,m,l){var o=h[j];if(n.isArray(m)||n.isObject(m))return new e(h,j,m);if(n.isNumber(o))return n.isNumber(m)&&n.isNumber(l)?new c(h,j,m,l):new a(h,j,{min:m,max:l});if(n.isString(o))return new d(h,j);if(n.isFunction(o))return new f(h,j,"");if(n.isBoolean(o))return new b(h,j)}}(dat.controllers.OptionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.StringController=function(e,a,c){var d=
function(c,b){function e(){h.setValue(h.__input.value)}d.superclass.call(this,c,b);var h=this;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"keyup",e);a.bind(this.__input,"change",e);a.bind(this.__input,"blur",function(){h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())});a.bind(this.__input,"keydown",function(a){a.keyCode===13&&this.blur()});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,
e.prototype,{updateDisplay:function(){if(!a.isActive(this.__input))this.__input.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common),dat.controllers.FunctionController,dat.controllers.BooleanController,dat.utils.common),dat.controllers.Controller,dat.controllers.BooleanController,dat.controllers.FunctionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.OptionController,
dat.controllers.ColorController=function(e,a,c,d,f){function b(a,b,c,d){a.style.background="";f.each(j,function(e){a.style.cssText+="background: "+e+"linear-gradient("+b+", "+c+" 0%, "+d+" 100%); "})}function n(a){a.style.background="";a.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";a.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
a.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var h=function(e,l){function o(b){q(b);a.bind(window,"mousemove",q);a.bind(window,
"mouseup",j)}function j(){a.unbind(window,"mousemove",q);a.unbind(window,"mouseup",j)}function g(){var a=d(this.value);a!==false?(p.__color.__state=a,p.setValue(p.__color.toOriginal())):this.value=p.__color.toString()}function i(){a.unbind(window,"mousemove",s);a.unbind(window,"mouseup",i)}function q(b){b.preventDefault();var c=a.getWidth(p.__saturation_field),d=a.getOffset(p.__saturation_field),e=(b.clientX-d.left+document.body.scrollLeft)/c,b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=
1:b<0&&(b=0);e>1?e=1:e<0&&(e=0);p.__color.v=b;p.__color.s=e;p.setValue(p.__color.toOriginal());return false}function s(b){b.preventDefault();var c=a.getHeight(p.__hue_field),d=a.getOffset(p.__hue_field),b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=1:b<0&&(b=0);p.__color.h=b*360;p.setValue(p.__color.toOriginal());return false}h.superclass.call(this,e,l);this.__color=new c(this.getValue());this.__temp=new c(0);var p=this;this.domElement=document.createElement("div");a.makeSelectable(this.domElement,
false);this.__selector=document.createElement("div");this.__selector.className="selector";this.__saturation_field=document.createElement("div");this.__saturation_field.className="saturation-field";this.__field_knob=document.createElement("div");this.__field_knob.className="field-knob";this.__field_knob_border="2px solid ";this.__hue_knob=document.createElement("div");this.__hue_knob.className="hue-knob";this.__hue_field=document.createElement("div");this.__hue_field.className="hue-field";this.__input=
document.createElement("input");this.__input.type="text";this.__input_textShadow="0 1px 1px ";a.bind(this.__input,"keydown",function(a){a.keyCode===13&&g.call(this)});a.bind(this.__input,"blur",g);a.bind(this.__selector,"mousedown",function(){a.addClass(this,"drag").bind(window,"mouseup",function(){a.removeClass(p.__selector,"drag")})});var t=document.createElement("div");f.extend(this.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"});
f.extend(this.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:this.__field_knob_border+(this.__color.v<0.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1});f.extend(this.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1});f.extend(this.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"});f.extend(t.style,
{width:"100%",height:"100%",background:"none"});b(t,"top","rgba(0,0,0,0)","#000");f.extend(this.__hue_field.style,{width:"15px",height:"100px",display:"inline-block",border:"1px solid #555",cursor:"ns-resize"});n(this.__hue_field);f.extend(this.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:this.__input_textShadow+"rgba(0,0,0,0.7)"});a.bind(this.__saturation_field,"mousedown",o);a.bind(this.__field_knob,"mousedown",o);a.bind(this.__hue_field,"mousedown",
function(b){s(b);a.bind(window,"mousemove",s);a.bind(window,"mouseup",i)});this.__saturation_field.appendChild(t);this.__selector.appendChild(this.__field_knob);this.__selector.appendChild(this.__saturation_field);this.__selector.appendChild(this.__hue_field);this.__hue_field.appendChild(this.__hue_knob);this.domElement.appendChild(this.__input);this.domElement.appendChild(this.__selector);this.updateDisplay()};h.superclass=e;f.extend(h.prototype,e.prototype,{updateDisplay:function(){var a=d(this.getValue());
if(a!==false){var e=false;f.each(c.COMPONENTS,function(b){if(!f.isUndefined(a[b])&&!f.isUndefined(this.__color.__state[b])&&a[b]!==this.__color.__state[b])return e=true,{}},this);e&&f.extend(this.__color.__state,a)}f.extend(this.__temp.__state,this.__color.__state);this.__temp.a=1;var h=this.__color.v<0.5||this.__color.s>0.5?255:0,j=255-h;f.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toString(),border:this.__field_knob_border+
"rgb("+h+","+h+","+h+")"});this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px";this.__temp.s=1;this.__temp.v=1;b(this.__saturation_field,"left","#fff",this.__temp.toString());f.extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:"rgb("+h+","+h+","+h+")",textShadow:this.__input_textShadow+"rgba("+j+","+j+","+j+",.7)"})}});var j=["-moz-","-o-","-webkit-","-ms-",""];return h}(dat.controllers.Controller,dat.dom.dom,dat.color.Color=function(e,a,c,d){function f(a,
b,c){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="RGB")return this.__state[b];n(this,b,c);return this.__state[b]},set:function(a){if(this.__state.space!=="RGB")n(this,b,c),this.__state.space="RGB";this.__state[b]=a}})}function b(a,b){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="HSV")return this.__state[b];h(this);return this.__state[b]},set:function(a){if(this.__state.space!=="HSV")h(this),this.__state.space="HSV";this.__state[b]=a}})}function n(b,c,e){if(b.__state.space===
"HEX")b.__state[c]=a.component_from_hex(b.__state.hex,e);else if(b.__state.space==="HSV")d.extend(b.__state,a.hsv_to_rgb(b.__state.h,b.__state.s,b.__state.v));else throw"Corrupted color state";}function h(b){var c=a.rgb_to_hsv(b.r,b.g,b.b);d.extend(b.__state,{s:c.s,v:c.v});if(d.isNaN(c.h)){if(d.isUndefined(b.__state.h))b.__state.h=0}else b.__state.h=c.h}var j=function(){this.__state=e.apply(this,arguments);if(this.__state===false)throw"Failed to interpret color arguments";this.__state.a=this.__state.a||
1};j.COMPONENTS="r,g,b,h,s,v,hex,a".split(",");d.extend(j.prototype,{toString:function(){return c(this)},toOriginal:function(){return this.__state.conversion.write(this)}});f(j.prototype,"r",2);f(j.prototype,"g",1);f(j.prototype,"b",0);b(j.prototype,"h");b(j.prototype,"s");b(j.prototype,"v");Object.defineProperty(j.prototype,"a",{get:function(){return this.__state.a},set:function(a){this.__state.a=a}});Object.defineProperty(j.prototype,"hex",{get:function(){if(!this.__state.space!=="HEX")this.__state.hex=
a.rgb_to_hex(this.r,this.g,this.b);return this.__state.hex},set:function(a){this.__state.space="HEX";this.__state.hex=a}});return j}(dat.color.interpret,dat.color.math=function(){var e;return{hsv_to_rgb:function(a,c,d){var e=a/60-Math.floor(a/60),b=d*(1-c),n=d*(1-e*c),c=d*(1-(1-e)*c),a=[[d,c,b],[n,d,b],[b,d,c],[b,n,d],[c,b,d],[d,b,n]][Math.floor(a/60)%6];return{r:a[0]*255,g:a[1]*255,b:a[2]*255}},rgb_to_hsv:function(a,c,d){var e=Math.min(a,c,d),b=Math.max(a,c,d),e=b-e;if(b==0)return{h:NaN,s:0,v:0};
a=a==b?(c-d)/e:c==b?2+(d-a)/e:4+(a-c)/e;a/=6;a<0&&(a+=1);return{h:a*360,s:e/b,v:b/255}},rgb_to_hex:function(a,c,d){a=this.hex_with_component(0,2,a);a=this.hex_with_component(a,1,c);return a=this.hex_with_component(a,0,d)},component_from_hex:function(a,c){return a>>c*8&255},hex_with_component:function(a,c,d){return d<<(e=c*8)|a&~(255<<e)}}}(),dat.color.toString,dat.utils.common),dat.color.interpret,dat.utils.common),dat.utils.requestAnimationFrame=function(){return window.RequestAnimationFrame||
window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1E3/60)}}(),dat.dom.CenteredDiv=function(e,a){var c=function(){this.backgroundElement=document.createElement("div");a.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear"});e.makeFullscreen(this.backgroundElement);this.backgroundElement.style.position="fixed";this.domElement=
document.createElement("div");a.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear"});document.body.appendChild(this.backgroundElement);document.body.appendChild(this.domElement);var c=this;e.bind(this.backgroundElement,"click",function(){c.hide()})};c.prototype.show=function(){var c=this;this.backgroundElement.style.display="block";this.domElement.style.display="block";this.domElement.style.opacity=
0;this.domElement.style.webkitTransform="scale(1.1)";this.layout();a.defer(function(){c.backgroundElement.style.opacity=1;c.domElement.style.opacity=1;c.domElement.style.webkitTransform="scale(1)"})};c.prototype.hide=function(){var a=this,c=function(){a.domElement.style.display="none";a.backgroundElement.style.display="none";e.unbind(a.domElement,"webkitTransitionEnd",c);e.unbind(a.domElement,"transitionend",c);e.unbind(a.domElement,"oTransitionEnd",c)};e.bind(this.domElement,"webkitTransitionEnd",
c);e.bind(this.domElement,"transitionend",c);e.bind(this.domElement,"oTransitionEnd",c);this.backgroundElement.style.opacity=0;this.domElement.style.opacity=0;this.domElement.style.webkitTransform="scale(1.1)"};c.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-e.getWidth(this.domElement)/2+"px";this.domElement.style.top=window.innerHeight/2-e.getHeight(this.domElement)/2+"px"};return c}(dat.dom.dom,dat.utils.common),dat.dom.dom,dat.utils.common);
function Events(e){var t={},n,r,i,s=Array;e=e||this;e.on=function(e,n,r){t[e]||(t[e]=[]);t[e].push({f:n,c:r})};e.off=function(e,i){r=t[e]||[];n=r.length=i?r.length:0;while(~--n<0)i==r[n].f&&r.splice(n,1)};e.emit=function(){i=s.apply([],arguments);r=t[i.shift()]||[];i=i[0]instanceof s&&i[0]||i;n=r.length;while(~--n<0)r[n].f.apply(r[n].c,i)}}

/* Zepto v1.1.2 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function G(a){return a==null?String(a):z[A.call(a)]||"object"}function H(a){return G(a)=="function"}function I(a){return a!=null&&a==a.window}function J(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function K(a){return G(a)=="object"}function L(a){return K(a)&&!I(a)&&Object.getPrototypeOf(a)==Object.prototype}function M(a){return a instanceof Array}function N(a){return typeof a.length=="number"}function O(a){return g.call(a,function(a){return a!=null})}function P(a){return a.length>0?c.fn.concat.apply([],a):a}function Q(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function R(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function S(a,b){return typeof b=="number"&&!k[Q(a)]?b+"px":b}function T(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),i[a]=c),i[a]}function U(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function V(c,d,e){for(b in d)e&&(L(d[b])||M(d[b]))?(L(d[b])&&!L(c[b])&&(c[b]={}),M(d[b])&&!M(c[b])&&(c[b]=[]),V(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function W(a,b){return b==null?c(a):c(a).filter(b)}function X(a,b,c,d){return H(b)?b.call(a,c,d):b}function Y(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function Z(b,c){var d=b.className,e=d&&d.baseVal!==a;if(c===a)return e?d.baseVal:d;e?d.baseVal=c:b.className=c}function $(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:!/^0/.test(a)&&!isNaN(b=Number(a))?b:/^[\[\{]/.test(a)?c.parseJSON(a):a):a}catch(d){return a}}function _(a,b){b(a);for(var c in a.childNodes)_(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/^(?:body|html)$/i,p=/([A-Z])/g,q=["val","css","html","text","data","width","height","offset"],r=["after","prepend","before","append"],s=h.createElement("table"),t=h.createElement("tr"),u={tr:h.createElement("tbody"),tbody:s,thead:s,tfoot:s,td:t,th:t,"*":h.createElement("div")},v=/complete|loaded|interactive/,w=/^\.([\w-]+)$/,x=/^#([\w-]*)$/,y=/^[\w-]*$/,z={},A=z.toString,B={},C,D,E=h.createElement("div"),F={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"};return B.matches=function(a,b){if(!b||!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=E).appendChild(a),d=~B.qsa(e,b).indexOf(a),f&&E.removeChild(a),d},C=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},D=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},B.fragment=function(b,d,e){var g,i,j;return m.test(b)&&(g=c(h.createElement(RegExp.$1))),g||(b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=l.test(b)&&RegExp.$1),d in u||(d="*"),j=u[d],j.innerHTML=""+b,g=c.each(f.call(j.childNodes),function(){j.removeChild(this)})),L(e)&&(i=c(g),c.each(e,function(a,b){q.indexOf(a)>-1?i[a](b):i.attr(a,b)})),g},B.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},B.isZ=function(a){return a instanceof B.Z},B.init=function(b,d){var e;if(!b)return B.Z();if(typeof b=="string"){b=b.trim();if(b[0]=="<"&&l.test(b))e=B.fragment(b,RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=B.qsa(h,b)}}else{if(H(b))return c(h).ready(b);if(B.isZ(b))return b;if(M(b))e=O(b);else if(K(b))e=[b],b=null;else if(l.test(b))e=B.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=B.qsa(h,b)}}return B.Z(e,b)},c=function(a,b){return B.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){V(a,c,b)}),a},B.qsa=function(a,b){var c,d=b[0]=="#",e=!d&&b[0]==".",g=d||e?b.slice(1):b,h=y.test(g);return J(a)&&h&&d?(c=a.getElementById(g))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:f.call(h&&!d?e?a.getElementsByClassName(g):a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=function(a,b){return a!==b&&a.contains(b)},c.type=G,c.isFunction=H,c.isWindow=I,c.isArray=M,c.isPlainObject=L,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=C,c.trim=function(a){return a==null?"":String.prototype.trim.call(a)},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,d=[],e,f;if(N(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return P(d)},c.each=function(a,b){var c,d;if(N(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){z["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return v.test(h.readyState)&&h.body?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return H(a)?this.not(this.not(a)):c(g.call(this,function(b){return B.matches(b,a)}))},add:function(a,b){return c(D(this.concat(c(a,b))))},is:function(a){return this.length>0&&B.matches(this[0],a)},not:function(b){var d=[];if(H(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):N(b)&&H(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},has:function(a){return this.filter(function(){return K(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!K(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!K(a)?a:c(a)},find:function(a){var b,d=this;return typeof a=="object"?b=c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):this.length==1?b=c(B.qsa(this[0],a)):b=this.map(function(){return B.qsa(this,a)}),b},closest:function(a,b){var d=this[0],e=!1;typeof a=="object"&&(e=c(a));while(d&&!(e?e.indexOf(d)>=0:B.matches(d,a)))d=d!==b&&!J(d)&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&!J(a)&&b.indexOf(a)<0)return b.push(a),a});return W(b,a)},parent:function(a){return W(D(this.pluck("parentNode")),a)},children:function(a){return W(this.map(function(){return U(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return W(this.map(function(a,b){return g.call(U(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=""),getComputedStyle(this,"").getPropertyValue("display")=="none"&&(this.style.display=T(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=H(a);if(this[0]&&!b)var d=c(a).get(0),e=d.parentNode||this.length>1;return this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));var b;while((b=a.children()).length)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=H(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?d.css("display")=="none":b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return arguments.length===0?this.length>0?this[0].innerHTML:null:this.each(function(b){var d=this.innerHTML;c(this).empty().append(X(this,a,b,d))})},text:function(b){return arguments.length===0?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b===a?"":""+b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(K(c))for(b in c)Y(this,b,c[b]);else Y(this,c,X(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&Y(this,a)})},prop:function(b,c){return b=F[b]||b,c===a?this[0]&&this[0][b]:this.each(function(a){this[b]=X(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+b.replace(p,"-$1").toLowerCase(),c);return d!==null?$(d):a},val:function(a){return arguments.length===0?this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(b){this.value=X(this,a,b,this.value)})},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=X(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};d.css("position")=="static"&&(g.position="relative"),d.css(g)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,d){if(arguments.length<2){var e=this[0],f=getComputedStyle(e,"");if(!e)return;if(typeof a=="string")return e.style[C(a)]||f.getPropertyValue(a);if(M(a)){var g={};return c.each(M(a)?a:[a],function(a,b){g[b]=e.style[C(b)]||f.getPropertyValue(b)}),g}}var h="";if(G(a)=="string")!d&&d!==0?this.each(function(){this.style.removeProperty(Q(a))}):h=Q(a)+":"+S(a,d);else for(b in a)!a[b]&&a[b]!==0?this.each(function(){this.style.removeProperty(Q(b))}):h+=Q(b)+":"+S(b,a[b])+";";return this.each(function(){this.style.cssText+=";"+h})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?e.some.call(this,function(a){return this.test(Z(a))},R(a)):!1},addClass:function(a){return a?this.each(function(b){d=[];var e=Z(this),f=X(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&Z(this,e+(e?" ":"")+d.join(" "))}):this},removeClass:function(b){return this.each(function(c){if(b===a)return Z(this,"");d=Z(this),X(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(R(a)," ")}),Z(this,d.trim())})},toggleClass:function(b,d){return b?this.each(function(e){var f=c(this),g=X(this,b,e,Z(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})}):this},scrollTop:function(b){if(!this.length)return;var c="scrollTop"in this[0];return b===a?c?this[0].scrollTop:this[0].pageYOffset:this.each(c?function(){this.scrollTop=b}:function(){this.scrollTo(this.scrollX,b)})},scrollLeft:function(b){if(!this.length)return;var c="scrollLeft"in this[0];return b===a?c?this[0].scrollLeft:this[0].pageXOffset:this.each(c?function(){this.scrollLeft=b}:function(){this.scrollTo(b,this.scrollY)})},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||h.body;while(a&&!o.test(a.nodeName)&&c(a).css("position")=="static")a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){var d=b.replace(/./,function(a){return a[0].toUpperCase()});c.fn[b]=function(e){var f,g=this[0];return e===a?I(g)?g["inner"+d]:J(g)?g.documentElement["scroll"+d]:(f=this.offset())&&f[b]:this.each(function(a){g=c(this),g.css(b,X(this,e,a,g[b]()))})}}),r.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,e=c.map(arguments,function(b){return a=G(b),a=="object"||a=="array"||b==null?b:B.fragment(b)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,h){f=d?h:h.parentNode,h=b==0?h.nextSibling:b==1?h.firstChild:b==2?h:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();_(f.insertBefore(a,h),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),B.Z.prototype=c.fn,B.uniq=D,B.deserializeValue=$,c.zepto=B,c}();window.Zepto=Zepto,window.$===undefined&&(window.$=Zepto),function(a){function m(a){return a._zid||(a._zid=c++)}function n(a,b,c,d){b=o(b);if(b.ns)var e=p(b.ns);return(h[m(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||e.test(a.ns))&&(!c||m(a.fn)===m(c))&&(!d||a.sel==d)})}function o(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function p(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function q(a,b){return a.del&&!j&&a.e in k||!!b}function r(a){return l[a]||j&&k[a]||a}function s(b,c,e,f,g,i,j){var k=m(b),n=h[k]||(h[k]=[]);c.split(/\s/).forEach(function(c){if(c=="ready")return a(document).ready(e);var h=o(c);h.fn=e,h.sel=g,h.e in l&&(e=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return h.fn.apply(this,arguments)}),h.del=i;var k=i||e;h.proxy=function(a){a=y(a);if(a.isImmediatePropagationStopped())return;a.data=f;var c=k.apply(b,a._args==d?[a]:[a].concat(a._args));return c===!1&&(a.preventDefault(),a.stopPropagation()),c},h.i=n.length,n.push(h),"addEventListener"in b&&b.addEventListener(r(h.e),h.proxy,q(h,j))})}function t(a,b,c,d,e){var f=m(a);(b||"").split(/\s/).forEach(function(b){n(a,b,c,d).forEach(function(b){delete h[f][b.i],"removeEventListener"in a&&a.removeEventListener(r(b.e),b.proxy,q(b,e))})})}function y(b,c){if(c||!b.isDefaultPrevented){c||(c=b),a.each(x,function(a,d){var e=c[a];b[a]=function(){return this[d]=u,e&&e.apply(c,arguments)},b[d]=v});if(c.defaultPrevented!==d?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())b.isDefaultPrevented=u}return b}function z(a){var b,c={originalEvent:a};for(b in a)!w.test(b)&&a[b]!==d&&(c[b]=a[b]);return y(c,a)}var b=a.zepto.qsa,c=1,d,e=Array.prototype.slice,f=a.isFunction,g=function(a){return typeof a=="string"},h={},i={},j="onfocusin"in window,k={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};i.click=i.mousedown=i.mouseup=i.mousemove="MouseEvents",a.event={add:s,remove:t},a.proxy=function(b,c){if(f(b)){var d=function(){return b.apply(c,arguments)};return d._zid=m(b),d}if(g(c))return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b,c){return this.on(a,b,c)},a.fn.unbind=function(a,b){return this.off(a,b)},a.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var u=function(){return!0},v=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,x={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(a,b,c){return this.on(b,a,c)},a.fn.undelegate=function(a,b,c){return this.off(b,a,c)},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,h,i,j){var k,l,m=this;if(b&&!g(b))return a.each(b,function(a,b){m.on(a,c,h,b,j)}),m;!g(c)&&!f(i)&&i!==!1&&(i=h,h=c,c=d);if(f(h)||h===!1)i=h,h=d;return i===!1&&(i=v),m.each(function(d,f){j&&(k=function(a){return t(f,a.type,i),i.apply(this,arguments)}),c&&(l=function(b){var d,g=a(b.target).closest(c,f).get(0);if(g&&g!==f)return d=a.extend(z(b),{currentTarget:g,liveFired:f}),(k||i).apply(g,[d].concat(e.call(arguments,1)))}),s(f,b,i,h,c,l||k)})},a.fn.off=function(b,c,e){var h=this;return b&&!g(b)?(a.each(b,function(a,b){h.off(a,c,b)}),h):(!g(c)&&!f(e)&&e!==!1&&(e=c,c=d),e===!1&&(e=v),h.each(function(){t(this,b,e,c)}))},a.fn.trigger=function(b,c){return b=g(b)||a.isPlainObject(b)?a.Event(b):y(b),b._args=c,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=z(g(b)?a.Event(b):b),d._args=c,d.target=h,a.each(n(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){g(a)||(b=a,a=b.type);var c=document.createEvent(i[a]||"Events"),d=!0;if(b)for(var e in b)e=="bubbles"?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),y(c)}}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.isDefaultPrevented()}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c,d){var e=c.context,f="success";c.success.call(e,a,f,b),d&&d.resolveWith(e,[a,f,b]),triggerGlobal(c,e,"ajaxSuccess",[b,c,a]),ajaxComplete(f,b,c)}function ajaxError(a,b,c,d,e){var f=d.context;d.error.call(f,c,b,a),e&&e.rejectWith(f,[c,b,a]),triggerGlobal(d,f,"ajaxError",[c,d,a||b]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a=a.split(";",2)[0]),a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return b==""?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){a.processData&&a.data&&$.type(a.data)!="string"&&(a.data=$.param(a.data,a.traditional)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data),a.data=undefined)}function parseArguments(a,b,c,d){var e=!$.isFunction(b);return{url:a,data:e?b:undefined,success:e?$.isFunction(c)?c:undefined:b,dataType:e?d||c:c}}function serialize(a,b,c,d){var e,f=$.isArray(b),g=$.isPlainObject(b);$.each(b,function(b,h){e=$.type(h),d&&(b=c?d:d+"["+(g||e=="object"||e=="array"?b:"")+"]"),!d&&f?a.add(h.name,h.value):e=="array"||!c&&e=="object"?serialize(a,h,c,b):a.add(b,h)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a,b){if("type"in a){var c=a.jsonpCallback,d=($.isFunction(c)?c():c)||"jsonp"+ ++jsonpID,e=document.createElement("script"),f=window[d],g,h=function(a){$(e).triggerHandler("error",a||"abort")},i={abort:h},j;return b&&b.promise(i),$(e).on("load error",function(c,h){clearTimeout(j),$(e).off().remove(),c.type=="error"||!g?ajaxError(null,h||"error",i,a,b):ajaxSuccess(g[0],i,a,b),window[d]=f,g&&$.isFunction(f)&&f(g[0]),f=g=undefined}),ajaxBeforeSend(i,a)===!1?(h("abort"),i):(window[d]=function(){g=arguments},e.src=a.url.replace(/=\?/,"="+d),document.head.appendChild(e),a.timeout>0&&(j=setTimeout(function(){h("timeout")},a.timeout)),i)}return $.ajax(a)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},$.ajax=function(options){var settings=$.extend({},options||{}),deferred=$.Deferred&&$.Deferred();for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host),settings.url||(settings.url=window.location.toString()),serializeData(settings),settings.cache===!1&&(settings.url=appendQuery(settings.url,"_="+Date.now()));var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,settings.jsonp?settings.jsonp+"=?":settings.jsonp===!1?"":"callback=?")),$.ajaxJSONP(settings,deferred);var mime=settings.accepts[dataType],headers={},setHeader=function(a,b){headers[a.toLowerCase()]=[a,b]},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),nativeSetHeader=xhr.setRequestHeader,abortTimeout;deferred&&deferred.promise(xhr),settings.crossDomain||setHeader("X-Requested-With","XMLHttpRequest"),setHeader("Accept",mime||"*/*");if(mime=settings.mimeType||mime)mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime);(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")&&setHeader("Content-Type",settings.contentType||"application/x-www-form-urlencoded");if(settings.headers)for(name in settings.headers)setHeader(name,settings.headers[name]);xhr.setRequestHeader=setHeader,xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty,clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(settings.mimeType||xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings,deferred):ajaxSuccess(result,xhr,settings,deferred)}else ajaxError(xhr.statusText||null,xhr.status?"error":"abort",xhr,settings,deferred)}};if(ajaxBeforeSend(xhr,settings)===!1)return xhr.abort(),ajaxError(null,"abort",xhr,settings,deferred),xhr;if(settings.xhrFields)for(name in settings.xhrFields)xhr[name]=settings.xhrFields[name];var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async,settings.username,settings.password);for(name in headers)nativeSetHeader.apply(xhr,headers[name]);return settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings,deferred)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr},$.get=function(a,b,c,d){return $.ajax(parseArguments.apply(null,arguments))},$.post=function(a,b,c,d){var e=parseArguments.apply(null,arguments);return e.type="POST",$.ajax(e)},$.getJSON=function(a,b,c){var d=parseArguments.apply(null,arguments);return d.dataType="json",$.ajax(d)},$.fn.load=function(a,b,c){if(!this.length)return this;var d=this,e=a.split(/\s/),f,g=parseArguments(a,b,c),h=g.success;return e.length>1&&(g.url=e[0],f=e[1]),g.success=function(a){d.html(f?$("<div>").html(a.replace(rscript,"")).find(f):a),h&&h.apply(d,arguments)},$.ajax(g),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a([].slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(a){"__proto__"in{}||a.extend(a.zepto,{Z:function(b,c){return b=b||[],a.extend(b,a.fn),b.selector=c||"",b.__Z=!0,b},isZ:function(b){return a.type(b)==="array"&&"__Z"in b}});try{getComputedStyle(undefined)}catch(b){var c=getComputedStyle;window.getComputedStyle=function(a){try{return c(a)}catch(b){return null}}}}(Zepto)
// three.js / threejs.org/license
'use strict';var THREE={REVISION:"67"};self.console=self.console||{info:function(){},log:function(){},debug:function(){},warn:function(){},error:function(){}};
(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!self.requestAnimationFrame;++c)self.requestAnimationFrame=self[b[c]+"RequestAnimationFrame"],self.cancelAnimationFrame=self[b[c]+"CancelAnimationFrame"]||self[b[c]+"CancelRequestAnimationFrame"];void 0===self.requestAnimationFrame&&void 0!==self.setTimeout&&(self.requestAnimationFrame=function(b){var c=Date.now(),f=Math.max(0,16-(c-a)),g=self.setTimeout(function(){b(c+f)},f);a=c+f;return g});void 0===self.cancelAnimationFrame&&void 0!==
self.clearTimeout&&(self.cancelAnimationFrame=function(a){self.clearTimeout(a)})})();THREE.CullFaceNone=0;THREE.CullFaceBack=1;THREE.CullFaceFront=2;THREE.CullFaceFrontBack=3;THREE.FrontFaceDirectionCW=0;THREE.FrontFaceDirectionCCW=1;THREE.BasicShadowMap=0;THREE.PCFShadowMap=1;THREE.PCFSoftShadowMap=2;THREE.FrontSide=0;THREE.BackSide=1;THREE.DoubleSide=2;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NoBlending=0;
THREE.NormalBlending=1;THREE.AdditiveBlending=2;THREE.SubtractiveBlending=3;THREE.MultiplyBlending=4;THREE.CustomBlending=5;THREE.AddEquation=100;THREE.SubtractEquation=101;THREE.ReverseSubtractEquation=102;THREE.ZeroFactor=200;THREE.OneFactor=201;THREE.SrcColorFactor=202;THREE.OneMinusSrcColorFactor=203;THREE.SrcAlphaFactor=204;THREE.OneMinusSrcAlphaFactor=205;THREE.DstAlphaFactor=206;THREE.OneMinusDstAlphaFactor=207;THREE.DstColorFactor=208;THREE.OneMinusDstColorFactor=209;
THREE.SrcAlphaSaturateFactor=210;THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.AddOperation=2;THREE.UVMapping=function(){};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.RepeatWrapping=1E3;THREE.ClampToEdgeWrapping=1001;THREE.MirroredRepeatWrapping=1002;THREE.NearestFilter=1003;THREE.NearestMipMapNearestFilter=1004;THREE.NearestMipMapLinearFilter=1005;
THREE.LinearFilter=1006;THREE.LinearMipMapNearestFilter=1007;THREE.LinearMipMapLinearFilter=1008;THREE.UnsignedByteType=1009;THREE.ByteType=1010;THREE.ShortType=1011;THREE.UnsignedShortType=1012;THREE.IntType=1013;THREE.UnsignedIntType=1014;THREE.FloatType=1015;THREE.UnsignedShort4444Type=1016;THREE.UnsignedShort5551Type=1017;THREE.UnsignedShort565Type=1018;THREE.AlphaFormat=1019;THREE.RGBFormat=1020;THREE.RGBAFormat=1021;THREE.LuminanceFormat=1022;THREE.LuminanceAlphaFormat=1023;
THREE.RGB_S3TC_DXT1_Format=2001;THREE.RGBA_S3TC_DXT1_Format=2002;THREE.RGBA_S3TC_DXT3_Format=2003;THREE.RGBA_S3TC_DXT5_Format=2004;THREE.Color=function(a){return 3===arguments.length?this.setRGB(arguments[0],arguments[1],arguments[2]):this.set(a)};
THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,set:function(a){a instanceof THREE.Color?this.copy(a):"number"===typeof a?this.setHex(a):"string"===typeof a&&this.setStyle(a);return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSL:function(a,b,c){if(0===b)this.r=this.g=this.b=c;else{var d=function(a,b,c){0>c&&(c+=1);1<c&&(c-=1);return c<1/6?a+6*(b-a)*
c:0.5>c?b:c<2/3?a+6*(b-a)*(2/3-c):a};b=0.5>=c?c*(1+b):c+b-c*b;c=2*c-b;this.r=d(c,b,a+1/3);this.g=d(c,b,a);this.b=d(c,b,a-1/3)}return this},setStyle:function(a){if(/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(a))return a=/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(a),this.r=Math.min(255,parseInt(a[1],10))/255,this.g=Math.min(255,parseInt(a[2],10))/255,this.b=Math.min(255,parseInt(a[3],10))/255,this;if(/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(a))return a=/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(a),this.r=
Math.min(100,parseInt(a[1],10))/100,this.g=Math.min(100,parseInt(a[2],10))/100,this.b=Math.min(100,parseInt(a[3],10))/100,this;if(/^\#([0-9a-f]{6})$/i.test(a))return a=/^\#([0-9a-f]{6})$/i.exec(a),this.setHex(parseInt(a[1],16)),this;if(/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a))return a=/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a),this.setHex(parseInt(a[1]+a[1]+a[2]+a[2]+a[3]+a[3],16)),this;if(/^(\w+)$/i.test(a))return this.setHex(THREE.ColorKeywords[a]),this},copy:function(a){this.r=a.r;this.g=
a.g;this.b=a.b;return this},copyGammaToLinear:function(a){this.r=a.r*a.r;this.g=a.g*a.g;this.b=a.b*a.b;return this},copyLinearToGamma:function(a){this.r=Math.sqrt(a.r);this.g=Math.sqrt(a.g);this.b=Math.sqrt(a.b);return this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;this.r=a*a;this.g=b*b;this.b=c*c;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);this.g=Math.sqrt(this.g);this.b=Math.sqrt(this.b);return this},getHex:function(){return 255*this.r<<16^255*this.g<<
8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(a){a=a||{h:0,s:0,l:0};var b=this.r,c=this.g,d=this.b,e=Math.max(b,c,d),f=Math.min(b,c,d),g,h=(f+e)/2;if(f===e)f=g=0;else{var k=e-f,f=0.5>=h?k/(e+f):k/(2-e-f);switch(e){case b:g=(c-d)/k+(c<d?6:0);break;case c:g=(d-b)/k+2;break;case d:g=(b-c)/k+4}g/=6}a.h=g;a.s=f;a.l=h;return a},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(a,
b,c){var d=this.getHSL();d.h+=a;d.s+=b;d.l+=c;this.setHSL(d.h,d.s,d.l);return this},add:function(a){this.r+=a.r;this.g+=a.g;this.b+=a.b;return this},addColors:function(a,b){this.r=a.r+b.r;this.g=a.g+b.g;this.b=a.b+b.b;return this},addScalar:function(a){this.r+=a;this.g+=a;this.b+=a;return this},multiply:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b;return this},multiplyScalar:function(a){this.r*=a;this.g*=a;this.b*=a;return this},lerp:function(a,b){this.r+=(a.r-this.r)*b;this.g+=(a.g-this.g)*b;
this.b+=(a.b-this.b)*b;return this},equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},fromArray:function(a){this.r=a[0];this.g=a[1];this.b=a[2];return this},toArray:function(){return[this.r,this.g,this.b]},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}};
THREE.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,
darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,
grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,
lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,
palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,
tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};THREE.Quaternion=function(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._w=void 0!==d?d:1};
THREE.Quaternion.prototype={constructor:THREE.Quaternion,_x:0,_y:0,_z:0,_w:0,get x(){return this._x},set x(a){this._x=a;this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a;this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a;this.onChangeCallback()},get w(){return this._w},set w(a){this._w=a;this.onChangeCallback()},set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._w=d;this.onChangeCallback();return this},copy:function(a){this._x=a._x;this._y=a._y;this._z=a._z;
this._w=a._w;this.onChangeCallback();return this},setFromEuler:function(a,b){if(!1===a instanceof THREE.Euler)throw Error("ERROR: Quaternion's .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");var c=Math.cos(a._x/2),d=Math.cos(a._y/2),e=Math.cos(a._z/2),f=Math.sin(a._x/2),g=Math.sin(a._y/2),h=Math.sin(a._z/2);"XYZ"===a.order?(this._x=f*d*e+c*g*h,this._y=c*g*e-f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e-f*g*h):"YXZ"===a.order?(this._x=f*d*e+c*g*h,
this._y=c*g*e-f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e+f*g*h):"ZXY"===a.order?(this._x=f*d*e-c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e-f*g*h):"ZYX"===a.order?(this._x=f*d*e-c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e+f*g*h):"YZX"===a.order?(this._x=f*d*e+c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e-f*g*h):"XZY"===a.order&&(this._x=f*d*e-c*g*h,this._y=c*g*e-f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e+f*g*h);if(!1!==b)this.onChangeCallback();return this},
setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);this._x=a.x*d;this._y=a.y*d;this._z=a.z*d;this._w=Math.cos(c);this.onChangeCallback();return this},setFromRotationMatrix:function(a){var b=a.elements,c=b[0];a=b[4];var d=b[8],e=b[1],f=b[5],g=b[9],h=b[2],k=b[6],b=b[10],l=c+f+b;0<l?(c=0.5/Math.sqrt(l+1),this._w=0.25/c,this._x=(k-g)*c,this._y=(d-h)*c,this._z=(e-a)*c):c>f&&c>b?(c=2*Math.sqrt(1+c-f-b),this._w=(k-g)/c,this._x=0.25*c,this._y=(a+e)/c,this._z=(d+h)/c):f>b?(c=2*Math.sqrt(1+f-c-b),this._w=
(d-h)/c,this._x=(a+e)/c,this._y=0.25*c,this._z=(g+k)/c):(c=2*Math.sqrt(1+b-c-f),this._w=(e-a)/c,this._x=(d+h)/c,this._y=(g+k)/c,this._z=0.25*c);this.onChangeCallback();return this},setFromUnitVectors:function(){var a,b;return function(c,d){void 0===a&&(a=new THREE.Vector3);b=c.dot(d)+1;1E-6>b?(b=0,Math.abs(c.x)>Math.abs(c.z)?a.set(-c.y,c.x,0):a.set(0,-c.z,c.y)):a.crossVectors(c,d);this._x=a.x;this._y=a.y;this._z=a.z;this._w=b;this.normalize();return this}}(),inverse:function(){this.conjugate().normalize();
return this},conjugate:function(){this._x*=-1;this._y*=-1;this._z*=-1;this.onChangeCallback();return this},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var a=this.length();0===a?(this._z=this._y=this._x=0,this._w=1):(a=1/a,this._x*=a,this._y*=a,this._z*=a,this._w*=a);this.onChangeCallback();return this},multiply:function(a,b){return void 0!==
b?(console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},multiplyQuaternions:function(a,b){var c=a._x,d=a._y,e=a._z,f=a._w,g=b._x,h=b._y,k=b._z,l=b._w;this._x=c*l+f*g+d*k-e*h;this._y=d*l+f*h+e*g-c*k;this._z=e*l+f*k+c*h-d*g;this._w=f*l-c*g-d*h-e*k;this.onChangeCallback();return this},multiplyVector3:function(a){console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
return a.applyQuaternion(this)},slerp:function(a,b){var c=this._x,d=this._y,e=this._z,f=this._w,g=f*a._w+c*a._x+d*a._y+e*a._z;0>g?(this._w=-a._w,this._x=-a._x,this._y=-a._y,this._z=-a._z,g=-g):this.copy(a);if(1<=g)return this._w=f,this._x=c,this._y=d,this._z=e,this;var h=Math.acos(g),k=Math.sqrt(1-g*g);if(0.001>Math.abs(k))return this._w=0.5*(f+this._w),this._x=0.5*(c+this._x),this._y=0.5*(d+this._y),this._z=0.5*(e+this._z),this;g=Math.sin((1-b)*h)/k;h=Math.sin(b*h)/k;this._w=f*g+this._w*h;this._x=
c*g+this._x*h;this._y=d*g+this._y*h;this._z=e*g+this._z*h;this.onChangeCallback();return this},equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._w===this._w},fromArray:function(a){this._x=a[0];this._y=a[1];this._z=a[2];this._w=a[3];this.onChangeCallback();return this},toArray:function(){return[this._x,this._y,this._z,this._w]},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){},clone:function(){return new THREE.Quaternion(this._x,this._y,
this._z,this._w)}};THREE.Quaternion.slerp=function(a,b,c,d){return c.copy(a).slerp(b,d)};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};
THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;this.y=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+a);}},copy:function(a){this.x=a.x;this.y=a.y;return this},add:function(a,
b){if(void 0!==b)return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addScalar:function(a){this.x+=a;this.y+=a;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=
a.y;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},multiply:function(a){this.x*=a.x;this.y*=a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},divide:function(a){this.x/=a.x;this.y/=a.y;return this},divideScalar:function(a){0!==a?(a=1/a,this.x*=a,this.y*=a):this.y=this.x=0;return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=a.y);return this},
clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);return this},clampScalar:function(){var a,b;return function(c,d){void 0===a&&(a=new THREE.Vector2,b=new THREE.Vector2);a.set(c,c);b.set(d,d);return this.clamp(a,b)}}(),floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);
return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},
distanceToSquared:function(a){var b=this.x-a.x;a=this.y-a.y;return b*b+a*a},setLength:function(a){var b=this.length();0!==b&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a){this.x=a[0];this.y=a[1];return this},toArray:function(){return[this.x,this.y]},clone:function(){return new THREE.Vector2(this.x,this.y)}};THREE.Vector3=function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0};
THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+
a);}},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},multiply:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b);this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},multiplyVectors:function(a,b){this.x=a.x*
b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},applyEuler:function(){var a;return function(b){!1===b instanceof THREE.Euler&&console.error("ERROR: Vector3's .applyEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");void 0===a&&(a=new THREE.Quaternion);this.applyQuaternion(a.setFromEuler(b));return this}}(),applyAxisAngle:function(){var a;return function(b,c){void 0===a&&(a=new THREE.Quaternion);this.applyQuaternion(a.setFromAxisAngle(b,c));return this}}(),
applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[3]*c+a[6]*d;this.y=a[1]*b+a[4]*c+a[7]*d;this.z=a[2]*b+a[5]*c+a[8]*d;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12];this.y=a[1]*b+a[5]*c+a[9]*d+a[13];this.z=a[2]*b+a[6]*c+a[10]*d+a[14];return this},applyProjection:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;var e=1/(a[3]*b+a[7]*c+a[11]*d+a[15]);this.x=(a[0]*b+a[4]*c+a[8]*d+a[12])*e;this.y=
(a[1]*b+a[5]*c+a[9]*d+a[13])*e;this.z=(a[2]*b+a[6]*c+a[10]*d+a[14])*e;return this},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,g=a.z;a=a.w;var h=a*b+f*d-g*c,k=a*c+g*b-e*d,l=a*d+e*c-f*b,b=-e*b-f*c-g*d;this.x=h*a+b*-e+k*-g-l*-f;this.y=k*a+b*-f+l*-e-h*-g;this.z=l*a+b*-g+h*-f-k*-e;return this},transformDirection:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d;this.y=a[1]*b+a[5]*c+a[9]*d;this.z=a[2]*b+a[6]*c+a[10]*d;this.normalize();return this},
divide:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},divideScalar:function(a){0!==a?(a=1/a,this.x*=a,this.y*=a,this.z*=a):this.z=this.y=this.x=0;return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);this.z>a.z&&(this.z=a.z);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=a.y);this.z<a.z&&(this.z=a.z);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);this.z<
a.z?this.z=a.z:this.z>b.z&&(this.z=b.z);return this},clampScalar:function(){var a,b;return function(c,d){void 0===a&&(a=new THREE.Vector3,b=new THREE.Vector3);a.set(c,c,c);b.set(d,d,d);return this.clamp(a,b)}}(),floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);this.z=Math.floor(this.z);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);
return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):Math.floor(this.z);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthManhattan:function(){return Math.abs(this.x)+
Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();0!==b&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;return this},cross:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,b);var c=this.x,d=this.y,e=this.z;this.x=
d*a.z-e*a.y;this.y=e*a.x-c*a.z;this.z=c*a.y-d*a.x;return this},crossVectors:function(a,b){var c=a.x,d=a.y,e=a.z,f=b.x,g=b.y,h=b.z;this.x=d*h-e*g;this.y=e*f-c*h;this.z=c*g-d*f;return this},projectOnVector:function(){var a,b;return function(c){void 0===a&&(a=new THREE.Vector3);a.copy(c).normalize();b=this.dot(a);return this.copy(a).multiplyScalar(b)}}(),projectOnPlane:function(){var a;return function(b){void 0===a&&(a=new THREE.Vector3);a.copy(this).projectOnVector(b);return this.sub(a)}}(),reflect:function(){var a;
return function(b){void 0===a&&(a=new THREE.Vector3);return this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){a=this.dot(a)/(this.length()*a.length());return Math.acos(THREE.Math.clamp(a,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;a=this.z-a.z;return b*b+c*c+a*a},setEulerFromRotationMatrix:function(a,b){console.error("REMOVED: Vector3's setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code.")},
setEulerFromQuaternion:function(a,b){console.error("REMOVED: Vector3's setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code.")},getPositionFromMatrix:function(a){console.warn("DEPRECATED: Vector3's .getPositionFromMatrix() has been renamed to .setFromMatrixPosition(). Please update your code.");return this.setFromMatrixPosition(a)},getScaleFromMatrix:function(a){console.warn("DEPRECATED: Vector3's .getScaleFromMatrix() has been renamed to .setFromMatrixScale(). Please update your code.");
return this.setFromMatrixScale(a)},getColumnFromMatrix:function(a,b){console.warn("DEPRECATED: Vector3's .getColumnFromMatrix() has been renamed to .setFromMatrixColumn(). Please update your code.");return this.setFromMatrixColumn(a,b)},setFromMatrixPosition:function(a){this.x=a.elements[12];this.y=a.elements[13];this.z=a.elements[14];return this},setFromMatrixScale:function(a){var b=this.set(a.elements[0],a.elements[1],a.elements[2]).length(),c=this.set(a.elements[4],a.elements[5],a.elements[6]).length();
a=this.set(a.elements[8],a.elements[9],a.elements[10]).length();this.x=b;this.y=c;this.z=a;return this},setFromMatrixColumn:function(a,b){var c=4*a,d=b.elements;this.x=d[c];this.y=d[c+1];this.z=d[c+2];return this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a){this.x=a[0];this.y=a[1];this.z=a[2];return this},toArray:function(){return[this.x,this.y,this.z]},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}};THREE.Vector4=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1};
THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setW:function(a){this.w=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;
case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+a);}},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=void 0!==a.w?a.w:1;return this},add:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;this.w+=a;return this},
addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;this.w=a.w-b.w;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;this.w*=a;return this},
applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12]*e;this.y=a[1]*b+a[5]*c+a[9]*d+a[13]*e;this.z=a[2]*b+a[6]*c+a[10]*d+a[14]*e;this.w=a[3]*b+a[7]*c+a[11]*d+a[15]*e;return this},divideScalar:function(a){0!==a?(a=1/a,this.x*=a,this.y*=a,this.z*=a,this.w*=a):(this.z=this.y=this.x=0,this.w=1);return this},setAxisAngleFromQuaternion:function(a){this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);1E-4>b?(this.x=1,this.z=this.y=0):(this.x=a.x/b,
this.y=a.y/b,this.z=a.z/b);return this},setAxisAngleFromRotationMatrix:function(a){var b,c,d;a=a.elements;var e=a[0];d=a[4];var f=a[8],g=a[1],h=a[5],k=a[9];c=a[2];b=a[6];var l=a[10];if(0.01>Math.abs(d-g)&&0.01>Math.abs(f-c)&&0.01>Math.abs(k-b)){if(0.1>Math.abs(d+g)&&0.1>Math.abs(f+c)&&0.1>Math.abs(k+b)&&0.1>Math.abs(e+h+l-3))return this.set(1,0,0,0),this;a=Math.PI;e=(e+1)/2;h=(h+1)/2;l=(l+1)/2;d=(d+g)/4;f=(f+c)/4;k=(k+b)/4;e>h&&e>l?0.01>e?(b=0,d=c=0.707106781):(b=Math.sqrt(e),c=d/b,d=f/b):h>l?0.01>
h?(b=0.707106781,c=0,d=0.707106781):(c=Math.sqrt(h),b=d/c,d=k/c):0.01>l?(c=b=0.707106781,d=0):(d=Math.sqrt(l),b=f/d,c=k/d);this.set(b,c,d,a);return this}a=Math.sqrt((b-k)*(b-k)+(f-c)*(f-c)+(g-d)*(g-d));0.001>Math.abs(a)&&(a=1);this.x=(b-k)/a;this.y=(f-c)/a;this.z=(g-d)/a;this.w=Math.acos((e+h+l-1)/2);return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);this.z>a.z&&(this.z=a.z);this.w>a.w&&(this.w=a.w);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=
a.y);this.z<a.z&&(this.z=a.z);this.w<a.w&&(this.w=a.w);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);this.z<a.z?this.z=a.z:this.z>b.z&&(this.z=b.z);this.w<a.w?this.w=a.w:this.w>b.w&&(this.w=b.w);return this},clampScalar:function(){var a,b;return function(c,d){void 0===a&&(a=new THREE.Vector4,b=new THREE.Vector4);a.set(c,c,c,c);b.set(d,d,d,d);return this.clamp(a,b)}}(),floor:function(){this.x=Math.floor(this.x);this.y=
Math.floor(this.y);this.z=Math.floor(this.z);this.w=Math.floor(this.w);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);this.w=Math.ceil(this.w);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);this.w=Math.round(this.w);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):
Math.floor(this.z);this.w=0>this.w?Math.ceil(this.w):Math.floor(this.w);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length())},
setLength:function(a){var b=this.length();0!==b&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a){this.x=a[0];this.y=a[1];this.z=a[2];this.w=a[3];return this},toArray:function(){return[this.x,this.y,this.z,this.w]},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,
this.w)}};THREE.Euler=function(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._order=d||THREE.Euler.DefaultOrder};THREE.Euler.RotationOrders="XYZ YZX ZXY XZY YXZ ZYX".split(" ");THREE.Euler.DefaultOrder="XYZ";
THREE.Euler.prototype={constructor:THREE.Euler,_x:0,_y:0,_z:0,_order:THREE.Euler.DefaultOrder,get x(){return this._x},set x(a){this._x=a;this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a;this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a;this.onChangeCallback()},get order(){return this._order},set order(a){this._order=a;this.onChangeCallback()},set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._order=d||this._order;this.onChangeCallback();return this},copy:function(a){this._x=
a._x;this._y=a._y;this._z=a._z;this._order=a._order;this.onChangeCallback();return this},setFromRotationMatrix:function(a,b){var c=THREE.Math.clamp,d=a.elements,e=d[0],f=d[4],g=d[8],h=d[1],k=d[5],l=d[9],n=d[2],q=d[6],d=d[10];b=b||this._order;"XYZ"===b?(this._y=Math.asin(c(g,-1,1)),0.99999>Math.abs(g)?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-f,e)):(this._x=Math.atan2(q,k),this._z=0)):"YXZ"===b?(this._x=Math.asin(-c(l,-1,1)),0.99999>Math.abs(l)?(this._y=Math.atan2(g,d),this._z=Math.atan2(h,k)):
(this._y=Math.atan2(-n,e),this._z=0)):"ZXY"===b?(this._x=Math.asin(c(q,-1,1)),0.99999>Math.abs(q)?(this._y=Math.atan2(-n,d),this._z=Math.atan2(-f,k)):(this._y=0,this._z=Math.atan2(h,e))):"ZYX"===b?(this._y=Math.asin(-c(n,-1,1)),0.99999>Math.abs(n)?(this._x=Math.atan2(q,d),this._z=Math.atan2(h,e)):(this._x=0,this._z=Math.atan2(-f,k))):"YZX"===b?(this._z=Math.asin(c(h,-1,1)),0.99999>Math.abs(h)?(this._x=Math.atan2(-l,k),this._y=Math.atan2(-n,e)):(this._x=0,this._y=Math.atan2(g,d))):"XZY"===b?(this._z=
Math.asin(-c(f,-1,1)),0.99999>Math.abs(f)?(this._x=Math.atan2(q,k),this._y=Math.atan2(g,e)):(this._x=Math.atan2(-l,d),this._y=0)):console.warn("WARNING: Euler.setFromRotationMatrix() given unsupported order: "+b);this._order=b;this.onChangeCallback();return this},setFromQuaternion:function(a,b,c){var d=THREE.Math.clamp,e=a.x*a.x,f=a.y*a.y,g=a.z*a.z,h=a.w*a.w;b=b||this._order;"XYZ"===b?(this._x=Math.atan2(2*(a.x*a.w-a.y*a.z),h-e-f+g),this._y=Math.asin(d(2*(a.x*a.z+a.y*a.w),-1,1)),this._z=Math.atan2(2*
(a.z*a.w-a.x*a.y),h+e-f-g)):"YXZ"===b?(this._x=Math.asin(d(2*(a.x*a.w-a.y*a.z),-1,1)),this._y=Math.atan2(2*(a.x*a.z+a.y*a.w),h-e-f+g),this._z=Math.atan2(2*(a.x*a.y+a.z*a.w),h-e+f-g)):"ZXY"===b?(this._x=Math.asin(d(2*(a.x*a.w+a.y*a.z),-1,1)),this._y=Math.atan2(2*(a.y*a.w-a.z*a.x),h-e-f+g),this._z=Math.atan2(2*(a.z*a.w-a.x*a.y),h-e+f-g)):"ZYX"===b?(this._x=Math.atan2(2*(a.x*a.w+a.z*a.y),h-e-f+g),this._y=Math.asin(d(2*(a.y*a.w-a.x*a.z),-1,1)),this._z=Math.atan2(2*(a.x*a.y+a.z*a.w),h+e-f-g)):"YZX"===
b?(this._x=Math.atan2(2*(a.x*a.w-a.z*a.y),h-e+f-g),this._y=Math.atan2(2*(a.y*a.w-a.x*a.z),h+e-f-g),this._z=Math.asin(d(2*(a.x*a.y+a.z*a.w),-1,1))):"XZY"===b?(this._x=Math.atan2(2*(a.x*a.w+a.y*a.z),h-e+f-g),this._y=Math.atan2(2*(a.x*a.z+a.y*a.w),h+e-f-g),this._z=Math.asin(d(2*(a.z*a.w-a.x*a.y),-1,1))):console.warn("WARNING: Euler.setFromQuaternion() given unsupported order: "+b);this._order=b;if(!1!==c)this.onChangeCallback();return this},reorder:function(){var a=new THREE.Quaternion;return function(b){a.setFromEuler(this);
this.setFromQuaternion(a,b)}}(),equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._order===this._order},fromArray:function(a){this._x=a[0];this._y=a[1];this._z=a[2];void 0!==a[3]&&(this._order=a[3]);this.onChangeCallback();return this},toArray:function(){return[this._x,this._y,this._z,this._order]},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){},clone:function(){return new THREE.Euler(this._x,this._y,this._z,this._order)}};THREE.Line3=function(a,b){this.start=void 0!==a?a:new THREE.Vector3;this.end=void 0!==b?b:new THREE.Vector3};
THREE.Line3.prototype={constructor:THREE.Line3,set:function(a,b){this.start.copy(a);this.end.copy(b);return this},copy:function(a){this.start.copy(a.start);this.end.copy(a.end);return this},center:function(a){return(a||new THREE.Vector3).addVectors(this.start,this.end).multiplyScalar(0.5)},delta:function(a){return(a||new THREE.Vector3).subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,
b){var c=b||new THREE.Vector3;return this.delta(c).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d){a.subVectors(c,this.start);b.subVectors(this.end,this.start);var e=b.dot(b),e=b.dot(a)/e;d&&(e=THREE.Math.clamp(e,0,1));return e}}(),closestPointToPoint:function(a,b,c){a=this.closestPointToPointParameter(a,b);c=c||new THREE.Vector3;return this.delta(c).multiplyScalar(a).add(this.start)},applyMatrix4:function(a){this.start.applyMatrix4(a);
this.end.applyMatrix4(a);return this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)},clone:function(){return(new THREE.Line3).copy(this)}};THREE.Box2=function(a,b){this.min=void 0!==a?a:new THREE.Vector2(Infinity,Infinity);this.max=void 0!==b?b:new THREE.Vector2(-Infinity,-Infinity)};
THREE.Box2.prototype={constructor:THREE.Box2,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromPoints:function(a){if(0<a.length){var b=a[0];this.min.copy(b);this.max.copy(b);for(var c=1,d=a.length;c<d;c++)b=a[c],b.x<this.min.x?this.min.x=b.x:b.x>this.max.x&&(this.max.x=b.x),b.y<this.min.y?this.min.y=b.y:b.y>this.max.y&&(this.max.y=b.y)}else this.makeEmpty();return this},setFromCenterAndSize:function(){var a=new THREE.Vector2;return function(b,c){var d=a.copy(c).multiplyScalar(0.5);
this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=Infinity;this.max.x=this.max.y=-Infinity;return this},empty:function(){return this.max.x<this.min.x||this.max.y<this.min.y},center:function(a){return(a||new THREE.Vector2).addVectors(this.min,this.max).multiplyScalar(0.5)},size:function(a){return(a||new THREE.Vector2).subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);
this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y?!0:!1},getParameter:function(a,b){return(b||new THREE.Vector2).set((a.x-this.min.x)/(this.max.x-this.min.x),
(a.y-this.min.y)/(this.max.y-this.min.y))},isIntersectionBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y?!1:!0},clampPoint:function(a,b){return(b||new THREE.Vector2).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector2;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);
return this},translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box2).copy(this)}};THREE.Box3=function(a,b){this.min=void 0!==a?a:new THREE.Vector3(Infinity,Infinity,Infinity);this.max=void 0!==b?b:new THREE.Vector3(-Infinity,-Infinity,-Infinity)};
THREE.Box3.prototype={constructor:THREE.Box3,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},addPoint:function(a){a.x<this.min.x?this.min.x=a.x:a.x>this.max.x&&(this.max.x=a.x);a.y<this.min.y?this.min.y=a.y:a.y>this.max.y&&(this.max.y=a.y);a.z<this.min.z?this.min.z=a.z:a.z>this.max.z&&(this.max.z=a.z);return this},setFromPoints:function(a){if(0<a.length){var b=a[0];this.min.copy(b);this.max.copy(b);for(var b=1,c=a.length;b<c;b++)this.addPoint(a[b])}else this.makeEmpty();return this},
setFromCenterAndSize:function(){var a=new THREE.Vector3;return function(b,c){var d=a.copy(c).multiplyScalar(0.5);this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),setFromObject:function(){var a=new THREE.Vector3;return function(b){var c=this;b.updateMatrixWorld(!0);this.makeEmpty();b.traverse(function(b){if(void 0!==b.geometry&&void 0!==b.geometry.vertices)for(var e=b.geometry.vertices,f=0,g=e.length;f<g;f++)a.copy(e[f]),a.applyMatrix4(b.matrixWorld),c.expandByPoint(a)});return this}}(),
copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=this.min.z=Infinity;this.max.x=this.max.y=this.max.z=-Infinity;return this},empty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},center:function(a){return(a||new THREE.Vector3).addVectors(this.min,this.max).multiplyScalar(0.5)},size:function(a){return(a||new THREE.Vector3).subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);
this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z?!0:!1},getParameter:function(a,
b){return(b||new THREE.Vector3).set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},isIntersectionBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z?!1:!0},clampPoint:function(a,b){return(b||new THREE.Vector3).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){return a.copy(b).clamp(this.min,
this.max).sub(b).length()}}(),getBoundingSphere:function(){var a=new THREE.Vector3;return function(b){b=b||new THREE.Sphere;b.center=this.center();b.radius=0.5*this.size(a).length();return b}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},applyMatrix4:function(){var a=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];
return function(b){a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b);a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b);a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b);a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b);a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b);a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b);a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b);a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b);this.makeEmpty();
this.setFromPoints(a);return this}}(),translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box3).copy(this)}};THREE.Matrix3=function(a,b,c,d,e,f,g,h,k){var l=this.elements=new Float32Array(9);l[0]=void 0!==a?a:1;l[3]=b||0;l[6]=c||0;l[1]=d||0;l[4]=void 0!==e?e:1;l[7]=f||0;l[2]=g||0;l[5]=h||0;l[8]=void 0!==k?k:1};
THREE.Matrix3.prototype={constructor:THREE.Matrix3,set:function(a,b,c,d,e,f,g,h,k){var l=this.elements;l[0]=a;l[3]=b;l[6]=c;l[1]=d;l[4]=e;l[7]=f;l[2]=g;l[5]=h;l[8]=k;return this},identity:function(){this.set(1,0,0,0,1,0,0,0,1);return this},copy:function(a){a=a.elements;this.set(a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8]);return this},multiplyVector3:function(a){console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");return a.applyMatrix3(this)},
multiplyVector3Array:function(a){console.warn("DEPRECATED: Matrix3's .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");return this.applyToVector3Array(a)},applyToVector3Array:function(){var a=new THREE.Vector3;return function(b,c,d){void 0===c&&(c=0);void 0===d&&(d=b.length);for(var e=0;e<d;e+=3,c+=3)a.x=b[c],a.y=b[c+1],a.z=b[c+2],a.applyMatrix3(this),b[c]=a.x,b[c+1]=a.y,b[c+2]=a.z;return b}}(),multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[3]*=
a;b[6]*=a;b[1]*=a;b[4]*=a;b[7]*=a;b[2]*=a;b[5]*=a;b[8]*=a;return this},determinant:function(){var a=this.elements,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],k=a[7],a=a[8];return b*f*a-b*g*k-c*e*a+c*g*h+d*e*k-d*f*h},getInverse:function(a,b){var c=a.elements,d=this.elements;d[0]=c[10]*c[5]-c[6]*c[9];d[1]=-c[10]*c[1]+c[2]*c[9];d[2]=c[6]*c[1]-c[2]*c[5];d[3]=-c[10]*c[4]+c[6]*c[8];d[4]=c[10]*c[0]-c[2]*c[8];d[5]=-c[6]*c[0]+c[2]*c[4];d[6]=c[9]*c[4]-c[5]*c[8];d[7]=-c[9]*c[0]+c[1]*c[8];d[8]=c[5]*c[0]-
c[1]*c[4];c=c[0]*d[0]+c[1]*d[3]+c[2]*d[6];if(0===c){if(b)throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");this.identity();return this}this.multiplyScalar(1/c);return this},transpose:function(){var a,b=this.elements;a=b[1];b[1]=b[3];b[3]=a;a=b[2];b[2]=b[6];b[6]=a;a=b[5];b[5]=b[7];b[7]=a;return this},flattenToArrayOffset:function(a,b){var c=this.elements;a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];
a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];return a},getNormalMatrix:function(a){this.getInverse(a).transpose();return this},transposeIntoArray:function(a){var b=this.elements;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this},fromArray:function(a){this.elements.set(a);return this},toArray:function(){var a=this.elements;return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]]},clone:function(){var a=this.elements;return new THREE.Matrix3(a[0],
a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8])}};THREE.Matrix4=function(a,b,c,d,e,f,g,h,k,l,n,q,p,s,t,r){var v=this.elements=new Float32Array(16);v[0]=void 0!==a?a:1;v[4]=b||0;v[8]=c||0;v[12]=d||0;v[1]=e||0;v[5]=void 0!==f?f:1;v[9]=g||0;v[13]=h||0;v[2]=k||0;v[6]=l||0;v[10]=void 0!==n?n:1;v[14]=q||0;v[3]=p||0;v[7]=s||0;v[11]=t||0;v[15]=void 0!==r?r:1};
THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,e,f,g,h,k,l,n,q,p,s,t,r){var v=this.elements;v[0]=a;v[4]=b;v[8]=c;v[12]=d;v[1]=e;v[5]=f;v[9]=g;v[13]=h;v[2]=k;v[6]=l;v[10]=n;v[14]=q;v[3]=p;v[7]=s;v[11]=t;v[15]=r;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(a){this.elements.set(a.elements);return this},extractPosition:function(a){console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition().");
return this.copyPosition(a)},copyPosition:function(a){var b=this.elements;a=a.elements;b[12]=a[12];b[13]=a[13];b[14]=a[14];return this},extractRotation:function(){var a=new THREE.Vector3;return function(b){var c=this.elements;b=b.elements;var d=1/a.set(b[0],b[1],b[2]).length(),e=1/a.set(b[4],b[5],b[6]).length(),f=1/a.set(b[8],b[9],b[10]).length();c[0]=b[0]*d;c[1]=b[1]*d;c[2]=b[2]*d;c[4]=b[4]*e;c[5]=b[5]*e;c[6]=b[6]*e;c[8]=b[8]*f;c[9]=b[9]*f;c[10]=b[10]*f;return this}}(),makeRotationFromEuler:function(a){!1===
a instanceof THREE.Euler&&console.error("ERROR: Matrix's .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");var b=this.elements,c=a.x,d=a.y,e=a.z,f=Math.cos(c),c=Math.sin(c),g=Math.cos(d),d=Math.sin(d),h=Math.cos(e),e=Math.sin(e);if("XYZ"===a.order){a=f*h;var k=f*e,l=c*h,n=c*e;b[0]=g*h;b[4]=-g*e;b[8]=d;b[1]=k+l*d;b[5]=a-n*d;b[9]=-c*g;b[2]=n-a*d;b[6]=l+k*d;b[10]=f*g}else"YXZ"===a.order?(a=g*h,k=g*e,l=d*h,n=d*e,b[0]=a+n*c,b[4]=l*c-k,b[8]=
f*d,b[1]=f*e,b[5]=f*h,b[9]=-c,b[2]=k*c-l,b[6]=n+a*c,b[10]=f*g):"ZXY"===a.order?(a=g*h,k=g*e,l=d*h,n=d*e,b[0]=a-n*c,b[4]=-f*e,b[8]=l+k*c,b[1]=k+l*c,b[5]=f*h,b[9]=n-a*c,b[2]=-f*d,b[6]=c,b[10]=f*g):"ZYX"===a.order?(a=f*h,k=f*e,l=c*h,n=c*e,b[0]=g*h,b[4]=l*d-k,b[8]=a*d+n,b[1]=g*e,b[5]=n*d+a,b[9]=k*d-l,b[2]=-d,b[6]=c*g,b[10]=f*g):"YZX"===a.order?(a=f*g,k=f*d,l=c*g,n=c*d,b[0]=g*h,b[4]=n-a*e,b[8]=l*e+k,b[1]=e,b[5]=f*h,b[9]=-c*h,b[2]=-d*h,b[6]=k*e+l,b[10]=a-n*e):"XZY"===a.order&&(a=f*g,k=f*d,l=c*g,n=c*d,b[0]=
g*h,b[4]=-e,b[8]=d*h,b[1]=a*e+n,b[5]=f*h,b[9]=k*e-l,b[2]=l*e-k,b[6]=c*h,b[10]=n*e+a);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},setRotationFromQuaternion:function(a){console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code.");return this.makeRotationFromQuaternion(a)},makeRotationFromQuaternion:function(a){var b=this.elements,c=a.x,d=a.y,e=a.z,f=a.w,g=c+c,h=d+d,k=e+e;a=c*g;var l=c*
h,c=c*k,n=d*h,d=d*k,e=e*k,g=f*g,h=f*h,f=f*k;b[0]=1-(n+e);b[4]=l-f;b[8]=c+h;b[1]=l+f;b[5]=1-(a+e);b[9]=d-g;b[2]=c-h;b[6]=d+g;b[10]=1-(a+n);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},lookAt:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f){var g=this.elements;c.subVectors(d,e).normalize();0===c.length()&&(c.z=1);a.crossVectors(f,c).normalize();0===a.length()&&(c.x+=1E-4,a.crossVectors(f,c).normalize());b.crossVectors(c,a);g[0]=
a.x;g[4]=b.x;g[8]=c.x;g[1]=a.y;g[5]=b.y;g[9]=c.y;g[2]=a.z;g[6]=b.z;g[10]=c.z;return this}}(),multiply:function(a,b){return void 0!==b?(console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(a,b)):this.multiplyMatrices(this,a)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[4],h=c[8],k=c[12],l=c[1],n=c[5],q=c[9],p=c[13],s=c[2],t=c[6],r=c[10],v=c[14],w=c[3],u=c[7],y=c[11],
c=c[15],L=d[0],x=d[4],N=d[8],J=d[12],B=d[1],K=d[5],A=d[9],G=d[13],D=d[2],C=d[6],F=d[10],z=d[14],H=d[3],E=d[7],Q=d[11],d=d[15];e[0]=f*L+g*B+h*D+k*H;e[4]=f*x+g*K+h*C+k*E;e[8]=f*N+g*A+h*F+k*Q;e[12]=f*J+g*G+h*z+k*d;e[1]=l*L+n*B+q*D+p*H;e[5]=l*x+n*K+q*C+p*E;e[9]=l*N+n*A+q*F+p*Q;e[13]=l*J+n*G+q*z+p*d;e[2]=s*L+t*B+r*D+v*H;e[6]=s*x+t*K+r*C+v*E;e[10]=s*N+t*A+r*F+v*Q;e[14]=s*J+t*G+r*z+v*d;e[3]=w*L+u*B+y*D+c*H;e[7]=w*x+u*K+y*C+c*E;e[11]=w*N+u*A+y*F+c*Q;e[15]=w*J+u*G+y*z+c*d;return this},multiplyToArray:function(a,
b,c){var d=this.elements;this.multiplyMatrices(a,b);c[0]=d[0];c[1]=d[1];c[2]=d[2];c[3]=d[3];c[4]=d[4];c[5]=d[5];c[6]=d[6];c[7]=d[7];c[8]=d[8];c[9]=d[9];c[10]=d[10];c[11]=d[11];c[12]=d[12];c[13]=d[13];c[14]=d[14];c[15]=d[15];return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[4]*=a;b[8]*=a;b[12]*=a;b[1]*=a;b[5]*=a;b[9]*=a;b[13]*=a;b[2]*=a;b[6]*=a;b[10]*=a;b[14]*=a;b[3]*=a;b[7]*=a;b[11]*=a;b[15]*=a;return this},multiplyVector3:function(a){console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
return a.applyProjection(this)},multiplyVector4:function(a){console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},multiplyVector3Array:function(a){console.warn("DEPRECATED: Matrix4's .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");return this.applyToVector3Array(a)},applyToVector3Array:function(){var a=new THREE.Vector3;return function(b,c,d){void 0===c&&(c=0);
void 0===d&&(d=b.length);for(var e=0;e<d;e+=3,c+=3)a.x=b[c],a.y=b[c+1],a.z=b[c+2],a.applyMatrix4(this),b[c]=a.x,b[c+1]=a.y,b[c+2]=a.z;return b}}(),rotateAxis:function(a){console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");a.transformDirection(this)},crossVector:function(a){console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},determinant:function(){var a=
this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],g=a[5],h=a[9],k=a[13],l=a[2],n=a[6],q=a[10],p=a[14];return a[3]*(+e*h*n-d*k*n-e*g*q+c*k*q+d*g*p-c*h*p)+a[7]*(+b*h*p-b*k*q+e*f*q-d*f*p+d*k*l-e*h*l)+a[11]*(+b*k*n-b*g*p-e*f*n+c*f*p+e*g*l-c*k*l)+a[15]*(-d*g*l-b*h*n+b*g*q+d*f*n-c*f*q+c*h*l)},transpose:function(){var a=this.elements,b;b=a[1];a[1]=a[4];a[4]=b;b=a[2];a[2]=a[8];a[8]=b;b=a[6];a[6]=a[9];a[9]=b;b=a[3];a[3]=a[12];a[12]=b;b=a[7];a[7]=a[13];a[13]=b;b=a[11];a[11]=a[14];a[14]=b;return this},flattenToArrayOffset:function(a,
b){var c=this.elements;a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];a[b+9]=c[9];a[b+10]=c[10];a[b+11]=c[11];a[b+12]=c[12];a[b+13]=c[13];a[b+14]=c[14];a[b+15]=c[15];return a},getPosition:function(){var a=new THREE.Vector3;return function(){console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");var b=this.elements;return a.set(b[12],b[13],b[14])}}(),setPosition:function(a){var b=
this.elements;b[12]=a.x;b[13]=a.y;b[14]=a.z;return this},getInverse:function(a,b){var c=this.elements,d=a.elements,e=d[0],f=d[4],g=d[8],h=d[12],k=d[1],l=d[5],n=d[9],q=d[13],p=d[2],s=d[6],t=d[10],r=d[14],v=d[3],w=d[7],u=d[11],d=d[15];c[0]=n*r*w-q*t*w+q*s*u-l*r*u-n*s*d+l*t*d;c[4]=h*t*w-g*r*w-h*s*u+f*r*u+g*s*d-f*t*d;c[8]=g*q*w-h*n*w+h*l*u-f*q*u-g*l*d+f*n*d;c[12]=h*n*s-g*q*s-h*l*t+f*q*t+g*l*r-f*n*r;c[1]=q*t*v-n*r*v-q*p*u+k*r*u+n*p*d-k*t*d;c[5]=g*r*v-h*t*v+h*p*u-e*r*u-g*p*d+e*t*d;c[9]=h*n*v-g*q*v-h*k*
u+e*q*u+g*k*d-e*n*d;c[13]=g*q*p-h*n*p+h*k*t-e*q*t-g*k*r+e*n*r;c[2]=l*r*v-q*s*v+q*p*w-k*r*w-l*p*d+k*s*d;c[6]=h*s*v-f*r*v-h*p*w+e*r*w+f*p*d-e*s*d;c[10]=f*q*v-h*l*v+h*k*w-e*q*w-f*k*d+e*l*d;c[14]=h*l*p-f*q*p-h*k*s+e*q*s+f*k*r-e*l*r;c[3]=n*s*v-l*t*v-n*p*w+k*t*w+l*p*u-k*s*u;c[7]=f*t*v-g*s*v+g*p*w-e*t*w-f*p*u+e*s*u;c[11]=g*l*v-f*n*v-g*k*w+e*n*w+f*k*u-e*l*u;c[15]=f*n*p-g*l*p+g*k*s-e*n*s-f*k*t+e*l*t;c=e*c[0]+k*c[4]+p*c[8]+v*c[12];if(0==c){if(b)throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");this.identity();return this}this.multiplyScalar(1/c);return this},translate:function(a){console.warn("DEPRECATED: Matrix4's .translate() has been removed.")},rotateX:function(a){console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")},rotateY:function(a){console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")},rotateZ:function(a){console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")},rotateByAxis:function(a,
b){console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")},scale:function(a){var b=this.elements,c=a.x,d=a.y;a=a.z;b[0]*=c;b[4]*=d;b[8]*=a;b[1]*=c;b[5]*=d;b[9]*=a;b[2]*=c;b[6]*=d;b[10]*=a;b[3]*=c;b[7]*=d;b[11]*=a;return this},getMaxScaleOnAxis:function(){var a=this.elements;return Math.sqrt(Math.max(a[0]*a[0]+a[1]*a[1]+a[2]*a[2],Math.max(a[4]*a[4]+a[5]*a[5]+a[6]*a[6],a[8]*a[8]+a[9]*a[9]+a[10]*a[10])))},makeTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},
makeRotationX:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},makeRotationY:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},makeRotationZ:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,g=a.y,h=a.z,k=e*f,l=e*g;this.set(k*f+c,k*g-d*h,k*h+d*g,0,k*g+d*h,l*g+c,l*h-d*f,0,k*h-
d*g,l*h+d*f,e*h*h+c,0,0,0,0,1);return this},makeScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},compose:function(a,b,c){this.makeRotationFromQuaternion(b);this.scale(c);this.setPosition(a);return this},decompose:function(){var a=new THREE.Vector3,b=new THREE.Matrix4;return function(c,d,e){var f=this.elements,g=a.set(f[0],f[1],f[2]).length(),h=a.set(f[4],f[5],f[6]).length(),k=a.set(f[8],f[9],f[10]).length();0>this.determinant()&&(g=-g);c.x=f[12];c.y=f[13];c.z=f[14];b.elements.set(this.elements);
c=1/g;var f=1/h,l=1/k;b.elements[0]*=c;b.elements[1]*=c;b.elements[2]*=c;b.elements[4]*=f;b.elements[5]*=f;b.elements[6]*=f;b.elements[8]*=l;b.elements[9]*=l;b.elements[10]*=l;d.setFromRotationMatrix(b);e.x=g;e.y=h;e.z=k;return this}}(),makeFrustum:function(a,b,c,d,e,f){var g=this.elements;g[0]=2*e/(b-a);g[4]=0;g[8]=(b+a)/(b-a);g[12]=0;g[1]=0;g[5]=2*e/(d-c);g[9]=(d+c)/(d-c);g[13]=0;g[2]=0;g[6]=0;g[10]=-(f+e)/(f-e);g[14]=-2*f*e/(f-e);g[3]=0;g[7]=0;g[11]=-1;g[15]=0;return this},makePerspective:function(a,
b,c,d){a=c*Math.tan(THREE.Math.degToRad(0.5*a));var e=-a;return this.makeFrustum(e*b,a*b,e,a,c,d)},makeOrthographic:function(a,b,c,d,e,f){var g=this.elements,h=b-a,k=c-d,l=f-e;g[0]=2/h;g[4]=0;g[8]=0;g[12]=-((b+a)/h);g[1]=0;g[5]=2/k;g[9]=0;g[13]=-((c+d)/k);g[2]=0;g[6]=0;g[10]=-2/l;g[14]=-((f+e)/l);g[3]=0;g[7]=0;g[11]=0;g[15]=1;return this},fromArray:function(a){this.elements.set(a);return this},toArray:function(){var a=this.elements;return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],
a[12],a[13],a[14],a[15]]},clone:function(){var a=this.elements;return new THREE.Matrix4(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15])}};THREE.Ray=function(a,b){this.origin=void 0!==a?a:new THREE.Vector3;this.direction=void 0!==b?b:new THREE.Vector3};
THREE.Ray.prototype={constructor:THREE.Ray,set:function(a,b){this.origin.copy(a);this.direction.copy(b);return this},copy:function(a){this.origin.copy(a.origin);this.direction.copy(a.direction);return this},at:function(a,b){return(b||new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)},recast:function(){var a=new THREE.Vector3;return function(b){this.origin.copy(this.at(b,a));return this}}(),closestPointToPoint:function(a,b){var c=b||new THREE.Vector3;c.subVectors(a,this.origin);
var d=c.dot(this.direction);return 0>d?c.copy(this.origin):c.copy(this.direction).multiplyScalar(d).add(this.origin)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);if(0>c)return this.origin.distanceTo(b);a.copy(this.direction).multiplyScalar(c).add(this.origin);return a.distanceTo(b)}}(),distanceSqToSegment:function(a,b,c,d){var e=a.clone().add(b).multiplyScalar(0.5),f=b.clone().sub(a).normalize(),g=0.5*a.distanceTo(b),
h=this.origin.clone().sub(e);a=-this.direction.dot(f);b=h.dot(this.direction);var k=-h.dot(f),l=h.lengthSq(),n=Math.abs(1-a*a),q,p;0<=n?(h=a*k-b,q=a*b-k,p=g*n,0<=h?q>=-p?q<=p?(g=1/n,h*=g,q*=g,a=h*(h+a*q+2*b)+q*(a*h+q+2*k)+l):(q=g,h=Math.max(0,-(a*q+b)),a=-h*h+q*(q+2*k)+l):(q=-g,h=Math.max(0,-(a*q+b)),a=-h*h+q*(q+2*k)+l):q<=-p?(h=Math.max(0,-(-a*g+b)),q=0<h?-g:Math.min(Math.max(-g,-k),g),a=-h*h+q*(q+2*k)+l):q<=p?(h=0,q=Math.min(Math.max(-g,-k),g),a=q*(q+2*k)+l):(h=Math.max(0,-(a*g+b)),q=0<h?g:Math.min(Math.max(-g,
-k),g),a=-h*h+q*(q+2*k)+l)):(q=0<a?-g:g,h=Math.max(0,-(a*q+b)),a=-h*h+q*(q+2*k)+l);c&&c.copy(this.direction.clone().multiplyScalar(h).add(this.origin));d&&d.copy(f.clone().multiplyScalar(q).add(e));return a},isIntersectionSphere:function(a){return this.distanceToPoint(a.center)<=a.radius},isIntersectionPlane:function(a){var b=a.distanceToPoint(this.origin);return 0===b||0>a.normal.dot(this.direction)*b?!0:!1},distanceToPlane:function(a){var b=a.normal.dot(this.direction);if(0==b)return 0==a.distanceToPoint(this.origin)?
0:null;a=-(this.origin.dot(a.normal)+a.constant)/b;return 0<=a?a:null},intersectPlane:function(a,b){var c=this.distanceToPlane(a);return null===c?null:this.at(c,b)},isIntersectionBox:function(){var a=new THREE.Vector3;return function(b){return null!==this.intersectBox(b,a)}}(),intersectBox:function(a,b){var c,d,e,f,g;d=1/this.direction.x;f=1/this.direction.y;g=1/this.direction.z;var h=this.origin;0<=d?(c=(a.min.x-h.x)*d,d*=a.max.x-h.x):(c=(a.max.x-h.x)*d,d*=a.min.x-h.x);0<=f?(e=(a.min.y-h.y)*f,f*=
a.max.y-h.y):(e=(a.max.y-h.y)*f,f*=a.min.y-h.y);if(c>f||e>d)return null;if(e>c||c!==c)c=e;if(f<d||d!==d)d=f;0<=g?(e=(a.min.z-h.z)*g,g*=a.max.z-h.z):(e=(a.max.z-h.z)*g,g*=a.min.z-h.z);if(c>g||e>d)return null;if(e>c||c!==c)c=e;if(g<d||d!==d)d=g;return 0>d?null:this.at(0<=c?c:d,b)},intersectTriangle:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3,d=new THREE.Vector3;return function(e,f,g,h,k){b.subVectors(f,e);c.subVectors(g,e);d.crossVectors(b,c);f=this.direction.dot(d);if(0<
f){if(h)return null;h=1}else if(0>f)h=-1,f=-f;else return null;a.subVectors(this.origin,e);e=h*this.direction.dot(c.crossVectors(a,c));if(0>e)return null;g=h*this.direction.dot(b.cross(a));if(0>g||e+g>f)return null;e=-h*a.dot(d);return 0>e?null:this.at(e/f,k)}}(),applyMatrix4:function(a){this.direction.add(this.origin).applyMatrix4(a);this.origin.applyMatrix4(a);this.direction.sub(this.origin);this.direction.normalize();return this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)},
clone:function(){return(new THREE.Ray).copy(this)}};THREE.Sphere=function(a,b){this.center=void 0!==a?a:new THREE.Vector3;this.radius=void 0!==b?b:0};
THREE.Sphere.prototype={constructor:THREE.Sphere,set:function(a,b){this.center.copy(a);this.radius=b;return this},setFromPoints:function(){var a=new THREE.Box3;return function(b,c){var d=this.center;void 0!==c?d.copy(c):a.setFromPoints(b).center(d);for(var e=0,f=0,g=b.length;f<g;f++)e=Math.max(e,d.distanceToSquared(b[f]));this.radius=Math.sqrt(e);return this}}(),copy:function(a){this.center.copy(a.center);this.radius=a.radius;return this},empty:function(){return 0>=this.radius},containsPoint:function(a){return a.distanceToSquared(this.center)<=
this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=b*b},clampPoint:function(a,b){var c=this.center.distanceToSquared(a),d=b||new THREE.Vector3;d.copy(a);c>this.radius*this.radius&&(d.sub(this.center).normalize(),d.multiplyScalar(this.radius).add(this.center));return d},getBoundingBox:function(a){a=a||new THREE.Box3;a.set(this.center,this.center);a.expandByScalar(this.radius);
return a},applyMatrix4:function(a){this.center.applyMatrix4(a);this.radius*=a.getMaxScaleOnAxis();return this},translate:function(a){this.center.add(a);return this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius},clone:function(){return(new THREE.Sphere).copy(this)}};THREE.Frustum=function(a,b,c,d,e,f){this.planes=[void 0!==a?a:new THREE.Plane,void 0!==b?b:new THREE.Plane,void 0!==c?c:new THREE.Plane,void 0!==d?d:new THREE.Plane,void 0!==e?e:new THREE.Plane,void 0!==f?f:new THREE.Plane]};
THREE.Frustum.prototype={constructor:THREE.Frustum,set:function(a,b,c,d,e,f){var g=this.planes;g[0].copy(a);g[1].copy(b);g[2].copy(c);g[3].copy(d);g[4].copy(e);g[5].copy(f);return this},copy:function(a){for(var b=this.planes,c=0;6>c;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements;a=c[0];var d=c[1],e=c[2],f=c[3],g=c[4],h=c[5],k=c[6],l=c[7],n=c[8],q=c[9],p=c[10],s=c[11],t=c[12],r=c[13],v=c[14],c=c[15];b[0].setComponents(f-a,l-g,s-n,c-t).normalize();b[1].setComponents(f+
a,l+g,s+n,c+t).normalize();b[2].setComponents(f+d,l+h,s+q,c+r).normalize();b[3].setComponents(f-d,l-h,s-q,c-r).normalize();b[4].setComponents(f-e,l-k,s-p,c-v).normalize();b[5].setComponents(f+e,l+k,s+p,c+v).normalize();return this},intersectsObject:function(){var a=new THREE.Sphere;return function(b){var c=b.geometry;null===c.boundingSphere&&c.computeBoundingSphere();a.copy(c.boundingSphere);a.applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),intersectsSphere:function(a){var b=this.planes,
c=a.center;a=-a.radius;for(var d=0;6>d;d++)if(b[d].distanceToPoint(c)<a)return!1;return!0},intersectsBox:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c){for(var d=this.planes,e=0;6>e;e++){var f=d[e];a.x=0<f.normal.x?c.min.x:c.max.x;b.x=0<f.normal.x?c.max.x:c.min.x;a.y=0<f.normal.y?c.min.y:c.max.y;b.y=0<f.normal.y?c.max.y:c.min.y;a.z=0<f.normal.z?c.min.z:c.max.z;b.z=0<f.normal.z?c.max.z:c.min.z;var g=f.distanceToPoint(a),f=f.distanceToPoint(b);if(0>g&&0>f)return!1}return!0}}(),
containsPoint:function(a){for(var b=this.planes,c=0;6>c;c++)if(0>b[c].distanceToPoint(a))return!1;return!0},clone:function(){return(new THREE.Frustum).copy(this)}};THREE.Plane=function(a,b){this.normal=void 0!==a?a:new THREE.Vector3(1,0,0);this.constant=void 0!==b?b:0};
THREE.Plane.prototype={constructor:THREE.Plane,set:function(a,b){this.normal.copy(a);this.constant=b;return this},setComponents:function(a,b,c,d){this.normal.set(a,b,c);this.constant=d;return this},setFromNormalAndCoplanarPoint:function(a,b){this.normal.copy(a);this.constant=-b.dot(this.normal);return this},setFromCoplanarPoints:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d,e){d=a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();this.setFromNormalAndCoplanarPoint(d,
c);return this}}(),copy:function(a){this.normal.copy(a.normal);this.constant=a.constant;return this},normalize:function(){var a=1/this.normal.length();this.normal.multiplyScalar(a);this.constant*=a;return this},negate:function(){this.constant*=-1;this.normal.negate();return this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return this.orthoPoint(a,b).sub(a).negate()},orthoPoint:function(a,
b){var c=this.distanceToPoint(a);return(b||new THREE.Vector3).copy(this.normal).multiplyScalar(c)},isIntersectionLine:function(a){var b=this.distanceToPoint(a.start);a=this.distanceToPoint(a.end);return 0>b&&0<a||0>a&&0<b},intersectLine:function(){var a=new THREE.Vector3;return function(b,c){var d=c||new THREE.Vector3,e=b.delta(a),f=this.normal.dot(e);if(0==f){if(0==this.distanceToPoint(b.start))return d.copy(b.start)}else return f=-(b.start.dot(this.normal)+this.constant)/f,0>f||1<f?void 0:d.copy(e).multiplyScalar(f).add(b.start)}}(),
coplanarPoint:function(a){return(a||new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Matrix3;return function(d,e){var f=e||c.getNormalMatrix(d),f=a.copy(this.normal).applyMatrix3(f),g=this.coplanarPoint(b);g.applyMatrix4(d);this.setFromNormalAndCoplanarPoint(f,g);return this}}(),translate:function(a){this.constant-=a.dot(this.normal);return this},equals:function(a){return a.normal.equals(this.normal)&&
a.constant==this.constant},clone:function(){return(new THREE.Plane).copy(this)}};THREE.Math={generateUUID:function(){var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),b=Array(36),c=0,d;return function(){for(var e=0;36>e;e++)8==e||13==e||18==e||23==e?b[e]="-":14==e?b[e]="4":(2>=c&&(c=33554432+16777216*Math.random()|0),d=c&15,c>>=4,b[e]=a[19==e?d&3|8:d]);return b.join("")}}(),clamp:function(a,b,c){return a<b?b:a>c?c:a},clampBottom:function(a,b){return a<b?b:a},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},smoothstep:function(a,b,c){if(a<=
b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*(3-2*a)},smootherstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*a*(a*(6*a-15)+10)},random16:function(){return(65280*Math.random()+255*Math.random())/65535},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(0.5-Math.random())},sign:function(a){return 0>a?-1:0<a?1:0},degToRad:function(){var a=Math.PI/180;return function(b){return b*
a}}(),radToDeg:function(){var a=180/Math.PI;return function(b){return b*a}}(),isPowerOfTwo:function(a){return 0===(a&a-1)&&0!==a}};THREE.Spline=function(a){function b(a,b,c,d,e,f,g){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*g+(-3*(b-c)-2*a-d)*f+a*e+b}this.points=a;var c=[],d={x:0,y:0,z:0},e,f,g,h,k,l,n,q,p;this.initFromArray=function(a){this.points=[];for(var b=0;b<a.length;b++)this.points[b]={x:a[b][0],y:a[b][1],z:a[b][2]}};this.getPoint=function(a){e=(this.points.length-1)*a;f=Math.floor(e);g=e-f;c[0]=0===f?f:f-1;c[1]=f;c[2]=f>this.points.length-2?this.points.length-1:f+1;c[3]=f>this.points.length-3?this.points.length-1:
f+2;l=this.points[c[0]];n=this.points[c[1]];q=this.points[c[2]];p=this.points[c[3]];h=g*g;k=g*h;d.x=b(l.x,n.x,q.x,p.x,g,h,k);d.y=b(l.y,n.y,q.y,p.y,g,h,k);d.z=b(l.z,n.z,q.z,p.z,g,h,k);return d};this.getControlPointsArray=function(){var a,b,c=this.points.length,d=[];for(a=0;a<c;a++)b=this.points[a],d[a]=[b.x,b.y,b.z];return d};this.getLength=function(a){var b,c,d,e=b=b=0,f=new THREE.Vector3,g=new THREE.Vector3,h=[],k=0;h[0]=0;a||(a=100);c=this.points.length*a;f.copy(this.points[0]);for(a=1;a<c;a++)b=
a/c,d=this.getPoint(b),g.copy(d),k+=g.distanceTo(f),f.copy(d),b*=this.points.length-1,b=Math.floor(b),b!=e&&(h[b]=k,e=b);h[h.length]=k;return{chunks:h,total:k}};this.reparametrizeByArcLength=function(a){var b,c,d,e,f,g,h=[],k=new THREE.Vector3,l=this.getLength();h.push(k.copy(this.points[0]).clone());for(b=1;b<this.points.length;b++){c=l.chunks[b]-l.chunks[b-1];g=Math.ceil(a*c/l.total);e=(b-1)/(this.points.length-1);f=b/(this.points.length-1);for(c=1;c<g-1;c++)d=e+1/g*c*(f-e),d=this.getPoint(d),h.push(k.copy(d).clone());
h.push(k.copy(this.points[b]).clone())}this.points=h}};THREE.Triangle=function(a,b,c){this.a=void 0!==a?a:new THREE.Vector3;this.b=void 0!==b?b:new THREE.Vector3;this.c=void 0!==c?c:new THREE.Vector3};THREE.Triangle.normal=function(){var a=new THREE.Vector3;return function(b,c,d,e){e=e||new THREE.Vector3;e.subVectors(d,c);a.subVectors(b,c);e.cross(a);b=e.lengthSq();return 0<b?e.multiplyScalar(1/Math.sqrt(b)):e.set(0,0,0)}}();
THREE.Triangle.barycoordFromPoint=function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f,g,h){a.subVectors(g,e);b.subVectors(f,e);c.subVectors(d,e);d=a.dot(a);e=a.dot(b);f=a.dot(c);var k=b.dot(b);g=b.dot(c);var l=d*k-e*e;h=h||new THREE.Vector3;if(0==l)return h.set(-2,-1,-1);l=1/l;k=(k*f-e*g)*l;d=(d*g-e*f)*l;return h.set(1-k-d,d,k)}}();
THREE.Triangle.containsPoint=function(){var a=new THREE.Vector3;return function(b,c,d,e){b=THREE.Triangle.barycoordFromPoint(b,c,d,e,a);return 0<=b.x&&0<=b.y&&1>=b.x+b.y}}();
THREE.Triangle.prototype={constructor:THREE.Triangle,set:function(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this},setFromPointsAndIndices:function(a,b,c,d){this.a.copy(a[b]);this.b.copy(a[c]);this.c.copy(a[d]);return this},copy:function(a){this.a.copy(a.a);this.b.copy(a.b);this.c.copy(a.c);return this},area:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(){a.subVectors(this.c,this.b);b.subVectors(this.a,this.b);return 0.5*a.cross(b).length()}}(),midpoint:function(a){return(a||
new THREE.Vector3).addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return THREE.Triangle.normal(this.a,this.b,this.c,a)},plane:function(a){return(a||new THREE.Plane).setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(a,b){return THREE.Triangle.barycoordFromPoint(a,this.a,this.b,this.c,b)},containsPoint:function(a){return THREE.Triangle.containsPoint(a,this.a,this.b,this.c)},equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)},
clone:function(){return(new THREE.Triangle).copy(this)}};THREE.Vertex=function(a){console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");return a};THREE.Clock=function(a){this.autoStart=void 0!==a?a:!0;this.elapsedTime=this.oldTime=this.startTime=0;this.running=!1};
THREE.Clock.prototype={constructor:THREE.Clock,start:function(){this.oldTime=this.startTime=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now();this.running=!0},stop:function(){this.getElapsedTime();this.running=!1},getElapsedTime:function(){this.getDelta();return this.elapsedTime},getDelta:function(){var a=0;this.autoStart&&!this.running&&this.start();if(this.running){var b=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now(),
a=0.001*(b-this.oldTime);this.oldTime=b;this.elapsedTime+=a}return a}};THREE.EventDispatcher=function(){};
THREE.EventDispatcher.prototype={constructor:THREE.EventDispatcher,apply:function(a){a.addEventListener=THREE.EventDispatcher.prototype.addEventListener;a.hasEventListener=THREE.EventDispatcher.prototype.hasEventListener;a.removeEventListener=THREE.EventDispatcher.prototype.removeEventListener;a.dispatchEvent=THREE.EventDispatcher.prototype.dispatchEvent},addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]);-1===c[a].indexOf(b)&&
c[a].push(b)},hasEventListener:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)?!0:!1},removeEventListener:function(a,b){if(void 0!==this._listeners){var c=this._listeners[a];if(void 0!==c){var d=c.indexOf(b);-1!==d&&c.splice(d,1)}}},dispatchEvent:function(a){if(void 0!==this._listeners){var b=this._listeners[a.type];if(void 0!==b){a.target=this;for(var c=[],d=b.length,e=0;e<d;e++)c[e]=b[e];for(e=0;e<d;e++)c[e].call(this,a)}}}};(function(a){a.Raycaster=function(b,c,d,e){this.ray=new a.Ray(b,c);this.near=d||0;this.far=e||Infinity};var b=new a.Sphere,c=new a.Ray;new a.Plane;new a.Vector3;var d=new a.Vector3,e=new a.Matrix4,f=function(a,b){return a.distance-b.distance},g=new a.Vector3,h=new a.Vector3,k=new a.Vector3,l=function(f,n,s){if(f instanceof a.Sprite){d.setFromMatrixPosition(f.matrixWorld);var t=n.ray.distanceToPoint(d);if(t>f.scale.x)return s;s.push({distance:t,point:f.position,face:null,object:f})}else if(f instanceof
a.LOD)d.setFromMatrixPosition(f.matrixWorld),t=n.ray.origin.distanceTo(d),l(f.getObjectForDistance(t),n,s);else if(f instanceof a.Mesh){var r=f.geometry;null===r.boundingSphere&&r.computeBoundingSphere();b.copy(r.boundingSphere);b.applyMatrix4(f.matrixWorld);if(!1===n.ray.isIntersectionSphere(b))return s;e.getInverse(f.matrixWorld);c.copy(n.ray).applyMatrix4(e);if(null!==r.boundingBox&&!1===c.isIntersectionBox(r.boundingBox))return s;if(r instanceof a.BufferGeometry){var v=f.material;if(void 0===
v)return s;var w=r.attributes,u,y,L=n.precision;if(void 0!==w.index){var x=w.index.array,N=w.position.array,J=r.offsets;0===J.length&&(J=[{start:0,count:N.length,index:0}]);for(var B=0,K=J.length;B<K;++B)for(var w=J[B].start,A=J[B].index,r=w,G=w+J[B].count;r<G;r+=3){w=A+x[r];u=A+x[r+1];y=A+x[r+2];g.set(N[3*w],N[3*w+1],N[3*w+2]);h.set(N[3*u],N[3*u+1],N[3*u+2]);k.set(N[3*y],N[3*y+1],N[3*y+2]);var D=v.side===a.BackSide?c.intersectTriangle(k,h,g,!0):c.intersectTriangle(g,h,k,v.side!==a.DoubleSide);null!==
D&&(D.applyMatrix4(f.matrixWorld),t=n.ray.origin.distanceTo(D),t<L||t<n.near||t>n.far||s.push({distance:t,point:D,indices:[w,u,y],face:null,faceIndex:null,object:f}))}}else for(N=w.position.array,r=0,G=w.position.array.length;r<G;r+=3)w=r,u=r+1,y=r+2,g.set(N[3*w],N[3*w+1],N[3*w+2]),h.set(N[3*u],N[3*u+1],N[3*u+2]),k.set(N[3*y],N[3*y+1],N[3*y+2]),D=v.side===a.BackSide?c.intersectTriangle(k,h,g,!0):c.intersectTriangle(g,h,k,v.side!==a.DoubleSide),null!==D&&(D.applyMatrix4(f.matrixWorld),t=n.ray.origin.distanceTo(D),
t<L||t<n.near||t>n.far||s.push({distance:t,point:D,indices:[w,u,y],face:null,faceIndex:null,object:f}))}else if(r instanceof a.Geometry)for(N=f.material instanceof a.MeshFaceMaterial,J=!0===N?f.material.materials:null,L=n.precision,x=r.vertices,B=0,K=r.faces.length;B<K;B++)if(A=r.faces[B],v=!0===N?J[A.materialIndex]:f.material,void 0!==v){w=x[A.a];u=x[A.b];y=x[A.c];if(!0===v.morphTargets){t=r.morphTargets;D=f.morphTargetInfluences;g.set(0,0,0);h.set(0,0,0);k.set(0,0,0);for(var G=0,C=t.length;G<C;G++){var F=
D[G];if(0!==F){var z=t[G].vertices;g.x+=(z[A.a].x-w.x)*F;g.y+=(z[A.a].y-w.y)*F;g.z+=(z[A.a].z-w.z)*F;h.x+=(z[A.b].x-u.x)*F;h.y+=(z[A.b].y-u.y)*F;h.z+=(z[A.b].z-u.z)*F;k.x+=(z[A.c].x-y.x)*F;k.y+=(z[A.c].y-y.y)*F;k.z+=(z[A.c].z-y.z)*F}}g.add(w);h.add(u);k.add(y);w=g;u=h;y=k}D=v.side===a.BackSide?c.intersectTriangle(y,u,w,!0):c.intersectTriangle(w,u,y,v.side!==a.DoubleSide);null!==D&&(D.applyMatrix4(f.matrixWorld),t=n.ray.origin.distanceTo(D),t<L||t<n.near||t>n.far||s.push({distance:t,point:D,face:A,
faceIndex:B,object:f}))}}else if(f instanceof a.Line){L=n.linePrecision;v=L*L;r=f.geometry;null===r.boundingSphere&&r.computeBoundingSphere();b.copy(r.boundingSphere);b.applyMatrix4(f.matrixWorld);if(!1===n.ray.isIntersectionSphere(b))return s;e.getInverse(f.matrixWorld);c.copy(n.ray).applyMatrix4(e);if(r instanceof a.Geometry)for(x=r.vertices,L=x.length,w=new a.Vector3,u=new a.Vector3,y=f.type===a.LineStrip?1:2,r=0;r<L-1;r+=y)c.distanceSqToSegment(x[r],x[r+1],u,w)>v||(t=c.origin.distanceTo(u),t<
n.near||t>n.far||s.push({distance:t,point:w.clone().applyMatrix4(f.matrixWorld),face:null,faceIndex:null,object:f}))}},n=function(a,b,c){a=a.getDescendants();for(var d=0,e=a.length;d<e;d++)l(a[d],b,c)};a.Raycaster.prototype.precision=1E-4;a.Raycaster.prototype.linePrecision=1;a.Raycaster.prototype.set=function(a,b){this.ray.set(a,b)};a.Raycaster.prototype.intersectObject=function(a,b){var c=[];!0===b&&n(a,this,c);l(a,this,c);c.sort(f);return c};a.Raycaster.prototype.intersectObjects=function(a,b){for(var c=
[],d=0,e=a.length;d<e;d++)l(a[d],this,c),!0===b&&n(a[d],this,c);c.sort(f);return c}})(THREE);THREE.Object3D=function(){this.id=THREE.Object3DIdCount++;this.uuid=THREE.Math.generateUUID();this.name="";this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;var a=this;Object.defineProperties(this,{rotation:{enumerable:!0,value:(new THREE.Euler).onChange(function(){a.quaternion.setFromEuler(a.rotation,!1)})},quaternion:{enumerable:!0,value:(new THREE.Quaternion).onChange(function(){a.rotation.setFromQuaternion(a.quaternion,void 0,!1)})},scale:{enumerable:!0,
value:new THREE.Vector3(1,1,1)}});this.renderDepth=null;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixAutoUpdate=!0;this.matrixWorldNeedsUpdate=!1;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this.userData={}};
THREE.Object3D.prototype={constructor:THREE.Object3D,get eulerOrder(){console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order.");return this.rotation.order},set eulerOrder(a){console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order.");this.rotation.order=a},get useQuaternion(){console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")},set useQuaternion(a){console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")},
applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix);this.matrix.decompose(this.position,this.quaternion,this.scale)},setRotationFromAxisAngle:function(a,b){this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,!0)},setRotationFromMatrix:function(a){this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){this.quaternion.copy(a)},rotateOnAxis:function(){var a=new THREE.Quaternion;return function(b,c){a.setFromAxisAngle(b,
c);this.quaternion.multiply(a);return this}}(),rotateX:function(){var a=new THREE.Vector3(1,0,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateY:function(){var a=new THREE.Vector3(0,1,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new THREE.Vector3(0,0,1);return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){var a=new THREE.Vector3;return function(b,c){a.copy(b);a.applyQuaternion(this.quaternion);this.position.add(a.multiplyScalar(c));
return this}}(),translate:function(a,b){console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed.");return this.translateOnAxis(b,a)},translateX:function(){var a=new THREE.Vector3(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new THREE.Vector3(0,1,0);return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new THREE.Vector3(0,0,1);return function(b){return this.translateOnAxis(a,
b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new THREE.Matrix4;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),lookAt:function(){var a=new THREE.Matrix4;return function(b){a.lookAt(b,this.position,this.up);this.quaternion.setFromRotationMatrix(a)}}(),add:function(a){if(a===this)console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");else if(a instanceof THREE.Object3D){void 0!==a.parent&&
a.parent.remove(a);a.parent=this;a.dispatchEvent({type:"added"});this.children.push(a);for(var b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.__addObject(a)}},remove:function(a){var b=this.children.indexOf(a);if(-1!==b){a.parent=void 0;a.dispatchEvent({type:"removed"});this.children.splice(b,1);for(b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.__removeObject(a)}},traverse:function(a){a(this);for(var b=0,c=this.children.length;b<c;b++)this.children[b].traverse(a)},
getObjectById:function(a,b){for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c];if(e.id===a||!0===b&&(e=e.getObjectById(a,b),void 0!==e))return e}},getObjectByName:function(a,b){for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c];if(e.name===a||!0===b&&(e=e.getObjectByName(a,b),void 0!==e))return e}},getChildByName:function(a,b){console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName().");return this.getObjectByName(a,b)},getDescendants:function(a){void 0===
a&&(a=[]);Array.prototype.push.apply(a,this.children);for(var b=0,c=this.children.length;b<c;b++)this.children[b].getDescendants(a);return a},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){!0===this.matrixAutoUpdate&&this.updateMatrix();if(!0===this.matrixWorldNeedsUpdate||!0===a)void 0===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),
this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)},clone:function(a,b){void 0===a&&(a=new THREE.Object3D);void 0===b&&(b=!0);a.name=this.name;a.up.copy(this.up);a.position.copy(this.position);a.quaternion.copy(this.quaternion);a.scale.copy(this.scale);a.renderDepth=this.renderDepth;a.rotationAutoUpdate=this.rotationAutoUpdate;a.matrix.copy(this.matrix);a.matrixWorld.copy(this.matrixWorld);a.matrixAutoUpdate=this.matrixAutoUpdate;a.matrixWorldNeedsUpdate=
this.matrixWorldNeedsUpdate;a.visible=this.visible;a.castShadow=this.castShadow;a.receiveShadow=this.receiveShadow;a.frustumCulled=this.frustumCulled;a.userData=JSON.parse(JSON.stringify(this.userData));if(!0===b)for(var c=0;c<this.children.length;c++)a.add(this.children[c].clone());return a}};THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);THREE.Object3DIdCount=0;THREE.Projector=function(){function a(){if(n===p){var a=new THREE.RenderableVertex;q.push(a);p++;n++;return a}return q[n++]}function b(){if(t===v){var a=new THREE.RenderableFace;r.push(a);v++;t++;return a}return r[t++]}function c(){if(u===L){var a=new THREE.RenderableLine;y.push(a);L++;u++;return a}return y[u++]}function d(a,b){return a.z!==b.z?b.z-a.z:a.id!==b.id?a.id-b.id:0}function e(a,b){var c=0,d=1,e=a.z+a.w,f=b.z+b.w,g=-a.z+a.w,h=-b.z+b.w;if(0<=e&&0<=f&&0<=g&&0<=h)return!0;if(0>e&&0>f||0>g&&
0>h)return!1;0>e?c=Math.max(c,e/(e-f)):0>f&&(d=Math.min(d,e/(e-f)));0>g?c=Math.max(c,g/(g-h)):0>h&&(d=Math.min(d,g/(g-h)));if(d<c)return!1;a.lerp(b,c);b.lerp(a,1-d);return!0}var f,g,h=[],k=0,l,n,q=[],p=0,s,t,r=[],v=0,w,u,y=[],L=0,x,N,J=[],B=0,K={objects:[],lights:[],elements:[]},A=new THREE.Vector3,G=new THREE.Vector3,D=new THREE.Vector3,C=new THREE.Vector3,F=new THREE.Vector4,z=new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)),H=new THREE.Box3,E=Array(3),Q=new THREE.Matrix4,Y=
new THREE.Matrix4,U,la=new THREE.Matrix4,W=new THREE.Matrix3,R=new THREE.Frustum,I=new THREE.Vector4,da=new THREE.Vector4;this.projectVector=function(a,b){b.matrixWorldInverse.getInverse(b.matrixWorld);Y.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse);return a.applyProjection(Y)};this.unprojectVector=function(){var a=new THREE.Matrix4;return function(b,c){a.getInverse(c.projectionMatrix);Y.multiplyMatrices(c.matrixWorld,a);return b.applyProjection(Y)}}();this.pickingRay=function(a,b){a.z=
-1;var c=new THREE.Vector3(a.x,a.y,1);this.unprojectVector(a,b);this.unprojectVector(c,b);c.sub(a).normalize();return new THREE.Raycaster(a,c)};var V=function(a){if(!1!==a.visible){if(a instanceof THREE.Light)K.lights.push(a);else if(a instanceof THREE.Mesh||a instanceof THREE.Line||a instanceof THREE.Sprite)if(!1===a.frustumCulled||!0===R.intersectsObject(a)){if(g===k){var b=new THREE.RenderableObject;h.push(b);k++;g++;f=b}else f=h[g++];f.id=a.id;f.object=a;null!==a.renderDepth?f.z=a.renderDepth:
(C.setFromMatrixPosition(a.matrixWorld),C.applyProjection(Y),f.z=C.z);K.objects.push(f)}for(var b=0,c=a.children.length;b<c;b++)V(a.children[b])}},X=new function(){var d=[],e=[],f=null,g=null,h=new THREE.Matrix3,k=function(a){var b=a.positionWorld,c=a.positionScreen;b.copy(a.position).applyMatrix4(U);c.copy(b).applyMatrix4(Y);b=1/c.w;c.x*=b;c.y*=b;c.z*=b;a.visible=-1<=c.x&&1>=c.x&&-1<=c.y&&1>=c.y&&-1<=c.z&&1>=c.z},n=function(a,b,c){if(!0===a.visible||!0===b.visible||!0===c.visible)return!0;E[0]=a.positionScreen;
E[1]=b.positionScreen;E[2]=c.positionScreen;return z.isIntersectionBox(H.setFromPoints(E))},r=function(a,b,c){return 0>(c.positionScreen.x-a.positionScreen.x)*(b.positionScreen.y-a.positionScreen.y)-(c.positionScreen.y-a.positionScreen.y)*(b.positionScreen.x-a.positionScreen.x)};return{setObject:function(a){f=a;g=f.material;h.getNormalMatrix(f.matrixWorld);d.length=0;e.length=0},projectVertex:k,checkTriangleVisibility:n,checkBackfaceCulling:r,pushVertex:function(b,c,d){l=a();l.position.set(b,c,d);
k(l)},pushNormal:function(a,b,c){d.push(a,b,c)},pushUv:function(a,b){e.push(a,b)},pushLine:function(a,b){var d=q[a],e=q[b];w=c();w.id=f.id;w.v1.copy(d);w.v2.copy(e);w.z=(d.positionScreen.z+e.positionScreen.z)/2;w.material=f.material;K.elements.push(w)},pushTriangle:function(a,c,k){var l=q[a],p=q[c],t=q[k];if(!1!==n(l,p,t)&&(g.side===THREE.DoubleSide||!0===r(l,p,t))){s=b();s.id=f.id;s.v1.copy(l);s.v2.copy(p);s.v3.copy(t);s.z=(l.positionScreen.z+p.positionScreen.z+t.positionScreen.z)/3;for(l=0;3>l;l++)p=
3*arguments[l],t=s.vertexNormalsModel[l],t.set(d[p],d[p+1],d[p+2]),t.applyMatrix3(h).normalize(),p=2*arguments[l],s.uvs[l].set(e[p],e[p+1]);s.vertexNormalsLength=3;s.material=f.material;K.elements.push(s)}}}};this.projectScene=function(f,h,k,l){var r,p,v,y,L,C,z,E;N=u=t=0;K.elements.length=0;!0===f.autoUpdate&&f.updateMatrixWorld();void 0===h.parent&&h.updateMatrixWorld();Q.copy(h.matrixWorldInverse.getInverse(h.matrixWorld));Y.multiplyMatrices(h.projectionMatrix,Q);R.setFromMatrix(Y);g=0;K.objects.length=
0;K.lights.length=0;V(f);!0===k&&K.objects.sort(d);f=0;for(k=K.objects.length;f<k;f++)if(r=K.objects[f].object,p=r.geometry,X.setObject(r),U=r.matrixWorld,n=0,r instanceof THREE.Mesh)if(p instanceof THREE.BufferGeometry){if(C=p.attributes,r=p.offsets,void 0!==C.position){z=C.position.array;p=0;for(y=z.length;p<y;p+=3)X.pushVertex(z[p],z[p+1],z[p+2]);if(void 0!==C.normal)for(E=C.normal.array,p=0,y=E.length;p<y;p+=3)X.pushNormal(E[p],E[p+1],E[p+2]);if(void 0!==C.uv)for(E=C.uv.array,p=0,y=E.length;p<
y;p+=2)X.pushUv(E[p],E[p+1]);if(void 0!==C.index)if(C=C.index.array,0<r.length)for(f=0;f<r.length;f++)for(y=r[f],z=y.index,p=y.start,y=y.start+y.count;p<y;p+=3)X.pushTriangle(C[p]+z,C[p+1]+z,C[p+2]+z);else for(p=0,y=C.length;p<y;p+=3)X.pushTriangle(C[p],C[p+1],C[p+2]);else for(p=0,y=z.length/3;p<y;p+=3)X.pushTriangle(p,p+1,p+2)}}else{if(p instanceof THREE.Geometry){v=p.vertices;y=p.faces;C=p.faceVertexUvs[0];W.getNormalMatrix(U);z=r.material instanceof THREE.MeshFaceMaterial;E=!0===z?r.material:null;
for(var H=0,Fa=v.length;H<Fa;H++){var ia=v[H];X.pushVertex(ia.x,ia.y,ia.z)}H=0;for(Fa=y.length;H<Fa;H++){v=y[H];var ma=!0===z?E.materials[v.materialIndex]:r.material;if(void 0!==ma){var ya=ma.side,ia=q[v.a],Z=q[v.b],qa=q[v.c];if(!0===ma.morphTargets){L=p.morphTargets;var ua=r.morphTargetInfluences,Ca=ia.position,va=Z.position,Da=qa.position;A.set(0,0,0);G.set(0,0,0);D.set(0,0,0);for(var Ja=0,ja=L.length;Ja<ja;Ja++){var ra=ua[Ja];if(0!==ra){var Ka=L[Ja].vertices;A.x+=(Ka[v.a].x-Ca.x)*ra;A.y+=(Ka[v.a].y-
Ca.y)*ra;A.z+=(Ka[v.a].z-Ca.z)*ra;G.x+=(Ka[v.b].x-va.x)*ra;G.y+=(Ka[v.b].y-va.y)*ra;G.z+=(Ka[v.b].z-va.z)*ra;D.x+=(Ka[v.c].x-Da.x)*ra;D.y+=(Ka[v.c].y-Da.y)*ra;D.z+=(Ka[v.c].z-Da.z)*ra}}ia.position.add(A);Z.position.add(G);qa.position.add(D);X.projectVertex(ia);X.projectVertex(Z);X.projectVertex(qa)}if(!1!==X.checkTriangleVisibility(ia,Z,qa)){ua=X.checkBackfaceCulling(ia,Z,qa);if(ya!==THREE.DoubleSide){if(ya===THREE.FrontSide&&!1===ua)continue;if(ya===THREE.BackSide&&!0===ua)continue}s=b();s.id=r.id;
s.v1.copy(ia);s.v2.copy(Z);s.v3.copy(qa);s.normalModel.copy(v.normal);!1!==ua||ya!==THREE.BackSide&&ya!==THREE.DoubleSide||s.normalModel.negate();s.normalModel.applyMatrix3(W).normalize();L=v.vertexNormals;Ca=0;for(va=Math.min(L.length,3);Ca<va;Ca++)Da=s.vertexNormalsModel[Ca],Da.copy(L[Ca]),!1!==ua||ya!==THREE.BackSide&&ya!==THREE.DoubleSide||Da.negate(),Da.applyMatrix3(W).normalize();s.vertexNormalsLength=L.length;ya=C[H];if(void 0!==ya)for(L=0;3>L;L++)s.uvs[L].copy(ya[L]);s.color=v.color;s.material=
ma;s.z=(ia.positionScreen.z+Z.positionScreen.z+qa.positionScreen.z)/3;K.elements.push(s)}}}}}else if(r instanceof THREE.Line)if(p instanceof THREE.BufferGeometry){if(C=p.attributes,void 0!==C.position){z=C.position.array;p=0;for(y=z.length;p<y;p+=3)X.pushVertex(z[p],z[p+1],z[p+2]);if(void 0!==C.index)for(C=C.index.array,p=0,y=C.length;p<y;p+=2)X.pushLine(C[p],C[p+1]);else for(p=0,y=z.length/3-1;p<y;p++)X.pushLine(p,p+1)}}else{if(p instanceof THREE.Geometry&&(la.multiplyMatrices(Y,U),v=r.geometry.vertices,
0!==v.length))for(ia=a(),ia.positionScreen.copy(v[0]).applyMatrix4(la),p=r.type===THREE.LinePieces?2:1,H=1,Fa=v.length;H<Fa;H++)ia=a(),ia.positionScreen.copy(v[H]).applyMatrix4(la),0<(H+1)%p||(Z=q[n-2],I.copy(ia.positionScreen),da.copy(Z.positionScreen),!0===e(I,da)&&(I.multiplyScalar(1/I.w),da.multiplyScalar(1/da.w),w=c(),w.id=r.id,w.v1.positionScreen.copy(I),w.v2.positionScreen.copy(da),w.z=Math.max(I.z,da.z),w.material=r.material,r.material.vertexColors===THREE.VertexColors&&(w.vertexColors[0].copy(r.geometry.colors[H]),
w.vertexColors[1].copy(r.geometry.colors[H-1])),K.elements.push(w)))}else r instanceof THREE.Sprite&&(F.set(U.elements[12],U.elements[13],U.elements[14],1),F.applyMatrix4(Y),p=1/F.w,F.z*=p,-1<=F.z&&1>=F.z&&(N===B?(y=new THREE.RenderableSprite,J.push(y),B++,N++,x=y):x=J[N++],x.id=r.id,x.x=F.x*p,x.y=F.y*p,x.z=F.z,x.object=r,x.rotation=r.rotation,x.scale.x=r.scale.x*Math.abs(x.x-(F.x+h.projectionMatrix.elements[0])/(F.w+h.projectionMatrix.elements[12])),x.scale.y=r.scale.y*Math.abs(x.y-(F.y+h.projectionMatrix.elements[5])/
(F.w+h.projectionMatrix.elements[13])),x.material=r.material,K.elements.push(x)));!0===l&&K.elements.sort(d);return K}};THREE.Face3=function(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3;this.vertexNormals=d instanceof Array?d:[];this.color=e instanceof THREE.Color?e:new THREE.Color;this.vertexColors=e instanceof Array?e:[];this.vertexTangents=[];this.materialIndex=void 0!==f?f:0};
THREE.Face3.prototype={constructor:THREE.Face3,clone:function(){var a=new THREE.Face3(this.a,this.b,this.c);a.normal.copy(this.normal);a.color.copy(this.color);a.materialIndex=this.materialIndex;var b,c;b=0;for(c=this.vertexNormals.length;b<c;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();b=0;for(c=this.vertexColors.length;b<c;b++)a.vertexColors[b]=this.vertexColors[b].clone();b=0;for(c=this.vertexTangents.length;b<c;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();return a}};THREE.Face4=function(a,b,c,d,e,f,g){console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");return new THREE.Face3(a,b,c,e,f,g)};THREE.BufferAttribute=function(){};
THREE.BufferAttribute.prototype={constructor:THREE.BufferAttribute,get length(){return this.array.length},set:function(a){this.array.set(a)},setX:function(a,b){this.array[a*this.itemSize]=b},setY:function(a,b){this.array[a*this.itemSize+1]=b},setZ:function(a,b){this.array[a*this.itemSize+2]=b},setXY:function(a,b,c){a*=this.itemSize;this.array[a]=b;this.array[a+1]=c},setXYZ:function(a,b,c,d){a*=this.itemSize;this.array[a]=b;this.array[a+1]=c;this.array[a+2]=d},setXYZW:function(a,b,c,d,e){a*=this.itemSize;
this.array[a]=b;this.array[a+1]=c;this.array[a+2]=d;this.array[a+3]=e}};THREE.Int8Attribute=function(a,b){this.array=new Int8Array(a*b);this.itemSize=b};THREE.Int8Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Uint8Attribute=function(a,b){this.array=new Uint8Array(a*b);this.itemSize=b};THREE.Uint8Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Uint8ClampedAttribute=function(a,b){this.array=new Uint8ClampedArray(a*b);this.itemSize=b};
THREE.Uint8ClampedAttribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Int16Attribute=function(a,b){this.array=new Int16Array(a*b);this.itemSize=b};THREE.Int16Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Uint16Attribute=function(a,b){this.array=new Uint16Array(a*b);this.itemSize=b};THREE.Uint16Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Int32Attribute=function(a,b){this.array=new Int32Array(a*b);this.itemSize=b};
THREE.Int32Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Uint32Attribute=function(a,b){this.array=new Uint32Array(a*b);this.itemSize=b};THREE.Uint32Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Float32Attribute=function(a,b){this.array=new Float32Array(a*b);this.itemSize=b};THREE.Float32Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.Float64Attribute=function(a,b){this.array=new Float64Array(a*b);this.itemSize=b};
THREE.Float64Attribute.prototype=Object.create(THREE.BufferAttribute.prototype);THREE.BufferGeometry=function(){this.id=THREE.GeometryIdCount++;this.uuid=THREE.Math.generateUUID();this.name="";this.attributes={};this.offsets=this.drawcalls=[];this.boundingSphere=this.boundingBox=null};
THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,addAttribute:function(a,b,c){!1===b instanceof THREE.BufferAttribute?(console.warn("DEPRECATED: BufferGeometry's addAttribute() now expects ( name, attribute )."),this.attributes[a]={array:b,itemSize:c}):this.attributes[a]=b},getAttribute:function(a){return this.attributes[a]},addDrawCall:function(a,b,c){this.drawcalls.push({start:a,count:b,index:void 0!==c?c:0})},applyMatrix:function(a){var b=this.attributes.position;void 0!==b&&(a.applyToVector3Array(b.array),
b.needsUpdate=!0);b=this.attributes.normal;void 0!==b&&((new THREE.Matrix3).getNormalMatrix(a).applyToVector3Array(b.array),b.needsUpdate=!0)},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);var a=this.attributes.position.array;if(a){var b=this.boundingBox;3<=a.length&&(b.min.x=b.max.x=a[0],b.min.y=b.max.y=a[1],b.min.z=b.max.z=a[2]);for(var c=3,d=a.length;c<d;c+=3){var e=a[c],f=a[c+1],g=a[c+2];e<b.min.x?b.min.x=e:e>b.max.x&&(b.max.x=e);f<b.min.y?b.min.y=f:
f>b.max.y&&(b.max.y=f);g<b.min.z?b.min.z=g:g>b.max.z&&(b.max.z=g)}}if(void 0===a||0===a.length)this.boundingBox.min.set(0,0,0),this.boundingBox.max.set(0,0,0)},computeBoundingSphere:function(){var a=new THREE.Box3,b=new THREE.Vector3;return function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);var c=this.attributes.position.array;if(c){a.makeEmpty();for(var d=this.boundingSphere.center,e=0,f=c.length;e<f;e+=3)b.set(c[e],c[e+1],c[e+2]),a.addPoint(b);a.center(d);for(var g=0,
e=0,f=c.length;e<f;e+=3)b.set(c[e],c[e+1],c[e+2]),g=Math.max(g,d.distanceToSquared(b));this.boundingSphere.radius=Math.sqrt(g)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){if(this.attributes.position){var a,b,c,d;a=this.attributes.position.array.length;if(void 0===this.attributes.normal)this.attributes.normal={itemSize:3,array:new Float32Array(a)};else for(a=0,b=this.attributes.normal.array.length;a<b;a++)this.attributes.normal.array[a]=0;var e=this.attributes.position.array,
f=this.attributes.normal.array,g,h,k,l,n,q,p=new THREE.Vector3,s=new THREE.Vector3,t=new THREE.Vector3,r=new THREE.Vector3,v=new THREE.Vector3;if(this.attributes.index){var w=this.attributes.index.array,u=0<this.offsets.length?this.offsets:[{start:0,count:w.length,index:0}];c=0;for(d=u.length;c<d;++c){b=u[c].start;g=u[c].count;var y=u[c].index;a=b;for(b+=g;a<b;a+=3)g=y+w[a],h=y+w[a+1],k=y+w[a+2],l=e[3*g],n=e[3*g+1],q=e[3*g+2],p.set(l,n,q),l=e[3*h],n=e[3*h+1],q=e[3*h+2],s.set(l,n,q),l=e[3*k],n=e[3*
k+1],q=e[3*k+2],t.set(l,n,q),r.subVectors(t,s),v.subVectors(p,s),r.cross(v),f[3*g]+=r.x,f[3*g+1]+=r.y,f[3*g+2]+=r.z,f[3*h]+=r.x,f[3*h+1]+=r.y,f[3*h+2]+=r.z,f[3*k]+=r.x,f[3*k+1]+=r.y,f[3*k+2]+=r.z}}else for(a=0,b=e.length;a<b;a+=9)l=e[a],n=e[a+1],q=e[a+2],p.set(l,n,q),l=e[a+3],n=e[a+4],q=e[a+5],s.set(l,n,q),l=e[a+6],n=e[a+7],q=e[a+8],t.set(l,n,q),r.subVectors(t,s),v.subVectors(p,s),r.cross(v),f[a]=r.x,f[a+1]=r.y,f[a+2]=r.z,f[a+3]=r.x,f[a+4]=r.y,f[a+5]=r.z,f[a+6]=r.x,f[a+7]=r.y,f[a+8]=r.z;this.normalizeNormals();
this.normalsNeedUpdate=!0}},computeTangents:function(){function a(a,b,c){q=d[3*a];p=d[3*a+1];s=d[3*a+2];t=d[3*b];r=d[3*b+1];v=d[3*b+2];w=d[3*c];u=d[3*c+1];y=d[3*c+2];L=f[2*a];x=f[2*a+1];N=f[2*b];J=f[2*b+1];B=f[2*c];K=f[2*c+1];A=t-q;G=w-q;D=r-p;C=u-p;F=v-s;z=y-s;H=N-L;E=B-L;Q=J-x;Y=K-x;U=1/(H*Y-E*Q);la.set((Y*A-Q*G)*U,(Y*D-Q*C)*U,(Y*F-Q*z)*U);W.set((H*G-E*A)*U,(H*C-E*D)*U,(H*z-E*F)*U);k[a].add(la);k[b].add(la);k[c].add(la);l[a].add(W);l[b].add(W);l[c].add(W)}function b(a){fa.x=e[3*a];fa.y=e[3*a+1];
fa.z=e[3*a+2];za.copy(fa);Ea=k[a];wa.copy(Ea);wa.sub(fa.multiplyScalar(fa.dot(Ea))).normalize();Ha.crossVectors(za,Ea);Ga=Ha.dot(l[a]);Ia=0>Ga?-1:1;h[4*a]=wa.x;h[4*a+1]=wa.y;h[4*a+2]=wa.z;h[4*a+3]=Ia}if(void 0===this.attributes.index||void 0===this.attributes.position||void 0===this.attributes.normal||void 0===this.attributes.uv)console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");else{var c=this.attributes.index.array,d=this.attributes.position.array,
e=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/3;void 0===this.attributes.tangent&&(this.attributes.tangent={itemSize:4,array:new Float32Array(4*g)});for(var h=this.attributes.tangent.array,k=[],l=[],n=0;n<g;n++)k[n]=new THREE.Vector3,l[n]=new THREE.Vector3;var q,p,s,t,r,v,w,u,y,L,x,N,J,B,K,A,G,D,C,F,z,H,E,Q,Y,U,la=new THREE.Vector3,W=new THREE.Vector3,R,I,da,V,X,P=this.offsets,n=0;for(I=P.length;n<I;++n){R=P[n].start;da=P[n].count;var ga=P[n].index,g=R;for(R+=da;g<R;g+=3)da=
ga+c[g],V=ga+c[g+1],X=ga+c[g+2],a(da,V,X)}var wa=new THREE.Vector3,Ha=new THREE.Vector3,fa=new THREE.Vector3,za=new THREE.Vector3,Ia,Ea,Ga,n=0;for(I=P.length;n<I;++n)for(R=P[n].start,da=P[n].count,ga=P[n].index,g=R,R+=da;g<R;g+=3)da=ga+c[g],V=ga+c[g+1],X=ga+c[g+2],b(da),b(V),b(X)}},computeOffsets:function(a){var b=a;void 0===a&&(b=65535);Date.now();a=this.attributes.index.array;for(var c=this.attributes.position.array,d=a.length/3,e=new Uint16Array(a.length),f=0,g=0,h=[{start:0,count:0,index:0}],
k=h[0],l=0,n=0,q=new Int32Array(6),p=new Int32Array(c.length),s=new Int32Array(c.length),t=0;t<c.length;t++)p[t]=-1,s[t]=-1;for(c=0;c<d;c++){for(var r=n=0;3>r;r++)t=a[3*c+r],-1==p[t]?(q[2*r]=t,q[2*r+1]=-1,n++):p[t]<k.index?(q[2*r]=t,q[2*r+1]=-1,l++):(q[2*r]=t,q[2*r+1]=p[t]);if(g+n>k.index+b)for(k={start:f,count:0,index:g},h.push(k),n=0;6>n;n+=2)r=q[n+1],-1<r&&r<k.index&&(q[n+1]=-1);for(n=0;6>n;n+=2)t=q[n],r=q[n+1],-1===r&&(r=g++),p[t]=r,s[r]=t,e[f++]=r-k.index,k.count++}this.reorderBuffers(e,s,g);
return this.offsets=h},merge:function(){console.log("BufferGeometry.merge(): TODO")},normalizeNormals:function(){for(var a=this.attributes.normal.array,b,c,d,e=0,f=a.length;e<f;e+=3)b=a[e],c=a[e+1],d=a[e+2],b=1/Math.sqrt(b*b+c*c+d*d),a[e]*=b,a[e+1]*=b,a[e+2]*=b},reorderBuffers:function(a,b,c){var d={},e=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],f;for(f in this.attributes)if("index"!=f)for(var g=this.attributes[f].array,h=0,k=e.length;h<
k;h++){var l=e[h];if(g instanceof l){d[f]=new l(this.attributes[f].itemSize*c);break}}for(e=0;e<c;e++)for(f in g=b[e],this.attributes)if("index"!=f)for(var h=this.attributes[f].array,k=this.attributes[f].itemSize,l=d[f],n=0;n<k;n++)l[e*k+n]=h[g*k+n];this.attributes.index.array=a;for(f in this.attributes)"index"!=f&&(this.attributes[f].array=d[f],this.attributes[f].numItems=this.attributes[f].itemSize*c)},clone:function(){var a=new THREE.BufferGeometry,b=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,
Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],c;for(c in this.attributes){for(var d=this.attributes[c],e=d.array,f={itemSize:d.itemSize,array:null},d=0,g=b.length;d<g;d++){var h=b[d];if(e instanceof h){f.array=new h(e);break}}a.attributes[c]=f}d=0;for(g=this.offsets.length;d<g;d++)b=this.offsets[d],a.offsets.push({start:b.start,index:b.index,count:b.count});return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);THREE.Geometry=function(){this.id=THREE.GeometryIdCount++;this.uuid=THREE.Math.generateUUID();this.name="";this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1;this.dynamic=!0;this.buffersNeedUpdate=this.lineDistancesNeedUpdate=this.colorsNeedUpdate=this.tangentsNeedUpdate=this.normalsNeedUpdate=this.uvsNeedUpdate=
this.elementsNeedUpdate=this.verticesNeedUpdate=!1};
THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(a){for(var b=(new THREE.Matrix3).getNormalMatrix(a),c=0,d=this.vertices.length;c<d;c++)this.vertices[c].applyMatrix4(a);c=0;for(d=this.faces.length;c<d;c++){a=this.faces[c];a.normal.applyMatrix3(b).normalize();for(var e=0,f=a.vertexNormals.length;e<f;e++)a.vertexNormals[e].applyMatrix3(b).normalize()}this.boundingBox instanceof THREE.Box3&&this.computeBoundingBox();this.boundingSphere instanceof THREE.Sphere&&this.computeBoundingSphere()},
computeFaceNormals:function(){for(var a=new THREE.Vector3,b=new THREE.Vector3,c=0,d=this.faces.length;c<d;c++){var e=this.faces[c],f=this.vertices[e.a],g=this.vertices[e.b];a.subVectors(this.vertices[e.c],g);b.subVectors(f,g);a.cross(b);a.normalize();e.normal.copy(a)}},computeVertexNormals:function(a){var b,c,d;d=Array(this.vertices.length);b=0;for(c=this.vertices.length;b<c;b++)d[b]=new THREE.Vector3;if(a){var e,f,g,h=new THREE.Vector3,k=new THREE.Vector3;new THREE.Vector3;new THREE.Vector3;new THREE.Vector3;
a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],e=this.vertices[c.a],f=this.vertices[c.b],g=this.vertices[c.c],h.subVectors(g,f),k.subVectors(e,f),h.cross(k),d[c.a].add(h),d[c.b].add(h),d[c.c].add(h)}else for(a=0,b=this.faces.length;a<b;a++)c=this.faces[a],d[c.a].add(c.normal),d[c.b].add(c.normal),d[c.c].add(c.normal);b=0;for(c=this.vertices.length;b<c;b++)d[b].normalize();a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],c.vertexNormals[0]=d[c.a].clone(),c.vertexNormals[1]=d[c.b].clone(),c.vertexNormals[2]=
d[c.c].clone()},computeMorphNormals:function(){var a,b,c,d,e;c=0;for(d=this.faces.length;c<d;c++)for(e=this.faces[c],e.__originalFaceNormal?e.__originalFaceNormal.copy(e.normal):e.__originalFaceNormal=e.normal.clone(),e.__originalVertexNormals||(e.__originalVertexNormals=[]),a=0,b=e.vertexNormals.length;a<b;a++)e.__originalVertexNormals[a]?e.__originalVertexNormals[a].copy(e.vertexNormals[a]):e.__originalVertexNormals[a]=e.vertexNormals[a].clone();var f=new THREE.Geometry;f.faces=this.faces;a=0;for(b=
this.morphTargets.length;a<b;a++){if(!this.morphNormals[a]){this.morphNormals[a]={};this.morphNormals[a].faceNormals=[];this.morphNormals[a].vertexNormals=[];e=this.morphNormals[a].faceNormals;var g=this.morphNormals[a].vertexNormals,h,k;c=0;for(d=this.faces.length;c<d;c++)h=new THREE.Vector3,k={a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3},e.push(h),g.push(k)}g=this.morphNormals[a];f.vertices=this.morphTargets[a].vertices;f.computeFaceNormals();f.computeVertexNormals();c=0;for(d=this.faces.length;c<
d;c++)e=this.faces[c],h=g.faceNormals[c],k=g.vertexNormals[c],h.copy(e.normal),k.a.copy(e.vertexNormals[0]),k.b.copy(e.vertexNormals[1]),k.c.copy(e.vertexNormals[2])}c=0;for(d=this.faces.length;c<d;c++)e=this.faces[c],e.normal=e.__originalFaceNormal,e.vertexNormals=e.__originalVertexNormals},computeTangents:function(){var a,b,c,d,e,f,g,h,k,l,n,q,p,s,t,r,v,w=[],u=[];c=new THREE.Vector3;var y=new THREE.Vector3,L=new THREE.Vector3,x=new THREE.Vector3,N=new THREE.Vector3;a=0;for(b=this.vertices.length;a<
b;a++)w[a]=new THREE.Vector3,u[a]=new THREE.Vector3;a=0;for(b=this.faces.length;a<b;a++)e=this.faces[a],f=this.faceVertexUvs[0][a],d=e.a,v=e.b,e=e.c,g=this.vertices[d],h=this.vertices[v],k=this.vertices[e],l=f[0],n=f[1],q=f[2],f=h.x-g.x,p=k.x-g.x,s=h.y-g.y,t=k.y-g.y,h=h.z-g.z,g=k.z-g.z,k=n.x-l.x,r=q.x-l.x,n=n.y-l.y,l=q.y-l.y,q=1/(k*l-r*n),c.set((l*f-n*p)*q,(l*s-n*t)*q,(l*h-n*g)*q),y.set((k*p-r*f)*q,(k*t-r*s)*q,(k*g-r*h)*q),w[d].add(c),w[v].add(c),w[e].add(c),u[d].add(y),u[v].add(y),u[e].add(y);y=
["a","b","c","d"];a=0;for(b=this.faces.length;a<b;a++)for(e=this.faces[a],c=0;c<Math.min(e.vertexNormals.length,3);c++)N.copy(e.vertexNormals[c]),d=e[y[c]],v=w[d],L.copy(v),L.sub(N.multiplyScalar(N.dot(v))).normalize(),x.crossVectors(e.vertexNormals[c],v),d=x.dot(u[d]),d=0>d?-1:1,e.vertexTangents[c]=new THREE.Vector4(L.x,L.y,L.z,d);this.hasTangents=!0},computeLineDistances:function(){for(var a=0,b=this.vertices,c=0,d=b.length;c<d;c++)0<c&&(a+=b[c].distanceTo(b[c-1])),this.lineDistances[c]=a},computeBoundingBox:function(){null===
this.boundingBox&&(this.boundingBox=new THREE.Box3);this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);this.boundingSphere.setFromPoints(this.vertices)},merge:function(a,b,c){if(!1===a instanceof THREE.Geometry)console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",a);else{var d,e=this.vertices.length,f=this.vertices,g=a.vertices,h=this.faces,k=a.faces,l=this.faceVertexUvs[0];
a=a.faceVertexUvs[0];void 0===c&&(c=0);void 0!==b&&(d=(new THREE.Matrix3).getNormalMatrix(b));for(var n=0,q=g.length;n<q;n++){var p=g[n].clone();void 0!==b&&p.applyMatrix4(b);f.push(p)}n=0;for(q=k.length;n<q;n++){var g=k[n],s,t=g.vertexNormals,r=g.vertexColors,p=new THREE.Face3(g.a+e,g.b+e,g.c+e);p.normal.copy(g.normal);void 0!==d&&p.normal.applyMatrix3(d).normalize();b=0;for(f=t.length;b<f;b++)s=t[b].clone(),void 0!==d&&s.applyMatrix3(d).normalize(),p.vertexNormals.push(s);p.color.copy(g.color);
b=0;for(f=r.length;b<f;b++)s=r[b],p.vertexColors.push(s.clone());p.materialIndex=g.materialIndex+c;h.push(p)}n=0;for(q=a.length;n<q;n++)if(c=a[n],d=[],void 0!==c){b=0;for(f=c.length;b<f;b++)d.push(new THREE.Vector2(c[b].x,c[b].y));l.push(d)}}},mergeVertices:function(){var a={},b=[],c=[],d,e=Math.pow(10,4),f,g;f=0;for(g=this.vertices.length;f<g;f++)d=this.vertices[f],d=Math.round(d.x*e)+"_"+Math.round(d.y*e)+"_"+Math.round(d.z*e),void 0===a[d]?(a[d]=f,b.push(this.vertices[f]),c[f]=b.length-1):c[f]=
c[a[d]];a=[];f=0;for(g=this.faces.length;f<g;f++)for(e=this.faces[f],e.a=c[e.a],e.b=c[e.b],e.c=c[e.c],e=[e.a,e.b,e.c],d=0;3>d;d++)if(e[d]==e[(d+1)%3]){a.push(f);break}for(f=a.length-1;0<=f;f--)for(e=a[f],this.faces.splice(e,1),c=0,g=this.faceVertexUvs.length;c<g;c++)this.faceVertexUvs[c].splice(e,1);f=this.vertices.length-b.length;this.vertices=b;return f},makeGroups:function(){var a=0;return function(b,c){var d,e,f,g,h={},k=this.morphTargets.length,l=this.morphNormals.length;this.geometryGroups=
{};d=0;for(e=this.faces.length;d<e;d++)f=this.faces[d],f=b?f.materialIndex:0,f in h||(h[f]={hash:f,counter:0}),g=h[f].hash+"_"+h[f].counter,g in this.geometryGroups||(this.geometryGroups[g]={faces3:[],materialIndex:f,vertices:0,numMorphTargets:k,numMorphNormals:l}),this.geometryGroups[g].vertices+3>c&&(h[f].counter+=1,g=h[f].hash+"_"+h[f].counter,g in this.geometryGroups||(this.geometryGroups[g]={faces3:[],materialIndex:f,vertices:0,numMorphTargets:k,numMorphNormals:l})),this.geometryGroups[g].faces3.push(d),
this.geometryGroups[g].vertices+=3;this.geometryGroupsList=[];for(var n in this.geometryGroups)this.geometryGroups[n].id=a++,this.geometryGroupsList.push(this.geometryGroups[n])}}(),clone:function(){for(var a=new THREE.Geometry,b=this.vertices,c=0,d=b.length;c<d;c++)a.vertices.push(b[c].clone());b=this.faces;c=0;for(d=b.length;c<d;c++)a.faces.push(b[c].clone());b=this.faceVertexUvs[0];c=0;for(d=b.length;c<d;c++){for(var e=b[c],f=[],g=0,h=e.length;g<h;g++)f.push(new THREE.Vector2(e[g].x,e[g].y));a.faceVertexUvs[0].push(f)}return a},
dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);THREE.GeometryIdCount=0;THREE.Camera=function(){THREE.Object3D.call(this);this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=new THREE.Matrix4};THREE.Camera.prototype=Object.create(THREE.Object3D.prototype);THREE.Camera.prototype.lookAt=function(){var a=new THREE.Matrix4;return function(b){a.lookAt(this.position,b,this.up);this.quaternion.setFromRotationMatrix(a)}}();
THREE.Camera.prototype.clone=function(a){void 0===a&&(a=new THREE.Camera);THREE.Object3D.prototype.clone.call(this,a);a.matrixWorldInverse.copy(this.matrixWorldInverse);a.projectionMatrix.copy(this.projectionMatrix);return a};THREE.OrthographicCamera=function(a,b,c,d,e,f){THREE.Camera.call(this);this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=void 0!==e?e:0.1;this.far=void 0!==f?f:2E3;this.updateProjectionMatrix()};THREE.OrthographicCamera.prototype=Object.create(THREE.Camera.prototype);THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix.makeOrthographic(this.left,this.right,this.top,this.bottom,this.near,this.far)};
THREE.OrthographicCamera.prototype.clone=function(){var a=new THREE.OrthographicCamera;THREE.Camera.prototype.clone.call(this,a);a.left=this.left;a.right=this.right;a.top=this.top;a.bottom=this.bottom;a.near=this.near;a.far=this.far;return a};THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this);this.fov=void 0!==a?a:50;this.aspect=void 0!==b?b:1;this.near=void 0!==c?c:0.1;this.far=void 0!==d?d:2E3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=Object.create(THREE.Camera.prototype);THREE.PerspectiveCamera.prototype.setLens=function(a,b){void 0===b&&(b=24);this.fov=2*THREE.Math.radToDeg(Math.atan(b/(2*a)));this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,e,f){this.fullWidth=a;this.fullHeight=b;this.x=c;this.y=d;this.width=e;this.height=f;this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(THREE.Math.degToRad(0.5*this.fov))*this.near,c=-b,d=a*c,a=Math.abs(a*b-d),c=Math.abs(b-c);this.projectionMatrix.makeFrustum(d+this.x*a/this.fullWidth,d+(this.x+this.width)*a/this.fullWidth,b-(this.y+this.height)*c/this.fullHeight,b-this.y*c/this.fullHeight,this.near,this.far)}else this.projectionMatrix.makePerspective(this.fov,this.aspect,this.near,this.far)};
THREE.PerspectiveCamera.prototype.clone=function(){var a=new THREE.PerspectiveCamera;THREE.Camera.prototype.clone.call(this,a);a.fov=this.fov;a.aspect=this.aspect;a.near=this.near;a.far=this.far;return a};THREE.Light=function(a){THREE.Object3D.call(this);this.color=new THREE.Color(a)};THREE.Light.prototype=Object.create(THREE.Object3D.prototype);THREE.Light.prototype.clone=function(a){void 0===a&&(a=new THREE.Light);THREE.Object3D.prototype.clone.call(this,a);a.color.copy(this.color);return a};THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=Object.create(THREE.Light.prototype);THREE.AmbientLight.prototype.clone=function(){var a=new THREE.AmbientLight;THREE.Light.prototype.clone.call(this,a);return a};THREE.AreaLight=function(a,b){THREE.Light.call(this,a);this.normal=new THREE.Vector3(0,-1,0);this.right=new THREE.Vector3(1,0,0);this.intensity=void 0!==b?b:1;this.height=this.width=1;this.constantAttenuation=1.5;this.linearAttenuation=0.5;this.quadraticAttenuation=0.1};THREE.AreaLight.prototype=Object.create(THREE.Light.prototype);THREE.DirectionalLight=function(a,b){THREE.Light.call(this,a);this.position.set(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.onlyShadow=this.castShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraLeft=-500;this.shadowCameraTop=this.shadowCameraRight=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowCascade=!1;this.shadowCascadeOffset=new THREE.Vector3(0,
0,-1E3);this.shadowCascadeCount=2;this.shadowCascadeBias=[0,0,0];this.shadowCascadeWidth=[512,512,512];this.shadowCascadeHeight=[512,512,512];this.shadowCascadeNearZ=[-1,0.99,0.998];this.shadowCascadeFarZ=[0.99,0.998,1];this.shadowCascadeArray=[];this.shadowMatrix=this.shadowCamera=this.shadowMapSize=this.shadowMap=null};THREE.DirectionalLight.prototype=Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.clone=function(){var a=new THREE.DirectionalLight;THREE.Light.prototype.clone.call(this,a);a.target=this.target.clone();a.intensity=this.intensity;a.castShadow=this.castShadow;a.onlyShadow=this.onlyShadow;a.shadowCameraNear=this.shadowCameraNear;a.shadowCameraFar=this.shadowCameraFar;a.shadowCameraLeft=this.shadowCameraLeft;a.shadowCameraRight=this.shadowCameraRight;a.shadowCameraTop=this.shadowCameraTop;a.shadowCameraBottom=this.shadowCameraBottom;a.shadowCameraVisible=
this.shadowCameraVisible;a.shadowBias=this.shadowBias;a.shadowDarkness=this.shadowDarkness;a.shadowMapWidth=this.shadowMapWidth;a.shadowMapHeight=this.shadowMapHeight;a.shadowCascade=this.shadowCascade;a.shadowCascadeOffset.copy(this.shadowCascadeOffset);a.shadowCascadeCount=this.shadowCascadeCount;a.shadowCascadeBias=this.shadowCascadeBias.slice(0);a.shadowCascadeWidth=this.shadowCascadeWidth.slice(0);a.shadowCascadeHeight=this.shadowCascadeHeight.slice(0);a.shadowCascadeNearZ=this.shadowCascadeNearZ.slice(0);
a.shadowCascadeFarZ=this.shadowCascadeFarZ.slice(0);return a};THREE.HemisphereLight=function(a,b,c){THREE.Light.call(this,a);this.position.set(0,100,0);this.groundColor=new THREE.Color(b);this.intensity=void 0!==c?c:1};THREE.HemisphereLight.prototype=Object.create(THREE.Light.prototype);THREE.HemisphereLight.prototype.clone=function(){var a=new THREE.HemisphereLight;THREE.Light.prototype.clone.call(this,a);a.groundColor.copy(this.groundColor);a.intensity=this.intensity;return a};THREE.PointLight=function(a,b,c){THREE.Light.call(this,a);this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0};THREE.PointLight.prototype=Object.create(THREE.Light.prototype);THREE.PointLight.prototype.clone=function(){var a=new THREE.PointLight;THREE.Light.prototype.clone.call(this,a);a.intensity=this.intensity;a.distance=this.distance;return a};THREE.SpotLight=function(a,b,c,d,e){THREE.Light.call(this,a);this.position.set(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0;this.angle=void 0!==d?d:Math.PI/3;this.exponent=void 0!==e?e:10;this.onlyShadow=this.castShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraFov=50;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowMatrix=this.shadowCamera=this.shadowMapSize=
this.shadowMap=null};THREE.SpotLight.prototype=Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.clone=function(){var a=new THREE.SpotLight;THREE.Light.prototype.clone.call(this,a);a.target=this.target.clone();a.intensity=this.intensity;a.distance=this.distance;a.angle=this.angle;a.exponent=this.exponent;a.castShadow=this.castShadow;a.onlyShadow=this.onlyShadow;a.shadowCameraNear=this.shadowCameraNear;a.shadowCameraFar=this.shadowCameraFar;a.shadowCameraFov=this.shadowCameraFov;a.shadowCameraVisible=this.shadowCameraVisible;a.shadowBias=this.shadowBias;a.shadowDarkness=
this.shadowDarkness;a.shadowMapWidth=this.shadowMapWidth;a.shadowMapHeight=this.shadowMapHeight;return a};THREE.Cache=function(){this.files={}};THREE.Cache.prototype={constructor:THREE.Cache,add:function(a,b){this.files[a]=b},get:function(a){return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}};THREE.Loader=function(a){this.statusDomElement=(this.showStatus=a)?THREE.Loader.prototype.addStatusElement():null;this.imageLoader=new THREE.ImageLoader;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={constructor:THREE.Loader,crossOrigin:void 0,addStatusElement:function(){var a=document.createElement("div");a.style.position="absolute";a.style.right="0px";a.style.top="0px";a.style.fontSize="0.8em";a.style.textAlign="left";a.style.background="rgba(0,0,0,0.25)";a.style.color="#fff";a.style.width="120px";a.style.padding="0.5em 0.5em 0.5em 0.5em";a.style.zIndex=1E3;a.innerHTML="Loading ...";return a},updateProgress:function(a){var b="Loaded ",b=a.total?b+((100*a.loaded/a.total).toFixed(0)+
"%"):b+((a.loaded/1024).toFixed(2)+" KB");this.statusDomElement.innerHTML=b},extractUrlBase:function(a){a=a.split("/");if(1===a.length)return"./";a.pop();return a.join("/")+"/"},initMaterials:function(a,b){for(var c=[],d=0;d<a.length;++d)c[d]=this.createMaterial(a[d],b);return c},needsTangents:function(a){for(var b=0,c=a.length;b<c;b++)if(a[b]instanceof THREE.ShaderMaterial)return!0;return!1},createMaterial:function(a,b){function c(a){a=Math.log(a)/Math.LN2;return Math.pow(2,Math.round(a))}function d(a,
d,e,g,h,k,r){var v=/\.dds$/i.test(e),w=b+e;if(v){var u=THREE.ImageUtils.loadCompressedTexture(w);a[d]=u}else u=document.createElement("canvas"),a[d]=new THREE.Texture(u);a[d].sourceFile=e;g&&(a[d].repeat.set(g[0],g[1]),1!==g[0]&&(a[d].wrapS=THREE.RepeatWrapping),1!==g[1]&&(a[d].wrapT=THREE.RepeatWrapping));h&&a[d].offset.set(h[0],h[1]);k&&(e={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping},void 0!==e[k[0]]&&(a[d].wrapS=e[k[0]]),void 0!==e[k[1]]&&(a[d].wrapT=e[k[1]]));r&&(a[d].anisotropy=
r);v||(u=a[d],f.imageLoader.crossOrigin=f.crossOrigin,f.imageLoader.load(w,function(a){if(!1===THREE.Math.isPowerOfTwo(a.width)||!1===THREE.Math.isPowerOfTwo(a.height)){var b=c(a.width),d=c(a.height);u.image.width=b;u.image.height=d;u.image.getContext("2d").drawImage(a,0,0,b,d)}else u.image=a;u.needsUpdate=!0}))}function e(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]}var f=this,g="MeshLambertMaterial",h={color:15658734,opacity:1,map:null,lightMap:null,normalMap:null,bumpMap:null,wireframe:!1};if(a.shading){var k=
a.shading.toLowerCase();"phong"===k?g="MeshPhongMaterial":"basic"===k&&(g="MeshBasicMaterial")}void 0!==a.blending&&void 0!==THREE[a.blending]&&(h.blending=THREE[a.blending]);if(void 0!==a.transparent||1>a.opacity)h.transparent=a.transparent;void 0!==a.depthTest&&(h.depthTest=a.depthTest);void 0!==a.depthWrite&&(h.depthWrite=a.depthWrite);void 0!==a.visible&&(h.visible=a.visible);void 0!==a.flipSided&&(h.side=THREE.BackSide);void 0!==a.doubleSided&&(h.side=THREE.DoubleSide);void 0!==a.wireframe&&
(h.wireframe=a.wireframe);void 0!==a.vertexColors&&("face"===a.vertexColors?h.vertexColors=THREE.FaceColors:a.vertexColors&&(h.vertexColors=THREE.VertexColors));a.colorDiffuse?h.color=e(a.colorDiffuse):a.DbgColor&&(h.color=a.DbgColor);a.colorSpecular&&(h.specular=e(a.colorSpecular));a.colorAmbient&&(h.ambient=e(a.colorAmbient));a.colorEmissive&&(h.emissive=e(a.colorEmissive));a.transparency&&(h.opacity=a.transparency);a.specularCoef&&(h.shininess=a.specularCoef);a.mapDiffuse&&b&&d(h,"map",a.mapDiffuse,
a.mapDiffuseRepeat,a.mapDiffuseOffset,a.mapDiffuseWrap,a.mapDiffuseAnisotropy);a.mapLight&&b&&d(h,"lightMap",a.mapLight,a.mapLightRepeat,a.mapLightOffset,a.mapLightWrap,a.mapLightAnisotropy);a.mapBump&&b&&d(h,"bumpMap",a.mapBump,a.mapBumpRepeat,a.mapBumpOffset,a.mapBumpWrap,a.mapBumpAnisotropy);a.mapNormal&&b&&d(h,"normalMap",a.mapNormal,a.mapNormalRepeat,a.mapNormalOffset,a.mapNormalWrap,a.mapNormalAnisotropy);a.mapSpecular&&b&&d(h,"specularMap",a.mapSpecular,a.mapSpecularRepeat,a.mapSpecularOffset,
a.mapSpecularWrap,a.mapSpecularAnisotropy);a.mapBumpScale&&(h.bumpScale=a.mapBumpScale);a.mapNormal?(g=THREE.ShaderLib.normalmap,k=THREE.UniformsUtils.clone(g.uniforms),k.tNormal.value=h.normalMap,a.mapNormalFactor&&k.uNormalScale.value.set(a.mapNormalFactor,a.mapNormalFactor),h.map&&(k.tDiffuse.value=h.map,k.enableDiffuse.value=!0),h.specularMap&&(k.tSpecular.value=h.specularMap,k.enableSpecular.value=!0),h.lightMap&&(k.tAO.value=h.lightMap,k.enableAO.value=!0),k.diffuse.value.setHex(h.color),k.specular.value.setHex(h.specular),
k.ambient.value.setHex(h.ambient),k.shininess.value=h.shininess,void 0!==h.opacity&&(k.opacity.value=h.opacity),g=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:k,lights:!0,fog:!0}),h.transparent&&(g.transparent=!0)):g=new THREE[g](h);void 0!==a.DbgName&&(g.name=a.DbgName);return g}};THREE.XHRLoader=function(a){this.cache=new THREE.Cache;this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.XHRLoader.prototype={constructor:THREE.XHRLoader,load:function(a,b,c,d){var e=this,f=e.cache.get(a);void 0!==f?b(f):(f=new XMLHttpRequest,void 0!==b&&f.addEventListener("load",function(c){e.cache.add(a,c.target.responseText);b(c.target.responseText);e.manager.itemEnd(a)},!1),void 0!==c&&f.addEventListener("progress",function(a){c(a)},!1),void 0!==d&&f.addEventListener("error",function(a){d(a)},!1),void 0!==this.crossOrigin&&(f.crossOrigin=this.crossOrigin),f.open("GET",a,!0),f.send(null),e.manager.itemStart(a))},
setCrossOrigin:function(a){this.crossOrigin=a}};THREE.ImageLoader=function(a){this.cache=new THREE.Cache;this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.ImageLoader.prototype={constructor:THREE.ImageLoader,load:function(a,b,c,d){var e=this,f=e.cache.get(a);if(void 0!==f)b(f);else return f=document.createElement("img"),void 0!==b&&f.addEventListener("load",function(c){e.cache.add(a,this);b(this);e.manager.itemEnd(a)},!1),void 0!==c&&f.addEventListener("progress",function(a){c(a)},!1),void 0!==d&&f.addEventListener("error",function(a){d(a)},!1),void 0!==this.crossOrigin&&(f.crossOrigin=this.crossOrigin),f.src=a,e.manager.itemStart(a),f},setCrossOrigin:function(a){this.crossOrigin=
a}};THREE.JSONLoader=function(a){THREE.Loader.call(this,a);this.withCredentials=!1};THREE.JSONLoader.prototype=Object.create(THREE.Loader.prototype);THREE.JSONLoader.prototype.load=function(a,b,c){c=c&&"string"===typeof c?c:this.extractUrlBase(a);this.onLoadStart();this.loadAjaxJSON(this,a,b,c)};
THREE.JSONLoader.prototype.loadAjaxJSON=function(a,b,c,d,e){var f=new XMLHttpRequest,g=0;f.onreadystatechange=function(){if(f.readyState===f.DONE)if(200===f.status||0===f.status){if(f.responseText){var h=JSON.parse(f.responseText);if(void 0!==h.metadata&&"scene"===h.metadata.type){console.error('THREE.JSONLoader: "'+b+'" seems to be a Scene. Use THREE.SceneLoader instead.');return}h=a.parse(h,d);c(h.geometry,h.materials)}else console.error('THREE.JSONLoader: "'+b+'" seems to be unreachable or the file is empty.');
a.onLoadComplete()}else console.error("THREE.JSONLoader: Couldn't load \""+b+'" ('+f.status+")");else f.readyState===f.LOADING?e&&(0===g&&(g=f.getResponseHeader("Content-Length")),e({total:g,loaded:f.responseText.length})):f.readyState===f.HEADERS_RECEIVED&&void 0!==e&&(g=f.getResponseHeader("Content-Length"))};f.open("GET",b,!0);f.withCredentials=this.withCredentials;f.send(null)};
THREE.JSONLoader.prototype.parse=function(a,b){var c=new THREE.Geometry,d=void 0!==a.scale?1/a.scale:1;(function(b){var d,g,h,k,l,n,q,p,s,t,r,v,w,u=a.faces;n=a.vertices;var y=a.normals,L=a.colors,x=0;if(void 0!==a.uvs){for(d=0;d<a.uvs.length;d++)a.uvs[d].length&&x++;for(d=0;d<x;d++)c.faceVertexUvs[d]=[]}k=0;for(l=n.length;k<l;)d=new THREE.Vector3,d.x=n[k++]*b,d.y=n[k++]*b,d.z=n[k++]*b,c.vertices.push(d);k=0;for(l=u.length;k<l;)if(b=u[k++],s=b&1,h=b&2,d=b&8,q=b&16,t=b&32,n=b&64,b&=128,s){s=new THREE.Face3;
s.a=u[k];s.b=u[k+1];s.c=u[k+3];r=new THREE.Face3;r.a=u[k+1];r.b=u[k+2];r.c=u[k+3];k+=4;h&&(h=u[k++],s.materialIndex=h,r.materialIndex=h);h=c.faces.length;if(d)for(d=0;d<x;d++)for(v=a.uvs[d],c.faceVertexUvs[d][h]=[],c.faceVertexUvs[d][h+1]=[],g=0;4>g;g++)p=u[k++],w=v[2*p],p=v[2*p+1],w=new THREE.Vector2(w,p),2!==g&&c.faceVertexUvs[d][h].push(w),0!==g&&c.faceVertexUvs[d][h+1].push(w);q&&(q=3*u[k++],s.normal.set(y[q++],y[q++],y[q]),r.normal.copy(s.normal));if(t)for(d=0;4>d;d++)q=3*u[k++],t=new THREE.Vector3(y[q++],
y[q++],y[q]),2!==d&&s.vertexNormals.push(t),0!==d&&r.vertexNormals.push(t);n&&(n=u[k++],n=L[n],s.color.setHex(n),r.color.setHex(n));if(b)for(d=0;4>d;d++)n=u[k++],n=L[n],2!==d&&s.vertexColors.push(new THREE.Color(n)),0!==d&&r.vertexColors.push(new THREE.Color(n));c.faces.push(s);c.faces.push(r)}else{s=new THREE.Face3;s.a=u[k++];s.b=u[k++];s.c=u[k++];h&&(h=u[k++],s.materialIndex=h);h=c.faces.length;if(d)for(d=0;d<x;d++)for(v=a.uvs[d],c.faceVertexUvs[d][h]=[],g=0;3>g;g++)p=u[k++],w=v[2*p],p=v[2*p+1],
w=new THREE.Vector2(w,p),c.faceVertexUvs[d][h].push(w);q&&(q=3*u[k++],s.normal.set(y[q++],y[q++],y[q]));if(t)for(d=0;3>d;d++)q=3*u[k++],t=new THREE.Vector3(y[q++],y[q++],y[q]),s.vertexNormals.push(t);n&&(n=u[k++],s.color.setHex(L[n]));if(b)for(d=0;3>d;d++)n=u[k++],s.vertexColors.push(new THREE.Color(L[n]));c.faces.push(s)}})(d);(function(){var b=void 0!==a.influencesPerVertex?a.influencesPerVertex:2;if(a.skinWeights)for(var d=0,g=a.skinWeights.length;d<g;d+=b)c.skinWeights.push(new THREE.Vector4(a.skinWeights[d],
1<b?a.skinWeights[d+1]:0,2<b?a.skinWeights[d+2]:0,3<b?a.skinWeights[d+3]:0));if(a.skinIndices)for(d=0,g=a.skinIndices.length;d<g;d+=b)c.skinIndices.push(new THREE.Vector4(a.skinIndices[d],1<b?a.skinIndices[d+1]:0,2<b?a.skinIndices[d+2]:0,3<b?a.skinIndices[d+3]:0));c.bones=a.bones;c.bones&&0<c.bones.length&&(c.skinWeights.length!==c.skinIndices.length||c.skinIndices.length!==c.vertices.length)&&console.warn("When skinning, number of vertices ("+c.vertices.length+"), skinIndices ("+c.skinIndices.length+
"), and skinWeights ("+c.skinWeights.length+") should match.");c.animation=a.animation;c.animations=a.animations})();(function(b){if(void 0!==a.morphTargets){var d,g,h,k,l,n;d=0;for(g=a.morphTargets.length;d<g;d++)for(c.morphTargets[d]={},c.morphTargets[d].name=a.morphTargets[d].name,c.morphTargets[d].vertices=[],l=c.morphTargets[d].vertices,n=a.morphTargets[d].vertices,h=0,k=n.length;h<k;h+=3){var q=new THREE.Vector3;q.x=n[h]*b;q.y=n[h+1]*b;q.z=n[h+2]*b;l.push(q)}}if(void 0!==a.morphColors)for(d=
0,g=a.morphColors.length;d<g;d++)for(c.morphColors[d]={},c.morphColors[d].name=a.morphColors[d].name,c.morphColors[d].colors=[],k=c.morphColors[d].colors,l=a.morphColors[d].colors,b=0,h=l.length;b<h;b+=3)n=new THREE.Color(16755200),n.setRGB(l[b],l[b+1],l[b+2]),k.push(n)})(d);c.computeFaceNormals();c.computeBoundingSphere();if(void 0===a.materials||0===a.materials.length)return{geometry:c};d=this.initMaterials(a.materials,b);this.needsTangents(d)&&c.computeTangents();return{geometry:c,materials:d}};THREE.LoadingManager=function(a,b,c){var d=this,e=0,f=0;this.onLoad=a;this.onProgress=b;this.onError=c;this.itemStart=function(a){f++};this.itemEnd=function(a){e++;if(void 0!==d.onProgress)d.onProgress(a,e,f);if(e===f&&void 0!==d.onLoad)d.onLoad()}};THREE.DefaultLoadingManager=new THREE.LoadingManager;THREE.BufferGeometryLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.BufferGeometryLoader.prototype={constructor:THREE.BufferGeometryLoader,load:function(a,b,c,d){var e=this;c=new THREE.XHRLoader;c.setCrossOrigin(this.crossOrigin);c.load(a,function(a){b(e.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=new THREE.BufferGeometry,c=a.attributes,d=a.offsets;a=a.boundingSphere;for(var e in c){var f=c[e];b.attributes[e]={itemSize:f.itemSize,array:new self[f.type](f.array)}}void 0!==d&&(b.offsets=JSON.parse(JSON.stringify(d)));
void 0!==a&&(b.boundingSphere=new THREE.Sphere((new THREE.Vector3).fromArray(void 0!==a.center?a.center:[0,0,0]),a.radius));return b}};THREE.MaterialLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.MaterialLoader.prototype={constructor:THREE.MaterialLoader,load:function(a,b,c,d){var e=this;c=new THREE.XHRLoader;c.setCrossOrigin(this.crossOrigin);c.load(a,function(a){b(e.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=new THREE[a.type];void 0!==a.color&&b.color.setHex(a.color);void 0!==a.ambient&&b.ambient.setHex(a.ambient);void 0!==a.emissive&&b.emissive.setHex(a.emissive);void 0!==a.specular&&b.specular.setHex(a.specular);void 0!==a.shininess&&
(b.shininess=a.shininess);void 0!==a.vertexColors&&(b.vertexColors=a.vertexColors);void 0!==a.blending&&(b.blending=a.blending);void 0!==a.side&&(b.side=a.side);void 0!==a.opacity&&(b.opacity=a.opacity);void 0!==a.transparent&&(b.transparent=a.transparent);void 0!==a.wireframe&&(b.wireframe=a.wireframe);if(void 0!==a.materials)for(var c=0,d=a.materials.length;c<d;c++)b.materials.push(this.parse(a.materials[c]));return b}};THREE.ObjectLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.ObjectLoader.prototype={constructor:THREE.ObjectLoader,load:function(a,b,c,d){var e=this;c=new THREE.XHRLoader(e.manager);c.setCrossOrigin(this.crossOrigin);c.load(a,function(a){b(e.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=this.parseGeometries(a.geometries),c=this.parseMaterials(a.materials);return this.parseObject(a.object,b,c)},parseGeometries:function(a){var b={};if(void 0!==a)for(var c=new THREE.JSONLoader,d=new THREE.BufferGeometryLoader,
e=0,f=a.length;e<f;e++){var g,h=a[e];switch(h.type){case "PlaneGeometry":g=new THREE.PlaneGeometry(h.width,h.height,h.widthSegments,h.heightSegments);break;case "BoxGeometry":case "CubeGeometry":g=new THREE.BoxGeometry(h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);break;case "CircleGeometry":g=new THREE.CircleGeometry(h.radius,h.segments);break;case "CylinderGeometry":g=new THREE.CylinderGeometry(h.radiusTop,h.radiusBottom,h.height,h.radialSegments,h.heightSegments,h.openEnded);
break;case "SphereGeometry":g=new THREE.SphereGeometry(h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);break;case "IcosahedronGeometry":g=new THREE.IcosahedronGeometry(h.radius,h.detail);break;case "TorusGeometry":g=new THREE.TorusGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);break;case "TorusKnotGeometry":g=new THREE.TorusKnotGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.p,h.q,h.heightScale);break;case "BufferGeometry":g=
d.parse(h.data);break;case "Geometry":g=c.parse(h.data).geometry}g.uuid=h.uuid;void 0!==h.name&&(g.name=h.name);b[h.uuid]=g}return b},parseMaterials:function(a){var b={};if(void 0!==a)for(var c=new THREE.MaterialLoader,d=0,e=a.length;d<e;d++){var f=a[d],g=c.parse(f);g.uuid=f.uuid;void 0!==f.name&&(g.name=f.name);b[f.uuid]=g}return b},parseObject:function(){var a=new THREE.Matrix4;return function(b,c,d){var e;switch(b.type){case "Scene":e=new THREE.Scene;break;case "PerspectiveCamera":e=new THREE.PerspectiveCamera(b.fov,
b.aspect,b.near,b.far);break;case "OrthographicCamera":e=new THREE.OrthographicCamera(b.left,b.right,b.top,b.bottom,b.near,b.far);break;case "AmbientLight":e=new THREE.AmbientLight(b.color);break;case "DirectionalLight":e=new THREE.DirectionalLight(b.color,b.intensity);break;case "PointLight":e=new THREE.PointLight(b.color,b.intensity,b.distance);break;case "SpotLight":e=new THREE.SpotLight(b.color,b.intensity,b.distance,b.angle,b.exponent);break;case "HemisphereLight":e=new THREE.HemisphereLight(b.color,
b.groundColor,b.intensity);break;case "Mesh":e=c[b.geometry];var f=d[b.material];void 0===e&&console.error("THREE.ObjectLoader: Undefined geometry "+b.geometry);void 0===f&&console.error("THREE.ObjectLoader: Undefined material "+b.material);e=new THREE.Mesh(e,f);break;case "Sprite":f=d[b.material];void 0===f&&console.error("THREE.ObjectLoader: Undefined material "+b.material);e=new THREE.Sprite(f);break;default:e=new THREE.Object3D}e.uuid=b.uuid;void 0!==b.name&&(e.name=b.name);void 0!==b.matrix?
(a.fromArray(b.matrix),a.decompose(e.position,e.quaternion,e.scale)):(void 0!==b.position&&e.position.fromArray(b.position),void 0!==b.rotation&&e.rotation.fromArray(b.rotation),void 0!==b.scale&&e.scale.fromArray(b.scale));void 0!==b.visible&&(e.visible=b.visible);void 0!==b.userData&&(e.userData=b.userData);if(void 0!==b.children)for(var g in b.children)e.add(this.parseObject(b.children[g],c,d));return e}}()};THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){};this.geometryHandlers={};this.hierarchyHandlers={};this.addGeometryHandler("ascii",THREE.JSONLoader)};
THREE.SceneLoader.prototype={constructor:THREE.SceneLoader,load:function(a,b,c,d){var e=this;c=new THREE.XHRLoader(e.manager);c.setCrossOrigin(this.crossOrigin);c.load(a,function(c){e.parse(JSON.parse(c),b,a)})},setCrossOrigin:function(a){this.crossOrigin=a},addGeometryHandler:function(a,b){this.geometryHandlers[a]={loaderClass:b}},addHierarchyHandler:function(a,b){this.hierarchyHandlers[a]={loaderClass:b}},parse:function(a,b,c){function d(a,b){return"relativeToHTML"==b?a:s+a}function e(){f(B.scene,
A.objects)}function f(a,b){var c,e,g,h,l,n;for(n in b){var q=B.objects[n],s=b[n];if(void 0===q){if(s.type&&s.type in p.hierarchyHandlers){if(void 0===s.loading){c={type:1,url:1,material:1,position:1,rotation:1,scale:1,visible:1,children:1,userData:1,skin:1,morph:1,mirroredLoop:1,duration:1};var u={},w;for(w in s)w in c||(u[w]=s[w]);r=B.materials[s.material];s.loading=!0;c=p.hierarchyHandlers[s.type].loaderObject;c.options?c.load(d(s.url,A.urlBaseType),k(n,a,r,s)):c.load(d(s.url,A.urlBaseType),k(n,
a,r,s),u)}}else if(void 0!==s.geometry){if(t=B.geometries[s.geometry]){q=!1;r=B.materials[s.material];q=r instanceof THREE.ShaderMaterial;e=s.position;g=s.rotation;h=s.scale;c=s.matrix;l=s.quaternion;s.material||(r=new THREE.MeshFaceMaterial(B.face_materials[s.geometry]));r instanceof THREE.MeshFaceMaterial&&0===r.materials.length&&(r=new THREE.MeshFaceMaterial(B.face_materials[s.geometry]));if(r instanceof THREE.MeshFaceMaterial)for(u=0;u<r.materials.length;u++)q=q||r.materials[u]instanceof THREE.ShaderMaterial;
q&&t.computeTangents();s.skin?q=new THREE.SkinnedMesh(t,r):s.morph?(q=new THREE.MorphAnimMesh(t,r),void 0!==s.duration&&(q.duration=s.duration),void 0!==s.time&&(q.time=s.time),void 0!==s.mirroredLoop&&(q.mirroredLoop=s.mirroredLoop),r.morphNormals&&t.computeMorphNormals()):q=new THREE.Mesh(t,r);q.name=n;c?(q.matrixAutoUpdate=!1,q.matrix.set(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9],c[10],c[11],c[12],c[13],c[14],c[15])):(q.position.fromArray(e),l?q.quaternion.fromArray(l):q.rotation.fromArray(g),
q.scale.fromArray(h));q.visible=s.visible;q.castShadow=s.castShadow;q.receiveShadow=s.receiveShadow;a.add(q);B.objects[n]=q}}else if("AmbientLight"===s.type||"PointLight"===s.type||"DirectionalLight"===s.type||"SpotLight"===s.type||"HemisphereLight"===s.type||"AreaLight"===s.type){u=s.color;c=s.intensity;e=s.distance;g=s.position;h=s.rotation;switch(s.type){case "AmbientLight":y=new THREE.AmbientLight(u);break;case "PointLight":y=new THREE.PointLight(u,c,e);y.position.fromArray(g);break;case "DirectionalLight":y=
new THREE.DirectionalLight(u,c);y.position.fromArray(s.direction);break;case "SpotLight":y=new THREE.SpotLight(u,c,e,1);y.angle=s.angle;y.position.fromArray(g);y.target.set(g[0],g[1]-e,g[2]);y.target.applyEuler(new THREE.Euler(h[0],h[1],h[2],"XYZ"));break;case "HemisphereLight":y=new THREE.DirectionalLight(u,c,e);y.target.set(g[0],g[1]-e,g[2]);y.target.applyEuler(new THREE.Euler(h[0],h[1],h[2],"XYZ"));break;case "AreaLight":y=new THREE.AreaLight(u,c),y.position.fromArray(g),y.width=s.size,y.height=
s.size_y}a.add(y);y.name=n;B.lights[n]=y;B.objects[n]=y}else"PerspectiveCamera"===s.type||"OrthographicCamera"===s.type?(e=s.position,g=s.rotation,l=s.quaternion,"PerspectiveCamera"===s.type?v=new THREE.PerspectiveCamera(s.fov,s.aspect,s.near,s.far):"OrthographicCamera"===s.type&&(v=new THREE.OrthographicCamera(s.left,s.right,s.top,s.bottom,s.near,s.far)),v.name=n,v.position.fromArray(e),void 0!==l?v.quaternion.fromArray(l):void 0!==g&&v.rotation.fromArray(g),a.add(v),B.cameras[n]=v,B.objects[n]=
v):(e=s.position,g=s.rotation,h=s.scale,l=s.quaternion,q=new THREE.Object3D,q.name=n,q.position.fromArray(e),l?q.quaternion.fromArray(l):q.rotation.fromArray(g),q.scale.fromArray(h),q.visible=void 0!==s.visible?s.visible:!1,a.add(q),B.objects[n]=q,B.empties[n]=q);if(q){if(void 0!==s.userData)for(var L in s.userData)q.userData[L]=s.userData[L];if(void 0!==s.groups)for(u=0;u<s.groups.length;u++)c=s.groups[u],void 0===B.groups[c]&&(B.groups[c]=[]),B.groups[c].push(n)}}void 0!==q&&void 0!==s.children&&
f(q,s.children)}}function g(a,b,c,d,f){var g=f.rotation,h=f.quaternion,k=f.scale;a.position.fromArray(f.position);h?a.quaternion.fromArray(h):a.rotation.fromArray(g);a.scale.fromArray(k);d&&a.traverse(function(a){a.material=d});var l=void 0!==f.visible?f.visible:!0;a.traverse(function(a){a.visible=l});c.add(a);a.name=b;B.objects[b]=a;e()}function h(a){return function(b,c){b.name=a;B.geometries[a]=b;B.face_materials[a]=c;e();L-=1;p.onLoadComplete();n()}}function k(a,b,c,d){return function(e){g(e.content?
e.content:e.dae?e.scene:e,a,b,c,d);L-=1;p.onLoadComplete();n()}}function l(a){return function(b,c){b.name=a;B.geometries[a]=b;B.face_materials[a]=c}}function n(){p.callbackProgress({totalModels:N,totalTextures:J,loadedModels:N-L,loadedTextures:J-x},B);p.onLoadProgress();if(0===L&&0===x){for(var a=0;a<K.length;a++){var c=K[a],d=B.objects[c.targetName];d?c.object.target=d:(c.object.target=new THREE.Object3D,B.scene.add(c.object.target));c.object.target.userData.targetInverse=c.object}b(B)}}function q(a,
b){b(a);if(void 0!==a.children)for(var c in a.children)q(a.children[c],b)}var p=this,s=THREE.Loader.prototype.extractUrlBase(c),t,r,v,w,u,y,L,x,N,J,B,K=[],A=a,G;for(G in this.geometryHandlers)a=this.geometryHandlers[G].loaderClass,this.geometryHandlers[G].loaderObject=new a;for(G in this.hierarchyHandlers)a=this.hierarchyHandlers[G].loaderClass,this.hierarchyHandlers[G].loaderObject=new a;x=L=0;B={scene:new THREE.Scene,geometries:{},face_materials:{},materials:{},textures:{},objects:{},cameras:{},
lights:{},fogs:{},empties:{},groups:{}};A.transform&&(G=A.transform.position,a=A.transform.rotation,c=A.transform.scale,G&&B.scene.position.fromArray(G),a&&B.scene.rotation.fromArray(a),c&&B.scene.scale.fromArray(c),G||a||c)&&(B.scene.updateMatrix(),B.scene.updateMatrixWorld());G=function(a){return function(){x-=a;n();p.onLoadComplete()}};for(var D in A.fogs)a=A.fogs[D],"linear"===a.type?w=new THREE.Fog(0,a.near,a.far):"exp2"===a.type&&(w=new THREE.FogExp2(0,a.density)),a=a.color,w.color.setRGB(a[0],
a[1],a[2]),B.fogs[D]=w;for(var C in A.geometries)w=A.geometries[C],w.type in this.geometryHandlers&&(L+=1,p.onLoadStart());for(var F in A.objects)q(A.objects[F],function(a){a.type&&a.type in p.hierarchyHandlers&&(L+=1,p.onLoadStart())});N=L;for(C in A.geometries)if(w=A.geometries[C],"cube"===w.type)t=new THREE.BoxGeometry(w.width,w.height,w.depth,w.widthSegments,w.heightSegments,w.depthSegments),t.name=C,B.geometries[C]=t;else if("plane"===w.type)t=new THREE.PlaneGeometry(w.width,w.height,w.widthSegments,
w.heightSegments),t.name=C,B.geometries[C]=t;else if("sphere"===w.type)t=new THREE.SphereGeometry(w.radius,w.widthSegments,w.heightSegments),t.name=C,B.geometries[C]=t;else if("cylinder"===w.type)t=new THREE.CylinderGeometry(w.topRad,w.botRad,w.height,w.radSegs,w.heightSegs),t.name=C,B.geometries[C]=t;else if("torus"===w.type)t=new THREE.TorusGeometry(w.radius,w.tube,w.segmentsR,w.segmentsT),t.name=C,B.geometries[C]=t;else if("icosahedron"===w.type)t=new THREE.IcosahedronGeometry(w.radius,w.subdivisions),
t.name=C,B.geometries[C]=t;else if(w.type in this.geometryHandlers){F={};for(u in w)"type"!==u&&"url"!==u&&(F[u]=w[u]);this.geometryHandlers[w.type].loaderObject.load(d(w.url,A.urlBaseType),h(C),F)}else"embedded"===w.type&&(F=A.embeds[w.id],F.metadata=A.metadata,F&&(F=this.geometryHandlers.ascii.loaderObject.parse(F,""),l(C)(F.geometry,F.materials)));for(var z in A.textures)if(C=A.textures[z],C.url instanceof Array)for(x+=C.url.length,u=0;u<C.url.length;u++)p.onLoadStart();else x+=1,p.onLoadStart();
J=x;for(z in A.textures){C=A.textures[z];void 0!==C.mapping&&void 0!==THREE[C.mapping]&&(C.mapping=new THREE[C.mapping]);if(C.url instanceof Array){F=C.url.length;w=[];for(u=0;u<F;u++)w[u]=d(C.url[u],A.urlBaseType);u=(u=/\.dds$/i.test(w[0]))?THREE.ImageUtils.loadCompressedTextureCube(w,C.mapping,G(F)):THREE.ImageUtils.loadTextureCube(w,C.mapping,G(F))}else u=/\.dds$/i.test(C.url),F=d(C.url,A.urlBaseType),w=G(1),u=u?THREE.ImageUtils.loadCompressedTexture(F,C.mapping,w):THREE.ImageUtils.loadTexture(F,
C.mapping,w),void 0!==THREE[C.minFilter]&&(u.minFilter=THREE[C.minFilter]),void 0!==THREE[C.magFilter]&&(u.magFilter=THREE[C.magFilter]),C.anisotropy&&(u.anisotropy=C.anisotropy),C.repeat&&(u.repeat.set(C.repeat[0],C.repeat[1]),1!==C.repeat[0]&&(u.wrapS=THREE.RepeatWrapping),1!==C.repeat[1]&&(u.wrapT=THREE.RepeatWrapping)),C.offset&&u.offset.set(C.offset[0],C.offset[1]),C.wrap&&(F={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping},void 0!==F[C.wrap[0]]&&(u.wrapS=F[C.wrap[0]]),void 0!==
F[C.wrap[1]]&&(u.wrapT=F[C.wrap[1]]));B.textures[z]=u}var H,E;for(H in A.materials){z=A.materials[H];for(E in z.parameters)"envMap"===E||"map"===E||"lightMap"===E||"bumpMap"===E?z.parameters[E]=B.textures[z.parameters[E]]:"shading"===E?z.parameters[E]="flat"===z.parameters[E]?THREE.FlatShading:THREE.SmoothShading:"side"===E?z.parameters[E]="double"==z.parameters[E]?THREE.DoubleSide:"back"==z.parameters[E]?THREE.BackSide:THREE.FrontSide:"blending"===E?z.parameters[E]=z.parameters[E]in THREE?THREE[z.parameters[E]]:
THREE.NormalBlending:"combine"===E?z.parameters[E]=z.parameters[E]in THREE?THREE[z.parameters[E]]:THREE.MultiplyOperation:"vertexColors"===E?"face"==z.parameters[E]?z.parameters[E]=THREE.FaceColors:z.parameters[E]&&(z.parameters[E]=THREE.VertexColors):"wrapRGB"===E&&(G=z.parameters[E],z.parameters[E]=new THREE.Vector3(G[0],G[1],G[2]));void 0!==z.parameters.opacity&&1>z.parameters.opacity&&(z.parameters.transparent=!0);z.parameters.normalMap?(G=THREE.ShaderLib.normalmap,C=THREE.UniformsUtils.clone(G.uniforms),
u=z.parameters.color,F=z.parameters.specular,w=z.parameters.ambient,D=z.parameters.shininess,C.tNormal.value=B.textures[z.parameters.normalMap],z.parameters.normalScale&&C.uNormalScale.value.set(z.parameters.normalScale[0],z.parameters.normalScale[1]),z.parameters.map&&(C.tDiffuse.value=z.parameters.map,C.enableDiffuse.value=!0),z.parameters.envMap&&(C.tCube.value=z.parameters.envMap,C.enableReflection.value=!0,C.reflectivity.value=z.parameters.reflectivity),z.parameters.lightMap&&(C.tAO.value=z.parameters.lightMap,
C.enableAO.value=!0),z.parameters.specularMap&&(C.tSpecular.value=B.textures[z.parameters.specularMap],C.enableSpecular.value=!0),z.parameters.displacementMap&&(C.tDisplacement.value=B.textures[z.parameters.displacementMap],C.enableDisplacement.value=!0,C.uDisplacementBias.value=z.parameters.displacementBias,C.uDisplacementScale.value=z.parameters.displacementScale),C.diffuse.value.setHex(u),C.specular.value.setHex(F),C.ambient.value.setHex(w),C.shininess.value=D,z.parameters.opacity&&(C.opacity.value=
z.parameters.opacity),r=new THREE.ShaderMaterial({fragmentShader:G.fragmentShader,vertexShader:G.vertexShader,uniforms:C,lights:!0,fog:!0})):r=new THREE[z.type](z.parameters);r.name=H;B.materials[H]=r}for(H in A.materials)if(z=A.materials[H],z.parameters.materials){E=[];for(u=0;u<z.parameters.materials.length;u++)E.push(B.materials[z.parameters.materials[u]]);B.materials[H].materials=E}e();B.cameras&&A.defaults.camera&&(B.currentCamera=B.cameras[A.defaults.camera]);B.fogs&&A.defaults.fog&&(B.scene.fog=
B.fogs[A.defaults.fog]);p.callbackSync(B);n()}};THREE.TextureLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};THREE.TextureLoader.prototype={constructor:THREE.TextureLoader,load:function(a,b,c,d){c=new THREE.ImageLoader(this.manager);c.setCrossOrigin(this.crossOrigin);c.load(a,function(a){a=new THREE.Texture(a);a.needsUpdate=!0;void 0!==b&&b(a)})},setCrossOrigin:function(a){this.crossOrigin=a}};THREE.Material=function(){this.id=THREE.MaterialIdCount++;this.uuid=THREE.Math.generateUUID();this.name="";this.side=THREE.FrontSide;this.opacity=1;this.transparent=!1;this.blending=THREE.NormalBlending;this.blendSrc=THREE.SrcAlphaFactor;this.blendDst=THREE.OneMinusSrcAlphaFactor;this.blendEquation=THREE.AddEquation;this.depthWrite=this.depthTest=!0;this.polygonOffset=!1;this.overdraw=this.alphaTest=this.polygonOffsetUnits=this.polygonOffsetFactor=0;this.needsUpdate=this.visible=!0};
THREE.Material.prototype={constructor:THREE.Material,setValues:function(a){if(void 0!==a)for(var b in a){var c=a[b];if(void 0===c)console.warn("THREE.Material: '"+b+"' parameter is undefined.");else if(b in this){var d=this[b];d instanceof THREE.Color?d.set(c):d instanceof THREE.Vector3&&c instanceof THREE.Vector3?d.copy(c):this[b]="overdraw"==b?Number(c):c}}},clone:function(a){void 0===a&&(a=new THREE.Material);a.name=this.name;a.side=this.side;a.opacity=this.opacity;a.transparent=this.transparent;
a.blending=this.blending;a.blendSrc=this.blendSrc;a.blendDst=this.blendDst;a.blendEquation=this.blendEquation;a.depthTest=this.depthTest;a.depthWrite=this.depthWrite;a.polygonOffset=this.polygonOffset;a.polygonOffsetFactor=this.polygonOffsetFactor;a.polygonOffsetUnits=this.polygonOffsetUnits;a.alphaTest=this.alphaTest;a.overdraw=this.overdraw;a.visible=this.visible;return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);
THREE.MaterialIdCount=0;THREE.LineBasicMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.linewidth=1;this.linejoin=this.linecap="round";this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.LineBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone=function(){var a=new THREE.LineBasicMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;a.linecap=this.linecap;a.linejoin=this.linejoin;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.LineDashedMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.scale=this.linewidth=1;this.dashSize=3;this.gapSize=1;this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.LineDashedMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone=function(){var a=new THREE.LineDashedMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;a.scale=this.scale;a.dashSize=this.dashSize;a.gapSize=this.gapSize;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.MeshBasicMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.envMap=this.specularMap=this.lightMap=this.map=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.vertexColors=THREE.NoColors;this.morphTargets=this.skinning=!1;this.setValues(a)};
THREE.MeshBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone=function(){var a=new THREE.MeshBasicMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.lightMap=this.lightMap;a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=
this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;return a};THREE.MeshLambertMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.ambient=new THREE.Color(16777215);this.emissive=new THREE.Color(0);this.wrapAround=!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.envMap=this.specularMap=this.lightMap=this.map=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap=
"round";this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)};THREE.MeshLambertMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone=function(){var a=new THREE.MeshLambertMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.ambient.copy(this.ambient);a.emissive.copy(this.emissive);a.wrapAround=this.wrapAround;a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;
a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.MeshPhongMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.ambient=new THREE.Color(16777215);this.emissive=new THREE.Color(0);this.specular=new THREE.Color(1118481);this.shininess=30;this.wrapAround=this.metal=!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.bumpMap=this.lightMap=this.map=null;this.bumpScale=1;this.normalMap=null;this.normalScale=new THREE.Vector2(1,1);this.envMap=this.specularMap=null;this.combine=THREE.MultiplyOperation;this.reflectivity=
1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)};THREE.MeshPhongMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone=function(){var a=new THREE.MeshPhongMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.ambient.copy(this.ambient);a.emissive.copy(this.emissive);a.specular.copy(this.specular);a.shininess=this.shininess;a.metal=this.metal;a.wrapAround=this.wrapAround;a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;a.bumpMap=this.bumpMap;a.bumpScale=this.bumpScale;a.normalMap=this.normalMap;a.normalScale.copy(this.normalScale);
a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.MeshDepthMaterial=function(a){THREE.Material.call(this);this.wireframe=this.morphTargets=!1;this.wireframeLinewidth=1;this.setValues(a)};THREE.MeshDepthMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshDepthMaterial.prototype.clone=function(){var a=new THREE.MeshDepthMaterial;THREE.Material.prototype.clone.call(this,a);a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;return a};THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);this.shading=THREE.FlatShading;this.wireframe=!1;this.wireframeLinewidth=1;this.morphTargets=!1;this.setValues(a)};THREE.MeshNormalMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshNormalMaterial.prototype.clone=function(){var a=new THREE.MeshNormalMaterial;THREE.Material.prototype.clone.call(this,a);a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;return a};THREE.MeshFaceMaterial=function(a){this.materials=a instanceof Array?a:[]};THREE.MeshFaceMaterial.prototype.clone=function(){for(var a=new THREE.MeshFaceMaterial,b=0;b<this.materials.length;b++)a.materials.push(this.materials[b].clone());return a};THREE.ParticleSystemMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.map=null;this.size=1;this.sizeAttenuation=!0;this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.ParticleSystemMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.ParticleSystemMaterial.prototype.clone=function(){var a=new THREE.ParticleSystemMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.size=this.size;a.sizeAttenuation=this.sizeAttenuation;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.ParticleBasicMaterial=THREE.ParticleSystemMaterial;THREE.ShaderMaterial=function(a){THREE.Material.call(this);this.vertexShader=this.fragmentShader="void main() {}";this.uniforms={};this.defines={};this.attributes=null;this.shading=THREE.SmoothShading;this.linewidth=1;this.wireframe=!1;this.wireframeLinewidth=1;this.lights=this.fog=!1;this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]};this.index0AttributeName=void 0;this.setValues(a)};
THREE.ShaderMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone=function(){var a=new THREE.ShaderMaterial;THREE.Material.prototype.clone.call(this,a);a.fragmentShader=this.fragmentShader;a.vertexShader=this.vertexShader;a.uniforms=THREE.UniformsUtils.clone(this.uniforms);a.attributes=this.attributes;a.defines=this.defines;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.fog=this.fog;a.lights=this.lights;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=
this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.RawShaderMaterial=function(a){THREE.ShaderMaterial.call(this,a)};THREE.RawShaderMaterial.prototype=Object.create(THREE.ShaderMaterial.prototype);THREE.RawShaderMaterial.prototype.clone=function(){var a=new THREE.RawShaderMaterial;THREE.ShaderMaterial.prototype.clone.call(this,a);return a};THREE.SpriteMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.map=null;this.rotation=0;this.fog=!1;this.setValues(a)};THREE.SpriteMaterial.prototype=Object.create(THREE.Material.prototype);THREE.SpriteMaterial.prototype.clone=function(){var a=new THREE.SpriteMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.rotation=this.rotation;a.fog=this.fog;return a};THREE.SpriteCanvasMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.program=function(a,c){};this.setValues(a)};THREE.SpriteCanvasMaterial.prototype=Object.create(THREE.Material.prototype);THREE.SpriteCanvasMaterial.prototype.clone=function(){var a=new THREE.SpriteCanvasMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.program=this.program;return a};THREE.ParticleCanvasMaterial=THREE.SpriteCanvasMaterial;THREE.Texture=function(a,b,c,d,e,f,g,h,k){this.id=THREE.TextureIdCount++;this.uuid=THREE.Math.generateUUID();this.name="";this.image=a;this.mipmaps=[];this.mapping=void 0!==b?b:new THREE.UVMapping;this.wrapS=void 0!==c?c:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==d?d:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==e?e:THREE.LinearFilter;this.minFilter=void 0!==f?f:THREE.LinearMipMapLinearFilter;this.anisotropy=void 0!==k?k:1;this.format=void 0!==g?g:THREE.RGBAFormat;this.type=void 0!==h?h:THREE.UnsignedByteType;
this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.generateMipmaps=!0;this.premultiplyAlpha=!1;this.flipY=!0;this.unpackAlignment=4;this._needsUpdate=!1;this.onUpdate=null};
THREE.Texture.prototype={constructor:THREE.Texture,get needsUpdate(){return this._needsUpdate},set needsUpdate(a){!0===a&&this.update();this._needsUpdate=a},clone:function(a){void 0===a&&(a=new THREE.Texture);a.image=this.image;a.mipmaps=this.mipmaps.slice(0);a.mapping=this.mapping;a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;a.anisotropy=this.anisotropy;a.format=this.format;a.type=this.type;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.generateMipmaps=
this.generateMipmaps;a.premultiplyAlpha=this.premultiplyAlpha;a.flipY=this.flipY;a.unpackAlignment=this.unpackAlignment;return a},update:function(){this.dispatchEvent({type:"update"})},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);THREE.TextureIdCount=0;THREE.CompressedTexture=function(a,b,c,d,e,f,g,h,k,l,n){THREE.Texture.call(this,null,f,g,h,k,l,d,e,n);this.image={width:b,height:c};this.mipmaps=a;this.generateMipmaps=!1};THREE.CompressedTexture.prototype=Object.create(THREE.Texture.prototype);THREE.CompressedTexture.prototype.clone=function(){var a=new THREE.CompressedTexture;THREE.Texture.prototype.clone.call(this,a);return a};THREE.DataTexture=function(a,b,c,d,e,f,g,h,k,l,n){THREE.Texture.call(this,null,f,g,h,k,l,d,e,n);this.image={data:a,width:b,height:c}};THREE.DataTexture.prototype=Object.create(THREE.Texture.prototype);THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture;THREE.Texture.prototype.clone.call(this,a);return a};THREE.ParticleSystem=function(a,b){THREE.Object3D.call(this);this.geometry=void 0!==a?a:new THREE.Geometry;this.material=void 0!==b?b:new THREE.ParticleSystemMaterial({color:16777215*Math.random()});this.frustumCulled=this.sortParticles=!1};THREE.ParticleSystem.prototype=Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone=function(a){void 0===a&&(a=new THREE.ParticleSystem(this.geometry,this.material));a.sortParticles=this.sortParticles;THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Line=function(a,b,c){THREE.Object3D.call(this);this.geometry=void 0!==a?a:new THREE.Geometry;this.material=void 0!==b?b:new THREE.LineBasicMaterial({color:16777215*Math.random()});this.type=void 0!==c?c:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=Object.create(THREE.Object3D.prototype);THREE.Line.prototype.clone=function(a){void 0===a&&(a=new THREE.Line(this.geometry,this.material,this.type));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Mesh=function(a,b){THREE.Object3D.call(this);this.geometry=void 0!==a?a:new THREE.Geometry;this.material=void 0!==b?b:new THREE.MeshBasicMaterial({color:16777215*Math.random()});this.updateMorphTargets()};THREE.Mesh.prototype=Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets=function(){if(void 0!==this.geometry.morphTargets&&0<this.geometry.morphTargets.length){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var a=0,b=this.geometry.morphTargets.length;a<b;a++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[a].name]=a}};
THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(void 0!==this.morphTargetDictionary[a])return this.morphTargetDictionary[a];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");return 0};THREE.Mesh.prototype.clone=function(a,b){void 0===a&&(a=new THREE.Mesh(this.geometry,this.material));THREE.Object3D.prototype.clone.call(this,a,b);return a};THREE.Bone=function(a){THREE.Object3D.call(this);this.skin=a;this.skinMatrix=new THREE.Matrix4;this.accumulatedSclWeight=this.accumulatedPosWeight=this.accumulatedRotWeight=0};THREE.Bone.prototype=Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update=function(a,b){this.matrixAutoUpdate&&(b|=this.updateMatrix());if(b||this.matrixWorldNeedsUpdate)a?this.skinMatrix.multiplyMatrices(a,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,b=!0,this.accumulatedSclWeight=this.accumulatedPosWeight=this.accumulatedRotWeight=0;for(var c=0,d=this.children.length;c<d;c++)this.children[c].update(this.skinMatrix,b)};THREE.Skeleton=function(a,b){this.useVertexTexture=void 0!==b?b:!0;this.bones=[];this.boneMatrices=[];var c,d,e,f,g;if(void 0!==a){for(var h=0;h<a.length;++h)d=a[h],e=d.pos,f=d.rotq,g=d.scl,c=this.addBone(),c.name=d.name,c.position.set(e[0],e[1],e[2]),c.quaternion.set(f[0],f[1],f[2],f[3]),void 0!==g?c.scale.set(g[0],g[1],g[2]):c.scale.set(1,1,1);for(h=0;h<a.length;++h)d=a[h],-1!==d.parent&&this.bones[d.parent].add(this.bones[h]);c=this.bones.length;this.useVertexTexture?(this.boneTextureHeight=this.boneTextureWidth=
c=256<c?64:64<c?32:16<c?16:8,this.boneMatrices=new Float32Array(this.boneTextureWidth*this.boneTextureHeight*4),this.boneTexture=new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType),this.boneTexture.minFilter=THREE.NearestFilter,this.boneTexture.magFilter=THREE.NearestFilter,this.boneTexture.generateMipmaps=!1,this.boneTexture.flipY=!1):this.boneMatrices=new Float32Array(16*c)}};THREE.Skeleton.prototype=Object.create(THREE.Mesh.prototype);
THREE.Skeleton.prototype.addBone=function(a){void 0===a&&(a=new THREE.Bone(this));this.bones.push(a);return a};THREE.Skeleton.prototype.calculateInverses=function(a){this.boneInverses=[];a=0;for(var b=this.bones.length;a<b;++a){var c=new THREE.Matrix4;c.getInverse(this.bones[a].skinMatrix);this.boneInverses.push(c)}};THREE.SkinnedMesh=function(a,b,c){THREE.Mesh.call(this,a,b);this.skeleton=new THREE.Skeleton(this.geometry&&this.geometry.bones,c);for(a=0;a<this.skeleton.bones.length;++a)b=this.skeleton.bones[a],void 0===b.parent&&this.add(b);this.identityMatrix=new THREE.Matrix4;this.pose()};THREE.SkinnedMesh.prototype=Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.updateMatrixWorld=function(){var a=new THREE.Matrix4;return function(b){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||b)this.parent?this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1;b=0;for(var c=this.children.length;b<c;b++){var d=this.children[b];d instanceof THREE.Bone?d.update(this.identityMatrix,!1):d.updateMatrixWorld(!0)}void 0===this.skeleton.boneInverses&&
this.skeleton.calculateInverses();b=0;for(c=this.skeleton.bones.length;b<c;b++)a.multiplyMatrices(this.skeleton.bones[b].skinMatrix,this.skeleton.boneInverses[b]),a.flattenToArrayOffset(this.skeleton.boneMatrices,16*b);this.skeleton.useVertexTexture&&(this.skeleton.boneTexture.needsUpdate=!0)}}();THREE.SkinnedMesh.prototype.pose=function(){this.updateMatrixWorld(!0);this.normalizeSkinWeights()};
THREE.SkinnedMesh.prototype.normalizeSkinWeights=function(){if(this.geometry instanceof THREE.Geometry)for(var a=0;a<this.geometry.skinIndices.length;a++){var b=this.geometry.skinWeights[a],c=1/b.lengthManhattan();Infinity!==c?b.multiplyScalar(c):b.set(1)}};THREE.SkinnedMesh.prototype.clone=function(a){void 0===a&&(a=new THREE.SkinnedMesh(this.geometry,this.material,this.useVertexTexture));THREE.Mesh.prototype.clone.call(this,a);return a};THREE.MorphAnimMesh=function(a,b){THREE.Mesh.call(this,a,b);this.duration=1E3;this.mirroredLoop=!1;this.currentKeyframe=this.lastKeyframe=this.time=0;this.direction=1;this.directionBackwards=!1;this.setFrameRange(0,this.geometry.morphTargets.length-1)};THREE.MorphAnimMesh.prototype=Object.create(THREE.Mesh.prototype);THREE.MorphAnimMesh.prototype.setFrameRange=function(a,b){this.startKeyframe=a;this.endKeyframe=b;this.length=this.endKeyframe-this.startKeyframe+1};
THREE.MorphAnimMesh.prototype.setDirectionForward=function(){this.direction=1;this.directionBackwards=!1};THREE.MorphAnimMesh.prototype.setDirectionBackward=function(){this.direction=-1;this.directionBackwards=!0};
THREE.MorphAnimMesh.prototype.parseAnimations=function(){var a=this.geometry;a.animations||(a.animations={});for(var b,c=a.animations,d=/([a-z]+)(\d+)/,e=0,f=a.morphTargets.length;e<f;e++){var g=a.morphTargets[e].name.match(d);if(g&&1<g.length){g=g[1];c[g]||(c[g]={start:Infinity,end:-Infinity});var h=c[g];e<h.start&&(h.start=e);e>h.end&&(h.end=e);b||(b=g)}}a.firstAnimation=b};
THREE.MorphAnimMesh.prototype.setAnimationLabel=function(a,b,c){this.geometry.animations||(this.geometry.animations={});this.geometry.animations[a]={start:b,end:c}};THREE.MorphAnimMesh.prototype.playAnimation=function(a,b){var c=this.geometry.animations[a];c?(this.setFrameRange(c.start,c.end),this.duration=(c.end-c.start)/b*1E3,this.time=0):console.warn("animation["+a+"] undefined")};
THREE.MorphAnimMesh.prototype.updateAnimation=function(a){var b=this.duration/this.length;this.time+=this.direction*a;if(this.mirroredLoop){if(this.time>this.duration||0>this.time)this.direction*=-1,this.time>this.duration&&(this.time=this.duration,this.directionBackwards=!0),0>this.time&&(this.time=0,this.directionBackwards=!1)}else this.time%=this.duration,0>this.time&&(this.time+=this.duration);a=this.startKeyframe+THREE.Math.clamp(Math.floor(this.time/b),0,this.length-1);a!==this.currentKeyframe&&
(this.morphTargetInfluences[this.lastKeyframe]=0,this.morphTargetInfluences[this.currentKeyframe]=1,this.morphTargetInfluences[a]=0,this.lastKeyframe=this.currentKeyframe,this.currentKeyframe=a);b=this.time%b/b;this.directionBackwards&&(b=1-b);this.morphTargetInfluences[this.currentKeyframe]=b;this.morphTargetInfluences[this.lastKeyframe]=1-b};
THREE.MorphAnimMesh.prototype.clone=function(a){void 0===a&&(a=new THREE.MorphAnimMesh(this.geometry,this.material));a.duration=this.duration;a.mirroredLoop=this.mirroredLoop;a.time=this.time;a.lastKeyframe=this.lastKeyframe;a.currentKeyframe=this.currentKeyframe;a.direction=this.direction;a.directionBackwards=this.directionBackwards;THREE.Mesh.prototype.clone.call(this,a);return a};THREE.LOD=function(){THREE.Object3D.call(this);this.objects=[]};THREE.LOD.prototype=Object.create(THREE.Object3D.prototype);THREE.LOD.prototype.addLevel=function(a,b){void 0===b&&(b=0);b=Math.abs(b);for(var c=0;c<this.objects.length&&!(b<this.objects[c].distance);c++);this.objects.splice(c,0,{distance:b,object:a});this.add(a)};THREE.LOD.prototype.getObjectForDistance=function(a){for(var b=1,c=this.objects.length;b<c&&!(a<this.objects[b].distance);b++);return this.objects[b-1].object};
THREE.LOD.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c){if(1<this.objects.length){a.setFromMatrixPosition(c.matrixWorld);b.setFromMatrixPosition(this.matrixWorld);c=a.distanceTo(b);this.objects[0].object.visible=!0;for(var d=1,e=this.objects.length;d<e;d++)if(c>=this.objects[d].distance)this.objects[d-1].object.visible=!1,this.objects[d].object.visible=!0;else break;for(;d<e;d++)this.objects[d].object.visible=!1}}}();
THREE.LOD.prototype.clone=function(a){void 0===a&&(a=new THREE.LOD);THREE.Object3D.prototype.clone.call(this,a);for(var b=0,c=this.objects.length;b<c;b++){var d=this.objects[b].object.clone();d.visible=0===b;a.addLevel(d,this.objects[b].distance)}return a};THREE.Sprite=function(){var a=new THREE.Float32Attribute(3,3);a.set([-0.5,-0.5,0,0.5,-0.5,0,0.5,0.5,0]);var b=new THREE.BufferGeometry;b.addAttribute("position",a);return function(a){THREE.Object3D.call(this);this.geometry=b;this.material=void 0!==a?a:new THREE.SpriteMaterial}}();THREE.Sprite.prototype=Object.create(THREE.Object3D.prototype);THREE.Sprite.prototype.updateMatrix=function(){this.matrix.compose(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=!0};
THREE.Sprite.prototype.clone=function(a){void 0===a&&(a=new THREE.Sprite(this.material));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Particle=THREE.Sprite;THREE.Scene=function(){THREE.Object3D.call(this);this.overrideMaterial=this.fog=null;this.autoUpdate=!0;this.matrixAutoUpdate=!1;this.__lights=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject=function(a){if(a instanceof THREE.Light)-1===this.__lights.indexOf(a)&&this.__lights.push(a),a.target&&void 0===a.target.parent&&this.add(a.target);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)){this.__objectsAdded.push(a);var b=this.__objectsRemoved.indexOf(a);-1!==b&&this.__objectsRemoved.splice(b,1)}this.dispatchEvent({type:"objectAdded",object:a});a.dispatchEvent({type:"addedToScene",scene:this});for(b=0;b<a.children.length;b++)this.__addObject(a.children[b])};
THREE.Scene.prototype.__removeObject=function(a){if(a instanceof THREE.Light){var b=this.__lights.indexOf(a);-1!==b&&this.__lights.splice(b,1);if(a.shadowCascadeArray)for(b=0;b<a.shadowCascadeArray.length;b++)this.__removeObject(a.shadowCascadeArray[b])}else a instanceof THREE.Camera||(this.__objectsRemoved.push(a),b=this.__objectsAdded.indexOf(a),-1!==b&&this.__objectsAdded.splice(b,1));this.dispatchEvent({type:"objectRemoved",object:a});a.dispatchEvent({type:"removedFromScene",scene:this});for(b=
0;b<a.children.length;b++)this.__removeObject(a.children[b])};THREE.Scene.prototype.clone=function(a){void 0===a&&(a=new THREE.Scene);THREE.Object3D.prototype.clone.call(this,a);null!==this.fog&&(a.fog=this.fog.clone());null!==this.overrideMaterial&&(a.overrideMaterial=this.overrideMaterial.clone());a.autoUpdate=this.autoUpdate;a.matrixAutoUpdate=this.matrixAutoUpdate;return a};THREE.Fog=function(a,b,c){this.name="";this.color=new THREE.Color(a);this.near=void 0!==b?b:1;this.far=void 0!==c?c:1E3};THREE.Fog.prototype.clone=function(){return new THREE.Fog(this.color.getHex(),this.near,this.far)};THREE.FogExp2=function(a,b){this.name="";this.color=new THREE.Color(a);this.density=void 0!==b?b:2.5E-4};THREE.FogExp2.prototype.clone=function(){return new THREE.FogExp2(this.color.getHex(),this.density)};THREE.CanvasRenderer=function(a){function b(a,b,c,d){l(b);n(c);q(d);p(a.getStyle());A.stroke();qa.expandByScalar(2*b)}function c(a){s(a.getStyle());A.fill()}function d(a){e(a.target)}function e(a){var b=a.wrapS===THREE.RepeatWrapping,c=a.wrapT===THREE.RepeatWrapping,d=a.image,e=document.createElement("canvas");e.width=d.width;e.height=d.height;var f=e.getContext("2d");f.setTransform(1,0,0,-1,0,d.height);f.drawImage(d,0,0);Ga[a.id]=A.createPattern(e,!0===b&&!0===c?"repeat":!0===b&&!1===c?"repeat-x":
!1===b&&!0===c?"repeat-y":"no-repeat")}function f(a,b,c,f,g,h,k,l,n,m,p,r,q){if(!(q instanceof THREE.DataTexture)){!1===q.hasEventListener("update",d)&&(void 0!==q.image&&0<q.image.width&&e(q),q.addEventListener("update",d));var t=Ga[q.id];if(void 0!==t){s(t);var t=q.offset.x/q.repeat.x,u=q.offset.y/q.repeat.y,w=q.image.width*q.repeat.x;q=q.image.height*q.repeat.y;k=(k+t)*w;l=(l+u)*q;c-=a;f-=b;g-=a;h-=b;n=(n+t)*w-k;m=(m+u)*q-l;p=(p+t)*w-k;r=(r+u)*q-l;q=n*r-p*m;0!==q&&(t=1/q,q=(r*c-m*g)*t,m=(r*f-m*
h)*t,c=(n*g-p*c)*t,f=(n*h-p*f)*t,a=a-q*k-c*l,b=b-m*k-f*l,A.save(),A.transform(q,m,c,f,a,b),A.fill(),A.restore())}else s("rgba(0,0,0,1)"),A.fill()}}function g(a,b,c){var d=b.x-a.x,e=b.y-a.y,f=d*d+e*e;0!==f&&(c/=Math.sqrt(f),d*=c,e*=c,b.x+=d,b.y+=e,a.x-=d,a.y-=e)}function h(a){C!==a&&(C=A.globalAlpha=a)}function k(a){F!==a&&(a===THREE.NormalBlending?A.globalCompositeOperation="source-over":a===THREE.AdditiveBlending?A.globalCompositeOperation="lighter":a===THREE.SubtractiveBlending&&(A.globalCompositeOperation=
"darker"),F=a)}function l(a){E!==a&&(E=A.lineWidth=a)}function n(a){Q!==a&&(Q=A.lineCap=a)}function q(a){Y!==a&&(Y=A.lineJoin=a)}function p(a){z!==a&&(z=A.strokeStyle=a)}function s(a){H!==a&&(H=A.fillStyle=a)}function t(a,b){if(U!==a||la!==b)A.setLineDash([a,b]),U=a,la=b}console.log("THREE.CanvasRenderer",THREE.REVISION);var r=THREE.Math.smoothstep;a=a||{};var v=this,w,u,y,L=new THREE.Projector,x=void 0!==a.canvas?a.canvas:document.createElement("canvas"),N=x.width,J=x.height,B=Math.floor(N/2),K=
Math.floor(J/2),A=x.getContext("2d",{alpha:!0===a.alpha}),G=new THREE.Color(0),D=0,C=1,F=0,z=null,H=null,E=null,Q=null,Y=null,U=null,la=0,W,R,I,da;new THREE.RenderableVertex;new THREE.RenderableVertex;var V,X,P,ga,wa,Ha,fa=new THREE.Color;new THREE.Color;new THREE.Color;new THREE.Color;new THREE.Color;var za=new THREE.Color,Ia=new THREE.Color,Ea=new THREE.Color,Ga={},ha,Oa,Ra,Sa,Fa,ia,ma,ya=new THREE.Box2,Z=new THREE.Box2,qa=new THREE.Box2,ua=new THREE.Color,Ca=new THREE.Color,va=new THREE.Color,
Da=new THREE.Vector3,Ja=new THREE.Vector3,ja=new THREE.Vector3,ra=new THREE.Matrix3;void 0===A.setLineDash&&(A.setLineDash=function(){});this.domElement=x;this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:void 0!==self.devicePixelRatio?self.devicePixelRatio:1;this.sortElements=this.sortObjects=this.autoClear=!0;this.info={render:{vertices:0,faces:0}};this.supportsVertexTextures=function(){};this.setFaceCulling=function(){};this.setSize=function(a,b,c){N=a*this.devicePixelRatio;
J=b*this.devicePixelRatio;x.width=N;x.height=J;B=Math.floor(N/2);K=Math.floor(J/2);!1!==c&&(x.style.width=a+"px",x.style.height=b+"px");ya.min.set(-B,-K);ya.max.set(B,K);Z.min.set(-B,-K);Z.max.set(B,K);C=1;F=0;Y=Q=E=H=z=null;this.setViewport(0,0,a,b)};this.setViewport=function(a,b,c,d){A.setTransform(c*this.devicePixelRatio/N,0,0,-(d*this.devicePixelRatio)/J,a*this.devicePixelRatio,J-b*this.devicePixelRatio);A.translate(B,K)};this.setScissor=function(){};this.enableScissorTest=function(){};this.setClearColor=
function(a,b){G.set(a);D=void 0!==b?b:1;Z.min.set(-B,-K);Z.max.set(B,K)};this.setClearColorHex=function(a,b){console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");this.setClearColor(a,b)};this.getMaxAnisotropy=function(){return 0};this.clear=function(){!1===Z.empty()&&(Z.intersect(ya),Z.expandByScalar(2),1>D&&A.clearRect(Z.min.x|0,Z.min.y|0,Z.max.x-Z.min.x|0,Z.max.y-Z.min.y|0),0<D&&(k(THREE.NormalBlending),h(1),s("rgba("+Math.floor(255*G.r)+","+Math.floor(255*
G.g)+","+Math.floor(255*G.b)+","+D+")"),A.fillRect(Z.min.x|0,Z.min.y|0,Z.max.x-Z.min.x|0,Z.max.y-Z.min.y|0)),Z.makeEmpty())};this.clearColor=function(){};this.clearDepth=function(){};this.clearStencil=function(){};this.render=function(a,x){if(!1===x instanceof THREE.Camera)console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");else{!0===this.autoClear&&this.clear();v.info.render.vertices=0;v.info.render.faces=0;w=L.projectScene(a,x,this.sortObjects,this.sortElements);
u=w.elements;y=w.lights;W=x;ra.getNormalMatrix(x.matrixWorldInverse);ua.setRGB(0,0,0);Ca.setRGB(0,0,0);va.setRGB(0,0,0);for(var C=0,J=y.length;C<J;C++){var z=y[C],G=z.color;z instanceof THREE.AmbientLight?ua.add(G):z instanceof THREE.DirectionalLight?Ca.add(G):z instanceof THREE.PointLight&&va.add(G)}C=0;for(J=u.length;C<J;C++){var E=u[C],N=E.material;if(void 0!==N&&0!==N.opacity){qa.makeEmpty();if(E instanceof THREE.RenderableSprite){R=E;R.x*=B;R.y*=K;var z=R,H=E,G=N;h(G.opacity);k(G.blending);var m=
H.scale.x*B,H=H.scale.y*K,E=0.5*Math.sqrt(m*m+H*H);qa.min.set(z.x-E,z.y-E);qa.max.set(z.x+E,z.y+E);if(G instanceof THREE.SpriteMaterial||G instanceof THREE.ParticleSystemMaterial){var D=G.map;if(null!==D){!1===D.hasEventListener("update",d)&&(void 0!==D.image&&0<D.image.width&&e(D),D.addEventListener("update",d));E=Ga[D.id];void 0!==E?s(E):s("rgba( 0, 0, 0, 1 )");var F=D.image,E=F.width*D.offset.x,N=F.height*D.offset.y,Q=F.width*D.repeat.x,D=F.height*D.repeat.y,F=m/Q,U=H/D;A.save();A.translate(z.x,
z.y);0!==G.rotation&&A.rotate(G.rotation);A.translate(-m/2,-H/2);A.scale(F,U);A.translate(-E,-N);A.fillRect(E,N,Q,D)}else s(G.color.getStyle()),A.save(),A.translate(z.x,z.y),0!==G.rotation&&A.rotate(G.rotation),A.scale(m,-H),A.fillRect(-0.5,-0.5,1,1);A.restore()}else G instanceof THREE.SpriteCanvasMaterial&&(p(G.color.getStyle()),s(G.color.getStyle()),A.save(),A.translate(z.x,z.y),0!==G.rotation&&A.rotate(G.rotation),A.scale(m,H),G.program(A),A.restore())}else if(E instanceof THREE.RenderableLine){if(R=
E.v1,I=E.v2,R.positionScreen.x*=B,R.positionScreen.y*=K,I.positionScreen.x*=B,I.positionScreen.y*=K,qa.setFromPoints([R.positionScreen,I.positionScreen]),!0===ya.isIntersectionBox(qa))if(z=R,G=I,m=E,H=N,h(H.opacity),k(H.blending),A.beginPath(),A.moveTo(z.positionScreen.x,z.positionScreen.y),A.lineTo(G.positionScreen.x,G.positionScreen.y),H instanceof THREE.LineBasicMaterial){l(H.linewidth);n(H.linecap);q(H.linejoin);if(H.vertexColors!==THREE.VertexColors)p(H.color.getStyle());else if(E=m.vertexColors[0].getStyle(),
m=m.vertexColors[1].getStyle(),E===m)p(E);else{try{var Y=A.createLinearGradient(z.positionScreen.x,z.positionScreen.y,G.positionScreen.x,G.positionScreen.y);Y.addColorStop(0,E);Y.addColorStop(1,m)}catch(la){Y=E}p(Y)}A.stroke();qa.expandByScalar(2*H.linewidth)}else H instanceof THREE.LineDashedMaterial&&(l(H.linewidth),n(H.linecap),q(H.linejoin),p(H.color.getStyle()),t(H.dashSize,H.gapSize),A.stroke(),qa.expandByScalar(2*H.linewidth),t(null,null))}else if(E instanceof THREE.RenderableFace){R=E.v1;
I=E.v2;da=E.v3;if(-1>R.positionScreen.z||1<R.positionScreen.z)continue;if(-1>I.positionScreen.z||1<I.positionScreen.z)continue;if(-1>da.positionScreen.z||1<da.positionScreen.z)continue;R.positionScreen.x*=B;R.positionScreen.y*=K;I.positionScreen.x*=B;I.positionScreen.y*=K;da.positionScreen.x*=B;da.positionScreen.y*=K;0<N.overdraw&&(g(R.positionScreen,I.positionScreen,N.overdraw),g(I.positionScreen,da.positionScreen,N.overdraw),g(da.positionScreen,R.positionScreen,N.overdraw));qa.setFromPoints([R.positionScreen,
I.positionScreen,da.positionScreen]);if(!0===ya.isIntersectionBox(qa)){G=R;m=I;H=da;z=N;v.info.render.vertices+=3;v.info.render.faces++;h(z.opacity);k(z.blending);V=G.positionScreen.x;X=G.positionScreen.y;P=m.positionScreen.x;ga=m.positionScreen.y;wa=H.positionScreen.x;Ha=H.positionScreen.y;var N=V,Q=X,D=P,F=ga,U=wa,Db=Ha;A.beginPath();A.moveTo(N,Q);A.lineTo(D,F);A.lineTo(U,Db);A.closePath();if((z instanceof THREE.MeshLambertMaterial||z instanceof THREE.MeshPhongMaterial)&&null===z.map){za.copy(z.color);
Ia.copy(z.emissive);z.vertexColors===THREE.FaceColors&&za.multiply(E.color);fa.copy(ua);Ja.copy(G.positionWorld).add(m.positionWorld).add(H.positionWorld).divideScalar(3);G=Ja;m=E.normalModel;H=fa;E=0;for(N=y.length;E<N;E++)Q=y[E],Ea.copy(Q.color),Q instanceof THREE.DirectionalLight?(D=Da.setFromMatrixPosition(Q.matrixWorld).normalize(),F=m.dot(D),0>=F||(F*=Q.intensity,H.add(Ea.multiplyScalar(F)))):Q instanceof THREE.PointLight&&(D=Da.setFromMatrixPosition(Q.matrixWorld),F=m.dot(Da.subVectors(D,G).normalize()),
0>=F||(F*=0==Q.distance?1:1-Math.min(G.distanceTo(D)/Q.distance,1),0!=F&&(F*=Q.intensity,H.add(Ea.multiplyScalar(F)))));fa.multiply(za).add(Ia);!0===z.wireframe?b(fa,z.wireframeLinewidth,z.wireframeLinecap,z.wireframeLinejoin):c(fa)}else z instanceof THREE.MeshBasicMaterial||z instanceof THREE.MeshLambertMaterial||z instanceof THREE.MeshPhongMaterial?null!==z.map?z.map.mapping instanceof THREE.UVMapping&&(ha=E.uvs,f(V,X,P,ga,wa,Ha,ha[0].x,ha[0].y,ha[1].x,ha[1].y,ha[2].x,ha[2].y,z.map)):null!==z.envMap?
z.envMap.mapping instanceof THREE.SphericalReflectionMapping?(ja.copy(E.vertexNormalsModel[0]).applyMatrix3(ra),Oa=0.5*ja.x+0.5,Ra=0.5*ja.y+0.5,ja.copy(E.vertexNormalsModel[1]).applyMatrix3(ra),Sa=0.5*ja.x+0.5,Fa=0.5*ja.y+0.5,ja.copy(E.vertexNormalsModel[2]).applyMatrix3(ra),ia=0.5*ja.x+0.5,ma=0.5*ja.y+0.5,f(V,X,P,ga,wa,Ha,Oa,Ra,Sa,Fa,ia,ma,z.envMap)):z.envMap.mapping instanceof THREE.SphericalRefractionMapping&&(ja.copy(E.vertexNormalsModel[0]).applyMatrix3(ra),Oa=-0.5*ja.x+0.5,Ra=-0.5*ja.y+0.5,
ja.copy(E.vertexNormalsModel[1]).applyMatrix3(ra),Sa=-0.5*ja.x+0.5,Fa=-0.5*ja.y+0.5,ja.copy(E.vertexNormalsModel[2]).applyMatrix3(ra),ia=-0.5*ja.x+0.5,ma=-0.5*ja.y+0.5,f(V,X,P,ga,wa,Ha,Oa,Ra,Sa,Fa,ia,ma,z.envMap)):(fa.copy(z.color),z.vertexColors===THREE.FaceColors&&fa.multiply(E.color),!0===z.wireframe?b(fa,z.wireframeLinewidth,z.wireframeLinecap,z.wireframeLinejoin):c(fa)):(z instanceof THREE.MeshDepthMaterial?fa.r=fa.g=fa.b=1-r(G.positionScreen.z*G.positionScreen.w,W.near,W.far):z instanceof THREE.MeshNormalMaterial?
(ja.copy(E.normalModel).applyMatrix3(ra),fa.setRGB(ja.x,ja.y,ja.z).multiplyScalar(0.5).addScalar(0.5)):fa.setRGB(1,1,1),!0===z.wireframe?b(fa,z.wireframeLinewidth,z.wireframeLinecap,z.wireframeLinejoin):c(fa))}}Z.union(qa)}}}}};THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",fog_fragment:"#ifdef USE_FOG\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\t#ifdef FOG_EXP2\n\t\tconst float LOG2 = 1.442695;\n\t\tfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t#endif\n\tgl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\tuniform samplerCube envMap;\n\tuniform float flipEnvMap;\n\tuniform int combine;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\t\tuniform bool useRefract;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\n\tvec3 reflectVec;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n\t\tif ( useRefract ) {\n\t\t\treflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t} else { \n\t\t\treflectVec = reflect( cameraToVertex, worldNormal );\n\t\t}\n\t#else\n\t\treflectVec = vReflect;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t\tvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#endif\n\t#ifdef GAMMA_INPUT\n\t\tcubeColor.xyz *= cubeColor.xyz;\n\t#endif\n\tif ( combine == 1 ) {\n\t\tgl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n\t} else if ( combine == 2 ) {\n\t\tgl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n\t} else {\n\t\tgl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n\t}\n#endif",
envmap_pars_vertex:"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n\tvarying vec3 vReflect;\n\tuniform float refractionRatio;\n\tuniform bool useRefract;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#endif\n\t#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\t\tvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\t#endif\n\t#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t#endif\n#endif",
envmap_vertex:"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n\tvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n\tworldNormal = normalize( worldNormal );\n\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\tif ( useRefract ) {\n\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t} else {\n\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t}\n#endif",
map_particle_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",map_particle_fragment:"#ifdef USE_MAP\n\tgl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",map_pars_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif",map_pars_fragment:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
map_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\t#ifdef GAMMA_INPUT\n\t\ttexelColor.xyz *= texelColor.xyz;\n\t#endif\n\tgl_FragColor = gl_FragColor * texelColor;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tvarying vec2 vUv2;\n\tuniform sampler2D lightMap;\n#endif",lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\n\tvarying vec2 vUv2;\n#endif",
lightmap_fragment:"#ifdef USE_LIGHTMAP\n\tgl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\n\tvUv2 = uv2;\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif",
specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",lights_lambert_pars_vertex:"uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\n\tuniform vec3 wrapRGB;\n#endif",
lights_lambert_vertex:"vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\tvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n\tvec3 dirVector = normalize( lDirection.xyz );\n\tfloat dotProduct = dot( transformedNormal, dirVector );\n\tvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\t#ifdef DOUBLE_SIDED\n\t\tvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\t\t#ifdef WRAP_AROUND\n\t\t\tvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t#endif\n\t#endif\n\t#ifdef WRAP_AROUND\n\t\tvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\tdirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tdirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\t\t#endif\n\t#endif\n\tvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\t#ifdef DOUBLE_SIDED\n\t\tvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\t#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\n\tfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\t\tfloat lDistance = 1.0;\n\t\tif ( pointLightDistance[ i ] > 0.0 )\n\t\t\tlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\t\tlVector = normalize( lVector );\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\tvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\t\t\t#ifdef WRAP_AROUND\n\t\t\t\tvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t#endif\n\t\t#endif\n\t\t#ifdef WRAP_AROUND\n\t\t\tvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\tpointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\t\t\t#ifdef DOUBLE_SIDED\n\t\t\t\tpointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\t\t\t#endif\n\t\t#endif\n\t\tvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n\t\t#endif\n\t}\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\tfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\t\t\tspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n\t\t\tfloat lDistance = 1.0;\n\t\t\tif ( spotLightDistance[ i ] > 0.0 )\n\t\t\t\tlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\t\t\tlVector = normalize( lVector );\n\t\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\t\tvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\t\t\t#ifdef DOUBLE_SIDED\n\t\t\t\tvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\t\t\t\t#ifdef WRAP_AROUND\n\t\t\t\t\tvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t\t#endif\n\t\t\t#endif\n\t\t\t#ifdef WRAP_AROUND\n\t\t\t\tvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t\tspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\t\t\t\t#ifdef DOUBLE_SIDED\n\t\t\t\t\tspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\t\t\t\t#endif\n\t\t\t#endif\n\t\t\tvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n\t\t\t#ifdef DOUBLE_SIDED\n\t\t\t\tvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n\t\t\t#endif\n\t\t}\n\t}\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\t\tvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n\t\tvec3 lVector = normalize( lDirection.xyz );\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\tfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\t\tvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\t\t#endif\n\t}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\n\tvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
lights_phong_pars_vertex:"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\tvarying vec3 vWorldPosition;\n#endif",lights_phong_vertex:"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\tvWorldPosition = worldPosition.xyz;\n#endif",lights_phong_pars_fragment:"uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\tvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\n\tuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
lights_phong_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\n\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\n\tvec3 pointDiffuse  = vec3( 0.0 );\n\tvec3 pointSpecular = vec3( 0.0 );\n\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\t\tfloat lDistance = 1.0;\n\t\tif ( pointLightDistance[ i ] > 0.0 )\n\t\t\tlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\t\tlVector = normalize( lVector );\n\t\tfloat dotProduct = dot( normal, lVector );\n\t\t#ifdef WRAP_AROUND\n\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\t\t#else\n\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\t\t#endif\n\t\tpointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\tpointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\t}\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\tvec3 spotDiffuse  = vec3( 0.0 );\n\tvec3 spotSpecular = vec3( 0.0 );\n\tfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\t\tfloat lDistance = 1.0;\n\t\tif ( spotLightDistance[ i ] > 0.0 )\n\t\t\tlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\t\tlVector = normalize( lVector );\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\t\t\tspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n\t\t\tfloat dotProduct = dot( normal, lVector );\n\t\t\t#ifdef WRAP_AROUND\n\t\t\t\tfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\tfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t\t\t\tvec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\t\t\t#else\n\t\t\t\tfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n\t\t\t#endif\n\t\t\tspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n\t\t\tvec3 spotHalfVector = normalize( lVector + viewPosition );\n\t\t\tfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n\t\t\tfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\t\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n\t\t\tspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n\t\t}\n\t}\n#endif\n#if MAX_DIR_LIGHTS > 0\n\tvec3 dirDiffuse  = vec3( 0.0 );\n\tvec3 dirSpecular = vec3( 0.0 );\n\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\t\tvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n\t\tvec3 dirVector = normalize( lDirection.xyz );\n\t\tfloat dotProduct = dot( normal, dirVector );\n\t\t#ifdef WRAP_AROUND\n\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\t\t#else\n\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\t\t#endif\n\t\tdirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\tdirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t}\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\tvec3 hemiDiffuse  = vec3( 0.0 );\n\tvec3 hemiSpecular = vec3( 0.0 );\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\t\tvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n\t\tvec3 lVector = normalize( lDirection.xyz );\n\t\tfloat dotProduct = dot( normal, lVector );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\tvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\t\themiDiffuse += diffuse * hemiColor;\n\t\tvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n\t\tfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n\t\tfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\n\t\tvec3 lVectorGround = -lVector;\n\t\tvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n\t\tfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n\t\tfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n\t\tfloat dotProductGround = dot( normal, lVectorGround );\n\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\tvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n\t\tvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n\t\themiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\t}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\n\ttotalDiffuse += dirDiffuse;\n\ttotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\ttotalDiffuse += hemiDiffuse;\n\ttotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\n\ttotalDiffuse += pointDiffuse;\n\ttotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\ttotalDiffuse += spotDiffuse;\n\ttotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\n\tgl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\n\tgl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
color_pars_fragment:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\n\tgl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n\t#ifdef GAMMA_INPUT\n\t\tvColor = color * color;\n\t#else\n\t\tvColor = color;\n\t#endif\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneGlobalMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n\t#ifdef USE_MORPHTARGETS\n\tvec4 skinVertex = vec4( morphed, 1.0 );\n\t#else\n\tvec4 skinVertex = vec4( position, 1.0 );\n\t#endif\n\tvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n\tskinned      += boneMatY * skinVertex * skinWeight.y;\n\tskinned      += boneMatZ * skinVertex * skinWeight.z;\n\tskinned      += boneMatW * skinVertex * skinWeight.w;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\tvec3 morphed = vec3( 0.0 );\n\tmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\tmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\tmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\tmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\tmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\tmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\tmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\tmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n\tmorphed += position;\n#endif",
default_vertex:"vec4 mvPosition;\n#ifdef USE_SKINNING\n\tmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n\tmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n\tmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tvec3 morphedNormal = vec3( 0.0 );\n\tmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\tmorphedNormal += normal;\n#endif",
skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = skinWeight.x * boneMatX;\n\tskinMatrix \t+= skinWeight.y * boneMatY;\n\tskinMatrix \t+= skinWeight.z * boneMatZ;\n\tskinMatrix \t+= skinWeight.w * boneMatW;\n\t#ifdef USE_MORPHNORMALS\n\tvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\t#else\n\tvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\t#endif\n#endif",defaultnormal_vertex:"vec3 objectNormal;\n#ifdef USE_SKINNING\n\tobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n\tobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n\tobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\tuniform sampler2D shadowMap[ MAX_SHADOWS ];\n\tuniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\tuniform float shadowDarkness[ MAX_SHADOWS ];\n\tuniform float shadowBias[ MAX_SHADOWS ];\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\tfloat unpackDepth( const in vec4 rgba_depth ) {\n\t\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\tfloat depth = dot( rgba_depth, bit_shift );\n\t\treturn depth;\n\t}\n#endif",
shadowmap_fragment:"#ifdef USE_SHADOWMAP\n\t#ifdef SHADOWMAP_DEBUG\n\t\tvec3 frustumColors[3];\n\t\tfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n\t\tfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n\t\tfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\t#endif\n\t#ifdef SHADOWMAP_CASCADE\n\t\tint inFrustumCount = 0;\n\t#endif\n\tfloat fDepth;\n\tvec3 shadowColor = vec3( 1.0 );\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\t\tvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\t#ifdef SHADOWMAP_CASCADE\n\t\t\tinFrustumCount += int( inFrustum );\n\t\t\tbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\t\t#else\n\t\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\t#endif\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t\tshadowCoord.z += shadowBias[ i ];\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\t\tfloat shadow = 0.0;\n\t\t\t\tconst float shadowDelta = 1.0 / 9.0;\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\t\t\t\tfloat dx0 = -1.25 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.25 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.25 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.25 * yPixelOffset;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\t\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\t\tfloat shadow = 0.0;\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\t\t\t\tfloat dx0 = -1.0 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.0 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.0 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.0 * yPixelOffset;\n\t\t\t\tmat3 shadowKernel;\n\t\t\t\tmat3 depthKernel;\n\t\t\t\tdepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tdepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tdepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tdepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tdepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tdepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tdepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tdepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tdepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tvec3 shadowZ = vec3( shadowCoord.z );\n\t\t\t\tshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n\t\t\t\tshadowKernel[0] *= vec3(0.25);\n\t\t\t\tshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n\t\t\t\tshadowKernel[1] *= vec3(0.25);\n\t\t\t\tshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n\t\t\t\tshadowKernel[2] *= vec3(0.25);\n\t\t\t\tvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\t\t\t\tshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n\t\t\t\tshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\t\t\t\tvec4 shadowValues;\n\t\t\t\tshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n\t\t\t\tshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n\t\t\t\tshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n\t\t\t\tshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\t\t\t\tshadow = dot( shadowValues, vec4( 1.0 ) );\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\t\t\t#else\n\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\t\t\t\tif ( fDepth < shadowCoord.z )\n\t\t\t\t\tshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\t\t\t#endif\n\t\t}\n\t\t#ifdef SHADOWMAP_DEBUG\n\t\t\t#ifdef SHADOWMAP_CASCADE\n\t\t\t\tif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n\t\t\t#else\n\t\t\t\tif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n\t\t\t#endif\n\t\t#endif\n\t}\n\t#ifdef GAMMA_OUTPUT\n\t\tshadowColor *= shadowColor;\n\t#endif\n\tgl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\tuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\t}\n#endif",alphatest_fragment:"#ifdef ALPHATEST\n\tif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",linear_to_gamma_fragment:"#ifdef GAMMA_OUTPUT\n\tgl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif",logdepthbuf_pars_fragment:"#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\t#extension GL_EXT_frag_depth : enable\n\t\tvarying float vFragDepth;\n\t#endif\n#endif",logdepthbuf_fragment:"#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif"};THREE.UniformsUtils={merge:function(a){var b,c,d,e={};for(b=0;b<a.length;b++)for(c in d=this.clone(a[b]),d)e[c]=d[c];return e},clone:function(a){var b,c,d,e={};for(b in a)for(c in e[b]={},a[b])d=a[b][c],e[b][c]=d instanceof THREE.Color||d instanceof THREE.Vector2||d instanceof THREE.Vector3||d instanceof THREE.Vector4||d instanceof THREE.Matrix4||d instanceof THREE.Texture?d.clone():d instanceof Array?d.slice():d;return e}};THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:null},specularMap:{type:"t",value:null},envMap:{type:"t",value:null},flipEnvMap:{type:"f",value:-1},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},morphTargetInfluences:{type:"f",value:0}},bump:{bumpMap:{type:"t",
value:null},bumpScale:{type:"f",value:1}},normalmap:{normalMap:{type:"t",value:null},normalScale:{type:"v2",value:new THREE.Vector2(1,1)}},fog:{fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},hemisphereLightDirection:{type:"fv",value:[]},hemisphereLightSkyColor:{type:"fv",
value:[]},hemisphereLightGroundColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]},spotLightColor:{type:"fv",value:[]},spotLightPosition:{type:"fv",value:[]},spotLightDirection:{type:"fv",value:[]},spotLightDistance:{type:"fv1",value:[]},spotLightAngleCos:{type:"fv1",value:[]},spotLightExponent:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",
value:1},scale:{type:"f",value:1},map:{type:"t",value:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}};THREE.ShaderLib={basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,
THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinbase_vertex,"\t#ifdef USE_ENVMAP",THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"\t#endif",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {\n\tgl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,
THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},
emissive:{type:"c",value:new THREE.Color(0)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,
THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,
THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,
"void main() {\n\tgl_FragColor = vec4( vec3( 1.0 ), opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,"\t#ifdef DOUBLE_SIDED\n\t\tif ( gl_FrontFacing )\n\t\t\tgl_FragColor.xyz *= vLightFront;\n\t\telse\n\t\t\tgl_FragColor.xyz *= vLightBack;\n\t#else\n\t\tgl_FragColor.xyz *= vLightFront;\n\t#endif",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,
THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",
value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,
THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"\tvNormal = normalize( transformedNormal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"\tvViewPosition = -mvPosition.xyz;",THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,
THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,
THREE.ShaderChunk.bumpmap_pars_fragment,THREE.ShaderChunk.normalmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {\n\tgl_FragColor = vec4( vec3( 1.0 ), opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,
THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;\nuniform float scale;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\tgl_Position = projectionMatrix * mvPosition;",
THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {\n\tgl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_particle_fragment,
THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},dashed:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,{scale:{type:"f",value:1},dashSize:{type:"f",value:1},totalSize:{type:"f",value:2}}]),vertexShader:["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,
"void main() {",THREE.ShaderChunk.color_vertex,"\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,
"void main() {\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tgl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.morphtarget_vertex,
THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float mNear;\nuniform float mFar;\nuniform float opacity;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\tfloat color = 1.0 - smoothstep( mNear, mFar, depth );\n\tgl_FragColor = vec4( vec3( color ), opacity );\n}"].join("\n")},
normal:{uniforms:{opacity:{type:"f",value:1}},vertexShader:["varying vec3 vNormal;",THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {\n\tvNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;\nvarying vec3 vNormal;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {\n\tgl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",
THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},normalmap:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},enableReflection:{type:"i",value:0},enableDisplacement:{type:"i",value:0},tDisplacement:{type:"t",value:null},tDiffuse:{type:"t",value:null},tCube:{type:"t",value:null},tNormal:{type:"t",value:null},tSpecular:{type:"t",value:null},
tAO:{type:"t",value:null},uNormalScale:{type:"v2",value:new THREE.Vector2(1,1)},uDisplacementBias:{type:"f",value:0},uDisplacementScale:{type:"f",value:1},diffuse:{type:"c",value:new THREE.Color(16777215)},specular:{type:"c",value:new THREE.Color(1118481)},ambient:{type:"c",value:new THREE.Color(16777215)},shininess:{type:"f",value:30},opacity:{type:"f",value:1},useRefract:{type:"i",value:0},refractionRatio:{type:"f",value:0.98},reflectivity:{type:"f",value:0.5},uOffset:{type:"v2",value:new THREE.Vector2(0,
0)},uRepeat:{type:"v2",value:new THREE.Vector2(1,1)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),fragmentShader:["uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float refractionRatio;\nuniform float reflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\n\tuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"\tgl_FragColor = vec4( vec3( 1.0 ), opacity );\n\tvec3 specularTex = vec3( 1.0 );\n\tvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\n\tnormalTex.xy *= uNormalScale;\n\tnormalTex = normalize( normalTex );\n\tif( enableDiffuse ) {\n\t\t#ifdef GAMMA_INPUT\n\t\t\tvec4 texelColor = texture2D( tDiffuse, vUv );\n\t\t\ttexelColor.xyz *= texelColor.xyz;\n\t\t\tgl_FragColor = gl_FragColor * texelColor;\n\t\t#else\n\t\t\tgl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n\t\t#endif\n\t}\n\tif( enableAO ) {\n\t\t#ifdef GAMMA_INPUT\n\t\t\tvec4 aoColor = texture2D( tAO, vUv );\n\t\t\taoColor.xyz *= aoColor.xyz;\n\t\t\tgl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n\t\t#else\n\t\t\tgl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n\t\t#endif\n\t}\n\tif( enableSpecular )\n\t\tspecularTex = texture2D( tSpecular, vUv ).xyz;\n\tmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\n\tvec3 finalNormal = tsb * normalTex;\n\t#ifdef FLIP_SIDED\n\t\tfinalNormal = -finalNormal;\n\t#endif\n\tvec3 normal = normalize( finalNormal );\n\tvec3 viewPosition = normalize( vViewPosition );\n\t#if MAX_POINT_LIGHTS > 0\n\t\tvec3 pointDiffuse = vec3( 0.0 );\n\t\tvec3 pointSpecular = vec3( 0.0 );\n\t\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\t\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\t\tvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\n\t\t\tfloat pointDistance = 1.0;\n\t\t\tif ( pointLightDistance[ i ] > 0.0 )\n\t\t\t\tpointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\n\t\t\tpointVector = normalize( pointVector );\n\t\t\t#ifdef WRAP_AROUND\n\t\t\t\tfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\n\t\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\n\t\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\t\t\t#else\n\t\t\t\tfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n\t\t\t#endif\n\t\t\tpointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;\n\t\t\tvec3 pointHalfVector = normalize( pointVector + viewPosition );\n\t\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\t\tfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\t\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\n\t\t\tpointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n\t\t}\n\t#endif\n\t#if MAX_SPOT_LIGHTS > 0\n\t\tvec3 spotDiffuse = vec3( 0.0 );\n\t\tvec3 spotSpecular = vec3( 0.0 );\n\t\tfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\t\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\t\tvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\n\t\t\tfloat spotDistance = 1.0;\n\t\t\tif ( spotLightDistance[ i ] > 0.0 )\n\t\t\t\tspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\n\t\t\tspotVector = normalize( spotVector );\n\t\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\t\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\t\t\t\tspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n\t\t\t\t#ifdef WRAP_AROUND\n\t\t\t\t\tfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\n\t\t\t\t\tfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\n\t\t\t\t\tvec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\t\t\t\t#else\n\t\t\t\t\tfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n\t\t\t\t#endif\n\t\t\t\tspotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;\n\t\t\t\tvec3 spotHalfVector = normalize( spotVector + viewPosition );\n\t\t\t\tfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n\t\t\t\tfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\t\t\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\n\t\t\t\tspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n\t\t\t}\n\t\t}\n\t#endif\n\t#if MAX_DIR_LIGHTS > 0\n\t\tvec3 dirDiffuse = vec3( 0.0 );\n\t\tvec3 dirSpecular = vec3( 0.0 );\n\t\tfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\n\t\t\tvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n\t\t\tvec3 dirVector = normalize( lDirection.xyz );\n\t\t\t#ifdef WRAP_AROUND\n\t\t\t\tfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\n\t\t\t\tfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\n\t\t\t\tvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n\t\t\t#else\n\t\t\t\tfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n\t\t\t#endif\n\t\t\tdirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;\n\t\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\t\tfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\t\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\n\t\t\tdirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t\t}\n\t#endif\n\t#if MAX_HEMI_LIGHTS > 0\n\t\tvec3 hemiDiffuse  = vec3( 0.0 );\n\t\tvec3 hemiSpecular = vec3( 0.0 );\n\t\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\t\t\tvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n\t\t\tvec3 lVector = normalize( lDirection.xyz );\n\t\t\tfloat dotProduct = dot( normal, lVector );\n\t\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\t\tvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\t\t\themiDiffuse += diffuse * hemiColor;\n\t\t\tvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n\t\t\tfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n\t\t\tfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\n\t\t\tvec3 lVectorGround = -lVector;\n\t\t\tvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n\t\t\tfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n\t\t\tfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n\t\t\tfloat dotProductGround = dot( normal, lVectorGround );\n\t\t\tfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\n\t\t\tvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\n\t\t\tvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\n\t\t\themiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\t\t}\n\t#endif\n\tvec3 totalDiffuse = vec3( 0.0 );\n\tvec3 totalSpecular = vec3( 0.0 );\n\t#if MAX_DIR_LIGHTS > 0\n\t\ttotalDiffuse += dirDiffuse;\n\t\ttotalSpecular += dirSpecular;\n\t#endif\n\t#if MAX_HEMI_LIGHTS > 0\n\t\ttotalDiffuse += hemiDiffuse;\n\t\ttotalSpecular += hemiSpecular;\n\t#endif\n\t#if MAX_POINT_LIGHTS > 0\n\t\ttotalDiffuse += pointDiffuse;\n\t\ttotalSpecular += pointSpecular;\n\t#endif\n\t#if MAX_SPOT_LIGHTS > 0\n\t\ttotalDiffuse += spotDiffuse;\n\t\ttotalSpecular += spotSpecular;\n\t#endif\n\t#ifdef METAL\n\t\tgl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );\n\t#else\n\t\tgl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\t#endif\n\tif ( enableReflection ) {\n\t\tvec3 vReflect;\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tif ( useRefract ) {\n\t\t\tvReflect = refract( cameraToVertex, normal, refractionRatio );\n\t\t} else {\n\t\t\tvReflect = reflect( cameraToVertex, normal );\n\t\t}\n\t\tvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n\t\t#ifdef GAMMA_INPUT\n\t\t\tcubeColor.xyz *= cubeColor.xyz;\n\t\t#endif\n\t\tgl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );\n\t}",
THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\n\tuniform sampler2D tDisplacement;\n\tuniform float uDisplacementScale;\n\tuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,"\t#ifdef USE_SKINNING\n\t\tvNormal = normalize( normalMatrix * skinnedNormal.xyz );\n\t\tvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\n\t\tvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n\t#else\n\t\tvNormal = normalize( normalMatrix * normal );\n\t\tvTangent = normalize( normalMatrix * tangent.xyz );\n\t#endif\n\tvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\n\tvUv = uv * uRepeat + uOffset;\n\tvec3 displacedPosition;\n\t#ifdef VERTEX_TEXTURES\n\t\tif ( enableDisplacement ) {\n\t\t\tvec3 dv = texture2D( tDisplacement, uv ).xyz;\n\t\t\tfloat df = uDisplacementScale * dv.x + uDisplacementBias;\n\t\t\tdisplacedPosition = position + normalize( normal ) * df;\n\t\t} else {\n\t\t\t#ifdef USE_SKINNING\n\t\t\t\tvec4 skinVertex = vec4( position, 1.0 );\n\t\t\t\tvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n\t\t\t\tskinned \t  += boneMatY * skinVertex * skinWeight.y;\n\t\t\t\tskinned \t  += boneMatZ * skinVertex * skinWeight.z;\n\t\t\t\tskinned \t  += boneMatW * skinVertex * skinWeight.w;\n\t\t\t\tdisplacedPosition  = skinned.xyz;\n\t\t\t#else\n\t\t\t\tdisplacedPosition = position;\n\t\t\t#endif\n\t\t}\n\t#else\n\t\t#ifdef USE_SKINNING\n\t\t\tvec4 skinVertex = vec4( position, 1.0 );\n\t\t\tvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n\t\t\tskinned \t  += boneMatY * skinVertex * skinWeight.y;\n\t\t\tskinned \t  += boneMatZ * skinVertex * skinWeight.z;\n\t\t\tskinned \t  += boneMatW * skinVertex * skinWeight.w;\n\t\t\tdisplacedPosition  = skinned.xyz;\n\t\t#else\n\t\t\tdisplacedPosition = position;\n\t\t#endif\n\t#endif\n\tvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\n\tvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;",
THREE.ShaderChunk.logdepthbuf_vertex,"\tvWorldPosition = worldPosition.xyz;\n\tvViewPosition = -mvPosition.xyz;\n\t#ifdef USE_SHADOWMAP\n\t\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\t\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\t\t}\n\t#endif\n}"].join("\n")},cube:{uniforms:{tCube:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {\n\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\tvWorldPosition = worldPosition.xyz;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,
"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:[THREE.ShaderChunk.logdepthbuf_pars_fragment,"vec4 pack_depth( const in float depth ) {\n\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n\tconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n\tvec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );\n\tres -= res.xxyz * bit_mask;\n\treturn res;\n}\nvoid main() {",
THREE.ShaderChunk.logdepthbuf_fragment,"\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n\t#else\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n\t#endif\n}"].join("\n")}};THREE.WebGLRenderer=function(a){function b(a,b){var c=a.vertices.length,d=b.material;if(d.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var e in d.attributes){var f=d.attributes[e];if(!f.__webglInitialized||f.createUniqueBuffers){f.__webglInitialized=!0;var g=1;"v2"===f.type?g=2:"v3"===f.type?g=3:"v4"===f.type?g=4:"c"===f.type&&(g=3);f.size=g;f.array=new Float32Array(c*g);f.buffer=m.createBuffer();f.buffer.belongsToAttribute=e;f.needsUpdate=!0}a.__webglCustomAttributesList.push(f)}}}
function c(a,b){var c=b.geometry,g=a.faces3,h=3*g.length,k=1*g.length,l=3*g.length,g=d(b,a),n=f(g),p=e(g),q=g.vertexColors?g.vertexColors:!1;a.__vertexArray=new Float32Array(3*h);p&&(a.__normalArray=new Float32Array(3*h));c.hasTangents&&(a.__tangentArray=new Float32Array(4*h));q&&(a.__colorArray=new Float32Array(3*h));n&&(0<c.faceVertexUvs.length&&(a.__uvArray=new Float32Array(2*h)),1<c.faceVertexUvs.length&&(a.__uv2Array=new Float32Array(2*h)));b.geometry.skinWeights.length&&b.geometry.skinIndices.length&&
(a.__skinIndexArray=new Float32Array(4*h),a.__skinWeightArray=new Float32Array(4*h));c=null!==pb&&21845<k?Uint32Array:Uint16Array;a.__typeArray=c;a.__faceArray=new c(3*k);a.__lineArray=new c(2*l);if(a.numMorphTargets)for(a.__morphTargetsArrays=[],c=0,n=a.numMorphTargets;c<n;c++)a.__morphTargetsArrays.push(new Float32Array(3*h));if(a.numMorphNormals)for(a.__morphNormalsArrays=[],c=0,n=a.numMorphNormals;c<n;c++)a.__morphNormalsArrays.push(new Float32Array(3*h));a.__webglFaceCount=3*k;a.__webglLineCount=
2*l;if(g.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var r in g.attributes){var k=g.attributes[r],l={},s;for(s in k)l[s]=k[s];if(!l.__webglInitialized||l.createUniqueBuffers)l.__webglInitialized=!0,c=1,"v2"===l.type?c=2:"v3"===l.type?c=3:"v4"===l.type?c=4:"c"===l.type&&(c=3),l.size=c,l.array=new Float32Array(h*c),l.buffer=m.createBuffer(),l.buffer.belongsToAttribute=r,k.needsUpdate=!0,l.__original=k;a.__webglCustomAttributesList.push(l)}}a.__inittedArrays=
!0}function d(a,b){return a.material instanceof THREE.MeshFaceMaterial?a.material.materials[b.materialIndex]:a.material}function e(a){return a instanceof THREE.MeshBasicMaterial&&!a.envMap||a instanceof THREE.MeshDepthMaterial?!1:a&&void 0!==a.shading&&a.shading===THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading}function f(a){return a.map||a.lightMap||a.bumpMap||a.normalMap||a.specularMap||a instanceof THREE.ShaderMaterial?!0:!1}function g(a,b,c,d){for(var e in b){var f=b[e],g=c[e];if(0<=
f)if(g){var h=g.itemSize;m.bindBuffer(m.ARRAY_BUFFER,g.buffer);k(f);m.vertexAttribPointer(f,h,m.FLOAT,!1,0,d*h*4)}else a.defaultAttributeValues&&(2===a.defaultAttributeValues[e].length?m.vertexAttrib2fv(f,a.defaultAttributeValues[e]):3===a.defaultAttributeValues[e].length&&m.vertexAttrib3fv(f,a.defaultAttributeValues[e]))}l()}function h(){for(var a=0,b=Ka.length;a<b;a++)Ka[a]=0}function k(a){Ka[a]=1;0===ob[a]&&(m.enableVertexAttribArray(a),ob[a]=1)}function l(){for(var a=0,b=ob.length;a<b;a++)ob[a]!==
Ka[a]&&(m.disableVertexAttribArray(a),ob[a]=0)}function n(a,b){return a.z!==b.z?b.z-a.z:a.id-b.id}function q(a,b){return b[0]-a[0]}function p(a,b,c){if(a.length)for(var d=0,e=a.length;d<e;d++)Ia=wa=null,fa=za=ha=Ga=ma=ia=Oa=-1,cb=!0,a[d].render(b,c,ja,ra),Ia=wa=null,fa=za=ha=Ga=ma=ia=Oa=-1,cb=!0}function s(a,b,c,d,e,f,g,h){var k,m,l,n;b?(m=a.length-1,n=b=-1):(m=0,b=a.length,n=1);for(var p=m;p!==b;p+=n)if(k=a[p],k.render){m=k.object;l=k.buffer;if(h)k=h;else{k=k[c];if(!k)continue;g&&P.setBlending(k.blending,
k.blendEquation,k.blendSrc,k.blendDst);P.setDepthTest(k.depthTest);P.setDepthWrite(k.depthWrite);G(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits)}P.setMaterialFaces(k);l instanceof THREE.BufferGeometry?P.renderBufferDirect(d,e,f,k,l,m):P.renderBuffer(d,e,f,k,l,m)}}function t(a,b,c,d,e,f,g){for(var h,k,m=0,l=a.length;m<l;m++)if(h=a[m],k=h.object,k.visible){if(g)h=g;else{h=h[b];if(!h)continue;f&&P.setBlending(h.blending,h.blendEquation,h.blendSrc,h.blendDst);P.setDepthTest(h.depthTest);
P.setDepthWrite(h.depthWrite);G(h.polygonOffset,h.polygonOffsetFactor,h.polygonOffsetUnits)}P.renderImmediateObject(c,d,e,h,k)}}function r(a,d){var e,f,g;if(void 0===a.__webglInit&&(a.__webglInit=!0,a._modelViewMatrix=new THREE.Matrix4,a._normalMatrix=new THREE.Matrix3,f=a.geometry,void 0!==f&&void 0===f.__webglInit))if(f.__webglInit=!0,f.addEventListener("dispose",Eb),f instanceof THREE.BufferGeometry)for(g in f.attributes){var h="index"===g?m.ELEMENT_ARRAY_BUFFER:m.ARRAY_BUFFER,k=f.attributes[g];
k.buffer=m.createBuffer();m.bindBuffer(h,k.buffer);m.bufferData(h,k.array,m.STATIC_DRAW)}else if(a instanceof THREE.Mesh)for(e in g=a.material,void 0===f.geometryGroups&&f.makeGroups(g instanceof THREE.MeshFaceMaterial,pb?4294967296:65535),f.geometryGroups){if(g=f.geometryGroups[e],!g.__webglVertexBuffer){h=g;h.__webglVertexBuffer=m.createBuffer();h.__webglNormalBuffer=m.createBuffer();h.__webglTangentBuffer=m.createBuffer();h.__webglColorBuffer=m.createBuffer();h.__webglUVBuffer=m.createBuffer();
h.__webglUV2Buffer=m.createBuffer();h.__webglSkinIndicesBuffer=m.createBuffer();h.__webglSkinWeightsBuffer=m.createBuffer();h.__webglFaceBuffer=m.createBuffer();h.__webglLineBuffer=m.createBuffer();var l=k=void 0;if(h.numMorphTargets)for(h.__webglMorphTargetsBuffers=[],k=0,l=h.numMorphTargets;k<l;k++)h.__webglMorphTargetsBuffers.push(m.createBuffer());if(h.numMorphNormals)for(h.__webglMorphNormalsBuffers=[],k=0,l=h.numMorphNormals;k<l;k++)h.__webglMorphNormalsBuffers.push(m.createBuffer());P.info.memory.geometries++;
c(g,a);f.verticesNeedUpdate=!0;f.morphTargetsNeedUpdate=!0;f.elementsNeedUpdate=!0;f.uvsNeedUpdate=!0;f.normalsNeedUpdate=!0;f.tangentsNeedUpdate=!0;f.colorsNeedUpdate=!0}}else a instanceof THREE.Line?f.__webglVertexBuffer||(g=f,g.__webglVertexBuffer=m.createBuffer(),g.__webglColorBuffer=m.createBuffer(),g.__webglLineDistanceBuffer=m.createBuffer(),P.info.memory.geometries++,g=f,h=g.vertices.length,g.__vertexArray=new Float32Array(3*h),g.__colorArray=new Float32Array(3*h),g.__lineDistanceArray=new Float32Array(1*
h),g.__webglLineCount=h,b(g,a),f.verticesNeedUpdate=!0,f.colorsNeedUpdate=!0,f.lineDistancesNeedUpdate=!0):a instanceof THREE.ParticleSystem&&!f.__webglVertexBuffer&&(g=f,g.__webglVertexBuffer=m.createBuffer(),g.__webglColorBuffer=m.createBuffer(),P.info.memory.geometries++,g=f,h=g.vertices.length,g.__vertexArray=new Float32Array(3*h),g.__colorArray=new Float32Array(3*h),g.__sortArray=[],g.__webglParticleCount=h,b(g,a),f.verticesNeedUpdate=!0,f.colorsNeedUpdate=!0);if(void 0===a.__webglActive){if(a instanceof
THREE.Mesh)if(f=a.geometry,f instanceof THREE.BufferGeometry)v(d.__webglObjects,f,a);else{if(f instanceof THREE.Geometry)for(e in f.geometryGroups)g=f.geometryGroups[e],v(d.__webglObjects,g,a)}else a instanceof THREE.Line||a instanceof THREE.ParticleSystem?(f=a.geometry,v(d.__webglObjects,f,a)):a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback?d.__webglObjectsImmediate.push({id:null,object:a,opaque:null,transparent:null,z:0}):a instanceof THREE.Sprite?d.__webglSprites.push(a):a instanceof
THREE.LensFlare&&d.__webglFlares.push(a);a.__webglActive=!0}}function v(a,b,c){a.push({id:null,buffer:b,object:c,opaque:null,transparent:null,z:0})}function w(a){for(var b in a.attributes)if(a.attributes[b].needsUpdate)return!0;return!1}function u(a){for(var b in a.attributes)a.attributes[b].needsUpdate=!1}function y(a,b){a instanceof THREE.Mesh||a instanceof THREE.ParticleSystem||a instanceof THREE.Line?L(b.__webglObjects,a):a instanceof THREE.Sprite?x(b.__webglSprites,a):a instanceof THREE.LensFlare?
x(b.__webglFlares,a):(a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback)&&L(b.__webglObjectsImmediate,a);delete a.__webglActive}function L(a,b){for(var c=a.length-1;0<=c;c--)a[c].object===b&&a.splice(c,1)}function x(a,b){for(var c=a.length-1;0<=c;c--)a[c]===b&&a.splice(c,1)}function N(a,b,c,d,e){Ea=0;d.needsUpdate&&(d.program&&Fb(d),P.initMaterial(d,b,c,e),d.needsUpdate=!1);d.morphTargets&&!e.__webglMorphTargetInfluences&&(e.__webglMorphTargetInfluences=new Float32Array(P.maxMorphTargets));
var f=!1,g=d.program,h=g.uniforms,k=d.uniforms;g.id!==wa&&(m.useProgram(g.program),wa=g.id,f=!0);d.id!==fa&&(fa=d.id,f=!0);if(f||a!==Ia)m.uniformMatrix4fv(h.projectionMatrix,!1,a.projectionMatrix.elements),da&&m.uniform1f(h.logDepthBufFC,2/(Math.log(a.far+1)/Math.LN2)),a!==Ia&&(Ia=a);if(d.skinning)if(Gb&&e.skeleton.useVertexTexture){if(null!==h.boneTexture){var l=J();m.uniform1i(h.boneTexture,l);P.setTexture(e.skeleton.boneTexture,l)}null!==h.boneTextureWidth&&m.uniform1i(h.boneTextureWidth,e.skeleton.boneTextureWidth);
null!==h.boneTextureHeight&&m.uniform1i(h.boneTextureHeight,e.skeleton.boneTextureHeight)}else null!==h.boneGlobalMatrices&&m.uniformMatrix4fv(h.boneGlobalMatrices,!1,e.skeleton.boneMatrices);if(f){c&&d.fog&&(k.fogColor.value=c.color,c instanceof THREE.Fog?(k.fogNear.value=c.near,k.fogFar.value=c.far):c instanceof THREE.FogExp2&&(k.fogDensity.value=c.density));if(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d.lights){if(cb){var n,p=l=0,q=0,r,s,t,u=Bb,w=u.directional.colors,
v=u.directional.positions,y=u.point.colors,A=u.point.positions,L=u.point.distances,x=u.spot.colors,G=u.spot.positions,C=u.spot.distances,E=u.spot.directions,N=u.spot.anglesCos,F=u.spot.exponents,Q=u.hemi.skyColors,I=u.hemi.groundColors,U=u.hemi.positions,Y=0,ga=0,R=0,X=0,$=0,aa=0,ba=0,Z=0,W=n=0;c=t=W=0;for(f=b.length;c<f;c++)if(n=b[c],!n.onlyShadow)if(r=n.color,s=n.intensity,t=n.distance,n instanceof THREE.AmbientLight)n.visible&&(P.gammaInput?(l+=r.r*r.r,p+=r.g*r.g,q+=r.b*r.b):(l+=r.r,p+=r.g,q+=
r.b));else if(n instanceof THREE.DirectionalLight){if($+=1,n.visible&&(oa.setFromMatrixPosition(n.matrixWorld),xa.setFromMatrixPosition(n.target.matrixWorld),oa.sub(xa),oa.normalize(),0!==oa.x||0!==oa.y||0!==oa.z))n=3*Y,v[n]=oa.x,v[n+1]=oa.y,v[n+2]=oa.z,P.gammaInput?B(w,n,r,s*s):K(w,n,r,s),Y+=1}else n instanceof THREE.PointLight?(aa+=1,n.visible&&(W=3*ga,P.gammaInput?B(y,W,r,s*s):K(y,W,r,s),xa.setFromMatrixPosition(n.matrixWorld),A[W]=xa.x,A[W+1]=xa.y,A[W+2]=xa.z,L[ga]=t,ga+=1)):n instanceof THREE.SpotLight?
(ba+=1,n.visible&&(W=3*R,P.gammaInput?B(x,W,r,s*s):K(x,W,r,s),xa.setFromMatrixPosition(n.matrixWorld),G[W]=xa.x,G[W+1]=xa.y,G[W+2]=xa.z,C[R]=t,oa.copy(xa),xa.setFromMatrixPosition(n.target.matrixWorld),oa.sub(xa),oa.normalize(),E[W]=oa.x,E[W+1]=oa.y,E[W+2]=oa.z,N[R]=Math.cos(n.angle),F[R]=n.exponent,R+=1)):n instanceof THREE.HemisphereLight&&(Z+=1,n.visible&&(oa.setFromMatrixPosition(n.matrixWorld),oa.normalize(),0!==oa.x||0!==oa.y||0!==oa.z))&&(t=3*X,U[t]=oa.x,U[t+1]=oa.y,U[t+2]=oa.z,r=n.color,n=
n.groundColor,P.gammaInput?(s*=s,B(Q,t,r,s),B(I,t,n,s)):(K(Q,t,r,s),K(I,t,n,s)),X+=1);c=3*Y;for(f=Math.max(w.length,3*$);c<f;c++)w[c]=0;c=3*ga;for(f=Math.max(y.length,3*aa);c<f;c++)y[c]=0;c=3*R;for(f=Math.max(x.length,3*ba);c<f;c++)x[c]=0;c=3*X;for(f=Math.max(Q.length,3*Z);c<f;c++)Q[c]=0;c=3*X;for(f=Math.max(I.length,3*Z);c<f;c++)I[c]=0;u.directional.length=Y;u.point.length=ga;u.spot.length=R;u.hemi.length=X;u.ambient[0]=l;u.ambient[1]=p;u.ambient[2]=q;cb=!1}c=Bb;k.ambientLightColor.value=c.ambient;
k.directionalLightColor.value=c.directional.colors;k.directionalLightDirection.value=c.directional.positions;k.pointLightColor.value=c.point.colors;k.pointLightPosition.value=c.point.positions;k.pointLightDistance.value=c.point.distances;k.spotLightColor.value=c.spot.colors;k.spotLightPosition.value=c.spot.positions;k.spotLightDistance.value=c.spot.distances;k.spotLightDirection.value=c.spot.directions;k.spotLightAngleCos.value=c.spot.anglesCos;k.spotLightExponent.value=c.spot.exponents;k.hemisphereLightSkyColor.value=
c.hemi.skyColors;k.hemisphereLightGroundColor.value=c.hemi.groundColors;k.hemisphereLightDirection.value=c.hemi.positions}if(d instanceof THREE.MeshBasicMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.MeshPhongMaterial){k.opacity.value=d.opacity;P.gammaInput?k.diffuse.value.copyGammaToLinear(d.color):k.diffuse.value=d.color;k.map.value=d.map;k.lightMap.value=d.lightMap;k.specularMap.value=d.specularMap;d.bumpMap&&(k.bumpMap.value=d.bumpMap,k.bumpScale.value=d.bumpScale);d.normalMap&&
(k.normalMap.value=d.normalMap,k.normalScale.value.copy(d.normalScale));var V;d.map?V=d.map:d.specularMap?V=d.specularMap:d.normalMap?V=d.normalMap:d.bumpMap&&(V=d.bumpMap);void 0!==V&&(c=V.offset,V=V.repeat,k.offsetRepeat.value.set(c.x,c.y,V.x,V.y));k.envMap.value=d.envMap;k.flipEnvMap.value=d.envMap instanceof THREE.WebGLRenderTargetCube?1:-1;k.reflectivity.value=d.reflectivity;k.refractionRatio.value=d.refractionRatio;k.combine.value=d.combine;k.useRefract.value=d.envMap&&d.envMap.mapping instanceof
THREE.CubeRefractionMapping}d instanceof THREE.LineBasicMaterial?(k.diffuse.value=d.color,k.opacity.value=d.opacity):d instanceof THREE.LineDashedMaterial?(k.diffuse.value=d.color,k.opacity.value=d.opacity,k.dashSize.value=d.dashSize,k.totalSize.value=d.dashSize+d.gapSize,k.scale.value=d.scale):d instanceof THREE.ParticleSystemMaterial?(k.psColor.value=d.color,k.opacity.value=d.opacity,k.size.value=d.size,k.scale.value=H.height/2,k.map.value=d.map):d instanceof THREE.MeshPhongMaterial?(k.shininess.value=
d.shininess,P.gammaInput?(k.ambient.value.copyGammaToLinear(d.ambient),k.emissive.value.copyGammaToLinear(d.emissive),k.specular.value.copyGammaToLinear(d.specular)):(k.ambient.value=d.ambient,k.emissive.value=d.emissive,k.specular.value=d.specular),d.wrapAround&&k.wrapRGB.value.copy(d.wrapRGB)):d instanceof THREE.MeshLambertMaterial?(P.gammaInput?(k.ambient.value.copyGammaToLinear(d.ambient),k.emissive.value.copyGammaToLinear(d.emissive)):(k.ambient.value=d.ambient,k.emissive.value=d.emissive),d.wrapAround&&
k.wrapRGB.value.copy(d.wrapRGB)):d instanceof THREE.MeshDepthMaterial?(k.mNear.value=a.near,k.mFar.value=a.far,k.opacity.value=d.opacity):d instanceof THREE.MeshNormalMaterial&&(k.opacity.value=d.opacity);if(e.receiveShadow&&!d._shadowPass&&k.shadowMatrix)for(c=V=0,f=b.length;c<f;c++)l=b[c],l.castShadow&&(l instanceof THREE.SpotLight||l instanceof THREE.DirectionalLight&&!l.shadowCascade)&&(k.shadowMap.value[V]=l.shadowMap,k.shadowMapSize.value[V]=l.shadowMapSize,k.shadowMatrix.value[V]=l.shadowMatrix,
k.shadowDarkness.value[V]=l.shadowDarkness,k.shadowBias.value[V]=l.shadowBias,V++);b=d.uniformsList;k=0;for(V=b.length;k<V;k++)if(f=g.uniforms[b[k][1]])if(c=b[k][0],p=c.type,l=c.value,"i"===p)m.uniform1i(f,l);else if("f"===p)m.uniform1f(f,l);else if("v2"===p)m.uniform2f(f,l.x,l.y);else if("v3"===p)m.uniform3f(f,l.x,l.y,l.z);else if("v4"===p)m.uniform4f(f,l.x,l.y,l.z,l.w);else if("c"===p)m.uniform3f(f,l.r,l.g,l.b);else if("iv1"===p)m.uniform1iv(f,l);else if("iv"===p)m.uniform3iv(f,l);else if("fv1"===
p)m.uniform1fv(f,l);else if("fv"===p)m.uniform3fv(f,l);else if("v2v"===p){void 0===c._array&&(c._array=new Float32Array(2*l.length));p=0;for(q=l.length;p<q;p++)u=2*p,c._array[u]=l[p].x,c._array[u+1]=l[p].y;m.uniform2fv(f,c._array)}else if("v3v"===p){void 0===c._array&&(c._array=new Float32Array(3*l.length));p=0;for(q=l.length;p<q;p++)u=3*p,c._array[u]=l[p].x,c._array[u+1]=l[p].y,c._array[u+2]=l[p].z;m.uniform3fv(f,c._array)}else if("v4v"===p){void 0===c._array&&(c._array=new Float32Array(4*l.length));
p=0;for(q=l.length;p<q;p++)u=4*p,c._array[u]=l[p].x,c._array[u+1]=l[p].y,c._array[u+2]=l[p].z,c._array[u+3]=l[p].w;m.uniform4fv(f,c._array)}else if("m3"===p)m.uniformMatrix3fv(f,!1,l.elements);else if("m3v"===p){void 0===c._array&&(c._array=new Float32Array(9*l.length));p=0;for(q=l.length;p<q;p++)l[p].flattenToArrayOffset(c._array,9*p);m.uniformMatrix3fv(f,!1,c._array)}else if("m4"===p)m.uniformMatrix4fv(f,!1,l.elements);else if("m4v"===p){void 0===c._array&&(c._array=new Float32Array(16*l.length));
p=0;for(q=l.length;p<q;p++)l[p].flattenToArrayOffset(c._array,16*p);m.uniformMatrix4fv(f,!1,c._array)}else if("t"===p){if(u=l,l=J(),m.uniform1i(f,l),u)if(u.image instanceof Array&&6===u.image.length){if(c=u,f=l,6===c.image.length)if(c.needsUpdate){c.image.__webglTextureCube||(c.addEventListener("dispose",Hb),c.image.__webglTextureCube=m.createTexture(),P.info.memory.textures++);m.activeTexture(m.TEXTURE0+f);m.bindTexture(m.TEXTURE_CUBE_MAP,c.image.__webglTextureCube);m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,
c.flipY);f=c instanceof THREE.CompressedTexture;l=[];for(p=0;6>p;p++)P.autoScaleCubemaps&&!f?(q=l,u=p,w=c.image[p],y=dc,w.width<=y&&w.height<=y||(A=Math.max(w.width,w.height),v=Math.floor(w.width*y/A),y=Math.floor(w.height*y/A),A=document.createElement("canvas"),A.width=v,A.height=y,A.getContext("2d").drawImage(w,0,0,w.width,w.height,0,0,v,y),w=A),q[u]=w):l[p]=c.image[p];p=l[0];q=THREE.Math.isPowerOfTwo(p.width)&&THREE.Math.isPowerOfTwo(p.height);u=z(c.format);w=z(c.type);D(m.TEXTURE_CUBE_MAP,c,q);
for(p=0;6>p;p++)if(f)for(y=l[p].mipmaps,A=0,L=y.length;A<L;A++)v=y[A],c.format!==THREE.RGBAFormat?m.compressedTexImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X+p,A,u,v.width,v.height,0,v.data):m.texImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X+p,A,u,v.width,v.height,0,u,w,v.data);else m.texImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X+p,0,u,u,w,l[p]);c.generateMipmaps&&q&&m.generateMipmap(m.TEXTURE_CUBE_MAP);c.needsUpdate=!1;if(c.onUpdate)c.onUpdate()}else m.activeTexture(m.TEXTURE0+f),m.bindTexture(m.TEXTURE_CUBE_MAP,c.image.__webglTextureCube)}else u instanceof
THREE.WebGLRenderTargetCube?(c=u,m.activeTexture(m.TEXTURE0+l),m.bindTexture(m.TEXTURE_CUBE_MAP,c.__webglTexture)):P.setTexture(u,l)}else if("tv"===p){void 0===c._array&&(c._array=[]);p=0;for(q=c.value.length;p<q;p++)c._array[p]=J();m.uniform1iv(f,c._array);p=0;for(q=c.value.length;p<q;p++)u=c.value[p],l=c._array[p],u&&P.setTexture(u,l)}else console.warn("THREE.WebGLRenderer: Unknown uniform type: "+p);(d instanceof THREE.ShaderMaterial||d instanceof THREE.MeshPhongMaterial||d.envMap)&&null!==h.cameraPosition&&
(xa.setFromMatrixPosition(a.matrixWorld),m.uniform3f(h.cameraPosition,xa.x,xa.y,xa.z));(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.ShaderMaterial||d.skinning)&&null!==h.viewMatrix&&m.uniformMatrix4fv(h.viewMatrix,!1,a.matrixWorldInverse.elements)}m.uniformMatrix4fv(h.modelViewMatrix,!1,e._modelViewMatrix.elements);h.normalMatrix&&m.uniformMatrix3fv(h.normalMatrix,!1,e._normalMatrix.elements);null!==h.modelMatrix&&m.uniformMatrix4fv(h.modelMatrix,
!1,e.matrixWorld.elements);return g}function J(){var a=Ea;a>=Cb&&console.warn("WebGLRenderer: trying to use "+a+" texture units while this GPU supports only "+Cb);Ea+=1;return a}function B(a,b,c,d){a[b]=c.r*c.r*d;a[b+1]=c.g*c.g*d;a[b+2]=c.b*c.b*d}function K(a,b,c,d){a[b]=c.r*d;a[b+1]=c.g*d;a[b+2]=c.b*d}function A(a){a!==ua&&(m.lineWidth(a),ua=a)}function G(a,b,c){ya!==a&&(a?m.enable(m.POLYGON_OFFSET_FILL):m.disable(m.POLYGON_OFFSET_FILL),ya=a);!a||Z===b&&qa===c||(m.polygonOffset(b,c),Z=b,qa=c)}function D(a,
b,c){c?(m.texParameteri(a,m.TEXTURE_WRAP_S,z(b.wrapS)),m.texParameteri(a,m.TEXTURE_WRAP_T,z(b.wrapT)),m.texParameteri(a,m.TEXTURE_MAG_FILTER,z(b.magFilter)),m.texParameteri(a,m.TEXTURE_MIN_FILTER,z(b.minFilter))):(m.texParameteri(a,m.TEXTURE_WRAP_S,m.CLAMP_TO_EDGE),m.texParameteri(a,m.TEXTURE_WRAP_T,m.CLAMP_TO_EDGE),m.texParameteri(a,m.TEXTURE_MAG_FILTER,F(b.magFilter)),m.texParameteri(a,m.TEXTURE_MIN_FILTER,F(b.minFilter)));db&&b.type!==THREE.FloatType&&(1<b.anisotropy||b.__oldAnisotropy)&&(m.texParameterf(a,
db.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,Ib)),b.__oldAnisotropy=b.anisotropy)}function C(a,b){m.bindRenderbuffer(m.RENDERBUFFER,a);b.depthBuffer&&!b.stencilBuffer?(m.renderbufferStorage(m.RENDERBUFFER,m.DEPTH_COMPONENT16,b.width,b.height),m.framebufferRenderbuffer(m.FRAMEBUFFER,m.DEPTH_ATTACHMENT,m.RENDERBUFFER,a)):b.depthBuffer&&b.stencilBuffer?(m.renderbufferStorage(m.RENDERBUFFER,m.DEPTH_STENCIL,b.width,b.height),m.framebufferRenderbuffer(m.FRAMEBUFFER,m.DEPTH_STENCIL_ATTACHMENT,m.RENDERBUFFER,
a)):m.renderbufferStorage(m.RENDERBUFFER,m.RGBA4,b.width,b.height)}function F(a){return a===THREE.NearestFilter||a===THREE.NearestMipMapNearestFilter||a===THREE.NearestMipMapLinearFilter?m.NEAREST:m.LINEAR}function z(a){if(a===THREE.RepeatWrapping)return m.REPEAT;if(a===THREE.ClampToEdgeWrapping)return m.CLAMP_TO_EDGE;if(a===THREE.MirroredRepeatWrapping)return m.MIRRORED_REPEAT;if(a===THREE.NearestFilter)return m.NEAREST;if(a===THREE.NearestMipMapNearestFilter)return m.NEAREST_MIPMAP_NEAREST;if(a===
THREE.NearestMipMapLinearFilter)return m.NEAREST_MIPMAP_LINEAR;if(a===THREE.LinearFilter)return m.LINEAR;if(a===THREE.LinearMipMapNearestFilter)return m.LINEAR_MIPMAP_NEAREST;if(a===THREE.LinearMipMapLinearFilter)return m.LINEAR_MIPMAP_LINEAR;if(a===THREE.UnsignedByteType)return m.UNSIGNED_BYTE;if(a===THREE.UnsignedShort4444Type)return m.UNSIGNED_SHORT_4_4_4_4;if(a===THREE.UnsignedShort5551Type)return m.UNSIGNED_SHORT_5_5_5_1;if(a===THREE.UnsignedShort565Type)return m.UNSIGNED_SHORT_5_6_5;if(a===
THREE.ByteType)return m.BYTE;if(a===THREE.ShortType)return m.SHORT;if(a===THREE.UnsignedShortType)return m.UNSIGNED_SHORT;if(a===THREE.IntType)return m.INT;if(a===THREE.UnsignedIntType)return m.UNSIGNED_INT;if(a===THREE.FloatType)return m.FLOAT;if(a===THREE.AlphaFormat)return m.ALPHA;if(a===THREE.RGBFormat)return m.RGB;if(a===THREE.RGBAFormat)return m.RGBA;if(a===THREE.LuminanceFormat)return m.LUMINANCE;if(a===THREE.LuminanceAlphaFormat)return m.LUMINANCE_ALPHA;if(a===THREE.AddEquation)return m.FUNC_ADD;
if(a===THREE.SubtractEquation)return m.FUNC_SUBTRACT;if(a===THREE.ReverseSubtractEquation)return m.FUNC_REVERSE_SUBTRACT;if(a===THREE.ZeroFactor)return m.ZERO;if(a===THREE.OneFactor)return m.ONE;if(a===THREE.SrcColorFactor)return m.SRC_COLOR;if(a===THREE.OneMinusSrcColorFactor)return m.ONE_MINUS_SRC_COLOR;if(a===THREE.SrcAlphaFactor)return m.SRC_ALPHA;if(a===THREE.OneMinusSrcAlphaFactor)return m.ONE_MINUS_SRC_ALPHA;if(a===THREE.DstAlphaFactor)return m.DST_ALPHA;if(a===THREE.OneMinusDstAlphaFactor)return m.ONE_MINUS_DST_ALPHA;
if(a===THREE.DstColorFactor)return m.DST_COLOR;if(a===THREE.OneMinusDstColorFactor)return m.ONE_MINUS_DST_COLOR;if(a===THREE.SrcAlphaSaturateFactor)return m.SRC_ALPHA_SATURATE;if(void 0!==Pa){if(a===THREE.RGB_S3TC_DXT1_Format)return Pa.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===THREE.RGBA_S3TC_DXT1_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===THREE.RGBA_S3TC_DXT3_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===THREE.RGBA_S3TC_DXT5_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT5_EXT}return 0}console.log("THREE.WebGLRenderer",
THREE.REVISION);a=a||{};var H=void 0!==a.canvas?a.canvas:document.createElement("canvas"),E=void 0!==a.context?a.context:null,Q=void 0!==a.precision?a.precision:"highp",Y=void 0!==a.alpha?a.alpha:!1,U=void 0!==a.depth?a.depth:!0,la=void 0!==a.stencil?a.stencil:!0,W=void 0!==a.antialias?a.antialias:!1,R=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,I=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,da=void 0!==a.logarithmicDepthBuffer?a.logarithmicDepthBuffer:!1,V=new THREE.Color(0),
X=0;this.domElement=H;this.context=null;this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:void 0!==self.devicePixelRatio?self.devicePixelRatio:1;this.autoUpdateObjects=this.sortObjects=this.autoClearStencil=this.autoClearDepth=this.autoClearColor=this.autoClear=!0;this.shadowMapEnabled=this.gammaOutput=this.gammaInput=!1;this.shadowMapAutoUpdate=!0;this.shadowMapType=THREE.PCFShadowMap;this.shadowMapCullFace=THREE.CullFaceFront;this.shadowMapCascade=this.shadowMapDebug=!1;this.maxMorphTargets=
8;this.maxMorphNormals=4;this.autoScaleCubemaps=!0;this.renderPluginsPre=[];this.renderPluginsPost=[];this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};var P=this,ga=[],wa=null,Ha=null,fa=-1,za=null,Ia=null,Ea=0,Ga=-1,ha=-1,Oa=-1,Ra=-1,Sa=-1,Fa=-1,ia=-1,ma=-1,ya=null,Z=null,qa=null,ua=null,Ca=0,va=0,Da=H.width,Ja=H.height,ja=0,ra=0,Ka=new Uint8Array(16),ob=new Uint8Array(16),Ab=new THREE.Frustum,Pb=new THREE.Matrix4,cc=new THREE.Matrix4,xa=new THREE.Vector3,
oa=new THREE.Vector3,cb=!0,Bb={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]},spot:{length:0,colors:[],positions:[],distances:[],directions:[],anglesCos:[],exponents:[]},hemi:{length:0,skyColors:[],groundColors:[],positions:[]}},m,sb,xb,db,Pa,pb;(function(){try{var a={alpha:Y,depth:U,stencil:la,antialias:W,premultipliedAlpha:R,preserveDrawingBuffer:I};m=E||H.getContext("webgl",a)||H.getContext("experimental-webgl",a);if(null===m)throw"Error creating WebGL context.";
}catch(b){console.error(b)}sb=m.getExtension("OES_texture_float");m.getExtension("OES_texture_float_linear");xb=m.getExtension("OES_standard_derivatives");db=m.getExtension("EXT_texture_filter_anisotropic")||m.getExtension("MOZ_EXT_texture_filter_anisotropic")||m.getExtension("WEBKIT_EXT_texture_filter_anisotropic");Pa=m.getExtension("WEBGL_compressed_texture_s3tc")||m.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||m.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");pb=m.getExtension("OES_element_index_uint");
null===sb&&console.log("THREE.WebGLRenderer: Float textures not supported.");null===xb&&console.log("THREE.WebGLRenderer: Standard derivatives not supported.");null===db&&console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");null===Pa&&console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");null===pb&&console.log("THREE.WebGLRenderer: elementindex as unsigned integer not supported.");void 0===m.getShaderPrecisionFormat&&(m.getShaderPrecisionFormat=function(){return{rangeMin:1,
rangeMax:1,precision:1}});da&&m.getExtension("EXT_frag_depth")})();m.clearColor(0,0,0,1);m.clearDepth(1);m.clearStencil(0);m.enable(m.DEPTH_TEST);m.depthFunc(m.LEQUAL);m.frontFace(m.CCW);m.cullFace(m.BACK);m.enable(m.CULL_FACE);m.enable(m.BLEND);m.blendEquation(m.FUNC_ADD);m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA);m.viewport(Ca,va,Da,Ja);m.clearColor(V.r,V.g,V.b,X);this.context=m;var Cb=m.getParameter(m.MAX_TEXTURE_IMAGE_UNITS),Db=m.getParameter(m.MAX_VERTEX_TEXTURE_IMAGE_UNITS);m.getParameter(m.MAX_TEXTURE_SIZE);
var dc=m.getParameter(m.MAX_CUBE_MAP_TEXTURE_SIZE),Ib=db?m.getParameter(db.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0,Jb=0<Db,Gb=Jb&&sb;Pa&&m.getParameter(m.COMPRESSED_TEXTURE_FORMATS);var ec=m.getShaderPrecisionFormat(m.VERTEX_SHADER,m.HIGH_FLOAT),qc=m.getShaderPrecisionFormat(m.VERTEX_SHADER,m.MEDIUM_FLOAT);m.getShaderPrecisionFormat(m.VERTEX_SHADER,m.LOW_FLOAT);var rc=m.getShaderPrecisionFormat(m.FRAGMENT_SHADER,m.HIGH_FLOAT),sc=m.getShaderPrecisionFormat(m.FRAGMENT_SHADER,m.MEDIUM_FLOAT);m.getShaderPrecisionFormat(m.FRAGMENT_SHADER,
m.LOW_FLOAT);var tc=0<ec.precision&&0<rc.precision,Kb=0<qc.precision&&0<sc.precision;"highp"!==Q||tc||(Kb?(Q="mediump",console.warn("WebGLRenderer: highp not supported, using mediump")):(Q="lowp",console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));"mediump"!==Q||Kb||(Q="lowp",console.warn("WebGLRenderer: mediump not supported, using lowp"));this.getContext=function(){return m};this.supportsVertexTextures=function(){return Jb};this.supportsFloatTextures=function(){return sb};
this.supportsStandardDerivatives=function(){return xb};this.supportsCompressedTextureS3TC=function(){return Pa};this.getMaxAnisotropy=function(){return Ib};this.getPrecision=function(){return Q};this.setSize=function(a,b,c){H.width=a*this.devicePixelRatio;H.height=b*this.devicePixelRatio;!1!==c&&(H.style.width=a+"px",H.style.height=b+"px");this.setViewport(0,0,a,b)};this.setViewport=function(a,b,c,d){Ca=a*this.devicePixelRatio;va=b*this.devicePixelRatio;Da=c*this.devicePixelRatio;Ja=d*this.devicePixelRatio;
m.viewport(Ca,va,Da,Ja)};this.setScissor=function(a,b,c,d){m.scissor(a*this.devicePixelRatio,b*this.devicePixelRatio,c*this.devicePixelRatio,d*this.devicePixelRatio)};this.enableScissorTest=function(a){a?m.enable(m.SCISSOR_TEST):m.disable(m.SCISSOR_TEST)};this.setClearColor=function(a,b){V.set(a);X=void 0!==b?b:1;m.clearColor(V.r,V.g,V.b,X)};this.setClearColorHex=function(a,b){console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");this.setClearColor(a,b)};
this.getClearColor=function(){return V};this.getClearAlpha=function(){return X};this.clear=function(a,b,c){var d=0;if(void 0===a||a)d|=m.COLOR_BUFFER_BIT;if(void 0===b||b)d|=m.DEPTH_BUFFER_BIT;if(void 0===c||c)d|=m.STENCIL_BUFFER_BIT;m.clear(d)};this.clearColor=function(){m.clear(m.COLOR_BUFFER_BIT)};this.clearDepth=function(){m.clear(m.DEPTH_BUFFER_BIT)};this.clearStencil=function(){m.clear(m.STENCIL_BUFFER_BIT)};this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.addPostPlugin=
function(a){a.init(this);this.renderPluginsPost.push(a)};this.addPrePlugin=function(a){a.init(this);this.renderPluginsPre.push(a)};this.updateShadowMap=function(a,b){wa=null;fa=za=ma=ia=Oa=-1;cb=!0;ha=Ga=-1;this.shadowMapPlugin.update(a,b)};var Eb=function(a){a=a.target;a.removeEventListener("dispose",Eb);a.__webglInit=void 0;if(a instanceof THREE.BufferGeometry){var b=a.attributes,c;for(c in b)void 0!==b[c].buffer&&m.deleteBuffer(b[c].buffer);P.info.memory.geometries--}else if(void 0!==a.geometryGroups)for(b in a.geometryGroups){c=
a.geometryGroups[b];if(void 0!==c.numMorphTargets)for(var d=0,e=c.numMorphTargets;d<e;d++)m.deleteBuffer(c.__webglMorphTargetsBuffers[d]);if(void 0!==c.numMorphNormals)for(d=0,e=c.numMorphNormals;d<e;d++)m.deleteBuffer(c.__webglMorphNormalsBuffers[d]);Qb(c)}else Qb(a)},Hb=function(a){a=a.target;a.removeEventListener("dispose",Hb);a.image&&a.image.__webglTextureCube?m.deleteTexture(a.image.__webglTextureCube):a.__webglInit&&(a.__webglInit=!1,m.deleteTexture(a.__webglTexture));P.info.memory.textures--},
Rb=function(a){a=a.target;a.removeEventListener("dispose",Rb);if(a&&a.__webglTexture)if(m.deleteTexture(a.__webglTexture),a instanceof THREE.WebGLRenderTargetCube)for(var b=0;6>b;b++)m.deleteFramebuffer(a.__webglFramebuffer[b]),m.deleteRenderbuffer(a.__webglRenderbuffer[b]);else m.deleteFramebuffer(a.__webglFramebuffer),m.deleteRenderbuffer(a.__webglRenderbuffer);P.info.memory.textures--},Sb=function(a){a=a.target;a.removeEventListener("dispose",Sb);Fb(a)},Qb=function(a){void 0!==a.__webglVertexBuffer&&
m.deleteBuffer(a.__webglVertexBuffer);void 0!==a.__webglNormalBuffer&&m.deleteBuffer(a.__webglNormalBuffer);void 0!==a.__webglTangentBuffer&&m.deleteBuffer(a.__webglTangentBuffer);void 0!==a.__webglColorBuffer&&m.deleteBuffer(a.__webglColorBuffer);void 0!==a.__webglUVBuffer&&m.deleteBuffer(a.__webglUVBuffer);void 0!==a.__webglUV2Buffer&&m.deleteBuffer(a.__webglUV2Buffer);void 0!==a.__webglSkinIndicesBuffer&&m.deleteBuffer(a.__webglSkinIndicesBuffer);void 0!==a.__webglSkinWeightsBuffer&&m.deleteBuffer(a.__webglSkinWeightsBuffer);
void 0!==a.__webglFaceBuffer&&m.deleteBuffer(a.__webglFaceBuffer);void 0!==a.__webglLineBuffer&&m.deleteBuffer(a.__webglLineBuffer);void 0!==a.__webglLineDistanceBuffer&&m.deleteBuffer(a.__webglLineDistanceBuffer);if(void 0!==a.__webglCustomAttributesList)for(var b in a.__webglCustomAttributesList)m.deleteBuffer(a.__webglCustomAttributesList[b].buffer);P.info.memory.geometries--},Fb=function(a){var b=a.program;if(void 0!==b){a.program=void 0;var c,d,e=!1;a=0;for(c=ga.length;a<c;a++)if(d=ga[a],d.program===
b){d.usedTimes--;0===d.usedTimes&&(e=!0);break}if(!0===e){e=[];a=0;for(c=ga.length;a<c;a++)d=ga[a],d.program!==b&&e.push(d);ga=e;m.deleteProgram(b);P.info.memory.programs--}}};this.renderBufferImmediate=function(a,b,c){h();a.hasPositions&&!a.__webglVertexBuffer&&(a.__webglVertexBuffer=m.createBuffer());a.hasNormals&&!a.__webglNormalBuffer&&(a.__webglNormalBuffer=m.createBuffer());a.hasUvs&&!a.__webglUvBuffer&&(a.__webglUvBuffer=m.createBuffer());a.hasColors&&!a.__webglColorBuffer&&(a.__webglColorBuffer=
m.createBuffer());a.hasPositions&&(m.bindBuffer(m.ARRAY_BUFFER,a.__webglVertexBuffer),m.bufferData(m.ARRAY_BUFFER,a.positionArray,m.DYNAMIC_DRAW),k(b.attributes.position),m.vertexAttribPointer(b.attributes.position,3,m.FLOAT,!1,0,0));if(a.hasNormals){m.bindBuffer(m.ARRAY_BUFFER,a.__webglNormalBuffer);if(c.shading===THREE.FlatShading){var d,e,f,g,p,n,q,r,s,u,t,w=3*a.count;for(t=0;t<w;t+=9)u=a.normalArray,d=u[t],e=u[t+1],f=u[t+2],g=u[t+3],n=u[t+4],r=u[t+5],p=u[t+6],q=u[t+7],s=u[t+8],d=(d+g+p)/3,e=(e+
n+q)/3,f=(f+r+s)/3,u[t]=d,u[t+1]=e,u[t+2]=f,u[t+3]=d,u[t+4]=e,u[t+5]=f,u[t+6]=d,u[t+7]=e,u[t+8]=f}m.bufferData(m.ARRAY_BUFFER,a.normalArray,m.DYNAMIC_DRAW);k(b.attributes.normal);m.vertexAttribPointer(b.attributes.normal,3,m.FLOAT,!1,0,0)}a.hasUvs&&c.map&&(m.bindBuffer(m.ARRAY_BUFFER,a.__webglUvBuffer),m.bufferData(m.ARRAY_BUFFER,a.uvArray,m.DYNAMIC_DRAW),k(b.attributes.uv),m.vertexAttribPointer(b.attributes.uv,2,m.FLOAT,!1,0,0));a.hasColors&&c.vertexColors!==THREE.NoColors&&(m.bindBuffer(m.ARRAY_BUFFER,
a.__webglColorBuffer),m.bufferData(m.ARRAY_BUFFER,a.colorArray,m.DYNAMIC_DRAW),k(b.attributes.color),m.vertexAttribPointer(b.attributes.color,3,m.FLOAT,!1,0,0));l();m.drawArrays(m.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,b,c,d,e,f){if(!1!==d.visible){var k=N(a,b,c,d,f);a=k.attributes;b=e.attributes;c=!1;k=16777215*e.id+2*k.id+(d.wireframe?1:0);k!==za&&(za=k,c=!0);c&&h();if(f instanceof THREE.Mesh)if(f=b.index){var l;f.array instanceof Uint32Array?(k=m.UNSIGNED_INT,l=4):(k=
m.UNSIGNED_SHORT,l=2);e=e.offsets;if(0===e.length)c&&(g(d,a,b,0),m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,f.buffer)),m.drawElements(m.TRIANGLES,f.array.length,k,0),P.info.render.calls++,P.info.render.vertices+=f.array.length,P.info.render.faces+=f.array.length/3;else{c=!0;for(var p=0,n=e.length;p<n;p++){var q=e[p].index;c&&(g(d,a,b,q),m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,f.buffer));m.drawElements(m.TRIANGLES,e[p].count,k,e[p].start*l);P.info.render.calls++;P.info.render.vertices+=e[p].count;P.info.render.faces+=
e[p].count/3}}}else c&&g(d,a,b,0),d=e.attributes.position,m.drawArrays(m.TRIANGLES,0,d.array.length/3),P.info.render.calls++,P.info.render.vertices+=d.array.length/3,P.info.render.faces+=d.array.length/9;else if(f instanceof THREE.ParticleSystem)c&&g(d,a,b,0),d=b.position,m.drawArrays(m.POINTS,0,d.array.length/3),P.info.render.calls++,P.info.render.points+=d.array.length/3;else if(f instanceof THREE.Line)if(k=f.type===THREE.LineStrip?m.LINE_STRIP:m.LINES,A(d.linewidth),f=b.index)if(f.array instanceof
Uint32Array?(k=m.UNSIGNED_INT,l=4):(k=m.UNSIGNED_SHORT,l=2),e=e.offsets,0===e.length)c&&(g(d,a,b,0),m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,f.buffer)),m.drawElements(m.LINES,f.array.length,k,0),P.info.render.calls++,P.info.render.vertices+=f.array.length;else for(1<e.length&&(c=!0),p=0,n=e.length;p<n;p++)q=e[p].index,c&&(g(d,a,b,q),m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,f.buffer)),m.drawElements(m.LINES,e[p].count,k,e[p].start*l),P.info.render.calls++,P.info.render.vertices+=e[p].count;else c&&g(d,a,b,0),
d=b.position,m.drawArrays(k,0,d.array.length/3),P.info.render.calls++,P.info.render.points+=d.array.length/3}};this.renderBuffer=function(a,b,c,d,e,f){if(!1!==d.visible){var g,p;c=N(a,b,c,d,f);b=c.attributes;a=!1;c=16777215*e.id+2*c.id+(d.wireframe?1:0);c!==za&&(za=c,a=!0);a&&h();if(!d.morphTargets&&0<=b.position)a&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglVertexBuffer),k(b.position),m.vertexAttribPointer(b.position,3,m.FLOAT,!1,0,0));else if(f.morphTargetBase){c=d.program.attributes;-1!==f.morphTargetBase&&
0<=c.position?(m.bindBuffer(m.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[f.morphTargetBase]),k(c.position),m.vertexAttribPointer(c.position,3,m.FLOAT,!1,0,0)):0<=c.position&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglVertexBuffer),k(c.position),m.vertexAttribPointer(c.position,3,m.FLOAT,!1,0,0));if(f.morphTargetForcedOrder.length){var n=0;p=f.morphTargetForcedOrder;for(g=f.morphTargetInfluences;n<d.numSupportedMorphTargets&&n<p.length;)0<=c["morphTarget"+n]&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[p[n]]),
k(c["morphTarget"+n]),m.vertexAttribPointer(c["morphTarget"+n],3,m.FLOAT,!1,0,0)),0<=c["morphNormal"+n]&&d.morphNormals&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglMorphNormalsBuffers[p[n]]),k(c["morphNormal"+n]),m.vertexAttribPointer(c["morphNormal"+n],3,m.FLOAT,!1,0,0)),f.__webglMorphTargetInfluences[n]=g[p[n]],n++}else{p=[];g=f.morphTargetInfluences;var r,s=g.length;for(r=0;r<s;r++)n=g[r],0<n&&p.push([n,r]);p.length>d.numSupportedMorphTargets?(p.sort(q),p.length=d.numSupportedMorphTargets):p.length>
d.numSupportedMorphNormals?p.sort(q):0===p.length&&p.push([0,0]);for(n=0;n<d.numSupportedMorphTargets;)p[n]?(r=p[n][1],0<=c["morphTarget"+n]&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[r]),k(c["morphTarget"+n]),m.vertexAttribPointer(c["morphTarget"+n],3,m.FLOAT,!1,0,0)),0<=c["morphNormal"+n]&&d.morphNormals&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglMorphNormalsBuffers[r]),k(c["morphNormal"+n]),m.vertexAttribPointer(c["morphNormal"+n],3,m.FLOAT,!1,0,0)),f.__webglMorphTargetInfluences[n]=
g[r]):f.__webglMorphTargetInfluences[n]=0,n++}null!==d.program.uniforms.morphTargetInfluences&&m.uniform1fv(d.program.uniforms.morphTargetInfluences,f.__webglMorphTargetInfluences)}if(a){if(e.__webglCustomAttributesList)for(g=0,p=e.__webglCustomAttributesList.length;g<p;g++)c=e.__webglCustomAttributesList[g],0<=b[c.buffer.belongsToAttribute]&&(m.bindBuffer(m.ARRAY_BUFFER,c.buffer),k(b[c.buffer.belongsToAttribute]),m.vertexAttribPointer(b[c.buffer.belongsToAttribute],c.size,m.FLOAT,!1,0,0));0<=b.color&&
(0<f.geometry.colors.length||0<f.geometry.faces.length?(m.bindBuffer(m.ARRAY_BUFFER,e.__webglColorBuffer),k(b.color),m.vertexAttribPointer(b.color,3,m.FLOAT,!1,0,0)):d.defaultAttributeValues&&m.vertexAttrib3fv(b.color,d.defaultAttributeValues.color));0<=b.normal&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglNormalBuffer),k(b.normal),m.vertexAttribPointer(b.normal,3,m.FLOAT,!1,0,0));0<=b.tangent&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglTangentBuffer),k(b.tangent),m.vertexAttribPointer(b.tangent,4,m.FLOAT,!1,
0,0));0<=b.uv&&(f.geometry.faceVertexUvs[0]?(m.bindBuffer(m.ARRAY_BUFFER,e.__webglUVBuffer),k(b.uv),m.vertexAttribPointer(b.uv,2,m.FLOAT,!1,0,0)):d.defaultAttributeValues&&m.vertexAttrib2fv(b.uv,d.defaultAttributeValues.uv));0<=b.uv2&&(f.geometry.faceVertexUvs[1]?(m.bindBuffer(m.ARRAY_BUFFER,e.__webglUV2Buffer),k(b.uv2),m.vertexAttribPointer(b.uv2,2,m.FLOAT,!1,0,0)):d.defaultAttributeValues&&m.vertexAttrib2fv(b.uv2,d.defaultAttributeValues.uv2));d.skinning&&0<=b.skinIndex&&0<=b.skinWeight&&(m.bindBuffer(m.ARRAY_BUFFER,
e.__webglSkinIndicesBuffer),k(b.skinIndex),m.vertexAttribPointer(b.skinIndex,4,m.FLOAT,!1,0,0),m.bindBuffer(m.ARRAY_BUFFER,e.__webglSkinWeightsBuffer),k(b.skinWeight),m.vertexAttribPointer(b.skinWeight,4,m.FLOAT,!1,0,0));0<=b.lineDistance&&(m.bindBuffer(m.ARRAY_BUFFER,e.__webglLineDistanceBuffer),k(b.lineDistance),m.vertexAttribPointer(b.lineDistance,1,m.FLOAT,!1,0,0))}l();f instanceof THREE.Mesh?(f=e.__typeArray===Uint32Array?m.UNSIGNED_INT:m.UNSIGNED_SHORT,d.wireframe?(A(d.wireframeLinewidth),a&&
m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,e.__webglLineBuffer),m.drawElements(m.LINES,e.__webglLineCount,f,0)):(a&&m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,e.__webglFaceBuffer),m.drawElements(m.TRIANGLES,e.__webglFaceCount,f,0)),P.info.render.calls++,P.info.render.vertices+=e.__webglFaceCount,P.info.render.faces+=e.__webglFaceCount/3):f instanceof THREE.Line?(f=f.type===THREE.LineStrip?m.LINE_STRIP:m.LINES,A(d.linewidth),m.drawArrays(f,0,e.__webglLineCount),P.info.render.calls++):f instanceof THREE.ParticleSystem&&
(m.drawArrays(m.POINTS,0,e.__webglParticleCount),P.info.render.calls++,P.info.render.points+=e.__webglParticleCount)}};this.render=function(a,b,c,d){if(!1===b instanceof THREE.Camera)console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");else{var e,f,g,h,k=a.__lights,l=a.fog;fa=-1;cb=!0;!0===a.autoUpdate&&a.updateMatrixWorld();void 0===b.parent&&b.updateMatrixWorld();b.matrixWorldInverse.getInverse(b.matrixWorld);Pb.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse);
Ab.setFromMatrix(Pb);this.autoUpdateObjects&&this.initWebGLObjects(a);p(this.renderPluginsPre,a,b);P.info.render.calls=0;P.info.render.vertices=0;P.info.render.faces=0;P.info.render.points=0;this.setRenderTarget(c);(this.autoClear||d)&&this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);h=a.__webglObjects;d=0;for(e=h.length;d<e;d++)if(f=h[d],g=f.object,f.id=d,f.render=!1,g.visible&&(!(g instanceof THREE.Mesh||g instanceof THREE.ParticleSystem)||!g.frustumCulled||Ab.intersectsObject(g))){var q=
g;q._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,q.matrixWorld);q._normalMatrix.getNormalMatrix(q._modelViewMatrix);var q=f,r=q.object,u=q.buffer,w=r.geometry,r=r.material;r instanceof THREE.MeshFaceMaterial?(r=r.materials[w instanceof THREE.BufferGeometry?0:u.materialIndex],r.transparent?(q.transparent=r,q.opaque=null):(q.opaque=r,q.transparent=null)):r&&(r.transparent?(q.transparent=r,q.opaque=null):(q.opaque=r,q.transparent=null));f.render=!0;!0===this.sortObjects&&(null!==g.renderDepth?
f.z=g.renderDepth:(xa.setFromMatrixPosition(g.matrixWorld),xa.applyProjection(Pb),f.z=xa.z))}this.sortObjects&&h.sort(n);h=a.__webglObjectsImmediate;d=0;for(e=h.length;d<e;d++)f=h[d],g=f.object,g.visible&&(g._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,g.matrixWorld),g._normalMatrix.getNormalMatrix(g._modelViewMatrix),g=f.object.material,g.transparent?(f.transparent=g,f.opaque=null):(f.opaque=g,f.transparent=null));a.overrideMaterial?(d=a.overrideMaterial,this.setBlending(d.blending,d.blendEquation,
d.blendSrc,d.blendDst),this.setDepthTest(d.depthTest),this.setDepthWrite(d.depthWrite),G(d.polygonOffset,d.polygonOffsetFactor,d.polygonOffsetUnits),s(a.__webglObjects,!1,"",b,k,l,!0,d),t(a.__webglObjectsImmediate,"",b,k,l,!1,d)):(d=null,this.setBlending(THREE.NoBlending),s(a.__webglObjects,!0,"opaque",b,k,l,!1,d),t(a.__webglObjectsImmediate,"opaque",b,k,l,!1,d),s(a.__webglObjects,!1,"transparent",b,k,l,!0,d),t(a.__webglObjectsImmediate,"transparent",b,k,l,!0,d));p(this.renderPluginsPost,a,b);c&&
c.generateMipmaps&&c.minFilter!==THREE.NearestFilter&&c.minFilter!==THREE.LinearFilter&&(c instanceof THREE.WebGLRenderTargetCube?(m.bindTexture(m.TEXTURE_CUBE_MAP,c.__webglTexture),m.generateMipmap(m.TEXTURE_CUBE_MAP),m.bindTexture(m.TEXTURE_CUBE_MAP,null)):(m.bindTexture(m.TEXTURE_2D,c.__webglTexture),m.generateMipmap(m.TEXTURE_2D),m.bindTexture(m.TEXTURE_2D,null)));this.setDepthTest(!0);this.setDepthWrite(!0)}};this.renderImmediateObject=function(a,b,c,d,e){var f=N(a,b,c,d,e);za=-1;P.setMaterialFaces(d);
e.immediateRenderCallback?e.immediateRenderCallback(f,m,Ab):e.render(function(a){P.renderBufferImmediate(a,f,d)})};this.initWebGLObjects=function(a){a.__webglObjects||(a.__webglObjects=[],a.__webglObjectsImmediate=[],a.__webglSprites=[],a.__webglFlares=[]);for(;a.__objectsAdded.length;)r(a.__objectsAdded[0],a),a.__objectsAdded.splice(0,1);for(;a.__objectsRemoved.length;)y(a.__objectsRemoved[0],a),a.__objectsRemoved.splice(0,1);for(var b=0,g=a.__webglObjects.length;b<g;b++){var h=a.__webglObjects[b].object;
void 0===h.__webglInit&&(void 0!==h.__webglActive&&y(h,a),r(h,a));var k=h,l=k.geometry,p=void 0,n=void 0,s=void 0;if(l instanceof THREE.BufferGeometry){var t=m.DYNAMIC_DRAW,v=l.attributes,A=void 0,B=void 0;for(A in v)B=v[A],B.needsUpdate&&("index"===A?(m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,B.buffer),m.bufferData(m.ELEMENT_ARRAY_BUFFER,B.array,t)):(m.bindBuffer(m.ARRAY_BUFFER,B.buffer),m.bufferData(m.ARRAY_BUFFER,B.array,t)),B.needsUpdate=!1)}else if(k instanceof THREE.Mesh){for(var z=0,L=l.geometryGroupsList.length;z<
L;z++)if(p=l.geometryGroupsList[z],s=d(k,p),l.buffersNeedUpdate&&c(p,k),n=s.attributes&&w(s),l.verticesNeedUpdate||l.morphTargetsNeedUpdate||l.elementsNeedUpdate||l.uvsNeedUpdate||l.normalsNeedUpdate||l.colorsNeedUpdate||l.tangentsNeedUpdate||n){var x=p,G=k,C=m.DYNAMIC_DRAW,E=!l.dynamic,J=s;if(x.__inittedArrays){var H=e(J),P=J.vertexColors?J.vertexColors:!1,N=f(J),K=H===THREE.SmoothShading,D=void 0,F=void 0,Q=void 0,I=void 0,U=void 0,fa=void 0,Y=void 0,ga=void 0,R=void 0,V=void 0,W=void 0,$=void 0,
aa=void 0,ba=void 0,wa=void 0,X=void 0,Z=void 0,da=void 0,Ia=void 0,Ga=void 0,Ea=void 0,ia=void 0,za=void 0,ja=void 0,Ha=void 0,la=void 0,oa=void 0,qa=void 0,ra=void 0,ha=void 0,ya=void 0,Fa=void 0,Ca=void 0,Da=void 0,ma=void 0,Ka=void 0,ua=void 0,va=void 0,Oa=void 0,Ja=void 0,ab=0,bb=0,Ra=0,Sa=0,Pa=0,eb=0,Ta=0,qb=0,Ya=0,ta=0,Aa=0,O=0,Qa=void 0,fb=x.__vertexArray,cb=x.__uvArray,db=x.__uv2Array,tb=x.__normalArray,Ua=x.__tangentArray,gb=x.__colorArray,Va=x.__skinIndexArray,Wa=x.__skinWeightArray,ob=
x.__morphTargetsArrays,sb=x.__morphNormalsArrays,pb=x.__webglCustomAttributesList,M=void 0,Tb=x.__faceArray,ub=x.__lineArray,La=G.geometry,Ab=La.elementsNeedUpdate,xb=La.uvsNeedUpdate,Db=La.normalsNeedUpdate,Gb=La.tangentsNeedUpdate,Hb=La.colorsNeedUpdate,Jb=La.morphTargetsNeedUpdate,fc=La.vertices,ea=x.faces3,hb=La.faces,Bb=La.faceVertexUvs[0],Cb=La.faceVertexUvs[1],gc=La.skinIndices,Ub=La.skinWeights,Vb=La.morphTargets,Eb=La.morphNormals;if(La.verticesNeedUpdate){D=0;for(F=ea.length;D<F;D++)I=hb[ea[D]],
$=fc[I.a],aa=fc[I.b],ba=fc[I.c],fb[bb]=$.x,fb[bb+1]=$.y,fb[bb+2]=$.z,fb[bb+3]=aa.x,fb[bb+4]=aa.y,fb[bb+5]=aa.z,fb[bb+6]=ba.x,fb[bb+7]=ba.y,fb[bb+8]=ba.z,bb+=9;m.bindBuffer(m.ARRAY_BUFFER,x.__webglVertexBuffer);m.bufferData(m.ARRAY_BUFFER,fb,C)}if(Jb)for(ma=0,Ka=Vb.length;ma<Ka;ma++){D=Aa=0;for(F=ea.length;D<F;D++)Oa=ea[D],I=hb[Oa],$=Vb[ma].vertices[I.a],aa=Vb[ma].vertices[I.b],ba=Vb[ma].vertices[I.c],ua=ob[ma],ua[Aa]=$.x,ua[Aa+1]=$.y,ua[Aa+2]=$.z,ua[Aa+3]=aa.x,ua[Aa+4]=aa.y,ua[Aa+5]=aa.z,ua[Aa+6]=
ba.x,ua[Aa+7]=ba.y,ua[Aa+8]=ba.z,J.morphNormals&&(K?(Ja=Eb[ma].vertexNormals[Oa],da=Ja.a,Ia=Ja.b,Ga=Ja.c):Ga=Ia=da=Eb[ma].faceNormals[Oa],va=sb[ma],va[Aa]=da.x,va[Aa+1]=da.y,va[Aa+2]=da.z,va[Aa+3]=Ia.x,va[Aa+4]=Ia.y,va[Aa+5]=Ia.z,va[Aa+6]=Ga.x,va[Aa+7]=Ga.y,va[Aa+8]=Ga.z),Aa+=9;m.bindBuffer(m.ARRAY_BUFFER,x.__webglMorphTargetsBuffers[ma]);m.bufferData(m.ARRAY_BUFFER,ob[ma],C);J.morphNormals&&(m.bindBuffer(m.ARRAY_BUFFER,x.__webglMorphNormalsBuffers[ma]),m.bufferData(m.ARRAY_BUFFER,sb[ma],C))}if(Ub.length){D=
0;for(F=ea.length;D<F;D++)I=hb[ea[D]],ja=Ub[I.a],Ha=Ub[I.b],la=Ub[I.c],Wa[ta]=ja.x,Wa[ta+1]=ja.y,Wa[ta+2]=ja.z,Wa[ta+3]=ja.w,Wa[ta+4]=Ha.x,Wa[ta+5]=Ha.y,Wa[ta+6]=Ha.z,Wa[ta+7]=Ha.w,Wa[ta+8]=la.x,Wa[ta+9]=la.y,Wa[ta+10]=la.z,Wa[ta+11]=la.w,oa=gc[I.a],qa=gc[I.b],ra=gc[I.c],Va[ta]=oa.x,Va[ta+1]=oa.y,Va[ta+2]=oa.z,Va[ta+3]=oa.w,Va[ta+4]=qa.x,Va[ta+5]=qa.y,Va[ta+6]=qa.z,Va[ta+7]=qa.w,Va[ta+8]=ra.x,Va[ta+9]=ra.y,Va[ta+10]=ra.z,Va[ta+11]=ra.w,ta+=12;0<ta&&(m.bindBuffer(m.ARRAY_BUFFER,x.__webglSkinIndicesBuffer),
m.bufferData(m.ARRAY_BUFFER,Va,C),m.bindBuffer(m.ARRAY_BUFFER,x.__webglSkinWeightsBuffer),m.bufferData(m.ARRAY_BUFFER,Wa,C))}if(Hb&&P){D=0;for(F=ea.length;D<F;D++)I=hb[ea[D]],Y=I.vertexColors,ga=I.color,3===Y.length&&P===THREE.VertexColors?(Ea=Y[0],ia=Y[1],za=Y[2]):za=ia=Ea=ga,gb[Ya]=Ea.r,gb[Ya+1]=Ea.g,gb[Ya+2]=Ea.b,gb[Ya+3]=ia.r,gb[Ya+4]=ia.g,gb[Ya+5]=ia.b,gb[Ya+6]=za.r,gb[Ya+7]=za.g,gb[Ya+8]=za.b,Ya+=9;0<Ya&&(m.bindBuffer(m.ARRAY_BUFFER,x.__webglColorBuffer),m.bufferData(m.ARRAY_BUFFER,gb,C))}if(Gb&&
La.hasTangents){D=0;for(F=ea.length;D<F;D++)I=hb[ea[D]],R=I.vertexTangents,wa=R[0],X=R[1],Z=R[2],Ua[Ta]=wa.x,Ua[Ta+1]=wa.y,Ua[Ta+2]=wa.z,Ua[Ta+3]=wa.w,Ua[Ta+4]=X.x,Ua[Ta+5]=X.y,Ua[Ta+6]=X.z,Ua[Ta+7]=X.w,Ua[Ta+8]=Z.x,Ua[Ta+9]=Z.y,Ua[Ta+10]=Z.z,Ua[Ta+11]=Z.w,Ta+=12;m.bindBuffer(m.ARRAY_BUFFER,x.__webglTangentBuffer);m.bufferData(m.ARRAY_BUFFER,Ua,C)}if(Db&&H){D=0;for(F=ea.length;D<F;D++)if(I=hb[ea[D]],U=I.vertexNormals,fa=I.normal,3===U.length&&K)for(ha=0;3>ha;ha++)Fa=U[ha],tb[eb]=Fa.x,tb[eb+1]=Fa.y,
tb[eb+2]=Fa.z,eb+=3;else for(ha=0;3>ha;ha++)tb[eb]=fa.x,tb[eb+1]=fa.y,tb[eb+2]=fa.z,eb+=3;m.bindBuffer(m.ARRAY_BUFFER,x.__webglNormalBuffer);m.bufferData(m.ARRAY_BUFFER,tb,C)}if(xb&&Bb&&N){D=0;for(F=ea.length;D<F;D++)if(Q=ea[D],V=Bb[Q],void 0!==V)for(ha=0;3>ha;ha++)Ca=V[ha],cb[Ra]=Ca.x,cb[Ra+1]=Ca.y,Ra+=2;0<Ra&&(m.bindBuffer(m.ARRAY_BUFFER,x.__webglUVBuffer),m.bufferData(m.ARRAY_BUFFER,cb,C))}if(xb&&Cb&&N){D=0;for(F=ea.length;D<F;D++)if(Q=ea[D],W=Cb[Q],void 0!==W)for(ha=0;3>ha;ha++)Da=W[ha],db[Sa]=
Da.x,db[Sa+1]=Da.y,Sa+=2;0<Sa&&(m.bindBuffer(m.ARRAY_BUFFER,x.__webglUV2Buffer),m.bufferData(m.ARRAY_BUFFER,db,C))}if(Ab){D=0;for(F=ea.length;D<F;D++)Tb[Pa]=ab,Tb[Pa+1]=ab+1,Tb[Pa+2]=ab+2,Pa+=3,ub[qb]=ab,ub[qb+1]=ab+1,ub[qb+2]=ab,ub[qb+3]=ab+2,ub[qb+4]=ab+1,ub[qb+5]=ab+2,qb+=6,ab+=3;m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,x.__webglFaceBuffer);m.bufferData(m.ELEMENT_ARRAY_BUFFER,Tb,C);m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,x.__webglLineBuffer);m.bufferData(m.ELEMENT_ARRAY_BUFFER,ub,C)}if(pb)for(ha=0,ya=pb.length;ha<
ya;ha++)if(M=pb[ha],M.__original.needsUpdate){O=0;if(1===M.size)if(void 0===M.boundTo||"vertices"===M.boundTo)for(D=0,F=ea.length;D<F;D++)I=hb[ea[D]],M.array[O]=M.value[I.a],M.array[O+1]=M.value[I.b],M.array[O+2]=M.value[I.c],O+=3;else{if("faces"===M.boundTo)for(D=0,F=ea.length;D<F;D++)Qa=M.value[ea[D]],M.array[O]=Qa,M.array[O+1]=Qa,M.array[O+2]=Qa,O+=3}else if(2===M.size)if(void 0===M.boundTo||"vertices"===M.boundTo)for(D=0,F=ea.length;D<F;D++)I=hb[ea[D]],$=M.value[I.a],aa=M.value[I.b],ba=M.value[I.c],
M.array[O]=$.x,M.array[O+1]=$.y,M.array[O+2]=aa.x,M.array[O+3]=aa.y,M.array[O+4]=ba.x,M.array[O+5]=ba.y,O+=6;else{if("faces"===M.boundTo)for(D=0,F=ea.length;D<F;D++)ba=aa=$=Qa=M.value[ea[D]],M.array[O]=$.x,M.array[O+1]=$.y,M.array[O+2]=aa.x,M.array[O+3]=aa.y,M.array[O+4]=ba.x,M.array[O+5]=ba.y,O+=6}else if(3===M.size){var sa;sa="c"===M.type?["r","g","b"]:["x","y","z"];if(void 0===M.boundTo||"vertices"===M.boundTo)for(D=0,F=ea.length;D<F;D++)I=hb[ea[D]],$=M.value[I.a],aa=M.value[I.b],ba=M.value[I.c],
M.array[O]=$[sa[0]],M.array[O+1]=$[sa[1]],M.array[O+2]=$[sa[2]],M.array[O+3]=aa[sa[0]],M.array[O+4]=aa[sa[1]],M.array[O+5]=aa[sa[2]],M.array[O+6]=ba[sa[0]],M.array[O+7]=ba[sa[1]],M.array[O+8]=ba[sa[2]],O+=9;else if("faces"===M.boundTo)for(D=0,F=ea.length;D<F;D++)ba=aa=$=Qa=M.value[ea[D]],M.array[O]=$[sa[0]],M.array[O+1]=$[sa[1]],M.array[O+2]=$[sa[2]],M.array[O+3]=aa[sa[0]],M.array[O+4]=aa[sa[1]],M.array[O+5]=aa[sa[2]],M.array[O+6]=ba[sa[0]],M.array[O+7]=ba[sa[1]],M.array[O+8]=ba[sa[2]],O+=9;else if("faceVertices"===
M.boundTo)for(D=0,F=ea.length;D<F;D++)Qa=M.value[ea[D]],$=Qa[0],aa=Qa[1],ba=Qa[2],M.array[O]=$[sa[0]],M.array[O+1]=$[sa[1]],M.array[O+2]=$[sa[2]],M.array[O+3]=aa[sa[0]],M.array[O+4]=aa[sa[1]],M.array[O+5]=aa[sa[2]],M.array[O+6]=ba[sa[0]],M.array[O+7]=ba[sa[1]],M.array[O+8]=ba[sa[2]],O+=9}else if(4===M.size)if(void 0===M.boundTo||"vertices"===M.boundTo)for(D=0,F=ea.length;D<F;D++)I=hb[ea[D]],$=M.value[I.a],aa=M.value[I.b],ba=M.value[I.c],M.array[O]=$.x,M.array[O+1]=$.y,M.array[O+2]=$.z,M.array[O+3]=
$.w,M.array[O+4]=aa.x,M.array[O+5]=aa.y,M.array[O+6]=aa.z,M.array[O+7]=aa.w,M.array[O+8]=ba.x,M.array[O+9]=ba.y,M.array[O+10]=ba.z,M.array[O+11]=ba.w,O+=12;else if("faces"===M.boundTo)for(D=0,F=ea.length;D<F;D++)ba=aa=$=Qa=M.value[ea[D]],M.array[O]=$.x,M.array[O+1]=$.y,M.array[O+2]=$.z,M.array[O+3]=$.w,M.array[O+4]=aa.x,M.array[O+5]=aa.y,M.array[O+6]=aa.z,M.array[O+7]=aa.w,M.array[O+8]=ba.x,M.array[O+9]=ba.y,M.array[O+10]=ba.z,M.array[O+11]=ba.w,O+=12;else if("faceVertices"===M.boundTo)for(D=0,F=
ea.length;D<F;D++)Qa=M.value[ea[D]],$=Qa[0],aa=Qa[1],ba=Qa[2],M.array[O]=$.x,M.array[O+1]=$.y,M.array[O+2]=$.z,M.array[O+3]=$.w,M.array[O+4]=aa.x,M.array[O+5]=aa.y,M.array[O+6]=aa.z,M.array[O+7]=aa.w,M.array[O+8]=ba.x,M.array[O+9]=ba.y,M.array[O+10]=ba.z,M.array[O+11]=ba.w,O+=12;m.bindBuffer(m.ARRAY_BUFFER,M.buffer);m.bufferData(m.ARRAY_BUFFER,M.array,C)}E&&(delete x.__inittedArrays,delete x.__colorArray,delete x.__normalArray,delete x.__tangentArray,delete x.__uvArray,delete x.__uv2Array,delete x.__faceArray,
delete x.__vertexArray,delete x.__lineArray,delete x.__skinIndexArray,delete x.__skinWeightArray)}}l.verticesNeedUpdate=!1;l.morphTargetsNeedUpdate=!1;l.elementsNeedUpdate=!1;l.uvsNeedUpdate=!1;l.normalsNeedUpdate=!1;l.colorsNeedUpdate=!1;l.tangentsNeedUpdate=!1;l.buffersNeedUpdate=!1;s.attributes&&u(s)}else if(k instanceof THREE.Line){s=d(k,l);n=s.attributes&&w(s);if(l.verticesNeedUpdate||l.colorsNeedUpdate||l.lineDistancesNeedUpdate||n){var Xa=l,Wb=m.DYNAMIC_DRAW,Lb=void 0,Mb=void 0,Nb=void 0,Xb=
void 0,pa=void 0,Yb=void 0,Fb=Xa.vertices,Ib=Xa.colors,Kb=Xa.lineDistances,Qb=Fb.length,Rb=Ib.length,Sb=Kb.length,Zb=Xa.__vertexArray,$b=Xa.__colorArray,lc=Xa.__lineDistanceArray,dc=Xa.colorsNeedUpdate,ec=Xa.lineDistancesNeedUpdate,hc=Xa.__webglCustomAttributesList,ac=void 0,mc=void 0,Ba=void 0,yb=void 0,Ma=void 0,na=void 0;if(Xa.verticesNeedUpdate){for(Lb=0;Lb<Qb;Lb++)Xb=Fb[Lb],pa=3*Lb,Zb[pa]=Xb.x,Zb[pa+1]=Xb.y,Zb[pa+2]=Xb.z;m.bindBuffer(m.ARRAY_BUFFER,Xa.__webglVertexBuffer);m.bufferData(m.ARRAY_BUFFER,
Zb,Wb)}if(dc){for(Mb=0;Mb<Rb;Mb++)Yb=Ib[Mb],pa=3*Mb,$b[pa]=Yb.r,$b[pa+1]=Yb.g,$b[pa+2]=Yb.b;m.bindBuffer(m.ARRAY_BUFFER,Xa.__webglColorBuffer);m.bufferData(m.ARRAY_BUFFER,$b,Wb)}if(ec){for(Nb=0;Nb<Sb;Nb++)lc[Nb]=Kb[Nb];m.bindBuffer(m.ARRAY_BUFFER,Xa.__webglLineDistanceBuffer);m.bufferData(m.ARRAY_BUFFER,lc,Wb)}if(hc)for(ac=0,mc=hc.length;ac<mc;ac++)if(na=hc[ac],na.needsUpdate&&(void 0===na.boundTo||"vertices"===na.boundTo)){pa=0;yb=na.value.length;if(1===na.size)for(Ba=0;Ba<yb;Ba++)na.array[Ba]=na.value[Ba];
else if(2===na.size)for(Ba=0;Ba<yb;Ba++)Ma=na.value[Ba],na.array[pa]=Ma.x,na.array[pa+1]=Ma.y,pa+=2;else if(3===na.size)if("c"===na.type)for(Ba=0;Ba<yb;Ba++)Ma=na.value[Ba],na.array[pa]=Ma.r,na.array[pa+1]=Ma.g,na.array[pa+2]=Ma.b,pa+=3;else for(Ba=0;Ba<yb;Ba++)Ma=na.value[Ba],na.array[pa]=Ma.x,na.array[pa+1]=Ma.y,na.array[pa+2]=Ma.z,pa+=3;else if(4===na.size)for(Ba=0;Ba<yb;Ba++)Ma=na.value[Ba],na.array[pa]=Ma.x,na.array[pa+1]=Ma.y,na.array[pa+2]=Ma.z,na.array[pa+3]=Ma.w,pa+=4;m.bindBuffer(m.ARRAY_BUFFER,
na.buffer);m.bufferData(m.ARRAY_BUFFER,na.array,Wb)}}l.verticesNeedUpdate=!1;l.colorsNeedUpdate=!1;l.lineDistancesNeedUpdate=!1;s.attributes&&u(s)}else if(k instanceof THREE.ParticleSystem){s=d(k,l);n=s.attributes&&w(s);if(l.verticesNeedUpdate||l.colorsNeedUpdate||k.sortParticles||n){var ib=l,ic=m.DYNAMIC_DRAW,Ob=k,Na=void 0,jb=void 0,kb=void 0,T=void 0,lb=void 0,rb=void 0,bc=ib.vertices,jc=bc.length,kc=ib.colors,nc=kc.length,vb=ib.__vertexArray,wb=ib.__colorArray,mb=ib.__sortArray,oc=ib.verticesNeedUpdate,
pc=ib.colorsNeedUpdate,nb=ib.__webglCustomAttributesList,Za=void 0,zb=void 0,ca=void 0,$a=void 0,ka=void 0,S=void 0;if(Ob.sortParticles){cc.copy(Pb);cc.multiply(Ob.matrixWorld);for(Na=0;Na<jc;Na++)kb=bc[Na],xa.copy(kb),xa.applyProjection(cc),mb[Na]=[xa.z,Na];mb.sort(q);for(Na=0;Na<jc;Na++)kb=bc[mb[Na][1]],T=3*Na,vb[T]=kb.x,vb[T+1]=kb.y,vb[T+2]=kb.z;for(jb=0;jb<nc;jb++)T=3*jb,rb=kc[mb[jb][1]],wb[T]=rb.r,wb[T+1]=rb.g,wb[T+2]=rb.b;if(nb)for(Za=0,zb=nb.length;Za<zb;Za++)if(S=nb[Za],void 0===S.boundTo||
"vertices"===S.boundTo)if(T=0,$a=S.value.length,1===S.size)for(ca=0;ca<$a;ca++)lb=mb[ca][1],S.array[ca]=S.value[lb];else if(2===S.size)for(ca=0;ca<$a;ca++)lb=mb[ca][1],ka=S.value[lb],S.array[T]=ka.x,S.array[T+1]=ka.y,T+=2;else if(3===S.size)if("c"===S.type)for(ca=0;ca<$a;ca++)lb=mb[ca][1],ka=S.value[lb],S.array[T]=ka.r,S.array[T+1]=ka.g,S.array[T+2]=ka.b,T+=3;else for(ca=0;ca<$a;ca++)lb=mb[ca][1],ka=S.value[lb],S.array[T]=ka.x,S.array[T+1]=ka.y,S.array[T+2]=ka.z,T+=3;else if(4===S.size)for(ca=0;ca<
$a;ca++)lb=mb[ca][1],ka=S.value[lb],S.array[T]=ka.x,S.array[T+1]=ka.y,S.array[T+2]=ka.z,S.array[T+3]=ka.w,T+=4}else{if(oc)for(Na=0;Na<jc;Na++)kb=bc[Na],T=3*Na,vb[T]=kb.x,vb[T+1]=kb.y,vb[T+2]=kb.z;if(pc)for(jb=0;jb<nc;jb++)rb=kc[jb],T=3*jb,wb[T]=rb.r,wb[T+1]=rb.g,wb[T+2]=rb.b;if(nb)for(Za=0,zb=nb.length;Za<zb;Za++)if(S=nb[Za],S.needsUpdate&&(void 0===S.boundTo||"vertices"===S.boundTo))if($a=S.value.length,T=0,1===S.size)for(ca=0;ca<$a;ca++)S.array[ca]=S.value[ca];else if(2===S.size)for(ca=0;ca<$a;ca++)ka=
S.value[ca],S.array[T]=ka.x,S.array[T+1]=ka.y,T+=2;else if(3===S.size)if("c"===S.type)for(ca=0;ca<$a;ca++)ka=S.value[ca],S.array[T]=ka.r,S.array[T+1]=ka.g,S.array[T+2]=ka.b,T+=3;else for(ca=0;ca<$a;ca++)ka=S.value[ca],S.array[T]=ka.x,S.array[T+1]=ka.y,S.array[T+2]=ka.z,T+=3;else if(4===S.size)for(ca=0;ca<$a;ca++)ka=S.value[ca],S.array[T]=ka.x,S.array[T+1]=ka.y,S.array[T+2]=ka.z,S.array[T+3]=ka.w,T+=4}if(oc||Ob.sortParticles)m.bindBuffer(m.ARRAY_BUFFER,ib.__webglVertexBuffer),m.bufferData(m.ARRAY_BUFFER,
vb,ic);if(pc||Ob.sortParticles)m.bindBuffer(m.ARRAY_BUFFER,ib.__webglColorBuffer),m.bufferData(m.ARRAY_BUFFER,wb,ic);if(nb)for(Za=0,zb=nb.length;Za<zb;Za++)if(S=nb[Za],S.needsUpdate||Ob.sortParticles)m.bindBuffer(m.ARRAY_BUFFER,S.buffer),m.bufferData(m.ARRAY_BUFFER,S.array,ic)}l.verticesNeedUpdate=!1;l.colorsNeedUpdate=!1;s.attributes&&u(s)}}};this.initMaterial=function(a,b,c,d){var e,f,g,h;a.addEventListener("dispose",Sb);var k,l,p,n;a instanceof THREE.MeshDepthMaterial?n="depth":a instanceof THREE.MeshNormalMaterial?
n="normal":a instanceof THREE.MeshBasicMaterial?n="basic":a instanceof THREE.MeshLambertMaterial?n="lambert":a instanceof THREE.MeshPhongMaterial?n="phong":a instanceof THREE.LineBasicMaterial?n="basic":a instanceof THREE.LineDashedMaterial?n="dashed":a instanceof THREE.ParticleSystemMaterial&&(n="particle_basic");n&&(e=THREE.ShaderLib[n],a.uniforms=THREE.UniformsUtils.clone(e.uniforms),a.vertexShader=e.vertexShader,a.fragmentShader=e.fragmentShader);p=h=g=f=e=0;for(var q=b.length;p<q;p++){var r=
b[p];r.onlyShadow||!1===r.visible||(r instanceof THREE.DirectionalLight&&e++,r instanceof THREE.PointLight&&f++,r instanceof THREE.SpotLight&&g++,r instanceof THREE.HemisphereLight&&h++)}q=p=0;for(r=b.length;q<r;q++){var s=b[q];s.castShadow&&(s instanceof THREE.SpotLight&&p++,s instanceof THREE.DirectionalLight&&!s.shadowCascade&&p++)}b=p;Gb&&d&&d.skeleton&&d.skeleton.useVertexTexture?p=1024:(p=m.getParameter(m.MAX_VERTEX_UNIFORM_VECTORS),p=Math.floor((p-20)/4),void 0!==d&&d instanceof THREE.SkinnedMesh&&
(p=Math.min(d.skeleton.bones.length,p),p<d.skeleton.bones.length&&console.warn("WebGLRenderer: too many bones - "+d.skeleton.bones.length+", this GPU supports just "+p+" (try OpenGL instead of ANGLE)")));c={precision:Q,supportsVertexTextures:Jb,map:!!a.map,envMap:!!a.envMap,lightMap:!!a.lightMap,bumpMap:!!a.bumpMap,normalMap:!!a.normalMap,specularMap:!!a.specularMap,vertexColors:a.vertexColors,fog:c,useFog:a.fog,fogExp:c instanceof THREE.FogExp2,sizeAttenuation:a.sizeAttenuation,logarithmicDepthBuffer:da,
skinning:a.skinning,maxBones:p,useVertexTexture:Gb&&d&&d.skeleton&&d.skeleton.useVertexTexture,morphTargets:a.morphTargets,morphNormals:a.morphNormals,maxMorphTargets:this.maxMorphTargets,maxMorphNormals:this.maxMorphNormals,maxDirLights:e,maxPointLights:f,maxSpotLights:g,maxHemiLights:h,maxShadows:b,shadowMapEnabled:this.shadowMapEnabled&&d.receiveShadow&&0<b,shadowMapType:this.shadowMapType,shadowMapDebug:this.shadowMapDebug,shadowMapCascade:this.shadowMapCascade,alphaTest:a.alphaTest,metal:a.metal,
wrapAround:a.wrapAround,doubleSided:a.side===THREE.DoubleSide,flipSided:a.side===THREE.BackSide};d=[];n?d.push(n):(d.push(a.fragmentShader),d.push(a.vertexShader));for(var u in a.defines)d.push(u),d.push(a.defines[u]);for(l in c)d.push(l),d.push(c[l]);n=d.join();var t;l=0;for(u=ga.length;l<u;l++)if(d=ga[l],d.code===n){t=d;t.usedTimes++;break}void 0===t&&(t=new THREE.WebGLProgram(this,n,a,c),ga.push(t),P.info.memory.programs=ga.length);a.program=t;t=a.program.attributes;if(a.morphTargets)for(a.numSupportedMorphTargets=
0,u="morphTarget",l=0;l<this.maxMorphTargets;l++)n=u+l,0<=t[n]&&a.numSupportedMorphTargets++;if(a.morphNormals)for(a.numSupportedMorphNormals=0,u="morphNormal",l=0;l<this.maxMorphNormals;l++)n=u+l,0<=t[n]&&a.numSupportedMorphNormals++;a.uniformsList=[];for(k in a.uniforms)a.uniformsList.push([a.uniforms[k],k])};this.setFaceCulling=function(a,b){a===THREE.CullFaceNone?m.disable(m.CULL_FACE):(b===THREE.FrontFaceDirectionCW?m.frontFace(m.CW):m.frontFace(m.CCW),a===THREE.CullFaceBack?m.cullFace(m.BACK):
a===THREE.CullFaceFront?m.cullFace(m.FRONT):m.cullFace(m.FRONT_AND_BACK),m.enable(m.CULL_FACE))};this.setMaterialFaces=function(a){var b=a.side===THREE.DoubleSide;a=a.side===THREE.BackSide;Ga!==b&&(b?m.disable(m.CULL_FACE):m.enable(m.CULL_FACE),Ga=b);ha!==a&&(a?m.frontFace(m.CW):m.frontFace(m.CCW),ha=a)};this.setDepthTest=function(a){ia!==a&&(a?m.enable(m.DEPTH_TEST):m.disable(m.DEPTH_TEST),ia=a)};this.setDepthWrite=function(a){ma!==a&&(m.depthMask(a),ma=a)};this.setBlending=function(a,b,c,d){a!==
Oa&&(a===THREE.NoBlending?m.disable(m.BLEND):a===THREE.AdditiveBlending?(m.enable(m.BLEND),m.blendEquation(m.FUNC_ADD),m.blendFunc(m.SRC_ALPHA,m.ONE)):a===THREE.SubtractiveBlending?(m.enable(m.BLEND),m.blendEquation(m.FUNC_ADD),m.blendFunc(m.ZERO,m.ONE_MINUS_SRC_COLOR)):a===THREE.MultiplyBlending?(m.enable(m.BLEND),m.blendEquation(m.FUNC_ADD),m.blendFunc(m.ZERO,m.SRC_COLOR)):a===THREE.CustomBlending?m.enable(m.BLEND):(m.enable(m.BLEND),m.blendEquationSeparate(m.FUNC_ADD,m.FUNC_ADD),m.blendFuncSeparate(m.SRC_ALPHA,
m.ONE_MINUS_SRC_ALPHA,m.ONE,m.ONE_MINUS_SRC_ALPHA)),Oa=a);if(a===THREE.CustomBlending){if(b!==Ra&&(m.blendEquation(z(b)),Ra=b),c!==Sa||d!==Fa)m.blendFunc(z(c),z(d)),Sa=c,Fa=d}else Fa=Sa=Ra=null};this.setTexture=function(a,b){if(a.needsUpdate){a.__webglInit||(a.__webglInit=!0,a.addEventListener("dispose",Hb),a.__webglTexture=m.createTexture(),P.info.memory.textures++);m.activeTexture(m.TEXTURE0+b);m.bindTexture(m.TEXTURE_2D,a.__webglTexture);m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,a.flipY);m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
a.premultiplyAlpha);m.pixelStorei(m.UNPACK_ALIGNMENT,a.unpackAlignment);var c=a.image,d=THREE.Math.isPowerOfTwo(c.width)&&THREE.Math.isPowerOfTwo(c.height),e=z(a.format),f=z(a.type);D(m.TEXTURE_2D,a,d);var g=a.mipmaps;if(a instanceof THREE.DataTexture)if(0<g.length&&d){for(var h=0,k=g.length;h<k;h++)c=g[h],m.texImage2D(m.TEXTURE_2D,h,e,c.width,c.height,0,e,f,c.data);a.generateMipmaps=!1}else m.texImage2D(m.TEXTURE_2D,0,e,c.width,c.height,0,e,f,c.data);else if(a instanceof THREE.CompressedTexture)for(h=
0,k=g.length;h<k;h++)c=g[h],a.format!==THREE.RGBAFormat?m.compressedTexImage2D(m.TEXTURE_2D,h,e,c.width,c.height,0,c.data):m.texImage2D(m.TEXTURE_2D,h,e,c.width,c.height,0,e,f,c.data);else if(0<g.length&&d){h=0;for(k=g.length;h<k;h++)c=g[h],m.texImage2D(m.TEXTURE_2D,h,e,e,f,c);a.generateMipmaps=!1}else m.texImage2D(m.TEXTURE_2D,0,e,e,f,a.image);a.generateMipmaps&&d&&m.generateMipmap(m.TEXTURE_2D);a.needsUpdate=!1;if(a.onUpdate)a.onUpdate()}else m.activeTexture(m.TEXTURE0+b),m.bindTexture(m.TEXTURE_2D,
a.__webglTexture)};this.setRenderTarget=function(a){var b=a instanceof THREE.WebGLRenderTargetCube;if(a&&!a.__webglFramebuffer){void 0===a.depthBuffer&&(a.depthBuffer=!0);void 0===a.stencilBuffer&&(a.stencilBuffer=!0);a.addEventListener("dispose",Rb);a.__webglTexture=m.createTexture();P.info.memory.textures++;var c=THREE.Math.isPowerOfTwo(a.width)&&THREE.Math.isPowerOfTwo(a.height),d=z(a.format),e=z(a.type);if(b){a.__webglFramebuffer=[];a.__webglRenderbuffer=[];m.bindTexture(m.TEXTURE_CUBE_MAP,a.__webglTexture);
D(m.TEXTURE_CUBE_MAP,a,c);for(var f=0;6>f;f++){a.__webglFramebuffer[f]=m.createFramebuffer();a.__webglRenderbuffer[f]=m.createRenderbuffer();m.texImage2D(m.TEXTURE_CUBE_MAP_POSITIVE_X+f,0,d,a.width,a.height,0,d,e,null);var g=a,h=m.TEXTURE_CUBE_MAP_POSITIVE_X+f;m.bindFramebuffer(m.FRAMEBUFFER,a.__webglFramebuffer[f]);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,h,g.__webglTexture,0);C(a.__webglRenderbuffer[f],a)}c&&m.generateMipmap(m.TEXTURE_CUBE_MAP)}else a.__webglFramebuffer=m.createFramebuffer(),
a.__webglRenderbuffer=a.shareDepthFrom?a.shareDepthFrom.__webglRenderbuffer:m.createRenderbuffer(),m.bindTexture(m.TEXTURE_2D,a.__webglTexture),D(m.TEXTURE_2D,a,c),m.texImage2D(m.TEXTURE_2D,0,d,a.width,a.height,0,d,e,null),d=m.TEXTURE_2D,m.bindFramebuffer(m.FRAMEBUFFER,a.__webglFramebuffer),m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,d,a.__webglTexture,0),a.shareDepthFrom?a.depthBuffer&&!a.stencilBuffer?m.framebufferRenderbuffer(m.FRAMEBUFFER,m.DEPTH_ATTACHMENT,m.RENDERBUFFER,a.__webglRenderbuffer):
a.depthBuffer&&a.stencilBuffer&&m.framebufferRenderbuffer(m.FRAMEBUFFER,m.DEPTH_STENCIL_ATTACHMENT,m.RENDERBUFFER,a.__webglRenderbuffer):C(a.__webglRenderbuffer,a),c&&m.generateMipmap(m.TEXTURE_2D);b?m.bindTexture(m.TEXTURE_CUBE_MAP,null):m.bindTexture(m.TEXTURE_2D,null);m.bindRenderbuffer(m.RENDERBUFFER,null);m.bindFramebuffer(m.FRAMEBUFFER,null)}a?(b=b?a.__webglFramebuffer[a.activeCubeFace]:a.__webglFramebuffer,c=a.width,a=a.height,e=d=0):(b=null,c=Da,a=Ja,d=Ca,e=va);b!==Ha&&(m.bindFramebuffer(m.FRAMEBUFFER,
b),m.viewport(d,e,c,a),Ha=b);ja=c;ra=a};this.shadowMapPlugin=new THREE.ShadowMapPlugin;this.addPrePlugin(this.shadowMapPlugin);this.addPostPlugin(new THREE.SpritePlugin);this.addPostPlugin(new THREE.LensFlarePlugin)};THREE.WebGLRenderTarget=function(a,b,c){this.width=a;this.height=b;c=c||{};this.wrapS=void 0!==c.wrapS?c.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==c.wrapT?c.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==c.magFilter?c.magFilter:THREE.LinearFilter;this.minFilter=void 0!==c.minFilter?c.minFilter:THREE.LinearMipMapLinearFilter;this.anisotropy=void 0!==c.anisotropy?c.anisotropy:1;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=void 0!==c.format?c.format:
THREE.RGBAFormat;this.type=void 0!==c.type?c.type:THREE.UnsignedByteType;this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0;this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0;this.generateMipmaps=!0;this.shareDepthFrom=null};
THREE.WebGLRenderTarget.prototype={constructor:THREE.WebGLRenderTarget,setSize:function(a,b){this.width=a;this.height=b},clone:function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;a.anisotropy=this.anisotropy;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.format=this.format;a.type=this.type;a.depthBuffer=this.depthBuffer;a.stencilBuffer=this.stencilBuffer;a.generateMipmaps=this.generateMipmaps;
a.shareDepthFrom=this.shareDepthFrom;return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);THREE.WebGLRenderTargetCube=function(a,b,c){THREE.WebGLRenderTarget.call(this,a,b,c);this.activeCubeFace=0};THREE.WebGLRenderTargetCube.prototype=Object.create(THREE.WebGLRenderTarget.prototype);THREE.WebGLProgram=function(){var a=0;return function(b,c,d,e){var f=b.context,g=d.fragmentShader,h=d.vertexShader,k=d.uniforms,l=d.attributes,n=d.defines,q=d.index0AttributeName;void 0===q&&!0===e.morphTargets&&(q="position");var p="SHADOWMAP_TYPE_BASIC";e.shadowMapType===THREE.PCFShadowMap?p="SHADOWMAP_TYPE_PCF":e.shadowMapType===THREE.PCFSoftShadowMap&&(p="SHADOWMAP_TYPE_PCF_SOFT");var s,t;s=[];for(var r in n)t=n[r],!1!==t&&(t="#define "+r+" "+t,s.push(t));s=s.join("\n");n=f.createProgram();d instanceof
THREE.RawShaderMaterial?b=d="":(d=["precision "+e.precision+" float;","precision "+e.precision+" int;",s,e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",b.gammaInput?"#define GAMMA_INPUT":"",b.gammaOutput?"#define GAMMA_OUTPUT":"","#define MAX_DIR_LIGHTS "+e.maxDirLights,"#define MAX_POINT_LIGHTS "+e.maxPointLights,"#define MAX_SPOT_LIGHTS "+e.maxSpotLights,"#define MAX_HEMI_LIGHTS "+e.maxHemiLights,"#define MAX_SHADOWS "+e.maxShadows,"#define MAX_BONES "+e.maxBones,e.map?"#define USE_MAP":
"",e.envMap?"#define USE_ENVMAP":"",e.lightMap?"#define USE_LIGHTMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.vertexColors?"#define USE_COLOR":"",e.skinning?"#define USE_SKINNING":"",e.useVertexTexture?"#define BONE_TEXTURE":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals?"#define USE_MORPHNORMALS":"",e.wrapAround?"#define WRAP_AROUND":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":
"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+p:"",e.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",e.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\n\tattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\n\tattribute vec3 morphTarget0;\n\tattribute vec3 morphTarget1;\n\tattribute vec3 morphTarget2;\n\tattribute vec3 morphTarget3;\n\t#ifdef USE_MORPHNORMALS\n\t\tattribute vec3 morphNormal0;\n\t\tattribute vec3 morphNormal1;\n\t\tattribute vec3 morphNormal2;\n\t\tattribute vec3 morphNormal3;\n\t#else\n\t\tattribute vec3 morphTarget4;\n\t\tattribute vec3 morphTarget5;\n\t\tattribute vec3 morphTarget6;\n\t\tattribute vec3 morphTarget7;\n\t#endif\n#endif\n#ifdef USE_SKINNING\n\tattribute vec4 skinIndex;\n\tattribute vec4 skinWeight;\n#endif\n"].join("\n"),
b=["precision "+e.precision+" float;","precision "+e.precision+" int;",e.bumpMap||e.normalMap?"#extension GL_OES_standard_derivatives : enable":"",s,"#define MAX_DIR_LIGHTS "+e.maxDirLights,"#define MAX_POINT_LIGHTS "+e.maxPointLights,"#define MAX_SPOT_LIGHTS "+e.maxSpotLights,"#define MAX_HEMI_LIGHTS "+e.maxHemiLights,"#define MAX_SHADOWS "+e.maxShadows,e.alphaTest?"#define ALPHATEST "+e.alphaTest:"",b.gammaInput?"#define GAMMA_INPUT":"",b.gammaOutput?"#define GAMMA_OUTPUT":"",e.useFog&&e.fog?"#define USE_FOG":
"",e.useFog&&e.fogExp?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.lightMap?"#define USE_LIGHTMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.vertexColors?"#define USE_COLOR":"",e.metal?"#define METAL":"",e.wrapAround?"#define WRAP_AROUND":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?
"#define "+p:"",e.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",e.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n"));h=new THREE.WebGLShader(f,f.VERTEX_SHADER,d+h);g=new THREE.WebGLShader(f,f.FRAGMENT_SHADER,b+g);f.attachShader(n,h);f.attachShader(n,g);void 0!==q&&f.bindAttribLocation(n,0,q);f.linkProgram(n);!1===f.getProgramParameter(n,f.LINK_STATUS)&&(console.error("Could not initialise shader"),
console.error("gl.VALIDATE_STATUS",f.getProgramParameter(n,f.VALIDATE_STATUS)),console.error("gl.getError()",f.getError()));""!==f.getProgramInfoLog(n)&&console.error("gl.getProgramInfoLog()",f.getProgramInfoLog(n));f.deleteShader(h);f.deleteShader(g);q="viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");e.useVertexTexture?(q.push("boneTexture"),q.push("boneTextureWidth"),q.push("boneTextureHeight")):q.push("boneGlobalMatrices");e.logarithmicDepthBuffer&&
q.push("logDepthBufFC");for(var v in k)q.push(v);k=q;v={};q=0;for(b=k.length;q<b;q++)p=k[q],v[p]=f.getUniformLocation(n,p);this.uniforms=v;q="position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");for(k=0;k<e.maxMorphTargets;k++)q.push("morphTarget"+k);for(k=0;k<e.maxMorphNormals;k++)q.push("morphNormal"+k);for(var w in l)q.push(w);e=q;l={};w=0;for(k=e.length;w<k;w++)v=e[w],l[v]=f.getAttribLocation(n,v);this.attributes=l;this.id=a++;this.code=c;this.usedTimes=1;this.program=
n;this.vertexShader=h;this.fragmentShader=g;return this}}();THREE.WebGLShader=function(){var a=function(a){a=a.split("\n");for(var c=0;c<a.length;c++)a[c]=c+1+": "+a[c];return a.join("\n")};return function(b,c,d){c=b.createShader(c);b.shaderSource(c,d);b.compileShader(c);!1===b.getShaderParameter(c,b.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile.");""!==b.getShaderInfoLog(c)&&(console.error("THREE.WebGLShader:","gl.getShaderInfoLog()",b.getShaderInfoLog(c)),console.error(a(d)));return c}}();THREE.RenderableVertex=function(){this.position=new THREE.Vector3;this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld);this.positionScreen.copy(a.positionScreen)};THREE.RenderableFace=function(){this.id=0;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.normalModel=new THREE.Vector3;this.vertexNormalsModel=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.vertexNormalsLength=0;this.material=this.color=null;this.uvs=[new THREE.Vector2,new THREE.Vector2,new THREE.Vector2];this.z=0};THREE.RenderableObject=function(){this.id=0;this.object=null;this.z=0};THREE.RenderableSprite=function(){this.id=0;this.object=null;this.rotation=this.z=this.y=this.x=0;this.scale=new THREE.Vector2;this.material=null};THREE.RenderableLine=function(){this.id=0;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.vertexColors=[new THREE.Color,new THREE.Color];this.material=null;this.z=0};THREE.GeometryUtils={merge:function(a,b,c){console.warn("DEPRECATED: GeometryUtils's .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");var d;b instanceof THREE.Mesh&&(b.matrixAutoUpdate&&b.updateMatrix(),d=b.matrix,b=b.geometry);a.merge(b,d,c)},randomPointInTriangle:function(){var a=new THREE.Vector3;return function(b,c,d){var e=new THREE.Vector3,f=THREE.Math.random16(),g=THREE.Math.random16();1<f+g&&(f=1-f,g=1-g);var h=1-f-g;e.copy(b);e.multiplyScalar(f);
a.copy(c);a.multiplyScalar(g);e.add(a);a.copy(d);a.multiplyScalar(h);e.add(a);return e}}(),randomPointInFace:function(a,b,c){return THREE.GeometryUtils.randomPointInTriangle(b.vertices[a.a],b.vertices[a.b],b.vertices[a.c])},randomPointsInGeometry:function(a,b){function c(a){function b(c,d){if(d<c)return c;var e=c+Math.floor((d-c)/2);return l[e]>a?b(c,e-1):l[e]<a?b(e+1,d):e}return b(0,l.length-1)}var d,e,f=a.faces,g=a.vertices,h=f.length,k=0,l=[],n,q,p;for(e=0;e<h;e++)d=f[e],n=g[d.a],q=g[d.b],p=g[d.c],
d._area=THREE.GeometryUtils.triangleArea(n,q,p),k+=d._area,l[e]=k;d=[];for(e=0;e<b;e++)g=THREE.Math.random16()*k,g=c(g),d[e]=THREE.GeometryUtils.randomPointInFace(f[g],a,!0);return d},triangleArea:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d,e){a.subVectors(d,c);b.subVectors(e,c);a.cross(b);return 0.5*a.length()}}(),center:function(a){a.computeBoundingBox();var b=a.boundingBox,c=new THREE.Vector3;c.addVectors(b.min,b.max);c.multiplyScalar(-0.5);a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x,
c.y,c.z));a.computeBoundingBox();return c}};THREE.ImageUtils={crossOrigin:void 0,loadTexture:function(a,b,c,d){var e=new THREE.ImageLoader;e.crossOrigin=this.crossOrigin;var f=new THREE.Texture(void 0,b);b=e.load(a,function(){f.needsUpdate=!0;c&&c(f)},void 0,function(a){d&&d(a)});f.image=b;f.sourceFile=a;return f},loadCompressedTexture:function(a,b,c,d){var e=new THREE.CompressedTexture;e.mapping=b;var f=new XMLHttpRequest;f.onload=function(){var a=THREE.ImageUtils.parseDDS(f.response,!0);e.format=a.format;e.mipmaps=a.mipmaps;e.image.width=
a.width;e.image.height=a.height;e.generateMipmaps=!1;e.needsUpdate=!0;c&&c(e)};f.onerror=d;f.open("GET",a,!0);f.responseType="arraybuffer";f.send(null);return e},loadTextureCube:function(a,b,c,d){var e=[];e.loadCount=0;d=new THREE.ImageLoader;d.crossOrigin=this.crossOrigin;var f=new THREE.Texture;f.image=e;void 0!==b&&(f.mapping=b);f.flipY=!1;b=0;for(var g=a.length;b<g;++b){var h=d.load(a[b],function(){e.loadCount+=1;6===e.loadCount&&(f.needsUpdate=!0,c&&c(f))});e[b]=h}return f},loadCompressedTextureCube:function(a,
b,c,d){var e=[];e.loadCount=0;var f=new THREE.CompressedTexture;f.image=e;void 0!==b&&(f.mapping=b);f.flipY=!1;f.generateMipmaps=!1;b=function(a,b){return function(){var d=THREE.ImageUtils.parseDDS(a.response,!0);b.format=d.format;b.mipmaps=d.mipmaps;b.width=d.width;b.height=d.height;e.loadCount+=1;6===e.loadCount&&(f.format=d.format,f.needsUpdate=!0,c&&c(f))}};if(a instanceof Array)for(var g=0,h=a.length;g<h;++g){var k={};e[g]=k;var l=new XMLHttpRequest;l.onload=b(l,k);l.onerror=d;k=a[g];l.open("GET",
k,!0);l.responseType="arraybuffer";l.send(null)}else l=new XMLHttpRequest,l.onload=function(){var a=THREE.ImageUtils.parseDDS(l.response,!0);if(a.isCubemap){for(var b=a.mipmaps.length/a.mipmapCount,d=0;d<b;d++){e[d]={mipmaps:[]};for(var g=0;g<a.mipmapCount;g++)e[d].mipmaps.push(a.mipmaps[d*a.mipmapCount+g]),e[d].format=a.format,e[d].width=a.width,e[d].height=a.height}f.format=a.format;f.needsUpdate=!0;c&&c(f)}},l.onerror=d,l.open("GET",a,!0),l.responseType="arraybuffer",l.send(null);return f},loadDDSTexture:function(a,
b,c,d){var e=[];e.loadCount=0;var f=new THREE.CompressedTexture;f.image=e;void 0!==b&&(f.mapping=b);f.flipY=!1;f.generateMipmaps=!1;var g=new XMLHttpRequest;g.onload=function(){var a=THREE.ImageUtils.parseDDS(g.response,!0);if(a.isCubemap)for(var b=a.mipmaps.length/a.mipmapCount,d=0;d<b;d++){e[d]={mipmaps:[]};for(var n=0;n<a.mipmapCount;n++)e[d].mipmaps.push(a.mipmaps[d*a.mipmapCount+n]),e[d].format=a.format,e[d].width=a.width,e[d].height=a.height}else f.image.width=a.width,f.image.height=a.height,
f.mipmaps=a.mipmaps;f.format=a.format;f.needsUpdate=!0;c&&c(f)};g.onerror=d;g.open("GET",a,!0);g.responseType="arraybuffer";g.send(null);return f},parseDDS:function(a,b){function c(a){return a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)}function d(a,b,c,d){var e=c*d*4;a=new Uint8Array(a,b,e);for(var e=new Uint8Array(e),f=b=0,g=0;g<d;g++)for(var h=0;h<c;h++){var k=a[f];f++;var l=a[f];f++;var p=a[f];f++;var n=a[f];f++;e[b]=p;b++;e[b]=l;b++;e[b]=k;b++;e[b]=n;b++}return e}
var e={mipmaps:[],width:0,height:0,format:null,mipmapCount:1},f=c("DXT1"),g=c("DXT3"),h=c("DXT5"),k=new Int32Array(a,0,31);if(542327876!==k[0])return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"),e;if(!k[20]&4)return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"),e;var l=k[21],n=!1;switch(l){case f:f=8;e.format=THREE.RGB_S3TC_DXT1_Format;break;case g:f=16;e.format=THREE.RGBA_S3TC_DXT3_Format;break;case h:f=16;e.format=THREE.RGBA_S3TC_DXT5_Format;
break;default:if(32==k[22]&&k[23]&16711680&&k[24]&65280&&k[25]&255&&k[26]&4278190080)n=!0,f=64,e.format=THREE.RGBAFormat;else return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ",String.fromCharCode(l&255,l>>8&255,l>>16&255,l>>24&255)),e}e.mipmapCount=1;k[2]&131072&&!1!==b&&(e.mipmapCount=Math.max(1,k[7]));e.isCubemap=k[28]&512?!0:!1;e.width=k[4];e.height=k[3];for(var k=k[1]+4,g=e.width,h=e.height,l=e.isCubemap?6:1,q=0;q<l;q++){for(var p=0;p<e.mipmapCount;p++){if(n)var s=d(a,k,
g,h),t=s.length;else t=Math.max(4,g)/4*Math.max(4,h)/4*f,s=new Uint8Array(a,k,t);e.mipmaps.push({data:s,width:g,height:h});k+=t;g=Math.max(0.5*g,1);h=Math.max(0.5*h,1)}g=e.width;h=e.height}return e},getNormalMap:function(a,b){var c=function(a){var b=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);return[a[0]/b,a[1]/b,a[2]/b]};b|=1;var d=a.width,e=a.height,f=document.createElement("canvas");f.width=d;f.height=e;var g=f.getContext("2d");g.drawImage(a,0,0);for(var h=g.getImageData(0,0,d,e).data,k=g.createImageData(d,
e),l=k.data,n=0;n<d;n++)for(var q=0;q<e;q++){var p=0>q-1?0:q-1,s=q+1>e-1?e-1:q+1,t=0>n-1?0:n-1,r=n+1>d-1?d-1:n+1,v=[],w=[0,0,h[4*(q*d+n)]/255*b];v.push([-1,0,h[4*(q*d+t)]/255*b]);v.push([-1,-1,h[4*(p*d+t)]/255*b]);v.push([0,-1,h[4*(p*d+n)]/255*b]);v.push([1,-1,h[4*(p*d+r)]/255*b]);v.push([1,0,h[4*(q*d+r)]/255*b]);v.push([1,1,h[4*(s*d+r)]/255*b]);v.push([0,1,h[4*(s*d+n)]/255*b]);v.push([-1,1,h[4*(s*d+t)]/255*b]);p=[];t=v.length;for(s=0;s<t;s++){var r=v[s],u=v[(s+1)%t],r=[r[0]-w[0],r[1]-w[1],r[2]-w[2]],
u=[u[0]-w[0],u[1]-w[1],u[2]-w[2]];p.push(c([r[1]*u[2]-r[2]*u[1],r[2]*u[0]-r[0]*u[2],r[0]*u[1]-r[1]*u[0]]))}v=[0,0,0];for(s=0;s<p.length;s++)v[0]+=p[s][0],v[1]+=p[s][1],v[2]+=p[s][2];v[0]/=p.length;v[1]/=p.length;v[2]/=p.length;w=4*(q*d+n);l[w]=(v[0]+1)/2*255|0;l[w+1]=(v[1]+1)/2*255|0;l[w+2]=255*v[2]|0;l[w+3]=255}g.putImageData(k,0,0);return f},generateDataTexture:function(a,b,c){var d=a*b,e=new Uint8Array(3*d),f=Math.floor(255*c.r),g=Math.floor(255*c.g);c=Math.floor(255*c.b);for(var h=0;h<d;h++)e[3*
h]=f,e[3*h+1]=g,e[3*h+2]=c;a=new THREE.DataTexture(e,a,b,THREE.RGBFormat);a.needsUpdate=!0;return a}};THREE.SceneUtils={createMultiMaterialObject:function(a,b){for(var c=new THREE.Object3D,d=0,e=b.length;d<e;d++)c.add(new THREE.Mesh(a,b[d]));return c},detach:function(a,b,c){a.applyMatrix(b.matrixWorld);b.remove(a);c.add(a)},attach:function(a,b,c){var d=new THREE.Matrix4;d.getInverse(c.matrixWorld);a.applyMatrix(d);b.remove(a);c.add(a)}};THREE.FontUtils={faces:{},face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){return this.faces[this.face][this.weight][this.style]},loadFace:function(a){var b=a.familyName.toLowerCase();this.faces[b]=this.faces[b]||{};this.faces[b][a.cssFontWeight]=this.faces[b][a.cssFontWeight]||{};this.faces[b][a.cssFontWeight][a.cssFontStyle]=a;return this.faces[b][a.cssFontWeight][a.cssFontStyle]=a},drawText:function(a){var b=this.getFace(),c=this.size/b.resolution,d=0,e=
String(a).split(""),f=e.length,g=[];for(a=0;a<f;a++){var h=new THREE.Path,h=this.extractGlyphPoints(e[a],b,c,d,h),d=d+h.offset;g.push(h.path)}return{paths:g,offset:d/2}},extractGlyphPoints:function(a,b,c,d,e){var f=[],g,h,k,l,n,q,p,s,t,r,v,w=b.glyphs[a]||b.glyphs["?"];if(w){if(w.o)for(b=w._cachedOutline||(w._cachedOutline=w.o.split(" ")),l=b.length,a=0;a<l;)switch(k=b[a++],k){case "m":k=b[a++]*c+d;n=b[a++]*c;e.moveTo(k,n);break;case "l":k=b[a++]*c+d;n=b[a++]*c;e.lineTo(k,n);break;case "q":k=b[a++]*
c+d;n=b[a++]*c;s=b[a++]*c+d;t=b[a++]*c;e.quadraticCurveTo(s,t,k,n);if(g=f[f.length-1])for(q=g.x,p=g.y,g=1,h=this.divisions;g<=h;g++){var u=g/h;THREE.Shape.Utils.b2(u,q,s,k);THREE.Shape.Utils.b2(u,p,t,n)}break;case "b":if(k=b[a++]*c+d,n=b[a++]*c,s=b[a++]*c+d,t=b[a++]*-c,r=b[a++]*c+d,v=b[a++]*-c,e.bezierCurveTo(k,n,s,t,r,v),g=f[f.length-1])for(q=g.x,p=g.y,g=1,h=this.divisions;g<=h;g++)u=g/h,THREE.Shape.Utils.b3(u,q,s,r,k),THREE.Shape.Utils.b3(u,p,t,v,n)}return{offset:w.ha*c,path:e}}}};
THREE.FontUtils.generateShapes=function(a,b){b=b||{};var c=void 0!==b.curveSegments?b.curveSegments:4,d=void 0!==b.font?b.font:"helvetiker",e=void 0!==b.weight?b.weight:"normal",f=void 0!==b.style?b.style:"normal";THREE.FontUtils.size=void 0!==b.size?b.size:100;THREE.FontUtils.divisions=c;THREE.FontUtils.face=d;THREE.FontUtils.weight=e;THREE.FontUtils.style=f;c=THREE.FontUtils.drawText(a).paths;d=[];e=0;for(f=c.length;e<f;e++)Array.prototype.push.apply(d,c[e].toShapes());return d};
(function(a){var b=function(a){for(var b=a.length,e=0,f=b-1,g=0;g<b;f=g++)e+=a[f].x*a[g].y-a[g].x*a[f].y;return 0.5*e};a.Triangulate=function(a,d){var e=a.length;if(3>e)return null;var f=[],g=[],h=[],k,l,n;if(0<b(a))for(l=0;l<e;l++)g[l]=l;else for(l=0;l<e;l++)g[l]=e-1-l;var q=2*e;for(l=e-1;2<e;){if(0>=q--){console.log("Warning, unable to triangulate polygon!");break}k=l;e<=k&&(k=0);l=k+1;e<=l&&(l=0);n=l+1;e<=n&&(n=0);var p;a:{var s=p=void 0,t=void 0,r=void 0,v=void 0,w=void 0,u=void 0,y=void 0,L=
void 0,s=a[g[k]].x,t=a[g[k]].y,r=a[g[l]].x,v=a[g[l]].y,w=a[g[n]].x,u=a[g[n]].y;if(1E-10>(r-s)*(u-t)-(v-t)*(w-s))p=!1;else{var x=void 0,N=void 0,J=void 0,B=void 0,K=void 0,A=void 0,G=void 0,D=void 0,C=void 0,F=void 0,C=D=G=L=y=void 0,x=w-r,N=u-v,J=s-w,B=t-u,K=r-s,A=v-t;for(p=0;p<e;p++)if(y=a[g[p]].x,L=a[g[p]].y,!(y===s&&L===t||y===r&&L===v||y===w&&L===u)&&(G=y-s,D=L-t,C=y-r,F=L-v,y-=w,L-=u,C=x*F-N*C,G=K*D-A*G,D=J*L-B*y,-1E-10<=C&&-1E-10<=D&&-1E-10<=G)){p=!1;break a}p=!0}}if(p){f.push([a[g[k]],a[g[l]],
a[g[n]]]);h.push([g[k],g[l],g[n]]);k=l;for(n=l+1;n<e;k++,n++)g[k]=g[n];e--;q=2*e}}return d?h:f};a.Triangulate.area=b;return a})(THREE.FontUtils);self._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};THREE.typeface_js=self._typeface_js;THREE.Curve=function(){};THREE.Curve.prototype.getPoint=function(a){console.log("Warning, getPoint() not implemented!");return null};THREE.Curve.prototype.getPointAt=function(a){a=this.getUtoTmapping(a);return this.getPoint(a)};THREE.Curve.prototype.getPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPoint(b/a));return c};THREE.Curve.prototype.getSpacedPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPointAt(b/a));return c};
THREE.Curve.prototype.getLength=function(){var a=this.getLengths();return a[a.length-1]};THREE.Curve.prototype.getLengths=function(a){a||(a=this.__arcLengthDivisions?this.__arcLengthDivisions:200);if(this.cacheArcLengths&&this.cacheArcLengths.length==a+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var b=[],c,d=this.getPoint(0),e,f=0;b.push(0);for(e=1;e<=a;e++)c=this.getPoint(e/a),f+=c.distanceTo(d),b.push(f),d=c;return this.cacheArcLengths=b};
THREE.Curve.prototype.updateArcLengths=function(){this.needsUpdate=!0;this.getLengths()};THREE.Curve.prototype.getUtoTmapping=function(a,b){var c=this.getLengths(),d=0,e=c.length,f;f=b?b:a*c[e-1];for(var g=0,h=e-1,k;g<=h;)if(d=Math.floor(g+(h-g)/2),k=c[d]-f,0>k)g=d+1;else if(0<k)h=d-1;else{h=d;break}d=h;if(c[d]==f)return d/(e-1);g=c[d];return c=(d+(f-g)/(c[d+1]-g))/(e-1)};THREE.Curve.prototype.getTangent=function(a){var b=a-1E-4;a+=1E-4;0>b&&(b=0);1<a&&(a=1);b=this.getPoint(b);return this.getPoint(a).clone().sub(b).normalize()};
THREE.Curve.prototype.getTangentAt=function(a){a=this.getUtoTmapping(a);return this.getTangent(a)};
THREE.Curve.Utils={tangentQuadraticBezier:function(a,b,c,d){return 2*(1-a)*(c-b)+2*a*(d-c)},tangentCubicBezier:function(a,b,c,d,e){return-3*b*(1-a)*(1-a)+3*c*(1-a)*(1-a)-6*a*c*(1-a)+6*a*d*(1-a)-3*a*a*d+3*a*a*e},tangentSpline:function(a,b,c,d,e){return 6*a*a-6*a+(3*a*a-4*a+1)+(-6*a*a+6*a)+(3*a*a-2*a)},interpolate:function(a,b,c,d,e){a=0.5*(c-a);d=0.5*(d-b);var f=e*e;return(2*b-2*c+a+d)*e*f+(-3*b+3*c-2*a-d)*f+a*e+b}};
THREE.Curve.create=function(a,b){a.prototype=Object.create(THREE.Curve.prototype);a.prototype.getPoint=b;return a};THREE.CurvePath=function(){this.curves=[];this.bends=[];this.autoClose=!1};THREE.CurvePath.prototype=Object.create(THREE.Curve.prototype);THREE.CurvePath.prototype.add=function(a){this.curves.push(a)};THREE.CurvePath.prototype.checkConnection=function(){};THREE.CurvePath.prototype.closePath=function(){var a=this.curves[0].getPoint(0),b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new THREE.LineCurve(b,a))};
THREE.CurvePath.prototype.getPoint=function(a){var b=a*this.getLength(),c=this.getCurveLengths();for(a=0;a<c.length;){if(c[a]>=b)return b=c[a]-b,a=this.curves[a],b=1-b/a.getLength(),a.getPointAt(b);a++}return null};THREE.CurvePath.prototype.getLength=function(){var a=this.getCurveLengths();return a[a.length-1]};
THREE.CurvePath.prototype.getCurveLengths=function(){if(this.cacheLengths&&this.cacheLengths.length==this.curves.length)return this.cacheLengths;var a=[],b=0,c,d=this.curves.length;for(c=0;c<d;c++)b+=this.curves[c].getLength(),a.push(b);return this.cacheLengths=a};
THREE.CurvePath.prototype.getBoundingBox=function(){var a=this.getPoints(),b,c,d,e,f,g;b=c=Number.NEGATIVE_INFINITY;e=f=Number.POSITIVE_INFINITY;var h,k,l,n,q=a[0]instanceof THREE.Vector3;n=q?new THREE.Vector3:new THREE.Vector2;k=0;for(l=a.length;k<l;k++)h=a[k],h.x>b?b=h.x:h.x<e&&(e=h.x),h.y>c?c=h.y:h.y<f&&(f=h.y),q&&(h.z>d?d=h.z:h.z<g&&(g=h.z)),n.add(h);a={minX:e,minY:f,maxX:b,maxY:c};q&&(a.maxZ=d,a.minZ=g);return a};
THREE.CurvePath.prototype.createPointsGeometry=function(a){a=this.getPoints(a,!0);return this.createGeometry(a)};THREE.CurvePath.prototype.createSpacedPointsGeometry=function(a){a=this.getSpacedPoints(a,!0);return this.createGeometry(a)};THREE.CurvePath.prototype.createGeometry=function(a){for(var b=new THREE.Geometry,c=0;c<a.length;c++)b.vertices.push(new THREE.Vector3(a[c].x,a[c].y,a[c].z||0));return b};THREE.CurvePath.prototype.addWrapPath=function(a){this.bends.push(a)};
THREE.CurvePath.prototype.getTransformedPoints=function(a,b){var c=this.getPoints(a),d,e;b||(b=this.bends);d=0;for(e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};THREE.CurvePath.prototype.getTransformedSpacedPoints=function(a,b){var c=this.getSpacedPoints(a),d,e;b||(b=this.bends);d=0;for(e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};
THREE.CurvePath.prototype.getWrapPoints=function(a,b){var c=this.getBoundingBox(),d,e,f,g,h,k;d=0;for(e=a.length;d<e;d++)f=a[d],g=f.x,h=f.y,k=g/c.maxX,k=b.getUtoTmapping(k,g),g=b.getPoint(k),k=b.getTangent(k),k.set(-k.y,k.x).multiplyScalar(h),f.x=g.x+k.x,f.y=g.y+k.y;return a};THREE.Gyroscope=function(){THREE.Object3D.call(this)};THREE.Gyroscope.prototype=Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?(this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorld.decompose(this.translationWorld,this.quaternionWorld,this.scaleWorld),this.matrix.decompose(this.translationObject,this.quaternionObject,this.scaleObject),this.matrixWorld.compose(this.translationWorld,this.quaternionObject,this.scaleWorld)):this.matrixWorld.copy(this.matrix),
this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)};THREE.Gyroscope.prototype.translationWorld=new THREE.Vector3;THREE.Gyroscope.prototype.translationObject=new THREE.Vector3;THREE.Gyroscope.prototype.quaternionWorld=new THREE.Quaternion;THREE.Gyroscope.prototype.quaternionObject=new THREE.Quaternion;THREE.Gyroscope.prototype.scaleWorld=new THREE.Vector3;THREE.Gyroscope.prototype.scaleObject=new THREE.Vector3;THREE.Path=function(a){THREE.CurvePath.call(this);this.actions=[];a&&this.fromPoints(a)};THREE.Path.prototype=Object.create(THREE.CurvePath.prototype);THREE.PathActions={MOVE_TO:"moveTo",LINE_TO:"lineTo",QUADRATIC_CURVE_TO:"quadraticCurveTo",BEZIER_CURVE_TO:"bezierCurveTo",CSPLINE_THRU:"splineThru",ARC:"arc",ELLIPSE:"ellipse"};THREE.Path.prototype.fromPoints=function(a){this.moveTo(a[0].x,a[0].y);for(var b=1,c=a.length;b<c;b++)this.lineTo(a[b].x,a[b].y)};
THREE.Path.prototype.moveTo=function(a,b){var c=Array.prototype.slice.call(arguments);this.actions.push({action:THREE.PathActions.MOVE_TO,args:c})};THREE.Path.prototype.lineTo=function(a,b){var c=Array.prototype.slice.call(arguments),d=this.actions[this.actions.length-1].args,d=new THREE.LineCurve(new THREE.Vector2(d[d.length-2],d[d.length-1]),new THREE.Vector2(a,b));this.curves.push(d);this.actions.push({action:THREE.PathActions.LINE_TO,args:c})};
THREE.Path.prototype.quadraticCurveTo=function(a,b,c,d){var e=Array.prototype.slice.call(arguments),f=this.actions[this.actions.length-1].args,f=new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length-2],f[f.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d));this.curves.push(f);this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:e})};
THREE.Path.prototype.bezierCurveTo=function(a,b,c,d,e,f){var g=Array.prototype.slice.call(arguments),h=this.actions[this.actions.length-1].args,h=new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length-2],h[h.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d),new THREE.Vector2(e,f));this.curves.push(h);this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:g})};
THREE.Path.prototype.splineThru=function(a){var b=Array.prototype.slice.call(arguments),c=this.actions[this.actions.length-1].args,c=[new THREE.Vector2(c[c.length-2],c[c.length-1])];Array.prototype.push.apply(c,a);c=new THREE.SplineCurve(c);this.curves.push(c);this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:b})};THREE.Path.prototype.arc=function(a,b,c,d,e,f){var g=this.actions[this.actions.length-1].args;this.absarc(a+g[g.length-2],b+g[g.length-1],c,d,e,f)};
THREE.Path.prototype.absarc=function(a,b,c,d,e,f){this.absellipse(a,b,c,c,d,e,f)};THREE.Path.prototype.ellipse=function(a,b,c,d,e,f,g){var h=this.actions[this.actions.length-1].args;this.absellipse(a+h[h.length-2],b+h[h.length-1],c,d,e,f,g)};THREE.Path.prototype.absellipse=function(a,b,c,d,e,f,g){var h=Array.prototype.slice.call(arguments),k=new THREE.EllipseCurve(a,b,c,d,e,f,g);this.curves.push(k);k=k.getPoint(1);h.push(k.x);h.push(k.y);this.actions.push({action:THREE.PathActions.ELLIPSE,args:h})};
THREE.Path.prototype.getSpacedPoints=function(a,b){a||(a=40);for(var c=[],d=0;d<a;d++)c.push(this.getPoint(d/a));return c};
THREE.Path.prototype.getPoints=function(a,b){if(this.useSpacedPoints)return console.log("tata"),this.getSpacedPoints(a,b);a=a||12;var c=[],d,e,f,g,h,k,l,n,q,p,s,t,r;d=0;for(e=this.actions.length;d<e;d++)switch(f=this.actions[d],g=f.action,f=f.args,g){case THREE.PathActions.MOVE_TO:c.push(new THREE.Vector2(f[0],f[1]));break;case THREE.PathActions.LINE_TO:c.push(new THREE.Vector2(f[0],f[1]));break;case THREE.PathActions.QUADRATIC_CURVE_TO:h=f[2];k=f[3];q=f[0];p=f[1];0<c.length?(g=c[c.length-1],s=g.x,
t=g.y):(g=this.actions[d-1].args,s=g[g.length-2],t=g[g.length-1]);for(f=1;f<=a;f++)r=f/a,g=THREE.Shape.Utils.b2(r,s,q,h),r=THREE.Shape.Utils.b2(r,t,p,k),c.push(new THREE.Vector2(g,r));break;case THREE.PathActions.BEZIER_CURVE_TO:h=f[4];k=f[5];q=f[0];p=f[1];l=f[2];n=f[3];0<c.length?(g=c[c.length-1],s=g.x,t=g.y):(g=this.actions[d-1].args,s=g[g.length-2],t=g[g.length-1]);for(f=1;f<=a;f++)r=f/a,g=THREE.Shape.Utils.b3(r,s,q,l,h),r=THREE.Shape.Utils.b3(r,t,p,n,k),c.push(new THREE.Vector2(g,r));break;case THREE.PathActions.CSPLINE_THRU:g=
this.actions[d-1].args;r=[new THREE.Vector2(g[g.length-2],g[g.length-1])];g=a*f[0].length;r=r.concat(f[0]);r=new THREE.SplineCurve(r);for(f=1;f<=g;f++)c.push(r.getPointAt(f/g));break;case THREE.PathActions.ARC:h=f[0];k=f[1];p=f[2];l=f[3];g=f[4];q=!!f[5];s=g-l;t=2*a;for(f=1;f<=t;f++)r=f/t,q||(r=1-r),r=l+r*s,g=h+p*Math.cos(r),r=k+p*Math.sin(r),c.push(new THREE.Vector2(g,r));break;case THREE.PathActions.ELLIPSE:for(h=f[0],k=f[1],p=f[2],n=f[3],l=f[4],g=f[5],q=!!f[6],s=g-l,t=2*a,f=1;f<=t;f++)r=f/t,q||
(r=1-r),r=l+r*s,g=h+p*Math.cos(r),r=k+n*Math.sin(r),c.push(new THREE.Vector2(g,r))}d=c[c.length-1];1E-10>Math.abs(d.x-c[0].x)&&1E-10>Math.abs(d.y-c[0].y)&&c.splice(c.length-1,1);b&&c.push(c[0]);return c};
THREE.Path.prototype.toShapes=function(a,b){function c(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c],f=new THREE.Shape;f.actions=e.actions;f.curves=e.curves;b.push(f)}return b}function d(a,b){for(var c=b.length,d=!1,e=c-1,f=0;f<c;e=f++){var g=b[e],h=b[f],k=h.x-g.x,l=h.y-g.y;if(1E-10<Math.abs(l)){if(0>l&&(g=b[f],k=-k,h=b[e],l=-l),!(a.y<g.y||a.y>h.y))if(a.y==g.y){if(a.x==g.x)return!0}else{e=l*(a.x-g.x)-k*(a.y-g.y);if(0==e)return!0;0>e||(d=!d)}}else if(a.y==g.y&&(h.x<=a.x&&a.x<=g.x||g.x<=a.x&&a.x<=
h.x))return!0}return d}var e=function(a){var b,c,d,e,f=[],g=new THREE.Path;b=0;for(c=a.length;b<c;b++)d=a[b],e=d.args,d=d.action,d==THREE.PathActions.MOVE_TO&&0!=g.actions.length&&(f.push(g),g=new THREE.Path),g[d].apply(g,e);0!=g.actions.length&&f.push(g);return f}(this.actions);if(0==e.length)return[];if(!0===b)return c(e);var f,g,h,k=[];if(1==e.length)return g=e[0],h=new THREE.Shape,h.actions=g.actions,h.curves=g.curves,k.push(h),k;var l=!THREE.Shape.Utils.isClockWise(e[0].getPoints()),l=a?!l:l;
h=[];var n=[],q=[],p=0,s;n[p]=void 0;q[p]=[];var t,r;t=0;for(r=e.length;t<r;t++)g=e[t],s=g.getPoints(),f=THREE.Shape.Utils.isClockWise(s),(f=a?!f:f)?(!l&&n[p]&&p++,n[p]={s:new THREE.Shape,p:s},n[p].s.actions=g.actions,n[p].s.curves=g.curves,l&&p++,q[p]=[]):q[p].push({h:g,p:s[0]});if(!n[0])return c(e);if(1<n.length){t=!1;r=[];g=0;for(e=n.length;g<e;g++)h[g]=[];g=0;for(e=n.length;g<e;g++)for(f=q[g],l=0;l<f.length;l++){p=f[l];s=!0;for(var v=0;v<n.length;v++)d(p.p,n[v].p)&&(g!=v&&r.push({froms:g,tos:v,
hole:l}),s?(s=!1,h[v].push(p)):t=!0);s&&h[g].push(p)}0<r.length&&(t||(q=h))}t=0;for(r=n.length;t<r;t++)for(h=n[t].s,k.push(h),g=q[t],e=0,f=g.length;e<f;e++)h.holes.push(g[e].h);return k};THREE.Shape=function(){THREE.Path.apply(this,arguments);this.holes=[]};THREE.Shape.prototype=Object.create(THREE.Path.prototype);THREE.Shape.prototype.extrude=function(a){return new THREE.ExtrudeGeometry(this,a)};THREE.Shape.prototype.makeGeometry=function(a){return new THREE.ShapeGeometry(this,a)};THREE.Shape.prototype.getPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedPoints(a,this.bends);return d};
THREE.Shape.prototype.getSpacedPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedSpacedPoints(a,this.bends);return d};THREE.Shape.prototype.extractAllPoints=function(a){return{shape:this.getTransformedPoints(a),holes:this.getPointsHoles(a)}};THREE.Shape.prototype.extractPoints=function(a){return this.useSpacedPoints?this.extractAllSpacedPoints(a):this.extractAllPoints(a)};
THREE.Shape.prototype.extractAllSpacedPoints=function(a){return{shape:this.getTransformedSpacedPoints(a),holes:this.getSpacedPointsHoles(a)}};
THREE.Shape.Utils={triangulateShape:function(a,b){function c(a,b,c){return a.x!=b.x?a.x<b.x?a.x<=c.x&&c.x<=b.x:b.x<=c.x&&c.x<=a.x:a.y<b.y?a.y<=c.y&&c.y<=b.y:b.y<=c.y&&c.y<=a.y}function d(a,b,d,e,f){var g=b.x-a.x,h=b.y-a.y,k=e.x-d.x,l=e.y-d.y,n=a.x-d.x,q=a.y-d.y,J=h*k-g*l,B=h*n-g*q;if(1E-10<Math.abs(J)){if(0<J){if(0>B||B>J)return[];k=l*n-k*q;if(0>k||k>J)return[]}else{if(0<B||B<J)return[];k=l*n-k*q;if(0<k||k<J)return[]}if(0==k)return!f||0!=B&&B!=J?[a]:[];if(k==J)return!f||0!=B&&B!=J?[b]:[];if(0==B)return[d];
if(B==J)return[e];f=k/J;return[{x:a.x+f*g,y:a.y+f*h}]}if(0!=B||l*n!=k*q)return[];h=0==g&&0==h;k=0==k&&0==l;if(h&&k)return a.x!=d.x||a.y!=d.y?[]:[a];if(h)return c(d,e,a)?[a]:[];if(k)return c(a,b,d)?[d]:[];0!=g?(a.x<b.x?(g=a,k=a.x,h=b,a=b.x):(g=b,k=b.x,h=a,a=a.x),d.x<e.x?(b=d,J=d.x,l=e,d=e.x):(b=e,J=e.x,l=d,d=d.x)):(a.y<b.y?(g=a,k=a.y,h=b,a=b.y):(g=b,k=b.y,h=a,a=a.y),d.y<e.y?(b=d,J=d.y,l=e,d=e.y):(b=e,J=e.y,l=d,d=d.y));return k<=J?a<J?[]:a==J?f?[]:[b]:a<=d?[b,h]:[b,l]:k>d?[]:k==d?f?[]:[g]:a<=d?[g,h]:
[g,l]}function e(a,b,c,d){var e=b.x-a.x,f=b.y-a.y;b=c.x-a.x;c=c.y-a.y;var g=d.x-a.x;d=d.y-a.y;a=e*c-f*b;e=e*d-f*g;return 1E-10<Math.abs(a)?(b=g*c-d*b,0<a?0<=e&&0<=b:0<=e||0<=b):0<e}var f,g,h,k,l,n={};h=a.concat();f=0;for(g=b.length;f<g;f++)Array.prototype.push.apply(h,b[f]);f=0;for(g=h.length;f<g;f++)l=h[f].x+":"+h[f].y,void 0!==n[l]&&console.log("Duplicate point",l),n[l]=f;f=function(a,b){function c(a,b){var d=h.length-1,f=a-1;0>f&&(f=d);var g=a+1;g>d&&(g=0);d=e(h[a],h[f],h[g],k[b]);if(!d)return!1;
d=k.length-1;f=b-1;0>f&&(f=d);g=b+1;g>d&&(g=0);return(d=e(k[b],k[f],k[g],h[a]))?!0:!1}function f(a,b){var c,e;for(c=0;c<h.length;c++)if(e=c+1,e%=h.length,e=d(a,b,h[c],h[e],!0),0<e.length)return!0;return!1}function g(a,c){var e,f,h,k;for(e=0;e<l.length;e++)for(f=b[l[e]],h=0;h<f.length;h++)if(k=h+1,k%=f.length,k=d(a,c,f[h],f[k],!0),0<k.length)return!0;return!1}var h=a.concat(),k,l=[],n,q,N,J,B,K=[],A,G,D,C=0;for(n=b.length;C<n;C++)l.push(C);A=0;for(var F=2*l.length;0<l.length;){F--;if(0>F){console.log("Infinite Loop! Holes left:"+
l.length+", Probably Hole outside Shape!");break}for(q=A;q<h.length;q++){N=h[q];n=-1;for(C=0;C<l.length;C++)if(J=l[C],B=N.x+":"+N.y+":"+J,void 0===K[B]){k=b[J];for(G=0;G<k.length;G++)if(J=k[G],c(q,G)&&!f(N,J)&&!g(N,J)){n=G;l.splice(C,1);A=h.slice(0,q+1);J=h.slice(q);G=k.slice(n);D=k.slice(0,n+1);h=A.concat(G).concat(D).concat(J);A=q;break}if(0<=n)break;K[B]=!0}if(0<=n)break}}return h}(a,b);var q=THREE.FontUtils.Triangulate(f,!1);f=0;for(g=q.length;f<g;f++)for(k=q[f],h=0;3>h;h++)l=k[h].x+":"+k[h].y,
l=n[l],void 0!==l&&(k[h]=l);return q.concat()},isClockWise:function(a){return 0>THREE.FontUtils.Triangulate.area(a)},b2p0:function(a,b){var c=1-a;return c*c*b},b2p1:function(a,b){return 2*(1-a)*a*b},b2p2:function(a,b){return a*a*b},b2:function(a,b,c,d){return this.b2p0(a,b)+this.b2p1(a,c)+this.b2p2(a,d)},b3p0:function(a,b){var c=1-a;return c*c*c*b},b3p1:function(a,b){var c=1-a;return 3*c*c*a*b},b3p2:function(a,b){return 3*(1-a)*a*a*b},b3p3:function(a,b){return a*a*a*b},b3:function(a,b,c,d,e){return this.b3p0(a,
b)+this.b3p1(a,c)+this.b3p2(a,d)+this.b3p3(a,e)}};THREE.LineCurve=function(a,b){this.v1=a;this.v2=b};THREE.LineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.LineCurve.prototype.getPoint=function(a){var b=this.v2.clone().sub(this.v1);b.multiplyScalar(a).add(this.v1);return b};THREE.LineCurve.prototype.getPointAt=function(a){return this.getPoint(a)};THREE.LineCurve.prototype.getTangent=function(a){return this.v2.clone().sub(this.v1).normalize()};THREE.QuadraticBezierCurve=function(a,b,c){this.v0=a;this.v1=b;this.v2=c};THREE.QuadraticBezierCurve.prototype=Object.create(THREE.Curve.prototype);THREE.QuadraticBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);return new THREE.Vector2(b,a)};
THREE.QuadraticBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.y,this.v1.y,this.v2.y);b=new THREE.Vector2(b,a);b.normalize();return b};THREE.CubicBezierCurve=function(a,b,c,d){this.v0=a;this.v1=b;this.v2=c;this.v3=d};THREE.CubicBezierCurve.prototype=Object.create(THREE.Curve.prototype);THREE.CubicBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);return new THREE.Vector2(b,a)};
THREE.CubicBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);b=new THREE.Vector2(b,a);b.normalize();return b};THREE.SplineCurve=function(a){this.points=void 0==a?[]:a};THREE.SplineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.SplineCurve.prototype.getPoint=function(a){var b=new THREE.Vector2,c=[],d=this.points,e;e=(d.length-1)*a;a=Math.floor(e);e-=a;c[0]=0==a?a:a-1;c[1]=a;c[2]=a>d.length-2?d.length-1:a+1;c[3]=a>d.length-3?d.length-1:a+2;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);return b};THREE.EllipseCurve=function(a,b,c,d,e,f,g){this.aX=a;this.aY=b;this.xRadius=c;this.yRadius=d;this.aStartAngle=e;this.aEndAngle=f;this.aClockwise=g};THREE.EllipseCurve.prototype=Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint=function(a){var b;b=this.aEndAngle-this.aStartAngle;0>b&&(b+=2*Math.PI);b>2*Math.PI&&(b-=2*Math.PI);b=!0===this.aClockwise?this.aEndAngle+(1-a)*(2*Math.PI-b):this.aStartAngle+a*b;a=this.aX+this.xRadius*Math.cos(b);b=this.aY+this.yRadius*Math.sin(b);return new THREE.Vector2(a,b)};THREE.ArcCurve=function(a,b,c,d,e,f){THREE.EllipseCurve.call(this,a,b,c,c,d,e,f)};THREE.ArcCurve.prototype=Object.create(THREE.EllipseCurve.prototype);THREE.LineCurve3=THREE.Curve.create(function(a,b){this.v1=a;this.v2=b},function(a){var b=new THREE.Vector3;b.subVectors(this.v2,this.v1);b.multiplyScalar(a);b.add(this.v1);return b});THREE.QuadraticBezierCurve3=THREE.Curve.create(function(a,b,c){this.v0=a;this.v1=b;this.v2=c},function(a){var b,c;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);c=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);a=THREE.Shape.Utils.b2(a,this.v0.z,this.v1.z,this.v2.z);return new THREE.Vector3(b,c,a)});THREE.CubicBezierCurve3=THREE.Curve.create(function(a,b,c,d){this.v0=a;this.v1=b;this.v2=c;this.v3=d},function(a){var b,c;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);c=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);a=THREE.Shape.Utils.b3(a,this.v0.z,this.v1.z,this.v2.z,this.v3.z);return new THREE.Vector3(b,c,a)});THREE.SplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b=new THREE.Vector3,c=[],d=this.points,e;a*=d.length-1;e=Math.floor(a);a-=e;c[0]=0==e?e:e-1;c[1]=e;c[2]=e>d.length-2?d.length-1:e+1;c[3]=e>d.length-3?d.length-1:e+2;e=d[c[0]];var f=d[c[1]],g=d[c[2]],c=d[c[3]];b.x=THREE.Curve.Utils.interpolate(e.x,f.x,g.x,c.x,a);b.y=THREE.Curve.Utils.interpolate(e.y,f.y,g.y,c.y,a);b.z=THREE.Curve.Utils.interpolate(e.z,f.z,g.z,c.z,a);return b});THREE.ClosedSplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b=new THREE.Vector3,c=[],d=this.points,e;e=(d.length-0)*a;a=Math.floor(e);e-=a;a+=0<a?0:(Math.floor(Math.abs(a)/d.length)+1)*d.length;c[0]=(a-1)%d.length;c[1]=a%d.length;c[2]=(a+1)%d.length;c[3]=(a+2)%d.length;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);b.z=THREE.Curve.Utils.interpolate(d[c[0]].z,
d[c[1]].z,d[c[2]].z,d[c[3]].z,e);return b});THREE.AnimationHandler=function(){var a=[],b={},c={update:function(b){for(var c=0;c<a.length;c++)a[c].update(b)},addToUpdate:function(b){-1===a.indexOf(b)&&a.push(b)},removeFromUpdate:function(b){b=a.indexOf(b);-1!==b&&a.splice(b,1)},add:function(a){void 0!==b[a.name]&&console.log("THREE.AnimationHandler.add: Warning! "+a.name+" already exists in library. Overwriting.");b[a.name]=a;if(!0!==a.initialized){for(var c=0;c<a.hierarchy.length;c++){for(var d=0;d<a.hierarchy[c].keys.length;d++)if(0>a.hierarchy[c].keys[d].time&&
(a.hierarchy[c].keys[d].time=0),void 0!==a.hierarchy[c].keys[d].rot&&!(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)){var h=a.hierarchy[c].keys[d].rot;a.hierarchy[c].keys[d].rot=(new THREE.Quaternion).fromArray(h)}if(a.hierarchy[c].keys.length&&void 0!==a.hierarchy[c].keys[0].morphTargets){h={};for(d=0;d<a.hierarchy[c].keys.length;d++)for(var k=0;k<a.hierarchy[c].keys[d].morphTargets.length;k++){var l=a.hierarchy[c].keys[d].morphTargets[k];h[l]=-1}a.hierarchy[c].usedMorphTargets=h;for(d=
0;d<a.hierarchy[c].keys.length;d++){var n={};for(l in h){for(k=0;k<a.hierarchy[c].keys[d].morphTargets.length;k++)if(a.hierarchy[c].keys[d].morphTargets[k]===l){n[l]=a.hierarchy[c].keys[d].morphTargetsInfluences[k];break}k===a.hierarchy[c].keys[d].morphTargets.length&&(n[l]=0)}a.hierarchy[c].keys[d].morphTargetsInfluences=n}}for(d=1;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].time===a.hierarchy[c].keys[d-1].time&&(a.hierarchy[c].keys.splice(d,1),d--);for(d=0;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].index=
d}a.initialized=!0}},remove:function(a){void 0===b[a]&&console.log("THREE.AnimationHandler.add: Warning! "+a+" doesn't exists in library. Doing nothing.");b[a]=void 0},get:function(a){if("string"===typeof a)return b[a]?b[a]:null},parse:function(a){var b=[];if(a instanceof THREE.SkinnedMesh)for(var c=0;c<a.skeleton.bones.length;c++)b.push(a.skeleton.bones[c]);else d(a,b);return b}},d=function(a,b){b.push(a);for(var c=0;c<a.children.length;c++)d(a.children[c],b)};c.LINEAR=0;c.CATMULLROM=1;c.CATMULLROM_FORWARD=
2;return c}();THREE.Animation=function(a,b){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.loop=this.isPaused=!0;this.weight=0;this.interpolationType=THREE.AnimationHandler.LINEAR};THREE.Animation.prototype.keyTypes=["pos","rot","scl"];THREE.Animation.prototype.play=function(a,b){this.currentTime=void 0!==a?a:0;this.weight=void 0!==b?b:1;this.isPlaying=!0;this.isPaused=!1;this.reset();THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){!0===this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};THREE.Animation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this)};
THREE.Animation.prototype.reset=function(){for(var a=0,b=this.hierarchy.length;a<b;a++){var c=this.hierarchy[a];c.matrixAutoUpdate=!0;void 0===c.animationCache&&(c.animationCache={});void 0===c.animationCache[this.data.name]&&(c.animationCache[this.data.name]={},c.animationCache[this.data.name].prevKey={pos:0,rot:0,scl:0},c.animationCache[this.data.name].nextKey={pos:0,rot:0,scl:0},c.animationCache[this.data.name].originalMatrix=c instanceof THREE.Bone?c.skinMatrix:c.matrix);for(var c=c.animationCache[this.data.name],
d=0;3>d;d++){for(var e=this.keyTypes[d],f=this.data.hierarchy[a].keys[0],g=this.getNextKeyWith(e,a,1);g.time<this.currentTime&&g.index>f.index;)f=g,g=this.getNextKeyWith(e,a,g.index+1);c.prevKey[e]=f;c.nextKey[e]=g}}};
THREE.Animation.prototype.update=function(){var a=[],b=new THREE.Vector3,c=new THREE.Vector3,d=new THREE.Quaternion,e=function(a,b){var c=[],d=[],e,q,p,s,t,r;e=(a.length-1)*b;q=Math.floor(e);e-=q;c[0]=0===q?q:q-1;c[1]=q;c[2]=q>a.length-2?q:q+1;c[3]=q>a.length-3?q:q+2;q=a[c[0]];s=a[c[1]];t=a[c[2]];r=a[c[3]];c=e*e;p=e*c;d[0]=f(q[0],s[0],t[0],r[0],e,c,p);d[1]=f(q[1],s[1],t[1],r[1],e,c,p);d[2]=f(q[2],s[2],t[2],r[2],e,c,p);return d},f=function(a,b,c,d,e,f,p){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*
p+(-3*(b-c)-2*a-d)*f+a*e+b};return function(f){if(!1!==this.isPlaying&&(this.currentTime+=f*this.timeScale,0!==this.weight)){var h;f=this.data.length;if(!0===this.loop&&this.currentTime>f)this.currentTime%=f,this.reset();else if(!1===this.loop&&this.currentTime>f){this.stop();return}f=0;for(var k=this.hierarchy.length;f<k;f++)for(var l=this.hierarchy[f],n=l.animationCache[this.data.name],q=0;3>q;q++){h=this.keyTypes[q];var p=n.prevKey[h],s=n.nextKey[h];if(s.time<=this.currentTime){p=this.data.hierarchy[f].keys[0];
for(s=this.getNextKeyWith(h,f,1);s.time<this.currentTime&&s.index>p.index;)p=s,s=this.getNextKeyWith(h,f,s.index+1);n.prevKey[h]=p;n.nextKey[h]=s}l.matrixAutoUpdate=!0;l.matrixWorldNeedsUpdate=!0;var t=(this.currentTime-p.time)/(s.time-p.time),r=p[h],v=s[h];0>t&&(t=0);1<t&&(t=1);if("pos"===h)if(h=l.position,this.interpolationType===THREE.AnimationHandler.LINEAR)c.x=r[0]+(v[0]-r[0])*t,c.y=r[1]+(v[1]-r[1])*t,c.z=r[2]+(v[2]-r[2])*t,l instanceof THREE.Bone&&(p=this.weight/(this.weight+l.accumulatedPosWeight),
h.lerp(c,p),l.accumulatedPosWeight+=this.weight);else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)a[0]=this.getPrevKeyWith("pos",f,p.index-1).pos,a[1]=r,a[2]=v,a[3]=this.getNextKeyWith("pos",f,s.index+1).pos,t=0.33*t+0.33,s=e(a,t),l instanceof THREE.Bone?(p=this.weight/(this.weight+l.accumulatedPosWeight),l.accumulatedPosWeight+=this.weight):p=1,h.x+=(s[0]-h.x)*p,h.y+=(s[1]-h.y)*p,h.z+=(s[2]-h.z)*p,this.interpolationType===
THREE.AnimationHandler.CATMULLROM_FORWARD&&(t=e(a,1.01*t),b.set(t[0],t[1],t[2]),b.sub(h),b.y=0,b.normalize(),h=Math.atan2(b.x,b.z),l.rotation.set(0,h,0))}else"rot"===h?(THREE.Quaternion.slerp(r,v,d,t),l instanceof THREE.Bone?0===l.accumulatedRotWeight?(l.quaternion.copy(d),l.accumulatedRotWeight=this.weight):(p=this.weight/(this.weight+l.accumulatedRotWeight),THREE.Quaternion.slerp(l.quaternion,d,l.quaternion,p),l.accumulatedRotWeight+=this.weight):l.quaternion.copy(d)):"scl"===h&&(h=l.scale,c.x=
r[0]+(v[0]-r[0])*t,c.y=r[1]+(v[1]-r[1])*t,c.z=r[2]+(v[2]-r[2])*t,l instanceof THREE.Bone&&(p=this.weight/(this.weight+l.accumulatedSclWeight),h.lerp(c,p),l.accumulatedSclWeight+=this.weight))}return!0}}}();
THREE.Animation.prototype.getNextKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c<d.length-1?c:d.length-1:c%d.length;c<d.length;c++)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?0<c?c:0:0<=c?c:c+d.length;0<=c;c--)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[d.length-1]};THREE.KeyFrameAnimation=function(a,b){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=0.001;this.isPlaying=!1;this.loop=this.isPaused=!0;for(var c=0,d=this.hierarchy.length;c<d;c++){var e=this.data.hierarchy[c].sids,f=this.hierarchy[c];if(this.data.hierarchy[c].keys.length&&e){for(var g=0;g<e.length;g++){var h=e[g],k=this.getNextKeyWith(h,c,0);k&&k.apply(h)}f.matrixAutoUpdate=!1;this.data.hierarchy[c].node.updateMatrix();
f.matrixWorldNeedsUpdate=!0}}};
THREE.KeyFrameAnimation.prototype.play=function(a){this.currentTime=void 0!==a?a:0;if(!1===this.isPlaying){this.isPlaying=!0;var b=this.hierarchy.length,c,d;for(a=0;a<b;a++)c=this.hierarchy[a],d=this.data.hierarchy[a],void 0===d.animationCache&&(d.animationCache={},d.animationCache.prevKey=null,d.animationCache.nextKey=null,d.animationCache.originalMatrix=c instanceof THREE.Bone?c.skinMatrix:c.matrix),c=this.data.hierarchy[a].keys,c.length&&(d.animationCache.prevKey=c[0],d.animationCache.nextKey=
c[1],this.startTime=Math.min(c[0].time,this.startTime),this.endTime=Math.max(c[c.length-1].time,this.endTime));this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};THREE.KeyFrameAnimation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.KeyFrameAnimation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var a=0;a<this.data.hierarchy.length;a++){var b=this.hierarchy[a],c=this.data.hierarchy[a];if(void 0!==c.animationCache){var d=c.animationCache.originalMatrix;b instanceof THREE.Bone?(d.copy(b.skinMatrix),b.skinMatrix=d):(d.copy(b.matrix),b.matrix=d);delete c.animationCache}}};
THREE.KeyFrameAnimation.prototype.update=function(a){if(!1!==this.isPlaying){this.currentTime+=a*this.timeScale;a=this.data.length;!0===this.loop&&this.currentTime>a&&(this.currentTime%=a);this.currentTime=Math.min(this.currentTime,a);a=0;for(var b=this.hierarchy.length;a<b;a++){var c=this.hierarchy[a],d=this.data.hierarchy[a],e=d.keys,d=d.animationCache;if(e.length){var f=d.prevKey,g=d.nextKey;if(g.time<=this.currentTime){for(;g.time<this.currentTime&&g.index>f.index;)f=g,g=e[f.index+1];d.prevKey=
f;d.nextKey=g}g.time>=this.currentTime?f.interpolate(g,this.currentTime):f.interpolate(g,g.time);this.data.hierarchy[a].node.updateMatrix();c.matrixWorldNeedsUpdate=!0}}}};THREE.KeyFrameAnimation.prototype.getNextKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c%=b.length;c<b.length;c++)if(b[c].hasTarget(a))return b[c];return b[0]};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c=0<=c?c:c+b.length;0<=c;c--)if(b[c].hasTarget(a))return b[c];return b[b.length-1]};THREE.MorphAnimation=function(a){this.mesh=a;this.frames=a.morphTargetInfluences.length;this.currentTime=0;this.duration=1E3;this.loop=!0;this.isPlaying=!1};
THREE.MorphAnimation.prototype={play:function(){this.isPlaying=!0},pause:function(){this.isPlaying=!1},update:function(){var a=0,b=0;return function(c){if(!1!==this.isPlaying){this.currentTime+=c;!0===this.loop&&this.currentTime>this.duration&&(this.currentTime%=this.duration);this.currentTime=Math.min(this.currentTime,this.duration);c=this.duration/this.frames;var d=Math.floor(this.currentTime/c);d!=b&&(this.mesh.morphTargetInfluences[a]=0,this.mesh.morphTargetInfluences[b]=1,this.mesh.morphTargetInfluences[d]=
0,a=b,b=d);this.mesh.morphTargetInfluences[d]=this.currentTime%c/c;this.mesh.morphTargetInfluences[a]=1-this.mesh.morphTargetInfluences[d]}}}()};THREE.CubeCamera=function(a,b,c){THREE.Object3D.call(this);var d=new THREE.PerspectiveCamera(90,1,a,b);d.up.set(0,-1,0);d.lookAt(new THREE.Vector3(1,0,0));this.add(d);var e=new THREE.PerspectiveCamera(90,1,a,b);e.up.set(0,-1,0);e.lookAt(new THREE.Vector3(-1,0,0));this.add(e);var f=new THREE.PerspectiveCamera(90,1,a,b);f.up.set(0,0,1);f.lookAt(new THREE.Vector3(0,1,0));this.add(f);var g=new THREE.PerspectiveCamera(90,1,a,b);g.up.set(0,0,-1);g.lookAt(new THREE.Vector3(0,-1,0));this.add(g);var h=new THREE.PerspectiveCamera(90,
1,a,b);h.up.set(0,-1,0);h.lookAt(new THREE.Vector3(0,0,1));this.add(h);var k=new THREE.PerspectiveCamera(90,1,a,b);k.up.set(0,-1,0);k.lookAt(new THREE.Vector3(0,0,-1));this.add(k);this.renderTarget=new THREE.WebGLRenderTargetCube(c,c,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});this.updateCubeMap=function(a,b){var c=this.renderTarget,p=c.generateMipmaps;c.generateMipmaps=!1;c.activeCubeFace=0;a.render(b,d,c);c.activeCubeFace=1;a.render(b,e,c);c.activeCubeFace=
2;a.render(b,f,c);c.activeCubeFace=3;a.render(b,g,c);c.activeCubeFace=4;a.render(b,h,c);c.generateMipmaps=p;c.activeCubeFace=5;a.render(b,k,c)}};THREE.CubeCamera.prototype=Object.create(THREE.Object3D.prototype);THREE.CombinedCamera=function(a,b,c,d,e,f,g){THREE.Camera.call(this);this.fov=c;this.left=-a/2;this.right=a/2;this.top=b/2;this.bottom=-b/2;this.cameraO=new THREE.OrthographicCamera(a/-2,a/2,b/2,b/-2,f,g);this.cameraP=new THREE.PerspectiveCamera(c,a/b,d,e);this.zoom=1;this.toPerspective()};THREE.CombinedCamera.prototype=Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective=function(){this.near=this.cameraP.near;this.far=this.cameraP.far;this.cameraP.fov=this.fov/this.zoom;this.cameraP.updateProjectionMatrix();this.projectionMatrix=this.cameraP.projectionMatrix;this.inPerspectiveMode=!0;this.inOrthographicMode=!1};
THREE.CombinedCamera.prototype.toOrthographic=function(){var a=this.cameraP.aspect,b=(this.cameraP.near+this.cameraP.far)/2,b=Math.tan(this.fov/2)*b,a=2*b*a/2,b=b/this.zoom,a=a/this.zoom;this.cameraO.left=-a;this.cameraO.right=a;this.cameraO.top=b;this.cameraO.bottom=-b;this.cameraO.updateProjectionMatrix();this.near=this.cameraO.near;this.far=this.cameraO.far;this.projectionMatrix=this.cameraO.projectionMatrix;this.inPerspectiveMode=!1;this.inOrthographicMode=!0};
THREE.CombinedCamera.prototype.setSize=function(a,b){this.cameraP.aspect=a/b;this.left=-a/2;this.right=a/2;this.top=b/2;this.bottom=-b/2};THREE.CombinedCamera.prototype.setFov=function(a){this.fov=a;this.inPerspectiveMode?this.toPerspective():this.toOrthographic()};THREE.CombinedCamera.prototype.updateProjectionMatrix=function(){this.inPerspectiveMode?this.toPerspective():(this.toPerspective(),this.toOrthographic())};
THREE.CombinedCamera.prototype.setLens=function(a,b){void 0===b&&(b=24);var c=2*THREE.Math.radToDeg(Math.atan(b/(2*a)));this.setFov(c);return c};THREE.CombinedCamera.prototype.setZoom=function(a){this.zoom=a;this.inPerspectiveMode?this.toPerspective():this.toOrthographic()};THREE.CombinedCamera.prototype.toFrontView=function(){this.rotation.x=0;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.CombinedCamera.prototype.toBackView=function(){this.rotation.x=0;this.rotation.y=Math.PI;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toLeftView=function(){this.rotation.x=0;this.rotation.y=-Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toRightView=function(){this.rotation.x=0;this.rotation.y=Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.CombinedCamera.prototype.toTopView=function(){this.rotation.x=-Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBottomView=function(){this.rotation.x=Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.BoxGeometry=function(a,b,c,d,e,f){function g(a,b,c,d,e,f,g,r){var v,w=h.widthSegments,u=h.heightSegments,y=e/2,L=f/2,x=h.vertices.length;if("x"===a&&"y"===b||"y"===a&&"x"===b)v="z";else if("x"===a&&"z"===b||"z"===a&&"x"===b)v="y",u=h.depthSegments;else if("z"===a&&"y"===b||"y"===a&&"z"===b)v="x",w=h.depthSegments;var N=w+1,J=u+1,B=e/w,K=f/u,A=new THREE.Vector3;A[v]=0<g?1:-1;for(e=0;e<J;e++)for(f=0;f<N;f++){var G=new THREE.Vector3;G[a]=(f*B-y)*c;G[b]=(e*K-L)*d;G[v]=g;h.vertices.push(G)}for(e=
0;e<u;e++)for(f=0;f<w;f++)L=f+N*e,a=f+N*(e+1),b=f+1+N*(e+1),c=f+1+N*e,d=new THREE.Vector2(f/w,1-e/u),g=new THREE.Vector2(f/w,1-(e+1)/u),v=new THREE.Vector2((f+1)/w,1-(e+1)/u),y=new THREE.Vector2((f+1)/w,1-e/u),L=new THREE.Face3(L+x,a+x,c+x),L.normal.copy(A),L.vertexNormals.push(A.clone(),A.clone(),A.clone()),L.materialIndex=r,h.faces.push(L),h.faceVertexUvs[0].push([d,g,y]),L=new THREE.Face3(a+x,b+x,c+x),L.normal.copy(A),L.vertexNormals.push(A.clone(),A.clone(),A.clone()),L.materialIndex=r,h.faces.push(L),
h.faceVertexUvs[0].push([g.clone(),v,y.clone()])}THREE.Geometry.call(this);this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f};this.widthSegments=d||1;this.heightSegments=e||1;this.depthSegments=f||1;var h=this;d=a/2;e=b/2;f=c/2;g("z","y",-1,-1,c,b,d,0);g("z","y",1,-1,c,b,-d,1);g("x","z",1,1,a,c,e,2);g("x","z",1,-1,a,c,-e,3);g("x","y",1,-1,a,b,f,4);g("x","y",-1,-1,a,b,-f,5);this.mergeVertices()};THREE.BoxGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.CircleGeometry=function(a,b,c,d){THREE.Geometry.call(this);this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d};a=a||50;b=void 0!==b?Math.max(3,b):8;c=void 0!==c?c:0;d=void 0!==d?d:2*Math.PI;var e,f=[];e=new THREE.Vector3;var g=new THREE.Vector2(0.5,0.5);this.vertices.push(e);f.push(g);for(e=0;e<=b;e++){var h=new THREE.Vector3,k=c+e/b*d;h.x=a*Math.cos(k);h.y=a*Math.sin(k);this.vertices.push(h);f.push(new THREE.Vector2((h.x/a+1)/2,(h.y/a+1)/2))}c=new THREE.Vector3(0,0,1);for(e=1;e<=
b;e++)this.faces.push(new THREE.Face3(e,e+1,0,[c.clone(),c.clone(),c.clone()])),this.faceVertexUvs[0].push([f[e].clone(),f[e+1].clone(),g.clone()]);this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,a)};THREE.CircleGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.CubeGeometry=function(a,b,c,d,e,f){console.warn("DEPRECATED: THREE.CubeGeometry is deprecated. Use THREE.BoxGeometry instead.");return new THREE.BoxGeometry(a,b,c,d,e,f)};THREE.CylinderGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this);this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f};a=void 0!==a?a:20;b=void 0!==b?b:20;c=void 0!==c?c:100;d=d||8;e=e||1;f=void 0!==f?f:!1;var g=c/2,h,k,l=[],n=[];for(k=0;k<=e;k++){var q=[],p=[],s=k/e,t=s*(b-a)+a;for(h=0;h<=d;h++){var r=h/d,v=new THREE.Vector3;v.x=t*Math.sin(r*Math.PI*2);v.y=-s*c+g;v.z=t*Math.cos(r*Math.PI*2);this.vertices.push(v);q.push(this.vertices.length-1);p.push(new THREE.Vector2(r,
1-s))}l.push(q);n.push(p)}c=(b-a)/c;for(h=0;h<d;h++)for(0!==a?(q=this.vertices[l[0][h]].clone(),p=this.vertices[l[0][h+1]].clone()):(q=this.vertices[l[1][h]].clone(),p=this.vertices[l[1][h+1]].clone()),q.setY(Math.sqrt(q.x*q.x+q.z*q.z)*c).normalize(),p.setY(Math.sqrt(p.x*p.x+p.z*p.z)*c).normalize(),k=0;k<e;k++){var s=l[k][h],t=l[k+1][h],r=l[k+1][h+1],v=l[k][h+1],w=q.clone(),u=q.clone(),y=p.clone(),L=p.clone(),x=n[k][h].clone(),N=n[k+1][h].clone(),J=n[k+1][h+1].clone(),B=n[k][h+1].clone();this.faces.push(new THREE.Face3(s,
t,v,[w,u,L]));this.faceVertexUvs[0].push([x,N,B]);this.faces.push(new THREE.Face3(t,r,v,[u.clone(),y,L.clone()]));this.faceVertexUvs[0].push([N.clone(),J,B.clone()])}if(!1===f&&0<a)for(this.vertices.push(new THREE.Vector3(0,g,0)),h=0;h<d;h++)s=l[0][h],t=l[0][h+1],r=this.vertices.length-1,w=new THREE.Vector3(0,1,0),u=new THREE.Vector3(0,1,0),y=new THREE.Vector3(0,1,0),x=n[0][h].clone(),N=n[0][h+1].clone(),J=new THREE.Vector2(N.x,0),this.faces.push(new THREE.Face3(s,t,r,[w,u,y])),this.faceVertexUvs[0].push([x,
N,J]);if(!1===f&&0<b)for(this.vertices.push(new THREE.Vector3(0,-g,0)),h=0;h<d;h++)s=l[k][h+1],t=l[k][h],r=this.vertices.length-1,w=new THREE.Vector3(0,-1,0),u=new THREE.Vector3(0,-1,0),y=new THREE.Vector3(0,-1,0),x=n[k][h+1].clone(),N=n[k][h].clone(),J=new THREE.Vector2(N.x,1),this.faces.push(new THREE.Face3(s,t,r,[w,u,y])),this.faceVertexUvs[0].push([x,N,J]);this.computeFaceNormals()};THREE.CylinderGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ExtrudeGeometry=function(a,b){"undefined"!==typeof a&&(THREE.Geometry.call(this),a=a instanceof Array?a:[a],this.shapebb=a[a.length-1].getBoundingBox(),this.addShapeList(a,b),this.computeFaceNormals())};THREE.ExtrudeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ExtrudeGeometry.prototype.addShapeList=function(a,b){for(var c=a.length,d=0;d<c;d++)this.addShape(a[d],b)};
THREE.ExtrudeGeometry.prototype.addShape=function(a,b){function c(a,b,c){b||console.log("die");return b.clone().multiplyScalar(c).add(a)}function d(a,b,c){var d=THREE.Math.sign,e=1,e=a.x-b.x,f=a.y-b.y,g=c.x-a.x,h=c.y-a.y,k=e*e+f*f;if(1E-10<Math.abs(e*h-f*g)){var l=Math.sqrt(k),d=Math.sqrt(g*g+h*h),k=b.x-f/l;b=b.y+e/l;g=((c.x-h/d-k)*h-(c.y+g/d-b)*g)/(e*h-f*g);c=k+e*g-a.x;a=b+f*g-a.y;e=c*c+a*a;if(2>=e)return new THREE.Vector2(c,a);e=Math.sqrt(e/2)}else a=!1,1E-10<e?1E-10<g&&(a=!0):-1E-10>e?-1E-10>g&&
(a=!0):d(f)==d(h)&&(a=!0),a?(c=-f,a=e,e=Math.sqrt(k)):(c=e,a=f,e=Math.sqrt(k/2));return new THREE.Vector2(c/e,a/e)}function e(c,d){var e,f;for(I=c.length;0<=--I;){e=I;f=I-1;0>f&&(f=c.length-1);for(var g=0,h=s+2*n,g=0;g<h;g++){var k=la*g,l=la*(g+1),p=d+e+k,k=d+f+k,q=d+f+l,l=d+e+l,r=c,t=g,w=h,v=e,A=f,p=p+D,k=k+D,q=q+D,l=l+D;G.faces.push(new THREE.Face3(p,k,l,null,null,u));G.faces.push(new THREE.Face3(k,q,l,null,null,u));p=y.generateSideWallUV(G,a,r,b,p,k,q,l,t,w,v,A);G.faceVertexUvs[0].push([p[0],p[1],
p[3]]);G.faceVertexUvs[0].push([p[1],p[2],p[3]])}}}function f(a,b,c){G.vertices.push(new THREE.Vector3(a,b,c))}function g(c,d,e,f){c+=D;d+=D;e+=D;G.faces.push(new THREE.Face3(c,d,e,null,null,w));c=f?y.generateBottomUV(G,a,b,c,d,e):y.generateTopUV(G,a,b,c,d,e);G.faceVertexUvs[0].push(c)}var h=void 0!==b.amount?b.amount:100,k=void 0!==b.bevelThickness?b.bevelThickness:6,l=void 0!==b.bevelSize?b.bevelSize:k-2,n=void 0!==b.bevelSegments?b.bevelSegments:3,q=void 0!==b.bevelEnabled?b.bevelEnabled:!0,p=
void 0!==b.curveSegments?b.curveSegments:12,s=void 0!==b.steps?b.steps:1,t=b.extrudePath,r,v=!1,w=b.material,u=b.extrudeMaterial,y=void 0!==b.UVGenerator?b.UVGenerator:THREE.ExtrudeGeometry.WorldUVGenerator,L,x,N,J;t&&(r=t.getSpacedPoints(s),v=!0,q=!1,L=void 0!==b.frames?b.frames:new THREE.TubeGeometry.FrenetFrames(t,s,!1),x=new THREE.Vector3,N=new THREE.Vector3,J=new THREE.Vector3);q||(l=k=n=0);var B,K,A,G=this,D=this.vertices.length,t=a.extractPoints(p),p=t.shape,C=t.holes;if(t=!THREE.Shape.Utils.isClockWise(p)){p=
p.reverse();K=0;for(A=C.length;K<A;K++)B=C[K],THREE.Shape.Utils.isClockWise(B)&&(C[K]=B.reverse());t=!1}var F=THREE.Shape.Utils.triangulateShape(p,C),z=p;K=0;for(A=C.length;K<A;K++)B=C[K],p=p.concat(B);var H,E,Q,Y,U,la=p.length,W,R=F.length,t=[],I=0;Q=z.length;H=Q-1;for(E=I+1;I<Q;I++,H++,E++)H===Q&&(H=0),E===Q&&(E=0),t[I]=d(z[I],z[H],z[E]);var da=[],V,X=t.concat();K=0;for(A=C.length;K<A;K++){B=C[K];V=[];I=0;Q=B.length;H=Q-1;for(E=I+1;I<Q;I++,H++,E++)H===Q&&(H=0),E===Q&&(E=0),V[I]=d(B[I],B[H],B[E]);
da.push(V);X=X.concat(V)}for(H=0;H<n;H++){Q=H/n;Y=k*(1-Q);E=l*Math.sin(Q*Math.PI/2);I=0;for(Q=z.length;I<Q;I++)U=c(z[I],t[I],E),f(U.x,U.y,-Y);K=0;for(A=C.length;K<A;K++)for(B=C[K],V=da[K],I=0,Q=B.length;I<Q;I++)U=c(B[I],V[I],E),f(U.x,U.y,-Y)}E=l;for(I=0;I<la;I++)U=q?c(p[I],X[I],E):p[I],v?(N.copy(L.normals[0]).multiplyScalar(U.x),x.copy(L.binormals[0]).multiplyScalar(U.y),J.copy(r[0]).add(N).add(x),f(J.x,J.y,J.z)):f(U.x,U.y,0);for(Q=1;Q<=s;Q++)for(I=0;I<la;I++)U=q?c(p[I],X[I],E):p[I],v?(N.copy(L.normals[Q]).multiplyScalar(U.x),
x.copy(L.binormals[Q]).multiplyScalar(U.y),J.copy(r[Q]).add(N).add(x),f(J.x,J.y,J.z)):f(U.x,U.y,h/s*Q);for(H=n-1;0<=H;H--){Q=H/n;Y=k*(1-Q);E=l*Math.sin(Q*Math.PI/2);I=0;for(Q=z.length;I<Q;I++)U=c(z[I],t[I],E),f(U.x,U.y,h+Y);K=0;for(A=C.length;K<A;K++)for(B=C[K],V=da[K],I=0,Q=B.length;I<Q;I++)U=c(B[I],V[I],E),v?f(U.x,U.y+r[s-1].y,r[s-1].x+Y):f(U.x,U.y,h+Y)}(function(){if(q){var a;a=0*la;for(I=0;I<R;I++)W=F[I],g(W[2]+a,W[1]+a,W[0]+a,!0);a=s+2*n;a*=la;for(I=0;I<R;I++)W=F[I],g(W[0]+a,W[1]+a,W[2]+a,!1)}else{for(I=
0;I<R;I++)W=F[I],g(W[2],W[1],W[0],!0);for(I=0;I<R;I++)W=F[I],g(W[0]+la*s,W[1]+la*s,W[2]+la*s,!1)}})();(function(){var a=0;e(z,a);a+=z.length;K=0;for(A=C.length;K<A;K++)B=C[K],e(B,a),a+=B.length})()};
THREE.ExtrudeGeometry.WorldUVGenerator={generateTopUV:function(a,b,c,d,e,f){b=a.vertices[e].x;e=a.vertices[e].y;c=a.vertices[f].x;f=a.vertices[f].y;return[new THREE.Vector2(a.vertices[d].x,a.vertices[d].y),new THREE.Vector2(b,e),new THREE.Vector2(c,f)]},generateBottomUV:function(a,b,c,d,e,f){return this.generateTopUV(a,b,c,d,e,f)},generateSideWallUV:function(a,b,c,d,e,f,g,h,k,l,n,q){b=a.vertices[e].x;c=a.vertices[e].y;e=a.vertices[e].z;d=a.vertices[f].x;k=a.vertices[f].y;f=a.vertices[f].z;l=a.vertices[g].x;
n=a.vertices[g].y;g=a.vertices[g].z;q=a.vertices[h].x;var p=a.vertices[h].y;a=a.vertices[h].z;return 0.01>Math.abs(c-k)?[new THREE.Vector2(b,1-e),new THREE.Vector2(d,1-f),new THREE.Vector2(l,1-g),new THREE.Vector2(q,1-a)]:[new THREE.Vector2(c,1-e),new THREE.Vector2(k,1-f),new THREE.Vector2(n,1-g),new THREE.Vector2(p,1-a)]}};THREE.ExtrudeGeometry.__v1=new THREE.Vector2;THREE.ExtrudeGeometry.__v2=new THREE.Vector2;THREE.ExtrudeGeometry.__v3=new THREE.Vector2;THREE.ExtrudeGeometry.__v4=new THREE.Vector2;
THREE.ExtrudeGeometry.__v5=new THREE.Vector2;THREE.ExtrudeGeometry.__v6=new THREE.Vector2;THREE.ShapeGeometry=function(a,b){THREE.Geometry.call(this);!1===a instanceof Array&&(a=[a]);this.shapebb=a[a.length-1].getBoundingBox();this.addShapeList(a,b);this.computeFaceNormals()};THREE.ShapeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ShapeGeometry.prototype.addShapeList=function(a,b){for(var c=0,d=a.length;c<d;c++)this.addShape(a[c],b);return this};
THREE.ShapeGeometry.prototype.addShape=function(a,b){void 0===b&&(b={});var c=b.material,d=void 0===b.UVGenerator?THREE.ExtrudeGeometry.WorldUVGenerator:b.UVGenerator,e,f,g,h=this.vertices.length;e=a.extractPoints(void 0!==b.curveSegments?b.curveSegments:12);var k=e.shape,l=e.holes;if(!THREE.Shape.Utils.isClockWise(k))for(k=k.reverse(),e=0,f=l.length;e<f;e++)g=l[e],THREE.Shape.Utils.isClockWise(g)&&(l[e]=g.reverse());var n=THREE.Shape.Utils.triangulateShape(k,l);e=0;for(f=l.length;e<f;e++)g=l[e],
k=k.concat(g);l=k.length;f=n.length;for(e=0;e<l;e++)g=k[e],this.vertices.push(new THREE.Vector3(g.x,g.y,0));for(e=0;e<f;e++)l=n[e],k=l[0]+h,g=l[1]+h,l=l[2]+h,this.faces.push(new THREE.Face3(k,g,l,null,null,c)),this.faceVertexUvs[0].push(d.generateBottomUV(this,a,b,k,g,l))};THREE.LatheGeometry=function(a,b,c,d){THREE.Geometry.call(this);b=b||12;c=c||0;d=d||2*Math.PI;for(var e=1/(a.length-1),f=1/b,g=0,h=b;g<=h;g++)for(var k=c+g*f*d,l=Math.cos(k),n=Math.sin(k),k=0,q=a.length;k<q;k++){var p=a[k],s=new THREE.Vector3;s.x=l*p.x-n*p.y;s.y=n*p.x+l*p.y;s.z=p.z;this.vertices.push(s)}c=a.length;g=0;for(h=b;g<h;g++)for(k=0,q=a.length-1;k<q;k++){b=n=k+c*g;d=n+c;var l=n+1+c,n=n+1,p=g*f,s=k*e,t=p+f,r=s+e;this.faces.push(new THREE.Face3(b,d,n));this.faceVertexUvs[0].push([new THREE.Vector2(p,
s),new THREE.Vector2(t,s),new THREE.Vector2(p,r)]);this.faces.push(new THREE.Face3(d,l,n));this.faceVertexUvs[0].push([new THREE.Vector2(t,s),new THREE.Vector2(t,r),new THREE.Vector2(p,r)])}this.mergeVertices();this.computeFaceNormals();this.computeVertexNormals()};THREE.LatheGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.PlaneGeometry=function(a,b,c,d){THREE.Geometry.call(this);this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};var e=a/2,f=b/2;c=c||1;d=d||1;var g=c+1,h=d+1,k=a/c,l=b/d,n=new THREE.Vector3(0,0,1);for(a=0;a<h;a++){var q=a*l-f;for(b=0;b<g;b++)this.vertices.push(new THREE.Vector3(b*k-e,-q,0))}for(a=0;a<d;a++)for(b=0;b<c;b++){var p=b+g*a,e=b+g*(a+1),f=b+1+g*(a+1),h=b+1+g*a,k=new THREE.Vector2(b/c,1-a/d),l=new THREE.Vector2(b/c,1-(a+1)/d),q=new THREE.Vector2((b+1)/c,1-(a+1)/d),s=new THREE.Vector2((b+
1)/c,1-a/d),p=new THREE.Face3(p,e,h);p.normal.copy(n);p.vertexNormals.push(n.clone(),n.clone(),n.clone());this.faces.push(p);this.faceVertexUvs[0].push([k,l,s]);p=new THREE.Face3(e,f,h);p.normal.copy(n);p.vertexNormals.push(n.clone(),n.clone(),n.clone());this.faces.push(p);this.faceVertexUvs[0].push([l.clone(),q,s.clone()])}};THREE.PlaneGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.RingGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this);a=a||0;b=b||50;e=void 0!==e?e:0;f=void 0!==f?f:2*Math.PI;c=void 0!==c?Math.max(3,c):8;d=void 0!==d?Math.max(3,d):8;var g,h=[],k=a,l=(b-a)/d;for(a=0;a<=d;a++){for(g=0;g<=c;g++){var n=new THREE.Vector3,q=e+g/c*f;n.x=k*Math.cos(q);n.y=k*Math.sin(q);this.vertices.push(n);h.push(new THREE.Vector2((n.x/b+1)/2,(n.y/b+1)/2))}k+=l}b=new THREE.Vector3(0,0,1);for(a=0;a<d;a++)for(e=a*c,g=0;g<=c;g++)q=g+e,f=q+a,l=q+c+a,n=q+c+1+a,this.faces.push(new THREE.Face3(f,
l,n,[b.clone(),b.clone(),b.clone()])),this.faceVertexUvs[0].push([h[f].clone(),h[l].clone(),h[n].clone()]),f=q+a,l=q+c+1+a,n=q+1+a,this.faces.push(new THREE.Face3(f,l,n,[b.clone(),b.clone(),b.clone()])),this.faceVertexUvs[0].push([h[f].clone(),h[l].clone(),h[n].clone()]);this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,k)};THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.SphereGeometry=function(a,b,c,d,e,f,g){THREE.Geometry.call(this);this.parameters={radius:a,widthSegments:b,heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g};a=a||50;b=Math.max(3,Math.floor(b)||8);c=Math.max(2,Math.floor(c)||6);d=void 0!==d?d:0;e=void 0!==e?e:2*Math.PI;f=void 0!==f?f:0;g=void 0!==g?g:Math.PI;var h,k,l=[],n=[];for(k=0;k<=c;k++){var q=[],p=[];for(h=0;h<=b;h++){var s=h/b,t=k/c,r=new THREE.Vector3;r.x=-a*Math.cos(d+s*e)*Math.sin(f+t*g);r.y=a*Math.cos(f+t*g);r.z=
a*Math.sin(d+s*e)*Math.sin(f+t*g);this.vertices.push(r);q.push(this.vertices.length-1);p.push(new THREE.Vector2(s,1-t))}l.push(q);n.push(p)}for(k=0;k<c;k++)for(h=0;h<b;h++){d=l[k][h+1];e=l[k][h];f=l[k+1][h];g=l[k+1][h+1];var q=this.vertices[d].clone().normalize(),p=this.vertices[e].clone().normalize(),s=this.vertices[f].clone().normalize(),t=this.vertices[g].clone().normalize(),r=n[k][h+1].clone(),v=n[k][h].clone(),w=n[k+1][h].clone(),u=n[k+1][h+1].clone();Math.abs(this.vertices[d].y)===a?(r.x=(r.x+
v.x)/2,this.faces.push(new THREE.Face3(d,f,g,[q,s,t])),this.faceVertexUvs[0].push([r,w,u])):Math.abs(this.vertices[f].y)===a?(w.x=(w.x+u.x)/2,this.faces.push(new THREE.Face3(d,e,f,[q,p,s])),this.faceVertexUvs[0].push([r,v,w])):(this.faces.push(new THREE.Face3(d,e,g,[q,p,t])),this.faceVertexUvs[0].push([r,v,u]),this.faces.push(new THREE.Face3(e,f,g,[p.clone(),s,t.clone()])),this.faceVertexUvs[0].push([v.clone(),w,u.clone()]))}this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,
a)};THREE.SphereGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TextGeometry=function(a,b){b=b||{};var c=THREE.FontUtils.generateShapes(a,b);b.amount=void 0!==b.height?b.height:50;void 0===b.bevelThickness&&(b.bevelThickness=10);void 0===b.bevelSize&&(b.bevelSize=8);void 0===b.bevelEnabled&&(b.bevelEnabled=!1);THREE.ExtrudeGeometry.call(this,c,b)};THREE.TextGeometry.prototype=Object.create(THREE.ExtrudeGeometry.prototype);THREE.TorusGeometry=function(a,b,c,d,e){THREE.Geometry.call(this);this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e};a=a||100;b=b||40;c=c||8;d=d||6;e=e||2*Math.PI;for(var f=new THREE.Vector3,g=[],h=[],k=0;k<=c;k++)for(var l=0;l<=d;l++){var n=l/d*e,q=k/c*Math.PI*2;f.x=a*Math.cos(n);f.y=a*Math.sin(n);var p=new THREE.Vector3;p.x=(a+b*Math.cos(q))*Math.cos(n);p.y=(a+b*Math.cos(q))*Math.sin(n);p.z=b*Math.sin(q);this.vertices.push(p);g.push(new THREE.Vector2(l/d,k/c));h.push(p.clone().sub(f).normalize())}for(k=
1;k<=c;k++)for(l=1;l<=d;l++)a=(d+1)*k+l-1,b=(d+1)*(k-1)+l-1,e=(d+1)*(k-1)+l,f=(d+1)*k+l,n=new THREE.Face3(a,b,f,[h[a].clone(),h[b].clone(),h[f].clone()]),this.faces.push(n),this.faceVertexUvs[0].push([g[a].clone(),g[b].clone(),g[f].clone()]),n=new THREE.Face3(b,e,f,[h[b].clone(),h[e].clone(),h[f].clone()]),this.faces.push(n),this.faceVertexUvs[0].push([g[b].clone(),g[e].clone(),g[f].clone()]);this.computeFaceNormals()};THREE.TorusGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TorusKnotGeometry=function(a,b,c,d,e,f,g){function h(a,b,c,d,e){var f=Math.cos(a),g=Math.sin(a);a*=b/c;b=Math.cos(a);f*=d*(2+b)*0.5;g=d*(2+b)*g*0.5;d=e*d*Math.sin(a)*0.5;return new THREE.Vector3(f,g,d)}THREE.Geometry.call(this);this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,p:e,q:f,heightScale:g};a=a||100;b=b||40;c=c||64;d=d||8;e=e||2;f=f||3;g=g||1;for(var k=Array(c),l=new THREE.Vector3,n=new THREE.Vector3,q=new THREE.Vector3,p=0;p<c;++p){k[p]=Array(d);var s=p/c*2*e*Math.PI,
t=h(s,f,e,a,g),s=h(s+0.01,f,e,a,g);l.subVectors(s,t);n.addVectors(s,t);q.crossVectors(l,n);n.crossVectors(q,l);q.normalize();n.normalize();for(s=0;s<d;++s){var r=s/d*2*Math.PI,v=-b*Math.cos(r),r=b*Math.sin(r),w=new THREE.Vector3;w.x=t.x+v*n.x+r*q.x;w.y=t.y+v*n.y+r*q.y;w.z=t.z+v*n.z+r*q.z;k[p][s]=this.vertices.push(w)-1}}for(p=0;p<c;++p)for(s=0;s<d;++s)e=(p+1)%c,f=(s+1)%d,a=k[p][s],b=k[e][s],e=k[e][f],f=k[p][f],g=new THREE.Vector2(p/c,s/d),l=new THREE.Vector2((p+1)/c,s/d),n=new THREE.Vector2((p+1)/
c,(s+1)/d),q=new THREE.Vector2(p/c,(s+1)/d),this.faces.push(new THREE.Face3(a,b,f)),this.faceVertexUvs[0].push([g,l,q]),this.faces.push(new THREE.Face3(b,e,f)),this.faceVertexUvs[0].push([l.clone(),n,q.clone()]);this.computeFaceNormals();this.computeVertexNormals()};THREE.TorusKnotGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TubeGeometry=function(a,b,c,d,e){THREE.Geometry.call(this);this.parameters={path:a,segments:b,radius:c,radialSegments:d,closed:e};b=b||64;c=c||1;d=d||8;e=e||!1;var f=[],g,h,k=b+1,l,n,q,p,s=new THREE.Vector3,t,r,v;t=new THREE.TubeGeometry.FrenetFrames(a,b,e);r=t.normals;v=t.binormals;this.tangents=t.tangents;this.normals=r;this.binormals=v;for(t=0;t<k;t++)for(f[t]=[],l=t/(k-1),p=a.getPointAt(l),g=r[t],h=v[t],l=0;l<d;l++)n=l/d*2*Math.PI,q=-c*Math.cos(n),n=c*Math.sin(n),s.copy(p),s.x+=q*g.x+n*
h.x,s.y+=q*g.y+n*h.y,s.z+=q*g.z+n*h.z,f[t][l]=this.vertices.push(new THREE.Vector3(s.x,s.y,s.z))-1;for(t=0;t<b;t++)for(l=0;l<d;l++)k=e?(t+1)%b:t+1,s=(l+1)%d,a=f[t][l],c=f[k][l],k=f[k][s],s=f[t][s],r=new THREE.Vector2(t/b,l/d),v=new THREE.Vector2((t+1)/b,l/d),g=new THREE.Vector2((t+1)/b,(l+1)/d),h=new THREE.Vector2(t/b,(l+1)/d),this.faces.push(new THREE.Face3(a,c,s)),this.faceVertexUvs[0].push([r,v,h]),this.faces.push(new THREE.Face3(c,k,s)),this.faceVertexUvs[0].push([v.clone(),g,h.clone()]);this.computeFaceNormals();
this.computeVertexNormals()};THREE.TubeGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames=function(a,b,c){new THREE.Vector3;var d=new THREE.Vector3;new THREE.Vector3;var e=[],f=[],g=[],h=new THREE.Vector3,k=new THREE.Matrix4;b+=1;var l,n,q;this.tangents=e;this.normals=f;this.binormals=g;for(l=0;l<b;l++)n=l/(b-1),e[l]=a.getTangentAt(n),e[l].normalize();f[0]=new THREE.Vector3;g[0]=new THREE.Vector3;a=Number.MAX_VALUE;l=Math.abs(e[0].x);n=Math.abs(e[0].y);q=Math.abs(e[0].z);l<=a&&(a=l,d.set(1,0,0));n<=a&&(a=n,d.set(0,1,0));q<=a&&d.set(0,0,1);h.crossVectors(e[0],
d).normalize();f[0].crossVectors(e[0],h);g[0].crossVectors(e[0],f[0]);for(l=1;l<b;l++)f[l]=f[l-1].clone(),g[l]=g[l-1].clone(),h.crossVectors(e[l-1],e[l]),1E-4<h.length()&&(h.normalize(),d=Math.acos(THREE.Math.clamp(e[l-1].dot(e[l]),-1,1)),f[l].applyMatrix4(k.makeRotationAxis(h,d))),g[l].crossVectors(e[l],f[l]);if(c)for(d=Math.acos(THREE.Math.clamp(f[0].dot(f[b-1]),-1,1)),d/=b-1,0<e[0].dot(h.crossVectors(f[0],f[b-1]))&&(d=-d),l=1;l<b;l++)f[l].applyMatrix4(k.makeRotationAxis(e[l],d*l)),g[l].crossVectors(e[l],
f[l])};THREE.PolyhedronGeometry=function(a,b,c,d){function e(a){var b=a.normalize().clone();b.index=k.vertices.push(b)-1;var c=Math.atan2(a.z,-a.x)/2/Math.PI+0.5;a=Math.atan2(-a.y,Math.sqrt(a.x*a.x+a.z*a.z))/Math.PI+0.5;b.uv=new THREE.Vector2(c,1-a);return b}function f(a,b,c){var d=new THREE.Face3(a.index,b.index,c.index,[a.clone(),b.clone(),c.clone()]);k.faces.push(d);v.copy(a).add(b).add(c).divideScalar(3);d=Math.atan2(v.z,-v.x);k.faceVertexUvs[0].push([h(a.uv,a,d),h(b.uv,b,d),h(c.uv,c,d)])}function g(a,
b){var c=Math.pow(2,b);Math.pow(4,b);for(var d=e(k.vertices[a.a]),g=e(k.vertices[a.b]),h=e(k.vertices[a.c]),l=[],n=0;n<=c;n++){l[n]=[];for(var p=e(d.clone().lerp(h,n/c)),q=e(g.clone().lerp(h,n/c)),r=c-n,s=0;s<=r;s++)l[n][s]=0==s&&n==c?p:e(p.clone().lerp(q,s/r))}for(n=0;n<c;n++)for(s=0;s<2*(c-n)-1;s++)d=Math.floor(s/2),0==s%2?f(l[n][d+1],l[n+1][d],l[n][d]):f(l[n][d+1],l[n+1][d+1],l[n+1][d])}function h(a,b,c){0>c&&1===a.x&&(a=new THREE.Vector2(a.x-1,a.y));0===b.x&&0===b.z&&(a=new THREE.Vector2(c/2/
Math.PI+0.5,a.y));return a.clone()}THREE.Geometry.call(this);c=c||1;d=d||0;for(var k=this,l=0,n=a.length;l<n;l+=3)e(new THREE.Vector3(a[l],a[l+1],a[l+2]));a=this.vertices;for(var q=[],p=l=0,n=b.length;l<n;l+=3,p++){var s=a[b[l]],t=a[b[l+1]],r=a[b[l+2]];q[p]=new THREE.Face3(s.index,t.index,r.index,[s.clone(),t.clone(),r.clone()])}for(var v=new THREE.Vector3,l=0,n=q.length;l<n;l++)g(q[l],d);l=0;for(n=this.faceVertexUvs[0].length;l<n;l++)b=this.faceVertexUvs[0][l],d=b[0].x,a=b[1].x,q=b[2].x,p=Math.max(d,
Math.max(a,q)),s=Math.min(d,Math.min(a,q)),0.9<p&&0.1>s&&(0.2>d&&(b[0].x+=1),0.2>a&&(b[1].x+=1),0.2>q&&(b[2].x+=1));l=0;for(n=this.vertices.length;l<n;l++)this.vertices[l].multiplyScalar(c);this.mergeVertices();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,c)};THREE.PolyhedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.IcosahedronGeometry=function(a,b){this.parameters={radius:a,detail:b};var c=(1+Math.sqrt(5))/2;THREE.PolyhedronGeometry.call(this,[-1,c,0,1,c,0,-1,-c,0,1,-c,0,0,-1,c,0,1,c,0,-1,-c,0,1,-c,c,0,-1,c,0,1,-c,0,-1,-c,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],a,b)};THREE.IcosahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.OctahedronGeometry=function(a,b){this.parameters={radius:a,detail:b};THREE.PolyhedronGeometry.call(this,[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],a,b)};THREE.OctahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TetrahedronGeometry=function(a,b){THREE.PolyhedronGeometry.call(this,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],a,b)};THREE.TetrahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ParametricGeometry=function(a,b,c){THREE.Geometry.call(this);var d=this.vertices,e=this.faces,f=this.faceVertexUvs[0],g,h,k,l,n=b+1;for(g=0;g<=c;g++)for(l=g/c,h=0;h<=b;h++)k=h/b,k=a(k,l),d.push(k);var q,p,s,t;for(g=0;g<c;g++)for(h=0;h<b;h++)a=g*n+h,d=g*n+h+1,l=(g+1)*n+h+1,k=(g+1)*n+h,q=new THREE.Vector2(h/b,g/c),p=new THREE.Vector2((h+1)/b,g/c),s=new THREE.Vector2((h+1)/b,(g+1)/c),t=new THREE.Vector2(h/b,(g+1)/c),e.push(new THREE.Face3(a,d,k)),f.push([q,p,t]),e.push(new THREE.Face3(d,l,k)),
f.push([p.clone(),s,t.clone()]);this.computeFaceNormals();this.computeVertexNormals()};THREE.ParametricGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.AxisHelper=function(a){a=a||1;var b=new THREE.Geometry;b.vertices.push(new THREE.Vector3,new THREE.Vector3(a,0,0),new THREE.Vector3,new THREE.Vector3(0,a,0),new THREE.Vector3,new THREE.Vector3(0,0,a));b.colors.push(new THREE.Color(16711680),new THREE.Color(16755200),new THREE.Color(65280),new THREE.Color(11206400),new THREE.Color(255),new THREE.Color(43775));a=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});THREE.Line.call(this,b,a,THREE.LinePieces)};
THREE.AxisHelper.prototype=Object.create(THREE.Line.prototype);THREE.ArrowHelper=function(a,b,c,d,e,f){THREE.Object3D.call(this);void 0===d&&(d=16776960);void 0===c&&(c=1);void 0===e&&(e=0.2*c);void 0===f&&(f=0.2*e);this.position=b;b=new THREE.Geometry;b.vertices.push(new THREE.Vector3(0,0,0));b.vertices.push(new THREE.Vector3(0,1,0));this.line=new THREE.Line(b,new THREE.LineBasicMaterial({color:d}));this.line.matrixAutoUpdate=!1;this.add(this.line);b=new THREE.CylinderGeometry(0,0.5,1,5,1);b.applyMatrix((new THREE.Matrix4).makeTranslation(0,-0.5,0));this.cone=
new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:d}));this.cone.matrixAutoUpdate=!1;this.add(this.cone);this.setDirection(a);this.setLength(c,e,f)};THREE.ArrowHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.ArrowHelper.prototype.setDirection=function(){var a=new THREE.Vector3,b;return function(c){0.99999<c.y?this.quaternion.set(0,0,0,1):-0.99999>c.y?this.quaternion.set(1,0,0,0):(a.set(c.z,0,-c.x).normalize(),b=Math.acos(c.y),this.quaternion.setFromAxisAngle(a,b))}}();
THREE.ArrowHelper.prototype.setLength=function(a,b,c){void 0===b&&(b=0.2*a);void 0===c&&(c=0.2*b);this.line.scale.set(1,a,1);this.line.updateMatrix();this.cone.scale.set(c,b,c);this.cone.position.y=a;this.cone.updateMatrix()};THREE.ArrowHelper.prototype.setColor=function(a){this.line.material.color.set(a);this.cone.material.color.set(a)};THREE.BoxHelper=function(a){var b=[new THREE.Vector3(1,1,1),new THREE.Vector3(-1,1,1),new THREE.Vector3(-1,-1,1),new THREE.Vector3(1,-1,1),new THREE.Vector3(1,1,-1),new THREE.Vector3(-1,1,-1),new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,-1,-1)];this.vertices=b;var c=new THREE.Geometry;c.vertices.push(b[0],b[1],b[1],b[2],b[2],b[3],b[3],b[0],b[4],b[5],b[5],b[6],b[6],b[7],b[7],b[4],b[0],b[4],b[1],b[5],b[2],b[6],b[3],b[7]);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:16776960}),THREE.LinePieces);
void 0!==a&&this.update(a)};THREE.BoxHelper.prototype=Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.update=function(a){var b=a.geometry;null===b.boundingBox&&b.computeBoundingBox();var c=b.boundingBox.min,b=b.boundingBox.max,d=this.vertices;d[0].set(b.x,b.y,b.z);d[1].set(c.x,b.y,b.z);d[2].set(c.x,c.y,b.z);d[3].set(b.x,c.y,b.z);d[4].set(b.x,b.y,c.z);d[5].set(c.x,b.y,c.z);d[6].set(c.x,c.y,c.z);d[7].set(b.x,c.y,c.z);this.geometry.computeBoundingSphere();this.geometry.verticesNeedUpdate=!0;this.matrixAutoUpdate=!1;this.matrixWorld=a.matrixWorld};THREE.BoundingBoxHelper=function(a,b){var c=void 0!==b?b:8947848;this.object=a;this.box=new THREE.Box3;THREE.Mesh.call(this,new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:c,wireframe:!0}))};THREE.BoundingBoxHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.BoundingBoxHelper.prototype.update=function(){this.box.setFromObject(this.object);this.box.size(this.scale);this.box.center(this.position)};THREE.CameraHelper=function(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){d.vertices.push(new THREE.Vector3);d.colors.push(new THREE.Color(b));void 0===f[a]&&(f[a]=[]);f[a].push(d.vertices.length-1)}var d=new THREE.Geometry,e=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors}),f={};b("n1","n2",16755200);b("n2","n4",16755200);b("n4","n3",16755200);b("n3","n1",16755200);b("f1","f2",16755200);b("f2","f4",16755200);b("f4","f3",16755200);b("f3","f1",16755200);b("n1","f1",16755200);
b("n2","f2",16755200);b("n3","f3",16755200);b("n4","f4",16755200);b("p","n1",16711680);b("p","n2",16711680);b("p","n3",16711680);b("p","n4",16711680);b("u1","u2",43775);b("u2","u3",43775);b("u3","u1",43775);b("c","t",16777215);b("p","c",3355443);b("cn1","cn2",3355443);b("cn3","cn4",3355443);b("cf1","cf2",3355443);b("cf3","cf4",3355443);THREE.Line.call(this,d,e,THREE.LinePieces);this.camera=a;this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;this.pointMap=f;this.update()};
THREE.CameraHelper.prototype=Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Camera,c=new THREE.Projector;return function(){function d(d,g,h,k){a.set(g,h,k);c.unprojectVector(a,b);d=e.pointMap[d];if(void 0!==d)for(g=0,h=d.length;g<h;g++)e.geometry.vertices[d[g]].copy(a)}var e=this;b.projectionMatrix.copy(this.camera.projectionMatrix);d("c",0,0,-1);d("t",0,0,1);d("n1",-1,-1,-1);d("n2",1,-1,-1);d("n3",-1,1,-1);d("n4",1,1,-1);d("f1",-1,-1,1);d("f2",1,-1,1);d("f3",-1,1,1);d("f4",1,1,1);d("u1",0.7,
1.1,-1);d("u2",-0.7,1.1,-1);d("u3",0,2,-1);d("cf1",-1,0,1);d("cf2",1,0,1);d("cf3",0,-1,1);d("cf4",0,1,1);d("cn1",-1,0,-1);d("cn2",1,0,-1);d("cn3",0,-1,-1);d("cn4",0,1,-1);this.geometry.verticesNeedUpdate=!0}}();THREE.DirectionalLightHelper=function(a,b){THREE.Object3D.call(this);this.light=a;this.light.updateMatrixWorld();this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;b=b||1;var c=new THREE.Geometry;c.vertices.push(new THREE.Vector3(-b,b,0),new THREE.Vector3(b,b,0),new THREE.Vector3(b,-b,0),new THREE.Vector3(-b,-b,0),new THREE.Vector3(-b,b,0));var d=new THREE.LineBasicMaterial({fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightPlane=new THREE.Line(c,d);this.add(this.lightPlane);
c=new THREE.Geometry;c.vertices.push(new THREE.Vector3,new THREE.Vector3);d=new THREE.LineBasicMaterial({fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine=new THREE.Line(c,d);this.add(this.targetLine);this.update()};THREE.DirectionalLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.dispose=function(){this.lightPlane.geometry.dispose();this.lightPlane.material.dispose();this.targetLine.geometry.dispose();this.targetLine.material.dispose()};
THREE.DirectionalLightHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(){a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);c.subVectors(b,a);this.lightPlane.lookAt(c);this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine.geometry.vertices[1].copy(c);this.targetLine.geometry.verticesNeedUpdate=!0;this.targetLine.material.color.copy(this.lightPlane.material.color)}}();THREE.EdgesHelper=function(a,b){var c=void 0!==b?b:16777215,d=[0,0],e={},f=function(a,b){return a-b},g=["a","b","c"],h=new THREE.BufferGeometry,k=a.geometry.clone();k.mergeVertices();k.computeFaceNormals();for(var l=k.vertices,k=k.faces,n=0,q=0,p=k.length;q<p;q++)for(var s=k[q],t=0;3>t;t++){d[0]=s[g[t]];d[1]=s[g[(t+1)%3]];d.sort(f);var r=d.toString();void 0===e[r]?(e[r]={vert1:d[0],vert2:d[1],face1:q,face2:void 0},n++):e[r].face2=q}h.addAttribute("position",new THREE.Float32Attribute(2*n,3));d=h.attributes.position.array;
f=0;for(r in e)if(g=e[r],void 0===g.face2||0.9999>k[g.face1].normal.dot(k[g.face2].normal))n=l[g.vert1],d[f++]=n.x,d[f++]=n.y,d[f++]=n.z,n=l[g.vert2],d[f++]=n.x,d[f++]=n.y,d[f++]=n.z;THREE.Line.call(this,h,new THREE.LineBasicMaterial({color:c}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.matrixWorld=a.matrixWorld};THREE.EdgesHelper.prototype=Object.create(THREE.Line.prototype);THREE.FaceNormalsHelper=function(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;a=void 0!==c?c:16776960;d=void 0!==d?d:1;b=new THREE.Geometry;c=0;for(var e=this.object.geometry.faces.length;c<e;c++)b.vertices.push(new THREE.Vector3,new THREE.Vector3);THREE.Line.call(this,b,new THREE.LineBasicMaterial({color:a,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.normalMatrix=new THREE.Matrix3;this.update()};THREE.FaceNormalsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.FaceNormalsHelper.prototype.update=function(){var a=this.geometry.vertices,b=this.object,c=b.geometry.vertices,d=b.geometry.faces,e=b.matrixWorld;b.updateMatrixWorld(!0);this.normalMatrix.getNormalMatrix(e);for(var f=b=0,g=d.length;b<g;b++,f+=2){var h=d[b];a[f].copy(c[h.a]).add(c[h.b]).add(c[h.c]).divideScalar(3).applyMatrix4(e);a[f+1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(a[f])}this.geometry.verticesNeedUpdate=!0;return this};THREE.GridHelper=function(a,b){var c=new THREE.Geometry,d=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1=new THREE.Color(4473924);this.color2=new THREE.Color(8947848);for(var e=-a;e<=a;e+=b){c.vertices.push(new THREE.Vector3(-a,0,e),new THREE.Vector3(a,0,e),new THREE.Vector3(e,0,-a),new THREE.Vector3(e,0,a));var f=0===e?this.color1:this.color2;c.colors.push(f,f,f,f)}THREE.Line.call(this,c,d,THREE.LinePieces)};THREE.GridHelper.prototype=Object.create(THREE.Line.prototype);
THREE.GridHelper.prototype.setColors=function(a,b){this.color1.set(a);this.color2.set(b);this.geometry.colorsNeedUpdate=!0};THREE.HemisphereLightHelper=function(a,b,c,d){THREE.Object3D.call(this);this.light=a;this.light.updateMatrixWorld();this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;this.colors=[new THREE.Color,new THREE.Color];a=new THREE.SphereGeometry(b,4,2);a.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));for(b=0;8>b;b++)a.faces[b].color=this.colors[4>b?0:1];b=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors,wireframe:!0});this.lightSphere=new THREE.Mesh(a,b);this.add(this.lightSphere);
this.update()};THREE.HemisphereLightHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.HemisphereLightHelper.prototype.dispose=function(){this.lightSphere.geometry.dispose();this.lightSphere.material.dispose()};
THREE.HemisphereLightHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());this.lightSphere.geometry.colorsNeedUpdate=!0}}();THREE.PointLightHelper=function(a,b){this.light=a;this.light.updateMatrixWorld();var c=new THREE.SphereGeometry(b,4,2),d=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);THREE.Mesh.call(this,c,d);this.matrixWorld=this.light.matrixWorld;this.matrixAutoUpdate=!1};THREE.PointLightHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.PointLightHelper.prototype.dispose=function(){this.geometry.dispose();this.material.dispose()};
THREE.PointLightHelper.prototype.update=function(){this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)};THREE.SkeletonHelper=function(a){for(var b=a.skeleton,c=new THREE.Geometry,d=0;d<b.bones.length;d++)b.bones[d].parent instanceof THREE.Bone&&(c.vertices.push(new THREE.Vector3),c.vertices.push(new THREE.Vector3),c.colors.push(new THREE.Color(0,0,1)),c.colors.push(new THREE.Color(0,1,0)));d=new THREE.LineBasicMaterial({vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0});THREE.Line.call(this,c,d,THREE.LinePieces);this.skeleton=b;this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;this.update()};
THREE.SkeletonHelper.prototype=Object.create(THREE.Line.prototype);THREE.SkeletonHelper.prototype.update=function(){for(var a=this.geometry,b=0,c=0;c<this.skeleton.bones.length;c++){var d=this.skeleton.bones[c];d.parent instanceof THREE.Bone&&(a.vertices[b].setFromMatrixPosition(d.skinMatrix),a.vertices[b+1].setFromMatrixPosition(d.parent.skinMatrix),b+=2)}a.verticesNeedUpdate=!0;a.computeBoundingSphere()};THREE.SpotLightHelper=function(a){THREE.Object3D.call(this);this.light=a;this.light.updateMatrixWorld();this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;a=new THREE.CylinderGeometry(0,1,1,8,1,!0);a.applyMatrix((new THREE.Matrix4).makeTranslation(0,-0.5,0));a.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));var b=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});this.cone=new THREE.Mesh(a,b);this.add(this.cone);this.update()};THREE.SpotLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.dispose=function(){this.cone.geometry.dispose();this.cone.material.dispose()};THREE.SpotLightHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(){var c=this.light.distance?this.light.distance:1E4,d=c*Math.tan(this.light.angle);this.cone.scale.set(d,d,c);a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);this.cone.lookAt(b.sub(a));this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)}}();THREE.VertexNormalsHelper=function(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;b=void 0!==c?c:16711680;d=void 0!==d?d:1;c=new THREE.Geometry;a=a.geometry.faces;for(var e=0,f=a.length;e<f;e++)for(var g=0,h=a[e].vertexNormals.length;g<h;g++)c.vertices.push(new THREE.Vector3),c.vertices.push(new THREE.Vector3);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:b,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.normalMatrix=new THREE.Matrix3;this.update()};
THREE.VertexNormalsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.VertexNormalsHelper.prototype.update=function(a){var b=new THREE.Vector3;return function(a){a=["a","b","c","d"];this.object.updateMatrixWorld(!0);this.normalMatrix.getNormalMatrix(this.object.matrixWorld);for(var d=this.geometry.vertices,e=this.object.geometry.vertices,f=this.object.geometry.faces,g=this.object.matrixWorld,h=0,k=0,l=f.length;k<l;k++)for(var n=f[k],q=0,p=n.vertexNormals.length;q<p;q++){var s=n.vertexNormals[q];d[h].copy(e[n[a[q]]]).applyMatrix4(g);b.copy(s).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
b.add(d[h]);h+=1;d[h].copy(b);h+=1}this.geometry.verticesNeedUpdate=!0;return this}}();THREE.VertexTangentsHelper=function(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;b=void 0!==c?c:255;d=void 0!==d?d:1;c=new THREE.Geometry;a=a.geometry.faces;for(var e=0,f=a.length;e<f;e++)for(var g=0,h=a[e].vertexTangents.length;g<h;g++)c.vertices.push(new THREE.Vector3),c.vertices.push(new THREE.Vector3);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:b,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.update()};THREE.VertexTangentsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.update=function(a){var b=new THREE.Vector3;return function(a){a=["a","b","c","d"];this.object.updateMatrixWorld(!0);for(var d=this.geometry.vertices,e=this.object.geometry.vertices,f=this.object.geometry.faces,g=this.object.matrixWorld,h=0,k=0,l=f.length;k<l;k++)for(var n=f[k],q=0,p=n.vertexTangents.length;q<p;q++){var s=n.vertexTangents[q];d[h].copy(e[n[a[q]]]).applyMatrix4(g);b.copy(s).transformDirection(g).multiplyScalar(this.size);b.add(d[h]);h+=1;d[h].copy(b);
h+=1}this.geometry.verticesNeedUpdate=!0;return this}}();THREE.WireframeHelper=function(a,b){var c=void 0!==b?b:16777215,d=[0,0],e={},f=function(a,b){return a-b},g=["a","b","c"],h=new THREE.BufferGeometry;if(a.geometry instanceof THREE.Geometry){for(var k=a.geometry.vertices,l=a.geometry.faces,n=0,q=new Uint32Array(6*l.length),p=0,s=l.length;p<s;p++)for(var t=l[p],r=0;3>r;r++){d[0]=t[g[r]];d[1]=t[g[(r+1)%3]];d.sort(f);var v=d.toString();void 0===e[v]&&(q[2*n]=d[0],q[2*n+1]=d[1],e[v]=!0,n++)}h.addAttribute("position",new THREE.Float32Attribute(2*n,3));d=
h.attributes.position.array;p=0;for(s=n;p<s;p++)for(r=0;2>r;r++)n=k[q[2*p+r]],g=6*p+3*r,d[g+0]=n.x,d[g+1]=n.y,d[g+2]=n.z}else if(a.geometry instanceof THREE.BufferGeometry&&void 0!==a.geometry.attributes.index){for(var k=a.geometry.attributes.position.array,s=a.geometry.attributes.index.array,l=a.geometry.offsets,n=0,q=new Uint32Array(2*s.length),t=0,w=l.length;t<w;++t)for(var r=l[t].start,v=l[t].count,g=l[t].index,p=r,u=r+v;p<u;p+=3)for(r=0;3>r;r++)d[0]=g+s[p+r],d[1]=g+s[p+(r+1)%3],d.sort(f),v=d.toString(),
void 0===e[v]&&(q[2*n]=d[0],q[2*n+1]=d[1],e[v]=!0,n++);h.addAttribute("position",new THREE.Float32Attribute(2*n,3));d=h.attributes.position.array;p=0;for(s=n;p<s;p++)for(r=0;2>r;r++)g=6*p+3*r,n=3*q[2*p+r],d[g+0]=k[n],d[g+1]=k[n+1],d[g+2]=k[n+2]}else if(a.geometry instanceof THREE.BufferGeometry)for(k=a.geometry.attributes.position.array,n=k.length/3,q=n/3,h.addAttribute("position",new THREE.Float32Attribute(2*n,3)),d=h.attributes.position.array,p=0,s=q;p<s;p++)for(r=0;3>r;r++)g=18*p+6*r,q=9*p+3*r,
d[g+0]=k[q],d[g+1]=k[q+1],d[g+2]=k[q+2],n=9*p+(r+1)%3*3,d[g+3]=k[n],d[g+4]=k[n+1],d[g+5]=k[n+2];THREE.Line.call(this,h,new THREE.LineBasicMaterial({color:c}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.matrixWorld=a.matrixWorld};THREE.WireframeHelper.prototype=Object.create(THREE.Line.prototype);THREE.ImmediateRenderObject=function(){THREE.Object3D.call(this);this.render=function(a){}};THREE.ImmediateRenderObject.prototype=Object.create(THREE.Object3D.prototype);THREE.LensFlare=function(a,b,c,d,e){THREE.Object3D.call(this);this.lensFlares=[];this.positionScreen=new THREE.Vector3;this.customUpdateCallback=void 0;void 0!==a&&this.add(a,b,c,d,e)};THREE.LensFlare.prototype=Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add=function(a,b,c,d,e,f){void 0===b&&(b=-1);void 0===c&&(c=0);void 0===f&&(f=1);void 0===e&&(e=new THREE.Color(16777215));void 0===d&&(d=THREE.NormalBlending);c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:a,size:b,distance:c,x:0,y:0,z:0,scale:1,rotation:1,opacity:f,color:e,blending:d})};
THREE.LensFlare.prototype.updateLensFlares=function(){var a,b=this.lensFlares.length,c,d=2*-this.positionScreen.x,e=2*-this.positionScreen.y;for(a=0;a<b;a++)c=this.lensFlares[a],c.x=this.positionScreen.x+d*c.distance,c.y=this.positionScreen.y+e*c.distance,c.wantedRotation=c.x*Math.PI*0.25,c.rotation+=0.25*(c.wantedRotation-c.rotation)};THREE.MorphBlendMesh=function(a,b){THREE.Mesh.call(this,a,b);this.animationsMap={};this.animationsList=[];var c=this.geometry.morphTargets.length;this.createAnimation("__default",0,c-1,c/1);this.setAnimationWeight("__default",1)};THREE.MorphBlendMesh.prototype=Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation=function(a,b,c,d){b={startFrame:b,endFrame:c,length:c-b+1,fps:d,duration:(c-b)/d,lastFrame:0,currentFrame:0,active:!1,time:0,direction:1,weight:1,directionBackwards:!1,mirroredLoop:!1};this.animationsMap[a]=b;this.animationsList.push(b)};
THREE.MorphBlendMesh.prototype.autoCreateAnimations=function(a){for(var b=/([a-z]+)(\d+)/,c,d={},e=this.geometry,f=0,g=e.morphTargets.length;f<g;f++){var h=e.morphTargets[f].name.match(b);if(h&&1<h.length){var k=h[1];d[k]||(d[k]={start:Infinity,end:-Infinity});h=d[k];f<h.start&&(h.start=f);f>h.end&&(h.end=f);c||(c=k)}}for(k in d)h=d[k],this.createAnimation(k,h.start,h.end,a);this.firstAnimation=c};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward=function(a){if(a=this.animationsMap[a])a.direction=1,a.directionBackwards=!1};THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward=function(a){if(a=this.animationsMap[a])a.direction=-1,a.directionBackwards=!0};THREE.MorphBlendMesh.prototype.setAnimationFPS=function(a,b){var c=this.animationsMap[a];c&&(c.fps=b,c.duration=(c.end-c.start)/c.fps)};
THREE.MorphBlendMesh.prototype.setAnimationDuration=function(a,b){var c=this.animationsMap[a];c&&(c.duration=b,c.fps=(c.end-c.start)/c.duration)};THREE.MorphBlendMesh.prototype.setAnimationWeight=function(a,b){var c=this.animationsMap[a];c&&(c.weight=b)};THREE.MorphBlendMesh.prototype.setAnimationTime=function(a,b){var c=this.animationsMap[a];c&&(c.time=b)};THREE.MorphBlendMesh.prototype.getAnimationTime=function(a){var b=0;if(a=this.animationsMap[a])b=a.time;return b};
THREE.MorphBlendMesh.prototype.getAnimationDuration=function(a){var b=-1;if(a=this.animationsMap[a])b=a.duration;return b};THREE.MorphBlendMesh.prototype.playAnimation=function(a){var b=this.animationsMap[a];b?(b.time=0,b.active=!0):console.warn("animation["+a+"] undefined")};THREE.MorphBlendMesh.prototype.stopAnimation=function(a){if(a=this.animationsMap[a])a.active=!1};
THREE.MorphBlendMesh.prototype.update=function(a){for(var b=0,c=this.animationsList.length;b<c;b++){var d=this.animationsList[b];if(d.active){var e=d.duration/d.length;d.time+=d.direction*a;if(d.mirroredLoop){if(d.time>d.duration||0>d.time)d.direction*=-1,d.time>d.duration&&(d.time=d.duration,d.directionBackwards=!0),0>d.time&&(d.time=0,d.directionBackwards=!1)}else d.time%=d.duration,0>d.time&&(d.time+=d.duration);var f=d.startFrame+THREE.Math.clamp(Math.floor(d.time/e),0,d.length-1),g=d.weight;
f!==d.currentFrame&&(this.morphTargetInfluences[d.lastFrame]=0,this.morphTargetInfluences[d.currentFrame]=1*g,this.morphTargetInfluences[f]=0,d.lastFrame=d.currentFrame,d.currentFrame=f);e=d.time%e/e;d.directionBackwards&&(e=1-e);this.morphTargetInfluences[d.currentFrame]=e*g;this.morphTargetInfluences[d.lastFrame]=(1-e)*g}}};THREE.LensFlarePlugin=function(){function a(a,c){var d=b.createProgram(),e=b.createShader(b.FRAGMENT_SHADER),f=b.createShader(b.VERTEX_SHADER),g="precision "+c+" float;\n";b.shaderSource(e,g+a.fragmentShader);b.shaderSource(f,g+a.vertexShader);b.compileShader(e);b.compileShader(f);b.attachShader(d,e);b.attachShader(d,f);b.linkProgram(d);return d}var b,c,d,e,f,g,h,k,l,n,q,p,s;this.init=function(t){b=t.context;c=t;d=t.getPrecision();e=new Float32Array(16);f=new Uint16Array(6);t=0;e[t++]=-1;e[t++]=-1;
e[t++]=0;e[t++]=0;e[t++]=1;e[t++]=-1;e[t++]=1;e[t++]=0;e[t++]=1;e[t++]=1;e[t++]=1;e[t++]=1;e[t++]=-1;e[t++]=1;e[t++]=0;e[t++]=1;t=0;f[t++]=0;f[t++]=1;f[t++]=2;f[t++]=0;f[t++]=2;f[t++]=3;g=b.createBuffer();h=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,g);b.bufferData(b.ARRAY_BUFFER,e,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,h);b.bufferData(b.ELEMENT_ARRAY_BUFFER,f,b.STATIC_DRAW);k=b.createTexture();l=b.createTexture();b.bindTexture(b.TEXTURE_2D,k);b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,
0,b.RGB,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.bindTexture(b.TEXTURE_2D,l);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);
b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);0>=b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)?(n=!1,q=a(THREE.ShaderFlares.lensFlare,d)):(n=!0,q=a(THREE.ShaderFlares.lensFlareVertexTexture,d));p={};s={};p.vertex=b.getAttribLocation(q,"position");p.uv=b.getAttribLocation(q,"uv");s.renderType=b.getUniformLocation(q,"renderType");s.map=b.getUniformLocation(q,"map");s.occlusionMap=b.getUniformLocation(q,"occlusionMap");s.opacity=
b.getUniformLocation(q,"opacity");s.color=b.getUniformLocation(q,"color");s.scale=b.getUniformLocation(q,"scale");s.rotation=b.getUniformLocation(q,"rotation");s.screenPosition=b.getUniformLocation(q,"screenPosition")};this.render=function(a,d,e,f){a=a.__webglFlares;var u=a.length;if(u){var y=new THREE.Vector3,L=f/e,x=0.5*e,N=0.5*f,J=16/f,B=new THREE.Vector2(J*L,J),K=new THREE.Vector3(1,1,0),A=new THREE.Vector2(1,1),G=s,J=p;b.useProgram(q);b.enableVertexAttribArray(p.vertex);b.enableVertexAttribArray(p.uv);
b.uniform1i(G.occlusionMap,0);b.uniform1i(G.map,1);b.bindBuffer(b.ARRAY_BUFFER,g);b.vertexAttribPointer(J.vertex,2,b.FLOAT,!1,16,0);b.vertexAttribPointer(J.uv,2,b.FLOAT,!1,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,h);b.disable(b.CULL_FACE);b.depthMask(!1);var D,C,F,z,H;for(D=0;D<u;D++)if(J=16/f,B.set(J*L,J),z=a[D],y.set(z.matrixWorld.elements[12],z.matrixWorld.elements[13],z.matrixWorld.elements[14]),y.applyMatrix4(d.matrixWorldInverse),y.applyProjection(d.projectionMatrix),K.copy(y),A.x=K.x*x+x,
A.y=K.y*N+N,n||0<A.x&&A.x<e&&0<A.y&&A.y<f)for(b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,k),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,A.x-8,A.y-8,16,16,0),b.uniform1i(G.renderType,0),b.uniform2f(G.scale,B.x,B.y),b.uniform3f(G.screenPosition,K.x,K.y,K.z),b.disable(b.BLEND),b.enable(b.DEPTH_TEST),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,l),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,A.x-8,A.y-8,16,16,0),b.uniform1i(G.renderType,1),b.disable(b.DEPTH_TEST),
b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,k),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),z.positionScreen.copy(K),z.customUpdateCallback?z.customUpdateCallback(z):z.updateLensFlares(),b.uniform1i(G.renderType,2),b.enable(b.BLEND),C=0,F=z.lensFlares.length;C<F;C++)H=z.lensFlares[C],0.001<H.opacity&&0.001<H.scale&&(K.x=H.x,K.y=H.y,K.z=H.z,J=H.size*H.scale/f,B.x=J*L,B.y=J,b.uniform3f(G.screenPosition,K.x,K.y,K.z),b.uniform2f(G.scale,B.x,B.y),b.uniform1f(G.rotation,H.rotation),b.uniform1f(G.opacity,
H.opacity),b.uniform3f(G.color,H.color.r,H.color.g,H.color.b),c.setBlending(H.blending,H.blendEquation,H.blendSrc,H.blendDst),c.setTexture(H.texture,1),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0));b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(!0)}}};THREE.ShadowMapPlugin=function(){var a,b,c,d,e,f,g=new THREE.Frustum,h=new THREE.Matrix4,k=new THREE.Vector3,l=new THREE.Vector3,n=new THREE.Vector3;this.init=function(g){a=g.context;b=g;g=THREE.ShaderLib.depthRGBA;var h=THREE.UniformsUtils.clone(g.uniforms);c=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h});d=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0});e=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,
vertexShader:g.vertexShader,uniforms:h,skinning:!0});f=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0,skinning:!0});c._shadowPass=!0;d._shadowPass=!0;e._shadowPass=!0;f._shadowPass=!0};this.render=function(a,c){b.shadowMapEnabled&&b.shadowMapAutoUpdate&&this.update(a,c)};this.update=function(q,p){var s,t,r,v,w,u,y,L,x,N=[];v=0;a.clearColor(1,1,1,1);a.disable(a.BLEND);a.enable(a.CULL_FACE);a.frontFace(a.CCW);b.shadowMapCullFace===THREE.CullFaceFront?
a.cullFace(a.FRONT):a.cullFace(a.BACK);b.setDepthTest(!0);s=0;for(t=q.__lights.length;s<t;s++)if(r=q.__lights[s],r.castShadow)if(r instanceof THREE.DirectionalLight&&r.shadowCascade)for(w=0;w<r.shadowCascadeCount;w++){var J;if(r.shadowCascadeArray[w])J=r.shadowCascadeArray[w];else{x=r;y=w;J=new THREE.DirectionalLight;J.isVirtual=!0;J.onlyShadow=!0;J.castShadow=!0;J.shadowCameraNear=x.shadowCameraNear;J.shadowCameraFar=x.shadowCameraFar;J.shadowCameraLeft=x.shadowCameraLeft;J.shadowCameraRight=x.shadowCameraRight;
J.shadowCameraBottom=x.shadowCameraBottom;J.shadowCameraTop=x.shadowCameraTop;J.shadowCameraVisible=x.shadowCameraVisible;J.shadowDarkness=x.shadowDarkness;J.shadowBias=x.shadowCascadeBias[y];J.shadowMapWidth=x.shadowCascadeWidth[y];J.shadowMapHeight=x.shadowCascadeHeight[y];J.pointsWorld=[];J.pointsFrustum=[];var B=J.pointsWorld;u=J.pointsFrustum;for(L=0;8>L;L++)B[L]=new THREE.Vector3,u[L]=new THREE.Vector3;B=x.shadowCascadeNearZ[y];x=x.shadowCascadeFarZ[y];u[0].set(-1,-1,B);u[1].set(1,-1,B);u[2].set(-1,
1,B);u[3].set(1,1,B);u[4].set(-1,-1,x);u[5].set(1,-1,x);u[6].set(-1,1,x);u[7].set(1,1,x);J.originalCamera=p;u=new THREE.Gyroscope;u.position.copy(r.shadowCascadeOffset);u.add(J);u.add(J.target);p.add(u);r.shadowCascadeArray[w]=J;console.log("Created virtualLight",J)}y=r;B=w;x=y.shadowCascadeArray[B];x.position.copy(y.position);x.target.position.copy(y.target.position);x.lookAt(x.target);x.shadowCameraVisible=y.shadowCameraVisible;x.shadowDarkness=y.shadowDarkness;x.shadowBias=y.shadowCascadeBias[B];
u=y.shadowCascadeNearZ[B];y=y.shadowCascadeFarZ[B];x=x.pointsFrustum;x[0].z=u;x[1].z=u;x[2].z=u;x[3].z=u;x[4].z=y;x[5].z=y;x[6].z=y;x[7].z=y;N[v]=J;v++}else N[v]=r,v++;s=0;for(t=N.length;s<t;s++){r=N[s];r.shadowMap||(w=THREE.LinearFilter,b.shadowMapType===THREE.PCFSoftShadowMap&&(w=THREE.NearestFilter),r.shadowMap=new THREE.WebGLRenderTarget(r.shadowMapWidth,r.shadowMapHeight,{minFilter:w,magFilter:w,format:THREE.RGBAFormat}),r.shadowMapSize=new THREE.Vector2(r.shadowMapWidth,r.shadowMapHeight),r.shadowMatrix=
new THREE.Matrix4);if(!r.shadowCamera){if(r instanceof THREE.SpotLight)r.shadowCamera=new THREE.PerspectiveCamera(r.shadowCameraFov,r.shadowMapWidth/r.shadowMapHeight,r.shadowCameraNear,r.shadowCameraFar);else if(r instanceof THREE.DirectionalLight)r.shadowCamera=new THREE.OrthographicCamera(r.shadowCameraLeft,r.shadowCameraRight,r.shadowCameraTop,r.shadowCameraBottom,r.shadowCameraNear,r.shadowCameraFar);else{console.error("Unsupported light type for shadow");continue}q.add(r.shadowCamera);!0===
q.autoUpdate&&q.updateMatrixWorld()}r.shadowCameraVisible&&!r.cameraHelper&&(r.cameraHelper=new THREE.CameraHelper(r.shadowCamera),r.shadowCamera.add(r.cameraHelper));if(r.isVirtual&&J.originalCamera==p){w=p;v=r.shadowCamera;u=r.pointsFrustum;x=r.pointsWorld;k.set(Infinity,Infinity,Infinity);l.set(-Infinity,-Infinity,-Infinity);for(y=0;8>y;y++)B=x[y],B.copy(u[y]),THREE.ShadowMapPlugin.__projector.unprojectVector(B,w),B.applyMatrix4(v.matrixWorldInverse),B.x<k.x&&(k.x=B.x),B.x>l.x&&(l.x=B.x),B.y<k.y&&
(k.y=B.y),B.y>l.y&&(l.y=B.y),B.z<k.z&&(k.z=B.z),B.z>l.z&&(l.z=B.z);v.left=k.x;v.right=l.x;v.top=l.y;v.bottom=k.y;v.updateProjectionMatrix()}v=r.shadowMap;u=r.shadowMatrix;w=r.shadowCamera;w.position.setFromMatrixPosition(r.matrixWorld);n.setFromMatrixPosition(r.target.matrixWorld);w.lookAt(n);w.updateMatrixWorld();w.matrixWorldInverse.getInverse(w.matrixWorld);r.cameraHelper&&(r.cameraHelper.visible=r.shadowCameraVisible);r.shadowCameraVisible&&r.cameraHelper.update();u.set(0.5,0,0,0.5,0,0.5,0,0.5,
0,0,0.5,0.5,0,0,0,1);u.multiply(w.projectionMatrix);u.multiply(w.matrixWorldInverse);h.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse);g.setFromMatrix(h);b.setRenderTarget(v);b.clear();x=q.__webglObjects;r=0;for(v=x.length;r<v;r++)y=x[r],u=y.object,y.render=!1,!u.visible||!u.castShadow||(u instanceof THREE.Mesh||u instanceof THREE.ParticleSystem)&&u.frustumCulled&&!g.intersectsObject(u)||(u._modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,u.matrixWorld),y.render=!0);var K;r=0;for(v=
x.length;r<v;r++)y=x[r],y.render&&(u=y.object,y=y.buffer,B=u.material instanceof THREE.MeshFaceMaterial?u.material.materials[0]:u.material,L=void 0!==u.geometry.morphTargets&&0<u.geometry.morphTargets.length&&B.morphTargets,K=u instanceof THREE.SkinnedMesh&&B.skinning,L=u.customDepthMaterial?u.customDepthMaterial:K?L?f:e:L?d:c,b.setMaterialFaces(B),y instanceof THREE.BufferGeometry?b.renderBufferDirect(w,q.__lights,null,L,y,u):b.renderBuffer(w,q.__lights,null,L,y,u));x=q.__webglObjectsImmediate;r=
0;for(v=x.length;r<v;r++)y=x[r],u=y.object,u.visible&&u.castShadow&&(u._modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,u.matrixWorld),b.renderImmediateObject(w,q.__lights,null,c,u))}s=b.getClearColor();t=b.getClearAlpha();a.clearColor(s.r,s.g,s.b,t);a.enable(a.BLEND);b.shadowMapCullFace===THREE.CullFaceFront&&a.cullFace(a.BACK)}};THREE.ShadowMapPlugin.__projector=new THREE.Projector;THREE.SpritePlugin=function(){var a,b,c,d,e,f,g,h,k,l,n,q,p,s,t,r,v;function w(a,b){return a.z!==b.z?b.z-a.z:b.id-a.id}var u,y,L,x,N,J,B,K;this.init=function(w){u=w.context;y=w;x=new Float32Array([-0.5,-0.5,0,0,0.5,-0.5,1,0,0.5,0.5,1,1,-0.5,0.5,0,1]);N=new Uint16Array([0,1,2,0,2,3]);J=u.createBuffer();B=u.createBuffer();u.bindBuffer(u.ARRAY_BUFFER,J);u.bufferData(u.ARRAY_BUFFER,x,u.STATIC_DRAW);u.bindBuffer(u.ELEMENT_ARRAY_BUFFER,B);u.bufferData(u.ELEMENT_ARRAY_BUFFER,N,u.STATIC_DRAW);w=u.createProgram();
var G=u.createShader(u.VERTEX_SHADER),D=u.createShader(u.FRAGMENT_SHADER);u.shaderSource(G,["precision "+y.getPrecision()+" float;","uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n"));
u.shaderSource(D,["precision "+y.getPrecision()+" float;","uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n"));
u.compileShader(G);u.compileShader(D);u.attachShader(w,G);u.attachShader(w,D);u.linkProgram(w);K=w;r=u.getAttribLocation(K,"position");v=u.getAttribLocation(K,"uv");a=u.getUniformLocation(K,"uvOffset");b=u.getUniformLocation(K,"uvScale");c=u.getUniformLocation(K,"rotation");d=u.getUniformLocation(K,"scale");e=u.getUniformLocation(K,"color");f=u.getUniformLocation(K,"map");g=u.getUniformLocation(K,"opacity");h=u.getUniformLocation(K,"modelViewMatrix");k=u.getUniformLocation(K,"projectionMatrix");l=
u.getUniformLocation(K,"fogType");n=u.getUniformLocation(K,"fogDensity");q=u.getUniformLocation(K,"fogNear");p=u.getUniformLocation(K,"fogFar");s=u.getUniformLocation(K,"fogColor");t=u.getUniformLocation(K,"alphaTest");w=document.createElement("canvas");w.width=8;w.height=8;G=w.getContext("2d");G.fillStyle="#ffffff";G.fillRect(0,0,w.width,w.height);L=new THREE.Texture(w);L.needsUpdate=!0};this.render=function(A,x,D,C){D=A.__webglSprites;if(C=D.length){u.useProgram(K);u.enableVertexAttribArray(r);
u.enableVertexAttribArray(v);u.disable(u.CULL_FACE);u.enable(u.BLEND);u.bindBuffer(u.ARRAY_BUFFER,J);u.vertexAttribPointer(r,2,u.FLOAT,!1,16,0);u.vertexAttribPointer(v,2,u.FLOAT,!1,16,8);u.bindBuffer(u.ELEMENT_ARRAY_BUFFER,B);u.uniformMatrix4fv(k,!1,x.projectionMatrix.elements);u.activeTexture(u.TEXTURE0);u.uniform1i(f,0);var F=0,z=0,H=A.fog;H?(u.uniform3f(s,H.color.r,H.color.g,H.color.b),H instanceof THREE.Fog?(u.uniform1f(q,H.near),u.uniform1f(p,H.far),u.uniform1i(l,1),z=F=1):H instanceof THREE.FogExp2&&
(u.uniform1f(n,H.density),u.uniform1i(l,2),z=F=2)):(u.uniform1i(l,0),z=F=0);for(var E,N=[],H=0;H<C;H++)E=D[H],!1!==E.visible&&(E._modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld),E.z=-E._modelViewMatrix.elements[14]);D.sort(w);for(H=0;H<C;H++)E=D[H],!1!==E.visible&&(x=E.material,u.uniform1f(t,x.alphaTest),u.uniformMatrix4fv(h,!1,E._modelViewMatrix.elements),N[0]=E.scale.x,N[1]=E.scale.y,E=A.fog&&x.fog?z:0,F!==E&&(u.uniform1i(l,E),F=E),null!==x.map?(u.uniform2f(a,x.map.offset.x,
x.map.offset.y),u.uniform2f(b,x.map.repeat.x,x.map.repeat.y)):(u.uniform2f(a,0,0),u.uniform2f(b,1,1)),u.uniform1f(g,x.opacity),u.uniform3f(e,x.color.r,x.color.g,x.color.b),u.uniform1f(c,x.rotation),u.uniform2fv(d,N),y.setBlending(x.blending,x.blendEquation,x.blendSrc,x.blendDst),y.setDepthTest(x.depthTest),y.setDepthWrite(x.depthWrite),x.map&&x.map.image&&x.map.image.width?y.setTexture(x.map,0):y.setTexture(L,0),u.drawElements(u.TRIANGLES,6,u.UNSIGNED_SHORT,0));u.enable(u.CULL_FACE)}}};THREE.DepthPassPlugin=function(){this.enabled=!1;this.renderTarget=null;var a,b,c,d,e,f,g=new THREE.Frustum,h=new THREE.Matrix4;this.init=function(g){a=g.context;b=g;g=THREE.ShaderLib.depthRGBA;var h=THREE.UniformsUtils.clone(g.uniforms);c=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h});d=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0});e=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,
vertexShader:g.vertexShader,uniforms:h,skinning:!0});f=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0,skinning:!0});c._shadowPass=!0;d._shadowPass=!0;e._shadowPass=!0;f._shadowPass=!0};this.render=function(a,b){this.enabled&&this.update(a,b)};this.update=function(k,l){var n,q,p,s,t,r;a.clearColor(1,1,1,1);a.disable(a.BLEND);b.setDepthTest(!0);!0===k.autoUpdate&&k.updateMatrixWorld();l.matrixWorldInverse.getInverse(l.matrixWorld);h.multiplyMatrices(l.projectionMatrix,
l.matrixWorldInverse);g.setFromMatrix(h);b.setRenderTarget(this.renderTarget);b.clear();r=k.__webglObjects;n=0;for(q=r.length;n<q;n++)p=r[n],t=p.object,p.render=!1,!t.visible||(t instanceof THREE.Mesh||t instanceof THREE.ParticleSystem)&&t.frustumCulled&&!g.intersectsObject(t)||(t._modelViewMatrix.multiplyMatrices(l.matrixWorldInverse,t.matrixWorld),p.render=!0);var v;n=0;for(q=r.length;n<q;n++)p=r[n],p.render&&(t=p.object,p=p.buffer,t instanceof THREE.ParticleSystem&&!t.customDepthMaterial||((v=
t.material instanceof THREE.MeshFaceMaterial?t.material.materials[0]:t.material)&&b.setMaterialFaces(t.material),s=void 0!==t.geometry.morphTargets&&0<t.geometry.morphTargets.length&&v.morphTargets,v=t instanceof THREE.SkinnedMesh&&v.skinning,s=t.customDepthMaterial?t.customDepthMaterial:v?s?f:e:s?d:c,p instanceof THREE.BufferGeometry?b.renderBufferDirect(l,k.__lights,null,s,p,t):b.renderBuffer(l,k.__lights,null,s,p,t)));r=k.__webglObjectsImmediate;n=0;for(q=r.length;n<q;n++)p=r[n],t=p.object,t.visible&&
(t._modelViewMatrix.multiplyMatrices(l.matrixWorldInverse,t.matrixWorld),b.renderImmediateObject(l,k.__lights,null,c,t));n=b.getClearColor();q=b.getClearAlpha();a.clearColor(n.r,n.g,n.b,q);a.enable(a.BLEND)}};THREE.ShaderFlares={lensFlareVertexTexture:{vertexShader:"uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"},lensFlare:{vertexShader:"uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"}};

// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com
//
// Added 4D noise
// Joshua Koo zz85nus@gmail.com 

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
var SimplexNoise = function(r) {
	if (r == undefined) r = Math;
  this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
                                 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
                                 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; 

  this.grad4 = [[0,1,1,1], [0,1,1,-1], [0,1,-1,1], [0,1,-1,-1],
	     [0,-1,1,1], [0,-1,1,-1], [0,-1,-1,1], [0,-1,-1,-1],
	     [1,0,1,1], [1,0,1,-1], [1,0,-1,1], [1,0,-1,-1],
	     [-1,0,1,1], [-1,0,1,-1], [-1,0,-1,1], [-1,0,-1,-1],
	     [1,1,0,1], [1,1,0,-1], [1,-1,0,1], [1,-1,0,-1],
	     [-1,1,0,1], [-1,1,0,-1], [-1,-1,0,1], [-1,-1,0,-1],
	     [1,1,1,0], [1,1,-1,0], [1,-1,1,0], [1,-1,-1,0],
	     [-1,1,1,0], [-1,1,-1,0], [-1,-1,1,0], [-1,-1,-1,0]];

  this.p = [];
  for (var i=0; i<256; i++) {
	  this.p[i] = Math.floor(r.random()*256);
  }
  // To remove the need for index wrapping, double the permutation table length 
  this.perm = []; 
  for(var i=0; i<512; i++) {
		this.perm[i]=this.p[i & 255];
	} 

  // A lookup table to traverse the simplex around a given point in 4D. 
  // Details can be found where this table is used, in the 4D noise method. 
  this.simplex = [ 
    [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0], 
    [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0], 
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
    [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0], 
    [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0], 
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
    [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0], 
    [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]; 
};

SimplexNoise.prototype.dot = function(g, x, y) { 
	return g[0]*x + g[1]*y;
};

SimplexNoise.prototype.dot3 = function(g, x, y, z) {
  return g[0]*x + g[1]*y + g[2]*z; 
}

SimplexNoise.prototype.dot4 = function(g, x, y, z, w) {
  return g[0]*x + g[1]*y + g[2]*z + g[3]*w;
};

SimplexNoise.prototype.noise = function(xin, yin) { 
  var n0, n1, n2; // Noise contributions from the three corners 
  // Skew the input space to determine which simplex cell we're in 
  var F2 = 0.5*(Math.sqrt(3.0)-1.0); 
  var s = (xin+yin)*F2; // Hairy factor for 2D 
  var i = Math.floor(xin+s); 
  var j = Math.floor(yin+s); 
  var G2 = (3.0-Math.sqrt(3.0))/6.0; 
  var t = (i+j)*G2; 
  var X0 = i-t; // Unskew the cell origin back to (x,y) space 
  var Y0 = j-t; 
  var x0 = xin-X0; // The x,y distances from the cell origin 
  var y0 = yin-Y0; 
  // For the 2D case, the simplex shape is an equilateral triangle. 
  // Determine which simplex we are in. 
  var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords 
  if(x0>y0) {i1=1; j1=0;} // lower triangle, XY order: (0,0)->(1,0)->(1,1) 
  else {i1=0; j1=1;}      // upper triangle, YX order: (0,0)->(0,1)->(1,1) 
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and 
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where 
  // c = (3-sqrt(3))/6 
  var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords 
  var y1 = y0 - j1 + G2; 
  var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords 
  var y2 = y0 - 1.0 + 2.0 * G2; 
  // Work out the hashed gradient indices of the three simplex corners 
  var ii = i & 255; 
  var jj = j & 255; 
  var gi0 = this.perm[ii+this.perm[jj]] % 12; 
  var gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12; 
  var gi2 = this.perm[ii+1+this.perm[jj+1]] % 12; 
  // Calculate the contribution from the three corners 
  var t0 = 0.5 - x0*x0-y0*y0; 
  if(t0<0) n0 = 0.0; 
  else { 
    t0 *= t0; 
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient 
  } 
  var t1 = 0.5 - x1*x1-y1*y1; 
  if(t1<0) n1 = 0.0; 
  else { 
    t1 *= t1; 
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1); 
  }
  var t2 = 0.5 - x2*x2-y2*y2; 
  if(t2<0) n2 = 0.0; 
  else { 
    t2 *= t2; 
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2); 
  } 
  // Add contributions from each corner to get the final noise value. 
  // The result is scaled to return values in the interval [-1,1]. 
  return 70.0 * (n0 + n1 + n2); 
};

// 3D simplex noise 
SimplexNoise.prototype.noise3d = function(xin, yin, zin) { 
  var n0, n1, n2, n3; // Noise contributions from the four corners 
  // Skew the input space to determine which simplex cell we're in 
  var F3 = 1.0/3.0; 
  var s = (xin+yin+zin)*F3; // Very nice and simple skew factor for 3D 
  var i = Math.floor(xin+s); 
  var j = Math.floor(yin+s); 
  var k = Math.floor(zin+s); 
  var G3 = 1.0/6.0; // Very nice and simple unskew factor, too 
  var t = (i+j+k)*G3; 
  var X0 = i-t; // Unskew the cell origin back to (x,y,z) space 
  var Y0 = j-t; 
  var Z0 = k-t; 
  var x0 = xin-X0; // The x,y,z distances from the cell origin 
  var y0 = yin-Y0; 
  var z0 = zin-Z0; 
  // For the 3D case, the simplex shape is a slightly irregular tetrahedron. 
  // Determine which simplex we are in. 
  var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords 
  var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords 
  if(x0>=y0) { 
    if(y0>=z0) 
      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } // X Y Z order 
      else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } // X Z Y order 
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } // Z X Y order 
    } 
  else { // x0<y0 
    if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } // Z Y X order 
    else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } // Y Z X order 
    else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } // Y X Z order 
  } 
  // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z), 
  // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and 
  // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where 
  // c = 1/6.
  var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords 
  var y1 = y0 - j1 + G3; 
  var z1 = z0 - k1 + G3; 
  var x2 = x0 - i2 + 2.0*G3; // Offsets for third corner in (x,y,z) coords 
  var y2 = y0 - j2 + 2.0*G3; 
  var z2 = z0 - k2 + 2.0*G3; 
  var x3 = x0 - 1.0 + 3.0*G3; // Offsets for last corner in (x,y,z) coords 
  var y3 = y0 - 1.0 + 3.0*G3; 
  var z3 = z0 - 1.0 + 3.0*G3; 
  // Work out the hashed gradient indices of the four simplex corners 
  var ii = i & 255; 
  var jj = j & 255; 
  var kk = k & 255; 
  var gi0 = this.perm[ii+this.perm[jj+this.perm[kk]]] % 12; 
  var gi1 = this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]] % 12; 
  var gi2 = this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]] % 12; 
  var gi3 = this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]] % 12; 
  // Calculate the contribution from the four corners 
  var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0; 
  if(t0<0) n0 = 0.0; 
  else { 
    t0 *= t0; 
    n0 = t0 * t0 * this.dot3(this.grad3[gi0], x0, y0, z0); 
  }
  var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1; 
  if(t1<0) n1 = 0.0; 
  else { 
    t1 *= t1; 
    n1 = t1 * t1 * this.dot3(this.grad3[gi1], x1, y1, z1); 
  } 
  var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2; 
  if(t2<0) n2 = 0.0; 
  else { 
    t2 *= t2; 
    n2 = t2 * t2 * this.dot3(this.grad3[gi2], x2, y2, z2); 
  } 
  var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3; 
  if(t3<0) n3 = 0.0; 
  else { 
    t3 *= t3; 
    n3 = t3 * t3 * this.dot3(this.grad3[gi3], x3, y3, z3); 
  } 
  // Add contributions from each corner to get the final noise value. 
  // The result is scaled to stay just inside [-1,1] 
  return 32.0*(n0 + n1 + n2 + n3); 
};

// 4D simplex noise
SimplexNoise.prototype.noise4d = function( x, y, z, w ) {
	// For faster and easier lookups
	var grad4 = this.grad4;
	var simplex = this.simplex;
	var perm = this.perm;
	
   // The skewing and unskewing factors are hairy again for the 4D case
   var F4 = (Math.sqrt(5.0)-1.0)/4.0;
   var G4 = (5.0-Math.sqrt(5.0))/20.0;
   var n0, n1, n2, n3, n4; // Noise contributions from the five corners
   // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
   var s = (x + y + z + w) * F4; // Factor for 4D skewing
   var i = Math.floor(x + s);
   var j = Math.floor(y + s);
   var k = Math.floor(z + s);
   var l = Math.floor(w + s);
   var t = (i + j + k + l) * G4; // Factor for 4D unskewing
   var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
   var Y0 = j - t;
   var Z0 = k - t;
   var W0 = l - t;
   var x0 = x - X0;  // The x,y,z,w distances from the cell origin
   var y0 = y - Y0;
   var z0 = z - Z0;
   var w0 = w - W0;

   // For the 4D case, the simplex is a 4D shape I won't even try to describe.
   // To find out which of the 24 possible simplices we're in, we need to
   // determine the magnitude ordering of x0, y0, z0 and w0.
   // The method below is a good way of finding the ordering of x,y,z,w and
   // then find the correct traversal order for the simplex we’re in.
   // First, six pair-wise comparisons are performed between each possible pair
   // of the four coordinates, and the results are used to add up binary bits
   // for an integer index.
   var c1 = (x0 > y0) ? 32 : 0;
   var c2 = (x0 > z0) ? 16 : 0;
   var c3 = (y0 > z0) ? 8 : 0;
   var c4 = (x0 > w0) ? 4 : 0;
   var c5 = (y0 > w0) ? 2 : 0;
   var c6 = (z0 > w0) ? 1 : 0;
   var c = c1 + c2 + c3 + c4 + c5 + c6;
   var i1, j1, k1, l1; // The integer offsets for the second simplex corner
   var i2, j2, k2, l2; // The integer offsets for the third simplex corner
   var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
   // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
   // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
   // impossible. Only the 24 indices which have non-zero entries make any sense.
   // We use a thresholding to set the coordinates in turn from the largest magnitude.
   // The number 3 in the "simplex" array is at the position of the largest coordinate.
   i1 = simplex[c][0]>=3 ? 1 : 0;
   j1 = simplex[c][1]>=3 ? 1 : 0;
   k1 = simplex[c][2]>=3 ? 1 : 0;
   l1 = simplex[c][3]>=3 ? 1 : 0;
   // The number 2 in the "simplex" array is at the second largest coordinate.
   i2 = simplex[c][0]>=2 ? 1 : 0;
   j2 = simplex[c][1]>=2 ? 1 : 0;    k2 = simplex[c][2]>=2 ? 1 : 0;
   l2 = simplex[c][3]>=2 ? 1 : 0;
   // The number 1 in the "simplex" array is at the second smallest coordinate.
   i3 = simplex[c][0]>=1 ? 1 : 0;
   j3 = simplex[c][1]>=1 ? 1 : 0;
   k3 = simplex[c][2]>=1 ? 1 : 0;
   l3 = simplex[c][3]>=1 ? 1 : 0;
   // The fifth corner has all coordinate offsets = 1, so no need to look that up.
   var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
   var y1 = y0 - j1 + G4;
   var z1 = z0 - k1 + G4;
   var w1 = w0 - l1 + G4;
   var x2 = x0 - i2 + 2.0*G4; // Offsets for third corner in (x,y,z,w) coords
   var y2 = y0 - j2 + 2.0*G4;
   var z2 = z0 - k2 + 2.0*G4;
   var w2 = w0 - l2 + 2.0*G4;
   var x3 = x0 - i3 + 3.0*G4; // Offsets for fourth corner in (x,y,z,w) coords
   var y3 = y0 - j3 + 3.0*G4;
   var z3 = z0 - k3 + 3.0*G4;
   var w3 = w0 - l3 + 3.0*G4;
   var x4 = x0 - 1.0 + 4.0*G4; // Offsets for last corner in (x,y,z,w) coords
   var y4 = y0 - 1.0 + 4.0*G4;
   var z4 = z0 - 1.0 + 4.0*G4;
   var w4 = w0 - 1.0 + 4.0*G4;
   // Work out the hashed gradient indices of the five simplex corners
   var ii = i & 255;
   var jj = j & 255;
   var kk = k & 255;
   var ll = l & 255;
   var gi0 = perm[ii+perm[jj+perm[kk+perm[ll]]]] % 32;
   var gi1 = perm[ii+i1+perm[jj+j1+perm[kk+k1+perm[ll+l1]]]] % 32;
   var gi2 = perm[ii+i2+perm[jj+j2+perm[kk+k2+perm[ll+l2]]]] % 32;
   var gi3 = perm[ii+i3+perm[jj+j3+perm[kk+k3+perm[ll+l3]]]] % 32;
   var gi4 = perm[ii+1+perm[jj+1+perm[kk+1+perm[ll+1]]]] % 32;
   // Calculate the contribution from the five corners
   var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0 - w0*w0;
   if(t0<0) n0 = 0.0;
   else {
     t0 *= t0;
     n0 = t0 * t0 * this.dot4(grad4[gi0], x0, y0, z0, w0);
   }
  var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1 - w1*w1;
   if(t1<0) n1 = 0.0;
   else {
     t1 *= t1;
     n1 = t1 * t1 * this.dot4(grad4[gi1], x1, y1, z1, w1);
   }
  var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2 - w2*w2;
   if(t2<0) n2 = 0.0;
   else {
     t2 *= t2;
     n2 = t2 * t2 * this.dot4(grad4[gi2], x2, y2, z2, w2);
   }   var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3 - w3*w3;
   if(t3<0) n3 = 0.0;
   else {
     t3 *= t3;
     n3 = t3 * t3 * this.dot4(grad4[gi3], x3, y3, z3, w3);
   }
  var t4 = 0.6 - x4*x4 - y4*y4 - z4*z4 - w4*w4;
   if(t4<0) n4 = 0.0;
   else {
     t4 *= t4;
     n4 = t4 * t4 * this.dot4(grad4[gi4], x4, y4, z4, w4);
   }
   // Sum up and scale the result to cover the range [-1,1]
   return 27.0 * (n0 + n1 + n2 + n3 + n4);
};

/*!
 * VERSION: beta 1.9.0
 * DATE: 2013-03-01
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, easing.EasePack, plugins.CSSPlugin, plugins.RoundPropsPlugin, plugins.BezierPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a,b,d){c.call(this,a,b,d),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0},e=function(a){return a.jquery||"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style},f=function(a){var b=[];return a.each(function(){b.push(this)}),b},g=d.prototype=c.to({},.1,{}),h=[];d.version="1.9.0",g.constructor=d,g.kill()._gc=!1,d.killTweensOf=d.killDelayedCallsTo=c.killTweensOf,d.getTweensOf=c.getTweensOf,d.ticker=c.ticker,g.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),c.prototype.invalidate.call(this)},g.updateTo=function(a,b){var e,d=this.ratio;b&&null!=this.timeline&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(e in a)this.vars[e]=a[e];if(this._initted)if(b)this._initted=!1;else if(this._notifyPluginsOfEnabled&&this._firstPT&&c._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var f=this._time;this.render(0,!0,!1),this._initted=!1,this.render(f,!0,!1)}else if(this._time>0){this._initted=!1,this._init();for(var i,g=1/(1-d),h=this._firstPT;h;)i=h.s+h.c,h.c*=g,h.s=i-h.c,h=h._next}return this},g.render=function(a,b,c){var i,j,k,d=this._dirty?this.totalDuration():this._totalDuration,e=this._time,f=this._totalTime,g=this._cycle;if(a>=d)this._totalTime=d,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(i=!0,j="onComplete"),0===this._duration&&((0===a||0>this._rawPrevTime)&&this._rawPrevTime!==a&&(c=!0),this._rawPrevTime=a);else if(0>=a)this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==f||0===this._duration&&this._rawPrevTime>0)&&(j="onReverseComplete",i=this._reversed),0>a?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(c=!0),this._rawPrevTime=a)):this._initted||(c=!0);else{if(this._totalTime=this._time=a,0!==this._repeat){var l=this._duration+this._repeatDelay;this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=this._duration-this._time),this._time>this._duration?this._time=this._duration:0>this._time&&(this._time=0)}if(this._easeType){var m=this._time/this._duration,n=this._easeType,o=this._easePower;(1===n||3===n&&m>=.5)&&(m=1-m),3===n&&(m*=2),1===o?m*=m:2===o?m*=m*m:3===o?m*=m*m*m:4===o&&(m*=m*m*m*m),this.ratio=1===n?1-m:2===n?m:.5>this._time/this._duration?m/2:1-m/2}else this.ratio=this._ease.getRatio(this._time/this._duration)}if(e===this._time&&!c)return f!==this._totalTime&&this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||h)),void 0;for(this._initted||(this._init(),!i&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration))),this._active||this._paused||(this._active=!0),0===f&&(this._startAt&&this._startAt.render(a,b,c),this.vars.onStart&&(0!==this._totalTime||0===this._duration)&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||h))),k=this._firstPT;k;)k.f?k.t[k.p](k.c*this.ratio+k.s):k.t[k.p]=k.c*this.ratio+k.s,k=k._next;this._onUpdate&&(0>a&&this._startAt&&this._startAt.render(a,b,c),b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||h)),this._cycle!==g&&(b||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||h)),j&&(this._gc||(0>a&&this._startAt&&(this._onUpdate||this._startAt.render(a,b,c)),i&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[j]&&this.vars[j].apply(this.vars[j+"Scope"]||this,this.vars[j+"Params"]||h)))},d.to=function(a,b,c){return new d(a,b,c)},d.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender!==!1&&(c.immediateRender=!0),new d(a,b,c)},d.fromTo=function(a,b,c,e){return e.startAt=c,e.immediateRender=0!=e.immediateRender&&0!=c.immediateRender,new d(a,b,e)},d.staggerTo=d.allTo=function(a,b,g,h,i,j,k){h=h||0;var n,o,p,q,l=g.delay||0,m=[];for(a instanceof Array||("string"==typeof a&&(a=c.selector(a)||a),e(a)&&(a=f(a))),n=a.length,p=0;n>p;p++){o={};for(q in g)o[q]=g[q];o.delay=l,p===n-1&&i&&(o.onComplete=function(){g.onComplete&&g.onComplete.apply(g.onCompleteScope,g.onCompleteParams),i.apply(k,j)}),m[p]=new d(a[p],b,o),l+=h}return m},d.staggerFrom=d.allFrom=function(a,b,c,e,f,g,h){return c.runBackwards=!0,0!=c.immediateRender&&(c.immediateRender=!0),d.staggerTo(a,b,c,e,f,g,h)},d.staggerFromTo=d.allFromTo=function(a,b,c,e,f,g,h,i){return e.startAt=c,e.immediateRender=0!=e.immediateRender&&0!=c.immediateRender,d.staggerTo(a,b,e,f,g,h,i)},d.delayedCall=function(a,b,c,e,f){return new d(b,0,{delay:a,onComplete:b,onCompleteParams:c,onCompleteScope:e,onReverseComplete:b,onReverseCompleteParams:c,onReverseCompleteScope:e,immediateRender:!1,useFrames:f,overwrite:0})},d.set=function(a,b){return new d(a,0,b)},d.isTweening=function(a){for(var e,b=c.getTweensOf(a),d=b.length;--d>-1;)if((e=b[d])._active||e._startTime===e.timeline._time&&e.timeline._active)return!0;return!1};var i=function(a,b){for(var d=[],e=0,f=a._first;f;)f instanceof c?d[e++]=f:(b&&(d[e++]=f),d=d.concat(i(f,b)),e=d.length),f=f._next;return d},j=d.getAllTweens=function(b){var c=i(a._rootTimeline,b);return c.concat(i(a._rootFramesTimeline,b))};d.killAll=function(a,c,d,e){null==c&&(c=!0),null==d&&(d=!0);var i,k,l,f=j(0!=e),g=f.length,h=c&&d&&e;for(l=0;g>l;l++)k=f[l],(h||k instanceof b||(i=k.target===k.vars.onComplete)&&d||c&&!i)&&(a?k.totalTime(k.totalDuration()):k._enabled(!1,!1))},d.killChildTweensOf=function(a,b){if(null!=a){var h,i,j,k,l,g=c._tweenLookup;if("string"==typeof a&&(a=c.selector(a)||a),e(a)&&(a=f(a)),a instanceof Array)for(k=a.length;--k>-1;)d.killChildTweensOf(a[k],b);else{h=[];for(j in g)for(i=g[j].target.parentNode;i;)i===a&&(h=h.concat(g[j].tweens)),i=i.parentNode;for(l=h.length,k=0;l>k;k++)b&&h[k].totalTime(h[k].totalDuration()),h[k]._enabled(!1,!1)}}};var k=function(a,c,d,e){void 0===c&&(c=!0),void 0===d&&(d=!0);for(var i,k,f=j(e),g=c&&d&&e,h=f.length;--h>-1;)k=f[h],(g||k instanceof b||(i=k.target===k.vars.onComplete)&&d||c&&!i)&&k.paused(a)};return d.pauseAll=function(a,b,c){k(!0,a,b,c)},d.resumeAll=function(a,b,c){k(!1,a,b,c)},g.progress=function(a){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},g.totalProgress=function(a){return arguments.length?this.totalTime(this.totalDuration()*a,!1):this._totalTime/this.totalDuration()},g.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},g.duration=function(b){return arguments.length?a.prototype.duration.call(this,b):this._duration},g.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},g.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},g.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},g.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},d},!0),window._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;for(var d,f,c=e.length;--c>-1;)if(f=this.vars[e[c]])for(d=f.length;--d>-1;)"{self}"===f[d]&&(f=this.vars[e[c]]=f.concat(),f[d]=this);this.vars.tweens instanceof Array&&this.add(this.vars.tweens,0,this.vars.align,this.vars.stagger)},e=["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],f=[],g=function(a){var c,b={};for(c in a)b[c]=a[c];return b},h=d.prototype=new b;return d.version="1.9.0",h.constructor=d,h.kill()._gc=!1,h.to=function(a,b,d,e){return this.add(new c(a,b,d),e)},h.from=function(a,b,d,e){return this.add(c.from(a,b,d),e)},h.fromTo=function(a,b,d,e,f){return this.add(c.fromTo(a,b,d,e),f)},h.staggerTo=function(a,b,e,f,h,i,j,k){var m,n,l=new d({onComplete:i,onCompleteParams:j,onCompleteScope:k});for("string"==typeof a&&(a=c.selector(a)||a),!(a instanceof Array)&&"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style&&(n=[],a.each(function(){n.push(this)}),a=n),f=f||0,m=0;a.length>m;m++)null!=e.startAt&&(e.startAt=g(e.startAt)),l.add(new c(a[m],b,g(e)),m*f);return this.add(l,h)},h.staggerFrom=function(a,b,c,d,e,f,g,h){return null==c.immediateRender&&(c.immediateRender=!0),c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},h.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},h.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},h.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var g,h,e=new d(a),f=e._timeline;for(null==b&&(b=!0),f._remove(e,!0),e._startTime=0,e._rawPrevTime=e._time=e._totalTime=f._time,g=f._first;g;)h=g._next,b&&g instanceof c&&g.target===g.vars.onComplete||e.add(g,g._startTime-g._delay),g=h;return f.add(e,0),e},h.add=function(e,f,g,h){var i,j,k,l,m;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array){for(g=g||"normal",h=h||0,i=f,j=e.length,k=0;j>k;k++)(l=e[k])instanceof Array&&(l=new d({tweens:l})),this.add(l,i),"string"!=typeof l&&"function"!=typeof l&&("sequence"===g?i=l._startTime+l.totalDuration()/l._timeScale:"start"===g&&(l._startTime-=l.delay())),i+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the TimelineLite/Max: it is neither a tween, timeline, function, nor a String.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),this._gc&&!this._paused&&this._time===this._duration&&this._time<this.duration())for(m=this;m._gc&&m._timeline;)m._timeline.smoothChildTiming?m.totalTime(m._totalTime,!0):m._enabled(!0,!1),m=m._timeline;return this},h.remove=function(b){if(b instanceof a)return this._remove(b,!1);if(b instanceof Array){for(var c=b.length;--c>-1;)this.remove(b[c]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},h.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},h.insert=h.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},h.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},h.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},h.removeLabel=function(a){return delete this._labels[a],this},h.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},h._parseTimeOrLabel=function(b,c,d,e){var f;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e instanceof Array)for(f=e.length;--f>-1;)e[f]instanceof a&&e[f].timeline===this&&this.remove(e[f]);if("string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-this.duration():0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=this.duration());else{if(f=b.indexOf("="),-1===f)return null==this._labels[b]?d?this._labels[b]=this.duration()+c:c:this._labels[b]+c;c=parseInt(b.charAt(f-1)+"1",10)*Number(b.substr(f+1)),b=f>1?this._parseTimeOrLabel(b.substr(0,f-1),0,d):this.duration()}return Number(b)+c},h.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},h.stop=function(){return this.paused(!0)},h.gotoAndPlay=function(a,c){return b.prototype.play.call(this,a,c)},h.gotoAndStop=function(a,b){return this.pause(a,b)},h.render=function(a,b,c){this._gc&&this._enabled(!0,!1),this._active=!this._paused;var j,k,l,m,d=this._dirty?this.totalDuration():this._totalDuration,e=this._time,g=this._startTime,h=this._timeScale,i=this._paused;if(a>=d?(this._totalTime=this._time=d,this._reversed||this._hasPausedChild()||(k=!0,m="onComplete",0===this._duration&&(0===a||0>this._rawPrevTime)&&this._rawPrevTime!==a&&(c=!0)),this._rawPrevTime=a,a=d+1e-6):0>=a?(this._totalTime=this._time=0,(0!==e||0===this._duration&&this._rawPrevTime>0)&&(m="onReverseComplete",k=this._reversed),0>a?(this._active=!1,0===this._duration&&this._rawPrevTime>=0&&(c=!0)):this._initted||(c=!0),this._rawPrevTime=a,a=-1e-6):this._totalTime=this._time=this._rawPrevTime=a,this._time!==e||c){if(this._initted||(this._initted=!0),0===e&&this.vars.onStart&&0!==this._time&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||f)),this._time>e)for(j=this._first;j&&(l=j._next,!this._paused||i);)(j._active||j._startTime<=this._time&&!j._paused&&!j._gc)&&(j._reversed?j.render((j._dirty?j.totalDuration():j._totalDuration)-(a-j._startTime)*j._timeScale,b,c):j.render((a-j._startTime)*j._timeScale,b,c)),j=l;else for(j=this._last;j&&(l=j._prev,!this._paused||i);)(j._active||e>=j._startTime&&!j._paused&&!j._gc)&&(j._reversed?j.render((j._dirty?j.totalDuration():j._totalDuration)-(a-j._startTime)*j._timeScale,b,c):j.render((a-j._startTime)*j._timeScale,b,c)),j=l;this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||f)),m&&(this._gc||(g===this._startTime||h!==this._timeScale)&&(0===this._time||d>=this.totalDuration())&&(k&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[m]&&this.vars[m].apply(this.vars[m+"Scope"]||this,this.vars[m+"Params"]||f)))}},h._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},h.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)e>g._startTime||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},h.getTweensOf=function(a,b){for(var d=c.getTweensOf(a),e=d.length,f=[],g=0;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(f[g++]=d[e]);return f},h._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},h.shiftChildren=function(a,b,c){c=c||0;for(var e,d=this._first;d;)d._startTime>=c&&(d._startTime+=a),d=d._next;if(b)for(e in this._labels)this._labels[e]>=c&&(this._labels[e]+=a);return this._uncache(!0)},h._kill=function(a,b){if(null==a&&null==b)return this._enabled(!1,!1);for(var c=null==b?this.getChildren(!0,!0,!1):this.getTweensOf(b),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},h.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},h.invalidate=function(){for(var a=this._first;a;)a.invalidate(),a=a._next;return this},h._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},h.progress=function(a){return arguments.length?this.totalTime(this.duration()*a,!1):this._time/this.duration()},h.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},h.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var e,f,b=0,c=this._last,d=999999999999;c;)e=c._prev,c._dirty&&c.totalDuration(),c._startTime>d&&this._sortChildren&&!c._paused?this.add(c,c._startTime-c._delay):d=c._startTime,0>c._startTime&&!c._paused&&(b-=c._startTime,this._timeline.smoothChildTiming&&(this._startTime+=c._startTime/this._timeScale),this.shiftChildren(-c._startTime,!1,-9999999999),d=0),f=c._startTime+c._totalDuration/c._timeScale,f>b&&(b=f),c=e;this._duration=this._totalDuration=b,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==a&&this.timeScale(this._totalDuration/a),this},h.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},h.rawTime=function(){return this._paused||0!==this._totalTime&&this._totalTime!==this._totalDuration?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},d},!0),window._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(a,b,c){var d=function(b){a.call(this,b),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},e=[],f=new c(null,null,1,0),g=function(a){for(;a;){if(a._paused)return!0;a=a._timeline}return!1},h=d.prototype=new a;return h.constructor=d,h.kill()._gc=!1,d.version="1.9.0",h.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),a.prototype.invalidate.call(this)},h.addCallback=function(a,c,d,e){return this.add(b.delayedCall(0,a,d,e),c)},h.removeCallback=function(a,b){if(null==b)this._kill(null,a);else for(var c=this.getTweensOf(a,!1),d=c.length,e=this._parseTimeOrLabel(b);--d>-1;)c[d]._startTime===e&&c[d]._enabled(!1,!1);return this},h.tweenTo=function(a,c){c=c||{};var g,h,d={ease:f,overwrite:2,useFrames:this.usesFrames(),immediateRender:!1};for(g in c)d[g]=c[g];return d.time=this._parseTimeOrLabel(a),h=new b(this,Math.abs(Number(d.time)-this._time)/this._timeScale||.001,d),d.onStart=function(){h.target.paused(!0),h.vars.time!==h.target.time()&&h.duration(Math.abs(h.vars.time-h.target.time())/h.target._timeScale),c.onStart&&c.onStart.apply(c.onStartScope||h,c.onStartParams||e)},h},h.tweenFromTo=function(a,b,c){c=c||{},c.startAt={time:this._parseTimeOrLabel(a)};var d=this.tweenTo(b,c);return d.duration(Math.abs(d.vars.time-d.vars.startAt.time)/this._timeScale||.001)},h.render=function(a,b,c){this._gc&&this._enabled(!0,!1),this._active=!this._paused;var m,n,o,q,d=this._dirty?this.totalDuration():this._totalDuration,f=this._time,g=this._totalTime,h=this._startTime,i=this._timeScale,j=this._rawPrevTime,k=this._paused,l=this._cycle;if(a>=d)this._locked||(this._totalTime=d,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(n=!0,q="onComplete",0===this._duration&&(0===a||0>this._rawPrevTime)&&this._rawPrevTime!==a&&(c=!0)),this._rawPrevTime=a,this._yoyo&&0!==(1&this._cycle)?(this._time=0,a=-1e-6):(this._time=this._duration,a=this._duration+1e-6);else if(0>=a)this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==f||0===this._duration&&this._rawPrevTime>0&&!this._locked)&&(q="onReverseComplete",n=this._reversed),0>a?(this._active=!1,0===this._duration&&this._rawPrevTime>=0&&(c=!0)):this._initted||(c=!0),this._rawPrevTime=a,a=0===this._duration?0:-1e-6;else if(this._time=this._rawPrevTime=a,!this._locked&&(this._totalTime=a,0!==this._repeat)){var r=this._duration+this._repeatDelay;this._cycle=this._totalTime/r>>0,0!==this._cycle&&this._cycle===this._totalTime/r&&this._cycle--,this._time=this._totalTime-this._cycle*r,this._yoyo&&0!==(1&this._cycle)&&(this._time=this._duration-this._time),this._time>this._duration?(this._time=this._duration,a=this._duration+1e-6):0>this._time?this._time=a=0:a=this._time}if(this._cycle!==l&&!this._locked){var s=this._yoyo&&0!==(1&l),t=s===(this._yoyo&&0!==(1&this._cycle)),u=this._totalTime,v=this._cycle,w=this._rawPrevTime,x=this._time;this._totalTime=l*this._duration,l>this._cycle?s=!s:this._totalTime+=this._duration,this._time=f,this._rawPrevTime=0===this._duration?j-1e-5:j,this._cycle=l,this._locked=!0,f=s?0:this._duration,this.render(f,b,0===this._duration),b||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||e),t&&(f=s?this._duration+1e-6:-1e-6,this.render(f,!0,!1)),this._time=x,this._totalTime=u,this._cycle=v,this._rawPrevTime=w,this._locked=!1}if(this._time===f&&!c)return g!==this._totalTime&&this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||e)),void 0;if(this._initted||(this._initted=!0),0===g&&this.vars.onStart&&0!==this._totalTime&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||e)),this._time>f)for(m=this._first;m&&(o=m._next,!this._paused||k);)(m._active||m._startTime<=this._time&&!m._paused&&!m._gc)&&(m._reversed?m.render((m._dirty?m.totalDuration():m._totalDuration)-(a-m._startTime)*m._timeScale,b,c):m.render((a-m._startTime)*m._timeScale,b,c)),m=o;else for(m=this._last;m&&(o=m._prev,!this._paused||k);)(m._active||f>=m._startTime&&!m._paused&&!m._gc)&&(m._reversed?m.render((m._dirty?m.totalDuration():m._totalDuration)-(a-m._startTime)*m._timeScale,b,c):m.render((a-m._startTime)*m._timeScale,b,c)),m=o;this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||e)),q&&(this._locked||this._gc||(h===this._startTime||i!==this._timeScale)&&(0===this._time||d>=this.totalDuration())&&(n&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[q]&&this.vars[q].apply(this.vars[q+"Scope"]||this,this.vars[q+"Params"]||e)))},h.getActive=function(a,b,c){null==a&&(a=!0),null==b&&(b=!0),null==c&&(c=!1);var i,j,d=[],e=this.getChildren(a,b,c),f=0,h=e.length;for(i=0;h>i;i++)j=e[i],j._paused||j._timeline._time>=j._startTime&&j._timeline._time<j._startTime+j._totalDuration/j._timeScale&&(g(j._timeline)||(d[f++]=j));return d},h.getLabelAfter=function(a){a||0!==a&&(a=this._time);var d,b=this.getLabelsArray(),c=b.length;for(d=0;c>d;d++)if(b[d].time>a)return b[d].name;return null},h.getLabelBefore=function(a){null==a&&(a=this._time);for(var b=this.getLabelsArray(),c=b.length;--c>-1;)if(a>b[c].time)return b[c].name;return null},h.getLabelsArray=function(){var c,a=[],b=0;for(c in this._labels)a[b++]={time:this._labels[c],name:c};return a.sort(function(a,b){return a.time-b.time}),a},h.progress=function(a){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},h.totalProgress=function(a){return arguments.length?this.totalTime(this.totalDuration()*a,!1):this._totalTime/this.totalDuration()},h.totalDuration=function(b){return arguments.length?-1===this._repeat?this:this.duration((b-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(a.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},h.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},h.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},h.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},h.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},h.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},d},!0),function(){var a=180/Math.PI,b=Math.PI/180,c=[],d=[],e=[],f={},g=function(a,b,c,d){this.a=a,this.b=b,this.c=c,this.d=d,this.da=d-a,this.ca=c-a,this.ba=b-a},h=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",i=function(a,b,c,d){var e={a:a},f={},g={},h={c:d},i=(a+b)/2,j=(b+c)/2,k=(c+d)/2,l=(i+j)/2,m=(j+k)/2,n=(m-l)/8;return e.b=i+(a-i)/4,f.b=l+n,e.c=f.a=(e.b+f.b)/2,f.c=g.a=(l+m)/2,g.b=m-n,h.b=k+(d-k)/4,g.c=h.a=(g.b+h.b)/2,[e,f,g,h]},j=function(a,b,f,g,h){var m,n,o,p,q,r,s,t,u,v,w,x,y,j=a.length-1,k=0,l=a[0].a;for(m=0;j>m;m++)q=a[k],n=q.a,o=q.d,p=a[k+1].d,h?(w=c[m],x=d[m],y=.25*(x+w)*b/(g?.5:e[m]||.5),r=o-(o-n)*(g?.5*b:y/w),s=o+(p-o)*(g?.5*b:y/x),t=o-(r+(s-r)*(3*w/(w+x)+.5)/4)):(r=o-.5*(o-n)*b,s=o+.5*(p-o)*b,t=o-(r+s)/2),r+=t,s+=t,q.c=u=r,q.b=0!==m?l:l=q.a+.6*(q.c-q.a),q.da=o-n,q.ca=u-n,q.ba=l-n,f?(v=i(n,l,u,o),a.splice(k,1,v[0],v[1],v[2],v[3]),k+=4):k++,l=s;q=a[k],q.b=l,q.c=l+.4*(q.d-l),q.da=q.d-q.a,q.ca=q.c-q.a,q.ba=l-q.a,f&&(v=i(q.a,l,q.c,q.d),a.splice(k,1,v[0],v[1],v[2],v[3]))},k=function(a,b,e,f){var i,j,k,l,m,n,h=[];if(f)for(a=[f].concat(a),j=a.length;--j>-1;)"string"==typeof(n=a[j][b])&&"="===n.charAt(1)&&(a[j][b]=f[b]+Number(n.charAt(0)+n.substr(2)));if(i=a.length-2,0>i)return h[0]=new g(a[0][b],0,0,a[-1>i?0:1][b]),h;for(j=0;i>j;j++)k=a[j][b],l=a[j+1][b],h[j]=new g(k,0,0,l),e&&(m=a[j+2][b],c[j]=(c[j]||0)+(l-k)*(l-k),d[j]=(d[j]||0)+(m-l)*(m-l));return h[j]=new g(a[j][b],0,0,a[j+1][b]),h},l=function(a,b,g,i,l,m){var q,r,s,t,u,v,w,x,n={},o=[],p=m||a[0];l="string"==typeof l?","+l+",":h,null==b&&(b=1);for(r in a[0])o.push(r);if(a.length>1){for(x=a[a.length-1],w=!0,q=o.length;--q>-1;)if(r=o[q],Math.abs(p[r]-x[r])>.05){w=!1;break}w&&(a=a.concat(),m&&a.unshift(m),a.push(a[1]),m=a[a.length-3])}for(c.length=d.length=e.length=0,q=o.length;--q>-1;)r=o[q],f[r]=-1!==l.indexOf(","+r+","),n[r]=k(a,r,f[r],m);for(q=c.length;--q>-1;)c[q]=Math.sqrt(c[q]),d[q]=Math.sqrt(d[q]);if(!i){for(q=o.length;--q>-1;)if(f[r])for(s=n[o[q]],v=s.length-1,t=0;v>t;t++)u=s[t+1].da/d[t]+s[t].da/c[t],e[t]=(e[t]||0)+u*u;for(q=e.length;--q>-1;)e[q]=Math.sqrt(e[q])}for(q=o.length,t=g?4:1;--q>-1;)r=o[q],s=n[r],j(s,b,g,i,f[r]),w&&(s.splice(0,t),s.splice(s.length-t,t));return n},m=function(a,b,c){b=b||"soft";var i,j,k,l,m,n,o,p,q,r,s,d={},e="cubic"===b?3:2,f="soft"===b,h=[];if(f&&c&&(a=[c].concat(a)),null==a||e+1>a.length)throw"invalid Bezier data";for(q in a[0])h.push(q);for(n=h.length;--n>-1;){for(q=h[n],d[q]=m=[],r=0,p=a.length,o=0;p>o;o++)i=null==c?a[o][q]:"string"==typeof(s=a[o][q])&&"="===s.charAt(1)?c[q]+Number(s.charAt(0)+s.substr(2)):Number(s),f&&o>1&&p-1>o&&(m[r++]=(i+m[r-2])/2),m[r++]=i;for(p=r-e+1,r=0,o=0;p>o;o+=e)i=m[o],j=m[o+1],k=m[o+2],l=2===e?0:m[o+3],m[r++]=s=3===e?new g(i,j,k,l):new g(i,(2*j+i)/3,(2*j+k)/3,k);m.length=r}return d},n=function(a,b,c){for(var f,g,h,i,j,k,l,m,n,o,p,d=1/c,e=a.length;--e>-1;)for(o=a[e],h=o.a,i=o.d-h,j=o.c-h,k=o.b-h,f=g=0,m=1;c>=m;m++)l=d*m,n=1-l,f=g-(g=(l*l*i+3*n*(l*j+n*k))*l),p=e*c+m-1,b[p]=(b[p]||0)+f*f},o=function(a,b){b=b>>0||6;var j,k,l,m,c=[],d=[],e=0,f=0,g=b-1,h=[],i=[];for(j in a)n(a[j],c,b);for(l=c.length,k=0;l>k;k++)e+=Math.sqrt(c[k]),m=k%b,i[m]=e,m===g&&(f+=e,m=k/b>>0,h[m]=i,d[m]=f,e=0,i=[]);return{length:f,lengths:d,segments:h}},p=window._gsDefine.plugin({propName:"bezier",priority:-1,API:2,init:function(a,b,c){this._target=a,b instanceof Array&&(b={values:b}),this._func={},this._round={},this._props=[],this._timeRes=null==b.timeResolution?6:parseInt(b.timeResolution,10);var h,i,j,k,n,d=b.values||[],e={},f=d[0],g=b.autoRotate||c.vars.orientToBezier;this._autoRotate=g?g instanceof Array?g:[["x","y","rotation",g===!0?0:Number(g)||0]]:null;for(h in f)this._props.push(h);for(j=this._props.length;--j>-1;)h=this._props[j],this._overwriteProps.push(h),i=this._func[h]="function"==typeof a[h],e[h]=i?a[h.indexOf("set")||"function"!=typeof a["get"+h.substr(3)]?h:"get"+h.substr(3)]():parseFloat(a[h]),n||e[h]!==d[0][h]&&(n=e);if(this._beziers="cubic"!==b.type&&"quadratic"!==b.type&&"soft"!==b.type?l(d,isNaN(b.curviness)?1:b.curviness,!1,"thruBasic"===b.type,b.correlate,n):m(d,b.type,e),this._segCount=this._beziers[h].length,this._timeRes){var p=o(this._beziers,this._timeRes);this._length=p.length,this._lengths=p.lengths,this._segments=p.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(g=this._autoRotate)for(g[0]instanceof Array||(this._autoRotate=g=[g]),j=g.length;--j>-1;)for(k=0;3>k;k++)h=g[j][k],this._func[h]="function"==typeof a[h]?a[h.indexOf("set")||"function"!=typeof a["get"+h.substr(3)]?h:"get"+h.substr(3)]:!1;return!0},set:function(b){var f,g,h,i,j,k,l,m,n,o,c=this._segCount,d=this._func,e=this._target;if(this._timeRes){if(n=this._lengths,o=this._curSeg,b*=this._length,h=this._li,b>this._l2&&c-1>h){for(m=c-1;m>h&&b>=(this._l2=n[++h]););this._l1=n[h-1],this._li=h,this._curSeg=o=this._segments[h],this._s2=o[this._s1=this._si=0]}else if(this._l1>b&&h>0){for(;h>0&&(this._l1=n[--h])>=b;);0===h&&this._l1>b?this._l1=0:h++,this._l2=n[h],this._li=h,this._curSeg=o=this._segments[h],this._s1=o[(this._si=o.length-1)-1]||0,this._s2=o[this._si]}if(f=h,b-=this._l1,h=this._si,b>this._s2&&o.length-1>h){for(m=o.length-1;m>h&&b>=(this._s2=o[++h]););this._s1=o[h-1],this._si=h}else if(this._s1>b&&h>0){for(;h>0&&(this._s1=o[--h])>=b;);0===h&&this._s1>b?this._s1=0:h++,this._s2=o[h],this._si=h}k=(h+(b-this._s1)/(this._s2-this._s1))*this._prec}else f=0>b?0:b>=1?c-1:c*b>>0,k=(b-f*(1/c))*c;for(g=1-k,h=this._props.length;--h>-1;)i=this._props[h],j=this._beziers[i][f],l=(k*k*j.da+3*g*(k*j.ca+g*j.ba))*k+j.a,this._round[i]&&(l=l+(l>0?.5:-.5)>>0),d[i]?e[i](l):e[i]=l;if(this._autoRotate){var q,r,s,t,u,v,w,p=this._autoRotate;for(h=p.length;--h>-1;)i=p[h][2],v=p[h][3]||0,w=p[h][4]===!0?1:a,j=this._beziers[p[h][0]][f],q=this._beziers[p[h][1]][f],r=j.a+(j.b-j.a)*k,t=j.b+(j.c-j.b)*k,r+=(t-r)*k,t+=(j.c+(j.d-j.c)*k-t)*k,s=q.a+(q.b-q.a)*k,u=q.b+(q.c-q.b)*k,s+=(u-s)*k,u+=(q.c+(q.d-q.c)*k-u)*k,l=Math.atan2(u-s,t-r)*w+v,d[i]?d[i].call(e,l):e[i]=l}}}),q=p.prototype;p.bezierThrough=l,p.cubicToQuadratic=i,p._autoCSS=!0,p.quadraticToCubic=function(a,b,c){return new g(a,(2*b+a)/3,(2*b+c)/3,c)},p._cssRegister=function(){var a=window._gsDefine.globals.CSSPlugin;if(a){var c=a._internals,d=c._parseToProxy,e=c._setPluginRatio,f=c.CSSPropTween;c._registerComplexSpecialProp("bezier",null,function(a,c,g,h,i,j){c instanceof Array&&(c={values:c}),j=new p;var o,q,r,k=c.values,l=k.length-1,m=[],n={};if(0>l)return i;for(o=0;l>=o;o++)r=d(a,k[o],h,i,j,l!==o),m[o]=r.end;for(q in c)n[q]=c[q];return n.values=m,i=new f(a,"bezier",0,0,r.pt,2),i.data=r,i.plugin=j,i.setRatio=e,0===n.autoRotate&&(n.autoRotate=!0),!n.autoRotate||n.autoRotate instanceof Array||(o=n.autoRotate===!0?0:Number(n.autoRotate)*b,n.autoRotate=null!=r.end.left?[["left","top","rotation",o,!0]]:null!=r.end.x?[["x","y","rotation",o,!0]]:!1),n.autoRotate&&(h._transform||h._enableTransforms(!1),r.autoRotate=h._target._gsTransform),j._onInitTween(r.proxy,n,h._tween),i})}},q._roundProps=function(a,b){for(var c=this._overwriteProps,d=c.length;--d>-1;)(a[c[d]]||a.bezier||a.bezierThrough)&&(this._round[c[d]]=b)},q._kill=function(a){var c,d,b=this._props;for(c in this._beziers)if(c in a)for(delete this._beziers[c],delete this._func[c],d=b.length;--d>-1;)b[d]===c&&b.splice(d,1);return this._super._kill.call(this,a)}}(),window._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a){var d,e,f,g,c=function(){a.call(this,"css"),this._overwriteProps.length=0},h={},i=c.prototype=new a("css");i.constructor=c,c.version="1.9.0",c.API=2,c.defaultTransformPerspective=0,i="px",c.suffixMap={top:i,right:i,bottom:i,left:i,width:i,height:i,fontSize:i,padding:i,margin:i,perspective:i};
var G,H,I,J,K,L,j=/(?:\d|\-\d|\.\d|\-\.\d)+/g,k=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,l=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,m=/[^\d\-\.]/g,n=/(?:\d|\-|\+|=|#|\.)*/g,o=/opacity *= *([^)]*)/,p=/opacity:([^;]*)/,q=/alpha\(opacity *=.+?\)/i,r=/([A-Z])/g,s=/-([a-z])/gi,t=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,u=function(a,b){return b.toUpperCase()},v=/(?:Left|Right|Width)/i,w=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,x=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,y=Math.PI/180,z=180/Math.PI,A={},B=document,C=B.createElement("div"),D=B.createElement("img"),E=c._internals={_specialProps:h},F=navigator.userAgent,M=function(){var c,a=F.indexOf("Android"),b=B.createElement("div");return I=-1!==F.indexOf("Safari")&&-1===F.indexOf("Chrome")&&(-1===a||Number(F.substr(a+8,1))>3),K=I&&6>Number(F.substr(F.indexOf("Version/")+8,1)),J=-1!==F.indexOf("Firefox"),/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F),L=parseFloat(RegExp.$1),b.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",c=b.getElementsByTagName("a")[0],c?/^0.55/.test(c.style.opacity):!1}(),N=function(a){return o.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},O=function(a){window.console&&console.log(a)},P="",Q="",R=function(a,b){b=b||C;var d,e,c=b.style;if(void 0!==c[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),d=["O","Moz","ms","Ms","Webkit"],e=5;--e>-1&&void 0===c[d[e]+a];);return e>=0?(Q=3===e?"ms":d[e],P="-"+Q.toLowerCase()+"-",Q+a):null},S=B.defaultView?B.defaultView.getComputedStyle:function(){},T=c.getStyle=function(a,b,c,d,e){var f;return M||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||S(a,null))?(a=c.getPropertyValue(b.replace(r,"-$1").toLowerCase()),f=a||c.length?a:c[b]):a.currentStyle&&(c=a.currentStyle,f=c[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):N(a)},U=function(a,b,c){var f,g,d={},e=a._gsOverwrittenClassNamePT;if(e&&!c){for(;e;)e.setRatio(0),e=e._next;a._gsOverwrittenClassNamePT=null}if(b=b||S(a,null))if(f=b.length)for(;--f>-1;)d[b[f].replace(s,u)]=b.getPropertyValue(b[f]);else for(f in b)d[f]=b[f];else if(b=a.currentStyle||a.style)for(f in b)d[f.replace(s,u)]=b[f];return M||(d.opacity=N(a)),g=wb(a,b,!1),d.rotation=g.rotation*z,d.skewX=g.skewX*z,d.scaleX=g.scaleX,d.scaleY=g.scaleY,d.x=g.x,d.y=g.y,vb&&(d.z=g.z,d.rotationX=g.rotationX*z,d.rotationY=g.rotationY*z,d.scaleZ=g.scaleZ),d.filters&&delete d.filters,d},V=function(a,b,c,d){var g,h,i,e={},f=a.style;for(h in c)"cssText"!==h&&"length"!==h&&isNaN(h)&&b[h]!==(g=c[h])&&-1===h.indexOf("Origin")&&("number"==typeof g||"string"==typeof g)&&(e[h]=""!==g&&"auto"!==g&&"none"!==g||"string"!=typeof b[h]||""===b[h].replace(m,"")?g:0,void 0!==f[h]&&(i=new jb(f,h,f[h],i)));if(d)for(h in d)"className"!==h&&(e[h]=d[h]);return{difs:e,firstMPT:i}},W={width:["Left","Right"],height:["Top","Bottom"]},X=["marginLeft","marginRight","marginTop","marginBottom"],Y=function(a,b,c){var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=W[b],f=e.length;for(c=c||S(a,null);--f>-1;)d-=parseFloat(T(a,"padding"+e[f],c,!0))||0,d-=parseFloat(T(a,"border"+e[f]+"Width",c,!0))||0;return d},Z=function(a,b,c,d,e){if("px"===d||!d)return c;if("auto"===d||!c)return 0;var j,f=v.test(b),g=a,h=C.style,i=0>c;return i&&(c=-c),"%"===d&&-1!==b.indexOf("border")?j=c/100*(f?a.clientWidth:a.clientHeight):(h.cssText="border-style:solid; border-width:0; position:absolute; line-height:0;","%"!==d&&g.appendChild?h[f?"borderLeftWidth":"borderTopWidth"]=c+d:(g=a.parentNode||B.body,h[f?"width":"height"]=c+d),g.appendChild(C),j=parseFloat(C[f?"offsetWidth":"offsetHeight"]),g.removeChild(C),0!==j||e||(j=Z(a,b,c,d,!0))),i?-j:j},$=function(a,b){(null==a||""===a||"auto"===a||"auto auto"===a)&&(a="0 0");var c=a.split(" "),d=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":c[0],e=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":c[1];return null==e?e="0":"center"===e&&(e="50%"),("center"===d||isNaN(parseFloat(d)))&&(d="50%"),b&&(b.oxp=-1!==d.indexOf("%"),b.oyp=-1!==e.indexOf("%"),b.oxr="="===d.charAt(1),b.oyr="="===e.charAt(1),b.ox=parseFloat(d.replace(m,"")),b.oy=parseFloat(e.replace(m,""))),d+" "+e+(c.length>2?" "+c[2]:"")},_=function(a,b){return"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)},ab=function(a,b){return null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*Number(a.substr(2))+b:parseFloat(a)},bb=function(a,b){var d,e,f,g,h,c=1e-6;return null==a?h=b:"number"==typeof a?h=a*y:(d=2*Math.PI,e=a.split("_"),f=Number(e[0].replace(m,""))*(-1===a.indexOf("rad")?y:1)-("="===a.charAt(1)?0:b),g=e[1],"short"===g?(f%=d,f!==f%(d/2)&&(f=0>f?f+d:f-d)):"cw"===g&&0>f?f=(f+9999999999*d)%d-(0|f/d)*d:"ccw"===g&&f>0&&(f=(f-9999999999*d)%d-(0|f/d)*d),h=b+f),c>h&&h>-c&&(h=0),h},cb={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},db=function(a,b,c){return a=0>a?a+1:a>1?a-1:a,0|255*(1>6*a?b+6*(c-b)*a:.5>a?c:2>3*a?b+6*(c-b)*(2/3-a):b)+.5},eb=function(a){var b,c,d,e,f,g;return a&&""!==a?cb[a]?cb[a]:"number"==typeof a?[a>>16,255&a>>8,255&a]:"#"===a.charAt(0)?(4===a.length&&(b=a.charAt(1),c=a.charAt(2),d=a.charAt(3),a="#"+b+b+c+c+d+d),a=parseInt(a.substr(1),16),[a>>16,255&a>>8,255&a]):"hsl"===a.substr(0,3)?(a=a.match(j),e=Number(a[0])%360/360,f=Number(a[1])/100,g=Number(a[2])/100,c=.5>=g?g*(f+1):g+f-g*f,b=2*g-c,a.length>3&&(a[3]=Number(a[3])),a[0]=db(e+1/3,b,c),a[1]=db(e,b,c),a[2]=db(e-1/3,b,c),a):(a=a.match(j)||cb.transparent,a[0]=Number(a[0]),a[1]=Number(a[1]),a[2]=Number(a[2]),a.length>3&&(a[3]=Number(a[3])),a):cb.black},fb="(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";for(i in cb)fb+="|"+i+"\\b";fb=RegExp(fb+")","gi");var gb=function(a,b,c){if(null==a)return function(a){return a};var d=b?(a.match(fb)||[""])[0]:"",e=a.split(d).join("").match(l)||[],f=a.substr(0,a.indexOf(e[0])),g=")"===a.charAt(a.length-1)?")":"",h=-1!==a.indexOf(" ")?" ":",",i=e.length,k=i>0?e[0].replace(j,""):"";return i?b?function(a){"number"==typeof a&&(a+=k);var b=(a.match(fb)||[d])[0],j=a.split(b).join("").match(l)||[],m=j.length;if(i>m--)for(;i>++m;)j[m]=c?j[(m-1)/2>>0]:e[m];return f+j.join(h)+h+b+g}:function(a){"number"==typeof a&&(a+=k);var b=a.match(l)||[],d=b.length;if(i>d--)for(;i>++d;)b[d]=c?b[(d-1)/2>>0]:e[d];return f+b.join(h)+g}:function(a){return a}},hb=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var j,i=(c+"").split(" ");for(h={},j=0;4>j;j++)h[a[j]]=i[j]=i[j]||i[(j-1)/2>>0];return e.parse(b,h,f,g)}},jb=(E._setPluginRatio=function(a){this.plugin.setRatio(a);for(var f,g,h,i,b=this.data,c=b.proxy,d=b.firstMPT,e=1e-6;d;)f=c[d.v],d.r?f=f>0?f+.5>>0:f-.5>>0:e>f&&f>-e&&(f=0),d.t[d.p]=f,d=d._next;if(b.autoRotate&&(b.autoRotate.rotation=c.rotation),1===a)for(d=b.firstMPT;d;){if(g=d.t,g.type){if(1===g.type){for(i=g.xs0+g.s+g.xs1,h=1;g.l>h;h++)i+=g["xn"+h]+g["xs"+(h+1)];g.e=i}}else g.e=g.s+g.xs0;d=d._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),lb=(E._parseToProxy=function(a,b,c,d,e,f){var l,m,n,o,p,g=d,h={},i={},j=c._transform,k=A;for(c._transform=null,A=b,d=p=c.parse(a,b,d,e),A=k,f&&(c._transform=j,g&&(g._prev=null,g._prev&&(g._prev._next=null)));d&&d!==g;){if(1>=d.type&&(m=d.p,i[m]=d.s+d.c,h[m]=d.s,f||(o=new jb(d,"s",m,o,d.r),d.c=0),1===d.type))for(l=d.l;--l>0;)n="xn"+l,m=d.p+"_"+n,i[m]=d.data[n],h[m]=d[n],f||(o=new jb(d,n,m,o,d.rxp[n]));d=d._next}return{proxy:h,end:i,firstMPT:o,pt:p}},E.CSSPropTween=function(a,b,c,e,f,h,i,j,k,l,m){this.t=a,this.p=b,this.s=c,this.c=e,this.n=i||"css_"+b,a instanceof lb||g.push(this.n),this.r=j,this.type=h||0,k&&(this.pr=k,d=!0),this.b=void 0===l?c:l,this.e=void 0===m?c+e:m,f&&(this._next=f,f._prev=this)}),mb=c.parseComplex=function(a,b,c,d,e,f,g,h,i,l){g=new lb(a,b,0,0,g,l?2:1,null,!1,h,c,d);var q,r,s,t,u,v,w,x,y,z,A,B,m=c.split(", ").join(",").split(" "),n=(d+"").split(", ").join(",").split(" "),o=m.length,p=G!==!1;for(o!==n.length&&(m=(f||"").split(" "),o=m.length),g.plugin=i,g.setRatio=l,q=0;o>q;q++)if(t=m[q],u=n[q],x=parseFloat(t),x||0===x)g.appendXtra("",x,_(u,x),u.replace(k,""),p&&-1!==u.indexOf("px"),!0);else if(e&&("#"===t.charAt(0)||0===t.indexOf("rgb")||cb[t]))t=eb(t),u=eb(u),y=t.length+u.length>6,y&&!M&&0===u[3]?(g["xs"+g.l]+=g.l?" transparent":"transparent",g.e=g.e.split(n[q]).join("transparent")):(M||(y=!1),g.appendXtra(y?"rgba(":"rgb(",t[0],u[0]-t[0],",",!0,!0).appendXtra("",t[1],u[1]-t[1],",",!0).appendXtra("",t[2],u[2]-t[2],y?",":")",!0),y&&(t=4>t.length?1:t[3],g.appendXtra("",t,(4>u.length?1:u[3])-t,")",!1)));else if(v=t.match(j)){if(w=u.match(k),!w||w.length!==v.length)return g;for(s=0,r=0;v.length>r;r++)A=v[r],z=t.indexOf(A,s),g.appendXtra(t.substr(s,z-s),Number(A),_(w[r],A),"",p&&"px"===t.substr(z+A.length,2),0===r),s=z+A.length;g["xs"+g.l]+=t.substr(s)}else g["xs"+g.l]+=g.l?" "+t:t;if(-1!==d.indexOf("=")&&g.data){for(B=g.xs0+g.data.s,q=1;g.l>q;q++)B+=g["xs"+q]+g.data["xn"+q];g.e=B+g["xs"+q]}return g.l||(g.type=-1,g.xs0=g.e),g.xfirst||g},nb=9;for(i=lb.prototype,i.l=i.pr=0;--nb>0;)i["xn"+nb]=0,i["xs"+nb]="";i.xs0="",i._next=i._prev=i.xfirst=i.data=i.plugin=i.setRatio=i.rxp=null,i.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&h?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new lb(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var ob=function(a,b,c,d,e,f,g){this.p=d?R(a)||a:a,h[a]=h[this.p]=this,this.format=f||gb(b,e),c&&(this.parse=c),this.clrs=e,this.dflt=b,this.pr=g||0},pb=E._registerComplexSpecialProp=function(a,b,c,d,e,f,g){for(var k,h=a.split(","),i=b instanceof Array?b:[b],j=h.length;--j>-1;)k=new ob(h[j],i[j],c,d&&0===j,e,f,g)},qb=function(a){if(!h[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";pb(a,null,function(a,c,d,e,f,g,i){var j=(window.GreenSockGlobals||window).com.greensock.plugins[b];return j?(j._cssRegister(),h[d].parse(a,c,d,e,f,g,i)):(O("Error: "+b+" js file not loaded."),f)})}};i=ob.prototype,i.parseComplex=function(a,b,c,d,e,f){return mb(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},i.parse=function(a,b,c,d,e,g){return this.parseComplex(a.style,this.format(T(a,this.p,f,!1,this.dflt)),this.format(b),e,g)},c.registerSpecialProp=function(a,b,c){pb(a,null,function(a,d,e,f,g,h){var j=new lb(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},!1,!1,null,c)};var rb=["scaleX","scaleY","scaleZ","x","y","z","skewX","rotation","rotationX","rotationY","perspective"],sb=R("transform"),tb=P+"transform",ub=R("transformOrigin"),vb=null!==R("perspective"),wb=function(a,b,d){var l,m,n,o,p,q,r,s,t,u,v,x,y,e=d?a._gsTransform||{skewY:0}:{skewY:0},f=0>e.scaleX,g=2e-5,h=1e5,i=-Math.PI+1e-4,j=Math.PI-1e-4,k=vb?parseFloat(T(a,ub,b,!1,"0 0 0").split(" ")[2])||e.zOrigin||0:0;for(sb?l=T(a,tb,b,!0):a.currentStyle&&(l=a.currentStyle.filter.match(w),l=l&&4===l.length?l[0].substr(4)+","+Number(l[2].substr(4))+","+Number(l[1].substr(4))+","+l[3].substr(4)+","+(e?e.x:0)+","+(e?e.y:0):null),m=(l||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],n=m.length;--n>-1;)o=Number(m[n]),m[n]=(p=o-(o|=0))?(0|p*h+(0>p?-.5:.5))/h+o:o;if(16===m.length){var z=m[8],A=m[9],B=m[10],C=m[12],D=m[13],E=m[14];if(e.zOrigin&&(E=-e.zOrigin,C=z*E-m[12],D=A*E-m[13],E=B*E+e.zOrigin-m[14]),!d||C!==e.x||D!==e.y||E!==e.z){var Q,R,S,U,V,W,X,Y,F=m[0],G=m[1],H=m[2],I=m[3],J=m[4],K=m[5],L=m[6],M=m[7],N=m[11],O=e.rotationX=Math.atan2(L,B),P=i>O||O>j;O&&(V=Math.cos(-O),W=Math.sin(-O),Q=J*V+z*W,R=K*V+A*W,S=L*V+B*W,U=M*V+N*W,z=J*-W+z*V,A=K*-W+A*V,B=L*-W+B*V,N=M*-W+N*V,J=Q,K=R,L=S),O=e.rotationY=Math.atan2(z,F),O&&(X=i>O||O>j,V=Math.cos(-O),W=Math.sin(-O),Q=F*V-z*W,R=G*V-A*W,S=H*V-B*W,U=I*V-N*W,A=G*W+A*V,B=H*W+B*V,N=I*W+N*V,F=Q,G=R,H=S),O=e.rotation=Math.atan2(G,K),O&&(Y=i>O||O>j,V=Math.cos(-O),W=Math.sin(-O),F=F*V+J*W,R=G*V+K*W,K=G*-W+K*V,L=H*-W+L*V,G=R),Y&&P?e.rotation=e.rotationX=0:Y&&X?e.rotation=e.rotationY=0:X&&P&&(e.rotationY=e.rotationX=0),e.scaleX=(Math.sqrt(F*F+G*G)*h+.5>>0)/h,e.scaleY=(Math.sqrt(K*K+A*A)*h+.5>>0)/h,e.scaleZ=(Math.sqrt(L*L+B*B)*h+.5>>0)/h,e.skewX=0,e.perspective=N?1/(0>N?-N:N):0,e.x=C,e.y=D,e.z=E}}else if(!vb||0===m.length||e.x!==m[4]||e.y!==m[5]||!e.rotationX&&!e.rotationY){var Z=m.length>=6,$=Z?m[0]:1,_=m[1]||0,ab=m[2]||0,bb=Z?m[3]:1;e.x=m[4]||0,e.y=m[5]||0,q=Math.sqrt($*$+_*_),r=Math.sqrt(bb*bb+ab*ab),s=$||_?Math.atan2(_,$):e.rotation||0,t=ab||bb?Math.atan2(ab,bb)+s:e.skewX||0,u=q-Math.abs(e.scaleX||0),v=r-Math.abs(e.scaleY||0),Math.abs(t)>Math.PI/2&&Math.abs(t)<1.5*Math.PI&&(f?(q*=-1,t+=0>=s?Math.PI:-Math.PI,s+=0>=s?Math.PI:-Math.PI):(r*=-1,t+=0>=t?Math.PI:-Math.PI)),x=(s-e.rotation)%Math.PI,y=(t-e.skewX)%Math.PI,(void 0===e.skewX||u>g||-g>u||v>g||-g>v||x>i&&j>x&&0!==x*h>>0||y>i&&j>y&&0!==y*h>>0)&&(e.scaleX=q,e.scaleY=r,e.rotation=s,e.skewX=t),vb&&(e.rotationX=e.rotationY=e.z=0,e.perspective=parseFloat(c.defaultTransformPerspective)||0,e.scaleZ=1)}e.zOrigin=k;for(n in e)g>e[n]&&e[n]>-g&&(e[n]=0);return d&&(a._gsTransform=e),e},xb=function(a){var l,m,b=this.data,c=-b.rotation,d=c+b.skewX,e=1e5,f=(Math.cos(c)*b.scaleX*e>>0)/e,g=(Math.sin(c)*b.scaleX*e>>0)/e,h=(Math.sin(d)*-b.scaleY*e>>0)/e,i=(Math.cos(d)*b.scaleY*e>>0)/e,j=this.t.style,k=this.t.currentStyle;if(k){m=g,g=-h,h=-m,l=k.filter,j.filter="";var v,w,p=this.t.offsetWidth,q=this.t.offsetHeight,r="absolute"!==k.position,s="progid:DXImageTransform.Microsoft.Matrix(M11="+f+", M12="+g+", M21="+h+", M22="+i,t=b.x,u=b.y;if(null!=b.ox&&(v=(b.oxp?.01*p*b.ox:b.ox)-p/2,w=(b.oyp?.01*q*b.oy:b.oy)-q/2,t+=v-(v*f+w*g),u+=w-(v*h+w*i)),r)v=p/2,w=q/2,s+=", Dx="+(v-(v*f+w*g)+t)+", Dy="+(w-(v*h+w*i)+u)+")";else{var z,A,B,y=8>L?1:-1;for(v=b.ieOffsetX||0,w=b.ieOffsetY||0,b.ieOffsetX=Math.round((p-((0>f?-f:f)*p+(0>g?-g:g)*q))/2+t),b.ieOffsetY=Math.round((q-((0>i?-i:i)*q+(0>h?-h:h)*p))/2+u),nb=0;4>nb;nb++)A=X[nb],z=k[A],m=-1!==z.indexOf("px")?parseFloat(z):Z(this.t,A,parseFloat(z),z.replace(n,""))||0,B=m!==b[A]?2>nb?-b.ieOffsetX:-b.ieOffsetY:2>nb?v-b.ieOffsetX:w-b.ieOffsetY,j[A]=(b[A]=Math.round(m-B*(0===nb||2===nb?1:y)))+"px";s+=", sizingMethod='auto expand')"}j.filter=-1!==l.indexOf("DXImageTransform.Microsoft.Matrix(")?l.replace(x,s):s+" "+l,(0===a||1===a)&&1===f&&0===g&&0===h&&1===i&&(r&&-1===s.indexOf("Dx=0, Dy=0")||o.test(l)&&100!==parseFloat(RegExp.$1)||-1===l.indexOf("gradient(")&&j.removeAttribute("filter"))}},yb=function(){var x,y,z,A,B,C,D,E,F,b=this.data,c=this.t.style,d=b.perspective,e=b.scaleX,f=0,g=0,h=0,i=0,j=b.scaleY,k=0,l=0,m=0,n=0,o=b.scaleZ,p=0,q=0,r=0,s=d?-1/d:0,t=b.rotation,u=b.zOrigin,v=",",w=1e5;J&&(D=T(this.t,"top",null,!1,"0"),E=parseFloat(D)||0,F=D.substr((E+"").length),b._ffFix=!b._ffFix,c.top=(b._ffFix?E+.05:E-.05)+(""===F?"px":F)),(t||b.skewX)&&(z=e*Math.cos(t),A=j*Math.sin(t),t-=b.skewX,f=e*-Math.sin(t),j*=Math.cos(t),e=z,i=A),t=b.rotationY,t&&(x=Math.cos(t),y=Math.sin(t),z=e*x,A=i*x,B=o*-y,C=s*-y,g=e*y,k=i*y,o*=x,s*=x,e=z,i=A,m=B,q=C),t=b.rotationX,t&&(x=Math.cos(t),y=Math.sin(t),z=f*x+g*y,A=j*x+k*y,B=n*x+o*y,C=r*x+s*y,g=f*-y+g*x,k=j*-y+k*x,o=n*-y+o*x,s=r*-y+s*x,f=z,j=A,n=B,r=C),u&&(p-=u,h=g*p,l=k*p,p=o*p+u),h=(z=(h+=b.x)-(h|=0))?(0|z*w+(0>z?-.5:.5))/w+h:h,l=(z=(l+=b.y)-(l|=0))?(0|z*w+(0>z?-.5:.5))/w+l:l,p=(z=(p+=b.z)-(p|=0))?(0|z*w+(0>z?-.5:.5))/w+p:p,c[sb]="matrix3d("+(e*w>>0)/w+v+(i*w>>0)/w+v+(m*w>>0)/w+v+(q*w>>0)/w+v+(f*w>>0)/w+v+(j*w>>0)/w+v+(n*w>>0)/w+v+(r*w>>0)/w+v+(g*w>>0)/w+v+(k*w>>0)/w+v+(o*w>>0)/w+v+(s*w>>0)/w+v+h+v+l+v+p+v+(d?1+-p/d:1)+")"},zb=function(){var d,e,f,g,h,i,j,k,b=this.data,c=this.t;J&&(d=T(c,"top",null,!1,"0"),e=parseFloat(d)||0,f=d.substr((e+"").length),b._ffFix=!b._ffFix,c.style.top=(b._ffFix?e+.05:e-.05)+(""===f?"px":f)),b.rotation||b.skewX?(g=b.rotation,h=g-b.skewX,i=1e5,j=b.scaleX*i,k=b.scaleY*i,c.style[sb]="matrix("+(Math.cos(g)*j>>0)/i+","+(Math.sin(g)*j>>0)/i+","+(Math.sin(h)*-k>>0)/i+","+(Math.cos(h)*k>>0)/i+","+b.x+","+b.y+")"):c.style[sb]="matrix("+b.scaleX+",0,0,"+b.scaleY+","+b.x+","+b.y+")"};pb("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation",null,function(a,b,c,d,e,g,h){if(d._transform)return e;var n,o,p,q,r,s,t,i=d._transform=wb(a,f,!0),j=a.style,k=1e-6,l=rb.length,m=h;if("string"==typeof m.transform&&sb)p=j.cssText,j[sb]=m.transform,j.display="block",n=wb(a,null,!1),j.cssText=p;else if("object"==typeof m){if(n={scaleX:ab(null!=m.scaleX?m.scaleX:m.scale,i.scaleX),scaleY:ab(null!=m.scaleY?m.scaleY:m.scale,i.scaleY),scaleZ:ab(null!=m.scaleZ?m.scaleZ:m.scale,i.scaleZ),x:ab(m.x,i.x),y:ab(m.y,i.y),z:ab(m.z,i.z),perspective:ab(m.transformPerspective,i.perspective)},t=m.directionalRotation,null!=t)if("object"==typeof t)for(p in t)m[p]=t[p];else m.rotation=t;n.rotation=bb("rotation"in m?m.rotation:"shortRotation"in m?m.shortRotation+"_short":"rotationZ"in m?m.rotationZ:i.rotation*z,i.rotation),vb&&(n.rotationX=bb("rotationX"in m?m.rotationX:"shortRotationX"in m?m.shortRotationX+"_short":i.rotationX*z||0,i.rotationX),n.rotationY=bb("rotationY"in m?m.rotationY:"shortRotationY"in m?m.shortRotationY+"_short":i.rotationY*z||0,i.rotationY)),n.skewX=null==m.skewX?i.skewX:bb(m.skewX,i.skewX),n.skewY=null==m.skewY?i.skewY:bb(m.skewY,i.skewY),(o=n.skewY-i.skewY)&&(n.skewX+=o,n.rotation+=o)}for(r=i.z||i.rotationX||i.rotationY||n.z||n.rotationX||n.rotationY||n.perspective,r||null==m.scale||(n.scaleZ=1);--l>-1;)c=rb[l],q=n[c]-i[c],(q>k||-k>q||null!=A[c])&&(s=!0,e=new lb(i,c,i[c],q,e),e.xs0=0,e.plugin=g,d._overwriteProps.push(e.n));return q=m.transformOrigin,(q||vb&&r&&i.zOrigin)&&(sb?(s=!0,q=(q||T(a,c,f,!1,"50% 50%"))+"",c=ub,e=new lb(j,c,0,0,e,-1,"css_transformOrigin"),e.b=j[c],e.plugin=g,vb?(p=i.zOrigin,q=q.split(" "),i.zOrigin=(q.length>2?parseFloat(q[2]):p)||0,e.xs0=e.e=j[c]=q[0]+" "+(q[1]||"50%")+" 0px",e=new lb(i,"zOrigin",0,0,e,-1,e.n),e.b=p,e.xs0=e.e=i.zOrigin):e.xs0=e.e=j[c]=q):$(q+"",i)),s&&(d._transformType=r||3===this._transformType?3:2),e},!0),pb("boxShadow","0px 0px 0px 0px #999",function(a,b,c,d,e,g){var h=-1!==(b+"").indexOf("inset")?" inset":"";return this.parseComplex(a.style,this.format(T(a,this.p,f,!1,this.dflt))+h,this.format(b)+h,e,g)},!0,!0),pb("borderRadius","0px",function(a,b,c,d,g){b=this.format(b);var k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,i=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],j=a.style;for(s=parseFloat(a.offsetWidth),t=parseFloat(a.offsetHeight),k=b.split(" "),l=0;i.length>l;l++)this.p.indexOf("border")&&(i[l]=R(i[l])),o=n=T(a,i[l],f,!1,"0px"),-1!==o.indexOf(" ")&&(n=o.split(" "),o=n[0],n=n[1]),p=m=k[l],q=parseFloat(o),v=o.substr((q+"").length),w="="===p.charAt(1),w?(r=parseInt(p.charAt(0)+"1",10),p=p.substr(2),r*=parseFloat(p),u=p.substr((r+"").length-(0>r?1:0))||""):(r=parseFloat(p),u=p.substr((r+"").length)),""===u&&(u=e[c]||v),u!==v&&(x=Z(a,"borderLeft",q,v),y=Z(a,"borderTop",q,v),"%"===u?(o=100*(x/s)+"%",n=100*(y/t)+"%"):"em"===u?(z=Z(a,"borderLeft",1,"em"),o=x/z+"em",n=y/z+"em"):(o=x+"px",n=y+"px"),w&&(p=parseFloat(o)+r+u,m=parseFloat(n)+r+u)),g=mb(j,i[l],o+" "+n,p+" "+m,!1,"0px",g);return g},!0,!1,gb("0px 0px 0px 0px",!1,!0)),pb("backgroundPosition","0 0",function(a,b,c,d,e,g){var l,m,n,o,p,q,h="background-position",i=f||S(a,null),j=this.format((i?L?i.getPropertyValue(h+"-x")+" "+i.getPropertyValue(h+"-y"):i.getPropertyValue(h):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),k=this.format(b);if(-1!==j.indexOf("%")!=(-1!==k.indexOf("%"))&&(q=T(a,"backgroundImage").replace(t,""),q&&"none"!==q)){for(l=j.split(" "),m=k.split(" "),D.setAttribute("src",q),n=2;--n>-1;)j=l[n],o=-1!==j.indexOf("%"),o!==(-1!==m[n].indexOf("%"))&&(p=0===n?a.offsetWidth-D.width:a.offsetHeight-D.height,l[n]=o?parseFloat(j)/100*p+"px":100*(parseFloat(j)/p)+"%");j=l.join(" ")}return this.parseComplex(a.style,j,k,e,g)},!1,!1,$),pb("backgroundSize","0 0",null,!1,!1,$),pb("perspective","0px",null,!0),pb("perspectiveOrigin","50% 50%",null,!0),pb("transformStyle",null,null,!0),pb("backfaceVisibility",null,null,!0),pb("margin",null,hb("marginTop,marginRight,marginBottom,marginLeft")),pb("padding",null,hb("paddingTop,paddingRight,paddingBottom,paddingLeft")),pb("clip","rect(0px,0px,0px,0px)"),pb("textShadow","0px 0px 0px #999",null,!1,!0),pb("autoRound,strictUnits",null,function(a,b,c,d,e){return e}),pb("border","0px solid #000",function(a,b,c,d,e,g){return this.parseComplex(a.style,this.format(T(a,"borderTopWidth",f,!1,"0px")+" "+T(a,"borderTopStyle",f,!1,"solid")+" "+T(a,"borderTopColor",f,!1,"#000")),this.format(b),e,g)},!1,!0,function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(fb)||["#000"])[0]}),pb("float,cssFloat,styleFloat",null,function(a,b,c,d,e){var g=a.style,h="cssFloat"in g?"cssFloat":"styleFloat";return new lb(g,h,0,0,e,-1,c,!1,0,g[h],b)});var Ab=function(a){var e,b=this.t,c=b.filter,d=this.s+this.c*a>>0;100===d&&(-1===c.indexOf("atrix(")&&-1===c.indexOf("radient(")?(b.removeAttribute("filter"),e=!T(this.data,"filter")):(b.filter=c.replace(q,""),e=!0)),e||(this.xn1&&(b.filter=c=c||"alpha(opacity=100)"),-1===c.indexOf("opacity")?b.filter+=" alpha(opacity="+d+")":b.filter=c.replace(o,"opacity="+d))};pb("opacity,alpha,autoAlpha","1",function(a,b,c,d,e,g){var j,h=parseFloat(T(a,"opacity",f,!1,"1")),i=a.style;return b=parseFloat(b),"autoAlpha"===c&&(j=T(a,"visibility",f),1===h&&"hidden"===j&&0!==b&&(h=0),e=new lb(i,"visibility",0,0,e,-1,null,!1,0,0!==h?"visible":"hidden",0===b?"hidden":"visible"),e.xs0="visible",d._overwriteProps.push(e.n)),M?e=new lb(i,"opacity",h,b-h,e):(e=new lb(i,"opacity",100*h,100*(b-h),e),e.xn1="autoAlpha"===c?1:0,i.zoom=1,e.type=2,e.b="alpha(opacity="+e.s+")",e.e="alpha(opacity="+(e.s+e.c)+")",e.data=a,e.plugin=g,e.setRatio=Ab),e});var Bb=function(a){if(1===a||0===a){this.t.className=1===a?this.e:this.b;for(var b=this.data,c=this.t.style,d=c.removeProperty?"removeProperty":"removeAttribute";b;)b.v?c[b.p]=b.v:c[d](b.p.replace(r,"-$1").toLowerCase()),b=b._next}else this.t.className!==this.b&&(this.t.className=this.b)};pb("className",null,function(a,b,c,e,g,h,i){var l,m,j=a.className,k=a.style.cssText;return g=e._classNamePT=new lb(a,c,0,0,g,2),g.setRatio=Bb,g.pr=-11,d=!0,g.b=j,g.e="="!==b.charAt(1)?b:"+"===b.charAt(0)?j+" "+b.substr(2):j.split(b.substr(2)).join(""),e._tween._duration&&(m=U(a,f,!0),a.className=g.e,l=V(a,m,U(a),i),a.className=j,g.data=l.firstMPT,a.style.cssText=k,g=g.xfirst=e.parse(a,l.difs,g,h)),g});var Cb=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration)for(var i,b="all"===this.e,c=this.t.style,d=b?c.cssText.split(";"):this.e.split(","),e=c.removeProperty?"removeProperty":"removeAttribute",f=d.length,g=h.transform.parse;--f>-1;)i=d[f],b&&(i=i.substr(0,i.indexOf(":")).split(" ").join("")),h[i]&&(i=h[i].parse===g?sb:h[i].p),i&&c[e](i.replace(r,"-$1").toLowerCase())};for(pb("clearProps",null,function(a,b,c,e,f){return f=new lb(a,c,0,0,f,2),f.setRatio=Cb,f.e=b,f.pr=-10,f.data=e._tween,d=!0,f}),i="bezier,throwProps,physicsProps,physics2D".split(","),nb=i.length;nb--;)qb(i[nb]);return i=c.prototype,i._firstPT=null,i._onInitTween=function(a,b,h){if(!a.nodeType)return!1;this._target=a,this._tween=h,this._vars=b,G=b.autoRound,d=!1,e=b.suffixMap||c.suffixMap,f=S(a,""),g=this._overwriteProps;var j,k,l,m,n,o,q,r,s,i=a.style;if(H&&""===i.zIndex&&(j=T(a,"zIndex",f),("auto"===j||""===j)&&(i.zIndex=0)),"string"==typeof b&&(m=i.cssText,j=U(a,f),i.cssText=m+";"+b,j=V(a,j,U(a)).difs,!M&&p.test(b)&&(j.opacity=parseFloat(RegExp.$1)),b=j,i.cssText=m),this._firstPT=k=this.parse(a,b,null),this._transformType){for(s=3===this._transformType,sb?I&&(H=!0,""===i.zIndex&&(q=T(a,"zIndex",f),("auto"===q||""===q)&&(i.zIndex=0)),K&&(i.WebkitBackfaceVisibility=this._vars.WebkitBackfaceVisibility||(s?"visible":"hidden"))):i.zoom=1,l=k;l&&l._next;)l=l._next;r=new lb(a,"transform",0,0,null,2),this._linkCSSP(r,null,l),r.setRatio=s&&vb?yb:sb?zb:xb,r.data=this._transform||wb(a,f,!0),g.pop()}if(d){for(;k;){for(o=k._next,l=m;l&&l.pr>k.pr;)l=l._next;(k._prev=l?l._prev:n)?k._prev._next=k:m=k,(k._next=l)?l._prev=k:n=k,k=o}this._firstPT=m}return!0},i.parse=function(a,b,c,d){var i,j,k,l,m,o,p,q,r,s,g=a.style;for(i in b)o=b[i],j=h[i],j?c=j.parse(a,o,i,this,c,d,b):(m=T(a,i,f)+"",r="string"==typeof o,"color"===i||"fill"===i||"stroke"===i||-1!==i.indexOf("Color")||r&&!o.indexOf("rgb")?(r||(o=eb(o),o=(o.length>3?"rgba(":"rgb(")+o.join(",")+")"),c=mb(g,i,m,o,!0,"transparent",c,0,d)):!r||-1===o.indexOf(" ")&&-1===o.indexOf(",")?(k=parseFloat(m),p=k||0===k?m.substr((k+"").length):"",(""===m||"auto"===m)&&("width"===i||"height"===i?(k=Y(a,i,f),p="px"):(k="opacity"!==i?0:1,p="")),s=r&&"="===o.charAt(1),s?(l=parseInt(o.charAt(0)+"1",10),o=o.substr(2),l*=parseFloat(o),q=o.replace(n,"")):(l=parseFloat(o),q=r?o.substr((l+"").length)||"":""),""===q&&(q=e[i]||p),o=l||0===l?(s?l+k:l)+q:b[i],p!==q&&""!==q&&(l||0===l)&&(k||0===k)&&(k=Z(a,i,k,p),"%"===q?(k/=Z(a,i,100,"%")/100,k>100&&(k=100),b.strictUnits!==!0&&(m=k+"%")):"em"===q?k/=Z(a,i,1,"em"):(l=Z(a,i,l,q),q="px"),s&&(l||0===l)&&(o=l+k+q)),s&&(l+=k),!k&&0!==k||!l&&0!==l?o||"NaN"!=o+""&&null!=o?(c=new lb(g,i,l||k||0,0,c,-1,"css_"+i,!1,0,m,o),c.xs0="display"===i&&"none"===o?m:o):O("invalid "+i+" tween value. "):(c=new lb(g,i,k,l-k,c,0,"css_"+i,G!==!1&&("px"===q||"zIndex"===i),0,m,o),c.xs0=q)):c=mb(g,i,m,o,!0,null,c,0,d)),d&&c&&!c.plugin&&(c.plugin=d);return c},i.setRatio=function(a){var d,e,f,b=this._firstPT,c=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;b;){if(d=b.c*a+b.s,b.r?d=d>0?d+.5>>0:d-.5>>0:c>d&&d>-c&&(d=0),b.type)if(1===b.type)if(f=b.l,2===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2;else if(3===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3;else if(4===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4;else if(5===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4+b.xn4+b.xs5;else{for(e=b.xs0+d+b.xs1,f=1;b.l>f;f++)e+=b["xn"+f]+b["xs"+(f+1)];b.t[b.p]=e}else-1===b.type?b.t[b.p]=b.xs0:b.setRatio&&b.setRatio(a);else b.t[b.p]=d+b.xs0;b=b._next}else for(;b;)2!==b.type?b.t[b.p]=b.b:b.setRatio(a),b=b._next;else for(;b;)2!==b.type?b.t[b.p]=b.e:b.setRatio(a),b=b._next},i._enableTransforms=function(a){this._transformType=a||3===this._transformType?3:2},i._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next),a._next=b,a._prev=c),a},i._kill=function(b){var e,f,g,c=b,d=!1;if(b.css_autoAlpha||b.css_alpha){c={};for(f in b)c[f]=b[f];c.css_opacity=1,c.css_autoAlpha&&(c.css_visibility=1)}return b.css_className&&(e=this._classNamePT)&&(g=e.xfirst,g&&g._prev?this._linkCSSP(g._prev,e._next,g._prev._prev):g===this._firstPT&&(this._firstPT=null),e._next&&this._linkCSSP(e._next,e._next._next,g._prev),this._target._gsOverwrittenClassNamePT=this._linkCSSP(e,this._target._gsOverwrittenClassNamePT),this._classNamePT=null,d=!0),a.prototype._kill.call(this,c)||d},a.activate([c]),c},!0),function(){var a=window._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(a,b,c){return this._tween=c,!0}}),b=a.prototype;b._onInitAllProps=function(){for(var f,g,h,a=this._tween,b=a.vars.roundProps instanceof Array?a.vars.roundProps:a.vars.roundProps.split(","),c=b.length,d={},e=a._propLookup.roundProps;--c>-1;)d[b[c]]=1;for(c=b.length;--c>-1;)for(f=b[c],g=a._firstPT;g;)h=g._next,g.pg?g.t._roundProps(d,!0):g.n===f&&(this._add(g.t,f,g.s,g.c),h&&(h._prev=g._prev),g._prev?g._prev._next=h:a._firstPT===g&&(a._firstPT=h),g._next=g._prev=null,a._propLookup[f]=e),g=h;return!1},b._add=function(a,b,c,d){this._addTween(a,b,c,c+d,b,!0),this._overwriteProps.push(b)}}(),window._gsDefine.plugin({propName:"attr",API:2,init:function(a,b){var d;if("function"!=typeof a.setAttribute)return!1;this._target=a,this._proxy={};for(d in b)this._addTween(this._proxy,d,parseFloat(a.getAttribute(d)),b[d],d),this._overwriteProps.push(d);return!0},set:function(a){this._super.setRatio.call(this,a);for(var d,b=this._overwriteProps,c=b.length;--c>-1;)d=b[c],this._target.setAttribute(d,this._proxy[d]+"")}}),window._gsDefine.plugin({propName:"directionalRotation",API:2,init:function(a,b,c){"object"!=typeof b&&(b={rotation:b}),this.finals={},this._tween=c;var e,f,g,h,i,j,k,d=b.useRadians===!0?2*Math.PI:360;for(e in b)"useRadians"!==e&&(j=(b[e]+"").split("_"),f=j[0],k=j[1],g=parseFloat("function"!=typeof a[e]?a[e]:a[e.indexOf("set")||"function"!=typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)]()),h=this.finals[e]="string"==typeof f&&"="===f.charAt(1)?g+parseInt(f.charAt(0)+"1",10)*Number(f.substr(2)):Number(f)||0,i=h-g,"short"===k?(i%=d,i!==i%(d/2)&&(i=0>i?i+d:i-d)):"cw"===k&&0>i?i=(i+9999999999*d)%d-(0|i/d)*d:"ccw"===k&&i>0&&(i=(i-9999999999*d)%d-(0|i/d)*d),this._addTween(a,e,g,g+i,e),this._overwriteProps.push(e));return!0},set:function(a){var b;if(1!==a)this._super.setRatio.call(this,a);else for(b=this._firstPT;b;)b.f?b.t[b.p](this.finals[b.p]):b.t[b.p]=this.finals[b.p],b=b._next}})._autoCSS=!0,window._gsDefine("easing.Back",["easing.Ease"],function(a){var n,o,b=window.GreenSockGlobals||window,c=b.com.greensock,d=2*Math.PI,e=Math.PI/2,f=c._class,g=function(b,c){var d=f("easing."+b,function(){},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,d},h=a.register||function(){},i=function(a,b,c,d){var g=f("easing."+a,{easeOut:new b,easeIn:new c,easeInOut:new d},!0);return h(g,a),g},j=function(b,c){var d=f("easing."+b,function(a){this._p1=a||0===a?a:1.70158,this._p2=1.525*this._p1},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,e.config=function(a){return new d(a)},d},k=i("Back",j("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),j("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),j("BackInOut",function(a){return 1>(a*=2)?.5*a*a*((this._p2+1)*a-this._p2):.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),l=f("easing.SlowMo",function(a,b,c){b=b||0===b?b:.7,null==a?a=.7:a>1&&(a=1),this._p=1!==a?b:0,this._p1=(1-a)/2,this._p2=a,this._p3=this._p1+this._p2,this._calcEnd=c===!0},!0),m=l.prototype=new a;return m.constructor=l,m.getRatio=function(a){var b=a+(.5-a)*this._p;return this._p1>a?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b},l.ease=new l(.7,.7),m.config=l.config=function(a,b,c){return new l(a,b,c)},n=f("easing.SteppedEase",function(a){a=a||1,this._p1=1/a,this._p2=a+1},!0),m=n.prototype=new a,m.constructor=n,m.getRatio=function(a){return 0>a?a=0:a>=1&&(a=.999999999),(this._p2*a>>0)*this._p1},m.config=n.config=function(a){return new n(a)},i("Bounce",g("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}),g("BounceIn",function(a){return 1/2.75>(a=1-a)?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+.9375):1-(7.5625*(a-=2.625/2.75)*a+.984375)}),g("BounceInOut",function(a){var b=.5>a;return a=b?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375,b?.5*(1-a):.5*a+.5})),i("Circ",g("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),g("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),g("CircInOut",function(a){return 1>(a*=2)?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)})),o=function(b,c,e){var g=f("easing."+b,function(a,b){this._p1=a||1,this._p2=b||e,this._p3=this._p2/d*(Math.asin(1/this._p1)||0)
},!0),h=g.prototype=new a;return h.constructor=g,h.getRatio=c,h.config=function(a,b){return new g(a,b)},g},i("Elastic",o("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*d/this._p2)+1},.3),o("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*d/this._p2))},.3),o("ElasticInOut",function(a){return 1>(a*=2)?-.5*this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*d/this._p2):.5*this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*d/this._p2)+1},.45)),i("Expo",g("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),g("ExpoIn",function(a){return Math.pow(2,10*(a-1))-.001}),g("ExpoInOut",function(a){return 1>(a*=2)?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*(a-1)))})),i("Sine",g("SineOut",function(a){return Math.sin(a*e)}),g("SineIn",function(a){return-Math.cos(a*e)+1}),g("SineInOut",function(a){return-.5*(Math.cos(Math.PI*a)-1)})),f("easing.EaseLookup",{find:function(b){return a.map[b]}},!0),h(b.SlowMo,"SlowMo","ease,"),h(n,"SteppedEase","ease,"),k},!0)}),function(a){"use strict";var e,f,g,h,b=a.GreenSockGlobals||a,c=function(a){var e,c=a.split("."),d=b;for(e=0;c.length>e;e++)d[c[e]]=d=d[c[e]]||{};return d},d=c("com.greensock"),i={},j=function(d,e,f,g){this.sc=i[d]?i[d].sc:[],i[d]=this,this.gsClass=null,this.func=f;var h=[];this.check=function(k){for(var n,o,p,q,l=e.length,m=l;--l>-1;)(n=i[e[l]]||new j(e[l],[])).gsClass?(h[l]=n.gsClass,m--):k&&n.sc.push(this);if(0===m&&f)for(o=("com.greensock."+d).split("."),p=o.pop(),q=c(o.join("."))[p]=this.gsClass=f.apply(f,h),g&&(b[p]=q,"function"==typeof define&&define.amd?define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").join("/"),[],function(){return q}):"undefined"!=typeof module&&module.exports&&(module.exports=q)),l=0;this.sc.length>l;l++)this.sc[l].check()},this.check(!0)},k=a._gsDefine=function(a,b,c,d){return new j(a,b,c,d)},l=d._class=function(a,b,c){return b=b||function(){},k(a,[],function(){return b},c),b};k.globals=b;var m=[0,0,1,1],n=[],o=l("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?m.concat(b):m},!0),p=o.map={},q=o.register=function(a,b,c,e){for(var i,j,k,m,f=b.split(","),g=f.length,h=(c||"easeIn,easeOut,easeInOut").split(",");--g>-1;)for(j=f[g],i=e?l("easing."+j,null,!0):d.easing[j]||{},k=h.length;--k>-1;)m=h[k],p[j+"."+m]=p[m+j]=i[m]=a.getRatio?a:a[m]||new a};for(g=o.prototype,g._calcEnd=!1,g.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},e=["Linear","Quad","Cubic","Quart","Quint,Strong"],f=e.length;--f>-1;)g=e[f]+",Power"+f,q(new o(null,null,1,f),g,"easeOut",!0),q(new o(null,null,2,f),g,"easeIn"+(0===f?",easeNone":"")),q(new o(null,null,3,f),g,"easeInOut");p.linear=d.easing.Linear.easeIn,p.swing=d.easing.Quad.easeInOut;var r=l("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});g=r.prototype,g.addEventListener=function(a,b,c,d,e){e=e||0;var h,i,f=this._listeners[a],g=0;for(null==f&&(this._listeners[a]=f=[]),i=f.length;--i>-1;)h=f[i],h.c===b?f.splice(i,1):0===g&&e>h.pr&&(g=i+1);f.splice(g,0,{c:b,s:c,up:d,pr:e})},g.removeEventListener=function(a,b){var d,c=this._listeners[a];if(c)for(d=c.length;--d>-1;)if(c[d].c===b)return c.splice(d,1),void 0},g.dispatchEvent=function(a){var b=this._listeners[a];if(b)for(var e,c=b.length,d=this._eventTarget;--c>-1;)e=b[c],e.up?e.c.call(e.s||d,{type:a,target:d}):e.c.call(e.s||d)};var s=a.requestAnimationFrame,t=a.cancelAnimationFrame,u=Date.now||function(){return(new Date).getTime()};for(e=["ms","moz","webkit","o"],f=e.length;--f>-1&&!s;)s=a[e[f]+"RequestAnimationFrame"],t=a[e[f]+"CancelAnimationFrame"]||a[e[f]+"CancelRequestAnimationFrame"];l("Ticker",function(b,c){var g,h,i,j,k,d=this,e=u(),f=c!==!1&&s,l=function(){null!=i&&(f&&t?t(i):a.clearTimeout(i),i=null)},m=function(a){d.time=(u()-e)/1e3,(!g||d.time>=k||a===!0)&&(d.frame++,k=d.time>k?d.time+j-(d.time-k):d.time+j-.001,d.time+.001>k&&(k=d.time+.001),d.dispatchEvent("tick")),a!==!0&&(i=h(m))};r.call(d),this.time=this.frame=0,this.tick=function(){m(!0)},this.fps=function(a){return arguments.length?(g=a,j=1/(g||60),k=this.time+j,h=0===g?function(){}:f&&s?s:function(a){return setTimeout(a,1e3*(k-d.time)+1>>0||1)},l(),i=h(m),void 0):g},this.useRAF=function(a){return arguments.length?(l(),f=a,d.fps(g),void 0):f},d.fps(b),setTimeout(function(){f&&!i&&d.useRAF(!1)},1e3)}),g=d.Ticker.prototype=new d.events.EventDispatcher,g.constructor=d.Ticker;var v=l("core.Animation",function(a,b){if(this.vars=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(this.vars.delay)||0,this._timeScale=1,this._active=this.vars.immediateRender===!0,this.data=this.vars.data,this._reversed=this.vars.reversed===!0,I){h||(w.tick(),h=!0);var c=this.vars.useFrames?H:I;c.add(this,c._time),this.vars.paused&&this.paused(!0)}}),w=v.ticker=new d.Ticker;g=v.prototype,g._dirty=g._gc=g._initted=g._paused=!1,g._totalTime=g._time=0,g._rawPrevTime=-1,g._next=g._last=g._onUpdate=g._timeline=g.timeline=null,g._paused=!1,g.play=function(a,b){return arguments.length&&this.seek(a,b),this.reversed(!1),this.paused(!1)},g.pause=function(a,b){return arguments.length&&this.seek(a,b),this.paused(!0)},g.resume=function(a,b){return arguments.length&&this.seek(a,b),this.paused(!1)},g.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},g.restart=function(a,b){return this.reversed(!1),this.paused(!1),this.totalTime(a?-this._delay:0,b!==!1)},g.reverse=function(a,b){return arguments.length&&this.seek(a||this.totalDuration(),b),this.reversed(!0),this.paused(!1)},g.render=function(){},g.invalidate=function(){return this},g._enabled=function(a,b){return this._gc=!a,this._active=a&&!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration,b!==!0&&(a&&null==this.timeline?this._timeline.add(this,this._startTime-this._delay):a||null==this.timeline||this._timeline._remove(this,!0)),!1},g._kill=function(){return this._enabled(!1,!1)},g.kill=function(a,b){return this._kill(a,b),this},g._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},g.eventCallback=function(a,b,c,d){if(null==a)return null;if("on"===a.substr(0,2)){if(1===arguments.length)return this.vars[a];if(null==b)delete this.vars[a];else if(this.vars[a]=b,this.vars[a+"Params"]=c,this.vars[a+"Scope"]=d,c)for(var e=c.length;--e>-1;)"{self}"===c[e]&&(c=this.vars[a+"Params"]=c.concat(),c[e]=this);"onUpdate"===a&&(this._onUpdate=b)}return this},g.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},g.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},g.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},g.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this.totalTime(a,b)):this._time},g.totalTime=function(a,b){if(!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&(a+=this.totalDuration()),this._timeline.smoothChildTiming&&(this._dirty&&this.totalDuration(),a>this._totalDuration&&(a=this._totalDuration),this._startTime=(this._paused?this._pauseTime:this._timeline._time)-(this._reversed?this._totalDuration-a:a)/this._timeScale,this._timeline._dirty||this._uncache(!1),!this._timeline._active))for(var c=this._timeline;c._timeline;)c.totalTime(c._totalTime,!0),c=c._timeline;this._gc&&this._enabled(!0,!1),this._totalTime!==a&&this.render(a,b,!1)}return this},g.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},g.timeScale=function(a){if(!arguments.length)return this._timeScale;if(a=a||1e-6,this._timeline&&this._timeline.smoothChildTiming){var b=this._pauseTime||0===this._pauseTime?this._pauseTime:this._timeline._totalTime;this._startTime=b-(b-this._startTime)*this._timeScale/a}return this._timeScale=a,this._uncache(!1)},g.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._totalTime,!0)),this):this._reversed},g.paused=function(a){return arguments.length?(a!=this._paused&&this._timeline&&(!a&&this._timeline.smoothChildTiming&&(this._startTime+=this._timeline.rawTime()-this._pauseTime,this._uncache(!1)),this._pauseTime=a?this._timeline.rawTime():null,this._paused=a,this._active=!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration),this._gc&&(a||this._enabled(!0,!1)),this):this._paused};var x=l("core.SimpleTimeline",function(a){v.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});g=x.prototype=new v,g.constructor=x,g.kill()._gc=!1,g._first=g._last=null,g._sortChildren=!1,g.add=function(a,b){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._timeline&&this._uncache(!0),this},g.insert=g.add,g._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a.timeline=null,a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),this._timeline&&this._uncache(!0)),this},g.render=function(a,b,c){var e,d=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;d;)e=d._next,(d._active||a>=d._startTime&&!d._paused)&&(d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=e},g.rawTime=function(){return this._totalTime};var y=l("TweenLite",function(a,b,c){if(v.call(this,b,c),null==a)throw"Cannot tween an undefined reference.";this.target=a="string"!=typeof a?a:y.selector(a)||a,this._overwrite=null==this.vars.overwrite?G[y.defaultOverwrite]:"number"==typeof this.vars.overwrite?this.vars.overwrite>>0:G[this.vars.overwrite];var e,f,d=a.jquery||"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style;if((d||a instanceof Array)&&"number"!=typeof a[0])for(this._targets=d&&!a.slice?A(a):a.slice(0),this._propLookup=[],this._siblings=[],e=0;this._targets.length>e;e++)f=this._targets[e],f?"string"!=typeof f?"function"==typeof f.each&&f[0]&&f[0].nodeType&&f[0].style?(this._targets.splice(e--,1),this._targets=this._targets.concat(A(f))):(this._siblings[e]=J(f,this,!1),1===this._overwrite&&this._siblings[e].length>1&&K(f,this,null,1,this._siblings[e])):(f=this._targets[e--]=y.selector(f),"string"==typeof f&&this._targets.splice(e+1,1)):this._targets.splice(e--,1);else this._propLookup={},this._siblings=J(a,this,!1),1===this._overwrite&&this._siblings.length>1&&K(a,this,null,1,this._siblings);(this.vars.immediateRender||0===b&&0===this._delay&&this.vars.immediateRender!==!1)&&this.render(-this._delay,!1,!0)},!0),z=function(a){return"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style},A=function(a){var b=[];return a.each(function(){b.push(this)}),b},B=function(a,b){var d,c={};for(d in a)F[d]||d in b&&"x"!==d&&"y"!==d&&"width"!==d&&"height"!==d&&"className"!==d||!(!C[d]||C[d]&&C[d]._autoCSS)||(c[d]=a[d],delete a[d]);a.css=c};g=y.prototype=new v,g.constructor=y,g.kill()._gc=!1,g.ratio=0,g._firstPT=g._targets=g._overwrittenProps=g._startAt=null,g._notifyPluginsOfEnabled=!1,y.version="1.9.0",y.defaultEase=g._ease=new o(null,null,1,1),y.defaultOverwrite="auto",y.ticker=w,y.selector=a.$||a.jQuery||function(b){return a.$?(y.selector=a.$,a.$(b)):a.document?a.document.getElementById("#"===b.charAt(0)?b.substr(1):b):b};var C=y._plugins={},D=y._tweenLookup={},E=0,F={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,orientToBezier:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1},G={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},H=v._rootFramesTimeline=new x,I=v._rootTimeline=new x;I._startTime=w.time,H._startTime=w.frame,I._active=H._active=!0,v._updateRoot=function(){if(I.render((w.time-I._startTime)*I._timeScale,!1,!1),H.render((w.frame-H._startTime)*H._timeScale,!1,!1),!(w.frame%120)){var a,b,c;for(c in D){for(b=D[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete D[c]}}},w.addEventListener("tick",v._updateRoot);var J=function(a,b,c){var e,f,d=a._gsTweenID;if(D[d||(a._gsTweenID=d="t"+E++)]||(D[d]={target:a,tweens:[]}),b&&(e=D[d].tweens,e[f=e.length]=b,c))for(;--f>-1;)e[f]===b&&e.splice(f,1);return D[d].tweens},K=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._enabled(!1,!1)&&(g=!0);else if(5===d)break;return g}var n,j=b._startTime+1e-10,k=[],l=0,m=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(n=n||L(b,0,m),0===L(h,n,m)&&(k[l++]=h)):j>=h._startTime&&h._startTime+h.totalDuration()/h._timeScale+1e-10>j&&((m||!h._initted)&&2e-10>=j-h._startTime||(k[l++]=h)));for(f=l;--f>-1;)h=k[f],2===d&&h._kill(c,a)&&(g=!0),(2!==d||!h._firstPT&&h._initted)&&h._enabled(!1,!1)&&(g=!0);return g},L=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2e-10>f-b?1e-10:(f+=a.totalDuration()/a._timeScale/e)>b?0:f-b-1e-10};g._init=function(){var c,d,e,a=this.vars,b=a.ease;if(a.startAt&&(a.startAt.overwrite=0,a.startAt.immediateRender=!0,this._startAt=new y(this.target,0,a.startAt),a.immediateRender&&(this._startAt=null)),this._ease=b?b instanceof o?a.easeParams instanceof Array?b.config.apply(b,a.easeParams):b:"function"==typeof b?new o(b,a.easeParams):p[b]||y.defaultEase:y.defaultEase,this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(c=this._targets.length;--c>-1;)this._initProps(this._targets[c],this._propLookup[c]={},this._siblings[c],this._overwrittenProps?this._overwrittenProps[c]:null)&&(d=!0);else d=this._initProps(this.target,this._propLookup,this._siblings,this._overwrittenProps);if(d&&y._onPluginEvent("_onInitAllProps",this),this._overwrittenProps&&null==this._firstPT&&"function"!=typeof this.target&&this._enabled(!1,!1),a.runBackwards)for(e=this._firstPT;e;)e.s+=e.c,e.c=-e.c,e=e._next;this._onUpdate=a.onUpdate,this._initted=!0},g._initProps=function(a,b,c,d){var e,f,g,h,i,j,k;if(null==a)return!1;this.vars.css||a.style&&a.nodeType&&C.css&&this.vars.autoCSS!==!1&&B(this.vars,a);for(e in this.vars){if(F[e]){if(("onStartParams"===e||"onUpdateParams"===e||"onCompleteParams"===e||"onReverseCompleteParams"===e||"onRepeatParams"===e)&&(i=this.vars[e]))for(f=i.length;--f>-1;)"{self}"===i[f]&&(i=this.vars[e]=i.concat(),i[f]=this)}else if(C[e]&&(h=new C[e])._onInitTween(a,this.vars[e],this)){for(this._firstPT=j={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:e,pg:!0,pr:h._priority},f=h._overwriteProps.length;--f>-1;)b[h._overwriteProps[f]]=this._firstPT;(h._priority||h._onInitAllProps)&&(g=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=b[e]=j={_next:this._firstPT,t:a,p:e,f:"function"==typeof a[e],n:e,pg:!1,pr:0},j.s=j.f?a[e.indexOf("set")||"function"!=typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)]():parseFloat(a[e]),k=this.vars[e],j.c="string"==typeof k&&"="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*Number(k.substr(2)):Number(k)-j.s||0;j&&j._next&&(j._next._prev=j)}return d&&this._kill(d,a)?this._initProps(a,b,c,d):this._overwrite>1&&this._firstPT&&c.length>1&&K(a,this,b,this._overwrite,c)?(this._kill(b,a),this._initProps(a,b,c,d)):g},g.render=function(a,b,c){var e,f,g,d=this._time;if(a>=this._duration)this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(e=!0,f="onComplete"),0===this._duration&&((0===a||0>this._rawPrevTime)&&this._rawPrevTime!==a&&(c=!0),this._rawPrevTime=a);else if(0>=a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===this._duration&&this._rawPrevTime>0)&&(f="onReverseComplete",e=this._reversed),0>a?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(c=!0),this._rawPrevTime=a)):this._initted||(c=!0);else if(this._totalTime=this._time=a,this._easeType){var h=a/this._duration,i=this._easeType,j=this._easePower;(1===i||3===i&&h>=.5)&&(h=1-h),3===i&&(h*=2),1===j?h*=h:2===j?h*=h*h:3===j?h*=h*h*h:4===j&&(h*=h*h*h*h),this.ratio=1===i?1-h:2===i?h:.5>a/this._duration?h/2:1-h/2}else this.ratio=this._ease.getRatio(a/this._duration);if(this._time!==d||c){for(this._initted||(this._init(),!e&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration))),this._active||this._paused||(this._active=!0),0===d&&(this._startAt&&this._startAt.render(a,b,c),this.vars.onStart&&(0!==this._time||0===this._duration)&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n))),g=this._firstPT;g;)g.f?g.t[g.p](g.c*this.ratio+g.s):g.t[g.p]=g.c*this.ratio+g.s,g=g._next;this._onUpdate&&(0>a&&this._startAt&&this._startAt.render(a,b,c),b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),f&&(this._gc||(0>a&&this._startAt&&(this._onUpdate||this._startAt.render(a,b,c)),e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[f]&&this.vars[f].apply(this.vars[f+"Scope"]||this,this.vars[f+"Params"]||n)))}},g._kill=function(a,b){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:y.selector(b)||b;var c,d,e,f,g,h,i,j;if((b instanceof Array||z(b))&&"number"!=typeof b[0])for(c=b.length;--c>-1;)this._kill(a,b[c])&&(h=!0);else{if(this._targets){for(c=this._targets.length;--c>-1;)if(b===this._targets[c]){g=this._propLookup[c]||{},this._overwrittenProps=this._overwrittenProps||[],d=this._overwrittenProps[c]=a?this._overwrittenProps[c]||{}:"all";break}}else{if(b!==this.target)return!1;g=this._propLookup,d=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(g){i=a||g,j=a!==d&&"all"!==d&&a!==g&&(null==a||a._tempKill!==!0);for(e in i)(f=g[e])&&(f.pg&&f.t._kill(i)&&(h=!0),f.pg&&0!==f.t._overwriteProps.length||(f._prev?f._prev._next=f._next:f===this._firstPT&&(this._firstPT=f._next),f._next&&(f._next._prev=f._prev),f._next=f._prev=null),delete g[e]),j&&(d[e]=1)}}return h},g.invalidate=function(){return this._notifyPluginsOfEnabled&&y._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._startAt=null,this._initted=this._active=this._notifyPluginsOfEnabled=!1,this._propLookup=this._targets?{}:[],this},g._enabled=function(a,b){if(a&&this._gc)if(this._targets)for(var c=this._targets.length;--c>-1;)this._siblings[c]=J(this._targets[c],this,!0);else this._siblings=J(this.target,this,!0);return v.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?y._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},y.to=function(a,b,c){return new y(a,b,c)},y.from=function(a,b,c){return c.runBackwards=!0,0!=c.immediateRender&&(c.immediateRender=!0),new y(a,b,c)},y.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new y(a,b,d)},y.delayedCall=function(a,b,c,d,e){return new y(b,0,{delay:a,onComplete:b,onCompleteParams:c,onCompleteScope:d,onReverseComplete:b,onReverseCompleteParams:c,onReverseCompleteScope:d,immediateRender:!1,useFrames:e,overwrite:0})},y.set=function(a,b){return new y(a,0,b)},y.killTweensOf=y.killDelayedCallsTo=function(a,b){for(var c=y.getTweensOf(a),d=c.length;--d>-1;)c[d]._kill(b,a)},y.getTweensOf=function(a){if(null!=a){a="string"!=typeof a?a:y.selector(a)||a;var b,c,d,e;if((a instanceof Array||z(a))&&"number"!=typeof a[0]){for(b=a.length,c=[];--b>-1;)c=c.concat(y.getTweensOf(a[b]));for(b=c.length;--b>-1;)for(e=c[b],d=b;--d>-1;)e===c[d]&&c.splice(b,1)}else for(c=J(a).concat(),b=c.length;--b>-1;)c[b]._gc&&c.splice(b,1);return c}};var M=l("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=M.prototype},!0);if(g=M.prototype,M.version=12,M.API=2,g._firstPT=null,g._addTween=function(a,b,c,d,e,f){var g,h;null!=d&&(g="number"==typeof d||"="!==d.charAt(1)?Number(d)-c:parseInt(d.charAt(0)+"1",10)*Number(d.substr(2)))&&(this._firstPT=h={_next:this._firstPT,t:a,p:b,s:c,c:g,f:"function"==typeof a[b],n:e||b,r:f},h._next&&(h._next._prev=h))},g.setRatio=function(a){for(var d,b=this._firstPT,c=1e-6;b;)d=b.c*a+b.s,b.r?d=d+(d>0?.5:-.5)>>0:c>d&&d>-c&&(d=0),b.f?b.t[b.p](d):b.t[b.p]=d,b=b._next},g._kill=function(a){var d,b=this._overwriteProps,c=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(d=b.length;--d>-1;)null!=a[b[d]]&&b.splice(d,1);for(;c;)null!=a[c.n]&&(c._next&&(c._next._prev=c._prev),c._prev?(c._prev._next=c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),c=c._next;return!1},g._roundProps=function(a,b){for(var c=this._firstPT;c;)(a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")])&&(c.r=b),c=c._next},y._onPluginEvent=function(a,b){var d,e,f,g,h,c=b._firstPT;if("_onInitAllProps"===a){for(;c;){for(h=c._next,e=f;e&&e.pr>c.pr;)e=e._next;(c._prev=e?e._prev:g)?c._prev._next=c:f=c,(c._next=e)?e._prev=c:g=c,c=h}c=b._firstPT=f}for(;c;)c.pg&&"function"==typeof c.t[a]&&c.t[a]()&&(d=!0),c=c._next;return d},M.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===M.API&&(y._plugins[(new a[b])._propName]=a[b]);return!0},k.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var h,b=a.propName,c=a.priority||0,d=a.overwriteProps,e={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},f=l("plugins."+b.charAt(0).toUpperCase()+b.substr(1)+"Plugin",function(){M.call(this,b,c),this._overwriteProps=d||[]},a.global===!0),g=f.prototype=new M(b);g.constructor=f,f.API=a.API;for(h in e)"function"==typeof a[h]&&(g[e[h]]=a[h]);return f.version=a.version,M.activate([f]),f},e=a._gsQueue){for(f=0;e.length>f;f++)e[f]();for(g in i)i[g].func||a.console.log("GSAP encountered missing dependency: com.greensock."+g)}h=!1}(window);
/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Initialize the MIDI library.
(function (global) {
    'use strict';
    var midiIO, _requestMIDIAccess, _delayedInit, MIDIAccess, _onReady, _onNotReady, MIDIPort, MIDIInput, MIDIOutput, _midiProc;

    function Promise() {

    }

    Promise.prototype.then = function(accept, reject) {
        this.accept = accept; 
        this.reject = reject;
    }

    Promise.prototype.succeed = function(access) {
        if (this.accept)
            this.accept(access);
    }

    Promise.prototype.fail = function(error) {
        if (this.reject)
            this.reject(error);
    }

    function _JazzInstance() {
        this.inputInUse = false;
        this.outputInUse = false;

        // load the Jazz plugin
        var o1 = document.createElement("object");
        o1.id = "_Jazz" + Math.random() + "ie";
        o1.classid = "CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90";

        this.activeX = o1;

        var o2 = document.createElement("object");
        o2.id = "_Jazz" + Math.random();
        o2.type="audio/x-jazz";
        o1.appendChild(o2);

        this.objRef = o2;

        var e = document.createElement("p");
        e.appendChild(document.createTextNode("This page requires the "));

        var a = document.createElement("a");
        a.appendChild(document.createTextNode("Jazz plugin"));
        a.href = "http://jazz-soft.net/";

        e.appendChild(a);
        e.appendChild(document.createTextNode("."));
        o2.appendChild(e);

        var insertionPoint = document.getElementById("MIDIPlugin");
        if (!insertionPoint) {
            // Create hidden element
            var insertionPoint = document.createElement("div");
            insertionPoint.id = "MIDIPlugin";
            insertionPoint.style.position = "absolute";
            insertionPoint.style.visibility = "hidden";
            insertionPoint.style.left = "-9999px";
            insertionPoint.style.top = "-9999px";
            document.body.appendChild(insertionPoint);
        }
        insertionPoint.appendChild(o1);
    }

    _JazzInstance.prototype._init = function() {
        if (this.objRef.isJazz) {
            this._Jazz = this.objRef;
        } else if (this.activeX.isJazz) {
            this._Jazz = this.activeX;
        } else {
            this._Jazz = null;
        }
        if (this._Jazz) {
            this._Jazz._jazzTimeZero = this._Jazz.Time();
            this._Jazz._perfTimeZero = window.performance.now();
        }
    };

    _JazzInstance.prototype._delayedInit = function(then) {
        var that = this;
        setTimeout(function() {
            that._init();
            then();
        }, 100);
    };

    _requestMIDIAccess = function _requestMIDIAccess() {
        var access = new MIDIAccess();
        return access._promise;
    };

    // API Methods

    MIDIAccess = function() {
        this._jazzInstances = new Array();
        var instance = new _JazzInstance();
        this._jazzInstances.push( instance );
        this._promise = new Promise;
        instance._delayedInit(function() {
            if (instance._Jazz) {
                this._Jazz = instance._Jazz;
                window.setTimeout( _onReady.bind(this), 3 );
            } else {
                window.setTimeout( _onNotReady.bind(this), 3 );
            }
        }.bind(this));
    };

    _onReady = function() {
        if (this._promise)
            this._promise.succeed(this);
    };

    _onNotReady = function() {
        if (this._promise)
            this._promise.fail( { code: 1 } );
    };

    MIDIAccess.prototype.inputs = function(  ) {
        if (!this._Jazz)
              return null;
        var list=this._Jazz.MidiInList();
        var inputs = new Array( list.length );

        for ( var i=0; i<list.length; i++ ) {
            inputs[i] = new MIDIInput( this, list[i], i );
        }
        return inputs;
    }

    MIDIAccess.prototype.outputs = function(  ) {
        if (!this._Jazz)
            return null;
        var list=this._Jazz.MidiOutList();
        var outputs = new Array( list.length );

        for ( var i=0; i<list.length; i++ ) {
            outputs[i] = new MIDIOutput( this, list[i], i );
        }
        return outputs;
    };

    MIDIInput = function MIDIInput( midiAccess, name, index ) {
        this._listeners = [];
        this._midiAccess = midiAccess;
        this._index = index;
        this._inLongSysexMessage = false;
        this._sysexBuffer = new Uint8Array();
        this.id = "" + index + "." + name;
        this.manufacturer = "";
        this.name = name;
        this.type = "input";
        this.version = "";
        this.onmidimessage = null;

        var inputInstance = null;
        var then = function() {
            this._jazzInstance = inputInstance._Jazz;
            this._input = this._jazzInstance.MidiInOpen( this._index, _midiProc.bind(this) );
        };
        for (var i=0; (i<midiAccess._jazzInstances.length)&&(!inputInstance); i++) {
            if (!midiAccess._jazzInstances[i].inputInUse)
                inputInstance=midiAccess._jazzInstances[i];
        }
        if (!inputInstance) {
            inputInstance = new _JazzInstance();
            midiAccess._jazzInstances.push( inputInstance );
            inputInstance.inputInUse = true;
            inputInstance._delayedInit(then.bind(this));
        } else {
            inputInstance.inputInUse = true;
            then.bind(this).apply();
        }
    };

    // Introduced in DOM Level 2:
    MIDIInput.prototype.addEventListener = function (type, listener, useCapture ) {
        if (type !== "midimessage")
            return;
        for (var i=0; i<this._listeners.length; i++)
            if (this._listeners[i] == listener)
                return;
        this._listeners.push( listener );
    };

    MIDIInput.prototype.removeEventListener = function (type, listener, useCapture ) {
        if (type !== "midimessage")
            return;
        for (var i=0; i<this._listeners.length; i++)
            if (this._listeners[i] == listener) {
                this._listeners.splice( i, 1 );  //remove it
                return;
            }
    };

    MIDIInput.prototype.preventDefault = function() {
        this._pvtDef = true;
    };

    MIDIInput.prototype.dispatchEvent = function (evt) {
        this._pvtDef = false;

        // dispatch to listeners
        for (var i=0; i<this._listeners.length; i++)
            if (this._listeners[i].handleEvent)
                this._listeners[i].handleEvent.bind(this)( evt );
            else
                this._listeners[i].bind(this)( evt );

        if (this.onmidimessage)
            this.onmidimessage( evt );

        return this._pvtDef;
    };

    MIDIInput.prototype.appendToSysexBuffer = function ( data ) {
        var oldLength = this._sysexBuffer.length;
        var tmpBuffer = new Uint8Array( oldLength + data.length );
        tmpBuffer.set( this._sysexBuffer );
        tmpBuffer.set( data, oldLength );
        this._sysexBuffer = tmpBuffer;
    };

    MIDIInput.prototype.bufferLongSysex = function ( data, initialOffset ) {
        var j = initialOffset;
        while (j<data.length) {
            if (data[j] == 0xF7) {
                // end of sysex!
                j++;
                this.appendToSysexBuffer( data.slice(initialOffset, j) );
                return j;
            }
            j++;
        }
        // didn't reach the end; just tack it on.
        this.appendToSysexBuffer( data.slice(initialOffset, j) );
        this._inLongSysexMessage = true;
        return j;
    };

    _midiProc = function _midiProc( timestamp, data ) {
        // Have to use createEvent/initEvent because IE10 fails on new CustomEvent.  Thanks, IE!
        var length = 0;
        var i,j;
        var isSysexMessage = false;

        // Jazz sometimes passes us multiple messages at once, so we need to parse them out
        // and pass them one at a time.

        for (i=0; i<data.length; i+=length) {
            if (this._inLongSysexMessage) {
                i = this.bufferLongSysex(data,i);
                if ( data[i-1] != 0xf7 ) {
                    // ran off the end without hitting the end of the sysex message
                    return;
                }
                isSysexMessage = true;
            } else {
                isSysexMessage = false;
                switch (data[i] & 0xF0) {
                    case 0x80:  // note off
                    case 0x90:  // note on
                    case 0xA0:  // polyphonic aftertouch
                    case 0xB0:  // control change
                    case 0xE0:  // channel mode
                        length = 3;
                        break;

                    case 0xC0:  // program change
                    case 0xD0:  // channel aftertouch
                        length = 2;
                        break;

                    case 0xF0:
                        switch (data[i]) {
                            case 0xf0:  // variable-length sysex.
                                i = this.bufferLongSysex(data,i);
                                if ( data[i-1] != 0xf7 ) {
                                    // ran off the end without hitting the end of the sysex message
                                    return;
                                }
                                isSysexMessage = true;
                                break;

                            case 0xF1:  // MTC quarter frame
                            case 0xF3:  // song select
                                length = 2;
                                break;

                            case 0xF2:  // song position pointer
                                length = 3;
                                break;

                            default:
                                length = 1;
                                break;
                        }
                        break;
                }
            }
            var evt = document.createEvent( "Event" );
            evt.initEvent( "midimessage", false, false );
            evt.receivedTime = parseFloat( timestamp.toString()) + this._jazzInstance._perfTimeZero;
            if (isSysexMessage || this._inLongSysexMessage) {
                evt.data = new Uint8Array( this._sysexBuffer );
                this._sysexBuffer = new Uint8Array(0);
                this._inLongSysexMessage = false;
            } else
                evt.data = new Uint8Array(data.slice(i, length+i));
            this.dispatchEvent( evt );
        }
    };

    MIDIOutput = function MIDIOutput( midiAccess, name, index ) {
        this._listeners = [];
        this._midiAccess = midiAccess;
        this._index = index;
        this.id = "" + index + "." + name;
        this.manufacturer = "";
        this.name = name;
        this.type = "output";
        this.version = "";

        var outputInstance = null;
        var then = function() {
            this._jazzInstance = outputInstance._Jazz;
            this._jazzInstance.MidiOutOpen(this.name);
        };
        for (var i=0; (i<midiAccess._jazzInstances.length)&&(!outputInstance); i++) {
            if (!midiAccess._jazzInstances[i].outputInUse)
                outputInstance=midiAccess._jazzInstances[i];
        }
        if (!outputInstance) {
            outputInstance = new _JazzInstance();
            midiAccess._jazzInstances.push( outputInstance );
            outputInstance.outputInUse = true;
            outputInstance._delayedInit(then.bind(this));
        } else {
            outputInstance.outputInUse = true;
            then.bind(this).apply();
        }
    };

    function _sendLater() {
        this.jazz.MidiOutLong( this.data );    // handle send as sysex
    }

    MIDIOutput.prototype.send = function( data, timestamp ) {
        var delayBeforeSend = 0;
        if (data.length === 0)
            return false;

        if (timestamp)
            delayBeforeSend = Math.floor( timestamp - window.performance.now() );

        if (timestamp && (delayBeforeSend>1)) {
            var sendObj = new Object();
            sendObj.jazz = this._jazzInstance;
            sendObj.data = data;

            window.setTimeout( _sendLater.bind(sendObj), delayBeforeSend );
        } else {
            this._jazzInstance.MidiOutLong( data );
        }
        return true;
    };

    //init: create plugin
    if (!window.navigator.requestMIDIAccess)
        window.navigator.requestMIDIAccess = _requestMIDIAccess;

}(window));

// Polyfill window.performance.now() if necessary.
(function (exports) {
    var perf = {}, props;

    function findAlt() {
        var prefix = ['moz', 'webkit', 'o', 'ms'],
        i = prefix.length,
            //worst case, we use Date.now()
            props = {
                value: (function (start) {
                    return function () {
                        return Date.now() - start;
                    };
                }(Date.now()))
            };

        //seach for vendor prefixed version
        for (; i >= 0; i--) {
            if ((prefix[i] + "Now") in exports.performance) {
                props.value = function (method) {
                    return function () {
                        exports.performance[method]();
                    }
                }(prefix[i] + "Now");
                return props;
            }
        }

        //otherwise, try to use connectionStart
        if ("timing" in exports.performance && "connectStart" in exports.performance.timing) {
            //this pretty much approximates performance.now() to the millisecond
            props.value = (function (start) {
                return function() {
                    Date.now() - start;
                };
            }(exports.performance.timing.connectStart));
        }
        return props;
    }

    //if already defined, bail
    if (("performance" in exports) && ("now" in exports.performance))
        return;
    if (!("performance" in exports))
        Object.defineProperty(exports, "performance", {
            get: function () {
                return perf;
            }});
        //otherwise, performance is there, but not "now()"

    props = findAlt();
    Object.defineProperty(exports.performance, "now", props);
}(window));

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var width = window.innerWidth || 1;
		var height = window.innerHeight || 1;
		var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };

		renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.EffectComposer relies on THREE.CopyShader" );

	this.copyPass = new THREE.ShaderPass( THREE.CopyShader );

};

THREE.EffectComposer.prototype = {

	swapBuffers: function() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( delta ) {

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( !pass.enabled ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( pass instanceof THREE.MaskPass ) {

				maskActive = true;

			} else if ( pass instanceof THREE.ClearMaskPass ) {

				maskActive = false;

			}

		}

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			renderTarget = this.renderTarget1.clone();

			renderTarget.width = window.innerWidth;
			renderTarget.height = window.innerHeight;

		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		var renderTarget = this.renderTarget1.clone();

		renderTarget.width = width;
		renderTarget.height = height;

		this.reset( renderTarget );

	}

};

// shared ortho camera

THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );

THREE.EffectComposer.scene = new THREE.Scene();
THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	this.scene = scene;
	this.camera = camera;

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

};

THREE.RenderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.scene.overrideMaterial = this.overrideMaterial;

		if ( this.clearColor ) {

			this.oldClearColor.copy( renderer.getClearColor() );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.render( this.scene, this.camera, readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		}

		this.scene.overrideMaterial = null;

	}

};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function ( shader, textureID ) {

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;

};

THREE.ShaderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer;

		}

		THREE.EffectComposer.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );

		} else {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, this.clear );

		}

	}

};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass = function ( scene, camera ) {

	this.scene = scene;
	this.camera = camera;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

	this.inverse = false;

};

THREE.MaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		// don't update color or depth

		context.colorMask( false, false, false, false );
		context.depthMask( false );

		// set up stencil

		var writeValue, clearValue;

		if ( this.inverse ) {

			writeValue = 0;
			clearValue = 1;

		} else {

			writeValue = 1;
			clearValue = 0;

		}

		context.enable( context.STENCIL_TEST );
		context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
		context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
		context.clearStencil( clearValue );

		// draw into the stencil buffer

		renderer.render( this.scene, this.camera, readBuffer, this.clear );
		renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		// re-enable update of color and depth

		context.colorMask( true, true, true, true );
		context.depthMask( true );

		// only render where stencil is set to 1

		context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
		context.stencilOp( context.KEEP, context.KEEP, context.KEEP );

	}

};


THREE.ClearMaskPass = function () {

	this.enabled = true;

};

THREE.ClearMaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		context.disable( context.STENCIL_TEST );

	}

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"opacity":  { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",
			"gl_FragColor = opacity * texel;",

		"}"

	].join("\n")

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Convolution shader
 * ported from o3d sample to WebGL / GLSL
 * http://o3d.googlecode.com/svn/trunk/samples/convolution.html
 */

THREE.ConvolutionShader = {

	defines: {

		"KERNEL_SIZE_FLOAT": "25.0",
		"KERNEL_SIZE_INT": "25",

	},

	uniforms: {

		"tDiffuse":        { type: "t", value: null },
		"uImageIncrement": { type: "v2", value: new THREE.Vector2( 0.001953125, 0.0 ) },
		"cKernel":         { type: "fv1", value: [] }

	},

	vertexShader: [

		"uniform vec2 uImageIncrement;",

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float cKernel[ KERNEL_SIZE_INT ];",

		"uniform sampler2D tDiffuse;",
		"uniform vec2 uImageIncrement;",

		"varying vec2 vUv;",

		"void main() {",

			"vec2 imageCoord = vUv;",
			"vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );",

			"for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {",

				"sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];",
				"imageCoord += uImageIncrement;",

			"}",

			"gl_FragColor = sum;",

		"}"


	].join("\n"),

	buildKernel: function ( sigma ) {

		// We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize anyway.

		function gauss( x, sigma ) {

			return Math.exp( - ( x * x ) / ( 2.0 * sigma * sigma ) );

		}

		var i, values, sum, halfWidth, kMaxKernelSize = 25, kernelSize = 2 * Math.ceil( sigma * 3.0 ) + 1;

		if ( kernelSize > kMaxKernelSize ) kernelSize = kMaxKernelSize;
		halfWidth = ( kernelSize - 1 ) * 0.5;

		values = new Array( kernelSize );
		sum = 0.0;
		for ( i = 0; i < kernelSize; ++i ) {

			values[ i ] = gauss( i - halfWidth, sigma );
			sum += values[ i ];

		}

		// normalize the kernel

		for ( i = 0; i < kernelSize; ++i ) values[ i ] /= sum;

		return values;

	}

};

/**
 * @author felixturner / http://airtight.cc/
 *
 * Mirror Shader
 * Copies half the input to the other half
 *
 * side: side of input to mirror (0 = left, 1 = right, 2 = top, 3 = bottom, 4 = passthru)
 */

THREE.MirrorShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"side":     { type: "i", value: 1 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform int side;",
		
		"varying vec2 vUv;",

		"void main() {",

			"vec2 p = vUv;",
			"if (side == 0){",
				"if (p.x > 0.5) p.x = 1.0 - p.x;",
			"}else if (side == 1){",
				"if (p.x < 0.5) p.x = 1.0 - p.x;",
			"}else if (side == 2){",
				"if (p.y < 0.5) p.y = 1.0 - p.y;",
			"}else if (side == 3){",
				"if (p.y > 0.5) p.y = 1.0 - p.y;",
			"} ",
			"vec4 color = texture2D(tDiffuse, p);",
			"gl_FragColor = color;",

		"}"

	].join("\n")

};

/**
 * @author tapio / http://tapio.github.com/
 *
 * Brightness and contrast adjustment
 * https://github.com/evanw/glfx.js
 * brightness: -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid white)
 * contrast: -1 to 1 (-1 is solid gray, 0 is no change, and 1 is maximum contrast)
 */

THREE.BrightnessContrastShader = {

	uniforms: {

		"tDiffuse":   { type: "t", value: null },
		"brightness": { type: "f", value: 0 },
		"contrast":   { type: "f", value: 0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float brightness;",
		"uniform float contrast;",

		"varying vec2 vUv;",

		"void main() {",

			"gl_FragColor = texture2D( tDiffuse, vUv );",

			"gl_FragColor.rgb += brightness;",

			"if (contrast > 0.0) {",
				"gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;",
			"} else {",
				"gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;",
			"}",

		"}"

	].join("\n")

};

/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.RGBShiftShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"amount":   { type: "f", value: 0.005 },
		"angle":    { type: "f", value: 0.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float amount;",
		"uniform float angle;",

		"varying vec2 vUv;",

		"void main() {",

			"vec2 offset = amount * vec2( cos(angle), sin(angle));",
			"vec4 cr = texture2D(tDiffuse, vUv + offset);",
			"vec4 cga = texture2D(tDiffuse, vUv);",
			"vec4 cb = texture2D(tDiffuse, vUv - offset);",
			"gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",

		"}"

	].join("\n")

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

THREE.FilmShader = {

	uniforms: {

		"tDiffuse":   { type: "t", value: null },
		"time":       { type: "f", value: 0.0 },
		"nIntensity": { type: "f", value: 0.5 },
		"sIntensity": { type: "f", value: 0.05 },
		"sCount":     { type: "f", value: 4096 },
		"grayscale":  { type: "i", value: 1 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		// control parameter
		"uniform float time;",

		"uniform bool grayscale;",

		// noise effect intensity value (0 = no effect, 1 = full effect)
		"uniform float nIntensity;",

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		"uniform float sIntensity;",

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		"uniform float sCount;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			// sample the source
			"vec4 cTextureScreen = texture2D( tDiffuse, vUv );",

			// make some noise
			"float x = vUv.x * vUv.y * time *  1000.0;",
			"x = mod( x, 13.0 ) * mod( x, 123.0 );",
			"float dx = mod( x, 0.01 );",

			// add noise
			"vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );",

			// get us a sine and cosine
			"vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",

			// add scanlines
			"cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;",

			// interpolate between source and result by intensity
			"cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",

			// convert to grayscale if desired
			// "if( grayscale ) {",

			// 	"cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );",

			// "}",

			"gl_FragColor =  vec4( cResult, cTextureScreen.a );",

		"}"

	].join("\n")

};

 /**
 * Uberviz Super shader doing simple color manipulation
 * Combines:
 * - Glow
 * - Vignette
 * - RGB shift
 * - BrightnessContrast
 * - Hue/Saturation
 */

THREE.SuperShader = {

	uniforms: {

		//Glow
		"tDiffuse": 	{ type: "t", value: null },
		"glowAmount":       { type: "f", value: 0.5 },
		"glowSize":        	{ type: "f", value: 4.0 },
		"resolution":   { type: "v2", value: new THREE.Vector2( 800.0, 600.0 )  },

		//Vignette
		"vigOffset":   { type: "f", value: 1.0 },
		"vigDarkness": { type: "f", value: 1.0 },

		//BrightnessContrast
		// "brightness": { type: "f", value: 0 },
		// "contrast":   { type: "f", value: 0 },

		//HueSaturationShader
		"hue":        { type: "f", value: 0 },
		"saturation": { type: "f", value: 0 },

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		
		"uniform float glowSize;",
		"uniform float glowAmount;",
		"uniform vec2 resolution;",

		"uniform float vigOffset;",
		"uniform float vigDarkness;",

		// "uniform float brightness;",
		// "uniform float contrast;",

		"uniform float hue;",
		"uniform float saturation;",

		"uniform int mirrorSide;",

		"varying vec2 vUv;",

		"void main() {",

			"float h = glowSize / resolution.x;",
			"float v = glowSize / resolution.y;",

			"vec4 sum = vec4( 0.0 );",

			//H Blur
			"sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;",
			"sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;",
			"sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;",
			"sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
			"sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;",
			"sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;",
			"sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;",
			"sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;",

			
			//V Blur
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;",
			"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;",

			//orig color
			"vec4 col = texture2D( tDiffuse, vUv );",

			//rgb
			// "vec2 offset = rgbAmount * vec2( cos(rgbAngle), sin(rgbAngle));",
			// "vec4 cr = texture2D(tDiffuse, vUv + offset);",
			// "vec4 cga = texture2D(tDiffuse, vUv);",
			// "vec4 cb = texture2D(tDiffuse, vUv - offset);",
			// "col = vec4(cr.r, cga.g, cb.b, cga.a);",
			
			//Add Glow
			"col = min(col + sum * glowAmount, 1.0);",

			//vignette
			"vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( vigOffset );",
			"col = vec4( mix( col.rgb, vec3( 1.0 - vigDarkness ), dot( uv, uv ) ), col.a );",

			//BrightnessContrast
			// "col.rgb += brightness;",

			// "if (contrast > 0.0) {",
			// 	"col.rgb = (col.rgb - 0.5) / (1.0 - contrast) + 0.5;",
			// "} else {",
			// 	"col.rgb = (col.rgb - 0.5) * (1.0 + contrast) + 0.5;",
			// "}",

			// hue
			"float angle = hue * 3.14159265;",
			"float s = sin(angle), c = cos(angle);",
			"vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;",
			"float len = length(col.rgb);",
			"col.rgb = vec3(",
				"dot(col.rgb, weights.xyz),",
				"dot(col.rgb, weights.zxy),",
				"dot(col.rgb, weights.yzx)",
			");",

			// saturation
			"float average = (col.r + col.g + col.b) / 3.0;",
			"if (saturation > 0.0) {",
				"col.rgb += (average - col.rgb) * (1.0 - 1.0 / (1.001 - saturation));",
			"} else {",
				"col.rgb += (average - col.rgb) * (-saturation);",
			"}",

			


			"gl_FragColor = col;",

		"}"

	].join("\n")

};

/**
 * @author felixturner / http://airtight.cc/
 *
 * Strech an image across a mesh
 * displace verts based on pixel brightness
 * also displace strips of material based on level hostory coming in and y posn
 */

 THREE.DisplacementMatShader = {

	uniforms: {

		"texture": { type: "t", value: null },
		"timeX": { type: "f", value: 0.0 },
		"timeY": { type: "f", value: 0.0 },
		"stretch": { type: "f", value: 10.0 },
		"depth": { type: "f", value: 300 }, //brightness depth
		"audioDepth": { type: "f", value: 1 },//audio depth
		"levels"  : { type: "fv1", value: [] },    // float array 
		"numStrips":{type: "f",value: 20.0},

	},

	vertexShader: [

		"uniform sampler2D texture;",
		"uniform float depth;",
		"uniform float timeX;",
		"uniform float timeY;",
		"uniform float stretch;",
		"uniform float audioDepth;",
		"uniform float numStrips;",
		"uniform float levels[ 100 ];",

		"varying vec2 vUv;",

		"void main() {",
		
			"vUv = uv;",

			//stretch image on x-axis
			"vUv.x = abs(2.0 * fract(timeX + vUv.x/stretch) -1.0);",
			"vUv.y = fract(timeY + vUv.y);",

			//get levels value based on y Pos
			"int index = int(floor((1.0 - uv.y) * numStrips)) - 1;",
			"float levelVal = levels[ index ];",

			//get displacement value based on brightness of pixel + levelVal
			"vec4 color = texture2D( texture, vUv );",
			"float value = (( color.r + color.g + color.b ) / 3.0  * depth) + (levelVal * audioDepth);",

			"vec3 newPosition = position + normal * value;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );",

		"}",

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D texture;",		
		"varying vec2 vUv;",

		"void main() {",
			
			//use modified vUv from vert shader
			"gl_FragColor = texture2D(texture, vUv);",

		"}",

		].join("\n")

	};

var Stars = function() {



	var vizParams = {
		on:true,
		size: 2.5,
		speed: 1,
		opacity: 0.7,
		//colorRange: .5,

	};

	var PARTICLE_ROT_SPEED = 0.01;
	var BEAM_ROT_SPEED = 0.003;

	var starCount = 300;
	var starRadius = 2000;
	var stars = [];
	var colors = [];

	var starSize = 0;

	var geometry;

	var material;
	var particleHue;

	var posTime = 0;

	var beamCount = 40;

	var groupHolder;

	function init(){

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('Stars');
		folder.add(vizParams, 'size', 0, 10).name("Size");
		folder.add(vizParams, 'speed', 0, 10).name("Speed");
		folder.add(vizParams, 'opacity', 0, 1).name("Opacity");
		//folder.add(vizParams, 'colorRange', 0, 1).step(0.1).name("Color Range");
		//folder.add(vizParams, 'freakout');
		
		// if (vizParams.on){
		// 	folder.open();
		// }

		groupHolder = new THREE.Object3D();
		VizHandler.getVizHolder().add(groupHolder);

		//PARTICLES
		//init Particles
		geometry = new THREE.Geometry();
		//create one shared material
		var sprite = THREE.ImageUtils.loadTexture("../res/img/particle.png");
		material = new THREE.ParticleBasicMaterial({
			size: 100,
			map: sprite,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
			opacity:1,
			//sizeAttenuation: false,
			//vertexColors: true //allows 1 color per particle
			//color: 0xFF0000
		});

		material.particleHue = Math.random();
		material.color = new THREE.Color(0xffffff);
		material.color.setHSL(material.particleHue, 1.0, 1.0);

		//create particles
		var spread =  1000;
		for (i = 0; i < starCount; i++) {

			var posn = new THREE.Vector3(ATUtil.randomRange(-spread,spread),
			ATUtil.randomRange(-spread,spread),
			ATUtil.randomRange(-spread,spread));

			geometry.vertices.push(posn);


			var star = {initPos: Math.random(),
						};

			stars.push(star);
		}

		//geometry.colors = colors;

		//init particle systemvizParams.opacity;
		particles = new THREE.ParticleSystem(geometry, material);
		particles.position.z = -500;
		particles.sortParticles = false;

		groupHolder.add(particles);

		//init event listeners
		events.on("update", update);


	}

	function update() {

		//posTime += vizParams.speed/500;

		particleHue = (simplexNoise.noise(VizHandler.getRenderTime()/5,0,0)+1)/2;
		material.color.setHSL(particleHue, 0.8, .8);
		material.opacity = vizParams.opacity;

		material.size = vizParams.size * 10;// * (AudioHandler.getVolume() + 0.2);

		for (i = 0; i < starCount; i++) {
			var star = stars[i];
			var pos = ((star.initPos + VizHandler.getRenderTime() * vizParams.speed/10) % 1) * 3000 - 1000;
			geometry.vertices[i].z =	pos;
		}

		geometry.verticesNeedUpdate = true;

	}


	return {
		init:init,
		update:update
	};

}();
var StarBars = function() {



	var vizParams = {
		on:false,
		size: 5,
		speed: 2,
		opacity: 0.7,
		colorRange: .5,

	};

	var PARTICLE_ROT_SPEED = 0.01;
	var BEAM_ROT_SPEED = 0.003;

	var starCount = 150;
	var starRadius = 2000;
	var stars = [];
	var colors = [];

	var starSize = 0;

	var geometry;

	var material;
	var particleHue;

	var posTime = 0;

	var beamCount = 40;

	var groupHolder;

	function init(){

		events.on("midiControl", onMidiControl);

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('StarBars');
		folder.add(vizParams, 'on').listen().onChange(onToggleViz);
		//folder.add(vizParams, 'size', 0, 10).name("Size");
		folder.add(vizParams, 'speed', -10, 10).name("Speed");
		folder.add(vizParams, 'opacity', 0, 1).name("Opacity");
		//folder.add(vizParams, 'colorRange', 0, 1).step(0.1).name("Color Range");
		//folder.add(vizParams, 'freakout');
		//folder.open();

		groupHolder = new THREE.Object3D();
		VizHandler.getVizHolder().add(groupHolder);

		//PARTICLES
		//init Particles
		geometry = new THREE.Geometry();
		//create one shared material
		material = new THREE.MeshBasicMaterial({
			color: 0x0FFFFFF,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
			opacity:.8,
			sizeAttenuation: true,
			side: THREE.DoubleSide,
		});


		var width = 4;
		//var lengthMin = 20
		//var lengthRange = 80;

		//create bars
		var spread =  1000;

		//CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
		//var cylinderGeom = new THREE.CylinderGeometry(width,width,100,12,12,false);

		//SIMPLER SHAPES
		//PlaneGeometry(width, height, widthSegments, heightSegments)
		var cylinderGeom = new THREE.PlaneGeometry(4,100,1,1);

		stars = [];

		for (i = 0; i < starCount; i++) {

			var star = new THREE.Mesh( cylinderGeom, material );

			star.scale.y = ATUtil.randomRange(0.2,2);
			star.scale.x = ATUtil.randomRange(0.2,2);
			star.scale.z = ATUtil.randomRange(0.2,2);

			star.initPos = Math.random();
			groupHolder.add( star );

			star.rotation.x = Math.PI/2;

			star.position = new THREE.Vector3(ATUtil.randomRange(-spread,spread),
			ATUtil.randomRange(-spread,spread),
			0);

			stars.push(star);

		}

		//geometry.colors = colors;

		//init event listeners
		events.on("update", update);
		events.on("onBeat", onBeat);


		onToggleViz();



	}


	function onToggleViz(){


		if (vizParams.on){

			groupHolder.visible = true;
			groupHolder.traverse( function ( object ) { object.visible = true; } );

		}else{

			groupHolder.visible = false;
			groupHolder.traverse( function ( object ) { object.visible = false; } );

		}



	}

	function update() {

		//AUDIO REACTIVE SPEED
		posTime += vizParams.speed/200*(AudioHandler.getVolume() + 0.2);

		//CONSTANT SPEED
		//posTime += vizParams.speed/200;


		//mesh.material.color.setHex(Math.random() * 0xFFFFFF);



		particleHue = (simplexNoise.noise(posTime,0)+1)/2;
		material.color.setHSL(particleHue, 0.8, 0.5);

		material.opacity = vizParams.opacity;
		// for (i = 0; i < beamCount; ++i) {
		// 	beamGroup.children[i].material.opacity = 0.15 * vizParams.opacity;
		// }

		//material.size = 40;//vizParams.size * 10 * (AudioHandler.getVolume() + 0.2);

		for (i = 0; i < starCount; i++) {
			var star = stars[i];
			var pos = ((star.initPos + posTime) % 1) * 2000 - 1000;
			star.position.z =	pos;

			//star.scale.y = BPMHandler.getBPMTime();
		}

	}

	function onBeat(){
		if (Math.random() < .5) return;
		//particles.rotation.x = Math.random()*Math.PI*2;
		//particles.rotation.y += Math.random()*Math.PI*2;
		groupHolder.rotation.z += Math.random()*Math.PI*2;
	}

	function onMidiControl(data){

		switch(data.id){

		case 52:
			vizParams.on = data.val == 1;
			onToggleViz();
			break;
		}

	}

	return {
		init:init,
		update:update,
		vizParams:vizParams,
		onToggleViz:onToggleViz
	};

}();
var Segments = function() {

	//Viz Template

	var groupHolder;

	var segments;
	var strobeFrame = 0;

	var smoothedScale = 1;
	var gotoScale = 1;

	var rotOffset = 0;

	var SEGMENT_COUNT = 40;


	var segMaterial;

	var vizParams = {
		on:true,
		useAudio:true,
		scale:1,
		//scale:1,
		strobe:false
	};

	function init(){

		events.on("midiControl", onMidiControl);

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('Segments');
		folder.add(vizParams, 'on').listen().onChange(onToggleViz);
		//folder.add(vizParams, 'useAudio');
		//folder.add(vizParams, 'scale', 0, 10).step(0.1).name("Size");
		folder.add(vizParams, 'strobe');
		//folder.add(vizParams, 'scale', 0, 10).step(0.1).name("Size");
		//folder.open();


		//EVENT HANDLERS
		events.on("update", update);
		events.on("onBeat", onBeat);
		events.on("onBPMBeat", onBPMBeat);

		groupHolder = new THREE.Object3D();
		VizHandler.getVizHolder().add(groupHolder);


		segments =[];

		//one material for all segments
		segMaterial = new THREE.MeshNormalMaterial({
			//color: Math.random()*0xFFFFFF,
			transparent: true,
			side: THREE.DoubleSide,
			blending : THREE.AdditiveBlending,
			opacity:ATUtil.randomRange(0.2,0.6),
			//vertexColors: THREE.FaceColors,
			//shading: THREE.FlatShading
			//map:texture
			//wireframe: true
		});



		//add segments
		for (var i = 0; i < SEGMENT_COUNT; i++) {
			var  s = new Segment(i,segMaterial);
			s.init();
			segments.push(s);
			groupHolder.add(s.center);
		};


		onToggleViz();
	}


	function onToggleViz(){


		if (vizParams.on){


			//pop out segments ofirst time displayed
			gotoScale = ATUtil.randomRange(2,8);

			groupHolder.visible = true;
			groupHolder.traverse( function ( object ) { object.visible = true; } );



		}else{


			groupHolder.visible = false;
			groupHolder.traverse( function ( object ) { object.visible = false; } );


		}

	}

	function update() {

		//draw every frame

		//UPDATE TWEETS
		for (var i = 0; i < SEGMENT_COUNT; i++) {
			segments[i].update();
		}

		//perlin wobble floor texture
		// textureFloor.offset.x = snoise.noise(wtime * 0.001,0) *.5;
		// //tornado motion via floor motion
		// textureFloor.offset.y -= 0.02;
		// textureFloor.needsUpdate	= true;


		//groupHolder.rotation.x = simplexNoise.noise( VizHandler.getRenderTime()*.1 + rotOffset,0) * Math.PI*2;
		//groupHolder.rotation.y = simplexNoise.noise(VizHandler.getRenderTime()*.1 + rotOffset,10) * Math.PI*2;


		//groupHolder.scale.x = groupHolder.scale.y = groupHolder.scale.z = vizParams.scale;



		//strobe
		if (vizParams.strobe){

			strobeFrame ++;
			strobeFrame = strobeFrame % 4;

			// trace(strobe);

			// //= !strobe;
			if (strobeFrame > 1) groupHolder.rotation.x += Math.PI;

		}



		smoothedScale += (gotoScale - smoothedScale)/15;
		groupHolder.scale.x = groupHolder.scale.y = groupHolder.scale.z = smoothedScale;



	}

	function onBeat(){
		//beat detected

		//if (Math.random() < .5) return;

		rotOffset = Math.random()*10;


		//if (Math.random()< 0.003){
		//groupHolder.rotation.x = Math.random()*Math.PI*2;


		if (Math.random()< 0.3){
			gotoScale = ATUtil.randomRange(2,8);
		}
		//}


		 for (var i = 0; i < SEGMENT_COUNT; i++) {
		 	segments[i].setScale();
		 }

		// VizHandler.getCamera().fov = ATUtil.randomRange(50,120);
		//VizHandler.getCamera().updateProjectionMatrix();



	}

	function onBPMBeat(){
		//bpm

		// for (var i = 0; i < SEGMENT_COUNT; i++) {
		// 	segments[i].setScale();
		// }
	}

	
	function onMidiControl(data){

		switch(data.id){

		case 53:
			vizParams.on = data.val == 1;
			onToggleViz();
			break;
		}

	}

	return {
		init:init,
		update:update,
		onBeat:onBeat,
		onBPMBeat:onBPMBeat,
		vizParams:vizParams,
		onToggleViz:onToggleViz
	};

}();
/**
 * Segment Object
 */

 //var colors = [0x732946,0x9a355d,0xbf4373,0x9b9b9b,0xb4b4b4];


var colors = [0x2e4080,0x352e85,0x512e89,0x702f8e,0x912f93];


var Segment = function(index,segMaterial) {

	this.init = function() {

		//center is the center point of tweet segmnent
		//tweet plane spins around center
		this.center = new THREE.Object3D();
		//this.center.rotation.y = ATUtil.randomRange(0,Math.PI*2);
		this.noiseStart = Math.random() * 100;
		this.speed = ATUtil.randomRange(0.01,0.05);
		if (Math.random()>.5) this.speed = -this.speed;
		this.age = 0;

		//assign random freq to listen to
		this.binId = ATUtil.randomInt(0,15);
		this.smoothedScale = 1;
		this.gotoScale = 1;



		//start behind camera
		//outerRadius is distance between edge of tornado and
		this.center.rotation.y = -Math.PI/2
		this.outerRadius= 0;



		var thickness = 150;
		var radius = 400+ ATUtil.randomRange(-thickness,thickness);

		//console.log(radius);

		var planeGeometry = new THREE.SphereGeometry(radius, 30, 1,
			ATUtil.randomRange(0,Math.PI*2),
			ATUtil.randomRange(Math.PI/4,Math.PI), //Math.PI/2, //horiz width
			ATUtil.randomRange(Math.PI/16,Math.PI*15/16 ),//Math.PI/2, //vertical start
			ATUtil.randomRange(Math.PI/48,Math.PI/16) //Math.PI/16 //vertical width
			)


		//Init Material-


		//GOOD
		// this.material = new THREE.MeshNormalMaterial({
		// 	//color: Math.random()*0xFFFFFF,
		// 	transparent: true,
		// 	side: THREE.DoubleSide,
		// 	blending : THREE.AdditiveBlending,
		// 	opacity:ATUtil.randomRange(0.2,0.6),
		// 	//vertexColors: THREE.FaceColors,
		// 	//shading: THREE.FlatShading
		// 	//map:texture
		// });

		//STRIPEY
		// this.material = new THREE.MeshBasicMaterial({
		// 	//color: Math.random()*0xFFFFFF,
		// 	transparent: true,
		// 	side: THREE.DoubleSide,
		// 	blending : THREE.AdditiveBlending,
		// 	opacity:ATUtil.randomRange(0.2,0.6),
		// 	vertexColors: THREE.FaceColors,
		// 	//shading: THREE.FlatShading
		// 	//map:texture
		// });
		// var thiscol = new THREE.Color();
		// thiscol.setHSL(Math.random(),.8,.5);
		// var black = new THREE.Color(0x000000);

		// for (var i = 0; i < planeGeometry.faces.length; i++) {
		// 	var col = (i % 4 > 1) ? thiscol : black;
		// 	planeGeometry.faces[i].color = new THREE.Color(col);
		// }

		//this.material.color.setHSL(Math.random(),.8,.5);


		//WOBBLY
		// this.material = new THREE.ShaderMaterial({
		// 	uniforms:{
		// 		diffuse : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		// 		opacity : { type: "f", value: 1.0 },
		// 		noiseTime: { type: "f", value: Math.random() },
		// 		noiseScale: { type: "f", value: 500},
		// 		depth: { type: "f", value: 0 },

		// 	},

		// 	vertexShader:document.getElementById('vertexShader').textContent,
		// 	fragmentShader:document.getElementById('fragmentShader').textContent,
		// 	color:Math.random()*0xFFFFFF,
		// 	transparent: true,
		// 	side: THREE.DoubleSide,
		// 	blending : THREE.AdditiveBlending,
		// 	opacity:.5,

		// });

		//console.log(this.material);

		//this.material.uniforms.diffuse.value.setHSL(Math.random()*.4 + .3,.8,.5);
		//this.material.uniforms['diffuse'].value.setHSL(Math.random(),1,.5);



		this.plane = new THREE.Mesh(planeGeometry,segMaterial);
		this.center.add( this.plane );
		//face center
		//this.plane.rotation.y = Math.PI/2;


		//this.plane.position.x = 10000;//hide at start


		//DEBUG
		// var debugGeom = new THREE.BoxGeometry( 20, 20, 20 );
		// var debugMaterial = new THREE.MeshBasicMaterial( {
		// 	color: 0x00ff00,
		// 	wireframe: true,
		// 	blending : THREE.AdditiveBlending,
		// 	transparent:true
		// } );

		// //center orig
		// var debugMesh = new THREE.Mesh( debugGeom, debugMaterial );
		// this.center.add( debugMesh );

		// //plane orig
		// var debugMesh2 = new THREE.Mesh( debugGeom, debugMaterial );
		// this.plane.add( debugMesh2 );

	//	TweenMax.delayedCall(Math.random()*10 , this.reset,null,this);

	},

	this.setScale = function(){

		//if (Math.random() < .5) return;
		this.gotoScale = ATUtil.randomRange(0.4,1);


	},

	//send plane back to edge of screen for re-entry
	this.reset = function(){

		//start close to camera
		//this.center.rotation.y = -Math.PI/2 + ATUtil.randomRange(-Math.PI/6,Math.PI/6);

		//TweenMax.killTweensOf(this);
		//TweenMax.fromTo(this,6, { outerRadius: 1000}, {outerRadius:0,ease:Circ.easeOut,delay:Math.random()*10 + 1});
		//TweenMax.fromTo(this,6, { outerRadius: 1000}, {outerRadius:0,ease:Circ.easeOut});
		//this.age = 0;
	},

	this.update = function() {

		//console.log("update");


		//howInside = how close to being in tornado
		//var clmp = ATUtil.clamp(this.outerRadius,0,300);
		//var howInside =  ATUtil.map(clmp,300,0,0,1);

		//this.plane.material.uniforms.noiseTime.value += 0.01;


		// this.material.uniforms.diffuse.value.setHSL(
		// 	(snoise.noise((this.noiseStart + wtime*0.003),0) + 1 )/2
		// 	,1,.5);



		//this.plane.material.uniforms['time'].value += 0.01;




		//lerp tweets up and down pole
		//vpos = normalized vertical position of tweet along height of column 0-1 (1 is top)

		//this.vpos = (snoise.noise(this.noiseStart + wtime*0.001,0) + 1 )/2;
		//this.center.position.y = this.vpos* TORNADO_H;
		//lower spins faster
		//this.rotSpeed = ( ATUtil.lerp(this.vpos, 0.1, 0.02) + this.speed) * howInside;

		//var scl = 0.5 + (snoise.noise((this.noiseStart + wtime) * 0.006,0) +1)/4;
		//this.plane.scale.set(scl,scl,scl);

		//smaller radius at bottom
		//this.plane.position.x = ATUtil.lerp(this.vpos,BOTTOM_RAD,TOP_RAD) + this.outerRadius;


		//spin
		this.center.rotation.y += this.speed;


		 // var lvl = AudioHandler.getLevelsData()[this.binId];
		 // if (lvl > 0){
		 // 	var gotoScale = 0.2 + lvl ;
		 // 	this.smoothedScale += (gotoScale - this.smoothedScale)/5;
		 // 	//console.log( AudioHandler.getLevelsData()[this.binId]);
		 // 	this.center.scale.x = this.center.scale.y = this.center.scale.z = this.smoothedScale;
		 // }


		 this.smoothedScale += (this.gotoScale - this.smoothedScale)/8;
		 //console.log( AudioHandler.getLevelsData()[this.binId]);
		 this.center.scale.x = this.center.scale.y = this.center.scale.z = this.smoothedScale;





		//lerp  other axis
		//this.center.rotation.x = snoise.noise((this.noiseStart + wtime) * 0.003,0) * Math.PI*2;


		//do a sinous wobble along spine of tornado
		//this.center.position.x =  snoise.noise((this.center.position.y/2 + wtime) * 0.003,0) * 100;



		// this.age++;

		// if (this.age > 500  && Math.random()< 0.0002){
		// 	this.reset();
		// }

	}
};

//DEBUG IMAGE

var LightLeak = function() {

	var groupHolder;

	var textures = [];
	var imgCount = 4;

	var imgId = 0;

	var strobe = true;
	var plane;
	var plane2;
	var imgMaterial;
	var imgMaterial2;


	var vizParams = {
		on:true,
		freakOut: false,
		opacity: 0.5

	};

	function init(){

		events.on("midiControl", onMidiControl);


		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('Light Leak');
		folder.add(vizParams, 'opacity', 0, 1).name("Opacity");
		folder.add(vizParams, 'freakOut');
		// if (vizParams.on){
		// 	folder.open();
		// }
		
		groupHolder = new THREE.Object3D();


		//put on scene to avoid 3d tilt
		VizHandler.getScene().add(groupHolder);

		//VizHandler.getVizHolder().add(groupHolder);

		//groupHolder.position.z = -800;

		events.on("update", update);
		events.on("onBeat", onBeat);
		events.on("onBPMBeat", onBPMBeat);

		//move up?
		for (var i = 0; i <imgCount; i++) {
			textures[i] = THREE.ImageUtils.loadTexture( "../res/img/light-leak/leak0" + i + ".jpg" );
		}

		imgMaterial = new THREE.MeshBasicMaterial( {
			map : textures[0],
			transparent:true,
			blending: THREE.AdditiveBlending,
			opacity: 0.2
		} );

		//Add img plane
		var planeGeometry = new THREE.PlaneGeometry( 800, 600,1,1 );
		plane = new THREE.Mesh( planeGeometry, imgMaterial );
		groupHolder.add( plane );
		
		plane.scale.x = plane.scale.y = 10;


		plane.position.z = -1000;

		switchImage();

	}


	function switchImage(){

		groupHolder.rotation.z = Math.random()*Math.PI*2;
		imgMaterial.map = textures[ATUtil.randomInt(0,imgCount-1)];

	}

	function update() {

		//draw every frame
		groupHolder.rotation.z += 0.005;

		if (vizParams.freakOut){
			//switchImage();
			strobe = !strobe;
			imgMaterial.opacity = strobe ? 0 : 1;
		}else{
			imgMaterial.opacity = vizParams.opacity;
		}

	}

	function onBeat(){

		if (Math.random() < 0.7 ) return;

		switchImage();
	}

	function onBPMBeat(){
		//bpm
		//switchImage();
	}

	function toggleBPMMode(tog){
	}

	function onMidiControl(data){

		switch(data.id){

		case 43:
			vizParams.freakOut = data.val == 1;
			break;
		}

	}

	return {
		init:init,
		update:update,
		onBeat:onBeat,
		onBPMBeat:onBPMBeat,
		vizParams:vizParams,
		//onParamsChange:onParamsChange
	};

}();
/* 

	A tube that uses DisplacementMatShader. Loads images.

*/



var DisplacementTube = function() {


	var groupHolder;


	var imgCount = 18;
	var textures = [];

	// var imgId1;
	// var imgId2;
	var toggle = false;
	var imgId = 0;


	var earthMaterial;
	//var earthMaterial2;
	var tubeMesh;

	var material;

	var freakOutTime = 0;

	var vizParams = {
		on:false,
		sliceXSpeed: 3,
		sliceYSpeed: 5,
		stretch: 1.8,
		depth: 100,
		scale: 1,
		audioDepth: 100,
		//opacity:.5,
		freakOut:false,
		freakOutPeriod:2,
		//base: 140,
		rotSpeed: 0.04,
		numStrips: 20

		// lineCount: 90.0,
		// dotSize: 0.0,
		// lineSize: 0.3,
		// blur: 0.1,
		// noiseSize: 10,
		// lineSpeed: 0,
		// depth:50,
		// base: 140,
		// auto:true,
		// vizMode:0 //0 lines, 1 dots, 2 both

	};

	function init(){

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('DisplacementTube');
		folder.add(vizParams, 'on').listen().onChange(onToggleViz);

		folder.add(vizParams, 'freakOut').listen();
		//folder.add(vizParams, 'opacity', 0, 1).name("Opacity").onChange(onSetParams);

		folder.add(vizParams, 'stretch', 1, 100).listen().onChange(onParamsChange);
		folder.add(vizParams, 'freakOutPeriod', 1, 60).listen().onChange(onParamsChange);
		folder.add(vizParams, 'scale', .1, 2).listen().onChange(onParamsChange);
		folder.add(vizParams, 'depth', 0, 300).onChange(onParamsChange);
		folder.add(vizParams, 'audioDepth', 0, 300).onChange(onParamsChange);
		folder.add(vizParams, 'numStrips', 1, 100).listen().onChange(onParamsChange);

		folder.add(vizParams, 'rotSpeed', 0, 0.15).listen();
		folder.add(vizParams, 'sliceXSpeed', 0, 5).listen();
		folder.add(vizParams, 'sliceYSpeed', 0, 20).listen();

		// if (vizParams.on){
		// 	folder.open();
		// }
		

		//EVENT HANDLERS
		events.on("update", update);
		events.on("onBeat", onBeat);
		events.on("onBPMBeat", onBPMBeat);
		events.on("midiControl", onMidiControl);


		groupHolder = new THREE.Object3D();
		VizHandler.getVizHolder().add(groupHolder);


		for (var i = 0; i <imgCount; i++) {
			textures[i] = THREE.ImageUtils.loadTexture( "../res/img/disp-tube/0" + i + ".jpg" );
		}

		//SHADER MATERIAL
		material = new THREE.ShaderMaterial( {

			uniforms: 		THREE.DisplacementMatShader.uniforms,
			vertexShader:  	THREE.DisplacementMatShader.vertexShader,
			fragmentShader: THREE.DisplacementMatShader.fragmentShader,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthTest: true,
			//transparent: true

		} );

		material.uniforms.texture.value = THREE.ImageUtils.loadTexture( "../res/img/disp-tube/00.jpg" );

		//CYLINDER
		//CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
		tubeMesh = new THREE.Mesh( new THREE.CylinderGeometry( 200, 200, 800, 250,250,true ), material  );
		groupHolder.add( tubeMesh );
		onParamsChange();

		onToggleViz();
	}


	function onToggleViz(){

		if (vizParams.on){
			groupHolder.visible = true;
			tubeMesh.visible = true;
		}else{
			groupHolder.visible = false;
			tubeMesh.visible = false;
		}

	}

	function onParamsChange(){
		//earthMaterial.opacity = vizParams.opacity;
		//earthMaterial2.opacity = vizParams.opacity;


		material.uniforms.stretch.value = vizParams.stretch;
		material.uniforms.depth.value = vizParams.depth;
		//material.uniforms.audioDepth.value = vizParams.audioDepth;
		material.uniforms.numStrips.value = vizParams.numStrips;

		groupHolder.scale.x = groupHolder.scale.y = groupHolder.scale.z = vizParams.scale;

		// imgId1 = ATUtil.randomInt(0,imgCount-1);
		// imgId2 = ATUtil.randomInt(0,imgCount-1);

		// THREE.HorizonShader.uniforms.dotSize.value = vizParams.dotSize;
		// THREE.HorizonShader.uniforms.lineSize.value = vizParams.lineSize;
		// THREE.HorizonShader.uniforms.blur.value = vizParams.blur;
		// THREE.HorizonShader.uniforms.depth.value = vizParams.depth;
		// THREE.HorizonShader.uniforms.noiseSize.value = vizParams.noiseSize;

	}

	function update() {


		material.uniforms.audioDepth.value = vizParams.audioDepth;
		material.uniforms.timeX.value += vizParams.sliceXSpeed/1000;//delta/4;
		material.uniforms.timeY.value += vizParams.sliceYSpeed/1000;//delta/4;
		material.uniforms.levels.value = AudioHandler.getVolumeHistory();//delta/4;

		// THREE.HorizonShader.uniforms.lineTime.value +=vizParams.lineSpeed/1000;//delta/4;

		// //audio reactive
		// THREE.HorizonShader.uniforms.dotSize.value = vizParams.dotSize * AudioHandler.getVolume();//delta/4;
		// THREE.HorizonShader.uniforms.lineSize.value = vizParams.lineSize * AudioHandler.getVolume();//delta/4;
		// THREE.HorizonShader.uniforms.depth.value = vizParams.depth*AudioHandler.getSmoothedVolume()*2 + vizParams.base;


		//draw every frame

		//tubeMesh.rotation.y += 0.003;
		//tubeMesh2.rotation.y += 0.003;

		//bounce to levels
		var scl = 1 + AudioHandler.getVolume() * 0.5;
		tubeMesh.scale.set(scl,scl,scl);


		//flash background  on level threshold
		// if (AudioHandler.getVolume() > 0.5 ){
		// 	tubeMesh.visible = true;
		// }else{
		// 	tubeMesh.visible = false;
		// }

		groupHolder.rotation.y += vizParams.rotSpeed;


		if (vizParams.freakOut){

			freakOutTime ++;

			//UberVizMain.trace(vizParams.freakOutPeriod);


			if (freakOutTime > vizParams.freakOutPeriod){

				//UberVizMain.trace("FREAK");

				freakOutTime = 0;

				//random
				imgId = ATUtil.randomInt(0,imgCount-1);
				material.uniforms.texture.value = textures[imgId];
				//toggle = !toggle;
				//material.uniforms.texture.value = textures[toggle ? imgId1 : imgId2];
			}


		}


		// toggle = !toggle;
		// groupHolder.scale.x = groupHolder.scale.z = toggle ? 1 : 2;
		// groupHolder.scale.y =toggle ? 1 : -1;
		// groupHolder.opacity = toggle ? 1 : .5;


		//if ( videoTexture ) videoTexture.needsUpdate = true;



		}

	function onBeat(){
		//beat detected

		//show stripes for 6 frames on beat


		//tubeMesh.material = earthMaterial2;

		//tubeMesh2.visible = true;
		//setTimeout(onBeatEnd,150);

		//incremental
		//imgId++;
		//imgId = imgId % imgCount;

		//random
		imgId = ATUtil.randomInt(0,imgCount-1);

		material.uniforms.texture.value = textures[imgId];


			

	}

	function onBeatEnd(){
		//tubeMesh2.visible = false;

		//tubeMesh.material = earthMaterial;

	}

	function onBPMBeat(){
		//bpm
	}

	function onMidiControl(data){

		switch(data.id){

		case 91:
			vizParams.stretch = ATUtil.lerp(data.val,1,100);
			break;

		case 92:
			vizParams.freakOut = data.val == 1;
			break;
		
		case 94:
			vizParams.freakOutPeriod = ATUtil.lerp(data.val,1,30);
			break;


		case 81:
			vizParams.rotSpeed = ATUtil.lerp(data.val,0,0.15);
			break;

		case 84:
			vizParams.sliceYSpeed = ATUtil.lerp(data.val,0,20);
			break;

		case 71:
			vizParams.scale = ATUtil.lerp(data.val,.1,3);
			break;

		case 74:
			vizParams.numStrips = ATUtil.lerp(data.val,1,100);
			break;
		}

		onParamsChange();


	}

	return {
		init:init,
		update:update,
		onBeat:onBeat,
		onBPMBeat:onBPMBeat,
		vizParams:vizParams,
		onParamsChange:onParamsChange,
		onToggleViz:onToggleViz,
	};

}();
//DEBUG IMAGE

var ImagePlayer = function() {

	var groupHolder;

	var textures = [];
	var imgCount = 1;

	var imgId = 0;

	var strobe = true;
	var plane;
	var plane2;
	var imgMaterial;
	var imgMaterial2;


	var vizParams = {
		on:true,
		freakOut: false,

	};

	function init(){

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('Image Overlay');
		folder.add(vizParams, 'on').listen().onChange(onToggleViz);
		//folder.add(vizParams, 'freakOut');
		//folder.open();

		groupHolder = new THREE.Object3D();
		VizHandler.getScene().add(groupHolder);


		//move up?
		for (var i = 0; i <imgCount; i++) {
			textures[i] = THREE.ImageUtils.loadTexture( "css/nero-splash.png" );
		}

		imgMaterial = new THREE.MeshBasicMaterial( {
			map : textures[0],
			transparent:true,
			blending: THREE.AdditiveBlending,
			depthTest:false
		} );

		//Add img plane
		var planeGeometry = new THREE.PlaneGeometry( 800, 600,1,1 );
		plane = new THREE.Mesh( planeGeometry, imgMaterial );
		groupHolder.add( plane );
		plane.z = 0;
		plane.scale.x = plane.scale.y = 1.8;


		onToggleViz();

	}

	function onToggleViz(){


		if (vizParams.on){

			groupHolder.visible = true;
			groupHolder.traverse( function ( object ) { object.visible = true; } );

			


		}else{

			groupHolder.visible = false;
			groupHolder.traverse( function ( object ) { object.visible = false; } );


		}



	}

	


	return {
		init:init,
		vizParams:vizParams,
		onToggleViz:onToggleViz,
	};

}();
//UberViz AudioHandler
//Handles Audio loading and Playback
//Handles Audio Analysis + publishes audio data

//TODO - always use audio element for loaded MP#?

var AudioHandler = function() {
	var num = Math.floor(Math.random() * 3) + 1;
	var audioParams = {
		
		//non-configurable init vars
		useMic: false, //if true overrides other init params
		autoPlayAudio: false,	
		useAudioElement: true, //whether to load external MP3 or load audio element on page with controls
		audioURL: "../res/mp3/music" + num.toString() + ".mp3",		

		//configurable
		showDebug:true,
		mute:false,
		gain:1,
		beatHoldTime:30,
		beatDecayRate:0.97,
		beatThreshold: 0.15,
		smoothing:0.5,

		bpmMode: false,
		bpmRate:0,

		playbackRate:1
	};


	//PUBLIC/////////////
	var waveData = []; //waveform - from 0 - 1 . no sound is 0.5. Array [binCount]
	var levelsData = []; //levels of each frequecy - from 0 - 1 . no sound is 0. Array [levelsCount]
	var volume = 0; // averaged normalized level from 0 - 1
	var smoothedVolume = 0; // averaged normalized level from 0 - 1 smoothed
	var volumeHistory = []; //last volumeHistoryCount volumes
	var volumeHistoryCount = 256; //number of levels to save
	var hasWebAudio;

	var BEAT_HOLD_TIME = 40; //num of frames to hold a beat
	var BEAT_DECAY_RATE = 0.98;
	var BEAT_MIN = 0.15; //level less than this is no beat

	var displayCtx;
	var chartW = 220;
	var aveBarWidth = 30;
	var displayH = 100;
	var displayW = chartW + aveBarWidth;
	var debugSpacing = 2;
	var gradient;

	var freqByteData; //bars - bar data is from 0 - 256 in 512 bins. no sound is 0;
	var timeByteData; //waveform - waveform data is from 0-256 for 512 bins. no sound is 128.
	var levelsCount = 16; //should be factor of 512

	var binCount; //512
	var levelBins;

	var isPlayingAudio = false;

	var beatCutOff = 0;
	var beatTime = 0;

	var source;
	var buffer;
	var audioBuffer;
	var dropArea;
	var audioContext;
	var processor;
	var analyser;
	var gainNode;

	var high = 0;

	var mp3StartTime; //allow tracking mp3's current position (non-audio elements dont have a currentTIme property)


	function init() {


		if (UberVizMain.getIsMobile()){
			//android does not support getting audio levels from audio Element,
			//therefore use MP3 loading instead
			audioParams.useAudioElement = false;
		}

		//EVENT HANDLERS
		events.on("update", update);

		hasWebAudio = true;

		//Get an Audio Context
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			audioContext = new window.AudioContext();
		} catch(e) {
			//Web Audio API is not supported in this browser
			$("#play-btn").hide();
			$("#prompt").show();
			$("#prompt").html("Sorry!<br>This browser does not support the Web Audio API. <br>Please use Chrome, Safari or Firefox.");
			ImagePlayer.vizParams.on = false;
			ImagePlayer.onToggleViz();
			hasWebAudio = false;
			return;
		}

		audioElement = document.getElementById( 'audioElem' );

		analyser = audioContext.createAnalyser();
		analyser.smoothingTimeConstant = 0.3; //smooths out bar chart movement over time
		analyser.fftSize = 1024;
		binCount = analyser.frequencyBinCount; // = 512
		// Create a gain node.
		gainNode = audioContext.createGain();
		// Connect the source to the gain node.
		analyser.connect(gainNode);
		// Connect the gain node to the destination.
		gainNode.connect(audioContext.destination);

		levelBins = Math.floor(binCount / levelsCount); //number of bins in each level

		freqByteData = new Uint8Array(binCount);
		timeByteData = new Uint8Array(binCount);

		for(var i = 0; i < volumeHistoryCount; i++) {
			volumeHistory.push(0);
		}

		//INIT DEBUG DRAW
		var canvas = document.getElementById("audioDebug");
		displayCtx = canvas.getContext('2d');
		displayCtx.width = displayW;
		displayCtx.height = displayH;
		displayCtx.fillStyle = "rgb(40, 40, 40)";
		displayCtx.lineWidth=2;
		displayCtx.strokeStyle = "rgb(255, 255, 255)";
		$('#audiodisplayCtx').hide();

		gradient = displayCtx.createLinearGradient(0,0,0,displayH);
		gradient.addColorStop(1,'#330000');
		gradient.addColorStop(0.85,'#aa0000');
		gradient.addColorStop(0.5,'#aaaa00');
		gradient.addColorStop(0,'#aaaaaa');

		//load audio
		if (audioParams.useAudioElement){
			loadAudioElement();
		}else {
			loadMP3File();
		}

	}

	function initSound(){
		source = audioContext.createBufferSource();
		source.connect(analyser);
	}

	//load audio element on page
	function loadAudioElement(){

		audioElement.setAttribute('src',audioParams.audioURL);
		//audioElement.setAttribute('autoplay','false');
		audioElement.setAttribute('controls','controls');
		audioElement.setAttribute('preload','none');
		//audioElement.preservespitch = false;

		audioElement.onplay = function() {
		    isPlayingAudio = true;
		};

		source = audioContext.createMediaElementSource( audioElement);
		source.connect(analyser);
		
		if (audioParams.autoPlayAudio){
			playAudio();
		}


	}

	function playAudio(){

		if (audioParams.useAudioElement){
			audioElement.play();
			//audioElement.loop = true;
		}else{
			//source.loop = true;
			source.start(0.0);

			mp3StartTime = Date.now();
		}

		isPlayingAudio = true;
	}

	//load sample MP3
	function loadMP3File() {


		//disable audioElement

		//for drag and drop if audio already playing
		stopSound();

		initSound();

		// Load asynchronously
		var request = new XMLHttpRequest();
		request.open("GET", audioParams.audioURL, true);
		request.responseType = "arraybuffer";

		request.onload = function() {
			audioContext.decodeAudioData(request.response, function(buffer) {
				audioBuffer = buffer;
				onMP3Loaded();
			}, function(e) {
				console.log(e);
			});
		};

		request.send();
	}

	function onMP3Loaded() {
		source.buffer = audioBuffer;

		if (audioParams.autoPlayAudio){
			playAudio();
		}

	}


	function mute(){
		if (audioParams.mute){
			gainNode.gain.value = 0;
		}else{
			gainNode.gain.value = 1;
		}
	}

	function stopSound(){
		isPlayingAudio = false;
		if (source) {
			source.stop(0);
			source.disconnect();
		}
		displayCtx.clearRect(0, 0, displayW, displayH);
	}
	
	//load dropped MP3
	function onMP3Drop(evt) {

		//TODO - uncheck mic and sample in CP
		audioParams.useMic = false;
		stopSound();
		initSound();

		var droppedFiles = evt.dataTransfer.files;
		var reader = new FileReader();
		reader.onload = function(fileEvent) {
			var data = fileEvent.target.result;
			onDroppedMP3Loaded(data);
		};
		reader.readAsArrayBuffer(droppedFiles[0]);
	}

	//called from dropped MP3
	function onDroppedMP3Loaded(data) {

		$("#prompt").hide();

		if(audioContext.decodeAudioData) {
			audioContext.decodeAudioData(data, function(buffer) {
				audioBuffer = buffer;
				onMP3Loaded();
			}, function(e) {
				console.log(e);
			});
		} else {
			audioBuffer = audioContext.createBuffer(data, false );
			onMP3Loaded();
		}
	}

	function getMicInput() {

		stopSound();

		//x-browser
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

		if (navigator.getUserMedia ) {

			navigator.getUserMedia(

				//constraints
				{audio: true},

 				// successCallback
				function(stream) {

					//reinit here or get an echo on the mic
					source = audioContext.createBufferSource();
					analyser = audioContext.createAnalyser();
					analyser.fftSize = 1024;
					analyser.smoothingTimeConstant = 0.3;

					isPlayingAudio = true;
					// console.log("here");
				},

				// errorCallback
				function(err) {
					alert("The following error occured: " + err);
				}
			);
		}else{
			alert("Could not getUserMedia");
		}
	}

	function onBeat(){
		if (audioParams.bpmMode) return;
		events.emit("onBeat");
	}

	//called every frame
	//update published viz data
	function update(){

		if (!isPlayingAudio) return;

		var i, j, sum;

		//GET DATA
		analyser.getByteFrequencyData(freqByteData); //<-- bar chart
		analyser.getByteTimeDomainData(timeByteData); // <-- waveform

		//normalize waveform data
		for(i = 0; i < binCount; i++) {
			waveData[i] = ((timeByteData[i] - 128) /128 )* audioParams.gain;
		}
		//TODO - cap levels at 1 and -1 ?

		//normalize levelsData from freqByteData
		for(i = 0; i < levelsCount; i++) {
			sum = 0;
			for(j = 0; j < levelBins; j++) {
				sum += freqByteData[(i * levelBins) + j];
			}
			levelsData[i] = sum / levelBins/256 * audioParams.gain; //freqData maxs at 256

			//adjust for the fact that lower levels are percieved more quietly
			//make lower levels smaller
			//levelsData[i] *=  1 + (i/levelsCount)/2; //??????
		}
		//TODO - cap levels at 1?

		//GET AVG LEVEL
		sum = 0;
		for(j = 0; j < levelsCount; j++) {
			sum += levelsData[j];
		}

		volume = sum / levelsCount;

		smoothedVolume += (volume - smoothedVolume)/5;

		// high = Math.max(high,level);
		// volumeHistory.push(volume);
		// volumeHistory.shift(1);

		//put new volume on front on volumeHistory
		volumeHistory.unshift(volume);
		volumeHistory.pop();

		//BEAT DETECTION
		if (volume  > beatCutOff && volume > audioParams.beatThreshold){
			onBeat();
			beatCutOff = volume *1.1;
			beatTime = 0;
		}else{
			if (beatTime <= audioParams.beatHoldTime){
				beatTime ++;
			}else{
				beatCutOff *= audioParams.beatDecayRate;
				beatCutOff = Math.max(beatCutOff,audioParams.beatThreshold);
			}
		}

		if (audioParams.showDebug) debugDraw();


		//UberVizMain.trace(audioElement.currentTime);

	}



	function debugDraw(){

		displayCtx.clearRect(0, 0, displayW, displayH);
		//draw chart bkgnd
		//displayCtx.fillStyle = "#000";
		//displayCtx.fillRect(0,0,displayW,displayH);

		//DRAW BAR CHART
		// Break the samples up into bars
		var barWidth = chartW / levelsCount;
		displayCtx.fillStyle=gradient;
		for(var i = 0; i < levelsCount; i++) {
			displayCtx.fillRect(i * barWidth, displayH, barWidth - debugSpacing, -levelsData[i]*displayH);
		}

		//DRAW AVE LEVEL + BEAT COLOR
		if (beatTime < 1){
			displayCtx.fillStyle="#FFF";
		}
		displayCtx.fillRect(chartW, displayH, aveBarWidth, -volume*displayH);

		//DRAW CUT OFF
		displayCtx.beginPath();
		displayCtx.moveTo(chartW , displayH - beatCutOff*displayH);
		displayCtx.lineTo(chartW + aveBarWidth, displayH - beatCutOff*displayH);
		displayCtx.stroke();

		//DRAW WAVEFORM
		displayCtx.beginPath();
		for( i = 0; i < binCount; i++) {
			displayCtx.lineTo(i/binCount*chartW, waveData[i]*displayH/2 + displayH/2);
		}
		displayCtx.stroke();
	}

	function setSmoothing(e){
		analyser.smoothingTimeConstant = e;

	}

	function setPlaybackRate(e){

		if (audioParams.useAudioElement){

			audioElement.playbackRate = e;
		}else{

			source.playbackRate.value = e;

		}
	}

	function getAudioTime(){

		if (audioParams.useAudioElement){
			return audioElement.currentTime;
		}else{
			return (Date.now() - mp3StartTime) / 1000;
		}

	}

	return {
		update:update,
		init:init,
		getLevelsData: function() { return levelsData;},
		getVolumeHistory: function() { return volumeHistory;},
		getWaveData: function() { return waveData;},
		getVolume: function() { return volume;},
		getSmoothedVolume: function() { return smoothedVolume;},
		setSmoothing:setSmoothing,
		mute:mute,
		getAudioTime: getAudioTime,
		audioParams:audioParams,
		setPlaybackRate: setPlaybackRate,
		playAudio:playAudio,
		getHasWebAudio: function() { return hasWebAudio;}
	};

}();
//UberViz ControlsHandler
//Handles side menu controls

//init controls for audio and ui folders


var ControlsHandler = function() {


	var gui;

	var uiParams = {
		fullSize: true,
		showControls: false,
		showIntro:true,
		showDebug:false,
		useMidi:true,
		version: "v0.9.17"
	};

	// var fxParams = {
	// 	glow: 0.7
	// };

	function init(){

		events.on("midiControl", onMidiControl);

		//Init DAT GUI control panel
		gui = new dat.GUI({autoPlace: false });
		$('#settings').append(gui.domElement);


		var f2 = gui.addFolder('Audio');
		//f2.add(AudioHandler.audioParams, 'useMic').listen().onChange(AudioHandler.onUseMic).name("Use Mic");
		//f2.add(AudioHandler.audioParams, 'mute').listen().onChange(AudioHandler.mute).name("Mute");
		//f2.add(AudioHandler.audioParams, 'useSample').listen().onChange(AudioHandler.onUseSample);
		f2.add(AudioHandler.audioParams, 'gain', 0, 10).step(0.1).listen().name("Gain");
		f2.add(AudioHandler.audioParams, 'beatHoldTime', 0, 100).step(1).name("Beat Hold");
		f2.add(AudioHandler.audioParams, 'beatThreshold', 0, 1).step(0.01).name("Beat Threshold");
		f2.add(AudioHandler.audioParams, 'beatDecayRate', 0.9, 1).step(0.01).name("Beat Decay");
		f2.add(AudioHandler.audioParams, 'smoothing', 0, 1).step(0.01).name("Smoothing").onChange(AudioHandler.setSmoothing);
		//f2.add(AudioHandler.audioParams, 'playbackRate', 0.01, 1).step(0.01).onChange(AudioHandler.setPlaybackRate);
		// f2.add(AudioHandler.audioParams, 'bpmMode').listen();
		// f2.add(AudioHandler.audioParams, 'bpmRate', 0, 4).step(1).listen().onChange(AudioHandler.onChangeBPMRate);
		//f2.open();

		//var f5 = gui.addFolder('Viz');
		//f5.add(fxParams, 'Full', 0, 4).listen().onChange(AudioHandler.onUseMic);
		// var f5 = gui.addFolder('FX');
		// f5.add(vizParams, 'fullSize').listen().onChange(VizHandler.onResize).name("Full Size");
		// f5.add(fxParams, 'glow', 0, 4).step(0.1);
		// f5.open();



		var f3 = gui.addFolder('Viz');
		f3.add(uiParams, 'fullSize').listen().onChange(VizHandler.onResize).name("Full Size");
		//f3.add(uiParams, 'showDebug').listen().onChange(VizHandler.onShowDebug).name("Show Debug");
		//f3.open();
		//f3.add(uiParams, 'showControls').listen().onChange(toggleControls).name("Show Controls");


		//var f6 = gui.addFolder('Viz');


		// var f6 = gui.addFolder('Bloom');
		// for (var propertyName in bloomParams) {
		//	f6.add(bloomParams,propertyName)
		// }

		$('#controls-holder').toggle(uiParams.showControls);

		//TODO - better way to read in values at start
		// AudioHandler.onUseMic();
		// AudioHandler.onUseSample();
		// AudioHandler.onShowDebug();
		// AudioHandler.doAutoLoad();
		// AudioHandler.mute();

	}

	function toggleControls(){
		uiParams.showControls = !uiParams.showControls;
		$('#controls-holder').toggle();
		VizHandler.onResize();
	}


	function onMidiControl(data){

		switch(data.id){

		case 41:
			AudioHandler.audioParams.gain = ATUtil.lerp(data.val,0,10);
			break;
		}

	}

	return {
		init:init,
		uiParams:uiParams,
		toggleControls:toggleControls,
		getGui:function(){return gui;}
	};
}();
//UberViz FXHandler
//Handles Post-Proc Shaders
//simple 1 pass shaders

var FXHandler = function() {

	var fxParams = {
		fullSize: false,
		bloom:false,
		//waveform:false,
		//god:false,
		shake:false,
		dotScreen: false,
		film:true,
		kaleido:false,
		mirror:false,
		vignette:true,
		//badTV:true,
		wobble:false,
		dotMatrix:false,
		tile:false,

		audioLevels:false,

		strobe:false,
		strobePeriod: 2,

		//colorCycle: false,
		brightnessContrast:true,
		//hueSaturation:true,
		//hueCyclePeriod: 24,
		hueSpeed: 1,
		colorify:false,

		//colorShift:false,
		//staticy:false,
		glitch:false,
		//FXAA:false,
		glow:true,

		


		tiltAmount:0.3,
		tiltSpeed:0.15,
		jumpOnBeat:false,

		sIntensity:0.9,
		nIntensity:0.4,


		

		colorifyAmt: 1,

		//SUPER
		super:true,

		glowSize: 2,
		glowAmount: 0.5,		
		
		vignetteAmount:0.5,
		brightness:0.8,
		contrast: 0.2,
		saturation: 0.3,

		
		RGBShift:true,
		rgbAmount:0.15,

		//staticyAmount:0.5,

		// slices:false,
		// slicesAmount:10,
		// slicesOffset:0.3,

	};

	var shaderTime = 0;
	var hueTime = 0;
	var strobeTime = 0;
	var screenW = 800;
	var screenH = 600;
	var blurriness = 3;

	var superPass;

	var composer;

	function init(){

		//EVENT HANDLERS
		events.on("update", update);
		events.on("onBeat", onBeat);
		events.on("midiControl", onMidiControl);

		//INIT CONTROLS
		var folder = ControlsHandler.getGui().addFolder('FX');


		folder.add(fxParams, 'mirror').listen().onChange(toggleShaders);
		folder.add(fxParams, 'RGBShift').listen().onChange(toggleShaders);
		folder.add(fxParams, 'film').listen().onChange(toggleShaders);
		folder.add(fxParams, 'audioLevels').listen().onChange(toggleShaders);
		folder.add(fxParams, 'strobe').listen().onChange(toggleShaders);
		folder.add(fxParams, 'strobePeriod', 2, 120).listen().step(1);
		folder.add(fxParams, 'tiltAmount', 0, 1).listen().name("Tilt Amount");
		folder.add(fxParams, 'tiltSpeed', 0, 1).listen().name("Tilt Speed");
		
		//folder.add(fxParams, 'sIntensity', 0, 2).listen().name("Film sIntensity").onChange(setShaderParams);
		//folder.add(fxParams, 'nIntensity', 0, 2).listen().name("Film nIntensity").onChange(setShaderParams);

		//folder.add(fxParams, 'bloom').onChange(toggleShaders);
		//folder.add(fxParams, 'brightnessContrast').onChange(toggleShaders);
		

		//folder.add(fxParams, 'colorify').onChange(toggleShaders);
		//folder.add(fxParams, 'super').onChange(toggleShaders);
		


		//folder.add(fxParams, 'colorifyAmt', 0, 1).onChange(setShaderParams).step(0.1);
		
		//SUPER
		//folder.add(fxParams, 'glow').onChange(toggleShaders);
		folder.add(fxParams, 'glowAmount', 0, 4).listen().onChange(setShaderParams);
		folder.add(fxParams, 'glowSize', 0, 20).listen().onChange(setShaderParams);
		//folder.add(fxParams, 'vignette').onChange(toggleShaders);
		folder.add(fxParams, 'vignetteAmount', 0, 1.3).listen().onChange(setShaderParams).step(0.1);
		folder.add(fxParams, 'brightness', 0, 1.0).step(0.1).listen();
		folder.add(fxParams, 'contrast', 0, 1).listen().onChange(setShaderParams);
		//folder.add(fxParams, 'hueSaturation').onChange(toggleShaders);
		folder.add(fxParams, 'saturation', 0, 1).step(0.1).listen().onChange(setShaderParams);
		//folder.add(fxParams, 'hueCyclePeriod', 0.1, 24).onChange(setShaderParams).step(0.1);
		folder.add(fxParams, 'hueSpeed', 0.1, 10).listen().onChange(setShaderParams).step(0.1);
		

		//folder.add(fxParams, 'rgbAmount', 0, 1).onChange(setShaderParams).step(0.1);

		//folder.add(fxParams, 'dotScreen').onChange(toggleShaders);
		//folder.add(fxParams, 'shake').onChange(toggleShaders);
		
		
		//folder.add(fxParams, 'colorCycle').onChange(setShaderParams);
		//folder.add(fxParams, 'colorShift').onChange(setShaderParams);

		// folder.add(fxParams, 'kaleido').onChange(toggleShaders);
		//folder.add(fxParams, 'badTV').onChange(toggleShaders);
		// folder.add(fxParams, 'wobble').onChange(toggleShaders);
		// folder.add(fxParams, 'dotMatrix').onChange(toggleShaders);
		// folder.add(fxParams, 'tile').onChange(toggleShaders);
		

		//folder.add(fxParams, 'staticy').onChange(toggleShaders);
		//folder.add(fxParams, 'staticyAmount', 0,1).onChange(setShaderParams).step(0.1);
		//folder.add(fxParams, 'glitch').onChange(toggleShaders);

		//folder.add(fxParams, 'waveform').onChange(toggleShaders);
		//folder.add(fxParams, 'god').onChange(toggleShaders);
		// folder.add(fxParams, 'slices').onChange(toggleShaders);
		// folder.add(fxParams, 'slicesAmount', 2,100).onChange(setShaderParams).step(1);
		// folder.add(fxParams, 'slicesOffset', 0,1).onChange(setShaderParams).step(0.01);
		//folder.add(fxParams, 'FXAA').onChange(toggleShaders);
		
		

		//folder.open();

		//CREATE FX PASSES
		renderPass = new THREE.RenderPass( VizHandler.getScene(), VizHandler.getCamera() );
		copyPass = new THREE.ShaderPass( THREE.CopyShader );


		superPass = new THREE.ShaderPass(THREE.SuperShader);
		superPass.uniforms[ "vigDarkness" ].value = 2;

		//bloom pass
		//strength, kernelSize, sigma, resolution.
		//defaults to: 1, 25, 4.0, 256
		//if kernelsize increased must also increase sigma
		//larger kernel means more processinbg

		//bloomPass = new THREE.bloomPass(3, 12, 2.0, 512  ); //GOOD
		//bloomPass = new THREE.bloomPass(2, 25, 4.0, 512 );
		//bloomPass = new THREE.BloomPass(  2, 12, 2.0, 512); //more subtle

		brightnessContrastPass = new THREE.ShaderPass( THREE.BrightnessContrastShader );
		//brightnessContrastPass.uniforms[ "contrast" ].value = 0.8;

		//audioLevelsPass = new THREE.ShaderPass( THREE.BrightnessContrastShader );

		//wobblePass = new THREE.ShaderPass( THREE.WobbleShader );

		// godPass = new THREE.ShaderPass( THREE.GodShader );

		// godPass.uniforms.fX.value = 0.5; //x light pos
		// godPass.uniforms.fY.value = 0.5; //y light pos
		// godPass.uniforms.fDecay.value = 0.90;//0.93; //strength
		// godPass.uniforms.fDensity.value = 0.96;//0.96;  //spread
		// godPass.uniforms.fWeight.value = 0.2;//0.4; //strength
		// godPass.uniforms.fClamp.value = 1.0;//1.0;


		// dotScreenPass = new THREE.ShaderPass( THREE.DotScreenShader );
		// dotScreenPass = new THREE.DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 2.8 );

		filmPass = new THREE.ShaderPass( THREE.FilmShader );
		filmPass.uniforms[ "grayscale" ].value = 0;
		//filmPass.uniforms[ "sIntensity" ].value = 0.9;
		filmPass.uniforms[ "sIntensity" ].value = 0.6;
		filmPass.uniforms[ "nIntensity" ].value = 0.4;
		


		// hueSaturationPass = new THREE.ShaderPass( THREE.HueSaturationShader );
		// //hueSaturationPass.uniforms[ "hue" ].value = 0.5;
		// hueSaturationPass.uniforms[ "saturation" ].value = 0.5;

		// hueSaturationPass.uniforms[ 'hue' ].value = 1;

		//kaleidoPass = new THREE.ShaderPass( THREE.KaleidoShader );

		mirrorPass = new THREE.ShaderPass( THREE.MirrorShader );

		mirrorPass.uniforms[ "side" ].value =2;

		//glowPass = new THREE.ShaderPass( THREE.GlowShader );
		
		RGBShiftPass = new THREE.ShaderPass( THREE.RGBShiftShader );

		//shakePass = new THREE.ShaderPass( THREE.ShakeShader );

		// colorifyPass = new THREE.ShaderPass( THREE.ColorifyShader );
		// colorifyPass.uniforms[ "color" ].value = new THREE.Color( 0xff0000 );

//		tilePass = new THREE.ShaderPass( THREE.TileShader );

	//	colorShift = new THREE.ShaderPass( THREE.ColorShiftShader );
		//tilePass.uniforms[ "size" ].value = 0.25;

		// dotMatrixPass = new THREE.ShaderPass( THREE.DotMatrixShader );
		// dotMatrixPass.uniforms[ "dots" ].value = 80;
		// dotMatrixPass.uniforms[ "size" ].value = 0.3;
		// dotMatrixPass.uniforms[ "blur" ].value = 0.3;

		//vignettePass = new THREE.ShaderPass( THREE.VignetteShader );
		//vignettePass.uniforms[ "darkness" ].value = 2;

		//strobePass = new THREE.ShaderPass( THREE.StrobeShader );

		// badTVPass = new THREE.ShaderPass( THREE.BadTVShader );
		// badTVPass.uniforms[ "rollSpeed" ].value = 0;
		// badTVPass.uniforms[ "distortion" ].value = 0;
		// badTVPass.uniforms[ "distortion2" ].value = 0;

		


		//staticyPass = new THREE.ShaderPass( THREE.StaticShader );
		//staticyPass.uniforms[ 'size' ].value =  1;
		//staticyPass.uniforms[ 'amount' ].value =  .3;

		//waveformPass = new THREE.ShaderPass( THREE.WaveformShader );
		//slicesPass = new THREE.ShaderPass( THREE.SlicesShader );
		//FXAAPass = new THREE.ShaderPass( THREE.FXAAShader );

		//glitchPass = new THREE.GlitchPass(32);
		//glitchPass.goWild=true;

		setShaderParams();


		resize();

		toggleShaders();

		//intro
		//setTimeout(onBeat,Math.random()*2000);

	}

	function onBeat(){

		//Some FX is beat controlled
		//badTVPass.uniforms[ "distortion" ].value = 4.0;
		//badTVPass.uniforms[ "distortion2" ].value = 5.0;


		// //staticyPass.uniforms[ 'amount' ].value =  .8;

		// wobblePass.uniforms[ "distortion" ].value = 80.0;

		mirrorPass.uniforms[ "side" ].value = ATUtil.randomInt(0,3);
		//kaleidoPass.uniforms[ "sides" ].value = ATUtil.randomInt(4,12);
		//setTimeout(onBeatEnd,300);
	}

	function onBeatEnd(){
		//badTVPass.uniforms[ "distortion" ].value = 0.0001;
		//badTVPass.uniforms[ "distortion2" ].value = 0.0001;

		// wobblePass.uniforms[ "distortion" ].value = 0.0;

		//staticyPass.uniforms[ 'amount' ].value =  .3;

		//setTimeout(onBeat,Math.random()*2000);

	}

	function update( t ) {

		//some shdares require time input
		shaderTime += 0.1;
		filmPass.uniforms[ 'time' ].value =  shaderTime;

		//badTVPass.uniforms[ 'time' ].value =  shaderTime;
		//strobePass.uniforms[ 'time' ].value =  shaderTime;
		//wobblePass.uniforms[ 'time' ].value =  shaderTime;
		//shakePass.uniforms[ 'time' ].value =  shaderTime;
		//staticyPass.uniforms[ 'time' ].value =  shaderTime;
		

		// var col = new THREE.Color();
		// col.setHSL((hueTime % 2 /2), 1.0, 0.5); //0-1 hue
		// colorifyPass.uniforms[ 'color' ].value =  col;

		//audio reactive RGB
		RGBShiftPass.uniforms[ "angle" ].value = Math.sin(shaderTime/6)*Math.PI*2;
		RGBShiftPass.uniforms[ "amount" ].value = (fxParams.rgbAmount + AudioHandler.getVolume() /2 )* 0.02 * 800/VizHandler.getVizWidth();

		//SUPERPASS

		//hueCyclePeriod = 24; //4 second cycle period (.1 * 60fps * 4)
		//var hue = shaderTime/fxParams.hueCyclePeriod % 2 - 1;
		hueTime += fxParams.hueSpeed * 0.01;
		var hue = hueTime % 2 - 1; //put in range -1 to 1
		superPass.uniforms[ 'hue' ].value =  hue;

		//calculate master brightness from Strobe + AudioLevels + Brightness
		var brightness = fxParams.brightness - 1; //-1 -> 1 form params

		if (fxParams.audioLevels){
			brightness += Math.min(AudioHandler.getVolume()*2 - 1,0); //-1 -> 0 based on Vol
		}

		if (fxParams.strobe){
			brightness -= (shaderTime * 10.0 %  fxParams.strobePeriod)/fxParams.strobePeriod;

		}

		//UberVizMain.trace((shaderTime * 10.0 %  fxParams.strobePeriod)/fxParams.strobePeriod);

		brightnessContrastPass.uniforms.brightness.value =  brightness;


		//shakePass.uniforms[ "amount" ].value = AudioHandler.getVolume()*0.1;

		//go black when silent
		//audioLevelsPass.uniforms[ 'brightness' ].value =  

		//waveformPass.uniforms[ "waveform" ].value = waveData;
		// var wfd = [];
		// for(var i = 0; i < 512; i++) {
		// 	wfd.push(Math.random());
		// }
		// waveformPass.uniforms[ "waveform" ].value = wfd;
		// waveformPass.uniforms[ "distortion" ].value = '1.0';


		composer.render( 0.1 );
	}

	function setShaderParams(){
		//strobePass.uniforms[ 'period' ].value =  fxParams.strobePeriod;


		superPass.uniforms.vigOffset.value =  fxParams.vignetteAmount;
		superPass.uniforms.glowSize.value = fxParams.glowSize;
		superPass.uniforms.glowAmount.value = fxParams.glowAmount;		
		superPass.uniforms.saturation.value =  fxParams.saturation -1;

		brightnessContrastPass.uniforms.contrast.value = fxParams.contrast;
		//staticyPass.uniforms[ 'amount' ].value =  fxParams.staticyAmount;

		//slicesPass.uniforms[ 'slices' ].value =  fxParams.slicesAmount;
		//slicesPass.uniforms[ 'offset' ].value =  fxParams.slicesOffset;

		//colorifyPass.uniforms[ 'amount' ].value =  fxParams.colorifyAmt;

		//filmPass.uniforms[ "sIntensity" ].value = fxParams.sIntensity;
		//filmPass.uniforms[ "nIntensity" ].value =fxParams.nIntensity;


		

		
	}

	function resize(){

		if (!superPass ) return;

		//FXAAPass.uniforms[ 'resolution' ].value =  new THREE.Vector2(1/VizHandler.getVizWidth(),1/VizHandler.getVizHeight());
		superPass.uniforms[ 'resolution' ].value =  new THREE.Vector2(VizHandler.getVizWidth(),VizHandler.getVizHeight());
		//toggleShaders();

		filmPass.uniforms[ "sCount" ].value = VizHandler.getVizHeight();
	}

	function toggleShaders() {



		//specify width and height for FXAA shader
		// var renderParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
		//                  					format: THREE.RGBFormat, stencilBuffer: false };
		// var renderTarget = new THREE.WebGLRenderTarget( VizHandler.getVizWidth(), VizHandler.getVizHeight(), renderParams );
		// composer = new THREE.EffectComposer( VizHandler.getRenderer(), renderTarget );

		composer = new THREE.EffectComposer( VizHandler.getRenderer() );


		//recreate composer chain each time
		//composer = new THREE.EffectComposer( VizHandler.getRenderer());

		//Add Shader Passes to Composer

		composer.addPass( renderPass );


		if (fxParams.brightnessContrast){
		 	composer.addPass( brightnessContrastPass );
		}

		if (fxParams.super){
			composer.addPass( superPass );
		}

		if (fxParams.mirror){
			composer.addPass( mirrorPass );
		}
		if (fxParams.RGBShift){
			composer.addPass( RGBShiftPass );
		}



		if (fxParams.film){
			composer.addPass( filmPass );
		}

		//if (fxParams.audioLevels){
		//	composer.addPass( audioLevelsPass );
		//}
		//if (fxParams.strobe){
		//	composer.addPass( strobePass );
		//}
		// if (fxParams.colorify){
		// 	composer.addPass( colorifyPass );
		// }


		
		// if (fxParams.FXAA){
		// 	composer.addPass( FXAAPass );
		// }

		// if (fxParams.bloom){
		// 	composer.addPass( bloomPass );
		// }

		// if (fxParams.god){
		// 	composer.addPass( godPass );
		// }


		

		// if (fxParams.hueSaturation){
		// 	composer.addPass( hueSaturationPass );
		// }
		// if (fxParams.kaleido){
		// 	composer.addPass( kaleidoPass );
		// }
		// if (fxParams.tile){
		// 	composer.addPass( tilePass );
		// }
		
		//if (fxParams.vignette){
		//	composer.addPass( vignettePass );
		//}
		// if (fxParams.badTV){
		// 	composer.addPass( badTVPass );
		// }
		// if (fxParams.colorShift){
		// 	composer.addPass( colorShiftPass );
		// }
		// if (fxParams.wobble){
		// 	composer.addPass( wobblePass );
		// }

		// if (fxParams.dotMatrix){
		// 	composer.addPass( dotMatrixPass );
		//}


		// if (fxParams.dotScreen){
		// 	composer.addPass( dotScreenPass );
		// }

		// if (fxParams.staticy){
		// 	composer.addPass( staticyPass );
		// }

		//if (fxParams.glow){
		//	composer.addPass( glowPass );
		//}

		// if (fxParams.waveform){
		// 	composer.addPass( waveformPass );
		// }
		// if (fxParams.shake){
		// 	composer.addPass( shakePass );
		// }

		// if (fxParams.glitch){
		// 	composer.addPass( glitchPass );
		// }

		//if (fxParams.slices){
		//	composer.addPass( slicesPass );
		//}

		

		composer.addPass( copyPass );
		//set last pass in composer chain to renderToScreen
		copyPass.renderToScreen = true;
	}


	function onMidiControl(data){

		switch(data.id){

		case 11:
			fxParams.brightness = data.val;
			break;

		case 12:
			fxParams.strobe = data.val == 1;
			toggleShaders();
			break;

		case 13:
			fxParams.audioLevels = data.val == 1;
			toggleShaders();
			break;
		
		case 14:
			fxParams.strobePeriod = ATUtil.lerp(data.val,120,2);
			break;

		case 21:
			fxParams.tiltAmount = data.val;
			break;

		case 24:
			fxParams.tiltSpeed = data.val/2;
			break;


		case 42:
			fxParams.mirror = data.val == 1;
			toggleShaders();
			break;

		// case 42:
		// 	fxParams.brightnessContrast = data.val == 1;
		// 	toggleShaders();
		// 	break;

		// case 41:
		// 	fxParams.contrast = data.val;
		// 	break;

		case 31:
			fxParams.saturation = data.val;
			break;

		case 32:
			fxParams.colorify = data.val == 1;
			toggleShaders();
			break;

		case 33:
			fxParams.hueSaturation = data.val == 1;
			toggleShaders();
			break;

		case 34:
			fxParams.hueSpeed = ATUtil.lerp(data.val,0,10);
			break;

		

		
		}

		setShaderParams();



	}

	return {
		init:init,
		update:update,
		onBeat:onBeat,
		fxParams:fxParams,
		resize:resize,
		setShaderParams: setShaderParams,
		toggleShaders:toggleShaders
	};

}();
//UberViz VizHandler
//Handle 3D world
//Camera movement
//handle sub vizs

//RENDER AREA DIMS:
//SCREEN DIMS: 800 x 600
//CAM Z: 1000
//FAR CLIP Z: 3000
//TO FILL SCREEN AT Z 0: WIDTH 1840, HEIGHT: 1380


var VizHandler = function() {

	var rendertime = 0; //constantly incrementing value public
	var tiltTime = 0; 
	var camera, scene, renderer;
	var debugCube;
	var renderToggle = true;
	var vizHolder;

	var renderW;
	var renderH;

	var FIXED_SIZE_W = 800;
	var FIXED_SIZE_H = 600;

	function init(){

		//SET ACTIVE VIZ HERE
		//VidPlayer,ImagePlayer,Bars,Crystal,Waveform
		//activeViz = [Waveform,Bars,Crystal,Nebula,ImagePlayer,WhiteRing];
		//activeViz = [LoopWaveform, LoopWaveform2, Segments,ShaderLines,ImageTunnel,SkyDome,Waveform,Bars,Crystal,Nebula,ImagePlayer,Tunnel,BezierTrails,Stars,StarBars];
		//activeViz = [LoopWaveform, Stars,BackImages, SkyDome, Horizon];
		//activeViz = [DisplacementTube, Stars,LightLeak, SkyDome, LoopWaveform, Segments,ShaderLines,ImageTunnel,Waveform,Bars,Crystal,Nebula,ImagePlayer,Tunnel,BezierTrails,StarBars];

		activeViz = [ImagePlayer, DisplacementTube, Segments, Stars,LightLeak, StarBars];


		//EVENT HANDLERS
		events.on("update", update);
		events.on("onBeat", onBeat);

		//RENDERER
		renderer = new THREE.WebGLRenderer({
			antialias: false,
			precision: "lowp"
		});
		renderer.setSize(800,600);
		renderer.setClearColor ( 0x000000);
		renderer.sortObjects = false;
		$('#webgl').append(renderer.domElement);

		//3D SCENE
		camera = new THREE.PerspectiveCamera( 70, FIXED_SIZE_W / FIXED_SIZE_H, 1, 4000 );
		camera.position.z = 1000;
		scene = new THREE.Scene();
		scene.add(camera);


		//simulate camera is a person standing on the y = 0 plane
		//camera.position.y = 100;
		//camera.rotation.x = Math.PI/12;


		//fish eye
		//camera.fov = 120;
		//camera.updateProjectionMatrix();

		//scene.fog = new THREE.Fog( 0x000000, 2000, 3000 );

		//scene.fog = new THREE.Fog( 0xff0000, 600, 0 );
		//scene.fog = new THREE.Fog( 0x000000, 0, 600);



		//INIT VIZ
		vizHolder =  new THREE.Object3D();
		scene.add( vizHolder );
		vizHolder.sortObjects = false;


		// //*******************
		//DEBUG

		if (ControlsHandler.uiParams.showDebug){
			debugHolder =  new THREE.Object3D();
			vizHolder.add( debugHolder );
			//debugHolder.visible = false;

			//Boundary cube
			var geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
			var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
			var mesh = new THREE.Mesh( geometry, material );
			debugHolder.add( mesh );

			// Origin Cube
			mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true } )  );
			debugHolder.add( mesh );

			//Debug Plane
			//covers visible area
			mesh = new THREE.Mesh( new THREE.PlaneGeometry( 800*2.3, 600*2.3,5,5 ), new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: true } )  );
			debugHolder.add( mesh);


			//Floor Plane
			//covers visible area
			mesh = new THREE.Mesh( new THREE.PlaneGeometry( 800*2.3, 600*2.3,5,5 ), new THREE.MeshBasicMaterial( { color: 0x0000FF, wireframe: true} )  );
			mesh.rotation.x = Math.PI/2;
			debugHolder.add( mesh);
			//*******************
		}

		onResize();
		showDebug();


		activeVizCount = activeViz.length;
		for ( var j = 0; j < activeVizCount; j ++ ) {
			activeViz[j].init();
		}

	}

	function update() {

		//render every other frame
		// renderToggle = !renderToggle;
		// if (!renderToggle) return;

		rendertime += 0.01;

		//DEBUG
		// if (level > 0 ) debugCube.scale.x = debugCube.scale.y = debugCube.scale.z = level*15;
		// debugCube.rotation.x += 0.01;
		// debugCube.rotation.y += 0.02;


		// renderer.render( scene, camera );


		//BIG TIME LERPING
		//lerp around entire vizHolder
		var rotRng = Math.PI * FXHandler.fxParams.tiltAmount;

		tiltTime += FXHandler.fxParams.tiltSpeed* 0.01;
		vizHolder.rotation.x = simplexNoise.noise(tiltTime ,0) * rotRng/4;
		vizHolder.rotation.y = simplexNoise.noise(tiltTime ,100) * rotRng;
		vizHolder.rotation.z = simplexNoise.noise(tiltTime ,200) * rotRng;
		//UberVizMain.trace(vizHolder.rotation.y);






	}


	function onBeat(){

		if (FXHandler.fxParams.jumpOnBeat && Math.random() < 0.3){
			doJump();
		}
	}

	function doJump(){
		tiltTime = Math.random()*20;
	}


	function showDebug(){
		//FIXME
		//debugHolder.visible = ControlsHandler.uiParams.showDebug;
	}

	function onResize(){

		

		if (ControlsHandler.uiParams.fullSize){

			renderW = window.innerWidth;
			renderH = window.innerHeight;

			if (ControlsHandler.uiParams.showControls){
				renderW -= 262;//width of #controls-holder
			}

			$('#viz').css({top:0});
			$('#viz').css({left:0});


		}else{
			renderW = FIXED_SIZE_W;
			renderH = FIXED_SIZE_H;
			//vertically center viz output
			$('#viz').css({top:window.innerHeight/2 - FIXED_SIZE_H/2});

			//horiz center
			$('#viz').css({left:window.innerWidth/2 - FIXED_SIZE_W/2});
		}

		$('#viz').css({width:renderW});
		$('#viz').css({height:renderH});

		camera.aspect = renderW / renderH;
		camera.updateProjectionMatrix();
		renderer.setSize( renderW,renderH);

		FXHandler.resize();
	}

	return {
		init: init,
		update: update,
		onBeat:onBeat,
		doJump:doJump,
		getVizHolder: function() { return vizHolder;},
		getCamera: function() { return camera;},
		getScene: function() { return scene;},
		getRenderer: function() { return renderer;},
		onResize: onResize,
		getRenderTime: function() { return rendertime;},
		getVizWidth: function() { return renderW;},
		getVizHeight: function() { return renderH;},
		showDebug: showDebug,
	};

}();
/**
* Sequence for Nero - In The Way
* Put all song specific events in here?
*
*/

var Sequence = function() {

	var wobbleOn = false;

    //array of events
    var sequenceData =
        [[0.704435,"0 start"],
        ];

	//array of events
	/*var sequenceData =

		[[0.704435,"0 start"],

		[27.510288, "1 vox"],

		[54.970005,	"2 out"],
		[62.740428,	"3 in"],

		[68.590295, "4 wobble"],
		[72.0147, "b2"],
		[75.5441, "b3"],
		[79.1618, "b4"],
		[82.3776, "b21"],
		[85.8496, "b22"],
		[89.2862, "b23"],
		[92.7590, "b24"],
		[96.200753,"5 wobble end"],

		[99.606796, "6 wobble"],
		[103.03126, "b2"],
		[106.56066, "b3"],
		[110.17835, "b4"],
		[113.39418, "b21"],
		[116.86615, "b22"],
		[120.30279, "b23"],
		[123.77557, "b24"],
		[124.066004, "7 wobble end"],

		[126.897945, "8 wobble"],
		[130.32241, "b2"],
		[133.85181, "b3"],
		[137.46950, "b4"],
		[140.68533, "b21"],
		[144.15730, "b22"],
		[147.59394, "b23"],
		[151.06672, "b24"],

		[151.914360, "9 drums out"],
		[154.47457, "b1"],
		[157.89904, "b2"],
		[161.42844, "b3"],
		[165.04613, "b4"],
		[168.26196, "b21"],
		[171.73393, "b22"],
		[175.17057, "b23"],
		[178.364, "10 out"],
		[179.5, "11 end"],
		];*/

	var duration = "140";
	var BAR_LEN = 3.47; //seconds length of a bar


	function init(){

		//EVENT HANDLERS
		events.on("sequenceEvent", handleEvent);
		TweenMax.defaultOverwrite = "none";//TODO move this
	}

	function handleEvent(name){


		switch(name){

		case "0 start":

			//slow pulses 

			//set init params
			//27 sec

			wobbleOn = false;

			FXHandler.fxParams.strobe = false;

			Segments.vizParams.on = true;
			Segments.onToggleViz();

			DisplacementTube.vizParams.on = true;
			DisplacementTube.onToggleViz();

			ImagePlayer.vizParams.on = true;
			ImagePlayer.onToggleViz();
			
			//FXHandler.fxParams.film = false;
			FXHandler.fxParams.audioLevels = true;
			FXHandler.fxParams.mirror = false;
			FXHandler.toggleShaders();

			FXHandler.fxParams.brightness = 0.95;
			FXHandler.fxParams.tiltAmount = 0.4;
			//FXHandler.fxParams.tiltSpeed = 0.15;
			FXHandler.fxParams.saturation = 0.5;

			FXHandler.setShaderParams();

			AudioHandler.audioParams.gain = 1.4;
			AudioHandler.audioParams.beatHoldTime = 30;
			AudioHandler.audioParams.beatThreshold = 0.3;

			DisplacementTube.vizParams.scale = 0.4;
			DisplacementTube.vizParams.rotSpeed = 0.02;
			DisplacementTube.vizParams.sliceYSpeed = 7;
			DisplacementTube.vizParams.stretch = 1.2;			
			DisplacementTube.vizParams.depth = 150;
			DisplacementTube.vizParams.audioDepth = 150;
			DisplacementTube.vizParams.on = true;
			DisplacementTube.onToggleViz();
			DisplacementTube.onParamsChange();

			TweenMax.fromTo(FXHandler.fxParams,5,{tiltSpeed:0.1},{tiltSpeed:0.16});

			TweenMax.fromTo(DisplacementTube.vizParams,20,{scale:0.5},{scale:0.7,
								onUpdate:DisplacementTube.onParamsChange});
			


			

			break;

		
		case "1 vox":

			//ADD VOICE

			//lasts 27.5 secs

			
			///console.log("SEQ 1");

			AudioHandler.audioParams.gain = 2;

			VizHandler.doJump();

			StarBars.vizParams.on = true;
			StarBars.onToggleViz();

			TweenMax.fromTo(FXHandler.fxParams,20,{saturation:0.5},{saturation:0.7,
									onUpdate:FXHandler.setShaderParams});


			TweenMax.fromTo(FXHandler.fxParams,20,{tiltAmount:0.4},{tiltAmount:0.7});


			// TweenMax.fromTo(DisplacementTube.vizParams,10,{sliceYSpeed:0},
			// 												{sliceYSpeed:9,delay:10});

			// TweenMax.fromTo(DisplacementTube.vizParams,20,{stretch:2,rotSpeed:0.15},
			// 												{stretch:9,rotSpeed:0,
			// 								onUpdate:DisplacementTube.onParamsChange});
			
		
			break;
		
		case "2 out":

			//fade out

			//len 7.7 secs

			VizHandler.doJump();

			AudioHandler.audioParams.gain = 3;

			//slow down tiilt
			TweenMax.fromTo(FXHandler.fxParams,7,{tiltSpeed:0.2},{tiltSpeed:0.03});
			TweenMax.fromTo(FXHandler.fxParams,7,{tiltAmount:.7},{tiltAmount:0});

			//console.log("SEQ 2");


			//TweenMax.to(FXHandler.fxParams,7.7,{brightness:0});

			


		
			break;


		case "3 in":

			//5.8 secs

			//strobe changing shapes


			//console.log("SEQ 2.5");

			


			DisplacementTube.vizParams.freakOut = true;
			DisplacementTube.vizParams.freakOutPeriod = 16;
			FXHandler.fxParams.brightness = 0;


			TweenMax.fromTo(FXHandler.fxParams,4,{brightness:0.0},{brightness:0.9,delay:2});

			FXHandler.fxParams.audioLevels = false;
			FXHandler.fxParams.strobe = true;
			FXHandler.fxParams.strobePeriod = 16;
			FXHandler.setShaderParams();


			//LightLeak.vizParams.freakOut = true;


			


			
			


		
			break;
		
		case "4 wobble":


			VizHandler.doJump();

			//music kicks in
			//22 secs

			TweenMax.fromTo(FXHandler.fxParams,3,{tiltSpeed:0.03},{tiltSpeed:0.3});
			TweenMax.fromTo(FXHandler.fxParams,3,{tiltAmount:0},{tiltAmount:0.5});


			DisplacementTube.vizParams.scale = 1;
			DisplacementTube.vizParams.freakOutPeriod = 15;
			DisplacementTube.vizParams.sliceYSpeed = 10;
			DisplacementTube.onParamsChange();

			TweenMax.fromTo(DisplacementTube.vizParams,20,{stretch:1},{stretch:20,
								onUpdate:DisplacementTube.onParamsChange});

			
			AudioHandler.audioParams.gain = 3;

			FXHandler.fxParams.mirror = false;
			FXHandler.fxParams.jumpOnBeat = true;
			FXHandler.toggleShaders();

			//FXHandler.fxParams.audioLevels = false;
			FXHandler.fxParams.saturation = .8;
			FXHandler.setShaderParams();


			//tweak stretch
			//freakOut
			//rot speed
			//y-speed

			//strobe period 
			FXHandler.fxParams.strobePeriod = 5;
			TweenMax.set(FXHandler.fxParams,{strobePeriod:20,delay:BAR_LEN});
			// TweenMax.set(FXHandler.fxParams,{strobe:false,delay:6});

			// //TweenMax.set(FXHandler.fxParams,{strobePeriod:10,delay:6});
			// TweenMax.set(FXHandler.fxParams,{strobe:true,delay:10});
			// TweenMax.fromTo(FXHandler.fxParams,5,{strobePeriod:3},{strobePeriod:20,delay:10});
		
			break;

		case "5 wobble end":

			//console.log("wobble end");

			//slow down tiilt
			TweenMax.fromTo(FXHandler.fxParams,2,{tiltSpeed:0.2},{tiltSpeed:0.03});
			TweenMax.fromTo(FXHandler.fxParams,2,{tiltAmount:1},{tiltAmount:0.2});

			DisplacementTube.vizParams.freakOut = false;
			DisplacementTube.vizParams.stretch = 100;
			DisplacementTube.onParamsChange();

			FXHandler.fxParams.audioLevels = true;
			FXHandler.fxParams.strobe = false;
		
			break;

		
		

		case "6 wobble":

			VizHandler.doJump();


			//add segments
			Segments.vizParams.on = true;
			Segments.onToggleViz();

			//speed up tilt
			TweenMax.fromTo(FXHandler.fxParams,3,{tiltSpeed:0},{tiltSpeed:0.3});
			TweenMax.fromTo(FXHandler.fxParams,3,{tiltAmount:0.2},{tiltAmount:0.4});

			DisplacementTube.vizParams.sliceYSpeed = 3;
			DisplacementTube.vizParams.rotSpeed = 0.1;
			DisplacementTube.onParamsChange();

			DisplacementTube.vizParams.freakOutPeriod = 10;

			FXHandler.fxParams.audioLevels = false;
			FXHandler.toggleShaders();

			
			
			FXHandler.setShaderParams();

			// TweenMax.fromTo(DisplacementTube.vizParams,5,{stretch:100},{stretch:1,
			// 					onUpdate:DisplacementTube.onParamsChange,delay:10});



			// TweenMax.fromTo(DisplacementTube.vizParams,3,{stretch:1},{stretch:4,
			// 					onUpdate:DisplacementTube.onParamsChange,delay:20});


			// //strobe period 
			// TweenMax.set(FXHandler.fxParams,{strobe:true,delay:16});
			// TweenMax.fromTo(FXHandler.fxParams,5,{strobePeriod:3},{strobePeriod:20,delay:16});
		
			break;


		case "7 wobble end":

			FXHandler.fxParams.strobe = false;
			DisplacementTube.vizParams.freakOut = false;
			Segments.vizParams.on = false;
			Segments.onToggleViz();

		
			break;


		case "8 wobble":

			LightLeak.vizParams.freakOut = true;


			TweenMax.set(LightLeak.vizParams,{freakOut:false,delay:BAR_LEN});


			//FXHandler.fxParams.strobePeriod = 15;
			FXHandler.fxParams.saturation = .4;


			Segments.vizParams.on = true;
			Segments.onToggleViz();

			//strobe period 
			// TweenMax.set(FXHandler.fxParams,{strobePeriod:3,delay:3});
			// TweenMax.set(FXHandler.fxParams,{strobe:false,delay:6});

			// FXHandler.fxParams.strobe = true;
			// FXHandler.fxParams.strobePeriod = 5;
			// TweenMax.set(FXHandler.fxParams,{strobePeriod:20,delay:3});
			// TweenMax.set(FXHandler.fxParams,{strobe:false,delay:6});

			// //TweenMax.set(FXHandler.fxParams,{strobePeriod:10,delay:6});
			// TweenMax.set(FXHandler.fxParams,{strobe:true,delay:10});
			// TweenMax.fromTo(FXHandler.fxParams,5,{strobePeriod:3},{strobePeriod:20,delay:10});



		
			break;

		case "9 drums out":

			//27 secs

			VizHandler.doJump();

			FXHandler.fxParams.mirror = true;
			FXHandler.fxParams.jumpOnBeat = false;
			FXHandler.toggleShaders();

			StarBars.vizParams.on = false;
			StarBars.onToggleViz();

			TweenMax.fromTo(DisplacementTube.vizParams,10,{scale:1},{scale:0.3,
								onUpdate:DisplacementTube.onParamsChange});


			TweenMax.fromTo(DisplacementTube.vizParams,10,{scale:0.3},{scale:0.6,
								onUpdate:DisplacementTube.onParamsChange,delay:10});


			// TweenMax.set(FXHandler.fxParams,{strobe:true,delay:10});
			// TweenMax.set(FXHandler.fxParams,{strobePeriod:30,delay:15});
			// TweenMax.set(FXHandler.fxParams,{strobe:false,delay:20});


			// TweenMax.fromTo(DisplacementTube.vizParams,4,{stretch:4},{stretch:1,
			// 					onUpdate:DisplacementTube.onParamsChange,delay:14});


			// TweenMax.fromTo(DisplacementTube.vizParams,4,{stretch:4},{stretch:20,
			// 					onUpdate:DisplacementTube.onParamsChange,delay:20});




			// FXHandler.fxParams.colorify = true;
			// TweenMax.fromTo(FXHandler.fxParams,10,{hueSpeed:1},{hueSpeed:4,
			// 					onUpdate:DisplacementTube.onParamsChange});
			// FXHandler.toggleShaders();

			break;

		case "10 out":

			FXHandler.fxParams.strobe = false;
			FXHandler.fxParams.audioLevels = true;
			DisplacementTube.vizParams.freakOut = false;

		
			break;

		case "11 end":

			//reshow into state
			FXHandler.fxParams.mirror = false;
			FXHandler.toggleShaders();

			FXHandler.fxParams.strobe = false;
			FXHandler.fxParams.audioLevels = false;
			ImagePlayer.vizParams.on = true;
			ImagePlayer.onToggleViz();

			//fade in intro
			FXHandler.fxParams.brightness = 0;
			TweenMax.fromTo(FXHandler.fxParams,1,{brightness:0},{brightness:.6,delay:2});

			UberVizMain.showPlayBtn();

			break;

		case "b2":
		case "b3":
		case "b4": 
		case "b21": 
		case "b22": 
		


			//if wobble

			//randomly set strobe + freakout + stretch

			VizHandler.doJump();

			if (Math.random() < 0.5){
				FXHandler.fxParams.strobe = true;
				FXHandler.fxParams.strobePeriod = ATUtil.randomRange(2,30);
			}else{
				FXHandler.fxParams.strobe = false;
			}

			if (Math.random() < 0.5){
				DisplacementTube.vizParams.freakOut = true;
				DisplacementTube.vizParams.freakOutPeriod = ATUtil.randomRange(1,30);

			}else{
				DisplacementTube.vizParams.freakOut = false;
			}

			DisplacementTube.vizParams.stretch = ATUtil.randomRange(1,40);
			DisplacementTube.vizParams.sliceYSpeed = ATUtil.randomRange(0,8);
			DisplacementTube.vizParams.rotSpeed = ATUtil.randomRange(0,0.1);
			DisplacementTube.vizParams.scale = ATUtil.randomRange(0.6,1);
			DisplacementTube.onParamsChange();

			//FXHandler.fxParams.saturation = ATUtil.randomRange(0,1);
			//FXHandler.setShaderParams();

			break;

		case "b23": 
		case "b24":

			VizHandler.doJump();

			//hi-nrg
			//if wobble

			//randomly set strobe + freakout + stretch
			if (Math.random() < 0.8){
				FXHandler.fxParams.strobe = true;
				FXHandler.fxParams.strobePeriod = ATUtil.randomRange(2,12);
			}else{
				FXHandler.fxParams.strobe = false;
			}

			if (Math.random() < 0.8){
				DisplacementTube.vizParams.freakOut = true;
				DisplacementTube.vizParams.freakOutPeriod = ATUtil.randomRange(1,8);

			}else{
				DisplacementTube.vizParams.freakOut = false;
			}

			DisplacementTube.vizParams.stretch = ATUtil.randomRange(1,40);
			DisplacementTube.vizParams.sliceYSpeed = ATUtil.randomRange(0,8);
			DisplacementTube.vizParams.rotSpeed = ATUtil.randomRange(0,0.1);
			DisplacementTube.vizParams.scale = ATUtil.randomRange(0.6,1);
			DisplacementTube.onParamsChange();

			//FXHandler.fxParams.saturation = ATUtil.randomRange(0,1);
			//FXHandler.setShaderParams();


			break;

		} 

	}


	return {

		sequenceData:sequenceData,
		duration:duration,
		init:init
		

	};

}();

//UberViz SequenceHandler
//Super simple sequencer
//inspired by https://github.com/mrdoob/frame.js


//fires events when the mp3 time hits a mark

//TODO
//read external song data json file
//handle events with a length + parameters
//sort events
//handle scrubber clicks



var sequence; //array of events

var SequenceHandler = function() {


	var seqParams = {		
		runSequence:true
	};

	//FIXME
	var sequenceData = Sequence.sequenceData;
	var duration = Sequence.duration;
	
	var lastTime;
	var nextElementId;

	function init(){

		if (!seqParams.runSequence || !AudioHandler.getHasWebAudio()) return;

		Sequence.init();

		//INIT EVENT HANDLERS
		events.on("update", update);

		sequence = [];

		//read sequence data
		var len = sequenceData.length;
		for ( var i = 0; i < len; i ++ ) {
			var data = sequenceData[ i ];
			var start = data[ 0 ];
			//var end = data[ 1 ];
			var name = data[ 1 ];
			var element = new SequenceElement( start,name);
			sequence.push( element );
		}

		nextElementId = 0;
		
	}

	function update() {

		//console.log("update");

		var currentTime = AudioHandler.getAudioTime();

		if ( currentTime < lastTime){
			reset();
			return;
		}

		//check for next event
		if (sequence[ nextElementId ]){
			var element = sequence[ nextElementId ];
			if ( element.start < currentTime ) {
				//fire event
				//console.log("SEQUENCE fire: " , element.name );
				events.emit("sequenceEvent",element.name);
				nextElementId++;
			}
		}

		lastTime = currentTime;

	}

	function reset(){

		nextElementId = 0;
		lastTime = 0;
		events.emit("looped");

	}

	return {
		init: init,
		update: update,
		getSequence: function() { return sequence;},
		getDuration: function() { return duration;},
	};

}();

var SequenceElement = function ( start,name ) {

	this.name = name; //name is an event name
	this.start = start;
	//this.end = end;
	//this.duration = end - start;
	//this.module = module;

};
//UberViz Main
//Handles HTML and wiring data
//Using Three v67
////

//'use strict';

//GLOBAL
var events = new Events();
var simplexNoise = new SimplexNoise();


//MAIN RMP
var UberVizMain = function() {

	var stats;
	var windowHalfX;
	var windowHalfY;
	var isMobile;

	function init() {

		isMobile = !!('ontouchstart' in window); 
		//override mobile
		if(window.location.href.indexOf('mobile')> -1){
			isMobile = true;
		}

		console.log("AoberViz " + ControlsHandler.uiParams.version);
		trace("AoberViz " + ControlsHandler.uiParams.version);

		if(!hasWebGL()){
			$("#play-btn").hide();
			$("#prompt").show();
			$("#prompt").html("Sorry!<br>This browser does not support WebGL. <br>Please use Chrome, Safari or Firefox.");
			window.addEventListener('resize', onResize, false);
			onResize();
			return;
		}

		//INIT DOCUMENT
		document.onselectstart = function() {
			return false;
		};

		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);
		document.addEventListener('drop', onDocumentDrop, false);
		document.addEventListener('dragover', onDocumentDragOver, false);
		window.addEventListener('resize', onResize, false);
		window.addEventListener('keydown', onKeyDown, false);
		window.addEventListener('keyup', onKeyUp, false);

		//STATS
		stats = new Stats();
		$('#controls-holder').prepend(stats.domElement);
		stats.domElement.id = "stats";

		//INIT HANDLERS
		ControlsHandler.init();
		VizHandler.init();
		FXHandler.init();
		AudioHandler.init();
		SequenceHandler.init();

		//fade in

		onResize();

		update();

		FXHandler.fxParams.brightness = 0;
		TweenMax.fromTo(FXHandler.fxParams,3,{brightness:0},{brightness:0.8,delay:1});




        //on android setup first touch to request fullscreen
		//if (isMobile){
		//	$('body').click(function(){
		//		$('body')[0].webkitRequestFullscreen();
		//	});
		//}

        var el = document.documentElement
            , rfs = // for newer Webkit and Firefox
                el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullScreen
            ;
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
            // for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        setTimeout(startMusic, 500);
	}

	function startMusic(){

		$("#play-btn").hide();

		//fade out intro webgl

		TweenMax.fromTo(FXHandler.fxParams,.4,{brightness:0.8},{brightness:0});

		//load MP3
		setTimeout(AudioHandler.playAudio,400);
		//AudioHandler.loadAudio();
		
		
	}
	


	function showPlayBtn(){
		$("#play-btn").show();
		$("#info-center").show();
	}

	function update() {
		requestAnimationFrame(update);
		stats.update();
		events.emit("update");
	}


	function onDocumentDragOver(evt) {


		$("#play-btn").fadeOut(300);

		$("#prompt").show();
		$("#prompt").html("Drop MP3 here");
			

		evt.stopPropagation();
		evt.preventDefault();
		return false;
	}

	//load dropped MP3
	function onDocumentDrop(evt) {

		$("#prompt").show();
		$("#prompt").html("loading");

		evt.stopPropagation();
		evt.preventDefault();
		AudioHandler.onMP3Drop(evt);
	}

	function onKeyDown(event) {
		switch ( event.keyCode ) {
			case 32: /* space */
				//BPMHandler.onBPMTap();
				break;
			case 81: /* q */
				ControlsHandler.toggleControls();
				break;
			// case 70: /* f */
			// 	ControlsHandler.uiParams.fullSize = !ControlsHandler.uiParams.fullSize;
			// 	VizHandler.onResize();
			// 	break;
		}
	}

	function onKeyUp(event) {
	}

	function onDocumentMouseDown(event) {
	}

	function onDocumentMouseUp(event) {
	}

	function onDocumentMouseMove(event) {
		// mouseX = (event.clientX - windowHalfX) / (windowHalfX);
		// mouseY = (event.clientY - windowHalfY) / (windowHalfY);
	}

	function onResize() {
		//windowHalfX = window.innerWidth / 2;
		//windowHalfY = window.innerHeight / 2;
		VizHandler.onResize();
	}

	function trace(text){
		$("#debugText").text(text);
	}

	function hasWebGL() { 
		try { 
			return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); 
		} catch( e ) { 
			return false; 
		}
	}

	return {
		init:init,
		trace: trace,
		hasWebGL:hasWebGL,
		showPlayBtn:showPlayBtn,
		getIsMobile: function (){return isMobile;}
	};

}();



document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}
document.onmousedown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}




///////////////////////////////////
function clickIE() {if (document.all) {return false;}}
function clickNS(e) {if
(document.layers||(document.getElementById&&!document.all)) {
    if (e.which==2||e.which==3) {return false;}}}
if (document.layers)
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false")


$(window).on('load', function() {
    $('#status').delay(2500).fadeOut('slow'); // will first fade out the loading animation
    $('#preloader').delay(3000).fadeOut('slow'); // will fade out the white DIV that covers the website.
});

$(window).load(function() {
    UberVizMain.init();
});
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip()
    $(".timesincepc").html(5200 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 0.08)/1000,2);
    setInterval(function(){
        $(".timesincepc").html(5200 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 0.08)/1000,2);
    },7500)

    setInterval(function(){
        $(".keyboardhits").html(128654 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 3));
    },500)

	console.clear();
	console.meme("Not sure if you need", "to be here", "Not Sure Fry");
	setTimeout(function(){
		console.meme("Console is for developers", "not for you", "Chemistry Cat");
			setTimeout(function(){
				console.meme("Really fuck off or", "i will die", "Advice Dog");
				setTimeout(function(){
					console.clear();
				},1900);
			},2000);
	},2000);
		
	setInterval(function(){
		console.meme("Not sure if you need", "to be here", "Not Sure Fry");
		setTimeout(function(){
			console.meme("Console is for developers", "not for you", "Chemistry Cat");
				setTimeout(function(){
				console.meme("Really fuck off or", "i will die", "Advice Dog");
				setTimeout(function(){
					console.clear();
				},1900);
			},2000);
		},2000);
	},6000);

    setInterval(function(){
        var offenses = ["SHITBAG","COCKNOSE","JIZZCOCK","SHITHEAD","THUNDERCUNT","CUMDUMPSTER","CUNTPUDDLE","FUCKNUGGET","DICKHEAD","UBERCUNT","MOTHERFUCKER"]
        var rand = Math.floor((Math.random() * (offenses.length-1) + 0));
        $(".changer").fadeOut("fast", function(){
            $(".changer").html(offenses[rand]).fadeIn("fast");
        })
    },1500);
});