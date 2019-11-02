<template>
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
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">50</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">100</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">200</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">300</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">500</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
			</view>	
			<view v-show="current === 1">			
				<!-- 没有数据时  s -->
				<div class="zanwudata">
					<image src="../../static/images/zpzp_95.png" mode="widthFix"></image>
					<div class="zanwudatatx">暂无数据</div>
				</div>	
				<!-- 没有数据时  e -->
			</view>	
			<view v-show="current === 2">
				<div class="myrelistBox">
					<div class="myrelisttxian"></div>
					<div class="myrelistData">
						<div class="myrelistDatazi">
							<div class="myrelistshu">
								<text class="text_1">￥</text>
								<text class="text_2">50</text>
							</div>
							<div class="listDacont">
								<div class="listDacbti">
									<div class="listDacbtitx">抵用券</div>
									<div class="listDacbttime">有效期至：2019-08-12</div>
								</div>
								<div class="listDacbti">
									<div class="listDacbtitx">体验抵扣红包</div>
									<!-- <div class="listDacbqshy">去使用<uni-icon class="i" type="arrowright" color="#C49514" size="20"></uni-icon></div> -->
									<div class="listDacbqshy_1">已过期<uni-icon class="i" type="arrowright" color="#999999" size="20"></uni-icon></div>
								</div>
								<div class="listDacbttime">支付转租铺服务费时可抵用</div>
							</div>
						</div>
					</div>
				</div>
			</view>	
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniIcon,
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'未使用',
					'已使用',
					'已过期'
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
	page {
		height: auto;
		min-height: 100%;
		background: #F5F5F5;
	}
	.topsbgydaBox {
		height:80upx;
		background: #ffffff;
	}
	.topsbgyCont {
		position: fixed;
		left:0px;
		width:100%;
		height:80upx;
		z-index: 100;
		background: #ffffff;
		border-bottom:4upx solid #f2f2f2;
	}
	.uni-padding-wrap {
		margin:0upx;
		height:82upx;
		width:100%;
		padding:0upx;
		overflow: hidden;
	}
	.findcontBox {
		padding:30upx 30upx 0upx 30upx;
	}
	.myrelistBox {
		margin-bottom:30upx;
		background: #ffffff;
		border-radius: 8upx;
		display: flex;
		overflow: hidden;
	}
	.myrelisttxian {
		width:20upx;
		height:200upx;
		background: #EFBF2F;
	}
	.myrelistData {
		flex: 1;
		padding:20upx 20upx 0upx 0upx;
	}
	.myrelistDatazi {
		display: flex;
	}
	.myrelistshu {
		height: 160upx;
		line-height: 160upx;
		min-width:180upx;
		text-align: center;
	}
	.myrelistshu .text_1 {
		color:#C49514;
		font-size: 26upx;
	}
	.myrelistshu .text_2 {
		color:#C49514;
		font-size: 50upx;
	}
	.listDacont {
		flex: 1;
		height: 160upx;
		border-left:2upx dashed #bbbbbb;
		padding-left:30upx;
	}
	.listDacbti {
		display: flex;
		margin-bottom:10upx;
	}
	.listDacbtitx {
		flex: 1;
		font-size:28upx;
		color:#333333;
		font-weight: 600;
	}
	.listDacbttime {
		font-size:22upx;
		color:#999999;
		padding-right:10upx;
	}
	.listDacbqshy {
		font-size:26upx;
		color:#C49514;
	}
	.listDacbqshy_1 {
		font-size:26upx;
		color:#999999;
	}
	.zanwudata {
		padding:20% 0upx;
		text-align: center;
	}
	.zanwudata image {
		width:40%;
	}
	.zanwudatatx {
		font-size: 24upx;
		color:#999999;
		margin-top:20upx;
	}
	
	
</style>
