<template>
	<view>
		<view class="topsbgydaBox">
			<view class="topsbgyCont">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
					 :activeColor="activeColor"></uni-segmented-control>
				</view>
			</view>
		</view>
		<view class="findcontBox">
			<view v-if="teamUserList.length > 0">
				<view class="recoyqmlitBox uni-flex" v-for="(item,index) in teamUserList" :key="index">
					<view class="fx1">
						<view class="recoyqmlitmc">{{item.username}}</view>
						<view class="recoyqmlittime">{{item.mobile}}</view>
					</view>
					<!-- <view class="recoyqmlijb">3级</view> -->
				</view>
			</view>
			<view style="text-align: center;padding-top:150upx;" v-else>
				<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
				<view style="color:#888888;">暂无邀请人</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	let page = 0,
		type = 1,
		limit = 10,
		is_load_more = true;
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'一级',
					'二级'
				],
				current: 0,
				activeColor: '#f00000',
				styleType: 'text',
				teamUserList: []
			}
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getTeamUserList();
				// console.log("onReachBottom");
			}
		},
		onLoad() {
			this.getTeamUserList();
		},
		methods: {
			getTeamUserList(isReload) {
				if (isReload) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					is_load_more = true;
					page = 0;
				}
				let _this = this;
				_this.$Request.get(_this.$api.user.getTeamUserList, {
					type: type,
					page: page,
					limit: limit
				}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							_this.teamUserList = [];
						}
						for (let i in res.data) {
							_this.teamUserList.push(res.data[i]);
						}
						if (res.data.length < limit) {
							is_load_more = false;
						}
					}
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					if (index == 0) {
						type = 1;
					} else if (index == 1) {
						type = 2;
					}
					this.getTeamUserList(true);
				}
			}
		}
	}
</script>

<style>
	.topsbgydaBox {
		height: 80upx;
		background: #ffffff;
	}

	.topsbgyCont {
		position: fixed;
		left: 0px;
		width: 100%;
		height: 80upx;
		z-index: 100;
		background: #ffffff;
		border-bottom: 4upx solid #f2f2f2;
	}

	.uni-padding-wrap {
		margin: 0upx;
		height: 82upx;
		width: 100%;
		padding: 0upx;
		overflow: hidden;
	}

	.findcontBox {
		padding: 10upx 20upx 10upx 20upx;
	}

	.fx1 {
		-webkit-flex: 1;
		flex: 1;

	}

	.recoyqmlitBox {
		border-bottom: 2upx solid #DADADD;
		padding: 20upx 0upx;
	}

	.recoyqmlitBox:last-child {
		border: none;
	}

	.recoyqmlittime {
		font-size: 26upx;
		color: #888888;
	}

	.recoyqmlijb {
		padding-top: 20upx;
		color: #FF0000;
		font-size: 30upx;
	}

	.recoyqmbtn {
		margin: 20upx 0upx 0upx 20upx;
		height: 50upx;
		line-height: 50upx;
		padding: 0upx 20upx;
		font-size: 28upx;
	}
</style>
