import Vue from "vue";
import Progressbar from "./main.vue";

let singleProgress;
const ProgressbarCtor = Vue.extend(Progressbar);
ProgressbarCtor.prototype.close = function() {
  singleProgress = null;
  this.visible = false;
  this.value = 0;

  this.$nextTick(() => {
    this.$destroy();
  });
};

function pick(obj = {}, keys = []) {
  const result = {};
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

function createPopupProgress(opts = {}) {
  if (singleProgress) return singleProgress;

  singleProgress = new ProgressbarCtor({
    data: pick(opts, Object.keys(opts)),
  });

  singleProgress.$mount();
  document.body.appendChild(singleProgress.$el);

  singleProgress.visible = true;
  return singleProgress;
}

export default {
  install(Vue) {
    Vue.prototype.$popupProgress = createPopupProgress;
  },
};
