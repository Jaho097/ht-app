<template>
	<view class="page">
		<!-- 旧代码 -->
		<!-- head -->
		<!-- 用户信息 -->
		<view class="head-navbar" style="position: relative;">
			<view class="back pos-absl" @click="onBack">
				<text></text>
			</view>
			<view class="nav-title">交易账户</view>
			<view class="nav-btnbox" v-if="myMobile">
				<text class="nav-btn" @click="subwin = true">
					{{sub_account||'选择操盘账户'}}
					<uni-icons custom-prefix="iconfont" type="icon-paixujiantouxia" color="#FFF"></uni-icons>
				</text>
			</view>
			<view class="nav-btnbox" v-else>
				<text class="nav-btn" @click="onUserInfo">登录/注册</text>
			</view>
		</view>
		
		<!-- <view class="head-back">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="info">
				<view class="btn" @click="subwin = true">
					<text class="text">{{sub_account||'选择操盘账户'}}</text>
				</view>
			</view>
			<view class="more-icon">
				<view class="icon-list">
					<text class="iconfont icon-fadajing"></text>
				</view>
			</view>
		</view>
		<view class="head-height"></view> -->
		
		
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>持仓</text>
				<text class="line"></text>
			</view>
			<!--view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>撤单</text>
				<text class="line"></text>
			</view-->
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>委托</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>成交</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==5}" @click="onOrderTab(5)">
				<text>交割</text>
				<text class="line"></text>
			</view>
		</view>
		<view class="user-info" v-if="OrderType>2">
			<view class="date-list">
				<view class="size-list" style="display: flex;">
					<uni-tag 
						v-for="(item,index) in DateList" :key="index"
						:class="{'on':DateIndex === index}"
						@click="onDateList(item,index)" 
						class="date-tags"
						:text="item.date" :circle="true" size="small">
					</uni-tag>
					<!-- <div class="list" v-for="(item,index) in DateList" 
					:class="{'action':DateIndex === index}"
					@click.stop="onDateList(item,index)" :key="index">
						<text>{{item.date}}</text>
					</div> -->
				</view>
			</view>
		</view>
		<!-- 查询列表 -->
		<mescroll-body ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:down="downOption"
			:up="upOption"
			:top="0">
		<view class="order-list">
			<!--持仓-->
			<view class="order-position" v-if="OrderType==1">
				<view class="list" v-for="(item,index) in positionList" :key="index" @click="toDeails(item.gupiao_code)">
					<view class="order-number">
						<view class="number">
							<!-- <text class="on-top">{{getHouse(item.gupiao_code)}}</text> -->
							<text class="bl">{{item.gupiao_name}}</text>
							<text>{{item.gupiao_code}}</text>
						</view>
						<view class="type">
							<text>市值：</text>
							<text class="red">{{parseFloat(item.now_price*item.stock_count).toFixed(2)}}元</text>
						</view>
					</view>
					<view class="goods-list" style="padding-bottom: 30rpx;">
						<view class="list-mid">
							<view class="info">
								<text class="big fl">
									<font class="code"
									:class="item.now_price<=item.ck_price?'green':'red'">{{item.now_price}}</font>
									<font class="min">现价</font>
								</text>
								<text class="fl">
									<font class="code">{{item.ck_price}}</font>
									<font class="min">买入</font>
								</text>
							</view>
							<view class="info">
								<text class="big">{{item.canbuy_count}}股</text>
								<text class="">可用</text>
							</view>
							<view class="info">
								<text class="big">{{item.stock_count}}股</text>
								<text class="">持仓</text>
							</view>
							<view class="info">
								<text class="big fr"
								:class="item.ck_profit<0?'green':'red'">{{item.ck_profit}}元</text>
								<text class="fr">盈亏</text>
							</view>
						</view>
					</view>
					<!-- <view class="order-status">
						<view class="buy-status">
							<text>买一{{item.buy_one_price}}</text>
							<text>买二{{item.buy_two_price}}</text>
							<text>买三{{item.buy_three_price}}</text>
						</view>
						<view class="buy-status">
							<text>卖一{{item.sell_one_price}}</text>
							<text>卖二{{item.sell_two_price}}</text>
							<text>卖三{{item.sell_three_price}}</text>
						</view>
					</view> -->
				</view>
			</view>
			<!--撤单-->
			<view class="position" v-if="OrderType==2">
				<view class="title">
					<text>名称/代码</text>
					<text>价格/数量</text>
					<text>日期/时间</text>
					<text>操作/状态</text>
				</view>
				<view class="list" v-for="(item,index) in cancelList" :key="index">
					<view class="info"><text class="big">{{item.gupiao_name}}</text><text>{{item.gupiao_code}}</text></view>
					<view class="info"><text class="big">{{item.trust_price}}</text><text>{{item.trust_count}}</text></view>
					<view class="info"><text class="big">{{toDate(item.trust_date)}}</text><text>{{item.trust_time}}</text></view>
					<view class="info"><text class="big">{{item.flag2}}</text><text>{{item.status}}</text></view>
				</view>
			</view>
			<!--委托-->
			<view class="order-position" v-if="OrderType==3">
				<view class="list" v-for="(item,index) in trustList" :key="index">
					<view class="order-number">
						<view class="number"><text>单号：{{item.trust_no}}</text></view>
						<view class="type">
							<!--text>状态：</text-->
							<!--text class="red" :class="{'blue':item.cancel_order_flag==0}">{{item.status}}</text-->
							<text class="che" @click="onCancel(item.trust_no)" v-if="item.cancel_order_flag==0">撤销</text>
						</view>
					</view>
					<view class="goods-list">
						<view class="list-mid">
							<view class="info">
								<text class="big fl">{{item.gupiao_name}}</text>
								<text class="fl">
									<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
									{{item.gupiao_code}}
								</text>
							</view>
							<view class="info">
								<text class="big">{{item.trust_price}}元</text>
								<text class="">{{item.flag2}}</text>
							</view>
							<view class="info">
								<text class="big">{{parseFloat(item.trust_count)}}股</text>
								<text class="">委托量</text>
							</view>
							<view class="info">
								<text class="big fr">{{parseFloat(item.amount)}}元</text>
								<text class="fr">成交量</text>
							</view>
						</view>
					</view>
					<view class="order-status">
						<view class="status">
							<text>日期：</text>
							<text>{{item.trust_date+" "+item.trust_time}}</text>
						</view>
						<view class="status">
							<text>状态：</text>
							<text class="red"  v-if="item.status=='已成'">{{item.status}}</text>
							<text class="blue" v-else-if="item.status=='已委托'">{{item.status}}</text>
							<text class="gray" v-else="item.status=='已撤'">{{item.status}}</text>
						</view>
					</view>
				</view>
			</view>
			<!--成交-->
			<view class="order-position" v-if="OrderType==4">
				<view class="list" v-for="(item,index) in dealList" :key="index">
					<view class="order-number">
						<view class="number"><text>单号：{{item.deal_no}}</text></view>
						<view class="type"><text>状态：</text><text class="red">{{item.status}}</text></view>
					</view>
					<view class="goods-list">
						<view class="list-mid">
							<view class="info">
								<text class="big fl">{{item.gupiao_name}}</text>
								<text class="fl">
									<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
									{{item.gupiao_code}}
								</text>
							</view>
							<view class="info">
								<text class="big">{{item.deal_price}}元</text>
								<text class="">{{item.flag2}}</text>
							</view>
							<view class="info">
								<text class="big">{{parseFloat(item.trust_count)}}股</text>
								<text class="">数量</text>
							</view>
							<view class="info">
								<text class="big fr">{{item.amount}}元</text>
								<text class="fr">成交额</text>
							</view>
						</view>
					</view>
					<view class="order-status">
						<view class="status"><text>日期：</text><text>{{toDate(item.deal_date)}}</text></view>
						<view class="status"><text>发生时间：</text><text>{{item.deal_time}}</text></view>
					</view>
				</view>
			</view>
			<!--交割-->
			<view class="order-position" v-if="OrderType==5">
				<view class="list" v-for="(item,index) in deliveryList" :key="index">
					<view class="order-number">
						<view class="number"><text>单号：{{item.deal_no}}</text></view>
						<view class="type" v-if="item.status==1"><text>状态：</text><text class="red">成功</text></view>
					</view>
					<view class="goods-list">
						<view class="list-mid">
							<view class="info">
								<text class="big fl">{{item.gupiao_name}}</text>
								<text class="fl">
									<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
									{{item.gupiao_code}}
								</text>
							</view>
							<view class="info">
								<text class="big">{{item.deal_price}}元</text>
								<text class="">{{item.volume}}股</text>
							</view>
							<view class="info">
								<text class="big">{{item.residual_quantity}}元</text>
								<text class="">{{item.business_name}}</text>
							</view>
							<view class="info">
								<text class="big fr">{{(parseFloat(item.commission)+parseFloat(item.stamp_duty)+parseFloat(item.transfer_fee)).toFixed(2)}}元</text>
								<text class="fr">手续费</text>
							</view>
						</view>
					</view>
					<view class="order-status">
						<view class="status"><text>日期：</text><text>{{toDate(item.deal_date)}}</text></view>
						<view class="status"><text>发生时间：</text><text>{{toDate(item.deal_date,1)}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 子账户选择窗口 -->
		<view class="sub-win" @click="subwin = false">
			<view class="cu-modal bottom-modal" :class="{'show':subwin}">
			  <view class="cu-dialog">
			    <view class="pay-list">
						<view class="list" v-for="(item,index) in accountData" :key="index" 
						@click.stop="onSubwin(index)">
							<view class="pay flex">
								<text class="flex-twice text-bold text-df">账号：{{item.sub_account}}</text>
								<text class="flex-sub text-sm">状态：{{item.status?'正常':'不可用'}}</text>
							</view>
							<view class="check" v-if="item.status > 0">
								<text class="iconfont" :class="accounId===item.id?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
					</view>
			  </view>
			</view>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
	var _self,loginRes;
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				downOption: {},// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {use: false},// 上拉加载的配置(可选, 绝大部分情况无需配置)
				OrderType: 0,
				token: '',
				index: null,
				subwin: false,
				myMobile: '',
				subId: '',
				beginday:this.getDayDate(0),
				endday  :this.getDayDate(0),
				accountData :uni.getStorageSync('accountData'),
				accounId    : uni.getStorageSync('accounId')||'',
				sub_account : uni.getStorageSync('sub_account')||'',
				positionList:[],
				cancelList:[],
				trustList:[],
				dealList:[],
				deliveryList:[],
				DateIndex: 0,
				DateList:[
					{
						index: 0,
						date: '当天'
					},{
						index: 1,
						date: '本周'
					},{
						index: 2,
						date: '本月'
					},{
						index: 3,
						date: '一年'
					},
				],
			};
		},
		onLoad(params) {
			this.OrderType = params.type;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			if(!this.accountData){
				this.getSubAccount(this.token);//加载子账户信息
			}
			this.getOrderList(this.token,this.accounId,this.OrderType);//accList[0].id是子账户ID
			//this.getSubAccount(this.token);//获取子账号信息
		},
		methods:{
			/*获取交易账户信息*/
			async getSubAccount(token){
				this.accountData = '';
				uni.showLoading({'title':"更新账户列表中"});
				uni.removeStorageSync('accountData');//清除子账户缓存数据
				uni.request({
					url: this.apiServer+'/market/index/getSubAccount',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{token: token},
					success: res => {
						uni.hideLoading();
						if(res.data.status == 1 && res.data.data.length != 0){
							this.accountData = res.data.data;
							uni.setStorageSync('accountData' , this.accountData);//子账户数据缓存到本地
							this.accounId = this.accountData[0].id;//默认获取第一个账号的信息
							this.getacInfo(this.token,this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account' , this.sub_account);
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
				uni.hideLoading();
			},
			/*获取持仓信息*/
			async getOrderList(token,id,type){
				if(type==1){var action = 'position';}//持仓this.positionList = '';
				if(type==2){var action = 'cancel_trust';}//撤单this.cancelList = '';
				if(type==3){var action = 'trust';}//委托this.trustList = '';
				if(type==4){var action = 'deal_stock';}//成交this.dealList = '';
				if(type==5){var action = 'delivery';}//交割this.deliveryList = '';
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/market/trade/'+action,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						beginday: this.beginday,
						endday  : this.endday,
						token   : token,
						id      : id,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status){
							if(type==1)this.positionList = res.data.data.list;//持仓
							if(type==2)this.cancelList   = res.data.data.list;//撤单
							if(type==3)this.trustList    = res.data.data.list;//委托
							if(type==4)this.dealList     = res.data.data;//成交
							if(type==5)this.deliveryList = res.data.data;//交割
							//console.log(res.data.data.list);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			async onCancel(order){
				uni.showLoading({title:"撤单申请中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/market/trade/cancel_order',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						trust_no: order,
						token   : this.token,
						id      : this.accounId,
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({title:res.data.message,icon:"none"});
						if(res.data.status){
							setTimeout(() =>{
								this.getOrderList(this.token,this.accounId,this.OrderType);//accList[0].id是子账户ID
							},1000)
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			onSubwin(i){
				/*if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}*/
				this.accounId    = this.accountData[i].id;//将array【改变索引】的值赋给定义的picker变量
				this.sub_account = this.accountData[i].sub_account;
				uni.setStorageSync('accounId' , this.accounId);
				uni.setStorageSync('sub_account' , this.sub_account);
				this.subwin = false;
				this.getOrderList(this.token,this.accounId,this.OrderType);
				//this.getacInfo(this.token,this.accounId);
				console.log(this.accounId,this.sub_account)
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				//this.getSubAccount(this.token);//获取子账号信息
				this.getOrderList(this.token,this.accounId,this.OrderType);
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() =>{
					this.mescroll.endByPage(10, 20);
				},2000)
			},
			/*选择查询时间*/
			onDateList(item,index){
				this.DateIndex = index;
				if(this.DateIndex==0){
					this.beginday=this.getDayDate(0);
					this.endday  =this.getDayDate(0);
				}
				if(this.DateIndex==1){
					this.beginday=this.getDayDate(7);
					this.endday  =this.getDayDate(0);
				}
				if(this.DateIndex==2){
					this.beginday=this.getDayDate(30);
					this.endday  =this.getDayDate(0);
				}
				if(this.DateIndex==3){
					this.beginday=this.getDayDate(365);
					this.endday  =this.getDayDate(0);
				}
				this.getOrderList(this.token,this.accounId,this.OrderType);
			},
			/*返回点击*/
			onBack(){
				uni.navigateBack();
			},
			/*订单tab点击*/
			onOrderTab(type){
				this.OrderType = type;
				this.getOrderList(this.token,this.accounId,type);
				// #ifdef H5
				/*uni.redirectTo({
					url: '/pages/MyOrderList/MyOrderList?type=' + type,
				})*/
				//#endif
			},
			/*股票列表点击*/
			toDeails(code){
				uni.navigateTo({
					//url: '/pages/GoodsDetails/Candle?code='+code,
					url: '/pages/MarketDetails/MarketDetails?code='+code,
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			},
		    /*获取时间*/
			getDayDate(n){
				var day = new Date();
				day.setTime(day.getTime()-24*60*60*1000*n);
				var dataTime = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
				return dataTime;
			},
			/*获取时间*/
			toDate(timestamp,num=0){//num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
				timestamp = timestamp+'';
				timestamp = timestamp.length==10?timestamp*1000:timestamp;
				var date = new Date(timestamp);
				var y = date.getFullYear();  
				var m = date.getMonth() + 1;  
				m = m < 10 ? ('0' + m) : m;  
				var d = date.getDate();  
				d = d < 10 ? ('0' + d) : d;  
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;  
				second = second < 10 ? ('0' + second) : second; 
				if(num==0){
					return y + '-' + m + '-' + d;  
				}else{
					return h +':'+ minute +':' + second;  
				}
			},
			/*识别股票所属交易所*/
			getHouse(code){
				var str  = code.toString();
				var code = str.slice(0,1);
				var codeName = code >= 6 ? "SH" : "SZ";
				return codeName;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyOrderList.scss';

/*lz自定义*/ 
.order-tab{top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));height: 88rpx;}
.order-tab .tab{height: 100%;}
.order-list{margin-top: 100rpx;}
.order-list .list{border-radius: 0;}
.order-tab .action uni-text{color: #ee0a24;}
.order-tab .action .line{background: #ee0a24;border-radius: 4rpx;}
.order-list .order-li .order-number{padding: 12rpx 0;height: auto;}
// tags标签
// .user-info .date-list .size-list .action{background-color: rgba(233, 59, 61, 0.3);border: 1px solid #fe3b0f;}
.date-tags{display: inline-block;
    padding: 8rpx 26rpx;
    background-color: #EEEEEE;
    margin: 0 8rpx;
	/*border-radius: 44rpx;*/
    box-sizing: border-box;
    border: 1px solid #ddd;
    width: 22%;
	color: #959595;
    text-align: center;}
.date-tags.on{background: rgb(233, 59, 61);border: 1px solid #fe3b0f;color:#FFF;}

//顶部导航栏
.head-navbar{
	display: flex;
	color: #FFF;
	height: 88rpx;
	background-color: rgb(222, 74, 41);
	.pos-absl{
		// position: absolute;top: 0;left: 0;
		// width: 44px;height: 44px;
		position: absolute;
		left: 0;
		top: 0;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 100%;
		text{
			width: 20rpx;
			height: 20rpx;
			border-left: 4rpx solid #ffffff;
			border-bottom: 4rpx solid #ffffff;
			transform: rotate(45deg);
		}
			
	}
	.nav-title,.nav-btnbox{
		flex: 1;padding: 0 10rpx;
	}
	.nav-title{text-align: right;line-height: 88rpx;font-weight: 600;font-size: 32rpx;}
	.nav-btnbox{text-align: left;display: flex;align-items: center;font-size: 28rpx;}
	.nav-btn{padding: 0 20rpx;border: #FFF 1px solid;border-radius: 10rpx;}
}


</style>
