import Vue from 'vue'
import VueRouter from 'vue-router'
import Verify from '../views/Verify.vue'

Vue.use(VueRouter)

function loginCheck(to, from, next) {
  if (localStorage.getItem('token')) {
    next('/home');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/MySite.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Login',
    beforeEnter: loginCheck,
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
    component: () => import('../views/About.vue')
  },
  {
    path: '/gdpr',
    name: 'GDPR',
    component: () => import('../views/GDPR.vue')

  },
  {
    path: '/info/:user/:machine',
    component: () => import('../views/rentInfo.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/machine',
    name: 'MachineAdmin',
    component: () => import('../views/MachineAdmin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('../components/machineInfo.vue')
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
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') == null) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: "/",
        params: { nextUrl: to.Fullpath }
      })
    }
    else {
      next();
    }
  }
  next();
})

export default router