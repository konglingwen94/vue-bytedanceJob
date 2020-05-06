import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import '@/assets/reset.css'
import  '@/helper/registerGlobalComponents.js'
 
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
