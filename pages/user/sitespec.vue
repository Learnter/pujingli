<template>
	<view>
		<view class="sitesTBox">
			<view class="sitesTop">
				<image src="../../static/images/zpzp_120.png" mode="widthFix"></image>
			</view>
			<view class="sitesdataBox">
				<view class="sitesdatatop">
					<view class="sitesimg">
						<image :src="info.avatar"></image>
					</view>
					<view class="siteszhBox">
						<view class="siteszhmz">{{info.user_name}}</view>
						<view class="siteszhdianh">{{info.mobile}}</view>
						<!-- <view class="siteszzym">
							<text class="text_1">座右铭：</text>
							<text class="text_2">{{info.motto}}</text>
						</view> -->
					</view>
				</view>
				<view class="sitshujuBox">
					<view class="sitshujufx">
						<view class="sitshujutx">服务人数</view>
						<view class="sitshushu">{{info.service_num}}</view>
					</view>
					<view class="sitshujufx">
						<view class="sitshujutx">服务案例</view>
						<view class="sitshushu">{{info.service_case_num}}</view>
					</view>
					<view class="sitshujufx">
						<view class="sitshujutx">推荐资源</view>
						<view class="sitshushu">{{info.tj_resources_num}}</view>
					</view>
				</view>
				<view class="sitjindutBox">
					<view class="sitjindutHe">
						<view class="sitjinhex">
							<view class="sitjinhexzi" :style="'width:'+percentage+'%;'"></view>
						</view>
						<view class="sitjinheshuj">{{percentage}}%</view>
					</view>
					<view class="sitjindtext">
						<text class="text_1">成交/服务</text>
						<text class="text_1">{{info.service_case_num}}/{{info.service_num}}</text>
					</view>
				</view>

			</view>
			<view class="sitesMidBox">
				<view class="sitesMidtl">个人服务能力</view>
				<view class="qnquCont">
					<view class="qnquConttl">现有推荐铺源：</view>
					<view class="qnquConttex_1"><text class="text_1">{{info.tj_resources_num}}</text> 家</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">服务成功案例：</view>
					<view class="qnquConttex_1"><text class="text_1">{{info.service_case_num}}</text> 家</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">平均服务时间：</view>
					<view class="qnquConttex_1"><text class="text_1">{{info.service_hours}}</text> 天</view>
				</view>
				<!-- <view class="qnquCont">
					<view class="qnquConttl">擅长行业：</view>
					<view class="qnquConttex_1">{{info.industry}}</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">服务人数：</view>
					<view class="qnquConttex_1"><text class="text_1">{{info.service_num}}</text> 人</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">负责区域：</view>
					<view class="qnquConttex_1">{{info.district}}</view>
				</view> -->
			</view>
		</view>
		<view class="sitesbottomBox">
			<view class="sitesbottom">
				<view class="sitesbottomtx">{{info.user_name}}</view>
				<view class="sitesbottomtx">{{info.mobile}}</view>
			</view>
			<view class="sitesbottomimg" v-if="info.mobile">
				<image src="../../static/images/zpzp_40.png" mode="" v-on:click="callPhone"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					user_name: '',
					avatar: '',
					industry: '',
					service_num: '',
					district: '',
					motto: '',
					video_url: '',
					mobile: ''
				},
				currentNetworkType: '',
				percentage: 0
			}
		},
		onLoad(e) {
			var me = this;
			var id = e.id;
			if (e.is_share) {
				me.is_share = true;
			}

			uni.showLoading({
				title: '正在加载'
			});
			me.$Request.post(me.$api.selection.selectionDetail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					me.info = res.data;

					me.percentage = (me.info.service_case_num / me.info.service_num * 100).toFixed(2);
				}
			});
			uni.getNetworkType({
				success(res) {
					me.currentNetworkType = res.networkType;
				}
			});
			uni.onNetworkStatusChange(function(res) {
				me.currentNetworkType = res.networkType;
				me.checkNetworkPlayVideo();
			});
		},
		mounted() {
			this.videoCtx = uni.createVideoContext('shop_video')
		},
		methods: {
			// 视频播放
			videoPlay(event) {
				var me = this;
				me.videoIsPlay = true;
				me.checkNetworkPlayVideo();
			},
			checkNetworkPlayVideo() {
				var me = this;
				if (me.videoIsPlay) {
					var all_data_flow_play_video = me.$SysCache.get('all_data_flow_play_video');
					if ((me.currentNetworkType == '2g' || me.currentNetworkType == '3g' || me.currentNetworkType == '4g') &&
						all_data_flow_play_video == false) {
						me.videoCtx.pause();
						uni.showModal({
							title: '温馨提示',
							content: '当前处于数据流量，是否继续播放',
							success(res) {
								if (res.confirm === true) {
									me.videoCtx.play();
									me.$SysCache.put('all_data_flow_play_video', true);
								}
							}
						})
					}
				}
			},
			// 视频暂停
			videoPause(event) {
				var me = this;
				me.playButtonIsShow = true;
				me.pauseButtonIsShow = false;
				me.videoIsPlay = false;
				uni.showToast({
					title: '暂停播放',
					icon: 'none'
				});
			},
			// 视频播放完成
			videoEnded(event) {
				var me = this;
				me.playButtonIsShow = true;
				me.pauseButtonIsShow = false;
				me.videoIsPlay = false;
				uni.showToast({
					title: '播放结束',
					icon: 'none'
				});
			},
			// 播放视频
			play(event) {
				// if(this.videoCtx) {
				this.videoCtx.play();
				// 	uni.showToast({
				// 	    title: '开始播放',
				// 	    icon: 'none'
				// 	});
				// }
			},
			// 暂停视频
			pause(event) {
				// if(this.videoCtx) {
				this.videoCtx.pause();
				// 	uni.showToast({
				// 		title: '暂停播放',
				// 		icon: 'none'
				// 	});
				// }
			},
			// 轮播图 s
			change(e) {
				this.current = e.detail.current;
				if (this.shopImg[this.current].show_type == 'video') {
					this.navIsShow = false;
				} else {
					this.navIsShow = true;
				}
				this.pause();
			},
			// 预览图片
			preivewImage(currentUrl) {
				var me = this;
				var urls = [];
				for (var i in me.shopImg) {
					if (me.shopImg[i].show_type == 'image') {
						urls.push(me.shopImg[i].img_url);
					}
				}
				uni.previewImage({
					current: currentUrl,
					indicator: 'number',
					urls: urls
				});
			},
			// 拨电话给平台客服
			callPhone() {
				var me = this;
				uni.makePhoneCall({
					phoneNumber: me.info.mobile
				});
			}
		}
	}
</script>

<style>
	@import url("sitespec.css");
</style>
