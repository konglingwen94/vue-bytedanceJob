<template>
  <div id="app">
    <header>
      <Header
        @animationstart.native="onAnimationStart"
        :class="{ [animationName]: $route.name === 'home' }"
        :fixedToTop="$route.path === '/'"
        ref="header"
        :theme-color="themeColor"
      ></Header>
    </header>
    <main>
      <transition appear :name="pageTransitionName">
        <router-view :key="$route.path"></router-view>
      </transition>
    </main>
    <footer v-if="$route.name !== 'products'">
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      homeScrollY: 0,
      pageTransitionName: "",
      animationName: ""
    };
  },

  computed: {
    themeColor() {
      return this.$route.path !== "/"
        ? "main-color"
        : this.homeScrollY < Math.max(400, window.innerHeight)
        ? "is-transparent"
        : "main-color";
    }
  },
  created() {
    this.$root.$on("home-scrolling", (direction, pos) => {
      this.homeScrollY = pos.y;

      if (direction.directionY === -1) {
        this.animationName = "slideInDown";
      } else {
        this.animationName = "slideOutUp";
      }
    });
  },
  mounted() {
    this.$refs.header.$el.addEventListener("animationend", function(e) {
      if (e.animationName === "slideOutUp") {
        e.target.style.top = "-100%";
      }
    });
  },
  watch: {
    $route(newRoute) {
      this.pageTransitionName = ["products", "home"].includes(newRoute.name)
        ? ""
        : "jumpPage";
    }
  },
  methods: {
    onAnimationStart(e) {
      if (e.animationName === "slideInDown") {
        e.target.style.top = 0;
      }
    }
  }
};
</script>
<style lang="less">
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideOutUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}
.slideInDown {
  animation: slideInDown 0.4s;
}
.slideOutUp {
  animation: slideOutUp 0.4s;
}

.jumpPage-leave-active {
  display: none;
}
.jumpPage-enter {
  transform: translate3d(0, 80px, 0);
  opacity: 0;
}

.jumpPage-enter-active {
  transition: all 0.3s;
}
#app {
  min-width: 1200px;
}
footer {
  margin-top: 100px;
}

header {
  position: relative;
  z-index: 1000;
}
</style>
