<template>
	<view>
		<form action="">
			<view class="aplyftitle">最近一份工作</view>
			<view class="potnqlistBox">
				<view class="potnqlist">
					<view class="potnqlistl">公司名称</view>
					<view class="potnqlistx">
						<input class="uni-input" name='' placeholder="请填写公司名称" />
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">工作时间</view>
					<view class="potnqlistx">
						<view class="ruxuetimeBox">
							<view class="ruxuetim">
								<picker mode="date" :value="datetwo" :start="startDate" :end="endDate" @change="bindDateChangetwo">
									<view class="uni-input">{{datetwo}}</view>
								</picker>
							</view>
							<view class="ruxuetim">至</view>
							<view class="ruxuetim">
								<picker mode="date" :value="datethr" :start="startDate" :end="endDate" @change="bindDateChangethr">
									<view class="uni-input">{{datethr}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">职位类型</view>
					<view class="potnqlistx">
						<picker class="znhometopshrtxz" @change="bindPickerChange" :value="educa" :range="array">
							<text class="znhometopshrwza">{{array[educa]}}</text>
							<uni-icon type="arrowdown" color="#ffffff" size="18"></uni-icon>
						</picker>
					</view>
				</view>
				<view class="potnqlist">
					<view class="potnqlistl">掌握技能</view>
					<view class="potnqlistx" style="border:none;">
						<input class="uni-input" name='' placeholder="请填写掌握技能" />
					</view>
				</view>
			</view>				
			<view class="aplyftitle">工作内容</view>
			<div class="unTextareaBa">				
				<view class="unTextarea">
					<textarea name="content" :maxlength="-1" value="" placeholder-style="color:#888888" placeholder="请填写工作内容"/>
				</view>
			</div>
			<view class="aplyftitle">求职状态</view>
			<view class="potnqlistBox">
				<view class="potnqlist">
					<view class="qiuzhzhtaBox">
						<radio-group name="">		
							<div class="qiuzhzbuguBox">
								<div class="qiuzhzbugu">
									<label>
										<radio value="1" checked="true" />离职-随时到岗
									</label>
								</div>
								<div class="qiuzhzbugu">
									<label>
										<radio value="2" />离职-暂不考虑
									</label>
								</div>
							</div>	
							<div class="qiuzhzbuguBox">
								<div class="qiuzhzbugu">
									<label>
										<radio value="3" />离职-考虑机会
									</label>
								</div>
								<div class="qiuzhzbugu">
									<label>
										<radio value="4" />离职-月内到岗
									</label>
								</div>
							</div>																			
						</radio-group>
					</view>
				</view>				
			</view>
			<view class="potnsbBox">
				<div class="potnsbzi">
					<button type="primary">确认申请</button>
				</div>
				<div class="potnsbzi">
					<navigator url="applyfor" class="potnsblink">返回修改</navigator>
				</div>
			</view>
		</form>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				array: ['-请选择-','兼职','全职'],
				educa: 0,				
				multiIndex: [0, 0, 0],
				date: getDate({
					format: true
				}),
				datetwo: getDate({
					format: true
				}),
				datethr: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end')
			}
		},
		components: {
			uniIcon
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.educa = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindDateChangetwo: function(e) {
				this.datetwo = e.target.value
			},
			bindDateChangethr: function(e) {
				this.datethr = e.target.value
			}
		}
	}
</script>

<style>
	page {
		background: #F1F1F1;
	}
	.shczhpBox {
		text-align: center;
		padding:30upx 0upx;
		background: #ffffff;
	}
	.shczhphe {
		display: inline-block;
		width:90upx;
		height:90upx;
		line-height: 90upx;
		text-align: center;
		border:6upx solid #FBA81F;
		border-radius: 50%;
	}
	.shczhphe .i {
		font-weight: 600;
	}
	.shczhpcont {
		display: inline-block;
		width:140upx;
		height:140upx;
		position: relative;
	}
	.shczhpcont .tximg {
		position: absolute;
		left:0px;
		top:0px;
		width:100%;
		height:100%;
	}
	.shczhptx {
		font-size:24upx;
		color:#333333;
	}
	.aplyftitle {
		padding:20upx 30upx;
		background: #F1F1F1;
	}
	.potnqlistBox {
		padding:0upx 30upx;
		background: #ffffff;
	}
	
	.potnqlist {
		display: flex;
		padding-top:30upx;
	}
	.potnqlistl {
		color:#333333;
		min-width: 160upx;
		height:70upx;
		line-height: 70upx;
	}
	.potnqlistx {
		flex: 1;
		height:72upx;
		line-height: 72upx;
		border-bottom:2upx solid #eeeeee;
	}
	.potnqlistx .uni-input {
		padding: 0upx;
		height:70upx;
		line-height: 70upx;
		width:100%;
		background: none;
		color:#666666;
	}
	
	.potnsbBox {
		display: flex;
		padding:30upx 15upx 10upx 15upx;
	}
	.potnsbzi {
		padding:0upx 15upx;
		flex: 1;
	}
	.potnsbzi button {
		background: #FBA81F;
		width:100%;
		text-align: center;
		font-size:28upx;
		border-radius: 8upx;
		height:92upx;
		line-height: 92upx;
		padding:0upx;
	}
	.potnsbzi button::after {
		border:none;
	}
	.potnsbzi .potnsblink {
		background: #FBA81F;
		border-radius: 0upx;
		height:92upx;
		line-height: 92upx;
		text-align: center;
		width:100%;
		color:#ffffff;
		font-size:28upx;
		border-radius: 8upx;
	}
	.ruxuetimeBox {
		display: flex;
	}
	.ruxuetim {
		flex: 1;
		text-align: center;
		line-height: 70upx;
	}
	.unTextareaBa {
		padding:30upx;
		background: #ffffff;
	}
	.unTextarea {
		border:1px solid #EFEFEF;
		border-radius: 6upx;
		padding:20upx;
	}
	.qiuzhzhtaBox {
		flex: 1;
	}
	.qiuzhzbuguBox {
		display: flex;
	}
	.qiuzhzbugu {
		flex: 1;
		margin-bottom:30upx;
	}
	.qiuzhzbugu label {
		color:#333333;
	}
	
</style>
