<template>
	<view class="page">
		<!-- 搜索 -->
		<!--自选/行情切换-->
		<!-- 自定义插槽 -->
		<!-- 搜索历史记录 -->
		<!-- <form class="am-search am-search-start" action="#">
			<view class="am-search-input">
				<view class="am-search-synthetic-ph" style="width: 220px;"><span
						class="am-search-synthetic-ph-container"><i class="am-search-synthetic-ph-icon"></i><span
							class="am-search-synthetic-ph-placeholder" style="visibility: none;">123请输入股票代码 / 名称 /
							简称</span></span></view>
							<input type="search" class="am-search-value"
					placeholder="请输入股票代码 / 名称 / 简称" maxlength="6" value="123">
					<a class="am-search-clear"></a>
			</view>
			<view class="am-search-cancel am-search-cancel-show am-search-cancel-anim" style="margin-right: 0px;">取消
			</view>
		</form> -->
		<view class="am-search">
			<input type="search" class="s-input" placeholder="请输入股票代码 / 名称 / 简称" maxlength="6" @input="onInput"
				v-model="keyword">
			<view @click="onBack()" class="" style="width:80rpx;text-align: center;">
				取消
			</view>
		</view>
		<view class="search-record" v-if="noHistory && !noSearchRecordData">
			<view class="search-title">
				<view class="title" style="font-weight: 600;">历史搜索</view>
				<!-- 清除 -->
				<view class="iconfont icon-laji" @click="onDels()">清除历史</view>
			</view>
			<view class="record-list">
				<view class="list" v-for="(item,index) in searchRecordData" @click="onRecord(item.code)" :key="index">
					<text>{{item.code_title}}</text><text>{{item.code}}</text>
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="search-found" v-if="!noHistory">
			<!-- <view class="search-title">
				<view class="title" style="font-weight: 600;">搜索发现</view>
				<view class="iconfont icon-laji"></view>
			</view> -->
			<view class="found-list">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="left" @click="onSearch(item.code,item)">
						<text class="name">{{item.name}}</text><text class="pin">({{item.pin}})</text>
					</view>
					<view class="mid" @click="onSearch(item.code,item)">
						<text class="code">{{item.code}}</text>
					</view>
					<view class="right" @click="onAttention(item,index)">
						<uni-icons v-if="item.is_my==0" type="plus" color="red" size="24"></uni-icons>
						<uni-icons v-else type="checkbox" size="24"></uni-icons>
						<!--text>{{ AttentionShow === 0 ? '加入自选' : '取消自选' }}</text-->
					</view>
				</view>
			</view>
		</view>




		<!-- 大家都在搜 -->
		<view class="search-record" :style="{'margin-top': noHistory&&noSearchRecordData?'100rpx':'0'}"
			v-if="noHistory">
			<view class="search-title">
				<view class="title" style="font-weight: 600;">大家都在搜</view>
				<!-- 清除 -->
				<!-- <view class="iconfont icon-laji" @click="onDel()">清除历史</view> -->
			</view>
			<view  class="bd"
				style="display: flex;flex-wrap: wrap;">
				<view class="sc-kvZOFW kGsHrI item" v-for="(item,index) in SearchRecordArr" @click="onRecord(item.code)" :key="index">
					<view class="index item-1" v-show="index==0" style="background-color: rgb(255, 69, 0);">{{index+1}}</view>
					<view class="index item-1" v-show="index==1" style="background-color: rgb(255, 112, 67);">{{index+1}}</view>
					<view class="index item-1" v-show="index==2" style="background-color: rgb(251, 192, 45);">{{index+1}}</view>
					<view class="index item-1" v-show="index>2" >{{index+1}}</view>
					<view class="title">{{item.code_title}}</view>
					<view class="code">{{item.code}}</view>
				</view>
			</view>
			<!-- <view class="record-list">
				<view class="list"
					style="color:#fff;display: flex;align-items: flex-start;justify-content: space-around;align-items: center;"
					v-for="(item,index) in SearchRecordArr" @click="onRecord(item.code)" :key="index">
					<view v-show="index==0" class=""
						v-show="index==0" style="background-color: rgb(255, 69, 0);">
						{{index}}
					</view>
					<view v-show="index==1" class=""
						style="width: 40rpx;height: 40rpx;background-color: rgb(255, 112, 67);">
						{{index}}
					</view>
					<view v-show="index==2" class=""
						style="width: 40rpx;height: 40rpx;background-color: rgb(251, 192, 45);">
						{{index}}
					</view>
					<view v-show="index>2" class=""
						style="width: 40rpx;height: 40rpx;background-color: rgb(187, 187, 190);">
						{{index}}
					</view>
					<view class="">
						<text>{{item.code_title}}</text><text>{{item.code}}</text>
					</view>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
	var _self, loginRes;
	export default {
		data() {
			return {
				uid: '',
				token: '',
				AttentionShow: 0,
				SearchRecordArr: [],
				keyword: '',
				dataList: {},
				firstFocus: true,
				searchRecordData: [],
				noHistory: true, //默认历史搜索结果
				noSearchRecordData: true, //默认无搜索历史
				type:''
			};
		},
		watch: {
			dataList: function(val) {
				console.log(val.length);
				if (val.length != 0) {
					this.noHistory = false
				} else {
					this.noHistory = true
				}

			},
			searchRecordData: function(val) {
				console.log(val.length);
				if (val.length != 0) {
					this.noSearchRecordData = false
				} else {
					this.noSearchRecordData = true
				}

			},
		},
		onLoad(params) {
			this.type = params.type
			this.getHistory();
			console.log(uni.getStorageSync('SearchRecordArr') === '', '222');
			if (uni.getStorageSync('SearchRecordArr')==[]) {
				console.log(3);
				this.SearchRecordArr = uni.getStorageSync('SearchRecordArr')&&JSON.parse(uni.getStorageSync('SearchRecordArr'));
			} else {
				console.log(2);
				this.getHistory();
			}
			if (uni.getStorageSync('searchRecordData')) {
				this.searchRecordData = JSON.parse(uni.getStorageSync('searchRecordData'));
			}
		},
		activated() {
			this.keyword = ''
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			// 
			setHistory(data) {
				uni.request({
					url: this.apiServer + '/market/index/addHistory',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						code: data.code,
						code_title: data.name
					},
					method: 'GET',
					timeout: 5000,
					success: res => {
						//console.log(res.data);
					},
					complete: function() {
						uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
						console.log(e);
					}
				});
			},
			async getHistory() {
				console.log(1);
				uni.request({
					url: this.apiServer + '/market/index/getHistory_secher',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'GET',
					timeout: 5000,
					success: res => {
						//console.log(res.data);
						this.SearchRecordArr = res.data.data;
						uni.setStorageSync('SearchRecordArr', JSON.stringify(this.SearchRecordArr));
						console.log(this.SearchRecordArr);
					},
					complete: function() {
						uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
						console.log(e);
					}
				});
			},
			/*返回首页*/
			onBackHome() {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			},
			/**
			 * 返回点击
			 */
			onBack() {
				uni.navigateBack();
			},
			/*搜索框输入内容*/
			onInput(e) {
				loginRes = this.checkLogin();
				if (!loginRes) {
					return;
				}
				this.keyword = e.target.value; //监听获取输入框改变值
				this.uid = loginRes[0];
				if (this.keyword) {
					uni.request({
						url: this.apiServer + '/market/index/stock_search?key=' + this.keyword,
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						data: {
							uid: this.uid,
						},
						method: 'GET',
						timeout: 5000,
						success: res => {
							//console.log(res.data);
							this.dataList = res.data.data;
							console.log(this.dataList);
							this.dataList.forEach((i) => {
								this.setHistory(i)
							})
						},
						complete: function() {
							uni.stopPullDownRefresh();
						},
						fail: (e) => {
							uni.showToast({
								title: "加载失败!",
								icon: "none"
							});
							console.log(e);
						}
					});
				} else {
					this.dataList = '';
				}
			},
			/*取消*/
			onCancel() {
				this.keyword = "";
				this.dataList = "";
			},
			/**
			 * 搜索点击
			 */
			onSearch(code, item) {

				var newArr = false;
				if (this.searchRecordData.length != 0) {

					this.searchRecordData.map((item, index) => {
						if (item.code == code) {
							newArr = true;
						}

					})
					if (newArr === false) {
						var storage = JSON.parse(uni.getStorageSync('searchRecordData'))
						var newstr = {
							code: item.code,
							code_title: item.name,
							pin: item.pin
						}
						var arr = [newstr, ...storage];
						this.searchRecordData = arr;
						uni.setStorageSync('searchRecordData', JSON.stringify(arr))
					}
				} else {
					var newstr = {
						code: item.code,
						code_title: item.name,
						pin: item.pin
					}
					var arr = [newstr];
					this.searchRecordData = arr;
					uni.setStorageSync('searchRecordData', JSON.stringify(arr))
				}

				uni.navigateTo({
					url: '/pages/MarketDetails/MarketDetails?code=' + encodeURIComponent(code),
				})
			},
			onDel() {
				this.SearchRecordArr = "";
				uni.removeStorageSync('SearchRecordArr');
				uni.showToast({
					title: "清理成功",
					icon: "none"
				});
			},
			//删除搜索发现
			onDels() {
				this.searchRecordData = "";
				uni.removeStorageSync('searchRecordData');
				uni.showToast({
					title: "清理成功",
					icon: "none"
				});
			},
			/**
			 * 记录点击
			 */
			onRecord(val) {
				console.log(this.type,'ttt')
				if(this.type=='sell'){
					uni.navigateTo({
						url: '/pages/MyOrderList/MyOrderList?code=' + encodeURIComponent(val) + '&type='+'3' ,
					})
				}
				else if(this.type=='buy'){
					uni.navigateTo({
						url: '/pages/MyOrderList/MyOrderList?code=' + encodeURIComponent(val) + '&type='+'4' ,
					})
				}else{
					uni.navigateTo({
						//url: '/pages/GoodsDetails/Candle?code=' + encodeURIComponent(val),
						url: '/pages/MarketDetails/MarketDetails?code=' + encodeURIComponent(val),
					})
				}
			},
			/* 自选点击*/
			onAttention(item,index) {
				loginRes = this.checkLogin();
				if (!loginRes) {
					return;
				}
				console.log(loginRes);
				this.uid = loginRes[0];
				this.token = loginRes[2];
				if (item.is_my === 0) {
					// this.AttentionShow = 1;
					this.dataList[index].is_my = 1
					uni.request({
						url: this.apiServer + '/market/index/add_my_select',
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						method: 'POST',
						timeout: 5000,
						data: {
							uid: this.uid,
							token: this.token,
							name: item.name,
							code: item.code,
						},
						success: res => {
							if (res.data.status == 1) {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}
						},
						complete: function() {
							uni.stopPullDownRefresh();
						},
						fail: function(e) {
							uni.showToast({
								title: "加载失败!",
								icon: "none"
							});
						}
					});
				} else {
					this.dataList[index].is_my = 0
					// this.AttentionShow = 1;
					uni.request({
						url: this.apiServer + '/market/index/del_my_select',
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						method: 'POST',
						timeout: 5000,
						data: {
							token: this.token,
							code: item.code,
						},
						success: res => {
							if (res.data.status == 1) {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}

						},
						complete: function() {
							uni.stopPullDownRefresh();
						},
						fail: function(e) {
							uni.showToast({
								title: "加载失败!",
								icon: "none"
							});
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
	.lz-tabsbtn-view {
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

	.tabsbtn-box {
		width: 100%;
		text-align: center;
		display: flex;
	}

	.screen-info {
		top: 90rpx;
	}

	.goods-data {
		margin-top: 0;
		padding-top: 90rpx;
	}

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
	#tabsbtn-box uni-input {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		width: 100%;
	}

	#tabsbtn-box input {
		color: #333;
		text-align: left;
	}

	// 清除历史icon
	.search-record .search-title .iconfont {
		font-size: 14px;
	}

	.s-input {
		width: 100%;
		background-color: #fff;
		// z-index: 2;
		text-align: left;
		display: block;
		color: #000;
		height: 28px;
		font-size: 15px;
		border: 0;
		broder-radius: 10px;
		padding-left: 15px;
	}

	.am-search,
	.am-search-input {
		position: relative;
		overflow: hidden;
		width: 720rpx !important;
	}

	.am-search {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		height: 44px;
		padding: 0 8px;
		margin-right: 0 !important;
		width: 100% !important;
		background-color: #efeff4;
	}

	span {
		width: 100% !important;
	}

	.am-search-input {
		-ms-flex: 1;
		flex: 1 1;
		width: 100%;
		height: 28px;
		background-color: #fff;
		background-clip: padding-box;
		border-radius: 3px;
	}

	.am-search,
	.am-search-input {
		position: relative;
		overflow: hidden;
	}

	.am-search-input .am-search-synthetic-ph {
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		z-index: 1;
		height: 28px;
		line-height: 28px;
		width: 100%;
		-webkit-transition: width .3s;
		-o-transition: width .3s;
		transition: width .3s;
		display: block;
		text-align: center;
	}

	.am-search-input input[type=search] {
		z-index: 2;
		opacity: 0;
		width: 100%;
		text-align: left;
		display: block;
		color: #000;
		height: 28px;
		font-size: 15px;
		background-color: transparent;
		border: 0;
	}

	.am-search-input .am-search-synthetic-ph-icon {
		display: inline-block;
		margin-right: 5px;
		width: 15px;
		height: 15px;
		overflow: hidden;
		vertical-align: -2.5px;
		background-repeat: no-repeat;
		background-size: 15px auto;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='38' height='36' viewBox='0 0 38 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.05 25.23a15.81 15.81 0 0 0 3.004-9.294c0-8.8-7.17-15.934-16.017-15.934C7.192.002.02 7.136.02 15.936c0 8.802 7.172 15.937 16.017 15.937a16 16 0 0 0 10.772-4.143l8.873 8.232 2.296-2.45-8.927-8.282zM16.2 28.933c-7.19 0-13.04-5.788-13.04-12.903 0-7.113 5.85-12.904 13.04-12.904 7.19 0 12.9 5.79 12.9 12.904 0 7.115-5.71 12.903-12.9 12.903z' fill='%23bbb' fill-rule='evenodd'/%3E%3C/svg%3E");
	}

	.am-search-input .am-search-synthetic-ph-placeholder {
		color: #bbb;
		font-size: 15px;
	}

	.cFmxio .bd {
		display: flex;
		flex-wrap: wrap;
	}

	.kGsHrI {
		width: 33.3333%;
		border-bottom: 1px solid rgb(221, 221, 221);
		position: relative;
		padding: 10px 0px 10px 25px;
	}

	.kGsHrI .index {
		position: absolute;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		color: rgb(255, 255, 255);
		border-radius: 3px;
		background-color: rgb(187, 187, 190);
		left: 0px;
		top: 10px;
	}

	.kGsHrI .title {
		font-size: 14px;
		line-height: 1.2;
		color: rgb(37, 37, 37);
	}

	.kGsHrI .code {
		font-size: 12px;
		line-height: 1.2;
		color: rgb(142, 142, 147);
	}

	a {
		text-decoration: none;
	}
</style>