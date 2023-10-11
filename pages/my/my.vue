<template>
	<view class="sc-bdVaJa crYbem page-v2-mine">
		<div class="bg-container-banner-bg"
			style="background: url(/static/banner.png) center top / cover, linear-gradient(rgb(252, 237, 195) 0%, rgb(243, 214, 157) 73.96%, rgb(247, 251, 254) 100%); height: 0px; padding-bottom: 84.2667%;">
		</div>
		<div class="cahtIg">
			个人中心
			<button class="gDdAqR" @click="onMessage"></button>
		</div>
		<div class="bg-container-content">
			<div class="sc-gGBfsJ fjxMiP">
				<div class="sc-jnlKLf iaaSFu">
					<div class="sc-fYxtnH eREmZu"
						style="background-image: url(/static/default-avatar.png);">
					</div>
					<div class="sc-tilXH eoRrom">{{(myMobile.substr(0,3)+'****'+myMobile.substr(7,11))}}</div>
				</div>
			</div>
			<div class="sc-kUaPvJ dicxJg">
				<div class="sc-giadOv aGiEE">
					<div class="sc-VJcYb fHanUi">{{calculate(memberMoney.total)}}</div>
					<div class="sc-fONwsr eTjCoM">账户资金</div>
				</div>
				<div class="sc-giadOv aGiEE">
					<div class="sc-VJcYb fHanUi">{{calculate(memberMoney.bond_account)}}</div>
					<div class="sc-fONwsr eTjCoM">保证金</div>
				</div>
				<div class="sc-giadOv aGiEE">
					<div class="sc-VJcYb fHanUi">{{calculate(memberMoney.freeze)}}</div>
					<div class="sc-fONwsr eTjCoM">冻结金额</div>
				</div>
			</div>
			<div class="am-card page-module-card" style="margin-top: 24px; padding: 20px;">
				<div class="sc-gxMtzJ iTMaeS">
					<div class="sc-dfVpRl jkskzy">
						<div class="account-title">账户余额</div>
						<div class="account-num">{{memberMoney.account}}</div>
					</div>
					<div class="sc-dfVpRl jkskzy">
						<div class="account-title">赠送管理费</div>
						<div class="account-num">{{calculate(memberMoney.give_fee)}}</div>
					</div>
				</div>
				<div class="sc-gxMtzJ iTMaeS">
					<button class="sc-gzOgki evosKq primary" @click="onWallet('wallet')">充值</button>
					<button class="sc-gzOgki evosKq" @click="onWallet('Withdraw')">提现</button>
				</div>
			</div>
			<div class="am-card page-module-card" style="padding: 28px 12px;">
				<div class="sc-ipXKqB kYkBnh">
					<a class="sc-hmXxxW fhbwkm" @click="onWallet('AccountInfo')">
						<div class="list-icon"
							style="background-image: url(static/icon-userinfo.png);">
						</div>账户资料
					</a>
					<a class="sc-hmXxxW fhbwkm" @click="onWallet('peiziList')">
						<div class="list-icon"
							style="background-image: url(static/icon-manage.png);">
						</div>配资管理
					</a>
					<a class="sc-hmXxxW fhbwkm" @click="onWallet('moneylog')">
						<div class="list-icon"
							style="background-image: url(static/icon-amount.png);">
						</div>资金明细
					</a>
					<a class="sc-hmXxxW fhbwkm" @click="onWallet('MyShare')">
						<div class="list-icon"
							style="background-image: url(static/icon-promotion.png);">
						</div>推广赚钱
					</a>
				</div>
				<a class="sc-cqCuEk jIbFUK" @click="onWallet('MyShare')">
					<div class="text-left">目前已推广 <span class="text-bold">{{ConfData.count_m}}</span> 人</div>
					<div class="text-right">继续推广获取更多</div>
					<span class="arrow-icon" style="background-image: url(static/icon-promotion-arrow.png);"></span>
				</a>
			</div>
			<div class="am-card page-module-card" style="padding: 0px 12px;">
				<div class="sc-dliRfk dudAkF" @click="onHelp">
					<span class="icon left-icon" style="background-image: url(/static/icon-list-help.svg);"></span>
					<span class="title">帮助中心</span>
					<span class="icon" style="background-image: url(/static/icon-list-arrow.svg);"></span>
				</div>
				<div class="sc-dliRfk dudAkF" @click="onGuide">
					<span class="icon left-icon"
						style="background-image: url(/static/icon-list-contact.svg);"></span>
						<span
						class="title">新手指南</span>
						<span class="icon" style="background-image: url(/static/icon-list-arrow.svg);"></span>
					</div>
					<div class="sc-dliRfk dudAkF" @click="onServer('onlinekefu')">
						<span class="icon left-icon"
						style="background-image: url(/static/icon-list-phone.svg);"></span><span
						class="title">投诉建议</span>
						<span class="icon" style="background-image: url(/static/icon-list-arrow.svg);"></span>
					</div>
			</div>
		</div>
		<!-- tabbar -->
		<TabBar :tabBarShow="4"></TabBar>
		
		<!-- 退出 -->
		<view class="uni-py-10 uni-px-8 layout">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="onQuitLogin">退出登录</button>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self, loginRes;
	import TabBar from '../../components/TabBar/TabBar.vue';
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				token: '',
				scrollTop: 0,
				isHotline: false,
				myMobile: '',
				memberInfo: {},
				memberMoney: {},
				goodsList: [],
				confData: uni.getStorageSync('confData'),
				isZiChan: false,
				ConfData: [],
			};
		},
		onShow() {
			this.getMember(this.token);
		},
		onLoad() {
			_self = this;
			loginRes = _self.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.myMobile = loginRes[1];
			this.token = loginRes[2];
			this.getConf(loginRes[2]);
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/**
			 * 退出点击
			 */
			onQuitLogin(){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要退出登录?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.clearStorageSync();
					/*uni.removeStorageSync('UID');//清除账号ID
					uni.removeStorageSync('MOBILE');//清除账号
					uni.removeStorageSync('TOKEN');//清除TOKEN
					uni.removeStorageSync('accountData');//清除子账户缓存数据*/
					setTimeout(function(){
						uni.reLaunch({url: '/pages/login/login'});
					}, 1000);
					//uni.navigateBack();
				})
			},
			async getConf(token) {
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer + '/apicom/Invite/conf',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 50000,
					data: {
						token: token
					},
					success: res => {
						if (res.data.status == 1) {
							this.ConfData = res.data.data;
						}
					},
					complete: function() {
						//uni.stopPullDownRefresh();
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
			async getMember(token) {
				uni.request({
					url: this.apiServer + '/apicom/member',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						if (res.data.status == 1) {
							console.log(res.data.data);
							this.memberInfo = res.data.data.info;
							this.memberMoney = res.data.data.money;
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
			},
			/*计算单位*/
			calculate(number) {
				number = parseInt(number);
				if (number == 0 || !number) return 0;
				if (number.toString().length >= 13) {
					var unit = (number / 1000000000000).toFixed(2);
					return unit + '万亿';
				} else if (number.toString().length >= 9) {
					var unit = (number / 100000000).toFixed(2);
					return unit + '亿';
				} else if (number.toString().length > 4) {
					var unit = (number / 10000).toFixed(2);
					return unit + '万';
				} else {
					var unit = number.toFixed(2);
					return unit;
				}
			},
			/*配资、资金明细跳转，钱包跳转点击*/
			onWallet(type) {
				switch (type) {
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
							url: '/pages/MyShare/MyShare?type=0',
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
			onServer(type) {
				switch (type) {
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
			onSetting() {
				uni.navigateTo({
					url: '/pages/Setting/Setting'
				})
			},
			/*消息点击*/
			onMessage() {
				uni.navigateTo({
					url: '/pages/Message/Message'
				})
			},
			/**
			 * 会员点击
			 */
			onHelp() {
				uni.navigateTo({
					url: '/pages/Help/Help?id=9&page=1',
				})
			},
			onGuide() {
				uni.navigateTo({
					url: '/pages/Guide/Guide?id=8&page=1',
				})
			},
			gologin() {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			makeCall(number) {
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
	.layout uni-button {
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
	.page-total{
		z-index: 9;
	}
</style>