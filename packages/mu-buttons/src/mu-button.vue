<template>
    <div :class='"mu-button "+type+(enabled?"":" disabled")' :style='{float: align}' @click='clickButton()'>
        <img :src='icon'>
        <span>{{label}}</span>
    </div>
</template>

<script>
    export default {
        name: 'muButton',
        props: {
            type: {
                type: String,
                default: 'mini'
            },
            icon: { //图标
                type: String,
                default: ''
            },
            label: { //描述
                type: String,
                default: ''
            },
            align: { //对齐方式
                type: String,
                default: 'left' //left,right
            },
            enabled: { //是否可用
                type: Boolean,
                default: true
            }
        },
        methods: {
            /**
                点击按钮
                @param
                @return
             */
            clickButton() {
                if (this.enabled) {
                    this.$emit('bindClick')
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-button {
        margin-left: 2rem;
        height: 3rem;
        border: none; outline: none; background: none;
        cursor: pointer;
        >img {
            width: 1.6rem; height: 1.6rem;
            margin: 0.7rem 0 0 0;
        }
        >span {
            display: inline-block;
            margin-left: 0.5rem;
            height: 3rem;
            vertical-align: top;
            line-height: 3rem;
            font-size: 1.4rem;
        }
    }
    .mu-button.disabled {
        opacity: 0.5;
    }
    .mu-button:first-child {
        margin-left: 0;
    }
</style>
