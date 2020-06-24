# 职位

## 获取职位分类

### Request

`GET /api/job-categories`

### Response

`HTTP/1.1 200 OK`

```json
[
  {
    "id": "6704215862603155720",
    "en_name": "developer",
    "zh_name": "研发",
    "image": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/jobslight/rd2.png"
  }
]
```

## 获取职位过滤条件信息

### Request

`GET /api/job-filters`

### Response

```json
{
  "job_type_list": [
    {
      "id": "6704215862603155720",
      "name": "研发",
      "en_name": "R&D",
      "i18n_name": "研发",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215862557018372",
          "name": "后端",
          "en_name": "Backend",
          "i18n_name": "后端",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215886108035339",
          "name": "前端",
          "en_name": "Frontend",
          "i18n_name": "前端",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215888985327886",
          "name": "大数据",
          "en_name": "Big data",
          "i18n_name": "大数据",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215897130666254",
          "name": "测试",
          "en_name": "Testing",
          "i18n_name": "测试",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215956018694411",
          "name": "算法",
          "en_name": "Algorithm",
          "i18n_name": "算法",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215957146962184",
          "name": "客户端",
          "en_name": "Client",
          "i18n_name": "客户端",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215958816295181",
          "name": "基础架构",
          "en_name": "Infrastructure",
          "i18n_name": "基础架构",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215963966900491",
          "name": "多媒体",
          "en_name": "Multimedia",
          "i18n_name": "多媒体",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216109274368264",
          "name": "安全",
          "en_name": "Security",
          "i18n_name": "安全",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216296701036811",
          "name": "计算机视觉",
          "en_name": "Computer vision",
          "i18n_name": "计算机视觉",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216635923761412",
          "name": "数据挖掘",
          "en_name": "Data mining",
          "i18n_name": "数据挖掘",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704217321877014787",
          "name": "运维",
          "en_name": "DevOps",
          "i18n_name": "运维",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704219452277262596",
          "name": "自然语言处理",
          "en_name": "NLP",
          "i18n_name": "自然语言处理",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704219534724696331",
          "name": "机器学习",
          "en_name": "Machine learning",
          "i18n_name": "机器学习",
          "depth": 2,
          "parent": {
            "id": "6704215862603155720",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6704215882479962371",
      "name": "运营",
      "en_name": "Operations",
      "i18n_name": "运营",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215882438019342",
          "name": "商业运营",
          "en_name": "Commerce ops",
          "i18n_name": "商业运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215908782442766",
          "name": "审核",
          "en_name": "Content auditing",
          "i18n_name": "审核",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215955154667787",
          "name": "用户运营",
          "en_name": "User ops",
          "i18n_name": "用户运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215961064442123",
          "name": "内容运营",
          "en_name": "Content ops",
          "i18n_name": "内容运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216001937934599",
          "name": "频道运营",
          "en_name": "Channel ops",
          "i18n_name": "频道运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216057269192973",
          "name": "产品运营",
          "en_name": "Product ops",
          "i18n_name": "产品运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216853931100430",
          "name": "销售运营",
          "en_name": "Sales ops",
          "i18n_name": "销售运营",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704217437631416580",
          "name": "编辑",
          "en_name": "Editor",
          "i18n_name": "编辑",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704219199050352903",
          "name": "内容引进",
          "en_name": "Content intro",
          "i18n_name": "内容引进",
          "depth": 2,
          "parent": {
            "id": "6704215882479962371",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6704215864629004552",
      "name": "产品",
      "en_name": "Product",
      "i18n_name": "产品",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215864591255820",
          "name": "产品经理",
          "en_name": "Product manager",
          "i18n_name": "产品经理",
          "depth": 2,
          "parent": {
            "id": "6704215864629004552",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215924712409352",
          "name": "商业产品（广告）",
          "en_name": "Commercial product (ads)",
          "i18n_name": "商业产品（广告）",
          "depth": 2,
          "parent": {
            "id": "6704215864629004552",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216224387041544",
          "name": "数据分析",
          "en_name": "Data analysis",
          "i18n_name": "数据分析",
          "depth": 2,
          "parent": {
            "id": "6704215864629004552",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6704215913488451847",
      "name": "职能/支持",
      "en_name": "Business functions",
      "i18n_name": "职能/支持",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215913454897421",
          "name": "法务",
          "en_name": "Legal",
          "i18n_name": "法务",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216232129726734",
          "name": "战略",
          "en_name": "Strategy",
          "i18n_name": "战略",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216386916321540",
          "name": "人力",
          "en_name": "HR",
          "i18n_name": "人力",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216480889702664",
          "name": "财务",
          "en_name": "Finance",
          "i18n_name": "财务",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216727414114564",
          "name": "行政设施",
          "en_name": "Facilities",
          "i18n_name": "行政设施",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704217005358057732",
          "name": "IT支持",
          "en_name": "IT support",
          "i18n_name": "IT支持",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704219468463081735",
          "name": "采购",
          "en_name": "Procurement",
          "i18n_name": "采购",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704219470161774852",
          "name": "投资",
          "en_name": "Investment",
          "i18n_name": "投资",
          "depth": 2,
          "parent": {
            "id": "6704215913488451847",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6709824272505768200",
      "name": "销售",
      "en_name": "Sales",
      "i18n_name": "销售",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215938645887239",
          "name": "销售",
          "en_name": "Sales",
          "i18n_name": "销售",
          "depth": 2,
          "parent": {
            "id": "6709824272505768200",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704215966085024003",
          "name": "销售支持",
          "en_name": "Sales support",
          "i18n_name": "销售支持",
          "depth": 2,
          "parent": {
            "id": "6709824272505768200",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824272459630861",
          "name": "销售专员",
          "en_name": "Sales Executive",
          "i18n_name": "销售专员",
          "depth": 2,
          "parent": {
            "id": "6709824272505768200",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824273038444807",
          "name": "销售管理",
          "en_name": "Sales Manager",
          "i18n_name": "销售管理",
          "depth": 2,
          "parent": {
            "id": "6709824272505768200",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824273306880267",
          "name": "客服支持",
          "en_name": "Customer service",
          "i18n_name": "客服支持",
          "depth": 2,
          "parent": {
            "id": "6709824272505768200",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6704215901438216462",
      "name": "市场",
      "en_name": "Marketing",
      "i18n_name": "市场",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704215901392079117",
          "name": "广告投放",
          "en_name": "Advertising",
          "i18n_name": "广告投放",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216021651163395",
          "name": "营销策划",
          "en_name": "Marketing planning",
          "i18n_name": "营销策划",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216386178124040",
          "name": "PR",
          "en_name": "PR",
          "i18n_name": "PR",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216430973290760",
          "name": "品牌",
          "en_name": "Branding",
          "i18n_name": "品牌",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216870330829070",
          "name": "政府关系",
          "en_name": "Government relations",
          "i18n_name": "政府关系",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216950135851275",
          "name": "商务拓展BD",
          "en_name": "Business development",
          "i18n_name": "商务拓展BD",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704217388763580683",
          "name": "媒介公关",
          "en_name": "Media relations",
          "i18n_name": "媒介公关",
          "depth": 2,
          "parent": {
            "id": "6704215901438216462",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6709824272514156812",
      "name": "设计",
      "en_name": "Design",
      "i18n_name": "设计",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6704216194292910348",
          "name": "UI",
          "en_name": "UI",
          "i18n_name": "UI",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216380595505421",
          "name": "平面设计",
          "en_name": "Graphic design",
          "i18n_name": "平面设计",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6704216925762750724",
          "name": "交互设计",
          "en_name": "Interaction design",
          "i18n_name": "交互设计",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824272627403020",
          "name": "视觉设计",
          "en_name": "Visual Design",
          "i18n_name": "视觉设计",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824272996501772",
          "name": "用户研究",
          "en_name": "User Research",
          "i18n_name": "用户研究",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824273332046088",
          "name": "多媒体设计",
          "en_name": "Multi-media Design",
          "i18n_name": "多媒体设计",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6709824273608870155",
          "name": "3D动效",
          "en_name": "3D animation",
          "i18n_name": "3D动效",
          "depth": 2,
          "parent": {
            "id": "6709824272514156812",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    },
    {
      "id": "6794746007419619592",
      "name": "教研教学",
      "en_name": "Teaching and researching",
      "i18n_name": "教研教学",
      "depth": 1,
      "parent": null,
      "children": [
        {
          "id": "6794746007788718350",
          "name": "教研",
          "en_name": "Researcher",
          "i18n_name": "教研",
          "depth": 2,
          "parent": {
            "id": "6794746007419619592",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6794746008191371528",
          "name": "主讲",
          "en_name": "Instructor",
          "i18n_name": "主讲",
          "depth": 2,
          "parent": {
            "id": "6794746007419619592",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6794746008547887367",
          "name": "课程辅导",
          "en_name": "Advisor",
          "i18n_name": "课程辅导",
          "depth": 2,
          "parent": {
            "id": "6794746007419619592",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        },
        {
          "id": "6794746008740825352",
          "name": "教务管理",
          "en_name": "Teaching affair administrator",
          "i18n_name": "教务管理",
          "depth": 2,
          "parent": {
            "id": "6794746007419619592",
            "name": null,
            "en_name": null,
            "i18n_name": null,
            "depth": null,
            "parent": null,
            "children": null
          },
          "children": null
        }
      ]
    }
  ],
  "city_list": [
    {
      "code": "CT_11",
      "name": "北京",
      "en_name": "Beijing",
      "location_type": 3,
      "i18n_name": "北京",
      "py_name": "beijing"
    },

    {
      "code": "CT_88",
      "name": "临汾",
      "en_name": "Linfen",
      "location_type": 3,
      "i18n_name": "临汾",
      "py_name": "linfen"
    },
    {
      "code": "CT_120",
      "name": "曲靖",
      "en_name": "Qujing",
      "location_type": 3,
      "i18n_name": "曲靖",
      "py_name": "qujing"
    },
    {
      "code": "CT_116",
      "name": "莆田",
      "en_name": "Putian",
      "location_type": 3,
      "i18n_name": "莆田",
      "py_name": "putian"
    },
    {
      "code": "CT_171",
      "name": "盐城",
      "en_name": "Yancheng",
      "location_type": 3,
      "i18n_name": "盐城",
      "py_name": "yancheng"
    },
    {
      "code": "CT_105",
      "name": "南昌",
      "en_name": "Nanchang",
      "location_type": 3,
      "i18n_name": "南昌",
      "py_name": "nanchang"
    },
    {
      "code": "CT_69",
      "name": "江门",
      "en_name": "Jiangmen",
      "location_type": 3,
      "i18n_name": "江门",
      "py_name": "jiangmen"
    }
  ],
  "recruitment_type_list": null,
  "job_type_count_map": {
    "6704215862603155720": 4041,
    "6704215864629004552": 1183,
    "6704215882479962371": 2095,
    "6704215901438216462": 485,
    "6704215913488451847": 899,
    "6709824272505768200": 725,
    "6709824272514156812": 423,
    "6794746007419619592": 58
  },
  "job_subject_list": null
}
```

