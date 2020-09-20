<template>
  <div class="job-detail">
    <h1 class="job-detail-title">{{ jobDetail.title }}</h1>
    <div class="job-detail-subTitle" v-if="jobDetail.id">
      <span class="city_info">{{ jobDetail.city_info.name }}</span
      >&nbsp;|
      <span class="job_category">{{ jobDetail.job_category.name }}</span
      >&nbsp;|
      <span class="recruit_type">{{ jobDetail.recruit_type.name }}</span>
    </div>
    <div class="job-detail-description job-detail-block">
      <h2>职位描述</h2>
      <pre class="textContent">{{ jobDetail.description }}</pre>
    </div>
    <div class="job-detail-requirement job-detail-block">
      <h2>职位要求</h2>
      <pre class="textContent">{{ jobDetail.requirement }}</pre>
    </div>
    <div class="job-detail-button job-detail-block">
      <bytedance-button @click="delivery" size="large">投递</bytedance-button>
    </div>
  </div>
</template>
<script>
import { state } from "@/store";
export default {
  name: "job-detail",
  data() {
    return { jobDetail: {} };
  },

  methods: {
    delivery() {
      if (!state.isLogin) {
        this.$router.push("/user");
      } else {
        this.$message.warning("功能开发中...");
      }
    }
  },
  created() {
    let loading = this.$loading({ position: { top: 60 } });
    const { id } = this.$route.params;
    this.request
      .get(`/jobs/${id}`)
      .then(res => {
        this.jobDetail = res.job_post_detail;
        loading.close();
      })
      .catch(loading.close);
  }
};
</script>
<style lang="less" scoped>
.job-detail {
  width: 800px;
  
  margin: auto;
  margin-top: 100px;
  line-height: 2em;
  &-subTitle {
    font-size: @font-size-base;
    color: @primary-text-color;
    margin: 20px 0;
  }
  &-description {
    .textContent {
      white-space: pre-line;
    }
  }
  &-block {
    h2 {
      margin-bottom: 20px;
    }
    margin: 40px 0;
    .textContent {
      font-size: @font-size-base;
      color: @primary-text-color;
    }
  }
  &-button {
    width: 200px;
  }
}
</style>
