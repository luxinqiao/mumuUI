<template>
    <div id='main'>
        <div id='tableContent'>
            <div id='search'>
                <mu-search :data='searchObj'>
                    <mu-search-text label='姓名' field='name'></mu-search-text>
                    <mu-search-text label='手机号' field='phone'></mu-search-text>
                    <mu-search-select label='性别' field='sex' :datas='sexArr'></mu-search-select>
                    <mu-search-button label='查询' @bindClick='search'></mu-search-button>
                </mu-search>
            </div>
            <div id='table'>
                <mu-buttons>
                    <mu-button :icon='iconObj.add' label='新增' @bindClick='goAdd()'></mu-button>
                    <mu-button :icon='iconObj.edit' label='编辑' :enabled='checkRows.length == 1' @bindClick='goEdit()'></mu-button>
                    <mu-button :icon='iconObj.delete' label='删除' :enabled='checkRows.length == 1' @bindClick='goDelete()'></mu-button>
                    <mu-button :icon='iconObj.add' label='tree' @bindClick='goTree()'></mu-button>
                    <mu-button :icon='iconObj.export' label='导出' align='right'></mu-button>
                    <mu-button :icon='iconObj.import' label='导入' align='right'></mu-button>
                </mu-buttons>
                <mu-table class='mu-table' :datas='tableData' :pageSize='pageObj.pageSize' @bindCheckRow='bindCheckRow' ref='muTable'>
                    <mu-table-column field='check' label='' width='34' align='center'></mu-table-column>
                    <mu-table-column field='no' label='序号' width='40'></mu-table-column>
                    <mu-table-column field='name' label='姓名' width='65'></mu-table-column>
                    <mu-table-column field='sex' label='性别' width='40' :formatVal='formatDictDesc'></mu-table-column>
                    <mu-table-column field='birthday' label='生日' width='70'></mu-table-column>
                    <mu-table-column field='phone' label='手机号' width='70'></mu-table-column>
                    <mu-table-column field='school' label='毕业院校' width='120'></mu-table-column>
                    <mu-table-column field='education' label='学历' width='50' :formatVal='formatDictDesc'></mu-table-column>
                    <mu-table-column field='company' label='公司名称' width='120'></mu-table-column>
                    <mu-table-column field='job' label='岗位' width='60' :formatVal='formatDictDesc'></mu-table-column>
                    <mu-table-column field='income' label='收入（万元）' width='60' :formatVal='formatDictDesc'></mu-table-column>
                    <mu-table-action label='操作' width='100'>
                        <mu-table-action-item label='查看' @bindClick='goDetail'></mu-table-action-item>
                        <mu-table-action-item label='编辑' @bindClick='goEdit'></mu-table-action-item>
                        <mu-table-action-item label='删除' @bindClick='goDelete'></mu-table-action-item>
                    </mu-table-action>
                </mu-table>
                <mu-page :pageSize='pageObj.pageSize' :pageNo='pageObj.pageNo' :total='pageObj.total' @bindPageNoChange='bindPageNoChange' @bindPageSizeChange='bindPageSizeChange'>
                </mu-page>
            </div>
            <mu-dialog ref='muDialog'></mu-dialog>
            <mu-dialog ref='muDialogAdd'>
                <userAdd></userAdd>
            </mu-dialog>
            <mu-dialog ref='muDialogEdit'>
                <userEdit :userId='selectRowId'></userEdit>
            </mu-dialog>
            <mu-dialog ref='muDialogTree'>
                <div style='padding: 2rem 3rem;'>
                    <mu-tree ref='muTree' :datas='treeData' @bindExpand='expandNode' @bindCheck='checkNode'></mu-tree>
                </div>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
import userAdd from './add.vue'
import userEdit from './edit.vue'
import {getDicts, getDictDesc} from '../../utils/dict.js'

