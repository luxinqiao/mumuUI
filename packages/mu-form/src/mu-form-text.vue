<template>
    <div class='mu-form-condition' :style='{width: width}'>
        <div class='label' :style='{"width": labelWidth}'>
            <label :style='{"text-align": labelAlign}'>{{label}}</label>
        </div>
        <div class='input' :style='{"margin-left": labelWidth}'>
            <input type='text' v-model='value'>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muFormText',
        props: {
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

<style scoped lang="scss">
    .mu-form-condition {
        margin-top: 1rem; padding-right: 7.2rem;
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
            >input {
                padding-left: 0.5rem;
                width: 100%; height: 3rem;
                border: 0.1rem solid #ddd; border-radius: 0.3rem;
                outline: none;
                color: #666;
                font-size: 1.4rem;
            }
            >input:focus {
                border: 0.1rem solid #77b0e2;
            }
        }
    }
</style>