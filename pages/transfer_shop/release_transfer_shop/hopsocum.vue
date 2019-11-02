<template>
	<view>
		<view class="releabBox">
			 <!-- <view class="potnqTopBox">
				<view class="potnqTopimg">
					<image src="../../../static/images/zpzp_91.png" mode=""></image>
				</view>
				<view class="potnqTopTx">
					<view class="potnqTopTxtl">选址顾问-***</view>
					<view class="potnqTopTxtltx">“完善信息，会加快选址哦，开店速度提高3倍”</view>
				</view>
			 </view> -->
			 <view class="shgudelisttl">证件照片</view>
			 <view class="releaimaddBox clearfix">
				 <view class="" v-for="(item,index) in imgs" :key="index">
				 	<view class="releaimadlt" @click="uploadImg(item2.type, index2)" v-for="(item2,index2) in item" :key="index2">
				 		<view class="releaimadcont">
				 			<view class="releaimadcontimg">
				 				<image :src="item2.show_img ? item2.show_img : '../../../static/images/zpzp_76.png'" mode="">
				 					
				 				</image>
				 			</view>
				 			<view class="releaimadcontx">{{item2.title}}</view>
				 		</view>
				 	</view>
				 </view>
				<!-- <view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">营业执照</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">卫生许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">环评</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">餐饮许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">食品加工许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">食品流通许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">食品经营许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">香烟经营许可证</view>
					</view>
				</view>
				<view class="releaimadlt">
					<view class="releaimadcont">
						<view class="releaimadcontimg"><image src="../../../static/images/zpzp_76.png" mode=""></image></view>
						<view class="releaimadcontx">酒类经营许可证</view>
					</view>
				</view> -->
			 </view>
			 <view class="releaitianjaBox">
				<view class="releaitianja" @click="addMore"><text>添加更多证件照</text><uni-icon type="plusempty" color="#666666" size="20"></uni-icon></view>
			 </view>
			<view class="releaban">
				<button type="primary" @click="submitRelease">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	let uploadImages = [], transferShopInfo = [];
	export default {
		data() {
			return {
				imgs: {}
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			var me = this;
			var webConfig = me.$SysCache.get('web_config');
			me.imgs = webConfig.transferShop.paperworkType;
			transferShopInfo = me.$SysCache.get('draft_transfer_shop_info');
			console.log(transferShopInfo.paperwork_img);
			uploadImages = [];
			for(var i in transferShopInfo.paperwork_img) {
				for(var j in transferShopInfo.paperwork_img[i]) {
					var arr = {src:transferShopInfo.paperwork_img[i][j].img_url};
					if(uploadImages[i]) {
						uploadImages[i].push(arr);
					} else {
						uploadImages[i] = [arr];
					}
					if(me.imgs[i][j]) {
						me.imgs[i][j].show_img = transferShopInfo.paperwork_img[i][j].show_img_url;
					} else {
						me.imgs[i][j] = {type: i, title: transferShopInfo.paperwork_img[i][j].type_name, show_img: transferShopInfo.paperwork_img[i][j].show_img_url};
					}
				}
			}
			console.log(uploadImages);
		},
		methods: {	
			// 提交发布
			submitRelease(e) {
				// console.log(e);
				var me = this;
				if(uploadImages.length <= 0) {
					return uni.showToast({
						title: '请上传证件',
						duration: 2000,
						icon:'none'
					});
				}
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					type: 4,
					shop_img: uploadImages
				}).then(res => {
					// console.log(res);
					if(res.code == 200) {
						uni.navigateBack();
						
						return uni.showToast({
							title: '发布成功',
							duration: 2000,
							icon:'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon:'none'
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
					success: function (res) {
						// console.log(res);
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: '上传中'
						});
						me.$Request.upload(me.$api.uploadImage, tempFilePaths[0], 'transfer_shop_img', {
							name: 'transfer_shop_img',
							dir: 'user_transfere_shop_paperwork_type',
						}).then(res=>{
							uni.hideLoading();
							if(res.code == 200) {
								var tempImgs = me.imgs[type];
								me.imgs[type] = {};
								tempImgs[index].show_img = res.data.show_src;
								me.imgs[type] = tempImgs;
								var arr = {src:res.data.src};
								if(uploadImages[type]) {
									if(uploadImages[type][index]) {
										uploadImages[type][index] = arr;
									} else {
										uploadImages[type].push(arr);
									}
								} else {
									uploadImages[type] = [arr];
								}
								console.log(uploadImages);
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
			// 添加更多图片
			addMore() {
				var me = this;
				me.imgs[10].push({type:10, title: '其他照', show_img:''});
			}
		}
	}
</script>

<style>
	@import url("hopsocum.css");
</style>
