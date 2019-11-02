<template>
	<view class="woytxformHe">
		<view class="woytxform">
			<form @submit="" @reset="">
				<view class="wodintle">开户银行</view>
				<view class="wodinput">
					<input type="text" value="" placeholder="请输入开户银行"/>
				</view>
				<view class="wodintle">银行账号</view>
				<view class="wodinput">
					<input type="text" value="" placeholder="请输入银行账号"/>
				</view>
				<view class="wodintle">提现金额</view>
				<view class="wodinput">
					<input type="text" value="" placeholder="请输入提现金额"/>
				</view>
				<view class="wodbtnBox">
					<button form-type="submit" class="wodbtn">确认提现</button>		
				</view>		
			</form>
		</view>
	</view>
</template>

<script>
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
