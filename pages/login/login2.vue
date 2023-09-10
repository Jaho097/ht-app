<template>
	<view class="page">
		<view class="logo" style="margin-top: 20px; margin-bottom: 20px;">
			<image src="/static/120.png" style="width: 120px; height: 120px;"></image>
		</view>
		<!-- 填写区 -->
		<view class="input-info">
			<view class="info">
				<uni-icons type="contact" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.phone}" maxlength="11" v-model="form.phone" placeholder="手机号">
				<view class="more"></view>
			</view>
			<view class="info" v-if="isLoginCode==1">
				<uni-icons type="link" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.code}" v-model="form.code" maxlength="6" placeholder="请输入验证码">
				<view class="more">
					<text class="mo">获取验证码</text>
					<text class="mo" style="display: none">59秒后重试</text>
				</view>
			</view>
			<view class="info" v-else>
				<uni-icons type="locked-filled" size="18" color="#555555"></uni-icons>
				<input :password='!isPassword' :class="{'max':form.password}" v-model="form.password" maxlength="26" placeholder="请输入密码">
				<view class="more">
					<text class="iconfont" :class="isPassword?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPassword = !isPassword"></text>
					<!--text class="mo">忘记密码</text-->
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn-info">
			<!-- <button type="warn" style="width:90%;" class="uni-radius-5" :disabled="!isLogin?false:true" @click="!isLogin?onLogin():''">登录</button> -->
			<button type="warn" v-if="isLogin" style="width:90%;" class="uni-radius-5" @click="onLogin()">登录</button>
			<button type="warn" v-else style="width:90%;" class="uni-radius-5" disabled="true">登录</button>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<!--text @click="onLoginCut" v-if="isLoginCode==1">{{isLoginCode==1?'手机号密码登录':'短信验证码登录'}}</text-->
			<!-- <text class="mo" @click="onForgetPassword">忘记密码</text> -->
			<text @click="onRegister">新用户注册</text>
		</view>
		<!-- 其他方式登录 -->
		<!--view class="other-ways">
			<text>其他登录方式</text>
		</view-->
		<!-- 登录方式 -->
		<!--view class="login-way">
			<view class="way">
				<image src="/static/wx_ico.png" mode=""></image>
				<text>微信登录</text>
			</view>
		</view-->
	</view>
</template>

<script>
import SHA256 from '@/js_sdk/md5/md5.js';
var _self,uuid, app_key = SHA256('Mms3frKtH3A6');
export default {
	data() {
		return {
			isLogin: false,
			isLoginCode: false,
			isPassword: false,
			//isReg: false,
			confData:{},
			contToken: '',
			// 表单
			form:{
				phone: '',
				code: '',
				password: '',
			},
			uuid : '',//测试用的设备ID：60c5b61240cef295 
			system : '',
		};
	},
	onShow() {
		
	},
	onLoad() {
		_self = this;
		// #ifdef APP-PLUS
		let Info = uni.getSystemInfoSync();
		_self.system = Info.brand+' '+Info.platform+' '+Info.system;
		//console.log(_self.system,_self.uuid);
		// #endif
		_self.getconf();
	},
	methods:{
		onRegister(){
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},
		onForgetPassword(){
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},
		async getconf(){
		
			uni.request({
				url: this.appSerip+'/apicom/index/getconf',
				header: {'content-type' : "application/x-www-form-urlencoded"},
				method: 'GET',
				timeout: 5000,
				success: res => {
					if(res.data.status == 1){
						this.confData = res.data.data; 
						this.isLoginCode = this.confData.web_reg_code;
						var url = this.confData.app_url;
						this.contToken = SHA256(url+"+"+SHA256(this.appSerip));
					}
				}
			});
		},
		dologin(uuid){
			console.log(this.contToken);
			// if(this.appToken !== this.contToken){ 
			// 	uni.showToast({title:"加载失败!",icon:"loading"});
			// 	return;
			// }
			if(!uuid){
				uni.showToast({title:"无法识别设备ID",icon:"loading"});
				return;
			}
			uni.request({
				url: this.apiServer+'/apicom/user/login',
				header: {'content-type' : "application/x-www-form-urlencoded"},
				method: 'POST',
				timeout: 5000,
				data: {
					uuid     : uuid,
					mobile   : this.form.phone,
					password : this.form.password,
					regdomain: this.system
				},
				success: res => {
					res = res.data;
					//uni.showLoading({'title':res.message});
					if(res.status == 1){
						if(!res.data.uuid || res.data.uuid != uuid){
							uni.showToast({title:"异地登录，账户存在风险！",icon:"loading"});
							return;
						}					
						uni.showToast({title:"登陆成功!"});
						uni.setStorageSync('UID' , res.data.uid + '');
						uni.setStorageSync('MOBILE', res.data.mobile + '');
						uni.setStorageSync('TOKEN', res.data.token + '');
						uni.reLaunch({url: '/pages/my/my'});
					}else{
						uni.showToast({title:res.message,icon:"none"});
						//uni.hideLoading();
					}
				},
				fail: (e) => {
					uni.showToast({title:"登陆失败，或连接超时!",icon:"none"});
					console.log(e);
				}
			});
		},
		/*登录点击*/
		onLogin(){
			// #ifdef APP-PLUS
			plus.device.getInfo({
				success: (res)=> {
					if(res.uuid=='748c589ebef2cc1a')res.uuid='60c5b61240cef295';
					this.dologin(res.uuid);
					//_self.uuid = res.uuid;
				} 
			});
			// #endif
			// #ifndef APP-PLUS
			this.dologin('60c5b61240cef295');
			// #endif
			
		}
	},
	watch:{
		form:{
			handler(newValue, oldValue) {
				// 验证码
				if(this.isLoginCode==1){
				  this.isLogin = newValue.code && newValue.phone ? true : false;
				}
				// 账号密码
				if(this.isLoginCode==0){
				  this.isLogin = newValue.password && newValue.phone ? true : false;
				}
			},
			deep: true
		}
	}
}
</script>

<style scoped lang="scss">
@import 'login.scss';
</style>