## 获取职位列表

`POST /jobs`

### Request

|         Field          |  Type  |    Description     |
| :--------------------: | :----: | :----------------: |
|        keyword         | String |     检索关键字     |
|         offset         | Number |  分页数据起始位置  |
|   location_code_list   | Array  | 城市定位 code 列表 |
| job_category_code_list | Array  |   职位分类 列表    |

### Response

```json
{
  "job_post_list": [
    {
      "id": "6839892023677290766",
      "title": "前端开发工程师-企业服务",
      "sub_title": "",
      "description": "1、对标全球顶级SaaS人力系统平台，打造基于SaaS平台的核心人力系统；\n2、负责高质量的设计和编码，不断优化用户体验；\n3、编写高性能，高质量，通用化前端组件；\n4、参与技术方案讨论，解决疑难；\n5、提出建设性意见，提升系统性能。",
      "requirement": "1、统招本科及以上学历，3年左右工作经验；\n2、良好的设计和编码品味，热爱写代码，能产出高质量的设计和代码；\n3、掌握WEB前端开发技术：JavaScript（含ES6）、HTML、CSS、DOM、协议、安全等；有良好的产品意识；\n4、积极乐观，认真负责，乐于协作。",
      "job_category": {
        "id": "6704215862603155720",
        "name": "研发",
        "en_name": "R&D",
        "i18n_name": "研发",
        "depth": 1,
        "parent": null,
        "children": null
      },
      "city_info": {
        "code": "CT_11",
        "name": "北京",
        "en_name": "Beijing",
        "location_type": null,
        "i18n_name": "北京",
        "py_name": null
      },
      "recruit_type": {
        "id": "101",
        "name": "全职",
        "en_name": "Full-time",
        "i18n_name": "全职",
        "depth": 2,
        "parent": {
          "id": "1",
          "name": "社招",
          "en_name": "Experienced",
          "i18n_name": "社招",
          "depth": 1,
          "parent": null,
          "children": null
        },
        "children": null
      },
      "publish_time": 1592536669000,
      "job_hot_flag": 2,
      "job_subject": null
    }
  ],
  "count": 3088,
  "extra": "{\"fe_tracking\":{\"log_id\":\"202006222133100100170182209418038\",\"query_length\":1,\"total\":3088}}"
}
```

