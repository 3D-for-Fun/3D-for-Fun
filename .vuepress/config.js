const path = require('path')
const themeConfig = require('./config/theme/')

module.exports = {
  dest: 'docs',
  // base: '/bitcode/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'author', content: 'jeff.fu' }],
    ['meta', { name: 'keywords', content: 'vuepress,reco,jeff.fu,vuepress-reco,vuepress-theme-reco,theme,blog,主题' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#42b983' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon_vuepress_reco.png' }],
    ['link', { rel: 'mask-icon', href: '/icon_vuepress_reco.svg', color: '#42b983' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icon_vuepress_reco.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  theme: 'reco',
  themeConfig,
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: "Digital Twin All",
      description: '万物皆可数字孪生'
    },
    /* '/en/': {
      lang: 'en-US',
      title: "CIM",
      description: 'City Information Modeling'
    } */
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    /* [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-149716079-2'
      }
    ],
    [
      '@vuepress/plugin-register-components',
      {
        components: [
          {
            name: 'reco-home-page-one',
            path: path.resolve(__dirname, './components/HomePageOne.vue')
          }
        ],
        componentsDir: path.resolve(__dirname, './demo')
      }
    ],
    '@vuepress-reco/extract-code',
    'flowchart',
    ['sitemap', {
      hostname: 'https://vuepress-theme-reco.recoluan.com'
    }],
    ['@vuepress-reco/rss', {
      site_url: 'https://vuepress-theme-reco.recoluan.com',
      copyright: ''
    }], */
    /* ['@vuepress-reco/bulletin-popover', {
      body: [
        {
          type: 'title',
          content: '欢迎加入QQ交流群 🎉🎉🎉',
          style: 'text-aligin: center;'
        },
        {
          type: 'image',
          src: '/rvcode_qq.png'
        }
      ],
      footer: [
        {
          type: 'button',
          text: '打赏',
          link: '/donate'
        }
      ]
    }] */
  ]
}  