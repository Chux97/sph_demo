import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 三级联动组件
import TypeNav from '@/components/TypeNav';
import Carsousel from '@/components/Carsousel';
import Pagination from '@/components/Pagination';
import { Button,MessageBox} from 'element-ui';
Vue.component(Button.name, Button);
// ElementUI注册组件的时候，还有一种在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 第一个参数:全局组件名字,第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);

// 测试
// import {reqCategoryList  } from '@/api';
// console.log(reqCategoryList());
//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
import "swiper/css/swiper.min.css";
// 引入vue-lazyload插件 
// import VueLazyload from 'vue-lazyload';
// 注册插件
// Vue.use(VueLazyload);

//引入表单验证插件
import '@/plugins/validate'

// 统一接口api文件夹里面的请求函数
import * as API from '@/api';

new Vue({
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: h => h(App),
  // 注册路由信息，组件实例的身上拥有$router,$route属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$stroe属性
  store,
}).$mount('#app')
