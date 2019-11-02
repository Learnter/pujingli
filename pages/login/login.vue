<template>
	<view>
		<view class="potnqlistBox">
			<view class="shpfanlingBox">
				<image src="../../static/images/zpzp_92.png" mode=""></image>
			</view>
			<!-- <form @submit="login">
				<view class="potnqlist">
					<view class="potnqlistl">手机号：</view>
					<view class="potnqlistx">
						<input class="uni-input" @input="onKeyMobile" name="mobile" placeholder="手机号" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">验证码：</view>
					<view class="potnqlistx">
						<input class="uni-input" name="verify_code" placeholder="请输入验证码" />
						<view class="yanzmaAn" v-on:click="sendVerifyCode">{{sendVerifyCodeButtonName}}</view>
					</view>
				</view>
				<view class="potnsbBox">
					<button type="primary" form-type="submit">登录</button>
				</view>
			</form> -->
		</view>
		<view class="wchayiBox">
			<view class="wxinhdluBox">
				<button class="" type="primary" open-type="getUserInfo" @getuserinfo="wxLogin">
					微信号一键登录
				</button>
			</view>
			<!-- <view class="wchayianpai">
				<view class="wchayianpaizw"><view class="wchayianpaizwxx"></view></view>
				<button class="wchayianpaian" type="primary" open-type="getUserInfo" @getuserinfo="wxLogin">
					<image src="../../static/images/zpzp_90.png" mode=""></image>
				</button>
				<view class="wchayianpaizw"><view class="wchayianpaizwxx"></view></view>
			</view>
			<view class="wchayianpaiantx">微信一键登录</view> -->
		</view>

		<!-- 弹窗 测试提交 s -->
		<view class="wenxpopupBox" v-if="seen">
			<view class="wenxpopupCont">
				<view class="wenxpopuptl">提示</view>
				<view class="wenxpopuptex">请绑定手机号</view>
				<view class="wenxpopupCzbox">
					<view class="wenxpopupCz wenxpopupCzbd" v-on:click="cancelBind()">
						<button>取消绑定</button>
					</view>
					<view class="wenxpopupCz">
						<button class="bdBtn" open-type="getPhoneNumber" @getphonenumber="bindPhone">立即绑定</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 e -->

	</view>
</template>

<script>
	let locationPath = '',
		inviteCode = '',
		weChatUserInfo = {},
		mobile = '',
		isAllowSendVerifyCode = true;
	export default {
		data() {
			return {
				seen: false,
				sendVerifyCodeButtonName: '获取验证码'
			}
		},
		onLoad(e) {
			inviteCode = '';
			if(e.scene) {
				var value = this.$util.getUrlParams(decodeURIComponent(e.scene));
				if (value.code) {
					inviteCode = value.code;
				}
			}
			locationPath = e.path;
		},
		methods: {
			wxLoginRequest(code, iv, encryptedData, weChatUserInfo) {
				let _this = this;
				_this.$Request.post(_this.$api.login.weChatLogin, {
					code: code,
					iv: iv,
					'encryptedData': encryptedData,
					'sessionKey': _this.$SysCache.get('wx_session_key'),
					'weChatUserInfo': weChatUserInfo,
					inviteCode: inviteCode
				}).then(res => {
					if (res.code == 1106) {
						// me.weChatUserInfo = e.detail.userInfo;
						_this.seen = true;
					} else if (res.code == 1105) {
						_this.$SysCache.put('wx_session_key', false);
					} else if (res.code == 200) {
						_this.$SysCache.put("app_user_info", res.data, 864000);
						_this.$SysCache.put("wx_session_key", res.data.wx_session_key);
						if(inviteCode) {
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							if (locationPath) {
								uni.switchTab({
									url: '/' + locationPath
								})
							} else {
								uni.navigateBack();
								/* uni.reLaunch({
									url: '/pages/index/index'
								}); */
							}
						}
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
					// console.log(res);
				});
			},
			// 微信登陆
			wxLogin(e) {
				// console.log(e);
				let _this = this;
				if (e.detail.errMsg == 'getUserInfo:ok') {
					weChatUserInfo = e.detail.userInfo;
					uni.checkSession({
						complete: function(res) {
							// console.log(res);
							if (res.errMsg == 'checkSession:ok' && _this.$SysCache.get('wx_session_key')) {
								_this.wxLoginRequest('', e.detail.iv, e.detail.encryptedData);
							} else {
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										_this.wxLoginRequest(loginRes.code, e.detail.iv, e.detail.encryptedData);
									}
								});
							}
						}
					});
					/* uni.login({
						provider: 'weixin',
						success: function (loginRes) {
							// console.log(loginRes);
							me.$Request.post(me.$api.login.weChatLogin, {
								code: loginRes.code,
								iv: e.detail.iv,
								'encryptedData': e.detail.encryptedData
							}).then(res => {
								if(res.code == 1106) {
									me.weChatUserInfo = e.detail.userInfo;
									me.seen = true;
								} else if(res.code == 200) {
									me.$SysCache.put("app_user_info", res.data, 86400);
									me.$SysCache.put("wx_session_key", res.data.wx_session_key, 86400);
									uni.navigateBack();
								} else {
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon:'none'
									});
								}
								// console.log(res);
							});
						}
					}); */
				} else {
					uni.showToast({
						title: '微信登陆失败',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			// 取消微信手机绑定
			cancelBind() {
				let _this = this;
				_this.seen = false;
				uni.showToast({
					title: '取消手机授权',
					duration: 2000,
					icon: 'none'
				});
			},
			// 绑定微信手机号
			bindPhone(e) {
				let _this = this,
					wxSessionKey = _this.$SysCache.get('wx_session_key');
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							_this.wxLoginRequest(loginRes.code, e.detail.iv, e.detail.encryptedData, weChatUserInfo);
						}
					});
					/* uni.login({
						provider: 'weixin',
						success: function (loginRes) {
							// console.log(loginRes);
							me.$Request.post(me.$api.login.weChatLogin, {
								code: loginRes.code,
								iv: e.detail.iv,
								'encryptedData': e.detail.encryptedData,
								'weChatUserInfo': me.weChatUserInfo
							}).then(res => {
								if(res.code == 200) {
									me.seen = false;
									me.$SysCache.put("app_user_info", res.data, 86400);
									me.$SysCache.put("wx_session_key", res.data.wx_session_key, 86400);
									uni.navigateBack();
								} else {
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon:'none'
									});
								}
							});
						}
					}); */
				} else {
					uni.showToast({
						title: '取消手机授权',
						duration: 2000,
						icon: 'none'
					});
				}
				// console.log(e);
			}

		}
	}
</script>

<style>
	@import url("login.css");
</style>
