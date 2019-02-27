<template>
    <div class="shopcart-container">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-for="(item, index) of shopcarlist" :key="item.id">
                    <!-- 选择按钮 -->
                    <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change='setGoodsSelected(item.id, $store.getters.getGoodsSelected[item.id])'
                    >
                    </mt-switch>
                    <!-- 商品图片 -->
                    <img :src="item.thumb_path" alt="">
                    <!-- 商品信息 -->
                    <div class="product-info">
                        <h3>{{ item.title }}</h3>
                        <p>
                            <span class="sell_price">&yen;{{ item.sell_price }}</span>
                            <shop-car :currentCount='$store.getters.getGoodsCount[item.id]' :id='item.id'></shop-car>
                            <span class="del" @click='remove(item.id,index)'>删除</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <div class="checkpout">
                       <div class="left">
                           <p>总计(不含运费)</p>
                           <p>
                               勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndPrice.count }}</span>件, 
                               总价: <span class="red">{{  $store.getters.getGoodsCountAndPrice.price }}</span>元
                            </p>
                       </div>
                       <mt-button type='danger' size='small'>立即购买</mt-button>
                   </div>
                </div>
            </div>
        </div>

        <!-- 测试代码 -->
        <p>{{ $store.getters.getGoodsSelected }}</p>

    </div>
</template>

<script>
import shopCar from '../subComponents/shopcart_numbox.vue'
export default {
    data () {
        return {
            shopcarlist: [],
            selectedCount: 0,
            allPrice: 0
        }
    },
    created () {
        this.getShopCarData()
        this.setGoodsSelected()
    },
    methods: {
        getShopCarData () {

            var idArr = []
            this.$store.state.car.forEach(item => {
                idArr.push(item.id)
            });

            // 当idArr 为空数组时，发送请求会失败
            if (idArr.length <= 0) return 

            // 后端的接口需要传递多个id, 以逗号的形式进行分割
            this.$axios
                .get('api/goods/getshopcarlist/' + idArr.join(','))
                .then( result => {
                    // console.log(result)
                    if (result.data.status === 0) { // 数据请求成功
                        this.shopcarlist = result.data.message
                        
                        // 得到的数据中没有count值,通过获取本地存储
                        var arr = JSON.parse(localStorage.getItem('car'))
                        arr.forEach(item => {
                            this.shopcarlist.some( e => {
                                e.count = item.count
                                return
                            })
                        })
                    }
                }) 

        },
        remove (id, index) {
            // index 是用来删除本地的数据，id 是用来删除 vuex 中的 state中的数据
            this.shopcarlist.splice(index, 1)

            this.$store.commit('removeFromCar', id)

        },
        setGoodsSelected (id, val) {
            // console.log(id,val)
            var o = {}
            o.id = id
            o.selected = val
            this.$store.commit('updataGoodsSelected', o)
        }
    },
    components: {
        shopCar
    }
    
}
</script>

<style lang="less" scoped>
.shopcart-container {
    background-color: #eee;
    overflow: hidden;
    .mui-card-content-inner {
        display: flex;
        align-items: center;
        >img {
            width: 60px;
            height: 60px;
            vertical-align: middle;
        }
        .product-info {
            >h3 {
                font-size: 13px;
            }
            >p {
                .sell_price {
                    color: red;
                }                
                .del {
                    color: skyblue;
                }
            }
        }
    }
    .checkpout {
        display: flex;
        flex-direction: column;
        .red {
            color: red;
        }
    }
}
</style>