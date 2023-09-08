<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<view class="box-bg" style="padding: 0;">
			<uni-nav-bar color="#FFF" backgroundColor="#DE4A29" shadow>
				<block slot="left">
					<uni-icons type="left" color="#FFF" size="22" @click="onBack" />
					<!-- <view>
						<text class="uni-nav-bar-text">首页</text>
					</view> -->
				</block>
				<view class="lz-tabsbtn-view">
					<text class="navbar-title">{{option.name}}</text>
				</view>
				<block slot="right">
					<uni-icons custom-prefix="iconfont" type="icon-sousuo" size="25" color="#FFF" @click="onSearch()"></uni-icons>
				</block>
			</uni-nav-bar>
		</view>
		
		
		<!-- 筛选 -->
		<view class="screen-info">
			<view class="screen-list">
				<view class="list">
					<text>名称/代码</text>
				</view>
				<view class="list">
					<text>最新价</text>
				</view>
				<view class="list" @click="onNodeSort(sortType==1?2:1)">
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
		
		
		<!-- 列表 -->
		<view class="goods-data">
			<mescroll-body ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:down="downOption"
				:up="upOption"
				:top="0">
				<view class="node-list">
					<view class="list-li" v-for="(item,index) in nodeList" @click="toDeails(item.code)" :key="index">
						<view class="item">
							<view class="title list">
								<text class="two-omit">{{item.name}}</text>
								<text class="min">{{item.code}}</text>
							</view>
							<view class="price list">
								<view class="retail-price">
									<text class="max" 
									:class="{'green':item.changepercent<0}">
									{{item.trade}}
									</text>
								</view>
							</view>
							<view class="applies list">
								<view class="tag"
								:class="{'green':item.changepercent<0}">
									<text>{{item.changepercent}}</text><text>%</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<!-- tabbar -->
		<!--TabBar :tabBarShow="2"></TabBar-->
	</view>
</template>

<script>
	
	// 引入mescroll-mixins.js
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,loginRes;
	const http = new Request();
	export default {
		mixins: [MescrollMixin], // 使用mixin
		/*components:{
			TabBar,
		},*/
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {use:false},// 列表视图切换
				sortType : 0,
				option   : '',
				nodeList : '',
			}
		},
		onShow() {
			//this.nodeList = uni.getStorageSync('node'+this.option.node);
		},
		onLoad(params){
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			if(params.node){
				this.option = params;
				this.nodeList = uni.getStorageSync('node'+this.option.node);
			}
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				this.getNode(this.option.node,1,40);
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() =>{
					this.mescroll.endByPage(10, 20);
				},2000)
			},
			/**
			 * 返回点击
			 */
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
					url: '/pages/MarketDetails/MarketDetails?code='+code,
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			},
			onNodeSort(type){
				this.sortType = type;
				var nodeList = this.nodeList;
				nodeList.sort(function (a, b) {
					switch(type){
						case 1:
							return parseFloat(b.changepercent) - parseFloat(a.changepercent);//按照指定键值重新排序
							break;
						case 2:
							return parseFloat(a.changepercent) - parseFloat(b.changepercent);//按照指定键值重新排序
							break;
					}
				});
				this.nodeList = nodeList;
			},
			/*行业详情*/
			async getNode(node,page,num){
				this.sortType = 0;
				http.get('http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?&sort=symbol&asc=1', {
				    params: {page: page, num: num, node: node}, /* 会加在url上 */
				    header: {'content-type' : "application/x-www-form-urlencoded"}, 
				    dataType: 'json',
				    custom: {auth: true},
				}).then(res => {
					var nodeList = res.data;
					console.log(nodeList);
					this.nodeList = nodeList;
					uni.setStorageSync('node'+node , nodeList);
				}).catch(err => {
					uni.showToast({title:"加载失败!",icon:"none"});
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	@import  'ClassNode.scss';

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
	.navbar-title{font-size: 16px;font-weight: 600;}
	
	// 列表排版
	.goods-data .goods-list .list-li .item .title uni-text{margin-bottom: -10rpx;}
</style>
