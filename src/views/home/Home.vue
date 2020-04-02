<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control"
            @tabClick="tabClick" ref="tabControl1" v-show="isTabShow">
        </tab-control>
        <scroll class="content" 
        ref="scroll"
        :probe-type="3"
        @scroll="scroll"
        :pulling-up="true"
        @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']"
            @tabClick="tabClick" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
// import {debounce} from 'common/utils'
import {itemListenerMixIn} from 'common/mixin'

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    mixins: [itemListenerMixIn],
    data() {
        return{
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            taboffsetTop: 0,
            isTabShow: false,
            saveY: 0,
        }
    },
    created() {
        // 1、请求多个数据
        this.getHomeMultidata()
        //2、请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    mounted() {
        
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        this.$refs.scroll.refresh();
    },
    deactivated() {
        // 1、保存Y值
        this.saveY = this.$refs.scroll.scroll.y;
        // 2、取消全局监听事件
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
        // 事件监听方法
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0,400)
        },
        scroll(position) {
            // 1、判断backTop是否显示
            this.isShowBackTop = (-position.y) > 1000
            // 2、决定tabControl是否吸顶
            this.isTabShow = (-position.y) > this.taboffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
            this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
        },

        // 网络请求方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                // console.log(res.data);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
                this.$refs.scroll.finishPullUp()
            })
        }
    }
}
</script>

<style scoped>
    #home{
        /* margin-top: 44px; */
        /* 视口 */
        height: 100vh;
        position: relative
    }

    .home-nav {
        /* 原生滚动 */
        /* position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index: 10; */

        background-color: var(--color-tint);
        color: #fff
    }
    .content{
        /* height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px */
        position: absolute;
        top: 44px;
        bottom: 49px;
    }
    .tab-control{
        position: relative;
        z-index: 9
    }
</style>