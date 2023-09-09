<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<!-- <view class="box-bg" style="padding: 0;">
			<uni-nav-bar color="#000" backgroundColor="#f4e4b7" shadow>
				<block slot="left">
					<uni-icons type="left" color="#FFF" size="22" @click="onBackHome" />
					<view>
						<text class="uni-nav-bar-text">首页</text>
					</view>
				</block>
				<view class="lz-tabsbtn-view">
					<view class="tabsbtn-box">
						<uni-tag text="自选" size="normal" :class="{'left':classType==0}" @click="onClassTab(0)"
							custom-style="background-color:#DE4A29;border-color:#FFF;color: #fff;flex:1;text-align:center;border-radius:5px 0 0 5px;">
						</uni-tag>
						<uni-tag text="行情" size="normal" :class="{'right':classType==1}" @click="onClassTab(1)"
							custom-style="background-color:#FFF;border-color:#FFF;color:#DE4A29;flex:1;text-align:center;border-radius:0 5px 5px 0;font-weight:600;">
						</uni-tag>
					</view>
				</view>
				<block slot="right">
					<uni-icons custom-prefix="iconfont" type="icon-sousuo" size="25" color="#FFF" @click="onSearch">
					</uni-icons>
				</block>
			</uni-nav-bar>
		</view> -->
		<view class="uni-margin-wrap">
			<view class="sc-fhYwyz byMhH" style="margin-bottom: 20rpx;">
				<view class="sc-jzgbtB jzFoqy " :class="{'active':current==0}" @click="changeCur(0)"><span>行情</span></view>
				<view class="sc-jzgbtB jzFoqy" :class="{'active':current==1}" @click="changeCur(1)" ><span>自选</span></view>
			</view>
			<swiper class="swiper" style="margin: 5px 24rpx 0 24rpx;" circular :indicator-dots="true" :autoplay="false">
				<swiper-item>
					<uni-grid :column="4" :show-border="false" :square="false" :highlight="true" style="display:flex;">
						<uni-grid-item v-for="(item ,index) in marketBat" v-if="index<3" :index="index" :key="index"
							style="flex:1;background-color: #FFF;">
							<view class="grid-item-box">
								<text class="text sml">{{item.name||'大盘名称'}}</text>
								<text class="text color big uni-mt-4"
									:class="{'green':item.price_range<0}">{{parseFloat(item.current_price).toFixed(2)||'0.00'}}</text>

								<!-- <text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_range||'0.00'}}</text>
								<text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_rate||'0.00'}}%</text> -->
								<view style="display: flex;color: #00aa00;justify-content: space-between;width: 100%;">
									<text class="text"
										style="flex: 1;font-size: 20rpx;text-align: left;">{{item.price_range||'0.00'}}</text>
									<text class="text"
										style="flex: 1;font-size: 20rpx;text-align: right;">{{item.price_rate||'0.00'}}%</text>
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
					<!-- <view class="swiper-item uni-bg-red">A</view> -->
				</swiper-item>
				<swiper-item>
					<uni-grid :column="4" :show-border="false" :square="false" :highlight="true" style="display:flex;">
						<uni-grid-item v-for="(item ,index) in marketBat" v-if="index>2" :index="index" :key="index"
							style="flex:1;background-color: #FFF;">
							<view class="grid-item-box">
								<text class="text sml">{{item.name||'大盘名称'}}</text>
								<text class="text color big uni-mt-4"
									:class="{'green':item.price_range<0}">{{parseFloat(item.current_price).toFixed(2)||'0.00'}}</text>

								<!-- <text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_range||'0.00'}}</text>
								<text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_rate||'0.00'}}%</text> -->
								<view style="display: flex;color: #00aa00;justify-content: space-between;width: 100%;">
									<text class="text"
										style="flex: 1;font-size: 20rpx;text-align: left;">{{item.price_range||'0.00'}}</text>
									<text class="text"
										style="flex: 1;font-size: 20rpx;text-align: right;">{{item.price_rate||'0.00'}}%</text>
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</swiper-item>
			</swiper>
		</view>

		<view class="am-card page-module-card" v-show="current==0">
			<view class="sc-laTMn blcaAD"><a class="search-bar" href="javascript:void(0);" @click="toSearch()"><svg width="1em" height="1em"
						viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink" class="antd-mobile-icon search-icon"
						style="vertical-align: -0.125em;">
						<g id="SearchOutline-SearchOutline" stroke="none" stroke-width="1" fill="none"
							fill-rule="evenodd">
							<g id="SearchOutline-编组">
								<rect id="SearchOutline-矩形" fill="#FFFFFF" opacity="0" x="0" y="0" width="48"
									height="48"></rect>
								<path
									d="M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z"
									id="SearchOutline-形状" fill="currentColor" fill-rule="nonzero"></path>
							</g>
						</g>
					</svg>输入股票名称或代码的关键字搜索</a></view>
		</view>
		<!-- 行情列表 -->
		<view class="goods-data" v-if="classType==1">

			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" :top="0">
				<!-- <uni-grid :column="4" :show-border="false" :square="false" :highlight="true" style="display:flex;">
					<uni-grid-item v-for="(item ,index) in marketBat" :index="index" :key="index"
						style="flex:1;background-color: #FFF;">
						<view class="grid-item-box">
							<text class="text sml">{{item.name||'大盘名称'}}</text>
							<text class="text color big uni-mt-4"
								:class="{'green':item.price_range<0}">{{parseFloat(item.current_price).toFixed(2)||'0.00'}}</text>
							<text class="text color mini" :class="{'green':item.price_range<0}">{{item.price_rate||'0.00'}}%</text>
							<view style="display: flex;color: #00aa00;justify-content: space-between;width: 100%;">
								<text class="text"
									style="flex: 1;font-size: 20rpx;text-align: left;">{{item.price_range||'0.00'}}</text>
								<text class="text"
									style="flex: 1;font-size: 20rpx;text-align: right;">{{item.price_rate||'0.00'}}%</text>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid> -->
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


				<view class="recommend-info" v-show="current==0">
					<view class="recommend-title">
						<view class="title">
							<text class="title-name">热门板块</text>
							<text class="more" @click="toMoreList(0)">更多</text>
						</view>
					</view>
					<view class="hot-list">
						<view class="list" v-for="(item,index) in hotIndex" :key="index"
							@click="toHyinfo(item[0],item[1])">
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
									<!-- <text class="min" v-if="item[8]">
										{{(item[8]).slice(2,8)||'000000'}}
									</text>
									<text class="min" v-else>
										<font class="on">sh</font>
										000000
									</text> -->
								</view>
								<view class="code-price">
									<view class="max">{{parseFloat(item[9]).toFixed(2)||'0.00'}}%</view>
									<view class="min">{{parseFloat(item[10]).toFixed(2)||'0.00'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="goods-list" v-show="current==0">
					<!-- 分类列表 -->
					<view class="classify-list">
						<view class="list" v-for="(item,index) in classList" :class="{'action':classifyShow==index}"
							:key="index" @click="onClassList(item,index)">
							<text>{{item.name}}</text>
							<text class="line" v-show="classifyShow==index"></text>
						</view>
					</view>
					<view class="" style="display: flex;justify	-content: space-around;padding-bottom: 20rpx;">
						<view class="iMmIqG" style="flex:1;text-align: center;">名称/代码</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">当前价</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">涨跌幅</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">最高</view>
					</view>
					<view class="list-li" v-for="(item,index) in cListData" @click="toDeails(item.code)" :key="index">
						<view class="item">
							<view class="title list">
								<text class="two-omit" style="text-align: center;">{{item.name||'名称'}}</text>
								<text class="min" style="text-align: center;color: rgb(37, 37, 37);">{{item.code||'000000'}}</text>
							</view>
							<!-- <view class="title list">
								<text class="min" style="text-align: center;">{{item.code||'000000'}}</text>
							</view> -->
							<view class="price list">
								<view class="retail-price">
									<text class="max" style="text-align: center;" :class="{'green':item.pricechange<0}">
										{{item.trade||'0.000'}}
									</text>
								</view>
							</view>
							<view class="applies list">
								<view class="tag" style="text-align: center;" :class="{'green':item.pricechange<0}">
									<text>{{item.changepercent||'0.000'}}</text><text>%</text>
								</view>
							</view>
							<view class="applies list">
								<view class="min" style="text-align: center;color: rgb(37, 37, 37);" >
									<text>{{item.high||'0.000'}}</text><text></text>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				<view class="goods-list" v-show="current==1">
					<view class="" style="display: flex;justify	-content: space-around;padding-bottom: 20rpx;">
						<view class="iMmIqG" style="flex:1;text-align: center;">名称</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">最新</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">涨幅</view>
						<view class="iMmIqG" style="flex:1;text-align: center;">涨跌</view>
					</view>
					<view class="list-li" v-for="(item,index) in mySelectList" @click="toDeails(item.code)" :key="index">
						<view class="item">
							<view class="title list">
								<text class="two-omit" style="text-align: center;">{{item.name||'名称'}}</text>
								<text class="min" style="text-align: center;color: rgb(37, 37, 37);">{{item.code||'000000'}}</text>
							</view>
							<view class="price list">
								<view class="retail-price">
									<text class="max"
									:class="{'green':item.price_range<0}">
									{{item.current_price}}
									</text>
								</view>
							</view>
							<view class="applies list">
								<view class="tag"
								:class="{'green':item.price_range<0}">
									<text>{{item.price_rate}}</text><text>%</text>
								</view>
							</view>
							<view class="applies list">
								<view class="min" style="text-align: center;color: rgb(37, 37, 37);" >
									<text>{{item.high||'0.000'}}</text><text></text>
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<uni-countdown :show-day="false" :hour="0" :minute="0" :second="30" :reset="reset" @timeup="autoRefresh();">
		</uni-countdown>
		<!-- tabbar -->
		<TabBar :tabBarShow="classType===0?1:2"></TabBar>
	</view>
</template>

<script>
	var _self, loginRes;
	// 引入mescroll-mixins.js
	import TabBar from '../../components/TabBar/TabBar.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniCountdown from "@/components/CountDown/uni-countdown.vue"
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	const http = new Request();
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			TabBar,
			uniCountdown
		},
		data() {
			return {
				uid: '',
				token: '',
				reset: true,
				classType: 1,
				classifyShow: 0,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				downOption: {}, // 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {}, // 上拉加载的配置(可选, 绝大部分情况无需配置)
				classList: [{
					id: 0,
					name: '涨幅榜',
				}, {
					id: 1,
					name: '跌幅榜',
				},{
					id: 2,
					name: '成交榜',
				}, {
					id: 3,
					name: '换手榜',
				}],
				cListData: '',
				marketBat: uni.getStorageSync('marketBat') || '',
				Top10List: uni.getStorageSync('Top10List') || '',
				Bot10List: uni.getStorageSync('Bot10List') || '',
				hotBat: uni.getStorageSync('hotBat') || '',
				hotIndex: uni.getStorageSync('hotIndex') || '',
				confData: uni.getStorageSync('confData') || '',
				current:0,
				mySelectList:[]
			}
		},
		onLoad() {
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.uid = loginRes[0];
			this.token = loginRes[2];
		},
		onReady() {
			uni.hideTabBar();
		},
		onShow() {
			this.reset = true;
			this.autoRefresh();
		},
		onHide() { //隐藏的时候 停止定时器和清空hqchart的实例
			this.reset = false;
		},
		onUnload() { //退出的时候 停止定时器和清空hqchart的实例
			this.reset = false;
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/*返回首页*/
			
			changeCur(id){
				this.current = id
			},
			toSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			onBackHome() {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			},
			autoRefresh() {
				this.market();
				this.sinahy();
				if (this.classifyShow == 0) {
					this.getTop10(this.uid, this.token); //涨幅榜前十
					this.cListData = this.Top10List;
				}
				if (this.classifyShow == 1) {
					this.getBot10(this.uid, this.token); //跌幅榜前十
					this.cListData = this.Bot10List;
				}
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				this.market();
				this.sinahy();
				if (this.classifyShow == 0) {
					this.getTop10(this.uid, this.token); //涨幅榜前十
					this.cListData = this.Top10List;
				}
				if (this.classifyShow == 1) {
					this.getBot10(this.uid, this.token); //跌幅榜前十
					this.cListData = this.Bot10List;
				}
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() => {
					this.mescroll.endByPage(10, 20);
				}, 2000)
			},
			/* 返回点击*/
			onBack() {
				//uni.reLaunch({url: '/pages/home/home'});
				uni.navigateBack();
			},
			/*搜索点击*/
			onSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			/*股票列表点击*/
			toDeails(code) {
				uni.navigateTo({
					//url: '/pages/GoodsDetails/Candle?code='+code,
					url: '/pages/MarketDetails/MarketDetails?code=' + code,
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			},
			onClassTab(type) {
				switch (type) {
					case 0:
						wx.switchTab({
							url: '/pages/Market/Market'
						})
						break;
					case 1:
						wx.switchTab({
							url: '/pages/discover/discover'
						})
						break;
				}
			},
			toMoreList(type) {
				uni.navigateTo({
					url: '/pages/ClassIfy/ClassIfy'
				})
			},
			toHyinfo(node, name) {
				uni.navigateTo({
					url: '/pages/ClassNode/ClassNode?node=' + node + '&name=' + name
				})
			},
			/*点击涨跌幅分类*/
			onClassList(item, index) {
				this.classifyShow = index;
				if (index == 0) {
					this.getTop10(this.uid, this.token); //涨幅榜前十
					this.cListData = this.Top10List;
				}
				if (index == 1) {
					this.getBot10(this.uid, this.token); //跌幅榜前十
					this.cListData = this.Bot10List;
				}
			},
			async market() { //加载上证，深成，创业 指数   +自选
				http.get(this.apiServer +
					'/market/index/stock_bat?code=sh000001,399001,399006,899050,sh000016,sh000300', {
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						dataType: 'json',
						custom: {
							auth: true
						},
					}).then(res => {
					if (res.data.status) {
						this.marketBat = res.data.data;
						uni.setStorageSync('marketBat', res.data.data);
					}
				}).catch(err => {
					console.log('加载失败', err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
				uni.request({
					url: this.apiServer+'/market/index/my_select',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						uid: this.uid,
						token: this.token
					},
					success: res => {
						//console.log(res.data);
						this.mySelectList = res.data.data;
						console.log(this.mySelectList,'this.mySelectList')
						uni.setStorageSync('mySelectList' , res.data.data);
					},
					complete:function(){
					    uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"自选加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			/*热门行业*/
			async sinahy() { //加载行业板块
				http.get(this.apiServer + '/market/index/sinahy', {
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					dataType: 'json',
					custom: {
						auth: true
					},
				}).then(res => {
					if (res.data.status) {
						var hotBat = res.data.data;
						hotBat.sort(function(a, b) {
							return parseFloat(b[5]) - parseFloat(a[5]); //按照指定键值重新排序
						});
						this.hotIndex = hotBat.slice(0, 6);
						this.hotBat = hotBat;
						uni.setStorageSync('hotIndex', hotBat.slice(0, 6));
						uni.setStorageSync('hotBat', hotBat);
					}
				}).catch(err => {
					console.log('加载失败', err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
			async getTop10(uid, token) {
				http.get(this.apiServer + '/market/index/stock_top10', {
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					dataType: 'json',
					custom: {
						auth: true
					},
				}).then(res => {
					if (res.data.status) {
						if (this.classifyShow == 0) this.cListData = res.data.data;
						this.Top10List = res.data.data;
						uni.setStorageSync('Top10List', res.data.data);
					}
				}).catch(err => {
					console.log('加载失败', err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
			async getBot10(uid, token) {
				http.get(this.apiServer + '/market/index/stock_bot10', {
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					dataType: 'json',
					custom: {
						auth: true
					},
				}).then(res => {
					if (res.data.status) {
						if (this.classifyShow == 1) this.cListData = res.data.data;
						this.Bot10List = res.data.data;
						uni.setStorageSync('Bot10List', res.data.data);
					}
				}).catch(err => {
					console.log('加载失败', err);
					//uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'discover.scss';

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
	.lz-tabsbtn-view {
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

	.tabsbtn-box {
		width: 50%;
		text-align: center;
		display: flex;
	}
	.uni-swiper-item{
		border-radius: 5px;
	}
	.screen-info {
		top: 90rpx;
	}

	.goods-data {
		margin-top: 0;
	}

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
		padding: 10rpx;
		background: #FFF;
		border-radius: 10rpx;
	}

	.grid-item-box .color {
		color: #fe3b0f;
	}

	.grid-item-box .big {
		font-size: 32rpx;
	}

	.grid-item-box .sml {
		font-size: 28rpx;
	}

	.grid-item-box .mini {
		font-size: 24rpx;
	}

	.recommend-info,
	.goods-data .goods-list {
		margin: 32rpx 24rpx;
		border-radius: 5px;
	}

	.byMhH {
		text-align: center;
		background-color: white;
		display: flex;
		flex-direction: row;
		padding: 0px 40px;

	}

	.jzFoqy {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		display: inline-flex;
		height: 100%;
		position: relative;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		cursor: pointer;
	}

	.jzFoqy {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		display: inline-flex;
		height: 100%;
		position: relative;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		cursor: pointer;
	}

	.uni-grid-wrap {
		// margin: 8px;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 168rpx;
		border-radius:5px;
	}

	.swiper-item {
		display: block;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	.jzFoqy span {
		line-height: 36px;
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		color: rgba(64, 64, 64, 0.7);
		display: inline-block;
		overflow: hidden;
		position: relative;
	}

	.zQdjm .meta {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.zQdjm {
		border-right: 1px solid rgb(235, 235, 236);
		box-sizing: border-box;
		padding: 0px 10px;
		width: 33.33%;
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
		cursor: pointer;
	}
	.page-v2-quotation .page-module-card {
	    margin: 16px 12px 0;
	    -webkit-box-shadow: 0 0 6px rgba(0,0,0,.1);
	    box-shadow: 0 0 6px rgba(0,0,0,.1);
	    min-height: unset;
	    padding-bottom: 0;
		margin-top:24rpx;
	}
	html:not([data-scale]) .am-card:not(.am-card-full) {
	    position: relative;
	    border: none;
	}
	.am-card:not(.am-card-full) {
	    border: 1px solid #ddd;
	    border-radius: 5px;
	}
	.am-card {
	    padding-bottom: 6px;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex-direction: column;
	    flex-direction: column;
	    background-color: #fff;
		margin: 0 24rpx;
		margin-top:24rpx;
	}
	.blcaAD {
	    padding: 12px;
	}
	.blcaAD .search-bar {
	    display: block;
	    position: relative;
	    height: 32px;
	    line-height: 32px;
	    border-radius: 16px;
	    background-color: rgb(242, 242, 242);
	    padding: 0px 0px 0px 26px;
	    text-align: center;
	    color: rgb(185, 184, 184);
	    font-size: 14px;
	}
	.blcaAD .search-bar .search-icon {
	    font-size: 16px;
	    position: absolute;
	    left: 10px;
	    top: 50%;
	    transform: translateY(-50%);
	    color: rgb(185, 184, 184);
	}
	a{
		text-decoration: none;
	}
	.erjuXR {
	    flex: 1 1 0%;
	    display: block;
	    padding: 10px;
	    border-right: 1px solid rgb(244, 247, 255);
	    margin-left: -1px;
	}
	.iMmIqG{
	    padding: 12px 5px;
	    border-bottom: 1px solid rgb(239, 239, 239);
	    font-size: 12px;
	    font-weight: 700;
	    color: rgb(37, 37, 37);
	}
	.jzFoqy.active span {
	    color: rgb(64, 64, 64);
		border-bottom: 2px solid red;
	}
</style>
