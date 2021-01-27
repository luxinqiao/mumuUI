<template>
    <div id='main'>
        <mu-date id='date' type='year-month-day' active='2021-10' @confirm='confirmDate'></mu-date>
    </div>
</template>

<script>
    export default {
        methods: {
            confirmDate(res) {
                console.log('confirmDate:', res)
            }
        }
    }
</script>

<style scoped lang='scss'>
    #main {
        padding: 2.4rem;
        height: 100%;
        background-color: #fff;
        >#date {
            margin-top: 2.4rem;
        }
    }
</style>