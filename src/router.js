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
    }
    // },
    // {
    //   path: '/novo-canvas',
    //   name: 'new-canvas',
    //   component: () => import(/* webpackChunkName: "canvas" */ './views/Canvas.vue'),
    // },
    // {
    //   path: '/canvas/:id',
    //   name: 'canvas',
    //   component: () => import(/* webpackChunkName: "canvas" */ './views/Canvas.vue'),
    // },
    // {
    //   path: '/sobre',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
