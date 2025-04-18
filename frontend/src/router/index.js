// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router' // ✅ Vue 3 正确导入方式
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/userManage',
    name: 'UserManage',
    component: () => import('@/views/UserManage.vue')
  },
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页
  },
  // 404 页面(访问未定义路由回到登录页面)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(), // ✅ Vue 3 历史模式
  routes
})

export default router