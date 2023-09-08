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
			<!--view class="grid col-4 margin-sm">
				<view class="flex text-left">
					<view class="flex-sub text-sm">
						<text class="left">今开：</text>
						<text class="right red" v-if="marketData.open_price>Y">{{marketData.open_price}}</text>
						<text class="right green" v-else-if="marketData.open_price<Y">{{marketData.open_price}}</text>
						<text class="right" v-else>{{marketData.open_price}}</text>
					</view>
				</view>
				<view class="flex text-center">
					<view class="flex-sub text-sm">
						<text class="left">昨收：</text>
						<text class="right">{{marketData.yesterday_price}}</text>
					</view>
				</view>
				<view class="flex text-center">
					<view class="flex-sub text-sm">
						<text class="left">最高：</text>
						<text class="right red">{{marketData.highest}}</text>
					</view>
				</view>
				<view class="flex text-right">
					<view class="flex-sub text-sm">
						<text class="left">最低：</text>
						<text class="right green">{{marketData.lowest}}</text>
					</view>
				</view>
			</view-->
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
						<text class="left">总市值</text><text class="right">{{marketData.total_market_value}}亿</text>
					</view>
				</view>
			</view>
		</view>
		
		<!--K线图框架开始-->
		<div class='divchart' >
			<!-- K线图tab -->
			<div class="button-sp-area">
				<button class="mini-btn" type="default" size="mini"
				:class="{'action':TabShow==1}"
				@click="ChangeMinutePeriod(1,MINUTE_PERIOD_ID.MINUTE_1DAY_ID)">分时</button>
				<!--  #ifndef  H5 -->
				<!--button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==2}"
				@click="ChangeMinutePeriod(2,MINUTE_PERIOD_ID.MINUTE_5DAY_ID)">5日</button-->
				<!--  #endif -->
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==3}"
				@click="ChangeKLinePeriod(3,KLINE_PERIOD_ID.KLINE_DAY_ID)">日线</button>
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==4}"
				@click="ChangeKLinePeriod(4,KLINE_PERIOD_ID.KLINE_WEEK_ID)">周线</button>
				<button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==5}"
				@click="ChangeKLinePeriod(5,KLINE_PERIOD_ID.KLINE_MONTH_ID)">月线</button>
				<!--  #ifdef  H5 -->
				<!--button class="mini-btn" type="default" size="mini" 
				:class="{'action':TabShow==6}"
				@click="ChangeKLinePeriod(6,KLINE_PERIOD_ID.KLINE_YEAR_ID)">年线</button-->
				<!--  #endif -->
			</div>
			<!--  #ifdef  H5 -->
			<div>
				<div class='kline' id="kline" ref='kline'  v-show="KLine.IsShow"></div>
				<div class='minute' id="minute" ref='minute'  v-show="Minute.IsShow"></div>
			</div>
			<!--  #endif -->
		
			<!--  #ifndef  H5 -->
			<view>
				<canvas id="kline2" canvas-id='kline2' class='kline2' 
				v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}"  v-show="KLine.IsShow"
				  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>  
				<canvas id="minute2" canvas-id='minute2' class='minute' 
				v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" v-show="Minute.IsShow"
				  @touchstart="MinuteTouchStart" @touchmove='MinuteTouchMove' @touchend='MinuteTouchEnd' ></canvas>
			</view>
			<!--  #endif -->
		</div>
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
		<uni-countdown :show-day="false" :hour="0" :minute="0" :second="15" :reset="true"
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
	// #ifdef H5	
	import HQChart from '@/js_sdk/jones-hqchart/umychart.uniapp.h5.js'
	// #endif
	// #ifndef H5
	import {JSCommon} from '@/js_sdk/jones-hqchart/umychart.wechat.3.0.js'
	// #endif
	import uniCountdown  from "@/components/CountDown/uni-countdown.vue"
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	const http = new Request();
function DefaultData() { }

DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type: '历史K线图', 
        
        Windows: //窗口指标
        [
            {Index:"MA",Modify: false, Change: false}, 
            {Index:"VOL",Modify: false, Change: false}
        ], 
 
        IsCorssOnlyDrawKLine:true,
        CorssCursorTouchEnd:true,
 
        Border: //边框
        {
            Left:   1,
            Right:  1, //右边间距
            Top:    25,
            Bottom: 25,
        },
		KLine:
		{
		    Right:1,                            //复权 0 不复权 1 前复权 2 后复权
		    Period:0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
		    PageSize:40,
			MaxReqeustDataCount:1000,   //数据个数
		    IsShowTooltip:false
		},
		ExtendChart:
		[
			{Name:'KLineTooltip' },	//开启手机端tooltip
		], 
		
		Frame:  //子框架设置
		[
		    {SplitCount:5,Custom: [{ Type: 0, Position: 'right'}]},
			{SplitCount:5},
			{SplitCount:3},
		],
    };
 
    return data;
}
 
DefaultData.GetMinuteOption=function()
{
    var option= 
    {
        Type:'分钟走势图',   //创建图形类型
            
        Windows: //窗口指标
        [
            
        ], 
            
        IsAutoUpdate:true,       //是自动更新数据
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,       //是否显示右键菜单
        CorssCursorTouchEnd:true,
		IsClickShowCorssCursor:true,
        MinuteLine:
        {
            IsDrawAreaPrice:false,      //是否画价格面积图
        },
 
        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,   //右边间距
            Top:20,
            Bottom:20
        },
            
        Frame:  //子框架设置
        [
            {SplitCount:5},
            {SplitCount:3},
            {SplitCount:3},
        ],
 
        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ],
    };
 
    return option;
}


//周期枚举
var KLINE_PERIOD_ID=
{
    KLINE_DAY_ID:0,
    KLINE_WEEK_ID:1,
    KLINE_MONTH_ID:2,
    KLINE_YEAR_ID:3,

    KLINE_MINUTE_ID:4,
    KLINE_5MINUTE_ID:5,
    KLINE_15MINUTE_ID:6,
    KLINE_30MINUTE_ID:7,
    KLINE_60MINUTE_ID:8
}

//周期枚举
var MINUTE_PERIOD_ID=
{
    MINUTE_ID:0,
	MINUTE_1DAY_ID:1,
    MINUTE_2DAY_ID:2,
    MINUTE_3DAY_ID:3,
    MINUTE_4DAY_ID:4,
    MINUTE_5DAY_ID:5,
}

