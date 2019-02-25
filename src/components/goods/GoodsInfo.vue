<template>
    <div class="goodsinfo">
        <!-- 轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :bannerList='goodsInfoBanner'></swiper>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

        <!-- 商品详情页面 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Posted on January 18, 2016</p>
                    <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">Read more</a>
            </div>
        </div>
        
    </div>
</template>

<script>
// 引用公共轮播图组件
import swiper from '../subComponents/Swiper.vue'

export default {
    data () {
        return {
            goodsInfoBanner: [],
            id: this.$route.params.id
        }
    },
    created () {
        this.getGoodsInfoBanner()
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
        }
    },
    components: {
        swiper
    }
}
</script>

<style lang="less" scoped>
.goodsinfo {
    background-color: #eee;
}
</style>


