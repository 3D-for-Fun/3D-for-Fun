(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{484:function(t,e,a){},563:function(t,e,a){"use strict";a(484)},569:function(t,e,a){"use strict";a.r(e);a(30),a(65);var s=[{name:"BIMV 福州展会",desc:"BIMV 福州展会演示Demo",link:"http://47.101.59.71/demo/",thumbnail:"/image/example/bimv-demo.png"}],n={data:function(){return{examplesData:s,currentPage:1}},computed:{currentPageData:function(){var t=9*(this.currentPage-1),e=9*this.currentPage;return this.examplesData.slice(t,e)}},methods:{getCurrentPage:function(t){this.currentPage=t,setTimeout((function(){window.scrollTo(0,0)}),100)}}},r=(a(563),a(4)),i=Object(r.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"theme-example"},[a("div",{staticClass:"blog-list-wrapper"},t._l(t.currentPageData,(function(e,s){return a("Card",{key:e.name,staticClass:"blog-item"},[a("template",{slot:"front"},[a("img",{staticClass:"thumbnail",attrs:{src:e.thumbnail,alt:"缩略图"}})]),t._v(" "),a("template",{slot:"back"},[a("div",{staticClass:"info"},[a("h4",{staticClass:"title"},[t._v(t._s(e.name))]),t._v(" "),a("p",{staticClass:"desc"},[t._v(t._s(e.desc))]),t._v(" "),a("a",{staticClass:"btn",attrs:{target:"blank",href:e.link}},[t._v("跳转")])])])],2)})),1),t._v(" "),a("pagation",{staticClass:"pagation",attrs:{total:t.examplesData.length,currentPage:t.currentPage,perPage:9},on:{getCurrentPage:t.getCurrentPage}})],1)}),[],!1,null,"0a23c202",null);e.default=i.exports}}]);