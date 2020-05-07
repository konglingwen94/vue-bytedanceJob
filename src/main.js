import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/reset.css";
import "@/assets/global.css";
import "@/helper/registerGlobalComponents.js";
import request from "@/helper/request";
Vue.config.productionTip = false;
Vue.prototype.request = request;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
