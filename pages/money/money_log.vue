<template>
	<view>
		<view class="thdrlistTop">
			<view class="thdrlisttx">当前余额</view>
			<view class="thdrlistshu">{{moneyInfo.money || '0.00'}}</view>
		</view>
		<view class="yisliebBox" v-if="moneyLogList.length > 0 || is_load_more">
			<view class="thdrlist uni-flex" v-for="(item,index) in moneyLogList" :key="index">
				<view class="fx1">
					<view class="thdrlmc">{{item.type}}</view>
					<view class="thdrltime">{{item.edit_time}}</view>
				</view>
				<view class="thdrlzhsh" v-if="item.money > 0">{{item.money}}</view>
				<view class="thdrlzhshjian" v-else>{{item.money}}</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<view style="color:#888888;">暂无钱包日志</view>
		</view>

		<view class="thddbczBox">
			<view class="uni-flex thddbczhh">
				<view class="fx1 thddbtxanhz">
					<navigator url="withdraw" class="thddbtxan">我要提现</navigator>
				</view>
				<view class="fx1 thddbtxanhz">
					<navigator url="withdraw_log" class="thddbtxanjl">提现记录</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let page = 1,
		limit = 10;
	export default {
		data() {
			return {
				moneyInfo: [],
				moneyLogList: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				is_load_more: true
			}
		},
		onShow(e) {
			let _this = this;
			_this.getMoneyInfo();
			_this.getMoneyLogList(true);
		},
		onReachBottom() {
			let _this = this;
			if (_this.is_load_more) {
				page++;
				_this.showLoadMore = true;
				_this.getMoneyLogList();
			}
		},
		onPullDownRefresh() {
			let _this = this;
			_this.is_load_more = true;
			page = 1;
			_this.loadMoreText = "加载中...";
			_this.getMoneyInfo();
			_this.getMoneyLogList(true);
		},
		methods: {
			getMoneyLogList(isReload) {
				let _this = this;
				if (isReload) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					_this.is_load_more = true;
					page = 1;
				}
				_this.$Request.get(_this.$api.user.getMoneyLogList, {
					page: page,
					limit: limit
				}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							_this.moneyLogList = [];
						}
						for (let i in res.data) {
							_this.moneyLogList.push(res.data[i]);
						}
						if (res.data.length < limit) {
							_this.loadMoreText = "没有更多数据了!"
							_this.is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
				});
			},
			getMoneyInfo() {
				let _this = this;
				_this.$Request.get(_this.$api.user.getMoneyInfo).then(res => {
					if (res.code == 200) {
						_this.moneyInfo = res.data;
					}
				});
			}
		}
	}
</script>

<style>
	.thdrlistTop {
		background: #f9db8f;
		padding: 40upx 20upx;
		text-align: center;
	}

	.thdrlisttx {
		color: #666666;
		font-size: 26upx;
	}

	.thdrlistshu {
		color: #f00000;
		font-size: 40upx;
	}

	.fx1 {
		-webkit-flex: 1;
		flex: 1;
	}

	.yisliebBox {
		padding: 10upx 20upx 100upx 20upx;
	}

	.thdrlist {
		padding: 20upx 0upx;
		border-bottom: 2upx solid #f2f2f2;
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

	.thddbczBox {
		position: fixed;
		left: 0upx;
		bottom: 0upx;
		width: 100%;
		z-index: 100;
	}

	.thddbczhh {
		padding: 10upx;
		background: #ffffff;
	}

	.thddbtxanhz {
		padding: 0upx 10upx;
	}

	.thddbtxan {
		height: 80upx;
		line-height: 80upx;
		color: #ffffff;
		text-align: center;
		width: 100%;
		background: #1AAD19;
		border-radius: 8upx;
	}

	.thddbtxanjl {
		height: 80upx;
		line-height: 80upx;
		color: #ffffff;
		text-align: center;
		width: 100%;
		background: #FBA51B;
		border-radius: 8upx;
	}

	.thdrlzhshjian {
		padding-top: 20upx;
		color: #f00000;
		font-size: 30upx;
	}
</style>
