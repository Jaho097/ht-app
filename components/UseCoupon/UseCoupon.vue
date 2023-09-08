<template>
	<view class="page-total">
		<view class="cu-modal bottom-modal" :class="{ show: isShow }" @click="hide">
			<view class="cu-dialog">
				<view class="coupon-title">
					<view class="title">账户：{{mobile}}</view>
					<!--view class="explain">使用说明</view-->
				</view>
				<view class="coupon-data" v-if="isShow==1">
					<!-- 持仓 -->
					<view class="order-position" v-if="TabShow==1">
						<view class="list" v-for="(item,index) in pList" :key="index">
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
							<view class="goods-list">
								<view class="list-mid">
									<view class="info">
										<text class="big fl">
											<font class="code"
											:class="item.now_price<=item.ck_price?'green':'red'">{{item.now_price}}</font>
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
							<view class="order-status">
								<view class="buy-status">
									
								</view>
								<view class="buy-status">
									
								</view>
							</view>
						</view>
					</view>
					<!--交割-->
					<view class="order-position" v-if="TabShow==5">
						<view class="list" v-for="(item,index) in dList" :key="index">
							<view class="order-number">
								<view class="number"><text>单号：{{item.deal_no}}</text></view>
								<view class="type" v-if="item.status==1"><text>状态：</text><text class="red">成功</text></view>
							</view>
							<view class="goods-list">
								<view class="list-mid">
									<view class="info">
										<text class="big fl">{{item.gupiao_name}}</text>
										<text class="fl">
											<font class="on">{{getHouse(item.gupiao_code)}}</font>
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
										<text class="big fr">{{(parseFloat(item.commission)+parseFloat(item.stamp_duty)+parseFloat(item.transfer_fee)).toFixed(2)}}元</text>
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
					<!--资金明细-->
					<view class="money-position" v-if="TabShow==2">	
						<view class="money-li" v-for="(item,index) in mList" :key="index">
							<view class="order-number">
								<view class="number">
									<text>说明：{{item.info}}</text>
								</view>
							</view>
							<view class="goods-list">
								<view class="list">
									<view class="info">
										<text class="big">发生金额</text>
										<text class='green' :class="{'red':item.affect>0}">{{calculate(item.affect)}}元</text>
									</view>
									<view class="info">
										<text class="big">账户余额</text>
										<text>{{calculate(item.account)}}元</text>
									</view>
									<view class="info">
										<text class="big">发生时间</text>
										<text>{{item.happend_time}}</text>
									</view>
								</view>
							</view>
							<view class="order-status">
								<view class="switch-setting">
									<text>类型：</text>
									<text class="icon">{{item.type_name}}</text>
								</view>
								<view class="status">
									<text>日期：</text>
									<text>{{item.happend_date}}</text>
								</view>
								
							</view>
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
				isShow: false,
				TabShow: 0,
				pList  : '',
				dList  : '',
				mList  : '',
				mobile : '',
			};
		},
		methods:{
			show(type,mobile,data){
				this.isShow = true;
				this.TabShow = type;
				this.mobile = mobile;
				if(type == 1)this.pList  = data.list;
				if(type == 2)this.mList  = data;
				if(type == 5)this.dList  = data;
				console.log(type,mobile,data)
			},
			hide(){
				this.isShow = false;
			},
			/*获取时间*/
			toDate(timestamp,num=0){//num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
				timestamp = timestamp+'';
				timestamp = timestamp.length==10?timestamp*1000:timestamp;
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
				if(num==0){
					return y + '-' + m + '-' + d;  
				}else{
					return h +':'+ minute +':' + second;  
				}
			},
			/*识别股票所属交易所*/
			getHouse(code){
				var str  = code.toString();
				var code = str.slice(0,1);
				var codeName = code >= 6 ? "SH" : "SZ";
				return codeName;
			}
			,/*计算单位*/
			calculate(number){
				number = parseInt(number);
				if(number==0 || !number)return 0;
				if(number.toString().length >= 13){
					var unit = (number/1000000000000).toFixed(2);
					return unit + '万亿';
				}else if(number.toString().length >= 9){
					var unit = (number/100000000).toFixed(2);
					return unit + '亿';
				}else if(number.toString().length > 4){
					var unit =  (number/10000).toFixed(2);
					return unit + '万';
				}else{
					var unit =  number.toFixed(2);
					return unit;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'UseCoupon.scss';
</style>
