<template>
	<view class="page">
		<view v-if="!isSetting">
			<uni-section title="请输入188****8888短信验证码" type="line" padding>
				<view class="code" style="height: 46px;position: relative;">
					<input type="tel" maxlength="6" placeholder="请输入短信验证码" style="border-bottom: #e5e5e5 1px solid;height:46px;font-size: 16px;">
					<!-- <text class="">获取验证码</text> -->
					<view style="text-align: center;position: absolute;top:10px;right:0;width: 100px;height: 26px;">
						<uni-tag text="获取验证码"
							custom-style="background-color: #2979ff; border-color: #2979ff; color: #fff;padding:5px 10px;">
						</uni-tag>
					</view>
				</view>
			</uni-section>
			<view class="uni-py-10 uni-px-8">
				<button type="warn" style="width:100%;" class="uni-radius-5" @click="isSetting = true">下一步</button>
			</view>
		</view>
		<view v-else>
			<uni-section title="设置密码" type="line" padding>
				<view class="inpu-password" style="height: 46px;position: relative;">
					<!-- <text>设置密码</text> -->
					<input type="password" placeholder="请输入要设置的密码" style="border-bottom: #e5e5e5 1px solid;height:46px;font-size: 16px;"/>
					<text class="iconfont icon-eye-on icon" style="text-align: right;position: absolute;top:10px;right:10px;width: 100px;height: 26px;"></text>
				</view>
			</uni-section>
			<view class="uni-py-10 uni-px-8">
				<button type="warn" style="width:100%;" class="uni-radius-5" disabled="true">确认</button>
			</view>
		</view>
		
		
		
		
		<!-- <view class="code-get" v-if="!isSetting">
			<view class="phone">
				<text>请输入188****8888短信验证码</text>
			</view>
			<view class="code">
				<input type="tel" maxlength="6" placeholder="请输入短信验证码">
				<text class="">获取验证码</text>
			</view>
			<view class="uni-py-10 uni-px-8">
				<button type="warn" style="width:100%;" class="uni-radius-5" @click="isSetting = true">下一步</button>
			</view>
		</view>
		<view class="setting-password" v-else>
			<view class="inpu-password">
				<text>设置密码</text>
				<input type="password" placeholder="请输入要设置的密码" />
				<text class="iconfont icon-eye-on icon"></text>
			</view>
			<view class="uni-py-10 uni-px-8">
				<button type="warn" style="width:100%;" class="uni-radius-5" disabled="true">确认</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSetting: false,
			};
		}
	}
</script>

<style scoped lang="scss">
	@import 'PaymentForget.scss';
</style>
