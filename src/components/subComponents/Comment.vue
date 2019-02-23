<template>
    <div class="containeer">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你的评论内容(最多BB120个字)" maxlength="120"></textarea>
        <mt-button type='primary' size='large'>发表评论</mt-button>

        <!-- 评论内容 -->
        <ul class="comment-container">
            <li v-for="(item, index) of commentList" :key="index">
                <p>
                    <span>第{{ index + 1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}</span>
                    <span>发表时间:&nbsp;&nbsp;{{ item.add_time | dateFormat }}</span>
                </p>
                <div class="comment-content">
                    {{ item.content = item.content === '' ? '该用户没有发表评论' : item.content }}
                </div>
            </li>
        </ul>

        <mt-button type='danger' size='large' plain @click="loginMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data () {
        return {
            commentList: [],
            pageindex: 1
        }
    },
    methods: {
        getComment () {
            this.$axios.get('api/getcomments/'+ this.id +'?pageindex='+ this.pageindex)
                       .then((result) => {
                            //    console.log(result)
                            if (result.data.status === 0) { // 数据请求成功
                                // console.log(this.commentList)
                                // this.commentList = result.data.message
                                // 没次获取数据的时候，都要让新数据拼接老数据

                                // 这是采用 concat 方法实现数组拼接
                                // this.commentList = this.commentList.concat(result.data.message)

                                // 才用ES6的扩展用算符来实现拼接
                                this.commentList = [...this.commentList, ...result.data.message]

                            } else { // 数据请求失败
                                Toast('评论数据请求失败')
                            }
                       })
        },
        loginMore () {
            this.pageindex ++
            this.getComment()
        }
    },
    props: ['id'],
    created () {
        this.getComment()
    }
}
</script>

<style lang="less" scoped>
 *{
     margin: 0;
     padding: 0;
 }

 .containeer {
     >h3 {
         color: deeppink;
         text-align: center;
         margin: 10px 0;
     }
     >textarea {
         margin: 10px 0;
         height: 100px;
         display: inline-block;
         padding: 10px;
     }
     .comment-container {
        width: 100%;
        >li {
            width: 100%;
            list-style: none;
            >p {
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 5px;
                background-color: #ccc;
                display: flex;
                justify-content: space-between;
            }
            .comment-content {
                font-size: 14px;
                color: #ccc;
                padding: 10px;
            }
        }
    }
 }
 
</style>


