<template>
	<view>
		<view class="releabBox">
			<view class="releabTl">
				<text>提示：带“</text>
				<text class="text_1">*</text>
				<text>”为必填项</text>
			</view>
			<view class="releabListBox">
				<navigator class="releabList" :url="'zpbasicdata?type='+type">
					<view class="releabLitl">
						<text class="text_1">*</text>
						<text>基本信息</text>
						<text v-if="transferShopInfo.basic_info">已填</text>
					</view>
					<view>
						<uni-icon type="arrowright" color="#666666" size="22"></uni-icon>
					</view>
				</navigator>
				<navigator class="releabList" :url="'hotohop?type='+type">
					<view class="releabLitl">
						<text class="text_1">*</text>
						<text>商铺照片</text>
						<text v-if="transferShopInfo.shop_img_info">已填</text>
					</view>
					<view>
						<uni-icon type="arrowright" color="#666666" size="22"></uni-icon>
					</view>
				</navigator>
				<view class="releabtitle">
					<uni-icon type="plusempty" class="i" color="#3FABFF" size="22"></uni-icon>
					<text>加分项</text>
				</view>
				<view class="releaimaddBox">
					<view class="releaimadlt">
						<view class="releaimadcont" @click="checkSetBasicInfo('mentonsh')">
							<view class="releaimadcontimg">
								<image src="../../../static/images/zpzp_76.png" mode=""></image>
							</view>
							<view class="releaimadcontx">点评商铺</view>
						</view>
						<view class="tishisaa" v-if="transferShopInfo.review_info">已填</view>
					</view>
					<view class="releaimadzho">
						<view class="releaimadcont" @click="checkSetBasicInfo('hopsocum')">
							<view class="releaimadcontimg">
								<image src="../../../static/images/zpzp_76.png" mode=""></image>
							</view>
							<view class="releaimadcontx">商铺证照</view>
						</view>
						<view class="tishisaa" v-if="transferShopInfo.paperwork_img_info">已填</view>
					</view>
					<view class="releaimadrit">
						<view class="releaimadcont" @click="checkPostVideo">
							<view class="releaimadcontimg">
								<image src="../../../static/images/zpzp_76.png" mode=""></image>
							</view>
							<view class="releaimadcontx">商铺视频</view>
						</view>
						<view class="tishisaa" v-if="transferShopInfo.video_info">已填</view>
					</view>
				</view>
			</view>
		</view>
		<view class="potnsbBox">
			<button type="primary" @click="submitRelease">发布</button>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				transferShopInfo: {},
				type: 0
			}
		},
		components: {
			uniIcon
		},
		onLoad(e) {
			var me = this;
			me.type = e.type;
			if (me.type == 2) {
				uni.setNavigationBarTitle({
					title: '发布商铺出租'
				});
			} else if (me.type == 3) {
				uni.setNavigationBarTitle({
					title: '发布厂房写字楼出租'
				});
			}
		},
		onShow() {
			var me = this;
			me.$SysCache.put('draft_transfer_shop_info', {});
			me.getReleaseTransferShopDraft();
		},
		methods: {
			// 提交发布
			submitRelease(e) {
				var me = this;
				if (me.transferShopInfo.basic_info != true) {
					return uni.showToast({
						title: '请先把基本信息填写完整',
						icon: 'none'
					});
				}
				if (me.transferShopInfo.shop_img_info != true) {
					return uni.showToast({
						title: '请上传店铺照片',
						icon: 'none'
					});
				}
				var me = this;
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					type: 6,
					tjType: me.type
				}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						uni.navigateBack();

						return uni.showToast({
							title: '发布成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			// 获取草稿
			getReleaseTransferShopDraft() {
				uni.showLoading({
					title: '正在加载'
				});
				var me = this;
				me.$Request.get(me.$api.transferShop.getReleaseTransferShopDraft, {
					type: me.type
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.$SysCache.put('draft_transfer_shop_info', res.data);
						me.transferShopInfo = res.data;
					}
				});
			},
			checkSetBasicInfo(url) {
				var me = this;
				if (!me.transferShopInfo.basic_info && !me.transferShopInfo.shop_img_info) {
					return uni.showToast({
						title: '请先填写基本信息',
						duration: 2000,
						icon: 'none'
					});
				}
				uni.navigateTo({
					url: url + '?type=' + me.type
				})
			},
			checkPostVideo() {
				var me = this;
				if (!me.transferShopInfo.basic_info && !me.transferShopInfo.shop_img_info) {
					return uni.showToast({
						title: '请先填写基本信息',
						duration: 2000,
						icon: 'none'
					});
				}
				me.$Request.get(me.$api.transferShop.checkUploadVideoChance, {
					tjType: me.type
				}).then(res => {
					uni.hideLoading();
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
									me.checkPostVideo();
									// uni.navigateBack();
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						} else {
							uni.navigateTo({
								url: 'loavideo?type=' + me.type
							})
						}
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
