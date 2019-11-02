<template>
	<view>
		<view v-if="successCaseList.length > 0">
			<navigator class="cinchListBox" :url="'detail?id='+item.id" v-for="(item,index) in successCaseList" :key="index">
				<view class="cinchLiVid">
					<video id="myVideo" :src="item.video_url" :poster="item.video_url+'?x-oss-process=video/snapshot,t_0,m_fast,w_800,f_png'"></video>
					<view class="cinchLiVidzw"></view>
				</view>
				<view class="cinchtext">
					<view class="cinchLitl">{{item.title}}</view>
					<view class="cinchllan">
						<uni-icon class="i" type="eye" color="#888888" size="22"></uni-icon>{{item.browse_num}}次
					</view>
				</view>
			</navigator>
		</view>
		<view style="text-align: center;padding-top:150upx;" v-else>
			<image src="../../static/images/zpzp_95.png" mode="" style="width:300upx;height:300upx;"></image>
			<view style="color:#888888;">暂未上传成交案例</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	let page = 1,
		limit = 10,
		is_load_more = true;
	export default {
		data() {
			return {
				successCaseList: []
			}
		},
		components: {
			uniIcon
		},
		onShow(e) {
			var me = this;
			me.getSuccessCaseList(true);
		},
		onReachBottom() {
			if (is_load_more) {
				page++;
				this.getSuccessCaseList();
			}
		},

		// 下拉刷新执行
		onPullDownRefresh() {
			is_load_more = true;
			page = 1;

			this.getSuccessCaseList(true);
		},
		methods: {
			// 加载站内信
			getSuccessCaseList(isReload) {
				if (isReload) {
					is_load_more = true;
					page = 1;
				}
				var me = this;
				me.$Request.get(me.$api.successCase.list, {
					page: page,
					limit: limit
				}).then(res => {
					if (res.code == 200) {
						if (isReload) {
							me.successCaseList = [];
						}
						for (var i in res.data) {
							me.successCaseList.push(res.data[i]);
						}
						if (res.data.length < limit) {
							is_load_more = false;
						}
					}
					uni.stopPullDownRefresh();
				});
			}
		}

	}
</script>

<style>
	@import url("list.css");
</style>
