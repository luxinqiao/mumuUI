<template>
    <div class='form-condition' :style='{width: width}'>
        <div class='label' :style='{"width": labelWidth}'>
            <label :style='{"text-align": labelAlign}'>{{label}}</label>
        </div>
        <div class='input' :style='{"margin-left": labelWidth}'>
            <select @change='change'>
                <option v-for='(item, i) in datas' :key='i' value='item.value' :selected='item.value==value'>{{item.label}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muFormSelect',
        props: {
            datas: { //数据源（必填）
                type: Array,
                default: []
            },
            width: { //宽度
                type: String,
                default: '100%'
            },
            field: { //字段（必填）
                type: String,
                default: ''
            },
            label: { //描述（必填）
                type: String,
                default: ''
            },
            labelAlign: { //描述对齐方式
                type: String,
                default: 'right'
            }
        },
        data() {
            return {
                labelWidth: '', //描述宽度
                value: '' //值
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            /**
                初始化数据
                @param
                @return
             */
            initData() {
                let formParam = {}
                if (this.$parent.$options._componentTag == 'mu-form') {
                    formParam = this.$parent.getParam(this.field)
                } else if (this.$parent.$parent.$options._componentTag == 'mu-form') {
                    formParam = this.$parent.$parent.getParam(this.field)
                }
                this.labelWidth = formParam.labelWidth
                this.value = formParam.value
            },
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
                    if (this.$parent.$options._componentTag == 'mu-form') {
                        this.$parent.refreshConditions()
                    } else if (this.$parent.$parent.$options._componentTag == 'mu-form') {
                        this.$parent.$parent.refreshConditions()
                    }
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .form-condition {
        margin-top: 1rem;
        height: 3rem;
        >.label {
            float: left;
            padding-right: 2rem;
            height: 3rem;
            >label {
                display: inline-block;
                width: 100%; height: 3rem;
                line-height: 3rem;
                color: #666;
                font-size: 1.4rem;
            }
        }
        >.input {
            >select {
                padding-left: 0.5rem;
                width: 100%; height: 3rem;
                border: 0.1rem solid #ddd; border-radius: 0.3rem;
                outline: none;
                color: #666;
                font-size: 1.4rem;
            }
        }
    }
</style>
