import muDialog from './src/mu-dialog'

muDialog.install = function (Vue) {
    Vue.component(muDialog.name, muDialog)
}

export {
    muDialog
}