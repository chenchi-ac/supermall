// 引入需要的文件
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1、安装插件
Vue.use(Vuex)

// 2、创建Stroe对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    actions
})

// 3、挂载Vue实例上
export default store