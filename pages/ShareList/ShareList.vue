<template>
	<view class="page">
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>邀请用户</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>获得佣金</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list" v-if="OrderType==0">
			<view class="order-li" v-for="(item,index) in InviteList" :key="index">
				<view class="order-number">
					<view class="number">
						<text>用户账号：{{item.mobile}}</text><text class="icon">{{item.agent_des}}</text>
					</view>
					<view class="type">
						<text>用户名：</text>
						<text>{{item.name||'--'}}</text>
					</view>
				</view>
				<view class="goods-list">
					<view class="list">
						<view class="info"><text class="big">他的邀请</text><text>{{item.profit_member}}人</text></view>
						<view class="info"><text class="big">他的收入</text><text>{{item.invitation_money}}元</text></view>
						<view class="info"><text class="big">替你赚取</text><text>{{item.agents_profit_money}}元</text></view>
						<view class="info"><text class="big">他的返佣</text><text>{{item.mange_rate}}%</text></view>
					</view>
				</view>
				<view class="order-status">
					<view class="status">
						<text>注册时间：</text>
						<text>{{item.create_time+" "+item.create_time_m}}</text>
					</view>
					<view class="switch-setting">
						<text class="action">截止：</text><text class="action">{{item.back_end}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-list" v-else-if="OrderType==1">
			<!--佣金-->
			<view class="position">
				<view class="title">
					<text>日期/时间</text>
					<text class="info_50">来源</text>
					<text>返佣/金额</text>
				</view>
				<view class="list" v-for="(item,index) in AwardsList" :key="index">
					<view class="info"><text class="big">{{item.create_time}}</text><text>{{item.create_time_m}}</text></view>
					<view class="info info_50"><text class="size_11">{{item.info}}</text></view>
					<view class="info">
						<text class="big green">{{item.affect}}</text>
						<text>{{item.money_a}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				OrderType  : 0,
				InviteList : [],
				AwardsList : [],
			};
		},
		onLoad(params) {
			this.OrderType = params.type;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			switch(params.type) {
				case '0':
					this.getInvite(this.token,1);//获取下级信息
					break;
				case '1':
					this.getAwards(this.token,1);//获取下级信息
					break;
			}
		},
		methods:{
			/* 订单tab切换状态 */
			onOrderTab(type){
				this.OrderType = type;
				/*uni.navigateTo({
					url: '/pages/ShareList/ShareList?type='+type,
				})*/
			},
			/*获取下级信息*/
			async getInvite(token,page){
				uni.showLoading({title:"加载中",icon:"loading"});
				//this.InviteList = '';
				//if(status==0)status=null;
				uni.request({
					url: this.apiServer+'/apicom/Invite?page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						order : '0',
						token : token,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status==1){
							var list = res.data.data;
							this.InviteList = list;
							console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取佣金信息*/
			async getAwards(token,page){
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/Invite/award?page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						token : token,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status==1){
							var list = res.data.data;
							this.AwardsList = list;
							console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'ShareList.scss';
	
/*lz自定义*/ 
.order-tab{top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));height: 88rpx;}
.order-tab .tab{height: 100%;}
.order-list{margin-top: 100rpx;}
.order-list .list{border-radius: 0;}
.order-tab .action uni-text{color: #ee0a24;}
.order-tab .action .line{background: #ee0a24;border-radius: 4rpx;}
.order-list .order-li .order-number{padding: 12rpx 20rpx;height: auto;}

// 卡片列表
.order-list .position{border-radius: 0;}
</style>
