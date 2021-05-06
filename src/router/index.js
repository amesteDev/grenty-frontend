import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Verify from '../views/Verify.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/machine',
    name: 'MachineAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/MachineAdmin.vue'),
    children:[
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

export default router
