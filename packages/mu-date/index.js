import muDate from './src/mu-date'

muDate.install = function (Vue) {
    Vue.component(muDate.name, muDate)
}

export {
    muDate
}