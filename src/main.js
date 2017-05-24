import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routerconfig.js'


Vue.use(VueRouter)
Vue.use(ElementUI)

 

const router = new VueRouter({
  routes:routes // （缩写）相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})