import muSearch from './src/mu-search'
import muSearchText from './src/mu-search-text'
import muSearchSelect from './src/mu-search-select'
import muSearchButton from './src/mu-search-button'

muSearch.install = function (Vue) {
    Vue.component(muSearch.name, muSearch)
}
muSearchText.install = function (Vue) {
    Vue.component(muSearchText.name, muSearchText)
}
muSearchSelect.install = function (Vue) {
    Vue.component(muSearchSelect.name, muSearchSelect)
}
muSearchButton.install = function (Vue) {
    Vue.component(muSearchButton.name, muSearchButton)
}

export {
    muSearch,
    muSearchText,
    muSearchSelect,
    muSearchButton
}