import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue') 
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
        path: '/gamers',
        name: 'gamers',
        component: () => import(/* webpackChunkName: "gamers" */ './views/Gamers.vue')
    },
    {
        path: '/update-result',
        name: 'update-result',
        component: () => import(/* webpackChunkName: "updateResults" */ './views/UpdateResults.vue')
    }
  ]
})
