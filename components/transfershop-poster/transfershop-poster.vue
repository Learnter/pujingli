<template>
	 <!-- 海报(想让海报显示隐藏要用hidden，v-if关闭后没办法在完整的出来海报) 保存海报按钮和关闭按钮 在html代码中写出来 绑定点击方法然后透明 再用canvas 覆盖 -->
	<view class="canvas_box" :hidden="canvasFlag">
		<view class="canvas_box_mask"></view><!-- 遮罩 -->
		<icon type="cancel" class="canvas_close_btn" size="60" @tap="canvasCancelEvn" color="transparent"/><!-- 关闭 -->
		<view class="button-wrapper"><!-- 保存海报按钮 -->
			<cover-view class="save_btn" @tap="saveCanvasImage"></cover-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			canvasFlag:{
				type:Boolean,
				default:true,
			},
			posterObj:{
				type:Object,
				default:{
					avatar: '', // 会员头像
					nickname: '', // 会员昵称
					shareContent: '铺经理线上已开业，新铺源继续上传中', // 分享信息
					url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
					transferShopTitle: '', // 转铺标题
					monthPrice: '', // 月租金
					code:'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png',//小程序码
				}
			}
		},
		methods:{
			// 海报
			// 画圆角矩形 ctx、x起点、y起点、w宽度、h高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
			roundRect(ctx, x, y, w, h, r, fillColor, strokeColor,btn) {
				// 开始绘制
				ctx.beginPath()
				// 绘制左上角圆弧 Math.PI = 180度
				// 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
				ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
				// 绘制border-top
				// 移动起点位置 x终点、y终点
				ctx.moveTo(x + r, y)
				// 画一条线 x终点、y终点
				ctx.lineTo(x + w - r, y)
				// 绘制右上角圆弧
				ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
				// 绘制border-right
				ctx.lineTo(x + w, y + h - r)
				// 绘制右下角圆弧
				
				ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
			
				// 绘制左下角圆弧
				
				ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
				
				// 绘制border-left
				ctx.lineTo(x, y + r)
				if(btn=='btn'){
					const grd = ctx.createLinearGradient(0, 0, 200, 0)//渐变色
					grd.addColorStop(0, fillColor)
					grd.addColorStop(1, strokeColor)
					// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
					ctx.setFillStyle(grd)
					// 对绘画区域填充
					ctx.fill()
				}else{
			
					if (fillColor) {
					// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
					ctx.setFillStyle(fillColor)
					// 对绘画区域填充
					ctx.fill()
					}
					if (strokeColor) {
					// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
					ctx.setStrokeStyle(strokeColor)
					// 画出当前路径的边框
					ctx.stroke()
					}
				}
				// 关闭一个路径
				ctx.closePath()
				// 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
				ctx.clip()
			},
			
			/**
			* canvas绘图相关，把文字转化成只能行数，多余显示省略号
			* ctx: 当前的canvas
			* text: 文本
			* contentWidth: 文本最大宽度
			* lineNumber: 显示几行
			*/
			canvasMultiLineText(ctx, text, contentWidth, lineNumber) {
				var textArray = text.split(""); // 分割成字符串数组
				var temp = "";
				var row = [];
				for (let i = 0; i < textArray.length; i++) {
					if (ctx.measureText(temp).width < contentWidth) {
					temp += textArray[i];
					} else {
					i--; // 这里添加i--是为了防止字符丢失
					row.push(temp);
					temp = "";
					}
				}
				row.push(temp);
			
				// 如果数组长度大于2，则截取前两个
				if (row.length > lineNumber) {
					var rowCut = row.slice(0, lineNumber);
					var rowPart = rowCut[1];
					var test = "";
					var empty = [];
					for (var a = 0; a < rowPart.length; a++) {
					if (ctx.measureText(test).width < contentWidth) {
						test += rowPart[a];
					} else {
						break;
					}
					}
					empty.push(test); // 处理后面加省略号
					var group = empty[0] + '...'
					rowCut.splice(lineNumber - 1, 1, group);
					row = rowCut;
				}
				return row;
			},
			// 获取海报的小程序码
			codeImg(){
				return new Promise((resolve,reject)=>{
					request({
						method: 'get',
						url:'/spSupport/getwxacodeunlimit',
						header: { 'Content-Type': 'application/x-www-form-urlencoded' },
						data: {
							version:this.$parent.globalData.version,
							scene:`sku=${this.sku}`,
							page:"pages/product/detail",
							width:"128px",
						},
					}).then((res)=>{
						if (res.data.code==0) {
						const fsm = wx.getFileSystemManager();
							const FILE_BASE_NAME = 'tmp_img_src';
							let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;
							fsm.writeFile({
								filePath,
								data: res.data.data,
								encoding: 'binary',
								success() {
									resolve(filePath)
								},
								fail() {
									this.canvasFlag=true;
									uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
								},
							});
						} else {
							uni.showToast({title: res.data.message, icon: 'none',duration: 2000,icon:'none'})
						}
					}).catch(()=>{
						this.canvasFlag=true;
						uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
					})
				})
			},
			
			
			// 生成海报
			createCanvasImage() {
				console.log(this.posterObj,'posterObj');
				// this.canvasFlag=false;
				// this.deliveryFlag = false;//关闭分享的弹窗
				console.log("海报生成中");
				uni.showLoading({
					title: '海报生成中...'
				});
				const ctx = uni.createCanvasContext('myCanvas');
				let _this = this;
				let phoneData = wx.getSystemInfoSync();
				this.phoneH = phoneData.windowHeight;
				this.phoneW = phoneData.windowWidth;
				let url = this.posterObj.url; // 店铺主图
				let code = this.posterObj.code; // 小程序二维码
				let nickname = this.posterObj.nickname; // 会员昵称
				let avatar = this.posterObj.avatar; // 会员头像
				let shareContent = this.posterObj.shareContent; // 分享内容
				let transferShopTitle = this.posterObj.transferShopTitle; // 店铺标题
				let monthPrice = this.posterObj.monthPrice; // 月租金
				let scaleW = this.phoneW/375;//按照苹果留 375*667比例 其他型号手机等比例缩放 显示
				let scaleH = this.phoneH/667;//按照苹果留 375*667比例 其他型号手机等比例缩放 显示
				let closeBtn=this.posterObj.closeBtn;
				
				console.log(this.phoneH,this.phoneW)
				
				console.log(scaleH,scaleW)
				ctx.draw()//清空原来的画图内容
				ctx.save();
				this.roundRect(ctx,25,40,(this.phoneW-60), (this.phoneH-180),0,'#fff','#fff');//绘制海报圆角背景白色的
				ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
				ctx.save();
				this.roundRect(ctx,25,40,(this.phoneW-60), (this.phoneH-180),0,'#f7f7f7','#f7f7f7');//绘制海报圆角背景 上半截灰色的
				ctx.restore();
				
				
				wx.getImageInfo({
			        src: closeBtn,
			        success(res) {
						ctx.drawImage(res.path,_this.phoneW-27,22*scaleH,24, 24)
						ctx.draw(true)
			      }  ,
					fail(){
						_this.canvasFlag=true;
						uni.showToast({title:'海报生成失败1',duration:2000,icon:'none'});
					}
				})
				
				//将网络图片转成本地路径 商品图片
			    wx.getImageInfo({
			       src: avatar,
			       success(res) {
						ctx.save();
						//覆盖绘制
						//问题：在微信小程序使用canvas绘制圆角图片时，微信调试工具正常显示，android真机都不显示。
						// 原因：因为ctx.clip()剪切区域使用的填充颜色是透明的，所以图片没出来。
						// 解决方案：将剪切区域设置成实体颜色就好了。
						_this.roundRect(ctx,(_this.phoneW-((_this.phoneW-80)))/2,55,55*scaleH, 55*scaleH,24,'#f7f7f7','#f7f7f7')//绘制图片圆角背景
						ctx.drawImage(res.path, (_this.phoneW-((_this.phoneW-80)))/2,55,55*scaleH, 55*scaleH,24);//绘制图
						ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
						ctx.draw(true)
				   } ,
					fail(){
						_this.canvasFlag=true;
						uni.showToast({title:'海报生成失败2',duration:2000,icon:'none'});
					}
				})
				ctx.setFontSize(12)//设置字体大小，默认10
				ctx.font = 'bold 12px sans-serif';
				ctx.fillText(nickname, (_this.phoneW-((_this.phoneW-230)))/2, 80*scaleH);
				
				ctx.setFontSize(12)//设置字体大小，默认10
				ctx.font = 'normal 12px sans-serif';
				ctx.setFillStyle('#888888')
				ctx.fillText('这个店铺不错分享给你', (_this.phoneW-((_this.phoneW-230)))/2, 106*scaleH);
				
				ctx.setFontSize(12)//设置字体大小，默认10
				ctx.setFillStyle('#000000')
				ctx.font = 'normal 12px sans-serif';
				ctx.fillText(shareContent, (_this.phoneW-((_this.phoneW-80)))/2, 140*scaleH);
				
				ctx.save(); 
				let nicknameW = ctx.measureText(nickname).width;//文本的宽度
				this.roundRect(ctx,(_this.phoneW-((_this.phoneW-230)))/2+nicknameW+18,68*scaleH,28, 16, 0,'#ff3600','#ff6a00','btn')
				ctx.restore(); 
				ctx.setFontSize(12)
				ctx.setFillStyle('#fff')//文字颜色：默认黑色
				ctx.font = 'normal 12px sans-serif';
				ctx.fillText('推荐', (_this.phoneW-((_this.phoneW-230)))/2+nicknameW+20,80*scaleH, 58);
				
				let urlImgH =  200*scaleH;
			    wx.getImageInfo({
			       src: url,
			       success(res) {
						ctx.save();
						//覆盖绘制
						//问题：在微信小程序使用canvas绘制圆角图片时，微信调试工具正常显示，android真机都不显示。
						// 原因：因为ctx.clip()剪切区域使用的填充颜色是透明的，所以图片没出来。
						// 解决方案：将剪切区域设置成实体颜色就好了。
						console.log(urlImgH);
						_this.roundRect(ctx,(_this.phoneW-((_this.phoneW-80)))/2,150,(_this.phoneW-90), urlImgH,0,'#f7f7f7','#f7f7f7')//绘制图片圆角背景
						ctx.drawImage(res.path, (_this.phoneW-((_this.phoneW-80)))/2,150,(_this.phoneW-90), urlImgH,0);//绘制图
						ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
						ctx.draw(true)
				   } ,
					fail(){
						_this.canvasFlag=true;
						uni.showToast({title:'海报生成失败3',duration:2000,icon:'none'});
					}
				})
				
				ctx.save(); 
				setTimeout(()=>{
					ctx.setGlobalAlpha(1)//不透明
					ctx.setFillStyle('#1c1c1c')//文字颜色：默认黑色
					ctx.setFontSize(14)//设置字体大小，默认10
					ctx.font = 'normal bold 14px sans-serif';
					let text =transferShopTitle;
					let row = this.canvasMultiLineText(ctx,text,(this.phoneW-80),2);//计算绘制的2行文本
					console.log((150*scaleH)+urlImgH+200);
					let contentTextY = 390-urlImgH+200; // 这段文字起始的y位置
					let leftSpace = (_this.phoneW-((_this.phoneW-80)))/2; // 这段文字起始的X位置
					let textLineHeight = 18; // 一行文字加一行行间距
					for (let b = 0; b < row.length; b++) {//一行一行绘制文本
						ctx.fillText(row[b], leftSpace, (contentTextY+ textLineHeight * b-15)*scaleH, (this.phoneW-80));
						ctx.draw(true)
					}
				},500)
				
				// ctx.setFontSize(14)//设置字体大小，默认10
				// ctx.font = 'bold 14px sans-serif';
				// ctx.fillText(transferShopTitle+transferShopTitle+transferShopTitle+transferShopTitle+transferShopTitle, (_this.phoneW-((_this.phoneW-100)))/2, 425*scaleH);
				
				ctx.save(); 
				ctx.restore(); 
				ctx.setFontSize(12)//设置字体大小，默认10
				ctx.font = 'normal 12px sans-serif';
				ctx.setFillStyle('#666666')
				ctx.fillText('月租金:', (_this.phoneW-((_this.phoneW-80)))/2, (390-urlImgH+200+40)*scaleH);
				
				ctx.setFontSize(12)//设置字体大小，默认10
				ctx.setFillStyle('#DC143C');
				ctx.fillText(monthPrice, (_this.phoneW-((_this.phoneW-180)))/2, (390-urlImgH+200+40)*scaleH);
				
			    wx.getImageInfo({
			       src: code,
			       success(res) {
						ctx.save();
						//覆盖绘制
						//问题：在微信小程序使用canvas绘制圆角图片时，微信调试工具正常显示，android真机都不显示。
						// 原因：因为ctx.clip()剪切区域使用的填充颜色是透明的，所以图片没出来。
						// 解决方案：将剪切区域设置成实体颜色就好了。
						_this.roundRect(ctx,_this.phoneW-140,(390-urlImgH+200+9)*scaleH, 74*scaleH, 74*scaleH,0,'#f7f7f7','#f7f7f7')//绘制图片圆角背景
						ctx.drawImage(res.path, _this.phoneW-140,(390-urlImgH+200+9)*scaleH,74*scaleH, 74*scaleH,0);//绘制图
						ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
						ctx.draw(true)
				   } ,
					fail(){
						_this.canvasFlag=true;
						uni.showToast({title:'海报生成失败4',duration:2000,icon:'none'});
					}
				})
				
				ctx.save(); 
				this.roundRect(ctx,(this.phoneW-160)/2,(this.phoneH-120),160, 36,18,'#ff3600','#ff6a00','btn')
				ctx.restore(); 
				ctx.setFontSize(14)
				ctx.setFillStyle('#fff')//文字颜色：默认黑色
				ctx.font = 'normal bold 14px sans-serif';
				ctx.fillText('保存图片', (_this.phoneW-58)/2, (this.phoneH-98),58);

				uni.hideLoading();
				return false;
				
				
			},
			
			// 保存到系统相册
			saveCanvasImage(){
				console.log('点击了保存')
				wx.showLoading({
					title: '保存中...'
				})
				let _this = this;
				// 1-把画布转化成临时文件
				uni.canvasToTempFilePath({
				x: 25,
				y: 40,
				width:(this.phoneW-60),    // 画布的宽
				height: (this.phoneH-180),   // 画布的高
				destWidth: (this.phoneW-60)*5,
				destHeight: (this.phoneH-180)*5,
				canvasId: 'myCanvas',
				success(res) {
					// 2-保存图片至相册
					uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res2) {
						wx.hideLoading();
						uni.showToast({title: '图片保存成功，可以去分享啦~', duration: 2000})
						_this.canvasCancelEvn();
					},
					fail() {
						uni.showToast({title: '保存失败，稍后再试', duration: 2000,icon:'none'})
						wx.hideLoading();
					}
					})
				},
				fail() {
					uni.showToast({title: '保存失败，稍后再试',duration: 2000,icon:'none'})
					wx.hideLoading();
				}
				})
			},
			// 取消海报
			canvasCancelEvn(){
				console.log()
				this.$emit('cancel',true)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 100%;
	}
	.canvas_box{
	    .canvas_box_mask{
	        width: 100%;
	        height: 100%;
	        position: fixed;
	        top: 0;
	        right: 0;
	        bottom: 0;
	        left: 0;
	        background: rgba(0, 0, 0, 0.5);
	        z-index:9;
	    }
	    .canvas{
	        position: fixed !important;
	        top: 0 !important;
	        left: 0 !important;
	        display: block !important;
	        width: 100% !important;
	        height: 100% !important;
	        z-index: 9;
	    }
	    .button-wrapper {
	        width: 320rpx;
	        height: 90rpx;
	        position: absolute;
	        bottom: 150rpx;
	        left:  215rpx;
			z-index: 16;
	    }
	    
	    .save_btn{
	        font-size: 30rpx;
	        line-height: 72rpx;
	        color: #fff;
	        width:100%;
	        height:100%;
	        text-align: center;
	        border-radius: 45rpx;
	        border-radius: 36rpx;
	        z-index: 10;
	    }
	    .canvas_close_btn{
	        position: fixed;
	        top:35rpx;
			right:0;
	        z-index:12;
			width:30px;
			height:30px;
	    }
	}
</style>
