import Vue from "vue";
import Loading from "./Loading";

const LoadingCtor = Vue.extend(Loading);

LoadingCtor.install = (Vue) => {
  const fullscreenLoading = new LoadingCtor();

  Vue.directive("loading", {
    bind: (el, binding, vnode, oldVnode) => {
      const { modifiers } = binding;
      let loadingIns;
      //   let parent = el;
      if (modifiers.fullscreen) {
        loadingIns = fullscreenLoading;

        // parent = document.body;
      } else {
        loadingIns = new LoadingCtor();
        el.style.setProperty("position", "relative");
      }
      el.loading = loadingIns;
    },
    inserted(el, binding) {
      el.loading.$mount();

      if (binding.value) {
        if (binding.modifiers.fullscreen) {
          document.body.appendChild(el.loading.$el);
          el.loading.$el.classList.add("bytedanceLoading-fullscreen");
        } else {
          el.appendChild(el.loading.$el);
        }
      }
    },
    update(el, binding) {
      const { value } = binding;
      //   console.log(el.loading);
      if (!value) {
        el.loading.$el.remove();
        if (!binding.modifiers.fullscreen) {
          el.style.removeProperty("position");
        }
      } else {
        if (!binding.modifiers.fullscreen) {
          el.style.setProperty("position", "relative");
        }
        el.appendChild(el.loading.$el);
      }
    },
    unbind(el, binding) {
      console.log("unbind");
      el.loading.close();
      if (!binding.modifiers.fullscreen) {
        el.style.removeProperty("position");
      }
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
