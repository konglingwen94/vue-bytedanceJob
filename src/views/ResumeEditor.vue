<template>
  <div>
    <div class="resume-editor" ref="editorFrom">
      <h1>编辑简历</h1>
      <div>
        <!-- 简历 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">简历</h2>
          </div>
          <div class="resumeSection__form">
            <el-form>
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                >
                  <!-- <div> -->
                  <h3>将你的简历拖拽到此处</h3>
                  <div class="upload-button">
                    <bytedance-button round type="primary"
                      >选择文件</bytedance-button
                    >
                  </div>
                  <div>只能上传jpg/png文件，且不超过500kb</div>
                  <!-- </div> -->
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 基础信息 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">基础信息</h2>
          </div>
          <div class="resumeSection__form">
            <el-form>
              <el-form-item required label="姓名">
                <el-input v-model="resume.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" required>
                <el-input v-model="resume.mobile_number"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" required>
                <el-input v-model="resume.email"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 工作经历 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">工作经历</h2>
          </div>
          <div class="resumeSection__form">
            <el-checkbox v-model="noCareer">我没有工作经历</el-checkbox>
            <template v-for="(career, key) in resume.career_list">
              <el-form :key="key" v-if="!noCareer" label-position="top">
                <el-form-item required label="公司">
                  <el-input v-model="career.company"></el-input>
                </el-form-item>
                <el-form-item label="职位" required>
                  <el-input v-model="career.title"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" required>
                  <el-date-picker
                    value-format="timestamp"
                    v-model="career.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述" required>
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="career.desc"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.career_list.length - 1"
                      @click="
                        resume.career_list.push({
                          company: '',
                          description: '',
                          position: '',

                          start_time: 0,
                          end_time: 0,
                          daterange: [],
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.career_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 教育经历 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">教育经历</h2>
          </div>
          <div class="resumeSection__form">
            <template v-for="(item, key) in resume.education_list">
              <el-form :key="key" label-position="top">
                <el-form-item required label="学校">
                  <el-input v-model="item.school"></el-input>
                </el-form-item>
                <el-form-item label="学历" required>
                  <el-select v-model="item.degree">
                    <el-option
                      v-for="item in setting.degree"
                      :label="item.val"
                      :value="item.key"
                      :key="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业" required>
                  <el-input v-model="item.major"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" required>
                  <el-date-picker
                    value-format="timestamp"
                    v-model="item.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.education_list.length - 1"
                      @click="
                        resume.education_list.push({
                          school: '',
                          major: '',
                          education_type: '',

                          start_time: 0,
                          end_time: 0,
                          degree: -1,
                          daterange: [],
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.education_list.splice(key, 1)"
                      class="el-icon-delete"
                      v-if="key > 0"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 实习经历 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">实习经历</h2>
          </div>
          <div class="resumeSection__form">
            <template v-for="(item, key) in resume.internship_list">
              <el-form :key="key" label-position="top">
                <el-form-item required label="公司">
                  <el-input v-model="item.company"></el-input>
                </el-form-item>
                <el-form-item label="职位" required>
                  <el-input v-model="item.position"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" required>
                  <el-date-picker
                    value-format="timestamp"
                    v-model="item.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述" required>
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="item.desc"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.internship_list.length - 1"
                      @click="
                        resume.internship_list.push({
                          company: '',
                          description: '',
                          position: '',

                          start_time: 0,
                          end_time: 0,
                          daterange: [],
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.internship_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 项目经历 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">项目经历</h2>
          </div>
          <div class="resumeSection__form resumeSection__form-project">
            <template v-for="(item, key) in resume.project_list">
              <el-form :key="key" label-position="top">
                <el-form-item required label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="项目角色" required>
                  <el-input v-model="item.role"></el-input>
                </el-form-item>
                <el-form-item label="项目链接" required>
                  <el-input v-model="item.link"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" required>
                  <el-date-picker
                    start-placeholder="选择开始时间"
                    end-placeholder="选择结束时间"
                    style="width:100%"
                    value-format="timestamp"
                    v-model="item.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述" required>
                  <el-input
                    v-model="item.description"
                    :rows="5"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.project_list.length - 1"
                      @click="
                        resume.project_list.push({
                          name: '',
                          description: '',
                          link: '',
                          role: '',
                          start_time: 0,
                          end_time: 0,
                          daterange: [],
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.project_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 作品 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">作品</h2>
          </div>

          <div class="resumeSection__form">
            <div
              class="bottom-action"
              v-if="resume.works_list && resume.works_list.length === 0"
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="
                  resume.works_list.push({
                    description: '',
                    link: '',
                  })
                "
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.works_list">
              <el-form :key="key" label-position="top">
                <el-form-item label="作品附件" required>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                  >
                    <!-- <div> -->
                    <h3>将你的作品拖拽到此处</h3>
                    <div class="upload-button">
                      <bytedance-button round type="primary"
                        >选择文件</bytedance-button
                      >
                    </div>
                    <div>只能上传jpg/png文件，且不超过500kb</div>
                    <!-- </div> -->
                  </el-upload>
                </el-form-item>
                <el-form-item label="作品链接" required>
                  <el-input v-model="item.link"></el-input>
                </el-form-item>

                <el-form-item label="描述" required>
                  <el-input
                    v-model="item.description"
                    :rows="5"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.works_list.length - 1"
                      @click="
                        resume.works_list.push({
                          description: '',
                          link: '',
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.works_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 获奖 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">获奖</h2>
          </div>

          <div class="resumeSection__form">
            <div
              class="bottom-action"
              v-if="resume.award_list && resume.award_list.length === 0"
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="
                  resume.award_list.push({
                    description: '',
                    link: '',
                  })
                "
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.award_list">
              <el-form :key="key" label-position="top">
                <el-form-item label="名称" required>
                  <el-input v-model="item.title"></el-input>
                </el-form-item>
                <el-form-item label="获奖时间" required>
                  <el-date-picker
                    style="width:100%"
                    type="year"
                    v-model="item.award_time"
                    placeholder="获奖时间"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="描述" required>
                  <el-input
                    v-model="item.desc"
                    :rows="5"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.award_list.length - 1"
                      @click="
                        resume.award_list.push({
                          description: '',
                          link: '',
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.award_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>

        <!-- 语言能力 -->
        <div class="resumeSection">
          <div><h2 class="resumeSection__title">语言能力</h2></div>
          <div class="resumeSection__form">
            <div
              class="bottom-action"
              v-if="
                resume.language_skill_list &&
                  resume.language_skill_list.length === 0
              "
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="
                  resume.language_skill_list.push({
                    proficiency: '',
                    language: '',
                  })
                "
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.language_skill_list">
              <el-form :key="key">
                <el-form-item label="语言" required>
                  <el-select v-model="item.language">
                    <el-option
                      v-for="(item, index) in setting.language"
                      :label="item.val"
                      :value="item.key"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required label="精通程度">
                  <el-select v-model="item.proficiency">
                    <el-option
                      v-for="(item, index) in setting.proficiency"
                      :label="item.val"
                      :value="item.key"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.language_skill_list.length - 1"
                      @click="
                        resume.language_skill_list.push({
                          language: '',
                          proficiency: '',
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.language_skill_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
        <!-- 社交账号 -->
        <div class="resumeSection">
          <div><h2 class="resumeSection__title">社交账号</h2></div>
          <div class="resumeSection__form">
            <div
              class="bottom-action"
              v-if="resume.sns_list && resume.sns_list.length === 0"
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="
                  resume.sns_list.push({
                    proficiency: '',
                    language: '',
                  })
                "
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.sns_list">
              <el-form :key="key">
                <el-form-item label="社交账号" required>
                  <el-select v-model="item.sns_type">
                    <el-option
                      v-for="(item, index) in setting.sns"
                      :label="item.val"
                      :value="item.key"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required label="URL/ID">
                  <el-input v-model="item.link"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="bottom-action">
                    <i
                      class="el-icon-plus"
                      v-if="key === resume.sns_list.length - 1"
                      @click="
                        resume.sns_list.push({
                          language: '',
                          proficiency: '',
                        })
                      "
                      >添加</i
                    >
                    <i
                      @click="resume.sns_list.splice(key, 1)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>

        <!-- 自我评价 -->
        <div class="resumeSection">
          <div>
            <h2 class="resumeSection__title">自我评价</h2>
          </div>
          <div class="resumeSection__form">
            <div v-if="!shouldEvaluate" class="bottom-action">
              <i
                @click="shouldEvaluate = !shouldEvaluate"
                class="el-icon-plus el-icon-plus-top"
                >添加</i
              >
            </div>

            <el-form v-else>
              <el-form-item label="自我评价">
                <el-input
                  type="textarea"
                  v-model="resume.self_evaluation"
                  :rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="bottom-action">
                  <i
                    @click="
                      () => {
                        shouldEvaluate = !shouldEvaluate;
                        resume.self_evaluation = '';
                      }
                    "
                    class="el-icon-delete"
                  ></i>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="footerAction"
      :class="{ 'resumeEditor-footerAction-fix': footerActionFixed }"
      class="resumeEditor-footerAction"
    >
      <el-button round @click="$router.push('/resume')">取消</el-button>
      <el-button round size="medium" @click="submit" type="primary"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  fetchResume,
  fetchSaveResume,
  fetchCommonSettings,
} from "@/helper/requestWithToken";

export default {
  data() {
    return {
      shouldEvaluate: true,
      resume: {},
      setting: {},
      noCareer: false,
      footerActionFixed: true,
       
    };
  },
  created() {
    fetchResume().then((response) => {
      this.resume = response.data.resume_detail;
      this.addDaterange(this.resume);
    });

    fetchCommonSettings().then((response) => {
      this.setting = response.data;
    });
  },
  methods: {
    submit() {
      this.mapDaterange(this.resume);

      fetchSaveResume(this.resume.id, {
        resume: this.resume,
        portal_entrance: 1,
        resume_id: this.resume.id,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },

    mapDaterange(data) {
      for (let key in data) {
        if (key.endsWith("_list") && Array.isArray(data[key])) {
          data[key].forEach((item) => {
            if (Array.isArray(item.daterange)) {
              const [start_time, end_time] = item.daterange;
              item.start_time = start_time;
              item.end_time = end_time;
            }
          });
        }
      }
    },
    addDaterange(data) {
      const keys = ["career_list"];
      for (let key in data) {
        if (key.endsWith("_list") && Array.isArray(data[key])) {
          data[key].forEach((item) => {
            for (let prop in item) {
              const date = new Date(item[prop]);
              const timestamp = date.getTime();
              if (!Number.isNaN(timestamp) && timestamp > 1e6) {
                this.$set(item, "daterange", [
                  item.start_time,
                  item.end_time === -1 ? Date.now() : item.end_time,
                ]);
              }
            }
          });
        }
      }
    },
    onPageScroll() {
      this.footerActionFixed =
        this.$refs["editorFrom"].getBoundingClientRect().bottom >=
        this.footerActionPosition.bottom - this.footerActionPosition.height;
    },
  },
  mounted() {
    this.footerActionPosition = {
      bottom: this.$refs["footerAction"].getBoundingClientRect().bottom,
      height: this.$refs.footerAction.clientHeight,  
    };
    window.addEventListener("scroll", this.onPageScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onPageScroll);
  },
};
</script>
<style lang="less">
.el-upload {
  width: 100%;
  &-dragger {
    display: table-cell;
    vertical-align: middle;

    border: none;
    background: @bg-base-color;
    width: 600px;
    .upload-button {
      display: inline-block;
      width: 100px;
      margin: 10px 0;
    }
  }
}
.resumeSection {
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .bottom-action {
    display: flex;

    .el-icon-plus,
    .el-icon-delete {
      font-size: 22px;
      cursor: pointer;
      &-top {
        margin-left: auto;
      }
    }

    .el-icon-delete {
      margin-left: auto;
    }
  }
  .el-form {
    margin-bottom: 40px;
    &:not(:last-child) {
      border-bottom: 1px solid @border-light-color;
    }
  }
}
</style>

<style lang="less" scoped>
.resume-editor {
  width: 900px;
  margin: auto;
  padding: 30px 0;
}
.resumeEditor-footerAction {
  padding: 30px 190px;

  text-align: right;
  &-fix {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;

    box-shadow: 0 -2px 10px #eee;
  }
}
.resumeSection {
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid @border-base-color;

  &__title {
    margin-right: 200px;

    padding-bottom: 3px;
    border-bottom: 2px solid @main-color;
  }
  &__form {
    width: 600px;
  }
}
</style>
