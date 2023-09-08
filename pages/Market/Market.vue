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
							custom-style="background-color:#FFF;border-color:#FFF;color:#DE4A29;flex:1;text-align:center;border-radius:5px 0 0 5px;font-weight:600;">
						</uni-tag>
						<!-- 未激活 -->
						<uni-tag text="行情" size="normal"
							:class="{'right':classType==1}" 
							@click="onClassTab(1)"
							custom-style="background-color:#DE4A29;border-color:#FFF;color: #fff;flex:1;text-align:center;border-radius:0 5px 5px 0;">
						</uni-tag>
					</view>
				</view>
				<block slot="right">
					<uni-icons custom-prefix="iconfont" type="icon-sousuo" size="25" color="#FFF" @click="onSearch"></uni-icons>
				</block>
			</uni-nav-bar>
		</view>
		<!--view class="hot">
			<view class="list" v-for="(item,index) in HotList" :key="index">
				
			</view>
		</view-->
		<!-- 筛选 -->
		<view class="screen-info">
			<view class="screen-list">
				<view class="list">
					<text>名称/代码</text>
				</view>
				<view class="list">
					<text>最新价</text>
				</view>
				<view class="list" @click="onSort(sortType==1?2:1)">
					<text>涨跌幅</text>
					<!-- UI排序 -->
					<view v-if="sortType==1">
						<uni-icons custom-prefix="iconfont" type="icon-paixu-jiangxu" size="12" color="#d81e06"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-paixu-shengxu" size="12" color="#cecece"></uni-icons>
					</view>
					<view v-else-if="sortType==2">
						<uni-icons custom-prefix="iconfont" type="icon-paixu-jiangxu" size="12" color="#cecece"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-paixu-shengxu" size="12" color="#d81e06"></uni-icons>
					</view>
					<view v-else>
						<uni-icons custom-prefix="iconfont" type="icon-paixu-jiangxu" size="12" color="#cecece"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-paixu-shengxu" size="12" color="#cecece"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 自选列表 -->
		<view class="goods-data">
			<mescroll-body ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:down="downOption"
				:up="upOption"
				:top="0">
				<view class="goods-list">
					
					<view class="list-li" v-for="(item,index) in mySelectList" @click="toDeails(item.code)" :key="index">
						<view class="item">
							<view class="title list">
								<text class="two-omit">{{item.name}}</text>
								<text class="min">{{item.code}}</text>
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
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>		
		<!-- tabbar -->
		<TabBar :tabBarShow="1"></TabBar>
	</view>
</template>

<script>
	var _self,loginRes;
	// 引入mescroll-mixins.js
	import TabBar from '../../components/TabBar/TabBar.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{
			TabBar,
			//classType,
		},
		data() {
			return {
				//myMobile: '',
				uid:'',
				token:'',
				classType: 0,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {use: false},
				// 列表视图切换
				isList: false,
				// 筛选弹窗
				isScreen: false,
				// 筛选切换
				screenShow: 0,
				// 抽屉
				isDrawer: false,
				keyword   : '',
				HotList   : [],
				mySelectList:uni.getStorageSync('mySelectList'),
				Top10List :[],
				Bot10List :[],
				sortType  : 0,
			}
		},
		onLoad(){
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			//console.log(this.classType);
			this.uid   = loginRes[0];
			this.token = loginRes[2];
			//this.getMySelect(this.uid,this.token);//自选栏目打开自动加载数据
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/*返回首页*/
			onBackHome(){
				uni.reLaunch({url:'/pages/home/home'})
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				if(this.classType===0){
					this.getMySelect(this.uid,this.token);//自选栏目打开自动加载数据
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
				//this.classType = type;
				switch(type){
					case 0:
						wx.switchTab({
							url:'/pages/Market/Market'
						})
						break;
					case 1:
						wx.switchTab({
							url:'/pages/discover/discover'
						})
						break;
				}
				
			},
			onSort(type){
				this.sortType = type;
				var mySelectList = this.mySelectList;
				mySelectList.sort(function (a, b) {
					switch(type){
						case 1:
							return b.price_rate - a.price_rate;//按照指定键值重新排序
							break;
						case 2:
							return a.price_rate - b.price_rate;//按照指定键值重新排序
							break;
					}
				});
				//console.log(mySelectList);
				this.mySelectList = mySelectList;
			},
			async getMySelect(uid,token){
				this.sortType = 0;
				uni.request({
					url: this.apiServer+'/market/index/my_select',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						uid: uid,
						token: token
					},
					success: res => {
						//console.log(res.data);
						this.mySelectList = res.data.data;
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
			async getTop10(uid,token){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/market/index/stock_top10',
					method: 'POST',
					timeout: 5000,
					data:{
						uid: uid,
						token: token
					},
					success: res => {
						//console.log(res.data);
						this.Top10List = res.data.data;
						console.log(this.Top10List);
						
					},
					complete:function(){
					    uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"涨幅榜加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			async getBop10(uid,token){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/market/index/stock_bot10',
					method: 'POST',
					timeout: 5000,
					data:{
						uid: uid,
						token: token
					},
					success: res => {
						//console.log(res.data);
						this.Bot10List = res.data.data;
						console.log(this.Bot10List);
						
					},
					complete:function(){
					    uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			toMoreList:function(){
				uni.showLoading({'title':"跌幅榜加载更多内容..."});
				setTimeout(() =>{
					uni.hideLoading();
				},2000)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import  'Market.scss';
	
// lz
	.box-bg {
		background-color: #FFF;
		padding: 5px 0;
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
		border-radius: 5px;
		flex-wrap: nowrap;
		margin: 7px 0;
		justify-content: center;
		align-items: center;
	}
	.tabsbtn-box{width: 50%;text-align: center;display: flex;}
	// .screen-info{top: 45px;height: 68rpx;}
	// .goods-data{margin-top: 200rpx;}
</style>
