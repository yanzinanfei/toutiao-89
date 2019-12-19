import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'// 初始化样式
import ElementUI from 'element-ui'// 引入UI
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$http = axios// 赋值给全局对象
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
