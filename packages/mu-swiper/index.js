import muSwiper from './src/mu-swiper'

muSwiper.install = function (Vue) {
    Vue.component(muSwiper.name, muSwiper)
}

export {
    muSwiper
}