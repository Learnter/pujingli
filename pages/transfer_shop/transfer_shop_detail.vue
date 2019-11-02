<template>
	<view>
		<view class="daaildage">
			<!-- 返回按钮 s -->
			<navigator url="../index/index" open-type="switchTab" v-if="is_share">
				<button class="fahuBack">
					<uni-icon class="i" type="arrowleft" color="#ffffff" size="24"></uni-icon>
				</button>
			</navigator>

			<!-- 返回按钮 e -->

			<!-- 轮播图 s -->
			<!-- <uni-swiper-dot :info="shopImg" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles">
				<swiper autoplay="true" circular="true" class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in shopImg" :key="index">
						<view class="swiper-item" :class="item.colorClass"><image :src="item.url" mode="aspectFill"></image></view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> -->
			<view class="eggamenBox">
				<uni-swiper-dot :info="shopImg" :current="current" field="content" :navIsShow="navIsShow" :mode="mode" :dotsStyles="dotsStyles">
					<swiper circular="true" class="swiper-box" @change="change" :indicator-dots="disabled">
						<swiper-item v-for="(item, index) in shopImg" :key="index">
							<view class="swiper-item" v-if="item.show_type == 'video'">
								<video id="shop_video" :src="item.img_url" :controls="true" :show-fullscreen-btn="true" :show-play-btn="true"
								 :show-center-play-btn="true" :enable-progress-gesture="disabled" :poster="item.img_url+'?x-oss-process=video/snapshot,t_0,m_fast,w_800,f_png'"
								 @play="videoPlay">
									<!-- <cover-view style="color: #000000;">可以双击播放和暂停</cover-view> -->
									<!-- <cover-image v-if="playButtonIsShow" class="controls-play img" @click="play" src="../../static/images/play.png"></cover-image> -->
									<!-- <cover-image v-if="pauseButtonIsShow" class="controls-pause img" @click="pause" src="../../static/images/pause.png"></cover-image> -->
								</video>
							</view>
							<view class="swiper-item" v-else>
								<!-- <cover-image class="controls-play img" :src="item.img_url"></cover-image> -->
								<image :src="item.img_url" v-on:click="preivewImage(item.img_url)" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>

				<!-- <view class="eggamroBox" v-if="shopInfo.status != 9">
					<view class="egglistBox">
					  <view id="egglistscrol" ref="egglistscrol" :style="'marginTop:'+marginTopVal" :class="{anim:animate==true}">
					    <view class="egglistHe" v-for="(itemNav,indexNav) in browseUserList" :key="indexNav">
							<view class="egglistCont clearfix">
								<image :src="itemNav.avatar"></image>
								<text class="text_1">{{itemNav.username}}</text>
								<text class="text_2">查看了店铺</text>
							</view>
						</view>
					  </view>
					</view>
				</view> -->

				<view class="eggamroBox" v-if="shopInfo.status != 9">
					<swiper autoplay="true" circular="true" interval="2000">
						<swiper-item v-for="(itemNav,indexNav) in browseUserList" :key="indexNav">
							<view class="egglistCont clearfix">
								<image v-if="itemNav.avatar" :src="itemNav.avatar"></image>
								<text class="text_1">{{itemNav.username}}</text>
								<text class="text_2">查看了店铺</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 轮播图 e -->
			<view class="detaiBoc">
				<view class="detaititl">{{shopInfo.title}}</view>
				<view class="detaiwzmsBox">
					<view class="detaiwzms" v-for="(item,index) in shopInfo.tag_info" :key="index">{{item.name}}</view>
					<!-- <view class="detaiwzms">交通便利</view> -->
					<!-- <view class="detaiwzms">热闹市区</view> -->
				</view>
				<view class="detafenxBox" v-if="shopInfo.status != 9">
					<button class="detafenx detafenxlt" open-type="share">
						<image src="../../static/images/zpzp_28.png" mode=""></image>
						<text>分享</text>
					</button>
					<!-- <button open-type="share">分享</button> -->
					<view class="detafenx detafenxzlt" v-on:click="callMerchant">
						<image src="../../static/images/zpzp_29.png" mode=""></image>
						<text>拨打电话</text>
					</view>
					<view class="detafenx detafenxzrt" v-on:click="unCollectShop" v-if="is_collect">
						<image src="../../static/images/zpzp_30_1.png" mode=""></image>
						<text>已收藏</text>
					</view>
					<view class="detafenx detafenxzrt" v-on:click="collectShop" v-else>
						<image src="../../static/images/zpzp_30.png" mode=""></image>
						<text>收藏</text>
					</view>
					<view class="detafenx detafenxrt">
						<navigator :url="'transfer_shop_error_correction?id='+shopInfo.id+'&title='+shopInfo.title">
							<image src="../../static/images/error_correction.png" mode=""></image>
							<text style="color: red;">纠错</text>
						</navigator>
					</view>
					<!-- <view class="detafenx detafenxrt" @click="checkMap">
						<image src="../../static/images/zpzp_31.png" mode=""></image>
						<text>地图</text>
					</view> -->
				</view>
				<view class="viyouqtshi">联系我时一定要说是在（铺经理）看到的</view>
				<view class="detaxqluoBox">
					<view class="detaxqluobuhuBox">
						<view class="detaxqluobuhu">
							<view class="detaxqluo">
								<view class="text_1">租&nbsp;&nbsp;&nbsp;金</view>
								<view class="kangjtex">{{shopInfo.unit_month_price || ''}}</view>							
								<view class="text_2"></view>
							</view>
							<view class="detaxqluo">
								<view class="text_1">面&nbsp;&nbsp;&nbsp;积</view>
								<view class="kangjtex">{{shopInfo.shop_area || 0}}㎡</view>														
								<view class="text_2"></view>
							</view>
							<view class="detaxqluo" v-if="shopInfo.unit_transfer_price">
								<view class="text_1">转让费</view>
								<view class="kangjtex">{{shopInfo.unit_transfer_price || 0}}</view>	
								<view class="wykkjiabtn" @click="bargzbqbtn" v-if="shopInfo.status != 9">
									<image src="../../static/images/zpzp_138.png" mode="widthFix" class="kankan"></image>
									<view class="wykkjiatx">我要砍价</view>
								</view>	
							</view>
						</view>						
						<view class="detaxqlrzhen" v-if="shopInfo.auth_status == 1 && shopInfo.status != 9">
							<image src="../../static/images/yz.png" mode=""></image>
						</view>
					</view>
					<view class="detaxqluo" v-if="shopInfo.status != 9">
						<text class="text_1">区&nbsp;&nbsp;&nbsp;域</text>
						<text class="text_3">{{shopInfo.city || ''}} - {{shopInfo.district || ''}}</text>
					</view>
					<view class="detaxqluo" v-if="shopInfo.status != 9">
						<text class="text_1">地&nbsp;&nbsp;&nbsp;址</text>
						<text class="text_3">{{shopInfo.twon || ''}}{{shopInfo.address || ''}}</text>
					</view>
					<!-- 提示已成交 -->
					<view class="tishiyichimg" v-if="shopInfo.status == 9">
						<image src="../../static/images/zpzp_119.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="detaiBoc">
				<view class="detatlgbBt">配套设施</view>
				<view class="petshsBox clearfix">
					<view class="petshs" v-for="(item,index) in shopInfo.facilities_info" :key="index">
						<view class="petshsimg">
							<image :src="item.img_url" mode=""></image>
						</view>
						<view class="petshstx">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view v-if="shopInfo.complete_cate_name || shopInfo.license_info || shopInfo.licensed_info || shopInfo.business_status">
				<view class="detaiBoc">
					<view class="detatlgbBt">铺源信息</view>
				</view>
				<view class="wdbzdzBox">
					<view class="wdbzdzTl">
						<view class="wdbzdzTlimg">
							<image src="../../static/images/zpzp_32.png" mode=""></image>
						</view>
						<view class="wdbzdzTlxt">经营状态</view>
					</view>
					<view class="xbztaBoxbb">
						<view class="xbztaBox" v-if="shopInfo.complete_cate_name">
							<view class="xbztaTl">当前经营</view>
							<view class="xbztaTxt">{{shopInfo.complete_cate_name}}</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.license_info">
							<view class="xbztaTl">证&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;照</view>
							<view class="xbztaTxt">{{shopInfo.license_info}}</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.licensed_info">
							<view class="xbztaTl">已有证件</view>
							<view class="xbztaTxt">
								<uni-icon type="image" size="18" color="#e70000"></uni-icon>{{shopInfo.licensed_info}}
							</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.business_status">
							<view class="xbztaTl">经营状态</view>
							<view class="xbztaTxt">{{shopInfo.business_status}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="shopInfo.shop_type || shopInfo.construction_area || shopInfo.usage_area || shopInfo.floor || shopInfo.is_split || shopInfo.main_road">
				<view class="wdbzdzBox">
					<view class="wdbzdzTl">
						<view class="wdbzdzTlimg">
							<image src="../../static/images/zpzp_33.png" mode=""></image>
						</view>
						<view class="wdbzdzTlxt">物业信息</view>
					</view>
					<view class="xbztaBoxbb">
						<view class="xbztaBox" v-if="shopInfo.shop_type">
							<view class="xbztaTl">商铺类型</view>
							<view class="xbztaTxt">{{shopInfo.shop_type}}</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.construction_area">
							<view class="xbztaTl">建筑面积</view>
							<view class="xbztaTxt">{{shopInfo.construction_area}}㎡</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.usage_area">
							<view class="xbztaTl">使用面积</view>
							<view class="xbztaTxt">{{shopInfo.usage_area}}㎡</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.floor">
							<view class="xbztaTl">楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;层</view>
							<view class="xbztaTxt">{{shopInfo.floor}}</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.is_split">
							<view class="xbztaTl">是否分割</view>
							<view class="xbztaTxt">{{shopInfo.is_split}}</view>
						</view>
						<view class="xbztaBox" v-if="shopInfo.main_road">
							<view class="xbztaTl">临主干道</view>
							<view class="xbztaTxt">{{shopInfo.main_road}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="wdbzdzBox">
				<view class="wdbzdzTl">
					<view class="wdbzdzTlimg">
						<image src="../../static/images/zpzp_34.png" mode=""></image>
					</view>
					<view class="wdbzdzTlxt">位置信息</view>
				</view>
				<view class="xbztaBoxbb">
					<view class="xbztaBox">
						<view class="xbztaTl">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域</view>
						<view class="xbztaTxt">{{shopInfo.district}} - {{shopInfo.twon}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.loop_line">
						<view class="xbztaTl">环&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线</view>
						<view class="xbztaTxt">{{shopInfo.loop_line}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.nearby_road">
						<view class="xbztaTl">临近道路</view>
						<view class="xbztaTxt">{{shopInfo.nearby_road}}</view>
					</view>
				</view>
			</view>
			<view class="wdbzdzBox">
				<view class="wdbzdzTl">
					<view class="wdbzdzTlimg">
						<image src="../../static/images/zpzp_35.png" mode=""></image>
					</view>
					<view class="wdbzdzTlxt">租约相关</view>
				</view>
				<view class="xbztaBoxbb">
					<view class="xbztaBox">
						<view class="xbztaTl">月&nbsp;&nbsp;租&nbsp;&nbsp;金</view>
						<view class="xbztaTxt">{{shopInfo.unit_month_price}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.deposit > 0">
						<view class="xbztaTl">押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</view>
						<view class="xbztaTxt">{{shopInfo.deposit}}元</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.payment_method">
						<view class="xbztaTl">支付方式</view>
						<view class="xbztaTxt">{{shopInfo.payment_method}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.timeshare_rental">
						<view class="xbztaTl">分期出租</view>
						<view class="xbztaTxt">{{shopInfo.timeshare_rental}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.longest_lease">
						<view class="xbztaTl">最长租约</view>
						<view class="xbztaTxt">{{shopInfo.longest_lease}}</view>
					</view>
					<view class="xbztaBox" v-if="shopInfo.renewal_method">
						<view class="xbztaTl">续约方式</view>
						<view class="xbztaTxt">{{shopInfo.renewal_method}}</view>
					</view>
				</view>
			</view>

			<view class="wdbzdzBox" v-if="shopInfo.unit_transfer_price">
				<view class="wdbzdzTl">
					<view class="wdbzdzTlimg">
						<image src="../../static/images/zpzp_36.png" mode=""></image>
					</view>
					<view class="wdbzdzTlxt">转让相关</view>
				</view>
				<view class="xbztaBoxbb">
					<view class="xbztaBox" v-if="shopInfo.unit_transfer_price">
						<view class="xbztaTl">转让费用</view>
						<view class="xbztaTxtzrf">{{shopInfo.unit_transfer_price}}</view>
						<view class="wykkjiabtn" @click="bargzbqbtn" v-if="shopInfo.status != 9">
							<image src="../../static/images/zpzp_138.png" mode="widthFix" class="kankan"></image>
							<view class="wykkjiatx">我要砍价</view>
						</view>	
					</view>
				</view>
			</view>
			
			<!-- 公司网络客服 s -->
			<view class="wlkfhezBox">
				<view class="dzhuzigimg">
					<image src="../../static/images/kefu.png" mode=""></image>
				</view>
				<view class="dzhuzigitxBox">
					<view class="dzhuzigwlkf">获取更多信息请联系</view>
					<view class="dzhuzigwlkf">网络客服：{{webTelPhone}}</view>
				</view>	
				<view class="wlfkfan" @click="callKefu">立即咨询</view>					
			</view>		
			<!-- 公司网络客服 e -->
				
				
			<view class="detaiBoc">
				<view v-if="shopInfo.content && shopInfo.status != 9">
					<view class="detatlgbBt">店主自述</view>
					<view class="dzhuzishuBox">
						<view class="dzhuzigex">
							<view class="dzhuzigimg">
								<image src="../../static/images/zpzp_91.png" mode=""></image>
							</view>
							<view class="dzhuzigitxBox">
								<view class="dzhuzigitx">{{shopInfo.username}}</view>
								<view class="dzhuzigitxdh">18207076666</view>
							</view>						
							<!-- <view class="dzhuzigimg dzhuzigimgmrg">
								<image src="../../static/images/zpzp_39.png" mode=""></image>
							</view> -->
							<view class="dzhuzigimg" @click="callMerchant">
								<image src="../../static/images/zpzp_40.png" mode=""></image>
							</view>
						</view>
						<view class="dzhuziCont">
							<image src="../../static/images/zpzp_41.png" mode="" class="zhximg"></image>
							<text>{{shopInfo.content}}</text>
						</view>
					</view>
				</view>
				
				
				
				
				<!-- <view class="detatlgbBt">本铺时光机</view>
				<view class="findconscroBox">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
						<view id="demo1" class="scroll-view-item_H">
							<view class="shguanBox">
								<view class="shguanimg">
									<image src="../../static/images/zpzp_91.png" mode=""></image>
								</view>
								<view class="shguanminz">李老板</view>
								<view class="shguanmiyuanq"></view>
								<view class="shguanlich">店主挂牌</view>
								<view class="shguantime">19-01-07</view>
							</view>
						</view>
						<view id="demo2" class="scroll-view-item_H">
							<view class="zhshenico">
								<uni-icon class="i" type="arrowthinright" color="#FF0000" size="26"></uni-icon>
							</view>
						</view>
						<view id="demo3" class="scroll-view-item_H">
							<view class="shguanBox">
								<view class="shguanimg">
									<image src="../../static/images/zpzp_91.png" mode=""></image>
								</view>
								<view class="shguanminz">徐xx</view>
								<view class="shguanmiyuanq"></view>
								<view class="shguanlich">人工核实</view>
								<view class="shguantime">19-01-07</view>
							</view>
						</view>
						<view id="demo4" class="scroll-view-item_H">
							<view class="zhshenico">
								<uni-icon class="i" type="arrowthinright" color="#FF0000" size="26"></uni-icon>
							</view>
						</view>
						<view id="demo5" class="scroll-view-item_H">
							<view class="shguanBox">
								<view class="shguanimg">
									<image src="../../static/images/zpzp_91.png" mode=""></image>
								</view>
								<view class="shguanminz">李老板</view>
								<view class="shguanmiyuanq"></view>
								<view class="shguanlich">店主调价</view>
								<view class="shguantime">19-01-10</view>
							</view>
						</view>
						<view id="demo6" class="scroll-view-item_H">
							<view class="zhshenico">
								<uni-icon class="i" type="arrowthinright" color="#FF0000" size="26"></uni-icon>
							</view>
						</view>
						<view id="demo7" class="scroll-view-item_H">
							<view class="shguanBox">
								<view class="shguanimg">
									<image src="../../static/images/zpzp_91.png" mode=""></image>
								</view>
								<view class="shguanminz">郭xx</view>
								<view class="shguanmiyuanq"></view>
								<view class="shguanlich">现场实勘</view>
								<view class="shguantime">19-01-12</view>
							</view>
						</view>
					</scroll-view>
				</view> --> 
				<view class="dianphezBox">
					<!-- <image src="../../static/images/zpzp_79.png" mode="" class="dianpztimg"></image> -->
					<view v-if="shopInfo.butler_review">
						<view class="dianphmitil">管家点评</view>
						<view class="dianphmians">{{shopInfo.butler_review}}</view>
					</view>
					<!-- <view class="dianphmlistBox">
						<view class="dianphmlist">
							<image src="../../static/images/zpzp_45.png" mode=""></image>
							<view class="dianphmlisttx">实地勘查</view>
						</view>
						<view class="dianphmlist">
							<image src="../../static/images/zpzp_46.png" mode=""></image>
							<view class="dianphmlisttx">实际面积测量</view>
						</view>
						<view class="dianphmlist">
							<image src="../../static/images/zpzp_47.png" mode=""></image>
							<view class="dianphmlisttx">证照核验</view>
						</view>
						<view class="dianphmlist">
							<image src="../../static/images/zpzp_48.png" mode=""></image>
							<view class="dianphmlisttx">产权明晰</view>
						</view>
					</view> -->
					
					
					
					<view class="dianphbittmBox" v-if="tjrInfo.username">
						<view class="dianphbittimg">
							<image :src="tjrInfo.head ? tjrInfo.head : '../../static/images/zpzp_91.png'" mode=""></image>
						</view>
						<view class="dianphbittxt">
							<view class="dianphbittxttl">实勘人员：{{tjrInfo.username}}</view>
							<view class="dianphbittxttx">
								<text>高级店铺核验员已核验铺源</text>
								<text class="text_1">{{tjrInfo.inspection_quantity}}</text>
								<text>家</text>
							</view>
						</view>
					</view>
				</view>
				
				
				
				
				
				<!-- <view class="danbaoBox">
					<view class="danbaolist">
						<image src="../../static/images/zpzp_49.png" mode=""></image>
						<view class="danbaolisttx">证照已核实</view>
					</view>
					<view class="danbaolist">
						<image src="../../static/images/zpzp_50.png" mode=""></image>
						<view class="danbaolisttx">有拆迁担保</view>
					</view>
					<view class="danbaolist">
						<image src="../../static/images/zpzp_51.png" mode=""></image>
						<view class="danbaolisttx">无签约风险</view>
					</view>
				</view> -->
				
				
				
				
				
				<!-- <view class="jiucuoBox">
					<view class="jiucuoimg">
						<image src="../../static/images/zpzp_52.png" mode=""></image>
					</view>
					<view class="jiucuotext">
						<view class="jiucuotextl">如你发现铺源信息有误</view>
						<view class="jiucuotextl">纠错可得5次看铺次数奖励</view>
					</view>
					<view class="jiucuowoyBox">
						<text>我要纠错</text>
						<uni-icon class="i" type="arrowright" color="#333333" size="20"></uni-icon>
					</view>
				</view> -->
				
			</view>
			<!-- 同区域店铺 s -->
			<view class="tygBox" v-if="sameAreaShopList.length > 0">
				<view class="tygtitle">
					<view class="findconttl">
						<view class="findconttlltb">
							<text>同区域店铺</text>
						</view>
						<view class="findltbgduo" @click="sameAreaMoreLink">
							<text>更多</text>
							<uni-icon class="rtzzx" size="17" :type="'arrowright'" :color="'#8f8f94'"></uni-icon>
						</view>
					</view>
					<view class="findcontmshu">同区域更多选择</view>
				</view>
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="tyCont" v-for="(item,index) in sameAreaShopList" :key="index">
						<navigator :url="'transfer_shop_detail?id='+item.id">
							<view class="findcerhzimg">
								<image :src="item.main_picture" mode=""></image>							
							</view>
							<view class="tyConttex">{{item.district}}-{{item.twon}}{{item.address}}</view>
							<view class="tyConttexjgg">{{item.shop_area}}㎡ | {{item.unit_month_price}}</view>
						</navigator>
					</view>
				</scroll-view>
			</view>
			<!-- 同区域店铺 e -->
			
			<view class="detaiBoc">
				<view v-if="problemList.length > 0">
					<view class="detatlgbBt">常见问题</view>
					<view class="changwtiBox">
						<navigator :url="'../problem/problem_detail?id='+item.id" v-for="(item,index) in problemList" :key="index">
							<view class="changwtihe">
								<view class="changwtico">问</view>
								<view class="changwtitx">{{item.title}}</view>
								<view class="changwtzhx">
									<uni-icon class="i" type="arrowright" color="#888888" size="20"></uni-icon>
								</view>
							</view>
						</navigator>
					</view>
				</view>
				<view class="detatlgbBt">租铺五步走</view>
				<view class="wubuzouBox">
					<view class="wubuzoubz">
						<view class="wubuzoubztx">电话</view>
						<view class="wubuzoubztx">预约</view>
					</view>
					<view class="wubuzouzx">
						<uni-icon class="i" type="arrowright" color="#ff0000" size="20"></uni-icon>
					</view>
					<view class="wubuzoubz wubuzoubzclo_2">
						<view class="wubuzoubztx">陪同</view>
						<view class="wubuzoubztx">看铺</view>
					</view>
					<view class="wubuzouzx">
						<uni-icon class="i" type="arrowright" color="#ff0000" size="20"></uni-icon>
					</view>
					<view class="wubuzoubz wubuzoubzclo_3">
						<view class="wubuzoubztx">盈利</view>
						<view class="wubuzoubztx">分析</view>
					</view>
					<view class="wubuzouzx">
						<uni-icon class="i" type="arrowright" color="#ff0000" size="20"></uni-icon>
					</view>
					<view class="wubuzoubz wubuzoubzclo_4">
						<view class="wubuzoubztx">过户</view>
						<view class="wubuzoubztx">担保</view>
					</view>
					<view class="wubuzouzx">
						<uni-icon class="i" type="arrowright" color="#ff0000" size="20"></uni-icon>
					</view>
					<view class="wubuzoubz wubuzoubzclo_5">
						<view class="wubuzoubztx">安享</view>
						<view class="wubuzoubztx">保障</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- <view class="xhbgtishi" v-if="shopInfo.status != 9">已有163人浏览本铺，请尽快联系该铺源</view> -->
		<view class="detaweiBox" v-if="shopInfo.status != 9">
			<view class="detaweihe">
				<!-- <navigator url="../hch-poster/hch-poster">测试</navigator> -->
				<view class="detaweiltgaib" @click="createCanvasImageEvn">
					<image src="../../static/images/hbao.png" mode=""></image>海报
				</view>
				<view class="detaweiltian detaweiltian_2" @click="checkMap">
					<image src="../../static/images/zpzp_89.png" mode=""></image>定位
				</view>
				<button class="detaweizhon" open-type="contact">
					<view class="detaweiltian">
						<image src="../../static/images/zpzp_54.png" mode=""></image>在线聊天
					</view>
				</button>
				<view class="detaweizhbo" v-on:click="callMerchant">
					<image src="../../static/images/zpzp_53.png" mode=""></image>直拨店主
				</view>
			</view>
		</view>

		<!-- 海报弹窗 s -->
		<view class="postepopBox" :class="tuobpup == true ? 'postepopBoxActive' : ''">
			<view class="postepopyin" @click="tuobgbup"></view>
			<view class="postepopContHe">
				<view class="postepopCont">
					<view class="postepotbuBox">
						<view class="postepotbuimg">
							<image src="../../static/images/zpzp_91.png" mode=""></image>
						</view>
						<view class="postepotbuHe">
							<view class="postepotbumz">
								<view class="postepotbumztx">吉吉-zhou</view>
								<view class="postepotbumztj">推荐</view>
							</view>
							<view class="postepotbumshu">这个店铺不错，也推荐给你</view>
						</view>
					</view>
					<view class="postepotishi">铺经理线上已开业，新铺源继续上传中！！！</view>
					<view class="postepopuyimg">
						<image src="../../static/images/zpzp_115.png" mode=""></image>
					</view>
					<view class="postepopudpm">金牛区荷花池吉吉巷默默行18号一楼空商铺出租</view>
					<view class="postepoewmBox">
						<view class="postepoyzj">
							<text class="text_1">月租金：</text>
							<text class="text_2">3.4万元/月</text>
						</view>
						<view class="postepoewmimg">
							<image src="../../static/images/ewnm.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="posbaocunBa">
					<button type="primary" class="posbaocun">保存</button>
				</view>
			</view>
		</view>
		<!-- 海报弹窗 e -->

		<view class="content">
			<transferShopPoster ref="transferShopPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData" />
			<view :hidden="canvasFlag">
				<!-- 海报 要放外面放组件里面 会找不到 canvas-->
				<canvas class="canvas" canvas-id="myCanvas"></canvas><!-- 海报 -->
			</view>
		</view>
		
		<!-- 我要砍价弹窗 s -->
		<view class="postepopBox" :class="bargzb == true ? 'postepopBoxActive' : ''">
			<view class="postepopyin" @click="bargzbquxan"></view>
			<view class="wybargainBox">
				<view class="wybargaintel">我要砍价</view>
				<form @submit="submitBargain">
					<view class="wybargCont">
						<view class="uni-flex wybargainupBox" v-if="shopInfo.unit_transfer_price">
							<view class="wybargamc">转让费</view>
							<view class="wybargainup fx1">
								<input type="number" name="transfer_fee" placeholder="请输入转让费" />
							</view>
							<view class="wybargadw">万元</view>						
						</view>
						<view class="uni-flex wybargainupBox">
							<view class="wybargamc">租金</view>
							<view class="wybargainup fx1">
								<input type="number" name="monthly_rent" placeholder="请输入意向价" />
							</view>
							<view class="wybargadw">元/月</view>						
						</view>
						<view class="wybargzhushi">注：我们会根据您的意向价与店主砍价</view>
						<view class="wybarbtnBox">
							<button type="primary" form-type="submit" class="wybarbtn">提交</button>
						</view>
					</view>
				</form>
			</view>
		</view>
		<!-- 我要砍价弹窗 e -->
		
	</view>
</template>

<script>
	import transferShopPoster from '../../components/transfershop-poster/transfershop-poster.vue'
	// 折叠面板
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	// 折叠面板
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.shopInfo.title,
				path: '/pages/transfer_shop/transfer_shop_detail?id=' + this.shopInfo.id + '&is_share=true'
			}
		},
		data() {
			return {
				canvasFlag: true,
				posterData: {},
				tuobpup: false,
				bargzb: false,
				// 谁查看了店铺滚动提示 s
				animate: false,
				marginTopVal: '0px',
				browseUserList: [],
				// 谁查看了店铺滚动提示 e

				disabled: false,
				playButtonIsShow: false,
				pauseButtonIsShow: false,
				videoIsPlay: false,
				// 轮播图 s
				current: 0,
				mode: 'nav',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				shopImg: [],
				sameAreaShopList: [],
				shopInfo: {},
				problemList: {},
				is_collect: false,
				is_share: false,
				videoCtx: null,
				navIsShow: true,
				currentNetworkType: '',
				tjrInfo: [],
				webTelPhone: ''
				// 轮播图 e
			};
		},

		// 谁查看了店铺滚动提示 s
		created() {
			setInterval(this.scroll, 3000) // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
		},
		// 谁查看了店铺滚动提示 e


		components: {
			transferShopPoster,
			uniCollapse,
			uniCollapseItem,
			uniSwiperDot,
			uniIcon
		},
		mounted() {
			this.videoCtx = uni.createVideoContext('shop_video')
			// console.log(this.videoCtx);
		},
		onLoad(e) {
			var me = this;
			if(e.scene) {
				var value = me.$util.getUrlParams(decodeURIComponent(e.scene));
				var id = value.id;
				if (value.is_share) {
					me.is_share = true;
				}
			} else {
				var id = e.id;
				if (e.is_share) {
					me.is_share = true;
				}
			}
			
			let webConfig = me.$SysCache.get('web_config');
			// console.log(webConfig);
			me.webTelPhone = webConfig.web.web_tel_phone;

			me.$Request.post(me.$api.transferShop.transferShopDetail, {
				id: id,
			}).then(res => {
				if (res.code == 200) {
					me.shopInfo = res.data.shopInfo;
					me.problemList = res.data.problemList;
					me.shopImg = me.$util.objectConverArray(me.shopInfo.imgs_info);
					me.is_collect = me.shopInfo.is_collect;
					if (me.shopImg[0].show_type == 'video') {
						this.navIsShow = false;
					}

					for (var i in res.data.sameAreaShopList) {
						me.sameAreaShopList.push(res.data.sameAreaShopList[i]);
					}
					me.browseUserList = res.data.browseUserList
					me.tjrInfo = res.data.tjrInfo;

					// console.log(res);
				} else {
					uni.showModal({
						title: '温馨提示',
						content: res.msg,
						showCancel: false,
						success: function(res) {
							if (me.is_share) {
								uni.switchTab({
									url: '../index/index'
								});
							} else {
								uni.navigateBack();
							}
						}
					});
				}
			});
			uni.getNetworkType({
				success(res) {
					me.currentNetworkType = res.networkType;
					// console.log(res);
				}
			});
			uni.onNetworkStatusChange(function(res) {
				me.currentNetworkType = res.networkType;
				me.checkNetworkPlayVideo();
				// console.log(res);
			});

			// console.log(e);
		},
		methods: {
			sameAreaMoreLink() {
				uni.navigateTo({
					url: '../transfer_shop/transfer_shop_list?type=you_may_also_like&district='+this.shopInfo.region_ids.district
				});
			},
			// 取消海报
			canvasCancel(val) {
				this.canvasFlag = val;
			},
			createCanvasImageEvn() {
				var me = this;
				me.$Request.get(me.$api.user.getPosterQrCode, {
					scene: 'id=' + this.shopInfo.id + '&is_share=true',
					path: 'pages/transfer_shop/transfer_shop_detail',
					width: '128'
				}).then(res => {
					if (res.code == 200) {
						let userInfo = me.$SysCache.get('app_user_info');
						// 这个是固定写死的小程序码
						Object.assign(this.posterData, {
							avatar: userInfo.userInfo.head, // 会员头像
							nickname: userInfo.userInfo.username, // 会员昵称
							shareContent: '铺经理线上已开业，新铺源继续上传中', // 分享信息
							url: me.shopImg[0].show_type == 'image' ? me.shopImg[0].img_url : me.shopImg[1].img_url, //商品主图
							transferShopTitle: me.shopInfo.title, // 转铺标题
							monthPrice: me.shopInfo.unit_month_price, // 月租金
							code: res.data, //小程序码
							closeBtn: 'https://pujingli.oss-cn-shenzhen.aliyuncs.com/source/close_btn.png'
						})
						this.$forceUpdate(); //强制渲染数据
						setTimeout(() => {
							this.canvasFlag = false; //显示canvas海报
							this.$refs.transferShopPoster.createCanvasImage(); //调用子组件的方法
						}, 500)
					}
					console.log(res);
				});
			},
			// 谁查看了店铺滚动提示 s
			scroll() {

				let egglistscrol = this.$refs.egglistscrol;

				this.marginTopVal = '-40px';

				this.animate = !this.animate;

				var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向

				setTimeout(function() {

					that.browseUserList.push(that.browseUserList[0]);

					that.browseUserList.shift();

					this.marginTopVal = '0px';

					that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了

				}, 500)

			},
			// 谁查看了店铺滚动提示 e

			// 视频播放
			videoPlay(event) {
				var me = this;
				me.videoIsPlay = true;
				me.checkNetworkPlayVideo();
			},
			checkNetworkPlayVideo() {
				var me = this;
				if (me.videoIsPlay) {
					var all_data_flow_play_video = me.$SysCache.get('all_data_flow_play_video');
					if ((me.currentNetworkType == '2g' || me.currentNetworkType == '3g' || me.currentNetworkType == '4g') &&
						all_data_flow_play_video == false) {
						me.videoCtx.pause();
						uni.showModal({
							title: '温馨提示',
							content: '当前处于数据流量，是否继续播放',
							success(res) {
								if (res.confirm === true) {
									me.videoCtx.play();
									me.$SysCache.put('all_data_flow_play_video', true);
								}
							}
						})
					}
				}
			},
			// 视频暂停
			videoPause(event) {
				var me = this;
				me.playButtonIsShow = true;
				me.pauseButtonIsShow = false;
				me.videoIsPlay = false;
				uni.showToast({
					title: '暂停播放',
					icon: 'none'
				});
			},
			// 视频播放完成
			videoEnded(event) {
				var me = this;
				me.playButtonIsShow = true;
				me.pauseButtonIsShow = false;
				me.videoIsPlay = false;
				uni.showToast({
					title: '播放结束',
					icon: 'none'
				});
			},
			// 播放视频
			play(event) {
				// if(this.videoCtx) {
				this.videoCtx.play();
				// 	uni.showToast({
				// 	    title: '开始播放',
				// 	    icon: 'none'
				// 	});
				// }
			},
			// 暂停视频
			pause(event) {
				// if(this.videoCtx) {
				this.videoCtx.pause();
				// 	uni.showToast({
				// 		title: '暂停播放',
				// 		icon: 'none'
				// 	});
				// }
			},
			// 轮播图 s
			change(e) {
				this.current = e.detail.current;
				if (this.shopImg[this.current].show_type == 'video') {
					this.navIsShow = false;
				} else {
					this.navIsShow = true;
				}
				this.pause();
			},
			// 查看地图
			checkMap() {
				var me = this;
				uni.openLocation({
					latitude: me.shopInfo.latitude,
					longitude: me.shopInfo.longitude,
					success: function() {
						console.log('success');
					}
				});
			},
			// 预览图片
			preivewImage(currentUrl) {
				var me = this;
				var urls = [];
				for (var i in me.shopImg) {
					if (me.shopImg[i].show_type == 'image') {
						urls.push(me.shopImg[i].img_url);
					}
				}
				uni.previewImage({
					current: currentUrl,
					indicator: 'number',
					urls: urls
				});
			},
			// 拨电话给卖家
			callMerchant() {
				var me = this;
				let userInfo = me.$SysCache.get('app_user_info');
				if(userInfo) {
					uni.makePhoneCall({
						phoneNumber: me.shopInfo.mobile
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			callKefu() {
				uni.makePhoneCall({
					phoneNumber: this.webTelPhone
				});
			},
			// 收藏
			collectShop() {
				var me = this;
				uni.showLoading({
					title: '收藏中'
				});
				me.$Request.post(me.$api.transferShop.collectTransferShop, {
					id: me.shopInfo.id,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.is_collect = true;
						return uni.showToast({
							title: '收藏成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			// 取消收藏
			unCollectShop() {
				var me = this;
				uni.showLoading({
					title: '取消收藏中'
				});
				me.$Request.post(me.$api.transferShop.unCollectTransferShop, {
					id: me.shopInfo.id,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						me.is_collect = false;
						return uni.showToast({
							title: '取消成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			// 轮播图 s

			// 返回上一页

			// 海报弹窗 s
			tuoptbudk() {
				this.tuobpup = true;
			},
			tuobgbup() {
				this.tuobpup = false;
			},
			// 我要砍价弹窗 s
			bargzbqbtn() {
				this.bargzb = true;
			},
			bargzbquxan() {
				this.bargzb = false;
			},
			submitBargain(e) {
				var me = this;
				if(me.shopInfo.unit_transfer_price) {
					if(e.detail.value.transfer_fee <= 0) {
						return uni.showToast({
							title: '请输入转让费',
							duration: 2000,
							icon: 'none'
						});
					}
				}
				if(e.detail.value.monthly_rent <= 0) {
					return uni.showToast({
						title: '请输入租金',
						duration: 2000,
						icon: 'none'
					});
				}
				let requestParmas = {
					monthly_rent: e.detail.value.monthly_rent,
					transfer_fee: e.detail.value.transfer_fee,
					id: me.shopInfo.id
				};
				uni.showLoading({
					title: '提交中'
				});
				me.$Request.post(me.$api.transferShop.bargain, requestParmas).then(res => {
					uni.hideLoading();
					// console.log(res);
					if (res.code == 200) {
						this.bargzb = false;
						return uni.showToast({
							title: '提交成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			}
			// 我要砍价弹窗 e

		}
	};
</script>

<style>
	@import url("transfer_shop_detail.css");
</style>
