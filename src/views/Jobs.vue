<template>
  <div class="jobs">
    <div class="banner"></div>
    <div class="search-wrapper">
      <input-search @search="value=>searchKeyword=value"></input-search>
    </div>

    <div class="main">
      <div class="aside-filter">
        <div class="header">
          <span>选择</span>
          <span class="clear" @click="clearFilter">清空</span>
        </div>
        <div class="job-category job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
            ref="jobCategory"
            v-model="job_category_id_list"
            :props="{ key: 'id', label: 'name' }"
            :data="jobCategories"
          ></checkbox-transfer>
        </div>
        <div class="job-city job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
            ref="location"
            v-model="location_code_list"
            :props="{ key: 'code', label: 'name' }"
            :data="jobCities"
          ></checkbox-transfer>
        </div>
      </div>

      <div class="content">
        <h2 class="content-title">开启新的职位 ({{ results.count }})</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in results.job_post_list" :key="item.id">
            <h3 class="title">{{ item.title }}</h3>

            <div class="subTitle">
              <span class="city">{{ item.city_info.name }}</span>
              <span class="job_category">{{ item.job_category.name }}</span>
              <span class="recruitment_channel">社招</span>
            </div>
            <p class="desc">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "job",
  data() {
    return {
      searchKeyword: "",
      job_category_id_list: [],
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
        keyword: this.searchKeyword
      };
    }
  },
  watch: {
    queryFilter(query) {
      this.fetchList(query);
    }
  },
  methods: {
    clearFilter() {
      this.job_category_id_list=[]
      this.location_code_list=[]
       
    },
    fetchList(query) {
      this.request
        .post("/jobs", query)
        .then(response => {
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
  width: 500px;
  margin:-100px auto 100px;
}
.main {
  padding: 0 100px;
  .aside-filter {
    float: left;
    width: 300px;
    padding-right: 70px;
    .header {
      font-size:14px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom:1px solid #ccc;
      padding-bottom:20px;
      width: 100%;
      .clear {
        cursor: pointer;
        color: @main-color;
         
      }
    }
    .job-filter-block {
      margin-bottom: 70px;
    }
  }

  .content {
    padding-left: 70px;
    border-left: 1px solid #aaa;
    margin-left: 300px;
    &-title {
      margin-bottom: 40px;
    }
    &-item {
      margin-bottom: 30px;
      padding:30px;
      cursor:pointer;
      .title {
        margin-bottom: 30px;
      }
      .desc {
        white-space: pre-wrap;
      }
      &:hover {
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 0 3px 0 #ccc;
      }
    }
  }
}
</style>
