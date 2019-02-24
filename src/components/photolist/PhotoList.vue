<template>
    <div class="photo-container">
        <!-- 顶部滑动导航组件 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 当绑定多个类的时候，可以使用数组来存储多个类 -->
                    <a 
                        :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']" 
                        v-for="item of category" :key="item.id"
                        @click='getAllPhotoById(item.id)'
                    >
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <!-- 图片展示区域，使用mint-ui 中的 lazy-loading -->
        <ul class="photo-container">
            <!-- 在使用 router-link 的时候，默认渲染为 a 标签, 通过 tag 属性来指定渲染为 li 标签 -->
            <router-link :to="'/home/photolist/' + item.id" v-for="item in list" :key='item.id' tag='li'>
                <img v-lazy="item.img_url">
                <!-- 图片说明 -->
                <div class="photo-text">
                    <div class="photo-title">
                        {{ item.title }}
                    </div>
                    <div class="photo-body">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
// 引用了mui组件，还的进行初始化
// 出现的坑：在使用mui组件初始化的时候，要移除严格模式
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data () {
        return {
            category: [],
            list: []
        }
    },
    created () {
        this.getAllCategory()
        this.getAllPhotoById(0)
    },
    mounted () { // 这个时候页面中的 DOM 是最新的
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getAllCategory () { // 获取所有的分类
            this.$axios.get('api/getimgcategory').then((result) => {
                // console.log(result.data)
                if (result.data.status === 0) { // 数据请求成功
                    this.category = result.data.message
                    // 获取到的数据没有全部这一项，要手动的加上去
                    this.category.unshift({title: '全部', id: 0})
                }
                // console.log(this.category)
            })
        },
        getAllPhotoById (cateid) {
            this.$axios.get('api/getimages/' + cateid).then(result => {
                // console.log(result)
                if (result.data.status === 0) { // 数据请求成功
                    this.list = result.data.message
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
* {
    touch-action: pan-y;
}

.photo-container {
    list-style: none;
    padding: 0 5px;
    margin: 0;
    li {
        width: 100%;
        background-color: #ccc;
        margin-bottom: 5px;
        text-align: center;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .photo-text{
            position: absolute;
            bottom: 0;
            text-align: left;
            color: #ccc;
            background-color: rgba(0, 0, 0, 0.4);
            .photo-title {
                font-size: 14px;
            }
            .photo-body {
                font-size: 13px;
            }
        }
    }
}

img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>


