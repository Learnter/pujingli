<template lang="html">
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
			<view v-show="current === 0">
				<view v-if="transferShopData.length > 0">
					<view class="findconnerBox" v-for="(item,index) in transferShopData" :key="index">
						<view class="findconnerhz">
							<navigator class="findcerhzimgrm" :url="'../transfer_shop/transfer_shop_detail?id='+item.shop_info.id">
								<image :src="item.img_info.img_url" mode=""></image>
								<view class="firmtisib">已收藏</view>
							</navigator>
							<view class="findconnerhztx">
								<view class="dconnerhztxtl">
									<text class="dconnerhztxtlrm">{{item.district}}-{{item.twon}} | {{item.shop_info.shop_area}}㎡</text>
								</view>
								<view class="dconnerhcazuo">
									<view class="nerhcazuolyan">
										<view class="nerhcazuolyantx">{{item.shop_info.title}}</view>
									</view>
									<view class="dconnerhztxzjinrm">{{item.unit_month_price}}</view>
								</view>
								<view class="dconnerhyouhdf">
									<view class="dconnerhyouh">
										<text class="text_1" v-for="(tagItem,tagIndex) in item.shop_info.tag_info" :key="tagIndex">{{tagItem.name}}</text>
									</view>
									<view class="dconnerquxao" v-on:click="cancelCollection(item.shop_info.id)">取消收藏</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				</view>
				<view style="text-align: center;padding-top:150upx;" v-else>
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无收藏信息</view>
				</view>

			</view>
			<view v-show="current === 1">
				<view v-if="transferShopDataTwo.length > 0">
					<view class="findconnerBox" v-for="(item,index) in transferShopDataTwo" :key="index">
						<view class="findconnerhz">
							<view class="findconnerhztx">
								<navigator class="dconnerhztxtl" :url="'../transfer_shop/seeking_detail?id='+item.id">
									<text class="dconnerhztxtlrm">{{item.title}} | {{item.area_add}}~{{item.area_end}}㎡</text>
								</navigator>
								<view class="dconnerhcazuo">
									<view class="nerhcazuolyan">
										<view class="nerhcazuolyantx">{{item.add_time}}</view>
									</view>
									<view class="dconnerhztxzjinrm">{{item.rent_add}}~{{item.rent_end}}元/月</view>
								</view>
								<view class="dconnerhyouhdf">
									<view class="dconnerquxao" v-on:click="cancelCollection(item.id)">取消收藏</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMoreTwo">{{loadMoreTextTwo}}</view>
				</view>
				<view style="text-align: center;padding-top:150upx;" v-else>
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无收藏信息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	let page = 0,
		limit = 10,
		is_load_more = true;
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'转租',
					'求租'
				],
				current: 0,
				activeColor: '#f00000',
				styleType: 'text',
				transferShopData: [],
				transferShopDataTwo: [],
				loadMoreText: "加载中...",
				loadMoreTextTwo: "加载中...",
				showLoadMore: false,
				showLoadMoreTwo: false,
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					var me = this;
					page = 0;
					is_load_more = true;
					me.getTransferShopInfo(true);
					// uni.stopPullDownRefresh();
				}
			},

			cancelCollection(id) {
				var me = this;
				if (me.current == 0) {
					var type = 1;
				} else {
					var type = 2;
				}
				uni.showModal({
					title: '提示',
					content: '是否确认取消收藏',
					success: function(res) {
						if (res.confirm) {
							me.$Request.post(me.$api.transferShop.cancelCollection, {
								id: id,
								type: type
							}).then(res => {
								console.log(res);
								if (res.code == 200) {
									uni.showToast({
										title: '取消成功',
										duration: 2000,
										icon: 'success'
									});
									page = 0;
									me.showLoadMore = false;
									me.loadMoreTextTwo = ""
									me.showLoadMoreTwo = false;
									me.loadMoreTextTwo = ""
									is_load_more = true;
									me.getTransferShopInfo(true);
								} else {
									return uni.showToast({
										title: res.data.msg,
										duration: 2000,
										icon: 'none'
									});
								}
								// console.log(res);
							});
						}
					}
				});
			},

			getTransferShopInfo(isReload) {
				var me = this;
				if (me.current == 0) {
					var type = 1;
				} else {
					var type = 2;
				}

				me.$Request.get(me.$api.transferShop.collectionList, {
					page: page,
					limit: limit,
					type: type,
				}).then(res => {
					if (res.code == 200) {
						if (me.current == 0) {
							if (isReload) {
								me.transferShopData = [];
							}

							for (var i in res.data) {
								me.transferShopData.push(res.data[i]);
							}

							if (res.data.length < limit) {
								me.loadMoreText = "没有更多数据了!"
								is_load_more = false;
								me.showLoadMore = true;
							}
						} else {
							if (isReload) {
								me.transferShopDataTwo = [];
							}

							for (var i in res.data) {
								me.transferShopDataTwo.push(res.data[i]);
							}

							if (res.data.length < limit) {
								me.loadMoreTextTwo = "没有更多数据了!"
								is_load_more = false;
								me.showLoadMoreTwo = true;
							}
						}

					}
					uni.stopPullDownRefresh();
					// console.log(res);	
				});
			},
		},
		// 加载的时候自动执行
		onLoad() {
			var me = this;
			page = 0;
			me.showLoadMore = false;
			me.loadMoreTextTwo = ""
			me.showLoadMoreTwo = false;
			me.loadMoreTextTwo = ""
			is_load_more = true;
			me.getTransferShopInfo(true);
		},
		// 加载完成后执行
		onUnload() {
			var me = this;
			if (me.current == 0) {
				this.max = 0,
					this.data = [],
					// this.loadMoreText = "加载更多",
					this.showLoadMore = false;
			} else {
				this.max = 0,
					this.data = [],
					// this.loadMoreText = "加载更多",
					this.showLoadMoreTwo = false;
			}
		},
		// 上拉加载执行
		onReachBottom() {
			if (is_load_more) {
				var me = this;
				page++;
				if (me.current == 0) {
					this.showLoadMore = true;
				} else {
					this.showLoadMoreTwo = true;
				}
				this.getTransferShopInfo();
				// console.log("onReachBottom");
			}
		},

		// 下拉刷新执行
		onPullDownRefresh() {
			is_load_more = true;
			page = 0;
			this.loadMoreText = "加载中...";

			// console.log('onPullDownRefresh');
			// this.transferShopData = [];
			this.getTransferShopInfo(true);
		}
	}
</script>

<style>
	@import url("collection_list.css");
</style>
