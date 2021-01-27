<template>
    <div class='mu-page'>
        <div class='record'>
            <div class='prePage' @click='goPagePre()'>上一页</div>
            <div class='pages'>
                <div v-if='totalPage<10'>
                    <span v-for='i of totalPage' :key='i' :class='i==newPageNo ? "active" : ""' @click='changePage(i)'>{{i}}</span>
                </div>
                <div v-else-if='newPageNo<=4'>
                    <span v-for='i of 5' :key='i' :class='i==newPageNo ? "active" : ""' @click='changePage(i)'>{{i}}</span>
                    <span class='ellipsis'>...</span>
                    <span @click='changePage(totalPage)'>{{totalPage}}</span>
                </div>
                <div v-else-if='newPageNo>=totalPage-3'>
                    <span @click='changePage(1)'>1</span>
                    <span class='ellipsis'>...</span>
                    <span v-for='i of 5' :key='i' :class='i==newPageNo+5-totalPage ? "active" : ""' @click='changePage(i+totalPage-5)'>{{i+totalPage-5}}</span>
                </div>
                <div v-else>
                    <span @click='changePage(1)'>1</span>
                    <span class='ellipsis'>...</span>
                    <span v-for='i of 5' :key='i' :class='i==3 ? "active" : ""' @click='changePage(i+newPageNo-3)'>{{i+newPageNo-3}}</span>
                    <span class='ellipsis'>...</span>
                    <span @click='changePage(totalPage)'>{{totalPage}}</span>
                </div>
            </div>
            <div class='nextPage' @click='goPageNext()'>下一页</div>
        </div>
        <div class='detailNum'>
            <span>每页显示</span>
            <select @change='changePageSize'>
                <option :selected='item==defaultPageNum' v-for='(item, i) in pageNums' :key='i'>{{item}}</option>
            </select>
            <span>条，共{{total}}条数据</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muPage',
        props: {
            pageNums: {
                type: Array,
                default: [5, 10, 15, 20]
            },
            defaultPageNum: {
                type: Number,
                default: 10
            },
            pageSize: { //每页条数
                type: Number,
                default: 10
            },
            pageNo: { //页码
                type: Number,
                default: 1
            },
            total: { //总记录数
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                newPageSize: 10, //每页条数
                newPageNo: 1, //页码
                totalPage: 0 //总页数
            }
        },
        mounted() {
            this.initPage()
        },
        methods: {
            /**
                初始化分页
                @param
                @return
             */
            initPage() {
                this.newPageNo = this.pageNo
                this.newPageSize = this.pageSize
            },
            /**
                监听每页数量变化
                @param {Object} e 每页数量下拉框
                @return
             */
            changePageSize(e) {
                const pageSize = parseInt(e.target.value)
                if (this.newPageSize == pageSize) {
                    return
                }
                this.newPageSize = pageSize
                this.$emit('bindPageSizeChange', {
                    pageSize: this.newPageSize
                })
            },
            /**
                监听页码变化
                @param {Number} i 页码
                @return
             */
            changePage(i) {
                if (this.newPageNo == i) {
                    return
                }
                this.newPageNo = i
                this.$emit('bindPageNoChange', {
                    pageNo: this.newPageNo
                })
            },
            /**
                上一页
                @param
                @return
             */
            goPagePre() {
                if (this.newPageNo == 1) {
                    return
                }
                this.changePage(this.newPageNo - 1)
            },
            /**
                下一页
                @param
                @return
             */
            goPageNext() {
                if (this.newPageNo == this.totalPage) {
                    return
                }
                this.changePage(this.newPageNo + 1)
            },
            /**
                计算总页数
                @param
                @return
             */
            countTotalPage() {
                this.totalPage = Math.ceil(this.total / this.pageSize)
            }
        },
        watch: {
            pageSize: {
                handler: function(newVal, oldVal) {
                    this.initPage()
                    this.countTotalPage()
                }
            },
            pageNo: {
                handler: function(newVal, oldVal) {
                    this.initPage()
                }
            },
            total: {
                handler: function(newVal, oldVal) {
                    this.countTotalPage()
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-page {
        height: 5rem;
        box-shadow: inset 0 -0.1rem 0 0.1rem #ddd;
        background-color: #e6e6e6;
        user-select: none;
        >.record {
            float: right;
            padding-right: 2.4rem;
            height: 5rem;
            >.prePage {
                float: left;
                margin-top: 1.3rem; padding: 0 0.8rem;
                height: 2.4rem;
                line-height: 2.2rem;
                border-radius: 1rem;
                font-size: 1.2rem;
                color: #333;
                cursor: pointer;
            }
            >.prePage:hover {
                background-color: #3698ef; color: #fff;
            }
            >.pages {
                float: left;
                margin: 1.5rem 1rem 0 0;
                height: 2rem;
                span {
                    float: left;
                    margin-left: 1rem; padding: 0 0.6rem;
                    height: 2rem;
                    line-height: 1.8rem;
                    border-radius: 1rem;
                    font-size: 1.2rem;
                    color: #333;
                    cursor: pointer;
                }
                span.active {
                    background-color: #3698ef; color: #fff;
                }
                span.ellipsis {
                    letter-spacing: 0.2rem;
                }
            }
            >.nextPage {
                float: left;
                margin: 1.3rem 0 0 0; padding: 0 0.8rem;
                height: 2.4rem;
                line-height: 2.2rem;
                border-radius: 1rem;
                font-size: 1.2rem;
                cursor: pointer;
            }
            >.nextPage:hover {
                background-color: #3698ef; color: #fff;
            }
        }
        >.detailNum {
            float: left;
            margin-right: 3rem; padding-left: 2.4rem;
            height: 5rem;
            >span {
                float: left;
                margin-top: 1.6rem;
                height: 2rem;
                line-height: 2rem;
                font-size: 1.4rem;
                color: #666;
            }
            >select {
                float: left;
                margin: 1.5rem 1rem; padding: 0 0.3rem;
                height: 2.2rem;
            }
        }
    }
</style>
