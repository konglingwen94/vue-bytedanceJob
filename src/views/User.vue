<template>
  <div class="user">
    <div class="login">
      <ul class="login-tabbar">
        <li
          class="login-tabbar__item"
          :class="{ 'login-tabbar__item--active': loginMode === 'phone' }"
          @click="toggleLoginMode('phone')"
        >
          手机号登录
        </li>
        <li
          class="login-tabbar__item"
          @click="toggleLoginMode('email')"
          :class="{ 'login-tabbar__item--active': loginMode === 'email' }"
        >
          邮箱登录
        </li>
      </ul>

      <ul class="login-form-content">
        <li class="login-form-content__phone" v-if="loginMode === 'phone'">
          <el-form>
            <el-form-item>
              <el-input
                v-model="phoneForm.phone"
                placeholder="输入手机号"
                class="input-with-select"
              >
                <el-select
                  slot="prepend"
                  v-model="selectedCountry"
                  placeholder="请选择"
                >
                  <el-option value="disabled" disabled
                    >选择国家和地区</el-option
                  >
                  <hr class="input-with-select__divider" />
                  <el-option
                    :value="`+${item.val}`"
                    v-for="item in mobileCode"
                    :key="item.id"
                    >{{ item.country }} +{{ item.val }}</el-option
                  >
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="phoneForm.verifyCode" placeholder="输入验证码">
                <el-button type="primary" slot="append">验证码登录</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </li>
        <li class="login-form-content__email" v-else>
          <el-form>
            <el-form-item>
              <el-input
                v-model="emailForm.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                class="input-with-icon"
                placeholder="请输入密码"
                v-model="emailForm.password"
                :type="passwordInputType"
              >
                <i
                  slot="suffix"
                  :class="
                    passwordInputType === 'password'
                      ? 'el-icon-turn-off'
                      : 'el-icon-open'
                  "
                  @click="togglePasswordInputType"
                />
              </el-input>
            </el-form-item>
          </el-form>
        </li>
      </ul>
      <div class="login__button">
        <bytedance-button type="primary" size="large">登录</bytedance-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginMode: "phone",
      mobileCode: [],
      phoneForm: {
        verifyCode: "",
        phone: "",
      },
      emailForm: {
        email: "",
        password: "",
      },
      passwordInputType: "password",
      selectedCountry: "",
    };
  },
  created() {
    this.request("/v1/common/setting").then((response) => {
      console.log(response);
      this.mobileCode = response.data.mobile_code;
    });
  },
  methods: {
    toggleLoginMode(mode) {
      // console.log(tab, event);
      this.loginMode = mode;
    },
    togglePasswordInputType() {
      this.passwordInputType =
        this.passwordInputType === "password" ? "text" : "password";
    },
  },
};
</script>
<style lang="less">
.input-with-select {
  &__divider {
    border-color: @border-extralight-color;
    border-top-width: 0;
    margin-top: 0;
  }
  .el-select .el-input {
    width: 130px;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
}
.input-with-icon {
  .el-input__suffix {
    cursor: pointer;
    margin-right: 3px;
  }
}

.el-form-item {
  margin-bottom: 30px;
}
</style>
<style scoped lang="less">
.login {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  &-tabbar {
    display: flex;

    &__item {
      padding-bottom: 8px;
      margin-right: 30px;
      cursor: pointer;
      font-weight: @font-weight-primary;
      font-size: @font-size-large;
      color: @secondary-text-color;
      &:hover {
        color: @main-color;
      }
      &--active {
        border-bottom: 2px solid @main-color;
        color: @main-color;
      }
    }
  }

  &-form-content {
    margin: 40px 0;
  }
}
</style>
