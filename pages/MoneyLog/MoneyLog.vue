<template>
	<view class="page">
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>全部</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>充值</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>提现</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==33}" @click="onOrderTab(33)">
				<text>冻结</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==20}" @click="onOrderTab(20)">
				<text>结算</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==10}" @click="onOrderTab(10)">
				<text>佣金</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="title bWvahM">
				<text>日期</text>
				<text>类型</text>
				<text>金额/余额</text>
				<text>管理费/余额</text>
			</view>
			<view class="order-li" v-for="(item,index) in MoneyList" :key="index">
				<view class="goods-list">
					<view class="list">
						<view class="info">
							<text style="color: #252525;">{{item.happend_time}}</text>
							<text>{{item.happend_date}}</text>
							
						</view>
						<view class="info" style="color: #252525;">
							{{item.type_name}}
						</view>
						<view class="info">
							<text class='green' :class="{'red':item.affect>0}">{{calculate(item.affect)}}元</text>
							<text style="color: #252525;">{{calculate(item.account)}}元</text>
						</view>
						<view class="info">
							<text class='green' :class="{'red':item.affect>0}">{{calculate(item.fee_affect)}}</text>
							<text style="color: #252525;">{{item.fee_remain}}</text>
						</view>
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
				OrderType: 0,
				renewal: 1,//自动续期状态
				MoneyList:[],
			};
		},
		onLoad() {
			//this.OrderType = params.type;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			this.getMoneyList(this.token,this.OrderType,1);//获取子账号信息
		},
		methods:{
			/**
			 * 订单tab切换状态
			 * @param {Number} type
			 */
			onOrderTab(type){
				this.OrderType = type;
				this.getMoneyList(this.token,type,1);//获取子账号信息
			},
			/*获取操盘信息*/
			async getMoneyList(token,keyword,page){
				//uni.showLoading({title:"加载中",icon:"loading"});
				this.MoneyList = '';
				if(keyword==0)keyword='';
				uni.request({
					url: this.apiServer+'/apicom/moneylog?page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						_search_field : "type",
						keyword : keyword,
						token   : token,
					},
					success: res => {
						//uni.hideLoading();
						if(res.data.status==1){
							var list = res.data.data;
							this.MoneyList = list;
							console.log(this.MoneyList, 'this.MoneyList');
							//console.log(res.data.data);
						}
					},
					fail:function(e){
						//uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*计算单位*/
			calculate(number){
				number = parseInt(number);
				if(number==0 || !number)return 0;
				if(number.toString().length >= 13){
					var unit = (number/1000000000000).toFixed(2);
					return unit + '万亿';
				}else if(number.toString().length >= 9){
					var unit = (number/100000000).toFixed(2);
					return unit + '亿';
				}else if(number.toString().length > 4){
					var unit =  (number/10000).toFixed(2);
					return unit + '万';
				}else{
					var unit =  number.toFixed(2);
					return unit;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'MoneyLog.scss';
	
/*lz自定义*/ 
.order-tab{top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));height: 88rpx;}
.order-tab .tab{height: 100%;}
.order-list{margin-top: 100rpx;}
.order-list .list{border-radius: 0;}
.order-tab .action uni-text{color: #ee0a24;}
.order-tab .action .line{background: #ee0a24;border-radius: 4rpx;}
.order-list .order-li .order-number{padding: 12rpx 20rpx;height: auto;}

/*卡片式信息UI调整*/ 
.order-list .order-li{padding: 0;border-radius:0;}
.order-list .order-li .order-status{border-bottom: 1px #c8c4c4 dashed;padding: 10rpx 20rpx 10rpx 0 ;height: auto;}
.order-list .order-li .goods-list .list{padding: 12rpx 0;height: auto;}
</style>
