<template>
    <div class='mu-table'>
        <slot></slot>
        <div class='mu-table-thead'>
            <table cellspacing='0' cellpadding='0'>
                <colgroup>
                    <col v-for='(col, i) in fieldHeadArr' v-if='col.field!=""' :key='i' :name='col.field' :width='col.width'>
                    <col name='scroll' width='10'>
                </colgroup>
                <thead :style='{"background-color":headBgColor}' :class='isHasBorder?"hasBorder":""'>
                    <tr v-for='(tr, i) in headArr' :key='i' :style='{height:headRowHeight}'>
                        <th v-for='(th, j) in tr' :key='j' :colspan='th.col' :rowspan='th.row' :class='th.align'>{{th.label}}</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class='mu-table-tbody'>
            <table cellspacing='0' cellpadding='0'>
                <colgroup>
                    <col v-for='(col,i) in fieldHeadArr' v-if='col.field!=""' :key='i' :name='col.field' :width='col.width'>
                </colgroup>
                <tbody :class='isHasBorder?"hasBorder":""'>
                    <tr v-for='(tr, i) in datas' :key='i' :style='{height:bodyRowHeight}'>
                        <td v-if='td.field!=""' v-for='(td, j) in fieldHeadArr' :key='j' :class='td.align'>
                            <div v-if='td.field=="check"' class='check' @click='checkRow(i)'>
                                <img v-if='selectRows.indexOf(i)>-1' src='../img/check-active.png'>
                                <img v-else src='../img/check-gray.png'>
                            </div>
                            <div v-else-if='td.field=="mu-table-action"' class='action'>
                                <span v-for='(item, k) in actionArr' :key='k' @click='clickAction(tr, k)'>{{item.label}}</span>
                            </div>
                            <div v-else class='field'>{{getFieldVal(j, tr[td.field])}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id='loading' v-if='loading'>
                <img src='../img/loading.gif'>
                <span>加载中...</span>
            </div>
            <p id='noData' v-if='!loading && datas.length==0'>-- 暂无数据 --</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muTable',
        props: {
            datas: { //表数据（必填）
                type: Array,
                default: []
            },
            pageSize: { //每页条数
                type: Number,
                default: 10
            },
            headBgColor: { //表头背景色
                type: String,
                default: ''
            },
            headRowHeight: { //表头行高
                type: String,
                default: '5rem'
            },
            bodyRowHeight: { //表数据行高
                type: String,
                default: '5rem'
            },
            isHasBorder: { //是否有边框
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                headArr: [], //原始表头（所有表头，父子结构，最大2级）
                fieldHeadArr: [], //转换后field表头（结构1级）
                actionArr: [], //操作
                selectRows: [] //选中行号
            }
        },
        mounted() {
            this.initTable()
        },
        methods: {
            /**
                初始化表格
                @param
                @return
             */
            initTable() {
                let headDeep = this.countDeep(this.$children)
                if (headDeep > 2) {
                    headDeep = 2
                }
                for (let i = 0; i < headDeep; i++) {
                    this.headArr.push(new Array())
                }
                for (let i=0; i<this.$children.length; i++) {
                    let firstChild = this.$children[i]
                    if (firstChild.$options._componentTag == 'mu-table-column') {
                        let firstProp = firstChild.$props
                        //第1层表头
                        if (firstChild.$children.length == 0) {
                            firstProp.col = 1
                            firstProp.row = headDeep
                        } else {
                            firstProp.col = firstChild.$children.length
                            firstProp.row = 1
                        }
                        this.headArr[0].push(firstProp)
                        this.fieldHeadArr.push(firstProp)
                        //第2层表头
                        for (let j=0; j<firstChild.$children.length; j++) {
                            let sencondProp = firstChild.$children[j].$props
                            sencondProp.col = 1
                            sencondProp.row = 1
                            this.headArr[1].push(sencondProp)
                            this.fieldHeadArr.push(sencondProp)
                        }
                    } else if (firstChild.$options._componentTag == 'mu-table-action') {
                        let firstProp = firstChild.$props
                        firstProp.field = 'mu-table-action'
                        //操作表头
                        this.headArr[0].push(firstProp)
                        this.fieldHeadArr.push(firstProp)
                        //操作项
                        for (let j=0; j<firstChild.$children.length; j++) {
                            let sencondProp = firstChild.$children[j].$props
                            this.actionArr.push(sencondProp)
                        }
                    }
                }
            },
            /**
                计算深度
                @param {Array} arr 数据源
                @return {Number} 深度
             */
            countDeep(arr) {
                let maxLen = 0
                if (arr.length > 0) {
                    for (let i=0; i<arr.length; i++) {
                        if (arr[i].$options._componentTag == 'mu-table-column') {
                            let deep = this.countDeep(arr[i].$children)
                            if (maxLen < deep) {
                                maxLen = deep
                            }
                        }
                    }
                    return maxLen + 1
                } else {
                    return 0
                }
            },

            /**
                获取字段值
                @param {Number} i 字段序号
                @param {String} val 原值
                @return {String} 新值
             */
            getFieldVal(i, val) {
                const fieldHead = this.fieldHeadArr[i]
                if (fieldHead.formatVal.toString() == '()=>{}') {
                    return val
                }
                return fieldHead.formatVal({
                    align: fieldHead.align,
                    col: fieldHead.col,
                    field: fieldHead.field,
                    label: fieldHead.label,
                    row: fieldHead.row,
                    width: fieldHead.width,
                    val: val
                })
            },
            /**
                选中/取消行
                @param {Number} row 行号
                @return
             */
            checkRow(row) {
                const index = this.selectRows.indexOf(row)
                if (index == -1) {
                    this.selectRows.push(row)
                } else {
                    this.selectRows.splice(index, 1)
                }
                this.$emit('bindCheckRow', {
                    rowNo: row,
                    rowData: this.datas[row],
                    checkRows: this.selectRows,
                    checkDatas: this.getCheckDatas()
                })
            },
            /**
                获取选中数据
                @param
                @return {Array} 选中数据
             */
            getCheckDatas() {
                let arr = []
                for (let i=0; i<this.selectRows.length; i++) {
                    arr.push(this.datas[this.selectRows[i]])
                }
                return arr
            },
            /**
                获取滚动条宽度
                @param
                @return {Number} 滚动条宽度
             */
            getScrollbarWidth() {
                var odiv = document.createElement('div')
                odiv.width = '10rem'
                odiv.height = '10rem'
                odiv.overflowY = 'scroll'
                document.body.appendChild(odiv)
                var scrollbarWidth = odiv.offsetWidth - odiv.clientWidth
                odiv.remove()
                return scrollbarWidth
            },
            /**
                点击操作按钮
                @param {Object} rowData 行数据
                @param {Number} i 按钮索引
                @return
             */
            clickAction(rowData, i) {
                const $action = this.getActionComponent(this.$children)
                $action.$children[i].clickActionItem(rowData)
            },
            /**
                获取操作组件
                @param {Array} $children 子元素
                @return {Object} 操作组件
             */
            getActionComponent($children) {
                for (let i=0; i<$children.length; i++) {
                    if ($children[i].$options._componentTag == 'mu-table-action') {
                        return $children[i]
                    }
                    if ($children[i].$children.length > 0) {
                        return this.getCheckChildren($children[i].$children)
                    }
                }
            }
        },
        watch: {
            datas: {
                handler: function(newVal, oldVal) {
                    this.selectRows = []
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-table {
        >.mu-table-thead {

        }
        >.mu-table-tbody {
            position: relative;
            height: calc(100% - 5rem);
            min-height: 5rem;
            overflow: auto;
            >#loading {
                position: absolute;
                top: 0; bottom: 0; left: 0; right: 0;
                margin: auto;
                width: 8rem; height: 2rem;
                >img {
                    float: left;
                    margin-top: 0.4rem;
                    width: 1.2rem; height: 1.2rem;
                }
                >span {
                    float: left;
                    margin-left: 0.8rem;
                    height: 2rem;
                    line-height: 2rem;
                }
            }
            >#noData {
                height: 5rem;
                text-align: center; line-height: 5rem;
            }
        }
        table {
            width: 100%;
            >thead {
                background-color: #e6e6e6;
                >tr {
                    >th {
                        padding: 0 0.5rem;
                        text-align: left;
                        color: #555;
                        font-size: 1.4rem;
                    }
                    >th.left {
                        text-align: left;
                    }
                    >th.center {
                        text-align: center;
                    }
                    >th.right {
                        text-align: right;
                    }
                }
            }
            >thead.hasBorder {
                >tr {
                    >th {
                        border-left: 0.1rem solid #e6e6e6;
                        border-top: 0.1rem solid #e6e6e6;
                    }
                    >th:last-child {
                        border-right: 0.1rem solid #e6e6e6;
                    }
                }
            }
            >tbody {
                >tr {
                    >td {
                        padding: 0 0.5rem;
                        text-align: left;
                        word-break: break-all;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: normal;
                        border-bottom: 0.1rem solid #eee;
                        font-size: 1.4rem;
                        >.check {
                            cursor: pointer;
                        }
                        >.no {

                        }
                        >.field {

                        }
                        >.action {
                            width: 100%; height: 5rem;
                            cursor: pointer;
                            >span {
                                float: left;
                                margin-left: 1rem;
                                height: 5rem;
                                line-height: 5rem;
                                color: #3698ef;
                            }
                            >span:nth-child(1) {
                                margin-left: 0;
                            }
                        }
                        >.action:hover {
                            cursor: pointer;
                            z-index: 99;
                            >span {
                                display: block;
                            }
                        }
                    }
                    >td.left {
                        text-align: left;
                    }
                    >td.center {
                        text-align: center;
                    }
                    >td.right {
                        text-align: right;
                    }
                }
                >tr:hover {
                    background-color: #e2f2ff;
                }
            }
            >tbody.hasBorder {
                >tr {
                    >td {
                        border-left: 0.1rem solid #e6e6e6;
                        border-top: 0.1rem solid #e6e6e6;
                    }
                    >td:last-child {
                        border-right: 0.1rem solid #e6e6e6;
                    }
                }
                >tr:last-child {
                    >td {
                        border-bottom: 0.1rem solid #e6e6e6;
                    }
                }
            }
        }
    }
</style>
