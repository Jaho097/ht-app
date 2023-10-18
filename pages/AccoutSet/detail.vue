<template>
	<view class="page">
		<!-- 设置列表 -->

		<div class="sc-jAaTju hpiOGL">
			<div class="sc-kxynE dTFFiD">
				<div class="sc-cooIXK kzEmcX">
					<div class="title">成交时间</div>
					<div class="bd">{{obj.deal_date}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">交易账号</div>
					<div class="bd">{{obj.lid}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">操作行为</div>
					<div class="bd">{{obj.business_name}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">证券名称</div>
					<div class="bd">{{obj.gupiao_name}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">证券代码</div>
					<div class="bd">{{obj.gupiao_code}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">成交价格</div>
					<div class="bd">{{obj.deal_price}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">成交数量</div>
					<div class="bd">{{obj.volume}}
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">成交金额
					</div>
					<div class="bd">{{obj.residual_quantity}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">
						成交编号
					</div>
					<div class="bd">{{obj.deal_no}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">佣金</div>
					<div class="bd">{{obj.commission}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">印花税</div>
					<div class="bd">{{obj.stamp_duty}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">过户费</div>
					<div class="bd">{{obj.transfer_fee}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">清算过户金额</div>
					<div class="bd">{{obj.liquidation_amount}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">当前账号余额</div>
					<div class="bd">{{obj.residual_amount}}</div>
				</div>
			</div>
		</div>
		

		<!-- 退出 -->
		<!-- <view class="quit-login" v-if="details.status=='未通过'">
			<view class="btn"><text >未通过</text></view>
		</view>
		<view class="quit-login" v-else @click="onStot(token,id)">
			<view class="btn"><text>终止操盘</text></view>
		</view> -->
		<view class="bottom"></view>

		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self, loginRes;
	export default {
		data() {
			return {
				myMobile: '',
				details: {},
				accountInfo: uni.getStorageSync('accountInfo'),
				token: '',
				id: '',
				treatmentStatu: {
					checked: false
				},
				obj:{}
			};
		},
		onLoad(params) {
			//console.log(params.token+" "+params.id)
			_self = this;
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.token = params.token;
			this.id = params.id;
			console.log(this.id, 'this.id');
			this.getDetails(params.token, params.id);
			//this.getacInfo(params.token,params.id);
			this.obj=JSON.parse(decodeURIComponent(params.obj))
			console.log(this.obj,'this.obj')
		},
		methods: {
			/*获取操盘账户相关信息*/
			async getDetails(token, id) {
				uni.request({
					url: this.apiServer + '/apicom/financing/details?id=' + id,
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
							this.details = res.data.data.result;
							if (res.data.data.result.renewal == 1) {
								this.$set(this.treatmentStatu, 'checked', true)
							} else {
								this.$set(this.treatmentStatu, 'checked', false)
							}
							console.log(this.details);
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
			/*获取会员资金相关信息*/
			async getacInfo(token, id) {
				if (token == '' || id == '') {
					return;
				}
				uni.request({
					url: this.apiServer + '/market/trade/account_info',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token,
						id: id,
					},
					success: res => {
						if (res.data.status == 1) {
							this.accountInfo = res.data.data;
						}
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					},
				});
			},
			/*自动续期按钮*/
			switchChange(e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value) // 将点击改变的状态赋给treatmentStatu.checked
				uni.request({
					url: this.apiServer + '/apicom/financing/autorenewal',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						id: this.details.id,
						token: this.token
					},
					success: res => {
						if (res.data.status != 1) {
							//this.renewal  = res.data.data;
							that.$set(that.treatmentStatu, 'checked', false) // 手动修改switch的状态，视图会同步更新
							//console.log(res.data.message);
						} else {
							that.$emit('changePage', 1)
							//console.log(res.data.message);
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
			/**
			 * 设置列表点击
			 * @param {String} type
			 */
			onSetting(type, id) {
				switch (type) {
					case 'renewal':
						uni.navigateTo({
							url: '/pages/Renewal/Renewal?id=' + id
						})
						break;
					case 'addmoney':
						uni.navigateTo({
							url: '/pages/Addmoney/Addmoney?id=' + id
						})
						break;
					case 'expend':
						uni.navigateTo({
							url: '/pages/Expend/Expend?id=' + id
						})
						break;
					case 'profit':
						uni.navigateTo({
							url: '/pages/Profit/Profit?id=' + id
						})
						break;
					case 'agreement':
						uni.navigateTo({
							url: '/pages/Agreement/Agreement?id=' + id
						})
						break;
				}
			},
			/*终止操盘点击*/
			onStot(token, id) {
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要终止操盘?',
					DialogType: 'inquiry',
					animation: 0
				}).then(() => {
					uni.request({
						url: this.apiServer + '/apicom/financing/stop',
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						method: 'POST',
						timeout: 5000,
						data: {
							token: token,
							id: id,
						},
						success: res => {
							if (res.data.status == 1) {
								uni.showToast({
									title: res.data.message,
									icon: "none"
								});
							} else {
								uni.showToast({
									title: res.data.message,
									icon: "none"
								});
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
				})
			},
			/*计算单位*/
			calculate(number) {
				number = Number(number);
				
				if (number == 0 || !number) return 0;
				
				var unit = number.toFixed(2);
				return unit;
				
				//console.log(Math.abs(parseInt(number)));return;
				if (Math.abs(parseInt(number)) == 0) return number;
				if (Math.abs(parseInt(number)).toString().length >= 13) {
					var unit = (parseInt(number) / 1000000000000).toFixed(2) + '万亿';
					return unit;
				} else if (Math.abs(parseInt(number)).toString().length >= 9) {
					var unit = (parseInt(number) / 100000000).toFixed(2) + '亿';
					return unit;
				} else if (Math.abs(parseInt(number)).toString().length > 4) {
					var unit = (parseInt(number) / 10000).toFixed(2) + '万';
					return unit;
				} else {
					var unit = parseInt(number).toFixed(2);
					return unit;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'AccoutSet.scss';

	// lz
	.setting-list {
		padding: 0;
		margin-top: 0;
	}
</style>