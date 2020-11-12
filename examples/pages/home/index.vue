<template>
    <div id='main'>
        <div id='banner'>
            <mu-swiper ref='swiper' :datas='banner'></mu-swiper>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            banner: [
                require('../../img/home/banner-1.png'),
                require('../../img/home/banner-2.png'),
                require('../../img/home/banner-3.png')
            ],
            advantageHover: ''
        }
    }
}
</script>

<style scoped lang='scss'>
    #banner {
        height: 60rem;
    }
</style>