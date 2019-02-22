// 入口文件
import Vue from 'vue'
// 引入路由文件
import VueRouter from 'vue-router'

// 引入 mint-ui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入根逐渐
import app from './App.vue'
import { header,Swipe,SwipeItem } from 'mint-ui'

// 全局挂载组件
Vue.component(header.name, header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 导入路由模块
import router from './router'
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 全局使用vueRouter
Vue.use(VueRouter)



// 创建一个 vue 实例
new Vue({
    router,
    render: c => c(app)
}).$mount('#app')