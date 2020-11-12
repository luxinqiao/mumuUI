<template>
    <div class='form-condition' :style='{width: width}'>
        <div class='label' :style='{"width": labelWidth}'>
            <label :style='{"text-align": labelAlign}'>{{label}}</label>
        </div>
        <div class='input' :style='{"margin-left": labelWidth}'>
            <span class='radioItem' v-for='(item, i) in datas' :key='i' @click='change(item.value)'>
                <img v-if='validChecked(item.value)' src='../img/checkbox-active.png'>
                <img v-else src='../img/checkbox-gray.png'>
                <span>{{item.label}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'muFormCheckbox',
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
                校验选项是否选中
                @param {String} itemVal 选项值
                @return {Boolean} 是否选中
             */
            validChecked(itemVal) {
                if (this.value == undefined) {
                    return false
                }
                let valArr = this.value.split(',')
                if (valArr.indexOf(itemVal) > -1) {
                    return true
                }
                return false
            },
            /**
                单选change监听
                @param {String} itemVal 多选选中值
                @return
             */
            change(itemVal) {
                let valArr = this.value.split(',')
                const index = valArr.indexOf(itemVal)
                if (index == -1) {
                    valArr.push(itemVal)
                } else {
                    valArr.splice(index, 1)
                }
                this.value = valArr.join(',')
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
    .form-condition {
        margin-top: 1rem;
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
            >.radioItem {
                display: inline-block;
                margin-right: 2.5rem;
                height: 3rem;
                cursor: pointer;
                >img {
                    margin-top: 0.6rem;
                    width: 1.8rem; height: 1.8rem;
                }
                >span {
                    margin-left: 1rem;
                    height: 3rem;
                    line-height: 3rem;
                    vertical-align: top;
                    color: #666;
                    font-size: 1.4rem;
                }
            }
        }
    }
</style>
