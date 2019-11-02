<template>
	<view>
		<view>
			<video id="myVideo" :src="info.video_url" :poster="info.video_url+'?x-oss-process=video/snapshot,t_0,m_fast,w_800,f_png'"></video>
		</view>
		<view class="sitestop">
			<view class="sitesMidtl">{{info.title || ''}}</view>
			<view class="sitestime">{{info.add_time || ''}}</view>
		</view>
		<view class="sitesMidBox" v-if="info.seeking_info.id">
			<view class="sitesMidtl">选址需求</view>
			<view class="qnquConttl">
				求租{{info.seeking_info.address.district}}{{info.seeking_info.cate_name}}
			</view>
			<view class="qnquConttex_1">
				期望区域：{{info.seeking_info.address.twon}}
			</view>
			<view class="qnquConttex_1">
				租金预算：{{info.seeking_info.rent_add}}~{{info.seeking_info.rent_end}}元/月
			</view>
			<view class="qnquConttex_1">
				求租面积：{{info.seeking_info.area_add}}~{{info.seeking_info.area_end}}㎡
			</view>
		</view>
		<view class="sitesMidBox" v-if="info.transfer_shop_info.id">
			<view class="sitesMidtl">成交店铺</view>
			<view class="findconnerBox">
				<navigator :url="'../transfer_shop/transfer_shop_detail?id='+info.transfer_shop_info.id">
					<view class="findconnerhz">
						<view class="findcerhzimg">
							<image :src="info.transfer_shop_info.imgs_info[0].img_url" mode=""></image>
						</view>
						<view class="findconnerhztx">
							<view class="dconnerhztxtl">{{info.transfer_shop_info.title}}</view>
							<view class="dconnerhztxzjin">面积: <text class="text_1">{{info.transfer_shop_info.shop_area}}</text>㎡</view>
							<view class="dconnerhyouh">
								<text class="text_1" v-for="(tagItem,tagIndex) in info.transfer_shop_info.tag_info" :key="tagIndex">{{tagItem.name}}</text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
			}
		},
		onLoad(e) {
			var me = this;
			var id = e.id;
			if (e.is_share) {
				me.is_share = true;
			}

			uni.showLoading({
				title: '正在加载'
			});
			me.$Request.get(me.$api.successCase.detail, {
				id: id,
			}).then(res => {
				uni.hideLoading();
				if (res.code == 200) {
					me.info = res.data;
					uni.setNavigationBarTitle({
						title: me.info.title
					});
				}
			});
		},
	}
</script>

<style>
	@import url("detail.css");
</style>
