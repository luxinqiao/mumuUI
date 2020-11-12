<template>
    <div class='mu-search-button' @click='clickButton()'>
        <label>{{label}}</label>
    </div>
</template>

<script>
    export default {
        name: 'muSearchButton',
        props: {
            label: { //描述
                type: String,
                default: ''
            }
        },
        methods: {
            /**
                点击按钮
                @param
                @return
             */
            clickButton() {
                this.$emit('bindClick')
            }
        }
    }
</script>

<style scoped lang="scss">
    .mu-search-button {
        display: inline-block;
        padding-left: 3.6rem;
        width: 8.5rem; height: 3.2rem;
        border-radius: 0.5rem;
        background: url(../img/search.png) no-repeat 1.2rem center;
        background-size: 1.6rem 1.6rem;
        background-color: #3698ef;
        cursor: pointer;
        >label {
            height: 3.2rem;
            line-height: 3.2rem;
            color: #fff;
            font-size: 1.4rem;
        }
    }
</style>
