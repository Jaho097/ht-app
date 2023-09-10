<template>
	<div class="page">
		<div class="sc-eHgmQL claxwl">
			<div class="sc-jAaTju hpiOGL">
				<div class="am-wingblank am-wingblank-lg">
					<div class="sc-jtRlXQ ktbZSr">
						<div class="title">请选择提现银行卡</div>
						<div>
							<picker @change="bindBankChange" :value="index" range-key="name" :range="bankArr" class="am-button">
								<label v-if="bankArr[index].name" class="normal">{{bankArr[index].name}}</label>
								<label v-else="index_b==null" class="normal">点击选择</label>
							</picker>
						</div>
					</div>
					<div class="sc-jtRlXQ ktbZSr">
						<div class="title">请输入保证金金额</div>
						<div class="sc-bEjcJn hdoLcg">
							<input type="text" :placeholder="moneyArr.account" v-model="Money">
							<div class="sc-ePZHVD cJvPeu" @click="copyNuber(moneyArr.account)">全部提现</div>
						</div>
					</div>
					<div class="sc-jtRlXQ ktbZSr">
						<div class="title">请输入支付密码</div>
						<div class="sc-bEjcJn hdoLcg">
							<input type="text" placeholder="请输入您的支付密码" v-model="paywd">
						</div>
					</div>
					<div class="am-whitespace am-whitespace-xl"></div>
					<button @click="onSubmit" class="sc-kkGfuU hoqqAL new-button-large">提交提现申请</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var _self, loginRes;
	export default {
		data() {
			return {
				banks: [],
				bankList: {},
				bankArr: [{name: ''}],
				bankInfo: [],
				index_b: null,
				index: 0,
				item: 0,
				isPayWay: false,
				PayWay: 0,
				Money: '', //金额
				paywd: '',
				token: '',
				Submit: true,
				isPassword: false,
				moneyArr: {},
				kftime: '',
				isReal: false,
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
		},
		methods: {
			bindBankChange(e){
				this.index_b = e.target.value;//将数组改变索引赋给定义的index变量
				// this.form.bank  = this.bankList[this.index_b].id;//将array【改变索引】的值赋给定义的picker变量
				// console.log(this.bankList[this.index_b].name);
				// console.log("bank：",this.form.bank);//输出获取的值
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
					url: this.apiServer + '/apicom/Withdraw',
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
							this.banks = res.data.data.banks;
							this.item = res.data.data.default_bank; //默认选择第一项
							this.PayWay = res.data.data.default_bank.id; //默认选择第一项的ID
							this.bankList = res.data.data.bankSetting; //系统提现银行列表
							this.moneyArr = res.data.data.money; //账户金额数据
							this.kftime = res.data.data.kftime; //客服在线时间
						}
						
						this.bankArr = this.banks
						for(let i in this.bankArr){
							this.bankArr[i]['name'] = this.bankArr[i].bank + ' | ' + this.banks[i].card
						}
						console.log(this.bankArr, 'this.banks');
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
			/*提交提现点击*/
			onSubmit() {
				if (this.isReal != 2) {
					uni.showToast({
						title: "请先完成实名认证",
						icon: "none"
					});
					return;
				}
				if (!this.item.id) {
					uni.showToast({
						title: "请选择提现账户",
						icon: "none"
					});
					return;
				}
				if (!this.Money) {
					uni.showToast({
						title: "请填写提现金额",
						icon: "none"
					});
					return;
				}
				if (!this.paywd) {
					uni.showToast({
						title: "请填写支付密码",
						icon: "none"
					});
					return;
				}
				if (parseInt(this.moneyArr.account) < parseInt(this.Money)) {
					uni.showToast({
						title: "账户可用余额不够",
						icon: "none"
					});
					return;
				}
				//if((this.Money%100)!=0){
				//	uni.showToast({title:"提现金额需要为100的倍数",icon:"none"});
				//	return;					
				//}

				uni.request({
					url: this.apiServer + '/apicom/withdraw/doWithdraw',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						bank_id: this.item.id,
						paywd: this.paywd,
						money: this.Money,
						token: this.token,
					},
					success: res => {
						if (res.data.status == 1) {
							this.Submit = false; //提交成功后按钮失效
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
			//查询对应的银行名称
			findBank(bank) {
				var arr = this.bankList;
				for (let key in arr) {
					if (bank == key) return arr[key];
				}
			},
			/**
			 * 支付方式选择点击
			 * @param {Number} type 0 余额 1 微信 2 支付宝
			 */
			onPayWay(i) {
				this.item = this.banks[i];
				this.PayWay = this.banks[i].id;
				this.isPayWay = false;
				//console.log(this.item)
			},
			getIcon(str) {
				if (str.indexOf("WX") != -1) {
					var img = '/static/wx_pay.png';
				} else if (str.indexOf("ZFB") != -1) {
					var img = '/static/zfb_pay.png';
				} else {
					var img = '/static/bank_pay.png';
				}
				return img;
			},
			onCopy(value) {
				uni.setClipboardData({
					data: value
				});
				uni.showToast({
					'title': "复制成功！"
				});
			},
			copyNuber(value) {
				this.Money = parseInt(value);
			},
			getCode(bank, str) {
				if (bank.indexOf("WX") != -1 || bank.indexOf("ZFB") != -1) {
					return str;
				} else {
					str = str.replace(/\s*/g, "");
					str = str.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
					return str;
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Withdraw.scss';
	.uni-input-input{
		font-size: 16px !important;
		color: rgb(37, 37, 37);
		padding: 5px 8px;
		text-align: center;
		line-height: 30px;
		border: 1px solid rgb(232, 232, 232);
		border-radius: 8px;
		width: 100%;
		box-sizing: border-box;
	}
</style>