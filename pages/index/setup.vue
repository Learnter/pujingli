<template>
	<view>
		<!-- 未登录状态 s -->
		<view class="weidulBox" v-if="!userIsLogin">
			<view class="weidulimg">
				<image src="../../static/images/zpzp_91.png" mode=""></image>
			</view>
			<view class="weidultxe">
				<navigator class="weidulBtn" url="../login/login">立即登录</navigator>
			</view>
		</view>
		<!-- 未登录状态 e -->
		<!-- 已登录状态 s -->
       <view class="ysetupTopBox" v-if="userIsLogin">
        	<view class="ysetupTop">
        		<view class="ysetupTopImg"><image :src="userInfo.head" mode=""></image></view>
        		<view class="ysetupToptx">
        			<view class="ysetupToptxmz">
						<text class="text_1">{{userInfo.username}}</text>
						<!-- <text class="text_2">开通VIP</text> -->
					</view>
        			<view class="ysetupToptxxj">
        				{{userInfo.mobile}}
        			</view>
        		</view>
        		<!-- <view class="ysetupTopcz" v-on:click="logout()">退出</view> -->
				<navigator url="../money/money_log" hover-class="none" style="padding-top: 21upx;padding-right: 20upx;">
					<view class="pjltxshu" style="color: #1AAD19;">{{moneyInfo.money || '0.00'}}</view>
					<view class="pjltxTx">我的余额</view>
				</navigator>
        	</view>
			<!-- <view class="uni-flex pjltxshuBox">
				<navigator url="../thdrawhe/thdrawye" hover-class="none" class="fx1">
					<view class="pjltxshu">2800.00</view>
					<view class="pjltxTx">我的余额</view>
				</navigator>								
				<navigator url="../thdrawhe/thdrawjf" hover-class="none" class="fx1">
					<view class="pjltxshu">900</view>
					<view class="pjltxTx">我的积分</view>
				</navigator>
			</view> -->
        </view>
		<!-- 已登录状态 e -->
		
		
		<view class="">
			<uni-list>
				<template v-if="userIsLogin">
					<navigator url="../release/release_list">
						<uni-list-item title="我的发布" thumb="../../static/images/zpzp_58.png"></uni-list-item>
					</navigator>
					<navigator url="../transfer_shop/collection_list">
						<uni-list-item title="我的收藏" thumb="../../static/images/zpzp_59.png"></uni-list-item>
					</navigator>
					<navigator url="../recommend/recommendma">
						<uni-list-item title="邀请码" thumb="../../static/images/zpzp_137.png"></uni-list-item>
					</navigator>
					<navigator url="../recommend/recommendlist">
						<uni-list-item title="邀请记录" thumb="../../static/images/zpzp_136.png"></uni-list-item>
					</navigator>
					<navigator url="../browse/browse_list">
						<uni-list-item title="浏览记录" thumb="../../static/images/zpzp_61.png"></uni-list-item>
					</navigator>
					<navigator url="../public/stay">
						<uni-list-item title="我的匹配" thumb="../../static/images/zpzp_62.png"></uni-list-item>
					</navigator>
					<navigator url="../user/myorder">
						<uni-list-item title="我的订单" thumb="../../static/images/zpzp_63.png"></uni-list-item>
					</navigator>
				</template>
				<template v-else>
					<navigator url="../login/login">
						<uni-list-item title="我的发布" thumb="../../static/images/zpzp_58.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="我的收藏" thumb="../../static/images/zpzp_59.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="邀请码" thumb="../../static/images/zpzp_137.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="邀请记录" thumb="../../static/images/zpzp_136.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="浏览记录" thumb="../../static/images/zpzp_61.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="我的匹配" thumb="../../static/images/zpzp_62.png"></uni-list-item>
					</navigator>
					<navigator url="../login/login">
						<uni-list-item title="我的订单" thumb="../../static/images/zpzp_63.png"></uni-list-item>
					</navigator>
				</template>
				<navigator url="../notice/notice_list">
					<uni-list-item title="系统公告" thumb="../../static/images/zpzp_96.png"></uni-list-item>
				</navigator>
				<navigator url="../help/help_list">
					<uni-list-item title="帮助与反馈" thumb="../../static/images/zpzp_64.png"></uni-list-item>
				</navigator>
				<view @click="callCustomerService">
					<uni-list-item :title="'联系客服:'+consumerHotline" thumb="../../static/images/tb_1.png"></uni-list-item>
				</view>			
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				userIsLogin: false,
				userInfo: {},
				consumerHotline: '',
				moneyInfo: []
			}
		},
		onShow() {
			let _this = this,
			userInfo = _this.$SysCache.get('app_user_info'),
			webConfig = _this.$SysCache.get('web_config');
			_this.consumerHotline = webConfig.web.web_tel_phone;
			if(userInfo != null && userInfo != '' && userInfo != undefined) {
				_this.userIsLogin = true;
				_this.userInfo = userInfo.userInfo;
				
				_this.getMoneyInfo();
			} else {
				_this.userIsLogin = false;
			}
		},
		onPullDownRefresh() {
			let _this = this;
			_this.getMoneyInfo();
		},
		methods: {
			logout() {
				let _this = this;
				_this.$SysCache.remove('app_user_info');
				uni.navigateTo({
					url:'../login/login'
				});
			},
			callCustomerService() {
				let _this = this;
				uni.makePhoneCall({
					phoneNumber: me.consumerHotline
				});
			},
			getMoneyInfo() {
				let _this = this;
				_this.$Request.get(_this.$api.user.getMoneyInfo).then(res => {
					if(res.code == 200) {
						_this.moneyInfo = res.data;
					}
					uni.stopPullDownRefresh();
				});
			}
		}
	}
</script>

<style>
	@import url("setup.css");
</style>
