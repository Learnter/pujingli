<template>
	<view>
		<div class="pardadabox">
			<div class="pardtbudimg">
				<image :src="info.img" mode=""></image>
			</div>
			<div class="datasadBox">
				<div class="datasadHe">
					<div class="datasadmc">面积范围</div>
					<div class="datasadmshu">{{info.area_min}}-{{info.area_max}}平米</div>
				</div>
				<div class="datasadHe">
					<div class="datasadmc">租金预算</div>
					<div class="datasadmshu">{{info.rent_budget}}元/天.㎡</div>
				</div>
				<div class="datasadHe">
					<div class="datasadmc">计划开店</div>
					<div class="datasadmshu">{{info.store_num}}家</div>
				</div>
			</div>
			<view class="noticdataBox">
				<view class="text-box">
					<rich-text :nodes="content" class="meorcontBox"></rich-text>
				</view>
			</view>
		</div>
		<view class="pabottomBox">
			<div class="pabottomHe">
				<div class="pabottomdata">
					<div class="pabottomdatxt">招商热线</div>
					<div class="pabottomdatxt">{{telphone}}</div>
				</div>
				<div class="pabottomimg" @click="callTelPhone">
					<image src="../../static/images/zpzp_40.png" mode="widthFix"></image>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				info: {
					area_min: '',
					area_max: '',
					rent_budget: '',
					store_num: '',
					img: ''
				},
				telphone: ''
			}
		},
		onLoad(e) {
			let _this = this,
				id = e.id,
				webConfig = _this.$SysCache.get('web_config');
			_this.telphone = webConfig.web.web_tel_phone;

			uni.showLoading({
				title: '正在加载'
			});
			_this.$Request.get(_this.$api.partner.getPartnerDetail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					_this.info = {
						img: res.data.img,
						area_min: res.data.area_min,
						area_max: res.data.area_max,
						rent_budget: res.data.rent_budget,
						store_num: res.data.store_num
					};
					_this.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
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
			// console.log(e);
		},
		methods: {
			// 拨打客服电话
			callTelPhone() {
				let _this = this;
				uni.makePhoneCall({
					phoneNumber: _this.telphone
				});
			}
		}
	}
</script>

<style>
	@import url("partner_detail.css");
</style>
