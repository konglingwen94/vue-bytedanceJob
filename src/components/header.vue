<template>
  <div class="header" :class="[{ fixedToTop, },themeColor]">
    <div class="logo">
      <a href="#"></a>
    </div>
    <ul class="navbar">
      <router-link to="/" exact v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">主页</a>
        </li>
      </router-link>
      <router-link exact to="/jobs" v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">职位</a>
        </li>
      </router-link>
      <router-link to="/products" v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">产品与服务</a>
        </li>
      </router-link>

      <li class="navbar-item">
        <a href="https://job.bytedance.com/campus/" target="_blank">校园招聘</a>
      </li>
    </ul>
    <div class="login">login</div>
  </div>
</template>
<script>
// import { watchScrollDirection } from "@/helper/utilities.js";
export default {
  name: "Header",
  props: {
    fixedToTop: {
      type: Boolean,
      default: false
    },
    themeColor: {
      type: String,
      default: "main-color"
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  color: #aaa;

  display: flex;
  height: 60px;
  align-items: center;
  padding: 10px 100px;
  &.fixedToTop {
    position: fixed;
    z-index: 100;
    width: 100%;
     
  }
  &.is-transparent {
    color: #fff;
    .active {
      color: #fff;
    }
  }
}

.logo {
  width: 200px;
  height: 100%;
  a {
    background-image: url(http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg);
    // width: 200px;
    height: 100%;
    display: block;
  }
}
.navbar {
  margin-left: auto;
  margin-right: 20px;
  border-right: 1px solid #aaa;
  display: flex;
  &-item {
    padding: 4px 20px;
    &.active {
      border-bottom: 2px solid;
      color: @main-color;
    }
  }
}
</style>
