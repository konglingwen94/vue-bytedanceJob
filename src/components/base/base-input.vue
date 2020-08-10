<template>
  <div :class="type === 'textarea' ? 'base-textarea' : 'base-input'">
    <div v-if="type !== 'textarea'" class="base-input__wrapper">
      <div class="base-input__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        class="base-input__inner"
        @input="(e) => $emit('input', e.target.value)"
        :value="value"
        type="text"
        v-bind="$attrs"
        :style="borderRadiusStyle"
      />
    </div>

    <div v-else>
      <textarea
        @input="(e) => $emit('input', e.target.value)"
        ref="textarea"
        :value="value"
        :style="autoHeight"
        class="base-textarea__inner"
        v-bind="$attrs"
      ></textarea>
    </div>
  </div>
</template>

<script>
let hiddenTextarea;
export default {
  name: "base-input",
  inheritAttrs: false,
  props: {
    value: String,
    type: {
      type: String,
      default: "text"
    },
    autoSize: Boolean
  },
  computed: {
    autoHeight() {},
    borderRadiusStyle() {
      return {
        borderRadius: this.hasPrepend ? "0 5px 5px 0" : "5px"
      };
    },
    hasPrepend() {
      return !!this.$slots.prepend;
    }
  },

  watch: {
    value: {
      handler() {
        if (this.type !== "textarea" || !this.autoSize) return;
        this.$nextTick(() => {
          const textareaEl = this.$refs.textarea;
          textareaEl.style.height =
            this.calcTextareaStyle(textareaEl).height + "px";
        });
      },
      immediate: true
    }
  },
  methods: {
    calcTextareaStyle(target) {
      if (!hiddenTextarea) {
        hiddenTextarea = this.$el.appendChild(target.cloneNode(true));
      }

      const hiddenStyle = {
        visibility: "hidden",
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: -10000,
        overflow: "hidden",
        height: 0
      };

      Object.keys(hiddenStyle).forEach(prop => {
        hiddenTextarea.style[prop] = hiddenStyle[prop];
      });
      const style = window.getComputedStyle(hiddenTextarea);

      const {
        borderTopWidth,
        borderBottomWidth,
        paddingTop,
        paddingBottom,
        boxSizing
      } = style;
      const borderSize =
        parseFloat(borderBottomWidth) + parseFloat(borderTopWidth);
      const paddingSize = parseFloat(paddingTop) + parseFloat(paddingBottom);

      hiddenTextarea.value = target.value;

      let height = hiddenTextarea.scrollHeight;
      if (boxSizing === "border-box") {
        height += borderSize;
      } else if (boxSizing === "content-box") {
        height -= paddingSize;
      }

      return {
        height
      };
    }
  }
};
</script>
<style scoped lang="less">
.base {
  font-size: 20px;

  &-input {
    display: flex;

    &__wrapper {
      display: flex;
    }
    &__prepend {
      border-radius: 5px 0 0 5px;
      max-width: 70px;
      overflow: hidden;
      border: 1px solid @border-base-color;

      border-right-width: 0;
      padding: 5px;
      &:hover {
        border-color: @main-color;
        & + .base-input__inner {
          border-left-color: @main-color;
        }
      }
    }
    &__inner {
      &:focus {
        border: 1px solid @main-color;
      }
      padding-left: 12px;

      border-color: @border-base-color;
    }
  }

  &-textarea {
    &__inner {
      padding: 10px;
      min-width: 400px;
      max-width: 600px;
      min-height: 80px;
      max-height: 200px;
      resize: vertical;
      border-radius: 5px;

      &:focus {
        border-color: @main-color;
      }
    }
  }
}
</style>