## 获取职位详情

`GET /api/jobs/:id`

### Response

`HTTP1.1 200 OK`

```json
{
  "id": "6839892023677290766",
  "title": "前端开发工程师-企业服务",
  "sub_title": "",
  "description": "1、对标全球顶级SaaS人力系统平台，打造基于SaaS平台的核心人力系统；\n2、负责高质量的设计和编码，不断优化用户体验；\n3、编写高性能，高质量，通用化前端组件；\n4、参与技术方案讨论，解决疑难；\n5、提出建设性意见，提升系统性能。",
  "requirement": "1、统招本科及以上学历，3年左右工作经验；\n2、良好的设计和编码品味，热爱写代码，能产出高质量的设计和代码；\n3、掌握WEB前端开发技术：JavaScript（含ES6）、HTML、CSS、DOM、协议、安全等；有良好的产品意识；\n4、积极乐观，认真负责，乐于协作。",
  "job_category": {
    "id": "6704215862603155720",
    "name": "研发",
    "en_name": "R&D",
    "i18n_name": "研发",
    "depth": 1,
    "parent": null,
    "children": null
  },
  "city_info": {
    "code": "CT_11",
    "name": "北京",
    "en_name": "Beijing",
    "location_type": null,
    "i18n_name": "北京",
    "py_name": null
  },
  "recruit_type": {
    "id": "101",
    "name": "全职",
    "en_name": "Full-time",
    "i18n_name": "全职",
    "depth": 2,
    "parent": {
      "id": "1",
      "name": "社招",
      "en_name": "Experienced",
      "i18n_name": "社招",
      "depth": 1,
      "parent": null,
      "children": null
    },
    "children": null
  },
  "publish_time": 1592536669000,
  "job_hot_flag": 2,
  "job_subject": null
}
```
