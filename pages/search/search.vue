<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<view class="box-bg" style="padding: 0;">
			<uni-nav-bar color="#FFF" backgroundColor="#DE4A29" shadow>
				<block slot="left">
					<uni-icons type="left" color="#FFF" size="22" @click="onBack" />
					<!--<uni-icons type="left" color="#FFF" size="22" @click="onBackHome" />
					<view>
						<text class="uni-nav-bar-text">首页</text>
					</view> -->
				</block>
				<view class="lz-tabsbtn-view">
					<!-- 搜索框 -->
					<view class="tabsbtn-box" id="tabsbtn-box">
						<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
						<input type="text" v-model="keyword" :auto-focus="firstFocus" @input="onInput" placeholder="请输入股票代码 / 名称 / 简称" />
					</view>
				</view>
				<block slot="right">
					<text class="uni-nav-bar-text" @click="onCancel">取消</text>
				</block>
			</uni-nav-bar>
		</view>
		
		<!-- 搜索历史记录 -->
		<view class="search-record"  v-if="noHistory && !noSearchRecordData">
			<view class="search-title">
				<view class="title" style="font-weight: 600;">搜索历史</view>
				<!-- 清除 -->
				<view class="iconfont icon-laji" @click="onDels()">清除历史</view>
			</view>
			<view class="record-list">
				<view class="list" v-for="(item,index) in searchRecordData"
				@click="onRecord(item.code)"
				 :key="index">
					<text>{{item.code_title}}</text><text>{{item.code}}</text>
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="search-found" v-if="!noHistory" style="margin-top: 100rpx;">
			<view class="search-title">
				<view class="title" style="font-weight: 600;">搜索发现</view>
				<view class="iconfont icon-laji"></view>
			</view>
			<view class="found-list">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="left" @click="onSearch(item.code,item)">
						<text class="name">{{item.name}}</text><text class="pin">({{item.pin}})</text>
					</view>
					<view class="mid" @click="onSearch(item.code,item)">
						<text class="code">{{item.code}}</text>
					</view>
					<view class="right" @click="onAttention(item)">
						<text class="iconfont icon-guanzhu-off"></text>
						<!--text>{{ AttentionShow === 0 ? '加入自选' : '取消自选' }}</text-->
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		<!-- 大家都在搜 -->
		<view class="search-record" :style="{'margin-top': noHistory&&noSearchRecordData?'100rpx':'0'}" v-if="noHistory">
			<view class="search-title">
				<view class="title" style="font-weight: 600;">大家都在搜</view>
				<!-- 清除 -->
				<view class="iconfont icon-laji" @click="onDel()">清除历史</view>
			</view>
			<view class="record-list">
				<view class="list" v-for="(item,index) in SearchRecordArr"
				@click="onRecord(item.code)"
				 :key="index">
					<text>{{item.code_title}}</text><text>{{item.code}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				uid:'',
				token:'',
				AttentionShow: 0,
				SearchRecordArr: [],
				keyword: '',
				dataList:{},
				firstFocus: true,
				searchRecordData:[],
				noHistory:true,//默认历史搜索结果
				noSearchRecordData:true,//默认无搜索历史
			};
		},
		watch:{
			dataList: function (val) {
			  console.log(val.length);
			  if(val.length !=0 ){
				  this.noHistory = false
			  } else {
				  this.noHistory = true
			  }
			  
			},
			searchRecordData: function (val) {
			  console.log(val.length);
			  if(val.length !=0 ){
				  this.noSearchRecordData = false
			  } else {
				  this.noSearchRecordData = true
			  }
			  
			},
		},
		onLoad() {
			if(uni.getStorageSync('SearchRecordArr')){
				this.SearchRecordArr = JSON.parse(uni.getStorageSync('SearchRecordArr'));
			}else{
				this.getHistory();
			}
			if(uni.getStorageSync('searchRecordData')){
				this.searchRecordData = JSON.parse(uni.getStorageSync('searchRecordData'));
			}
		},
		methods:{
			async getHistory(){
				uni.request({
					url: this.apiServer+'/market/index/getHistory_secher',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						//console.log(res.data);
						this.SearchRecordArr = res.data.data;
						uni.setStorageSync('SearchRecordArr', JSON.stringify(this.SearchRecordArr));
						console.log(this.SearchRecordArr);
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
			/*返回首页*/
			onBackHome(){
				uni.reLaunch({url:'/pages/home/home'})
			},
			/**
			 * 返回点击
			 */
			onBack(){
				uni.navigateBack();
			},
			/*搜索框输入内容*/
			onInput(e) {
				this.keyword = e.target.value;//监听获取输入框改变值
				if(this.keyword){
					uni.request({
						url: this.apiServer+'/market/index/stock_search?key='+this.keyword,
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'GET',
						timeout: 5000,
						success: res => {
							//console.log(res.data);
							this.dataList = res.data.data;
							console.log(this.dataList);
						},
						complete:function(){
						    uni.stopPullDownRefresh();
						},
						fail: (e) => {
							uni.showToast({title:"加载失败!",icon:"none"});
							console.log(e);
						}
					});
				}else{
					this.dataList = '';
				}
			},
			/*取消*/
			onCancel(){
				this.keyword = "";
				this.dataList= "";
			},
			/**
			 * 搜索点击
			 */
			onSearch(code,item){
			
				var newArr=false;
				if(this.searchRecordData.length!=0){
					
					this.searchRecordData.map((item,index)=>{
						if(item.code==code){
							newArr=true;
						}
						
					})
					if(newArr===false){
						  var storage= JSON.parse(uni.getStorageSync('searchRecordData'))
								var newstr={
									code:item.code,
									code_title:item.name,
									pin:item.pin
								}
							 var arr=[newstr,...storage];	
							 this.searchRecordData =arr;
						uni.setStorageSync('searchRecordData', JSON.stringify(arr))
					}
				}else{
					var newstr={
						code:item.code,
						code_title:item.name,
						pin:item.pin
					}
					var arr=[newstr];
						 this.searchRecordData =arr;
					uni.setStorageSync('searchRecordData', JSON.stringify(arr))
				}
				
				uni.navigateTo({
					url: '/pages/MarketDetails/MarketDetails?code=' + encodeURIComponent(code),
				})
			},
			onDel(){
				this.SearchRecordArr = "";
				uni.removeStorageSync('SearchRecordArr');
				uni.showToast({title:"清理成功",icon: "none"});
			},
			//删除搜索发现
			onDels(){
				this.searchRecordData = "";
				uni.removeStorageSync('searchRecordData');
				uni.showToast({title:"清理成功",icon: "none"});
			},
			/**
			 * 记录点击
			 */
			onRecord(val){
				uni.navigateTo({
					//url: '/pages/GoodsDetails/Candle?code=' + encodeURIComponent(val),
					url: '/pages/MarketDetails/MarketDetails?code=' + encodeURIComponent(val),
				})
			},
			/* 自选点击*/
			onAttention(item) {
				loginRes = this.checkLogin();
				if(!loginRes){return;}
				console.log(loginRes);
				this.uid   = loginRes[0];
				this.token = loginRes[2];
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
							name: item.name,
							code: item.code,
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
							code: item.code,
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
		}
	}
</script>

<style scoped lang="scss">
	@import 'search.scss';
	
// lz
	$nav-height: 30px;
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
		flex-wrap: nowrap;
		margin: 14rpx 0;
		justify-content: center;
		align-items: center;
		
		width: 100%;
		padding: 0 10px;
		background-color: #FFF;
		border-radius: 30rpx;
	}
	.tabsbtn-box{width: 100%;text-align: center;display: flex;}
	.screen-info{top: 90rpx;}
	
	.goods-data{margin-top: 0;padding-top: 90rpx;}
	
	// 搜索输入框
	.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			// width: 500rpx;
			flex: 1;
			background-color: #f8f8f8;
			height: $nav-height;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: $nav-height;
			overflow: hidden;
		}
	
		.input-uni-icon {
			line-height: $nav-height;
		}
	
		.nav-bar-input {
			width: 100%;
			height: $nav-height;
			line-height: $nav-height;
			/* #ifdef APP-PLUS-NVUE */
			width: 100%;
			/* #endif */
			padding: 0 5px;
			font-size: 12px;
			background-color: #f8f8f8;
		}
		
		// 搜索框：输入框表单
		#tabsbtn-box uni-input{height: 30px;line-height:30px;font-size: 14px;width: 100%;}
		#tabsbtn-box input{color: #333;text-align: left;}
		
		// 清除历史icon
		.search-record .search-title .iconfont{font-size: 14px;}
</style>
