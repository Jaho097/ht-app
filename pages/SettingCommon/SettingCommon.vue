<template>
	<view class="page">
		<view class="common-list">
			<!--view class="list" @click="onSeting">
				<view class="title">
					<text>消息推送设置</text>
				</view>
				<view class="more">
					<text></text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="list" @click="onSeting">
				<view class="title">
					<text>隐私设置</text>
				</view>
				<view class="more">
					<text></text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>WLAN环境下自动播放视频</text>
				</view>
				<view class="switch-setting">
					<switch class="red sm" color="red !important" checked></switch>
				</view>
			</view-->
			<view class="list" @click="onClear()">
				<view class="title">
					<text>清除缓存</text>
				</view>
				<view class="more">
					<!--text>666.66M</text-->
					<text class="iconfont icon-more"></text>
				</view>
			</view>
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
			/*清理缓存*/
			onClear(){
				//uni.clearStorage();//全部清除
				uni.removeStorageSync('swiperList');//清除轮播
				uni.removeStorageSync('confData');//清除设置
				uni.showToast({title:'清理成功！',icon:"none"});
			},
			onSeting(){
				uni.showToast({title:"暂未启用",icon:"none"});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'SettingCommon.scss';
</style>
