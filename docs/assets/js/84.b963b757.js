(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{638:function(e,s,v){"use strict";v.r(s);var a=v(4),_=Object(a.a)({},(function(){var e=this,s=e.$createElement,v=e._self._c||s;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h2",{attrs:{id:"背景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[e._v("#")]),e._v(" 背景")]),e._v(" "),v("p",[e._v("大家都知道，"),v("code",[e._v("reco")]),e._v(" 主题是在官方默认主题的基础上开发的，而默认主题本身是为文档量身定做的，并且早期没有一个功能齐全的博客主题，"),v("code",[e._v("reco")]),e._v(" 主题就是在这样一个环境下迅速推出的，来丰富博客该有的功能元素和模块，但是文章的详情页并没有做过太多的调整，如果你在用 "),v("code",[e._v("reco")]),e._v(" 主题来搭建文档，那还 OK，如果是来搭建博客，那文章详情页就会显得有些不搭。")]),e._v(" "),v("h2",{attrs:{id:"目标"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#目标"}},[e._v("#")]),e._v(" 目标")]),e._v(" "),v("p",[e._v("而这个不太搭的元素就是默认的侧边栏。由于单篇文章的侧边栏同自定义侧边栏（文档整合）太相似，单篇文章的展示看起来也很像是文档。所以我在考虑怎么在侧边栏上做出调整，来区分博客和文档？")]),e._v(" "),v("h2",{attrs:{id:"动作"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#动作"}},[e._v("#")]),e._v(" 动作")]),e._v(" "),v("p",[e._v("基于前面的背景和目标，我将自己的想法在 "),v("code",[e._v("1.5.3")]),e._v(" 版本中做了一次尝试：")]),e._v(" "),v("ul",[v("li",[e._v("将原来的侧边栏中的文章的各级标题，抽离出来，生成副侧边栏，展示在文章内容的右侧。")]),e._v(" "),v("li",[e._v("当显示自定义的侧边栏时，主侧边栏只展示文章题目，不再展示各级标题，各级标题将由副侧边栏去负责。")]),e._v(" "),v("li",[e._v("如果是普通文章，只展示副侧边栏，不会再去展示左侧的主侧边栏。")])]),e._v(" "),v("h2",{attrs:{id:"约定"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#约定"}},[e._v("#")]),e._v(" 约定")]),e._v(" "),v("p",[e._v("上面的动作似乎已经达到了预期，在内容展示上也不再略显空旷。但是我还是想和大家聊一下 "),v("code",[e._v("reco")]),e._v(" 主题是怎么处理 markdown 数据的，进而约定一下如何处理文档的存放位置和 "),v("code",[e._v("front-matter")]),e._v("，来让主题更好地为你服务。")]),e._v(" "),v("p",[v("code",[e._v("reco")]),e._v(" 主题首先会获取设置了 "),v("code",[e._v("categories")]),e._v(" 文章数据，再过滤掉没有设置 "),v("code",[e._v("title")]),e._v("、"),v("code",[e._v("publush === false")]),e._v(" 和 "),v("code",[e._v("home: true")]),e._v(" 的文章，这样就形成了博客的数据，将其定义为 "),v("code",[e._v("$recoPosts")]),e._v("。")]),e._v(" "),v("p",[e._v("而时间轴的数据，就是在 "),v("code",[e._v("$recoPosts")]),e._v(" 的基础上过滤掉没有设置 "),v("code",[e._v("date")]),e._v(" 的文章，再按照时间做一些排序整合。")]),e._v(" "),v("p",[e._v("所以你会发现，"),v("code",[e._v("front-matter")]),e._v(" 的一些设置仅对博客有效，对于自定义侧边栏其实是没有作用的。其实 "),v("code",[e._v("reco")]),e._v(" 主题是这样来思考的文档和博客的区别的：")]),e._v(" "),v("ul",[v("li",[e._v("博文是一篇篇独立的文章，它需要 "),v("code",[e._v("author")]),e._v("、"),v("code",[e._v("date")]),e._v("、"),v("code",[e._v("categories")]),e._v("、"),v("code",[e._v("tags")]),e._v(" 等这些元素，所以如果你希望它正常显示，一定要设置 "),v("code",[e._v("title")]),e._v("、"),v("code",[e._v("categories")]),e._v("。")]),e._v(" "),v("li",[e._v("文档是通过侧边栏将其约束在一起才有意义的一类文章，所以侧边栏的数据，不会去过滤它的 "),v("code",[e._v("date")]),e._v("、"),v("code",[e._v("categories")]),e._v("、"),v("code",[e._v("publush")]),e._v(" 的。")])]),e._v(" "),v("p",[e._v("如果你希望和主题官网一样既有文档和又有博客，可以这样来存放你的文件：")]),e._v(" "),v("div",{staticClass:"language-bash line-numbers-mode"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[e._v("├── .vuepress -------- vuepress 配置文件夹\n├── docs ------------- 存放文档的位置\n│   ├── vue ------------ vue 相关文档\n│   ├── react ---------- react 相关文档\n│   └── webpack -------- webpack 相关文档\n├── blogs ------------ 存放博客的位置\n│   ├── html ----------- 分类 html\n│   ├── css ------------ 分类 css\n│   └── js ------------- 分类 js\n├── README.md -------- 首页\n└── package.json ----- package.json\n")])]),e._v(" "),v("div",{staticClass:"line-numbers-wrapper"},[v("span",{staticClass:"line-number"},[e._v("1")]),v("br"),v("span",{staticClass:"line-number"},[e._v("2")]),v("br"),v("span",{staticClass:"line-number"},[e._v("3")]),v("br"),v("span",{staticClass:"line-number"},[e._v("4")]),v("br"),v("span",{staticClass:"line-number"},[e._v("5")]),v("br"),v("span",{staticClass:"line-number"},[e._v("6")]),v("br"),v("span",{staticClass:"line-number"},[e._v("7")]),v("br"),v("span",{staticClass:"line-number"},[e._v("8")]),v("br"),v("span",{staticClass:"line-number"},[e._v("9")]),v("br"),v("span",{staticClass:"line-number"},[e._v("10")]),v("br"),v("span",{staticClass:"line-number"},[e._v("11")]),v("br")])])])}),[],!1,null,null,null);s.default=_.exports}}]);