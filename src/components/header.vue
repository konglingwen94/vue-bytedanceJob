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
        <a href="https://job.bytedance.com/campus" target="_blank">校园招聘</a>
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
    <div class="github-project">
      <a
        href="https://github.com/konglingwen94/vue-bytedanceJob"
        target="_blank"
        aria-label="View source on Github"
        class="github-corner github-corner"
      >
        <svg
          data-v-09fe1acc
          width="80"
          height="80"
          viewBox="0 0 250 250"
          aria-hidden="true"
          style="fill: rgb(64, 201, 198); color: rgb(255, 255, 255);"
        >
          <path data-v-09fe1acc d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            data-v-09fe1acc
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            class="octo-arm"
            style="transform-origin: 130px 106px 0px;"
          />
          <path
            data-v-09fe1acc
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          />
        </svg>
      </a>
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
  min-width: 900px;
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
    padding: 4px 0px;
    margin: 0 20px;
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
      position: absolute;
      display: none;
      right: 0;
      color: @regular-text-color;
      padding: 9px 0;
      width: 200px;
      border-radius: 5px;
      box-shadow: 0 0px 2px 1px #eee;
      background: #fff;
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
.github-project {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
