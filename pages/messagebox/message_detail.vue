<template>
	<view>
		<view class="noticdataBox">
			<view class="findcotime">— — {{info.send_time}}</view>
			<view class="noticdatacont">
				<view class="text-box">
					<rich-text :nodes="info.message"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					message: '',
					send_time: ''
				},
			}
		},
		onLoad(e) {
			let _this = this,
				id = e.id;

			uni.showLoading({
				title: '正在加载'
			});
			_this.$Request.post(_this.$api.webNotice.noticeDetail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					res.data.message = res.data.message.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					_this.info = res.data;
				}
			});
		},
	}
</script>

<style>
	@import url("message_detail.css");
</style>
