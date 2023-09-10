<template>
	<view class="page">
		<!-- 用户信息 设置列表 -->
		<view class="setting-list">			
				<uni-list>
					<uni-list-item showArrow link
						@click="onUserInfo"
						:note="(myMobile.substr(0,3))+'****'+(myMobile.substr(7,11))"
						thumb="/static/touxiang.png"
						thumb-size="lg" />
					<uni-list-item showArrow link @click="onAddress" title="银行卡管理" />
					<uni-list-item showArrow link @click="onSetting('account')" title="账户安全" rightText="实名认证/修改密码等管理"/>
					<uni-list-item showArrow link @click="onSetting('pay')" title="支付密码" rightText="修改"/>
					<!-- <uni-list-item showArrow link @click="onSetting('invoice')" title="发票" rightText="添加发票"/> -->
				</uni-list>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	import { resolveFile, getDirSize, removeDir, formatSize, storage } from '@/components/img-cache';
	export default {
		data() {
			return {
				myMobile : '',
			};
		},
		onLoad(){
			_self = this;
			loginRes = _self.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			_self.myMobile = loginRes[1];
		},
		onReady(){
			
		},
		methods:{
			/*用户信息点击*/
			onUserInfo(){
				uni.navigateTo({
					url: '/pages/Information/Information'
				})
			},
			/*地址点击*/
			onAddress(){
				uni.navigateTo({
					url: '/pages/AddressList/AddressList',
				})
			},
			/*设置列表点击*/
			onSetting(type){
				switch(type) {
					case 'account':
						uni.navigateTo({
							url: '/pages/AccountSecurity/AccountSecurity'
						})
						break;
					case 'pay':
						uni.navigateTo({
							url: '/pages/PaymentPassword/PaymentPassword'
						})
						break;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'AccountInfo.scss';
// lz
.setting-list{padding: 0;border-radius: 0;margin-top: 0;}
</style>
