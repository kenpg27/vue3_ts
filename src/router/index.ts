import { createRouter, createWebHashHistory } from 'vue-router'

// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: '/todo',
      // 必须添加.vue后缀
      component: () => import('../views/todo.vue')
    },
    {
      path: '/observer',
      // 必须添加.vue后缀
      component: () => import('../views/observer.vue')
    },
    {
      path: '/event',
      // 必须添加.vue后缀
      component: () => import('../views/eventDemo.vue')
    },
    {
      path: '/callback',
      // 必须添加.vue后缀
      component: () => import('../views/callback.vue')
    },
    {
      path: '/upload',
      // 必须添加.vue后缀
      component: () => import('../views/upload.vue')
    },
  ]
})
