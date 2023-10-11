<template>
	<view class="page">
		<view class="goods-head" v-if="headShow_">
			<!-- 返回 -->
			<view class="back" @click="onBack">
				<view class="back-one action">
					<text></text>
				</view>
			</view>
			<!-- 股票名称 -->
			<view class="head-tab">
				<view class="tab">
					<text class="tab-name name">{{marketData.name}}</text>
					<text class="tab-name code">{{marketData.code}}</text>
				</view>
			</view>
			<!-- 刷新 -->
			<view class="back" @click="getacInfo(accounId)">
				<uni-icons type="refreshempty" size="24" color="#000"></uni-icons>
			</view>
		</view>
		<!-- 买卖档 -->
		<view class="goods-discounts" :class="{'mt45':headShow_}" >
			<view class="sc-daURTG ScOSY"  v-if="headShow_!=true">
			
				<view class="sc-bXGyLb icUOfo">
					<view class="stock">
						<view class="name">{{marketData.name||'-'}} </view>
						<view class="code">{{marketData.code||'0.00'}}</view>
					</view>
					<view class="price"><span class="sc-fjdhpX cEvEJT">{{marketData.current_price||'0.00'}}</span></view>
					<view class="range"><span class="sc-fjdhpX cEvEJT"><text class="right red">{{marketData.harden_price||'0.00'}}</text></span></view>
					<view class="rate"><span class="sc-fjdhpX cEvEJT"><text class="right green">{{marketData.drop_price||'0.00'}}</text></span></view>
					
					
					
				</view><a style="text-decoration: none;" @click="toSearch()" class="sc-lkqHmb geobGM" href="javascript:void(0);">
							<icon type="search" color="red" size="15" @click="Btype=1;onPriceList(0)"/>搜索股票
						</a>
			</view>
			<view class="list">
				<view class="title br-red"   :class="{'action':Btype==1}" @click="Btype=1;onPriceList(0)"><text>买入</text></view>
				<view class="title br-green" :class="{'action':Btype==2}" @click="Btype=2;onPriceList(0)"><text>卖出</text></view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs radius">
					<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
						<view class="margin-xs text-sm text-left">
							<text>买{{index+1}}</text>
						</view>
						<view class="margin-xs text-sm text-center" 
						:class="{'red':marketData[funbs('buy',index+1,'price')]>=Y}">
							<text>{{marketData[funbs('buy',index+1,'price')]}}</text>
						</view>
						<view class="margin-xs text-sm text-right">
							<text>{{marketData[funbs('buy',index+1,'amount')]}}</text>
						</view>
					</view>
				</view>
				<view class="flex-sub margin-xs radius">
					<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
						<view class="margin-xs text-sm text-left">
							<text>卖{{index+1}}</text>
						</view>
						<view class="margin-xs text-sm text-center" 
						:class="{'red':marketData[funbs('sell',index+1,'price')]>=Y}">
							<text>{{marketData[funbs('sell',index+1,'price')]}}</text>
						</view>
						<view class="margin-xs text-sm text-right">
							<text>{{marketData[funbs('sell',index+1,'amount')]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 价格相关 -->
		<view class="banner-title">
			<!-- 价格 -->
			<!--view class="price-info">
				<view class="price" :class="{'red':marketData.price_range>0}">
					<view class="price-rate">
						<text class="max">{{marketData.current_price}}</text>
					</view>
					<view class="price-rate">
						<text class="min">{{marketData.price_range}}</text>
						<text class="min">{{marketData.price_rate}}%</text>
					</view>
				</view>
				<view class="info">
					<view class="list">
						<view class="iconfont">
							<text class="left">涨停</text>
							<text class="right red">{{marketData.harden_price}}</text>
						</view>
						<view class="iconfont">
							<text class="left">跌停</text>
							<text class="right green">{{marketData.drop_price}}</text>
						</view>
					</view>
				</view>
			</view-->
			<!-- <view class="price-info flex grid col-4">
				<view class="flex-twice text-left">
					<view class="flex-sub text-sm">
						<text class="left">最新：</text>
						<text class="right red" v-if="marketData.price_range>0">{{marketData.current_price||'0.00'}}</text>
						<text class="right green" v-else>{{marketData.current_price||'0.00'}}</text>
						<text class="left" style="margin-left:10px"></text>
						<text class="right red" v-if="marketData.price_range>0">{{marketData.price_rate}}%</text>
						<text class="right green" v-else>{{marketData.price_rate||'0.00'}}%</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="flex-sub text-sm">
						<text class="left">涨停：</text>
						<text class="right red">{{marketData.harden_price||'0.00'}}</text>
					</view>
				</view>
				<view class="flex-sub text-right">
					<view class="flex-sub text-sm">
						<text class="left">跌停：</text>
						<text class="right green">{{marketData.drop_price||'0.00'}}</text>
					</view>
				</view>
			</view> -->
			<view class="attr-size flex">
				<view class="attr-list flex-twice">
					<view class="cu-btn flex-sub" v-for="(item,index) in PriceList"
					:class="{'action':PriceIndex === index}"
					@click.stop="onPriceList(index)" :key="index">
						<text class="text-sm">{{item.name}}</text>
					</view>
				</view>
				<view class="attr-list cu-btn round flex-twice">
					<view class="btn" @click="subwin = true">
						<text class="text">{{sub_account||'选择操盘账户'}}</text>
					</view>
				</view>
			</view>
			<view class="attr-price">
				<view class="left" >委托金额：<text class="t_16">{{amount}}</text></view>
				<view class="right">账户余额：<text class="t_16">{{accountInfo.avail}}</text></view>
			</view>
			<view class="attr-maine">
				<view class="attr-number">
					<view class="tit">价格：</view>
					<view class="number text-center">
						<!-- <text class="kuang iconfont icon-jian" @click="onReduction('price')"></text> 
						disabled="disabled"-->
						<uni-icons custom-prefix="iconfont" type="icon-jianshao" size="32" color="#03AA3A" @click="onReduction('price')"></uni-icons>
						<input type="number" v-model="price" maxlength="8" class="great" 
						:placeholder="PriceIndex==1?'按市价即时成交':'请填写价格'" 
						@input.stop ="PriceIndex==1?onInputPrice():''">
						<!-- <text class="kuang iconfont icon-jia" @click="onIncrease('price')"></text> -->
						<uni-icons custom-prefix="iconfont" type="icon-zengjia" size="24" color="#FF4500" @click="onIncrease('price')"></uni-icons>
					</view>
				</view>
				<view class="attr-number text-center" v-if="Btype == 1">
					<view class="tit">数量：</view>
					<view class="number">
						<!-- <text class="kuang iconfont icon-jian" @click="onReduction('count')"></text> -->
						<uni-icons custom-prefix="iconfont" type="icon-jianshao" size="32" color="#03AA3A" @click="onReduction('count')"></uni-icons>
						<input type="number" v-model="count" value="1" maxlength="8" class="red" 
						:placeholder="Canbuy?'可买'+Canbuy+'股':'数量'" @input.stop="onInputCount">
						<!-- <text class="kuang iconfont icon-jia" @click="onIncrease('count')"></text> -->
						<uni-icons custom-prefix="iconfont" type="icon-zengjia" size="24" color="#FF4500" @click="onIncrease('count')"></uni-icons>
					</view>
				</view>
				<view class="attr-number text-center" v-if="Btype == 2">
					<view class="tit">数量：</view>
					<view class="number">
						<!-- <text class="kuang iconfont icon-jian" @click="onReduction('count')"></text> -->
						<uni-icons custom-prefix="iconfont" type="icon-jianshao" size="32" color="#03AA3A" @click="onReduction('count')"></uni-icons>
						<input type="number" v-model="count" value="1" maxlength="8" class="red" 
						:placeholder="Cansell?'可卖'+Cansell+'股':'无持仓'" @input.stop="onInputCount">
						<!-- <text class="kuang iconfont icon-jia" @click="onIncrease('count')"></text> -->
						<uni-icons custom-prefix="iconfont" type="icon-zengjia" size="24" color="#FF4500" @click="onIncrease('count')"></uni-icons>
					</view>
				</view>
			</view>
			<view class="attr-size">
				<view class="attr-list">
					<view class="size-list">
						<uni-tag
							v-for="(item,index) in AttrList" :key="index"
							:class="{'on':AttrIndex === index}"
							@click="onAttrList(index)" 
							class="date-tags"
							:text="item.size" :circle="true" size="small">
						</uni-tag>
						<!-- <view class="list" v-for="(item,index) in AttrList" 
						:class="{'action':AttrIndex === index}"
						@click.stop="onAttrList(index)" :key="index">
							<text>{{item.size}}</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="uni-py-10 uni-px-8" style="width: 100%;">
				<button type="warn" style="width:100%;" class="uni-radius-5" v-if="Btype == 1" @click="onConfirm(Btype)">确认买入</button>
				<button type="warn" style="width:100%;background-color: #03AA3A;" class="uni-radius-5" v-if="Btype == 2" @click="onConfirm(Btype)">确认卖出</button>
			</view>
			<!-- <view class="attr-btn">
				<view class="add-buy"  v-if="Btype == 1" @click="onConfirm(Btype)">确认买入</view>
				<view class="add-sell" v-if="Btype == 2" @click="onConfirm(Btype)">确认卖出</view>
			</view> -->
		</view>
		<!-- 持仓 -->
		<view class="position" @click="getPosition(accounId)">
			<view class="title">
				<text>名称/代码</text>
				<text>可用/持仓</text>
				<text>现价/成本</text>
				<text>盈亏/市值</text>
			</view>
			<view class="info-ul text-center">
				<view class="none text-grey" v-if="!Position">点击加载持仓数据</view>
				<view class="list" v-else v-for="(item,index) in Position" :key="index" 
				@click="onTrad(item.gupiao_code,item.canbuy_count,item.sell_one_price,item.buy_one_price)">
					<view class="info">
						<text class="big">{{item.gupiao_name}}</text>
						<text>{{item.gupiao_code}}</text></view>
					<view class="info">
						<text class="big">{{item.canbuy_count}}</text>
						<text>{{item.stock_count}}</text></view>
					<view class="info">
						<text class="big">{{item.now_price}}</text>
						<text>{{item.ck_price}}</text></view>
					<view class="info">
						<text class="big red" :class="{'green':item.ck_profit<0}">{{item.ck_profit}}</text>
						<text>{{calculate(item.market_value)}}</text>
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
								<text class="flex-sub text-sm">状态：{{item.status?'正常':'到期'}}</text>
							</view>
							<view class="check">
								<text class="iconfont" :class="accounId===item.id?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
					</view>
			  </view>
			</view>
		</view>
		<uni-countdown :show-day="false" :hour="0" :minute="0" :second="30":reset="true"
		@timeup="getMarket(code);">
		</uni-countdown>
		
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
import GoodsCoupon from '../../components/GoodsAttr/GoodsAttr.vue';
import uniCountdown  from "@/components/CountDown/uni-countdown.vue"
import Request from '@/js_sdk/luch-request/luch-request/index.js'
const http = new Request();
var _self,loginRes;
export default {
	components: {
	  GoodsCoupon,uniCountdown
	},
	props:{
		headShow:{
			type:Boolean,
			default:true
		},
		code:{
			type:[Number,String],
			default:''
		},
		uid:{
			type:[Number,String],
			default:''
		},
		type_:{
			type:[Number,String],
			default:''
		},
		// code:'',
		// uid:''
	},
	data(){
		return {
			price_:0,
			headShow_:this.headShow,
			code_:this.code,
			uid_:this.uid,
			Y: '',//昨天收盘价
			T: '',//今天开盘价
			//id: '',
			token: '',
			subwin: false,
			price : '',//购股单价
			count : 0,//购股数量*100
			amount:'--',
			Canbuy : 0,
			Cansell: 0,
			PriceIndex: 1,//默认选择限价，即手动输入价格
			AttrIndex : '',
			Btype: 1,// 1：买类型，2：卖类型
			accountInfo:uni.getStorageSync('accountInfo')||'',
			accounId :  uni.getStorageSync('accounId')||'',
			sub_account:uni.getStorageSync('sub_account')||'',
			accountData:uni.getStorageSync('accountData')||'',
			marketData: {},
			Position:uni.getStorageSync('Position')||'',//当前股票持仓数据
			PriceList:[{index: 0,name: '限价'},{index: 1,name: '市价'}],
			AttrList:[{index: 0,size: '全仓'},{index: 1,size: '1/2'},{index: 2,size: '1/3'},{index: 3,size: '1/4'},],
		}
	},
	mounted(){
		// console.log('headShow_',this.headShow_)
		// console.log('uid',this.uid)
		// console.log('code',this.code)
		console.log(this.type_,'params.type')
		// this.changeType(3)
		this.getMarket(this.code);
		_self = this;
		_self.Btype = 1
		loginRes = _self.checkLogin();
		if(!loginRes){return;}
		// _self.Btype = this.type;
		// _self.uid   = loginRes[0];
		_self.token = loginRes[2];
		// _self.code  = params.code;
		_self.marketData = uni.getStorageSync('market-'+this.code);
		this.getSubAccount(_self.token);//获取子账号信息
	},
	onShow() {
		console.log('onShow')
		console.log('headShow_',this.headShow_)
		
		this.accountInfo = uni.getStorageSync('accountInfo');
		this.sub_account = uni.getStorageSync('sub_account');
		this.accountData = uni.getStorageSync('accountData');
		this.Position    = uni.getStorageSync('Position');
		// 获取路径参数
		    const launchOptions = uni.getLaunchOptionsSync();
		    
		    // 检查是否包含参数 query
		    if (launchOptions.query) {
		      const paramValue = launchOptions.query;
			  this.Btype = paramValue.type;
		      // 在这里处理参数值 paramValue
		      console.log('参数值为：', paramValue.type);
		    }
		// 
		console.log(this.accounId);
		if(this.Btype===1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
			this.price = this.marketData.sell_one_price;
			this.count  = '';
			if(this.accountInfo.avail)this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
		}else if(this.PriceIndex==1){
			this.price = ''; 
		}
		if(this.Btype===2 && this.PriceIndex==0){//当点击买入时，且为限价模式时
			this.price = this.marketData.buy_one_price;
			this.count  = '';
			if(this.accountInfo.avail)this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
			if(this.accounId)this.getcanSell(this.accounId)//获取持仓数据
		}else if(this.PriceIndex==1){
			this.price = '';
		}
		setTimeout(() =>{
			if(this.accounId)this.getPosition(this.accounId);//延迟加载持仓数据
		},2000)
	},
	onLoad(params){
		console.log('paramsparamsparams')
		_self = this;
		loginRes = _self.checkLogin();
		if(!loginRes){return;}
		console.log(params.type,'params.type')
		// _self.Btype = params.type;
		_self.uid   = loginRes[0];
		_self.token = loginRes[2];
		_self.code  = params.code;
		
		_self.marketData = uni.getStorageSync('market-'+params.code);
		this.getSubAccount(_self.token);//获取子账号信息
		_self.Btype = 1
	},
	
	onReady(){
		console.log('onReady')
		if(this.accounId){//先要默认子账号ID
			this.getacInfo(this.accounId);
		}
	},
	methods: 
	{
		changeType(type){
			console.log(type,'type')
			this.Btype = type
		},
		toSearch(){
			if(this.type==3){
				uni.navigateTo({
					url: '/pages/search/search?type=sell'
				})
			}else{
				uni.navigateTo({
					url: '/pages/search/search?type=buy'
				})
			}
		},
		/*获取股票信息*/
		async getMarket(code){
			if(!code){
				return
			}
			//var codeName = code >= 6 ? "sh"+code : "sz"+code;
			http.post(this.apiServer+'/market/index/market', {uid: this.uid,code: code},{
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				if(res.data.status == 1){
					this.marketData  = res.data.data;
					uni.setStorageSync('market-'+code , res.data.data);
					this.Y = parseFloat(this.marketData.yesterday_price);//把昨天收盘价赋值给Y
					this.T = parseFloat(this.marketData.open_price);//把今天开盘价赋值给T
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		/*获取交易账户信息*/
		async getSubAccount(){
			http.post(this.apiServer+'/market/index/getSubAccount', {token: this.token},{
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				if(res.data.status == 1&&res.data.data.length != 0){	
					this.accountData = res.data.data;
					uni.setStorageSync('accountData' , this.accountData);//子账户数据储存缓存到本地
							this.accounId = this.accountData[0].id;//默认获取第一个账号的信息
							this.getacInfo(this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account' , this.sub_account);
					
				}else{
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		async getacInfo(id){
			uni.showLoading({'title':"加载中"});
			http.post(this.apiServer+'/market/trade/account_info', {token: this.token,id: id},{
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				uni.hideLoading();
			//	if(res.data.data.b_status!=1){
			//		this.getSubAccount();//获取子账号信息
			//	}
				if(res.data.status == 1){
					this.accountInfo  = res.data.data;
					this.count  = '';
					this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
					uni.setStorageSync('accountInfo' , res.data.data);//子账户数据储存缓存到本地
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		/*获取可卖数量*/
		async getcanSell(id){
			http.post(this.apiServer+'/market/trade/canSellcount', {id: id,token: this.token,code : this.code},{
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				if(res.data.status == 1){
					this.Cansell = res.data.data<=0?0:res.data.data;
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		/*获取当前持仓*/
		async getPosition(id){
			http.post(this.apiServer+'/market/trade/position', {id: id,token: this.token},{
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				if(res.data.status == 1 && res.data.data.total>0){
					this.Position = res.data.data.list;
					uni.setStorageSync('Position' , res.data.data.list);//持仓数据储存缓存到本地
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		onSubwin(i){
			this.count  = '';//数量框清零
			this.amount = '--';//总金额清零
			this.accounId    = this.accountData[i].id;//将array【改变索引】的值赋给定义的picker变量
			this.sub_account = this.accountData[i].sub_account;
			uni.setStorageSync('accounId' , this.accounId);
			uni.setStorageSync('sub_account' , this.sub_account);
			this.subwin = false;
			this.getacInfo(this.accounId);
			console.log(this.accounId,this.sub_account)
		},
		/*去交易*/
		onTrad(code,cansell,sell_one,buy_one){
			this.code = code;
			this.Cansell = cansell<=0?0:cansell;
			
			if(this.Btype===1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
				this.price = sell_one;
				this.count  = '';
				this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
			}else if(this.PriceIndex==1){
				this.price = '';
			}
			if(this.Btype===2 && this.PriceIndex==0){//当点击买入时，且为限价模式时
				this.price = buy_one;
				this.count  = '';
				this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
			}else if(this.PriceIndex==1){
				this.price = '';
			}
			this.getMarket(code);
			this.getacInfo(this.accounId);
			setTimeout(() =>{
				this.getPosition(this.accounId);
			},2000)
		},
		/*返回*/
		onBack() {
			uni.navigateBack();
		},
		/*搜索点击*/
		onSearch(){
			uni.navigateTo({url:'/pages/search/search'})
		},
		funbs(a,n,o){
			switch(n){
				case 1:
					return a+'_one_'+o;
				break;
				case 2:
					return a+'_two_'+o;
				break;
				case 3:
					return a+'_three_'+o;
				break;
				case 4:
					return a+'_four_'+o;
				break;
				case 5:
					return a+'_five_'+o;
				break;
			}
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
		/*价格模式选择点击*/
		onPriceList(index){
			this.AttrIndex = '';
			this.count  = '';
			this.amount = '--';
			this.PriceIndex = index;//0为限价，1为市价
			if(this.Btype==1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
				this.price = this.marketData.sell_one_price;
			}else if(this.Btype==1 && this.PriceIndex==1){
				// this.price = '';
				this.price = this.marketData.sell_one_price;
			}
			
			
			if(this.Btype==2 && this.PriceIndex==0){//当点击卖出时，且为限价模式时
				this.price = this.marketData.buy_one_price;
			}else if(this.Btype==2 && this.PriceIndex==1){
				this.price = '';
				// this.price =this.marketData.sell_one_price;
				
			}
		},
		/*自动数量选择*/
		onAttrList(index){
			//console.log(index,this.AttrIndex)
			if(index===this.AttrIndex){ 
				this.AttrIndex = '';
				this.count  = '';
				this.amount = '--';
				return;
			}else{
				this.AttrIndex = index;
			}
			if(this.Btype==1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
				this.count  = parseInt(this.accountInfo.avail/this.price/100/(index+1))*100;//计算可买股数
			}
			if(this.Btype==1 && this.PriceIndex==1){//当点击买入时，且为限价模式时
				this.count  = parseInt(this.accountInfo.avail/this.price/100/(index+1))*100;//计算可买股数
			}
			
			if(this.Btype==2){//当点击卖出时，且为限价模式时
				this.count  = parseInt(this.Cansell/100/(index+1))*100;//计算可卖股数
				//if(this.PriceIndex==0)this.amount = "--";//填入总价
			}
			this.amount = parseInt(this.price * this.count).toFixed(2);//填入总价
			//console.log(this.amount);
		},
		/*减号点击*/
		onReduction(modle){
			switch(modle){
				case 'price':
					var price = (parseFloat(this.price) - 0.01).toFixed(3);
					var dprice= (parseFloat(this.marketData.drop_price)).toFixed(3);
					if(price<dprice)return;//判断计算后的价格是否小于等于跌停价
					if(this.count <= 0)this.count = 100;
					var amount = parseFloat(price) * parseFloat(this.count);//计算总价
					this.price  = price;
					this.amount = amount.toFixed(2);//填入总价
					if(price <= 0){
						this.price  = 0;
						this.amount = 0;
					}
				break;
				case 'count':
					if(!this.count)this.count = 0;
					this.count = parseFloat(this.count) - 100;
					var amount = parseFloat(this.price) * parseFloat(this.count);//计算总价
					this.amount = amount.toFixed(2);//填入总价
					if(this.count < 0){
						this.count  = 0;
						this.amount = 0;
						return;
					}
				break;
			}
		},
		/*加号点击*/
		onIncrease(modle){
			switch(modle){
				case 'price':
					var price = (parseFloat(this.price) + 0.01).toFixed(3);
					var vprice= (parseFloat(this.marketData.harden_price)).toFixed(3);
					if(price>vprice)return;//判断计算后的价格是否大于涨停价
					if(this.count <= 0)this.count = 100;
					var amount = parseFloat(price) * parseFloat(this.count);//计算总价
					this.price  = price;
					this.amount = amount.toFixed(2);//填入总价
				break;
				case 'count':
					if(!this.count)this.count = 0;
					this.count = parseFloat(this.count) + 100;
					var amount = parseFloat(this.price) * parseFloat(this.count);//计算总价
					this.amount = amount.toFixed(2);//填入总价
				break;
			}
		},
		/*价格输入框变动函数*/
		onInputPrice(e){
			console.log(this.price,'eee')
			
			// var price = parseFloat(e.target.value);
			var price = this.price;
			if(price < 0)this.price = 0;
			var amount = parseFloat(price) * parseFloat(this.count);//计算总价
			if(amount <= this.accountInfo.avail){//如果总价小于余额
				if(price > 0)this.price  = price;
				if(amount> 0)this.amount = amount;//填入总价
			}else{
				this.amount = '--';//填入总价
			}
		},
		/*数量输入框变动函数*/
		onInputCount(e){
			var count = parseInt(e.target.value/100)*100;
			if(count < 0)this.count = 0;
			var amount = parseFloat(this.price) * parseFloat(count);//计算总价
			if(amount <= this.accountInfo.avail){//如果总价小于余额
				if(count > 0)this.count  = count;
				if(amount> 0)this.amount = amount;//填入总价
				if(count <= 0)this.amount = '--';
			}else{
				this.amount = '--';//填入总价
			}
		},
		/*确认点击*/
		onConfirm(type){
			/*var dprice= (parseFloat(this.marketData.drop_price)).toFixed(3);
			if(this.PriceIndex==0&&this.price<dprice){//判断计算后的价格是否小于等于跌停价
				uni.showToast({title:"不能小于跌停价!",icon:"none"});
				return;
			}
			var hprice= (parseFloat(this.marketData.harden_price)).toFixed(3);
			if(this.PriceIndex==0&&this.price>hprice){//判断计算后的价格是否大于涨停价
				uni.showToast({title:"不能大于涨停价!",icon:"none"});
				return;
			}*/
			if(this.PriceIndex==0&&!this.price){
				uni.showToast({title:"请输入价格!",icon:"none"});
				return;
			}
			if(!this.count){
				uni.showToast({title:"请输入数量!",icon:"none"});
				return;
			}
			if(!this.accounId){
				uni.showToast({title:"请选择交易账户!",icon:"none"});
				return;
			}
			if(type==1){
				var title = '买入';
				var fun   = 'buy';
			}
			if(type==2){
				var title = '卖出';
				var fun   = 'sell';
			}
			this.$refs['DialogBox'].confirm({
				title: title+'提示',
				content: '确定要'+title+this.marketData.name+'股票吗?',
				DialogType: 'inquiry',
				animation: 0
			}).then(()=>{
				uni.showLoading({'title':"交易申请中"});
				uni.request({
					url: this.apiServer+'/market/trade/'+fun,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 10000,
					data:{
						token: this.token,
						id   : this.accounId,
						model: this.PriceIndex+1,//原因是选中项是0开始计算的，二后端是从1开始计算的
						code : this.marketData.code,
						price: this.price,
						count: this.count,
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({title:res.data.message,icon:"none"});
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			})
		},
	}
}

</script>
<style scoped lang="scss">
	@import 'FlashSale.scss';
	
	// lz
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
// 列表
.position .list{
	height: auto;
	min-height: 80rpx;
}
.position .list:last-child{
	border-bottom:none;
}
.ScOSY {
	    display: flex;
	    background-color: rgb(255, 255, 255);
	    padding: 10px 15px;
	    border-top: 1px solid rgb(242, 242, 242);
	}
	.icUOfo {
	    width: 73%;
	    display: flex;
		justify-content: space-between;
	}
	.geobGM {
	    display: flex;
	    color: rgb(255, 74, 7);
	    border: 1px solid rgb(255, 74, 7);
	    -webkit-box-align: center;
	    align-items: center;
	    border-radius: 4px;
	    flex: 1 1 0%;
	    height: 30px;
	    line-height: 30px;
	    padding: 4px 8px;
	    white-space: nowrap;
	    overflow: hidden;
	}
	.icUOfo .stock {
	    line-height: 1;
	}
	.icUOfo .price {
	    font-size: 22px;
	    color: rgb(255, 69, 0);
	    line-height: 1.2;
	    text-align: center;
	}
	.icUOfo .range {
	    line-height: 30px;
	    text-align: center;
	}
	.icUOfo .rate {
	    line-height: 30px;
	    text-align: center;
	}
	.icUOfo .stock .name {
	    color: rgb(37, 37, 37);
	    font-size: 16px;
	}
	.icUOfo .stock .code {
	    font-size: 12px;
	    color: rgb(142, 142, 147);
	    line-height: 1.3;
	}
	.icUOfo .price {
	    font-size: 22px;
	    color: rgb(255, 69, 0);
	    width: 2rem;
	    line-height: 1.2;
	    text-align: center;
	}
	.icUOfo .range {
	    line-height: 30px;
	    width: 0.9333rem;
	    text-align: center;
	}
	.icUOfo .rate {
	    line-height: 30px;
	    text-align: center;
	}
	.geobGM {
	    display: flex;
	    color: rgb(255, 74, 7);
	    border: 1px solid rgb(255, 74, 7);
	    -webkit-box-align: center;
	    align-items: center;
	    border-radius: 4px;
	    flex: 1 1 0%;
	    height: 30px;
	    line-height: 30px;
	    padding: 4px 8px;
	    white-space: nowrap;
	    overflow: hidden;
	}
	.mt45{
		margin-top: 90rpx;
	}
</style>