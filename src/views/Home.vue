<template>
  <div class="home">
    <div class="banner">
      <div class="video-wrapper">
        <video
          class="video"
          preload="auto"
          loop
          playsinline
          autoplay
          poster="//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/video-poster_1576231362701.png"
          src="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/gongquhunjian_1080.min.mp4"
          tabindex="-1"
        ></video>
      </div>
      <h1 class="title">和优秀的人 做有挑战的事</h1>
      <div class="search">
        <input-search placeholder="placeholder" v-model="search"></input-search>
      </div>
      <span class="arrow-down"></span>
    </div>

    <!-- 产品 -->
    <transition appear>
      <div class="product">
        <h2 class="title">Inspire creativity, enrich life</h2>
        <div class="desc">截至目前，字节跳动产品已覆盖超过 150 个国家和地区，75 个语种</div>
        <ul class="product-list">
          <li class="product-item" v-for="(item, key) in products" :key="key">
            <img :src="item.logo" alt />
            <div>{{ item.title }}</div>
          </li>
        </ul>
        <div class="more">
          <span class="more-button">了解更多</span>
        </div>
      </div>
    </transition>
    <!-- 职位 -->
    <div class="job-category">
      <h2 class="job-category-title">探索你感兴趣的职位</h2>
      <ul class="job-category-list">
        <li v-for="item in jobCategories" :key="item.id" class="job-category-item">
          <div class="image" :style="`backgroundImage:url(${item.image})`">
            <span class="overlay" v-if="!item.id">{{ item.zh_name }}</span>
          </div>
          <div v-if="item.id" class="name">{{ item.zh_name }}</div>
        </li>
      </ul>
    </div>

    <!-- 字节范 -->
    <div class="byteStandard">
      <h2 class="title">字节范</h2>
      <div class="desc">字节范是字节跳动企业文化的重要组成部分，是我们共同认可的行为准则</div>
      <div class="content">
        <div class="image">
          <img
            v-if="byteStandards[byteStandardActiveIndex]"
            width="100%"
            height="100%"
            :src="byteStandards[byteStandardActiveIndex].image"
            alt
          />
        </div>
        <div class="indicator">
          <ul>
            <li class="indicator-item" v-for="(item, index) in byteStandards" :key="index">
              <h3
                :class="{ active: byteStandardActiveIndex === index }"
                @click="byteStandardActiveIndex = index"
              >{{ item.title }}</h3>
              <p v-html="item.content" v-show="byteStandardActiveIndex === index"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 字节生活 -->
    <div class="byteLife">
      <h1 class="byteLife-title">字节生活</h1>
      <div class="block-item block-item-one">
        <div class="block-item-column block-item-column-text">
          <h2 class="block-item-column-title">在扁平开放的氛围 里工作</h2>
          <div class="content">
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
          </div>
        </div>
        <div class="block-item-column block-item-column-image">
          <img src="https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/life_1.png" alt />
        </div>
      </div>

      <div class="block-item block-item-one">
        <div class="block-item-column block-item-column-text">
          <h2 class="block-item-column-title">在扁平开放的氛围 里工作</h2>
          <div class="content">
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
            <div class="content-item">
              <h2 class="content-item-title">务实扁平的工作氛围</h2>
              <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
            </div>
          </div>
        </div>
        <div class="block-item-column block-item-column-image">
          <img src="https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/life_1.png" alt />
        </div>
      </div>
    </div>

    <!-- 员工故事 -->
    <div class="staffStory">
      <h2>员工故事</h2>
      <ul class="staffStory-list clearfix">
        <li v-for="item in staffStories" :key="item.id" class="staffStory-item">
          <div class="avatar">
            <img width="100%" :src="item.avatar" alt srcset />
          </div>
          <div class="text">
            <h2>{{ item.title }}</h2>
            <div class="desc">{{ item.name }}&nbsp;|&nbsp;{{ item.department }}</div>
            <p class="remark">{{ item.remark }}</p>
          </div>
          <div class="circular-button">→</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      search: "",
      products: [],
      jobCategories: [],
      byteStandards: [],
      byteStandardActiveIndex: 0,
      staffStories: []
    };
  },
  created() {
    const fetchProducts = this.request
      .get("/products")
      .then(response => {
        this.products = response;
      })
      .catch();
    const fetchJobCategories = this.request
      .get("/job-categories")
      .then(response => {
        this.jobCategories = response;
      });
    this.request.get("/byte-standards").then(response => {
      this.byteStandards = response;
    });
    this.request.get("/staff-stories").then(response => {
      this.staffStories = response;
    });
    // Promise.all([fetchProducts(), fetchJobCategories()]);
  }
};
</script>

