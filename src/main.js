import Vue from "vue";

// 按需引入 element-ui 组件
import "element-ui/lib/theme-chalk/index.css";
import "./helper/registerElementComponents.js";

import App from "./App.vue";
import router from "./router";
import "@/assets/style/reset.css";
import "@/assets/style/global.css";

// 注册自定义组件
import "@/helper/registerGlobalComponents.js";

// 引入请求实例
import request from "@/helper/request";

// 日期格式化过滤器

import { formatDate } from "@/helper/utilities";

// 引入loading组件

import Loading from "@/components/Loading/main";
import PopupProgress from "@/components/popup-progress";
import Message from "@/components/message";

// 开发环境捕获错误插件

import NotificationPlugin from "./helper/notification.plugin";

if (process.env.NODE_ENV !== "production") {
  Vue.createElement = new Vue().$createElement;
  Vue.use(NotificationPlugin);
  Vue.config.devtools = true;
}

// 使用loading 组件

Vue.use(Loading);
Vue.use(PopupProgress);
Vue.use(Message);

// 注册日期格式化过滤器

Vue.filter("formatDate", formatDate);

Vue.config.productionTip = false;
Vue.prototype.request = request;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
