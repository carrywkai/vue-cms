<template>
   <div class="app-container">
     <!-- 顶部 -->
     <mt-header fixed title="凯神社区">
			 <a href="javascript:;" slot="left" @click.prevent="goBack" v-show="flag">
					<mt-button icon="back">返回</mt-button>
			 </a>
		 </mt-header>

     <!-- 中间路由区域 -->
		 <!-- 给路由切换，添加动画 -->
		 <transition>
     		<router-view></router-view>
		 </transition>

     <!-- 顶部导航 -->
     <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-carry" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-carry" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-carry" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-carry" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

   </div>
</template>

<script>
export default {
  data () {
		return {
				flag: false
		}
	},
	created () {
		this.flag = this.$route.path === '/home' ? false : true;
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	},
	watch: {
		'$route.path': function (newVal) {
			if (newVal === '/home') { // 监听路由地址的改变
				this.flag = false
			} else {
				this.flag = true
			}
		}
	}
}
</script>

<style lang="less" scoped>
	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute; // 离开的时候，让他脱标，解决动画先下在上的情况
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease;
	}

  .app-container {
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
  }

  // mui tabbar 样式类名重复的问题，导师导航栏无法切换，通过修改类名来修改
 .mui-bar-tab .mui-tab-item-carry.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-carry {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-carry .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-carry .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>



