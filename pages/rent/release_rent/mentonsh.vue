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
					<view class="potnredoutl">性别</view>
					<view class="potnqredou">
						<radio-group name="sex">
							<label>
								<radio value="1" :checked="transferShopInfo.sex == 1" />男
							</label>
							<label>
								<radio value="2" :checked="transferShopInfo.sex == 2" />女
							</label>
						</radio-group>
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">商铺点评</view>
					<view class="uni-textarea">
						<view class="unTextarea">
							<textarea name="content" :maxlength="-1" :value="transferShopInfo.content || ''" placeholder-style="color:#888888" placeholder="例：店铺精致装修，面积可观，位置居于市中心"/>
						</view>
					</view>				
				</view>
				<view class="potnsbBox">
					<button type="primary" form-type="submit">保存</button>
				</view>
			 </view>
		 </form>
	</view>
</template>

<script>
	let tjType = 0;
	export default {
		data() {
			return {
				transferShopInfo: {}
			}
		},
		onLoad(e) {
			tjType = e.type;
			var me = this;
			me.transferShopInfo = me.$SysCache.get('draft_transfer_shop_info');
		},
		methods: {
			// 提交发布
			submitRelease(e) {
				var sex = e.detail.value.sex;
				var content = e.detail.value.content;
				if(sex == '') {
					return uni.showToast({
						title: '请选择性别',
						icon: 'none'
					});
				}
				if(content == '') {
					return uni.showToast({
						title: '请输入点评内容',
						icon: 'none'
					});
				}
				var me = this;
				me.$Request.post(me.$api.transferShop.releaseTransferShop, {
					tjType: tjType,
					type: 3,
					sex: sex,
					content: content
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
			}
		}
	}
</script>

<style>
	@import url("mentonsh.css");
</style>
