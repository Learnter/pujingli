<template>
	<view>
		<view class="demo">
			<ss-select-city :hotCitys="hotCitys" :citys="citys" :currentCity="currentCity" :current="value" @on-select="onSelect"></ss-select-city>
		</view>
	</view>
</template>

<script>
	import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue';
	import amap from '../../common/amap-wx.js';
	export default {
		data() {
			return {
				// hotCitys: ['杭州', '天津', '北京', '上海', '深圳', '广州', '成都', '重庆', '厦门'],
				value: '北京市',
				citys: [],
				currentCity: ''
			}
		},
		components: {
			ssSelectCity
		},
		onLoad() {
			let _this = this;

			_this.getCityData();

			_this.getCurrentCity();
		},
		methods: {
			// 获取当前地址
			getCurrentCity() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						var amapPlugin = new amap.AMapWX({
							key: '4c90b941dca75e686d95a4f05aea48c2'
						}); 
						amapPlugin.getRegeo({
							success: (data) => {
                console.log(data);
								_this.currentCity = data[0].regeocodeData.addressComponent.city;
								// console.log(data)
							},
							error: (res) => {
								// console.log(res);
							}
						});
					}
				})
			},
			// 获取地址信息
			getCityData() {
				let _this = this;
				_this.$Request.get(_this.$api.config.getSortCityData).then(res => {
					if (res.code == 200) {
						let chosenRegion = _this.$SysCache.get('chosen_region');
						_this.value = chosenRegion.label;
						let sortCity = res.data,
							citys = [];

						_this.citys = [];
						let arr = [];
						for (let item in sortCity) {
							arr = {
								letter: item,
								list: []
							};
							for (var item2 in sortCity[item]) {
								arr.list.push(sortCity[item][item2].label);
							}
							citys.push(arr);
						}
						_this.citys = citys;
					}
				});
			},
			onSelect(city) {
				let _this = this;
				_this.value = city;
				uni.showLoading({
					title: '正在切换'
				});
				_this.$Request.get(_this.$api.config.getCurrentCityData, {
					city: city,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						_this.$SysCache.put('chosen_region', res.data);
						uni.navigateBack();
					} else {
						return uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
