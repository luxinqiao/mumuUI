import muTab from './src/mu-tab'
import muTabItem from './src/mu-tab-item'

muTab.install = function (Vue) {
    Vue.component(muTab.name, muTab)
}
muTabItem.install = function (Vue) {
    Vue.component(muTabItem.name, muTabItem)
}

export {
    muTab,
    muTabItem
}