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
      console.log("directive-loading-update");
      
      if (value) {
        el.classList.add("directiveLoading-parent-visible");
        

        
        el.loading.$el.style.removeProperty("display");
      } else {
    
        el.loading.$el.style.setProperty("display", "none");
        el.classList.remove("directiveLoading-parent-visible");
      }
    },
    unbind(el, binding) {
      console.log("unbind-directive-loading");
      el.loading.close();
    },
  });
  const defaultOpts = { target: document.body, fullscreen: false, lock: false };
  Vue.prototype.$loading = function(opts) {
    opts = Object.assign({}, defaultOpts, opts);
    let targetParent;
    if (typeof opts.target === "string") {
      targetParent = document.querySelector(opts.target);
    } else if (opts.target instanceof HTMLElement) {
      targetParent = opts.target;
    }

    targetParent = targetParent || document.body;
    // if (opts.fullscreen || opts.body) {
    //   targetParent = document.body;
    // }

    const loadingIns = new LoadingCtor({ data: opts });
    loadingIns.$mount();
    console.log(opts.target);
    targetParent.appendChild(loadingIns.$el);

    return loadingIns;
  };
};
export default LoadingCtor;
