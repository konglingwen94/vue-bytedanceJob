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

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.prototype.request = request;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
