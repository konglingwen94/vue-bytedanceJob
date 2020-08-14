<template>
  <div class="resume">
    <div class="banner"></div>

    <div class="profile">
      <div class="profile-header">
        <div class="profile-header__title">
          <h1>我的简历</h1>
          <div>
            <label v-if="resumeDetail.biz_create_time" class>
              <i class="el-icon-time"></i>
              最近更新:
            </label>
            <time>{{ resumeDetail.biz_create_time | formatDate }}</time>
          </div>
        </div>

        <div class="profile-header__editor-button">
          <router-link to="/resume/edit">
            <el-button plain round icon="el-icon-edit">编辑</el-button>
          </router-link>
        </div>
      </div>

      <div class="profile-content"></div>
    </div>
  </div>
</template>
<script>
import { fetchResume } from "@/helper/requestWithToken.js";
export default {
  name: "resume",
  data() {
    return {
      resumeDetail: {}
    };
  },

  
  methods: {
   
  },
  created() {
    fetchResume().then(res => {
      
      this.resumeDetail = res.data.resume_detail;
    });
  }
};
</script>

<style lang="less" scoped>
.banner {
  // width: 1200px;
  background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/my_resume_banner_1577084307030.jpg");
  background-size: 100% 100%;
  height: 300px;
  background-repeat: no-repeat;
}

.profile {
  width: 900px;
  margin: auto;
  margin-top: -200px;
  &-header {
    color: #fff;
    display: flex;
    justify-content: space-between;

    align-items: center;
  }

  &-content {
    margin-top: 30px;
    background: #fff;
    box-shadow: 0px 9px 20px 0px #c2c1c180;
    border-radius: 4px;
    padding: 30px;

    // &-block {
    //   min-height: 200px;
    //   margin-bottom: 30px;
    //   &__title {
    //     margin-bottom: 20px;
    //   }
    //   &-grid {
    //     float: left;
    //     width: 50%;
    //     margin-bottom: 30px;
    //     &__label {
    //       color: @secondary-text-color;
    //       font-size: @font-size-base;
    //       margin-bottom: 7px;
    //     }
    //   }

    //   &Desc{
    //     width:70%;
    //   }
    // }
  }
}
</style>
