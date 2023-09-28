<template>
	<view class="page">
		<!-- 设置列表 -->

		<div class="sc-jAaTju hpiOGL">
			<div class="sc-kxynE dTFFiD">
				<div class="sc-cooIXK kzEmcX">
					<div class="title">申请单号</div>
					<div class="bd">{{details.order_id}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">操盘期限</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC">{{details.verify_time+'至'+details.end_time}}</div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">自动续期</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC">
							<switch class="red sm" color="red !important" :checked="treatmentStatu.checked" @change="switchChange" style="transform:scale(0.8)"></switch>
							<a class="sc-fcdeBU frDHQL" @click="onSetting('renewal',id)">申请延期</a>
						</div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">保证金</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC"><span>{{calculate(details.deposit_money)}}</span><a class="sc-fcdeBU frDHQL"
								@click="onSetting('addmoney',id)">追加保证金</a></div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">总操盘资金</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC"><span>{{calculate(details.init_money)}}</span><a class="sc-fcdeBU frDHQL"
								@click="onSetting('expend',id)">扩大配资</a></div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">预计盈亏</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC"><span class="sc-jTzLTM hluaBw">{{calculate(details.return_money)}}</span><a
								class="sc-fcdeBU frDHQL" @click="onSetting('profit',id)">提取盈利</a></div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">交易账号</div>
					<div class="bd">
						<div class="sc-gmeYpB hDhpLC"><span
								class="sc-fjdhpX cEvEJT">{{details.sub_account}}</span><span>总资产：{{details.avail}}元</span></div>
					</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">
						<div style="display: flex; align-items: center;"><span>警戒线</span><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
								alt="???"
								style="margin-left: 2px; width: 0.4rem; height: 0.4rem; position: relative; left: 0.04rem;">
						</div>
					</div>
					<div class="bd">{{calculate(details.loss_warn_money)}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">
						<div style="display: flex; align-items: center;"><span>平仓线</span><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
								alt="???"
								style="margin-left: 2px; width: 0.4rem; height: 0.4rem; position: relative; left: 0.04rem;">
						</div>
					</div>
					<div class="bd">{{calculate(details.loss_close_money)}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">月利息</div>
					<div class="bd">{{calculate(details.borrow_interest)}}</div>
				</div>
				<div class="sc-cooIXK kzEmcX">
					<div class="title">查看合同</div>
					<div class="bd" style="text-align: right;"><a @click="onSetting('agreement')"
							style="color: rgb(69, 157, 245);">《平台操盘协议》</a></div>
				</div>
			</div>
		</div>
		<!-- 按钮 -->
		<view class="uni-py-10 uni-px-8" style="display: flex;">
			<button type="warn" style="width:45%;background-color: rgb(179, 141, 74);
    background-image: linear-gradient(112deg, rgb(220, 190, 127) 0%, rgb(179, 141, 74) 100%);" class="uni-radius-5"
				@click="onStot(token,id)">实盘交易</button>
			<button type="warn" style="width:45%;" class="uni-radius-5" v-if="details.status=='未通过'"
				@click="form.freeze?goNext():''" disabled="true">未通过</button>
			<button type="warn" style="width:45%;background: rgb(255, 69, 0);" class="uni-radius-5" v-else
				@click="onStot(token,id)">终止操盘</button>
		</view>

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