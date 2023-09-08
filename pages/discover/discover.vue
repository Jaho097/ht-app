<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<view class="box-bg" style="padding: 0;">
			<uni-nav-bar color="#FFF" backgroundColor="#DE4A29" shadow>
				<block slot="left">
					<!-- <uni-icons type="left" color="#FFF" size="22" @click="onBack" /> -->
					<uni-icons type="left" color="#FFF" size="22" @click="onBackHome" />
					<view>
						<text class="uni-nav-bar-text">首页</text>
					</view>
				</block>
				<view class="lz-tabsbtn-view">
					<view class="tabsbtn-box">
						<!-- 当前激活 -->
						<uni-tag text="自选" size="normal"
							:class="{'left':classType==0}" 
							@click="onClassTab(0)"
							custom-style="background-color:#DE4A29;border-color:#FFF;color: #fff;flex:1;text-align:center;border-radius:5px 0 0 5px;">
						</uni-tag>
						<!-- 未激活 -->
						<uni-tag text="行情" size="normal"
							:class="{'right':classType==1}" 
							@click="onClassTab(1)"
							custom-style="background-color:#FFF;border-color:#FFF;color:#DE4A29;flex:1;text-align:center;border-radius:0 5px 5px 0;font-weight:600;">
						</uni-tag>
					</view>
				</view>
				<block slot="right">
					<uni-icons custom-prefix="iconfont" type="icon-sousuo" size="25" color="#FFF" @click="onSearch"></uni-icons>
				</block>
			</uni-nav-bar>
		</view>
		
		<!-- 行情列表 -->
		<view class="goods-data" v-if="classType==1">
			<mescroll-body ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:down="downOption"
				:up="upOption"
				:top="0">
				<!-- 大盘指数数据 -->
				<!-- 新版宫格 -->
				<uni-grid :column="4" :show-border="false" :square="false" :highlight="true" style="display:flex;">
					<uni-grid-item v-for="(item ,index) in marketBat" :index="index" :key="index" style="flex:1;background-color: #FFF;">
						<view class="grid-item-box">
							<text class="text sml">{{item.name||'大盘名称'}}</text>
							<text class="text color big uni-mt-4" :class="{'green':item.price_range<0}">{{parseFloat(item.current_price).toFixed(2)||'0.00'}}</text>
							
							<!-- <text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_range||'0.00'}}</text>
							<text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_rate||'0.00'}}%</text> -->
							<view style="display: flex;color: #00aa00;justify-content: space-between;width: 100%;">
								<text class="text" style="flex: 1;font-size: 20rpx;text-align: left;">{{item.price_range||'0.00'}}</text>
								<text class="text" style="flex: 1;font-size: 20rpx;text-align: right;">{{item.price_rate||'0.00'}}%</text>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
				<!-- 旧版宫格 -->
				<!-- <view class="hot flex">
					<view class="flash-list flex-sub align-center" v-for="(item,index) in marketBat" :key="index">
						<view class="flash-title">
							<view class="title">{{item.name||'大盘名称'}}</view>
						</view>
						<view class="hot-list">
							<view class="list" :class="{'green':item.price_range<0}">
								<view class="big-mun">
									<text>{{parseFloat(item.current_price).toFixed(2)||'0.00'}}</text>
								</view>
								<view class="price">
									<text class="selling-price">{{item.price_range||'0.00'}}</text>
									<text class="original-price">{{item.price_rate||'0.00'}}%</text>
								</view>
							</view>
						</view>
					</view>
				</view> -->


				<view class="recommend-info">
					<view class="recommend-title">
						<view class="title">
							<text class="title-name">热门行业</text>
							<text class="more" @click="toMoreList(0)">更多</text>
						</view>
					</view>
					<view class="hot-list">
						<view class="list" v-for="(item,index) in hotIndex" :key="index" @click="toHyinfo(item[0],item[1])">
							<view class="title">
								<text>{{item[1]||'行业名称'}}</text>
							</view>
							<view class="user-price">
								<text class="max" :class="{'green':parseFloat(item[5])<0}">
								{{parseFloat(item[5]).toFixed(2)||'0.00'}}%
								</text>
							</view>
							<view class="price-info">
								<view class="code-name">
									<text class="name">{{item[12]||'名称'}}</text>
									<text class="min" v-if="item[8]">
										<!-- <font class="on">{{(item[8]).slice(0,2)}}</font> -->
										{{(item[8]).slice(2,8)||'000000'}}
									</text>
									<text class="min" v-else>
										<font class="on">sh</font>
										000000
									</text>
								</view>
								<view class="code-price">
									<view class="max">{{parseFloat(item[9]).toFixed(2)||'0.00'}}%</view>
									<view class="min">{{parseFloat(item[10]).toFixed(2)||'0.00'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="goods-list">
					<!-- 分类列表 -->
					<view class="classify-list">
						<view class="list" v-for="(item,index) in classList"
						:class="{'action':classifyShow==index}" :key="index" @click="onClassList(item,index)">
							<text>{{item.name}}</text>
							<text class="line" v-show="classifyShow==index"></text>
						</view>
					</view>
					<view class="list-li" v-for="(item,index) in cListData" @click="toDeails(item.code)" :key="index">
						<view class="item">
							<view class="title list">
								<text class="two-omit">{{item.name||'名称'}}</text>
								<text class="min">{{item.code||'000000'}}</text>
							</view>
							<view class="price list">
								<view class="retail-price">
									<text class="max" 
									:class="{'green':item.pricechange<0}">
									{{item.trade||'0.000'}}
									</text>
								</view>
							</view>
							<view class="applies list">
								<view class="tag"
								:class="{'green':item.pricechange<0}">
									<text>{{item.changepercent||'0.000'}}</text><text>%</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<uni-countdown :show-day="false" :hour="0" :minute="0" :second="30" :reset="reset"
		@timeup="autoRefresh();">
		</uni-countdown>
		<!-- tabbar -->
		<TabBar :tabBarShow="classType===0?1:2"></TabBar>
	</view>
</template>

<script>
	var _self,loginRes;
	// 引入mescroll-mixins.js
	import TabBar from '../../components/TabBar/TabBar.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniCountdown  from "@/components/CountDown/uni-countdown.vue"
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	const http = new Request();
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{
			TabBar,
			uniCountdown
		},
		data() {
			return {
				uid:'',
				token:'',
				reset: true,
				classType: 1,
				classifyShow: 0,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				downOption: {},// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {},// 上拉加载的配置(可选, 绝大部分情况无需配置)
				classList: [{id: 0,name: '涨幅榜',},{id: 1,name: '跌幅榜',}],
				cListData: '',
				marketBat: uni.getStorageSync('marketBat')||'',
				Top10List: uni.getStorageSync('Top10List')||'',
				Bot10List: uni.getStorageSync('Bot10List')||'',
				hotBat   : uni.getStorageSync('hotBat')||'',
				hotIndex : uni.getStorageSync('hotIndex')||'',
				confData : uni.getStorageSync('confData')||'',
			}
		},
		onLoad(){
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.uid   = loginRes[0];
			this.token = loginRes[2];
		},
		onReady() {
			uni.hideTabBar();
		},
		onShow() {
			this.reset = true;
			this.autoRefresh();
		},
		onHide(){  //隐藏的时候 停止定时器和清空hqchart的实例
			this.reset = false;
		},
		onUnload(){   //退出的时候 停止定时器和清空hqchart的实例
			this.reset = false;
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/*返回首页*/
			onBackHome(){
				uni.reLaunch({url:'/pages/home/home'})
			},
			autoRefresh(){
				this.market();
				this.sinahy();
				if(this.classifyShow==0){
					this.getTop10(this.uid,this.token);//涨幅榜前十
					this.cListData = this.Top10List;
				}
				if(this.classifyShow==1){
					this.getBot10(this.uid,this.token);//跌幅榜前十
					this.cListData = this.Bot10List;
				}
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				this.market();
				this.sinahy();
				if(this.classifyShow==0){
					this.getTop10(this.uid,this.token);//涨幅榜前十
					this.cListData = this.Top10List;
				}
				if(this.classifyShow==1){
					this.getBot10(this.uid,this.token);//跌幅榜前十
					this.cListData = this.Bot10List;
				}
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() =>{
					this.mescroll.endByPage(10, 20);
				},2000)
			},
			/* 返回点击*/
			onBack(){
				//uni.reLaunch({url: '/pages/home/home'});
				uni.navigateBack();
			},
			/*搜索点击*/
			onSearch(){
				uni.navigateTo({url:'/pages/search/search'})
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
			onClassTab(type){
				switch(type){
					case 0: wx.switchTab({url:'/pages/Market/Market'}) 
					break;
					case 1: wx.switchTab({url:'/pages/discover/discover'}) 
					break;
				}
			},
			toMoreList(type){
				uni.navigateTo({url:'/pages/ClassIfy/ClassIfy'})
			},
			toHyinfo(node,name){
				uni.navigateTo({url:'/pages/ClassNode/ClassNode?node='+node+'&name='+name})
			},
			/*点击涨跌幅分类*/
			onClassList(item,index){
				this.classifyShow = index;
				if(index==0){
					this.getTop10(this.uid,this.token);//涨幅榜前十
					this.cListData = this.Top10List;
				}
				if(index==1){
					this.getBot10(this.uid,this.token);//跌幅榜前十
					this.cListData = this.Bot10List;
				}
			},
			async market(){//加载上证，深成，创业 指数
				http.get(this.apiServer+'/market/index/stock_bat?code=sh000001,sz399001,sh000300,sz399006',{
					header: {'content-type' : "application/x-www-form-urlencoded"}, 
				    dataType: 'json',
				    custom: {auth: true},
				}).then(res => {
					if(res.data.status){
						this.marketBat = res.data.data;
						uni.setStorageSync('marketBat' , res.data.data);
					}
				}).catch(err => {
					console.log('加载失败',err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
			/*热门行业*/
			async sinahy(){//加载行业板块
				http.get(this.apiServer+'/market/index/sinahy',{
					header: {'content-type' : "application/x-www-form-urlencoded"}, 
				    dataType: 'json',
				    custom: {auth: true},
				}).then(res => {
					if(res.data.status){
						var hotBat = res.data.data;
						hotBat.sort(function (a, b) {
						  return parseFloat(b[5]) - parseFloat(a[5]);//按照指定键值重新排序
						});
						this.hotIndex = hotBat.slice(0,6);
						this.hotBat   = hotBat;
						uni.setStorageSync('hotIndex' , hotBat.slice(0,6));
						uni.setStorageSync('hotBat' , hotBat);
					}
				}).catch(err => {
					console.log('加载失败',err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
			async getTop10(uid,token){
				http.get(this.apiServer+'/market/index/stock_top10',{
					header: {'content-type' : "application/x-www-form-urlencoded"}, 
				    dataType: 'json',
				    custom: {auth: true},
				}).then(res => {
					if(res.data.status){
						if(this.classifyShow==0)this.cListData = res.data.data;
						this.Top10List = res.data.data;
						uni.setStorageSync('Top10List' , res.data.data);
					}
				}).catch(err => {
					console.log('加载失败',err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
			async getBot10(uid,token){
				http.get(this.apiServer+'/market/index/stock_bot10',{
					header: {'content-type' : "application/x-www-form-urlencoded"}, 
				    dataType: 'json',
				    custom: {auth: true},
				}).then(res => {
					if(res.data.status){
						if(this.classifyShow==1)this.cListData = res.data.data;
						this.Bot10List = res.data.data;
						uni.setStorageSync('Bot10List' , res.data.data);
					}
				}).catch(err => {
					console.log('加载失败',err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import  'discover.scss';
	
// lz
	.box-bg {
		background-color: #FFF;
		padding: 10rpx 0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		width: 100%;
	}
	// 自选、行情 tabs
	.lz-tabsbtn-view{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// width: 500rpx;
		flex: 1;
		border-radius: 10rpx;
		flex-wrap: nowrap;
		margin: 14rpx 0;
		justify-content: center;
		align-items: center;
	}
	.tabsbtn-box{width: 50%;text-align: center;display: flex;}
	.screen-info{top: 90rpx;}
	
	.goods-data{margin-top: 0;padding-top: 90rpx;}

	// 宫格
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		background: #FFF;
		border-radius: 10rpx;
	}
	.grid-item-box .color{
		color: #fe3b0f;
	}
	
	.grid-item-box .big{font-size: 32rpx;}
	.grid-item-box .sml{font-size: 28rpx;}
	.grid-item-box .mini{font-size: 24rpx;}
	
.recommend-info, .goods-data .goods-list{
	margin: 20rpx 0;
	border-radius: 0;
}
</style>
