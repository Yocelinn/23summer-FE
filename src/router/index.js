import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: 'signup',
        component: () => import('@/user/SignUp.vue'),
        meta: {
          title: '注册',
        },
      },
      {
        path: 'login',
        component: () => import('@/user/LogIn.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'documentadmin',
        component: () => import('@/documentadmin/DAdminHome.vue'),
        meta: {
          title: '文档管理',
        },
      },
    ]
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('@/components/PersonPage/MainPage.vue') // 懒加载组件

  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/test/testUI.vue')
  },
  
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/ChatUI.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
