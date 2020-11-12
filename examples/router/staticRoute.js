const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: () => import('../pages/home')
}, {
    path: '/user',
    component: () => import('../pages/user/list.vue')
}]

export default routes