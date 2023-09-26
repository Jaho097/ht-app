<template>
	<view class="page">
		<div class="sc-eHgmQL claxwl">
			<div class="sc-cvbbAY iQByVk" style="padding-bottom: 0px;">
				<div class="sc-brqgnP cddMpM" style="background-image: url('/static/sub-banner.png');"></div>
				<div class="sc-jWBwVP llyxYj">
					<div class="sc-cMljjf fgDPNR showBack">代理商管理</div>
					<view class="head-back">
						<view class="back" @click="onBack">
							<text></text>
						</view>
					</view>
					<div class="sc-hjRWVT FlEzB">
						<div class="header-wrap">
							<div class="data-info">
								<div class="cell">
									<div class="title">名下用户</div>
									<div class="value">{{ConfData.count_m}} <span class="unit">人</span></div>
								</div>
								<div class="cell">
									<div class="title">已赚佣金</div>
									<div class="value">{{ConfData.count}} <span class="unit">元</span></div>
								</div>
							</div>
							<button @click="isPayWay = true"
								class="sc-kkGfuU hoqqAL new-button-middle new-button-rounded new-button-center">立即推广</button>
							<p>佣金比例：所邀请用户配资管理费的0.50%</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 订单tab -->
			<view class="order-tab czWUmi">
				<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
					<text>邀请用户</text>
					<text class="line"></text>
				</view>
				<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
					<text>获得佣金</text>
					<text class="line"></text>
				</view>
			</view>
			<!-- 订单列表 -->
			<view class="order-list" v-if="OrderType==0">
				<view class="order-li" v-for="(item,index) in InviteList" :key="index">
					<view class="order-number">
						<view class="number">
							<text>用户账号：{{item.mobile}}</text><text class="icon">{{item.agent_des}}</text>
						</view>
						<view class="type">
							<text>用户名：</text>
							<text>{{item.name||'--'}}</text>
						</view>
					</view>
					<view class="goods-list">
						<view class="list">
							<view class="info"><text class="big">他的邀请</text><text>{{item.profit_member}}人</text></view>
							<view class="info"><text class="big">他的收入</text><text>{{item.invitation_money}}元</text>
							</view>
							<view class="info"><text class="big">替你赚取</text><text>{{item.agents_profit_money}}元</text>
							</view>
							<view class="info"><text class="big">他的返佣</text><text>{{item.mange_rate}}%</text></view>
						</view>
					</view>
					<view class="order-status">
						<view class="status">
							<text>注册时间：</text>
							<text>{{item.create_time+" "+item.create_time_m}}</text>
						</view>
						<view class="switch-setting">
							<text class="action">截止：</text><text class="action">{{item.back_end}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="order-list" v-else-if="OrderType==1">
				<!--佣金-->
				<view class="position">
					<view class="title">
						<text>日期/时间</text>
						<text class="info_50">来源</text>
						<text>返佣/金额</text>
					</view>
					<view class="list" v-for="(item,index) in AwardsList" :key="index">
						<view class="info"><text
								class="big">{{item.create_time}}</text><text>{{item.create_time_m}}</text></view>
						<view class="info info_50"><text class="size_11">{{item.info}}</text></view>
						<view class="info">
							<text class="big green">{{item.affect}}</text>
							<text>{{item.money_a}}</text>
						</view>
					</view>
				</view>
			</view>
			<div class="am-list-footer">
				<div style="text-align: center;">---- 已到底部 ----</div>
			</div>
		</div>
		<!-- 支付方式选择窗口 -->
		<div class="am-modal-mask" v-if="isPayWay" @click="isPayWay = false"></div>
		<div class="am-modal-wrap " role="dialog" @click="isPayWay = false" v-if="isPayWay">
			<div role="document" class="am-modal am-modal-transparent">
				<div class="am-modal-content">
					<div class="am-modal-body">
						<div class="sc-fyjhYU jzbdaB">
							<div class="sc-ugnQR fkfVsM">
								<div class="title">您的邀请二维码</div><img
									:src="ConfData.qrcode"
									alt="invite qrcode" width="150" height="150">
							</div>
							<div class="sc-eIHaNI fsSVSj">
								<div class="title">推广链接</div>
								<div class="sc-eTpRJs kqQGAr">
									<div><input type="text" :value="ConfData.qrcode"></div>
									<button @click.stop="onCopy(ConfData.qrcode)">复制</button>
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
				token: '',
				isPayWay: false,
				PayWay: 0,
				PayWayText: '余额支付',
				// 数字
				isNumber: false,
				// 金额
				isPirce: false,
				ConfData: [],
				OrderType: 0,
				InviteList: [],
				AwardsList: [],
			};
		},
		onLoad(params) {
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.getConf(loginRes[2]);
			//this.getQrcode(loginRes[2]);
			this.OrderType = params.type;
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.token = loginRes[2];
			switch (params.type) {
				case '0':
					this.getInvite(this.token, 1); //获取下级信息
					break;
				case '1':
					this.getAwards(this.token, 1); //获取下级信息
					break;
			}
		},
		methods: {
			/* 订单tab切换状态 */
			onOrderTab(type) {
				console.log(type);
				this.OrderType = type;
				switch (this.OrderType) {
					case 0:
						this.getInvite(this.token, 1); //获取下级信息
						break;
					case 1:
						this.getAwards(this.token, 1); //获取下级信息
						break;
				}
				/*uni.navigateTo({
					url: '/pages/ShareList/ShareList?type='+type,
				})*/
			},
			/*获取下级信息*/
			async getInvite(token, page) {
				uni.showLoading({
					title: "加载中",
					icon: "loading"
				});
				//this.InviteList = '';
				//if(status==0)status=null;
				uni.request({
					url: this.apiServer + '/apicom/Invite?page=' + page,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						order: '0',
						token: token,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1) {
							var list = res.data.data;
							this.InviteList = list;
							console.log(res.data.data);
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
			},
			/*获取佣金信息*/
			async getAwards(token, page) {
				console.log(123);
				uni.showLoading({
					title: "加载中",
					icon: "loading"
				});
				uni.request({
					url: this.apiServer + '/apicom/Invite/award?page=' + page,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						token: token,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1) {
							var list = res.data.data;
							this.AwardsList = list;
							console.log(res.data.data);
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
			async getQrcode(token) {
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer + '/apicom/Invite/view',
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
							this.Qrcode = res.data.data;
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
			/* 返回点击*/
			onBack() {
				uni.navigateBack();
			},
			/*复制链接*/
			onCopy(value) {
				uniCopy({
					content: value,
					success: (res) => {
						this.isPayWay = false; //关闭弹出层
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
			//下载图片并保存到相册
			savePhoto(url) {
				uni.downloadFile({
					url,
					success: (res) => {
						// 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.isPayWay = false; //关闭弹出层
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
			onShareList() {
				uni.navigateTo({
					url: '/pages/ShareList/ShareList?type=0',
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyShare.scss';

	/*lz*/
	/* 立即推广弹框 */
	.pay-way-win .pay-list .list {
		border-radius: 10rpx;
		background-color: rgba(230, 67, 64, .2);
		border: 1px solid #e64340;
		color: #e64340;
	}

	.pay-way-win .pay-list .list .pay uni-text {
		color: #e64340;
	}

	.pay-way-win .pay-list .check uni-text {
		background-color: #e64340;
	}

	/*lz自定义*/
	.order-tab {
		top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));
		height: 88rpx;
	}

	.order-tab .tab {
		height: 100%;
	}

	.order-list {
		margin-top: 0;
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
		padding: 12rpx 20rpx;
		height: auto;
	}

	// 卡片列表
	.order-list .position {
		border-radius: 0;
	}
</style>