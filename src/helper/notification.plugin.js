import devtoolsDetect from "devtools-detect";

import { Notification } from "element-ui";

function padStart(target, maxlength, fillString = " ") {
  target = target.toString();
  maxlength -= target.length;
  let prefixPadding = "";

  while (maxlength--) {
    prefixPadding = fillString + prefixPadding;
  }

  return `${prefixPadding}${target}`;
}

function formatDate(date) {
  const h = padStart(date.getHours(), 2, 0);
  const m = padStart(date.getMinutes(), 2, 0);
  const s = padStart(date.getSeconds(), 2, 0);
  const ms = padStart(date.getMilliseconds(), 3, 0);

  return `${h}:${m}:${s}.${ms}`;
}

const styleHTML = `


 

 
.global-notification__warning-message{
  color: #513203;

}
.global-notification__warning{
  width:auto !important;
  max-width:400px;
  background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
}
 
.global-notification__error-message,
.global-notification__warning-message{
  white-space:pre-wrap;
  word-break:break-all;

}
.global-notification__warning-track,
.global-notification__error-track{
  white-space:pre;
  text-align:right;
  margin-top:20px;
}
`;

let notificationCount = 0;

const handlerDevtoolsChange = (event, Vue) => {
  const h = Vue.createElement;

  const { isOpen } = event.detail;
  if (!isOpen) {
    // 日志捕获弹窗

    console.clear();
    notificationCount = 0;
    console.group("notifications-group");

    // 警告信息弹窗
    Vue.config.warnHandler = (err, vm, info) => {
      console.warn(err);
      notificationCount++;

      const warnIns = Notification.warning({
        title:
          vm && vm.$options ? `${vm.$options.__file || vm.$options.name}` : "",
        message: `<pre class="global-notification__warning-message">${err.toString()}</pre><p class="global-notification__warning-track">${info}</p>`,
        dangerouslyUseHTMLString: true,
        duration: 0,
        customClass: "global-notification__warning",
        position: "top-left"
      });
      warnIns.$el.style.width = "auto";
    };

    // 错误信息弹窗
    Vue.config.errorHandler = (err, vm, info) => {
      console.error(err);
      const date = new Date();
      notificationCount++;
      const notification = Notification.error({
        title: info,

        message: h(
          "div",

          [
            h(
              "div",
              {
                style: {
                  color: "#d92e2e",
                  whiteSpace: "pre-wrap",
                  margin: "13px 0"
                }
              },

              err.toString()
            ),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "20px"
                    }
                  },
                  formatDate(date)
                ),
                h("span"),
                `at: ${vm.$options.__file || vm.$options.name}`
              ]
            )
          ]
        ),

        duration: 0
      });
      const wrapperStyle = {
        backgroundColor: "#fef0f0",
        padding: "10px",
        width: "auto"
      };

      for (let prop in wrapperStyle) {
        notification.$el.style[prop] = wrapperStyle[prop];
      }
    };
  } else {
    Notification.closeAll();
    if (notificationCount > 0) {
      console.groupEnd();
    } else {
      // console.clear();
    }
    Vue.config.errorHandler = null;
    Vue.config.warnHandler = null;
  }

  // 日志弹窗
};

export default {
  install(Vue) {
    // 警告信息弹窗

    handlerDevtoolsChange({ detail: { isOpen: devtoolsDetect.isOpen } }, Vue);
    window.addEventListener("devtoolschange", event => {
      handlerDevtoolsChange(event, Vue);
    });

    const styleDom = document.createElement("style");

    styleDom.innerHTML = styleHTML;

    document.head.appendChild(styleDom);
  }
};
