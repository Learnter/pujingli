<template>
	<view>
		<view class="noticListBox">
			<view v-if="transferShopData.length > 0">
				<view class="coopeListBoxbb" @click="clickNavigate('partner_detail?id='+item.id)" v-for="(item,index) in transferShopData"
				 :key="index">
					<view class="coopeList">
						<view class="coopeTlile">
							<view class="coopeTlimg">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="coopeTltl">{{item.name}}</view>
						</view>
						<view class="coopeTxBox">
							<view class="coopeTxt">
								<text class="text_1">面积范围：</text><text class="text_2">{{item.area_min}}-{{item.area_max}}平米</text>
							</view>
							<view class="coopeTxt">
								<text class="text_1">租金预算：</text><text class="text_2">{{item.rent_budget}}元/天.㎡</text>
							</view>
							<view class="coopeTxt">
								<text class="text_1">计划开店：</text><text class="text_2">{{item.store_num}}家</text>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
			<view style="text-align: center;padding-top:150upx;" v-else>
				<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
				<view style="color:#888888;">暂无合作商信息</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	let page = 0,
		limit = 10,
		is_load_more = true;
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
			clickNavigate: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			getTransferShopInfo(isReload) {
				let _this = this;

				_this.$Request.get(_this.$api.partner.getPartnerList, {
					page: page,
					limit: limit,
				}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							_this.transferShopData = [];
						}
						for (let i in res.data) {
							_this.transferShopData.push(res.data[i]);
						}

						if (res.data.length < limit) {
							_this.loadMoreText = "没有更多数据了!"
							_this.showLoadMore = true;
							is_load_more = false;
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
			page = 0;
			_this.showLoadMore = false;
			is_load_more = true;
			_this.getTransferShopInfo(true);
		},

		// 加载完成后执行
		onUnload() {
			this.max = 0,
				this.data = [],
				// this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		// 上拉加载执行
		onReachBottom() {
			if (is_load_more) {
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
	@import url("partner_list.css");
</style>
