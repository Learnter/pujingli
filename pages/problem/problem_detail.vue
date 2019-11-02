<template>
	<view>
		<view class="noticdataBox">
			<view class="text-box">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
			}
		},
		onLoad(e) {
			let _this = this,
				id = e.id;

			uni.showLoading({
				title: '正在加载'
			});
			_this.$Request.post(_this.$api.problem.getProblemDetail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					uni.setNavigationBarTitle({
						title: res.data.title
					});
					_this.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				}
			});
		},
	}
</script>

<style>
	@import url("problem_detail.css");
</style>
