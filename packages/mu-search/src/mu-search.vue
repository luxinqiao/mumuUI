<template>
    <div class='mu-search'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muSearch',
        props: {
            data: { //数据源（必填）
                type: Object,
                default: {}
            }
        },
        methods: {
            /**
                刷新查询条件
                @param
                @return
             */
            refreshConditions() {
                for (let i=0; i<this.$children.length; i++) {
                    const child = this.$children[i]
                    if (child.$options._componentTag == 'mu-search-text' || child.$options._componentTag == 'mu-search-select') {
                        this.data[child.$props.field] = child.$data.value
                    }
                }
            }
        }
    }
</script>
