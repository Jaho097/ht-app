<template>
	<view class="page">
		<view class="page-number">
			<view class="setting-password">
				<view class="inpu-password">
					<text class="text">真实姓名</text>
					<input v-model="name" v-if="isReal==0" placeholder="真实姓名" />
					<input v-model="name" v-else disabled="disabled" :placeholder="userInfo.name" />
				</view>
				<view class="inpu-password">
					<text class="text">身份证号</text>
					<input v-model="card" v-if="isReal==0" placeholder="15或18位证件号码" />
					<input v-model="card" v-else disabled="disabled" :placeholder="userInfo.id_card" />
				</view>
				<view class="uni-mt-10 uni-px-8">
					<button type="warn" style="width:100%;" class="uni-radius-5" @click="onClick" v-if="isReal==0">立即认证</button>
					<button type="warn" style="width:100%;" class="uni-radius-5" disabled="true"   v-else-if="isReal==1">待审核</button>
					<button type="warn" style="width:100%;" class="uni-radius-5" disabled="true"  v-else-if="isReal==2">已认证，无法修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				userInfo:'',
				isReal: false,
				name: '',
				card: '',
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes)return;
			this.token = loginRes[2];
			this.getUserInfo();
			//console.log(this.confData);
		},
		methods:{
			async getUserInfo(){
				uni.request({
					url: this.apiServer+'/apicom/member/userInfo',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token : this.token,
					},
					success: res => {
						if(res.data.status == 1){
							var userInfo = res.data.data;
							this.userInfo = userInfo; 
							if(userInfo.id_card=='' && userInfo.name==''){
								this.isReal = 0;//未认证
							}
							if(userInfo.id_card!='' && userInfo.name!='' && userInfo.id_auth==0){
								this.isReal = 1;//待审核
							}
							if(userInfo.id_card!='' && userInfo.name!='' && userInfo.id_auth==1){
								this.isReal = 2;//已认证
							}
						}
					}
				});
			},
			async onClick(){
				if(!this.name){
					uni.showToast({title: '请输入真实姓名',icon: 'none'});
					return;
				}
				if(!this.card){
					uni.showToast({title: '请输入您的18位身份证号',icon: 'none'});
					return;
				}
				if(this.card.length != 18){
					uni.showToast({title: '身份证号码有误',icon: 'none'});
					return;
				}
				uni.request({
					url: this.apiServer+'/apicom/profile/realname',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token  : this.token,
						name   : this.name,
						id_card: this.card,
					},
					success: res => {
						if(res.data.status == 1){
							uni.showToast({title: res.data.message,icon: 'none'});
							setTimeout(() =>{
								uni.navigateBack();
							},2000)
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
	@import 'realName.scss';
</style>
