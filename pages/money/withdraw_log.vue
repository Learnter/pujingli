<template>
	<view>
		<view class="thdrlistHe" v-if="withdrawLogList.length > 0 || is_load_more">
			<view class="thdrlist uni-flex" v-for="(item, index) in withdrawLogList" :key="index">
				<view class="fx1">
					<view class="thdrlmc" v-if="item.status == 3" style="color: red;">{{item.status_msg}} {{item.refuse_content}}</view>
					<view class="thdrlmc" v-else-if="item.status == 2" style="color: #48B72E;">{{item.status_msg}}</view>
					<view class="thdrlmc" v-else>{{item.status_msg}}</view>
					<view class="thdrltime">{{item.ct_time}}</view>
				</view>
				<view class="thdrlzhsh">{{item.amount}}</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<view style="color:#888888;">暂无提现日志</view>
		</view>
	</view>
</template>

<script>
	let page = 1, limit = 10;
	export default {
		data() {
			return {
				withdrawLogList: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				is_load_more: true
			}
		},
		onLoad() {
			let _this = this;
			_this.getWithdrawLogList();
		},
		onReachBottom() {
			let _this = this;
			if (_this.is_load_more) {
				page++;
				_this.showLoadMore = true;
				_this.getWithdrawLogList();
			}
		},
		onPullDownRefresh() {
			let _this = this;
			_this.is_load_more = true;
			page = 1;
			_this.loadMoreText = "加载中...";
			_this.getWithdrawLogList(true);
		},
		methods: {
			getWithdrawLogList(isReload) {
				let _this = this;
				if (isReload) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					_this.is_load_more = true;
					page = 1;
				}
				_this.$Request.get(_this.$api.user.getWithdrawalLogList, {
					page: page,
					limit: limit
				}).then(res => {
					if(res.code == 200) {
						if (isReload) {
							_this.withdrawLogList = [];
						}
						for (let i in res.data) {
							_this.withdrawLogList.push(res.data[i]);
						}
						if (res.data.length < limit) {
							_this.loadMoreText = "没有更多数据了!"
							_this.is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
				});
			}
		}
	}
</script>

<style>
	.fx1 {
		-webkit-flex: 1;
		flex: 1;
	}
	.thdrlistHe {
		padding: 10upx 20upx;
	}
	.thdrlist {
		padding: 20upx 0upx;
		border-bottom:2upx solid #f2f2f2;
	}
	.thdrltime {
		color: #888888;
		font-size: 24upx;
	}
	.thdrlzhsh {
		padding-top: 20upx;
		color: #48B72E;
		font-size: 30upx;
	}
	.thdrlzhshjian {
		padding-top: 20upx;
		color: #f00000;
		font-size: 30upx;
	}
</style>
