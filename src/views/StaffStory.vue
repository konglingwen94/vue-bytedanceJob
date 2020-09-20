<template>
  <div class="staff-story">
    <div class="banner" :style="`backgroundImage:url(${dataInfo.bannerImage})`">
      <div class="textContent">
        <div class="remark">{{ dataInfo.remark }}</div>
        <div class>{{ dataInfo.name }}-{{ dataInfo.department }}</div>
      </div>
    </div>
    <div class="content">
      <h1 class="title">{{ dataInfo.title }}</h1>
      <div class="department">{{ dataInfo.department }}</div>
      <div class="richContent" v-html="dataInfo.richContent"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "staff-story",
  data() {
    return {
      dataInfo: {},
      otherStaffStories: []
    };
  },
  created() {
    const { id } = this.$route.params;
    this.request
      .get(`/staff-stories/${id}`)
      .then(response => {
        this.dataInfo = response;
        this.request.get("/staff-stories").then(response => {
          this.otherStaffStories = response.filter(item => {
            return item.id !== this.dataInfo.id;
          });
        });
      })
      .catch(console.error);
  }
};
</script>
<style lang="less" scoped>
.staff-story {
  .banner {
    height: 550px;
    min-width: @main-width;
    background-repeat: no-repeat;
    background-size: 160%;
    padding: 120px;
    color: #fff;
    font-size: @font-size-medium;
    font-weight: @font-weight-primary;
    line-height: @font-line-height-large;
    background-position: center top;
    .textContent {
      width: 500px;
      .remark {
        margin-bottom: 30px;
      }
    }
  }
  .content {
    width: 720px;
    margin: auto;

    .title {
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
