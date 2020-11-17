<template>
    <div class='mu-form-frame'>
        <div class='mu-form-frame-title'>
            <span class='label'>{{label}}</span>
            <span class='expand' @click='expandFrame'>
                <span>{{isShow ? "收起" : "展开"}}</span>
                <img v-if='isShow' src='../img/frame-up.png'>
                <img v-else src='../img/frame-down.png'>
            </span>
        </div>
        <div class='mu-form-frame-content' v-show='isShow'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muFormFrame',
        props: {
            label: { //描述（必填）
                type: String,
                default: ''
            },
            isExpand: { //是否展开
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isShow: true //是否显示
            }
        },
        mounted() {
            this.isShow = this.isExpand
        },
        methods: {
            /**
                展开/收缩frame框
                @param
                @return
             */
            expandFrame() {
                this.isShow = !this.isShow
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-form-frame {
        margin-top: 2rem;
        >.mu-form-frame-title {
            position: relative;
            height: 3.5rem;
            border-bottom: 0.1rem solid #ddd;
            >.label {
                position: absolute;
                top: 0; left: 0;
                height: 3rem;
                line-height: 3rem;
                font-size: 1.4rem;
            }
            >.expand {
                position: absolute;
                top: 0; right: 0;
                width: 7.2rem; height: 3rem;
                cursor: pointer;
                >span {
                    position: absolute;
                    top: 0; right: 1.3rem;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 1.4rem;
                }
                >img {
                    position: absolute;
                    top: 1rem; right: 0;
                    width: 1rem; height: 1rem;
                }
            }
        }
    }
    .mu-form-frame:nth-child(1) {
        margin-top: 0;
    }
</style>
