<template>
    <div style="background-color: #fff">
        <!-- 轮播图 -->
        <swiper :bannerList='bannerList' :isfull='true'></swiper>
        
        <!-- 九宫格布局 -->
        <ul class="grid-box">
            <li>
                <router-link to="/home/newslist" class="link">
                    <img src="../../images/menu1.png" alt="">
                    <span>新闻资讯</span>
                </router-link>
            </li>
             <li>
                <router-link to="/home/photolist" class="link">
                    <img src="../../images/menu2.png" alt="">
                    <span>图片分享</span>
                </router-link>
            </li>
             <li>
                <router-link to="/home/goodslist" class="link">
                    <img src="../../images/menu3.png" alt="">
                    <span>商品购买</span>
                </router-link>
            </li>
             <li>
                <a href="#" class="link">
                    <img src="../../images/menu4.png" alt="">
                    <span>留言反馈</span>
                </a>
            </li>
             <li>
                <a href="#" class="link">
                    <img src="../../images/menu5.png" alt="">
                    <span>视屏专区</span>
                </a>
            </li>
             <li>
                <a href="#" class="link">
                    <img src="../../images/menu6.png" alt="">
                    <span>联系我们</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from '../subComponents/Swiper.vue'

export default {
    data () {
        return {
            bannerList: []
        }
    },
    methods: {
        getBannerData () {
            this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo').then(response => {
                if (response.data.status == 0) {
                    this.bannerList = response.data.message
                    // console.log(this.bannerList)
                    // Toast('请求数据成功')
                } else {
                    Toast('请求数据失败')
                }
            })
        }
    },
    created () {
        this.getBannerData()
    },
    components: {
        swiper
    }
}
</script>

<style lang="less" scoped>
   
   .grid-box {
       width: 100%;
       height: 200px;
       margin: 0;
       padding: 0;
       display: flex;
       flex-wrap: wrap;
       >li {
           list-style: none;
           width: 33.33%;
           text-align: center;
           .link {
               width: 100%;
               height: 100%;
               display: block;
               img {
               width: 60px;
               height: 60px;
               display: block;
               margin: 5px auto;
                }
              span {
                    font-size: 12px;
                }
           }
       }
   }
</style>


