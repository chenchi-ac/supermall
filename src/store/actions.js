export default {
    addCart(context, payLoad) {
        return new Promise((resolve, reject) => {
            // 1、判断之前数组是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid);
            // 2、判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
                resolve('数量加1')
            } else {
                payLoad.count = 1;
                // context.state.cartList.push(payLoad)
                context.commit('addtoCart', payLoad)
                resolve('添加成功')
            }
        })
    }
}