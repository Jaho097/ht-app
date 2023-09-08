<template>
	<view class="pageWrap" id="pageWrap">
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
				<uni-icons type="search" size="24" color="#FFF"></uni-icons>
			</view>
		</view>
		<!-- 自定义信息区域 开始-->
		<!-- 价格相关 -->
		<view class="banner-title" id="changeType" style="padding-bottom: 0;">
			<!-- lz 价格 -->
			<view class="lz-price-content border-btm uni-px-5 uni-py-5">
				<view class="price-row">
					<view class="price-col space-center">
						<text class="price-number font-lg" :class="marketData.price_range>0?'clr-red':'clr-green'">{{marketData.current_price||'0.00'}}</text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">今开</text>
						<text class="price-number clr-red" v-if="marketData.open_price>Y">{{marketData.open_price}}</text>
						<text class="price-number clr-green" v-else-if="marketData.open_price<Y">{{marketData.open_price}}</text>
						<text class="price-number clr-default" v-else>{{marketData.open_price}}</text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">最高</text>
						<text class="price-number clr-red">{{marketData.highest}}</text>
					</view>
				</view>
				<view class="price-row">
					<view class="price-col space-between">
						<text class="price-number clr-red" v-if="marketData.price_range>0">+{{marketData.price_range||'0.00'}}</text>
						<text class="price-number clr-green" v-else-if="marketData.open_price<0">-{{marketData.price_range||'0.00'}}</text>
						<text class="price-number clr-default" v-else>{{marketData.price_range||'0.00'}}</text>
						
						<text class="price-number clr-red" v-if="marketData.price_range>0">+{{marketData.price_rate||'0.00'}}%</text>
						<text class="price-number clr-green" v-else-if="marketData.open_price<0">-{{marketData.price_rate||'0.00'}}%</text>
						<text class="price-number clr-default" v-else>{{marketData.price_rate||'0.00'}}%</text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">昨收</text>
						<text class="price-number clr-black">{{marketData.yesterday_price}}</text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">最低</text>
						<text class="price-number clr-green">{{marketData.lowest}}</text>
					</view>
				</view>
			</view>
			<view class="lz-price-content border-btm uni-px-5  uni-py-5">
				<view class="price-row">
					<view class="price-col text-left">
						<text class="price-name">{{getDayDate()||"2021-01-01"}} </text>
						<text class="price-number clr-red"></text>
					</view>
					<view class="price-col space-center">
						<text class="price-name"></text>
						<text class="price-number clr-red"></text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">涨停</text>
						<text class="price-number clr-red">{{marketData.harden_price}}</text>
					</view>
				</view>
				<view class="price-row mt-1">
					<view class="price-col text-left">
						<text class="price-name">{{marketData.time||"09:30:00"}}</text>
						<text class="price-number clr-black"></text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">振幅</text>
						<text class="price-number clr-red">{{marketData.amplitude||'0.00'}}%</text>
					</view>
					<view class="price-col space-center">
						<text class="price-name">跌停</text>
						<text class="price-number clr-green">{{marketData.drop_price}}</text>
					</view>
				</view>
			</view>
			<view class="lz-price-content uni-px-5  uni-py-5">
				<view class="price-row">
					<view class="price-col text-left" style="flex: 1.4;">
						<text class="price-name">成交量</text>
						<text class="price-number clr-black">{{calculate(marketData.volume)}}手</text>
					</view>
					<view class="price-col text-left">
						<text class="price-name">市盈率</text>
						<text class="price-number clr-black">{{marketData.pe_ratio}}7</text>
					</view>
					<view class="price-col text-left">
						<text class="price-name">换手率</text>
						<text class="price-number clr-black">{{marketData.turnover_rate}}%</text>
					</view>
				</view>
				<view class="price-row mt-1">
					<view class="price-col text-left" style="flex: 1.4;">
						<text class="price-name">成交额</text>
						<text class="price-number clr-black">{{calculate(marketData.turnover*10000)}}</text>
					</view>
					<view class="price-col text-left">
						<text class="price-name">市净率</text>
						<text class="price-number clr-black">{{marketData.pb_ratio}}</text>
					</view>
					<view class="price-col text-left">
						<text class="price-name">总市值</text>
						<text class="price-number clr-black">{{marketData.total_market_value}}亿</text>
					</view>
				</view>
			</view>
			
		<!-- 临时结束 -->
		</view>
		
		<!-- 走势图、K线图 -->
		<view class="borderHor" id="borderHor"></view>		
		<!-- 自定义信息区域 结束-->
		
		<view class="uni-py-2" style="background-color: #F9F5F6;"></view>
		
		<!-- 日线、周线、月线 开始绘制-->
		<view class="klineWrap">
			<view class="periodRightWrap" id="periodRightWrap" v-show="!isShowMinuteChart">
				<view class="btnGroup periodWrap">
					<!-- 分钟 -->
					<view class="btn" :class="{active:indexPeroid !== -1}">
						<picker @change="bindPeriodChange" :value="indexPeroid" :range-key='"Name"' :range="kMPeriodAry">
							<view class="picker">{{indexPeroid == -1 ? '分钟' : kMPeriod.Name}}</view>
						</picker>
					</view>
					<!-- 日线、周线、月线、 -->
					<view class="btn" :class="{active:indexKPeriod === idx}" 
						@click="ChangekPeriod(period.ID)" 
						v-for="(period,idx) in kPeriodAry" 
						:key='period.Name'
					>
							{{period.Name}}
					</view>
				</view>
				<!-- 前复权、后复权、不复权 -->
				<view class="btnGroup rightWrap" v-show="isShowRight">
					<view class="btn active">
						<picker @change="bindRightChange" :value="indexRight" :range-key='"Name"' :range="rightAry">
							<view class="picker">{{rightAry[indexRight].Name}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<!-- 股票K线图区域 #101010 -->
			<view style='background-color: #101010;'>
				<HQChartControl ref="HQChartCtrl" DefaultChart="{Type:'KLine'}" :DefaultSymbol="Symbol">
				</HQChartControl>
			</view>
			
			<!-- K线图：MA、BOLL、MACD、KDJ、DMI、ROC -->
			<view class="btnGroup" id="klineIndexBtnGroup" v-show="!isShowMinuteChart">
				<view class="btn" 
					:class="{active:KlineIndexNumber === kIndex}" 
					v-for="(item,kIndex) in KlineIndexAry" 
					:key='kIndex' 
					@click="ChangeKlineIndex(kIndex,item)"
				>
						{{item.Name}}
				</view>
			</view>
			
		</view>
		
		<!-- lz 买盘档、卖盘档 -->
		<view class="uni-py-2" style="background-color: #F9F5F6;"></view>
		<view class="lz-deal-content">
			<view class="deal-col uni-px-5">
				<view class="deal-dl">
					<view class="deal-dt">买盘档</view>
					<view class="deal-dd" v-for="(item,index) in 5" :key="index">
						<text class="txt clr-black">买{{index+1}}</text>
						<text style="padding-left: 12%;" class="txt" :class="(marketData[funbs('buy',index+1,'price')]>=Y)?'clr-red':'clr-black'">{{marketData[funbs('buy',index+1,'price')]}}</text>
						<text class="txt clr-black text-right">{{marketData[funbs('buy',index+1,'amount')]}}</text>
					</view>
				</view>
			</view>
			<view class="deal-col uni-px-5">
				<view class="deal-dl">
					<view class="deal-dt">卖盘档</view>
					<view class="deal-dd" v-for="(item,index) in 5" :key="index">
						<text class="txt clr-black">卖{{index+1}}</text>
						<view style="padding-left: 12%;" class="txt" :class="{'clr-red':marketData[funbs('sell',index+1,'price')]>=Y}">
							<text>{{marketData[funbs('sell',index+1,'price')]}}</text>
						</view>
						<text class="txt clr-black text-right">{{marketData[funbs('sell',index+1,'amount')]}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 。 -->
		
		
		<uni-countdown 
			:show-day="false" 
			:hour="0" 
			:minute="0" 
			:second="30" 
			:reset="true" 
			@timeup="getMarket(code);">
		</uni-countdown>
		
		<!-- 底部 -->
		<!-- 加自选、卖出、买入 -->
		<view class="fixed-footer">
			<view class="add-btn" @click="onAttention">
				<text>{{ AttentionShow === 0 ? '加入自选' : '取消自选' }}</text>
			</view>
			<view class="sale-btn" @click="onTrad(2)">
				卖出
			</view>
			<view class="buy-btn" @click="onTrad(1)">
				买入
			</view>
		</view>
		
		<!-- 确认交易 -->
		<goods-coupon ref="GoodsCoupon"></goods-coupon>
	</view>	
</template>

<script>
import H5_HQChart from '@/uni_modules/jones-hqchart2/js_sdk/umychart.uniapp.h5.js'
import HQChartControl from '@/uni_modules/jones-hqchart2/js_sdk/HQChartControl.vue'
import { EastMoney } from "@/js_sdk/HQData/HQData.js"
import GoodsCoupon from '@/components/GoodsAttr/GoodsAttr.vue'
import uniCountdown  from "@/components/CountDown/uni-countdown.vue"
import Request from '@/js_sdk/luch-request/luch-request/index.js'
const http = new Request();
function DefaultData() { }

DefaultData.GetMinuteOption=function()
{
    var option=
    {
        Type:'分钟走势图',   //创建图形类型
        //Type:'分钟走势图横屏',

        Windows: //窗口指标
        [
            {Index:"MACD"}
        ], 
                
        Symbol:'AAPL.usa',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:20000,
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,      //是否显示右键菜单
        CorssCursorTouchEnd: true,       //手离开屏幕 隐藏十字光标
        IsFullDraw:true,                //不是使用缓存每次都重绘

        CorssCursorInfo:{  Left:2, Right:2 },
    
        MinuteLine:
        {
            IsDrawAreaPrice:true,      //是否画价格面积图
            IsShowAveragePrice:true,   //不显示均线
        },
    
        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,     //右边间距
            Top:25,
            Bottom:25,
            AutoRight:{ Blank:10, MinWidth:40 },
            AutoLeft:{ Blank:10, MinWidth:40 },
        },
                
        Frame:  //子框架设置
        [
            { SplitCount:5 },
            { SplitCount:3 },
            { SplitCount:3 },
        ],

        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ]
    };

    return option;
}

