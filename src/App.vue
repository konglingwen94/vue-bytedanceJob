<template>
  <div id="app">
    <header :class="{isHome:$route.name==='Home'}">
      <Header></Header>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
// import Header from "@/components/header";
// import Footer from "@/components/footer";
export default {
  name: "App",
  components: {
    // Header,
    // Footer,
  },
};
</script>
<style lang="less">

</style>
