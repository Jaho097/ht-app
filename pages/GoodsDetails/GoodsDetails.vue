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
			<!-- 标题 -->
			<view class="dredge-vip">
				<view class="dredge dl">
					<view class="list">
						<text class="left">成交量</text><text class="right">{{marketData.volumeU}}收</text>
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
		<!-- K线图 -->
		<view class="banner">
			<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000"
					duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
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
				<view class="cart-add" @click="$refs['GoodsAttr'].show(2)">
					<text>买入</text>
				</view>
				<view class="buy-at" @click="$refs['GoodsAttr'].show(3)">
					<text>卖出</text>
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
			Y: '',//昨天收盘价
			T: '',//今天开盘价
			uid:'',
			token:'',
			TabShow: 0,
			isMore: false,
			AttentionShow: 0,
			code: '',
			marketData: {},
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: '/static/img/goods_banner_01.webp'
				},
				{
					id: 1,
					type: 'image',
					url: '/static/img/goods_banner_02.webp'
				},
			],
			//PageScrollTop: 0,
		};
	},
	onLoad(params) {
		this.code = params.code||0;
		loginRes = this.checkLogin();
		if(!loginRes){return;}
		console.log(loginRes);
		//console.log(this.classType);
		this.uid   = loginRes[0];
		this.token = loginRes[2];
		if(this.code){
			this.getMarket(this.code);
		}
	},
	/*onPageScroll(e) {
		this.PageScrollTop = e.scrollTop;
	},*/
  methods: {
    /*获取股票信息*/
    async getMarket(code){
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
	/**
     * 返回
     */
    onBack() {
      uni.navigateBack();
    },
    /**
     * 降价通知点击
     */
    onDepreciate() {
      uni.showToast({
        title: '降价通知提醒成功',
        icon: 'success'
      })
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
	/**
	 * 评价点击
	 */
	onEvaluate(){
		uni.navigateTo({
			url: '/pages/GoodsEvaluateList/GoodsEvaluateList'
		})
	}
  }
};
</script>

<style scoped lang="scss">
@import 'GoodsDetails.scss';
</style>
