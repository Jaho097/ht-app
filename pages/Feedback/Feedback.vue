<template>
	<view class="page">
		<!-- 选择反馈类型 -->
		<view class="feedback-type">
			<view class="title">
				<text>{{TypeArray[TypeIndex]}}</text>
			</view>
			<view class="picker">
				<picker @change="FeedbackTypeCh" :value="TypeIndex" :range="TypeArray">
					<view class="uni-input">{{TypeArray[TypeIndex]}}</view>
				</picker>
			</view>
			<view class="more">
				<text class="iconfont icon-tishi1"></text>
			</view>
		</view>
		<!-- 反馈内容 -->
		<view class="feedback-data">
			<view class="content">
				<textarea value="" v-model="content" placeholder="请输入反馈的内容" />
			</view>
			<!-- 上传凭证 -->
			<!--view class="voucher-img">
				<view class="list">
					<image src="/static/voucher_bg.png"></image>
				</view>
				<view class="list">
					<image src="/static/img/yf_01.png"></image>
				</view>
			</view-->
		</view>
		<!-- 联系方式 -->
		<view class="contact-way">
			<input type="text" v-model="number" placeholder="手机/邮箱/QQ">
		</view>
		<!-- 提交 -->
		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5"@click="onSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TypeArray: ['账号相关','数据信息','客户服务','优惠活动','产品体验','软件功能','其他问题'],
				TypeIndex: 0,
				content  : '',
				number   : ''
			};
		},
		methods:{
			/**
			 * 反馈类型
			 * @param {Object} val
			 */
			FeedbackTypeCh(val){
				console.log(val);
				this.TypeIndex = val.detail.value;
			},
			onSubmit(){
				if(!this.content){
					uni.showToast({title:"请填写内容",icon:"none"});
					return;
				}
				if(!this.number){
					uni.showToast({title:"请填写联系方式",icon:"none"});
					return;
				}
				uni.showToast({title:"提交成功，感谢您的反馈",icon:"none"});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Feedback.scss';

// lz
.feedback-data, .feedback-type, .contact-way{border-radius: 10rpx;}
.feedback-data .content uni-textarea{background-color: #FFF;}
</style>
