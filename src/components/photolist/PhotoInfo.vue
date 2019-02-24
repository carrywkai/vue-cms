<template>
    <div class="photo-info">
        <!-- 标题 -->
        <h3>{{ info.title }}</h3>
        <p class="sub-title">
            <span>发表时间: {{ info.add_time | dateFormat }}</span>
            <span>点击: {{ info.click }}次</span>
        </p>
        <hr>
        <!-- 图片切换展示区域 -->
        <div class="photo-box">
            <img :src="item.src" class="preview-img" v-for="(item, index) of list" :key="index" height="100" >
        </div>
        <!-- 图片详情 -->
        <div class="photo-text" v-html="info.content"></div>

        <!-- 发表评论 -->
        <comment :id="id"></comment>

    </div>
</template>
<script>
import comment from '../subComponents/Comment.vue'
export default {
    data () {
        return {
            id: this.$route.params.id, // 从上个页面跳转过来的 带来的 id
            info: [],
            list: []
        }
    },
    components: {
        comment
    },
    created () {
        this.getPhotoInfoById()
        this.getPhotoSuofang()
    },
    methods: {
        getPhotoInfoById () {
            this.$axios.get('api/getimageInfo/' + this.id).then(result => {
                // console.log(result)
                if (result.data.status === 0) { // 数据请求成功
                    this.info = result.data.message[0]
                    // console.log(this.info)
                }
            })
        },
        getPhotoSuofang () {
            this.$axios.get('api/getthumimages/' + this.id).then(result => {
                // console.log(result)
                this.list = result.data.message
                this.list.forEach(item => {
                    item.h = 400
                    item.w = 600
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.photo-info {
    padding-top: 10px;
    >h3 {
        color: skyblue;
        font-size: 13px;
        text-align: center;
    }
    .sub-title {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .photo-text {
        font-size: 14px;
        line-height: 30px;
    }
    .photo-box {
        img {
            margin: 10px;
        }
    }
}
</style>

