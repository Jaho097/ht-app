<template>
	<view class="page">
		<!-- 支付方式 -->
		<view class="payment-way">
			<view class="title">
				<text>充值方式</text>
			</view>
			<view class="btn" @click="isPayWay = true">
				<view class="code">
					<image v-if="item.bank_name" :src="getIcon(item.bank_name)" mode=""></image>
				</view>
				<text class="text">{{item.bank_name}}</text>
				<text class="tag">{{item.notes}}</text>
			</view>
			<view class="more" @click="isPayWay = true">
				<uni-icons custom-prefix="iconfont" type="icon-huhuan" size="16" color="#959595"></uni-icons>
			</view>
		</view>
		<view class="card-data">
			<!-- 充值金额 -->
			<view class="balance-data">
				<view class="title">
					<text>充值金额</text>
				</view>
				<view class="data">
					<text class="price">￥</text>
					<input type="number" class="number" v-model="Money">
				</view>
			</view>
		</view>
		<view class="card-data">	
			<!-- 付款码 -->
			<view class="payment-code">
				<view class="number" v-if="item.card">
					<text class="left">收款账户：</text>
					<text class="mid">{{item.card}}</text>
					<text class="right" @click.stop="onCopy(item.card)">复制</text>
				</view>
				<view class="number" v-if="item.payee">
					<text class="left">账户姓名：</text>
					<text class="mid">{{item.payee}}</text>
					<text class="right" @click.stop="onCopy(item.payee)">复制</text>
				</view>
				<view class="number" v-if="item.open_bank">
					<text class="left">银行地址：</text>
					<text class="mid">{{item.open_bank}}</text>
					<text class="right" @click.stop="onCopy(item.open_bank)">复制</text>
				</view>
				<view class="code" v-if="item.image">
					<image :src="item.image" @longpress="savePhoto(item.image)"></image>
				</view>
				<view class="hint" v-if="item.image">
					<text>长按保存二维码到本地</text>
				</view>
			</view>
			<!-- 转账账户 -->
			<view class="balance-name">
				<view class="title">
					<text>请填写转账用户名</text>
				</view>
				<view class="data">
					<input type="text" :class="{'name':Name}" v-model="Name" placeholder="请输入本次转账用户名">
				</view>
			</view>
		</view>
		<view class="pay-bottom"></view>
		<view class="quit-login" :style="Submit?'opacity:1':'opacity:0.4'" @click="Submit?onSubmit():''">
			<text>已转账成功，提交充值申请</text>
		</view>
		<!-- 支付方式选择窗口 -->
		<view class="pay-way-win" @click="isPayWay = false">
			<view class="cu-modal bottom-modal" :class="{'show':isPayWay}">
			  <view class="cu-dialog">
			    <view class="pay-list">
						<view class="list" v-for="(item,index) in account" :key="index" @click.stop="onPayWay(index)">
							<view class="pay">
								<image :src="getIcon(item.bank_name)" mode=""></image>
								<text>{{item.bank_name}}</text>
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
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				account :[],
				kftime  : '',
				item    : 0,
				isPayWay: false,
				PayWay  : 0,
				Money : '',//金额
				Name  : '',
				token : '',
				Submit : true,
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
					url: this.apiServer+'/apicom/Recharge/editCharge',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.account = res.data.data.account; 
							this.item    = res.data.data.account[0];//默认选择第一项
							this.PayWay  = res.data.data.account[0].id;//默认选择第一项的ID
							this.kftime  = res.data.data.kftime;//客服在线时间
							//console.log(this.kftime);
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
			/*提交充值点击*/
			onSubmit(){
				if(this.isReal!=2){
					uni.showToast({title:"请先完成实名认证",icon:"none"});
					return;
				}
				if(!this.item.card){
					uni.showToast({title:"请选择充值方式",icon:"none"});
					return;
				}
				if(!this.Money){
					uni.showToast({title:"请填写充值金额",icon:"none"});
					return;
				}
				if(!this.Name){
					uni.showToast({title:"请填写转账账户",icon:"none"});
					return;
				}
				//if((this.Money%100)!=0){
				//	uni.showToast({title:"充值金额需要为100的倍数",icon:"none"});
				//	return;					
				//}
				//console.log("提交的数据：",this.form);
				uni.request({
					url: this.apiServer+'/apicom/Recharge/doCharge',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						cardno    : this.item.card,
						form_name : this.Name,
						money     : this.Money,
						token     : this.token,
						transfer  : 'transfer',
					},
					success: res => {
						if(res.data.status == 1){
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
			savePhoto(url) {
			    // 先下载图片
			    uni.downloadFile({
			        url,
			        success: (res) => {
			          // 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({title: "保存成功！",});
							},
							fail: () => {
								uni.showToast({title: "保存失败",icon:"none"});
							},
						});
			        },
			    });
			},
			/**
			 * 支付方式选择点击
			 * @param {Number} type 0 余额 1 微信 2 支付宝
			 */
			onPayWay(i){
				this.item   = this.account[i];
				this.PayWay = this.account[i].id;				
				this.isPayWay = false;
				console.log(this.item)
			},
			getIcon(str){
				if(str.indexOf("银行") != -1){
					var img = '/static/bank_pay.png';
				}else if(str.indexOf("微信") != -1){
					var img = '/static/wx_pay.png';
				}else if(str.indexOf("支付宝") != -1){
					var img = '/static/zfb_pay.png';
				}else{
					var img = '/static/ye_pay.png';
				}
				return img;
			},
			onCopy(value) {
				uniCopy({
					content:value,
					success:(res)=>{
						uni.showToast({title: "复制成功"});
					},
					error:(e)=>{
						uni.showToast({title: e,icon: 'none',duration:3000,})
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyWallet.scss';
</style>
