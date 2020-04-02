<template>
    <swiper class="swiper-item">
        <swiper-item v-for="item in topImage">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImage: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .swiper-item{
        height: 300px;
        overflow: hidden;
    }
</style>