/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {
        ambiente: []
    }
}, ]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,

    routes
})
export default router