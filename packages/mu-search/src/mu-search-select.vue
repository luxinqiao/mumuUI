<template>
    <div class='mu-search-select'>
        <label>{{label}}</label>
        <select :style='{width: width}' @change='change'>
            <option v-for='(item, i) in datas' :key='i' value='item.value' :selected='item.value==value'>{{item.label}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'muSearchSelect',
        props: {
            width: {
                type: String, //宽度
                default: '22rem'
            },
            label: {
                type: String, //描述（必填）
                default: ''
            },
            field: { //字段（必填）
                type: String,
                default: ''
            },
            datas: { //数据源（必填）
                type: Array,
                default: []
            }
        },
        data() {
            return {
                value: '' //值
            }
        },
        mounted() {
            let value = this.$parent.$props.data[this.field]
            if (value == '') {
                value = this.datas[0].value
            }
            this.value = value
        },
        methods: {
            /**
                下拉选择change监听
                @param {Dom} e 下拉选中元素
                @return
             */
            change(e) {
                this.value = this.datas[e.target.selectedIndex].value
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
    .mu-search-select {
        display: inline-block;
        margin-right: 3.6rem;
        height: 3.6rem;
        >label {
            height: 3.6rem;
            line-height: 3.6rem;
        }
        >select {
            margin: 0.2rem 0 0 1.5rem; padding: 0 0.5rem;
            height: 3.2rem;
            vertical-align: top;
            border: 0.1rem solid #ddd; border-radius: 0.3rem;
            outline: none;
            color: #333;
        }
    }
</style>
