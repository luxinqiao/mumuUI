<template>
    <div class='hideColumns'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muTableAction',
        props: {
            label: { //描述
                type: String,
                default: ''
            },
            width: { //宽度
                type: String,
                default: ''
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