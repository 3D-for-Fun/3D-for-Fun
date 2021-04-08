(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{596:function(t,e,s){"use strict";s.r(e);var a=s(4),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"project-encryption"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#project-encryption"}},[t._v("#")]),t._v(" Project Encryption")]),t._v(" "),s("h3",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),s("p",[t._v("If the project is private and does not want to be made public, the content page can only be accessed after the key is logged in (the login will no longer be effective after closing the browser tab). You can set multiple passwords by setting "),s("code",[t._v("keys")]),t._v(" in the format of the array. The value of the array must be a string.")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .vuepress/config.js")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  theme"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'reco'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  themeConfig"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// secret key")]),t._v("\n    keyPage"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      keys"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'32-bit md5 secret key'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// should set to md5 secret key after version 1.3.0")]),t._v("\n      color"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#42b983'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The color of the login page animation ball")]),t._v("\n      lineColor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#42b983'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The color of the login page animation line")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br")])]),s("h3",{attrs:{id:"set-secret-key"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#set-secret-key"}},[t._v("#")]),t._v(" Set Secret Key "),s("Badge",{attrs:{text:"1.3.0+"}})],1),t._v(" "),s("p",[t._v("If you password is "),s("code",[t._v("123456")]),t._v(", then set the "),s("code",[t._v("keys")]),t._v(" field to its 32-bit md5 secret key: "),s("code",[t._v("e10adc3949ba59abbe56e057f20f883e")]),t._v(". After the blog is published, input the password "),s("code",[t._v("123456")]),t._v(" to enter. Others will not know your password through your secret key, but you have to remember it.")]),t._v(" "),s("p",[t._v("Please input password in the following textbox to obtain the corresponding 32-bit md5 secret key:\n"),s("md5")],1),t._v(" "),s("h3",{attrs:{id:"absolute-encryption"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#absolute-encryption"}},[t._v("#")]),t._v(" Absolute encryption "),s("Badge",{attrs:{text:"1.1.2+"}})],1),t._v(" "),s("p",[t._v("The default encryption method for the project is to locate the encrypted page above the actual content, so this encryption function itself has no real effect.")]),t._v(" "),s("p",[t._v("If you need absolute encryption, you need to set "),s("code",[t._v("absoluteEncryption: true")]),t._v(", but this will affect two things:")]),t._v(" "),s("ol",[s("li",[t._v("SSR rendering of the page;")]),t._v(" "),s("li",[t._v("The jump of the anchor point.")])]),t._v(" "),s("h2",{attrs:{id:"article-encryption"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#article-encryption"}},[t._v("#")]),t._v(" Article Encryption")]),t._v(" "),s("p",[t._v("If the project is public and some articles may need to be encrypted, you need to set "),s("code",[t._v("keys")]),t._v(" in "),s("code",[t._v("frontmatter")]),t._v(" in an array format. You can set multiple passwords. The value of the array must be a string.")]),t._v(" "),s("div",{staticClass:"language-yaml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" vuepress"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("theme"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("reco\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("date")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token datetime number"}},[t._v("2019-04-09")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("author")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" reco_luan\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("keys")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'32-bit md5 secret key'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br")])]),s("div",{staticClass:"custom-block warning"},[s("p",[s("strong",[t._v("Legacy issues with encrypted pages:")]),t._v("\nEncryption cannot be hidden when entering a separate article from a single encrypted article (such as the navigation bar)")])])])}),[],!1,null,null,null);e.default=n.exports}}]);