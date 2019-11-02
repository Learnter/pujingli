<template>
	<view>
		<view class="posquBox">
			<form @submit="submitQuestion">
				<view class="uni-textarea">
					<textarea name="content" placeholder-style="color:#888888" :maxlength="50" placeholder="请输入您的问题, 不少于6个字" />
					</view>
				<button class="fasonAn" type="primary" form-type="submit">发送</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			// 提交发布
			submitQuestion(e) {
				var me = this;
				
				var content = e.detail.value.content;
				if(content.length < 6) {
					return uni.showToast({
						title: '问题不少于6个字',
						icon: 'none'
					});
				}
				uni.showLoading({
					title: '提交中'
				});
				me.$Request.post(me.$api.shopAsk.question, {
					content:content
				}).then(res => {
					uni.hideLoading();
					if(res.code == 200) {
						uni.navigateBack();
						
						return uni.showToast({
							title: '提交成功',
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
