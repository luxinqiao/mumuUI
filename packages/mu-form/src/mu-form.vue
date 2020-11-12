<template>
    <div class='mu-form'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muForm',
        props: {
            labelWidth: { //标签宽度
                type: String,
                default: '20%'
            },
            data: { //数据源（必填）
                type: Object,
                default: {}
            }
        },
        methods: {
            /**
                获取表单参数
                @param {String} field 字段
                @return {Object} 表单参数
             */
            getParam(field) {
                return {
                    labelWidth: this.labelWidth,
                    value: this.data[field]
                }
            },
            /**
                刷新表单条件
                @param
                @return
             */
            refreshConditions() {
                for (let i=0; i<this.$children.length; i++) {
                    let child = this.$children[i]
                    if (child.$options._componentTag == 'mu-form-frame') {
                        for (let j=0; j<child.$children.length; j++) {
                            this.data[child.$children[j].$props.field] = child.$children[j].$data.value
                        }
                    } else {
                        this.data[child.$props.field] = child.$data.value
                    }
                }
            }
        },
        watch: {
            data: {
                handler: function(newVal, oldVal) {
                    for (let i=0; i<this.$children.length; i++) {
                        let child = this.$children[i]
                        if (child.$options._componentTag == 'mu-form-frame') {
                            for (let j=0; j<child.$children.length; j++) {
                                child.$children[j].initData()
                            }
                        } else {
                            child.initData()
                        }
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .mu-form {
        user-select: none;
    }
</style>
