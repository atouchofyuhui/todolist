import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 1.导入and-design-vue组件库
import Antd from 'ant-design-vue'
// 2.导入组件库的样式
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

// 3.使用组件库
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
