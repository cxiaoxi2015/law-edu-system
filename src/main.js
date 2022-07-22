import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/styles/iconfont.css'
import './permission'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import 'normalize.css'
import './assets/styles/index.scss'

import './components'
import './utils/globalAction'

// 定义全局过滤器
import './utils/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
