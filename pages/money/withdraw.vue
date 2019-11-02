<template>
	<view class="woytxformHe">
		<view class="woytxform">
			<form @submit="applyWithdraw">
				<view class="wodintle">开户银行</view>
				<view class="wodinput">
					<input type="text" name="opening_bank" placeholder="请输入开户银行"/>
				</view>
				<view class="wodintle">开户姓名</view>
				<view class="wodinput">
					<input type="text" name="bank_username" placeholder="请输入开户姓名"/>
				</view>
				<view class="wodintle">银行账号</view>
				<view class="wodinput">
					<input type="text" name="bank_account" placeholder="请输入银行账号"/>
				</view>
				<view class="wodintle">提现金额</view>
				<view class="wodinput">
					<input type="text" name="amount" placeholder="请输入提现金额"/>
				</view>
				<view class="wodbtnBox">
					<button form-type="submit" class="wodbtn">确认提现</button>		
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			applyWithdraw(e) {
				let _this = this
				,requestParams = {}
				,field = e.detail.value;
				if(field.opening_bank == '') {
					return uni.showToast({
						title: '请输入开户行',
						icon: 'none'
					});
				}
				if(field.bank_username == '') {
					return uni.showToast({
						title: '请输入开户姓名',
						icon: 'none'
					});
				}
				if(field.bank_account == '') {
					return uni.showToast({
						title: '请输入银行账号',
						icon: 'none'
					});
				}
				if(field.amount <= 0) {
					return uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					});
				}
				requestParams = field;
				
				_this.$Request.post(_this.$api.user.applyWithdrawal, requestParams).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
						    url: 'withdraw_log'
						});
						return uni.showToast({
							title: res.msg,
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
			}
		}
	}
</script>

<style>
	.woytxformHe {
		padding: 20upx;
	}
	.woytxform {
		box-shadow: 2upx 2upx 10upx #bbbbbb;
		padding: 30upx;
	}
	.wodintle {
		padding-top: 20upx;
	}
	.wodinput {
		padding-top: 20rpx;
	}
	.wodinput input {
		height: 76upx;
		line-height: 76upx;
		padding: 0upx 20upx;
		border:1px solid #eeeeee;
		border-radius: 6upx;		
	}
	.wodbtnBox {
		margin-top: 50upx;
	}
	.wodbtnBox .wodbtn {
		background: #1AAD19;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		color: #ffffff;
	}
	
</style>
