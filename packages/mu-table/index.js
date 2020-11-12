import muTable from './src/mu-table'
import muTableColumn from './src/mu-table-column'
import muTableAction from './src/mu-table-action'
import muTableActionItem from './src/mu-table-action-item'

muTable.install = function (Vue) {
    Vue.component(muTable.name, muTable)
}
muTableColumn.install = function (Vue) {
    Vue.component(muTableColumn.name, muTableColumn)
}
muTableAction.install = function (Vue) {
    Vue.component(muTableAction.name, muTableAction)
}
muTableActionItem.install = function (Vue) {
    Vue.component(muTableActionItem.name, muTableActionItem)
}

export {
    muTable,
    muTableColumn,
    muTableAction,
    muTableActionItem
}