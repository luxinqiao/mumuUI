import muTree from './src/mu-tree'
import muTreeItem from './src/mu-tree-item'

muTree.install = function (Vue) {
    Vue.component(muTree.name, muTree)
}
muTreeItem.install = function (Vue) {
    Vue.component(muTreeItem.name, muTreeItem)
}

export {
    muTree,
    muTreeItem
}