<template>
	<view>
		<view class="recyqmBoxx">
			<!-- <image src="../../static/images/zpzp_135.png" mode="scaleToFill" class="yqmbBgimg"></image>
			<view class="recyewm">
				<image src="../../static/images/ewnm.png" mode="widthFix"></image>
			</view> -->
			<canvas class="canvas" @play="play" style="height: 100%;width: 100%;" canvas-id="myCanvas"></canvas><!-- 海报 -->
			
			<!-- <cover-view class="recyewmtjr">
				<cover-view class="recyewmtjrzi">推荐人：{{username}}</cover-view>
			</cover-view> -->
			
		</view>
		
		<cover-view class="recyebcunBtn">
			<button type="primary" class="recyebcun" @click="saveCanvasImage">保存</button>
		</cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: ''
			}
		},
		onLoad(e) {
			let userInfo = this.$SysCache.get('app_user_info');
			this.username = userInfo.userInfo.username;
			
			this.generatePoster();
		},
		methods: {
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
			generatePoster() {
				uni.showLoading({
					title: '生成海报中...'
				});
				let _this = this;
				const ctx = uni.createCanvasContext('myCanvas');
				let phoneData = wx.getSystemInfoSync()
				,phoneH = phoneData.windowHeight
				,phoneW = phoneData.windowWidth;
				// console.log(phoneW, phoneH);
				ctx.drawImage('/static/images/zpzp_135.png', 0, 0, phoneW, phoneH)
				ctx.save();
				let  userInfo = _this.$SysCache.get('app_user_info');
				_this.$Request.get(_this.$api.user.getPosterQrCode, {
					scene: 'code=' + userInfo.userInfo.invite_code,
					path: 'pages/login/login',
					width: '128',
					is_hyaline: 2
				}).then(res => {
					wx.getImageInfo({
						src: res.data,
						success(res) {
							ctx.drawImage(res.path, (phoneW - (res.width / 2)) / 2, (phoneH - (res.height / 2)) / 2, res.width /
								2, res.height / 2)
							ctx.draw(true)
						}
					})
					ctx.save();
					uni.hideLoading()
				});
				let scaleWidth = phoneW / 414
				, scaleHeight = phoneH / 672;
				
				if(scaleWidth < 0.9) {
					scaleWidth = 0.9;
				}
				if(scaleHeight > 1) {
					scaleHeight = 1;
				}
				let usernameStrlen = (this.username.replace(/[^\u0000-\u00ff]/g,'aa').length/2+3)*17*scaleWidth;
				// this.roundRect(ctx,((phoneW-(usernameStrlen+40)*scaleWidth)/2),((phoneH)/2+300/2),(usernameStrlen+40)*scaleWidth, 44*scaleWidth,5,'#179B16','#179B16','btn')
				this.roundRect(ctx,((phoneW-(usernameStrlen+40)*scaleWidth)/2),((phoneH)*0.8)-100*scaleHeight,(usernameStrlen+40)*scaleWidth, 40*scaleWidth,5,'#7365D6','#7365D6','btn')
				ctx.restore(); 
				// ctx.setFontSize(30)
				ctx.setFillStyle('#fff')//文字颜色：默认黑色
				ctx.font = 'normal blod '+parseInt(scaleWidth*17)+'px sans-serif';
				// console.log(usernameStrlen);
				// console.log(this.username.replace(/[^\u0000-\u00ff]/g,'aa').length);
				ctx.fillText('推荐人 : '+this.username, ((phoneW-usernameStrlen)/2), ((phoneH)*0.8)-74*scaleHeight,usernameStrlen);
				
				
			},
			saveCanvasImage() {
				uni.showLoading({
					title: '保存中...'
				});
				let _this = this;
				// 1-把画布转化成临时文件
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success(res) {
						// 2-保存图片至相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res2) {
								uni.hideLoading()
								uni.showToast({
									title: '图片保存成功，可以去分享啦~',
									duration: 2000
								})
							},
							fail() {
								uni.showToast({
									title: '保存失败',
									duration: 2000,
									icon: 'none'
								})
								uni.hideLoading()
							}
						})
					},
					fail() {
						uni.showToast({
							title: '保存失败，稍后再试',
							duration: 2000,
							icon: 'none'
						})
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style>
	.recyqmBoxx {
		position: fixed;
		left: 0upx;
		top: 0upx;
		right: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}

	.recyqmBoxx .yqmbBgimg {
		position: absolute;
		left: 0upx;
		top: 0upx;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.recyewmtjr {
		position: absolute;
		z-index: 110;
		width:80%;
		bottom: 28%;
		left: 10%;
		text-align: center;
	}
	.recyewmtjrzi {
		display: inline-block;
		color:#ffffff;
		font-size: 30upx;
		background:#7365D6;
		padding: 20upx 30upx;
		border-radius: 8upx;
	}
	.recyewm {
		position: absolute;
		z-index: 100;
		width: 36%;
		bottom: 35%;
		left: 32%;
	}

	.recyewm image {
		width: 100%;
	}

	.recyebcunBtn {
		position: fixed;
		z-index: 9999999;
		width: 80%;
		bottom: 4%;
		left: 10%;
	}
</style>
