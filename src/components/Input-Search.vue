<template>
  <div :class="size" class="input-search">
    <i class="prefix-icon">🔍</i>
    <input v-bind="$attrs" type="text" v-model="value" @input="$emit('input', value)" />
    <span @click="$emit('search', value)" class="input-search-button">搜索</span>
  </div>
</template>
<script>
export default {
  name: "input-search",
  data() {
    return {
      value: ""
    };
  },
  props: {
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
.input-search {
  height: 50px;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid @main-color;
  font-size: 17px;

  &.small {
    height: 40px;
    font-size: 14px;
    // border-radius: 14px;
  }
  // &.small{
  //   line-height:23px;
  // }
  &.large {
    // border-radius: 30px;
    height: 60px;
    font-size: 20px;
  }
  .prefix-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    display: flex;
    align-items: center;
  }
  input {
    font-size: inherit;
    height: 100%;
    width: 100%;
    line-height: 100%;
    border: none;
    padding: 10px;
    padding-left: 1.8em;
  }
  &-button {
    // line-height: 20px;
    padding: 9px;
    cursor: pointer;
    color: #fff;
    text-align: center;
    position: absolute;
    right: 0;

    top: 0;
    width: 100px;
    height: 100%;
    background: @main-color;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
