import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Groups from './components/Groups.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "home"
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/groups',
            name: 'groups',
            component: Groups
        },
        {
            path: '/profile',
            name: 'profile',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "profile" */ './components/Profile.vue')
        }
    ],
    mode: 'history'
})
