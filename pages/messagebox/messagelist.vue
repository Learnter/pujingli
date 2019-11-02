<template>
	<view>
		<view class="mesgBox" v-if="noticeList.length > 0">
			<view class="mesgListHe" v-for="(item,index) in noticeList" :key="index">
				<view class="mesgListime">{{item.send_time}}</view>
				<view class="mesgListCont">
					<view class="gListContText">
						<view v-if="item.status == 1">
							<uni-icon class="i" type="circle-filled" color="#f00000" size="18"></uni-icon>
						</view>
						<view v-else>
							<uni-icon class="i" type="checkbox-filled" color="#04BE02" size="18"></uni-icon>
						</view>
						{{item.message}}
					</view>
					<navigator class="gListchkan" :url="'message_detail?id='+item.message_id">
						<view class="gListchkantext">查看详情</view>
						<uni-icon class="i" type="arrowright" color="#888888" size="20"></uni-icon>
					</navigator>
				</view>
			</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂无消息</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	let page = 0,
		limit = 10,
		is_load_more = true;
	export default {
		data() {
			return {
				noticeList: []
			}
		},
		components: {
			uniIcon
		},
		onShow(e) {
			let _this = this;
			_this.getWebNoticeList(true);
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getWebNoticeList();
			}
		},

		// 下拉刷新执行
		onPullDownRefresh() {
			is_load_more = true;
			page = 0;

			this.getWebNoticeList(true);
		},
		methods: {
			// 加载站内信
			getWebNoticeList(isReload) {
				if (isReload) {
					is_load_more = true;
					page = 0;
				}
				let _this = this;
				uni.showLoading({
					title: '正在加载'
				});
				_this.$Request.get(_this.$api.webNotice.noticeList, {
					page: page,
					limit: limit
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						if (isReload) {
							_this.noticeList = [];
						}
						for (let i in res.data) {
							_this.noticeList.push(res.data[i]);
						}
						if (res.data.length < limit) {
							is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
				});
			}
		}

	}
</script>

<style>
	@import url("messagelist.css");
</style>
