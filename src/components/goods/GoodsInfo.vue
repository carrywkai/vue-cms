<template>
    <div class="goodsinfo">
        <!-- 加入购物车的小球动画 -->
        <transition
            @before-enter='beforeEnter'
            @enter='enter'
            @after-enter='afterEnter'
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :bannerList='goodsInfoBanner' :isfull='false'></swiper>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>市场价:&nbsp;&nbsp;&yen;<del>{{ goodsinfo.market_price }}</del> 销售价: &yen;{{ goodsinfo.sell_price }}</p>
                    <div class="buy-count">
                       <span>购买数量:</span>
                       <info-count @sendCountToParent='getCountFromChild' :max='goodsinfo.stock_quantity'></info-count>
                    </div>
                    <mt-button type='primary' size='small'>立即购买</mt-button>
                    <mt-button type='danger' size='small' @click="addBallToCart">加入购物车</mt-button>
                </div>
            </div>
        </div>

        <!-- 商品详情页面 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <span>商品货号: {{ goodsinfo.goods_no }}</span>
                    <span>商品库存: {{ goodsinfo.stock_quantity }}</span>
                    <span>上架时间: {{ goodsinfo.add_time | dateFormat }}</span>
                </div>
                <mt-button type='primary' size='large' plain @click="goodsDes(id)">图文介绍</mt-button>
                <mt-button type='danger' size='large' plain @click="goodsComment(id)">商品品论</mt-button>
            </div>
        </div>
        
    </div>
</template>

<script>
// 引用公共轮播图组件
import swiper from '../subComponents/Swiper.vue'
// 引入计数组件
import infoCount from '../subComponents/goodsinfo_numbox.vue'

export default {
    data () {
        return {
            goodsInfoBanner: [],
            id: this.$route.params.id,
            count: 0,
            goodsinfo: {},
            ballFlag: false,
            getCount: 1
        }
    },
    created () {
        this.getGoodsInfoBanner()
        this.getGoods()
    },
    methods: {
        // 获取商品轮播图的详情
        getGoodsInfoBanner () {
            this.$axios.get('api/getthumimages/' + this.id).then(result => {
                // console.log(result.data.message)
                result.data.message.forEach( item => {
                    item.img = item.src
                })
                // console.log(result.data.message)
                this.goodsInfoBanner = result.data.message
            })
        },
        getGoods () {
            this.$axios.get('api/goods/getinfo/' + this.id).then(result => {
                // console.log(result)
                if (result.data.status === 0) { // 数据请求成功
                    this.goodsinfo = result.data.message[0]
                    // console.log(this.goodsinfo)
                } 
            })
        },
        goodsDes (id) { // 通过编程式导航实现路由跳转
            this.$router.push({name: 'goodsdes', params: {id}})
        },
        goodsComment (id) {
            this.$router.push({name: 'goodscomment', params: {id}})
        },
        addBallToCart () {
            this.ballFlag = !this.ballFlag
            // el.style.transform = 'translate(96px,240px)';

            // {id: 商品id, count: 要购买的数量, price: 商品的单价, selected: false}
            // 拼接一个商品对象，保存到 store 中的 car
            var goodSingleInfo = {
                id: this.id,
                count: this.getCount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            // console.log(this.goodSingleInfo)

            // 调用vuex 中的方法
            this.$store.commit('addToCar',goodSingleInfo)
            console.log(this.$store.state.car)


        },
        beforeEnter (el) {
            el.style.transform = 'translate(0,0)'
        },
        enter (el, done) {
            el.offsetWeight;

            // 使用原生的js 方法,来获取DOM元素距离左右俩边的距离

            // 获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()

            // 获取会标在页面中的距离
            const badgePosition = document.getElementById('badge').getBoundingClientRect()

            // 获取小球相对会标的距离
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top
            // console.log(xDist, yDist)
            // console.log(`translate(${xDist}px, ${yDist}px)`)

            // el.style.transform = `translate(${xDist}px, ${xDist}px)`;
            el.style.transform = 'translate(96px,240px)';
            el.style.transition = 'all 0.5s cubic-bezier(0,.67,.93,.64)'
            done()
        },
        afterEnter (el) {
            this.ballFlag = !this.ballFlag;
        },
        getCountFromChild (index) {
            // console.log(index)
            this.getCount = index
        }

    },
    components: {
        swiper,
        infoCount
    }
}
</script>

<style lang="less" scoped>
.goodsinfo {
    background-color: #eee;
    position: relative;
    .mui-card-content-inner {
        display: flex;
        flex-direction: column;
        >span {
            color: #ccc;
            margin: 5px 0;
        }
        button {
            margin: 10px 0;
        }
    }
    .ball {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        z-index: 99;
        position: absolute;
        top: 330px;
        left: 142px;
        // transform: translate(96px,240px)
    }
}
</style>


