<template>
	<view>
		<uni-collapse :accordion="true">
			<view v-for="(item,index) in transferShopData" :key="index">
				<uni-collapse-item :title="(index+1)+' . '+ item.title" :show-animation="true">
					<view style="padding: 30upx;">
						{{item.content}}
					</view>
				</uni-collapse-item>
			</view>
		</uni-collapse>
		<view>
			<navigator class="navfeedLink" url="../user/zpfeedback">对我们有什么意见可以反馈喔</navigator>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				transferShopData: [],
			}
		},

		methods: {
			getTransferShopInfo(isReload) {
				let _this = this;

				_this.$Request.get(_this.$api.HelpList.getHelpList, {}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							_this.transferShopData = [];
						}
						for (let i in res.data) {
							_this.transferShopData.push(res.data[i]);
						}
					}
					uni.stopPullDownRefresh();
					// console.log(res);	
				});
			},
		},
		// 加载的时候自动执行
		onShow() {
			let _this = this;
			_this.showLoadMore = false;
			_this.getTransferShopInfo(true);
		},
	}
</script>

<style>
	.navfeedLink {
		color: #639FF7;
		padding: 30upx;
	}
</style>
