<template>
  <div
    
    class="message"
    :class="[type]"
    :style="positionStyle"
  >
    <div class="message-outer">
      <span class="message__icon">
        <i :class="[`el-icon-${type}`, `message__icon--${type}`]"></i>
      </span>
      <div class="message-inner">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export const defaults = {
  message: "",
  type: "success",
 
  duration: 3000,
  offsetTop: 30,
};
export default {
  data() {
    return defaults;
  },
  beforeDestroy() {
    this.$el.classList.add("slideUp");
  },
  mounted() {
    this.$el.classList.add("slideDown");
  },
  
  computed: {
    positionStyle() {
      return {
        top: this.offsetTop + "px",
      };
    },
  },
};
</script>

<style lang="less" scoped>
@success-color: #34c724;
@success-color-bg: #f0fbef;
@error-color: #f56c6c;
@error-color-bg: #fef1f1;
@warning-color: #e6a23c;
@warning-color-bg: #fdf6ec;

@animatin-duration: 0.4s;

@keyframes slideDown {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
  }
}
@keyframes slideUp {
  from {
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
}

.message {
  margin-bottom: 20px;
  padding: 5px 15px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  min-width: 100px;
  border-radius: 9px;
  text-align: center;
  animation-duration: @animatin-duration;
  transition: all @animatin-duration;
  z-index: 99999;
  &__icon {
    font-size: 30px;
    &--success {
      color: @success-color;
    }
    &--error {
      color: @error-color;
    }
    &--warning {
      color: @warning-color;
    }
  }
  &.slideDown {
    animation-name: slideDown;
  }
  &.slideUp {
    animation-name: slideUp;
  }
  &.success {
    border: 1px solid @success-color;
    background-color: @success-color-bg;
  }
  &.warning {
    background-color: @warning-color-bg;
    border: 1px solid @warning-color;
  }
  &.error {
    background-color: @error-color-bg;
    border: 1px solid @error-color;
  }
  &-outer {
    display: flex;
    align-items: center;
  }
  &-inner {
    margin-left: 4px;
  }
}
</style>
