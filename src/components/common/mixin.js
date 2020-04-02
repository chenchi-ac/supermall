import { debounce } from "./utils"

export const itemListenerMixIn = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        // 防抖
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        // 对监听事件进行保存
        this.itemImgListener = () => { refresh() };
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}