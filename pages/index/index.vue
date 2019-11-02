<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#FFFFFF" :fixed="false">
			<block slot="left">
				<view @click="chooseCityClick">
					<view class="znhometopshrtxz">
						<text class="znhometodzxz">{{chosenRegion.label}}</text>
						<!-- <text class="znhometodzxz" v-on:click="selectRegion">{{chosenRegion.label}}</text> -->
						<view class="icoimg">
							<uni-icon class="i" type="arrowdown" color="#333333" size="22"></uni-icon>
						</view>
					</view>
				</view>
				<!-- <mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="selector" deepLength="1" :pickerValueDefault="chosenRegion.index" @onConfirm="selectRegionOnConfirm" :pickerValueArray="cityData"></mpvue-picker> -->
			</block>
			<navigator class="input-view" url="../user/searchpag" hover-class="navigator-hover">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input disabled="disabled" class="input" type="text" placeholder="输入搜索关键词" />
			</navigator>
			<block slot="right">
				<template v-if="userIsLogin">
					<navigator class="mesgeBox" url="../messagebox/messagelist" @click="data.messageNum = 0">
						<image src="../../static/images/zpzp_2_1.png" mode=""></image>
						<text class="text_1" v-if="data.messageNum > 0"></text>
					</navigator>
				</template>
				<template v-else>
					<navigator class="mesgeBox" url="../login/login">
						<image src="../../static/images/zpzp_2_1.png" mode=""></image>
					</navigator>
				</template>
			</block>
		</uni-nav-bar>
		<!-- 轮播图 s -->
		<view class="bnenaBox">
			<uni-swiper-dot :info="adsList" :current="current" :mode="mode" :dotsStyles="dotsStyles">
				<swiper autoplay="true" circular="true" class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in adsList" :key="index">
						<view class="swiper-item" :class="item.colorClass" @click="bannerClick(item)">
							<image :src="item.url" :lazy-load="trueval" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!-- 轮播图 e -->
		<view class="zphomeNavBox">
			<navigator class="zphomeNav" :url="'../transfer_shop/transfer_shop_list?type=new&longitude='+locationInfo.longitude+'&latitude='+locationInfo.latitude">
				<image src="../../static/images/zpzp_3.png" mode=""></image>
				<view class="zphomeNavtx">查看新铺</view>
			</navigator>
			<navigator class="zphomeNav" :url="'../transfer_shop/nearby_shops?longitude='+locationInfo.longitude+'&latitude='+locationInfo.latitude">
				<image src="../../static/images/zpzp_4.png" mode=""></image>
				<view class="zphomeNavtx">地图找铺</view>
			</navigator>
			<!-- <navigator class="zphomeNav" :url="'../transfer_shop/transfer_shop_list?type=rapidly'">
				<image src="../../static/images/zpzp_5.png" mode=""></image>
				<view class="zphomeNavtx">极速找铺</view>
			</navigator> -->
			<navigator class="zphomeNav" url="../transfer_shop/success_transfer_shop_list">
				<image src="../../static/images/zpzp_124.png" mode=""></image>
				<view class="zphomeNavtx">成功案例</view>
			</navigator>
			<navigator class="zphomeNav" url="../shop_ask/index">
				<!-- <navigator class="zphomeNav" url="../public/stay"> -->
				<image src="../../static/images/zpzp_6.png" mode=""></image>
				<view class="zphomeNavtx">开店问答</view>
			</navigator>
		</view>
		<view class="zphomeNavBox">
			<navigator class="zphomeNav" url="../partner/partner_list">
				<image src="../../static/images/zpzp_109.png" mode=""></image>
				<view class="zphomeNavtx">品牌加盟</view>
			</navigator>
			<navigator class="zphomeNav" url="../rent/rent_list?type=2">
				<image src="../../static/images/zpzp_123.png" mode=""></image>
				<view class="zphomeNavtx">商铺出租</view>
			</navigator>
			<navigator class="zphomeNav" url="../rent/rent_list?type=3">
				<image src="../../static/images/zpzp_122.png" mode=""></image>
				<view class="zphomeNavtx">厂房出租</view>
			</navigator>
			<!-- <navigator class="zphomeNav" url="../public/stay"> -->
			<navigator class="zphomeNav" url="../recruit/recrlist">
				<image src="../../static/images/zpzp_112.png" mode=""></image>
				<view class="zphomeNavtx">招聘服务</view>
			</navigator>
		</view>
		<view class="tygBox" v-if="data.featuredShopData.length > 0">
			<view class="tygtitle">
				<view class="findconttl">
					<view class="findconttlltb">
						<text>精选店铺</text>
					</view>
					<navigator class="findltbgduo" :url="'../transfer_shop/transfer_shop_list?type=featured'">
						<text>更多</text>
						<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
					</navigator>
				</view>
				<view class="findcontmshu">热点街区，性价比超高</view>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="tyCont" v-for="(item,index) in data.featuredShopData" :key="index">
					<navigator :url="'../transfer_shop/transfer_shop_detail?id='+item.id">
						<view class="findcerhzimg">
							<image :src="item.img_info.img_url" :lazy-load="trueval" mode=""></image>
						</view>
						<view class="tyConttex">{{item.district}}-{{item.twon}}</view>
						<view class="tyConttex">{{item.shop_area}}㎡ | {{item.unit_month_price}}</view>
					</navigator>
				</view>
			</scroll-view>
		</view>
		<!-- 滚动消息 s -->
		<view class="uni-swiper-msg cfssagecrBox" v-if="data.noticeList.length > 0">
			<view class="uni-swiper-msg-icon" style="width:170upx;height:50upx;padding-left:30upx;">
				<image src="../../static/images/zpzp_7.png" mode="" style="width:100%;height:100%;"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in data.noticeList" :key="index">
					<navigator class="msglist" :url="'../notice/notice_detail?id='+item.id">{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 滚动消息 e -->
		<view class="duewlinkBox">
			<navigator class="duewlink" open-type="switchTab" url="shopmall">
				<view class="duewlinkshu">{{data.transferringNum}}</view>
				<view class="duewlinktx">正在转铺</view>
			</navigator>
			<navigator class="duewlink" open-type="switchTab" url="qnquiry">
				<view class="duewlinkshu">{{data.findStoreNum}}</view>
				<view class="duewlinktx">在线找店</view>
			</navigator>
			<navigator class="duewlink" url="../transfer_shop/success_transfer_shop_list">
				<view class="duewlinkshu">{{data.successfulTransferNum}}</view>
				<view class="duewlinktx">成功转店</view>
			</navigator>
		</view>
		<view class="courteoBox">
			<view class="courteofx">
				<navigator class="courteoCont" url="../user/shopolite">
					<view class="courteotxt">租铺有礼</view>
					<view class="courteoimg">
						<image src="../../static/images/zpzp_83.png" mode=""></image>
					</view>
				</navigator>
			</view>
			<view class="courteofx">
				<template v-if="userIsLogin">
					<navigator class="courteoCont" url="../recommend/recommendma">
						<view class="courteotxt">分享有礼</view>
						<view class="courteoimg">
							<image src="../../static/images/zpzp_84.png" mode=""></image>
						</view>
					</navigator>
				</template>
				<template v-else>
					<navigator class="courteoCont" url="../login/login">
						<view class="courteotxt">分享有礼</view>
						<view class="courteoimg">
							<image src="../../static/images/zpzp_84.png" mode=""></image>
						</view>
					</navigator>
				</template>
			</view>
		</view>
		<!-- <view class="courteoBox">
			<view class="courteofx">
				<navigator class="courteoCont" url="../charge/servefw">
					<view class="courteotxt">转租铺服务</view>
					<view class="courteoimg">
						<image src="../../static/images/zpzp_133.png" mode=""></image>
					</view>
				</navigator>
			</view>
			<view class="courteofx">
				<navigator class="courteoCont" url="../charge/myredpac">
					<view class="courteotxt">我的红包</view>
					<view class="courteoimg">
						<image src="../../static/images/zpzp_132.png" mode=""></image>
					</view>
				</navigator>
			</view>
		</view> -->

		<!-- <view class="findcontBox">
			<image src="../../static/images/zpzp_8.png" mode="" class="hefuaimg"></image>
		</view> -->

		<view class="findcontBox" v-if="nearbyStoreData.length > 0">
			<view class="findconttl">
				<view class="findconttlltb">
					<text>附近的铺</text>
				</view>
				<navigator class="findltbgduo" :url="'../transfer_shop/nearby_shops?longitude='+locationInfo.longitude+'&latitude='+locationInfo.latitude">
					<text>更多</text>
					<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
				</navigator>
			</view>
			<view class="findcontmshu">搜索附近，方便捷迅</view>
			<view class="findconnerBox" v-for="(item,index) in nearbyStoreData" :key="index">
				<navigator :url="'../transfer_shop/transfer_shop_detail?id='+item.id">
					<view class="findconnerhz">
						<view class="findcerhzimg">
							<image :src="item.img_info.img_url" :lazy-load="trueval" mode=""></image>
							<view class="firmtisib" v-if="item.is_sem">置顶</view>
							<view class="firmtisib" v-else-if="item.is_spread">推广</view>
						</view>
						<view class="findconnerhztx">
							<view class="dconnerhztxtl">{{item.title}}</view>
							<view class="dconnerhztxzjin">面积: <text class="text_1">{{item.shop_area}}</text>平方米</view>
							<view class="dconnerhztxzjin">租金: <text class="text_1">{{item.unit_month_price}}</text></view>
							<view class="dconnerhztxzjin" v-if="item.unit_transfer_price">转让费: <text class="text_1">{{item.unit_transfer_price}}</text></view>
							<view class="dconnerhcazuo">
								<view class="nerhcazuolyan">
									<image src="../../static/images/zpzp_11.png" mode=""></image>
									<text>{{item.city}}{{item.district}}</text>
								</view>
							</view>
							<view class="dconnerhyouh">
								<text class="text_1" v-for="(tagItem,tagIndex) in item.tag_info" :key="tagIndex">{{tagItem.name}}</text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator class="findconntishi" :url="'../user/order_pay?type=1&info_id='+item.id">推广置顶</navigator>
			</view>
		</view>

		<view class="findcontBox" v-if="data.adminUserData.length > 0">
			<view class="findconttl">
				<view class="findconttlltb">
					<text>选址专家</text>
				</view>
				<navigator class="findltbgduo" url="../user/sitespectdui">
					<text>更多</text>
					<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
				</navigator>
			</view>
			<view class="findconscroBox">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<navigator class="xuanzBox" :url="'../user/sitespec?id='+item.admin_id" v-for="(item,index) in data.adminUserData"
					 :key="index">
						<view class="xuanzimg">
							<image :src="item.avatar" :lazy-load="trueval" mode=""></image>
						</view>
						<view class="xuanztl">{{item.user_name}}</view>
						<view class="xuanzych">擅长行业：{{item.industry}}</view>
						<view class="xuanzfwu">
							<text>服务人数：</text>
							<text class="text_1">{{item.service_num}}人</text>
						</view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<view class="findcontBox" v-if="data.partnerData.length > 0">
			<view class="findconttl">
				<view class="findconttlltb">
					<text>选址合作商</text>
				</view>
				<navigator class="findltbgduo" url="../partner/partner_list">
					<text>更多</text>
					<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
				</navigator>
			</view>
			<view class="findconscroBox">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<navigator class="xuhzsBox" :url="'../partner/partner_detail?id='+item.id" v-for="(item,index) in data.partnerData"
					 :key="index">
						<view class="xuhzsimg">
							<image :src="item.img" :lazy-load="trueval" mode=""></image>
						</view>
						<view class="xuhzstext">{{item.name}}</view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<view class="findcontBox" v-if="data.successCaseData.length > 0">
			<view class="findconttl">
				<view class="findconttlltb">
					<text>成交案例</text>
				</view>
				<navigator class="findltbgduo" url="../success_case/list">
					<text>更多</text>
					<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
				</navigator>
			</view>
			<view class="findcontmshu">他们就是成功的先例</view>
			<view class="findconscroBox">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="scrofandBox" v-for="(item,index) in data.successCaseData" :key="index">
						<view>
							<video id="myVideo" :src="item.video_url" :poster="item.video_url+'?x-oss-process=video/snapshot,t_0,m_fast,w_800,f_png'"></video>
						</view>
						<view class="scrofandtx">{{item.title}}</view>
						<navigator class="scrofandNav" :url="'../success_case/detail?id='+item.id"></navigator>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="findcontBox" v-if="data.youLikeShopData.length > 0">
			<view class="findconttl">
				<view class="findconttlltb">
					<text>猜你喜欢</text>
				</view>
				<navigator class="findltbgduo" :url="'../transfer_shop/transfer_shop_list?type=you_may_also_like'">
					<text>更多</text>
					<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
				</navigator>
			</view>
			<view class="findcontmshu">为你解忧排难，在所不辞</view>
			<view class="findconnerBox" v-for="(item,index) in data.youLikeShopData" :key="index">
				<navigator :url="'../transfer_shop/transfer_shop_detail?id='+item.id">
					<view class="findconnerhz">
						<view class="findcerhzimgrm">
							<image :src="item.img_info.img_url" :lazy-load="trueval" mode=""></image>
							<view class="firmtisib" v-if="item.is_sem">置顶</view>
							<view class="firmtisib" v-else-if="item.is_spread">推广</view>
						</view>
						<view class="findconnerhztx">
							<view class="dconnerhztxtl">
								<text class="dconnerhztxtlrm">{{item.district}}-{{item.twon}} | {{item.shop_area}}㎡</text>
							</view>
							<view class="dconnejjzuo">
								<view class="nerhcajjolyan">
									<view class="nerhcajjolyantx">{{item.title}}</view>
									<view class="nerhcajjolyantx" style="color:#333333;" v-if="item.unit_transfer_price">转让费: <text style="color:red;">{{item.unit_transfer_price}}</text></view>
								</view>
								<text class="dconnerhztxzjinrm">{{item.unit_month_price}}</text>
							</view>
							<view class="dconnerhyouh">
								<text class="text_1" v-for="(tagItem,tagIndex) in item.tag_info" :key="tagIndex">{{tagItem.name}}</text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator class="findconntishi" :url="'../user/order_pay?type=1&info_id='+item.id">推广置顶</navigator>
			</view>
		</view>
		<!-- 微信客服 -->
		<button class="wechbbbbimg" open-type="contact">
			<image src="../../static/images/zpzp_118.png" mode=""></image>
		</button>

		<!-- 红包弹窗 s -->
		<view class="protupBox" :class="protpup == true ? 'protupBoxActive' : ''">
			<view class="protubggb" @click="baprotpup"></view>
			<div class="wodehbCont">
				<div class="wodehbConttl" @click="baprotpup">
					<image src="../../static/images/zpzp_131.png" mode=""></image>
				</div>
				<div class="wodehbConthb">
					<image src="../../static/images/zpzp_129.png" mode="widthFix" class="bghb"></image>
					<div class="wodehbnertl">
						<div class="tlzi">恭喜获得一个</div>
						<div class="tlzi">现金红包</div>
					</div>
					<div class="wodehbnnercint">
						<div class="wodehbnnqian">
							<text class="text_1">￥</text>
							<text class="text_2">500</text>
						</div>
						<div class="wodehbnnyont">红包仅抵扣支付转店服务费</div>
						<div class="wodehbnnylinqan" @click="baprotpup">立即领取</div>
					</div>
				</div>
			</div>
		</view>
		<!-- 红包弹窗 e -->

	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import amap from '../../common/amap-wx.js';
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log(res.target)
			}
		},
		data() {
			return {
				userIsLogin: false,
				trueval: true,
				protpup: false,
				data: {
					featuredShopData: [],
					youLikeShopData: [],
					partnerData: [],
					adminUserData: [],
					successCaseData: [],
					noticeList: [],
					messageNum: 0,
					findStoreNum: 0,
					transferringNum: 0,
					successfulTransferNum: 0,
				},
				nearbyStoreData: [], // 附近店铺
				// 轮播图 s
				current: 0,
				mode: 'long',
				dotsStyles: {
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid',
				},
				chosenRegion: {},
				adsList: [],
				// 轮播图 e
				locationInfo: {}
			}
		},

		components: {
			uniNavBar,
			uniIcon,
			uniSwiperDot,
			mpvuePicker
		},
		methods: {
			// 获取轮播图
			getCarousel() {
				let _this = this;
				_this.$Request.get(_this.$api.config.getCarousel + '/home_index').then(res => {
					if (res.code == 200) {
						_this.adsList = res.data;
					} else {
						return uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			baprotpup() {
				this.protpup = false;
			},
			chooseCityClick() {
				uni.navigateTo({
					url: 'choose_city'
				});
			},
			// 轮播图点击
			bannerClick: function(info) {
				if (info.open_type == 'current') {
					uni.switchTab({
						url: info.link_url
					})
				} else {
					uni.navigateTo({
						url: info.link_url
					})
				}
			},
			getTransferShopInfo() {
				let _this = this;
				uni.showLoading({
					title: '正在加载'
				});
				_this.$Request.get(_this.$api.transferShop.index, {
					city: _this.chosenRegion.value,
					// latitude: res.latitude,
					// longitude: res.longitude
				}).then(res => {
					uni.hideLoading();

					let data = {
						featuredShopData: res.data.featuredShop,
						youLikeShopData: res.data.userLikeShop,
						partnerData: res.data.partnerData,
						adminUserData: res.data.adminUserData,
						noticeList: res.data.noticeList,
						messageNum: res.data.messageNum,
						successCaseData: res.data.successCaseData,
						findStoreNum: res.data.findStoreNum,
						transferringNum: res.data.transferringNum,
						successfulTransferNum: res.data.successfulTransferNum,
					}
					uni.stopPullDownRefresh();
					_this.data = data;
				});
			},
			// 获取附近的店铺
			getnearbyStoreList() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						_this.locationInfo = {
							longitude: res.longitude,
							latitude: res.latitude
						};
						_this.$Request.get(_this.$api.transferShop.getNearStoresList, {
							latitude: res.latitude,
							longitude: res.longitude
						}).then(res => {
							uni.hideLoading();
							_this.nearbyStoreData = res.data;
							// console.log(res);
						});
					},
					fail: function(e) {
						uni.showModal({
							title: '温馨提示',
							content: '定位失败，请刷新重试',
							showCancel: false
						});
					}
				});
			},
			// 获取当前城市
			getCurrentCity() {
				let _this = this,
					chosenRegion = _this.$SysCache.get('chosen_region'),
					amapPlugin = new amap.AMapWX({
						key: '4c90b941dca75e686d95a4f05aea48c2'
					});
				_this.chosenRegion = chosenRegion;
				amapPlugin.getRegeo({
					success: (data) => {
						if (chosenRegion == '' || chosenRegion == false) {
							_this.$Request.get(_this.$api.config.getCurrentCityData, {
								city: data[0].regeocodeData.addressComponent.city,
							}).then(res => {
								if (res.code == 200) {
									_this.chosenRegion = res.data;
									_this.$SysCache.put('chosen_region', res.data);
								} else {
									return uni.showToast({
										title: res.msg,
										icon: 'none'
									});
								}
							});
						}
					}
				});
			},

			// 轮播图 s 
			change(e) {
				this.current = e.detail.current;
			},
			// 轮播图 s 

		},
		// 进入当前页
		onShow() {
			let _this = this,
				userInfo = _this.$SysCache.get('app_user_info'),
				chosenRegion = _this.$SysCache.get('chosen_region');
			if (userInfo != null && userInfo != '' && userInfo != undefined) {
				_this.userIsLogin = true;
			} else {
				_this.userIsLogin = false;
			}
			if (chosenRegion && chosenRegion.label != _this.chosenRegion.label) {
				_this.chosenRegion = chosenRegion;
				_this.getTransferShopInfo();
			}
		},
		// 页面加载完成
		onLoad() {
			let _this = this;

			_this.getCarousel();
			_this.getCurrentCity();
			_this.getTransferShopInfo();
			_this.getnearbyStoreList();

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getCarousel();
			this.getTransferShopInfo();
		}
	}
</script>

<style>
	@import url("index.css");
</style>
