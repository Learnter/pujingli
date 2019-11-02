<template>
	<view>
		<view class="zpylBox">
			<!-- <image src="../../static/images/zpyl.png" mode="widthFix"></image> -->
			<image :src="imgSrc" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: ''
			}
		},
		onShow() {
			var me = this;
			var webConfig = me.$SysCache.get('web_config');
			me.imgSrc = webConfig.web.rent_a_gift_img;
		}
	}
</script>

<style>
	.zpylBox{
		width:100%;
		overflow: hidden;
	}
	.zpylBox image {
		width:100%;
	}
</style>
