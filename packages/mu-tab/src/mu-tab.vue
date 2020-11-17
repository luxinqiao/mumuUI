<template>
    <div class='mu-tab'>
        <div id='head'>
            <span class='head-item' v-for='(item, i) in datas' :key='i' :class='item.active?"active":""' @click='checkTab(item, i)'>
                <font>{{item.title}}</font>
                <img :src='require("../img/close.png")' v-if='item.close' @click.stop='closeTab(i)'>
            </span>
        </div>
        <div id='content'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muTab',
        data() {
            return {
                datas: []
            }
        },
        mounted() {
            for (let i=0; i<this.$children.length; i++) {
                this.datas.push({
                    title: this.$children[i].title,
                    active: this.$children[i].active,
                    close: this.$children[i].close
                })
            }
        },
        methods: {
            /**
                选中tab页
                @param {Object} item tab项
                @param {Number} index tab项序号
                @return
             */
            checkTab(item, index) {
                for (let i=0; i<this.datas.length; i++) {
                    this.datas[i].active = false
                }
                item.active = true
                for (let i=0; i<this.$children.length; i++) {
                    this.$children[i].show = false
                }
                this.$children[index].show = true
            },
            /**
                关闭tab页
                @param {Number} i tab项序号
                @return
             */
            closeTab(i) {
                if (this.datas[i].active) {
                    if (i == this.datas.length - 1) {
                        this.checkTab(this.datas[i-1], i-1)
                    } else {
                        this.checkTab(this.datas[i+1], i+1)
                    }
                }
                this.datas.splice(i, 1)
                this.$children.splice(i, 1)
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-tab {
        >#head {
            height: 4rem;
            border: 0.1rem solid #eee;
            background-color: #f5f7fa;
            >.head-item {
                position: relative;
                float: left;
                padding: 0 3.6rem;
                height: 4rem;
                cursor: pointer;
                >font {
                    height: 4rem;
                    text-align: center; line-height: 4rem;
                    font-size: 1.4rem;
                }
                >img {
                    position: absolute;
                    top: 0; bottom: 0.2rem; right: 1.2rem;
                    margin: auto;
                    width: 1rem; height: 1rem;
                }
            }
            >.head-item.active {
                border-left: 0.1rem solid #eee; border-right: 0.1rem solid #eee;
                background-color: #fff;
                >font {
                    color: #3698ff;
                }
            }
            >.head-item.active:nth-child(1) {
                border-left: none;
            }
            >.head-item:hover {
                >font {
                    color: #3698ff;
                }
            }
        }
        >#content {
            clear: left;
            height: calc(100% - 4rem);
            background-color: #fff;
        }
    }
</style>
