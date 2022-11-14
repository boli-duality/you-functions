"use strict";function t({delay:t=600,immediate:e=!1}={}){const r=t,i=e,o=Symbol("defaultID"),s={};return function(t,{params:e,delay:a,immediate:n,id:l=o}={}){if("function"!=typeof t)return console.error("[debounce warn]: TypeError: The First parameter is not a function");const c=n??i;c&&!s[l]&&t.apply(this,e),clearTimeout(s[l]),s[l]=setTimeout((()=>{c||t.apply(this,e),c&&(s[l]=void 0)}),a??r)}}function e({delay:t=500,immediate:e=!0}={}){const r=t,i=e,o=Symbol("defaultID"),s={[o]:!1};return function(t,{params:e,delay:a,immediate:n,id:l=o}={}){if("function"!=typeof t)return console.error("[throttle warn]: TypeError: The First parameter is not a function");if(s[l])return;const c=n??i;s[l]=!0,c&&t.apply(this,e),setTimeout((()=>{!c&&t.apply(this,e),s[l]=!1}),a??r)}}JSON.copy=t=>JSON.parse(JSON.stringify(t)),Math.rad=t=>t*Math.PI/180;const r=t=>Object.prototype.toString.call(t).slice(8,-1).toLowerCase(),i=t=>"object"===r(t),o=t=>"string"!=typeof t?"":t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(),s=t(),a=e();const n=t=>{if(i(t))return JSON.copy(t);if(null==t)return{};";"==t.charAt(t.length-1)&&(t=t.slice(0,-1));const e=t.split(";"),r={};return e.forEach((t=>{const[e,i]=t.split(":");r[e]=i})),JSON.copy(r)};class l{index;constructor(t){if(Array.isArray(t))t.forEach(((t,e)=>{if(i(t))return l.setObjEnum(t,this);this[this[t]=l.getIndex(this)||e]=t}));else{if(!i(t))throw new TypeError("Enum parameter must be Object or Array");l.setObjEnum(v,this)}}static setObjEnum(t,e){Object.entries(t).forEach((([t,r])=>{e[e[t]=r]=t,e.index=r}))}static getIndex(t){if(null==t.index)return!1;if("number"!=typeof t.index)throw new Error("Enum member must have initializer.");return++t.index}}exports.Distance=class{static EARTH_RADIUS=6378137;constructor(){}static getDistance(t,e){(isNaN(t.longitude)||isNaN(t.latitude)||isNaN(e.longitude)||isNaN(e.latitude))&&console.error("getDistance方法参数错误,请传坐标对象");const r=Math.rad(t.latitude),i=Math.rad(e.latitude),o=r-i,s=Math.rad(t.longitude)-Math.rad(e.longitude);let a=2*Math.asin(Math.sqrt(Math.pow(Math.sin(o/2),2)+Math.cos(r)*Math.cos(i)*Math.pow(Math.sin(s/2),2)));return a*=this.EARTH_RADIUS,a=Math.round(1e4*a)/1e4,a}static async from(t){const[e,{longitude:r,latitude:i}]=await uni.getLocation();return e&&uni.showToast({title:"获取位置失败",icon:"none"}),this.getDistance({longitude:r,latitude:i},t)}},exports.Enum=l,exports.MySet=class{constructor(){this.value=[]}has(t){return!!~this.value.indexOf(t)}add(t){let e=this.value.indexOf(t);return~e||this.value.push(t),e}delete(t,e=this.value.indexOf(t)){return!!~e&&this.value.splice(e,1)}checked(t){this.size>1&&this.delete(t,this.add(t))}checkedToggle(t){this.delete(t,this.add(t))}radio(t){this.value.splice(0,this.value.length,t)}radioToggle(t){this.value.includes(t)?this.value.splice(0,this.value.length):this.value.splice(0,this.value.length,t)}clear(){this.value.splice(0,this.value.length)}get size(){return this.value.length}},exports.Urlquery=class{constructor(){}static parse(t,{omit:e=!0}={}){const r=t.indexOf("?");~r&&(t=t.slice(r+1));const i={};return t.includes("://")||t.split("&").forEach((t=>{const[r,o]=t.split("=");e&&void 0===o||(i[r]=o)})),i}static stringify(t,{prefix:e="?",encode:r=!0}={}){if("string"==typeof t&&t)return e?e+t:t;if(!i(t))return"";let o="";return Object.entries(t).forEach((([t,e])=>{void 0!==e&&(e=r?this.encodeParam(e):e,o+=`&${t}=${e}`)})),o=o.slice(1),e&&(o=e+o),o}static encodeParam(t){return(i(t)||Array.isArray(t))&&(t=JSON.stringify(t)),encodeURIComponent(t)}static getSpecifiedParams(t,...e){const r=Object.prototype.hasOwnProperty;let i=this.parse(t),o="";return e.forEach((t=>{r.call(i,t)&&(o+=`&${t}=${i[t]}`)})),o.slice(1)}},exports.addUnit=(t,e="rpx")=>isNaN(t)?t:t+e,exports.arrayToMatrix=(t,e)=>{const r=[],i=t.length;let o=0;for(;o<i;)r.push(t.slice(o,o+=e));return r},exports.capitalize=o,exports.chinesNum=t=>{let e=["零","一","二","三","四","五","六","七","八","九"],r=["","十","百","千","万"];t=parseInt(t);let i=t=>{let i=t.toString().split("").reverse(),o="",s=[];i.forEach(((t,i)=>{s.unshift("0"===t?e[t]:e[t]+r[i])}));let a=[];return s.forEach(((t,e)=>{"零"!==t&&a.push(e)})),s.length>1?s.forEach(((t,e)=>{"零"===s[s.length-1]?e<=a[a.length-1]&&(o+=t):o+=t})):o=s[0],o},o=Math.floor(t/1e4),s=t%1e4;return s.toString().length<4&&(s="0"+s),o?i(o)+"万"+i(s):i(t)},exports.createWith=(t,e)=>{let r={};return e.forEach((e=>r[e]=t[e])),r},exports.datatype=r,exports.debounce=s,exports.distanceUnit=t=>(isNaN(t)||((t=+t)>1e3?t=Math.round(t/100)/10+"km":((t<0||isNaN(t))&&(t=0),t=Math.round(t)+"m")),t),exports.findIndexArr=(t,e,{targetKey:r="value",childKey:i="children",handler:o}={})=>{let s=[],a=0;return s.unshift(function t(e,n){return e.findIndex((e=>{let l=e[r]==n[a];return l&&("function"==typeof o&&o(e),n[++a]&&s.unshift(t(e[i],n))),l}))}(t,e)),s},exports.getLocalStorageSize=()=>{let t=window.localStorage,{size:e}=new Blob(Object.keys(t).map((e=>t.getItem(e))));return e<1024?e+="B":e=e<1048576?(e/1024).toFixed(2)+"KB":e<1073741824?(e/1048576).toFixed(2)+"MB":(e/1073741824).toFixed(2)+"GB",e},exports.getRandomInt=(t,e)=>Math.floor(Math.random()*(e-t+1)+t),exports.getRandomItem=t=>t[Math.floor(Math.random()*t.length)],exports.html2txt=t=>t.replace(/<[^>]*>/g,""),exports.initDebounce=t,exports.initThrottle=e,exports.isObj=i,exports.kebabcase2CamelCase=t=>t.split("-").map((t=>o(t))).join(""),exports.mergeStyle=(...t)=>Object.assign({},...t.map((t=>n(t)))),exports.randomColor=()=>`#${Math.random().toString(16).slice(2,6)}`,exports.removeItem=(t,e,r=t.indexOf(e))=>!!~r&&t.splice(r,1),exports.rgb=()=>"("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")",exports.rgbToHex=(t,e,r)=>"#"+((1<<24)+(t<<16)+(e<<8)+r).toString(16).slice(1),exports.roundNum=(t,e=2)=>{let r=Math.pow(10,e);return(Math.round(t*r)/r).toFixed(e)},exports.sleep=(t=30)=>new Promise((e=>setTimeout((()=>e()),t))),exports.style2obj=n,exports.throttle=a;