export default {
    name: 'App',
    data() {
        return {
            searchObj: {
                name: '',
                phone: '',
                sex: '1'
            },
            queryObj: {},
            sexArr: [],
            iconObj: {
                add: require('../../img/user/add.png'),
                edit: require('../../img/user/edit.png'),
                delete: require('../../img/user/delete.png'),
                import: require('../../img/user/import.png'),
                export: require('../../img/user/export.png')
            },
            tableData: [],
            selectRowId: '',
            checkRows: [],
            pageObj: {
                pageSize: 10,
                pageNo: 1,
                total: 0
            },
            treeData: [{
                name: '江苏省',
                checked: false,
                expanded: true,
                isLeaf: false,
                children: [{
                    name: '淮安市',
                    checked: false,
                    expanded: false,
                    isLeaf: false,
                    children: [{
                        name: '淮安区',
                        checked: false,
                        expanded: false,
                        isLeaf: true,
                        children: []
                    }]
                }, {
                    name: '南京市',
                    checked: false,
                    expanded: true,
                    isLeaf: false,
                    children: [{
                        name: '秦淮区',
                        checked: false,
                        expanded: false,
                        isLeaf: true,
                        children: []
                    }, {
                        name: '雨花区',
                        checked: false,
                        expanded: false,
                        isLeaf: true,
                        children: []
                    }, {
                        name: '浦口区',
                        checked: false,
                        expanded: false,
                        isLeaf: true,
                        children: []
                    }, {
                        name: '江宁区',
                        checked: false,
                        expanded: false,
                        isLeaf: true,
                        children: []
                    }]
                }]
            }, {
                name: '安徽省',
                checked: false,
                expanded: false,
                isLeaf: false,
                children: []
            }]
        }
    },
    mounted() {
        this.initData()
        this.initDict()
    },
    methods: {
        /**
            初始化数据
            @param
            @return
         */
        initData() {
            this.checkRows = []
            this.queryObj.pageSize = this.pageObj.pageSize
            this.queryObj.pageNo = this.pageObj.pageNo
            this.$axios.get(`${this.$domain}user/list`, {
                params: this.queryObj
            }).then(res => {
                if (res.code === 200) {
                    for (let i=0; i<res.data.length; i++) {
                        res.data[i].no = (this.pageObj.pageNo - 1) * this.pageObj.pageSize + i + 1
                    }
                    this.tableData = res.data
                }
            })
            this.$axios.get(`${this.$domain}user/countList`, {
                params: this.queryObj
            }).then(res => {
                if (res.code === 200) {
                    this.pageObj.total = res.data
                }
            })
        },
        /**
            初始化字典
            @param
            @return
         */
        initDict() {
            const sexs = getDicts('user', 'sex')
            for (let i=0; i<sexs.length; i++) {
                this.sexArr.push({
                    value: sexs[i].value,
                    label: sexs[i].desc
                })
            }
        },
        /**
            格式化转换字典描述
            @param {Object} param 字段信息
            @return {String} 字典描述
         */
        formatDictDesc(param) {
            return getDictDesc('user', param.field, param.val)
        },
        /**
            查询
            @param
            @return
         */
        search() {
            this.pageObj.pageNo = 1
            this.queryObj = JSON.parse(JSON.stringify(this.searchObj))
            this.initData()
        },
        /**
            绑定事件-表格行选中
            @param {Object} e 表格行
            @return
         */
        bindCheckRow(e) {
            this.checkRows = e.checkRows
        },
        /**
            绑定事件-当前页切换
            @param {Object} e 页码
            @return
         */
        bindPageNoChange(e) {
            this.pageObj.pageNo = e.pageNo
            this.initData()
        },
        /**
            绑定事件-每页条数切换
            @param {Object} e 每页条数
            @return
         */
        bindPageSizeChange(e) {
            this.pageObj.pageSize = e.pageSize
            this.pageObj.pageNo = 1
            this.initData()
        },
        /**
            展开树节点
            @param {Object} item 树节点
            @return
         */
        expandNode(item) {
            console.log('expandNode:', item)
        },
        /**
            选中树节点
            @param {Object} item 树节点
            @return
         */
        checkNode(item) {
            console.log('checkNode:', item)
        },

        /**
            跳转-新增
            @param
            @return
         */
        goAdd() {
            this.$refs.muDialogAdd.content({
                title: '新增'
            })
        },
        /**
            跳转-详情
            @param {Object} rowData 行数据
            @return
         */
        goDetail(rowData) {
            console.log('goDetail:', rowData)
        },
        /**
            跳转-编辑
            @param {Object} rowData 行数据
            @return
         */
        goEdit(rowData) {
            this.selectRowId = rowData != undefined ? rowData.uuid : this.$refs.muTable.getCheckDatas()[0].uuid
            this.$refs.muDialogEdit.content({
                title: '修改'
            })
        },
        /**
            跳转-删除
            @param {Object} rowData 行数据
            @return
         */
        goDelete(rowData) {
            this.$refs.muDialog.confirm({
                content: '确定要删除该记录吗？',
                rightCallBack: ()=>{
                    this.$axios.post(`${this.$domain}user/delete`, {
                        uuid: rowData != undefined ? rowData.uuid : this.$refs.muTable.getCheckDatas()[0].uuid
                    }).then(res => {
                        this.$refs.muDialog.tip('删除成功')
                        this.initData()
                    })
                }
            })
        },
        /**
            跳转-tree
            @param
            @return
         */
        goTree() {
            this.$refs.muDialogTree.content({
                title: 'tree'
            })
        },
    },
    components: {
        userAdd,
        userEdit
    }
}
</script>

<style scoped lang="scss">
    #main {
        >#tableContent {
            width: 100%; height: 100%;
            >#search {
                padding: 2rem 2.4rem;
                background-color: #fff;
            }
            >#table {
                margin-top: 1.6rem;
                height: calc(100% - 10rem);
                background-color: #fff;
                >.mu-table {
                    height: calc(100% - 10rem);
                }
            }
        }
    }
</style>