import Vue from 'vue'
import Router from 'vue-router'
import {defaultRoutes} from '@/config/router.config'

Vue.use(Router)

// 调用goBack后isBack为true执行路由跳转然后变为false
Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}

// 带后退动画的跳转
Router.prototype.goPush = function(route) {
  this.isBack = true
  this.push({
    name: route.name,
    params: route.params
  })
}

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: defaultRoutes
})
