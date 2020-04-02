<template>
    <div id="detail">
        <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
            <detail-swiper :topImage="topImage"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="list"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import Scroll from 'common/scroll/Scroll'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {itemListenerMixIn} from 'common/mixin'

export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImage: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            currentIndex: 0,
            isShowBackTop: false,
        }
    },
    mixins: [itemListenerMixIn],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll,
        BackTop
    },
    created() {
        // 1、保存传入的iid
        this.iid = this.$route.params.iid;
        // 2、根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // 1、获取顶部图片数据
            this.topImage = res.result.itemInfo.topImages;
            // 2、获取商品信息数据
            this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
            // 3、获取店铺数据
            this.shop = new Shop(res.result.shopInfo);
            // 4、获取商品详情信息数据
            this.detailInfo = res.result.detailInfo;
            // 5、获取参数信息
            this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
            // 6、获取评论信息
            if(res.result.rate.cRate !== 0) {
                this.commentInfo = res.result.rate.list[0]
            }
        }),
        getRecommend().then(res => {
            // 7、获取推荐数据
            this.recommends = res.data.list
        })
    },
    mounted() {
        
    },
    destroyed() {
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh();

            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.list.$el.offsetTop);
            // 多添加一个值便于scroll判断高度
            this.themeTopYs.push(Number.MAX_VALUE);
        },
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        scroll(position) {
            const positionY = -position.y;
            let length = this.themeTopYs.length;
            for(let i = 0; i < length - 1; i++) {
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] 
                && positionY < this.themeTopYs[i + 1])) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            
                // for(let i = 0; i < length; i++) {    
                // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] 
                // && positionY < this.themeTopYs[i + 1]) ||(i === length - 1 && 
                // positionY >= this.themeTopYs[i]))) {
                //     this.currentIndex = i;
                //     this.$refs.nav.currentIndex = this.currentIndex
                // }
            }
            // 判断backTop是否显示
            this.isShowBackTop = (-position.y) > 1000
        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0,400)
        },
        addToCart() {
            const product = {};
            // 1、后去购物车所需展示的信息
            product.image = this.topImage[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            // 2、将商品添加到购物车
            this.$store.dispatch('addCart', product).then(res => {
                this.$toast.show(res, 2000);
            })
        }
    }
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        background-color: #fff;
        height: calc(100% - 44px - 49px);
    }
</style>