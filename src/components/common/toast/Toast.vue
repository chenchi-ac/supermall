<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    // props: {
    //     message: {
    //         type: String,
    //         default: ''
    //     },
    //     isShow: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message='', duration=2000) {
            this.message = message;
            this.isShow = true;

            setTimeout(() => {
                this.isShow = false;
                this.message = ''
            }, duration)
        }
    }
}
</script>

<style scoped>
    .toast{
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 5px 10px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: 10px
    }
</style>