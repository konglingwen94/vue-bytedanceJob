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

      <div class="resumeForm">
        <!-- 基本信息 -->
        <div class="resumeViewSection">
          <h2 class="resumeViewSection__title">基本信息</h2>

          <div class="resumeViewForm">
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">姓名</div>
              <div class="resumeViewItem__content">{{ resumeDetail.name }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">手机号</div>
              <div class="resumeViewItem__content">
                {{ resumeDetail.mobile_number }}
              </div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">邮箱</div>
              <div class="resumeViewItem__content">
                {{ resumeDetail.email }}
              </div>
            </div>
          </div>
        </div>
        <!-- 工作经历 -->
        <div
          class="resumeViewSection"
          v-if="resumeDetail.career_list && resumeDetail.career_list.length"
        >
          <h2 class="resumeViewSection__title">工作经历</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.career_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">公司</div>
              <div class="resumeViewItem__content">{{ item.company }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">起止时间</div>
              <div class="resumeViewItem__content">
                {{ item.start_time | formatDate(false) }} ~
                {{ item.end_time | formatDate(false) }}
              </div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">职位</div>
              <div class="resumeViewItem__content">{{ item.title }}</div>
            </div>
            <div class="resumeViewItem resumeViewItem-desc">
              <div class="resumeViewItem__label">描述</div>
              <div class="resumeViewItem__content">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- 教育经历 -->
        <div class="resumeViewSection">
          <h2 class="resumeViewSection__title">教育经历</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.education_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">学校</div>
              <div class="resumeViewItem__content">{{ item.school }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">起止时间</div>
              <div class="resumeViewItem__content">
                {{ item.start_time | formatDate(false) }} ~
                {{ item.end_time | formatDate(false) }}
              </div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">专业</div>
              <div class="resumeViewItem__content">{{ item.major }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">学历</div>
              <div class="resumeViewItem__content">{{ item.description }}</div>
            </div>
          </div>
        </div>

        <!-- 实习经历 -->
        <div
          class="resumeViewSection"
          v-if="
            resumeDetail.internship_list && resumeDetail.internship_list.length
          "
        >
          <h2 class="resumeViewSection__title">实习经历</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.internship_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">公司</div>
              <div class="resumeViewItem__content">{{ item.company }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">起止时间</div>
              <div class="resumeViewItem__content">
                {{ item.start_time | formatDate(false) }} ~
                {{ item.end_time | formatDate(false) }}
              </div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">职位</div>
              <div class="resumeViewItem__content">{{ item.position }}</div>
            </div>
            <div class="resumeViewItem resumeViewItem-desc">
              <div class="resumeViewItem__label">描述</div>
              <div class="resumeViewItem__content">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- 项目 -->
        <div
          class="resumeViewSection"
          v-if="resumeDetail.project_list && resumeDetail.project_list.length"
        >
          <h2 class="resumeViewSection__title">项目</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.project_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">项目名称</div>
              <div class="resumeViewItem__content">{{ item.name }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">起止时间</div>
              <div class="resumeViewItem__content">
                {{ item.start_time | formatDate(false) }} ~
                {{ item.end_time | formatDate(false) }}
              </div>
            </div>
            <div class="resumeViewItem" v-if="item.role">
              <div class="resumeViewItem__label">角色</div>
              <div class="resumeViewItem__content">{{ item.role }}</div>
            </div>
            <div class="resumeViewItem" v-if="item.link">
              <div class="resumeViewItem__label">项目连接</div>
              <div class="resumeViewItem__content">
                <a
                  target="_blank"
                  :href="item.link"
                  class="resumeViewItem__content-link"
                  >{{ item.link }}</a
                >
              </div>
            </div>
            <div class="resumeViewItem resumeViewItem-desc">
              <div class="resumeViewItem__label">描述</div>
              <div class="resumeViewItem__content">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- 作品 -->
        <div
          class="resumeViewSection"
          v-if="resumeDetail.works_list && resumeDetail.works_list.length"
        >
          <h2 class="resumeViewSection__title">作品</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.works_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem" v-if="item.works_attachment">
              <div class="resumeViewItem__label">作品附件</div>
              <div class="resumeViewItem__content is-link">
                <a
                  @click="downloadWorks(item, index)"
                  :href="item.url"
                  ref="worksNode"
                  :download="item.url"
                  class="resumeViewItem__content-download"
                  >{{ item.works_attachment.name }}</a
                >
              </div>
            </div>
            <div class="resumeViewItem" v-if="item.link">
              <div class="resumeViewItem__label">作品链接</div>
              <div class="resumeViewItem__content">
                <a
                  target="_blank"
                  :href="item.link"
                  class="resumeViewItem__content-link"
                  >{{ item.link }}</a
                >
              </div>
            </div>
            <div class="resumeViewItem resumeViewItem-desc">
              <div class="resumeViewItem__label">描述</div>
              <div class="resumeViewItem__content">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- 获奖 -->
        <div
          class="resumeViewSection"
          v-if="resumeDetail.award_list && resumeDetail.award_list.length"
        >
          <h2 class="resumeViewSection__title">获奖</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.award_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">获奖名称</div>
              <div class="resumeViewItem__content">{{ item.title }}</div>
            </div>
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">获奖时间</div>
              <div class="resumeViewItem__content">
                {{ item.award_time | formatDate(false) }}
              </div>
            </div>
            <div class="resumeViewItem resumeViewItem-desc">
              <div class="resumeViewItem__label">描述</div>
              <div class="resumeViewItem__content">{{ item.desc }}</div>
            </div>
          </div>
        </div>
        <!-- 语言 -->
        <div
          class="resumeViewSection"
          v-if="
            resumeDetail.language_skill_list &&
              resumeDetail.language_skill_list.length
          "
        >
          <h2 class="resumeViewSection__title">语言能力</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.language_skill_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">语言</div>
              <div class="resumeViewItem__content">{{ item.language }}</div>
            </div>

            <div class="resumeViewItem">
              <div class="resumeViewItem__label">精通程度</div>
              <div class="resumeViewItem__content">{{ item.proficiency }}</div>
            </div>
          </div>
        </div>

        <!-- 社交账号 -->
        <div
          class="resumeViewSection"
          v-if="resumeDetail.sns_list && resumeDetail.sns_list.length"
        >
          <h2 class="resumeViewSection__title">社交账号</h2>

          <div
            :key="index"
            v-for="(item, index) in resumeDetail.sns_list"
            class="resumeViewForm clearfix"
          >
            <div class="resumeViewItem">
              <div class="resumeViewItem__label">社交平台</div>
              <div class="resumeViewItem__content">{{ item.sns_type }}</div>
            </div>

            <div class="resumeViewItem">
              <div class="resumeViewItem__label">URL/ID</div>
              <div class="resumeViewItem__content">{{ item.link }}</div>
            </div>
          </div>
        </div>
        <!-- 自我评价 -->
        <div
          class="resumeViewSection"
          v-if="
            resumeDetail.self_evaluation && resumeDetail.self_evaluation.trim()
          "
        >
          <h2 class="resumeViewSection__title">自我评价</h2>

          <div class="resumeViewForm">
            <div class="resumeViewItem resumeViewItem-desc">
              {{ resumeDetail.self_evaluation }}
            </div>
          </div>
        </div>
        <div class="resumeViewSection" v-if="resumeDetail.resume_attachment">
          <h2 class="resumeViewSection__title">简历</h2>
          <div class="resumeViewItem resumeViewItem__resumeAttachment">
            <div class="fileIcon">
              <file-icon :file-type="resumeFileType"></file-icon>
            </div>
            <div class="content">
              <h3>{{ resumeDetail.resume_attachment.name }}</h3>
              <time>
                上传时间：{{
                  resumeDetail.resume_attachment.create_time | formatDate
                }}
              </time>
            </div>
            <div class="download-link">
              <a
                ref="resumeDownloadLink"
                :href="resumeAttachmentLink"
                :download="resumeAttachmentLink"
                @click="
                  downloadResume(
                    resumeDetail.resume_attachment &&
                      resumeDetail.resume_attachment.id
                  )
                "
              >
                <i class="el-icon-download"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchResume,
  fetchResumeWorksDownloadLink,
} from "@/helper/requestWithToken.js";

export default {
  name: "resume",
  data() {
    return {
      resumeDetail: {},
      resumeAttachmentLink: "",
    };
  },
  computed: {
    resumeFileType() {
      const pathArr = this.resumeDetail.resume_attachment.name.split(".");
      return pathArr[pathArr.length - 1];
    },
  },
  methods: {
    downloadResume(id) {
      if (this.resumeAttachmentLink) return;
      fetchResumeWorksDownloadLink({
        portal_attachment_id: id,
        resume_id: this.resumeDetail.id,
      }).then((response) => {
        const { url } = response.data;
        this.resumeAttachmentLink = url;
        this.$nextTick(() => {
          this.$refs.resumeDownloadLink.click();
        });
      });
    },
    downloadWorks(item, index) {
      if (item.url) return;
      fetchResumeWorksDownloadLink({
        portal_attachment_id: item.works_attachment.id,
        resume_id: this.resumeDetail.id,
      }).then((response) => {
        const { url } = response.data;
        this.$set(item, "url", url);
        this.$nextTick(() => {
          this.$refs.worksNode[index].click();
        });
      });
    },
  },
  created() {
    const loading = this.$loading();
    fetchResume()
      .then((res) => {
        loading.close();
        this.resumeDetail = res.data.resume_detail;
      })
      .catch((err) => {
        loading.close();
      });
  },
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

  .resumeForm {
    margin-top: 30px;
    background: #fff;
    box-shadow: 0px 9px 20px 0px #c2c1c180;
    border-radius: 4px;
    padding: 30px;

    .resumeViewSection {
      min-height: 200px;
      margin-bottom: 30px;
      &__title {
        margin-bottom: 20px;
      }
      .resumeViewForm {
        margin-bottom: 30px;
      }
      .resumeViewItem {
        float: left;
        width: 50%;
        margin-bottom: 20px;
        min-height: 50px;
        &__resumeAttachment {
          display: flex;
          padding: 10px;
          background-color: @bg-base-color;
          align-items: center;
          time {
            color: @regular-text-color;
            font-size: @font-size-base;
          }
          .fileIcon {
            margin-right: 10px;
            width: 50px;
            height: 50px;
          }
          .download-link {
            margin-left: auto;

            .el-icon-download {
              font-size: @font-size-large;
              border-radius: 50%;
              border: 1px solid @border-base-color;
              padding: 4px;
            }
            &:hover {
              color: @main-color;
            }
          }
        }
        &__content.is-link {
          color: @main-color;
          cursor: pointer;
        }
        &__label {
          color: @secondary-text-color;
          font-size: @font-size-base;
          margin-bottom: 7px;
        }
        &__content-link {
          color: @main-color;
        }
        &-desc {
          overflow: hidden;
          width: 70%;
          white-space: pre-line;
        }
      }
    }
  }
}
</style>
