export default {
    addCounter(state, payLoad) {
        payLoad.count++
    },
    addtoCart(state, payLoad) {
        payLoad.checked = true;
        state.cartList.push(payLoad)
    }
}