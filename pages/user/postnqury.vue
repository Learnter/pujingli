<template>
	<view>
		<!-- <view class="potnqTopBox">
			<view class="potnqTopimg">
				<image src="../../static/images/zpzp_91.png" mode=""></image>
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
						<input class="uni-input" name='title' :value="userInfo.title" placeholder="请填写发布标题" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">姓名</view>
					<view class="potnqlistx">
						<input class="uni-input" name='username' :value="userInfo.username" placeholder="请填写您的称呼" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">联系电话</view>
					<view class="potnqlistx">
						<input class="uni-input" name='mobile' :value="userInfo.mobile" placeholder="请输入你的联系电话" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">期望区域</view>
					<view class="potnqlistx" @click="togglePopup('bottoma')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showRegionName}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>

				<uni-popup :show="type === 'bottoma'" position="bottom" mode="fixed" msg="您想在哪开店？(最多三个)" @hidePopup="togglePopup('')">
					<view class="dxxunatBox">
						<view class="dxxunButn" @click="confirmChoose(1)">确认</view>
						<view class="xunanNenr clearfix">
							<scroll-view scroll-y="true" class='xunanLeftBocx'>
								<view class="xunanLeft">
									<!-- <view class="xufltext">全部</view> -->
									<view class="xufltext" @click="regionChoose(1, item)" :class="item.id == district ? 'xufltextActive' : ''"
									 v-for="(item, index) in districtData" :key="index">{{item.name}}</view>
								</view>
							</scroll-view>
							<scroll-view scroll-y="true" class='xunanRightBox'>
								<view class="xunanRight" v-if="twonData[0]">
									<view class="xufltext" @click="regionChoose(2, item2)" :class="item2.is_choose ? 'xufltextActive' : ''" v-for="(item2, index2) in twonData"
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
					<view class="potnqlistl">计划经营</view>
					<view class="potnqlistx" @click="togglePopup('bottomb')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showCateName}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottomb'" position="bottom" mode="fixed" msg="行业" @hidePopup="togglePopup('')">
					<view class="dxxunatBox">
						<view class="dxxunButn" @click="confirmChoose(2)">确认</view>
						<view class="xunanNenr clearfix">
							<scroll-view scroll-y="true" class='xunanLeftBocx'>
								<view class="xunanLeft">
									<view class="xufltext" @click="cateChoose(1, item)" :class="item.id == topCateId ? 'xufltextActive' : ''"
									 v-for="(item,index) in industryCate" :key="index">{{item.name}}</view>
								</view>
							</scroll-view>
							<scroll-view scroll-y="true" class='xunanRightBox'>
								<view class="xunanRight" v-if="industryCateChild.length > 0">
									<view class="xufltext" @click="cateChoose(2, item)" :class="item.id == chooseCateInfo.id ? 'xufltextActive' : ''"
									 v-for="(item, index) in industryCateChild" :key="index">
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
				<view class="potnqlist">
					<view class="potnqlistl">商铺类型</view>
					<view class="potnqlistx" @click="togglePopup('bottomc')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showShopTypeName}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottomc'" position="bottom" mode="fixed" msg="您想看的商铺类型" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<view class="dxxunButn" @click="confirmChoose(3)">确认</view>
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in shopTypeData" :key="index">
								<view class="xunantext" @click="chooseShopType(item)" :class="chooseShopTypeInfo.id == item.id ? 'xunantextActive' : ''">{{item.name}}</view>
							</view>
						</view>
					</view>
				</uni-popup>
				<view class="potnqlist">
					<view class="potnqlistl">面积要求</view>
					<view class="potnqlistx" @click="togglePopup('bottomd')">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showAreaTitle}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottomd'" position="bottom" mode="fixed" msg="选择您的面积要求" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<view class="dxxunButn" @click="confirmChoose(4)">确认</view>
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in areaData" :key="index">
								<view class="xunantext" @click="areaChoose(item)" :class="item.id == choseeAreaInfo.id ? 'xunantextActive' : ''">{{item.title}}</view>
							</view>
						</view>
					</view>
				</uni-popup>
				<view class="potnqlist">
					<view class="potnqlistl">租金预算</view>
					<view class="potnqlistx" @click="togglePopup('bottome')" style="border:none;">
						<view class="znhometopshrtxz">
							<view class="znhometopshrwza">{{showRentTitle}}</view>
							<view class="znhomeico">
								<uni-icon type="arrowdown" color="#666666" size="18"></uni-icon>
							</view>
						</view>
					</view>
				</view>
				<uni-popup :show="type === 'bottome'" position="bottom" mode="fixed" msg="您的租金预算" @hidePopup="togglePopup('')">
					<view class="xunanCont">
						<view class="dxxunButn" @click="confirmChoose(5)">确认</view>
						<view class="xunantextBox clearfix">
							<view class="xunantexthe" v-for="(item,index) in rentData" :key="index">
								<view class="xunantext" @click="rentChoose(item)" :class="choseeRentInfo.id == item.id ? 'xunantextActive' : ''">{{item.title}}</view>
							</view>
						</view>
					</view>
				</uni-popup>
				<view class="uni-list">
					<view class="uni-list-cell uni-list-cell-pd" style="padding-left:0upx;">
						<view class="uni-list-cell-db">是否接受转让费</view>
						<switch @change="zfFeeChange" />
					</view>
				</view>
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
		topCateName = '';
	export default {
		data() {
			return {
				type: '',
				district: 0,
				twon: [],
				districtData: {},
				twonData: {},
				topCateId: 0,
				industryCate: [],
				industryCateChild: [],
				chooseCateInfo: {},
				showCateName: '请选择计划经营的行业',
				showShopTypeName: '档口/店铺/摊位',
				showAreaTitle: '请选择可接受的面积范围(㎡)',
				showRentTitle: '请选择可接受的租金范围',
				showRegionName: '不限',
				shopTypeData: [],
				chooseShopTypeInfo: {},
				choseeAreaInfo: {},
				areaData: [{
						id: 2,
						min: 0,
						max: 20,
						title: '20㎡以下'
					},
					{
						id: 3,
						min: 20,
						max: 50,
						title: '20-50㎡'
					},
					{
						id: 4,
						min: 50,
						max: 100,
						title: '50-100㎡'
					},
					{
						id: 5,
						min: 100,
						max: 200,
						title: '100-200㎡'
					},
					{
						id: 6,
						min: 200,
						max: 500,
						title: '200-500㎡'
					},
					{
						id: 7,
						min: 500,
						max: 0,
						title: '500㎡以上'
					}
				],
				rentData: [{
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
				choseeRentInfo: {},
				userInfo: {}
			}
		},
		components: {
			uniIcon,
			uniPopup
		},
		onLoad() {
			var me = this;
			uni.setNavigationBarTitle({
				title: '发布找店'
			});

			me.getRegionData();
		},

		methods: {
			getRegionData() {
				var me = this;
				uni.showLoading({
					title: '正在加载'
				});
				let chosenRegion = me.$SysCache.get('chosen_region');
				city = chosenRegion.value;
					
				me.$Request.get(me.$api.config.region, {
					city: city
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						webConfig = me.$SysCache.get('web_config'),
							region = res.data,
							me.districtData = region.child,
							me.industryCate = me.$util.objectConverArray(webConfig.transferShop.industryCate),
							me.industryCate.unshift({
								id: 0,
								name: '请选择',
								child: {}
							}),
							me.shopTypeData = webConfig.transferShop.shopType,
							me.userInfo = me.$SysCache.get('app_user_info'),
							me.userInfo = me.userInfo.userInfo;
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
			// 提交发布
			submitRelease(e) {
				var me = this,
					cate_id = (me.chooseCateInfo.id > 0 ? me.chooseCateInfo.id : me.topCateId),
					username = e.detail.value.username,
					mobile = e.detail.value.mobile,
					title = e.detail.value.title;

				if (title == '') {
					return uni.showToast({
						title: '请填写发布标题',
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
				if (cate_id == 0) {
					return uni.showToast({
						title: '请选择计划经营',
						duration: 2000,
						icon: 'none'
					});
				}
				if (me.chooseShopTypeInfo.id == undefined) {
					return uni.showToast({
						title: '请选择商铺类型',
						duration: 2000,
						icon: 'none'
					});
				}
				if (me.choseeAreaInfo.id == undefined) {
					return uni.showToast({
						title: '请选择店铺面积',
						duration: 2000,
						icon: 'none'
					});
				}
				if (me.choseeRentInfo.id == undefined) {
					return uni.showToast({
						title: '请选择租金预算',
						duration: 2000,
						icon: 'none'
					});
				}
				me.$Request.post(me.$api.transferShop.releaseSeeking, {
					title: title,
					username: username,
					mobile: mobile,
					city: city,
					district: me.district,
					twon: me.twon,
					cate_id: cate_id,
					shop_type: me.chooseShopTypeInfo.id,
					area_add: me.choseeAreaInfo.min,
					area_end: me.choseeAreaInfo.max,
					rent_add: me.choseeRentInfo.min,
					rent_end: me.choseeRentInfo.max,
					zr_fee: zr_fee,
				}).then(res => {
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
					// console.log(res);
				});
			},
			// 转让费开关
			zfFeeChange(e) {
				zr_fee = e.target.value;
			},
			// 行业选择
			cateChoose(type, cateInfo) {
				var me = this;
				me.chooseCateInfo = cateInfo;
				if (type == 1) {
					me.showCateName = cateInfo.name;
					me.topCateId = cateInfo.id;
					topCateName = cateInfo.name;
					if(cateInfo.child) {
						me.industryCateChild = me.$util.objectConverArray(cateInfo.child);
					} else {
						me.industryCateChild = [];
					}
				} else {
					if (cateInfo.id > 0) {
						me.showCateName = cateInfo.name;
					} else {
						me.showCateName = topCateName;
					}
				}
			},
			// 地区选择
			regionChoose(type, areaInfo) {
				var me = this;
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
						for (var i in twonData) {
							twonData[i].is_choose = false;
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
						me.twon = [0];
					} else {
						if (me.twon[0] == 0 || me.twon.length == 0) {
							me.twon = [];
						}
						var index = me.twon.indexOf(areaInfo.id);
						if (index > -1) {
							me.twon.splice(index, 1);
						} else {
							if (me.twon.length < 3) {
								me.twon.push(areaInfo.id);
							}
						}
						// me.twon.push(areaInfo.id);
						// console.log(me.twon);
						// console.log(me.twon[areaInfo.id]);
					}
					var twonData = me.twonData;
					for (var i in twonData) {
						if (me.twon.indexOf(twonData[i].id) > -1) {
							if (twonData[i].id != 0) {
								showRegionName.push(twonData[i].name);
							}
							twonData[i].is_choose = true;
						} else {
							twonData[i].is_choose = false;
						}
					}
					me.twonData = twonData;
				}
				// console.log(me.twonData);
				me.showRegionName = showRegionName.join(' / ');
			},
			// 商铺类型选择
			chooseShopType(shopTypeInfo) {
				var me = this;
				me.chooseShopTypeInfo = shopTypeInfo;
				me.showShopTypeName = shopTypeInfo.name;
			},
			// 面积选择
			areaChoose(areaInfo) {
				var me = this;
				me.choseeAreaInfo = areaInfo;
				me.showAreaTitle = areaInfo.title;
			},
			// 租金选择
			rentChoose(rentInfo) {
				var me = this;
				me.choseeRentInfo = rentInfo;
				me.showRentTitle = rentInfo.title;
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
	@import url("postnqury.css");
</style>
