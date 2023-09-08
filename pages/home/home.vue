<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<view class="box-bg" style="padding-top: -120rpx;">
			<uni-nav-bar color="#FFF"  :shadow="true" :border="false">
				<!-- 页头消息 -->
				<block slot="left">
					<image style="width: 180rpx;height: 60rpx" src="/static/logo.jpg" mode=""></image>
					<!-- <uni-icons custom-prefix="iconfont" type="icon-laba" size="25" color="#FFF" @click="onMessage()"></uni-icons> -->
					<!-- <view>
						<text class="uni-nav-bar-text">首页</text>
					</view> -->
				</block>
				<view class="lz-tabsbtn-view">
					<input style="padding-left:30rpx;color: black;background-color: lightgray;border-radius: 50rpx;width: 100%;height: 60rpx;"  maxlength="26"  placeholder="搜索股票名称">
					<!-- <text class="navbar-title">{{confData.website}}</text> -->
				</view>
				<block slot="right" v-show="false" >
					<!-- <uni-icons custom-prefix="iconfont" type="icon-sousuo" size="25" color="#FFF" @click="onSearch()"></uni-icons> -->
				</block>
			</uni-nav-bar>
		</view>
		
		
		<mescroll-body ref="mescrollRef"
                   @down="downCallback"
                   @up="upCallback"
                   :down="downOption"
                   :up="upOption"
                   :top="0">
		<view class="main">
			<!-- banner -->
			<view style="width:100%">
				<swiper class="screen-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<img-cache :src="item.img_url" mode="aspectFill"></img-cache>
					</swiper-item>
				</swiper>
			</view>
			<!-- 通知 -->
			<!-- <view>
				<uni-notice-bar show-icon scrollable
					text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
			</view> -->
			
			<!-- <view class="inform">
				<view class="inform-info">
					<view class="picture">
						<uni-icons custom-prefix="iconfont" type="icon-laba" size="30" color="#d81e06"></uni-icons>
					</view>
					<view class="info">
						<swiper class="swiper" 
							:circular="true" 
							:vertical="true" 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000">
							<swiper-item v-for="(item,index) in notice" :key="index">
								<view class="swiper-item" @click="onSkip('inform',item.id,item.model)">
									<text class="one-omit">{{item.shorttitle}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view> -->
			<!-- 宫格菜单导航 -->
			<view style="position: relative;top:-100rpx" class="main-con">
			<view class="menu-nav uni-m-10 uni-mt-10 uni-pd-10" style="border-radius: 15rpx;background-color: #fff;">
				<scroll-view scroll-x @scroll="ScrollMenu" class="nav-list">
					<view class="nav" ref="nav" :style="navList.length<=10?'flex-direction:row':''">
						<view class="list" v-for="(item,index) in navList"
						@click="onSkip(item.path)"
						:key="item.id">
							<!-- <image :src="'/static/nav/peizi_ico'+(index+1)+'.png'" mode=""></image> -->
							<uni-icons custom-prefix="iconfont" :type="item.iconname" :size="item.iconsize" :color="item.iconcolor"></uni-icons>
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="indicator" v-if="navList.length>10">
					<view class="plan">
						<view class="bar" :style="'left:'+slideNum+'%'"></view>
					</view>
				</view>
			</view>
			<!-- 自定义宫格 -->
			<!-- <uni-grid :column="4" :show-border="false">
				<uni-grid-item v-for="(item,index) in navList" :key="item.id" @change="onSkip(item.path)" :index="item.id">
					<view class="grid-item-box">
						<uni-icons custom-prefix="iconfont" :type="item.iconname" size="30" :color="item.iconcolor"></uni-icons>
						<text>{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid> -->
			
			
			
			<!-- 大盘指数数据 -->
			<!--view class="flash-list" v-if="confData.app_market==1" v-for="(item,index) in marketBat" :key="index">
				<view class="flash-left">
					<view class="line"></view>
					<view class="flash-title">
						<view class="title">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="goods-list">
						<view class="list" :class="{'green':item.price_range<0}">
							<view class="big-mun">
								<text>{{parseFloat(item.current_price).toFixed(2)}}</text>
							</view>
							<view class="price">
								<text class="selling-price">{{item.price_range}}</text>
								<text class="original-price">{{item.price_rate+'%'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view-->
			<!-- 免费体验 -->
			<view class="new-product" v-if="confData.free_isopen==1">
				<view class="product-title">
					<view class="title">
						<image src="/static/hr_ico.png"></image>
						<text>免费体验</text>
					</view>
					<view class="describe">
						<text>机会不容错过</text>
					</view>
				</view>
				<view class="goods-list">
					<view class="list" @click="onActivity()">
						<view class="big-mun">
							<view class="title">
								<text>操盘体验资金</text>
								<text class="ex-money">{{confData.money}}</text>
								<text class="ex-money">元</text>
							</view>
							<view class="price">
								<text class="original-price">{{confData.deposit+'元开启丨交易'}}</text>
								<text class="original-price">{{confData.duration+'天丨完全免费'}}</text>
							</view>
						</view>
						<view class="pictrue">
							<image src="/static/img/goods_free.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view class="uni-mt-5">
				<image style="width:100%;height: 120rpx;" src="/static/new/experience.png" mode=""></image>
			</view>
			<view class="box">
				<view class="box1" @click="changeCur(1)" :class="{'actived':curActived==1}">
					<span>认证账号</span>
					<span>共赢财富</span>
				</view>
				<view class="box1" @click="changeCur(2)":class="{'actived':curActived==2}">
					<span>实盘交易</span>
					<span>实时数据</span>
				</view>
				<view class="box1" @click="changeCur(3)" :class="{'actived':curActived==3}">
					<span>配资交易</span>
					<span>15倍收益</span>
				</view>
			</view>
			
			<view class="box2" @click="changeCur(3)" :class="{'actived':curActived==3}">
				<view class="box2-1">
					{{box2Desc[curActived]['item1']}}
				</view>
				<view class="box2-2">
					{{box2Desc[curActived]['item2']}}
					<br>
					{{box2Desc[curActived]['item3']}}
				</view>
				<view class="box2-3" @click="toReg">
					立即注册账号
				</view>
			</view>
			<view class="" style="background:#fff;margin-top:20rpx;border-radius:16px">
				
			<view class="n-box">
				<view class="n-box-1" v-for="item in marketBat" >
					<view class="n-box-2">
						{{item.name}}
					</view>
					<view class="n-box-3" style="color:red" :class="{'green':item.price_range<0}">
						{{parseFloat(item.current_price).toFixed(2)||'0.00'}}
					</view>
					<view class="n-box-4" style="color:red" :class="{'green':item.price_range<0}">
						<span>{{item.price_range||'0.00'}}</span>
						<span>{{item.price_rate||'0.00'}}%</span>
					</view>
				</view>
				<view class="n-box-2" >
					
				</view>
			</view>
			<view class="box3" style="width:95%">
				<view class="box3-1" @click="changeCur1(1)" :class="{'acitved1':curActived1==1}">
					分时线
				</view>
				<view class="box3-1" @click="changeCur1(2)":class="{'acitved1':curActived1==2}">
					日k线
				</view>
				<view class="box3-1" @click="changeCur1(3)" :class="{'acitved1':curActived1==3}">
					周K线
				</view>
				<view class="box3-1" @click="changeCur1(4)" :class="{'acitved1':curActived1==4}">
					月K线
				</view>
			</view>
			<view class="chart-panel tab-panel active" v-show="curActived1==1">
				<view class="chart-wrap">
					<image  src="http://image.sinajs.cn/newchart/min/n/sh000001.gif" mode=""></image>
				</view>
			</view>
			<view class="chart-panel tab-panel" v-show="curActived1==2">
				<view class="chart-wrap">
					<image  src="http://image.sinajs.cn/newchart/daily/n/sh000001.gif" mode=""></image>
				</view>
			</view>

			<view class="chart-panel tab-panel" v-show="curActived1==3">
				<view class="chart-wrap">
					<image  src="http://image.sinajs.cn/newchart/weekly/n/sh000001.gif" mode=""></image>
				</view>
			</view>

			<view class="chart-panel tab-panel" v-show="curActived1==4">
				<view class="chart-wrap">
					<image  src="http://image.sinajs.cn/newchart/monthly/n/sh000001.gif" mode=""></image>
				</view>
			</view>
			</view>
			<!-- 为你推荐 -->
			<!-- <view class="recommend-info">
				<view class="recommend-title">
					<view class="title">
						<image src="/static/wntj_title.png" mode=""></image>
					</view>
				</view>
				<view class="goods-list">
					<view class="list" v-for="(item,index) in goodsList" @click="onSkipOrder(item.id)" :key="index">
						<view class="pictrue">
							<image :src="item.img" mode="heightFix"></image>
						</view>
						<view class="title-tag">
							<view class="tag">
								<text class="tag-ico" v-if="item.is_goods === 0">免费</text>
								<text class="tag-ico" v-if="item.is_goods === 1">推荐</text>
								<text class="max">{{item.name}}</text>
							</view>
						</view>
						<view class="price-info">
							<view class="user-price">
								<text class="min">{{item.alt}}</text>
							</view>
							<view class="vip-price">
								<image src="/static/vip_ico.png"></image>
								<text>{{item.vip_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 资讯中心 -->
	<!--		<view class="news-product" >
				<view class="product-title">
					<view class="title">
						<image src="/static/hr_ico.png"></image>
						<text class="max">资讯中心</text>
					</view>
					<view class="describe">
						<text>新鲜资讯一手掌握</text>
					</view>
				</view>
				<view class="list">
					<iframe 
					frameborder="0" 
					width="100%" 
					height="1000rpx" 
					scrolling="yes" 
					security="restricted" 
					sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
					:src="confData.news_url">
					</iframe>
				</view>
				
			</view>
		</view>-->
		</view>
		</view>
    </mescroll-body>
    <!-- 提示框 -->
    <DialogBox ref="DialogBox"></DialogBox>
		<!-- tabbar -->
	<TabBar :tabBarShow="0"></TabBar>
	</view>
</template>

<script>
	var _self,loginRes;
	// #ifdef APP-PLUS
	import APPUpdate, { getCurrentNo } from '@/js_sdk/APPUpdate/APPUpdate/index.js';
	// #endif
	import TabBar from '../../components/TabBar/TabBar.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{TabBar},
		data(){
			return{
				token:'',
				confData :uni.getStorageSync('confData'),
				notice:[],
				marketBat:[],
				mescroll: null, 
				downOption: {auto: false},// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {use: false},
				swiperList: uni.getStorageSync('swiperList'),
				slideNum: 0,
				url:'https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white',
				navList: [
					{
						id: 6,
						name: '新手指南',
						path: 'help',
						iconname: 'icon-aixin',
						iconsize:'30',
						iconcolor: '#F6B30B'
					},
					{
						id: 8,
						name: '我要推广',
						path: 'aboutus',
						iconname: 'icon-zixuan-copy',
						iconsize:'30',
						iconcolor: '#F6B30B'
					},
					{
						id: 8,
						name: '牛股诊断',
						path: 'Market',
						iconname: 'icon-zixuan-copy',
						iconsize:'30',
						iconcolor: '#F6B30B'
					},
					{
						id: 7,
						name: 'APP下载',
						path: 'mess',
						iconname: 'icon-WDzichan',
						iconsize:'30',
						iconcolor: '#51A3FF'
					},
					{
						id: 1,
						name: '行情',
						path: 'discover',
						iconname: 'icon-gupiao1',
						iconsize:'30',
						iconcolor: '#FF504B'
					},
					{
						id: 2,
						name: '持仓',
						path: 'MyOrderList',
						iconname: 'icon-jijinchicang',
						iconsize:'28',
						iconcolor: '#F7813B'
					},
					{
						id: 4,
						name: '免费体验',
						path: 'trial',
						iconname: 'icon-wode2',
						iconsize:'30',
						iconcolor: '#F7813B'
					},
					{
						id: 3,
						name: '在线客服',
						path: 'kefu',
						iconname: 'icon-wode2',
						iconsize:'30',
						iconcolor: '#51A3FF'
					},					
					{
						id: 5,
						name: '配资申请',
						path: 'peizi',
						iconname: 'icon-WDzichan',
						iconsize:'30',
						iconcolor: '#F6B30B'
					}
					// ,{
					// 	id: 9,
					// 	name: '在线客服',
					// 	path: 'kefu',
					// 	iconname: 'icon-heartPulse',
					// 	iconsize:'30',
					// 	iconcolor: '#F6B30B'
					// }
					// ,{
					// 	id: 10,
					// 	name: '更新下载',
					// 	path: 'down',
					// 	iconname: 'icon-gupiao1',
					// 	iconsize:'30',
					// 	iconcolor: '#F6B30B'
					// }
				],
				goodsList:[
					/*{
						id: 0,
						name: '免息操盘',
						alt: '短期狙击利器丨免所有费用丨盈利80%归您',
						vip_price: '点击进入',
						img: '/static/img/tuijian_01.png',
						is_goods: 0,
					},*/
					{
						id: 1,
						name: '按天操盘',
						alt: '自动延期丨按日计息丨非交易日不收费',
						vip_price: '点击进入',
						img: '/static/img/tuijian_02.png',
						is_goods: 1,
					},{
						id: 2,
						name: '按周操盘',
						alt: '自动延期丨低费率高倍率丨5个交易日',
						vip_price: '点击进入',
						img: '/static/img/tuijian_03.png',
						is_goods: 1,
					},{
						id: 3,
						name: '按月操盘',
						alt: '自动延期丨更划算丨1个自然月',
						vip_price: '点击进入',
						img: '/static/img/tuijian_04.png',
						is_goods: 1,
					}
				],
				phone    : uni.getSystemInfoSync().platform,
				pageHeight: 500,// 页面高度
				version  : 0,
				vNumber  : 0,//云端版本
				nNumber  : 0,//当前版本
				curActived  : 1,
				curActived1  : 1,
				box2Desc  : [{
					item1:'金融安全系统 一键快速认证',
					item2:'无需繁琐步骤 免费认证账号',
					item3:'行业领先技术 保障资金安全',
				},{
					item1:'实盘交易 数据实时同步',
					item2:'全量股市数据 加入自选更便捷',
					item3:'详细股票信息 数据精确放心购',
				},{
					item1:'您炒股 我出钱 小钱生大钱',
					item2:'最高15倍配资 享15倍收益',
					item3:'小本钱也可以做大做强',
				}]
				
			}
		},
		onReady() {
			uni.hideTabBar();
			setTimeout(()=>{
				this.getNotice();
			},2000)
		},
		onLoad() {			
			// loginRes = this.checkLogin();
			// if(!loginRes){return;}
			// console.log(loginRes);
			// this.token = loginRes[2];
			this.market()
			this.getSlider();
			this.confData = this.getconf();
		},
		onPageScroll(e){
			let scrollTop = e.scrollTop;
			if (scrollTop > 0){
				this.pageHeight = 210;
			} else {
				this.pageHeight = 500;
			}
		},
		onReachBottom(){
			console.log('到底了');
		},
		methods:{
			toReg(){
				uni.navigateTo({
				  url: '/pages/login/login'
				})
			},
			changeCur(idx){
				this.curActived = idx
			},
			changeCur1(idx){
				this.curActived1 = idx
			},
			/*下拉刷新的回调*/
			downCallback(mescroll){
				mescroll.resetUpScroll(); 
				setTimeout(()=>{
					mescroll.endSuccess()
				},1000)
				this.swiperList = this.getSlider();
				this.confData   = this.getconf();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() =>{
					this.mescroll.endByPage(10, 20);
				},2000)
			},
			/*菜单导航滚动*/
			ScrollMenu(e){
				let scrollLeft = e.target.scrollLeft;
				const query = uni.createSelectorQuery().in(this);
				query.select('.nav').boundingClientRect(data => {
					let wid = e.target.scrollWidth - data.width - (data.left*2+5);
					this.slideNum = (scrollLeft/wid*300) / 2;
				}).exec();
			},
			async gatUpgrade(){
				uni.showLoading({'title':"版本检查中..."});
				// #ifdef APP-PLUS
				getCurrentNo(res => {
					this.nNumber = res.versionCode;
					//this.nNumber = parseInt(res.versionName.replace(/\./g,''));
					//console.log('当前版本:',res);
				});
				// #endif
				uni.request({
					url: this.apiServer+'/apicom/index/upgrade',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						uni.hideLoading();
						if(res.data.status == 1){
							var vNumber  = res.data.data[this.phone+'_version'];
							//var vNumber = parseInt(number.replace(/\./g,''));
							console.log(this.nNumber,vNumber)
							if(this.nNumber < vNumber){
								APPUpdate(true,res.data.data);
							}else{
								uni.showToast({title:"已是最新版本!",icon:"none"});
							}
						}
					},
					fail: (e) => {
						uni.showToast({title:"连接失败!",icon:"none"});
					},
				});
			},
			async getSlider(){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/apicom/index/getSlider?equipment=2',//2是代表APP版的轮播图
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 50000,
					success: res => {
						if(res.data.status == 1){
							this.swiperList = res.data.data;
							uni.setStorageSync('swiperList' , res.data.data);
							console.log(this.swiperList);
						}else{
							uni.showToast({title:"轮播加载失败!",icon:"none"});
						}
					},
					complete:function(){
						//uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"轮播加载失败!",icon:"none"});
						console.log(e);
					},
				});
			},
			async getconf(){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/apicom/index/getconf',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 50000,
					success: res => {
						if(res.data.status == 1){
							this.confData = res.data.data; 
							uni.setStorageSync('confData' , res.data.data);
							//console.log(this.confData);
						}
					},
					complete:function(){
						//uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			async market(){//加载上证，深成，创业 指数
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/market/index/stock_bat?code=sh000001,sz399001,sz399006',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 50000,
					success: res => {
						this.marketBat = res.data.data;
						console.log(this.marketBat,'sh000001,sz399001,sh000300,sz399006');
					},
					complete:function(){ 
						//uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"大盘指数加载失败!",icon:"none"});
						console.log(e);
					},
				});
			},
			async getNotice(){
				uni.request({
					url: this.apiServer+'/apicom/column/index?id=2&page=1',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 50000,
					success: res => {
						if(res.data.status == 1){
							this.notice = res.data.data;
							//console.log(this.notice);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*扫一扫点击*/
			onCode(){
				// 只允许通过相机扫码
				uni.scanCode({
					//onlyFromCamera: true,
					success: function (res) {
						console.log('条码类型：' + res.scanType);//QR_CODE:二维码
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/register/register?id='+res.result
						})
					}
				});
			},
			onSkipOrder(type){
				uni.navigateTo({
					url: '/pages/Peizi/Peizi?type=' + type,
				})
			},
		   onMessage(){
				uni.navigateTo({url:'/pages/NotificationMessage/NotificationMessage'})
			},
				
			/**
			 * 搜索点击
			 */
			onSearch(){
				uni.navigateTo({url:'/pages/search/search'})
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onSkip(type,id,model){
				console.log(type,id,model)
				switch (type){
					case 'discover':
						uni.switchTab({
							url: '/pages/discover/discover'
						})
						break;
					case 'MyOrderList':
						uni.navigateTo({
							url: '/pages/MyOrderList/MyOrderList?type=1'
						})
						break;
					case 'Market':
						uni.switchTab({
							url: '/pages/Market/Market'
						})
						break;
					case 'my':
						uni.switchTab({
							url: '/pages/my/my'
						})
						break;
					case 'mess':
						uni.navigateTo({
							url: '/pages/Download/Download'
							//url: '/pages/Message/Message'
						})
						break;
					case 'peizi':
						uni.navigateTo({
							url: '/pages/Peizi/Peizi?type=1'
						})
						break;
					case 'trial':
							uni.navigateTo({
								url: '/pages/Peizi/Peizi?type=0'
							})
							break;
					case 'kefu':
						uni.navigateTo({
							url: '/pages/WebOnline/WebOnline'
						})
						break;
					case 'exper':
						uni.navigateTo({
							url: '/pages/Experience/Experience'
						})
						break;
					case 'menu':
						uni.navigateTo({
							url: '/pages/SearchGoodsList/SearchGoodsList'
						})
						break;
					case 'help':
						uni.navigateTo({
							url: '/pages/Help/Help?id=9&page=1'
						})
						break;
					case 'aboutus':
						uni.navigateTo({
							url: '/pages/Help/Help?id=8&page=1'
						})
						break;
					case 'inform':
						uni.navigateTo({
							url: '/pages/ArticleInfo/ArticleInfo?id='+id+'&model='+model,
						})
						break;
					case 'down':
						// #ifdef APP-PLUS
							this.gatUpgrade();// 检查APP是否有新版本
						// #endif
						// #ifdef H5
							uni.navigateTo({
								url: '/pages/Download/Download'
							})
						// #endif
						break;
				}
			},
			/*尚未完成*/
			onActivity(){
				var _self = this;
				var content = '首次注册并登录平台，支付 '+this.confData.deposit+' 元体验金，平台出资 '+this.confData.money+' 元，由您操盘，完全免费。交易 '+this.confData.duration+' 天，最后一个交易日，封盘前卖出，盈利全部归您，亏损全部由平台承担！'
				this.$refs['DialogBox'].confirm({
					title: '免费体验',
					content: content,
					DialogType: 'conText',
					animation: 0
				}).then(()=>{
					try {
						setTimeout(function(){
							console.log('测试输出：')
							//_self.applySaveSub(_self.token);
						}, 1000);
					} catch (e) {
					    uni.showToast({title:e,icon:"none"});
					}
				})
			},
			async applySaveSub(token){
				//uni.showLoading({title:"配资申请中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/handle/applySaveSub',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						type: 4,
						deposit_money: parseFloat(this.confData.deposit)+parseFloat(this.confData.money),
					},
					success: res => {
						//uni.hideLoading();
						uni.showToast({title:res.data.message,icon:"none"});
					},
					fail:function(e){
						uni.showToast({title:"申请失败!",icon:"none"});
					}
				});
			},
		}
	};
</script>

<style scoped lang="scss">
@import 'home.scss';
// lz
.menu-nav, .menu-nav .nav-list, .menu-nav .nav-list .nav{
	height: auto;
}
.menu-nav .nav-list .list{width: 25%;}
// 公告喇叭
.uniui-icon-laba{line-height: normal;}
// 宫格
.grid-item-box{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 15px 0;
	.iconfont{
		margin-bottom: 20rpx;
	}
}

// lz
	.box-bg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
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
	.main{
		position: relative;
		background-color: rgb(229, 229, 229);
		margin-top: 0 !important;
		.main-con{
			margin-left: 24rpx;
			margin-right: 24rpx;
			margin-bottom: 24rpx;
		}
	}
	.page{
		background-color: lightgray;
	}
	.box{
		display: flex;
		justify-content: space-between;
		.box1{
			cursor: pointer;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width: 230rpx;
			height: 108rpx;
			background-image: url('/static/new/button.png');
			background-size: cover;
			background-position: center center;
		}
		.actived{
			background-image: url('/static/new/button_h.png');
			background-size: cover;
			background-position: center center;
		}
	}
	.box2{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 712rpx;
		height: 290rpx;
		background-image: url('/static/new//tab-content-bg.png');
		background-size: cover;
		background-position: center center;
		margin-top: 24rpx;
		.box2-1{
			font-weight: 700;
			font-size: 32rpx;
			color: rgb(205, 168, 103);
		}
		.box2-2{
			font-weight: 400;
			font-size: 24rpx;
			color: rgb(40, 40, 40);
		}
		.box2-3{
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 700;
			font-size: 11px;
			color: rgb(255, 255, 255);
			background: linear-gradient(94.8deg, rgb(220, 190, 127) 9.85%, rgb(179, 141, 74) 95.47%);
			width: 51.43%;
			height: 34px;
			border-radius: 90px;
		}
	}
	.n-box{
		background-color: #fff;
		border-radius: 12rpx;
		margin-top: 24rpx;
		display: flex;
		justify-content: space-between;
		padding:24rpx;
		.n-box-1{
			display: flex;
			flex-direction: column;
			border: 1px  rgba(37,37,37,.1) solid;
			flex:1;
			align-items: center;
			width: 230rpx;
			justify-content: space-around;
			height: 184rpx;
		}
		.n-box-2{
			font-size: 28rpx
		}
		.n-box-3{
			font-size: 36rpx
		}
		.n-box-4{
			display: flex;
			width: 80%;
			justify-content: space-between;
			font-size: 24rpx
		}
	}
	.box3{
		background-color: rgb(220, 222, 224);
		display: flex;
		border-radius: 6px;
		margin: 12px 12px 0px;
		height: 64rpx;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		.acitved1{
			background-color: red;
			color:#fff;
		}
		.box3-1{
			cursor: pointer;
			text-align: center;
			flex:1;
			border-radius: 6px;
		}
	}
	.chart-panel{
		width: 100%;
		image{
			width: 100%;
			margin-top:15rpx;
		}
	}
</style>
