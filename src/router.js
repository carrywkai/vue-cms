import VueRouter from 'vue-router'

// 引入路由模块
import HomeContainer from './components/tabBar/HomeContainer.vue'
import MemberContainer from './components/tabBar/MemberContainer.vue'
import ShopcarContainer from './components/tabBar/ShopcarContainer.vue'
import SearchContainer from './components/tabBar/SearchContainer.vue'
import NewsList from './components/newslink/NewsList.vue'
import NewsInfo from './components/newslink/NewsInfo.vue'
import PhotoList from './components/photolist/PhotoList.vue'
import PhotoInfo from './components/photolist/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
   {path: '/', redirect: '/home'}, // 利用路由重定向，来实现请求根路径展示首页
   {path: '/home', component: HomeContainer},
   {path: '/member', component: MemberContainer},
   {path: '/shopcar', component: ShopcarContainer},
   {path: '/search', component: SearchContainer},
   {path: '/home/newslist', component: NewsList},
   {path: '/home/newsinfo/:id', component: NewsInfo},
   {path: '/home/photolist', component: PhotoList},
   {path: '/home/photolist/:id', component: PhotoInfo},
   {path: '/home/goodslist', component: GoodsList}
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router