import App from './App'
import $mRouter from '@/common/router.js';
// import $mRoutesConfig from '@/common/routesConfig.js'
// uview
import uView from '@/uni_modules/uview-ui';
// vuex
import store from './store'
// logo
import logo from './pages/sys/common/logo.vue'
// sinput
import sinput from './pages/sys/common/sinput.vue'

Vue.component('logo', logo)
Vue.component('sinput', sinput)
Vue.prototype.$mRouter = $mRouter;
// Vue.prototype.$mRoutesConfig = $mRoutesConfig;
// 路由导航
// $mRouter.beforeEach((navType, to) => {
// 	if (to.route === undefined) {
// 		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
// 	}
// 	// 去登录但是已经登录过了，则跳转到首页
// 	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
// 		uni.reLaunch({
// 			url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
// 		});
// 		return;
// 	}
// 	// 过滤需要权限的页面
// 	// 查看是否需要路由权限验证
// 	if (to.route.requiresAuth) {
// 		if (store.getters.hasLogin) {
// 			// 已经登录
// 			uni[navType]({
// 				url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
// 			});
// 		} else {
// 			// 登录成功后的重定向地址和参数
// 			const query = {
// 				redirectUrl: to.route.path,
// 				...to.query
// 			};
// 			uni.navigateTo({
// 				url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
// 			});
// 		}
// 	} else {
// 		uni[navType]({
// 			url: $mHelper.objParseUrlAndParam(to.route, to.query)
// 		});
// 	}
// });

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

// 引入请求封装
require('./utils/request/index')(app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    store,
    app
  }
}
// #endif