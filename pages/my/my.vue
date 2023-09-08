<template>
	<view class="page">
		<view class="my-top">
			<!-- head -->
			<view class="head" :style="'background-color: rgb(222,74,41);'">
				<view class="title">
					<view class="zichan" @click="isZiChan = !isZiChan">
						<!-- v-show="scrollTop<20" -->
						<view style="color: #FFF;">
							资产状况
							<uni-icons :type="!isZiChan?'eye-slash':'eye'" size="18" :color="scrollTop>20?'#FFF':'#FFF'"></uni-icons>
						</view>
					</view>
				</view>
				<view class="setting-mess">
					<view class="setting" @click="onSetting">
						<uni-icons type="gear-filled" size="20" :color="scrollTop>20?'#FFF':'#FFF'"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		
		<uni-list>
			<uni-list-item showArrow link
				@click="onWallet('AccountInfo')"
				:title="(myMobile.substr(0,3)+'****'+myMobile.substr(7,11))" :note="memberInfo.agent_id == 1 ? '代理商' : '普通用户'" rightText="实名认证 修改密码"
				thumb="/static/touxiang.png"
				thumb-size="lg" />
		</uni-list>	
		
		<!-- 账户总资产、充值、提现 -->
		<view class="account-view uni-py-5 uni-px-5">
			<view>
				<view class="account-title">
					账户总资产
					<text class="title-tags">（沪深账户 + 指数账户）</text>
				</view>
				<view class="account-recharge">
					<!-- <text class="iconfont" :class="isPassword?'icon-xianshikejian':'icon-yincangbukejian'" @click="isPassword = !isPassword"></text> -->
					<text @click="isZiChan = !isZiChan" :class="isZiChan?'account-total show':'account-total hide'">{{calculate(memberMoney.total)}}</text>
					<text @click="isZiChan = !isZiChan" :class="isZiChan?'account-total hide':'account-total show'">******</text>
					<view class="recharge-button">
						<button @click="onWallet('wallet')" type="warn" size="mini">充值</button>
						<button @click="onWallet('Withdraw')" type="warn" size="mini">提现</button>
					</view>
				</view>
			</view>
		</view>
		<view class="line-after"><view class="line"></view></view>
		<!-- 宫格 -->
		<view class="lz-grid-t2">
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-fenhong" size="24" color="#FD4256"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">总资产</text>
					<text class="t2-text-2">{{calculate(memberMoney.total)}}</text>
				</view>
			</view>
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-keyongzijin" size="24" color="#2E97FC"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">可用资金</text>
					<text class="t2-text-2">{{memberMoney.account}}</text>
				</view>
			</view>
		</view>
		<view class="lz-grid-t2" style="margin-bottom: 20rpx;">
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-dongjiezijin" size="24" color="#FF7601"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">保证金</text>
					<text class="t2-text-2">{{calculate(memberMoney.bond_account)}}</text>
				</view>
			</view>
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-dongjiezijin" size="24" color="#FF7601"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">冻结资金</text>
					<text class="t2-text-2">{{calculate(memberMoney.freeze)}}</text>
				</view>
			</view>
		</view>
		<view class="lz-grid-t2" style="margin-bottom: 20rpx;">
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-dongjiezijin" size="24" color="#FF7601"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">管理费赠送</text>
					<text class="t2-text-2">{{calculate(memberMoney.give_fee)}}</text>
				</view>
			</view>
		</view>
		
		<view class="lz-grid-t2" v-if="1==0">
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-dongjiezijin" size="24" color="#FF7601"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">操盘资金</text>
					<text class="t2-text-2">{{memberMoney.operate_account}}</text>
				</view>
			</view>
			<view class="t2-row">
				<view class="t2-icon">
					<uni-icons custom-prefix="iconfont" type="icon-chicangyingkui" size="22" color="#FD4256"></uni-icons>
				</view>
				<view class="t2-text">
					<text class="t2-text-1">持仓总盈亏</text>
					<text class="t2-text-2">16023.15</text>
				</view>
			</view>
		</view>
		
		<uni-list style="margin-bottom: 20rpx;">
			<!-- :rightText="realname?'已实名':'未认证'" -->
			<uni-list-item title="实名认证" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'auth'}"
				@click="onWallet('realName')" />
			<uni-list-item title="银行卡" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'wallet'}"
				@click="onWallet('bankCard')" />
		</uni-list>
		
		<uni-list style="margin-bottom: 20rpx;">	
			<!-- 查看流水 充提账目 -->
			<uni-list-item title="资金明细" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'wallet-filled'}"
				rightText="查看流水 充值提现记录"
				@click="onWallet('moneylog')" />
			<!-- <uni-list-item title="充值记录" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'plus'}"
				 />
			<uni-list-item title="提现记录" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'minus'}"
				 /> -->
		</uni-list>
			
		<uni-list style="margin-bottom: 20rpx;">	
			<uni-list-item title="消息"  clickable showArrow link
				:rightText="memberInfo.msg_num?(memberInfo.msg_num+'条未读'):('')"
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'notification-filled'}"
				@click="onMessage" />
				 
			<uni-list-item title="推广赚钱" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'undo-filled'}"
				rightText="邀请好友 赚取佣金"
				@click="onWallet('MyShare')" />
				
			<uni-list-item title="配资管理" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'tune-filled'}"
				rightText="我的操盘 审核状态"
				@click="onWallet('peiziList')" />
			
			<uni-list-item title="代理中心" clickable showArrow link
				v-if="memberInfo.agent_id == 1" @click="onServer('agentInofo')"
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'auth'}" />		
		</uni-list>
			
		<uni-list style="margin-bottom: 20rpx;">				
			<uni-list-item title="帮助中心" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'help-filled'}"
				rightText="如何申请配资和充值入金···"
				@click="onHelp" />
				
			<!-- <uni-list-item title="在线客服" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'chatboxes-filled'}"
				@click="onServer('onlinekefu')" />
				
			<uni-list-item title="意见反馈" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'mail-open-filled'}"
				@click="onServer('feedback')" /> -->
				
			<uni-list-item title="服务热线" clickable showArrow link
				:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'phone-filled'}"
				@click="onServer('serve')" />
				
		</uni-list>
		
		
		
		
		
		
		
		<!-- 客服热线 -->
		<view class="serve-hotline" @click="isHotline = false">
			<view class="cu-modal bottom-modal" :class="{'show':isHotline}">
			  <view class="cu-dialog">
					<view class="contact-list">
						<view class="list">
							<text>呼叫客服</text>
						</view>
						<view class="list">
							<text class="text-gray" @click="makeCall(confData.kfphone)">{{confData.kfphone}}</text>
						</view>
						<view class="list">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- tabbar -->
		<TabBar :tabBarShow="4"></TabBar>
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
				token    : '',
				scrollTop: 0,
				isHotline: false,
				myMobile : '',
				memberInfo : {},
				memberMoney: {},
				goodsList  : [],
				confData   : uni.getStorageSync('confData'),
				isZiChan: false,
			};
		},
		onShow() {
			this.getMember(this.token);
		},
		onLoad(){
			_self = this;
			loginRes = _self.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.myMobile = loginRes[1];
			this.token    = loginRes[2];
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
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
							//console.log(res.data.data);
							this.memberInfo  = res.data.data.info;
							this.memberMoney = res.data.data.money;
						}
					},
					complete:function(){
					    uni.stopPullDownRefresh();
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
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
			/*配资、资金明细跳转，钱包跳转点击*/
			onWallet(type){
				switch (type){
					case 'peiziList':
						uni.navigateTo({
							url: '/pages/AfterSalesOrder/AfterSalesOrder',
						})
						break;
					case 'moneylog':
						uni.navigateTo({
							url: '/pages/MoneyLog/MoneyLog',
						})
						break;
					case 'wallet':
						uni.navigateTo({
							url: '/pages/MyWallet/MyWallet',
						})
						break;
					case 'Withdraw':
						uni.navigateTo({
							url: '/pages/Withdraw/Withdraw',
						})
						break;
					case 'MyShare':
						uni.navigateTo({
							url: '/pages/MyShare/MyShare',
						})
						break;
					case 'AccountInfo':
						uni.navigateTo({
							url: '/pages/AccountInfo/AccountInfo',
						})
						break;
					case 'bankCard':
						uni.navigateTo({
							url: '/pages/AddressList/AddressList',
						})
						break;
					case 'realName':
						uni.navigateTo({
							url: '/pages/realName/realName',
						})
						break;
				}
			},
			/*我的服务点击*/
			onServer(type){
				switch (type){
					case 'feedback':
						uni.navigateTo({
							url: '/pages/Feedback/Feedback'
						})
						break;
					case 'onlinekefu':
						uni.navigateTo({
							url: '/pages/WebOnline/WebOnline'
						})
						break;
					case 'serve':
						this.isHotline = true;
						break;
					case 'agentInofo':
						uni.navigateTo({
							url: '/pages/Agents/Agents',
						})
						break;
				}
			},
			/*设置点击*/
			onSetting(){
				uni.navigateTo({
					url: '/pages/Setting/Setting'
				})
			},
			/*消息点击*/
			onMessage(){
				uni.navigateTo({
					url: '/pages/NotificationMessage/NotificationMessage'
				})
			},
			/**
			 * 会员点击
			 */
			onHelp(){
				uni.navigateTo({
					url: '/pages/Help/Help?id=9&page=1',
				})
			},
			gologin(){
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			makeCall(number){
				// #ifdef APP-PLUS
				uni.makePhoneCall({
				    phoneNumber: number //电话号码
				});
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';
</style>
