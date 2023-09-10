<template>
	<view class="page">
		<!-- <view class="logo" style="margin-top: 20px; margin-bottom: 20px;">
			<image src="/static/120.png" style="width: 120px; height: 120px;"></image>
		</view> -->
		<div class="sc-iAyFgw boDnnU"><img src="/static/logo-h.jpg" alt="logo"></div>
		<div class="header-right"><button class="sc-kkGfuU hoqqAL new-button-small" @click="onLogin">立即登录</button></div>
		<!-- 填写区 -->
		<view class="input-info">
			<view class="info">
				<!-- <uni-icons type="contact" size="18" color="#555555"></uni-icons> -->
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAYAAAAbW8YEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3RjEwNUFENjg1QTExRThCOERDQThFRERENUJCNkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3RjEwNUFFNjg1QTExRThCOERDQThFRERENUJCNkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzdGMTA1QUI2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzdGMTA1QUM2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75N8WtAAAC10lEQVR42rSXX2hOYRzH33cWRlJvLggt/1pMhDVL8zcJF4gokz8lQ4pckZiNSWIlZQlXipSr+S9u7OZ9L3Cxlpm/E2OMptwwGz4/fU89He/2nnPe7Vef93ee55ye7/k953l+v+eNJ5PJWAgbDvNgCuTBD3gK9SUlJd+CDpIb8Ll8qIQyGJjmfmcqlbqGr0D8dabBcgIIlimaLY5gJ3yAn2pb/wZoRHxjtqJb4TIMgV9wBmbBIBgNg2EGnNYL2JRfQri8t0HjvXzTIkjqE7yEFdDkf4jp/OcRKsDVgfluKOVeKmykZyX4EeanE/SJN+MWwDsYALW8SDyMqK3QYl1v1/fLaAi34bapadO+MIzoavkGuBFmTyF8D/dIzbVhRGfL18Wi2XX54jCio+SfRxR94RsnkKjX3x1R9Le3O8KIfpIfH1E0X/5zGNEn8ksjii6XfxxG1FuxpTAnjBp7s0j71V1QgURvQ7Ouz8OwgIJDcRfVfAU3w4jaQtij60K9xIgMggncLZiurt3s2a6wudfssEqat7iOwhXo8NVYq0QVMFJ91QgeipLwPTsIVc6sdGnqvyj6Aqcu2wxVIXgkm9KWp6i++gp/oYpAoe8gYM92MNV5UUvbYi2icb7+N9CqF0morvr381vYQcR3g0ZqWeQA3HcEn8FOGCuBubDKqhEDT8CPgXJnf1tyuEPElenKWzrR43DMma7NmsZz8L6HytIKF1T41zufwxZiTSZRq4X7nOhm2vHDyaWZytofuKpa2qjuvUS7qyfRiTrrmLWoALdEyYEI2+lhkY45Zqd0nPlPtFoHsG4V37ZYFoZwO26NDnR2gDvhF50E63Rd61T+WJbCDc7srSTaya5omVatfbuTsb61GiUUs02u6DL5ep3m+syI1tLnAzWXeKK5TpJ+GOsf88adZtkqR6nO+7vQ3k+iTU4KTdjPd/0Pmao92R9mJW+/7QhLJH8FGAAQ88OaJvO6+gAAAABJRU5ErkJggg==" alt="icon"></div>
				<input type="tel" :class="{'max':form.phone}" v-model="form.phone" maxlength="11" placeholder="请输入11位中国大陆手机号">
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
				<!-- <uni-icons type="locked-filled" size="18" color="#555555"></uni-icons> -->
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFQ0UyNzU3Njg1QjExRThBNzNDOERBMjQ5QjU2MjQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFQ0UyNzU4Njg1QjExRThBNzNDOERBMjQ5QjU2MjQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkVDRTI3NTU2ODVCMTFFOEE3M0M4REEyNDlCNTYyNDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkVDRTI3NTY2ODVCMTFFOEE3M0M4REEyNDlCNTYyNDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz615ouFAAABkElEQVR42uyVO0sDQRCALzGVoPGBYhRio1axEZFY2Ag+QUUbESy00NY2/8AHlhY2gpYhiFUQ1MrCiyksrQI2WmjAiKAg4uNbmcBy3l0u5uwy8LGTvc3HZncyFzBN03CJQZiFbmiEL3iAKziEXDwet/1iwEGsJPswbbhHEtaQ31sfBG0W18O5RfoIp3AiOy7GPGQzmUyPF/EuxCRXO1mCdhiFMYjAHNzJmiikkYfdxOrAFiTPQi8cwJu25hOOoA+uZa4L1t3EKzLewjjkXc5XHckMvMrnVXYddRJPybgNBaN05GBD8hpYtBN3Qovkx4b32IEXycN24g4tv/FqpdTUL1uGPbn4nwhpayJa/l7GjpU8xZByurw6w8cIOszXVipWR9EPm9IPinEJH14ElJh16gkSIZEOWx7GKtzwlhI3axNn2l+13GiFiWK/0aviAkbKteltk2NJM0xaLy/vQzHkS1XFv5VbVVwV/26bf402u348AKa8mT2H1oSaYEgXFyxvaT/iWYkT0uEa/JIq57cAAwA1J1Ms5utOYgAAAABJRU5ErkJggg==" alt="icon"></div>
				<input :password='!isPassword' :class="{'max':form.password}" maxlength="26" v-model="form.password" placeholder="请输入登录密码">
				<view class="more">
					<text class="iconfont" :class="isPassword?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPassword = !isPassword"></text>
				</view>
			</view>
			<view class="info" v-if="isLoginCode==0">
				<!-- <uni-icons type="locked-filled" size="18" color="#555555"></uni-icons> -->
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFQ0UyNzU3Njg1QjExRThBNzNDOERBMjQ5QjU2MjQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFQ0UyNzU4Njg1QjExRThBNzNDOERBMjQ5QjU2MjQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkVDRTI3NTU2ODVCMTFFOEE3M0M4REEyNDlCNTYyNDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkVDRTI3NTY2ODVCMTFFOEE3M0M4REEyNDlCNTYyNDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz615ouFAAABkElEQVR42uyVO0sDQRCALzGVoPGBYhRio1axEZFY2Ag+QUUbESy00NY2/8AHlhY2gpYhiFUQ1MrCiyksrQI2WmjAiKAg4uNbmcBy3l0u5uwy8LGTvc3HZncyFzBN03CJQZiFbmiEL3iAKziEXDwet/1iwEGsJPswbbhHEtaQ31sfBG0W18O5RfoIp3AiOy7GPGQzmUyPF/EuxCRXO1mCdhiFMYjAHNzJmiikkYfdxOrAFiTPQi8cwJu25hOOoA+uZa4L1t3EKzLewjjkXc5XHckMvMrnVXYddRJPybgNBaN05GBD8hpYtBN3Qovkx4b32IEXycN24g4tv/FqpdTUL1uGPbn4nwhpayJa/l7GjpU8xZByurw6w8cIOszXVipWR9EPm9IPinEJH14ElJh16gkSIZEOWx7GKtzwlhI3axNn2l+13GiFiWK/0aviAkbKteltk2NJM0xaLy/vQzHkS1XFv5VbVVwV/26bf402u348AKa8mT2H1oSaYEgXFyxvaT/iWYkT0uEa/JIq57cAAwA1J1Ms5utOYgAAAABJRU5ErkJggg==" alt="icon"></div>
				<input :password='!isPasswordb' :class="{'max':form.passwordb}" maxlength="26" v-model="form.passwordb" placeholder="请再次输入登录密码">
				<view class="more">
					<text class="iconfont" :class="isPasswordb?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPasswordb = !isPasswordb"></text>
				</view>
			</view>
			<view class="info" v-if="confData.is_recommend">
				<!-- <uni-icons type="redo-filled" size="18" color="#555555"></uni-icons> -->
				<div class="label"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAYAAAAbW8YEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3RjEwNUFENjg1QTExRThCOERDQThFRERENUJCNkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3RjEwNUFFNjg1QTExRThCOERDQThFRERENUJCNkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzdGMTA1QUI2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzdGMTA1QUM2ODVBMTFFOEI4RENBOEVEREQ1QkI2QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75N8WtAAAC10lEQVR42rSXX2hOYRzH33cWRlJvLggt/1pMhDVL8zcJF4gokz8lQ4pckZiNSWIlZQlXipSr+S9u7OZ9L3Cxlpm/E2OMptwwGz4/fU89He/2nnPe7Vef93ee55ye7/k953l+v+eNJ5PJWAgbDvNgCuTBD3gK9SUlJd+CDpIb8Ll8qIQyGJjmfmcqlbqGr0D8dabBcgIIlimaLY5gJ3yAn2pb/wZoRHxjtqJb4TIMgV9wBmbBIBgNg2EGnNYL2JRfQri8t0HjvXzTIkjqE7yEFdDkf4jp/OcRKsDVgfluKOVeKmykZyX4EeanE/SJN+MWwDsYALW8SDyMqK3QYl1v1/fLaAi34bapadO+MIzoavkGuBFmTyF8D/dIzbVhRGfL18Wi2XX54jCio+SfRxR94RsnkKjX3x1R9Le3O8KIfpIfH1E0X/5zGNEn8ksjii6XfxxG1FuxpTAnjBp7s0j71V1QgURvQ7Ouz8OwgIJDcRfVfAU3w4jaQtij60K9xIgMggncLZiurt3s2a6wudfssEqat7iOwhXo8NVYq0QVMFJ91QgeipLwPTsIVc6sdGnqvyj6Aqcu2wxVIXgkm9KWp6i++gp/oYpAoe8gYM92MNV5UUvbYi2icb7+N9CqF0morvr381vYQcR3g0ZqWeQA3HcEn8FOGCuBubDKqhEDT8CPgXJnf1tyuEPElenKWzrR43DMma7NmsZz8L6HytIKF1T41zufwxZiTSZRq4X7nOhm2vHDyaWZytofuKpa2qjuvUS7qyfRiTrrmLWoALdEyYEI2+lhkY45Zqd0nPlPtFoHsG4V37ZYFoZwO26NDnR2gDvhF50E63Rd61T+WJbCDc7srSTaya5omVatfbuTsb61GiUUs02u6DL5ep3m+syI1tLnAzWXeKK5TpJ+GOsf88adZtkqR6nO+7vQ3k+iTU4KTdjPd/0Pmao92R9mJW+/7QhLJH8FGAAQ88OaJvO6+gAAAABJRU5ErkJggg==" alt="icon"></div>
				<input type="tel" :class="{'max':form.agent}" v-model="form.agent" maxlength="11" placeholder="邀请码">
			</view>
		</view>
		<div class="sc-hMqMXs eIZPEs"><div class="sc-iRbamj kRcZiD">注册代表您已同意 <a href="/wap/agreement/register">《用户注册协议》</a></div></div>
		<!-- 按钮 -->
		<view class="btn-info">
			<button type="warn" style="width:100%;" class="uni-radius-5 hoqqAL" :disabled="isRegister?false:true" @click="isRegister?onRegister():''">立即注册</button>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<text></text>
			<text @click="onLogin">已有账户，去登录</text>
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
