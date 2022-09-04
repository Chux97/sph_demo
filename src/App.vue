<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name:'',
  components: {
    Header,
    Footer
  },
  mounted(){
    // 通知Vuex发请求，获取数据，存储在仓库中
    // 派发一个action||获取尚品分类的三级列表
    this.$store.dispatch("getCategoryList");
  }
}
</script>

<style>
</style>
