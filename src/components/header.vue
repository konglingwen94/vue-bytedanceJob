<template>
  <div class="header" :class="[{ fixedToTop }, themeColor]">
    <div class="logo">
      <a href="/">
        <logo :is-transparent="themeColor === 'is-transparent'"></logo>
      </a>
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
    </ul>|
    <div class="user">
      <div class="login" v-if="!state.isLogin">
        <router-link to="/user">
          <span class="login__text">登录</span>
        </router-link>
      </div>

      <div class="dropdown-menu" v-else>
        <span class="dropdown-menu__email">
          {{ state.userInfo.email }}
          <i class="arrow"></i>
        </span>
        <ul class="dropdown-menu__wrapper">
          <li class="dropdown-menu__item">
            <router-link to="/resume">我的简历</router-link>
          </li>
          <li class="dropdown-menu__item" @click="handleLogout">退出</li>

          
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "Header",
  data: () => ({
    state: store.state
  }),
  created() {
    store
      .requestLoginStatus()
      .then(isLogin => {
        if (!isLogin) {
          store.expireLogin();
        } else if (isLogin && !this.state.userInfo.email) {
           
          store
            .requestUserInfo()
            .then(res => {})
            .catch(err => {});
        }
      })
      .catch(err => {
        store.expireLogin();
      });
  },
  props: {
    fixedToTop: {
      type: Boolean,
      default: false
    },
    themeColor: {
      type: String,
      default: "main-color"
    }
  },
  methods: {
    handleLogout() {
      store
        .requestLogout()
        .then(res => {
          this.$router.push("/");
        })
        .catch(err => {
          throw err;
        });
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

    width: 100%;
  }
  &.main-color {
    background-color: rgba(255, 255, 255, 0.8);
    .navbar-item {
      &:hover {
        color: @main-color;
      }
    }
    .login-text {
      color: @main-color;
    }
  }
  &.is-transparent {
    color: #fff;
    .navbar-item {
      &:hover {
        color: #ccc;
      }
    }
    .active {
      color: #fff;
    }
  }
}

.logo {
  width: 200px;
  height: 100%;
  a {
    height: 100%;
    display: block;
  }
}
.navbar {
  margin-left: auto;
  margin-right: 20px;

  display: flex;
  &-item {
    padding: 4px 20px;

    &.active {
      border-bottom: 2px solid;
      color: @main-color;
    }
  }
}
.user {
  margin-left: 40px;
  position: relative;

  .arrow {
    display: inline-block;
    border: 1px solid;
    border-width: 1px 1px 0 0;
    transform: rotate(135deg);
    transform-origin: center;
    vertical-align: 5px;
    margin-left: 5px;
    transition: all 0.3s;
    width: 10px;
    height: 10px;
  }
  &:hover {
    .arrow {
      transform: rotate(-45deg);
      vertical-align: -3px;
    }
    .dropdown-menu__wrapper {
      display: block;
    }
  }
  .dropdown-menu {
    position: relative;
    z-index: 1000;
    &__email {
      line-height: 2;
      cursor: pointer;
    }
    &__wrapper {
      // padding-top:10px;
      position: absolute;
      display: none;
      right: 0;
      color: @regular-text-color;
      // &__wrapper {
      padding: 9px 0;
      width: 200px;
      border-radius: 5px;
      box-shadow: 0 0px 2px 1px #eee;
      background: #fff;
      // }
    }
    &__item {
      padding: 9px 12px;
      cursor: pointer;
      &:hover {
        background: #efefef58;
      }
    }
  }
}
</style>
