<template>
	<view class="page">
		<!-- 用户信息 设置列表 -->
		<view class="setting-list">
			<uni-list>
				<uni-list-item class="tx" title="头像" thumb="/static/touxiang.png" thumb-size="lg">
					<view>
						<text class="chat-custom-text">刚刚</text>
					</view>
				</uni-list-item>
				<uni-list-item title="手机号码"
					:rightText="(myMobile.substr(0,3))+'****'+(myMobile.substr(7,11))" />
				<uni-list-item showArrow link @click="onSetting('realName')" title="实名认证"
					:rightText="userInfo.name+' | '+userInfo.id_card.substr(0,4)+'...'" />
				<uni-list-item showArrow link @click="onAddress" title="提现银行卡" rightText="已设置" />
				<uni-list-item class="pass" showArrow link @click="onSetting('password')" title="登录密码" rightText="修改" />
				<uni-list-item class="pass" showArrow link @click="onSetting('pay')" title="支付密码" rightText="修改" />
				<!-- <uni-list-item showArrow link @click="onSetting('invoice')" title="发票" rightText="添加发票"/> -->
			</uni-list>
		</view>
		<!-- 退出 -->
		<view class="uni-py-10 uni-px-8 layout">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="onQuitLogin">退出登录</button>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self, loginRes;
	import {
		resolveFile,
		getDirSize,
		removeDir,
		formatSize,
		storage
	} from '@/components/img-cache';
	export default {
		data() {
			return {
				myMobile: '',
				userInfo: {
					name: '',
					id_card: ''
				}
			};
		},
		onLoad() {
			_self = this;
			loginRes = _self.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			_self.myMobile = loginRes[1];
			this.token = loginRes[2];
			this.getUserInfo()
		},
		onReady() {

		},
		methods: {
			/**
			 * 退出点击
			 */
			onQuitLogin(){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要退出登录?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.clearStorageSync();
					/*uni.removeStorageSync('UID');//清除账号ID
					uni.removeStorageSync('MOBILE');//清除账号
					uni.removeStorageSync('TOKEN');//清除TOKEN
					uni.removeStorageSync('accountData');//清除子账户缓存数据*/
					setTimeout(function(){
						uni.reLaunch({url: '/pages/login/login'});
					}, 1000);
					//uni.navigateBack();
				})
			},
			getUserInfo() {
				uni.request({
					url: this.apiServer + '/apicom/member/userInfo',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: this.token,
					},
					success: res => {
						if (res.data.status == 1) {
							var userInfo = res.data.data;
							this.userInfo = userInfo;
							if (userInfo.id_card == '' && userInfo.name == '') {
								this.isReal = 0; //未认证
							}
							if (userInfo.id_card != '' && userInfo.name != '' && userInfo.id_auth == 0) {
								this.isReal = 1; //待审核
							}
							if (userInfo.id_card != '' && userInfo.name != '' && userInfo.id_auth == 1) {
								this.isReal = 2; //已认证
							}
							console.log(userInfo);
						}

					}
				});
			},
			/*配资、资金明细跳转，钱包跳转点击*/
			onWallet(type) {
				switch (type) {

				}
			},
			/*用户信息点击*/
			onUserInfo() {
				uni.navigateTo({
					url: '/pages/Information/Information'
				})
			},
			/*地址点击*/
			onAddress() {
				uni.navigateTo({
					url: '/pages/AddressList/AddressList',
				})
			},
			/*设置列表点击*/
			onSetting(type) {
				switch (type) {
					case 'account':
						uni.navigateTo({
							url: '/pages/AccountSecurity/AccountSecurity'
						})
						break;
					case 'pay':
						uni.navigateTo({
							url: '/pages/PaymentEdit/PaymentEdit'
						})
						break;
					case 'password':
						uni.navigateTo({
							url: '/pages/ChangePassword/ChangePassword',
						})
						break;
					case 'realName':
						uni.navigateTo({
							url: '/pages/realName/realName',
						})
						break;
				}
			},
		}
	}
</script>

<style>
	@import 'AccountInfo.scss';

	.tx /deep/.uni-list-item__container {
		flex-direction: row-reverse;
	}

	uni-image {
		width: 22px;
	}

	/deep/.uni-list--lg {
		width: 22px;
		height: 22px;
		margin-right: 0;
	}
	/deep/.uni-list-item__content-title{
		font-size: 16px
	}
	/deep/.uni-list-item__extra-text{
		font-size: 16px;
		color: #888;
	}
	.pass /deep/ .uni-list-item__extra-text{
		color: rgb(69, 157, 245);
	}
	.layout uni-button {
    background-color: rgb(179, 141, 74);
    background-image: linear-gradient(112deg, rgb(220, 190, 127) 0%, rgb(179, 141, 74) 100%);
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: rgb(255, 255, 255);
    font-weight: 600;
    border: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    height: 44px;
}
</style>