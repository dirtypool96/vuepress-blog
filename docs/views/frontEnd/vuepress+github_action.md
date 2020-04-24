---
title: vuepress-theme-reco + Github Actions 构建静态博客，部署到第三方服务器
date: 2020-04-23
sidebar: "auto"
categories:
  - vue
tags:
  - VuePress
  - Github
  - 博客
  - 持续集成
---

::: tip

先下载主题模板，再根据自己的需要进行相应的修改，再根据自己的服务器配置 Github Actions 文件，最后上传到 Github，触发 Github Actions 自动构建部署到服务器

:::

<!-- more -->

::: tip 提示

查看此文档前应先了解，[vuepress的基本操作](https://tsanfer.xyz/views/frontEnd/VuePress%20+%20GithubPages%20+%20TravisCI%20.html#%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)

:::

参考官方文档进行配置：

::: tip 提示

[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

[VuePress](https://vuepress.vuejs.org/zh/)

[SamKirkland / FTP-Deploy-Action](https://github.com/marketplace/actions/ftp-deploy)

:::

## 思路

下载 vuepress-theme-reco 官方的主题模板（脚手架），再根据自己的需要进行相应的修改，再根据自己的服务器配置 Github Actions 文件，最后上传到 Github，触发 Github Actions 自动构建部署到第三方服务器。以后就只需提交 markdown 文件到 Github，Github Actions 便可自动部署到第三方服务器

### 用到的东西

- vuepress-theme-reco

- VuePress

- Github Actions

- SamKirkland / FTP-Deploy-Action

### 相关

- vuepress-theme-reco:

  一款简洁而优雅的 vuepress 博客 & 文档 主题。

- Github Actions:

  GitHub 操作 帮助您在您存储代码的同一位置自动执行软件开发工作流程，并协作处理拉取请求和议题。 您可以写入个别任务，称为操作，并结合它们创建一个自定义的工作流程。 工作流程是您可以在仓库中创建的自定义自动化流程，用于在 GitHub 上构建、测试、封装、发行或部署任何代码项目。

  通过 GitHub 操作 可直接在仓库中构建端到端持续集成 (CI) 和持续部署 (CD) 功能。

- SamKirkland / FTP-Deploy-Action:

  Automate deploying websites and more with this GitHub action

  通过 GitHub action 自动部署网页等操作

## 博客主题配置

### 快速开始

#### 使用模板

```bash
# 初始化
mkdir my-blog
yarn init
```

#### 更改最新依赖

```json
// package.json

{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
  "dependencies": {
    "vuepress": "^1.4.0",
    "vuepress-theme-reco": "^1.3.2",
    "@vuepress/plugin-nprogress": "^1.4.0",
    "vuepress-plugin-reading-progress": "^1.0.8"
  }
}
```

然后，安装依赖

```bash
# 安装
yarn install
```

### 目录结构

```bash
.
├── .git-ftp-include	// 用于最后指定需要部署的文件或文件夹
├── .gitattributes	// 用于统一文件内编码的换行符
├── .github
│   └── workflows
│       └── nodejs.yml	// Github Actions的配置文件
├── .gitignore	// 忽略上传到Github的文件或目录
├── LICENSE	// 许可证文件
├── README.md	// Github项目展示文件
├── docs	// VuePress项目根目录
│   ├── .vuepress	// 存放配置文件的文件夹
│   │   ├── config.js	// 整个工程的配置文件
│   │   ├── dist	// 最后生成的文件目录
│   │   ├── public	// 媒体文件夹（主要是图片）
│   │   └── styles	// 网页样式文件夹（里面空的，没有用）
│   ├── README.md	// 网页首页文件
│   └── views	// 存放markdown文件的文件夹（可以不要直接把markdown文件放在docs里面）
│       └── frontEnd	// 分类目录（也可以不要分类目录直接放在views里面）
├── package.json	// 指定依赖，项目脚本，Node.js项目描述文件
├── yarn-error.log	// 记录构建失败的日志文件
└── yarn.lock	// 变更依赖时自动生成和更新
```

### 添加博客配置

然后根据需要更改一些内容和设置，参考官方的文档，可自行取舍相应内容

::: tip 提示

[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

[VuePress](https://vuepress.vuejs.org/zh/)

:::

```javascript {83,84}
// docs/.vuepress/config.js

// docs/.vuepress/config.js

module.exports = {
  // host: '0.0.0.0',  // 生成网页地址（本地调试使用）
  // port: '22335',  // 生成网页端口（本地调试使用）
  title: "DirtyPool's Blog", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "DirtyPool's Blog", // meta 中的描述文字，用于SEO
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], //浏览器的标签栏的网页图标,基地址/docs/.vuepress/public
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ] //在移动端，搜索框在获得焦点时会放大
  ],

  theme: "reco", //选择主题‘reco’
  themeConfig: {
    type: "blog", //选择类型博客
    sidebar: "auto", //在所有页面中启用自动生成侧栏
    record: "滇ICP备20002492号-1",
    startYear: "2020", // 项目开始时间，只填写年份
    lastUpdated: "最后更新时间", // string | boolean
    author: "DirtyPool",
    authorAvatar: "/yjtp.png", //作者头像
    mode: "auto", //默认显示白天夜晚模式
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类" // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签" // 默认 “标签”
      }
    },
    nav: [
      //导航栏设置
      { text: "主页", link: "/", icon: "reco-home" },
      { text: "时间线", link: "/timeline/", icon: "reco-date" },
      {
        text: "联系",
        icon: "reco-message",
        items: [
          {
            text: "Mail",
            link: "mailto:dirtypool@foxmail.com",
            icon: "reco-mail"
          },
          {
            text: "GitHub",
            link: "https://github.com/dirtypool96",
            icon: "reco-github"
          }
        ]
      }
    ],
    // 评论设置
    valineConfig: {
      appId: process.env.LEANCLOUD_APP_ID,
      appKey: process.env.LEANCLOUD_APP_KEY
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
    ["reading-progress"] // 阅读进度条
  ]
};
```

## Github Actions 配置

### 修改 Github Actions 配置文件

在 Github 网页上添加 Github Actions 配置文件，参考官方的文档，可自行取舍相应内容，其中需要保密的部分需要添加 Github Secrets 环境变量

::: tip 提示

[参考 vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html)
[参考 ECS服务器搭建FTP](https://help.aliyun.com/document_detail/92048.html?spm=5176.13910061.0.0.71136085eXqzPw&aly_as=LzLimxcBD#section-t9a-ors-44c)


:::

```yml {22,23,32,33}
# .github/workflows/nodejs.yml

on: push # 触发此文件运行的条件
name: Github Actions # 此工作流程（workflow）的名字
jobs:
  FTP-Deploy-Action:
    name: FTP-Deploy-Action # 此任务（job）的名字
    runs-on: ubuntu-latest # 运行环境
    steps:
      - uses: actions/checkout@master # 切换分支到master
        with:
          fetch-depth: 2

      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"

      - name: Build Project # 此步骤（step）的名字
        run: yarn && yarn build # 下载依赖和构建项目
        env:
          LEANCLOUD_APP_ID: ${{ secrets.LEANCLOUD_APP_ID }} # 评论系统的ID
          LEANCLOUD_APP_KEY: ${{ secrets.LEANCLOUD_APP_KEY }} # 评论系统的KEY

      - name: List output files
        run: ls -a docs/.vuepress/dist # 显示生成的目录文件

      - name: FTP-Deploy-Action
        uses: SamKirkland/FTP-Deploy-Action@3.0.0
        with:
          ftp-server: ${{ secrets.FTP_IP }} # 服务器地址和端口（可以填域名，不过我服务器做了全站加速会导向加速结点的IP，所以只能用服务器的IP）
          ftp-username: ${{ secrets.FTP_USERNAME }} # FTP用户名
          ftp-password: ${{ secrets.FTP_PASSWORD }} # FTP密码
          git-ftp-args: --remote-root /home/www/htdocs # 要部署到服务器的哪个位置（我这用的是SFTP，如果是FTP连接的话--insecure不用加）
          local-dir: docs/.vuepress/dist/ # 选择哪些文件要部署到服务器，这个选项在这里选了之后，要在.git-ftp-include中添加相应的路径
```

```
// .git-ftp-include

!docs/.vuepress/dist/
```

### 添加 Github Token

为了保密，把重要信息用变量表示，在 Github Secrets 中添加相应的值

仓库的 Settings --> Secrets --> Add a new secret

比如

- Name: FTP_USERNAME
- Value: admin

最后再把代码上传到 Github 便可自动触发构建，部署到第三方服务器

> 本文由[李俊乐-网络日志](https://dirtypool.top) 发布！
