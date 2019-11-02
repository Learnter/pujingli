<template lang="html">
	<view>
		<view class="topsbgydaBox">
			<view class="topsbgyCont">
				<view class="uni-padding-wrap uni-common-mt" >
					<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
				</view>
			</view>
		</view>
        <view class="findcontBox">
			<view v-show="current === 0">					
				<view style="text-align: center;padding-top:150upx;">
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无订单信息</view>
				</view>
			</view> 
			<view v-show="current === 1">		
				<view style="text-align: center;padding-top:150upx;">
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无订单信息</view>
				</view>
			</view>
			<view v-show="current === 2">		
				<view style="text-align: center;padding-top:150upx;">
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无订单信息</view>
				</view>
			</view> 
        </view> 
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'全部',
					'未完成'	,		
					'已完成'		
				],
				current: 0,
				activeColor: '#f00000', 
				styleType: 'text'
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
		
	}
</script>

<style>
	@import url("myorder.css");
</style>
