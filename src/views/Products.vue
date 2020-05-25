<template>
  <div class="product">
    <ul class="product-fullpage-indicator">
      <li
        v-for="(item, index) in products"
        :key="item.id"
        class="product-fullpage-indicator-item"
        :class="{active:activeIndex===index}"
        @click="activeIndex = index"
      >
        <img :src="item.logo" alt />
      </li>
    </ul>
    <transition :duration="duration" :name="transitionName">
      <!-- ... the buttons ... -->
      <div :key="activeIndex" class="view-wrapper" :style="`backgroundImage:url(${item.cover})`">
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
  name: "Product",
  data() {
    return {
      products: [],
      activeIndex: 0,
      transitionName: "move-up",
      scrolling: false,
      duration: 1000
    };
  },
  watch: {
    activeIndex(newIndex, oldIndex) {
      // if(newIndex<oldIndex && newIndex!==)
      if (this.scrolling) return;
      this.transitionName = newIndex < oldIndex ? "move-down" : "move-up";
    }
  },
  created() {
    this.request
      .get("/products")
      .then(response => {
        this.products = response;
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
        if (this.activeIndex === 0) {
          this.activeIndex = this.products.length - 1;
        } else {
          this.activeIndex--;
        }
      } else {
        this.transitionName = "move-up";
        if (this.activeIndex === this.products.length - 1) {
          this.activeIndex = 0;
          setTimeout(() => {});
        } else {
          this.activeIndex++;
        }
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
  &-fullpage-indicator {
    position: absolute;
    z-index: 333;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    &-item {
      margin: 22px 0;
      width: 40px;
      height: 40px;
      cursor: pointer;

      &:hover,
      &.active {
        transform: scale(1.3);
        box-shadow: 0 0 4px 0 #ccc;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .view-wrapper {
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    height: 100vh;
    width: 100%;
    padding-top: 100px;
    padding-left: 100px;

    .content {
      width: 300px;
      // text-align: center;
      .logo {
        width: 40px;
        height: 40px;
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
