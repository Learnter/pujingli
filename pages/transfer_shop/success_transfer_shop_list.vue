<template>
	<view>
		<view>
			<view class="smaNavBoxpos">
				<view class="smaNavBoxpohe">
					<view class="smaNavBox">
						<view class="smaNav" @click="togglePopup('bottomd')">行业 <uni-icon class="i" type="arrowdown" color="#333333" size="18"></uni-icon>
						</view>
						<view class="smaNav" @click="togglePopup('bottoma')">区域 <uni-icon class="i" type="arrowdown" color="#333333" size="18"></uni-icon>
						</view>
						<view class="smaNav" @click="togglePopup('bottomb')">面积 <uni-icon class="i" type="arrowdown" color="#333333" size="18"></uni-icon>
						</view>
						<view class="smaNav" @click="togglePopup('bottomc')">费用 <uni-icon class="i" type="arrowdown" color="#333333" size="18"></uni-icon>
						</view>
					</view>
				</view>
			</view>
			<view>
				<uni-popup :show="type === 'bottoma'" position="bottom" mode="fixed" msg="区域" @hidePopup="togglePopup('')">
					<view class="dxxunatBox">
						<!-- <view class="dxxunButn">确认</view> -->
						<view class="xunanNenr clearfix">
							<scroll-view scroll-y="true" class='xunanLeftBocx'>
								<view class="xunanLeft">
									<!-- <view class="xufltext">全部</view> -->
									<view class="xufltext" @click="regionChoose(1, item)" :class="item.id == district ? 'xufltextActive' : ''"
									 v-for="(item, index) in region.child" :key="index">{{item.name}}</view>
								</view>
							</scroll-view>
							<scroll-view scroll-y="true" class='xunanRightBox'>
								<view class="xunanRight" v-if="region.child[district].id > 0">
									<view class="xufltext" @click="regionChoose(2, item)" :class="item.id == twon ? 'xufltextActive' : ''" v-for="(item, index) in region.child[district].child"
									 :key="index">
										<text>{{item.name}}</text>
										<uni-icon class="i" type="checkmarkempty" color="#f000000" size="18"></uni-icon>
									</view>
								</view>
								<view class="xunanRight" v-else>
									<view class='xufltext xufltextActive'>
										<text>不限</text>
										<uni-icon class="i" type="checkmarkempty" color="#f000000" size="18"></uni-icon>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</uni-popup>
				<uni-popup :show="type === 'bottomb'" position="bottom" mode="fixed" msg="面积范围" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<!-- <view class="dxxunButn">确认</view> -->
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in areaData" :key="index">
								<view class="xunantext" @click="areaChoose(item)" :class="item.id == choseeAreaInfo.id ? 'xunantextActive' : ''"
								 v-if="item.min <= 0 && item.max <= 0">不限</view>
								<view class="xunantext" @click="areaChoose(item)" :class="item.id == choseeAreaInfo.id ? 'xunantextActive' : ''"
								 v-if="item.min <= 0 && item.max > 0">{{item.max}}㎡以下</view>
								<view class="xunantext" @click="areaChoose(item)" :class="item.id == choseeAreaInfo.id ? 'xunantextActive' : ''"
								 v-if="item.min > 0 && item.max <= 0">{{item.min}}㎡以上</view>
								<view class="xunantext" @click="areaChoose(item)" :class="item.id == choseeAreaInfo.id ? 'xunantextActive' : ''"
								 v-if="item.min > 0 && item.max > 0">{{item.min}}-{{item.max}}㎡</view>
							</view>
						</view>
					</view>
				</uni-popup>
				<uni-popup :show="type === 'bottomc'" position="bottom" mode="fixed" msg="租金" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<!-- <view class="dxxunButn">确认</view> -->
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in rentData" :key="index">
								<view class="xunantext" @click="rentChoose(item)" :class="choseeRentInfo.id == item.id ? 'xunantextActive' : ''">{{item.title}}</view>
							</view>
						</view>
					</view>
				</uni-popup>
				<uni-popup :show="type === 'bottomd'" position="bottom" mode="fixed" msg="行业" @hidePopup="togglePopup('')">
					<view class="dxxunatBox">
						<!-- <view class="dxxunButn">确认</view> -->
						<view class="xunanNenr clearfix">
							<scroll-view scroll-y="true" class='xunanLeftBocx'>
								<view class="xunanLeft">
									<view class="xufltext" @click="cateChoose(1, item)" :class="item.id == topCateId ? 'xufltextActive' : ''"
									 v-for="(item,index) in industryCate" :key="index">{{item.name}}</view>
								</view>
							</scroll-view>
							<scroll-view scroll-y="true" class='xunanRightBox'>
								<view class="xunanRight" v-if="industryCate[topCateId].child[0]">
									<view class="xufltext" @click="cateChoose(2, item)" :class="item.id == choseeCateInfo.id ? 'xufltextActive' : ''"
									 v-for="(item, index) in industryCate[topCateId].child" :key="index">
										<text>{{item.name}}</text>
										<uni-icon class="i" type="checkmarkempty" color="#f000000" size="18"></uni-icon>
									</view>
								</view>
								<view class="xunanRight" v-else>
									<view class='xufltext xufltextActive'>
										<text>不限</text>
										<uni-icon class="i" type="checkmarkempty" color="#f000000" size="18"></uni-icon>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</uni-popup>
			</view>
		</view>
		<view v-if="transferShopData.length > 0">
			<view class="findcontBox" v-for="(item,index) in transferShopData" :key="index">
				<view class="findconnerBox">
					<navigator :url="'../transfer_shop/transfer_shop_detail?id='+item.id">
						<view class="findconnerhz">
							<view class="findcerhzimgrm">
								<image :src="item.img_info.img_url" :lazy-load="trueval" mode=""></image>
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
										<view class="nerhcajjolyantx" style="color:#333333;">转让费: <text style="color:red;">{{item.unit_transfer_price}}</text></view>
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
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂无转铺信息</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	let page = 0,
		limit = 10,
		is_load_more = true,
		title = '转铺列表',
		latitude = 0,
		longitude = 0,
		city = 0,
		webConfig = {};
	export default {
		data() {
			return {
				trueval: true,
				operationType: '',
				type: '',
				region: {},
				district: 0,
				twon: 0,
				topCateId: 0,
				industryCate: [],
				choseeCateInfo: {},
				choseeAreaInfo: {
					id: 1,
					min: 0,
					max: 0
				},
				areaData: [{
						id: 1,
						min: 0,
						max: 0
					},
					{
						id: 2,
						min: 0,
						max: 20
					},
					{
						id: 3,
						min: 20,
						max: 50
					},
					{
						id: 4,
						min: 50,
						max: 100
					},
					{
						id: 5,
						min: 100,
						max: 200
					},
					{
						id: 6,
						min: 200,
						max: 500
					},
					{
						id: 7,
						min: 500,
						max: 0
					}
				],
				rentData: [{
						id: 1,
						min: 0,
						max: 0,
						title: '不限'
					},
					{
						id: 2,
						min: 0,
						max: 2000,
						title: '2k以下/月'
					},
					{
						id: 3,
						min: 2000,
						max: 5000,
						title: '2k-5k/月'
					},
					{
						id: 4,
						min: 5000,
						max: 10000,
						title: '5k-10k/月'
					},
					{
						id: 5,
						min: 10000,
						max: 20000,
						title: '10k-20k/月'
					},
					{
						id: 6,
						min: 20000,
						max: 50000,
						title: '20k-50k/月'
					},
					{
						id: 7,
						min: 50000,
						max: 0,
						title: '50k以上/月'
					}
				],
				choseeRentInfo: {
					id: 1,
					min: 0,
					max: 0,
					title: '不限'
				},
				transferShopData: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		components: {
			uniIcon,
			uniPopup
		},
		onLoad(e) {
			var me = this;
			me.operationType = e.type, latitude = e.latitude, longitude = e.longitude;


			webConfig = me.$SysCache.get('web_config');
			me.industryCate = me.$util.objectConverArray(webConfig.transferShop.industryCate);
			me.industryCate.unshift({
				id: 0,
				name: '全部',
				child: {}
			});

			var chooseRegion = me.$SysCache.get('chosen_region');
			city = chooseRegion.value;

			me.getTransferShopInfo();
			me.getRegionData();
			// console.log(webConfig)
		},
		onReachBottom() {
			// console.log(is_load_more);
			if (is_load_more) {
				page++;
				this.showLoadMore = true;
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
		},
		methods: {
			getRegionData() {
				var me = this;
				uni.showLoading({
					title: '正在加载'
				});
				me.$Request.get(me.$api.config.region, {
					city: city
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.region = res.data;
					} else {
						uni.showModal({
							title: '温馨提示',
							content: res.msg,
							success(res) {
								uni.navigateBack();
							}
						})
					}
				});
			},
			togglePopup(type) {
				this.type = type;
			},
			// 行业选择
			cateChoose(type, cateInfo) {
				var me = this;
				me.choseeCateInfo = cateInfo;
				if (type == 1) {
					me.topCateId = cateInfo.id;
					if (me.topCateId == 0) {
						me.getTransferShopInfo(true);
					}
					if (me.industryCate[me.topCateId].child[0] == undefined) {
						me.type = 'hide';
						me.getTransferShopInfo(true);
					}
				} else {
					me.type = 'hide';
					me.getTransferShopInfo(true);
				}
			},
			// 地区选择
			regionChoose(type, areaInfo) {
				var me = this;
				if (type == 1) {
					if (areaInfo.id != me.district) {
						me.twon = 0;
					}
					me.district = areaInfo.id;
					if (me.district == 0 || areaInfo.child.length <= 0) {
						me.type = 'hide';
						me.getTransferShopInfo(true);
					}
				} else {
					me.twon = areaInfo.id;
					me.type = 'hide';
					me.getTransferShopInfo(true);
				}
			},
			// 面积选择
			areaChoose(areaInfo) {
				var me = this;
				me.choseeAreaInfo = areaInfo;
				me.type = 'hide';
				me.getTransferShopInfo(true);
			},
			// 租金选择
			rentChoose(rentInfo) {
				var me = this;
				me.choseeRentInfo = rentInfo;
				me.type = 'hide';
				me.getTransferShopInfo(true);
			},
			// 加载转铺列表
			getTransferShopInfo(isReload) {
				if (isReload) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					is_load_more = true;
					page = 0;
				}
				var me = this;
				me.$Request.get(me.$api.transferShop.getSuccessTransferShopList, {
					latitude: latitude,
					longitude: longitude,
					city: city,
					district: me.district,
					twon: me.twon,
					area_min: me.choseeAreaInfo.min,
					area_max: me.choseeAreaInfo.max,
					rent_min: me.choseeRentInfo.min,
					rent_max: me.choseeRentInfo.max,
					cate_id: (me.choseeCateInfo.id > 0 ? me.choseeCateInfo.id : me.topCateId),
					page: page,
					limit: limit
				}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							me.transferShopData = [];
						}
						for (var i in res.data) {
							me.transferShopData.push(res.data[i]);
						}
						if (res.data.length < limit) {
							me.loadMoreText = "没有更多数据了!"
							is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
					// console.log(res);
				});
			}
		}

	}
</script>

<style>
	@import url("transfer_shop_list.css");
</style>
