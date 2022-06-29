import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/single',
    name: 'Single',
    component: () => import(/* webpackChunkName: "single" */ '../views/UploadSingle.vue')
  },
  {
    path: '/base64',
    name: 'Base64',
    component: () => import(/* webpackChunkName: "base64" */'../views/Base64.vue')
  },
  {
    path: '/many',
    name: 'Many',
    component: () => import(/* webpackChunkName: "many" */'../views/UploadMany.vue')
  },
  {
    path: '/drag',
    name: 'Drag',
    component: () => import(/* webpackChunkName: "drag" */'../views/UploadDrag.vue')
  },
  {
    path: '/bigfile',
    name: 'BigFile',
    component: () => import(/* webpackChunkName: "big" */'../views/UploadBigfile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