var g_KLine={ JSChart:null };
var g_Minute={ JSChart:null };
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
			isReload: true,//刷新页面
			/*以下全部是K线图相关参数*/
			Symbol:'600776.sh',
			ChartWidth:300,
			ChartHeight:380,
			KLine:
			{
				Option:DefaultData.GetKLineOption(), 
				IsShow:true,
			},
			Minute:
			{
				
				Option:DefaultData.GetMinuteOption(),
				IsShow:false,
			},
			MINUTE_PERIOD_ID:MINUTE_PERIOD_ID,
			KLINE_PERIOD_ID:KLINE_PERIOD_ID,
		};
		
		return data;
	},
	onHide(){  //隐藏的时候 停止定时器和清空hqchart的实例
		if (g_KLine.JSChart){
			g_KLine.JSChart.StopAutoUpdate();
			g_KLine.JSChart=null;
		}
		if(g_Minute.JSChart){
			g_Minute.JSChart.StopAutoUpdate();
			g_Minute.JSChart=null;
		}
	},
	onUnload(){   //退出的时候 停止定时器和清空hqchart的实例
		if (g_KLine.JSChart){
			g_KLine.JSChart.StopAutoUpdate();
			g_KLine.JSChart=null;//如果是WS 需要关闭WS
		}
		if(g_Minute.JSChart){
			g_Minute.JSChart.StopAutoUpdate();
			g_Minute.JSChart=null;//如果是WS 需要关闭WS
		}
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
		let code = str.slice(0,1);
		let codeName = str+_self.fenxi(code);//分析彩票所属交易所
		//console.log(codeName);
		_self.Symbol = codeName;//获取彩票代码
		const res = uni.getSystemInfoSync();
		_self.ChartWidth = res.windowWidth;
		if(str){
			_self.getMarket(str);
		}
		// #ifdef H5
		g_KLine={ JSChart:null };
		g_Minute={ JSChart:null };
		// #endif
	},
	onReady(){
		//console.log("测试输出：",g_KLine.JSChart);
		this.OnSize();
		this.CreateKLineChart(); 
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
		/*分析彩票交易所*/
		fenxi(code){
			switch(code){
				case "0":
					return ".sz";
					break;
				case "1":
					return ".sz";
					break;
				case "2":
					return ".sz";
					break;
				case "3":
					return ".sz";
					break;
				case "5":
					return ".sh";
					break;
				case "6":
					return ".sh";
					break;
				case "9":
					return ".sh";
					break;
				case "4":
					return ".bj";
					break;
				case "8":
					return ".bj";
					break;
			}
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
			
		},
		/*以下全部是K线图相关函数*/
		OnSize(){
			// #ifdef H5
			this.OnSize_h5();
			// #endif
		},
		
		OnSize_h5(){
			var chartHeight = this.ChartHeight;
			var chartWidth = this.ChartWidth;
			console.log(chartWidth)
			var kline=this.$refs.kline;
			kline.style.width=chartWidth+'px';
			kline.style.height=chartHeight+'px';
			if (g_KLine.JSChart) g_KLine.JSChart.OnSize();
			
			var minute=this.$refs.minute;
			minute.style.width=chartWidth+'px';
			minute.style.height=chartHeight+'px';
			if (g_Minute.JSChart) g_Minute.JSChart.OnSize();
		},
		//创建K线图		
		CreateKLineChart_h5(){
            if (g_KLine.JSChart) return;
            this.KLine.Option.Symbol=this.Symbol;
            let chart=HQChart.JSChart.Init(this.$refs.kline);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
            chart.SetOption(this.KLine.Option);
            g_KLine.JSChart=chart;
        },
		
		CreateKLineChart_app(){
			if (this.KLine.JSChart) return;
			let element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'kline2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
			g_KLine.JSChart = JSCommon.JSChart.Init(element);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
			this.KLine.Option.Symbol=this.Symbol;
			g_KLine.JSChart.SetOption(this.KLine.Option);
		},
		
		CreateKLineChart(){
			// #ifdef H5
			this.CreateKLineChart_h5();
			// #endif
			// #ifndef H5
			this.CreateKLineChart_app();
			// #endif
		},
		
		//K线周期切换
		ChangeKLinePeriod:function(type,period){
			this.TabShow = type;
			this.Minute.IsShow=false;
			this.KLine.IsShow=true;
			if (!g_KLine.JSChart){    //不存在创建
				this.KLine.Option.Period=period;
				this.CreateKLineChart_h5();
			}else{
				g_KLine.JSChart.ChangePeriod(period);
			}
		},
		 //创建日线图
		CreateMinuteChart_h5(){
			if (g_Minute.JSChart) return;
			this.Minute.Option.Symbol=this.Symbol;
			let chart=HQChart.JSChart.Init(this.$refs.minute);
			this.Minute.Option.NetworkFilter=this.NetworkFilter;
			chart.SetOption(this.Minute.Option);
			g_Minute.JSChart=chart;
		},
		
		CreateMinuteChart_app(){
			if (g_Minute.JSChart) return;
			var element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'minute2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
			g_Minute.JSChart = JSCommon.JSChart.Init(element);
			this.Minute.Option.NetworkFilter=this.NetworkFilter;
			this.Minute.Option.Symbol=this.Symbol;
			g_Minute.JSChart.SetOption(this.Minute.Option);
		},
		
		CreateMinuteChart(){
			// #ifdef H5
			this.CreateMinuteChart_h5();
			// #endif
			// #ifndef H5
			this.CreateMinuteChart_app();
			// #endif
		},
		
		//走势图多日切换
		ChangeMinutePeriod:function(type,period){
			this.TabShow = type;
			this.Minute.IsShow=true;
			this.KLine.IsShow=false;
			if (!g_Minute.JSChart) {  //不存在创建
				this.Minute.Option.DayCount=period;
				this.CreateMinuteChart();
			}else{
				g_Minute.JSChart.ChangeDayCount(period);
			}
		},
		
		NetworkFilter:function(data, callback){
			console.log(`[HQChart:NetworkFilter] Name=${data.Name} Explain=${data.Explain}` );
		},
		
		///
		//手势事件 app/小程序才有
		//KLine事件
		KLineTouchStart: function (event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
		},
		
		KLineTouchMove: function (event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
		},
		
		KLineTouchEnd: function (event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
		},
		
		//走势图事件
		MinuteTouchStart: function (event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchStart(event);
		},
		
		MinuteTouchMove: function (event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchMove(event);
		},
		
		MinuteTouchEnd: function (event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchEnd(event);
		},
	}
}

</script>
<style scoped lang="scss">
	@import 'MarketDetails.scss';
</style>