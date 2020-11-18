<template>
    <div id='main'>
        <mu-swiper id='banner' :datas='banners'></mu-swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            banners: [
                require('../../img/swiper/banner-1.png'),
                require('../../img/swiper/banner-2.png'),
                require('../../img/swiper/banner-3.png')
            ]
        }
    }
}
</script>

<style scoped lang='scss'>
    #banner {
        width: 80rem; height: 40rem;
    }
</style>