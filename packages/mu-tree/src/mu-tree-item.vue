<template>
    <div class='mu-tree-item'>
        <div class='content'>
            <span class='expand' v-if='!node.isLeaf'>
                <img v-if='node.expanded' src='../img/expand-open.png' @click='closeNode(node)'>
                <img v-else src='../img/expand-close.png' @click='openNode(node)'>
            </span>
            <span class='text' @click='clickNode(node)'>{{node.name}}</span>
            <span class='check'>
                <img v-if='node.checked' src='../img/check-active.png' @click='uncheckNode(node)'>
                <img v-else src='../img/check-gray.png' @click='checkNode(node)'>
            </span>
        </div>
        <ul class='mu-tree-ul'>
            <li class='mu-tree-li' v-for='(item, i) in node.children' :key='i'>
                <mu-tree-item v-show='node.expanded' :node='item' :path='path!="" ? path+"-"+i : ""+i'></mu-tree-item>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'muTreeItem',
        props: {
            node: {
                type: Object,
                default: ()=>{}
            },
            path: {
                type: String,
                default: ''
            }
        },
        methods: {
            /**
                点击节点
                @param {Object} item 节点
                @return
             */
            clickNode(item) {
                this.getRootTree(this.$parent).$emit('bindClick', item)
            },
            /**
                展开节点
                @param {Object} item 节点
                @return
             */
            openNode(item) {
                item.expanded = true
                this.getRootTree(this.$parent).$emit('bindExpand', item)
            },
            /**
                闭合节点
                @param {Object} item 节点
                @return
             */
            closeNode(item) {
                item.expanded = false
                this.getRootTree(this.$parent).$emit('bindExpand', item)
            },
            /**
                选中节点
                @param {Object} item 节点
                @return
             */
            checkNode(item) {
                item.checked = true
                this.checkChildren(item.children)
                this.refreshParentChecked(this.$parent)
                this.getRootTree(this.$parent).$emit('bindCheck', item)
            },
            /**
                选中子节点
                @param {Array} children 子节点
                @return
             */
            checkChildren(children) {
                for (let i=0; i<children.length; i++) {
                    children[i].checked = true
                    if (children[i].children.length > 0) {
                        this.checkChildren(children[i].children)
                    }
                }
            },
            /**
                取消选中节点
                @param {Object} item 节点
                @return
             */
            uncheckNode(item) {
                item.checked = false
                this.uncheckChildren(item.children)
                this.refreshParentChecked(this.$parent)
                this.getRootTree(this.$parent).$emit('bindCheck', item)
            },
            /**
                取消选中子节点
                @param {Array} children 子节点
                @return
             */
            uncheckChildren(children) {
                for (let i=0; i<children.length; i++) {
                    children[i].checked = false
                    if (children[i].children.length > 0) {
                        this.uncheckChildren(children[i].children)
                    }
                }
            },
            /**
                刷新父节点选中状态
                @param {Object} $parent 父节点
                @return
             */
            refreshParentChecked($parent) {
                if ($parent.$options._componentTag == 'mu-tree') {
                    return
                }
                let isAllCheck = true
                for (let i=0; i<$parent.$children.length; i++) {
                    if (!$parent.$children[i].node.checked) {
                        isAllCheck = false
                        break
                    }
                }
                if (isAllCheck) {
                    $parent.node.checked = true
                } else {
                    $parent.node.checked = false
                }
                this.refreshParentChecked($parent.$parent)
            },
            /**
                获取根节点（递归）
                @param {Object} $parent 父节点
                @return {Object} 根节点
             */
            getRootTree($parent) {
                if ($parent.$options._componentTag == 'mu-tree') {
                    return $parent
                }
                return this.getRootTree($parent.$parent)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-tree-item {
        user-select: none;
        >.content {
            clear: both;
            height: 2.8rem;
            >.expand {
                float: left;
                cursor: pointer;
                >img {
                    margin-top: 0.5rem;
                    width: 1.8rem; height: 1.8rem;
                }
            }
            >.text {
                float: left;
                margin-left: 0.8rem;
                height: 2.8rem;
                line-height: 2.8rem;
            }
            >.check {
                float: left;
                cursor: pointer;
                >img {
                    margin: 0.5rem 0 0 0.8rem;
                    width: 1.8rem; height: 1.8rem;
                }
            }
        }
        >.mu-tree-ul {
            margin-left: 2.3rem;
            >.mu-tree-li {
                list-style: none;
            }
        }
    }
</style>