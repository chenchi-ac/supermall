<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLenght}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list class="cart-list"></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        cartLenght() {
            return this.$store.state.cartList.length
        }
    }
}
</script>

<style scoped>
    .cart{
        height: 100vh
    }
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
    }
    .cart-list {
        position: absolute;
        top: 44px;
        bottom: 89px;
        width: 100%
    }
</style>