<template>
    <div class="goodsinfo">
        <h2>{{ info.title }}</h2>
        <hr>
        <div v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {}
        }
    },
    methods: {
        getGoodInfo () {
            this.$axios
                .get('api/goods/getdesc/' + this.$route.params.id)
                .then( result => {
                    // console.log(result)
                    if (result.data.status === 0) { // 数据请求成功
                        this.info = result.data.message[0]
                        // console.log(this.info)
                    }
                })
        }
    },
    created () {
        this.getGoodInfo()
    }
}
</script>

<style lang="less" scoped>
.goodsinfo {
    >h2 {
        font-size: 14px;
        color: skyblue;
        text-align: center;
        margin: 10px 0;
    }
    >div {
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
}

</style>


