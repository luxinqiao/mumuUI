<template>
    <div class='mu-buttons'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'muButtons'
    }
</script>

<style scoped lang='scss'>
    .mu-buttons {
        padding: 1rem 2rem;
        height: 5rem;
        background-color: #fff;
    }
</style>
