<template>
	<view class="page">
		<view class="message-list">
			<uni-list>
				<uni-list-item title="公告信息" clickable showArrow 
					:note="notice.title"
					:rightText="messgae.create_time"
					:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'shop-filled'}"
					@click="onMessage('activity',notice.cid)" />
				
				<uni-list-item title="系统通知" clickable showArrow 
					:note="messgae.title" 
					:rightText="messgae.create_time"
					:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'notification-filled'}"
					@click="onMessage('inform')" />
			</uni-list>
			
			<!-- <view class="list" @click="onMessage('activity',notice.cid)">
				<view class="icon-data">
					<view class="icon">
						<image src="/static/tz-mess.png" mode=""></image>
					</view>
					<view class="data">
						<view class="title">
							<text>公告信息</text>
						</view>
						<view class="describe">
							<text>{{notice.title}}</text>
						</view>
					</view>
				</view>
				<view class="more">
					<text class="time">{{messgae.create_time}}</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="list" @click="onMessage('inform')">
				<view class="icon-data">
					<view class="icon" style="background-color: rgba(255, 125, 88, 1);">
						<image src="/static/tz-mess.png" mode=""></image>
					</view>
					<view class="data">
						<view class="title">
							<text>系统通知</text>
						</view>
						<view class="describe">
							<text>{{messgae.title}}</text>
						</view>
					</view>
				</view>
				<view class="more">
					<text class="time">{{messgae.create_time}}</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: [],
				messgae:[],
			};
		},
		onLoad() {
			var loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getMessage(this.token);//获取子账号信息
		},
		methods:{
			/*加载消息*/
			async getMessage(token){
				uni.request({
					url: this.apiServer+'/apicom/message/messageList',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							var list = res.data.data;
							this.notice  = list.ggao;
							this.messgae = list.messgae;
							//uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					complete: () => {
						this.setReadall(token);
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*设置为已读*/
			async setReadall(token){
				uni.request({
					url: this.apiServer+'/apicom/message/readall',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							//uni.showToast({title:res.data.message,icon:"none"});
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
			onMessage(type,id){
				switch(type){
					case 'activity':
						uni.navigateTo({
							url: '/pages/DiscountsActivity/DiscountsActivity?id='+id,
						})
						break;
					case 'inform':
						uni.navigateTo({
							url: '/pages/NotificationMessage/NotificationMessage',
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Message.scss';
</style>
