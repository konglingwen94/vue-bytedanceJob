const path = require("path");
const express = require("express");
const history = require("connect-history-api-fallback");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = require("./router");

const app = express();
const bodyParser = require("body-parser");

const proxyOpts = {
  target: "https://job.bytedance.com",
  changeOrigin: true,
  cookieDomainRewrite: "", //去除cookie的默认携带域名

  onProxyRes(proxyResponse, req, res) {
    if (proxyResponse.headers["set-cookie"]) {
      // 去除原服务器响应 cookie 的`secure`和`httpOnly`字段
      const cookies = proxyResponse.headers["set-cookie"].map((cookie) => {
        return cookie.replace(/; secure/gi, "").replace(/; httpOnly/gi, "");
      });
      proxyResponse.headers["set-cookie"] = cookies;
    }
  },
};
// 使用代理服务转发请求
app.use("/api/v1", createProxyMiddleware(proxyOpts));

app.use(bodyParser());
// 自定义路由转发
app.use("/api", router);
app.use(
  history({
    index: "/index.html",
  })
);
app.use(express.static(path.join(__dirname, "dist")));

app.listen(3000, () => {
  if (process.env.NODE_ENV !== "production") {
    console.clear();
  }
  console.log("Server is listening on http://localhost:3000");
});
