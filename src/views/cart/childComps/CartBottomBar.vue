<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" 
            :isChecked="isSelectAll" 
            @click.native="checkClick"></check-button>
            <span class="all">全选</span>
            <span class="total-price">合计:{{totalPrice}}</span>
            <span class="buy-product" @click="goCheck">去计算({{checkLength}})</span>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.$store.state.cartList == 0) {return false};
            return this.$store.state.cartList.every(item => item.checked)
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {
                this.$store.state.cartList.forEach(item => item.checked = false);
            } else {
                this.$store.state.cartList.forEach(item => item.checked = true);
            }
        },
        goCheck() {
            if(!this.isSelectAll ) {
                this.$toast.show('请选择商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        width: 100%;
        height: 40px;
        background-color: #eee;
        position: fixed;
        bottom: 49px;
        left: 0;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
        font-size: 14px;
        color: #888;
        line-height: 40px;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .check-button {
        position: absolute;
        line-height: 0;
        left: 10px;
        top: 10px;
    }

    .all {
        margin-left: 15px
    }

    .total-price {
        margin-left: 12px;
        font-size: 16px;
        color: #666;
    }

    .buy-product {
    background-color: var(--color-high-text);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 40px;
    float: right;
  } 
</style>