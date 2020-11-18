<template>
    <div class='hideColumns'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muTableColumn',
        props: {
            field: { //字段
                type: String,
                default: ''
            },
            label: { //描述
                type: String,
                default: ''
            },
            width: { //宽度
                type: String,
                default: ''
            },
            align: { //对齐方式：left,center,right
                type: String,
                default: 'left'
            },
            formatVal: { //值转换
                type: Function,
                default: ()=>{}
            }
        }
    }
</script>

<style scoped lang='scss'>
    .hideColumns {
        visibility: hidden;
        width: 0; height: 0;
        * {
            visibility: hidden;
            width: 0; height: 0;
        }
    }
</style>