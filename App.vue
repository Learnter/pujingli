<script>
	export default {
		onLaunch: function(e) {
			var _this = this;

			_this.$SysCache.put('all_data_flow_play_video', false);
			// 部分配置需要从服务器加载
			_this.$Request.post(_this.$api.common.config).then((res) => {
				if (res.code == 200) {
					_this.$SysCache.put('web_config', res.data)
				}
			});
			let userInfo = _this.$SysCache.get('app_user_info');
			if (userInfo) {
				_this.$Request.post(_this.$api.user.getUserInfo).then((res) => {
					if (res.code == 200) {
						userInfo.userInfo = res.data;
						_this.$SysCache.put('app_user_info', userInfo)
					}
				});
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	page {
		background-color: #ffffff;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
		font-family: 'MicrosoftYaHei';
	}
	.clearfix::after {
		content: "";
		display: block;
		clear: both;
	}
	.wechbbbbimg {
		position: fixed;
		width:110upx;
		height:110upx;
		z-index: 10000;
		right:30upx;
		bottom:100upx;
		background: none;
		border:none;
		margin:0upx;
		padding:0upx;
	}
	.wechbbbbimg::after {
		border:none;
	}
	.wechbbbbimg image {
		width:100%;
		height:100%;
	}
</style>
