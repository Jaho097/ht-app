<template>
	<view class="page">
		<!-- <view>
			<view class="pay-title">
				<text v-show="AffirmStatus === 1">请输入原支付密码(初始默认为手机号后6位)</text>
				<text v-show="AffirmStatus === 2">请设置新6位支付密码</text>
				<text v-show="AffirmStatus === 3">请确认新6位支付密码</text>
			</view>
			<view class="pay-password" @click="onPayUp">
				<view class="list">
					<text v-show="passwordArr.length >= 1">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 2">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 3">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 4">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 5">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 6">●</text>
				</view>
			</view>
			<view class="hint">
				<text>忘记支付密码？</text>
			</view>
		</view>
		<CodeKeyboard ref="CodeKeyboard" passwrdType="pay" @KeyInfo="KeyInfo"></CodeKeyboard> -->
		
		<view class="page-number">
			<view class="setting-password">
				<view class="inpu-password">
					<text class="text">原支付密码</text>
					<input :password='!isPassword_o' v-model="oldpwd" placeholder="请输入原支付密码" />
				</view>
				<view class="inpu-password">
					<text class="text">新支付密码</text>
					<input :password='!isPassword_n' v-model="newpwd" placeholder="请输入新支付密码" />
				</view>
				<view class="inpu-password">
					<text class="text">确认新密码</text>
					<input :password='!isPassword_s' v-model="subpwd" placeholder="请再次输入新支付密码" />
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
	import CodeKeyboard from '../../components/CodeKeyboard/CodeKeyboard.vue';
	export default {
		components:{
			CodeKeyboard,
		},
		data() {
			return {
				AffirmStatus: 1,
				token : '',
				passwordArr: [],
				oldPasswordArr: [],
				newPasswordArr: [],
				afPasswordArr: [],
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
		},
		methods:{
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
					url: this.apiServer+'/apicom/profile/paypass',
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
			},
			/**
			 * 唤起键盘
			 */
			onPayUp(){
				this.$refs['CodeKeyboard'].show();
			},
			/**
			 * 支付键盘回调
			 * @param {Object} val
			 */
			KeyInfo(val){
				if(val.index >= 6){
					return;
				}
				// 判断是否删除
				if(val.keyCode === 8){
					this.passwordArr.splice(val.index+1,1)
				}else{
					this.passwordArr.push(val.key);
				}
				// 判断是否等于6
				if(this.passwordArr.length === 6){
					this.passwordArr = [];
					this.AffirmStatus = this.AffirmStatus+1;
				}
				// 判断到哪一步了
				if(this.AffirmStatus === 1){
					this.oldPasswordArr = this.passwordArr;
				}else if(this.AffirmStatus === 2){
					this.newPasswordArr = this.passwordArr;
				}else if(this.AffirmStatus === 3){
					this.afPasswordArr = this.passwordArr;
				}else if(this.AffirmStatus === 4){
					//console.log(this.oldPasswordArr.join(''));
					//console.log(this.newPasswordArr.join(''));
					//console.log(this.afPasswordArr.join(''));
					uni.request({
						url: this.apiServer+'/apicom/profile/paypass',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							token : this.token,
							oldpwd: this.oldPasswordArr.join(''),
							newpwd: this.newPasswordArr.join(''),
							subpwd: this.afPasswordArr.join(''),
						},
						success: res => {
							if(res.data.status == 1){
								uni.showToast({title: '修改成功！',icon: 'none'})
							}else{
								uni.showToast({title: res.data.message,icon: 'none'})
							}
						},
						fail:function(e){
							uni.showToast({title:"修改失败!",icon:"none"});
						}
					});
					setTimeout(() =>{
						uni.navigateBack();
					},2000)
				}
				this.$forceUpdate();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'PaymentEdit.scss';
</style>
