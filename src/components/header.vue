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
      <a href="https://github.com/konglingwen94/vue-bytedanceJob" target="_blank">
        <svg
          class="octicon octicon-mark-github v-align-middle"
          height="32"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
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
.github-project {
  margin-left: 30px;
  margin-right: -30px;
}
</style>
