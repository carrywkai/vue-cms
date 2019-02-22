import VueRouter from 'vue-router'

// 引入路由模块
import HomeContainer from './components/tabBar/HomeContainer.vue'
import MemberContainer from './components/tabBar/MemberContainer.vue'
import ShopcarContainer from './components/tabBar/ShopcarContainer.vue'
import SearchContainer from './components/tabBar/SearchContainer.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
   {path: '/', redirect: '/home'}, // 利用路由重定向，来实现请求根路径展示首页
   {path: '/home', component: HomeContainer},
   {path: '/member', component: MemberContainer},
   {path: '/shopcar', component: ShopcarContainer},
   {path: '/search', component: SearchContainer}
  ],
  linkActiveClass: 'mui-active',
  mode: 'history'
})

// 把路由对象暴露出去
export default router