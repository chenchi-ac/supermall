<template>
    <div class="wrapper" ref = "wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    data() {
        return {
            scroll: null
        }
    },
    props: {
        probeType: {
            type: Number
        },
        pullingUp: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullingUp
        }),
        this.scroll.on('scroll',position => {
            this.$emit('scroll', position)
        }),
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods: {
        scrollTo(x, y, time) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        }
    }
}
</script>

<style scoped>
    .content{
        overflow: hidden;
    }
</style>