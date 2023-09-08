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
		</view>
		<!-- 价格相关 -->
		<view class="banner-title">
			<!-- 价格 -->
			<view class="price-info">
				<view class="price" :class="{'red':marketData.price_range>0}">
					<view class="price-rate">
						<text class="max">{{marketData.current_price}}</text>
					</view>
					<view class="price-rate">
						<text class="min left">{{marketData.price_range}}</text>
						<text class="min right">{{marketData.price_rate}}%</text>
					</view>
				</view>
				<view class="info">
					<view class="list">
						<view class="iconfont">
							<text class="left">今开</text>
							<text class="right" :class="{'red':marketData.open_price>=Y}">{{marketData.open_price}}</text>
						</view>
						<view class="iconfont">
							<text class="left">昨收</text>
							<text class="right">{{marketData.yesterday_price}}</text>
						</view>
					</view>
					<view class="list">
						<view class="iconfont">
							<text class="left">最高</text>
							<text class="right">{{marketData.highest}}</text>
						</view>
						<view class="iconfont">
							<text class="left">最低</text>
							<text class="right">{{marketData.lowest}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 成交量 -->
			<view class="dredge-vip">
				<view class="dredge dl">
					<view class="list">
						<text class="left">成交量</text><text class="right">{{marketData.volumeU}}手</text>
					</view>
					<view class="list">
						<text class="left">成交额</text><text class="right">{{marketData.turnoverU}}</text>
					</view>
				</view>
				<view class="dredge dm">
					<view class="list">
						<text class="left">市盈率</text><text class="right">{{marketData.pe_ratio}}7</text>
					</view>
					<view class="list">
						<text class="left">市净率</text><text class="right">{{marketData.pb_ratio}}</text>
					</view>
				</view>
				<view class="dredge dr">
					<view class="list">
						<text class="left">换手率</text><text class="right">{{marketData.turnover_rate}}%</text>
					</view>
					<view class="list">
						<text class="left">总市值</text><text class="right">{{marketData.circulation_market_value}}亿</text>
					</view>
				</view>
			</view>
		</view>
		<!-- K线图tab -->
		<view class="order-tab">
			<!--view class="tab" :class="{'action':TabShow==0}" @click="onTabShow(0)">
				<text>分时</text>
				<text class="line"></text>
			</view-->
			<view class="tab" :class="{'action':TabShow==1}" @click="onTabShow(1)">
				<text>日K</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':TabShow==2}" @click="onTabShow(2)">
				<text>周K</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':TabShow==3}" @click="onTabShow(3)">
				<text>月K</text>
				<text class="line"></text>
			</view>
		</view>
		<!--K线图-->
		<view class="qiun-columns">
			<!--view class="qiun-bg-white qiun-title-bar qiun-common-mt qiun-rows" >
				<view style="flex: 1;qiun-rows;text-align: right;">
					<button type="default" size="mini" @tap="tapButton('in')">放大</button>
					<button type="default" size="mini" style="margin-left: 20upx;" @tap="tapButton('out')">缩小</button>
				</view>
			</view-->
			<!--view class="qiun-charts" v-show="TabShow === 0">
				<canvas canvas-id="minute_k_new" id="canvasCandle" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchCandle" @touchmove="moveCandle" @touchend="touchEndCandle">
				</canvas>			
			</view-->
			<view class="qiun-charts" v-show="TabShow === 1">
				<canvas canvas-id="day_k_new" id="canvasCandle" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchCandle" @touchmove="moveCandle" @touchend="touchEndCandle">
				</canvas>			
			</view>
			<view class="qiun-charts" v-show="TabShow === 2">
				<canvas canvas-id="week_k_new" id="canvasCandle" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchCandle" @touchmove="moveCandle" @touchend="touchEndCandle">
				</canvas>			
			</view>
			<view class="qiun-charts" v-show="TabShow === 3">
				<canvas canvas-id="month_k_new" id="canvasCandle" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchCandle" @touchmove="moveCandle" @touchend="touchEndCandle">
				</canvas>			
			</view>
			<!--button class="qiun-button" @tap="changeData()">更新图表</button-->
		</view>
		<!-- 买卖档 -->
		<view class="goods-discounts">
			<view class="list">
				<view class="title left"><text>买盘档</text></view>
				<view class="title right"><text>卖盘档</text></view>
			</view>
			<view class="list">
				<view class="content left">
					<view class="dist"><text>买一</text></view>
					<view class="dist price" :class="{'red':marketData.buy_one_price>=Y}">
						<text>{{marketData.buy_one_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.buy_one_amount}}</text></view>
				</view>
				<view class="content right">
					<view class="dist left"><text>卖一</text></view>
					<view class="dist price" :class="{'red':marketData.sell_one_price>=Y}">
						<text>{{marketData.sell_one_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_one_amount}}</text></view>
				</view>
			</view>
			<view class="list">
				<view class="content left">
					<view class="dist"><text>买二</text></view>
					<view class="dist price" :class="{'red':marketData.buy_two_price>=Y}">
						<text>{{marketData.buy_two_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.buy_two_amount}}</text></view>
				</view>
				<view class="content right">
					<view class="dist left"><text>卖二</text></view>
					<view class="dist price" :class="{'red':marketData.sell_two_price>=Y}">
						<text>{{marketData.sell_two_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_two_amount}}</text></view>
				</view>
			</view>
			<view class="list">
				<view class="content left">
					<view class="dist"><text>买三</text></view>
					<view class="dist price" :class="{'red':marketData.buy_three_price>=Y}">
						<text>{{marketData.buy_three_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_three_amount}}</text></view>
				</view>
				<view class="content right">
					<view class="dist left"><text>卖三</text></view>
					<view class="dist price" :class="{'red':marketData.sell_three_price>=Y}">
						<text>{{marketData.sell_three_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_three_amount}}</text></view>
				</view>
			</view>
			<view class="list">
				<view class="content left">
					<view class="dist"><text>买四</text></view>
					<view class="dist price" :class="{'red':marketData.buy_four_price>=Y}">
						<text>{{marketData.buy_four_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.buy_four_amount}}</text></view>
				</view>
				<view class="content right">
					<view class="dist left"><text>卖四</text></view>
					<view class="dist price" :class="{'red':marketData.sell_four_price>=Y}">
						<text>{{marketData.sell_four_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_four_amount}}</text></view>
				</view>
			</view>
			<view class="list">
				<view class="content left">
					<view class="dist"><text>买五</text></view>
					<view class="dist price" :class="{'red':marketData.buy_five_price>=Y}">
						<text>{{marketData.buy_five_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.buy_five_amount}}</text></view>
				</view>
				<view class="content right">
					<view class="dist left"><text>卖五</text></view>
					<view class="dist price" :class="{'red':marketData.sell_five_price>=Y}">
						<text>{{marketData.sell_five_price}}</text>
					</view>
					<view class="dist right"><text>{{marketData.sell_five_amount}}</text></view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="page-footer">
			<view class="footer-fn">
				<view class="list" @click="onAttention">
					<text class="iconfont" :class="AttentionShow===0?'icon-guanzhu-off':'icon-guanzhu-on action'"></text>
					<text>{{ AttentionShow === 0 ? '加入自选' : '取消自选' }}</text>
				</view>
			</view>
			<view class="footer-buy">
				<view class="cart-add" @click="$refs['GoodsCoupon'].show(1,uid,token,marketData)">
					<text>买入</text>
				</view>
				<view class="buy-at" @click="$refs['GoodsCoupon'].show(2,uid,token,marketData)">
					<text>卖出</text>
				</view>
			</view>
		</view>
		<!-- 确认交易 -->
		<goods-coupon ref="GoodsCoupon"></goods-coupon>
	</view>
</template>

<script>
	import GoodsCoupon from '../../components/GoodsAttr/GoodsAttr.vue';
	//import uCharts from '@/components/u-charts/u-charts.js';
	import {isJSON} from '@/common/checker.js';
	var _self,loginRes;
	var canvaCandle=null;
	export default {
		components: {
		  GoodsCoupon,
		},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				itemCount:60,//x轴单屏数据密度
				sliderMax:50,
				Y: '',//昨天收盘价
				T: '',//今天开盘价
				uid:'',
				token:'',
				TabShow: 1,
				//isMore: false,
				AttentionShow: 0,
				klin:['minute_k_new','day_k_new','week_k_new','month_k_new'],
				code: '',
				marketData: {},
			}
		},
		onLoad(params) {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			/*股票代码传参*/
			this.code = params.code||0;
			if(this.code){
				this.getMarket(this.code);
				this.getKData(this.code,this.klin[this.TabShow]);//获取K线数据
			}
		},
		methods: {
			/*获取股票信息*/
			async getMarket(code){
				loginRes = this.checkLogin();
				if(!loginRes){return;}
				console.log(loginRes);
				this.uid   = loginRes[0];
				this.token = loginRes[2];
				uni.request({
					url: this.apiServer+'/market/index/market',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						uid: this.uid,
						code: code,
					},
					success: res => {
						if(res.data.status == 1){
							this.marketData  = res.data.data;
							this.Y = parseFloat(this.marketData.yesterday_price);//把昨天收盘价赋值给Y
							this.T = parseFloat(this.marketData.open_price);//把今天开盘价赋值给T
							this.AttentionShow = this.marketData.myselect;
							this.marketData.volumeU   = this.calculate(this.marketData.volume);
							this.marketData.turnoverU = this.calculate(this.marketData.turnover*10000);
							console.log(this.marketData);
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
			async getKData(code,klin){
				//console.log(this.apiServer+'/market/index/'+klin+'?code='+code);
				uni.request({
					url: this.apiServer+'/market/index/'+klin+'?code='+code,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: function(res) {
						let Candle={categories:[],series:[]};
						Candle.categories=Object.values(res.data.data.categories);
						Candle.series=Object.values(res.data.data.series);
						console.log(Candle);
						_self.showCandle(klin,Candle);//canvasCandle
					},
					fail: () => {
						_self.tips="网络错误!";
					},
				});
			},
			showCandle(canvasId,chartData){
				canvaCandle=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'candle',
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:8,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					enableMarkLine: true,/***需要开启标记线***/
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:true,//不绘制X轴网格线
						labelCount:4,//X轴文案数量
						//type:'grid',
						//gridType:'dash',
						itemCount:_self.itemCount,//可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow:false,//新增是否显示滚动条，默认false
						scrollAlign:'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						disabled:true,//Y轴隐藏显示
						gridType:'dash',
						splitNumber:5,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: false,
					dataPointShape: true,
					extra: {
						candle:{
							color:{
								upLine:'#f04864',
								upFill:'#f04864',
								downLine:'#2fc25b',
								downFill:'#2fc25b'
							},
							average:{
								show:true,
								name:['MA5','MA10','MA30'],
								day:[5,10,20],
								color:['#1890ff', '#2fc25b', '#facc14']
							}
						},
						tooltip:{
							bgColor:'#000000',
							bgOpacity:0.7,
							gridType:'dash',
							dashLength:5,
							gridColor:'#1890ff',
							fontColor:'#FFFFFF',
							horizentalLine:true,
							xAxisLabel:true,
							yAxisLabel:true,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						},
						markLine: {
							type: 'dash',
							dashLength: 5,
							data: [
								{
									value:2150,
									lineColor: '#f04864',
									showLabel:true
								},
								{
									value:2350,
									lineColor: '#f04864',
									showLabel:true
								},
							]
						}
					}
				});
				
			},
			touchCandle(e){
				canvaCandle.scrollStart(e);
			},
			moveCandle(e) {
				canvaCandle.scroll(e);
			},
			touchEndCandle(e) {
				canvaCandle.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaCandle.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
				//这里演示了获取点击序列的方法，如需要将数据显示到canvas外面，可用此方法。
				var xx=canvaCandle.getCurrentDataIndex(e);
				//console.log(canvaCandle.opts.series[0].data[xx]);
				//下面是计算好的MA均线集合，想要点击序列中的当前数据，需要自己遍历seriesMA
				//console.log(canvaCandle.opts.seriesMA);
			},
			tapButton(type){
				let step=5;
				if(type=='in'){
					_self.itemCount -= step;
					if(_self.itemCount<=5){
						_self.itemCount=5;
					}
				}else{
					_self.itemCount += step;
					if(_self.itemCount>=_self.sliderMax){
						_self.itemCount=_self.sliderMax;
					}
				}
				_self.zoomCandle(_self.itemCount);
			},
			zoomCandle(val) {
				canvaCandle.zoom({
					itemCount: val
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaCandle.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
					})
				}
			},
			/* 自选点击*/
			onAttention() {
				if (this.AttentionShow === 0) {
					this.AttentionShow = 1;
					uni.request({
						url: this.apiServer+'/market/index/add_my_select',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							uid: this.uid,
							token: this.token,
							name: this.marketData.name,
							code: this.marketData.code,
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
				} else {
					this.AttentionShow = 0;
					uni.request({
						url: this.apiServer+'/market/index/del_my_select',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							token: this.token,
							code: this.marketData.code,
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
					var unit =  number.toFixed(2);
					return unit;
				}
			},
			/*配资tab点击 */
			onTabShow(type){
				this.TabShow = type;
				this.getKData(this.code,this.klin[type]);//获取K线数据
			},
			onBack() {
			  uni.navigateBack();
			},
		}
	}
</script>
<style scoped lang="scss">
	@import 'Candle.scss';
</style>
