<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) of bannerList" :key="index">
            <img :src="item.img" alt="" :class="{full: isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props: ['bannerList', 'isfull']
}
</script>

<style lang="less" scoped>
.full {
    width: 100%;
}
.mint-swipe {
       height: 200px;
       .mint-swipe-items-wrap {
         width: 100%;
         height: 100%;
         .mint-swipe-item {
             width: 100%;
             height: 100%;
             >img {
                // width: 100%;
                height: 100%;
                display: block;
            }
         }
          
       }
   }
</style>


