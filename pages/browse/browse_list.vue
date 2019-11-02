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
			<view v-show="current === 0">
				<view v-if="transferShopData.length > 0">
					<view class="findconnerBox" v-for="(item,index) in transferShopData" :key="index">
						<view class="findconnerhz">
							<navigator class="findcerhzimgrm" :url="'../transfer_shop/transfer_shop_detail?id='+item.shop_info.id">
								<image :src="item.img_info.img_url" mode=""></image>
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
									<view class="dconnerquxao" v-on:click="browseDel(item.id)">删除</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				</view>
				<view style="text-align: center;padding-top:150upx;" v-else>
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无浏览信息</view>
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
									<view class="dconnerquxao" v-on:click="browseDel(item.b_id)">删除</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMoreTwo">{{loadMoreTextTwo}}</view>
				</view>
				<view style="text-align: center;padding-top:150upx;" v-else>
					<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
					<view style="color:#888888;">暂无浏览信息</view>
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
				let _this = this;
				if (_this.current !== index) {
					_this.current = index;
					page = 0;
					is_load_more = true;
					_this.getTransferShopInfo(true);
					// uni.stopPullDownRefresh();
				}
			},

			browseDel(id) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: function(res) {
						if (res.confirm) {
							_this.$Request.post(_this.$api.transferShop.browseDel, {
								id:id
							}).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000,
										icon: 'success'
									});
									page = 0;
									_this.showLoadMore = false;
									_this.loadMoreTextTwo = ""
									_this.showLoadMoreTwo = false;
									_this.loadMoreTextTwo = ""
									is_load_more = true;
									_this.getTransferShopInfo(true);
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
				let _this = this,
					type = 2;
				if (_this.current == 0) {
					type = 1;
				} else {
					type = 2;
				}

				_this.$Request.get(_this.$api.transferShop.browseList, {
					page: page,
					limit: limit,
					type: type,
				}).then(res => {
					if (res.code == 200) {
						if (_this.current == 0) {
							if (isReload) {
								_this.transferShopData = [];
							}
							for (let i in res.data) {
								_this.transferShopData.push(res.data[i]);
							}

							if (res.data.length < limit) {
								_this.loadMoreText = "没有更多数据了!"
								_this.showLoadMore = true;
								is_load_more = false;
							}
						} else {
							if (isReload) {
								_this.transferShopDataTwo = [];
							}
							for (let i in res.data) {
								_this.transferShopDataTwo.push(res.data[i]);
							}

							if (res.data.length < limit) {
								_this.loadMoreTextTwo = "没有更多数据了!"
								_this.showLoadMoreTwo = true;
								is_load_more = false;
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
			let _this = this;
			page = 0;
			_this.showLoadMore = false;
			_this.loadMoreTextTwo = ""
			_this.showLoadMoreTwo = false;
			_this.loadMoreTextTwo = ""
			is_load_more = true;
			_this.getTransferShopInfo(true);
		},
		// 加载完成后执行
		onUnload() {
			let _this = this;
			if (_this.current == 0) {
				_this.max = 0,
					_this.data = [],
					// this.loadMoreText = "加载更多",
					_this.showLoadMore = false;
			} else {
				_this.max = 0,
					_this.data = [],
					// this.loadMoreText = "加载更多",
					_this.showLoadMoreTwo = false;
			}
		},
		// 上拉加载执行
		onReachBottom() {
			if (is_load_more) {
				let _this = this;
				page++;
				if (_this.current == 0) {
					_this.showLoadMore = true;
				} else {
					_this.showLoadMoreTwo = true;
				}
				_this.getTransferShopInfo();
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
	@import url("browse_list.css");
</style>
