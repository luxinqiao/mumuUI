import muPage from './src/mu-page'

muPage.install = function (Vue) {
    Vue.component(muPage.name, muPage)
}

export {
    muPage
}