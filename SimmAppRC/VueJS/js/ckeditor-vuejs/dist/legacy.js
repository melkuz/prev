/*! For license information please see legacy.js.LICENSE.txt */
/*!*
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.CKEditor=n():t.CKEditor=n()}(window,(function(){return function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=79)}([function(t,n,r){(function(n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n&&n)||function(){return this}()||Function("return this")()}).call(this,r(83))},function(t,n){t.exports=function(t){return"function"==typeof t}},function(t,n,r){var e=r(27),o=Function.prototype,i=o.bind,c=o.call,u=e&&i.bind(c,c);t.exports=e?function(t){return t&&u(t)}:function(t){return t&&function(){return c.apply(t,arguments)}}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,r){var e=r(0),o=r(58),i=r(8),c=r(60),u=r(56),a=r(55),f=o("wks"),s=e.Symbol,p=s&&s.for,l=a?s:s&&s.withoutSetter||c;t.exports=function(t){if(!i(f,t)||!u&&"string"!=typeof f[t]){var n="Symbol."+t;u&&i(s,t)?f[t]=s[t]:f[t]=a&&p?p(n):l(n)}return f[t]}},function(t,n,r){var e=r(27),o=Function.prototype.call;t.exports=e?o.bind(o):function(){return o.apply(o,arguments)}},function(t,n,r){var e=r(0),o=r(26).f,i=r(17),c=r(15),u=r(41),a=r(64),f=r(47);t.exports=function(t,n){var r,s,p,l,v,d=t.target,h=t.global,y=t.stat;if(r=h?e:y?e[d]||u(d,{}):(e[d]||{}).prototype)for(s in n){if(l=n[s],p=t.noTargetGet?(v=o(r,s))&&v.value:r[s],!f(h?s:d+(y?".":"#")+s,t.forced)&&void 0!==p){if(typeof l==typeof p)continue;a(l,p)}(t.sham||p&&p.sham)&&i(l,"sham",!0),c(r,s,l,t)}}},function(t,n,r){var e=r(3);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,n,r){var e=r(2),o=r(59),i=e({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,n){return i(o(t),n)}},function(t,n,r){var e=r(0),o=r(1),i=function(t){return o(t)?t:void 0};t.exports=function(t,n){return arguments.length<2?i(e[t]):e[t]&&e[t][n]}},function(t,n,r){var e=r(0),o=r(11),i=e.String,c=e.TypeError;t.exports=function(t){if(o(t))return t;throw c(i(t)+" is not an object")}},function(t,n,r){var e=r(1);t.exports=function(t){return"object"==typeof t?null!==t:e(t)}},function(t,n,r){var e=r(0),o=r(1),i=r(30),c=e.TypeError;t.exports=function(t){if(o(t))return t;throw c(i(t)+" is not a function")}},function(t,n){t.exports=!1},function(t,n,r){var e=r(0),o=r(7),i=r(61),c=r(62),u=r(10),a=r(53),f=e.TypeError,s=Object.defineProperty,p=Object.getOwnPropertyDescriptor,l="enumerable",v="configurable",d="writable";n.f=o?c?function(t,n,r){if(u(t),n=a(n),u(r),"function"==typeof t&&"prototype"===n&&"value"in r&&d in r&&!r.writable){var e=p(t,n);e&&e.writable&&(t[n]=r.value,r={configurable:v in r?r.configurable:e.configurable,enumerable:l in r?r.enumerable:e.enumerable,writable:!1})}return s(t,n,r)}:s:function(t,n,r){if(u(t),n=a(n),u(r),i)try{return s(t,n,r)}catch(t){}if("get"in r||"set"in r)throw f("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(0),o=r(1),i=r(17),c=r(87),u=r(41);t.exports=function(t,n,r,a){var f=!!a&&!!a.unsafe,s=!!a&&!!a.enumerable,p=!!a&&!!a.noTargetGet,l=a&&void 0!==a.name?a.name:n;return o(r)&&c(r,l,a),t===e?(s?t[n]=r:u(n,r),t):(f?!p&&t[n]&&(s=!0):delete t[n],s?t[n]=r:i(t,n,r),t)}},function(t,n,r){"use strict";var e=r(12),o=function(t){var n,r;this.promise=new t((function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e})),this.resolve=e(n),this.reject=e(r)};t.exports.f=function(t){return new o(t)}},function(t,n,r){var e=r(7),o=r(14),i=r(19);t.exports=e?function(t,n,r){return o.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(0);t.exports=e.Promise},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(85),o=r(28);t.exports=function(t){return e(o(t))}},function(t,n,r){var e=r(2);t.exports=e({}.isPrototypeOf)},function(t,n,r){var e=r(0),o=r(49),i=r(5),c=r(10),u=r(30),a=r(99),f=r(68),s=r(21),p=r(100),l=r(70),v=r(101),d=e.TypeError,h=function(t,n){this.stopped=t,this.result=n},y=h.prototype;t.exports=function(t,n,r){var e,g,m,b,x,w,O,S=r&&r.that,E=!(!r||!r.AS_ENTRIES),j=!(!r||!r.IS_ITERATOR),T=!(!r||!r.INTERRUPTED),P=o(n,S),I=function(t){return e&&v(e,"normal",t),new h(!0,t)},R=function(t){return E?(c(t),T?P(t[0],t[1],I):P(t[0],t[1])):T?P(t,I):P(t)};if(j)e=t;else{if(!(g=l(t)))throw d(u(t)+" is not iterable");if(a(g)){for(m=0,b=f(t);b>m;m++)if((x=R(t[m]))&&s(y,x))return x;return new h(!1)}e=p(t,g)}for(w=e.next;!(O=i(w,e)).done;){try{x=R(O.value)}catch(t){v(e,"throw",t)}if("object"==typeof x&&x&&s(y,x))return x}return new h(!1)}},function(t,n){t.exports={}},function(t,n){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,n,r){var e=r(0),o=r(18),i=r(1),c=r(47),u=r(31),a=r(4),f=r(122),s=r(13),p=r(57),l=o&&o.prototype,v=a("species"),d=!1,h=i(e.PromiseRejectionEvent),y=c("Promise",(function(){var t=u(o),n=t!==String(o);if(!n&&66===p)return!0;if(s&&(!l.catch||!l.finally))return!0;if(p>=51&&/native code/.test(t))return!1;var r=new o((function(t){t(1)})),e=function(t){t((function(){}),(function(){}))};return(r.constructor={})[v]=e,!(d=r.then((function(){}))instanceof e)||!n&&f&&!h}));t.exports={CONSTRUCTOR:y,REJECTION_EVENT:h,SUBCLASSING:d}},function(t,n,r){var e=r(7),o=r(5),i=r(84),c=r(19),u=r(20),a=r(53),f=r(8),s=r(61),p=Object.getOwnPropertyDescriptor;n.f=e?p:function(t,n){if(t=u(t),n=a(n),s)try{return p(t,n)}catch(t){}if(f(t,n))return c(!o(i.f,t,n),t[n])}},function(t,n,r){var e=r(3);t.exports=!e((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},function(t,n,r){var e=r(0).TypeError;t.exports=function(t){if(null==t)throw e("Can't call method on "+t);return t}},function(t,n,r){var e=r(9);t.exports=e("navigator","userAgent")||""},function(t,n,r){var e=r(0).String;t.exports=function(t){try{return e(t)}catch(t){return"Object"}}},function(t,n,r){var e=r(2),o=r(1),i=r(40),c=e(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return c(t)}),t.exports=i.inspectSource},function(t,n,r){var e,o,i,c=r(88),u=r(0),a=r(2),f=r(11),s=r(17),p=r(8),l=r(40),v=r(43),d=r(44),h="Object already initialized",y=u.TypeError,g=u.WeakMap;if(c||l.state){var m=l.state||(l.state=new g),b=a(m.get),x=a(m.has),w=a(m.set);e=function(t,n){if(x(m,t))throw new y(h);return n.facade=t,w(m,t,n),n},o=function(t){return b(m,t)||{}},i=function(t){return x(m,t)}}else{var O=v("state");d[O]=!0,e=function(t,n){if(p(t,O))throw new y(h);return n.facade=t,s(t,O,n),n},o=function(t){return p(t,O)?t[O]:{}},i=function(t){return p(t,O)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(n){var r;if(!f(n)||(r=o(n)).type!==t)throw y("Incompatible receiver, "+t+" required");return r}}}},function(t,n,r){var e=r(2),o=r(10),i=r(94);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,n=!1,r={};try{(t=e(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set))(r,[]),n=r instanceof Array}catch(t){}return function(r,e){return o(r),i(e),n?t(r,e):r.__proto__=e,r}}():void 0)},function(t,n,r){var e,o=r(10),i=r(95),c=r(46),u=r(44),a=r(69),f=r(42),s=r(43),p=s("IE_PROTO"),l=function(){},v=function(t){return"<script>"+t+"</"+"script>"},d=function(t){t.write(v("")),t.close();var n=t.parentWindow.Object;return t=null,n},h=function(){try{e=new ActiveXObject("htmlfile")}catch(t){}var t,n;h="undefined"!=typeof document?document.domain&&e?d(e):((n=f("iframe")).style.display="none",a.appendChild(n),n.src=String("javascript:"),(t=n.contentWindow.document).open(),t.write(v("document.F=Object")),t.close(),t.F):d(e);for(var r=c.length;r--;)delete h.prototype[c[r]];return h()};u[p]=!0,t.exports=Object.create||function(t,n){var r;return null!==t?(l.prototype=o(t),r=new l,l.prototype=null,r[p]=t):r=h(),void 0===n?r:i.f(r,n)}},function(t,n,r){var e=r(0),o=r(50),i=r(1),c=r(37),u=r(4)("toStringTag"),a=e.Object,f="Arguments"==c(function(){return arguments}());t.exports=o?c:function(t){var n,r,e;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,n){try{return t[n]}catch(t){}}(n=a(t),u))?r:f?c(n):"Object"==(e=c(n))&&i(n.callee)?"Arguments":e}},function(t,n,r){var e=r(0),o=r(35),i=e.String;t.exports=function(t){if("Symbol"===o(t))throw TypeError("Cannot convert a Symbol value to a string");return i(t)}},function(t,n,r){var e=r(2),o=e({}.toString),i=e("".slice);t.exports=function(t){return i(o(t),8,-1)}},function(t,n,r){var e=r(0),o=r(9),i=r(1),c=r(21),u=r(55),a=e.Object;t.exports=u?function(t){return"symbol"==typeof t}:function(t){var n=o("Symbol");return i(n)&&c(n.prototype,a(t))}},function(t,n,r){var e=r(12);t.exports=function(t,n){var r=t[n];return null==r?void 0:e(r)}},function(t,n,r){var e=r(0),o=r(41),i="__core-js_shared__",c=e[i]||o(i,{});t.exports=c},function(t,n,r){var e=r(0),o=Object.defineProperty;t.exports=function(t,n){try{o(e,t,{value:n,configurable:!0,writable:!0})}catch(r){e[t]=n}return n}},function(t,n,r){var e=r(0),o=r(11),i=e.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},function(t,n,r){var e=r(58),o=r(60),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,n){t.exports={}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){var n=+t;return n!=n||0===n?0:(n>0?e:r)(n)}},function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,n,r){var e=r(3),o=r(1),i=/#|\.prototype\./,c=function(t,n){var r=a[u(t)];return r==s||r!=f&&(o(n)?e(n):!!n)},u=c.normalize=function(t){return String(t).replace(i,".").toLowerCase()},a=c.data={},f=c.NATIVE="N",s=c.POLYFILL="P";t.exports=c},function(t,n,r){var e=r(0),o=r(8),i=r(1),c=r(59),u=r(43),a=r(93),f=u("IE_PROTO"),s=e.Object,p=s.prototype;t.exports=a?s.getPrototypeOf:function(t){var n=c(t);if(o(n,f))return n[f];var r=n.constructor;return i(r)&&n instanceof r?r.prototype:n instanceof s?p:null}},function(t,n,r){var e=r(2),o=r(12),i=r(27),c=e(e.bind);t.exports=function(t,n){return o(t),void 0===n?t:i?c(t,n):function(){return t.apply(n,arguments)}}},function(t,n,r){var e={};e[r(4)("toStringTag")]="z",t.exports="[object z]"===String(e)},function(t,n,r){var e=r(14).f,o=r(8),i=r(4)("toStringTag");t.exports=function(t,n,r){t&&!r&&(t=t.prototype),t&&!o(t,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n,r){var e=r(37),o=r(0);t.exports="process"==e(o.process)},function(t,n,r){var e=r(54),o=r(38);t.exports=function(t){var n=e(t,"string");return o(n)?n:n+""}},function(t,n,r){var e=r(0),o=r(5),i=r(11),c=r(38),u=r(39),a=r(86),f=r(4),s=e.TypeError,p=f("toPrimitive");t.exports=function(t,n){if(!i(t)||c(t))return t;var r,e=u(t,p);if(e){if(void 0===n&&(n="default"),r=o(e,t,n),!i(r)||c(r))return r;throw s("Can't convert object to primitive value")}return void 0===n&&(n="number"),a(t,n)}},function(t,n,r){var e=r(56);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,n,r){var e=r(57),o=r(3);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&e&&e<41}))},function(t,n,r){var e,o,i=r(0),c=r(29),u=i.process,a=i.Deno,f=u&&u.versions||a&&a.version,s=f&&f.v8;s&&(o=(e=s.split("."))[0]>0&&e[0]<4?1:+(e[0]+e[1])),!o&&c&&(!(e=c.match(/Edge\/(\d+)/))||e[1]>=74)&&(e=c.match(/Chrome\/(\d+)/))&&(o=+e[1]),t.exports=o},function(t,n,r){var e=r(13),o=r(40);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.22.5",mode:e?"pure":"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.22.5/LICENSE",source:"https://github.com/zloirock/core-js"})},function(t,n,r){var e=r(0),o=r(28),i=e.Object;t.exports=function(t){return i(o(t))}},function(t,n,r){var e=r(2),o=0,i=Math.random(),c=e(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+c(++o+i,36)}},function(t,n,r){var e=r(7),o=r(3),i=r(42);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,n,r){var e=r(7),o=r(3);t.exports=e&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},function(t,n,r){var e=r(7),o=r(8),i=Function.prototype,c=e&&Object.getOwnPropertyDescriptor,u=o(i,"name"),a=u&&"something"===function(){}.name,f=u&&(!e||e&&c(i,"name").configurable);t.exports={EXISTS:u,PROPER:a,CONFIGURABLE:f}},function(t,n,r){var e=r(8),o=r(89),i=r(26),c=r(14);t.exports=function(t,n,r){for(var u=o(n),a=c.f,f=i.f,s=0;s<u.length;s++){var p=u[s];e(t,p)||r&&e(r,p)||a(t,p,f(n,p))}}},function(t,n,r){var e=r(66),o=r(46).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},function(t,n,r){var e=r(2),o=r(8),i=r(20),c=r(67).indexOf,u=r(44),a=e([].push);t.exports=function(t,n){var r,e=i(t),f=0,s=[];for(r in e)!o(u,r)&&o(e,r)&&a(s,r);for(;n.length>f;)o(e,r=n[f++])&&(~c(s,r)||a(s,r));return s}},function(t,n,r){var e=r(20),o=r(90),i=r(68),c=function(t){return function(n,r,c){var u,a=e(n),f=i(a),s=o(c,f);if(t&&r!=r){for(;f>s;)if((u=a[s++])!=u)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===r)return t||s||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},function(t,n,r){var e=r(91);t.exports=function(t){return e(t.length)}},function(t,n,r){var e=r(9);t.exports=e("document","documentElement")},function(t,n,r){var e=r(35),o=r(39),i=r(23),c=r(4)("iterator");t.exports=function(t){if(null!=t)return o(t,c)||o(t,"@@iterator")||i[e(t)]}},function(t,n,r){var e=r(4),o=r(34),i=r(14),c=e("unscopables"),u=Array.prototype;null==u[c]&&i.f(u,c,{configurable:!0,value:o(null)}),t.exports=function(t){u[c][t]=!0}},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(13),c=r(63),u=r(1),a=r(105),f=r(48),s=r(33),p=r(51),l=r(17),v=r(15),d=r(4),h=r(23),y=r(73),g=c.PROPER,m=c.CONFIGURABLE,b=y.IteratorPrototype,x=y.BUGGY_SAFARI_ITERATORS,w=d("iterator"),O="keys",S="values",E="entries",j=function(){return this};t.exports=function(t,n,r,c,d,y,T){a(r,n,c);var P,I,R,A=function(t){if(t===d&&F)return F;if(!x&&t in _)return _[t];switch(t){case O:case S:case E:return function(){return new r(this,t)}}return function(){return new r(this)}},C=n+" Iterator",N=!1,_=t.prototype,k=_[w]||_["@@iterator"]||d&&_[d],F=!x&&k||A(d),D="Array"==n&&_.entries||k;if(D&&(P=f(D.call(new t)))!==Object.prototype&&P.next&&(i||f(P)===b||(s?s(P,b):u(P[w])||v(P,w,j)),p(P,C,!0,!0),i&&(h[C]=j)),g&&d==S&&k&&k.name!==S&&(!i&&m?l(_,"name",S):(N=!0,F=function(){return o(k,this)})),d)if(I={values:A(S),keys:y?F:A(O),entries:A(E)},T)for(R in I)(x||N||!(R in _))&&v(_,R,I[R]);else e({target:n,proto:!0,forced:x||N},I);return i&&!T||_[w]===F||v(_,w,F,{name:d}),h[n]=F,I}},function(t,n,r){"use strict";var e,o,i,c=r(3),u=r(1),a=r(34),f=r(48),s=r(15),p=r(4),l=r(13),v=p("iterator"),d=!1;[].keys&&("next"in(i=[].keys())?(o=f(f(i)))!==Object.prototype&&(e=o):d=!0),null==e||c((function(){var t={};return e[v].call(t)!==t}))?e={}:l&&(e=a(e)),u(e[v])||s(e,v,(function(){return this})),t.exports={IteratorPrototype:e,BUGGY_SAFARI_ITERATORS:d}},function(t,n,r){var e=r(10),o=r(112),i=r(4)("species");t.exports=function(t,n){var r,c=e(t).constructor;return void 0===c||null==(r=e(c)[i])?n:o(r)}},function(t,n,r){var e,o,i,c,u=r(0),a=r(114),f=r(49),s=r(1),p=r(8),l=r(3),v=r(69),d=r(115),h=r(42),y=r(116),g=r(76),m=r(52),b=u.setImmediate,x=u.clearImmediate,w=u.process,O=u.Dispatch,S=u.Function,E=u.MessageChannel,j=u.String,T=0,P={},I="onreadystatechange";try{e=u.location}catch(t){}var R=function(t){if(p(P,t)){var n=P[t];delete P[t],n()}},A=function(t){return function(){R(t)}},C=function(t){R(t.data)},N=function(t){u.postMessage(j(t),e.protocol+"//"+e.host)};b&&x||(b=function(t){y(arguments.length,1);var n=s(t)?t:S(t),r=d(arguments,1);return P[++T]=function(){a(n,void 0,r)},o(T),T},x=function(t){delete P[t]},m?o=function(t){w.nextTick(A(t))}:O&&O.now?o=function(t){O.now(A(t))}:E&&!g?(c=(i=new E).port2,i.port1.onmessage=C,o=f(c.postMessage,c)):u.addEventListener&&s(u.postMessage)&&!u.importScripts&&e&&"file:"!==e.protocol&&!l(N)?(o=N,u.addEventListener("message",C,!1)):o=I in h("script")?function(t){v.appendChild(h("script")).onreadystatechange=function(){v.removeChild(this),R(t)}}:function(t){setTimeout(A(t),0)}),t.exports={set:b,clear:x}},function(t,n,r){var e=r(29);t.exports=/(?:ipad|iphone|ipod).*applewebkit/i.test(e)},function(t,n,r){var e=r(18),o=r(124),i=r(25).CONSTRUCTOR;t.exports=i||!o((function(t){e.all(t).then(void 0,(function(){}))}))},function(t,n,r){var e=r(10),o=r(11),i=r(16);t.exports=function(t,n){if(e(t),o(n)&&n.constructor===t)return n;var r=i.f(t);return(0,r.resolve)(n),r.promise}},function(t,n,r){r(80),t.exports=r(141)},function(t,n,r){r(81),r(104),r(106),r(108),r(129),r(130),r(131),r(132);var e=r(134);t.exports=e.Promise},function(t,n,r){r(82)},function(t,n,r){"use strict";var e=r(6),o=r(0),i=r(21),c=r(48),u=r(33),a=r(64),f=r(34),s=r(17),p=r(19),l=r(97),v=r(98),d=r(22),h=r(102),y=r(4),g=r(103),m=y("toStringTag"),b=o.Error,x=[].push,w=function(t,n){var r,e=arguments.length>2?arguments[2]:void 0,o=i(O,this);u?r=u(new b,o?c(this):O):(r=o?this:f(O),s(r,m,"Error")),void 0!==n&&s(r,"message",h(n)),g&&s(r,"stack",l(r.stack,1)),v(r,e);var a=[];return d(t,x,{that:a}),s(r,"errors",a),r};u?u(w,b):a(w,b,{name:!0});var O=w.prototype=f(b.prototype,{constructor:p(1,w),message:p(1,""),name:p(1,"AggregateError")});e({global:!0,constructor:!0,arity:2},{AggregateError:w})},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);n.f=i?function(t){var n=o(this,t);return!!n&&n.enumerable}:e},function(t,n,r){var e=r(0),o=r(2),i=r(3),c=r(37),u=e.Object,a=o("".split);t.exports=i((function(){return!u("z").propertyIsEnumerable(0)}))?function(t){return"String"==c(t)?a(t,""):u(t)}:u},function(t,n,r){var e=r(0),o=r(5),i=r(1),c=r(11),u=e.TypeError;t.exports=function(t,n){var r,e;if("string"===n&&i(r=t.toString)&&!c(e=o(r,t)))return e;if(i(r=t.valueOf)&&!c(e=o(r,t)))return e;if("string"!==n&&i(r=t.toString)&&!c(e=o(r,t)))return e;throw u("Can't convert object to primitive value")}},function(t,n,r){var e=r(3),o=r(1),i=r(8),c=r(7),u=r(63).CONFIGURABLE,a=r(31),f=r(32),s=f.enforce,p=f.get,l=Object.defineProperty,v=c&&!e((function(){return 8!==l((function(){}),"length",{value:8}).length})),d=String(String).split("String"),h=t.exports=function(t,n,r){if("Symbol("===String(n).slice(0,7)&&(n="["+String(n).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),r&&r.getter&&(n="get "+n),r&&r.setter&&(n="set "+n),(!i(t,"name")||u&&t.name!==n)&&l(t,"name",{value:n,configurable:!0}),v&&r&&i(r,"arity")&&t.length!==r.arity&&l(t,"length",{value:r.arity}),r&&i(r,"constructor")&&r.constructor){if(c)try{l(t,"prototype",{writable:!1})}catch(t){}}else t.prototype=void 0;var e=s(t);return i(e,"source")||(e.source=d.join("string"==typeof n?n:"")),t};Function.prototype.toString=h((function(){return o(this)&&p(this).source||a(this)}),"toString")},function(t,n,r){var e=r(0),o=r(1),i=r(31),c=e.WeakMap;t.exports=o(c)&&/native code/.test(i(c))},function(t,n,r){var e=r(9),o=r(2),i=r(65),c=r(92),u=r(10),a=o([].concat);t.exports=e("Reflect","ownKeys")||function(t){var n=i.f(u(t)),r=c.f;return r?a(n,r(t)):n}},function(t,n,r){var e=r(45),o=Math.max,i=Math.min;t.exports=function(t,n){var r=e(t);return r<0?o(r+n,0):i(r,n)}},function(t,n,r){var e=r(45),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,r){var e=r(3);t.exports=!e((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},function(t,n,r){var e=r(0),o=r(1),i=e.String,c=e.TypeError;t.exports=function(t){if("object"==typeof t||o(t))return t;throw c("Can't set "+i(t)+" as a prototype")}},function(t,n,r){var e=r(7),o=r(62),i=r(14),c=r(10),u=r(20),a=r(96);n.f=e&&!o?Object.defineProperties:function(t,n){c(t);for(var r,e=u(n),o=a(n),f=o.length,s=0;f>s;)i.f(t,r=o[s++],e[r]);return t}},function(t,n,r){var e=r(66),o=r(46);t.exports=Object.keys||function(t){return e(t,o)}},function(t,n,r){var e=r(2),o=Error,i=e("".replace),c=String(o("zxcasd").stack),u=/\n\s*at [^:]*:[^\n]*/,a=u.test(c);t.exports=function(t,n){if(a&&"string"==typeof t&&!o.prepareStackTrace)for(;n--;)t=i(t,u,"");return t}},function(t,n,r){var e=r(11),o=r(17);t.exports=function(t,n){e(n)&&"cause"in n&&o(t,"cause",n.cause)}},function(t,n,r){var e=r(4),o=r(23),i=e("iterator"),c=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||c[i]===t)}},function(t,n,r){var e=r(0),o=r(5),i=r(12),c=r(10),u=r(30),a=r(70),f=e.TypeError;t.exports=function(t,n){var r=arguments.length<2?a(t):n;if(i(r))return c(o(r,t));throw f(u(t)+" is not iterable")}},function(t,n,r){var e=r(5),o=r(10),i=r(39);t.exports=function(t,n,r){var c,u;o(t);try{if(!(c=i(t,"return"))){if("throw"===n)throw r;return r}c=e(c,t)}catch(t){u=!0,c=t}if("throw"===n)throw r;if(u)throw c;return o(c),r}},function(t,n,r){var e=r(36);t.exports=function(t,n){return void 0===t?arguments.length<2?"":n:e(t)}},function(t,n,r){var e=r(3),o=r(19);t.exports=!e((function(){var t=Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",o(1,7)),7!==t.stack)}))},function(t,n,r){"use strict";var e=r(20),o=r(71),i=r(23),c=r(32),u=r(14).f,a=r(72),f=r(13),s=r(7),p="Array Iterator",l=c.set,v=c.getterFor(p);t.exports=a(Array,"Array",(function(t,n){l(this,{type:p,target:e(t),index:0,kind:n})}),(function(){var t=v(this),n=t.target,r=t.kind,e=t.index++;return!n||e>=n.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:e,done:!1}:"values"==r?{value:n[e],done:!1}:{value:[e,n[e]],done:!1}}),"values");var d=i.Arguments=i.Array;if(o("keys"),o("values"),o("entries"),!f&&s&&"values"!==d.name)try{u(d,"name",{value:"values"})}catch(t){}},function(t,n,r){"use strict";var e=r(73).IteratorPrototype,o=r(34),i=r(19),c=r(51),u=r(23),a=function(){return this};t.exports=function(t,n,r,f){var s=n+" Iterator";return t.prototype=o(e,{next:i(+!f,r)}),c(t,s,!1,!0),u[s]=a,t}},function(t,n,r){var e=r(50),o=r(15),i=r(107);e||o(Object.prototype,"toString",i,{unsafe:!0})},function(t,n,r){"use strict";var e=r(50),o=r(35);t.exports=e?{}.toString:function(){return"[object "+o(this)+"]"}},function(t,n,r){r(109),r(123),r(125),r(126),r(127),r(128)},function(t,n,r){"use strict";var e,o,i,c=r(6),u=r(13),a=r(52),f=r(0),s=r(5),p=r(15),l=r(33),v=r(51),d=r(110),h=r(12),y=r(1),g=r(11),m=r(111),b=r(74),x=r(75).set,w=r(117),O=r(120),S=r(24),E=r(121),j=r(32),T=r(18),P=r(25),I=r(16),R="Promise",A=P.CONSTRUCTOR,C=P.REJECTION_EVENT,N=P.SUBCLASSING,_=j.getterFor(R),k=j.set,F=T&&T.prototype,D=T,M=F,U=f.TypeError,L=f.document,G=f.process,$=I.f,K=$,B=!!(L&&L.createEvent&&f.dispatchEvent),z="unhandledrejection",V=function(t){var n;return!(!g(t)||!y(n=t.then))&&n},W=function(t,n){var r,e,o,i=n.value,c=1==n.state,u=c?t.ok:t.fail,a=t.resolve,f=t.reject,p=t.domain;try{u?(c||(2===n.rejection&&H(n),n.rejection=1),!0===u?r=i:(p&&p.enter(),r=u(i),p&&(p.exit(),o=!0)),r===t.promise?f(U("Promise-chain cycle")):(e=V(r))?s(e,r,a,f):a(r)):f(i)}catch(t){p&&!o&&p.exit(),f(t)}},Y=function(t,n){t.notified||(t.notified=!0,w((function(){for(var r,e=t.reactions;r=e.get();)W(r,t);t.notified=!1,n&&!t.rejection&&q(t)})))},X=function(t,n,r){var e,o;B?((e=L.createEvent("Event")).promise=n,e.reason=r,e.initEvent(t,!1,!0),f.dispatchEvent(e)):e={promise:n,reason:r},!C&&(o=f["on"+t])?o(e):t===z&&O("Unhandled promise rejection",r)},q=function(t){s(x,f,(function(){var n,r=t.facade,e=t.value;if(J(t)&&(n=S((function(){a?G.emit("unhandledRejection",e,r):X(z,r,e)})),t.rejection=a||J(t)?2:1,n.error))throw n.value}))},J=function(t){return 1!==t.rejection&&!t.parent},H=function(t){s(x,f,(function(){var n=t.facade;a?G.emit("rejectionHandled",n):X("rejectionhandled",n,t.value)}))},Q=function(t,n,r){return function(e){t(n,e,r)}},Z=function(t,n,r){t.done||(t.done=!0,r&&(t=r),t.value=n,t.state=2,Y(t,!0))},tt=function(t,n,r){if(!t.done){t.done=!0,r&&(t=r);try{if(t.facade===n)throw U("Promise can't be resolved itself");var e=V(n);e?w((function(){var r={done:!1};try{s(e,n,Q(tt,r,t),Q(Z,r,t))}catch(n){Z(r,n,t)}})):(t.value=n,t.state=1,Y(t,!1))}catch(n){Z({done:!1},n,t)}}};if(A&&(M=(D=function(t){m(this,M),h(t),s(e,this);var n=_(this);try{t(Q(tt,n),Q(Z,n))}catch(t){Z(n,t)}}).prototype,(e=function(t){k(this,{type:R,done:!1,notified:!1,parent:!1,reactions:new E,rejection:!1,state:0,value:void 0})}).prototype=p(M,"then",(function(t,n){var r=_(this),e=$(b(this,D));return r.parent=!0,e.ok=!y(t)||t,e.fail=y(n)&&n,e.domain=a?G.domain:void 0,0==r.state?r.reactions.add(e):w((function(){W(e,r)})),e.promise})),o=function(){var t=new e,n=_(t);this.promise=t,this.resolve=Q(tt,n),this.reject=Q(Z,n)},I.f=$=function(t){return t===D||undefined===t?new o(t):K(t)},!u&&y(T)&&F!==Object.prototype)){i=F.then,N||p(F,"then",(function(t,n){var r=this;return new D((function(t,n){s(i,r,t,n)})).then(t,n)}),{unsafe:!0});try{delete F.constructor}catch(t){}l&&l(F,M)}c({global:!0,constructor:!0,wrap:!0,forced:A},{Promise:D}),v(D,R,!1,!0),d(R)},function(t,n,r){"use strict";var e=r(9),o=r(14),i=r(4),c=r(7),u=i("species");t.exports=function(t){var n=e(t),r=o.f;c&&n&&!n[u]&&r(n,u,{configurable:!0,get:function(){return this}})}},function(t,n,r){var e=r(0),o=r(21),i=e.TypeError;t.exports=function(t,n){if(o(n,t))return t;throw i("Incorrect invocation")}},function(t,n,r){var e=r(0),o=r(113),i=r(30),c=e.TypeError;t.exports=function(t){if(o(t))return t;throw c(i(t)+" is not a constructor")}},function(t,n,r){var e=r(2),o=r(3),i=r(1),c=r(35),u=r(9),a=r(31),f=function(){},s=[],p=u("Reflect","construct"),l=/^\s*(?:class|function)\b/,v=e(l.exec),d=!l.exec(f),h=function(t){if(!i(t))return!1;try{return p(f,s,t),!0}catch(t){return!1}},y=function(t){if(!i(t))return!1;switch(c(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return d||!!v(l,a(t))}catch(t){return!0}};y.sham=!0,t.exports=!p||o((function(){var t;return h(h.call)||!h(Object)||!h((function(){t=!0}))||t}))?y:h},function(t,n,r){var e=r(27),o=Function.prototype,i=o.apply,c=o.call;t.exports="object"==typeof Reflect&&Reflect.apply||(e?c.bind(i):function(){return c.apply(i,arguments)})},function(t,n,r){var e=r(2);t.exports=e([].slice)},function(t,n,r){var e=r(0).TypeError;t.exports=function(t,n){if(t<n)throw e("Not enough arguments");return t}},function(t,n,r){var e,o,i,c,u,a,f,s,p=r(0),l=r(49),v=r(26).f,d=r(75).set,h=r(76),y=r(118),g=r(119),m=r(52),b=p.MutationObserver||p.WebKitMutationObserver,x=p.document,w=p.process,O=p.Promise,S=v(p,"queueMicrotask"),E=S&&S.value;E||(e=function(){var t,n;for(m&&(t=w.domain)&&t.exit();o;){n=o.fn,o=o.next;try{n()}catch(t){throw o?c():i=void 0,t}}i=void 0,t&&t.enter()},h||m||g||!b||!x?!y&&O&&O.resolve?((f=O.resolve(void 0)).constructor=O,s=l(f.then,f),c=function(){s(e)}):m?c=function(){w.nextTick(e)}:(d=l(d,p),c=function(){d(e)}):(u=!0,a=x.createTextNode(""),new b(e).observe(a,{characterData:!0}),c=function(){a.data=u=!u})),t.exports=E||function(t){var n={fn:t,next:void 0};i&&(i.next=n),o||(o=n,c()),i=n}},function(t,n,r){var e=r(29),o=r(0);t.exports=/ipad|iphone|ipod/i.test(e)&&void 0!==o.Pebble},function(t,n,r){var e=r(29);t.exports=/web0s(?!.*chrome)/i.test(e)},function(t,n,r){var e=r(0);t.exports=function(t,n){var r=e.console;r&&r.error&&(1==arguments.length?r.error(t):r.error(t,n))}},function(t,n){var r=function(){this.head=null,this.tail=null};r.prototype={add:function(t){var n={item:t,next:null};this.head?this.tail.next=n:this.head=n,this.tail=n},get:function(){var t=this.head;if(t)return this.head=t.next,this.tail===t&&(this.tail=null),t.item}},t.exports=r},function(t,n){t.exports="object"==typeof window&&"object"!=typeof Deno},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(12),c=r(16),u=r(24),a=r(22);e({target:"Promise",stat:!0,forced:r(77)},{all:function(t){var n=this,r=c.f(n),e=r.resolve,f=r.reject,s=u((function(){var r=i(n.resolve),c=[],u=0,s=1;a(t,(function(t){var i=u++,a=!1;s++,o(r,n,t).then((function(t){a||(a=!0,c[i]=t,--s||e(c))}),f)})),--s||e(c)}));return s.error&&f(s.value),r.promise}})},function(t,n,r){var e=r(4)("iterator"),o=!1;try{var i=0,c={next:function(){return{done:!!i++}},return:function(){o=!0}};c[e]=function(){return this},Array.from(c,(function(){throw 2}))}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var r=!1;try{var i={};i[e]=function(){return{next:function(){return{done:r=!0}}}},t(i)}catch(t){}return r}},function(t,n,r){"use strict";var e=r(6),o=r(13),i=r(25).CONSTRUCTOR,c=r(18),u=r(9),a=r(1),f=r(15),s=c&&c.prototype;if(e({target:"Promise",proto:!0,forced:i,real:!0},{catch:function(t){return this.then(void 0,t)}}),!o&&a(c)){var p=u("Promise").prototype.catch;s.catch!==p&&f(s,"catch",p,{unsafe:!0})}},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(12),c=r(16),u=r(24),a=r(22);e({target:"Promise",stat:!0,forced:r(77)},{race:function(t){var n=this,r=c.f(n),e=r.reject,f=u((function(){var c=i(n.resolve);a(t,(function(t){o(c,n,t).then(r.resolve,e)}))}));return f.error&&e(f.value),r.promise}})},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(16);e({target:"Promise",stat:!0,forced:r(25).CONSTRUCTOR},{reject:function(t){var n=i.f(this);return o(n.reject,void 0,t),n.promise}})},function(t,n,r){"use strict";var e=r(6),o=r(9),i=r(13),c=r(18),u=r(25).CONSTRUCTOR,a=r(78),f=o("Promise"),s=i&&!u;e({target:"Promise",stat:!0,forced:i||u},{resolve:function(t){return a(s&&this===f?c:this,t)}})},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(12),c=r(16),u=r(24),a=r(22);e({target:"Promise",stat:!0},{allSettled:function(t){var n=this,r=c.f(n),e=r.resolve,f=r.reject,s=u((function(){var r=i(n.resolve),c=[],u=0,f=1;a(t,(function(t){var i=u++,a=!1;f++,o(r,n,t).then((function(t){a||(a=!0,c[i]={status:"fulfilled",value:t},--f||e(c))}),(function(t){a||(a=!0,c[i]={status:"rejected",reason:t},--f||e(c))}))})),--f||e(c)}));return s.error&&f(s.value),r.promise}})},function(t,n,r){"use strict";var e=r(6),o=r(5),i=r(12),c=r(9),u=r(16),a=r(24),f=r(22),s="No one promise resolved";e({target:"Promise",stat:!0},{any:function(t){var n=this,r=c("AggregateError"),e=u.f(n),p=e.resolve,l=e.reject,v=a((function(){var e=i(n.resolve),c=[],u=0,a=1,v=!1;f(t,(function(t){var i=u++,f=!1;a++,o(e,n,t).then((function(t){f||v||(v=!0,p(t))}),(function(t){f||v||(f=!0,c[i]=t,--a||l(new r(c,s)))}))})),--a||l(new r(c,s))}));return v.error&&l(v.value),e.promise}})},function(t,n,r){"use strict";var e=r(6),o=r(13),i=r(18),c=r(3),u=r(9),a=r(1),f=r(74),s=r(78),p=r(15),l=i&&i.prototype;if(e({target:"Promise",proto:!0,real:!0,forced:!!i&&c((function(){l.finally.call({then:function(){}},(function(){}))}))},{finally:function(t){var n=f(this,u("Promise")),r=a(t);return this.then(r?function(r){return s(n,t()).then((function(){return r}))}:t,r?function(r){return s(n,t()).then((function(){throw r}))}:t)}}),!o&&a(i)){var v=u("Promise").prototype.finally;l.finally!==v&&p(l,"finally",v,{unsafe:!0})}},function(t,n,r){"use strict";var e=r(133).charAt,o=r(36),i=r(32),c=r(72),u="String Iterator",a=i.set,f=i.getterFor(u);c(String,"String",(function(t){a(this,{type:u,string:o(t),index:0})}),(function(){var t,n=f(this),r=n.string,o=n.index;return o>=r.length?{value:void 0,done:!0}:(t=e(r,o),n.index+=t.length,{value:t,done:!1})}))},function(t,n,r){var e=r(2),o=r(45),i=r(36),c=r(28),u=e("".charAt),a=e("".charCodeAt),f=e("".slice),s=function(t){return function(n,r){var e,s,p=i(c(n)),l=o(r),v=p.length;return l<0||l>=v?t?"":void 0:(e=a(p,l))<55296||e>56319||l+1===v||(s=a(p,l+1))<56320||s>57343?t?u(p,l):e:t?f(p,l,l+2):s-56320+(e-55296<<10)+65536}};t.exports={codeAt:s(!1),charAt:s(!0)}},function(t,n,r){var e=r(0);t.exports=e},function(t,n,r){"use strict";var e=r(6),o=r(67).includes,i=r(3),c=r(71);e({target:"Array",proto:!0,forced:i((function(){return!Array(1).includes()}))},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),c("includes")},function(t,n,r){"use strict";var e=r(7),o=r(0),i=r(2),c=r(47),u=r(15),a=r(8),f=r(137),s=r(21),p=r(38),l=r(54),v=r(3),d=r(65).f,h=r(26).f,y=r(14).f,g=r(138),m=r(139).trim,b="Number",x=o.Number,w=x.prototype,O=o.TypeError,S=i("".slice),E=i("".charCodeAt),j=function(t){var n=l(t,"number");return"bigint"==typeof n?n:T(n)},T=function(t){var n,r,e,o,i,c,u,a,f=l(t,"number");if(p(f))throw O("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=m(f),43===(n=E(f,0))||45===n){if(88===(r=E(f,2))||120===r)return NaN}else if(48===n){switch(E(f,1)){case 66:case 98:e=2,o=49;break;case 79:case 111:e=8,o=55;break;default:return+f}for(c=(i=S(f,2)).length,u=0;u<c;u++)if((a=E(i,u))<48||a>o)return NaN;return parseInt(i,e)}return+f};if(c(b,!x(" 0o1")||!x("0b1")||x("+0x1"))){for(var P,I=function(t){var n=arguments.length<1?0:x(j(t)),r=this;return s(w,r)&&v((function(){g(r)}))?f(Object(n),r,I):n},R=e?d(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;R.length>A;A++)a(x,P=R[A])&&!a(I,P)&&y(I,P,h(x,P));I.prototype=w,w.constructor=I,u(o,b,I,{constructor:!0})}},function(t,n,r){var e=r(1),o=r(11),i=r(33);t.exports=function(t,n,r){var c,u;return i&&e(c=n.constructor)&&c!==r&&o(u=c.prototype)&&u!==r.prototype&&i(t,u),t}},function(t,n,r){var e=r(2);t.exports=e(1..valueOf)},function(t,n,r){var e=r(2),o=r(28),i=r(36),c=r(140),u=e("".replace),a="["+c+"]",f=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),p=function(t){return function(n){var r=i(o(n));return 1&t&&(r=u(r,f,"")),2&t&&(r=u(r,s,"")),r}};t.exports={start:p(1),end:p(2),trim:p(3)}},function(t,n){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,n,r){"use strict";r.r(n);var e;r(135),r(136);function o(t,n){t.onload=function(){this.onerror=this.onload=null,n(null,t)},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+this.src),t)}}function i(t,n){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,n(null,t))}}function c(t,n){return"CKEDITOR"in window?Promise.resolve(CKEDITOR):"string"!=typeof t||t.length<1?Promise.reject(new TypeError("CKEditor URL must be a non-empty string.")):(e||(e=c.scriptLoader(t).then((function(t){return n&&n(t),t}))),e)}c.scriptLoader=function(t){return new Promise((function(n,r){!function(t,n,r){var e=document.head||document.getElementsByTagName("head")[0],c=document.createElement("script");"function"==typeof n&&(r=n,n={}),n=n||{},r=r||function(){},c.type=n.type||"text/javascript",c.charset=n.charset||"utf8",c.async=!("async"in n)||!!n.async,c.src=t,n.attrs&&function(t,n){for(var r in n)t.setAttribute(r,n[r])}(c,n.attrs),n.text&&(c.text=String(n.text)),("onload"in c?o:i)(c,r),c.onload||o(c,r),e.appendChild(c)}(t,(function(t){return e=void 0,t?r(t):window.CKEDITOR?void n(CKEDITOR):r(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace."))}))}))};var u={name:"ckeditor",render:function(t){return t("div",{},[t(this.tagName)])},props:{value:{type:String,default:""},type:{type:String,default:"classic",validator:function(t){return["classic","inline"].includes(t)}},editorUrl:{type:String,default:"https://cdn.ckeditor.com/4.20.0/standard-all/ckeditor.js"},config:{type:Object,default:function(){}},tagName:{type:String,default:"textarea"},readOnly:{type:Boolean,default:null},throttle:{type:Number,default:80}},mounted:function(){var t=this;c(this.editorUrl,(function(n){t.$emit("namespaceloaded",n)})).then((function(){if(!t.$_destroyed){var n=t.prepareConfig(),r="inline"===t.type?"inline":"replace",e=t.$el.firstElementChild;CKEDITOR[r](e,n)}}))},beforeDestroy:function(){this.instance&&this.instance.destroy(),this.$_destroyed=!0},watch:{value:function(t){this.instance&&this.instance.getData()!==t&&this.instance.setData(t)},readOnly:function(t){this.instance&&this.instance.setReadOnly(t)}},methods:{prepareConfig:function(){var t=this,n=this.config||{};n.on=n.on||{},void 0===n.delayIfDetached&&(n.delayIfDetached=!0),null!==this.readOnly&&(n.readOnly=this.readOnly);var r=n.on.instanceReady;return n.on.instanceReady=function(n){t.instance=n.editor,t.$nextTick().then((function(){t.prepareComponentData(),r&&r(n)}))},n},prepareComponentData:function(){var t=this,n=this.value;this.instance.fire("lockSnapshot"),this.instance.setData(n,{callback:function(){t.$_setUpEditorEvents();var r=t.instance.getData();n!==r?(t.$once("input",(function(){t.$emit("ready",t.instance)})),t.$emit("input",r)):t.$emit("ready",t.instance),t.instance.fire("unlockSnapshot")}})},$_setUpEditorEvents:function(){var t=this,n=this.instance,r=function(t,n){var r,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(){clearTimeout(r);for(var o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];r=setTimeout(t.bind.apply(t,[e].concat(i)),n)}}((function(r){var e=n.getData();t.value!==e&&t.$emit("input",e,r,n)}),this.throttle);n.on("change",r),n.on("focus",(function(r){t.$emit("focus",r,n)})),n.on("blur",(function(r){t.$emit("blur",r,n)}))}}},a={install:function(t){t.component("ckeditor",u)},component:u};n.default=a}]).default}));
//# sourceMappingURL=legacy.js.map