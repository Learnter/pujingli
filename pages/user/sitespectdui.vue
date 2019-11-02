<template>
	<view>
		<view v-if="transferShopData.length > 0">	
			<navigator class="sitesTop" :url="'../user/sitespec?id='+item.admin_id" v-for="(item,index) in transferShopData" :key="index">
				<view class="sitesimg">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view class="siteszhBox">
					<view class="siteszhmz">{{item.user_name}}</view>
					<view class="siteszzym" v-if="item.industry">
						<text class="text_1">擅长行业：</text>
						<text class="text_2">{{item.industry}}</text>
					</view>
					<view class="siteszzym">
						<text class="text_1">服务地区：</text>
						<text class="text_2">{{item.district}}</text>
					</view>
					<view class="siteszzym">
						<text class="text_1">服务人数：</text>
						<text class="text_3">{{item.service_num}}人</text>
					</view>
				</view>
			</navigator>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂无团队信息</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	let page = 0, limit = 10, is_load_more = true;
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				transferShopData: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		methods: {
			getTransferShopInfo(isReload) {
				var me = this;
				
				me.$Request.get(me.$api.selection.getDataList, {
					page:page,
					limit:limit,
				}).then(res => {
					if(res.code == 200) {
						if(isReload) {
							me.transferShopData = [];
						}
						for(var i in res.data) {
							me.transferShopData.push(res.data[i]);
						}
						
						if(res.data.length < limit) {
							me.loadMoreText = "没有更多数据了!"
							me.showLoadMore = true;
							is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
					// console.log(res);	
				});
			},
		},
		
		// 加载的时候自动执行
		onShow(){
			var me = this;
			page = 0;
			me.showLoadMore = false;
			is_load_more = true;
			me.getTransferShopInfo(true);
		},
		
		// 加载完成后执行
		onUnload() {
			var me = this;
			this.max = 0,
			this.data = [],
			// this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		// 上拉加载执行
		onReachBottom() {
			if(is_load_more) {
				var me = this;
				page++;
				this.showLoadMore = true;
				this.getTransferShopInfo();
				// console.log("onReachBottom");
			}
		},
		
		// 下拉刷新执行
		onPullDownRefresh() {
			is_load_more = true;
			page = 0;
			this.loadMoreText = "加载中...";
			
			// console.log('onPullDownRefresh');
			// this.transferShopData = [];
			this.getTransferShopInfo(true);
		}
	}
</script>

<style>
	@import url("sitespectdui.css");
</style>