DefaultData.GetMinuteDayMenu=function()
{
    var data=
    [
        {Name:'1日', ID:1},
        {Name:'2日', ID:2},
        {Name:'3日', ID:3},
        {Name:'4日', ID:4},
        {Name:'5日', ID:5},
    ];

    return data;
}

DefaultData.GetKLineOption=function()
{
    var option=
    {
        Type:'历史K线图',   //创建图形类型

        Windows: //窗口指标
        [
            {Index:"MA",    },
            {Index:"VOL",    },
            {Index:"MACD",   }
        ], 
                
        Symbol:'000001.sh',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:15000,
        IsApiPeriod:true,
        IsShowRightMenu:false,      //是否显示右键菜单
        IsFullDraw:true,                //不是使用缓存每次都重绘
        CorssCursorTouchEnd:true,
        IsClickShowCorssCursor:true,

        KLine:
        {
            DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right:0,                    //复权 0 不复权 1 前复权 2 后复权
            Period:0,                   //周期 0 日线 1 周线 2 月线 3 年线 
            MaxReqeustDataCount:500,   //数据个数
            // #ifdef H5
			PageSize:60,               //一屏显示多少数据
            // #endif
			// #ifndef H5
			PageSize:35,               //一屏显示多少数据
			// #endif
			KLineDoubleClick:false,              //双击分钟走势图
            IsShowTooltip:false,                 //是否显示K线提示信息
            DrawType:0,    
            RightSpaceCount:2,       
        },

        CorssCursorInfo:{  Left:0, Right:1 },
    
        KLineTitle: //标题设置
        {
            IsShowName:true,       //不显示股票名称
            IsShowSettingInfo:true //不显示周期/复权
        },
    
        Border: //边框
        {
            Left:2,    //左边间距
            Right:20,     //右边间距
            Top:25,
            Bottom:25,
            AutoRight:{ Blank:10, MinWidth:40 },
        },
                
        Frame:  //子框架设置
        [
            { SplitCount:5, IsShowLeftText:false },
            { SplitCount:3, IsShowLeftText:false },
            { SplitCount:3, IsShowLeftText:false },
        ],

        ExtendChart:    //扩展图形
        [
            { Name:'KLineTooltip' },  //手机端tooltip
        ]
    };

    return option;
}

