<template>
	<view>
		<view v-if="step == 1">
			<form @submit="nextStep">
				<view class="apwsxinBox">
					<view class="shczhpBox">
						<view class="shczhpcont" @click="uploadImg()">
							<view class="shczhphe">
								<uni-icon class="i" type="camera" color="#FBA81F" size="28"></uni-icon>
							</view>
							<view class="shczhptx">上传照片</view>
							<!-- 照片显示位置 s -->
							<image :src="showPicture" mode="" class="tximg"></image>
							<!-- 照片显示位置 e -->
						</view>
					</view>
					<view class="aplyftitle">基本信息</view>
					<view class="potnqlistBox">
						<view class="potnqlist">
							<view class="potnqlistl">姓名</view>
							<view class="potnqlistx">
								<input class="uni-input" name='username' :value="requestParam.username || ''" placeholder="请填写姓名" />
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">性别</view>
							<view class="potnqlistx">
								<radio-group name="sex">
									<label style="margin-right:50upx;">
										<radio value="男" :checked="requestParam.sex == '男'" />男
									</label>
									<label>
										<radio value="女" :checked="requestParam.sex == '女'" />女
									</label>
								</radio-group>
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">手机</view>
							<view class="potnqlistx">
								<input class="uni-input" name='mobile' maxlength="11" :value="requestParam.mobile || ''" placeholder="请填写手机号码" />
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">出生日期</view>
							<view class="potnqlistx" style="border:none;">
								<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input">{{birthday}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="aplyftitle">学历信息</view>
					<view class="potnqlistBox">
						<view class="potnqlist">
							<view class="potnqlistl">毕业学校</view>
							<view class="potnqlistx">
								<input class="uni-input" name='graduated_school' :value="requestParam.graduated_school || ''" placeholder="请填写毕业学校" />
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">所学专业</view>
							<view class="potnqlistx">
								<input class="uni-input" name='major' :value="requestParam.major || ''" placeholder="请填写所学专业" />
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">学历文凭</view>
							<view class="potnqlistx">
								<picker class="znhometopshrtxz" @change="educationChange" :range="educationData">
									<text class="znhometopshrwza">{{education}}</text>
									<uni-icon type="arrowdown" color="#ffffff" size="18"></uni-icon>
								</picker>
							</view>
						</view>
						<view class="potnqlist">
							<view class="potnqlistl">入学时间</view>
							<view class="potnqlistx" style="border:none;">
								<view class="ruxuetimeBox">
									<view class="ruxuetim">
										<picker mode="date" :value="admission_time_start" :start="startDate" :end="endDate" @change="admissionTimeStartChange">
											<view class="uni-input">{{admission_time_start}}</view>
										</picker>
									</view>
									<view class="ruxuetim">至</view>
									<view class="ruxuetim">
										<picker mode="date" :value="admission_time_end" :start="startDate" :end="endDate" @change="admissionTimeEndChange">
											<view class="uni-input">{{admission_time_end}}</view>
										</picker>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="potnsbBox">
					<button class="potnsblink" form-type="submit">下一步</button>
				</view>
			</form>
		</view>


		<!-- 下一步内容 s -->
		<view v-if="step == 2">
			<form @submit="submitApply">
				<view class="aplyftitle">最近一份工作</view>
				<view class="potnqlistBox">
					<view class="potnqlist">
						<view class="potnqlistl">公司名称</view>
						<view class="potnqlistx">
							<input class="uni-input" name='last_company_name' placeholder="请填写公司名称" />
						</view>
					</view>
					<view class="potnqlist">
						<view class="potnqlistl">工作时间</view>
						<view class="potnqlistx">
							<view class="ruxuetimeBox">
								<view class="ruxuetim">
									<picker mode="date" :value="last_job_time_start" :start="startDate" :end="endDate" @change="lastJobTimeStartChange">
										<view class="uni-input">{{last_job_time_start}}</view>
									</picker>
								</view>
								<view class="ruxuetim">至</view>
								<view class="ruxuetim">
									<picker mode="date" :value="last_job_time_end" :start="startDate" :end="endDate" @change="lastJobTimeEndChange">
										<view class="uni-input">{{last_job_time_end}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="potnqlist">
						<view class="potnqlistl">职位类型</view>
						<view class="potnqlistx">
							<picker class="znhometopshrtxz" @change="jobTypeChange" :range="jobTypeData">
								<text class="znhometopshrwza">{{jobType}}</text>
								<uni-icon type="arrowdown" color="#ffffff" size="18"></uni-icon>
							</picker>
						</view>
					</view>
					<view class="potnqlist">
						<view class="potnqlistl">掌握技能</view>
						<view class="potnqlistx" style="border:none;">
							<input class="uni-input" name='last_master_a_skill' placeholder="请填写掌握技能" />
						</view>
					</view>
				</view>
				<view class="aplyftitle">工作内容</view>
				<div class="unTextareaBa">
					<view class="unTextarea">
						<textarea name="last_job_content" :maxlength="-1" value="" placeholder-style="color:#888888" placeholder="请填写工作内容" />
						</view>
				</div>
				<view class="aplyftitle">求职状态</view>
				<view class="potnqlistBox">
					<view class="potnqlist">
						<view class="qiuzhzhtaBox">
							<radio-group name="job_search_status">
								<div class="qiuzhzbuguBox" v-for="(item, index) in jobHuntStatusData" :key="index">
									<div class="qiuzhzbugu" v-for="(item2, index2) in item" :key="index2">
										<label>
											<radio :value="item2" />{{item2}}
										</label>
									</div>
								</div>
							</radio-group>
						</view>
					</view>				
				</view>
				<view class="potnsbBoxtwo">
					<div class="potnsbzi">
						<button type="primary" form-type="submit">确认申请</button>
					</div>
					<div class="potnsbzi">
						<button class="potnsblink" @click="step = 1">返回修改</button>
					</div>
				</view>
			</form>
		</view>
		
		<!-- 下一步内容 e -->
		
		
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	
	let id = 0,picture = '';
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
				jobHuntStatusData: [],
				educationData: [],
				education: '',
				jobTypeData: [],
				jobType: '',
				educa: 0,
				multiIndex: [0, 0, 0],
				birthday: '请选择',
				admission_time_start: '请选择',
				admission_time_end: '请选择',
				last_job_time_start: '请选择',
				last_job_time_end: '请选择',
				startDate:getDate('start'),
				endDate:getDate('end'),
				step: 1,
				requestParam: {},
				showPicture: ''
			}
		},
		components: {
			uniIcon
		},
		onLoad(e) {
			id = e.id;
			var me = this;
			me.getConfig();
		},
		methods: {
			// 上传图片
			uploadImg() {
				var me = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed '], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function (res) {
						// console.log(res);
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: '上传中'
						});
						me.$Request.upload(me.$api.uploadImage, tempFilePaths[0], 'picture', {
							name: 'picture',
							dir: 'recruitment',
							watermark: 'false'
						}).then(res=>{
							uni.hideLoading();
							if(res.code == 200) {
								picture = res.data.src;
								me.showPicture = res.data.show_src;
							} else {
								return uni.showToast({
									icon: 'none',
									title: res.msg
								});
							}
						});
					}
				});
			},
			nextStep: function(e) {
				var me = this;
				let username = e.detail.value.username,
				sex = e.detail.value.sex,
				mobile = e.detail.value.mobile,
				major = e.detail.value.major,
				graduated_school = e.detail.value.graduated_school,
				birthday = me.birthday,
				education = me.education,
				admission_time_start = me.admission_time_start,
				admission_time_end = me.admission_time_end;
				if(username == '') {
					return uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});
				}
				if(sex == '') {
					return uni.showToast({
						title: '请选择性别',
						icon: 'none'
					});
				}
				if(mobile == '') {
					return uni.showToast({
						title: '请填写手机号',
						icon: 'none'
					});
				} else if(!me.$util.checkPhone(mobile)) {
					return uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					});
				}
				if(birthday == '' || birthday == '请选择') {
					return uni.showToast({
						title: '请选择出生日期',
						icon: 'none'
					});
				}
				if(graduated_school == '') {
					return uni.showToast({
						title: '请填写业学校',
						icon: 'none'
					});
				}
				if(major == '') {
					return uni.showToast({
						title: '请填写所学专业',
						icon: 'none'
					});
				}
				if(education == '') {
					return uni.showToast({
						title: '请选择学历',
						icon: 'none'
					});
				}
				if(admission_time_start == '' || admission_time_start == '请选择') {
					return uni.showToast({
						title: '请选择入学时间',
						icon: 'none'
					});
				}
				if(admission_time_end == '' || admission_time_end == '请选择') {
					return uni.showToast({
						title: '请选择毕业时间',
						icon: 'none'
					});
				}
				
				me.requestParam = {
					username: username,
					mobile: mobile,
					sex: sex,
					birthday: birthday,
					graduated_school: graduated_school,
					major: major,
					education: education,
					admission_time: admission_time_start+' ~ '+admission_time_end,
					picture: picture
				};
				me.step = 2;
				
				return false;
			},
			submitApply: function(e) {
				var me = this;
				let last_company_name = e.detail.value.last_company_name,
				lastJobTimeStart = me.last_job_time_start,
				lastJobTimeEnd = me.last_job_time_end,
				jobType = me.jobType,
				last_master_a_skill = e.detail.value.last_master_a_skill,
				last_job_content = e.detail.value.last_job_content,
				job_search_status = e.detail.value.job_search_status;
				
				me.requestParam.last_company_name = last_company_name,
				me.requestParam.last_job_time = lastJobTimeStart+' ~ '+lastJobTimeEnd,
				me.requestParam.last_job_type = jobType,
				me.requestParam.last_master_a_skill = last_master_a_skill,
				me.requestParam.last_job_content = last_job_content,
				me.requestParam.job_search_status = job_search_status;
				
				me.submitRequest();
			},
			submitRequest() {
				var me = this;
				me.requestParam.job_offers_id = id;
				me.$Request.post(me.$api.recruitment.applyJobSeeking, me.requestParam).then(res => {
					// console.log(res);
					if(res.code == 200) {
						uni.showModal({
							title: '温馨提示',
							content: res.msg,
							showCancel: false,
							success() {
								uni.navigateBack();
							}
						});
						
					} else {
						return uni.showToast({
							title: res.msg,
							duration: 2000,
							icon:'none'
						});
					}
				});
			},
			educationChange: function(e) {
				var me = this;
				this.education = me.educationData[e.target.value];
			},
			jobTypeChange: function(e) {
				var me = this;
				this.jobType = me.jobTypeData[e.target.value];
			},
			bindDateChange: function(e) {
				this.birthday = e.target.value
			},
			admissionTimeStartChange: function(e) {
				this.admission_time_start = e.target.value
			},
			admissionTimeEndChange: function(e) {
				this.admission_time_end = e.target.value
			},
			lastJobTimeStartChange: function(e) {
				this.last_job_time_start = e.target.value
			},
			lastJobTimeEndChange: function(e) {
				this.last_job_time_end = e.target.value
			},
			getConfig() {
				var me = this;
				uni.showLoading({
					title: '正在加载'
				});
				
				me.$Request.get(me.$api.recruitment.config).then(res => {
					uni.hideLoading();
					if(res.code == 200) {
						me.educationData = res.data.education;
						me.jobTypeData = res.data.jobType;
						me.jobHuntStatusData = res.data.jobHuntStatus;
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
	@import url("applyfor.css");
</style>
