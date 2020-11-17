<template>
    <div class='mu-tab-item' :hidden='!show'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muTabItem',
        props: {
            title: { //标题
                type: String,
                default: ''
            },
            active: { //激活状态
                type: Boolean,
                default: false
            },
            close: { //关闭图标
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.show = this.active
        },
        data() {
            return {
                show: false
            }
        }
    }
</script>
