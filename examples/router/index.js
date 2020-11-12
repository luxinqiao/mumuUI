import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './staticRoute'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        router.push({path: '/home'})
        return
    }
    next()
})

export default router