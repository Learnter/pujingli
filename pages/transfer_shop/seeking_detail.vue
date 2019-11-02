<template>
	<view>
		<view class="releabBox">
			<view class="qzdaTlBox">
				<view class="qzdaTltl">{{seekingInfo.title}}</view>
				<view class="qzdaTlllci">
					<text>{{seekingInfo.add_time}}</text>
					<text>|</text>
					<text>{{seekingInfo.browse_num}}次浏览</text>
				</view>
			</view>
			<view class="qzdaConda">
				<view class="qnquCont">
					<view class="qnquConttl">求租面积：</view>
					<view class="qnquConttex_2">{{seekingInfo.area_add}}~{{seekingInfo.area_end}}㎡</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">租金预算：</view>
					<view class="qnquConttex_2">{{seekingInfo.rent_add}}~{{seekingInfo.rent_end}}元/月</view>
				</view>
				<view class="qnquCont" v-if="seekingInfo.address.twon">
					<view class="qnquConttl">优先选择：</view>
					<view class="qnquConttex_1">{{seekingInfo.address.twon}}</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">计划经营：</view>
					<view class="qnquConttex_1">{{seekingInfo.cate_name}}</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">商铺类型：</view>
					<view class="qnquConttex_1">{{seekingInfo.shop_type}}</view>
				</view>
				<view class="qnquCont">
					<view class="qnquConttl">是否接受转让费：</view>
					<view class="qnquConttex_1" v-if="seekingInfo.zr_fee == 1">接受</view>
					<view class="qnquConttex_1" v-else>不接受</view>
				</view>
			</view>
		</view>
		<view class="guideAnBox">
			<view class="guideAn" v-on:click="callPhone">

				<uni-icon class="i" type="phone" color="#ffffff" size="22"></uni-icon>
				{{seekingInfo.username}} - {{seekingInfo.mobile}}
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				seekingInfo: {
					title: '',
					browse_num: 0,
					add_time: '',
					area_add: 0,
					area_end: 0,
					rent_add: 0,
					rent_end: 0,
					address: {
						twon: ''
					},
					cate_name: '',
					shop_type: '',
					zr_fee: 2
				},
				web_tel_phone: ''
			}
		},
		components: {
			uniIcon
		},
		onLoad(e) {
			var me = this;
			var id = e.id;
			if (e.is_share) {
				me.is_share = true;
			}
			me.$Request.post(me.$api.transferShop.seekingDetail, {
				id: id,
			}).then(res => {
				if (res.code == 200) {
					me.seekingInfo = res.data;
					// console.log(res);
				} else {
					uni.showModal({
						title: '温馨提示',
						content: res.msg,
						showCancel: false,
						success: function(res) {
							uni.navigateBack();
						}
					});
				}
			});

			var webConfig = me.$SysCache.get('web_config');
			me.web_tel_phone = webConfig.web.web_tel_phone;

			// console.log(e);
		},
		methods: {
			// 拨电话给求租人
			callPhone() {
				var me = this;
				uni.showLoading({
					title: '获取信息中'
				});
				me.$Request.post(me.$api.transferShop.getSeekingMobile, {
					id: me.seekingInfo.id,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						if (res.data.mobile) {
							uni.makePhoneCall({
								phoneNumber: res.data.mobile
							});
						} else {
							var payInfo = res.data;
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: payInfo.timeStamp,
								nonceStr: payInfo.nonceStr,
								package: payInfo.package,
								signType: payInfo.signType,
								paySign: payInfo.paySign,
								success: function(res) {
									me.callPhone();
									// uni.navigateBack();
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
						// console.log(res);
					} else {
						uni.showModal({
							title: '温馨提示',
							content: res.msg,
							showCancel: false
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("seeking_detail.css");
</style>
