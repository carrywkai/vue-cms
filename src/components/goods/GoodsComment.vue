<template>
    <info-comment :id='id'></info-comment>
</template>

<script>
import infoComment from '../subComponents/Comment.vue'

export default {
    data () {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        infoComment
    }
}
</script>

<style lang="less" scoped>

</style>


