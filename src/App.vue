<template>
  <div id="app">
    <header>
      <Header
        @animationstart.native="onAnimationStart"
        ref="header"
        :class="animationName"
        :fixedToTop="$route.path==='/'"
        :theme-color="themeColor"
      ></Header>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="$route.name!=='products'">
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
  methods: {
    onAnimationStart(e) {
      if (e.animationName === "slideInDown") {
        e.target.style.top = 0;
      }
    }
  },
  mounted() {


this.$router.push('/resume')


    this.$refs.header.$el.addEventListener("animationend", function(e) {
      if (e.animationName === "slideOutUp") {
        e.target.style.top = "-100%";
      }
    });
   
  }
};
</script>
<style lang="less"  >
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
  animation: slideInDown .4s;
}
.slideOutUp {
  animation: slideOutUp .4s;
}

footer{
  margin-top:100px;
}
</style>
