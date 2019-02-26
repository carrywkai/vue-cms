<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 子组件 向 父组件传值 -->
        <!-- 通过 change事件来监听 input框里面值得改变 -->
        <input id="test" class="mui-input-numbox" type="number" value="1" ref='inputVal' @change="getCount" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data () {
        return {
            count: 1
        }
    },
    props: ['max'], // 父组件向子组件传值，用 props接受后，直接在子组件中 用 this. 调用
    mounted () { // 初始化 计数组件
        mui('.mui-numbox').numbox()
        // console.log(this.$refs.inputVal.value)
    },
    methods: {
        getCount () { // 通过 input 框中的 change 事件来监听值得变化
            // console.log(this.$refs.inputVal.value)
            this.count = parseInt(this.$refs.inputVal.value)

            // 子组件向父组件传值
            this.$emit('sendCountToParent', this.count)
        }
    },
    watch: { // 由于子组件向父组件传递过来的值是 ajax 异步获取的，所以不能直接接受， 通过 watch 来监听
        max: function (newVal, oldVal) {
            mui('.mui-numbox').numbox().setOption('max',newVal)
            // console.log(this.max)
        }
    }
}
</script>

<style lang="less" scoped>

</style>

