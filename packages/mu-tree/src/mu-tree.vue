<template>
    <div class='mu-tree'>
        <ul class='mu-tree-ul'>
            <li class='mu-tree-li' v-for='(item, i) in datas' :key='i'>
                <mu-tree-item :node='item' :path='i.toString()'></mu-tree-item>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'muTree',
        props: {
            datas: {
                type: Array,
                default: []
            }
        },
        methods: {
            /**
                获取选中节点
                @param
                @return {Array} 节点
             */
            getCheckNodes() {
                let arr = []
                this.getCheckChildren(arr, this.datas)
                return arr
            },
            /**
                获取选中子节点
                @param {Array} arr 存放选中数组
                @param {Array} children 子节点
                @return
             */
            getCheckChildren(arr, children) {
                for (let i=0; i<children.length; i++) {
                    if (children[i].checked) {
                        arr.push(children[i])
                    }
                    this.getCheckChildren(arr, children[i].children)
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-tree {
        user-select: none;
        >.mu-tree-ul {
            >.mu-tree-li {
                list-style: none;
            }
        }
    }
</style>