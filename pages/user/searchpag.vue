<template>
	<view>
        <uni-nav-bar color="#333333" background-color="#FFFFFF" :fixed="false">
        	<view class="input-view">
        		<uni-icon type="search" size="22" color="#666666"></uni-icon>
        		<input confirm-type="search" @confirm="confirm" class="input" type="text" :value="searchValue" placeholder="输入搜索关键词" />
        	</view>
        	<block slot="right" @click="back">
        		取消
        	</block>
        </uni-nav-bar>
		<view class="history-box" v-if="if_search">
			<view>
				<view class="history-title">
					<text>搜索历史</text>
					<text class="uni-icon uni-icon-trash" v-on:click="delSearchLog()"></text>
				</view>
				<view v-if="kwdCache.length > 0">
					<view class="history-content">
						<view class="history-item" v-for="(item,index) in kwdCache" :key="index">
							<view v-on:click="clickSearch(item)">{{item}}</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="uni-loadmore">暂无搜索记录</view>
				</view>
			</view>
			<!-- <view class="no-data">您还没有历史记录</view> -->
		</view>
		<view v-if="transferShopData.length > 0">
			<view class="findcontBox" v-for="(item,index) in transferShopData" :key="index">
				<view class="findconnerBox">
					<navigator :url="'../transfer_shop/transfer_shop_detail?id='+item.id">
						<view class="findconnerhz">
							<view class="findcerhzimgrm">
								<image :src="item.img_info.img_url" mode=""></image>
								<view class="firmtisib" v-if="item.is_sem">置顶</view>
								<view class="firmtisib" v-else-if="item.is_spread">推广</view>
							</view>
							<view class="findconnerhztx">
								<view class="dconnerhztxtl">							
									<text class="dconnerhztxtlrm">{{item.district}}{{item.twon}} | {{item.shop_area}}㎡</text>
								</view>					
								<view class="dconnerhcazuo">
									<view class="nerhcazuolyan">
										<view class="nerhcazuolyantx">{{item.title}}</view>
									</view>	
									<view class="dconnerhztxzjinrm">{{item.unit_month_price}}</view>						
								</view>
								<view class="dconnerhyouhdf">
									<view class="dconnerhyouh">
										<text class="text_1" v-for="(tagItem,tagIndex) in item.tag_info" :key="tagIndex">{{tagItem.name}}</text>					
									</view>      		
								</view>
							</view>
						</view>	
					</navigator>
					<navigator class="findconntishi" :url="'../user/order_pay?type=1&info_id='+item.id">推广置顶</navigator>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-if="dataStatus">
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂无搜索信息</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	var is_load_more = true, page = 0, limit = 10;
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				kwd: '',
				if_search: true,
				dataStatus: false,
				loadMoreText:'加载中...',
				showLoadMore: false,
				transferShopData: [],
				kwdCache: [],
				searchValue: ''
			}
		},
		methods:{
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			confirm(e) {
				// console.log(e);
				// uni.showToast({
				// 	title: '搜索'
				// })
				var me = this;
				me.loadMoreText = "加载中..."
				me.kwd = e.target.value;
				me.getTransferShopInfo(true);
			},
			//返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			delSearchLog(id){
				var me = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除所有搜索记录',
					success: function (res) {
						if (res.confirm) {
							me.$SysCache.remove('search_kwd');
							me.kwdCache = [];
								// console.log(res);
						}
					}
				});
			},
			
			// 加载转铺列表
			getTransferShopInfo(isReload) {
				if(isReload) {
					is_load_more = true;
					page = 0;
				}
				
				var me = this;
				me.if_search = false;
				uni.showLoading({
					title: '加载中'
				});
				if (me.kwd != '') {
					if(me.kwdCache === false) {
						me.kwdCache = [];
					}
					for(var i in me.kwdCache) {
						if(me.kwdCache[i] == me.kwd) {
							me.kwdCache.splice(i, 1);
						}
					}
					me.kwdCache.push(me.kwd);
					me.$SysCache.put('search_kwd', me.kwdCache);
					me.$Request.get(me.$api.transferShop.searchTransferShopList, {
						kwd:me.kwd,
						page:page,
						limit:limit
					}).then(res => {
						if(res.code == 200) {
							uni.hideLoading();
							if (res.data.length <= 0) {
								me.dataStatus = true;
							}
							if(isReload) {
								me.transferShopData = [];
							}
							for(var i in res.data) {
								me.transferShopData.push(res.data[i]);
							}
							if(res.data.length < limit) {
								me.loadMoreText = "没有更多数据了!"
								is_load_more = false;
							}
						}
					});
				} else {
					me.if_search = true;
					uni.hideLoading();
					me.transferShopData = [];
					me.dataStatus = false;
				}
			},
			clickSearch(kwd){
				var me = this;
				me.kwd = me.searchValue = kwd;
				me.loadMoreText = "加载中..."
				me.getTransferShopInfo(true);
			},
			getStorage(){
				var me = this;
				me.kwdCache = me.$SysCache.get('search_kwd');
			}
		},
		onLoad() {
			var me = this;
			me.getStorage();
		},
		// 上拉加载执行
		onReachBottom() {
			if (is_load_more) {
				var me = this;
				page++;
				this.showLoadMore = true;
				me.loadMoreText = "加载中..."
				this.getTransferShopInfo();
				// console.log("onReachBottom");
			}
		},
		onPullDownRefresh() {
			// console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				// console.log('stopPullDownRefresh')
			}, 1000)
		}
	}
	
</script>

<style>
	@import url("searchpag.css");
</style>
