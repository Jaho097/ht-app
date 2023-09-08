<template>
	<view class="cu-modal bottom-modal" :class="{'show':isShow}">
		<view class="cu-dialog">
			<!-- 交易账户信息 -->
			<view class="user-info">
				<view class="head-off cuIcon cuIcon-close icon_18" @click="hide"></view>
				<view class="info">
					<picker @change="bindTimeChange" :range="accountList">
						<label v-if="index==null" class="normal">选择操盘账户</label>
						<label v-else>{{accountData[index].sub_account}}</label>
					</picker>
				</view>
				<view class="head-title cuIcon cuIcon-refresh icon_16" @click="getacInfo(token,accounId)"></view>
			</view>
			<view class="attr-size">
				<view class="attr-list">
					<view class="size-list left">
						<div class="list" v-for="(item,index) in PriceList" 
						:class="{'action':PriceIndex === index}"
						@click.stop="onPriceList(index)" :key="index">
							<text>{{item.name}}</text>
						</div>
						<!--view class="right" @click="getacInfo(token,accounId)"><text>重新加载</text></view-->
					</view>
				</view>
				<view class="attr-list">
					<view class="size-list">
						<div class="list" v-for="(item,index) in AttrList" 
						:class="{'action':AttrIndex === index}"
						@click.stop="onAttrList(index)" :key="index">
							<text>{{item.size}}</text>
						</div>
					</view>
				</view>
			</view>
			<!--view class="attr-size" v-if="BuyType === 2 && Cansell > 0">
				<text>当前股票持仓：</text><text class="text-lg text-red">{{Cansell}}股</text>
			</view-->
			<!--view class="position" v-if="BuyType === 2 && Cansell > 0">
				<view class="title">
					<text>名称/代码</text>
					<text>可用/持仓</text>
					<text>现价/成本</text>
					<text>盈亏/市值</text>
				</view>
				<view class="list">
					<view class="info"><text class="big">{{posData.gupiao_name}}</text><text>{{posData.gupiao_code}}</text></view>
					<view class="info"><text class="big">{{posData.canbuy_count}}</text><text>{{posData.stock_count}}</text></view>
					<view class="info"><text class="big">{{posData.now_price}}</text><text>{{posData.ck_price}}</text></view>
					<view class="info">
						<text class="big" :class="{'green':posData.ck_profit<0}">{{posData.ck_profit}}</text>
						<text>{{posData.market_value}}</text>
					</view>
				</view>
			</view-->
			<view class="attr-price">
				<view class="left" >委托金额：<text class="t_16">{{amount}}</text></view>
				<view class="right">账户余额：<text class="t_16">{{accountInfo.avail}}</text></view>
			</view>
			<view class="attr-maine">
				<view class="attr-number">
					<view class="tit">手动价格：</view>
					<view class="number">
						<text class="kuang iconfont icon-jian" @click="onReduction('price')"></text>
						<input type="tel" v-model="price" maxlength="8" class="great" disabled="disabled" placeholder="按市价即时成交" v-if="PriceIndex==1">
						<input type="tel" v-model="price" value="1" maxlength="8" class="red"  @input.stop="onInputPrice" v-else>
						<text class="kuang iconfont icon-jia" @click="onIncrease('price')"></text>
					</view>
				</view>
				<view class="attr-number" v-if="BuyType === 1">
					<view class="tit">自填数量：</view>
					<view class="number">
						<text class="kuang iconfont icon-jian" @click="onReduction('count')"></text>
						
						<input type="tel" v-model="count" value="1" maxlength="8" class="red" :placeholder="'可买'+Canbuy+'股'" @input.stop="onInputCount">
						<text class="kuang iconfont icon-jia" @click="onIncrease('count')"></text>
					</view>
				</view>
				<view class="attr-number" v-if="BuyType === 2">
					<view class="tit">自填数量：</view>
					<view class="number">
						<text class="kuang iconfont icon-jian" @click="onReduction('count')"></text>
						<input type="tel" v-model="count" value="1" maxlength="8" class="red" 
						:placeholder="'可卖'+Cansell+'股'" 
						@input.stop="onInputCount">
						<text class="kuang iconfont icon-jia" @click="onIncrease('count')"></text>
					</view>
				</view>
			</view>
			<!-- 买卖档 -->
			<view class="goods-discounts">
				<view class="list">
					<view class="title br-red"><text>买盘档</text></view>
					<view class="title br-green"><text>卖盘档</text></view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs radius">
						<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
							<view class="margin-xs text-sm text-left">
								<text>买{{index+1}}</text>
							</view>
							<view class="margin-xs text-sm text-center" 
							:class="{'red':marketData[funbs('buy',index+1,'price')]>=Y}">
								<text>{{marketData[funbs('buy',index+1,'price')]}}</text>
							</view>
							<view class="margin-xs text-sm text-right">
								<text>{{marketData[funbs('buy',index+1,'amount')]}}</text>
							</view>
						</view>
					</view>
					<view class="flex-sub margin-xs radius">
						<view class="flex justify-between grid col-4" v-for="(item,index) in 5" :key="index">
							<view class="margin-xs text-sm text-left">
								<text>卖{{index+1}}</text>
							</view>
							<view class="margin-xs text-sm text-center" 
							:class="{'red':marketData[funbs('sell',index+1,'price')]>=Y}">
								<text>{{marketData[funbs('sell',index+1,'price')]}}</text>
							</view>
							<view class="margin-xs text-sm text-right">
								<text>{{marketData[funbs('sell',index+1,'amount')]}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="attr-btn">
				<view class="add-buy"  v-if="BuyType === 1" @click="onConfirm(BuyType)">确认买入</view>
				<view class="add-sell" v-if="BuyType === 2" @click="onConfirm(BuyType)">确认卖出</view>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				Y: '',//昨天收盘价
				T: '',//今天开盘价
				//id: '',
				token: '',
				isShow: false,
				price : '',//购股单价
				count : 0,//购股数量*100
				amount:'--',
				Canbuy : '',
				Cansell: '',
				PriceIndex: 0,//默认选择限价，即手动输入价格
				AttrIndex : '',
				BuyType: 1,// 购买类型
				index: null,//默认选项
				memberInfo:{},
				memberMoney:{},
				accountInfo:uni.getStorageSync('accountInfo'),
				accounId: '',
				accountList:[],
				sub_account:'',
				accountData:uni.getStorageSync('accountData'),
				marketData: {},
				posData:{//当前股票持仓数据
					count : '',
				},
				PriceList:[
						{
							index: 0,
							name: '限价'
						},{
							index: 1,
							name: '市价'
						}
					],
				AttrList:[
					{
						index: 0,
						size: '全仓'
					},{
						index: 1,
						size: '1/2'
					},{
						index: 2,
						size: '1/3'
					},{
						index: 3,
						size: '1/4'
					},
				],
			};
		},
		/**
		 * 显示 
		 * @param {Number} type 1 买入 2 卖出
		 */
		methods:{
			show(type,uid,token,data){
				this.token = token;
				this.marketData = data;
				this.BuyType = type;
				this.getMember(token);//加载会员信息
				if(!this.accountData){
					this.getSubAccount(token);//加载子账户信息
				}else{
					this.accountList = [];//先清空列表
					for(let i in this.accountData){
						this.accountList.push(this.accountData[i].sub_account);
					}
				}
				if(!this.accounId){
					//console.log(this.accountData);
					this.index = 0;//默认选第一个
					this.accounId = this.accountData[0].id;//默认获取第一个账号的信息
					//this.getacInfo(this.token,this.accounId);
				}
				if(this.BuyType==1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
					this.price = this.marketData.sell_one_price;
					this.count  = '';
					this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
				}else if(this.PriceIndex==1){
					this.price = '';
				}
				if(this.BuyType==2 && this.PriceIndex==0){//当点击卖出时，且为限价模式时
					this.price = this.marketData.buy_one_price;
					this.getcanSell(this.accounId,token)//获取持仓数据
				}else if(this.PriceIndex==1){
					this.price = '';
				}
				this.isShow = true;
			},
			/*获取会员信息*/
			async getMember(token){
				uni.request({
					url: this.apiServer+'/apicom/member',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.memberInfo  = res.data.data.info;
							this.memberMoney = res.data.data.money;
							//console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取交易账户信息*/
			async getSubAccount(token){
				uni.removeStorageSync('accountData');//清除子账户缓存数据
				uni.request({
					url: this.apiServer+'/market/index/getSubAccount',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token
					},
					success: res => {
						this.accountData = res.data.data;
						uni.setStorageSync('accountData' , this.accountData);//子账户数据储存缓存到本地
						if(!this.accounId){
							//console.log(this.accountData);
							this.index = 0;//默认选第一个
							this.accounId = this.accountData[0].id;//默认获取第一个账号的信息
							this.getacInfo(this.token,this.accounId);
							/*if(this.BuyType==2 && this.PriceIndex==0){//当点击卖出时，且为限价模式时
								this.getcanSell(this.accounId,token);//如果点击了卖出，则加载可卖数量
							}*/
						}
						this.accountList = [];//先清空列表
						for(let i in this.accountData){
							this.accountList.push(this.accountData[i].sub_account);
						}
						//console.log(this.accountList);
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取会员资金相关信息*/
			async getacInfo(token,id){
				if(token=='' || id==''){return;}
				uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/market/trade/account_info',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						id:    id,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.data.b_status!=1){
							this.getSubAccount(this.token);//获取子账号信息
						}
						if(res.data.status == 1){
							this.accountInfo  = res.data.data;
							this.count  = '';
							this.Canbuy = parseInt(this.accountInfo.avail/this.price);//计算可买股数
							if(this.BuyType === 2)this.getcanSell(id,token);
							//console.log(this.Canbuy);
						}
						
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取可卖数量*/
			async getcanSell(id,token){
				uni.request({
					url: this.apiServer+'/market/trade/canSellcount',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						id   : id,
						code : this.marketData.code,
					},
					success: res => {
						if(res.data.status == 1){
							this.Cansell = res.data.data<=0?0:res.data.data;
							//console.log(this.Cansell)
							//if(this.posData.count)this.getPosition(id,token);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			async getPosition(id,token){
				uni.request({
					url: this.apiServer+'/market/trade/position',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						id   : id,
					},
					success: res => {
						if(res.data.status == 1 && res.data.data.total>0){
							this.posData = res.data.data.list[0];
							console.log(this.posData);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			bindTimeChange: function(e) {//改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.count  = '';//数量框清零
				this.amount = '--';//总金额清零
				this.index = e.target.value;//将数组改变索引赋给定义的index变量
				this.accounId  = this.accountData[this.index].id;//将array【改变索引】的值赋给定义的picker变量
			    //console.log("account_info：",this.accounId);//输出获取的值
				this.getacInfo(this.token,this.accounId);
				if(this.BuyType==2 && this.PriceIndex==0){//当点击卖出时，且为限价模式时
					this.getcanSell(this.accounId,this.token);//如果点击了卖出，则加载可卖数量
				}
				//console.log("选择为：",this.borrow_id);//输出获取的值
			},
			hide(){
				this.isShow = false;
				this.PriceIndex = 0;
				this.AttrIndex = '';
				this.count  = '';
				this.amount = '--';
			},
			onStop(){
				
			},
			/*价格模式选择点击*/
			onPriceList(index){
				this.AttrIndex = '';
				this.count  = '';
				this.amount = '--';
				this.PriceIndex = index;//0为限价，1为市价
				if(this.BuyType==1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
					this.price = this.marketData.sell_one_price;
				}else if(this.PriceIndex==1){
					this.price = '';
				}
				if(this.BuyType==2 && this.PriceIndex==0){//当点击卖出时，且为限价模式时
					this.price = this.marketData.buy_one_price;
				}else if(this.PriceIndex==1){
					this.price = '';
				}
			},
			/*自动数量选择*/
			onAttrList(index){
				//console.log(index,this.AttrIndex)
				if(index===this.AttrIndex){ 
					this.AttrIndex = '';
					this.count  = '';
					this.amount = '--';
					return;
				}else{
					this.AttrIndex = index;
				}
				if(this.BuyType==1 && this.PriceIndex==0){//当点击买入时，且为限价模式时
					this.count  = parseInt(this.accountInfo.avail/this.price/100/(index+1))*100;//计算可买股数
				}
				if(this.BuyType==2){//当点击卖出时，且为限价模式时
					this.count  = parseInt(this.Cansell/100/(index+1))*100;//计算可卖股数
					//if(this.PriceIndex==0)this.amount = "--";//填入总价
				}
				this.amount = parseInt(this.price * this.count).toFixed(2);//填入总价
				//console.log(this.amount);
			},
			/*减号点击*/
			onReduction(modle){
				switch(modle){
					case 'price':
						var price = (parseFloat(this.price) - 0.01).toFixed(3);
						if(this.count <= 0)this.count = 100;
						var amount = parseFloat(price) * parseFloat(this.count);//计算总价
						this.price  = price;
						this.amount = amount.toFixed(2);//填入总价
						if(price <= 0){
							this.price  = 0;
							this.amount = 0;
						}
					break;
					case 'count':
						if(!this.count)this.count = 0;
						this.count = parseFloat(this.count) - 100;
						var amount = parseFloat(this.price) * parseFloat(this.count);//计算总价
						this.amount = amount.toFixed(2);//填入总价
						if(this.count < 0){
							this.count  = 0;
							this.amount = 0;
							return;
						}
					break;
				}
			},
			/*加号点击*/
			onIncrease(modle){
				switch(modle){
					case 'price':
						var price = (parseFloat(this.price) + 0.01).toFixed(3);
						if(this.count <= 0)this.count = 100;
						var amount = parseFloat(price) * parseFloat(this.count);//计算总价
						this.price  = price;
						this.amount = amount.toFixed(2);//填入总价
					break;
					case 'count':
						if(!this.count)this.count = 0;
						this.count = parseFloat(this.count) + 100;
						var amount = parseFloat(this.price) * parseFloat(this.count);//计算总价
						this.amount = amount.toFixed(2);//填入总价
					break;
				}
			},
			/*价格输入框变动函数*/
			onInputPrice(e){
				var price = parseFloat(e.target.value);
				if(price < 0)this.price = 0;
				var amount = parseFloat(price) * parseFloat(this.count);//计算总价
				if(amount <= this.accountInfo.avail){//如果总价小于余额
					if(price > 0)this.price  = price;
					if(amount> 0)this.amount = amount;//填入总价
				}else{
					this.amount = '--';//填入总价
				}
			},
			/*数量输入框变动函数*/
			onInputCount(e){
				var count = parseInt(e.target.value/100)*100;
				if(count < 0)this.count = 0;
				var amount = parseFloat(this.price) * parseFloat(count);//计算总价
				if(amount <= this.accountInfo.avail){//如果总价小于余额
					if(count > 0)this.count  = count;
					if(amount> 0)this.amount = amount;//填入总价
					if(count <= 0)this.amount = '--';
				}else{
					this.amount = '--';//填入总价
				}
			},
			/*确认点击*/
			onConfirm(type){
				if(type==1){
					var title = '买入';
					var fun   = 'buy';
				}
				if(type==2){
					var title = '卖出';
					var fun   = 'sell';
				}
				this.$refs['DialogBox'].confirm({
					title: title+'提示',
					content: '确定要'+title+this.marketData.name+'股票吗?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.showLoading({'title':"交易申请中"});
					uni.request({
						url: this.apiServer+'/market/trade/'+fun,
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							token: this.token,
							id   : this.accounId,
							model: this.PriceIndex+1,//原因是选中项是0开始计算的，二后端是从1开始计算的
							code : this.marketData.code,
							price: this.price,
							count: this.count,
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({title:res.data.message,icon:"none"});
						},
						fail:function(e){
							uni.showToast({title:"加载失败!",icon:"none"});
						}
					});
				})
			},
			funbs(a,n,o){
				switch(n){
					case 1:
						return a+'_one_'+o;
					break;
					case 2:
						return a+'_two_'+o;
					break;
					case 3:
						return a+'_three_'+o;
					break;
					case 4:
						return a+'_four_'+o;
					break;
					case 5:
						return a+'_five_'+o;
					break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'GoodsAttr.scss';
</style>
