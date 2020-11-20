<template>
    <div id='main'>
        <mu-swiper id='banner' :datas='banners' :defaultNo='defaultIndex' @bindChange='bindSwiperChange' ref='swiper'></mu-swiper>
        <div id='buttons'>
            <button @click='swiper(0)'>切换0</button>
            <button @click='swiper(1)'>切换1</button>
            <button @click='swiper(2)'>切换2</button>
        </div>
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
            ],
            defaultIndex: 1
        }
    },
    methods: {
        swiper(index) {
            this.$refs.swiper.transSwiper(index)
        },
        bindSwiperChange(swiperIndex) {
            console.log('bindSwiperChange:', swiperIndex)
        }
    }
}
</script>

<style scoped lang='scss'>
    #banner {
        width: 80rem; height: 40rem;
    }
    #buttons {
        margin-top: 10rem;
        >button {
            margin-right: 1.2rem;
        }
    }
</style>