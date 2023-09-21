<template>
	<view class="page">
		<div class="sc-jrIrqw jYKeuR">
			<div class="sc-bdVaJa crYbem page-v2-account-index" style="background-color: rgb(246, 250, 253);">
				<div class="bg-container-banner-bg"
					style="background: url(&quot;/wap-fe-static/charge/banner.png&quot;) center top / cover, linear-gradient(rgb(252, 237, 195) 0%, rgb(243, 214, 157) 73.96%, rgb(247, 251, 254) 100%); height: 0px; padding-bottom: 75.1253%;">
				</div>
				<div class="bg-container-content">
					<div class="swiper-container swiper-container-initialized swiper-container-horizontal sc-gPzReC ijTLYD charge-type-new">
						<swiper @change="onchange" next-margin="-10px" :current="tabIndex" style="transition-duration: 0ms;transform: translate3d(27px, 0px, 0px);height: 188px;">
							<swiper-item style="margin-right: 20px;background-image: url('/static/card-bg.png');" v-for="(item,index) in account" :key="index">
								<span class="charge-way-status charge-way-status-selected"></span>
								<div class="charge-way-title"><span class="charge-way-title-left">充值方式</span><span
										class="charge-way-title-right">{{item.bank_name}}</span>
									<div class="charge-way-status-wrapper"></div>
								</div>
								<div class="charge-way-item"><span class="item-label">收款账号</span><span
										class="item-value">{{item.card}}</span><span class="copy-btn" @click="onCopy(item.card)"></span>
								</div>
								<div class="charge-way-item"><span class="item-label">收款人</span><span
										class="item-value">{{item.payee}}</span><span class="copy-btn" @click="onCopy(item.item.payee)"></span></div>
								<div class="charge-way-item"><span class="item-label">开户行</span><span
										class="item-value">{{item.open_bank}}</span><span class="copy-btn" @click="onCopy(item.item.open_bank)"></span></div>
								<div class="description-wrapper"><span class="desc-title" style="background-image: url('/static/desc-title.png');"></span><span
										class="desc-content">{{item.notes}}</span></div>
								
							</swiper-item>
						</swiper>
						</div>
						<div style="background: white;">
							<div class="line"></div>
							<div v-if="account[tabIndex] && account[tabIndex].image && account[tabIndex].image !== 0" class="qr-code-wrapper"><div class="qr-code-image" style="background-image: url();"><img :src="account[tabIndex].image" alt=""></div><div class="qr-code-desc">USDT-TRC20充值二维码</div></div>
						</div>
						<div style="padding: 16px; background: white;">
							<div class="sc-drMfKT ixeiPN">
								<div class="money-title">充值金额</div>
								<div class="money-input">
									<div class="money-prefix">¥</div><input v-model="Money" type="number" placeholder="请输入充值金额"
										class="sc-fgfRvd eXCYMX">
									<div class="money-afton">元</div>
								</div>
							</div>
							<div class="sc-eXNvrr kOZMeW">
								<div class="user-title">转账用户</div>
								<input class="sc-cpmKsF bPRfoY form-field" type="text" v-model="Name"
									placeholder="请输入此次的转账用户名">
							</div><button class="sc-kkGfuU hoqqAL new-button-large" @click="onSubmit"
								style="background: linear-gradient(90deg, rgb(244, 228, 182) 0%, rgb(224, 190, 143) 100%);">充值</button>
						</div>
						<div class="sc-eKZiaR bvUjYq">
							<div class="waiter-content" style="background-image: url('/static/kf-bg.png');">
								<div class="content">
									<div class="content-title">有问题联系在线客服</div>
									<div class="content-phone">00852-59046764</div>
									<div class="content-time">08:30 - 18:00</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	var _self, loginRes;
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				account: [],
				kftime: '',
				item: 0,
				isPayWay: false,
				PayWay: 0,
				Money: '', //金额
				Name: '',
				token: '',
				Submit: true,
				isReal: false,
				tabIndex: 0
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.getUserInfo(loginRes[2]);
			this.getRecharge(this.token);
		},
		methods: {
			onchange(e){
				console.log(123);
				this.tabIndex = e.detail.current;
				// console.log(e.detail.current)
				this.mats = e.detail.current;
			},
			async getUserInfo(token) {
				uni.showLoading({
					'title': "检测实名..."
				});
				uni.request({
					url: this.apiServer + '/apicom/member/userInfo',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1) {
							var userInfo = res.data.data;
							console.log(userInfo, 'userInfo');
							if (userInfo.id_card == '' && userInfo.name == '') {
								this.isReal = 0; //未认证
							}
							if (userInfo.id_card != '' && userInfo.name != '' && userInfo.id_auth == 0) {
								this.isReal = 1; //待审核
							}
							if (userInfo.id_card != '' && userInfo.name != '' && userInfo.id_auth == 1) {
								this.isReal = 2; //已认证
							}
							if (this.isReal == 2) {
								uni.showLoading({
									'title': "已实名认证"
								});
								this.getRecharge(token);
								uni.hideLoading();
							} else {
								uni.showToast({
									title: "请先完成实名认证",
									icon: "none"
								});
								setTimeout(function() {
									uni.navigateTo({
										url: '/pages/realName/realName'
									});
								}, 1000);
							}
						}
					}
				});
			},
			async getRecharge(token) {
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer + '/apicom/Recharge/editCharge',
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
							this.account = res.data.data.account;
							console.log(this.account, 'this.account');
							this.item = res.data.data.account[0]; //默认选择第一项
							this.PayWay = res.data.data.account[0].id; //默认选择第一项的ID
							this.kftime = res.data.data.kftime; //客服在线时间
							//console.log(this.kftime);
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
			/*提交充值点击*/
			onSubmit() {
				
				if (this.isReal != 2) {
					uni.showToast({
						title: "请先完成实名认证",
						icon: "none"
					});
					return;
				}
				if (!this.item.card) {
					uni.showToast({
						title: "请选择充值方式",
						icon: "none"
					});
					return;
				}
				if (!this.Money) {
					uni.showToast({
						title: "请填写充值金额",
						icon: "none"
					});
					return;
				}
				if (!this.Name) {
					uni.showToast({
						title: "请填写转账账户",
						icon: "none"
					});
					return;
				}
				//if((this.Money%100)!=0){
				//	uni.showToast({title:"充值金额需要为100的倍数",icon:"none"});
				//	return;					
				//}
				//console.log("提交的数据：",this.form);
				uni.request({
					url: this.apiServer + '/apicom/Recharge/doCharge',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						cardno: this.item.card,
						form_name: this.Name,
						money: this.Money,
						token: this.token,
						transfer: 'transfer',
					},
					success: res => {
						if (res.data.status == 1) {
							uni.showToast({
								title: res.data.message,
								duration: 2500,
								icon: "none"
							});
							this.Submit = false;
							setTimeout(function() {
								uni.navigateBack();
							}, 3000);

						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
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
			savePhoto(url) {
				// 先下载图片
				uni.downloadFile({
					url,
					success: (res) => {
						// 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: "保存成功！",
								});
							},
							fail: () => {
								uni.showToast({
									title: "保存失败",
									icon: "none"
								});
							},
						});
					},
				});
			},
			/**
			 * 支付方式选择点击
			 * @param {Number} type 0 余额 1 微信 2 支付宝
			 */
			onPayWay(i) {
				this.item = this.account[i];
				this.PayWay = this.account[i].id;
				this.isPayWay = false;
				console.log(this.item)
			},
			getIcon(str) {
				if (str.indexOf("银行") != -1) {
					var img = '/static/bank_pay.png';
				} else if (str.indexOf("微信") != -1) {
					var img = '/static/wx_pay.png';
				} else if (str.indexOf("支付宝") != -1) {
					var img = '/static/zfb_pay.png';
				} else {
					var img = '/static/ye_pay.png';
				}
				return img;
			},
			onCopy(value) {
				uniCopy({
					content: value,
					success: (res) => {
						uni.showToast({
							title: "复制成功"
						});
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyWallet.scss';
</style>