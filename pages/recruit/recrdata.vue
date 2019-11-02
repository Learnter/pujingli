<template>
	<view>
		<view class="neirheiziBox">
			<view class="redattopBox">
				<view class="redattoptl">{{jobOffersInfo.title}}</view>
				<view class="redakillBox">
					<text class="redattosinshu" v-if="jobOffersInfo.salary">{{jobOffersInfo.salary}}</text>
					<text class="redakill" v-if="jobOffersInfo.education">| {{jobOffersInfo.education}}</text>
					<text class="redakill" v-if="jobOffersInfo.experience">| {{jobOffersInfo.experience}}</text>
				</view>
				<!-- <view class="welfareBox">
					<view class="welfare">公积金</view>					
					<view class="welfare">全勤奖</view>					
					<view class="welfare">节日福利</view>					
				</view> -->
				<view class="weldtshi" v-if="jobOffersInfo.prompt">{{jobOffersInfo.prompt}}</view>
			</view>
			<view class="redattokzBox" v-if="jobOffersInfo.requirements">
				<view class="rekzbtitleBox">
					<view class="rekzbtitIco">
						<uni-icon class="i" type="paperclip" color="#333333" size="20"></uni-icon>
					</view>
					<view class="rekzbtitle">职位要求</view>
				</view>
				<view class="zhuanbnrBox">
					<rich-text :nodes="jobOffersInfo.requirements"></rich-text>
					<!-- 1、一年以上自媒体文案经验，了解网络平台的运营<br/>
					2、熟悉文本编辑器、图片编辑器<br/>
					3、大专及以上，三年以上工作经验，善于沟通，主动积极，热爱和擅长活动策划，对自媒体推广有一定了解。 -->
				</view>
			</view>
			<view class="redattokzBox" v-if="jobOffersInfo.description">
				<view class="rekzbtitleBox">
					<view class="rekzbtitIco">
						<uni-icon class="i" type="paperclip" color="#333333" size="20"></uni-icon>
					</view>
					<view class="rekzbtitle">职位描述</view>
				</view>
				<view class="zhuanbnrBox">
					<rich-text :nodes="jobOffersInfo.description"></rich-text>
					<!-- 1、组织实施公司年度经营计划和投资方案<br/>
					2、拟定公司内部管理机构设置方案<br/>
					3、决定对公司成绩显著的员工予以奖励、调薪和晋级，对违纪员工的处分或辞退<br/>
					4、负责把握公司的发展方向，制定公司整体发展战略规划，并组织完成<br/>
					5、推动公司各项管理制度、流程的建设和完善<br/>
					6、加强公司企业文化建设，搞好社会公共关系，树立公司良好的社会形象<br/>
					7、负责公司、各公司各项费用的最终审批<br/>
					8、负责签发以公司名义发布的各种文件 -->
				</view>
			</view>
			<view class="redattokzBox">
				<view class="gsidizmch">{{jobOffersInfo.company_info.name}}</view>
				<view class="gsidizhi">{{jobOffersInfo.company_info.address}}</view>
			</view>
		</view>
		<view class="potnsbBox">
			<navigator :url="'applyfor?id='+jobOffersInfo.id" class="potnsblink">马上申请</navigator>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	let id = 0;
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			
			return {
				title: '铺经理招聘'+this.jobOffersInfo.title
			}
		},
		data() {
			return {
				jobOffersInfo: {}
			}
		},
		components: {
			uniIcon
		},
		onLoad(e) {
			var me = this;
			id = e.id;

			me.getJobOffersDetail();
		},
		methods: {
			getJobOffersDetail() {
				var me = this;
				uni.showLoading({
					title: '正在加载'
				});

				me.$Request.get(me.$api.recruitment.jobOffersDetail, {
					id: id
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.jobOffersInfo = res.data;
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
	@import url("recrdata.css");
</style>
