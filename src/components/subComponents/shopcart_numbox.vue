<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='10' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="currentCount" ref='inputVal' @change='getInputValue' />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    props: ['currentCount', 'id'],
    data () {
        return {
            count: 1
        }
    },
    mounted () { // 初始化 计数组件
        mui('.mui-numbox').numbox()
        // console.log(this.$refs.inputVal.value)
    },
    methods: {
        getInputValue () {
            // console.log(this.$refs.inputVal.value)
            // console.log(this.id)
            // {id: 90, count: 5}
            this.$store.commit('updataShopCar', {id: this.id, count: parseInt(this.$refs.inputVal.value)})
        }
    }
}
</script>

<style lang="less" scoped>

</style>

