import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    component: Main
  },
  {
    name: "notFound",
    component: NotFound,
    path: "*",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router