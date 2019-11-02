/**
 * API接口配置文件
 */
module.exports = {
	common: {
		config: "config/getInfo", // 获取服务端配置
	},
	config: {
		region: "config/region",
		getCarousel: 'config/getCarousel',
		getCurrentCityData: 'config/getCurrentCityData',
		getSortCityData: 'config/getSortCityData'
	},
	login: {
		phoneLogin: "user/registerOrLogin", // 手机号登陆
		weChatLogin: "user/weChatRegisterOrLogin", // 微信登陆
		logout: "user/logout" // 会员退出
	},
	transferShop: {
		index: 'shop/homeShopInfo',
		transferShopDetail: 'shop/transferShopDetail',
		collectTransferShop: 'shop/collectTransferShop',
		unCollectTransferShop: 'shop/unCollectTransferShop',
		seekingList: 'shop/seekingList',
		seekingDetail: 'shop/seekingDetail',
		transferShopList: 'shop/transferShopList',
		transferShopListByType: 'shop/transferShopListByType',
		searchTransferShopList: 'shop/getTransferShopList',
		collectionList: 'shop/collectionList',
		seekIngCollection: 'shop/seekIngCollection',
		releaseSeeking: 'shop/releaseSeeking',
		releaseTransferShop: 'shop/releaseTransferShop',
		getReleaseTransferShopDraft: 'shop/getReleaseTransferShopDraft',
		cancelCollection: 'shop/unCollectTransferShop',
		browseList: 'shop/browseList',
		browseDel: 'shop/browseDel',
		releaseList: 'shop/releaseList',
		releaseDel: 'shop/releaseDel',
		releaseSeekDel: 'shop/releaseSeekDel',
		releaseListSeek: 'shop/releaseListSeek',
		getNearbyStores: 'shop/getNearbyStores',
		getNearStoresList: 'shop/getNearStoresList',
		errorCorrection: 'shop/errorCorrection',
		getSeekingMobile: 'shop/getSeekingMobile',
		rentList: 'shop/rentList',
		checkUploadVideoChance: 'shop/checkUploadVideoChance',
		getPayTransferShopDetail: 'shop/getPayTransferShopDetail',
		getSuccessTransferShopList: 'shop/getSuccessTransferShopList',
		bargain: 'shop/bargain'
	},
	webNotice: {
		noticeList: 'message/webNoticeList',
		noticeDetail: 'message/webNoticeDetail'
	},
	userMessage: {
		postMessage: "user/sendMessage", // 发布反馈信息
	},
	sendVerifyCode: 'sendPhoneVerifyCode', // 发送手机验证码
	uploadImage: 'uploadImage', // 上传图片
	uploadVideo: 'uploadVideo', // 上传视频
	NoticeList: {
		getNoticeList: "notice/noticeList", // 获取公告信息
		getNoticeDetail: "notice/noticeDetail", // 发布反馈信息
	},
	problem: {
		getProblemDetail: "problem/detail" // 获取常见问题
	},
	HelpList: {
		getHelpList: "help/getHelpList", // 获取公告信息
	},
	partner: {
		getPartnerList: "partner/getPartnerList", // 获取合作伙伴列表
		getPartnerDetail: "partner/getPartnerDetail", // 获取合作伙伴详情
	},
	selection: {
		getDataList: "selection/getDataList", // 获取公告信息
		selectionDetail: "selection/selectionDetail", // 获取公告信息
	},	
	shopAsk: {
		question: "shopAsk/question",
		questionList: "shopAsk/questionList",
		problemDetail: "shopAsk/problemDetail",
		answerLaud: "shopAsk/answerLaud",
		searchQuestionList: "shopAsk/searchQuestionList"
	},
	successCase: {
		detail: 'successCase/detail',
		list: 'successCase/list'
	},
	recruitment: {
		jobOffersList: 'recruitment/jobOffersList',
		jobOffersDetail: 'recruitment/jobOffersDetail',
		applyJobSeeking: 'recruitment/applyJobSeeking',
		config: 'recruitment/config'
	},
	pay: {
		weChatPay: 'pay/weChatPay'
	},
	user: {
		getPosterQrCode: 'user/getPosterQrCode',
		getUserInfo: 'user/getUserInfo',
		getTeamUserList: 'user/getTeamUserList',
		getMoneyInfo: 'user/getMoneyInfo',
		getMoneyLogList: 'user/getMoneyLogList',
		applyWithdrawal: 'user/applyWithdrawal',
		getWithdrawalLogList: 'user/getWithdrawalLogList'
	}
};
