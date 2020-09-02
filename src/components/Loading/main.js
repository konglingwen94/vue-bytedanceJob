import Vue from "vue";
import Loading from "./Loading";

const LoadingCtor = Vue.extend(Loading);
// const fullscreenLoading = new LoadingCtor();

LoadingCtor.install = Vue => {
  Vue.directive("loading", {
    inserted: (el, binding, vnode, oldVnode) => {
      el.loading = new LoadingCtor();
      el.loading.$mount();
      el.appendChild(el.loading.$el);
      el.classList.add("directiveLoading-parent");

      if (binding.arg) {
        el.loading.$el.style.backgroundColor = binding.arg;
      }
      if (binding.value) {
        if (binding.modifiers.scrollFixed) {
          const position = {
            top:
              el.getBoundingClientRect().top > 0
                ? Math.abs(el.getBoundingClientRect().top)
                : 0,
            bottom:
              el.getBoundingClientRect().bottom - window.innerHeight > 0
                ? el.getBoundingClientRect().bottom - window.innerHeight
                : 0
          };
          el.loading.$el.style.top = position.top + "px";
          el.loading.$el.style.bottom = position.bottom + "px";
        }
        el.classList.add("directiveLoading-parent-visible");
      } else {
        el.loading.$el.style.setProperty("display", "none");
      }
    },

    update(el, { value, oldValue, ...binding }) {
      if (value === oldValue) return;
      Vue.nextTick(() => {
        if (binding.modifiers.scrollFixed && value) {
          const position = {
            top:
              el.getBoundingClientRect().top < 0
                ? Math.abs(el.getBoundingClientRect().top)
                : 0,
            bottom:
              el.getBoundingClientRect().bottom - window.innerHeight > 0
                ? el.getBoundingClientRect().bottom - window.innerHeight
                : 0
          };
          el.loading.$el.style.top = position.top + "px";
          el.loading.$el.style.bottom = position.bottom + "px";
        }
      });

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
    }
  });
  const defaultOpts = { target: null, fullscreen: true, lock: false };
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

    if (Object.prototype.toString.call(opts.position) === "[object Object]") {
      Object.keys(opts.position).forEach(prop => {
        loadingIns.$el.style[prop] = opts.position[prop] + "px";
      });
    }
    if (opts.background) {
      loadingIns.$el.style.background = opts.background;
    }
    if (opts.fullscreen) {
      loadingIns.$el.style.position = "fixed";
    }

    return loadingIns;
  };
};
export default LoadingCtor;
