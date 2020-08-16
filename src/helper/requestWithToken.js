import axios from "axios";
import instance from "./request";
import { Message } from "element-ui";

const requestWithToken = axios.create({
  baseURL: "/api",
  xsrfCookieName: "atsx-csrf-token", // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: "x-csrf-token", // 默认的,
  // POST 添加公共请求数据字段
  transformRequest(data){
    // console.log(data)
    if(data){

      data.portal_entrance=1
    }
    return JSON.stringify(data)
  },
  headers:{'Content-Type':'application/json'}
});


requestWithToken.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (response.data.code !== 0) {
        Message.error(response.data.message);
        return Promise.reject(response.data);
      }
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response);
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 405) {
        try {
          await instance.post("/v1/csrf/token");
        } catch (error) {
          return Promise.reject(error);
        }

        return instance(error.response.config);
      }
      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export const fetchProfile = () => requestWithToken.get("/v1/user/profile");

export const fetchCommonSettings = () =>
  requestWithToken.get("/v1/common/setting");

export const fetchLoginStatus = () =>
  requestWithToken.get("/v1/user/mobile/login_status");

export const fetchEmailRegisterStatus = (payload) =>
  requestWithToken.post("/v1/user/email/register/check", payload);

export const fetchLoginByEmail = (payload) =>
  requestWithToken.post("/v1/user/email/login", payload);

export const fetchLoginByPhone = (payload) =>
  requestWithToken.post("/v1/user/mobile/login", payload);

export const fetchResume = () => requestWithToken.get("/v1/user/latest/resume");

export const fetchLogout = () => requestWithToken.post("/v1/user/logout");

export const fetchSaveResume = (resume_id, payload) =>
  requestWithToken.post(`/v1/user/resumes/${resume_id}`, payload);

// GET /api/v1/user/latest/resume  获取个人简历

// GET /api/v1/common/setting  获取简历模板编辑配置

// POST /api/v1/user/email/register/check  --data-raw '{"email":"80r4344323@qq.com"}' 检查邮箱是否已注册

// GET  /api/v1/user/profile  获取个人邮箱信息

// GET /api/v1/user/mobile/login_status  检查登录状态

// POST /api/v1/user/email/login  --data-raw '{"email":"44348843@qq.com","password:"jkljklsd"}'  邮箱登录

// POST /api/v1/user/logout  退出登录

// Post /api/v1/user/resumes/6855865337356044552  保存编辑好的简历 --data-raw '{resume:{},resume_id:'',portal_type: 2}'

// POST /api/v1/user/mobile/login  --data-raw {"country_code":"CN_1","mobile":"16692669622","auth_code":"772378","portal_entrance":1}
