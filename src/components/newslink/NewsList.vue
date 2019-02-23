<template>
    <ul class="news-box">
        <li v-for="(item, index) of newsList" :key='index'>
            <router-link :to="'/home/newsinfo/' + item.id" class="news-detile">
                <img :src="item.img_url" alt="">
                <div class="news-content">
                    <h3>{{ item.title }}</h3>
                    <p>
                        <span>发表时间:{{ item.add_time | dateFormat }}</span>
                        <span>点击:{{ item.click }}次</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { Toast} from 'mint-ui'
export default {
    data () {
        return {
            newsList: []
        }
    },
    methods: {
        getNewsData () {
            this.$axios.get('api/getnewslist').then((result) => {
                // console.log(result)
                if (result.data.status === 0) { // 数据请求成功
                    this.newsList = result.data.message
                } else { // 数据请求失败
                    Toast('数据请求失败')
                }
                
            })
        }
    },
    created () {
        this.getNewsData()
    }
}
</script>

<style lang="less" scoped>
  .news-box {
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      >li {
          width: 100%;
          height: 80px;
          background: #fff;
          border-bottom: 1px solid #ccc;
          .news-detile {
              width: 100%;
              height: 100%;
              display: block;
              padding: 10px;
              display: flex;
              >img {
                  width: 60px;
                  height: 60px;
                  display: block;
                  margin-right: 10px;
              }
              >div {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  >h3 {
                      font-size: 14px;
                      color: #666;
                      display: inline-block;
                      height: 30px;
                      margin-bottom: 20px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      box-sizing: border-box;
                  }
                  >p {
                      display: flex;
                      justify-content: space-between;
                      color: skyblue;
                     
                  }
              }
          }
      }
  }
</style>


