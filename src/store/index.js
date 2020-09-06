import Vue from "vue";
import {
  fetchLoginStatus,
  fetchProfile,
  fetchLogout,
} from "../helper/requestWithToken";

export const state = Vue.observable({
  isLogin: false,
  userInfo: {},
});

const store = {
  state,

  setLoginStatus(payload) {
    state.isLogin = payload;
  },
  setUserInfo(payload) {
    state.userInfo = payload;
  },
  expireLogin() {
    state.isLogin = false;
    state.userInfo = {};
  },
  requestLoginStatus() {
    return fetchLoginStatus()
      .then((response) => {
        store.setLoginStatus(response.data);
        return response.data;
      })
      .catch((err) => Promise.reject(err));
  },
  requestLogout() {
    return fetchLogout()
      .then((res) => {
        if (res.data === "success") {
          store.expireLogin();
        }
      })
      .catch((err) => Promise.reject(err));
  },
  requestUserInfo() {
    return fetchProfile()
      .then((response) => {
        store.setUserInfo(response.data);
      })
      .catch(Promise.reject);
  },
};
export default store;

window.addEventListener("beforeunload", () => {
  localStorage.setItem("account", JSON.stringify(state));
});

// window.addEventListener("DOMContentLoaded", () => {
try {
  var account = JSON.parse(localStorage.getItem("account"));
} catch (error) {
  account = {};
}
state.isLogin = account.isLogin;
state.userInfo = account.userInfo;
// });
