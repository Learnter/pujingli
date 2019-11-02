<template>
	<view>
		<view class="releabBox">
			<!-- <view class="potnqTopBox">
				<view class="potnqTopimg">
					<image src="../../../static/images/zpzp_91.png" mode=""></image>
				</view>
				<view class="potnqTopTx">
					<view class="potnqTopTxtl">选址顾问-***</view>
					<view class="potnqTopTxtltx">“完善信息，会加快选址哦，开店速度提高3倍”</view>
				</view>
			 </view> -->
			<view class="shgudelisttl">店铺视频</view>
			<template v-if="!show_src">
				<view class="vidboxa">
					<view class="uni-hello-addfile" @tap="chooseVideo">+ 添加视频</view>
				</view>
			</template>
			<template v-else>
				<view class="videBox">
					<video :src="show_src" class="video"></video>
				</view>
			</template>
			<view class="shgudelisttx">
				<view class="elisttxdf">
					<view class="text_1"></view>
					<view class="elisttttx">请拍摄店铺门头及周边情况，帮助求租者更好了解您店铺周边环境</view>
				</view>
				<view class="elisttxdf">
					<view class="text_1"></view>
					<view class="elisttttx">漂亮的内部装修也可以是您店铺的加分项</view>
				</view>
				<view class="elisttxdf">
					<view class="text_1"></view>
					<view class="elisttttx">在加上您真人出境介绍，就更完美了</view>
				</view>
				<view class="elisttxdf">
					<view class="text_1"></view>
					<view class="elisttttx">录制虚假视频将会被永久冻结账号</view>
				</view>
			</view>
			<view class="potnsbBox">
				<button type="primary" @click="submitRelease">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	let transferShopInfo = [];
	export default {
		data() {
			return {
				src: '',
				show_src: ''
			}
		},
		onLoad() {
			var me = this;
			transferShopInfo = me.$SysCache.get('draft_transfer_shop_info');
			if (transferShopInfo.video_url != undefined && transferShopInfo.video_url != '') {
				me.src = transferShopInfo.video_url;
				me.show_src = transferShopInfo.show_video_url;
			}
		},
		methods: {
			// 提交发布
			submitRelease(e) {
				// console.log(e);
				var me = this;
				if (me.src == '') {
					return uni.showToast({
						title: '请上传视频',
						duration: 2000,
						icon: 'none'
					});
				}
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					type: 5,
					video_src: me.src
				}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						if (res.data) {
							var payInfo = res.data;
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: payInfo.timeStamp,
								nonceStr: payInfo.nonceStr,
								package: payInfo.package,
								signType: payInfo.signType,
								paySign: payInfo.paySign,
								success: function(res) {
									me.submitRelease();
									// uni.navigateBack();
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						} else {
							uni.navigateBack();
							return uni.showToast({
								title: '发布成功',
								duration: 2000,
								icon: 'success'
							});
						}
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			chooseVideo: function() {
				var me = this;
				uni.chooseVideo({
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						const tempFilePath = res.tempFilePath;
						console.log(tempFilePath);
						uni.showLoading({
							title: '上传中'
						});
						me.$Request.upload(me.$api.uploadVideo, tempFilePath, 'transfer_shop_video', {
							name: 'transfer_shop_video',
							dir: 'user_transfere_shop',
						}).then(res => {
							uni.hideLoading();
							if (res.code == 200) {
								me.show_src = res.data.show_src;
								me.src = res.data.src;
							} else {
								return uni.showToast({
									icon: 'none',
									title: res.msg
								});
							}
						});
						// this.show_src = res.tempFilePath
					}
				})
			}
		}
	}
</script>

<style>
	@import url("loavideo.css");
</style>
