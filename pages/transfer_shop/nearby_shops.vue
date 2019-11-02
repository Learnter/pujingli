<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap pagesbnm">
				<map style="width: 100%; height: 100%" id="nearby_shop_map_id" :latitude="latitude" :longitude="longitude" :markers="covers"
				 :show-location="true" :scale="scale" @markertap="markertap" @callouttap="callouttap" @regionchange="regionchange"
				 @end="regionchangeEnd" @begin="regionchangeBegin">
					<conver-view style="position: absolute;bottom: 30upx; left: 20upx;">
						<cover-image src="/static/images/current_location.png" class="img" @click="currentLocation"></cover-image>
						<cover-image src="/static/images/plus.png" class="img" @click="plusScale"></cover-image>
						<cover-image src="/static/images/less.png" class="img" @click="lessScale"></cover-image>
					</conver-view>
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	let mapObj = {};
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					id: 1,
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/images/location.png',
					callout: {
						content: '房源基本信息:\n全新单一层12米高滴水\n地址:北栅\n(提示点击信息可查看详情)',
						padding: 10,
						color: 'red',
						display: 'BYCLICK',
						textAlign: 'left'
					}
				}, {
					id: 2,
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '/static/images/location.png',
					callout: {
						content: '房源基本信息:\n全新单一层13米高滴水\n地址:北栅\n(提示点击信息可查看详情)',
						padding: 10,
						color: 'red',
						display: 'BYCLICK',
						textAlign: 'left'
					}
				}],
				scale: 16
			}
		},
		mounted() {
			mapObj = uni.createMapContext('nearby_shop_map_id')
		},
		onLoad(e) {
			let _this = this;

			_this.currentLocation();
			
			_this.getTransferShopInfo(e.longitude, e.latitude, _this.scale);
		},
		methods: {
			// 定位当前
			currentLocation() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						_this.longitude = res.longitude,
							_this.latitude = res.latitude;
						// me.getTransferShopInfo(me.longitude, me.latitude, me.scale);
						mapObj.moveToLocation();
					},
					complete: function(e) {
						// console.log(e);
					}
				});
			},
			plusScale() {
				let _this = this;
				if (_this.scale < 19) {
					_this.scale += 1;
					// me.getTransferShopInfo(me.longitude, me.latitude, me.scale);
				}
			},
			lessScale() {
				let _this = this;
				if (_this.scale > 4) {
					_this.scale -= 1;
					// me.getTransferShopInfo(me.longitude, me.latitude, me.scale);
				}
			},
			getTransferShopInfo(longitude, latitude, scale) {
				let _this = this;
				uni.showLoading({
					title: '获取坐标数据'
				});
				_this.$Request.get(_this.$api.transferShop.getNearbyStores, {
					latitude: latitude,
					longitude: longitude,
					scale: scale
				}).then(res => {
					let covers = []
					,info = [];
					for (let i in res.data) {
						info = res.data[i];
						covers.push({
							id: info.id,
							latitude: info.latitude,
							longitude: info.longitude,
							iconPath: '/static/images/location.png',
							callout: {
								content: '转让基本信息:\n面积: ' + info.shop_area + '㎡\n租金: ' + info.unit_month_price + '\n地址: ' + info.district +
									info.twon + '\n(提示点击信息可查看详情)',
								padding: 10,
								display: 'BYCLICK',
								textAlign: 'left'
							}
						});
					}
					_this.covers = covers;
					uni.hideLoading();
					// console.log(res);
				});
			},
			markertap(e) {
				// console.log(e);
			},
			callouttap(e) {
				// console.log(e);
				uni.navigateTo({
					url: 'transfer_shop_detail?id=' + e.markerId
				})
			},
			regionchange(e) {
				// console.log(e);
			},
			regionchangeBegin(e) {
				// console.log(e);
			},
			showCenter() {
				let _this = this;
				mapObj.getCenterLocation({
					success(res) {
						mapObj.getScale({
							success(res2) {
								_this.scale = res2.scale;
								_this.getTransferShopInfo(res.longitude, res.latitude, res2.scale);
								// console.log(res2);
							}
						})
						// console.log(res);
					}
				})
			},
			regionchangeEnd(e) {
				this.showCenter();
			}
		}
	}
</script>

<style>
	.pagesbnm {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.img {
		width: 40upx;
		height: 40upx;
		margin: 30upx;
	}
</style>
[
