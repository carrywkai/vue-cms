<template>
    <ul class="goods-list">

        <!-- 这是通过路由的 to  属性进行路由跳转 -->
        <!-- <router-link :to="'/home/goodsinfo/' + item.id" v-for="(item, index) of goodsList" :key="index" tag='li'>
            <img :src="item.img_url" alt="">
            <h2>{{ item.title }}</h2>
            <div class="info">
                <p class="price">
                    <span class="new-price">&yen;{{item.sell_price}}</span>
                    <span class="old-price">&yen;{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 第二种实现路由跳转的方式：编程式导航 -->
        <li v-for="(item, index) of goodsList" :key="index" @click="goInfo(item.id)">
            <img :src="item.img_url" alt="">
            <h2>{{ item.title }}</h2>
            <div class="info">
                <p class="price">
                    <span class="new-price">&yen;{{item.sell_price}}</span>
                    <span class="old-price">&yen;{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </li>

        <!-- 加载更多按钮 -->
        <mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
    </ul>
</template>

<script>
export default {
    data () {
        return {
            pageindex: 1,
            goodsList: []
        }
    },
    created () {
        this.getGoods()
    },
    methods: {
        getGoods () {
            this.$axios.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                // console.log(result)
                if (result.data.status === 0) { // 请求数据成功
                    // this.goodsList = this.goodsList.concat(result.data.message)
                    this.goodsList = [...this.goodsList, ...result.data.message]
                    // console.log(this.goodsList)
                }
            })
        },
        getMore () {
            this.pageindex ++
            this.getGoods()
        },
        goInfo (id) { // 通过路由的编程式导航实现路由跳转
            console.log(this.$router)
            // 第一种的方式
            // this.$router.push('/home/goodsinfo/' + id)

            // 第二种方式
            // this.$router.push({path: '/home/goodsinfo/' + id}) 

            // 第三种方式
            this.$router.push({name: 'goodsinfo', params: {id}})
        }
    }
}
</script>

<style lang="less" scoped>
.goods-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >li {
        width: 49%;
        border: 1px solid #ccc;
        margin: 3px 0;
        >img {
            width: 100%;
            display: block;
        }
        >h2 {
            font-size: 14px;
        }
        .info {
            .price {
                .new-price {
                    color: red;
                }
                .old-price {
                    text-decoration: line-through;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>

