<<<<<<< HEAD:docs/assets/js/60.8641b5ea.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{629:function(e,t,s){"use strict";s.r(t);var o=s(4),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",[e._v("We have collected some usual questions here. If you don't find the answer you want here, please read "),s("code",[e._v("VuePress")]),e._v("' "),s("a",{attrs:{href:"https://v1.vuepress.vuejs.org/theme/default-theme-config.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("default theme config"),s("OutboundLink")],1),e._v(". As final resort, you could post an "),s("a",{attrs:{href:"https://github.com/vuepress-reco/vuepress-theme-reco/issues",target:"_blank",rel:"noopener noreferrer"}},[e._v("issue on GitHub"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("p",[e._v("Please note that this theme includes almost all features from "),s("code",[e._v("VuePress")]),e._v("' default theme. Thus, this FAQ only serves to introduce extra features. If you've found some features this site hasn't mentioned, or you want to know some features in default theme, please go to the "),s("a",{attrs:{href:"https://v1.vuepress.vuejs.org/theme/default-theme-config.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("official documentation"),s("OutboundLink")],1),e._v(".")])]),e._v(" "),s("h2",{attrs:{id:"_1-how-to-add-icon-font"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-how-to-add-icon-font"}},[e._v("#")]),e._v(" 1. How to Add "),s("code",[e._v("icon-font")]),e._v("?")]),e._v(" "),s("ol",[s("li",[e._v("Put font files under "),s("code",[e._v("public")]),e._v(" folder, then in "),s("code",[e._v("enhanceApp.js")]),e._v(" import the css file among the font files.")]),e._v(" "),s("li",[e._v("If your "),s("code",[e._v("icon")]),e._v("'s full "),s("code",[e._v("className")]),e._v(" is "),s("code",[e._v('class="iconfont icon-myIcon"')]),e._v(", configure "),s("code",[e._v("icon-font")]),e._v(" as "),s("code",[e._v("{ text: 'Home', link: '/', icon: 'iconfont icon-myIcon' }")]),e._v(".")])]),e._v(" "),s("h2",{attrs:{id:"_2-how-to-show-abstract"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-how-to-show-abstract"}},[e._v("#")]),e._v(" 2. How to Show Abstract?")]),e._v(" "),s("p",[e._v("Anything above "),s("code",[e._v("\x3c!-- more --\x3e")]),e._v(" is the abstract.")]),e._v(" "),s("RecoDemo",{attrs:{collapse:!0}},[s("template",{slot:"code-markdown"},[e._v("\n  <<< @/docs/.vuepress/demo/abstract_en.md\n")])],2),e._v(" "),s("h2",{attrs:{id:"_3-can-the-footer-of-home-page-be-customized"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-can-the-footer-of-home-page-be-customized"}},[e._v("#")]),e._v(" 3. Can the Footer of Home Page Be Customized?")]),e._v(" "),s("p",[e._v("Sorry, you can't.")]),e._v(" "),s("h2",{attrs:{id:"_4-on-the-home-page-how-to-set-the-avatar-in-infobar-on-the-right-and-the-icon-in-navbar-on-the-left"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-on-the-home-page-how-to-set-the-avatar-in-infobar-on-the-right-and-the-icon-in-navbar-on-the-left"}},[e._v("#")]),e._v(" 4. On the Home Page, How to Set the Avatar in Infobar on the Right and the Icon in Navbar on the Left?")]),e._v(" "),s("p",[e._v("The avatar in infobar on the right is configured by "),s("code",[e._v("themeConfig.authorAvatar")]),e._v(" in "),s("code",[e._v(".vuepress/config.js")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// .vuepress/config.js")]),e._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  themeConfig"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    authorAvatar"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/avatar.png'")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("The icon in navbar on the left is configured by "),s("code",[e._v("themeConfig.logo")]),e._v(" in "),s("code",[e._v(".vuepress/config.js")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// .vuepress/config.js")]),e._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  themeConfig"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    logo"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/head.png'")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("Moreover, don't forget to put your pictures in "),s("code",[e._v(".vuepress/public/")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"_5-is-there-any-rule-to-where-to-put-my-blogs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-is-there-any-rule-to-where-to-put-my-blogs"}},[e._v("#")]),e._v(" 5. Is There Any Rule to Where to Put My Blogs?")]),e._v(" "),s("p",[e._v("You could put your blogs anywhere, but have to make sure they are places VuePress could parse. For example, if your command is "),s("code",[e._v("vuepress dev docs")]),e._v(", then position your blogs under "),s("code",[e._v("docs/")]),e._v(". Our theme doesn't force you to put under a specific subdirectory, and you could specify that yourself. Please see "),s("a",{attrs:{href:"https://vuepress.vuejs.org/guide/directory-structure.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("this documentation"),s("OutboundLink")],1),e._v(" for more info on directory structure.")]),e._v(" "),s("h2",{attrs:{id:"_6-how-doesn-t-the-sidebar-show-h1-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-how-doesn-t-the-sidebar-show-h1-title"}},[e._v("#")]),e._v(" 6. How Doesn't the Sidebar Show "),s("code",[e._v("h1")]),e._v(" Title?")]),e._v(" "),s("p",[e._v("In "),s("code",[e._v("vuepress-theme-reco")]),e._v(", Please forgot "),s("code",[e._v("h1")]),e._v(" and instead use "),s("a",{attrs:{href:"https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("frontmatter")]),s("OutboundLink")],1),e._v(" for the title and other article metadata. The main body starts from "),s("code",[e._v("h2")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"_7-how-to-solve-the-issue-of-showing-comments-in-version-1-1-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-how-to-solve-the-issue-of-showing-comments-in-version-1-1-0"}},[e._v("#")]),e._v(" 7. How to Solve the Issue of Showing Comments in Version "),s("code",[e._v("1.1.0")]),e._v("?")]),e._v(" "),s("p",[e._v("This has been solved in version 1.1.0`.")]),e._v(" "),s("h2",{attrs:{id:"_8-how-to-customize-the-comment-section"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-how-to-customize-the-comment-section"}},[e._v("#")]),e._v(" 8. How to Customize the Comment Section?")]),e._v(" "),s("p",[s("code",[e._v("VuePress")]),e._v(" allows you to add styles for your website in "),s("code",[e._v(".vuepress/styles/index.styl")]),e._v(". You could change almost all styles of the theme (including the comment section). Please see "),s("a",{attrs:{href:"https://vuepress.vuejs.org/config/#index-styl",target:"_blank",rel:"noopener noreferrer"}},[e._v("this documentation"),s("OutboundLink")],1),e._v(" for more info on how to add extra styles.")]),e._v(" "),s("h2",{attrs:{id:"_9-is-the-click-to-zoom-feature-supported"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9-is-the-click-to-zoom-feature-supported"}},[e._v("#")]),e._v(" 9. Is the Click-to-Zoom feature Supported?")]),e._v(" "),s("p",[e._v("In version "),s("code",[e._v("1.1.1")]),e._v(", the theme has set "),s("code",[e._v("@vuepress/medium-zoom")]),e._v(" as a built-in plugin, which enables the click-to-zoom feature. Please see "),s("RouterLink",{attrs:{to:"/en/views/plugins/#built-in-plugins-in-our-theme"}},[e._v("The Theme's Built-in Plugins")]),e._v(" for more details.")],1),e._v(" "),s("h2",{attrs:{id:"_10-what-if-the-plugin-or-theme-doesn-t-work"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_10-what-if-the-plugin-or-theme-doesn-t-work"}},[e._v("#")]),e._v(" 10. What If the Plugin or Theme Doesn't Work?")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",[e._v("Since configuration and usage of theme and plugin are quite similar ("),s("code",[e._v("theme/index.js")]),e._v(" is also a plugin in "),s("code",[e._v("VuePress")]),e._v('), the word "plugin" is used in place of "plugin or theme".')])]),e._v(" "),s("p",[e._v("Please follow these steps to check:")]),e._v(" "),s("ol",[s("li",[e._v("see if the plugin has been loaded in the compilation output info in terminal")])]),e._v(" "),s("ul",[s("li",[e._v("if plugin is not loaded, please check if "),s("code",[e._v("config.js")]),e._v(" is customized correctly")]),e._v(" "),s("li",[e._v("if plugin is loaded with error, please check if it has been downloaded and installed")]),e._v(" "),s("li",[e._v("if plugin still can't be loaded after being downloaded and installed, please delete "),s("code",[e._v("node-modules/")]),e._v(" and reinstall dependencies ("),s("code",[e._v("yarn")]),e._v(" is recommended over "),s("code",[e._v("npm")]),e._v(")")])]),e._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[e._v("if the plugin affects the frontend, please check if the console reports any error and debug accordingly")]),e._v(" "),s("li",[e._v("check the "),s("code",[e._v("options")]),e._v(" supported in the documentation and reconfigure "),s("code",[e._v("config.js")])]),e._v(" "),s("li",[e._v("search for similar "),s("code",[e._v("issues and solutions")]),e._v(" in the project or community of the plugin")])])],1)}),[],!1,null,null,null);t.default=a.exports}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{636:function(e,t,s){"use strict";s.r(t);var o=s(4),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",[e._v("We have collected some usual questions here. If you don't find the answer you want here, please read "),s("code",[e._v("VuePress")]),e._v("' "),s("a",{attrs:{href:"https://v1.vuepress.vuejs.org/theme/default-theme-config.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("default theme config"),s("OutboundLink")],1),e._v(". As final resort, you could post an "),s("a",{attrs:{href:"https://github.com/vuepress-reco/vuepress-theme-reco/issues",target:"_blank",rel:"noopener noreferrer"}},[e._v("issue on GitHub"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("p",[e._v("Please note that this theme includes almost all features from "),s("code",[e._v("VuePress")]),e._v("' default theme. Thus, this FAQ only serves to introduce extra features. If you've found some features this site hasn't mentioned, or you want to know some features in default theme, please go to the "),s("a",{attrs:{href:"https://v1.vuepress.vuejs.org/theme/default-theme-config.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("official documentation"),s("OutboundLink")],1),e._v(".")])]),e._v(" "),s("h2",{attrs:{id:"_1-how-to-add-icon-font"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-how-to-add-icon-font"}},[e._v("#")]),e._v(" 1. How to Add "),s("code",[e._v("icon-font")]),e._v("?")]),e._v(" "),s("ol",[s("li",[e._v("Put font files under "),s("code",[e._v("public")]),e._v(" folder, then in "),s("code",[e._v("enhanceApp.js")]),e._v(" import the css file among the font files.")]),e._v(" "),s("li",[e._v("If your "),s("code",[e._v("icon")]),e._v("'s full "),s("code",[e._v("className")]),e._v(" is "),s("code",[e._v('class="iconfont icon-myIcon"')]),e._v(", configure "),s("code",[e._v("icon-font")]),e._v(" as "),s("code",[e._v("{ text: 'Home', link: '/', icon: 'iconfont icon-myIcon' }")]),e._v(".")])]),e._v(" "),s("h2",{attrs:{id:"_2-how-to-show-abstract"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-how-to-show-abstract"}},[e._v("#")]),e._v(" 2. How to Show Abstract?")]),e._v(" "),s("p",[e._v("Anything above "),s("code",[e._v("\x3c!-- more --\x3e")]),e._v(" is the abstract.")]),e._v(" "),s("RecoDemo",{attrs:{collapse:!0}},[s("template",{slot:"code-markdown"},[e._v("\n  <<< @/docs/.vuepress/demo/abstract_en.md\n")])],2),e._v(" "),s("h2",{attrs:{id:"_3-can-the-footer-of-home-page-be-customized"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-can-the-footer-of-home-page-be-customized"}},[e._v("#")]),e._v(" 3. Can the Footer of Home Page Be Customized?")]),e._v(" "),s("p",[e._v("Sorry, you can't.")]),e._v(" "),s("h2",{attrs:{id:"_4-on-the-home-page-how-to-set-the-avatar-in-infobar-on-the-right-and-the-icon-in-navbar-on-the-left"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-on-the-home-page-how-to-set-the-avatar-in-infobar-on-the-right-and-the-icon-in-navbar-on-the-left"}},[e._v("#")]),e._v(" 4. On the Home Page, How to Set the Avatar in Infobar on the Right and the Icon in Navbar on the Left?")]),e._v(" "),s("p",[e._v("The avatar in infobar on the right is configured by "),s("code",[e._v("themeConfig.authorAvatar")]),e._v(" in "),s("code",[e._v(".vuepress/config.js")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// .vuepress/config.js")]),e._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  themeConfig"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    authorAvatar"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/avatar.png'")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("The icon in navbar on the left is configured by "),s("code",[e._v("themeConfig.logo")]),e._v(" in "),s("code",[e._v(".vuepress/config.js")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// .vuepress/config.js")]),e._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  themeConfig"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    logo"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/head.png'")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("Moreover, don't forget to put your pictures in "),s("code",[e._v(".vuepress/public/")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"_5-is-there-any-rule-to-where-to-put-my-blogs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-is-there-any-rule-to-where-to-put-my-blogs"}},[e._v("#")]),e._v(" 5. Is There Any Rule to Where to Put My Blogs?")]),e._v(" "),s("p",[e._v("You could put your blogs anywhere, but have to make sure they are places VuePress could parse. For example, if your command is "),s("code",[e._v("vuepress dev docs")]),e._v(", then position your blogs under "),s("code",[e._v("docs/")]),e._v(". Our theme doesn't force you to put under a specific subdirectory, and you could specify that yourself. Please see "),s("a",{attrs:{href:"https://vuepress.vuejs.org/guide/directory-structure.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("this documentation"),s("OutboundLink")],1),e._v(" for more info on directory structure.")]),e._v(" "),s("h2",{attrs:{id:"_6-how-doesn-t-the-sidebar-show-h1-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-how-doesn-t-the-sidebar-show-h1-title"}},[e._v("#")]),e._v(" 6. How Doesn't the Sidebar Show "),s("code",[e._v("h1")]),e._v(" Title?")]),e._v(" "),s("p",[e._v("In "),s("code",[e._v("vuepress-theme-reco")]),e._v(", Please forgot "),s("code",[e._v("h1")]),e._v(" and instead use "),s("a",{attrs:{href:"https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("frontmatter")]),s("OutboundLink")],1),e._v(" for the title and other article metadata. The main body starts from "),s("code",[e._v("h2")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"_7-how-to-solve-the-issue-of-showing-comments-in-version-1-1-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-how-to-solve-the-issue-of-showing-comments-in-version-1-1-0"}},[e._v("#")]),e._v(" 7. How to Solve the Issue of Showing Comments in Version "),s("code",[e._v("1.1.0")]),e._v("?")]),e._v(" "),s("p",[e._v("This has been solved in version 1.1.0`.")]),e._v(" "),s("h2",{attrs:{id:"_8-how-to-customize-the-comment-section"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-how-to-customize-the-comment-section"}},[e._v("#")]),e._v(" 8. How to Customize the Comment Section?")]),e._v(" "),s("p",[s("code",[e._v("VuePress")]),e._v(" allows you to add styles for your website in "),s("code",[e._v(".vuepress/styles/index.styl")]),e._v(". You could change almost all styles of the theme (including the comment section). Please see "),s("a",{attrs:{href:"https://vuepress.vuejs.org/config/#index-styl",target:"_blank",rel:"noopener noreferrer"}},[e._v("this documentation"),s("OutboundLink")],1),e._v(" for more info on how to add extra styles.")]),e._v(" "),s("h2",{attrs:{id:"_9-is-the-click-to-zoom-feature-supported"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9-is-the-click-to-zoom-feature-supported"}},[e._v("#")]),e._v(" 9. Is the Click-to-Zoom feature Supported?")]),e._v(" "),s("p",[e._v("In version "),s("code",[e._v("1.1.1")]),e._v(", the theme has set "),s("code",[e._v("@vuepress/medium-zoom")]),e._v(" as a built-in plugin, which enables the click-to-zoom feature. Please see "),s("RouterLink",{attrs:{to:"/en/views/plugins/#built-in-plugins-in-our-theme"}},[e._v("The Theme's Built-in Plugins")]),e._v(" for more details.")],1),e._v(" "),s("h2",{attrs:{id:"_10-what-if-the-plugin-or-theme-doesn-t-work"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_10-what-if-the-plugin-or-theme-doesn-t-work"}},[e._v("#")]),e._v(" 10. What If the Plugin or Theme Doesn't Work?")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",[e._v("Since configuration and usage of theme and plugin are quite similar ("),s("code",[e._v("theme/index.js")]),e._v(" is also a plugin in "),s("code",[e._v("VuePress")]),e._v('), the word "plugin" is used in place of "plugin or theme".')])]),e._v(" "),s("p",[e._v("Please follow these steps to check:")]),e._v(" "),s("ol",[s("li",[e._v("see if the plugin has been loaded in the compilation output info in terminal")])]),e._v(" "),s("ul",[s("li",[e._v("if plugin is not loaded, please check if "),s("code",[e._v("config.js")]),e._v(" is customized correctly")]),e._v(" "),s("li",[e._v("if plugin is loaded with error, please check if it has been downloaded and installed")]),e._v(" "),s("li",[e._v("if plugin still can't be loaded after being downloaded and installed, please delete "),s("code",[e._v("node-modules/")]),e._v(" and reinstall dependencies ("),s("code",[e._v("yarn")]),e._v(" is recommended over "),s("code",[e._v("npm")]),e._v(")")])]),e._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[e._v("if the plugin affects the frontend, please check if the console reports any error and debug accordingly")]),e._v(" "),s("li",[e._v("check the "),s("code",[e._v("options")]),e._v(" supported in the documentation and reconfigure "),s("code",[e._v("config.js")])]),e._v(" "),s("li",[e._v("search for similar "),s("code",[e._v("issues and solutions")]),e._v(" in the project or community of the plugin")])])],1)}),[],!1,null,null,null);t.default=a.exports}}]);
>>>>>>> 0e509b96b9fc0fd951e0c2d7a66f16ca68517186:docs/assets/js/61.cac44011.js
