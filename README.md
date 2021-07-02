# vue-bytedanceJob

一个用`Vue`重构的某知名互联网公司官方招聘网站

本项目所有数据均同步于官方网站，本人开发此项目主要是为了学习。

为了使自己提高手写代码，实现复杂业务逻辑的能力，本项目除了表单类的组件是使用第三方的组件库，其他功能组件均是自己手动封装的，向弹窗类的`API`组件和选择器类的模板调用组件等等都是综合基础功能和自身的业务逻辑相结合后实现的。通过封装这些组件，自己手写代码，封装逻辑的能力也是有了很大的提高，不仅如此，对于使用一些优秀的类库也是有了进一步的理解和使用。总之开发此项目收货满满。此外还有一些项目升级的需求和优化我也会持续更新，会持续的维护此项目。欢迎收藏和关注，谢谢！

## 线上预览

[http://123.57.204.48:3000](http://123.57.204.48:3000)

## Clone project

```bash
git clone git@github.com:konglingwen94/vue-bytedanceJob.git
```

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

默认启动 <http://localhost:8080>

### Start server API

```bash
npm  run server      默认监听`http://localhost:3000`
```

> 默认不需要启动，如果需要调试服务器端代码，请配置根目录下的`vue.config.js`文件，修改代理地址如下

```js
module.exports = {
  devServer: {
    proxy: "http://localhost:3000",
  },
};
```

### Compiles and minifies for production

```bash
npm run build
```

## 主要功能

- [x] 首页
- [x] 公司信息介绍
- [x] 职位关键字搜索
- [x] 城市职位检索
- [x] 职位分类检索
- [x] 职位列表分页展示
- [x] 职位详情
- [x] 产品与服务
- [x] 员工故事
- [x] 校园招聘(外链)

- [ ] 注册（由于服务端接口爬取有一定的复杂度，部分逻辑未实现，欢迎有兴趣的同学参与实现）
- [ ] 登录
  - [x] 邮箱登录（需要官方网站注册邮箱账号）
  - [ ] 手机号登录
- [x] 退出
- [ ] 简历投递
- [x] 简历
  - [x] 我的简历
  - [x] 简历上传
  - [x] 编辑简历
  - [x] 保存简历

## 技术栈

`vue` `vue-router`

`vue-cli` `less`

`axios` `lodash` `es6~7`

`express` `node-fetch` `http-proxy-middleware`

## 数据接口爬取

为了使本项目的数据和原网站保持同步，我决定亲自在浏览器的开发者工具爬取数据接口，虽然找接口的那段时间花费了不少精力和时间。当项目开发完成后，还是觉得所有的付出都是有收获的。在这我简单谈一下在找`API接口`过程中的采坑过程，希望对正在关注本项目的你有所启发。

在找一些包含大量数据类型的接口时并没有遇到很多困难，就按照平常我们开发项目时调式接口的基本操作，在多一点耐心，多调试几次就能找到。可是找接口的路还远远没有结束。后来项目开发到`登录`和`注册`的逻辑的时候，各种爬取接口的坑接踵而来。

其主要复杂的接口都在 [这个](./src/helper/requestWithToken.js)文件里。比起之前数据类的接口这个文件里的接口在发送请求的时候需要携带一些验证身份信息的字段。而且中间又牵扯一系列的跨域问题。为了解决这些问题我也算是绞尽了脑汁，最后在使用`postman`不断的调试之后，终于成功解决了所有存在的问题。

## 项目结构

<b><details><summary>组件 `src/components`</summary></b>

```
components
├── Bytedance-Button.vue  //主题按钮，可定制尺寸
├── Checkbox-Transfer.vue // 复选框穿梭选择器，用来选择搜索职位
├── File-Icon.vue            文件上传后可显示指定的图标
├── Input-Search.vue       搜索输入框
├── Loading                数据加载组件（支持API调用和指令调用）
│   ├── Loading.vue
│   └── main.js
├── Message                消息弹窗组件（使用API调用）
│   ├── main.vue
│   └── index.js
├── PopupProgress           弹窗进度条组件（支持API调用）
│   ├── main.vue
│   └── index.js
├── Logo.vue            主题颜色可变的logo组件
├── Pagination.vue      分页器组件
├── footer.vue
└── header.vue

```

</details>

<b><details><summary>页面 `src/views`</summary></b>

```
views
├── Home.vue            首页
├── JobDetail.vue       职位详情
├── Jobs.vue            职位列表浏览
├── Products.vue        产品展示
├── Resume.vue          简历预览
├── ResumeEditor.vue    编辑简历
├── StaffStory.vue      员工故事
└── User.vue            用户

```

 </details>

<b><details><summary>辅助工具 `src/helper/`</summary></b>

```
src/helper
├── notification.plugin.js     项目全局消息通知插件，只在开发环境使用，辅助开发
├── registerElementComponents.js  按需引入第三方组件库
├── registerGlobalComponents.js    全局注册手动开发的组件
├── request.js                   不带有`token`的`axios`请求示例
├── requestWithToken.js      带有`token`的`axios`请求示例,主要包含简历相关的接口
└── utilities.js        其他工具函数
```

</details>

<b><details><summary>静态资源文件`/src/assets`</summary></b>

```
src/assets
└── style   样式
    ├── global.css      自定义全局样式
    ├── mixin.less      定义的混入样式
    ├── reset.css       重置浏览器默认样式
    └── variable.less      项目全局变量
```

</details>

<b><details><summary>服务端 /server/</summary></b>

```
server
├── app.js                     项目启动入口
├── controller      代理请求回调函数目录
│   ├── jobs.js                  职位
│   ├── productAndStandard.js    产品和字节范
│   ├── request.js               代理请求示例
│   └── staff-stories.js       员工故事
├── data.json     页面静态数据存放文件
├── package.json
└── router.js     代理接口路由

```

</details>

<b><details><summary>源代码其他文件</summary></b>

```
├── src
│   ├── App.vue       入口组件
│   ├── main.js       应用入口
│   ├── router          路由
│   │   └── index.js
│   ├── store        全局共享状态
│   │   └── index.js
```

</details>

<b><details><summary>根目录</summary></b>

```
vue-bytedanceJob
├── docs/       服务端接口文档
├── public/     项目公共文件
├── server/       服务端目录
├── src/          代码源目录
├── test/
├── README.md     项目介绍文档
├── babel.config.js   按需引入第三方库在这里配置
├── package.json     项目包介绍
└── vue.config.js    项目配置
```

</details>

## 项目截图

![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/navbar.gif)<br>
![home](https://user-images.githubusercontent.com/46000016/92583485-f2d86080-f2c4-11ea-8c2e-9a87e234fbf0.gif)
![job](https://user-images.githubusercontent.com/46000016/92588487-a3e1f980-f2cb-11ea-998f-fe35a0646cee.gif)

![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/jobDetail.gif)<br>
![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/resume.gif)
![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/product.gif)<br>
![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/staffStory.gif)
![vue-bytedanceJob](http://123.57.204.48:8080/vue-bytedanceJob/popup-progress&message-success.gif)

## 项目文章总结

1. <https://github.com/konglingwen94/vue-bytedanceJob/issues/7>

2. <https://github.com/konglingwen94/vue-bytedanceJob/issues/6>

## 个人博客总结

1. [https://juejin.im/post/6868884040029011975](https://juejin.im/post/6868884040029011975)

2. [https://juejin.im/post/6844904199289831432](https://juejin.im/post/6844904199289831432)

## 支持

如果看完此项目对您学习`Vue`有帮助的话，请您动手点一下`star`，有了您的支持，我会有更大的动力开源更多有趣的项目出来，谢谢！

由于服务端部分接口尚未获取到，有部分功能待实现。如果您对本项目感兴趣的话，也欢迎您能参与项目共建！

欢迎收藏和关注，谢谢! 
