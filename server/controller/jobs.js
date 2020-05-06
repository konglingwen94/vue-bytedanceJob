const fetch = require("./request");

const jobCategoryData=require('../data').jobCategories
module.exports = {
  queryList(req, res) {
    // res.send('Hello Express')

    const {
      keyword = "",
      limit = 10,
      offset = 0,
      job_category_id_list = [],
    } = req.query;
    const query = {
      keyword,
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.offset) || 0,
      job_category_id_list,
    };
    const defaultParams = {
      location_code_list: [],
      recruitment_id_list: [],
      portal_type: 2,
      portal_entrance: 1,
    };
    const body = Object.assign({}, defaultParams, query);

    fetch(
      "https://job.bytedance.com/api/v1/search/job/posts?keyword=&limit=10&offset=0&job_category_id_list=&location_code_list=&recruitment_id_list=&portal_type=2&portal_entrance=1&_signature=zuaUswAAAAA62OTeT2WQd87mlKAAJBd",
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
          "x-csrf-token": "9ht04U-ub8Hx1knW3pouCKs0czeREJDbuKLhO5OOD1k=",
          cookie:
            "atsx-portal-session-v1=9wtmK2LD_dzBZyDRCNvRtZ5Ez3GnG8RL1cuW3ZM7I_A%3D; TS01f8c345=015df6ccf2b9ed3d01830bb46a013e73b27a6a11e24c95e331c229f21dba52d219498c32690bcf0d5b9437c6239562e8c5de94204b; SLARDAR_WEB_ID=f7b883c3-c67d-4cc9-998e-67e1ec50e7b2; SLARDAR_WEB_ID=f7b883c3-c67d-4cc9-998e-67e1ec50e7b2; UM_distinctid=1717b6472f650d-0203e3eeeb67d2-39687506-113a00-1717b6472f78cd; _ga=GA1.2.910859924.1587121096; tahiti-session-2=XN0YXJ0-bw3rfml46fmpr182qwaqc3oi5x5bb3pb-WVuZA; channel=office; platform=pc; s_v_web_id=k9td1ppp_2UxLzgaK_ewun_4y03_8MGB_20R01pDhExiB; TS01ab245c=015df6ccf294fff02de7c1cffb75154496285d38dc94c0e0e91ee693e79e3f2cfe29530ae404ff2fd1586ac222b3f26e4b0214b35b; _gid=GA1.2.1979987095.1588653540; tea_uid=6816633189395400200; atsx-portal-user-source-v1=wechat; device-id=6823223882289235463; TS0170d300=015df6ccf2803bad04c74f8c84ced46d40098d5098460a6868d1f56ebe4e0dd5348762ddca67f02b333052a3e285711018c82fb92b; atsx-csrf-token=9ht04U-ub8Hx1knW3pouCKs0czeREJDbuKLhO5OOD1k%3D",
        },
        referrer: "https://job.bytedance.com/society/position",
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
      }
    ).then((data) => {
      // console.log(data);
      res.json(data);
    });
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
  queryJobCategoryList(req,res){
res.json(jobCategoryData)
  }
};
