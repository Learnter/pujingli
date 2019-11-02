<template>
	<view>
		<view class="releabBox">
			<view class="hotoTitle">
				<view class="hotoTitletl">店铺照片</view>
				<view class="hotoTitletx">提示：请至少上传一张正面照，图片越多可提高转出速度</view>
			</view>
			<view class="releaimaddBox clearfix">
				<view class="" v-for="(item,index) in imgs" :key="index">
					<view class="releaimadlt" v-for="(item2,index2) in item" :key="index2">
						<!-- <view class="releaimadlt" @click="uploadImg(item2.type, index2)" v-for="(item2,index2) in item" :key="index2"> -->
						<view class="releaimadcont">
							<view class="relecle" v-if="item2.is_close !== false">
								<uni-icon class="i" type="closeempty" color="#ffffff" size="18" @click="delImg(item2.type, index2)"></uni-icon>
							</view>
							<view class="releaimadcontimg" @click="uploadImg(item2.type, index2)">
								<image :src="item2.show_img ? item2.show_img : '../../../static/images/zpzp_76.png'" mode="">
								</image>
								{{item2.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="releaitianjaBox">
				<view class="releaitianja" @click="uploadMoreImg"><text>添加更多图片</text>
					<uni-icon type="plusempty" color="#666666" size="20"></uni-icon>
				</view>
			</view>
			<view class="guideAnBox">
				<view class="guideAn" @click="goguidean()">拍摄指南</view>
			</view>
			<view class="releaban">
				<button type="primary" @click="submitRelease">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	let uploadImages = [],
		transferShopInfo = [],
		tjType = 0;
	export default {
		data() {
			return {
				imgs: {
					1: [{
						type: 1,
						title: '正面照',
						show_img: '',
						is_close: false
					}, ],
					2: [{
						type: 2,
						title: '左侧照',
						show_img: '',
						is_close: false
					}, ],
					3: [{
						type: 3,
						title: '右侧照',
						show_img: '',
						is_close: false
					}, ],
					4: []
				}
			}
		},
		components: {
			uniIcon
		},
		onLoad(e) {
			var me = this,
				imgs = me.imgs;
			tjType = e.type;
			uploadImages = [];

			transferShopInfo = me.$SysCache.get('draft_transfer_shop_info');
			for (var i in transferShopInfo.shop_img) {
				for (var j in transferShopInfo.shop_img[i]) {
					var arr = {
						src: transferShopInfo.shop_img[i][j].img_url
					};
					if (uploadImages[i]) {
						uploadImages[i].push(arr);
					} else {
						uploadImages[i] = [arr];
					}
					if (imgs[i][j]) {
						imgs[i][j].show_img = transferShopInfo.shop_img[i][j].show_img_url;
					} else {
						imgs[i][j] = {
							type: i,
							title: transferShopInfo.shop_img[i][j].type_name,
							show_img: transferShopInfo.shop_img[i][j].show_img_url
						};
					}
				}
			}
			me.imgs = [];
			me.imgs = imgs;
			console.log(uploadImages);
			console.log(me.imgs);
			// console.log(uploadImages);
		},
		methods: {
			// 页面跳转
			goguidean() {
				uni.navigateTo({
					url: 'shguide'
				});
				return false;
			},
			// 提交发布
			submitRelease(e) {
				// console.log(e);
				var me = this;
				if (uploadImages.length == 0) {
					return uni.showToast({
						title: '请上传店铺照',
						duration: 2000,
						icon: 'none'
					});
				}
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					tjType: tjType,
					type: 2,
					shop_img: uploadImages
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
			// 上传图片
			uploadImg(type, index) {
				var me = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed '], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function(res) {
						// console.log(res);
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: '上传中'
						});
						me.$Request.upload(me.$api.uploadImage, tempFilePaths[0], 'transfer_shop_img', {
							name: 'transfer_shop_img',
							dir: 'user_transfere_shop',
						}).then(res => {
							uni.hideLoading();
							if (res.code == 200) {
								var tempImgs = me.imgs[type];
								me.imgs[type] = {};
								tempImgs[index].show_img = res.data.show_src;
								me.imgs[type] = tempImgs;
								// me.imgs[type][index] = {};
								// me.imgs[type][index] = {title: me.imgs[type][index].title, type: me.imgs[type][index].type, show_img:res.data.src};
								// me.imgs[type].$set(index, {src:res.data.src});
								var arr = {
									src: res.data.src
								};
								if (uploadImages[type]) {
									if (uploadImages[type][index]) {
										uploadImages[type][index] = arr;
									} else {
										uploadImages[type].push(arr);
									}
								} else {
									uploadImages[type] = [arr];
								}
							} else {
								return uni.showToast({
									icon: 'none',
									title: res.msg
								});
							}
						});
					}
				});
			},
			// 删除店铺照
			delImg(type, index) {
				console.log(index);
				console.log(uploadImages);
				var me = this,
					imgs = me.imgs;
				console.log(imgs);
				uploadImages[type].splice(index, 1);
				imgs[type].splice(index, 1);
				me.imgs = [];
				me.imgs = imgs;
			},
			// 上传多店铺照
			uploadMoreImg() {
				var me = this;
				var type = 4,
					index = me.imgs[type].length - 1;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['compressed '], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function(res) {
						// console.log(res);
						const tempFilePaths = res.tempFilePaths;
						for (var i in tempFilePaths) {
							uni.showLoading({
								title: '上传中'
							});
							me.$Request.upload(me.$api.uploadImage, tempFilePaths[i], 'transfer_shop_img', {
								name: 'transfer_shop_img',
								dir: 'user_transfere_shop',
							}).then(res => {
								uni.hideLoading();
								if (res.code == 200) {
									index += 1;
									var tempImgs = me.imgs[type];
									me.imgs[type] = {};
									tempImgs[index] = {};
									tempImgs[index].show_img = res.data.show_src;
									tempImgs[index].type = type;
									tempImgs[index].title = '其他照';
									me.imgs[type] = tempImgs;
									// me.imgs[type][index] = {};
									// me.imgs[type][index] = {title: me.imgs[type][index].title, type: me.imgs[type][index].type, show_img:res.data.src};
									// me.imgs[type].$set(index, {src:res.data.src});
									var arr = {
										src: res.data.src
									};
									if (uploadImages[type]) {
										if (uploadImages[type][index]) {
											uploadImages[type][index] = arr;
										} else {
											uploadImages[type].push(arr);
										}
									} else {
										uploadImages[type] = [arr];
									}
								} else {
									return uni.showToast({
										icon: 'none',
										title: res.msg
									});
								}
							});
						}
					}
				});
			},
			// 添加更多图片
			addMore() {
				var me = this;
				me.imgs[4].push({
					type: 4,
					title: '其他照',
					show_img: ''
				});
			}
		}
	}
</script>

<style>
	@import url("hotohop.css");
</style>
