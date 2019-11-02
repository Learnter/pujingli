<template>
	<view>
		<form @submit="release">
			<view class="feedbdf">
				<view class="feedbdftl">
					类型：
				</view>
				<view class="feedbdftx">
					<picker class="znhometopshrtxz" @change="bindPickerChange" :value="index" :range="messageType">
						<text class="znhometopshrwza">{{messageType[index]}}</text>
						<uni-icon type="arrowdown" color="#333333" size="22"></uni-icon>
					</picker>
				</view>
			</view>
			<view class="uni-textarea">
				<view class="unTextareaBox">
					<view class="unTextarea">
						<textarea placeholder-style="color:#888888" name="content" placeholder="请输入您宝贵的意见，我们会尽力改善..." />
						</view>	
					<view class="unTextaAnBox">
						<button class="mini-btn" type="primary" size="mini" form-type="submit">提交</button>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	let isAllowSubmit = true;
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				messageType: ['请选择类型'],
				index: 0
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			let _this = this,
			webConfig = _this.$SysCache.get('web_config');
			for(let i in webConfig.messageType) {
				_this.messageType.push(webConfig.messageType[i]);
			}
		},
		methods:{
			bindPickerChange: function(e) {
				let _this = this;
				_this.index = e.target.value
			},
			// 发布操作
			release(e) {
				let _this = this,
					type = _this.index;;
				if(isAllowSubmit) {
					if(type <= 0) {
						return uni.showToast({
							title: '请选择类型',
							duration: 2000,
							icon:'none'
						});
					}
					
					let content = e.detail.value.content;
					if(content == '') {
						return uni.showToast({
							title: '请输入你的意见',
							duration: 2000,
							icon:'none'
						});
					}

					isAllowSubmit = false;
					_this.$Request.post(_this.$api.userMessage.postMessage, {
						type: type,
						content: content
					}).then(res => {
						if(res.code == 200) {
							uni.switchTab({
								url:'../index/setup'
							});
							return uni.showToast({
								title: '感谢您的反馈',
								duration: 2000,
								icon:'none'
							});
						} else {
							_this.isAllowSubmit = true;
							return uni.showToast({
								title: res.msg,
								duration: 2000,
								icon:'none'
							});
						}
					});	
				}
			},
		}
	}
</script>

<style>
	@import url("zpfeedback.css");
</style>
