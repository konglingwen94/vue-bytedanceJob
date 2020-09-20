<template>
  <div class="product">
    <ul class="product-fullpage-indicator">
      <li
        v-for="(item, index) in products"
        :key="item.id"
        class="product-fullpage-indicator-item"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >
        <img :src="item.logo" alt />
      </li>
    </ul>
    <transition :duration="duration" :name="transitionName">
      <!-- ... the buttons ... -->
      <div
        :key="activeIndex"
        class="view-wrapper"
        v-if="!loading"
        :style="`backgroundImage:url(${item.cover})`"
      >
        <div class="content">
          <div class="logo">
            <img :src="item.logo" width="100%" height="100%" alt />
          </div>
          <h2>{{ item.title }}</h2>
          <div class="description">{{ item.description }}</div>
          <div class="subDescription">{{ item.subDescription }}</div>
          <div class="link">
            更多信息，请访问：
            <br />
            <span>{{ item.link }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "product",
  data() {
    return {
      products: [],
      activeIndex: 0,
      transitionName: "",
      scrolling: false,
      duration: 1000,
      loading: false
    };
  },
  watch: {
    activeIndex(newIndex, oldIndex) {
      if (this.scrolling) {
        return;
      }
      if (this.$route.params.id) {
        delete this.$route.params.id;
        return;
      }

      this.transitionName = newIndex < oldIndex ? "move-down" : "move-up";
    }
  },
  created() {
    this.loading = true;
    const loading = this.$loading({
      position: { top: 60 }
    });
    this.request
      .get("/products")
      .then(response => {
        this.products = response;
        this.loading = false;
        loading.close();

        if (this.$route.params.id) {
          this.activeIndex = this.products.findIndex(
            item => item.id === this.$route.params.id
          );
        }
      })
      .catch();
  },
  mounted() {
    window.addEventListener("mousewheel", this.mousewheelHandler);
  },
  destroyed() {
    window.removeEventListener("mousewheel", this.mousewheelHandler);
  },
  computed: {
    item() {
      return this.products[this.activeIndex] || {};
    }
  },
  methods: {
    mousewheelHandler(e) {
      if (this.scrolling) {
        return;
      }
      this.scrolling = true;
      if (e.wheelDelta > 0) {
        this.transitionName = "move-down";
        this.activeIndex =
          this.activeIndex === 0
            ? this.products.length - 1
            : this.activeIndex - 1;
      } else {
        this.transitionName = "move-up";
        this.activeIndex = (this.activeIndex + 1) % this.products.length;
      }
      setTimeout(() => {
        this.scrolling = false;
      }, this.duration);
    }
  }
};
</script>
<style lang="less" scoped>
.move-up-leave-active,
.move-up-enter-active,
.move-down-leave-active,
.move-down-enter-active {
  transition: all 0.7s;
  transition-timing-function: cubic-bezier(0.66, 0, 0.34, 1);
}
.move-up-leave-to,
.move-up-enter,
.move-down-leave-to,
.move-down-enter {
  opacity: 0;
}

.move-up-leave-to,
.move-down-enter {
  transform: translateY(-100%);
}
.move-down-leave-to,
.move-up-enter {
  transform: translateY(100%);
}

.product {
  position: fixed;
  z-index: -1;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 500px;
  min-width: 700px;
  &-fullpage-indicator {
    position: absolute;
    z-index: 333;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
     
    &-item {
      margin: 22px 0;
      width: 5vh;
      height: 5vh;
      min-height: 30px;
      min-width: 30px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 50%;
      overflow: hidden;

      &:hover,
      &.active {
        transform: scale(1.3);

        box-shadow: 0 0 14px 0 @box-shadow-dark-color;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .view-wrapper {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    height: 100vh;
    width: 100%;
    // padding-top: 100px;
    padding-left: 100px;

    .content {
      width: 300px;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      // text-align: center;
      .logo {
        width: 80px;
        height: 80px;
      }
      h2 {
        margin: 30px 0;
      }
      .description,
      .subDescription {
        color: #aaa;
        line-height: 1.4;
      }
      .link {
        margin-top: 40px;
        span {
          color: @main-color;
        }
      }
    }
  }
}
</style>
