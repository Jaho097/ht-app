<template>
	<view class="page">
		<view class="logo" style="margin-top: 20px; margin-bottom: 20px;">
			<image src="/static/120.png" style="width: 120px; height: 120px;"></image>
		</view>
		<!-- 填写区 -->
		<view class="input-info">
			<view class="info">
				<uni-icons type="contact" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.phone}" v-model="form.phone" maxlength="11" placeholder="手机号">
				<view class="more">
				</view>
			</view>
			<view class="info" v-if="isLoginCode==1">
				<uni-icons type="link" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.code}" v-model="form.code" maxlength="6" placeholder="请输入验证码">
				<view class="more">
					<text class="mo">获取验证码</text>
					<text class="mo" style="display: none">59秒后重试</text>
				</view>
			</view>
			<view class="info">
				<uni-icons type="locked-filled" size="18" color="#555555"></uni-icons>
				<input :password='!isPassword' :class="{'max':form.password}" maxlength="26" v-model="form.password" placeholder="密码长度为6-16位，必须包含字母、数字">
				<view class="more">
					<text class="iconfont" :class="isPassword?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPassword = !isPassword"></text>
				</view>
			</view>
			<view class="info" v-if="isLoginCode==0">
				<uni-icons type="locked-filled" size="18" color="#555555"></uni-icons>
				<input :password='!isPasswordb' :class="{'max':form.passwordb}" maxlength="26" v-model="form.passwordb" placeholder="请再次输入密码，两次输入密码必须相同">
				<view class="more">
					<text class="iconfont" :class="isPasswordb?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPasswordb = !isPasswordb"></text>
				</view>
			</view>
			<view class="info" v-if="confData.is_recommend">
				<uni-icons type="redo-filled" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.agent}" v-model="form.agent" maxlength="11" placeholder="邀请码">
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn-info">
			<button type="warn" style="width:90%;" class="uni-radius-5" :disabled="isRegister?false:true" @click="isRegister?onRegister():''">注册</button>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<text></text>
			<text @click="onLogin">已有账号?登录</text>
		</view>
	</view>
</template>

<script>
import SHA256 from '@/js_sdk/md5/md5.js';
var app_key = SHA256('Mms3frKtH3A6');
export default {
	data() {
		return {
			isPassword: false,
			isPasswordb: false,
			isRegister: false,
			isLoginCode: false,
			isReg: false,
			confData:{},
			contToken: '',
			// 表单
			form:{
				phone: '',
				code: '',
				password: '',
				passwordb:''
			},
			system : '',
		};
	},
	onLoad(params) {
		if(params.id)this.form.agent = params.id;
		this.getconf();
		// #ifdef APP-PLUS
		let Info = uni.getSystemInfoSync();
		this.system = Info.platform+' '+Info.platform+' '+Info.system;
		// #endif
		console.log(params.id);
	},
	methods:{
		async getconf(){
			uni.request({
				url: this.apiServer+'/apicom/index/getconf',
				header: {'content-type' : "application/x-www-form-urlencoded"},
				method: 'GET',
				timeout: 5000,
				success: res => {
					if(res.data.status == 1){
						this.confData = res.data.data; 
						this.isLoginCode = this.confData.web_reg_code;
						this.isReg = this.confData.is_reg;
						var url = this.confData.app_url;
						var ips = this.confData.app_ips;
						this.contToken = SHA256(url+"+"+SHA256(this.appSerip));
					}
				}
			});
		},
		onLogin(){
			uni.redirectTo({
				url: '/pages/login/login'
			})
		},
		/**
		 * 注册点击
		*/
		onRegister(){
			/*if(this.appToken !== this.contToken){
				uni.showToast({title:"加载失败!",icon:"loading"});
				return;
			}*/
			uni.request({
				url: this.apiServer+'/apicom/user/register',
				header: {'content-type' : "application/x-www-form-urlencoded"},
				method: 'POST',
				timeout: 5000,
				data: {
					mobile     : this.form.phone,
					sms_code   : this.form.code,
					password   : this.form.password,
					re_password: this.form.passwordb,
					recommend  : this.form.agent,
					recom_id   : this.form.agent,
					regdomain  : this.system,
				},
				success: res => {
					var res = res.data;
					if(res.status == 1){
						console.log(res);						
						uni.showToast({title:'注册成功!'});
						uni.setStorageSync('UID' , res.data.uid + '');
						uni.setStorageSync('MOBILE', res.data.mobile + '');
						uni.setStorageSync('TOKEN', res.data.token + '');
						setTimeout(() =>{
							uni.reLaunch({url: '/pages/my/my'});
						},2000)
					}else{
						uni.showToast({title:res.message,icon:"none"});
					}
				},
				fail: (e) => {
					uni.showToast({title:"注册失败，或连接超时!",icon:"none"});
					console.log(e);
				}
			});
		}
	},
	watch:{
		form:{
			handler(newValue, oldValue) {
				if(this.isLoginCode==1){
					if(newValue.phone && newValue.code && newValue.password){
						this.isRegister = true;
					}else{
						this.isRegister = false;
					}
				}
				if(this.isLoginCode==0){
					if(newValue.phone && newValue.password && newValue.passwordb){
						this.isRegister = true;
					}else{
						this.isRegister = false;
					}
				}
					
			},
			deep: true
		}
	}
}
</script>

<style scoped lang="scss">
@import 'register.scss';
</style>
