<template>
	<view>
		<view class="qudataTop">
			<view class="qudataToptl">{{info.content}}</view>
			<view>
				<view class="qudatatpleb" v-for="(item,index) in info.tag_info" :key="index">{{item.name}}</view>
			</view>
			<view class="qudataTophgdBox">
				<view class="qudataToshu">{{info.answer_num || 0}}个回答</view>
				<view class="qudataTofen" v-if="answer_type == 1">
					<text class="textActive">热门</text>
					<text @click="answerTypeClick(2)">最新</text>
				</view>
				<view class="qudataTofen" v-else>
					<text @click="answerTypeClick(1)">热门</text>
					<text class="textActive">最新</text>
				</view>
			</view>
		</view>
		<view class="qudataCont" v-for="(item,index) in info.answer_info" :key="index">
			<view class="qudataContl">
				<view class="qudataContltl">{{item.username}}</view>
				<view class="qudataContldzanBox">
					<view class="qudataContldzan" v-if="item.is_laud">
						<text>{{item.laud_num}}</text>
						<image src="../../static/images/zpzp_107.png" mode=""></image>
					</view>
					<view class="qudataContldzan" v-else>
						<text>{{item.laud_num}}</text>
						<image src="../../static/images/zpzp_106.png" @click="laud(item.id)" mode=""></image>
					</view>	
				</view>
			</view>
			<view class="qudataContltext">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	let id = 0;
	export default {
		data(){
			return {
				info:{
					content: ''
				},
				answer_type: 1
			}
		},
		onLoad(e) {
			id = e.id;
		
			this.getProblemDetail();
		},
		methods: {
			getProblemDetail() {
				uni.showLoading({
					title: '正在加载'
				});
				var me = this;
				me.$Request.post(me.$api.shopAsk.problemDetail, {
					id: id,
					answer_type: me.answer_type
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.info = res.data;
					}
				});
			},
			answerTypeClick(type) {
				var me = this;
				me.answer_type = type;
				
				me.getProblemDetail();
			},
			laud(id) {
				var me = this;
				uni.showLoading({
					title: '操作中'
				});
				me.$Request.post(me.$api.shopAsk.answerLaud, {
					id: id,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.getProblemDetail()
					} else {
						uni.showModal({
							title: '温馨提示',
							content: res.msg,
							showCancel: false
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("detail.css");
</style>
