<template>
	<view>
		<view class="fabuTopBox">
			<view class="fabuToptl">店铺转租服务流程：</view>
			<image src="../../static/images/zpzp_74.png" mode=""></image>
		</view>
		<view class="fabuCOntBox">
			<view class="fabuCOnt">
				<view class="fabuCOntziji" @click="goreleabto('/pages/user/postnqury')">
					<view class="fabuCOntlt">
						<image src="../../static/images/zpzp_70.png" mode=""></image>
					</view>
					<view class="fabuCOntrttl">发布找店</view>
					<view class="fabuCOntrttx">万千在线商铺任你挑选</view>
				</view>
				<view class="fabuCOntziji" @click="goreleabto('/pages/transfer_shop/release_transfer_shop/index')">
					<view class="fabuCOntlt">
						<image src="../../static/images/zpzp_83.png" mode=""></image>
					</view>
					<view class="fabuCOntrt">
						<view class="fabuCOntrttl">发布转店</view>
						<view class="fabuCOntrttx">平均30天转出商铺</view>
					</view>
				</view>
			</view>

			<view class="fabuCOnt">
				<view class="fabuCOntziji" @click="goreleabto('/pages/rent/release_rent/index?type=2')">
					<view class="fabuCOntlt">
						<image src="../../static/images/zpzp_127.png" mode=""></image>
					</view>
					<view class="fabuCOntrt">
						<view class="fabuCOntrttl">商铺出租</view>
						<view class="fabuCOntrttx">平均30天租出商铺</view>
					</view>
				</view>
				<view class="fabuCOntziji" @click="goreleabto('/pages/rent/release_rent/index?type=3')">
					<view class="fabuCOntlt">
						<image src="../../static/images/zpzp_126.png" mode=""></image>
					</view>
					<view class="fabuCOntrt">
						<view class="fabuCOntrttl">厂房写字楼出租</view>
						<view class="fabuCOntrttx">平均30天租出厂房</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let userIsLogin = false;
	export default {
		methods: {
			onShow() {
				let _this = this,
					userInfo = _this.$SysCache.get('app_user_info');
				if (userInfo != null && userInfo != '' && userInfo != undefined) {
					userIsLogin = true;
				} else {
					userIsLogin = false;
				}
			},
			// 页面跳转
			goreleabto(url) {
				if (userIsLogin) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: '../login/login'
					});
				}
				return false;
			}
		}
	}
</script>

<style>
	@import url("find.css");
</style>
