<template>
	<view class="page">
		<view class="goods-head">
			<!-- 返回 -->
			<view class="back" @click="onBack">
				<view class="back-one action">
					<text></text>
				</view>
			</view>
			<!-- 股票标题 -->
			<view class="head-tab">
				<view class="tab">
					<text class="tab-name name">{{marketData.name}}</text>
					<text class="tab-name code">{{marketData.code}}</text>
				</view>
			</view>
			<!-- 刷新 -->
			<view class="back" @click="onSearch">
				<view class="iconfont icon-fadajing action icon_16">
					<text></text>
				</view>
			</view>
		</view>
		<!-- 价格相关 -->
		<view class="banner-title">
			<!-- 价格 -->
			<view class="price-info">
				<view class="price" :class="{'red':marketData.price_range>0}">
					<view class="price-rate">
						<text class="max">{{marketData.current_price||'0.00'}}</text>
					</view>
					<view class="price-rate">
						<view class="list">
						<view class="iconfont">
							<text class="min right red" v-if="marketData.price_range>0">+{{marketData.price_range||'0.00'}}</text>
							<text class="min right green" v-else-if="marketData.open_price<0">-{{marketData.price_range||'0.00'}}</text>
							<text class="min right" v-else>{{marketData.price_range||'0.00'}}</text>
						</view>
						<view class="iconfont">
							<text class="min right red" v-if="marketData.price_range>0">+{{marketData.price_rate||'0.00'}}%</text>
							<text class="min right green" v-else-if="marketData.open_price<0">-{{marketData.price_rate||'0.00'}}%</text>
							<text class="min right" v-else>{{marketData.price_rate||'0.00'}}%</text>
						</view>
						</view>
					</view>
				</view>
				<view class="info">
					<view class="list">
						<view class="iconfont">
							<text class="left red">振幅：</text>
							<text class="right red">{{marketData.amplitude||'0.00'}}%</text>
						</view>
						<view class="iconfont">
							<text class="left">{{getDayDate()||"2021-01-01"}}</text>
							<text class="right">{{marketData.time||"09:30:00"}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 成交量 -->
			<view class="dredge-vip">
				<view class="dredge dl">
					<view class="list">
						<text class="left">今开</text>
						<text class="right red" v-if="marketData.open_price>Y">{{marketData.open_price}}</text>
						<text class="right green" v-else-if="marketData.open_price<Y">{{marketData.open_price}}</text>
						<text class="right" v-else>{{marketData.open_price}}</text>
					</view>
					<view class="list">
						<text class="left">昨收</text><text class="right">{{marketData.yesterday_price}}</text>
					</view>
					<view class="list">
						<text class="left">成交量</text><text class="right">{{calculate(marketData.volume)}}手</text>
					</view>
					<view class="list">
						<text class="left">成交额</text><text class="right">{{calculate(marketData.turnover*10000)}}</text>
					</view>
				</view>
				<view class="dredge dm">
					<view class="list">
						<text class="left">最高</text><text class="right red">{{marketData.highest}}</text>
					</view>
					<view class="list">
						<text class="left">最低</text><text class="right green">{{marketData.lowest}}</text>
					</view>
					<view class="list">
						<text class="left">市盈率</text><text class="right">{{marketData.pe_ratio}}7</text>
					</view>
					<view class="list">
						<text class="left">市净率</text><text class="right">{{marketData.pb_ratio}}</text>
					</view>
				</view>
				<view class="dredge dr">
					<view class="list">
						<text class="left">涨停</text><text class="right red">{{marketData.harden_price}}</text>
					</view>
					<view class="list">
						<text class="left">跌停</text><text class="right green">{{marketData.drop_price}}</text>
					</view>
					<view class="list">
						<text class="left">换手率</text><text class="right">{{marketData.turnover_rate}}%</text>
					</view>
					<view class="list">
						<text class="left">总市值</text><text class="right">{{marketData.circulation_market_value}}亿</text>
					</view>
				</view>
			</view>
		</view>
		
		<!--K线图框架开始-->
		<view class='divchart' >
			<!-- K线图tab -->
			<view class="button-sp-area">
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==1}"
				@click="getKlines(Symbol,'min',1)">分时</button>
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==2}"
				@click="getKlines(Symbol,'daily',2)">日线</button>
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==3}"
				@click="getKlines(Symbol,'weekly',3)">周线</button>
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==4}"
				@click="getKlines(Symbol,'monthly',4)">月线</button>
			</view>
			<view class="kLineImg"><img :src="kLineImg" mode="aspectFill"></img></view>
		</view>
		<!--K线图框架结束-->
		<!-- 买卖档 -->
		<view class="goods-discounts">
			<view class="list">
				<view class="title br-red"><text>买盘档</text></view>
				<view class="title br-green"><text>卖盘档</text></view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs radius">
					<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
						<view class="margin-xs text-df text-left">
							<text>买{{index+1}}</text>
						</view>
						<view class="margin-xs text-df text-center" 
						:class="{'red':marketData[funbs('buy',index+1,'price')]>=Y}">
							<text>{{marketData[funbs('buy',index+1,'price')]}}</text>
						</view>
						<view class="margin-xs text-df text-right">
							<text>{{marketData[funbs('buy',index+1,'amount')]}}</text>
						</view>
					</view>
				</view>
				<view class="flex-sub margin-xs radius">
					<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
						<view class="margin-xs text-df text-left">
							<text>卖{{index+1}}</text>
						</view>
						<view class="margin-xs text-df text-center" 
						:class="{'red':marketData[funbs('sell',index+1,'price')]>=Y}">
							<text>{{marketData[funbs('sell',index+1,'price')]}}</text>
						</view>
						<view class="margin-xs text-df text-right">
							<text>{{marketData[funbs('sell',index+1,'amount')]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-countdown :show-day="false" :hour="0" :minute="0" :second="30" :reset="true"
		@timeup="getMarket(code);">
		</uni-countdown>
		<!-- 底部 -->
		<view class="page-footer">
			<view class="footer-fn">
				<view class="list" @click="onAttention">
					<text class="iconfont" :class="AttentionShow===0?'icon-guanzhu-off':'icon-guanzhu-on action'"></text>
					<text>{{ AttentionShow === 0 ? '加入自选' : '取消自选' }}</text>
				</view>
			</view>
			<view class="footer-buy">
				<!--view class="cart-add" @click="$refs['GoodsCoupon'].show(1,uid,token,marketData)"-->
				<view class="cart-add" @click="onTrad(1)">
					<text>买入</text>
				</view>
				<!--view class="buy-at" @click="$refs['GoodsCoupon'].show(2,uid,token,marketData)"-->
				<view class="buy-at"  @click="onTrad(2)">
					<text>卖出</text>
				</view>
			</view>
		</view>
		<!-- 确认交易 -->
		<goods-coupon ref="GoodsCoupon"></goods-coupon>
	</view>
</template>

<script>
	import GoodsCoupon from '@/components/GoodsAttr/GoodsAttr.vue';
	
	import uniCountdown  from "@/components/CountDown/uni-countdown.vue"
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	const http = new Request();

var _self,loginRes;

export default 
{
	components: {
	  GoodsCoupon,uniCountdown
	},
	data(){
		
		let data=
		{
			Y: '',//昨天收盘价
			T: '',//今天开盘价
			uid:'',
			token:'',
			TabShow: 3,
			//isMore: false,
			AttentionShow: 0,
			klin:['minute_k_new','day_k_new','week_k_new','month_k_new'],
			code: '',
			marketData: {},
			isReload: false,//刷新页面
			/*以下全部是K线图相关参数*/
			Symbol:'600776.sh',
			kLineImg:'',
		};
		
		return data;
	},
	onHide(){  //隐藏的时候 停止定时器和清空hqchart的实例
		
	},
	onUnload(){   //退出的时候 停止定时器和清空hqchart的实例
		
	},
	onLoad(params){
		_self = this;
		loginRes = _self.checkLogin();
		if(!loginRes){return;}
		//console.log(loginRes);
		_self.uid   = loginRes[0];
		_self.token = loginRes[2];
		_self.code = params.code;
		_self.marketData = uni.getStorageSync('market-'+params.code)
		let str = params.code.toString();
		let codeName = _self.getHouse(str)+str;
		//console.log(codeName);
		_self.Symbol = codeName;//获取彩票代码
		const res = uni.getSystemInfoSync();
		_self.ChartWidth = res.windowWidth;
		if(str){
			_self.getMarket(str);
			_self.getKlines(codeName,'min',1);//默认显示日线
		}

	},
	onReady(){
		//console.log("测试输出：",g_KLine.JSChart);
		
	},
	methods: 
	{
		/*获取股票信息*/
		async getMarket(code){
			//var codeName = code >= 6 ? "sh"+code : "sz"+code;
			http.post(this.apiServer+'/market/index/market', {uid: this.uid,code: code},{
			    //params: {uid: this.uid,code: code}, // 会加在url上
			    header: {'content-type' : "application/x-www-form-urlencoded"}, 
			    dataType: 'json',
			    custom: {auth: true},
			}).then(res => {
				if(res.data.status == 1){
					this.marketData  = res.data.data;
					uni.setStorageSync('market-'+code , res.data.data);
					this.Y = parseFloat(this.marketData.yesterday_price);//把昨天收盘价赋值给Y
					this.T = parseFloat(this.marketData.open_price);//把今天开盘价赋值给T
					this.AttentionShow = this.marketData.myselect;
				}
			}).catch(err => {
				uni.showToast({title:"加载失败!",icon:"none"});
			})
		},
		async getKlines(code,type,show){
			this.TabShow = show;
			console.log(code,type,show);
			this.kLineImg  = 'https://image.sinajs.cn/newchart/'+type+'/n/'+code+'.gif';
		},
		/*识别股票所属交易所*/
		getHouse(code){
			var str  = code.toString();
			var code = str.slice(0,1);
			var codeName = code >= 6 ? "sh" : "sz";
			return codeName;
		},
		/*返回*/
		onBack() {
			uni.navigateBack();
		},
		/*搜索点击*/
		onSearch(){
			uni.navigateTo({url:'/pages/search/search'})
		},
		/*进入交易界面*/
		onTrad(type){
			uni.navigateTo({url:'/pages/FlashSale/FlashSale?code='+this.code+'&type='+type})
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
		/*获取时间*/
		getDayDate(){
			var day = new Date();
			day.setTime(day.getTime());
			var dataTime = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
			return dataTime;
		},
		/* 自选点击*/
		onAttention() {
			if(this.AttentionShow === 0) {
				this.AttentionShow = 1;
				var action = 'add_my_select';
			} else {
				this.AttentionShow = 0;
				var action = 'del_my_select';
			}
			uni.request({
				url: this.apiServer+'/market/index/'+action,
				header: {'content-type' : "application/x-www-form-urlencoded"},
				method: 'POST',
				timeout: 5000,
				data:{
					uid  : this.uid,
					token: this.token,
					name : this.marketData.name,
					code : this.marketData.code,
				},
				success: res => {
					if(res.data.status == 1){
						uni.showToast({title: res.data.message,icon: 'none'})
					}
				},
				complete:function(){
					uni.stopPullDownRefresh();
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
	@import 'MarketInfo.scss';
</style>