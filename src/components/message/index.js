import Vue from "vue";
import Message from "./main";
import { defaults } from "./main";
import { pick } from "@/helper/utilities.js";
const MessageCtor = Vue.extend(Message);

const queue = [];
let index = 0;

MessageCtor.prototype.close = function() {
  this.$destroy();
  this.$el.addEventListener("animationend", () => {
    this.$el.remove();
  });

  let targetIndex = queue.indexOf(this);
  let removedHeight = this.$el.offsetHeight;

  if (targetIndex < 0) return;
  for (let i = targetIndex + 1; i < queue.length; i++) {
    const dom = queue[i].$el;
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight + 13 + "px";
  }
  queue.splice(targetIndex, 1);
};

export default function createMessage(opts = {}) {
  const instance = new MessageCtor({ data: pick(opts, Object.keys(defaults)) });
  instance.index = ++index;
  instance.$mount();
  queue.forEach((item) => {
    instance.offsetTop += item.$el.offsetHeight + 13;
  });
  queue.push(instance);

  document.body.appendChild(instance.$el);
  setTimeout(() => {
    instance.close();
  }, instance.duration);
  return instance;
}
createMessage.install = (Vue) => {
  Vue.prototype.$message = createMessage;

  ["warning", "error", "success"].forEach((type) => {
    createMessage[type] = function(opts = {}) {
      if (typeof opts === "string") {
        opts = {
          message: opts,
        };
      }
      opts.type = type;
      return createMessage(opts);
    };
  });
};
