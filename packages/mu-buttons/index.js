import muButtons from './src/mu-buttons'
import muButton from './src/mu-button'

muButtons.install = function (Vue) {
    Vue.component(muButtons.name, muButtons)
}
muButton.install = function (Vue) {
    Vue.component(muButton.name, muButton)
}

export {
    muButtons,
    muButton
}