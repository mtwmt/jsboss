(function(t){function e(e){for(var r,s,c=e[0],o=e[1],u=e[2],l=0,f=[];l<c.length;l++)s=c[l],i[s]&&f.push(i[s][0]),i[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);d&&d(e);while(f.length)f.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,c=1;c<a.length;c++){var o=a[c];0!==i[o]&&(r=!1)}r&&(n.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},i={newtab:0},n=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var d=o;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("7a64")},"0466":function(t,e,a){},"314e":function(t,e,a){"use strict";var r=a("fd61"),i=a.n(r);i.a},7739:function(t,e,a){},"7a64":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main",class:{"is-active":t.edit,dark:t.dark}},[a("Container"),a("Control"),a("Sidebar")],1)},n=[],s=a("cebc"),c=a("2f62"),o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},u=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"layer"},[a("div",{staticClass:"bg",staticStyle:{"background-image":"url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')"}}),a("div",{staticClass:"blank"})])])}],d={name:"Container"},l=d,f=(a("314e"),a("2877")),p=Object(f["a"])(l,o,u,!1,null,null,null),v=p.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"control"},[a("i",{staticClass:"icon fas fa-bars",on:{click:t.isActive}}),t.edit?t._e():a("div",{attrs:{data:"checkbox-switch"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.dark,expression:"dark"}],attrs:{type:"checkbox",id:"switch1",value:"true"},domProps:{checked:Array.isArray(t.dark)?t._i(t.dark,"true")>-1:t.dark},on:{change:function(e){var a=t.dark,r=e.target,i=!!r.checked;if(Array.isArray(a)){var n="true",s=t._i(a,n);r.checked?s<0&&(t.dark=a.concat([n])):s>-1&&(t.dark=a.slice(0,s).concat(a.slice(s+1)))}else t.dark=i}}}),a("label",{attrs:{for:"switch1"}})]),t._m(0)])},h=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"quote"},[a("div",{staticClass:"quote-text"}),a("div",{staticClass:"quote-add"},[a("div",{staticClass:"tit"},[t._v("“新增語錄”")]),a("input",{attrs:{type:"text",placeholder:""}}),a("button",[t._v("+")])])])}],m={name:"Control",props:[],data:function(){return{}},computed:Object(s["a"])({},Object(c["b"])(["edit","dark"]),{dark:{get:function(){return this.$store.state.dark},set:function(t){this.$store.commit("updateDark",t)}}}),methods:{isActive:function(){this.edit?this.$store.commit("updateEdit",!1):this.$store.commit("updateEdit",!0)}}},k=m,_=(a("b15b"),Object(f["a"])(k,b,h,!1,null,null,null)),y=_.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar"},[a("i",{staticClass:"icon fas fa-arrow-right",on:{click:t.isActive}}),a("div",{staticClass:"sidebar-block"},[a("div",{staticClass:"col"},[a("div",{staticClass:"tit"},[t._v("夜間模式")]),a("div",{attrs:{data:"checkbox-switch"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.dark,expression:"dark"}],attrs:{type:"checkbox",id:"switch2",value:"true"},domProps:{checked:Array.isArray(t.dark)?t._i(t.dark,"true")>-1:t.dark},on:{change:function(e){var a=t.dark,r=e.target,i=!!r.checked;if(Array.isArray(a)){var n="true",s=t._i(a,n);r.checked?s<0&&(t.dark=a.concat([n])):s>-1&&(t.dark=a.slice(0,s).concat(a.slice(s+1)))}else t.dark=i}}}),a("label",{attrs:{for:"switch2"}})])])]),t._m(0)])},g=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar-block"},[a("label",[t._v("我的語錄")]),a("ul",[a("li",[a("span",[t._v("路，就是一條直直的")]),a("span",{staticClass:"fn"},[a("i",{staticClass:"edit fas fa-pen"}),a("i",{staticClass:"del fas fa-trash"})])])]),a("p",[a("a",{staticClass:"more",attrs:{href:""}},[t._v("載入更多")])])])}],w={name:"Sidebar",props:[],data:function(){return{}},computed:Object(s["a"])({},Object(c["b"])(["edit","dark"]),{dark:{get:function(){return this.$store.state.dark},set:function(t){this.$store.commit("updateDark",t)}}}),methods:{isActive:function(){this.edit?this.$store.commit("updateEdit",!1):this.$store.commit("updateEdit",!0)}}},x=w,O=(a("f203"),Object(f["a"])(x,C,g,!1,null,null,null)),j=O.exports,$={name:"app",components:{Container:v,Control:y,Sidebar:j},computed:Object(s["a"])({},Object(c["b"])(["edit","dark"])),created:function(){}},E=$,A=(a("9c3d"),Object(f["a"])(E,i,n,!1,null,null,null)),S=A.exports,P=a("c0d6");r["a"].config.productionTip=!1,new r["a"]({store:P["a"],render:function(t){return t(S)}}).$mount("#app")},"86ae":function(t,e,a){},"9c3d":function(t,e,a){"use strict";var r=a("86ae"),i=a.n(r);i.a},b15b:function(t,e,a){"use strict";var r=a("7739"),i=a.n(r);i.a},c0d6:function(t,e,a){"use strict";var r=a("2b0e"),i=a("2f62");r["a"].use(i["a"]);var n=new i["a"].Store({state:{edit:!1,dark:!1},mutations:{updateEdit:function(t,e){return t.edit=e},updateDark:function(t,e){return t.dark=e}},actions:{}});e["a"]=n},f203:function(t,e,a){"use strict";var r=a("0466"),i=a.n(r);i.a},fd61:function(t,e,a){}});
//# sourceMappingURL=newtab.173bff4f.js.map