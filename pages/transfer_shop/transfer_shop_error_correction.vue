<template>
	<view>
        <view class="posquBox">
			<form @submit="submitRelease">
				<view class="uni-textarea">
					<textarea name="content" placeholder-style="color:#888888" placeholder="请输入纠错信息"/>
				</view>
				<button class="fasonAn" type="primary" form-type="submit">提交</button>
			</form>
		</view>
	</view>
</template>

<script>
	let id = 0;
	export default {
		data() {
			return {
				transferShopInfo: {}
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.title+'纠错'
			});
			id = e.id;
		},
		methods: {
			// 提交发布
			submitRelease(e) {
				var content = e.detail.value.content;
				if(content == '') {
					return uni.showToast({
						title: '请输入纠错信息',
						icon: 'none'
					});
				}
				var me = this;
				me.$Request.post(me.$api.transferShop.errorCorrection, {
					id: id,
					content: content
				}).then(res => {
					// console.log(res);
					if(res.code == 200) {
						uni.navigateBack();
						
						return uni.showModal({
							title: '温馨提示',
							content: '感谢您的反馈, 我们会尽快核实',
							showCancel: false,
							success() {
								uni.navigateBack();
							}
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
	page {
		background: #F6F6F6;
	}
	.posquBox {
		padding:30upx;
	}
	.posquBox .fasonAn {
		margin-top:40upx;
		background-color: #FBA81F;
	}

	
</style>
