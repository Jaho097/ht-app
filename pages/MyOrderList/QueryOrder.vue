<template>
	<view class="page">
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>委托</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>成交</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==5}" @click="onOrderTab(5)">
				<text>交割</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 订单搜索 -->
		<view class="order-search">
			<view class="search">
				<text class="iconfont icon-fadajing"></text>
				<input type="text" placeholder="商品名称/商品编号/订单号/序列号">
			</view>
			<view class="filtrate" @click="isFiltrate = true">
				<text>筛选</text>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="position">
				<view class="title">
					<text>名称/价格</text>
					<text>委托/成交</text>
					<text>委托时间</text>
					<text>操作状态</text>
				</view>
				<view class="list" v-for="(item,index) in entrustList" :key="index">
					<view class="info"><text class="big">{{item.gupiao_name}}</text><text>{{item.gupiao_code}}</text></view>
					<view class="info"><text class="big">{{item.canbuy_count}}</text><text>{{item.stock_count}}</text></view>
					<view class="info"><text class="big">{{item.now_price}}</text><text>{{item.ck_price}}</text></view>
					<view class="info">
						<text class="big" :class="{'green':item.ck_profit<0}">{{item.ck_profit}}</text>
						<text>{{item.market_value}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选弹窗 -->
		<view class="filtrate-win" @click="isFiltrate = false">
			<view class="cu-modal drawer-modal justify-end" :class="{'show':isFiltrate}">
			  <view class="cu-dialog basis-lg">
			    <view class="order-time">
						<view class="title">
							<text>下单时间</text>
						</view>
						<view class="time-list">
							<view class="list action">
								<text>全部</text>
							</view>
							<view class="list">
								<text>一个月内</text>
							</view>
							<view class="list">
								<text>一个月至三个月</text>
							</view>
							<view class="list">
								<text>三个月六个月</text>
							</view>
							<view class="list">
								<text>六个月至一年</text>
							</view>
							<view class="list">
								<text>一年以上</text>
							</view>
						</view>
					</view>
					<view class="footer-btn">
						<view class="btn" @click="isFiltrate = false">
							<text>重置</text>
						</view>
						<view class="btn action" @click="isFiltrate = false">
							<text>确定</text>
						</view>
					</view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderType: 3,
				isFiltrate: false,
				token: '',
				index: null,
				myMobile: '',
				subId: '',
				entrustList:[],
			};
		},
		methods:{
			onLoad(params) {
				this.OrderType = params.type;
				loginRes = this.checkLogin();
				if(!loginRes){return;}
				//console.log(loginRes);
				this.token = loginRes[2];
				this.myMobile = loginRes[1];
				//this.getSubAccount(this.token);//获取子账号信息
			},
			/**
			 * 订单tab切换状态
			 * @param {Number} type
			 */
			onOrderTab(type){
				this.OrderType = type;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'QueryOrder.scss';
</style>
