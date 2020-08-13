import Vue from "vue";
import { fetchLoginStatus, fetchProfile } from "../helper/requestWithToken";

const state = Vue.observable({
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
  requestLoginStatus() {
    return fetchLoginStatus()
      .then((response) => {
        store.setLoginStatus(response.data);
      })
      .catch(Promise.reject(respons));
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
