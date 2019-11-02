<template>
	<view>
		<view class="questhTopBox">
			<view class="questhTopCont">
				<view class="quhsoskBox">
					<view class="quhsoskOne">
						<navigator class="quhsoskOnelink" url="search">
							<uni-icon type="search" color="#666666" size="22"></uni-icon>
							<text>输入您遇到的问题</text>
						</navigator>
					</view>
					<navigator class="quhsoskTwolink" url="question">
						<uni-icon type="compose" color="#ffffff" size="22"></uni-icon>
						<text>提问</text>
					</navigator>
				</view>
				<view class="topsbgydaBox">
					<view class="topsbgyCont">
						<view class="uni-padding-wrap uni-common-mt">
							<uni-segmented-control :current="current" :values="navData" v-on:clickItem="onClickItem" :styleType="styleType"
							 :activeColor="activeColor"></uni-segmented-control>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="questionData.length > 0">
			<view class="queListBox">
				<navigator class="queList" :url="'detail?id='+item.id" v-for="(item,index) in questionData" :key="index">
					<view class="queLitl">
						<view class="queLitltx">{{item.answer_num || 0}}</view>
						<view class="queLitltx">回答</view>
					</view>
					<view class="queLiTextBox">
						<view class="queLiTexttl">{{item.content}}</view>
						<view class="queLiTexttx">
							<text v-if="item.answer_info[0].username">
								<text>{{item.answer_info[0].username}}</text>
								<text>回答了问题</text>
							</text>
							<text>{{item.browse_num}}人浏览</text>
						</view>
						<view class="queLiTexttime">{{item.add_time}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂无提问</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	let page = 0,
		limit = 10,
		type = 1,
		is_load_more = true;
	export default {
		components: {
			uniIcon,
			uniSegmentedControl
		},

		data() {
			return {
				navData: [
					'精华',
					'热门',
					'最新'
				],
				current: 0,
				activeColor: '#f00000',
				styleType: 'text',
				questionData: []
			}
		},
		onLoad() {
			var me = this;
			me.getQuestionList(true);
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getQuestionList();
			}
		},

		// 下拉刷新执行
		onPullDownRefresh() {
			this.refreshLoading();
		},
		methods: {
			getQuestionList(isReload) {
				var me = this;
				if (is_load_more) {
					uni.showLoading({
						title: '正在加载'
					});
					if (me.current == 0) {
						var type = 1;
					} else if (me.current == 1) {
						var type = 2;
					} else if (me.current == 2) {
						var type = 3;
					}

					me.$Request.get(me.$api.shopAsk.questionList, {
						page: page,
						limit: limit,
						type: type,
					}).then(res => {
						uni.hideLoading();
						if (res.code == 200) {
							if (isReload) {
								me.questionData = [];
							}

							for (var i in res.data) {
								me.questionData.push(res.data[i]);
							}
							if (res.data.length < limit) {
								is_load_more = false;
							}
							if (isReload) {
								uni.pageScrollTo({
									scrollTop: 0,
									duration: 300
								});
							}
						}
						uni.stopPullDownRefresh();
					});
				}
			},
			refreshLoading() {
				var me = this;
				page = 0;
				is_load_more = true;
				me.getQuestionList(true);
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;

					this.refreshLoading();
				}
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
