<template>
  <div class="layout">
    <header></header>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>
<script>
import Header from './header'
import Footer from './footer'
export default {
  name:'layout',
  components:{
    Header,
    Footer,
  }
}
</script>
<style lang="less" scoped>

</style>