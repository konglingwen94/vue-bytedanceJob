const fetch = require("./request");
const nodeFetch = require("node-fetch");

const jobCategoryData = require("../data").jobCategories;

function getToken() {
  return new Promise((resolve, reject) => {
    nodeFetch("https://job.bytedance.com/api/v1/csrf/token", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN",
        "cache-control": "no-cache",
        "content-type": "application/json",
        env: "undefined",
        "portal-channel": "office",
        "portal-platform": "pc",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "website-path": "society",
        "x-csrf-token": "undefined",
        cookie:
          "device-id=6827732091456734728; channel=office; platform=pc; s_v_web_id=kajdwbmc_ky2u7BTY_vJ3s_4cMa_ArgO_kBEC9SWUgOnI; SLARDAR_WEB_ID=f21ae273-b302-4fc7-8d9e-05bec4b51f96",
      },
      referrer:
        "https://job.bytedance.com/society/position?keywords=&category=6704215913488451847&location=&type=&job_hot_flag=&current=1&limit=10",
      referrerPolicy: "no-referrer-when-downgrade",
      body: '{"portal_entrance":1}',
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        const cookie = res.headers.get("set-cookie");

        const cookies = cookie.split(",").map((item) => item.split(";")[0]);

        // console.log(cookies);
        // debugger;
        resolve(cookies);
      })
      .catch(reject);
  });
}

module.exports = {
  queryOne(req,res) {
    const id=req.params.id
    fetch(
      `https://job.bytedance.com/api/v1/job/posts/${id}?portal_type=2&_signature=yG3fiAAAAAA.j3g6Dz7uK8ht35AAJar&portal_type=2`,
      {
        credentials: "include",
        headers: {},
        referrer:
          "https://job.bytedance.com/society/position/detail",
        referrerPolicy: "no-referrer-when-downgrade",
        body: null,
        method: "GET",
        mode: "cors",
      }
    ).then(data=>{
      res.json(data)
    }).catch(res.json)
  },
  async queryList(req, res) {
    // res.send('Hello Express')

    // const {   } = req.query;
    const {
      limit = 10,
      offset = 0,
      keyword = "",
      job_category_id_list,
      location_code_list,
    } = req.body;
    const query = {
      keyword,
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0,
      job_category_id_list,
      location_code_list,
    };
    const defaultParams = {
      location_code_list: [],
      recruitment_id_list: [],
      portal_type: 2,
      portal_entrance: 1,
    };
    const body = Object.assign({}, defaultParams, query);

    try {
      var token = await getToken();
    } catch (error) {
      // return res.json(error);
    }

    fetch(
      "https://job.bytedance.com/api/v1/search/job/posts?keyword=&limit=10&offset=0&recruitment_id_list=&portal_type=2&portal_entrance=1&_signature=crKjawAAAACGjNMGOexSmXKyo3AACx8",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN",
          "cache-control": "no-cache",
          "content-type": "application/json",
          env: "undefined",
          "portal-channel": "office",
          "portal-platform": "pc",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "website-path": "society",
          "x-csrf-token": token[0].split("=")[1].slice(0, -3) + "=",
          cookie: token.join(";"),
        },
        referrer:
          "https://job.bytedance.com/society/position?keywords=&category=&location=&type=&job_hot_flag=&current=1&limit=10",
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
      }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {});
  },
  queryFilters(req, res) {
    fetch(
      "https://job.bytedance.com/api/v1/config/job/filters/2?_signature=zuaUswAAAAA62OTeT2XUYc7mlKAAJBd",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN",
          "cache-control": "no-cache",
          env: "undefined",
          "portal-channel": "office",
          "portal-platform": "pc",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "website-path": "society",
          "x-csrf-token": "kr_-_jAg_pMovAUAf83zxiUtxk27hVtBaTgAsl-xOOw=",
          cookie:
            "atsx-portal-session-v1=9wtmK2LD_dzBZyDRCNvRtZ5Ez3GnG8RL1cuW3ZM7I_A%3D; TS01f8c345=015df6ccf2b9ed3d01830bb46a013e73b27a6a11e24c95e331c229f21dba52d219498c32690bcf0d5b9437c6239562e8c5de94204b; SLARDAR_WEB_ID=f7b883c3-c67d-4cc9-998e-67e1ec50e7b2; SLARDAR_WEB_ID=f7b883c3-c67d-4cc9-998e-67e1ec50e7b2; UM_distinctid=1717b6472f650d-0203e3eeeb67d2-39687506-113a00-1717b6472f78cd; _ga=GA1.2.910859924.1587121096; tahiti-session-2=XN0YXJ0-bw3rfml46fmpr182qwaqc3oi5x5bb3pb-WVuZA; channel=office; platform=pc; s_v_web_id=k9td1ppp_2UxLzgaK_ewun_4y03_8MGB_20R01pDhExiB; TS01ab245c=015df6ccf294fff02de7c1cffb75154496285d38dc94c0e0e91ee693e79e3f2cfe29530ae404ff2fd1586ac222b3f26e4b0214b35b; _gid=GA1.2.1979987095.1588653540; tea_uid=6816633189395400200; atsx-portal-user-source-v1=wechat; device-id=6823223882289235463; atsx-csrf-token=kr_-_jAg_pMovAUAf83zxiUtxk27hVtBaTgAsl-xOOw%3D; TS0170d300=015df6ccf2803bad04c74f8c84ced46d40098d5098460a6868d1f56ebe4e0dd5348762ddca67f02b333052a3e285711018c82fb92b",
        },
        referrer: "https://job.bytedance.com/society/position",
        referrerPolicy: "no-referrer-when-downgrade",
        body: null,
        method: "GET",
        mode: "cors",
      }
    ).then((data) => {
      res.json(data);
    });
  },
  queryJobCategoryList(req, res) {
    res.json(jobCategoryData);
  },
};
