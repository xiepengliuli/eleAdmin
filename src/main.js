import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routerconfig.js'
import stores from './store/store.js'
import axios from 'axios'
import $ from 'jquery'
import qs from 'qs'


Vue.use(VueRouter)
Vue.use(ElementUI)



 

const router = new VueRouter({
  routes:routes // （缩写）相当于 routes: routes
})


//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  //stores.dispatch('showLoading')  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  //stores.dispatch('hideLoading')
  //如果沒有登陆则跳转到登陆页面并修改是否登陆状态
  if(response.data=="nosession"){
    stores.dispatch('LOGIN_FAIL');
  	router.push("/");
  }
  return response;
}, function (error) {

  return Promise.reject(error);
});
/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
axios.defaults.baseURL='http://localhost:8080/adeGeneratorPage/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;//允许发送cookie
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了


var vueg=new Vue({
  el: '#app',
  router,
  store:stores,
  render: h => h(App)
})