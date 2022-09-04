// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
// 使用插件
Vue.use(VueRouter);
//引入仓库
import store from '@/store'

// 先保存VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push| replace
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数: 失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace(this, location, () => { }, () => { })
    }
}

// 配置路由
const router = new VueRouter({
    // 配置路由：
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    }
})
export default router;

// 全局守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.nickName;
    if (token) {
        // 如果已经登录，还想去login，不能去，留在home
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录，去的不是login页面
            // 如果用户名已经有
            if (name) {
                next();
            } else {
                // 没用户信息,派发action
                // 获取用户信息
                // this.$store.dispatch("getUserInfo")
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了,获取不到用户信息
                    await store.dispatch('userLogout');
                    // console.log(error.message);
                    next('/login');
                }
            }
        }
    } else {
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('/center') != -1) {
            // next('/login');
            // 把未登录的时候的信息存储在地址栏中(路由)
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
});