DefaultData.GetKLineDayPeriodMenu=function()
{
    var data=
    [
        {Name:"日K", ID: 0 },
        {Name:"周K", ID: 1 },
        {Name:"月K", ID: 2 },
    ];
    return data;
}

DefaultData.GetKLineRightMenu=function()
{
    var data=
    [
        {Name:"不复权", ID: 0 },
        {Name:"前复权", ID: 1 },
        {Name:"后复权", ID: 2 },
    ];

    return data;
}

DefaultData.GetKLineMinutePeriodMenu=function()
{
    var data=
    [
        {Name:"5分钟", ID: 5 },
        {Name:"15分钟", ID: 6 },
        {Name:"30分钟", ID: 7 },
        {Name:"60分钟", ID: 8 },
    ];
    return data;
}

DefaultData.GetKLineIndexMenu=function()
{
    var data=
    [
        {Name:'MA',     ID:"MA",    WindowIndex:0 },
        {Name:'BOLL',   ID:"BOLL",  WindowIndex:0 },
        {Name:'MACD',   ID:"MACD",  WindowIndex:1 },
        {Name:'KDJ',    ID:"KDJ",   WindowIndex:1},
        {Name:'DMI',    ID:"DMI",   WindowIndex:1},
        {Name:'ROC',    ID:"ROC",   WindowIndex:1},
		//{Name:"测试",   ID:"index_test" }
    ];

    return data;
}
var _self,loginRes;	
export default 
{
	components: { 
		HQChartControl,GoodsCoupon,uniCountdown		
	},
	
	data()
	{
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
			/*以下全部是K线图相关参数*/
			Symbol:'000001_1.sh',
			ChartWidth:350,
			ChartHeight:400,
			// KlineChartHeight:500,
			
			show: false,
			duration: 300,
			position: 'right',
			round: false,
			overlay: true,
			customStyle: '',
			overlayStyle: '',
			subPageIndex: 0,
			isShowMinuteChart: false,
			// minuteDayCountAry: DefaultData.GetMinuteDayMenu(),
			indexMinute: -1,
			kPeriodAry: DefaultData.GetKLineDayPeriodMenu(),
			indexKPeriod: -1,
			kMPeriodAry: DefaultData.GetKLineMinutePeriodMenu(),
			kMPeriod: {},
			indexPeroid: -1,
			rightAry: DefaultData.GetKLineRightMenu(),
			indexRight: 1,
			KlineIndexAry:DefaultData.GetKLineIndexMenu(),
			KlineIndexNumber: -1,
			Width: 0,
			Height: 0,
			isShowRight: true,
			
			hqchartObj: ''
		};
		
		return data;
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
	},
	onReady()
	{
		EastMoney.HQData.ChangeStyle();	//黑色风格
		EastMoney.HQData.SetMinuteChartCoordinate();
		this.CalculateChartSize( { OnFinished:(res)=>
			{
				this.$nextTick(()=>
				{
					this.CreateHQChart(); 
				});
			}
		});
		
	},
	
	onShow()
	{
		let hqchartCtrl=this.$refs.HQChartCtrl;
		if (hqchartCtrl && hqchartCtrl.GetJSChart()==null)
		{
			this.CalculateChartSize( { OnFinished:(res)=>
				{
					this.$nextTick(()=>
					{
						this.CreateHQChart(); 
					});
				}
			});
		}
	},
	
	onHide()
	{
		this.ClearHQChart();
	},
	
	onUnload()
	{
		this.ClearHQChart();
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
					return "_0.sz";
					break;
				case "1":
					return "_0.sz";
					break;
				case "2":
					return "_0.sz";
					break;
				case "3":
					return "_0.sz";
					break;
				case "5":
					return "_1.sh";
					break;
				case "6":
					return "_1.sh";
					break;
				case "9":
					return "_1.sh";
					break;
				case "4":
					return "_0.bj";
					break;
				case "8":
					return "_0.bj";
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
		CalculateChartSize(obj)
		{
			const res = uni.getSystemInfoSync();				
			var width=res.windowWidth;
			var height=res.windowHeight;
			console.log(`[APP::onShow] Width=${width}  Height=${height}`);
					
			const query = uni.createSelectorQuery().in(this);
			const p1 = new Promise(resolve => {
				query.select('#changeType').boundingClientRect(data => {
					// console.log(data)
					resolve(data)
				}).exec()
			})
			const p2 = new Promise(resolve => {
				query.select('#borderHor').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			
			const p4k = new Promise(resolve => {
				query.select('#periodRightWrap').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			const p5k = new Promise(resolve => {
				query.select('#klineIndexBtnGroup').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
					
			Promise.all([p1,p2,p4k,p5k])
			.then(([res1,res2,res4K,res5K]) => 
			{
				var tagHeight=[];
				tagHeight["p1"]=res1.height;
				tagHeight["p2"]=res2.height;
				tagHeight["p4K"]=res4K.height;
				tagHeight["p5K"]=res5K.height;
				
				if(this.isShowMinuteChart)
				{
					this.ChartWidth = width;
					//this.ChartHeight = height - tagHeight["p1"] - tagHeight["p2"] - tagHeight["p3"] - tagHeight["p4"] - tagHeight["p5"];
				}
				else
				{
					this.ChartWidth = width;
					//this.ChartHeight = height - tagHeight["p1"] - tagHeight["p2"] - tagHeight["p3"] - tagHeight["p4K"] - tagHeight["p5K"];
				}
				
				console.log(`[APP::onShow] ChartWidth=${this.ChartWidth}  ChartHeight=${this.ChartHeight}`);
				
				if (obj.OnFinished) obj.OnFinished();
			});
		},
		
		OnSize()
		{
			
		},
		
		popup() 
		{
			this.show = true
		},
		
		ChangeChartType(type) 
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			switch(type)
			{
			case 'minutetype': 
				this.isShowMinuteChart = true
				if (hqchartCtrl.IsMinuteChart()) return;
				
				break;
			case 'klinetype': 
				this.isShowMinuteChart = false
				if (hqchartCtrl.IsKLineChart()) return;
				
				break;
			}
			
			this.$nextTick(()=>
			{
				this.ClearHQChart();
				this.CalculateChartSize( { OnFinished:(res)=>
					{
						this.$nextTick(()=>
						{
							this.CreateHQChart(); 
						});
					}
				});
			});
		},
		
		ChangeMinuteDayCount(id, index) 
		{ //切分时图天数
			var dayCount=parseInt(id);
			this.ChangeMinutePeriod(dayCount)
		},
		
		
		ChangekPeriod(id) 
		{
			this.ChangeKLinePeriod(parseInt(id))
		},
		
		
		bindPeriodChange(e) 
		{
			// console.log('分钟周期：', e)
			this.indexPeroid = e.detail.value;
			this.indexKPeriod = -1;
			this.kMPeriod=this.kMPeriodAry[e.detail.value];
			var period = this.kMPeriodAry[e.detail.value].ID;
			this.ChangeKLinePeriod(period)
		},
		
		bindRightChange(e) {
			this.indexRight = e.detail.value
			const right = this.rightAry[this.indexRight].ID
			this.ChangeKLineRight(right)
		},
		
		
		ChangeKlineIndex(index, item) 
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (item.ID=="index_test") 
			{
				this.ExecuteNonUIIndex();	//计算指标
				return;
			}
			
			if (hqchartCtrl) hqchartCtrl.ChangeKLineIndex(item.WindowIndex, item.ID);
		},
		
		// ChangeMinuteIndex(index, item) 
		// {
		// 	let hqchartCtrl=this.$refs.HQChartCtrl;
		// 	if (hqchartCtrl)
		// 	{
		// 		var jsChart=hqchartCtrl.GetJSChart();
		// 		if (jsChart) jsChart.ChangeIndex(item.WindowIndex, item.ID);
		// 	}
		// },
		
		CreateHQChart()
		{
			var chartHeight=this.ChartHeight;
			console.log('图高度：',chartHeight)
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (this.isShowMinuteChart) 
			{
				hqchartCtrl.ChartType="Minute";
				hqchartCtrl.Minute.Option=DefaultData.GetMinuteOption();
			}
			else 
			{
				hqchartCtrl.ChartType="KLine";
				hqchartCtrl.KLine.Option=DefaultData.GetKLineOption();
			}
			
			hqchartCtrl.NetworkFilter=this.NetworkFilter;
			hqchartCtrl.SetSize(this.ChartWidth,chartHeight);
			hqchartCtrl.OnSize();
			hqchartCtrl.CreateHQChart();
		},
		
		ClearHQChart()
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (hqchartCtrl) hqchartCtrl.ClearChart();
		},
		
		ChangeMinutePeriod(days)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeMinutePeriod(days);
		},
		
		ChangeKLinePeriod(period)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeKLinePeriod(period);
		},
		
		ChangeKLineRight(right)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeRight(right);
		},
		
		ChangeSymbol(symbol)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			console.log('code:', symbol);
			
			this.isShowRight=EastMoney.HQData.IsEnableRight(null, symbol);
			hqchartCtrl.ChangeSymbol(symbol);
		},
		
		NetworkFilter(data, callback)
		{
			console.log('[App::NetworkFilter] data', data);
			
			switch(data.Name) 
			{
				//分时图数据对接
				case 'MinuteChartContainer::RequestMinuteData':
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case "MinuteChartContainer::RequestHistoryMinuteData":
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
	
				case 'KLineChartContainer::RequestHistoryData':                 //日线全量数据下载
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				 case 'KLineChartContainer::RequestRealtimeData':                //日线实时数据更新
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::RequestFlowCapitalData':             //流通股本
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::ReqeustHistoryMinuteData':           //分钟全量数据下载
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::RequestMinuteRealtimeData':          //分钟增量数据更新
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
					
				case "JSSymbolData::GetSymbolData":		//无图形指标计算
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				
			}   
		},
		
		
		
		/////////////////////////////////////////////////////////////////////
		// 独立指标计算,只算数据, H5才有。
		//
		//
		////////////////////////////////////////////////////////////////////
		
		ExecuteNonUIIndex()
		{
			var obj=
			{
				Name:'测试', ID:'11111', 
				Args:[ { Name:'M1', Value:5}, { Name:'M2', Value:10 }, { Name:'M3', Value:20} ],
				Script: //脚本
					'MA1:MA(CLOSE,M1);\n'+
					'MA2:MA(CLOSE,M2);\n'+
					'MA3:MA(CLOSE,M3);',
				ErrorCallback:this.ExecuteNonIndexError,
				FinishCallback:this.ExecuteNonIndexFinish,
				NetworkFilter:this.NetworkFilter
			};
			
			var indexConsole=new H5_HQChart.ScriptIndexConsole(obj);

			var stockObj=
			{
				HQDataType:0,	//K线图
				Stock: {Symbol:'600000_1.sh'},
				Request: { MaxDataCount: 500, MaxMinuteDayCount:5 },
				Period:5 , Right:1,
			};

			indexConsole.ExecuteScript(stockObj);
		},
		
		ExecuteNonIndexError(error)
		{
			console.log('[ExecuteNonIndexError] Error: ',error)
		},
		
		ExecuteNonIndexFinish(data, jsExectute)
		{
			console.log('[ExecuteNonIndexFinish] data, jsExectute ',data, jsExectute)
		},
		
	}
}
</script>
<style scoped lang="scss">
	@import 'MarketDetails.scss';
