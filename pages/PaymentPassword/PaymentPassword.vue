<template>
	<view class="page">
		<view class="setting-list">
			<uni-list>
				<uni-list-item showArrow link @click="onSetting('edit')" title="修改6位数字支付密码" />
				<!--<uni-list-item showArrow link @click="onSetting('forget')" title="忘记6位数字支付密码" />-->
				<uni-list-item showArrow   title="忘记支付密码请联系在线客服!" />

			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			/**
			 * 设置点击
			 * @param {String} type
			 */
			onSetting(type){
				switch (type){
					case 'edit':
						uni.navigateTo({
							url: '/pages/PaymentEdit/PaymentEdit'
						})
						break;
					case 'forget':
						uni.navigateTo({
							url: '/pages/PaymentForget/PaymentForget'
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'PaymentPassword.scss';
// lz
.setting-list{padding: 0;border-radius: 0;margin-top: 0;}
</style>
