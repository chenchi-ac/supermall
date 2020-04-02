<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="@/assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
            <div v-for="(item, index) in titles" class="item-title" 
            :class="{active: currentIndex === index}" @click="itemClick(index)">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('titleClick', index)
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 13px
    }
    .item-title{
        flex: 1
    }
    .active{
        color: var(--color-high-text)
    }
    .back img{
        margin-top: 11px
    }
</style>