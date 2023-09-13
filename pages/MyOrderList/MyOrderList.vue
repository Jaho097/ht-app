<template>
	<view class="page">
		<!-- 旧代码 -->
		<!-- head -->
		<!-- 用户信息 -->
		<view class="head-navbar" style="position: relative;">
			<view class="back pos-absl" @click="onBack">
				<text></text>
			</view>
			<view class="nav-title">交易账户</view>
			<view class="nav-btnbox" v-if="myMobile">
				<text class="nav-btn" @click="subwin = true">
					{{sub_account||'选择操盘账户'}}
					<uni-icons custom-prefix="iconfont" type="icon-paixujiantouxia" color="#FFF"></uni-icons>
				</text>
			</view>
			<view class="nav-btnbox" v-else>
				<text class="nav-btn" @click="onUserInfo">登录/注册</text>
			</view>
		</view>

		<!-- <view class="head-back">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="info">
				<view class="btn" @click="subwin = true">
					<text class="text">{{sub_account||'选择操盘账户'}}</text>
				</view>
			</view>
			<view class="more-icon">
				<view class="icon-list">
					<text class="iconfont icon-fadajing"></text>
				</view>
			</view>
		</view>
		<view class="head-height"></view> -->


		<!-- 订单tab -->
		<view class="order-tab">
			<!-- <view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>买入</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>卖出</text>
				<text class="line"></text>
			</view> -->
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>买入</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>卖出</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>撤单</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==10}" @click="onOrderTab(1)">
				<text>持仓</text>
				<text class="line"></text>
			</view>
			<!--view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>撤单</text>
				<text class="line"></text>
			</view-->
			<!-- <view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>委托</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==6}" @click="onOrderTab(6)">
				<text>成交</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==7}" @click="onOrderTab(7)">
				<text>交割</text>
				<text class="line"></text>
			</view> -->
			<view class="tab" :class="{'action':OrderType==8}" @click="onOrderTab(8)">
				<text>查询</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- <view class="user-info" >
			<view class="date-list">
				<view class="size-list" style="display: flex;">
					<uni-tag v-for="(item,index) in DateList" :key="index" :class="{'on':DateIndex === index}"
						@click="onDateList(item,index)" class="date-tags" :text="item.date" :circle="true" size="small">
					</uni-tag>
				</view>
			</view>
		</view> -->
		<!-- 查询列表 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption" :top="0">
			<view class="order-list">
				<!--持仓-->
				<!-- <view class="order-position" v-if="OrderType==1">
					<view class="list" v-for="(item,index) in positionList" :key="index"
						@click="toDeails(item.gupiao_code)">
						<view class="order-number">
							<view class="number">
								<text class="bl">{{item.gupiao_name}}</text>
								<text>{{item.gupiao_code}}</text>
							</view>
							<view class="type">
								<text>市值：</text>
								<text class="red">{{parseFloat(item.now_price*item.stock_count).toFixed(2)}}元</text>
							</view>
						</view>
						<view class="goods-list" style="padding-bottom: 30rpx;">
							<view class="list-mid">
								<view class="info">
									<text class="big fl">
										<font class="code" :class="item.now_price<=item.ck_price?'green':'red'">
											{{item.now_price}}</font>
										<font class="min">现价</font>
									</text>
									<text class="fl">
										<font class="code">{{item.ck_price}}</font>
										<font class="min">买入</font>
									</text>
								</view>
								<view class="info">
									<text class="big">{{item.canbuy_count}}股</text>
									<text class="">可用</text>
								</view>
								<view class="info">
									<text class="big">{{item.stock_count}}股</text>
									<text class="">持仓</text>
								</view>
								<view class="info">
									<text class="big fr"
										:class="item.ck_profit<0?'green':'red'">{{item.ck_profit}}元</text>
									<text class="fr">盈亏</text>
								</view>
							</view>
						</view>
					</view>
				</view> -->
				<!-- 买入 -->
				<view class="position" v-if="OrderType==3">
					<view class="sc-daURTG ScOSY">
						<view class="sc-bXGyLb icUOfo">
							<view class="stock">
								<view class="name">{{marketData.name}}</view>
								<view class="code">{{marketData.code}}</view>
							</view>
							<view class="price"><span class="sc-jTzLTM hluaBw">9.070{{marketData.current_price}}</span></view>
							<view class="range"><span class="sc-jTzLTM hluaBw"> -0.25{{marketData.code}}</span></view>
							<view class="rate"><span class="sc-jTzLTM hluaBw"> -2.68%{{marketData.code}}</span></view>
						</view>
						<a @click="toSearch()" class="sc-lkqHmb geobGM" href="javascript:void(0);">
							<icon type="search" color="red" size="15" />搜索股票
						</a>
					</view>
					<view class="sc-eLExRp hHbrIs">
						<view class="item"><span class="label">最高</span><span class="value">9.32</span></view>
						<view class="item"><span class="label">最低</span><span class="value">9.06</span></view>
						<view class="item"><span class="label">涨停</span><span class="value">10.25</span></view>
						<view class="item"><span class="label">跌停</span><span class="value">8.39</span></view>
					</view>
					<view class="sc-iuJeZd iBrlkI">
						<view class="sc-esOvli ivADoO">
							<view class="hd">买盘档</view>
							<view class="bd">
								<view class="sc-cmthru hBjiPG"><span>买一</span><span><span
											class="sc-jTzLTM hluaBw">9.060</span></span><span>617</span></view>
								<view class="sc-cmthru hBjiPG"><span>买二</span><span><span
											class="sc-jTzLTM hluaBw">9.050</span></span><span>1224</span></view>
								<view class="sc-cmthru hBjiPG"><span>买三</span><span><span
											class="sc-jTzLTM hluaBw">9.040</span></span><span>1238</span></view>
								<view class="sc-cmthru hBjiPG"><span>买四</span><span><span
											class="sc-jTzLTM hluaBw">9.030</span></span><span>395</span></view>
								<view class="sc-cmthru hBjiPG"><span>买五</span><span><span
											class="sc-jTzLTM hluaBw">9.020</span></span><span>1323</span></view>
							</view>
						</view>
						<view class="sc-esOvli ivADoO">
							<view class="hd">卖盘档</view>
							<view class="bd">
								<view class="sc-cmthru hBjiPG"><span>卖一</span><span><span
											class="sc-jTzLTM hluaBw">9.070</span></span><span>229</span></view>
								<view class="sc-cmthru hBjiPG"><span>卖二</span><span><span
											class="sc-jTzLTM hluaBw">9.080</span></span><span>491</span></view>
								<view class="sc-cmthru hBjiPG"><span>卖三</span><span><span
											class="sc-jTzLTM hluaBw">9.090</span></span><span>935</span></view>
								<view class="sc-cmthru hBjiPG"><span>卖四</span><span><span
											class="sc-jTzLTM hluaBw">9.100</span></span><span>1683</span></view>
								<view class="sc-cmthru hBjiPG"><span>卖五</span><span><span
											class="sc-jTzLTM hluaBw">9.110</span></span><span>768</span></view>
							</view>
						</view>
					</view>
					<view class="sc-fOKMvo kMAsAF">
						<view class="sc-cbkKFq bFQDYR">
							<view class="hd">
								<view>限价 <uni-icons type="bottom" size="20"></uni-icons>
								</view>
							</view>
							<view class="bd">
								<view class="input-group">
									<view class="button decrease">+</view><input type="text" name="price" value="9.07">
									<view class="button increase">-</view>
								</view>
							</view>
						</view>
						<view class="am-whitespace am-whitespace-md"></view>
						<view class="sc-cbkKFq bFQDYR">
							<view class="hd">数量</view>
							<view class="bd">
								<view class="input-group">
									<view class="button decrease">+</view><input type="number" name="amount"
										placeholder="可买0股" value="">
									<view class="button increase">-</view>
								</view>
							</view>
						</view>
						<view class="am-whitespace am-whitespace-md"></view>
						<view class="sc-fYiAbW bWpkzL">
							<view class="item  buy">全仓</view>
							<view class="item  buy">1 / 2</view>
							<view class="item  buy">1 / 3</view>
							<view class="item  buy">1 / 4</view>
						</view>
						<view class="sc-dUjcNx lpulDT">
							<view>委托金额：<span class="sc-fjdhpX cEvEJT">--</span></view>
							<view>可用资金：<span class="sc-fjdhpX cEvEJT">0.00</span></view>
						</view><button class="sc-kkGfuU hoqqAL new-button-large">买入</button>
					</view>
					<view class="sc-eilVRo frpTkh">
						<view class="hd">持仓<view class="sc-gHboQg sc-eerKOB juPcCQ"></view>
						</view>
						<table class="sc-jhAzac ikhgZz">
							<thead>
								<tr>
									<th label="名称" class="sc-fBuWsC kTZnlD">名称</th>
									<th label="可用/持仓" class="sc-fBuWsC kTZnlD">可用/持仓</th>
									<th label="现价/成本" class="sc-fBuWsC kTZnlD">现价/成本</th>
									<th label="盈亏/市值" class="sc-fBuWsC kTZnlD">盈亏/市值</th>
								</tr>
							</thead>
							<tfoot>
								<tr>
									<td colspan="4" class="empty">暂无数据</td>
								</tr>
							</tfoot>
						</table>
					</view>
				</view>
				<!-- 卖出 -->
				<view class="position" v-if="OrderType==4">
					<FlashSale v-if="OrderType==4" :type="4" :code="code" :uid="accounId"></FlashSale>
				</view>
				<!--撤单-->
				<view class="position" v-if="OrderType==2">
					<view class="title">
						<text>名称/代码</text>
						<text>价格/数量</text>
						<text>日期/时间</text>
						<text>操作/状态</text>
					</view>
					<view class="list" v-for="(item,index) in cancelList" :key="index">
						<view class="info"><text
								class="big">{{item.gupiao_name}}</text><text>{{item.gupiao_code}}</text></view>
						<view class="info"><text
								class="big">{{item.trust_price}}</text><text>{{item.trust_count}}</text></view>
						<view class="info"><text
								class="big">{{toDate(item.trust_date)}}</text><text>{{item.trust_time}}</text></view>
						<view class="info"><text class="big">{{item.flag2}}</text><text>{{item.status}}</text></view>
					</view>
				</view>
				<!--持仓-->
				<view class="position" v-if="OrderType==10">
					<view class="title">
						<text>名称/代码</text>
						<text>可用/持仓</text>
						<text>现价/成本</text>
						<text>盈亏/市值</text>
					</view>
					<view class="list" v-for="(item,index) in positionList" :key="index">
						<view class="info"><text
								class="big">{{item.gupiao_name}}</text><text>{{item.gupiao_code}}</text></view>
						<view class="info"><text
								class="big">{{item.canbuy_count}}</text><text>{{item.stock_count}}</text></view>
						<view class="info"><text class="big">{{item.now_price}}</text><text>{{item.ck_price}}</text>
						</view>
						<view class="info"><text
								class="big">{{item.ck_profit}}</text><text>{{parseFloat(item.now_price*item.stock_count).toFixed(2)}}</text>
						</view>
					</view>
				</view>
				<!--委托-->
				<view class="order-position" v-if="OrderType==3">
					<view class="list" v-for="(item,index) in trustList" :key="index">
						<view class="order-number">
							<view class="number"><text>单号：{{item.trust_no}}</text></view>
							<view class="type">
								<!--text>状态：</text-->
								<!--text class="red" :class="{'blue':item.cancel_order_flag==0}">{{item.status}}</text-->
								<text class="che" @click="onCancel(item.trust_no)"
									v-if="item.cancel_order_flag==0">撤销</text>
							</view>
						</view>
						<view class="goods-list">
							<view class="list-mid">
								<view class="info">
									<text class="big fl">{{item.gupiao_name}}</text>
									<text class="fl">
										<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
										{{item.gupiao_code}}
									</text>
								</view>
								<view class="info">
									<text class="big">{{item.trust_price}}元</text>
									<text class="">{{item.flag2}}</text>
								</view>
								<view class="info">
									<text class="big">{{parseFloat(item.trust_count)}}股</text>
									<text class="">委托量</text>
								</view>
								<view class="info">
									<text class="big fr">{{parseFloat(item.amount)}}元</text>
									<text class="fr">成交量</text>
								</view>
							</view>
						</view>
						<view class="order-status">
							<view class="status">
								<text>日期：</text>
								<text>{{item.trust_date+" "+item.trust_time}}</text>
							</view>
							<view class="status">
								<text>状态：</text>
								<text class="red" v-if="item.status=='已成'">{{item.status}}</text>
								<text class="blue" v-else-if="item.status=='已委托'">{{item.status}}</text>
								<text class="gray" v-else="item.status=='已撤'">{{item.status}}</text>
							</view>
						</view>
					</view>
				</view>
				<!--成交-->
				<view class="order-position" v-if="OrderType==4">
					<view class="list" v-for="(item,index) in dealList" :key="index">
						<view class="order-number">
							<view class="number"><text>单号：{{item.deal_no}}</text></view>
							<view class="type"><text>状态：</text><text class="red">{{item.status}}</text></view>
						</view>
						<view class="goods-list">
							<view class="list-mid">
								<view class="info">
									<text class="big fl">{{item.gupiao_name}}</text>
									<text class="fl">
										<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
										{{item.gupiao_code}}
									</text>
								</view>
								<view class="info">
									<text class="big">{{item.deal_price}}元</text>
									<text class="">{{item.flag2}}</text>
								</view>
								<view class="info">
									<text class="big">{{parseFloat(item.trust_count)}}股</text>
									<text class="">数量</text>
								</view>
								<view class="info">
									<text class="big fr">{{item.amount}}元</text>
									<text class="fr">成交额</text>
								</view>
							</view>
						</view>
						<view class="order-status">
							<view class="status"><text>日期：</text><text>{{toDate(item.deal_date)}}</text></view>
							<view class="status"><text>发生时间：</text><text>{{item.deal_time}}</text></view>
						</view>
					</view>
				</view>
				<!--交割-->
				<view class="order-position" v-if="OrderType==5">
					<view class="list" v-for="(item,index) in deliveryList" :key="index">
						<view class="order-number">
							<view class="number"><text>单号：{{item.deal_no}}</text></view>
							<view class="type" v-if="item.status==1"><text>状态：</text><text class="red">成功</text></view>
						</view>
						<view class="goods-list">
							<view class="list-mid">
								<view class="info">
									<text class="big fl">{{item.gupiao_name}}</text>
									<text class="fl">
										<!-- <font class="on">{{getHouse(item.gupiao_code)}}</font> -->
										{{item.gupiao_code}}
									</text>
								</view>
								<view class="info">
									<text class="big">{{item.deal_price}}元</text>
									<text class="">{{item.volume}}股</text>
								</view>
								<view class="info">
									<text class="big">{{item.residual_quantity}}元</text>
									<text class="">{{item.business_name}}</text>
								</view>
								<view class="info">
									<text
										class="big fr">{{(parseFloat(item.commission)+parseFloat(item.stamp_duty)+parseFloat(item.transfer_fee)).toFixed(2)}}元</text>
									<text class="fr">手续费</text>
								</view>
							</view>
						</view>
						<view class="order-status">
							<view class="status"><text>日期：</text><text>{{toDate(item.deal_date)}}</text></view>
							<view class="status"><text>发生时间：</text><text>{{toDate(item.deal_date,1)}}</text></view>
						</view>
					</view>
				</view>
				<view class="" v-if="OrderType==8">
					<uni-list>
						<uni-list-item title="委托记录" :showArrow="true" link @click="toQuery(1)" />
						<uni-list-item title="成交记录" :showArrow="true" link @click="toQuery(2)" />
						<uni-list-item title="交割查询" :showArrow="true" link @click="toQuery(3)" />
						<uni-list-item title="资金流水" :showArrow="true" link @click="toQuery(4)" />
						<uni-list-item title="除权除息" :showArrow="true" link @click="toQuery(5)" />
					</uni-list>
				</view>

			</view>
			<!-- 子账户选择窗口 -->
			<view class="sub-win" @click="subwin = false">
				<view class="cu-modal bottom-modal" :class="{'show':subwin}">
					<view class="cu-dialog">
						<view class="pay-list">
							<view class="list" v-for="(item,index) in accountData" :key="index"
								@click.stop="onSubwin(index)">
								<view class="pay flex">
									<text class="flex-twice text-bold text-df">账号：{{item.sub_account}}</text>
									<text class="flex-sub text-sm">状态：{{item.status?'正常':'不可用'}}</text>
								</view>
								<view class="check" v-if="item.status > 0">
									<text class="iconfont"
										:class="accounId===item.id?'icon-checked action':'icon-check'"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	var _self, loginRes;
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import FlashSale from "@/pages/FlashSale/FlashSale.vue";
	import Request from '@/js_sdk/luch-request/luch-request/index.js'
	const http = new Request();
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{
			FlashSale
		},
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				downOption: {}, // 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {
					use: false
				}, // 上拉加载的配置(可选, 绝大部分情况无需配置)
				OrderType: 0,
				token: '',
				index: null,
				subwin: false,
				myMobile: '',
				subId: '',
				beginday: this.getDayDate(0),
				endday: this.getDayDate(0),
				accountData: uni.getStorageSync('accountData'),
				accounId: uni.getStorageSync('accounId') || '',
				sub_account: uni.getStorageSync('sub_account') || '',
				positionList: [],
				cancelList: [],
				trustList: [],
				dealList: [],
				deliveryList: [],
				DateIndex: 0,
				DateList: [{
					index: 0,
					date: '当天'
				}, {
					index: 1,
					date: '本周'
				}, {
					index: 2,
					date: '本月'
				}, {
					index: 3,
					date: '一年'
				}, ],
				marketData:[],
				X:"",
				Y:"",
				code:''
			};
		},
		onLoad(params) {
			console.log('onLoad')
			this.OrderType = params.type;
			this.code = params.code
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			if (!this.accountData) {
				this.getSubAccount(this.token); //加载子账户信息
			}
			this.getOrderList(this.token, this.accounId, this.OrderType); //accList[0].id是子账户ID
			//this.getSubAccount(this.token);//获取子账号信息
		},
		methods: {
			/*获取股票信息*/
			async getMarket(code) {
				//var codeName = code >= 6 ? "sh"+code : "sz"+code;
				http.post(this.apiServer + '/market/index/market', {
					uid: this.accounId,
					// uid: this.uid,
					code: 600033,
					// code: this.code,
					
				}, {
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					dataType: 'json',
					custom: {
						auth: true
					},
				}).then(res => {
					if (res.data.status == 1) {
						this.marketData = res.data.data;
						uni.setStorageSync('market-' + code, res.data.data);
						this.Y = parseFloat(this.marketData.yesterday_price); //把昨天收盘价赋值给Y
						this.T = parseFloat(this.marketData.open_price); //把今天开盘价赋值给T
					}
				}).catch(err => {
					uni.showToast({
						title: "加载失败!",
						icon: "none"
					});
				})
			},
			toSearch(){
				console.log(this.OrderType,'this.OrderTypethis.OrderType')
				if(this.OrderType==3){
					uni.navigateTo({
						url: '/pages/search/search?type=sell'
					})
				}else{
					uni.navigateTo({
						url: '/pages/search/search?type=buy'
					})
				}
			},
			toQuery(id) {
				console.log(123123)
				uni.navigateTo({
					url: '/pages/AccoutSet/query?type=' + id
				})
			},
			/*获取交易账户信息*/
			async getSubAccount(token) {
				this.accountData = '';
				uni.showLoading({
					'title': "更新账户列表中"
				});
				uni.removeStorageSync('accountData'); //清除子账户缓存数据
				uni.request({
					url: this.apiServer + '/market/index/getSubAccount',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1 && res.data.data.length != 0) {
							this.accountData = res.data.data;
							uni.setStorageSync('accountData', this.accountData); //子账户数据缓存到本地
							this.accounId = this.accountData[0].id; //默认获取第一个账号的信息
							this.getacInfo(this.token, this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account', this.sub_account);
						}
					},
					fail: function(e) {
						uni.hideLoading();
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
				uni.hideLoading();
			},
			/*获取持仓信息*/
			async getOrderList(token, id, type) {
				if (type == 10) {
					var action = 'position';
				} //持仓this.positionList = '';
				if (type == 2) {
					var action = 'cancel_trust';
				} //撤单this.cancelList = '';
				if (type == 3) {
					var action = 'trust';
				} //委托this.trustList = '';
				if (type == 4) {
					var action = 'deal_stock';
				} //成交this.dealList = '';
				if (type == 5) {
					var action = 'delivery';
				} //交割this.deliveryList = '';
				uni.showLoading({
					title: "加载中",
					icon: "loading"
				});
				if(type==3||type==4){
					uni.hideLoading();
					return
				}
				uni.request({
					url: this.apiServer + '/market/trade/' + action,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						beginday: this.beginday,
						endday: this.endday,
						token: token,
						id: id,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status) {
							if (type == 10) this.positionList = res.data.data.list; //持仓
							if (type == 2) this.cancelList = res.data.data.list; //撤单
							if (type == 3) this.trustList = res.data.data.list; //委托
							if (type == 4) this.dealList = res.data.data; //成交
							if (type == 5) this.deliveryList = res.data.data; //交割
							//console.log(res.data.data.list);
						}
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
			},
			async onCancel(order) {
				uni.showLoading({
					title: "撤单申请中",
					icon: "loading"
				});
				uni.request({
					url: this.apiServer + '/market/trade/cancel_order',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						trust_no: order,
						token: this.token,
						id: this.accounId,
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({
							title: res.data.message,
							icon: "none"
						});
						if (res.data.status) {
							setTimeout(() => {
								this.getOrderList(this.token, this.accounId, this
									.OrderType); //accList[0].id是子账户ID
							}, 1000)
						}
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
			},
			onSubwin(i) {
				/*if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}*/
				this.accounId = this.accountData[i].id; //将array【改变索引】的值赋给定义的picker变量
				this.sub_account = this.accountData[i].sub_account;
				uni.setStorageSync('accounId', this.accounId);
				uni.setStorageSync('sub_account', this.sub_account);
				this.subwin = false;
				this.getOrderList(this.token, this.accounId, this.OrderType);
				//this.getacInfo(this.token,this.accounId);
				console.log(this.accounId, this.sub_account)
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				//this.getSubAccount(this.token);//获取子账号信息
				this.getOrderList(this.token, this.accounId, this.OrderType);
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() => {
					this.mescroll.endByPage(10, 20);
				}, 2000)
			},
			/*选择查询时间*/
			onDateList(item, index) {
				this.DateIndex = index;
				if (this.DateIndex == 0) {
					this.beginday = this.getDayDate(0);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 1) {
					this.beginday = this.getDayDate(7);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 2) {
					this.beginday = this.getDayDate(30);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 3) {
					this.beginday = this.getDayDate(365);
					this.endday = this.getDayDate(0);
				}
				this.getOrderList(this.token, this.accounId, this.OrderType);
			},
			/*返回点击*/
			onBack() {
				uni.navigateBack();
			},
			/*订单tab点击*/
			onOrderTab(type) {
				this.OrderType = type;
				if (type == 4 || type == 6 || type == 7) {

				} else {
					this.getOrderList(this.token, this.accounId, type);
				}
				// #ifdef H5
				/*uni.redirectTo({
					url: '/pages/MyOrderList/MyOrderList?type=' + type,
				})*/
				//#endif
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
			/*获取时间*/
			getDayDate(n) {
				var day = new Date();
				day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * n);
				var dataTime = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
				return dataTime;
			},
			/*获取时间*/
			toDate(timestamp, num = 0) { //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
				timestamp = timestamp + '';
				timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
				var date = new Date(timestamp);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				if (num == 0) {
					return y + '-' + m + '-' + d;
				} else {
					return h + ':' + minute + ':' + second;
				}
			},
			/*识别股票所属交易所*/
			getHouse(code) {
				var str = code.toString();
				var code = str.slice(0, 1);
				var codeName = code >= 6 ? "SH" : "SZ";
				return codeName;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyOrderList.scss';

	/*lz自定义*/
	.order-tab {
		top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));
		height: 88rpx;
	}

	.order-tab .tab {
		height: 100%;
	}

	.order-list {
		// margin-top: 100rpx;
	}

	.order-list .list {
		border-radius: 0;
	}

	.order-tab .action uni-text {
		color: #ee0a24;
	}

	.order-tab .action .line {
		background: #ee0a24;
		border-radius: 4rpx;
	}

	.order-list .order-li .order-number {
		padding: 12rpx 0;
		height: auto;
	}

	// tags标签
	// .user-info .date-list .size-list .action{background-color: rgba(233, 59, 61, 0.3);border: 1px solid #fe3b0f;}
	.date-tags {
		display: inline-block;
		padding: 8rpx 26rpx;
		background-color: #EEEEEE;
		margin: 0 8rpx;
		/*border-radius: 44rpx;*/
		box-sizing: border-box;
		border: 1px solid #ddd;
		width: 22%;
		color: #959595;
		text-align: center;
	}

	.date-tags.on {
		background: rgb(233, 59, 61);
		border: 1px solid #fe3b0f;
		color: #FFF;
	}

	//顶部导航栏
	.head-navbar {
		display: flex;
		color: #000;
		height: 88rpx;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center top;
		background-image: url('/static/new/sub-banner.png');

		.pos-absl {
			// position: absolute;top: 0;left: 0;
			// width: 44px;height: 44px;
			position: absolute;
			left: 0;
			top: 0;
			/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
			/* #endif */
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100%;

			text {
				width: 20rpx;
				height: 20rpx;
				border-left: 4rpx solid #ffffff;
				border-bottom: 4rpx solid #ffffff;
				transform: rotate(45deg);
			}

		}

		.nav-title,
		.nav-btnbox {
			flex: 1;
			padding: 0 10rpx;
		}

		.nav-title {
			text-align: right;
			line-height: 88rpx;
			font-weight: 600;
			font-size: 32rpx;
		}

		.nav-btnbox {
			text-align: left;
			display: flex;
			align-items: center;
			font-size: 28rpx;
		}

		.nav-btn {
			padding: 0 20rpx;
			border: #FFF 1px solid;
			border-radius: 10rpx;
		}
	}

	.ScOSY {
		display: flex;
		background-color: rgb(255, 255, 255);
		padding: 10px 15px;
		padding-right: 0;
		border-top: 1px solid rgb(242, 242, 242);
	}

	.ScOSY {
		display: flex;
		background-color: rgb(255, 255, 255);
		padding: 10px 15px;
		border-top: 1px solid rgb(242, 242, 242);
	}

	.icUOfo {
		width: 75%;
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.icUOfo .stock {
		line-height: 1;
	}

	.icUOfo .stock .name {
		color: rgb(37, 37, 37);
		font-size: 16px;
	}

	.icUOfo .stock .code {
		font-size: 12px;
		color: rgb(142, 142, 147);
		line-height: 1.3;
	}

	.icUOfo .price {
		font-size: 22px;
		color: rgb(255, 69, 0);
		line-height: 1.2;
		text-align: center;
	}

	.hluaBw {
		color: rgb(5, 170, 59);
	}

	.icUOfo .range {
		line-height: 30px;
		text-align: center;
	}

	.hluaBw {
		color: rgb(5, 170, 59);
	}

	.icUOfo .rate {
		line-height: 30px;
		text-align: center;
	}

	.geobGM {
		display: flex;
		color: rgb(255, 74, 7);
		border: 1px solid rgb(255, 74, 7);
		-webkit-box-align: center;
		align-items: center;
		border-radius: 4px;
		flex: 1 1 0%;
		height: 30px;
		line-height: 30px;
		padding: 4px 8px;
		white-space: nowrap;
		overflow: hidden;
	}

	.am-icon {
		fill: currentColor;
		background-size: cover;
		width: 22px;
		height: 22px;
	}

	.am-icon {
		fill: currentColor;
		background-size: cover;
		width: 22px;
		height: 22px;
	}

	a {
		text-decoration: none;
	}

	.hHbrIs {
		display: flex;
		padding: 0px 15px;
		background-color: rgb(255, 255, 255);
	}

	.hHbrIs>.item {
		flex: 1 1 0%;
		font-size: 14px;
		padding: 10px 0px;
		display: flex;
		border-top: 1px solid rgb(242, 242, 242);
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.hHbrIs>.item .label {
		color: rgb(142, 142, 147);
	}

	.hHbrIs>.item .value {
		color: rgb(37, 37, 37);
		text-align: center;
		width: 50%;
	}

	.iBrlkI {
		background-color: rgb(255, 255, 255);
		margin-top: 10px;
		padding: 0px 15px;
		display: flex;
	}

	.ivADoO:first-child {
		padding-right: 10px;
	}

	.ivADoO {
		flex: 1 1 0%;
		color: rgb(142, 142, 147);
	}

	.ivADoO .hd {
		line-height: 40px;
		text-align: center;
		color: rgb(37, 37, 37);
		font-size: 14px;
		border-bottom: 1px solid rgb(244, 244, 244);
	}

	.hBjiPG {
		display: flex;
		line-height: 30px;
	}

	.hBjiPG span:first-child {
		text-align: left;
	}

	.hBjiPG span {
		flex: 1 1 0%;
		text-align: center;
	}

	.hBjiPG span {
		flex: 1 1 0%;
		text-align: center;
	}

	.hBjiPG span:last-child {
		text-align: right;
	}

	.hBjiPG span:first-child {
		text-align: left;
	}

	.hluaBw {
		color: rgb(5, 170, 59);
	}

	.kMAsAF {
		margin: 10px 15px;
	}

	.bFQDYR {
		background-color: rgb(255, 255, 255);
		border-radius: 4px;
		border: 1px solid rgb(232, 232, 232);
		display: flex;
		flex-direction: row;
	}

	.bFQDYR .hd {
		width: 80px;
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		color: rgb(37, 37, 37);
		border-right: 1px solid rgb(232, 232, 232);
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
	}

	.bFQDYR .bd {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		-webkit-box-align: center;
		align-items: center;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.dFONSk {
		position: relative;
		display: inline-block;
		width: 6px;
		height: 6px;
	}

	.bFQDYR .input-group {
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
		width: 100%;
		overflow: hidden;
	}

	.bFQDYR .input-group .button.decrease {
		background-color: rgb(255, 69, 0);
	}

	.bFQDYR .input-group .button {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 20px;
		color: rgb(255, 255, 255);
		margin: 0px 10px;
		border-radius: 5px;
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
	}

	.bFQDYR .input-group input {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		text-align: center;
		background-color: rgb(244, 245, 246);
		color: rgb(37, 37, 37);
		border: 1px solid rgb(232, 232, 232);
		border-radius: 4px;
		line-height: calc(28px);
		width: calc((100% - 120px) - 40px) !important;
	}

	.bFQDYR .input-group .button {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 20px;
		color: rgb(255, 255, 255);
		margin: 0px 10px;
		border-radius: 5px;
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
	}

	.bFQDYR .input-group .button.increase {
		background-color: rgb(5, 170, 59);
	}

	.am-whitespace.am-whitespace-md {
		height: 9px;
	}

	.bWpkzL {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.bWpkzL .item.buy {
		color: rgb(255, 69, 0);
		border: 1px solid rgb(255, 69, 0);
	}

	.bWpkzL .item {
		width: 20%;
		line-height: 24px;
		text-align: center;
		background-color: rgb(255, 255, 255);
		border-radius: 4px;
	}

	.lpulDT {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		line-height: 30px;
	}

	.frpTkh {
		background-color: rgb(255, 255, 255);
		border-radius: 5px;
	}

	.frpTkh .hd {
		padding: 3px 10px 0px;
		line-height: 35px;
		font-size: 16px;
		color: rgb(37, 37, 37);
		position: relative;
	}

	.juPcCQ {
		width: 22px;
		height: 22px;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAgCAYAAACRpmGNAAADRUlEQVRYhbXYW4hVdRTH8c9MZmhl5IxS0gW7EERYJmEU9TDVaCNB+VB0oRctbbxQ9BAEEUQ9RDSJpfOQCD1076FAm3xoIAMjpB6KQHMwEqEatQgjdcqZHtY5tM//7HPOPuPZPzhw1trrv/d3/y/rv/67a2joddNQF27CAJZiIXowF3/hCA5gDz7D3uk8ZEab8TOxBhtxVYOYOZXflViOF7Afm7AdE0Uf1t0G2HL8gM1NwBrpGgzjR9xdtFFRuAcw0gRqUgzlQRzG6QZxl+NTbFFg1IrC9ef4fhZDdjvOw3wxlJfiXNyCF3Eop+0gdmJ2J+A+wr+V/0exTvTi8/gSJ5L4U/gKz+FqPI5jSUw/PsTZZwo3giV4sAK1NQPbShN4E9fii+TaAF4+Uzj4Du/hzzbaZDUueuvjxP8kbs5rkAd3Pu6YJkArTYjFtSfj68IbOCsNzoN7Fe+ICV6GJvCISNZVLcGKNDCFW4bVFbDhkuDgJ7yS+NamQVm4C7FNdDOsxMOloIW24GTGXiYZrSzcJlyS3GAzFpSCFqllJGHpkzjgXjyac4O5Ig2UpdHEXpw1utGr+fwawKoOQ1U1lth1w7oVF7W4yWtiX+y0xhN7Xtboxv1iEXSpnQOwqOKfI/bSTugykcin8E1ybUXFP4X301RyJLF7OgSU1SE81SLmVwymcL8l9o0dQ6rVdlGVNNJaHEvhvk3sOzuKVKvH8HuO/y18Qv0OMSoKx6r6cHEpaPyC9YnvsMyQp3Dj2JWxzxHnhbL0rqgViUWwGn80gqM+523EFaWghZ4Qc32b2o7JhdspareqZosqZWZJcEfxEJ5OL+TBTWKD6OaqlopCsyzAURxPnY0q4d0YSnz3iSQ93TrvAtFDNxRt0KxMfwY7El8fvhd7bdED+Qxx2hrD2+L0X1dYtgt3WpTUuxL/fDF5D+IlcQSclcTMwm3i6DgmarfeDOzKInCt3v5v3CM2/kH/F6LE+fTZym9SbDknxT7ck8RmNaX+hXNV5PT1j0iWd6kvcbL3WSBSTm8TsH3ic8QHnYKr6nNcJ3pwXxvtiJfagOsV7DXa/8p0SiTpYfEJrB+3ilP9PLEiT4gh3o+vxbeRvWpTUyH9BzO+nkxGrXr/AAAAAElFTkSuQmCC") center center / 100% no-repeat;
		float: right;
		margin: 6px 0px;
	}

	.ikhgZz {
		width: 100%;
		border-collapse: collapse;
		text-align: center;
	}

	.kTZnlD {
		padding: 0px 10px;
		font-weight: normal;
		color: rgb(142, 142, 147);
		font-size: 13px;
		line-height: 35px;
		background-color: rgb(243, 247, 255);
		text-align: center;
	}

	.ikhgZz tfoot td.empty {
		padding: 20px 0px;
	}

	.hoqqAL {
		background-color: rgb(179, 141, 74);
		background-image: linear-gradient(112deg, rgb(220, 190, 127) 0%, rgb(179, 141, 74) 100%);
		border-radius: 4px;
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: rgb(255, 255, 255);
		font-weight: 600;
		border: none;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		padding-left: 8px;
		padding-right: 8px;
		height: 44px;
	}

	.cEvEJT {
		color: rgb(255, 69, 0);
	}
</style>
