<template>
	<view>
		<view class="noticListBox">
			<view v-if="transferShopData.length > 0">
				<view v-for="(item,index) in transferShopData" :key="index">
					<navigator class="findconnerBox" :url="'../notice/notice_detail?id='+item.id">
						<view class="findconnerhz">
							<view class="findcerhzimgrm">
								<image :src="item.thumb" mode=""></image>
							</view>
							<view class="findconnerhztx">
								<view class="findconnencon">
									<view class="findcotil">{{item.title}}</view>
									<view class="findcotmshu">{{item.content}}</view>
									<view class="findcotime">{{item.add_time}}</view>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
			<view style="text-align: center;padding-top:150upx;" v-else>
				<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
				<view style="color:#888888;">暂无公告</view>
			</view>
		</view>
	</view>
</template>

<script>
	let page = 0,
		limit = 10,
		is_load_more = true;
	export default {
		onShareAppMessage(res) {
			return {
				title: '铺经理公告'
			}
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
				let _this = this;

				_this.$Request.get(_this.$api.NoticeList.getNoticeList, {
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
				});
			},
		},

		// 加载的时候自动执行
		onLoad() {
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
			}
		},

		// 下拉刷新执行
		onPullDownRefresh() {
			is_load_more = true;
			page = 0;
			this.loadMoreText = "加载中...";

			// this.transferShopData = [];
			this.getTransferShopInfo(true);
		}
	}
</script>

<style>
	@import url("notice_list.css");
</style>
