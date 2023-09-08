<template>
	<view class="page">	
		
		<view class="my-top" style="padding-top: 0;">
			
			<!-- 旧代码 -->
			<!-- head -->
			<!-- 用户信息 -->
			<view class="head-navbar">
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
			
			
			<!-- 子账号信息 -->
			<view class="focus-area">
				<view class="list">
					<view class="num">
						<text style="font-size: 60rpx;line-height: normal;font-weight:normal;">{{''+calculate(accountInfo.total_money)}}</text>
					</view>
					<view class="title">
						<text>账户资产(元)</text>
					</view>
				</view>
				<!-- <view class="list">
					<view class="num">
						<text>{{''+calculate(accountInfo.return_money)}}</text>
					</view>
					<view class="title">
						<text>预计盈亏</text>
					</view>
				</view> -->
			</view>
			<!-- 黑色资金信息 -->
			<view class="vip-info">
				<view class="vip">
					<view class="title">
						<text>持仓市值</text>
					</view>
					<view class="num">
						<text>{{''+calculate(accountInfo.market_value)}}</text>
					</view>
				</view>
				<view class="vip bdrlr">
					<view class="title">
						<text>可用金额</text>
					</view>
					<view class="num">
						<text>{{''+calculate(accountInfo.avail)}}</text>
					</view>
				</view>
				<view class="vip">
					<view class="title">
						<text>冻结金额</text>
					</view>
					<view class="num">
						<text>{{''+calculate(accountInfo.freeze_amount)}}</text>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="list" @click="onSkipOrder(1)">
				<view class="icon">
					<text class="iconfont icon-daifukuan"></text>
					<!--text class="num"></text-->
				</view>
				<view class="title">
					<text>持仓</text>
				</view>
			</view>
			<!--view class="list" @click="onSkipOrder(2)">
				<view class="icon">
					<text class="iconfont icon-tuikuan"></text>
					<text class="num"></text>
				</view>
				<view class="title">
					<text>撤单</text>
				</view>
			</view-->
			<view class="list" @click="onSkipOrder(3)">
				<view class="icon">
					<text class="iconfont icon-daipingjia"></text>
					<!-- <text class="iconfont icon-weituo1"></text> -->
					<!--text class="num"></text-->
				</view>
				<view class="title">
					<text>委托</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(4)">
				<view class="icon">
					<text class="iconfont icon-daifahuo"></text>
					<!--text class="num"></text-->
				</view>
				<view class="title">
					<text>成交</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(5)">
				<view class="icon">
					<text class="iconfont icon-daifahuo"></text>
					<!--text class="num"></text-->
				</view>
				<view class="title">
					<text>交割</text>
				</view>
			</view>
		</view>
		<!-- 设置 -->
		<view class="my-service">
			<uni-list>
				<!-- <uni-list-item showArrow link
					@click="onUserInfo"
					:note="(myMobile.substr(0,3))+'****'+(myMobile.substr(7,11))"
					thumb="/static/touxiang.png"
					thumb-size="lg" /> -->
					
				<!-- <uni-list-item 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'refresh-filled'}"
					title="预计盈亏" :rightText="''+calculate(accountInfo.return_money)"/> -->
					
				<uni-list-item showArrow link 
					v-if="myMobile"
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'refresh-filled'}"
					@click="subwin = true" 
					title="交易账户" :rightText="sub_account||'选择操盘账户'"/>					
				<uni-list-item showArrow link 
					v-else 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'undo-filled'}"
					@click="onUserInfo"
					title="交易账户" rightText="先去登录/注册"/>
					
					
				<uni-list-item showArrow link 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'circle-filled'}"
					@click="onWarnTip(1)" 
					title="预警线" :rightText="''+calculate(accountInfo.loss_warn_money)"/>
				
				<uni-list-item showArrow link 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'circle-filled'}"
					@click="onWarnTip(2)" 
					title="平仓线" :rightText="''+calculate(accountInfo.loss_close_money)"/>
					
				<uni-list-item 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'calendar-filled'}"
					title="配资模式" :rightText="accountInfo.typeName"/>
					
				<uni-list-item 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'notification-filled'}"
					 title="到期时间" :rightText="accountInfo.end_time"/>
				
				<!--type = 1:天；2:周；3:月；5:免息-->
				<!--view class="service-list" v-if="accountInfo.type < 4">
					<view class="title">
						<text>自动续期</text>
					</view>
					<view class="switch-setting">
						<switch class="red sm" color="red !important" :checked="treatmentStatu.checked" @change="switchChange"></switch>
					</view>
				</view-->
				
				
				<uni-list-item showArrow link
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'redo-filled'}"
					@click="accountInfo.borrow_id?goDetails(token,accountInfo.borrow_id):''" 
					title="我的操盘" rightText="进入设置"/>
			
			
			</uni-list>
		</view>
		<!-- 预警，平仓警告弹窗 -->
		<view class="serve-hotline" @click="isHotline = false">
			<view class="cu-modal bottom-modal" :class="{'show':isHotline}">
			  <view class="cu-dialog">
					<view class="contact-list">
						<view class="list">
							<text>{{isHotTitle}}</text>
						</view>
						<view class="list">
							<text style="color: #959595;">{{isHotText}}</text>
						</view>
						<view class="list">
							<text>取消</text>
						</view>
					</view>
				</view>
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
								<text class="iconfont" :class="accounId===item.id?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
					</view>
			  </view>
			</view>
		</view>
		<!-- tabbar -->
		<TabBar :tabBarShow="3"></TabBar>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	import TabBar from '../../components/TabBar/TabBar.vue';
	export default {
		components:{
			TabBar,
		},
		data() {
			return {
				scrollTop   : 0,
				subwin      : false,
				isHotline   : false,
				isHotTitle  : '',
				isHotText   : '',
				token       : '',
				index       : null,
				myMobile    : '',
				isChecked   : false,
				memberMoney : {},
				accountInfo : {},
				accounId    : uni.getStorageSync('accounId')||'',
				sub_account : uni.getStorageSync('sub_account')||'',
				accountData : [],
				treatmentStatu : { checked: false },
			};
		},
		onLoad(){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			//this.getMember(this.token);
			this.getSubAccount(this.token);//获取子账号信息
		},
		onShow() {
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			this.getSubAccount(this.token);//获取子账号信息
			this.accounId    = uni.getStorageSync('accounId');
			this.sub_account = uni.getStorageSync('sub_account');
			this.getacInfo(this.token,this.accounId);
			console.log(this.accounId,this.sub_account)
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
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
							console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取交易账户信息*/
			async getSubAccount(token){
				this.accountData = '';
				uni.showLoading({'title':"更新账户列表中"});
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
						uni.hideLoading();
						if(res.data.status == 1&&res.data.data.length != 0){
							this.accountData = res.data.data;
							uni.setStorageSync('accountData' , this.accountData);//子账户数据储存缓存到本地
							this.accounId = this.accountData[0].id;//默认获取第一个账号的信息
							this.getacInfo(this.token,this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account' , this.sub_account);
				uni.setStorageSync('accounId' , this.accounId);
				uni.setStorageSync('sub_account' , this.sub_account);
				this.subwin = false;
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
				uni.hideLoading();
			},
			/*获取会员资金相关信息*/
			async getacInfo(token,id){
				if(token=='' || id==''){return;}
				uni.removeStorageSync('accountInfo');//清除子账户缓存数据
				uni.request({
					url: this.apiServer+'/market/trade/account_info',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{token: token,id: id,},
					success: res => {
						if(res.data.status == 1){
							this.accountInfo  = res.data.data;
							/*if(res.data.data.b_status!=1){
								this.getSubAccount(this.token);//获取子账号信息
							}*/
							if(res.data.data.renewal==1){
								this.$set(this.treatmentStatu, 'checked', true)
							}else{
								this.$set(this.treatmentStatu, 'checked', false)
							}
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					},
					complete: res => {
						if(this.accountInfo.type == 1)this.accountInfo.typeName = '按天配资';
						if(this.accountInfo.type == 2)this.accountInfo.typeName = '按周配资';
						if(this.accountInfo.type == 3)this.accountInfo.typeName = '按月配资';
						if(this.accountInfo.type == 5)this.accountInfo.typeName = '免息配资';
						uni.setStorageSync('accountInfo' , res.data.data);//子账户数据储存缓存到本地
					}
				});
			},
			onSubwin(i){
				/*if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}*/
				this.accounId    = this.accountData[i].id;//将array【改变索引】的值赋给定义的picker变量
				this.sub_account = this.accountData[i].sub_account;
				uni.setStorageSync('accounId' , this.accounId);
				uni.setStorageSync('sub_account' , this.sub_account);
				this.subwin = false;
				this.getacInfo(this.token,this.accounId);
				
			},
			/*自动续期按钮*/
			/*switchChange (e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value)   // 将点击改变的状态赋给treatmentStatu.checked
				uni.request({
					url: this.apiServer+'/apicom/financing/autorenewal',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : this.accountInfo.borrow_id,
						token: this.token
					},
					success: res => {
						if(res.data.status != 1){
							//this.renewal  = res.data.data;
							that.$set(that.treatmentStatu, 'checked', false)  // 手动修改switch的状态，视图会同步更新
							console.log(res.data.message);
						}else{
							that.$emit('changePage', 1)
							console.log(res.data.message);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},*/
			/*计算单位*/
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
			goDetails(token,id){
				if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}else{
					uni.navigateTo({
						url: '/pages/AccoutSet/AccoutSet?token='+token+'&id='+id,
					})
				}
			},
			/*查询订单*/
			onSkipOrder(type){
				if(!this.accounId){
					uni.showToast({title:"请先申请配资!",icon:"none"});
					return;
				}else{
					uni.navigateTo({
						url: '/pages/MyOrderList/MyOrderList?type=' + type,
					})
				}
			},
			/**
			* 跳转点击
			* @param {String} type 跳转类型
			*/
			onWarnTip(type){
				this.isHotline = true;
				switch (type){
					case 1:
						this.isHotTitle = '警戒线提示';
						this.isHotText = '总操盘资金低于预警线后，该账号禁止继续买入股票';
				  	break;
					case 2:
						this.isHotTitle = '平仓线提示';
						this.isHotText = '总操盘资金低于平仓线后，持仓股票将会被强制平仓';
					break;
				}
			},
			/**
			* 用户信息点击
			* @param {Number} type
			*/
			onUserInfo(){
				uni.navigateTo({
				  url: '/pages/login/login'
				})
			},
			/*onWarnTip(i){
				if(i==1){
					var title = '警戒线';
					var content = '总操盘资金低于预警线后，该账号禁止继续买入股票';
				}
				if(i==2){
					var title = '平仓线';
					var content = '总操盘资金低于平仓线后，持仓股票将会被强制平仓';
				}
				this.$refs['DialogBox'].confirm({
					title: title,
					content: content,
					DialogType: 'inquiry',
					Cancel: 'none',
					animation: 0
				})
			}*/
		}
	}
</script>

<style scoped lang="scss">
	@import 'Account.scss';

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
		width: 100%;
	}
	.tabsbtn-box{width: 65%;text-align: center;display: flex;}
//顶部导航栏
.my-top{padding-top: 0;}
.head-navbar{display: flex;color: #FFF;height: 88rpx;}
.head-navbar .nav-title,.head-navbar .nav-btnbox{flex: 1;padding: 0 10rpx;}
.head-navbar .nav-title{text-align: right;line-height: 88rpx;font-weight: 600;font-size: 32rpx;}
.head-navbar .nav-btnbox{text-align: left;display: flex;align-items: center;font-size: 28rpx;}
.head-navbar .nav-btn{padding: 0 20rpx;border: #FFF 1px solid;border-radius: 10rpx;}
// 账户总余额
.my-top .focus-area{height: auto;padding-top:60rpx;}
/*三宫格*/ 
.my-top .vip-info{height: auto;padding:40rpx 0;background:none!important;}
.bdrlr{border-left: #e5e5e5 1px solid;border-right: #e5e5e5 1px solid;}
.my-top .vip-info .vip uni-text{color: #FFF;}

</style>
