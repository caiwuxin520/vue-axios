import Vue from 'vue'
import App from './App'
import router from './router'

//导入element-ui
import ElementUI, { TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//引入公共样式清除css
import './styles/comment.css'
//引入axios
import axios from 'axios'
//将axios 挂载到vue原型中
Vue.prototype.$http = axios
//全局设置axios的url
axios.defaults.baseURL = 'http://litc.pro:9999/v1';

//设置axios拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('token') || ""
  config.headers.Authorization = token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.prototype.$message({
    showClose: true,
    type: "error",
    message: error.response.data.errMsg
  });
  return Promise.reject(error);
});

//路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') || ""
  //判断如果 token存在 然后又要进去登录页面,那么就让他跳回首页
    if(token && to.path == "/login"){
      return next('/home')
    }

  //判断token不存在 又要跳到首页就自动回登录页
    if(token || to.path == '/login'){
      next()
    }else{
      next('/')
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
