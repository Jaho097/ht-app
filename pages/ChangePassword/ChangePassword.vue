<template>
	<view class="page">
		<view class="page-code" v-if="isLoginCode==1">
			<view class="code-get" v-if="!isSetting">
				<view class="phone">
					<text>请输入188****8888短信验证码</text>
				</view>
				<view class="code">
					<input type="tel" maxlength="6" placeholder="请输入短信验证码">
					<text>获取验证码</text>
				</view>
				<view class="uni-mt-10 uni-px-8">
					<button type="warn" style="width:100%;" class="uni-radius-5" @click="isSetting = true">下一步</button>
				</view>
				<!-- <view class="btn" @click="isSetting = true">
					<text>下一步</text>
				</view> -->
			</view>
			<view class="setting-password" v-else>
				<view class="inpu-password">
					<text>设置密码</text>
					<input type="password" placeholder="请输入要设置的密码" />
					<text class="iconfont icon-eye-on icon"></text>
				</view>
				<view class="inpu-password"></view>
				<view class="uni-mt-10 uni-px-8">
					<button type="warn" style="width:100%;" class="uni-radius-5">确认</button>
				</view>
				<!-- <view class="btn mt_50">
					<text>确认</text>
				</view> -->
			</view>
		</view>
		<view class="page-number" v-else>
			<view class="setting-password">
				<view class="inpu-password">
					<text class="text">原登陆密码</text>
					<input :password='!isPassword_o' v-model="oldpwd" placeholder="请输入原登陆密码" />
				</view>
				<view class="inpu-password">
					<text class="text">新登陆密码</text>
					<input :password='!isPassword_n' v-model="newpwd" placeholder="请输入新登陆密码" />
				</view>
				<view class="inpu-password">
					<text class="text">确认新密码</text>
					<input :password='!isPassword_s' v-model="subpwd" placeholder="请再次输入新登陆密码" />
				</view>
			</view>
			<view class="uni-mt-10 uni-px-8">
				<button type="warn" style="width:100%;" class="uni-radius-5" @click="onClick">确认提交</button>
			</view>
			<!-- <view class="btn" @click="onClick">
				<text>确认</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				isSetting   : false,
				isLoginCode : false,
				isPassword_o: false,
				isPassword_n: false,
				isPassword_s: false,
				oldpwd: '',
				newpwd: '',
				subpwd: '',
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes)return;
			this.token = loginRes[2];
			this.getconf();
			//console.log(this.confData);
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
							var confData = res.data.data; 
							this.isLoginCode = confData.web_reg_code;
						}
					}
				});
			},
			async onClick(){
				if(!this.oldpwd){
					uni.showToast({title: '请输入原密码',icon: 'none'});
					return;
				}
				if(!this.newpwd){
					uni.showToast({title: '请输入新密码',icon: 'none'});
					return;
				}
				if(this.subpwd != this.newpwd){
					uni.showToast({title: '两次新密码输入不一致',icon: 'none'});
					return;
				}
				uni.request({
					url: this.apiServer+'/apicom/profile/password',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token : this.token,
						oldpwd: this.oldpwd,
						newpwd: this.newpwd,
						subpwd: this.subpwd,
					},
					success: res => {
						if(res.data.status == 1){
							uni.showToast({title: '修改成功！',icon: 'none'})
						}else{
							uni.showToast({title: res.data.message,icon: 'none'})
						}
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'ChangePassword.scss';
// lz 样式
.setting-password{border-radius: 0;}
.setting-password .inpu-password:last-child{border-bottom: none;}
</style>
