<template>
	<view class="page">
		<view class="about-list">
			<image style="height:322rpx;width: 100%;background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;" src="/static/new/banner.jpg" mode=""></image>
			<uni-list>
				<uni-list-item showArrow link @click="onSkip('task')" title="新手任务" />
				<uni-list-item showArrow @click="onMessage(item.id,item.model)" v-for="(item,index) in notice" :key="index" link :title="item.title" />
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
				notice: [],
			};
		},
		onLoad(params){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getColumns(this.token,params.id,params.page);//获取子账号信息
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
			async getColumns(token,id,page){
				uni.request({
					url: this.apiServer+'/apicom/column/index?id='+id+'&page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.notice = res.data.data;
							console.log(this.notice);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/**
			 * 消息点击
			 * @param {String} type
			 */
			onMessage(id,model){
				uni.navigateTo({
					url: '/pages/ArticleInfo/ArticleInfo?id='+id+'&model='+model,
				})			
			},
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
					case 'task':
						uni.navigateTo({
							url: '/pages/Task/Task'
						})
						break;
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
