import axios from "axios";
import request from "./request";
import { Message, Notification } from "element-ui";
import router from "@/router";
import createMessage from "@/components/message";
import store from "@/store";
const requestWithToken = axios.create({
  baseURL: "/api",
  xsrfCookieName: "atsx-csrf-token", // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: "x-csrf-token", // 默认的,
  // POST 添加公共请求数据字段
  transformRequest(data) {
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (error) {}
      data.portal_entrance = 1;
    }
    return JSON.stringify(data);
  },

  headers: { "Content-Type": "application/json" },
});

requestWithToken.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (response.data.code !== 0) {
        createMessage.error(response.data.message);
        return Promise.reject(response.data);
      }
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response);
  },
  async (error) => {
    if (error.message === "Network Error") {
      Notification.error({
        title: "网络错误",
      });
    } else if (error.message && error.message.includes("timeout")) {
      Notification.error({ title: "网路超时" });
    }
    if (error.response) {
      if (error.response.status === 401) {
        router.push("/user");
        store.expireLogin();
        createMessage.error("登录过期");
      } else if (error.response.status === 405) {
        try {
          await request.post("/v1/csrf/token");
        } catch (error) {
          return Promise.reject(error);
        }

        return request(error.response.config);
      }
      return Promise.reject(error.response.data);
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

// 上传简历和解析

export const fetchUploadToken = () =>
  requestWithToken.post("/v1/attachment/upload/tokens");
export const fetchResumeParseTaskData = (id) => {
  return requestWithToken.get(`/v1/attachment/resume/parse/tasks/${id}`);
};

export const fetchResumeParseTaskToken = (payload) =>
  requestWithToken.post("/v1/attachment/resume/parse/tasks", payload);

// 简历上传作品附件获取保存token

export const fetchResumeAttachmentToken = (payload) =>
  requestWithToken.post("/v1/attachment/exchange/tokens", payload);

// 简历作品附件下载

export const fetchResumeWorksDownloadLink = (payload) =>
  requestWithToken.post("/v1/attachment/download/links", payload);

// /v1/attachment/exchange/tokens

// GET /api/v1/attachment/resume/parse/tasks  获取简历解析任务`id`

// GET /api/v1/user/latest/resume  获取个人简历

// GET /api/v1/common/setting  获取简历模板编辑配置

// POST /api/v1/user/email/register/check  --data-raw '{"email":"80r4344323@qq.com"}' 检查邮箱是否已注册

// GET  /api/v1/user/profile  获取个人邮箱信息

// GET /api/v1/user/mobile/login_status  检查登录状态

// POST /api/v1/user/email/login  --data-raw '{"email":"44348843@qq.com","password:"jkljklsd"}'  邮箱登录

// POST /api/v1/user/logout  退出登录

// Post /api/v1/user/resumes/6855865337356044552  保存编辑好的简历 --data-raw '{resume:{},resume_id:'',portal_type: 2}'

// POST /api/v1/user/mobile/login  --data-raw {"country_code":"CN_1","mobile":"16692669622","auth_code":"772378","portal_entrance":1}
