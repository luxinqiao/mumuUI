<template>
    <div class='mu-search-text'>
        <label>{{label}}</label>
        <input type='text' :style='{width: width}' v-model='value'>
    </div>
</template>

<script>
    export default {
        name: 'muSearchText',
        props: {
            width: {
                type: String, //宽度
                default: '22rem'
            },
            label: { //描述（必填）
                type: String,
                default: ''
            },
            field: { //字段（必填）
                type: String,
                default: ''
            }
        },
        data() {
            return {
                value: '' //值
            }
        },
        watch: {
            value: {
                handler: function(newVal, oldVal) {
                    if (this.$parent.$options._componentTag == 'mu-search') {
                        this.$parent.refreshConditions()
                    }
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .mu-search-text {
        display: inline-block;
        margin-right: 3.6rem;
        height: 3.6rem;
        >label {
            height: 3.6rem;
            line-height: 3.6rem;
            font-size: 1.4rem;
        }
        >input {
            margin: 0.2rem 0 0 1.5rem; padding: 0 0.5rem;
            height: 3.2rem;
            vertical-align: top;
            border: 0.1rem solid #ddd; border-radius: 0.3rem;
            outline: none;
            font-size: 1.4rem;
        }
        >input:focus {
            border: 0.1rem solid #77b0e2;
        }
    }
</style>
