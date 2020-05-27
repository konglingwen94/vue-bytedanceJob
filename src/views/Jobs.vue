<template>
  <div class="jobs">
    <div class="banner"></div>
    <div class="search-wrapper">
      <input-search v-model="searchKeyword"></input-search>
    </div>

    <div class="main">
      <!-- 侧边栏过滤选择 -->
      <div class="clearfix aside-filter">
        <div class="header">
          <span>选择</span>
          <span :class="{clearable}" class="clear" @click="clearFilter">清空</span>
        </div>
        <div class="job-category job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
            title="职位"
            ref="jobCategory"
            v-model="job_category_id_list"
            :props="{ key: 'id', label: 'name' }"
            :data="jobCategories"
          ></checkbox-transfer>
        </div>
        <div class="job-city job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
            title="城市"
            ref="location"
            v-model="location_code_list"
            :props="{ key: 'code', label: 'name' }"
            :data="jobCities"
          ></checkbox-transfer>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="content">
        <h2 class="content-title">开启新的职位 ({{ results.count }})</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in results.job_post_list" :key="item.id">
            <h3 class="title">{{ item.title }}</h3>

            <div class="subTitle">
              <span class="city">{{ item.city_info.name }}</span>&nbsp;|
              <span class="job_category">{{ item.job_category.name }}</span>&nbsp;|
              <span class="recruitment_channel">社招</span>
            </div>
            <p class="desc">{{ item.description }}</p>
          </li>
        </ul>
        <!-- 分页器 -->
        <div class="pagination-wrapper">
          <pagination :current-page.sync="currentPage" :total="results.count"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "job",
  data() {
    const { keyword = "", job_category_id = "" } = this.$route.params;
    return {
      searchKeyword: keyword,
      currentPage: 1,
      job_category_id_list: job_category_id ? [job_category_id] : [],
      jobCategories: [],
      jobCities: [],
      location_code_list: [],
      cityList: [],
      cities: [],
      results: []
    };
  },
  created() {
    this.request
      .get("/job-filters")
      .then(response => {
        this.jobCities = response.city_list;
        this.jobCategories = response.job_type_list;
      })
      .catch();

    this.fetchList();
  },
  computed: {
    queryFilter() {
      return {
        job_category_id_list: this.job_category_id_list,
        location_code_list: this.location_code_list,
        keyword: this.searchKeyword,
        offset: Math.max(0, this.currentPage - 1) * 10
      };
    },
    clearable() {
      return this.job_category_id_list.length || this.location_code_list.length;
    }
  },
  watch: {
    queryFilter: "fetchList"
  },
  methods: {
    clearFilter() {
      this.job_category_id_list = [];
      this.location_code_list = [];
    },
    fetchList() {
      this.request
        .post("/jobs", this.queryFilter)
        .then(response => {
          if (this.results.count !== response.count) {
            this.currentPage = 1;
          }
          this.results = response;
        })
        .catch();
    }
  }
};
</script>
<style lang="less" scoped>
.banner {
  height: 400px;
  margin-bottom: 70px;
  background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");
}
.search-wrapper {
  width: 800px;
  margin: -100px auto 100px;
}
.main {
  padding: 0 100px 0 200px;
  .aside-filter {
    float: left;
    width: 300px;
    padding-right: 20px;
    .header {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      width: 100%;
      .clear {
        &.clearable {
          color: @main-color;
        }
        cursor: pointer;
      }
    }
    .job-filter-block {
      margin-bottom: 40px;
    }
  }

  .content {
    padding-left: 20px;
    border-left: 1px solid @border-lighter-color;
    margin-left: 300px;
    &-title {
      margin-bottom: 30px;
      margin-left: 20px;
    }

    &-item {
      margin-bottom: 10px;
      padding: 10px 20px;
      cursor: pointer;
      .title {
        margin: 12px 0;
      }
      .subTitle {
        color: @regular-text-color;
      }
      .desc {
        white-space: pre-line;
        font-size: 14px;
        color: @secondary-text-color;
        .text-overflow-visible-line(2);
        text-overflow: clip;
      }
      &:hover {
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
      }
    }
    .pagination-wrapper {
      margin-top: 30px;
      text-align: right;
    }
  }
}
</style>
