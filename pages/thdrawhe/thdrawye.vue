<template>
	<view>
		<view class="thdrlistTop">
			<view class="thdrlisttx">当前余额</view>
			<view class="thdrlistshu">2800.00</view>
		</view>
		<view class="yisliebBox">
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">推荐用户</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhsh">20</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">推荐用户</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhsh">20</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">推荐用户</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhsh">20</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">推荐用户</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhsh">20</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
			<view class="thdrlist uni-flex">
				<view class="fx1">
					<view class="thdrlmc">提现</view>
					<view class="thdrltime">2019-10-14</view>
				</view>
				<view class="thdrlzhshjian">-50</view>
			</view>
		</view>
		
		<view class="thddbczBox">
			<view class="uni-flex thddbczhh">
				<view class="fx1 thddbtxanhz">
					<navigator url="woytxan" class="thddbtxan">我要提现</navigator>
				</view>
				<view class="fx1 thddbtxanhz">
					<navigator url="txanjl" class="thddbtxanjl">提现记录</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.thdrlistTop {
		background:#f9db8f;
		padding: 40upx 20upx;
		text-align: center;
	}
	.thdrlisttx {
		color: #666666;
		font-size:26upx;
	}
	.thdrlistshu {
		color:#f00000;
		font-size: 40upx;
	}
	.fx1 {
		-webkit-flex: 1;
		flex: 1;
	}
	.yisliebBox {
		padding: 10upx 20upx 100upx 20upx;
	}
	.thdrlist {
		padding: 20upx 0upx;
		border-bottom:2upx solid #f2f2f2;
	}
	.thdrltime {
		color: #888888;
		font-size: 24upx;
	}
	.thdrlzhsh {
		padding-top: 20upx;
		color: #48B72E;
		font-size: 30upx;
	}
	.thddbczBox {
		position: fixed;
		left: 0upx;
		bottom:0upx;
		width: 100%;
		z-index: 100;
	}
	.thddbczhh {
		padding: 10upx;
		background: #ffffff;
	}
	.thddbtxanhz {
		padding: 0upx 10upx;
	}
	.thddbtxan {
		height: 80upx;
		line-height: 80upx;
		color: #ffffff;
		text-align: center;
		width: 100%;
		background: #1AAD19;
		border-radius: 8upx;
	}
	.thddbtxanjl {
		height: 80upx;
		line-height: 80upx;
		color: #ffffff;
		text-align: center;
		width: 100%;
		background:#FBA51B;
		border-radius: 8upx;
	}
	.thdrlzhshjian {
		padding-top: 20upx;
		color: #f00000;
		font-size: 30upx;
	}
	
	
</style>
