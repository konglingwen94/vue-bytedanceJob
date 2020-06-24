# 首页

## 获取字节标准列表

### Request

`GET /api/byte-standards`

### Response

`HTTP/1.1 200`

```json
[
  {
    "title": "追求极致",
    "content": "不断提高要求，延迟满足感<br>在更大范围里找最优解，不放过问题，思考本质<br>持续学习和成长",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/bytestyle1clear.png"
  }
]
```

## 获取员工故事列表

`GET /staff-stories`

### Response

`HTTP/1.1 200 OK`

```json
[
  {
    "id": 1,
    "name": "熊典",
    "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianavarta.png",
    "bannerImage": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianBanner.jpg",
    "remark": "“公司没有让我们把所有时间都用来完成目标，仍然给大家很多时间，去做与业务没有直接关联的技术研究，大家都能停下脚步思考更多问题。”",
    "title": "体验最极致的成就感",
    "department": "IOS-抖音",
    "richContent": "richContent"
  },
  {
    "id": 2,
    "name": "王司羊",
    "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/siyangAvata.png",
    "bannerImage": "//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story2_bg2x_1576834857930.jpg",
    "remark": "“作为应届生加入公司，我参与了很多国际化项目，这些国际化项目经历了从 0 到 1 的过程，我一上来就可以自己带项目，这在其他公司是很少见的，对我来说也是一个极具成长性的机会。”  ",
    "title": "每个人的声音都可以被听到",
    "department": "薪酬福利绩效",
    "richContent": "richContent"
  }
]
```

## 获取员工详情

`GET /staff-stories/:id`

## Response

```json
{
  "id": 2,
  "name": "王司羊",
  "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/siyangAvata.png",
  "bannerImage": "//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story2_bg2x_1576834857930.jpg",
  "remark": "“作为应届生加入公司，我参与了很多国际化项目，这些国际化项目经历了从 0 到 1 的过程，我一上来就可以自己带项目，这在其他公司是很少见的，对我来说也是一个极具成长性的机会。”  ",
  "title": "每个人的声音都可以被听到",
  "department": "薪酬福利绩效",
  "richContent": "richContent"
}
```
