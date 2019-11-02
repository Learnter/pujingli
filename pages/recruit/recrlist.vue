<template>
	<view>
		<view v-if="adsList.length > 0">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="bannImg" circular="true">
				<swiper-item v-for="(item ,index) in adsList" :key="index">
					<image :src="item.url" class="bannImg" @click="bannerClick(item)" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="recrliebBox">
			<view class="recrliebCont" v-for="(item, index) in jobOffersList" :key="index" @click="goDetaStatb(item)">
				<view class="recrltitleBox">
					<view class="recrltitle">{{item.title}}</view>
					<view class="recrltime">{{item.add_time}}</view>
					<view class="recrltixinshu">{{item.salary}}</view>
				</view>
				<view class="recrskillBox">
					<text class="recrskill">{{item.experience}}</text>
					<text class="recrskill">{{item.education}}</text>
				</view>
				<!-- <view class="welfareBox">
					<view class="welfare" v-for="(welfa, fare) in item.welfare" :key="fare">{{welfa}}</view>					
				</view> -->
				<view class="compadataBox">
					<view class="compadataimg">
						<image :src="item.company_info.logo" mode=""></image>
					</view>
					<view class="compadatexBox">
						<view class="compadatele">{{item.company_info.name}}</view>
						<view class="compadatezhuy">
							<text class="tezhuytxt">{{item.company_info.address}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let page = 0,
		limit = 10,
		is_load_more = true;
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			
			return {
				title: '铺经理人才招聘'
			}
		},
		data() {
			return {
				adsList: [],
				jobOffersList: []
			}
		},
		onLoad() {
			var me = this;
			page = 0, limit = 10, is_load_more = true;
			me.getJobOffersList(true);
			me.getCarousel();
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getJobOffersList();
			}
		},
		methods: {
			// 获取轮播图
			getCarousel() {
				var me = this;
				me.$Request.get(me.$api.config.getCarousel + '/job_offers').then(res => {
					if (res.code == 200) {
						me.adsList = res.data;
					} else {
						return uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			// 轮播图点击
			bannerClick: function(info) {
				if (info.open_type == 'current') {
					uni.switchTab({
						url: info.link_url
					})
				} else {
					uni.navigateTo({
						url: info.link_url
					})
				}
			},
			getJobOffersList(isReload) {
				var me = this;
				if (is_load_more) {
					uni.showLoading({
						title: '正在加载'
					});

					me.$Request.get(me.$api.recruitment.jobOffersList, {
						page: page,
						limit: limit
					}).then(res => {
						uni.hideLoading();
						if (res.code == 200) {
							if (isReload) {
								me.jobOffersList = [];
							}

							for (var i in res.data) {
								me.jobOffersList.push(res.data[i]);
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
			// 页面跳转
			goDetaStatb(e) {
				var url = 'recrdata?id=' + e.id;
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>

<style>
	@import url("recrlist.css");
</style>
