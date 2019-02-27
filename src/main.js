// 入口文件
import Vue from 'vue'
// 引入路由文件
import VueRouter from 'vue-router'

// 配置 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 网页一加载 就执行main.js 中的代码，将本地存储的数据读取出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 注意 创建 vuex对象的时候字母大小写
const store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar (state, goodSingleInfo) {
            // 分析业务逻辑
            // 判断购物车中是否有传过来的商品， 如果有就将数量追加进去
            // 如果没有，就将整个商品追加到 car 数组中
            var flag = false

            state.car.some(item => {
                if (item.id === goodSingleInfo.id) { // 表示购物车中有这个商品
                    item.count += parseInt(goodSingleInfo.count)
                    flag = true
                    return false
                }
            })

            if (!flag) { // flag 为 false的时候表示 car 中没有这个商品
                state.car.push(goodSingleInfo)
            }

            // 只要购物车中的数据一更新，就立即将数据存储在 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updataShopCar (state, goodSingleInfo) { // 当购物车的数量更新的时候调用
            state.car.forEach(item => {
                if (item.id === goodSingleInfo.id) {
                    item.count = goodSingleInfo.count
                }
            })

            // 只要数据一更新，就更改本地存储的数据
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar (state, id) {
            state.car.forEach( (item, index) => {
                if (item.id === id) {
                    state.car.splice(index, 1)
                    console.log(state.car)
                    return true
                }

                localStorage.setItem('car', JSON.stringify(state.car))
            })
        },
        updataGoodsSelected (state, obj) {
            state.car.some( item => {
                if (item.id === obj.id) {
                    item.selected = obj.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // 相当于 计算属性 和 filter 属性 通过 $store.getter.*** 来调用
        getAllCount (state) {
            var c = 0;
            state.car.forEach( item => {
                c += item.count
            })

            return c
        },
        getGoodsCount (state) {
            var obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.count
            })

            return obj;
        },
        getGoodsSelected (state) {
            var obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.selected
            })

            return obj;
        },
        getGoodsCountAndPrice (state) {
            var o = {
                count: 0,
                price: 0
            }
            state.car.forEach( item => {
                if (item.selected === true) { // 表示该商品被选中
                    o.count += item.count
                    o.price += item.count * item.price
                }
            })

            return o

        }

    }
})

// 引入 mint-ui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入根逐渐
import app from './App.vue'

// ============================按需引入mint-ui组件===============================
// import { header,Swipe,SwipeItem, Button, Lazyload } from 'mint-ui'

// 全局挂载组件
// Vue.component(header.name, header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)

// 使用mint-ui 中的懒加载
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// ====================================================
// 使用 vue-preview 插件来实现 缩放图
// 插件不一样， 提供的接口不能实现
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入路由模块
import router from './router'
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 配置axios的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

// 全局使用vueRouter
Vue.use(VueRouter)

// 引用时间格式化插件 moment.js
import moment from 'moment'

// 定义全局过滤器，来格式化时间
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    // 获取当前时间
    // moment()

    return moment(dateStr).format(pattern)
})



// 创建一个 vue 实例
new Vue({
    router,
    store,
    render: c => c(app)
}).$mount('#app')