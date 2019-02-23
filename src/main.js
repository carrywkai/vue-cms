// 入口文件
import Vue from 'vue'
// 引入路由文件
import VueRouter from 'vue-router'

// 引入 mint-ui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入根逐渐
import app from './App.vue'
import { header,Swipe,SwipeItem, Button } from 'mint-ui'

// 全局挂载组件
Vue.component(header.name, header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

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
    render: c => c(app)
}).$mount('#app')