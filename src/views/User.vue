<template>
  <div class="user">
    <div class="login">
      <ul class="login-tabbar">
        <li
          class="login-tabbar__item"
          :class="{ 'login-tabbar__item--active': loginMode === 'phone' }"
          @click="toggleLoginMode('phone')"
        >手机号登录</li>
        <li
          class="login-tabbar__item"
          @click="toggleLoginMode('email')"
          :class="{ 'login-tabbar__item--active': loginMode === 'email' }"
        >邮箱登录</li>
      </ul>

      <ul class="login-form-content">
        <li class="login-form-content__phone" v-if="loginMode === 'phone'">
          <el-form :model="phoneForm" key="phone">
            <el-form-item>
              <el-input v-model="phoneForm.phone" placeholder="输入手机号" class="input-with-select">
                <el-select slot="prepend" v-model="selectedCountry" placeholder="请选择">
                  <el-option value="disabled" disabled>选择国家和地区</el-option>
                  <hr class="input-with-select__divider" />
                  <el-option
                    :value="`+${item.val}`"
                    v-for="item in mobileCode"
                    :key="item.id"
                  >{{ item.country }} +{{ item.val }}</el-option>
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
          <el-form key="email" :rules="emailFormRules" :model="emailForm" ref="emailForm">
            <el-form-item ref="emailFormItem" prop="email">
              <el-input
                @blur="onEmailInputBlur"
                @focus="clearEmailValidation"
                v-model="emailForm.email"
                placeholder="请输入邮箱"
                autocomplete="on"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" ref="passFormItem">
              <el-input
                class="input-with-icon"
                placeholder="请输入密码"
                v-model="emailForm.password"
                :type="passwordInputType"
                @focus="$refs.passFormItem.clearValidate('password')"
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
        <bytedance-button :loading="loading" @click="handlerLogin" type="primary" size="large">登录</bytedance-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchLoginByEmail,
  fetchCommonSettings,
  fetchEmailRegisterStatus
} from "@/helper/requestWithToken.js";
import store from "@/store/index.js";

export default {
  name: "user",
  data() {
    const self = this;
    const validator = async (rule, val, cb, source, opt) => {
      await new Promise((resolve, reject) => setTimeout(resolve, 100));

      const triggerType = rule.validator && rule.validator.triggerType;

      if (triggerType === "submit") return;
      try {
        var result = await fetchEmailRegisterStatus({
          email: self.emailForm.email
        });
      } catch (error) {
        throw error;
      }

      if (result.data.email_status === 0) {
        throw new Error("邮箱未注册");
      }
    };
    const mutipleEmailRules = [
      {
        required: true,
        trigger: "blur",
        message: "邮箱不能为空"
      },
      {
        type: "email",
        trigger: "blur",
        message: "邮箱格式不正确"
      },
      {
        validator,
        trigger: "blur"
      }
    ];
    return {
      emailFormRules: {
        email: mutipleEmailRules,
        password: {
          required: true,
          message: "密码不能为空"
        }
      },
      loginMode: "email",
      mobileCode: [],
      phoneForm: {
        verifyCode: "",
        phone: ""
      },
      emailForm: {
        email: "",
        password: ""
      },
      passwordInputType: "password",
      selectedCountry: "",
      loading: false
    };
  },

  created() {
    fetchCommonSettings().then(response => {
      this.mobileCode = response.data.mobile_code;
    });
  },
   
  methods: {
    async handlerLogin() {
      if (this.loginMode !== "email") {
        this.$message.warning("功能开发中，请使用邮箱登录");
      }

      this.emailFormRules.email[2].validator.triggerType = "submit";
      try {
        await this.$refs.emailForm.validate();
      } catch (err) {
        return;
      }

      try {
        var loginResult = await fetchLoginByEmail(this.emailForm);
      } catch (error) {
        return error;
      }
      try {
        var isLogin = await store.requestLoginStatus();
      } catch (error) {
        return;
      }
      this.loading = true;
      try {
        await store.requestUserInfo();
      } catch (error) {
        this.loading = false;

        return error;
      }
      this.loading = false;

      this.$router.push("/");
    },
    onEmailInputBlur() {
      this.emailFormRules.email[2].validator.triggerType = "blur";
    },
    clearEmailValidation() {
      this.$refs.emailForm.clearValidate("email");
    },

    toggleLoginMode(mode) {
      this.loginMode = mode;
    },
    togglePasswordInputType() {
      this.passwordInputType =
        this.passwordInputType === "password" ? "text" : "password";
    }
  }
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
