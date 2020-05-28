<template>
  <div class="bytedance-button" :class="`bytedance-button-${size}`">
    <span>
      <slot>bytedance-button</slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "bytedance-button",
  props: {
    buttonText: String,
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bytedance-button {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: @main-color;
  color: #fff;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  cursor:pointer;
  &:hover :after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &-small {
    height: 20px;
  }
  &-large {
    height: 40px;
  }
}
</style>