</style>
<style>
	.pageWrap{
		font: 28rpx 'Microsoft Yahei';
		color: #333;
		margin: 0;
		padding: 0;
		height: 100%;
	}
	.changeType{
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1rpx solid #ededed;
		border-bottom: 1rpx solid #ededed;
		box-sizing: border-box;
	}
	
	.borderHor{
		height: 0rpx;
		background-color: #f2f2f2;
	}
	
	.btnGroup{
		border-top: 1rpx solid #ededed;
		/*border-bottom: 1rpx solid #ededed;*/
		height: 70rpx;
		display: flex;
		box-sizing: border-box;
		background-color: #fff;
	}
	
	.btnGroup .btn {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		/*border-right: 1rpx solid #ededed;*/
	}
	
	.btnGroup .btn:last-child{
		border-right: none;
	}
	
	.btnGroup .btn.active {
		color: rgb(79, 79, 241);
		font-weight: bold;
	}
	
	.periodRightWrap{
		display: flex;
		justify-content: space-between;
		/*border-top: 1rpx solid #ededed;
		border-bottom: 1rpx solid #ededed;*/
	}
	
	.periodWrap{
		width: 85%;
		border-right: 1rpx solid #ededed;
	}
	
	.rightWrap{
		width: 25%;
		/*border-left: 1rpx solid #ededed;*/
	}
	
	.btn.active .picker {
		color: rgb(79, 79, 241);
	}
</style>
