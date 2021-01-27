import {muButtons, muButton} from './mu-buttons/index.js'
import {muDialog} from './mu-dialog/index.js'
import {muDate} from './mu-date/index.js'
import {muForm, muFormFrame, muFormText, muFormTextarea, muFormSelect, muFormRadio, muFormCheckbox} from './mu-form/index.js'
import {muPage} from './mu-page/index.js'
import {muSearch, muSearchText, muSearchSelect, muSearchButton} from './mu-search/index.js'
import {muTab, muTabItem} from './mu-tab/index.js'
import {muTable, muTableColumn, muTableAction, muTableActionItem} from './mu-table/index.js'
import {muTree, muTreeItem} from './mu-tree/index.js'
import {muSwiper} from './mu-swiper/index.js'

//定义install方法，接收Vue作为参数。如果使用use注册插件，则所有的组件都将被注册
const install = function(Vue) {
    //判断是否安装
    if (install.installed) {
        return
    }
    //遍历注册全局组件
    const components = [
        muButtons, muButton,
        muDialog,
        muDate,
        muForm, muFormFrame, muFormText, muFormTextarea, muFormSelect, muFormRadio, muFormCheckbox,
        muPage,
        muSearch, muSearchText, muSearchSelect, muSearchButton,
        muTab, muTabItem,
        muTable, muTableColumn, muTableAction, muTableActionItem,
        muTree, muTreeItem,
        muSwiper
    ]
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
//判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

//自适应布局：动态设置rem与px比例
let pxW = 1920
const resizeFontSize = () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / pxW * 10 + 'px'
}
resizeFontSize()
window.addEventListener('resize', resizeFontSize, false)

export default {
    install, //供Vue.use()方法安装
    muButtons, muButton,
    muDialog,
    muDate,
    muForm, muFormFrame, muFormText, muFormTextarea, muFormSelect, muFormRadio, muFormCheckbox,
    muPage,
    muSearch, muSearchText, muSearchSelect, muSearchButton,
    muTab, muTabItem,
    muTable, muTableColumn, muTableAction, muTableActionItem,
    muTree, muTreeItem,
    muSwiper,
    resetPxWidth: (w=1920) => { //重置基准像素宽度（默认1920px下，1rem=10px）
        pxW = w
        resizeFontSize()
    }
}