// docs/.vuepress/config.js

module.exports = {
  // host: '0.0.0.0',  // 生成网页地址（本地调试使用）
  // port: '22335',  // 生成网页端口（本地调试使用）
  "title": "DirtyPool's Blog", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  "description": "DirtyPool Blog", // meta 中的描述文字，用于SEO
  "head": [
    ["link", { "rel": "icon", "href": "/favicon.ico" }], //浏览器的标签栏的网页图标,基地址/docs/.vuepress/public
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ] //在移动端，搜索框在获得焦点时会放大
  ],

  "theme": "reco", //选择主题‘reco’
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  "themeConfig": {
    "type": "blog", //选择类型博客
    "sidebar": "auto", //在所有页面中启用自动生成侧栏
    "record": "滇ICP备20002492号-1",
    "startYear": "2020", // 项目开始时间，只填写年份
    "lastUpdated": "最后更新时间", // string | boolean
    "author": "DirtyPool",
    "authorAvatar": "/yjtp.png", //作者头像
    "mode": "auto", //默认显示白天夜晚模式
    "blogConfig": {
      "category": {
        "location": 2, // 在导航栏菜单中所占的位置，默认2
        "text": "分类" // 默认 “分类”
      },
      "tag": {
        "location": 3, // 在导航栏菜单中所占的位置，默认3
        "text": "标签" // 默认 “标签”
      }
    },
    "nav": [
      //导航栏设置
      { "text": "主页", "link": "/", "icon": "reco-home" },
      { "text": "时间线", "link": "/timeline/", "icon": "reco-date" },
      {
        "text": "代码仓",
        "icon": "reco-api",
        "items": [{
            "text": "GitHub",
            "link": "https://github.com/dirtypool96",
            "icon": "reco-github"
          },
          {
            "text": "Gitte",
            "link": "https://gitee.com/dirtypool",
            "icon": "reco-mayun"
          }]
      }
    ],
    // 评论设置
    valineConfig: {
      appId: process.env.LEANCLOUD_APP_ID,
      appKey: process.env.LEANCLOUD_APP_KEY,
      visitor: true,
      avatar: 'DirtyPool',
      placeholder: '如未及时回复请用邮箱嗷'
    }
  },

  markdown: {
    lineNumbers: true //代码显示行号
  },
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,

  // 插件
  plugins: [
    ["vuepress-plugin-smooth-scroll"], // 平滑滚动
    ["@vuepress/nprogress"], // 加载进度条
    ["reading-progress"], // 阅读进度条
    ["vuepress-plugin-code-copy", true],
    ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
        width: '350px', // 默认 260px
        title: '消息提示',
        body: [
          {
            type: 'title',
            content: '笔者积极准备并寻找一个新的工作环境，有意请联系',
            style: 'text-aligin: center;'
          },
          {
            type: 'text',
            content: 'WeChat: dirtypool',
            style: 'text-aligin: center;'
          },
          {
            type: 'text',
            content: 'E-Mail: dirtypool@foxmail.com',
            style: 'text-aligin: center;'
          }
        ]
      }]
  ]
};
