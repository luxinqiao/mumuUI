<template>
    <div class='hideColumns'></div>
</template>

<script>
    export default {
        name: 'muTableActionItem',
        props: {
            label: { //描述
                type: String,
                default: ''
            }
        },
        methods: {
            /**
                点击操作项
                @param
                @return
             */
            clickActionItem(rowData) {
                this.$emit('bindClick', rowData)
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