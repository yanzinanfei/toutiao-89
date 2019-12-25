import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
Vue.use(VueRouter)
const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '', // 二级路由  什么都不写，作为显示组件
      component: Home2
    }, {
      // 二级路由表
      path: 'comment', // 完整地址 相对地址
      component: () => import('../views/comment') // 按需加载
    }, {
      path: 'material',
      component: () => import('../views/material')// 按需加载 素材列表
    }, {
      path: 'articles',
      component: () => import('../views/artivles') // 按需加载 文章列表
    }]
  }, {
    // 登录页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
