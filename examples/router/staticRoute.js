const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: () => import('../pages/home')
}, {
    path: '/user',
    component: () => import('../pages/user/list.vue')
}, {
    path: '/swiper',
    component: () => import('../pages/swiper')
}, {
    path: '/tab',
    component: () => import('../pages/tab')
}, {
    path: '/date',
    component: () => import('../pages/date')
}]

export default routes