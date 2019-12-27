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
      component: () => import('../views/articles') // 按需加载 文章列表
    }, {
      path: 'publish/:articleId', // 定义动态路由参数
      component: () => import('../views/publish') // 按需加载 发布文章
    }, {
      path: 'publish', // 此规则匹配发布文章
      component: () => import('../views/publish') // 按需加载 发布文章
    }
    ]
  }, {
    // 登录页
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
