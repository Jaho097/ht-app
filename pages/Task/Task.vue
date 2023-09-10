<template>
	<view class="page">
		<div class="sc-jAaTju hpiOGL" style="background-color: rgb(253, 161, 30);"><img src="/static/top.jpg"
				class="sc-sdtwF iuKwrY">
			<div class="sc-iYUSvU jvvVZg">
				<a class="list-item" @click="onSkip('register')"><img src="/static/s1.png" width="100%"></a>
				<a class="list-item" @click="onSkip('realname')"><img src="/static/s2.png" width="100%"></a>
				<a class="list-item" @click="onSkip('peiziList')"><img src="/static/s3.png" width="100%"></a>
				<a class="list-item" @click="onSkip('wallet')"><img src="/static/s4.png" width="100%"></a>
				<a class="list-item" @click="onSkip('addressList')"><img src="/static/s5.png" width="100%"></a>
				<a class="list-item" @click="onSkip('peiziList')"><img src="/static/s6.png" width="100%"></a>
				<a class="list-item" @click="onSkip('peiziList')"><img src="/static/s7.png" width="100%"></a>
				<a class="list-item" @click="onSkip('peiziList')"><img src="/static/s8.png" width="100%"></a>
			</div>
		</div>
	</view>
</template>

<script>
	var _self, loginRes;
	// #ifdef APP-PLUS
	import APPUpdate, {
		getCurrentNo
	} from '@/js_sdk/APPUpdate/APPUpdate/index.js';
	// #endif
	export default {
		data() {
			return {
				confData: uni.getStorageSync('confData'),
				versionCode: '',
				versionName: '',
			};
		},
		onLoad(params) {
			//_self = this;
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.token = loginRes[2];
		},
		onReady() {
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				console.log(res);
				this.versionCode = res.versionCode;
				this.versionName = res.versionName;
			});
			// #endif
		},
		methods: {
			onSkip(type, url) {
				switch (type) {
					case 'register':
						uni.navigateTo({
							url: '/pages/register/register'
						})
						break;
					case 'realname':
						uni.navigateTo({
							url: '/pages/realName/realName'
						})
						break;
					case 'peiziList':
						uni.navigateTo({
							url: '/pages/AfterSalesOrder/AfterSalesOrder'
						})
						break;
					case 'wallet':
						uni.navigateTo({
							url: '/pages/MyWallet/MyWallet'
						})
						break;
					case 'addressList':
						uni.navigateTo({
							url: '/pages/AddressList/AddressList'
						})
						break;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'Task.scss';

	// lz 样式
	.about-list {
		border-radius: 0;
		padding: 0;
		margin-top: 0;
	}
</style>