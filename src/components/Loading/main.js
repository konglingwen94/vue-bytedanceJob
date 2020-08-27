import Vue from "vue";
import Loading from "./Loading";

const LoadingCtor = Vue.extend(Loading);
const fullscreenLoading = new LoadingCtor();

LoadingCtor.install = (Vue) => {
  Vue.directive("loading", {
    bind: (el, binding, vnode, oldVnode) => {
      el.loading = new LoadingCtor();
      el.loading.$mount();
      el.appendChild(el.loading.$el);
      el.classList.add("directiveLoading-parent");
      if (binding.value) {
        el.classList.add("directiveLoading-parent-visible");
      } else {
        el.loading.$el.style.setProperty("display", "none");
      }
    },

    update(el, { value, oldValue }) {

      if (value) {
        el.classList.add("directiveLoading-parent-visible");

        el.loading.$el.style.removeProperty("display");
      } else {
        el.loading.$el.style.setProperty("display", "none");
        el.classList.remove("directiveLoading-parent-visible");
      }
    },
    unbind(el, binding) {
      el.loading.close();
    },
  });
  const defaultOpts = { target: null, fullscreen: false, lock: false };
  Vue.prototype.$loading = function(opts) {
    opts = Object.assign({}, defaultOpts, opts);
    let targetParent;
    if (typeof opts.target === "string") {
      try {
        targetParent = document.querySelector(opts.target);
      } catch (error) {
        targetParent = document.body;
      }
    } else if (!opts.target instanceof HTMLElement) {
      targetParent = document.body;
    }

    targetParent = opts.target || document.body;

    targetParent.style.position = "relative";

    const loadingIns = new LoadingCtor({ data: opts });
    loadingIns.$mount();
    targetParent.appendChild(loadingIns.$el);

    return loadingIns;
  };
};
export default LoadingCtor;
