<template>
	<view class="page">
		<view class="message-list">
			
			<uni-list>
				<uni-list-item showArrow @click="onMessage(item.id,item.model)" v-for="(item,index) in notice" :key="index" link :title="item.title" />
			</uni-list>
			
			<!-- <view class="list" @click="onMessage(item.id,item.model)" v-for="(item,index) in notice" :key="index">
				<view class="icon-data">
					<view class="icon">
						<image src="/static/tz-mess.png" mode=""></image>
					</view>
					<view class="data">
						<view class="title">
							<text>{{item.title}}</text>
						</view>
						<view class="describe">
							<text>{{item.shorttitle}}</text>
						</view>
					</view>
				</view>
				<view class="more">
					<text class="time">{{item.create_time}}</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view> -->
		</view>
		<div class="am-list-footer"><div style="text-align: center;">---- 已到底部 ----</div></div>
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
		onLoad(params) {
			var loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			if(params.id==8){
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
			}
			this.getColumns(this.token,params.id,params.page);//获取子账号信息
		},
		methods:{
			/*加载消息*/
			async getColumns(token,id,page){
				uni.request({
					url: this.apiServer+'/apicom/column/index?id='+id+'&page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.notice = res.data.data;
							console.log(this.notice);
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
			onMessage(id,model){
				uni.navigateTo({
					url: '/pages/ArticleInfo/ArticleInfo?id='+id+'&model='+model,
				})			
			}
		}
	}
</script>

<style>
	/deep/.uni-list-item__content-title{
		font-size: 16px;
	}
</style>
<style scoped lang="scss">
	@import 'Help.scss';
	.am-list-footer {
	    padding: 9px 15px 15px;
	    font-size: 14px;
	    color: #888;
	}
</style>
