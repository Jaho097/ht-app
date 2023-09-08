<template>
	<view class="page">
		<view class="head-back">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="title">
				<text>APP下载</text>
			</view>
		</view>
		<view class="banner">
			<image src="../../static/img/down_banner_1.png" mode="aspectFill"></image>
		</view>
		<view class="card-data">
			<view class="payment-way">
				<view class="btn" @click="onDownApk">
					<text>下载安卓端</text>
				</view>
				<view class="title" @click="onDownIos">
					<text>下载苹果端</text>
				</view>
			</view>
		</view>
		<view class="banner">
			<image src="../../static/img/down_banner_2.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				token : '',
				down  : '',
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getDown(loginRes[2]);
		},
		methods:{
			async getDown(){
				uni.request({
					url: this.apiServer+'/apicom/index/download',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.down = res.data.data;
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			onDownApk(){
				var url = this.down.apk_down_url.toString();
				// #ifdef APP-PLUS
				plus.runtime.openURL(url, function(res) {  
					//console.log(res);  
				});
				// #endif
				// #ifdef H5
				window.open(url);
				// #endif
			},
			onDownIos(){
				var url = this.down.ios_down_url.toString();
				// #ifdef APP-PLUS
				plus.runtime.openURL(url, function(res) {
					//console.log(res);  
				});
				// #endif
				// #ifdef H5
				window.open(url);
				// #endif
			},
			/* 返回点击*/
			onBack(){
				uni.navigateBack();
			},
			
		}
	}
</script>

<style scoped lang="scss">
	@import 'Download.scss';
</style>
