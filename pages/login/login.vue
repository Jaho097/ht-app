<template>
	<view class="page">
		<!-- <view class="logo" style="margin-top: 20px; margin-bottom: 20px;">
			<image src="/static/120.png" style="width: 120px; height: 120px;"></image>
		</view> -->
		<div class="sc-iAyFgw boDnnU"><img src="/static/logo.jpg" alt="logo"></div>
		<!-- 填写区 -->
		<view class="input-info">
			<view class="info hAXICq">
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAYAAAAbW8YEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3RjEwNUFENjg1QTExRThCOERDQThFRERENUJCNkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3RjEwNUFFNjg1QTExRThCOERDQThFRERENUJCNkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzdGMTA1QUI2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzdGMTA1QUM2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75N8WtAAAC10lEQVR42rSXX2hOYRzH33cWRlJvLggt/1pMhDVL8zcJF4gokz8lQ4pckZiNSWIlZQlXipSr+S9u7OZ9L3Cxlpm/E2OMptwwGz4/fU89He/2nnPe7Vef93ee55ye7/k953l+v+eNJ5PJWAgbDvNgCuTBD3gK9SUlJd+CDpIb8Ll8qIQyGJjmfmcqlbqGr0D8dabBcgIIlimaLY5gJ3yAn2pb/wZoRHxjtqJb4TIMgV9wBmbBIBgNg2EGnNYL2JRfQri8t0HjvXzTIkjqE7yEFdDkf4jp/OcRKsDVgfluKOVeKmykZyX4EeanE/SJN+MWwDsYALW8SDyMqK3QYl1v1/fLaAi34bapadO+MIzoavkGuBFmTyF8D/dIzbVhRGfL18Wi2XX54jCio+SfRxR94RsnkKjX3x1R9Le3O8KIfpIfH1E0X/5zGNEn8ksjii6XfxxG1FuxpTAnjBp7s0j71V1QgURvQ7Ouz8OwgIJDcRfVfAU3w4jaQtij60K9xIgMggncLZiurt3s2a6wudfssEqat7iOwhXo8NVYq0QVMFJ91QgeipLwPTsIVc6sdGnqvyj6Aqcu2wxVIXgkm9KWp6i++gp/oYpAoe8gYM92MNV5UUvbYi2icb7+N9CqF0morvr381vYQcR3g0ZqWeQA3HcEn8FOGCuBubDKqhEDT8CPgXJnf1tyuEPElenKWzrR43DMma7NmsZz8L6HytIKF1T41zufwxZiTSZRq4X7nOhm2vHDyaWZytofuKpa2qjuvUS7qyfRiTrrmLWoALdEyYEI2+lhkY45Zqd0nPlPtFoHsG4V37ZYFoZwO26NDnR2gDvhF50E63Rd61T+WJbCDc7srSTaya5omVatfbuTsb61GiUUs02u6DL5ep3m+syI1tLnAzWXeKK5TpJ+GOsf88adZtkqR6nO+7vQ3k+iTU4KTdjPd/0Pmao92R9mJW+/7QhLJH8FGAAQ88OaJvO6+gAAAABJRU5ErkJggg==" alt="icon"></div>
				<input type="tel" :class="{'max':form.phone}" maxlength="11" v-model="form.phone" placeholder="手机号">
				<view class="more"></view>
			</view>
			<view class="info hAXICq" v-if="isLoginCode==1">
				<uni-icons type="link" size="18" color="#555555"></uni-icons>
				<input type="tel" :class="{'max':form.code}" v-model="form.code" maxlength="6" placeholder="请输入验证码">
				<view class="more">
					<text class="mo">获取验证码</text>
					<text class="mo" style="display: none">59秒后重试</text>
				</view>
			</view>
			<view class="info hAXICq" v-else>
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAdCAYAAACwuqxLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3QTY1NjcyNjg1QTExRTg5ODg1QUZEMDJGMzhBOTMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3QTY1NjczNjg1QTExRTg5ODg1QUZEMDJGMzhBOTMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzdBNjU2NzA2ODVBMTFFODk4ODVBRkQwMkYzOEE5MzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzdBNjU2NzE2ODVBMTFFODk4ODVBRkQwMkYzOEE5MzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lJBOKAAADdElEQVR42pyW6W9MYRSHZ+4MpbaqpIao1r4T+8RWsX1BiCDCBxrqm8QHif+EEBFEQkjsEcSudEosbW0V1Wpom7a6qaXMdPyOPCM3k5l26k2e3Myde39nec859/UWFRV5UliDxEyxUqSJuyIkvgSDwWhXL/pTEB8uFojVYiEGRolM8UBUdvWyNy4CHwL9xRAxVswTi8Vo0Syi/PdJPBTF4o1oFO3ip6IKuw3kIthHpPNyjpgu5oqholUUivMmQDTLRcDSJJ6KF0Rjhr6KDjNoKcoXk8RADPUjCovmt7AQH4lbiITx/p1YwrtzxCxEvxGJGXlrBtbxUC2YR22iitBL7UGiiK3X/G9RzRBTSGEGWbA9Gmm6fjy2sM6Ii6JeRPCinZR0Jti/7y7j6WSglxgsVogCy4ifkJvEK0ov4kl9RbWhHaSmOXYzFApl4WhWzECY6vD10EBM0Lx3yLsXrb+6fm44iDv/IZ7DZnfQF01o+uIbzQs9Wdlim9gkysVHUvUvCz32OK7Dt4gdYgQ5b6EgnESjIjZT0miu3qKGaolfWXidT2laBR6nNxy3ruNKTZhrgLD3iTzRN048gOcFGLogDokSBp/jctjrd/3ohAijYiPNY5Fc4X7M8wKivGTiEi6N28vY1TEDP2iQdAw0ujp0KcZ/somrxC4xDM8PS/xpghSmkaa/ZVpLa2fjrXXvZfFL7BVBsZ+xMY8NvUpaniX5BAQw8sV+vBcTmCeZGGhFxCLazbieTyNdEweZoIlGiO3ZVDJSZgZKxCIxWcwWdXjfTo4jMJ7UHWG6Jmo6H4MzNlmf+/HkuVgL5UxLD4Zu4flEnivuojcsfWu4mhMhM/BB3GGmL0Ogks33MLrvE2kL5ZzIe4c0riV603zt0Eg2RW+KAWIDm+leFkkDH6BkaxqlncNMum1jw6EMq8j3Y/ZhO5vuTXHg5fJOHum1T+tbazx3o1nJHaOB1lP7B8TLbsTH6LJTbCWdRy0CiXfGzyJL1Q1qeA/jwmr5FPlviNPOoPI2Mzpsb07aV1HiLcnORTZqz3LC2EVOsxkVT0Q10QY4iK2hR+xDf8IMSLy2u4NXDZ60EYUdXcbRkNU013Du2WyqEKfFOYlXpHqy+8xL9VTVIjyNgsOX654Ji+sSr+vp0bGZUvuGodmMEg+jpIzSLkwmbuuPAAMAefAd9Bn5z5IAAAAASUVORK5CYII=" alt="icon"></div>
				<input :password='!isPassword' :class="{'max':form.password}" v-model="form.password" maxlength="26" placeholder="请输入密码">
				<view class="more">
					<!-- <text class="iconfont" :class="isPassword?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPassword = !isPassword"></text> -->
					<!--text class="mo">忘记密码</text-->
				</view>
			</view>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<!--text @click="onLoginCut" v-if="isLoginCode==1">{{isLoginCode==1?'手机号密码登录':'短信验证码登录'}}</text-->
			
			<text @click="onRegister">马上注册</text>
			<text class="mo" @click="onForgetPassword">忘记密码</text>
		</view>
		<div class="sc-kaNhvL jDQKpL">
			<span class="link">记住密码</span>
			<label class="am-checkbox-wrapper">
				<span class="am-checkbox " :class="{'am-checkbox-checked':isAgree==1}" >
					<input type="checkbox" @click="agree()" class="am-checkbox-input" checked="">
						<span class="am-checkbox-inner"></span>
					</span>
			</label>
		</div>
		<!-- 按钮 -->
		<view class="btn-info">
			<!-- <button type="warn" style="width:90%;" class="uni-radius-5" :disabled="!isLogin?false:true" @click="!isLogin?onLogin():''">登录</button> -->
			<button type="warn" v-if="isLogin" style="width:100%;" class="uni-radius-5 hoqqAL" @click="onLogin()">马上登录</button>
			<button type="warn" v-else style="width:100%;" class="uni-radius-5 hoqqAL" disabled="true">马上登录</button>
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
			isAgree: 0
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
		agree(){
			this.isAgree = !this.isAgree
		},	
		onRegister(){
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},
		onForgetPassword(){
			uni.navigateTo({
				url: '/pages/ChangePassword/ChangePassword'
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
<style>
	/deep/ .uni-input-wrapper{
		font-weight: normal;
	}
	.jDQKpL {
		margin: 15px 0;
		font-size: 14px;
	}
	
	.jDQKpL .link {
		padding-right: 10px;
		color: rgb(142, 142, 147);
	}

	
	
	.am-checkbox-input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		border: 0 none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
	
	.jDQKpL .am-checkbox.am-checkbox-checked .am-checkbox-inner {
		background-color: #0075ff;
		border-color: #0075ff;
	}
	
	.am-checkbox-inner {
		position: absolute;
		right: 0;
		width: 15px;
		height: 15px;
		border: 1px solid #ccc;
		-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.am-checkbox {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		width: 15px;
		height: 18px;
	}
	
	.am-checkbox.am-checkbox-checked .am-checkbox-inner:after {
		display: block;
		border-color: #fff;
	}
	
	.am-checkbox-inner:after {
		position: absolute;
		display: none;
		top: -1px;
		right: 4px;
		z-index: 999;
		width: 5px;
		height: 11px;
		border-style: solid;
		border-width: 0 1px 1px 0;
		content: " ";
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
<style scoped lang="scss">
@import 'login.scss';
</style>