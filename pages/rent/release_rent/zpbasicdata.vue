<template>
	<view>
		<!-- <view class="potnqTopBox">
			<view class="potnqTopimg">
				<image src="../../../static/images/zpzp_91.png" mode=""></image>
			</view>
			<view class="potnqTopTx">
				<view class="potnqTopTxtl">选址顾问-***</view>
				<view class="potnqTopTxtltx">“完善信息，会加快选址哦，开店速度提高3倍”</view>
			</view>
		 </view> -->
		<form @submit="submitRelease">
			<view class="potnqlistBox">
				<view class="potnqlist">
					<view class="potnqlistl">标题</view>
					<view class="potnqlistx">
						<input class="uni-input" name='title' :value="transferShopInfo.title" placeholder="请填写发布标题" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">姓名</view>
					<view class="potnqlistx">
						<input class="uni-input" name='username' :value="transferShopInfo.username || userInfo.username" placeholder="请填写您的称呼" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">联系电话</view>
					<view class="potnqlistx">
						<input class="uni-input" name='mobile' :value="transferShopInfo.mobile || userInfo.mobile" placeholder="请输入你的联系电话" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">区域</view>
					<view class="potnqlistx" @click="togglePopup('bottomb')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showRegionName}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottomb'" position="bottom" mode="fixed" msg="您的铺面所在区域" @hidePopup="togglePopup('')">
					<view class="dxxunatBox">
						<view class="dxxunButn" @click="confirmChoose(2)">确认</view>
						<view class="xunanNenr clearfix">
							<scroll-view scroll-y="true" class='xunanLeftBocx'>
								<view class="xunanLeft">
									<!-- <view class="xufltext">全部</view> -->
									<view class="xufltext" @click="regionChoose(1, item)" :class="item.id == district ? 'xufltextActive' : ''"
									 v-for="(item, index) in districtData" :key="index" v-if="item.id > 0">{{item.name}}</view>
								</view>
							</scroll-view>
							<scroll-view scroll-y="true" class='xunanRightBox'>
								<view class="xunanRight" v-if="twonData[0]">
									<view class="xufltext" @click="regionChoose(2, item2)" :class="item2.id == twon ? 'xufltextActive' : ''" v-for="(item2, index2) in twonData"
									 :key="index2">
										<text>{{item2.name}}</text>
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

				<view class="potnqlist">
					<view class="potnqlistl">地址</view>
					<view class="potnqlistx">
						<input class="uni-input" name='address' :value="transferShopInfo.address" placeholder="不少于5个字" />
					</view>
				</view>
				<view class="potnqlist" @click="openMapChoose">
					<view class="potnqlistl">地图定位</view>
					<view class="potnqlistx">
						<view>{{showChooseLocationContent}}</view>
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">面积</view>
					<view class="potnqlistx">
						<input class="uni-input" type="number" name='shop_area' :value="transferShopInfo.shop_area" placeholder="请输入您商铺的使用面积" />
					</view>
					<view class="potnqlistright">㎡</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">月租金</view>
					<view class="potnqlistx">
						<input class="uni-input" type="number" name='month_price' :value="transferShopInfo.month_price" placeholder="请输入您商铺的月租金" />
					</view>
					<view class="potnqlistright">元/月</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">免租期</view>
					<view class="potnqlistx" @click="togglePopup('bottomc')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showRentFreePeriodTitle}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottomc'" position="bottom" mode="fixed" msg="请选择免除对方租期时间" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<view class="dxxunButn" @click="confirmChoose(3)">确认</view>
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in rentFreePeriodData" :key="index">
								<view class="xunantext" @click="chooseRentFreePeriod(item)" :class="item.id == chooseRentFreePeriodInfo.id ? 'xunantextActive' : ''">{{item.title}}</view>
							</view>
						</view>
					</view>
				</uni-popup>

				<!--<view class="potnqlist">
					<view class="potnqlistl">转让费</view>
					<view class="potnqlistx" style="border:none;">
						<input class="uni-input" type="number" name="transfer_price" :value="transferShopInfo.transfer_price ? transferShopInfo.transfer_price / 10000 : ''" placeholder="请输入您的转让费" />
					</view>
					<view class="potnqlistright">万元</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell uni-list-cell-pd" style="padding-left:0upx;">
						<view class="uni-list-cell-db">展示为面议?</view>
						<switch @change="transferPriceIsFaceChange" :checked="transferPriceIsFace" />
					</view>
				</view>-->
				<view class="potnsbBox">
					<button type="primary" form-type="submit">发布</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	let webConfig = {},
		chosenRegion = {},
		region = {},
		showRegionName = '',
		zr_fee = false,
		city = 0,
		tjType = 0;
	export default {
		data() {
			return {
				type: '',
				district: 0,
				twon: 0,
				city: 0,
				districtData: {},
				twonData: {},
				showCateName: '请选择当前经营的行业',
				showRegionName: '您的铺面所在区域',
				showRentFreePeriodTitle: '租期限免',
				rentFreePeriodData: [{
						id: 1,
						day: 0,
						title: '不免'
					},
					{
						id: 2,
						day: 1,
						title: '1月'
					},
					{
						id: 3,
						day: 3,
						title: '3月'
					},
					{
						id: 4,
						day: 6,
						title: '6月'
					},
					{
						id: 5,
						day: 12,
						title: '12月'
					}
				],
				chooseRentFreePeriodInfo: {},
				transferPriceIsFace: false,
				transferShopInfo: {},
				showChooseLocationContent: '',
				chooseLocationInfo: {},
				userInfo: {}
			}
		},
		components: {
			uniIcon,
			uniPopup
		},

		onLoad(e) {
			var me = this;
			tjType = e.type;

			me.getRegionData();
			// var chosedRegion = [];
			// 
			// webConfig = me.$SysCache.get('web_config'),
			// chosenRegion = me.$SysCache.get('chosen_region'),
			// me.transferShopInfo = me.$SysCache.get('draft_transfer_shop_info'),
			// me.userInfo = me.$SysCache.get('app_user_info'),
			// me.userInfo = me.userInfo.userInfo,
			// 
			// city = chosenRegion.value,
			// region = webConfig.region[city],
			// me.districtData = region.child;
			// if(me.transferShopInfo.city != undefined && me.transferShopInfo.city > 0) {
			// 	chosedRegion = webConfig.region[me.transferShopInfo.city];
			// 	// console.log(chosedRegion);
			// 	me.showRegionName = chosedRegion.name+'-'+(chosedRegion.child[me.transferShopInfo.district].name)+(me.transferShopInfo.twon > 0 ? '-'+chosedRegion.child[me.transferShopInfo.district].child[me.transferShopInfo.twon].name : '');
			// 	
			// 	me.district = me.transferShopInfo.district,
			// 	me.twon = me.transferShopInfo.twon;
			// 	me.twonData = me.districtData[me.transferShopInfo.district].child;
			// 	me.transferPriceIsFace = me.transferShopInfo.transfer_price_is_face == 1 ? true : false;
			// 	
			// 	for(var i in me.rentFreePeriodData) {
			// 		if(me.rentFreePeriodData[i].day == me.transferShopInfo.rent_free_period) {
			// 			me.chooseRentFreePeriodInfo = me.rentFreePeriodData[i];
			// 			me.showRentFreePeriodTitle = me.chooseRentFreePeriodInfo.title;
			// 			break;
			// 		}
			// 	}
			// }
			// if(me.transferShopInfo.longitude != undefined && me.transferShopInfo.longitude > 0) {
			// 	me.showChooseLocationContent = '纬度: '+me.transferShopInfo.latitude+' 经度: '+me.transferShopInfo.longitude;
			// 	me.chooseLocationInfo = {
			// 		name: me.transferShopInfo.choose_location_name,
			// 		address: me.transferShopInfo.choose_location_address,
			// 		latitude: me.transferShopInfo.latitude,
			// 		longitude: me.transferShopInfo.longitude
			// 	};
			// }

			// console.log(me.twon)
		},
		methods: {
			setCity() {
				let chosenRegion = this.$SysCache.get('chosen_region');
				this.city = chosenRegion.value;
			},
			getRegionData() {
				var me = this;
				uni.showLoading({
					title: '正在加载'
				});
				me.setCity();
				me.$Request.get(me.$api.config.region, {
					city: me.city
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var chosedRegion = [];

						webConfig = me.$SysCache.get('web_config'),
							me.transferShopInfo = me.$SysCache.get('draft_transfer_shop_info'),
							me.userInfo = me.$SysCache.get('app_user_info'),
							me.userInfo = me.userInfo.userInfo,

							me.industryCate = me.$util.objectConverArray(webConfig.transferShop.industryCate),
							me.industryCate.unshift({
								id: 0,
								name: '请选择',
								child: {}
							}),
							region = res.data,
							me.districtData = region.child;
						if(me.transferShopInfo.length > 0) {
							if (me.transferShopInfo.city.id != undefined && me.transferShopInfo.city.id > 0) {
								// chosedRegion = res.data[me.transferShopInfo.city];
								// console.log(chosedRegion);
								me.showRegionName = me.transferShopInfo.city.name + '-' + (me.transferShopInfo.district.name) + '-' + (me.transferShopInfo
									.twon.name || '');
							
								me.city = me.transferShopInfo.city.id,
									me.district = me.transferShopInfo.district.id,
									me.twon = me.transferShopInfo.twon.id;
								me.twonData = me.districtData[me.transferShopInfo.district.id] ? me.districtData[me.transferShopInfo.district.id]
									.child : [];
							
								for (var i in me.rentFreePeriodData) {
									if (me.rentFreePeriodData[i].title == me.transferShopInfo.rent_free_period) {
										me.chooseRentFreePeriodInfo = me.rentFreePeriodData[i];
										me.showRentFreePeriodTitle = me.chooseRentFreePeriodInfo.title;
										break;
									}
								}
							}
							if (me.transferShopInfo.longitude != undefined && me.transferShopInfo.longitude > 0) {
								me.showChooseLocationContent = '纬度: ' + me.transferShopInfo.latitude + ' 经度: ' + me.transferShopInfo.longitude;
								me.chooseLocationInfo = {
									name: me.transferShopInfo.choose_location_name,
									address: me.transferShopInfo.choose_location_address,
									latitude: me.transferShopInfo.latitude,
									longitude: me.transferShopInfo.longitude
								};
							}
						}
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
			// 地图选择
			openMapChoose() {
				var me = this;
				uni.chooseLocation({
					success: function(res) {
						me.showChooseLocationContent = '纬度: ' + res.latitude + ' 经度: ' + res.longitude;
						me.chooseLocationInfo = {
							name: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude
						};
						// console.log(res);
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
					}
				});
			},
			// 提交发布
			submitRelease(e) {
				// console.log(e);
				var me = this;

				var address = e.detail.value.address,
					month_price = e.detail.value.month_price,
					shop_area = e.detail.value.shop_area,
					username = e.detail.value.username,
					mobile = e.detail.value.mobile,
					title = e.detail.value.title;

				if (title == '') {
					return uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
				}
				if (username == '') {
					return uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					});
				}
				if (mobile == '') {
					return uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					});
				}
				if (me.district <= 0) {
					return uni.showToast({
						title: '请选择店铺所在位置',
						duration: 2000,
						icon: 'none'
					});
				}
				if (address == '') {
					return uni.showToast({
						title: '请输入详细地址',
						duration: 2000,
						icon: 'none'
					});
				} else if (address.length < 5) {
					return uni.showToast({
						title: '详细地址过短',
						duration: 2000,
						icon: 'none'
					});
				}
				if (me.chooseLocationInfo.latitude == undefined || me.chooseLocationInfo.latitude == '' || me.chooseLocationInfo.latitude <=
					0) {
					return uni.showToast({
						title: '请选择定位',
						duration: 2000,
						icon: 'none'
					});
				}
				if (shop_area <= 0 || shop_area == '') {
					return uni.showToast({
						title: '请输入面积',
						duration: 2000,
						icon: 'none'
					});
				}
				if (month_price <= 0 || month_price == '') {
					return uni.showToast({
						title: '请输入月租金',
						duration: 2000,
						icon: 'none'
					});
				}
				if (me.chooseRentFreePeriodInfo.id == undefined) {
					return uni.showToast({
						title: '请选择免租期',
						duration: 2000,
						icon: 'none'
					});
				}
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					tjType: tjType,
					type: 1,
					title: title,
					username: username,
					mobile: mobile,
					city: me.city,
					district: me.district,
					twon: me.twon,
					address: address,
					shop_area: shop_area,
					month_price: month_price,
					rentFreePeriod: me.chooseRentFreePeriodInfo.day,
					chooseLocationInfo: me.chooseLocationInfo
				}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						uni.navigateBack();

						return uni.showToast({
							title: '发布成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			// 地区选择
			regionChoose(type, areaInfo) {
				var me = this;
				me.setCity();
				// console.log(areaInfo);
				if (type == 1) {
					if (areaInfo.id != me.district) {
						me.twonData = {};
						showRegionName = [];
						showRegionName = [areaInfo.name];
						me.twon = [];
						var twonData = {};
						if (areaInfo.id > 0) {
							twonData = areaInfo['child'];
						}
						setTimeout(function() {
							me.twonData = twonData;
						}, 100);
					}
					me.district = areaInfo.id;
				} else {
					showRegionName = [];
					if (areaInfo.id == 0) {
						showRegionName = [me.districtData[me.district].name];
						me.twon = 0;
					} else {
						me.twon = areaInfo.id;
						// me.twon.push(areaInfo.id);
						// console.log(me.twon);
						// console.log(me.twon[areaInfo.id]);
					}
				}
				// console.log(me.twonData);
				me.showRegionName = region.name + '-' + (me.districtData[me.district].name) + (me.twon > 0 ? '-' + me.twonData[me.twon]
					.name : '');
			},
			// 租期限免选择
			chooseRentFreePeriod(rentFreePeriodInfo) {
				var me = this;
				me.chooseRentFreePeriodInfo = rentFreePeriodInfo;
				me.showRentFreePeriodTitle = rentFreePeriodInfo.title;
			},
			// 切换转让费面议状态
			transferPriceIsFaceChange(e) {
				var me = this;
				me.transferPriceIsFace = e.target.value;
			},
			// 确认选择
			confirmChoose(type) {
				var me = this;
				me.type = 'hide';
			}
		}

	}
</script>

<style>
	@import url("zpbasicdata.css");
</style>
