<template>
  <div class="home">
    <div class="banner">
      <div class="video-wrapper">
        <video
          class="video"
          preload="auto"
          loop=""
          playsinline=""
          autoplay=""
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
    <div class="product">
      <h2 class="title">Inspire creativity, enrich life</h2>
      <div class="desc">
        截至目前，字节跳动产品已覆盖超过 150 个国家和地区，75 个语种
      </div>
      <ul class="product-list">
        <li class="product-item" v-for="(item, key) in products" :key="key">
          <img :src="item.logo" alt="" />
          <div>{{ item.title }}</div>
        </li>
      </ul>
      <div class="more">
        <span class="more-button">了解更多</span>
      </div>
    </div>

    <!-- 职位 -->
    <div class="job-category">
      <h2 class="job-category-title">探索你感兴趣的职位</h2>
      <ul class="job-category-list">
        <li
          v-for="item in jobCategories"
          :key="item.id"
          class="job-category-item"
        >
          <div class="image" :style="`backgroundImage:url(${item.image})`">
            <span class="overlay" v-if="!item.id">{{ item.zh_name }}</span>
          </div>
          <div v-if="item.id" class="name">
            {{ item.zh_name }}
          </div>
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
    };
  },
  created() {
    const fetchProducts = this.request
      .get("/products")
      .then((response) => {
        this.products = response;
      })
      .catch();
    const fetchJobCategories = this.request
      .get("/job-categories")
      .then((response) => {
        this.jobCategories = response;
      });

    // Promise.all([fetchProducts(), fetchJobCategories()]);
  },
};
</script>
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
        background-color: rgba(0, 0, 0,0.5);
        color: #fff;
        
        font-size: 40px;
      }
    }

    margin: 0 2.5%;
    margin-bottom: 30px;
    width: 20%;
  }
}
</style>
