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
					<text class="navbar-title">热门行业</text>
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
					<text>行业名称</text>
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
				<view class="list">
					<text>领涨股</text>
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
				<view class="goods-list">
					<view class="list-li" v-for="(item,index) in hotBat" :key="index" @click="toHyinfo(item[0],item[1])">
						<view class="item">
							<view class="price list">
								<view class="retail-price">
									<text class="max">{{item[1]}}</text>
								</view>
							</view>
							<view class="applies list">
								<view class="tag"
								:class="{'green':parseFloat(item[5])<0}">
									<text>{{parseFloat(item[5]).toFixed(2)}}%</text>
								</view>
							</view>
							<view class="title list">
								<text class="two-omit">{{item[12]}}</text>
								<text class="min">{{item[9]}}%</text>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>
<script>
	var _self,loginRes;
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {use:false},// 列表视图切换
				sortType : 0,
				option   : '',
				hotBat   : uni.getStorageSync('hotBat'),
				nodeList : '',
			}
		},
		onShow() {
			//this.nodeList = uni.getStorageSync('node'+this.option.node);
		},
		onLoad(){
			loginRes = this.checkLogin();
			if(!loginRes){return;}
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
				this.sinahy();
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() =>{
					this.mescroll.endByPage(10, 20);
				},2000)
			},
			/*搜索点击*/
			onSearch(){
				uni.navigateTo({url:'/pages/search/search'})
			},
			/*返回点击*/
			onBack(){
				//uni.reLaunch({url: '/pages/home/home'});
				uni.navigateBack();
			},
			toHyinfo(node,name){
				uni.navigateTo({url:'/pages/ClassNode/ClassNode?node='+node+'&name='+name})
			},
			onSort(type){
				this.sortType = type;
				var hotBat = this.hotBat;
				hotBat.sort(function (a, b) {
					switch(type){
						case 1:
							return parseFloat(b[5]) - parseFloat(a[5]);//按照指定键值重新排序
							break;
						case 2:
							return parseFloat(a[5]) - parseFloat(b[5]);//按照指定键值重新排序
							break;
					}
				});
				this.hotBat = hotBat;
			},
			/*热门行业*/
			async sinahy(){//加载上证，深成，创业 指数
				this.sortType = 0;
				uni.request({
					url: this.appStock+'/index/index/sinahy',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 50000,
					success: res => {
						if(res.data.status){
							var hotBat = res.data.data;
							hotBat.sort(function (a, b) {
							  return parseFloat(b[5]) - parseFloat(a[5]);//按照指定键值重新排序
							});
							//console.log(hotBat);
							this.hotBat = hotBat;
							uni.setStorageSync('hotBat' , hotBat);
							//console.log(this.hotBat);
						}
					},
					complete:function(){
					    //uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"热门板块加载失败!",icon:"none"});
						console.log(e);
					},
				});
			},
		}
	}
</script>
<style scoped lang="scss">
	@import  'ClassIfy.scss';

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
