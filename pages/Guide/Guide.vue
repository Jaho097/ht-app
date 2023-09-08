<template>
	<view class="page">
		<view class="about-list">
			<uni-list>
				<uni-list-item :title="confData.website" :note="versionName" 
					:thumb="confData.weblogo"
					thumb-size="lg" :rightText="versionCode" />
				<uni-list-item showArrow link @click="onSkip('help')" title="使用帮助" />
				<uni-list-item showArrow link @click="onSkip('aboutus')" title="隐私政策" />
			</uni-list>
		</view>
		<view class="copyright">
			<text>{{confData.copyright}}</text>
			<text>{{confData.web_site_icp}}</text>
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	// #ifdef APP-PLUS
	import APPUpdate, { getCurrentNo } from '@/js_sdk/APPUpdate/APPUpdate/index.js';
	// #endif
	export default {
		data() {
			return {
				confData : uni.getStorageSync('confData'),
				versionCode : '',
				versionName : '',
			};
		},
		onLoad(params){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
		},
		onReady(){
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				console.log(res);
				this.versionCode = res.versionCode;
				this.versionName = res.versionName;
			});
			// #endif
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
							//uni.setStorageSync('confData' , res.data.data);
							//console.log(this.confData);
						}
					}
				});
			},
			/*点击合同协议*/
			async getAgreement(id,token){
				uni.request({
					url: this.apiServer+'/apicom/financing/contract',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : id,
						token: this.token
					},
					success: res => {
						if(res.data.status == 1){
							var title   = res.data.message;
							var content = res.data.data;
							//console.log(content)
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			onSkip(type,url){
				switch (type){
					case 'updata':
						uni.navigateTo({
							url: '/pages/WebOnline/WebOnline?url='+url
						})
						break;
					case 'help':
						uni.navigateTo({
							url: '/pages/Help/Help?id=9&page=1'
						})
						break;
					case 'aboutus':
						uni.navigateTo({
							url: '/pages/Help/Help?id=8&page=1'
						})
						break;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'Guide.scss';

// lz 样式
.about-list{border-radius: 0;padding:0;margin-top: 0;}
</style>
