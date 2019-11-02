<template>
	<view>
		<view>
			<form @submit="submitPay">
				<view class="potnqlistBox">
					<view class="xhfuflbBox">
						<view class="xhfuflbtl">付费类别</view>
						<view class="potnqredou">
							<radio-group name="sem_type" @change="semTypeChange">
								<view class="xhfuflbtzHe">
									<view class="xhfuflbtzzz">
										<label class="uni-list-cell uni-list-cell-pd" v-if="semDayAmount > 0">
											<view>
												<radio value="1" />
											</view>
											<view>{{semDayAmount}}元/置顶一天</view>
										</label>
									</view>
									<view class="xhfuflbtzzz">
										<label class="uni-list-cell uni-list-cell-pd" v-if="semWeekAmount > 0">
											<view>
												<radio value="2" />
											</view>
											<view>{{semWeekAmount}}元/置顶一周</view>
										</label>
									</view>
								</view>
								<view class="xhfuflbtzHe">
									<view class="xhfuflbtzzz">
										<label class="uni-list-cell uni-list-cell-pd" v-if="semMonthAmount > 0">
											<view>
												<radio value="3" />
											</view>
											<view>{{semMonthAmount}}元/置顶一月</view>
										</label>
									</view>
									<view class="xhfuflbtzzz">
										<label class="uni-list-cell uni-list-cell-pd" v-if="spreadAmount > 0 && !shopInfo.is_spread">
											<view>
												<radio value="4" />
											</view>
											<view>{{spreadAmount}}元/推广至成功</view>
										</label>
									</view>
								</view>								
							</radio-group>
						</view>
					</view>
					<view class="potnqlist" :hidden="is_hidden_num">
						<view class="potnqlistl">数量</view>
						<view class="potnqlistx">
							<input class="uni-input" type="number" name='sem_num' placeholder="请填写" />
						</view>
					</view>
					<!-- <view class="potnqlist">
						<view class="potnqlistl">
							<checkbox value="" checked="true"></checkbox>
						</view>
						<view class="potnqlixze">
							<image src="../../static/images/2019_a006_38.png" mode=""></image>
							<text class="text_1">微信支付</text>
						</view>
					</view> -->
				</view>
				<view class="potnsbBox">
					<button type="primary" form-type="submit">立即支付</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	let type = 0,
		id = 0;
	export default {
		data() {
			return {
				semDayAmount: 0,
				semWeekAmount: 0,
				semMonthAmount: 0,
				spreadAmount: 0,
				is_hidden_num: true,
				shopInfo: {}
			}
		},
		onLoad(e) {
			let me = this,
				webConfig = me.$SysCache.get('web_config'),
				title = '';

			me.semWeekAmount = webConfig.web.transfer_shop_sem_week_amount,
				me.semDayAmount = webConfig.web.transfer_shop_sem_day_amount,
				me.semMonthAmount = webConfig.web.transfer_shop_sem_month_amount,
				me.spreadAmount = webConfig.web.transfer_shop_spread_amount;
			type = e.type, id = e.info_id;
			switch (e.type) {
				case '1':
					title = '推广置顶';
					break;
				default:
					title = '订单支付';
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
			me.getTransferShopDetail();
		},
		methods: {
			// 获取转铺详情
			getTransferShopDetail() {
				uni.showLoading({
					title: '正在加载'
				});
				let me = this;
				me.$Request.post(me.$api.transferShop.getPayTransferShopDetail, {
					id: id,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.shopInfo = res.data;
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
			},
			// 切换付费类型
			semTypeChange(e) {
				let me = this,
					value = e.detail.value;
				switch (value) {
					case '1':
					case '2':
					case '3':
						me.is_hidden_num = false;
						break;
					case '4':
						me.is_hidden_num = true;
						break
				}
			},
			// 提交支付
			submitPay(e) {
				let me = this,
					semType = e.detail.value.sem_type,
					semNum = e.detail.value.sem_num;
				if (semType <= 0) {
					return uni.showToast({
						title: '请选择付费类型',
						duration: 2000,
						icon: 'none'
					});
				}
				if (semType != 4 && (semNum == '' || semNum <= 0)) {
					return uni.showToast({
						title: '请输入数量',
						duration: 2000,
						icon: 'none'
					});
				}
				uni.showLoading({
					title: '提交中'
				});
				me.$Request.post(me.$api.pay.weChatPay, {
					type: type,
					semType: semType,
					semNum: semNum,
					id: id
				}).then(res => {
					uni.hideLoading();
					// console.log(res);
					if (res.code == 200) {
						let payInfo = res.data;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: payInfo.timeStamp,
							nonceStr: payInfo.nonceStr,
							package: payInfo.package,
							signType: payInfo.signType,
							paySign: payInfo.paySign,
							success: function(res) {
								uni.navigateBack();
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
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
	@import url("order_pay.css");
</style>
