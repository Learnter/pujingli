<template>
	<view>
		<div class="noticdataBox">
			<div class="noticdatatl">{{info.title}}</div>
			<view class="findcotime">— — {{info.add_time}}</view>
			<div class="noticdatacont">
				<view class="text-box">
					<rich-text :nodes="info.content"></rich-text>
				</view>
				<image :src="item.thumb" mode="widthFix"></image>
			</div>
			<navigator class="noticdshx" open-type="redirect" :url="'../notice/notice_detail?id='+info.prev_info.id" v-if="info.prev_info">
				<uni-icon type="arrowthinup" color="#333333" size="22"></uni-icon>
				<text>上一篇</text>
				<text class="text_1">{{info.prev_info.title}}</text>
			</navigator>
			<navigator class="noticdshx" open-type="redirect" :url="'../notice/notice_detail?id='+info.next_info.id" v-if="info.next_info">
				<uni-icon type="arrowthindown" color="#333333" size="22"></uni-icon>
				<text>下一篇</text>
				<text class="text_1">{{info.next_info.title}}</text>
			</navigator>
		</div>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.info.title
			}
		},
		components: {
			uniIcon
		},
		data() {
			return {
				info: {
					id: '',
					title: '',
					content: '',
					add_time: '',
					last: '',
					last_id: '',
					next: '',
					next_id: '',
				},
			}
		},
		onLoad(e) {
			let _this = this,
			id = e.id;

			uni.showLoading({
				title: '正在加载'
			});
			_this.$Request.post(_this.$api.NoticeList.getNoticeDetail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					_this.info = res.data;
					_this.info.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				}
			});
		},
	}
</script>

<style>
	@import url("notice_detail.css");
</style>
