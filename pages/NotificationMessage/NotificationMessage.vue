<template>
	<!-- <view class="page">
		<view class="inform-list">
			<view class="list" v-for="(item,index) in messgae" :key="index">
				<view class="date">
					<text>{{item.create_time}}</text>
				</view>
				<view class="item">
					<view class="title">
						<text class="one-omit">{{item.title}}</text>
					</view>
					<view class="describe">
						<text class="two-omit">{{item.info}}</text>
					</view>
				</view>
			</view>
		</view>
	</view> -->
	<view class="page am-list-body">
		<view class="am-list-view-scrollview">
			<view class="list-view-section-body" v-for="(item,index) in messgae" :key="index">
				<view class="egPtT">
					<view class="hd">
						<text class="title">{{item.title}}</text>
					</view>
					<view class="bd">
						<text class="brief">{{item.info}}</text>
						<div class="date">{{item.create_time}}</div>
					</view>
				</view>
			</view>
			<div class="am-list-footer"><div style="text-align: center;">---- 已到底部 ----</div></div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messgae:[],
			};
		},
		onLoad() {
			var loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getMessage(this.token,1);//获取系统信息
		},
		methods:{
			/*加载消息*/
			async getMessage(token,page){
				uni.request({
					url: this.apiServer+'/apicom/message?page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							var list = res.data.data;
							//this.notice  = list.ggao;
							this.messgae = list.data;
							//uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'NotificationMessage.scss';
</style>