<style>
@import "../assets/transition.css"; 
</style>

<style lang="less" scoped>
.banner {
  height: 100vh;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  .video-wrapper {
    font-size: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    .video {
      width: 100%;
      object-fit: cover;
    }
  }
  .title {
    color: #fff;
    font-size: 48px;
    margin-top: 150px;
  }
  .search {
    width: 300px;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  .arrow-down {
    margin-top: auto;
    margin-bottom: 40px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid #fff;
  }
}

// 产品
.product {
  margin-top: 40px;
  text-align: center;
  padding: 40px 40px;
  .desc {
    margin: 40px 0;
  }
  &-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &-item {
    width: 70px;
    height: 70px;
    &:nth-child(1),
    &:nth-child(9) {
      margin-top: 106px;
    }
    &:nth-child(2),
    &:nth-child(8) {
      margin-top: 80px;
    }
    &:nth-child(3),
    &:nth-child(7) {
      margin-top: 55px;
    }
    &:nth-child(4),
    &:nth-child(6) {
      margin-top: 30px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .more {
    margin-top: 170px;
    text-align: center;
    &-button {
      display: inline-block;
      width: 190px;
      line-height: 50px;
      border-radius: 30px;
      background: @main-color;
      color: #fff;
      cursor: pointer;
    }
  }
}

// 职位

.job-category {
  text-align: center;
  margin-top: 90px;

  &-list {
    overflow: hidden;
    margin-top: 70px;
  }
  &-item {
    float: left;
    .image {
      width: 250px;
      height: 250px;
      line-height: 250px;
      background-size: 100%;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 30px;
      transition: all 0.3s;
      background-position: center;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 8px 1px #ccc;
        background-size: 110%;
      }
      .overlay {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;

        font-size: 40px;
      }
    }

    margin: 0 2.5%;
    margin-bottom: 30px;
    width: 20%;
  }
}

// 字节范

.byteStandard {
  padding: 40px 40px;
  overflow: hidden;
  .title {
    margin-bottom: 30px;
  }
  .desc {
    margin-bottom: 40px;
  }
  .image {
    float: left;
    width: 700px;
    height: 450px;
    margin-right: 100px;
    overflow: hidden;
    img {
      border-radius: 6px;
      object-fit: cover;
    }
  }
  .indicator {
    color: #aaa;

    &-item {
      margin: 32px 0;
      h3 {
        &.active {
          color: black;
          font-size: 32px;
          font-weight: 400;
        }
        cursor: pointer;
      }
    }
  }
}
// 字节生活
.byteLife {
  // width:1200px;
  // overflow: hidden;
  &-title {
    margin-bottom: 70px;
  }
  padding-left: 10%;
  .block-item {
    overflow: hidden;
    margin-bottom: 100px;
    &:nth-child(odd) {
      .block-item-column {
        &-text {
          margin-right: 9%;
        }
        float: left;
      }
    }
    &:nth-child(even) {
      .block-item-column {
        &-image {
          margin-right: 9%;
        }
        float: right;
      }
    }

    &-column {
      &-title {
        margin-bottom: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
      }
      &-text {
        width: 30%;
      }
      &-image {
        height: 400px;
        width: 59%;
        border-radius: 8px;
        overflow: hidden;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

.staffStory {
  padding: 140px;
  // color:#ccc;
  &-list {
    text-align: center;
  }
  &-item {
    height: 400px;
    overflow: hidden;
    padding: 30px;
    float: left;
    width: 25%;
    & + & {
      margin-left: 12.5%;
    }
    .avatar {
      width: 70%;
      margin: auto;
    }
    .text {
      .remark {
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .circular-button {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 1px solid;
      line-height: 30px;
      // padding: 4px;
      margin: auto;
      margin-top: 20px;
      color: #ccc;
      // font-size: 30px;
    }

    &:hover {
      box-shadow: 0 0 5px 0 #ccc;
      .circular-button {
        color: @main-color;
      }
    }
  }
}
</style>
