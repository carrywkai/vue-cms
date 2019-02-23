<template>
  <div class="news-info-container">
      <!-- 评论大标题 -->
      <h3 class="title">{{ newsInfo.title }}</h3>
      <!-- 评论小标题 -->
      <p class="sub-title">
          <span>发表时间:{{ newsInfo.add_time | dateFormat}}</span>
          <span>点击: {{ newsInfo.click }}次</span>
      </p>
      <hr>
      <!-- 这里拿到的数据有 html 标签，需要用 v-html 来渲染 -->
      <div v-html="newsInfo.content"></div>
    
      <!-- 发表评论的公共组件 -->
      <comment :id='this.id'></comment>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import comment from '../subComponents/Comment.vue'
export default {
    data () {
        return {
            id: this.$route.params.id, // url地址通过 /id 的方式传递过来的参数 使用$route.params 来获取
            newsInfo: {}
        }
    },
    methods: {
        getNewsInfo () {
            this.$axios.get('api/getnew/' + this.id).then((result) => {
                // console.log(result)
                if (result.data.status === 0) { // 数据请求成功
                    this.newsInfo = result.data.message[0]
                    // console.log(this.newsInfo)
                } else {
                    Toast('新闻详情数据请求失败')
                }
            })
        }
    },
    created () {
        this.getNewsInfo()
    },
    components: {
        comment
    }
}
</script>

<style lang="less" scoped>
.news-info-container {
    padding: 0 5px;
    .title {
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .sub-title {
        font-size: 12px;
        color: skyblue;
        display: flex;
        justify-content: space-between;
    }
}
</style>





