<template>
	<view>		
		<view class="fenxAn">
			<button open-type="share">
				<uni-icon class="i" type="redo" color="#FDE7CC" size="22"></uni-icon>立即分享			
			</button>
		</view>
		<view class="fxylBox">
			<image :src="imgSrc" mode="widthFix"></image>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				imgSrc: ''
			}
		},
		components: {		
			uniIcon
		},
		onShow() {
			var me = this;
			var webConfig = me.$SysCache.get('web_config');
			me.imgSrc = webConfig.web.share_a_gift_img;
		}
	}
</script>

<style>
	.fxylBox{
		width:100%;
		overflow: hidden;
	}
	.fxylBox image {
		width:100%;
	}
	.fenxAn {
		position: fixed;
		left:0px;
		top:40upx;
		width:100%;
		z-index: 100;
		text-align: right;
	}
	.fenxAn button {
		display: inline-block;
		padding:0upx 40upx;
		margin: 0upx 40upx;
		height:60upx;
		line-height: 60upx;
		font-size: 26upx;
		color:#FDE7CC;
		border-color: #FDE7CC;
		background: none;
	}
	.fenxAn button::after {
		border-color: #FDE7CC;
	}
	
</style>
