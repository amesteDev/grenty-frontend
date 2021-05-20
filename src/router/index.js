import Vue from 'vue'
import VueRouter from 'vue-router'
import Verify from '../views/Verify.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/MySite.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/verify/:id',
    name: 'verify',
    component: Verify
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gdpr',
    name: 'GDPR',
    component: () => import('../views/GDPR.vue')

  },
  {
    path: '/machine',
    name: 'MachineAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/MachineAdmin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('../components/machineInfo.vue')
      },
      {
        path: '/info/:user/:machine',
        component: () => import('../components/rentInfo.vue')
      },
      {
        path: 'edit/:id',
        component: () => import('../components/editMachine.vue')
      },
      {
        path: 'add',
        component: () => import('../components/addMachine.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') == null) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: "/login",
        params: { nextUrl: to.Fullpath }
      })
    }
  } else {
    next();
  }
})

export default router
