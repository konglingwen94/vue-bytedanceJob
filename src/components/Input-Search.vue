<template>
  <div class="input-search">
    <input
      v-bind="$attrs"
      type="text"
      v-model="value"
      @input="$emit('input', value)"
    />
    <span @click="$emit('search', value)" class="input-search-button"
      >搜索</span
    >
  </div>
</template>
<script>
export default {
  name: "input-search",
  data() {
    return {
      value: "",
    };
  },
};
</script>
<style lang="less" scoped>
.input-search {
  line-height: 20px;
  position: relative;
  input {
    width: 100%;
    border-radius: 20px;
    border: 1px solid @main-color;
    padding: 10px;
  }
  &-button {
    // line-height: 20px;
    padding: 9px 0;
    cursor: pointer;
    color: #fff;
    text-align: center;
    position: absolute;
    right: 0;
    border-radius: 0 20px 20px 0;
    top: 0;
    width: 50px;
    height: 100%;
    background: @main-color;
  }
}
</style>
