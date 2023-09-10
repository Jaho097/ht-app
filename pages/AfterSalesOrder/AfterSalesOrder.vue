<template>
	<view class="page">
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>全部</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>操盘中</text>
				<text class="line"></text>
			</view>
			<!-- <view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>审核中</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>未通过</text>
				<text class="line"></text>
			</view> -->
			<view class="tab" :class="{'action':OrderType==5}" @click="onOrderTab(5)">
				<text>已结束</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="order-li" v-for="(item,index) in PeiziList" :key="index">
				<view class="order-number" @click="goDetails(token,item.id)">
					<view class="number">
												
						
						
						<text><text class="orderid">子账号：</text>{{item.sub_account}}</text>
						<view class="type">
							<uni-tag :inverted="true" :text="item.type.substr(1,1)" custom-style="background-color: none; border-color: #DE4A29; color: #DE4A29;" size="mini"/>
						</view>
					</view>
					<!-- 操盘中 -->
					<uni-tag v-if="item.status_text === '操盘中'" :text="item.status_text" :inverted="true"
						custom-style="border: none; color: rgb(253, 68, 0);margin-right:10rpx;font-size: 14px;" size="mini"/>
					
					<!-- 审核中 -->
					<uni-tag v-else-if="item.status_text === '审核中'" :text="item.status_text" 
						custom-style="border: none; color: rgb(253, 68, 0);margin-right:10rpx;font-size: 14px;" size="mini"/>
					
					<!-- 未通过 -->
					<uni-tag disabled v-else-if="item.status_text === '未通过'" :text="item.status_text" 
						custom-style="border: none; color: rgb(253, 68, 0);margin-right:10rpx;font-size: 14px;" size="mini"/>
					
					<!-- 已结束 -->
					<uni-tag disabled v-else :text="item.status_text" 
						custom-style="border: none; color: rgb(253, 68, 0);margin-right:10rpx;font-size: 14px;" size="mini"/>
				</view>
				<view class="goods-list" @click="goDetails(token,item.id)">
					<view class="list">
						<view class="info">
							<text class="big">操盘资金</text>
							<text class="sub">{{calculate(item.init_money)}}</text>
						</view>
						<view class="info">
							<text class="big">可用余额</text>
							<text class="sub">{{calculate(item.avail)}}</text>
						</view>
						<!-- <view class="info">
							<text class="big">操盘账户</text>
							<text class="sub blue">{{item.sub_account || '--'}}</text>
						</view> -->
						<view class="info">
							<text class="big">预计盈亏</text>
							<text class="sub" :class="{'red':parseInt(item.return_money)>=0}">{{calculate(item.return_money)}}</text>
						</view>
					</view>
				</view>
				<view class="order-status">
					<view class="status">
						<text class="time-section">操盘时间：</text>
						<text>{{item.verify_time}}至{{item.end_time}}</text>
					</view>
					<!-- <view class="switch-setting" v-if="item.types<4 && item.status==1">
						<text class="action">自动续期</text>
						<switch class="red sm" color="red !important" v-if="item.renewal==1" checked="true" @change="onRenewal(index,item.id)" style="transform:scale(0.7)"></switch>
						<switch class="red sm" color="red !important" v-else  @change="onRenewal(index,item.id)" style="transform:scale(0.7)"></switch>
					</view> -->
				</view>
			</view>
		</view>
		<div class="am-list-footer"><div style="text-align: center;">---- 已到底部 ----</div></div>
		
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				OrderType: 4,
				renewal: 1,//自动续期状态
				PeiziList:[],
			};
		},
		onLoad() {
			//this.OrderType = params.type;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			this.getPeiziList(this.token,this.OrderType,1);//获取子账号信息
		},
		methods:{
			/* 订单tab切换状态 */
			onOrderTab(type){
				this.OrderType = type;
				this.getPeiziList(this.token,type,1);//获取子账号信息
			},
			/*获取操盘信息*/
			async getPeiziList(token,status,page){
				//uni.showLoading({title:"加载中",icon:"loading"});
				this.PeiziList = '';
				if(status==0)status=null;
				uni.request({
					url: this.apiServer+'/apicom/financing?status='+status+'&type_list=search&page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						token   : token,
					},
					success: res => {
						//uni.hideLoading();
						if(res.data.status==1){
							var list = res.data.data.data;
							this.PeiziList = list;
							//console.log(res.data.data);
							console.log(this.PeiziList, 'this.PeiziList');
						}
					},
					fail:function(e){
						//uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
				uni.hideLoading();
			},
			/*自动续期按钮*/
			async onRenewal(index,id){
				uni.request({
					url: this.apiServer+'/apicom/financing/autorenewal',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : id,
						token: this.token
					},
					success: res => {
						if(res.data.status == 1){
							this.PeiziList[index].renewal  = res.data.data;
							uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*计算单位*/
			calculate(number){
				if(number==0)return number;
				if(parseInt(number).toString().length >= 13){
					var unit = (number/1000000000000).toFixed(2) + '万亿';
					return unit;
				}else if(parseInt(number).toString().length >= 9){
					var unit = (number/100000000).toFixed(2) + '亿';
					return unit;
				}else if(parseInt(number).toString().length >= 4){
					var unit =  (number/10000).toFixed(2) + '万';
					return unit;
				}else{
					var unit =  number.toFixed(2) + '元';
					return unit;
				}
			},
			goDetails(token,id){
				uni.navigateTo({
					url: '/pages/AccoutSet/AccoutSet?token='+token+'&id='+id,
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'AfterSalesOrder.scss';
	
/*lz自定义*/ 
.order-tab{top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));height: 88rpx;}
.order-tab .tab{height: 100%;}
.order-list{margin-top: 100rpx;}
.order-list .list{border-radius: 0;}
.order-tab .action uni-text{color: #ee0a24;}
.order-tab .action .line{background: #ee0a24;border-radius: 4rpx;}

/*卡片详情样式*/ 
.page{background-color: #f1f1f1;}
.order-list .order-li{padding: 0;border-radius:0;}
.order-list .order-li .order-number{padding-right: 20rpx;}
.order-list .order-li .goods-list .list{padding: 12rpx 0;height: auto;}
.order-list .order-li .order-status{    padding: 5px 10px;
    font-size: 12px;}
.order-list .order-li .goods-list .list .sub{height: auto;line-height: normal;}
.order-list .order-li .order-number .number .orderid,.time-section{color: #333333;}

</style>
