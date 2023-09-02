import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/signup',
        component: () => import('@/user/SignUp.vue'),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/login',
        component: () => import('@/user/LogIn.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/documentadmin',
        component: () => import('@/documentadmin/DAdminHome.vue'),
        meta: {
          title: '文档管理',
        },
      },
      {
        path: '/documentadd',
        component: () => import('@/documentadmin/DocumentAdd.vue'),
        meta: {
          title: '新增文档',
        },
      },
      {
        path: '/documentadmin/:id',
        component: () => import('@/documentadmin/DocumentAdd.vue'),
        meta: {
          title: '编辑文档',
        },
      },
      {
        path: '/prototype',
        component: () => import('@/views/prototype/prototypeAdmin.vue'),
        meta: {
          title: '原型管理',
        }
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
    component: () => import('@/views/chat/ChatView.vue')
  },
  {
    path: '/teamCenter',
    name: 'teamCenter',
    component: () => import('@/components/TeamPage/TeamCenter.vue')
  },
  {
    path: '/person/protectCenter',
    name: 'porjectcenter',
    component: () => import('@/components/ProjectCenter/ProjectCenter.vue')
  },
  {
    path: '/designPage',
    component: () => import('@/views/prototype/demoView.vue'),
    meta: {
      title: '原型设计',
    }
  },
  {
    path: '/designPage/prototype_preview/:pathMatch(.*)*',
    component: () => import('@/views/prototype/previewPage.vue'),
    meta: {
      title: '预览原型',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
