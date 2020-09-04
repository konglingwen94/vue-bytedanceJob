<template>
  <div>
    <div id="progress"></div>
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
                  class="uploadFile"
                  ref="resumeUploader"
                  drag
                  name="content"
                  accept=".pdf, .doc, .docx, .ppt, .pptx, .png, jpg, .jpeg"
                  :show-file-list="false"
                  :action="`/atsx/blob/${uploadToken}/`"
                  :before-upload="handleBeforeUpload"
                  :on-success="handleResumeUploadSuccess"
                  :on-change="handleResumeUploadChange"
                  :on-progress="handleResumeUploadProgress"
                  :on-error="handleResumeUploadError"
                >
                  <div class="uploadFile__resume">
                    <div class="beforeUpload" v-if="!uploadData.id">
                      <h3>将你的简历拖拽到此处</h3>
                      <div class="upload-button">
                        <bytedance-button round type="primary"
                          >选择文件</bytedance-button
                        >
                      </div>
                      <div>
                        请上传 .pdf, .doc, .docx,.ppt,.pptx,.png,jepg,jpg 文件
                      </div>
                    </div>
                    <div class="afterUpload" v-else>
                      <div class="fileicon">
                        <file-icon :fileType="resumeFileType"></file-icon>
                      </div>
                      <h3>{{ uploadData.name }}</h3>
                      <time class="uploadTime">
                        上次上传：{{ uploadData.create_time | formatDate }}
                      </time>
                      <div class="afterUpload__actionButton">
                        <span class="afterUpload__actionButton-update"
                          >更新</span
                        >
                        <span class="afterUpload__actionButton-dividerLine"
                          >|</span
                        >
                        <span @click.stop="handleRemoveUploadResume">删除</span>
                      </div>
                    </div>
                  </div>
                  <div
                    slot="tip"
                    class="upload-success-tip"
                    v-if="resumeUploadUpdateHintVisible"
                  >
                    <i class="el-icon-warning"></i>
                    将简历内容解析到下方表单？
                    <span @click="resolveResume" class="tips-resolve"
                      >解析并覆盖</span
                    >
                    <i
                      @click="resumeUploadUpdateHintVisible = false"
                      class="el-icon-close"
                    ></i>
                  </div>
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
            <el-form
              :model="{
                name: resume.name,
                email: resume.email,
                mobile_number: resume.mobile_number,
              }"
              :rules="validatorRules.basic"
              ref="basicForm"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="resume.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile_number">
                <el-input v-model="resume.mobile_number"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
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
            <el-checkbox v-model="withoutCareer">我没有工作经历</el-checkbox>
            <template v-for="(career, key) in resume.career_list">
              <el-form
                ref="careerForm"
                :model="career"
                :rules="validatorRules.career"
                :key="key"
                v-if="!withoutCareer"
                label-position="top"
              >
                <el-form-item prop="company" label="公司">
                  <el-input
                    ref="companyInput"
                    v-model="career.company"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="title" label="职位">
                  <el-input ref="titleInput" v-model="career.title"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" prop="daterange">
                  <el-date-picker
                    clearable
                    value-format="timestamp"
                    v-model="career.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="career.description"
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
                      v-if="resume.career_list.length > 1"
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
              <el-form
                :model="item"
                ref="educationForm"
                :rules="validatorRules.education"
                :key="key"
                label-position="top"
              >
                <el-form-item label="学校" prop="school">
                  <el-input v-model="item.school"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="degree">
                  <el-select v-model="item.degree">
                    <el-option
                      v-for="item in setting.degree"
                      :label="item.val"
                      :value="item.key"
                      :key="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业">
                  <el-input v-model="item.major"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" prop="daterange">
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
            <div
              class="bottom-action"
              v-if="
                resume.internship_list && resume.internship_list.length === 0
              "
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="resume.internship_list.push({})"
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.internship_list">
              <el-form
                ref="internshipForm"
                :model="item"
                :rules="validatorRules.internship"
                :key="key"
                label-position="top"
              >
                <el-form-item label="公司" prop="company">
                  <el-input v-model="item.company"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                  <el-input v-model="item.position"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" prop="daterange">
                  <el-date-picker
                    value-format="timestamp"
                    v-model="item.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述">
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
              <el-form
                ref="projectForm"
                :model="item"
                :rules="validatorRules.project"
                :key="key"
                label-position="top"
              >
                <el-form-item label="名称" prop="name">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="项目角色">
                  <el-input v-model="item.role"></el-input>
                </el-form-item>
                <el-form-item label="项目链接">
                  <el-input v-model="item.link"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" prop="daterange">
                  <el-date-picker
                    start-placeholder="选择开始时间"
                    end-placeholder="选择结束时间"
                    style="width:100%"
                    value-format="timestamp"
                    v-model="item.daterange"
                    type="monthrange"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述" prop="description">
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
              v-show="resume.works_list && resume.works_list.length === 0"
            >
              <i
                class="el-icon-plus el-icon-plus-top"
                @click="
                  resume.works_list.push({
                    description: '',
                    link: '',
                    uploadStatus: 'pending',
                    works_attachment: {},
                  })
                "
                >添加</i
              >
            </div>

            <template v-for="(item, key) in resume.works_list">
              <el-form :key="key" label-position="top">
                <el-form-item label="作品附件">
                  <el-upload
                    ref="worksUpload"
                    drag
                    name="content"
                    multiple
                    :show-file-list="false"
                    :action="`/atsx/blob/${uploadToken}/`"
                    :on-success="
                      (file) => handleWorksUploadSuccess(file, item, key)
                    "
                    :on-change="
                      (file) => handleWorksUploadChange(file, item, key)
                    "
                    :on-progress="
                      (file) => handleWorksUploadProgress(file, item, key)
                    "
                    :before-upload="
                      (file) => handleWorksBeforeUpload(file, item, key)
                    "
                  >
                    <div class="uploadFile__works uploadFile">
                      <div v-if="item.uploadStatus === 'pending'">
                        <h3>将你的作品拖拽到此处</h3>
                        <div class="upload-button">
                          <bytedance-button round type="primary"
                            >选择文件</bytedance-button
                          >
                        </div>
                        <div>只能上传jpg/png文件，且不超过500kb</div>
                      </div>

                      <div
                        class="uploadRejected"
                        v-else-if="item.uploadStatus === 'resolved'"
                      >
                        <div class="uploadWorks__fileicon">
                          <file-icon
                            :file-type="
                              (() => {
                                patharr = item.works_attachment.name.split('.');
                                return patharr[patharr.length - 1];
                              })()
                            "
                          ></file-icon>
                        </div>
                        <h3>{{ item.works_attachment.name }}</h3>
                        <time class="uploadTime">
                          本次上传：{{
                            item.works_attachment.create_time | formatDate
                          }}
                        </time>
                        <div class="afterUpload__actionButton">
                          <span class="afterUpload__actionButton-update"
                            >更新</span
                          >
                          <span class="afterUpload__actionButton-dividerLine"
                            >|</span
                          >
                          <span
                            @click.stop="
                              () => {
                                item.uploadStatus = 'pending';
                                item.works_attachment = {};
                              }
                            "
                            >删除</span
                          >
                        </div>
                      </div>
                      <div
                        class="uploadRejected"
                        v-else-if="item.uploadStatus === 'rejected'"
                      >
                        <h3>
                          <i class="el-icon-warning"></i>
                        </h3>
                        <div class="uploadTime">请将大小控制在100M以内</div>
                        <div class="afterUpload__actionButton">
                          <span class="afterUpload__actionButton-update"
                            >重新选择</span
                          >
                          <span class="afterUpload__actionButton-dividerLine"
                            >|</span
                          >
                          <span
                            @click.stop="
                              () => {
                                item.uploadStatus = 'pending';
                              }
                            "
                            >删除</span
                          >
                        </div>
                      </div>
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="作品链接">
                  <el-input v-model="item.link"></el-input>
                </el-form-item>

                <el-form-item label="描述">
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
              <el-form
                :model="item"
                :key="key"
                ref="awardForm"
                label-position="top"
                :rules="validatorRules.award"
              >
                <el-form-item prop="title" label="名称">
                  <el-input v-model="item.title"></el-input>
                </el-form-item>
                <el-form-item label="获奖时间">
                  <el-date-picker
                    style="width:100%"
                    type="year"
                    v-model="item.award_time"
                    value-format="timestamp"
                    placeholder="获奖时间"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="描述">
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
          <div>
            <h2 class="resumeSection__title">语言能力</h2>
          </div>
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
              <el-form
                ref="languageSkillForm"
                :model="item"
                :key="key"
                :rules="validatorRules.languageSkill"
              >
                <el-form-item label="语言" prop="language">
                  <el-select clearable v-model="item.language" prop="language">
                    <el-option
                      v-for="(item, index) in setting.language"
                      :label="item.val"
                      :value="item.key"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="proficiency" label="精通程度">
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
          <div>
            <h2 class="resumeSection__title">社交账号</h2>
          </div>
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
              <el-form
                ref="snsForm"
                :model="item"
                :rules="validatorRules.sns"
                :key="key"
              >
                <el-form-item label="社交账号" prop="sns_type">
                  <el-select clearable v-model="item.sns_type">
                    <el-option
                      v-for="(item, index) in setting.sns"
                      :label="item.val"
                      :value="item.key"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="URL/ID" prop="link">
                  <el-input clearable v-model="item.link"></el-input>
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
      <el-button
        round
        :loading="submitLoading"
        size="medium"
        @click="submit"
        type="primary"
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
  fetchUploadToken,
  fetchResumeParseTaskToken,
  fetchResumeParseTaskData,
  fetchResumeAttachmentToken,
} from "@/helper/requestWithToken";
import { getOffsetTop } from "@/helper/utilities";
export default {
  name: "resume-editor",
  data() {
    return {
      submitLoading: false,
      uploadData: {},
      resumeUploadUpdateHintVisible: false,
      shouldEvaluate: true,
      resume: {},
      setting: {},
      withoutCareer: false,
      careerList: [],
      footerActionFixed: false,
      uploadToken: "",
      resumeUploaded: false,
      validatorRules: {
        basic: {
          name: { required: true, trigger: "submit", message: "请输入姓名" },
          mobile_number: [
            {
              required: true,
              trigger: "submit",
              message: "请输入手机号",
            },
            {
              validator(rule, value, callback) {
                if (!/^\d{11}$/.test(value)) {
                  callback(new Error("请输入合法的手机号"));
                }
                callback();
              },

              trigger: "submit",
            },
          ],
          email: [
            { required: true, trigger: "submit", message: "请输入邮箱" },
            { type: "email", trigger: "submit", message: "请输入合法的邮箱" },
          ],
        },
        award: {
          title: {
            required: true,
            trigger: "submit",
            message: "请输入获奖名称",
          },
        },
        sns: {
          link: { required: true, trigger: "submit", message: "请输入URL/ID" },
          sns_type: {
            required: true,
            trigger: "submit",
            message: "请选择社交平台",
          },
        },
        languageSkill: {
          language: [
            {
              required: true,
              trigger: "submit",
              message: "请选择语言技能",
            },
          ],
          proficiency: {
            required: true,
            trigger: "submit",
            message: "请选择语言精通程度",
          },
        },
        career: {
          company: [
            { required: true, trigger: "submit", message: "请输入公司" },
          ],
          title: { required: true, trigger: "submit", message: "请输入职位" },
          daterange: [
            { required: true, trigger: "blur", message: "请输入日期" },
          ],
        },
        internship: {
          company: [
            { required: true, trigger: "submit", message: "请输入公司" },
          ],
          position: {
            required: true,
            trigger: "submit",
            message: "请输入职位",
          },
          daterange: [
            { required: true, trigger: "blur", message: "请输入日期" },
          ],
        },
        project: {
          description: [
            { required: true, trigger: "submit", message: "请输入项目描述" },
          ],
          name: {
            required: true,
            trigger: "submit",
            message: "请输入项目名称",
          },
          daterange: [
            { required: true, trigger: "blur", message: "请选择起止时间" },
          ],
        },
        award: {
          name: { required: true, trigger: "submit", message: "请输入公司" },
        },
        education: {
          school: {
            required: true,
            trigger: "submit",
            message: "请输入学校名称",
          },
          degree: {
            required: true,
            trigger: "submit",
            message: "请选择学历",
          },
          daterange: {
            required: true,
            trigger: "submit",
            message: "请选择起止时间",
          },
        },
      },
    };
  },
  computed: {
    resumeFileType() {
      const patharr = this.resume.resume_attachment.name.split(".");
      return patharr[patharr.length - 1];
    },
  },

  created() {
    const loading = this.$loading({ position: { top: 60 } });

    const fetchResumeRequest = fetchResume()
      .then((response) => {
         
        this.resume = this.mapResumeData(response.data.resume_detail);
        this.uploadData = this.resume.resume_attachment || {};
        this.withoutCareer = this.resume.career_list.length === 0;
        this.$nextTick(() => {
          // 初始化后判断页面滚动的位置，设置底部操作栏定位位置
          const footerActionNode = this.$refs["footerAction"];

          this.footerActionShouldFixedThreshold =
            getOffsetTop(document.body, footerActionNode) +
            footerActionNode.offsetHeight;
          this.onPageScroll();
        });

        // 观测一次是否有工作经历，初始化表单数据
        const unwatch = this.$watch("withoutCareer", (newVal) => {
          if (
            this.resume.career_list &&
            this.resume.career_list.length === 0 &&
            !newVal
          ) {
            this.resume.career_list.push({});
          }

          unwatch();
        });
      })
      .catch((err) => {
         
        return Promise.reject(err);
      });

    const fetchCommonSettingsRequest = fetchCommonSettings()
      .then((response) => {
        this.setting = response.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });

    Promise.all([fetchCommonSettingsRequest, fetchResumeRequest])
      .then(() => {
        loading.close();
      })
      .catch((err) => {
        loading.close();
      });
  },
  mounted() {
    window.addEventListener("scroll", this.onPageScroll);

    window.addEventListener("beforeunload", this.onbeforeunloadAlert);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onPageScroll);
    window.removeEventListener("beforeunload", this.onbeforeunloadAlert);
  },
  methods: {
    onPageScroll() {
      this.footerActionFixed =
        window.scrollY <
        this.footerActionShouldFixedThreshold - window.innerHeight;
    },
    async handleWorksUploadChange(file, item, index) {
      if (file.status === "ready") {
        const props = {
          percentage: 0,
          showText: false,
        };

        try {
          var result = await this.$messageBox.alert(
            this.$createElement("el-progress", {
              props,
              ref: "worksUploadProgress",
            }),
            "上传中...",
            {
              center: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonClass: "el-button--text",
              showClose: false,
            }
          );
        } catch (error) {
          if (error === "cancel") {
            this.$refs.worksUpload[index].abort();
            this.$message.warning("已取消上传");
          }
        }
      }
    },
    handleWorksUploadProgress(event, item) {
      if (this.$refs.worksUploadProgress) {
        this.$refs.worksUploadProgress.percentage = event.percent;
      }
    },
    handleWorksBeforeUpload(file, item) {
      if (file.size > 1024 * 1024 * 100) {
        item.uploadStatus = "rejected";
        return false;
      }

      return fetchUploadToken().then((res) => {
        this.uploadToken = res.data.token;
        return true;
      });
    },
    handleWorksUploadSuccess(response, item) {
      item.works_attachment = {
        name: response.data.name,
        create_time: Date.now(),
      };
      item.uploadStatus = "resolved";
      this.$messageBox.close();

      fetchResumeAttachmentToken({ attachment_id: response.data.id })
        .then((res) => {
          item.portal_attachment_id = res.data.portal_attachment_id;
        })
        .catch((err) => {
          throw err;
        });
    },
    handleRemoveUploadResume() {
      this.uploadData = {};
      this.resume.resume_attachment = {};
      delete this.resume.portal_attachment_id;
      this.resumeUploaded = false;
      this.resumeUploadUpdateHintVisible = false;
    },
    resolveResume() {
      const self = this;

      fetchResumeParseTaskToken({
        resume_url: this.uploadData.url,
        file_name: this.uploadData.name,
      })
        .then((res) => {
          this.$messageBox.alert(
            this.$createElement("el-progress", {
              props: { percentage: 0, showText: false },
              ref: "resumeResolveProgress",
            }),
            "解析中...",
            {
              center: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonClass: "el-button--text",
              showClose: false,
            }
          );

          return res;
        })
        .then(async function _fetchResumeParseTaskData(res) {
          try {
            var result = await fetchResumeParseTaskData(res.data.token);
          } catch (error) {
            return Promise.reject(error);
          }
          if (result.data.parse_result === 2) {
            return result;
          }

          self.$refs.resumeResolveProgress.percentage = result.data.progress;

          return _fetchResumeParseTaskData(res);
        })
        .then((res) => {
          this.$messageBox.close();

          // 兼容上传简历解析结果部分字段合并到表单中

          res.data.talent.project_list.forEach(
            (item) => (item.description = item.desc)
          );

          if (res.data.talent.career_list.length) {
            this.withoutCareer = false;
          }

          this.resume = Object.assign(
            {},
            this.resume,
            this.mapResumeData(res.data.talent)
          );
          this.uploadToken = "";
          this.resumeUploadUpdateHintVisible = false;

          this.$message.success("简历解析成功");
        })
        .catch((err) => {
          this.$messageBox.close();
        });
    },
    handleBeforeUpload() {
      return fetchUploadToken().then((res) => {
        this.uploadToken = res.data.token;
        return true;
      });
    },
    handleResumeUploadError(err) {
      this.$message({
        message: err.message || "网络中断",
        dangerouslyUseHTMLString: true,
        type: "error",
        // duration: 0
      });
      this.$resumeUploadPopupProgress.close();
    },
    handleResumeUploadProgress(progressEvent) {
      this.$resumeUploadPopupProgress.value = progressEvent.percent;
    },
    async handleResumeUploadChange(file) {
      if (file.status === "ready") {
        const pathArr = file.name.split(".");

        this.$resumeUploadPopupProgress = this.$popupProgress({
          title: "上传中...",
          fileicon: pathArr[pathArr.length - 1],
        }).$on("abort", () => {
          this.$refs.resumeUploader.abort();
          this.$message.warning("已取消上传");
        });
      }
    },
    handleResumeUploadSuccess({ data }) {
      this.resumeUploaded = true;
      this.resumeUploadUpdateHintVisible = true;
      this.uploadData = { ...data, create_time: Date.now() };

      this.resume.resume_attachment = data;

      this.$resumeUploadPopupProgress.close();
      this.$message.success({
        message: "上传成功",

        center: true,
      });

      fetchResumeAttachmentToken({ attachment_id: data.id })
        .then((res) => {
          this.resume.portal_attachment_id = res.data.portal_attachment_id;
        })
        .catch((err) => {});
    },
    async submit() {
      try {
        await Promise.all(
          (this.$refs.careerForm || [])
            .map((form) => form.validate())
            .concat(
              (this.$refs.languageSkillForm || []).map((form) =>
                form.validate()
              )
            )
            .concat((this.$refs.snsForm || []).map((form) => form.validate()))
            .concat((this.$refs.awardForm || []).map((form) => form.validate()))
            .concat(
              (this.$refs.projectForm || []).map((form) => form.validate())
            )
            .concat(
              (this.$refs.internshipForm || []).map((form) => form.validate())
            )
            .concat(
              (this.$refs.educationForm || []).map((form) => form.validate())
            )
            .concat(this.$refs.basicForm.validate())
        );
      } catch (error) {
        this.$message.error("表单验证未通过");
        return;
      }

      const payload = this.transformResumePayload(this.resume);

      this.submitLoading = true;
      fetchSaveResume(payload.id, {
        resume: payload,

        resume_id: payload.id,
      })
        .then((res) => {
          this.$message.success("简历保存成功");
          this.$router.push("/resume");
          this.submitLoading = false;
        })
        .catch((err) => {
          this.submitLoading = false;
        });
    },

    transformResumePayload(data) {
      data.works_list = data.works_list.filter(
        (item) => item.portal_attachment_id
      );

      if (this.withoutCareer) {
        data.career_list = [];
      }

      for (let key in data) {
        if (key.endsWith("_list") && Array.isArray(data[key])) {
          data[key].forEach((item) => {
            if (Array.isArray(item.daterange)) {
              let [start_time, end_time] = item.daterange;

              start_time = Number.isNaN(new Date(start_time).getTime())
                ? Date.now()
                : start_time;
              end_time = Number.isNaN(new Date(end_time).getTime())
                ? Date.now()
                : end_time;
              item.start_time = start_time;
              item.end_time = end_time;
            }
          });
        }
      }

      return data;
    },
    mapResumeData(data) {
      this.careerList = data.career_list;
      if (data.resume_attachment && data.resume_attachment.id) {
        data.portal_attachment_id = data.resume_attachment.id;
      }
      data.works_list &&
        data.works_list.forEach((item) => {
          if (item.works_attachment && item.works_attachment.id) {
            item.uploadStatus = "resolved";
          } else {
            item.uploadStatus = "pending";
          }
        });

      for (let key in data) {
        if (key.endsWith("_list")) {
          if (!Array.isArray(data[key])) {
            data[key] = [];
          }

          data[key].forEach((item) => {
            if (typeof item !== "object") {
              return;
            }

            if (
              item.hasOwnProperty("start_time") &&
              item.hasOwnProperty("end_time")
            ) {
              let { start_time, end_time } = item;

              start_time = start_time === -1 ? Date.now() : start_time;
              end_time = end_time === -1 ? Date.now() : end_time;

              this.$set(item, "daterange", [
                new Date(start_time).getTime(),
                new Date(end_time).getTime(),
              ]);
            }
          });
        }
      }

      return data;
    },
    onbeforeunloadAlert(e) {
      e.preventDefault();
      e.returnValue = false;
    },
  },
};
</script>
<style lang="less">
.el-upload {
  width: 100%;
  .uploadFile__works {
    .uploadWorks__fileicon {
      width: 50px;
      height: 50px;
      margin: auto;
    }
    .el-icon-warning {
      font-size: 30px;
    }
  }
  &:focus {
    border-color: inherit;
    color: inherit;
  }
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

    .afterUpload {
      .fileicon {
        width: 50px;
        height: 50px;
        margin: auto;
      }
      time {
        color: @secondary-text-color;
      }
      &__actionButton {
        color: @main-color;
        &-dividerLine {
          margin: 0 14px;
        }
      }
    }
  }
}
.upload-success-tip {
  display: flex;
  background: @bg-base-color;
  padding: 0 7px;
  align-items: center;
  .el-icon-warning {
    color: @main-color;
  }
  .tips-resolve {
    color: @main-color;
    cursor: pointer;
    margin-left: 6px;
  }
  .el-icon-close {
    cursor: pointer;
    margin-left: auto;
  }
}
// }
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
  z-index: 33;
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
