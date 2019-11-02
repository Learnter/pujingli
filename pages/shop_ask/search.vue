<template>
	<view>
		<view class="seachTopBox">
			<view class="seachTop">
				<uni-nav-bar color="#333333" background-color="#FFFFFF" :fixed="false">
					<view class="input-view">
						<uni-icon type="search" size="22" color="#666666"></uni-icon>
						<input confirm-type="search" @confirm="confirm" :value="kwd" class="input" type="text" placeholder="输入您遇到的问题" />
					</view>
					<block slot="right" @click="back">
						取消
					</block>
				</uni-nav-bar>
			</view>
		</view>

		<!-- <view class="history-box">
			<view>
				<view class="history-title">
					<text>搜索历史</text>
					<text class="uni-icon uni-icon-trash"></text>
				</view>
				<view class="history-content">
					<view class="history-item">
						大厂房
					</view>
					<view class="history-item">
						餐饮店
					</view>
					<view class="history-item">
						加工厂
					</view>
					<view class="history-item">
						办公室
					</view>
					<view class="history-item">
						小作坊
					</view>
				</view>
			</view>
		</view> -->
		<view class="queListishi">为您找到了约{{count}}条结果</view>
		<view class="queListBox" v-if="questionData.length > 0">
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
						<text>{{item.browse_num || 0}}人浏览</text>
					</view>
					<view class="queLiTexttime">{{item.add_time}}</view>
				</view>
			</navigator>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else-if="kwd != ''">
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">没有查询到信息，不如换个关键字试试</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	let page = 0,
		limit = 10,
		is_load_more = true;
	export default {
		data() {
			return {
				kwd: '',
				questionData: [],
				count: 0
			}
		},
		components: {
			uniNavBar,
			uniIcon
		},
		onLoad(e) {
			this.kwd = e.kwd || '';
			is_load_more = true;
			page = 0;
			if (this.kwd != '') {
				this.getQuestionList(true);
			}
		},
		methods: {
			getQuestionList(isReload) {
				var me = this;
				if (is_load_more) {
					uni.showLoading({
						title: '正在加载'
					});

					me.$Request.get(me.$api.shopAsk.searchQuestionList, {
						page: page,
						limit: limit,
						kwd: me.kwd,
					}).then(res => {
						uni.hideLoading();
						if (res.code == 200) {
							me.count = res.data.count;
							if (isReload) {
								me.questionData = [];
							}

							for (var i in res.data.list) {
								me.questionData.push(res.data.list[i]);
							}
							if (res.data.list.length < limit) {
								is_load_more = false;
							}
						}
						uni.stopPullDownRefresh();
					});
				}
			},
			search(e) {
				if (e.detail.value != this.kwd) {
					uni.navigateTo({
						url: 'search?kwd=' + e.detail.value
					});
				}
			},
			confirm(e) {
				if (e.detail.value != this.kwd) {
					uni.navigateTo({
						url: 'search?kwd=' + e.detail.value
					});
				}
			},
			//返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getQuestionList();
			}
		},
	}
</script>

<style>
	@import url("search.css");
</style>
