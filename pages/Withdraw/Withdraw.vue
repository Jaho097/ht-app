<template>
	<view class="page">
		<!-- 支付方式 -->
		<view class="payment-way">
			<view class="title">
				<text>到账方式</text>
			</view>
			<view class="btn" @click="isPayWay = true">
				<view class="code">
					<image v-if="item.bank" :src="getIcon(item.bank)" mode=""></image>
				</view>
				<text class="text">{{findBank(item.bank)}}</text>
				<text class="tag">{{kftime}}</text>
			</view>
			<view class="more" @click="isPayWay = true">
				<text class="iconfont icon-more"></text>
			</view>
		</view>
		<view class="payment-card"><text class="tag" v-if="item.bank">{{getCode(item.bank,item.card)}}</text></view>
		<view class="card-data">
			<!-- 提现金额 -->
			<view class="balance-data">
				<view class="title">
					<text>提现金额</text>
				</view>
				<view class="data">
					<text class="price">￥</text>
					<input type="number" class="number" v-model="Money">
				</view>
				<view class="hint">
					<text class="text">可提余额：{{moneyArr.account}}</text>
					<text class="blue" @click="copyNuber(moneyArr.account)">全部提现</text>
				</view>
			</view>
			<!-- 支付密码 -->
			<view class="balance-name">
				<view class="title">
					<text>请输入支付密码</text>
				</view>
				<view class="data">
					<input :password='!isPassword' class="name" v-model="paywd">
					<text class="iconfont" :class="isPassword?'icon-eye-on':'icon-eye-off'" @click="isPassword = !isPassword"></text>
				</view>
			</view>
		</view>
		<view class="pay-bottom"></view>
		<view class="quit-login" :style="Submit?'opacity:1':'opacity:0.4'" @click="Submit?onSubmit():''">
			<text>确认提现</text>
		</view>
		<!-- 支付方式选择窗口 -->
		<view class="pay-way-win" @click="isPayWay = false">
			<view class="cu-modal bottom-modal" :class="{'show':isPayWay}">
			  <view class="cu-dialog">
			    <view class="pay-list">
						<view class="list" v-for="(item,index) in banks" :key="index" @click.stop="onPayWay(index)">
							<view class="pay">
								<image :src="getIcon(item.bank)" mode=""></image>
								<text v-if="item.bank">{{findBank(item.bank)}}|{{getCode(item.bank,item.card)}}</text>
							</view>
							<view class="check">
								<text class="iconfont" :class="PayWay===item.id?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
					</view>
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
				banks :[],
				bankList : {},
				item    : 0,
				isPayWay: false,
				PayWay  : 0,
				Money : '',//金额
				paywd : '',
				token : '',
				Submit : true,
				isPassword: false,
				moneyArr :{},
				kftime: '',
				isReal: false,
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.getUserInfo(loginRes[2]);
		},
		methods:{
			async getUserInfo(token){
				uni.showLoading({'title':"检测实名..."});
				uni.request({
					url: this.apiServer+'/apicom/member/userInfo',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token : token,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status == 1){
							var userInfo = res.data.data;
							if(userInfo.id_card=='' && userInfo.name==''){
								this.isReal = 0;//未认证
							}
							if(userInfo.id_card!='' && userInfo.name!='' && userInfo.id_auth==0){
								this.isReal = 1;//待审核
							}
							if(userInfo.id_card!='' && userInfo.name!='' && userInfo.id_auth==1){
								this.isReal = 2;//已认证
							}
							if(this.isReal==2){
								uni.showLoading({'title':"已实名认证"});
								this.getRecharge(token);
								uni.hideLoading();
							}else{
								uni.showToast({title:"请先完成实名认证",icon:"none"});
								setTimeout(function(){
									uni.navigateTo({url: '/pages/realName/realName'});
								}, 1000);
							}
						}
					}
				});
			},
			async getRecharge(token){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/apicom/Withdraw',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.banks    = res.data.data.banks; 
							this.item     = res.data.data.default_bank;//默认选择第一项
							this.PayWay   = res.data.data.default_bank.id;//默认选择第一项的ID
							this.bankList = res.data.data.bankSetting;//系统提现银行列表
							this.moneyArr = res.data.data.money;//账户金额数据
							this.kftime   = res.data.data.kftime;//客服在线时间
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
			/*提交提现点击*/
			onSubmit(){
				if(this.isReal!=2){
					uni.showToast({title:"请先完成实名认证",icon:"none"});
					return;
				}
				if(!this.item.id){
					uni.showToast({title:"请选择提现账户",icon:"none"});
					return;
				}
				if(!this.Money){
					uni.showToast({title:"请填写提现金额",icon:"none"});
					return;
				}
				if(!this.paywd){
					uni.showToast({title:"请填写支付密码",icon:"none"});
					return;
				}
				if(parseInt(this.moneyArr.account)<parseInt(this.Money)){
					uni.showToast({title:"账户可用余额不够",icon:"none"});
					return;
				}
				//if((this.Money%100)!=0){
				//	uni.showToast({title:"提现金额需要为100的倍数",icon:"none"});
				//	return;					
				//}
				
				uni.request({
					url: this.apiServer+'/apicom/withdraw/doWithdraw',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						bank_id : this.item.id,
						paywd   : this.paywd,
						money   : this.Money,
						token   : this.token,
					},
					success: res => {
						if(res.data.status == 1){
							this.Submit = false;//提交成功后按钮失效
							uni.showToast({title:res.data.message,duration:2500,icon:"none"});
							this.Submit = false;
							setTimeout(function () {
								uni.navigateBack(); 
							}, 3000);
						}else{
							uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			//查询对应的银行名称
			findBank(bank){
				var arr = this.bankList;
				for (let key in arr) {
					if(bank == key) return arr[key];
				}
			},
			/**
			 * 支付方式选择点击
			 * @param {Number} type 0 余额 1 微信 2 支付宝
			 */
			onPayWay(i){
				this.item   = this.banks[i];
				this.PayWay = this.banks[i].id;				
				this.isPayWay = false;
				//console.log(this.item)
			},
			getIcon(str){
				if(str.indexOf("WX") != -1){
					var img = '/static/wx_pay.png';
				}else if(str.indexOf("ZFB") != -1){
					var img = '/static/zfb_pay.png';
				}else{
					var img = '/static/bank_pay.png';
				}
				return img;
			},
			onCopy(value) {
				uni.setClipboardData({
					data: value
				});
				uni.showToast({'title':"复制成功！"});
			},
			copyNuber(value){
				this.Money = parseInt(value);
			},
			getCode(bank,str){
				if(bank.indexOf("WX") != -1 || bank.indexOf("ZFB") != -1){
					return str;
				}else{
					str = str.replace(/\s*/g,"");
					str = str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
					return str;
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Withdraw.scss';
</style>
