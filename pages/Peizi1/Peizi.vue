<template>
	<view class="page">
		<!-- 配资tab -->
		<view class="" style="background-color: #f4e4b7;height: 80rpx;">
		</view>
		<div class="sc-jtggT jvlxMk">
			<div class="sc-jKVCRD AaIAu">
				<div class="item">
					<div class="hd">总操盘资金</div>
					<div class="num">{{Number(freeze)+Number(multiple*freeze)}}元</div>
				</div>
				<div class="item">
					<div class="hd">保证金</div>
					<div class="num">{{freeze}}元</div>
				</div>
				<div class="item">
					<div class="hd">配资金额</div>
					<div class="num">{{multiple*freeze}}元</div>
				</div>
			</div>
		</div>
		<div class="sc-jAaTju hpiOGL">
			<div class="am-whitespace am-whitespace-md"></div>
			<div class="am-wingblank am-wingblank-lg">
				<div class="sc-LKuAh sc-hzNEM wHZBJ">
					<div class="sc-iBEsjs dJjmld">
						<div class="title">
							<div style="display: flex; align-items: center;"><span>预警线</span><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
									alt="???"
									style="margin-left: 2px; width: .8rem; height: .8rem; position: relative; left: 0.04rem;">
							</div>
						</div>
						<div class="bd"><span class="sc-fjdhpX cEvEJT">{{price1()}}元</span><span
								class="sc-chbbiW SmCRN">(配资资金+保证金 x 50%)</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">
							<div style="display: flex; align-items: center;"><span>平仓线</span><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
									alt="???"
									style="margin-left: 2px; width: .8rem; height: .8rem; position: relative; left: 0.04rem;">
							</div>
						</div>
						<div class="bd"><span class="sc-fjdhpX cEvEJT">{{price2()}}元 </span><span
								class="sc-chbbiW SmCRN">(配资资金+保证金 x 20%)</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">操盘时间</div>
						<div class="bd"><span class="sc-fjdhpX cEvEJT">{{time}}{{type==1||type==0?'天':'月'}}</span><span
								class="sc-chbbiW SmCRN">(默认开启到期自动续期)</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">配资管理费</div>
						<div class="bd"><span class="sc-fjdhpX cEvEJT">{{price3()}}元</span><span class="sc-chbbiW SmCRN">(配资资金 x
								操盘期限 x 0.90%)</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">操盘须知</div>
						<div class="bd">单只股票最大持仓比例为 100%</div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">账户余额</div>
						<div class="bd"><span class="sc-fjdhpX cEvEJT">{{memberMoney.account}}元</span><a class="sc-kxynE dZizzA"
								 @click="charge()">充值</a></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">本次可抵扣</div>
						<div class="bd"><span class="text-primary">2.70元</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">单次最多可抵扣</div>
						<div class="bd"><span class="text-primary">2.70元</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">剩余管理费</div>
						<div class="bd"><span class="text-primary">2087.10元</span></div>
					</div>
					<div class="sc-iBEsjs dJjmld">
						<div class="title">确认支付</div>
						<div class="bd"><span class="text-primary">202.70元</span></div>
					</div>
				</div>
				<div class="sc-kaNhvL jDQKpL">
					<label class="am-checkbox-wrapper">
						<span
							class="am-checkbox "
							:class="{'am-checkbox-checked':isAgree==1}"
							>
							<!-- class="am-checkbox am-checkbox-checked"> -->
							<input type="checkbox" @click="agree()" class="am-checkbox-input"
								checked=""><span class="am-checkbox-inner"></span>
								</span>
								</label>
								<span
						class="link">我已阅读并同意 <a style="color:blue" @click="toAgree()" >《实盘交易平台操盘协议》</a></span></div>
			</div>
		</div>

		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5" v-if="form.freeze"
				@click="form.freeze?goNext():''">下一步</button>
			<button type="warn" style="width:100%;" class="uni-radius-5" v-else disabled="true">下一步</button>
		</view>
		<!-- 确认申请 -->
		<goods-coupon ref="GoodsCoupon"></goods-coupon>
	</view>
	</view>
</template>

<script>
	var _self, loginRes, action;
	import GoodsCoupon from '../../components/GoodsCoupon/GoodsCoupon.vue';
	export default {
		components: {
			GoodsCoupon,
		},
		data() {
			return {
				peiziList0: [{
					idx: '10'
				}],
				peiziList1: [{
					idx: '2'
				}, {
					idx: '3'
				}, {
					idx: '4'
				}, {
					idx: '5'
				}, {
					idx: '6'
				}, {
					idx: '7'
				}, {
					idx: '8'
				}, {
					idx: '9'
				}, {
					idx: '10'
				}],
				peiziList2: [{
					idx: '12'
				}, {
					idx: '13'
				}, {
					idx: '14'
				}, {
					idx: '15'
				}],
				peiziList3: [{
					idx: '2'
				}, {
					idx: '3'
				}, {
					idx: '4'
				}, {
					idx: '5'
				}, {
					idx: '6'
				}, {
					idx: '7'
				}, {
					idx: '8'
				}, {
					idx: '9'
				}, {
					idx: '10'
				}],
				priceList: [{
					item: '保证金介于 100 - 200000000 元之间'
				}, {
					item: '保证金介于 100 - 200000000 元之间'
				}, {
					item: '保证金介于 300000 - 20000000 元之间'
				}, {
					item: '保证金介于 0 - 0 元之间'
				}],
				pickerList: [{
					item: '20天'
				}, {
					item: '操盘期限介于 2 - 30 天之间'
				}, {
					item: '操盘期限介于 1 - 12 月之间'
				}, {
					item: '操盘期限介于 1 - 12 月之间'
				}],
				inverted: false,
				pickerDesc: '666',
				// 增强输入框自定义样式
				placeholderStyle: "color:#ee0a24;font-size:14px",
				styles: {
					color: '#666',
					borderColor: '#ee0a24'
				},

				account_money: '******',
				//time  : '',
				current: null,
				dataName: '',
				OrderType: '',
				// 表单
				timeArray: [],
				ratefree: ['1'],
				rateCount: [],
				index: null,
				free_loss: {},
				free_set: {},
				peiziJson: {},
				form: {
					type: '', //配资种类
					multiple: '', //倍数
					freeze: '', //保证金
					time: '', //时间
					bigMoney: '', //配资金额
				},
				applyJson: '',
				isAgree:0,
				freeze:0,
				multiple:0,
				peizi:0,
				time:0,
				type:'',
				memberMoney:{}
			};
		},
		computed: {

			peiziList() {
				let res
				switch (this.OrderType) {
					case "0":
						res = this.peiziList0
						break;
					case "1":
						res = this.peiziList1
						break;
					case "3":
						res = this.peiziList3
						break;
					default:
						res = this.peiziList2
						break;
				}
				return res
			}
		},
		onLoad(params) {
			this.freeze = Number(params.freeze);
			this.time = Number(params.time);
			this.type = Number(params.type);
			this.multiple = Number(params.multiple);
			this.peizi = Number(this.freeze*this.multiple)
			_self = this;
			loginRes = _self.checkLogin();
			if (!loginRes) {
				return;
			}
			this.getMy(loginRes[2])
		},
		methods: {
			toAgree(){
				uni.navigateTo({
					url: '/pages/Agreement/Agreement',
				})
			},
			charge(){
				uni.navigateTo({
					url: '/pages/MyWallet/MyWallet',
				})
			},
			getMy(token){
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
							this.memberMoney = res.data.data.money;
							//console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			price1(){
				return this.peizi+this.freeze*0.5
			},
			price2(){
				return this.peizi+this.freeze*0.2
			},
			price3(){
				return (this.peizi*this.time*0.009).toFixed(2)
			},
			agree(){
				this.isAgree = !this.isAgree
			},	
			rePeizi(item) {
				let formattedNum
				let num = item.idx * (this.form.freeze || 1)
				if (num >= 100000000) {
					formattedNum = (num / 100000000).toLocaleString() + "亿";
				} else if (num >= 10000) {
					formattedNum = (num / 10000).toLocaleString() + "万";
				} else {
					formattedNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				return formattedNum;
			},
			setInverted() {
				this.inverted = !this.inverted;
			},
			changeNumber() {
				if (this.form.freeze.length == 1) {
					this.form.freeze = this.form.freeze.replace(/[^1-9]/g, '')
				} else {
					this.form.freeze = this.form.freeze.replace(/\D/g, '')
				}
			},
			calculate: function(number) {
				if (number.toString().length >= 13) {
					this.form.unitNumber = number / 1000000000000;
					this.form.unit = '万亿';
				} else if (number.toString().length >= 9) {
					this.form.unitNumber = number / 100000000;
					this.form.unit = '亿';
				} else if (number.toString().length >= 4) {
					this.form.unitNumber = number / 10000;
					this.form.unit = '万';
				} else {
					this.form.unitNumber = number;
					this.form.unit = '元';
				}
			},
			async applySave(token, form) {
				if (form.type == 5 && form.freeze != 100) {
					uni.showToast({
						title: "免费体验的保证金只能输入 100",
						icon: "none"
					});
					return;
				}

				uni.request({
					url: this.apiServer + '/apicom/handle/applySave',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token,
						type: form.type,
						multiple: form.multiple,
						borrow_duration: form.time,
						deposit_money: form.freeze,
					},
					success: res => {
						//uni.hideLoading();
						if (res.data.status == 1) {
							this.applyJson = res.data.data;
							this.$refs['GoodsCoupon'].show(token, form);
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
							return;
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						uni.showToast({
							title: "配资加载失败!",
							icon: "none"
						});
					}
				});
			},
			async applyFree(action, token) {
				//uni.showLoading({'title':"加载中",icon:"none"});
				uni.request({
					url: this.apiServer + '/apicom/stock/' + action,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						//uni.hideLoading();
						if (res.data.status == 1) {
							if (this.OrderType == 0) {
								this.peiziJson = res.data.data;
								this.account_money = res.data.data.account_money;
								this.free_loss = res.data.data.free_loss;
								this.free_set = res.data.data.free_set;
								var string = res.data.data.free_set[1];
								this.timeArray = string.split(' '); //把字符串转换成数组
								this.dataName = '天';
								this.form.type = 5;
								console.log(this.peiziJson);
							}
							if (this.OrderType == 1) {
								this.account_money = res.data.data.account_money;
								this.peiziJson = res.data.data;
								this.timeArray = res.data.data.day_use_time;
								this.rateCount = res.data.data.day_rate_a;
								this.dataName = '天';
								this.form.type = 1;
								console.log(this.peiziJson);
							}
							if (this.OrderType == 2) {
								this.account_money = res.data.data.account_money;
								this.peiziJson = res.data.data;
								this.timeArray = res.data.data.week_use_time;
								this.rateCount = res.data.data.week_rate_a;
								this.dataName = '周';
								this.form.type = 2;
								console.log(this.peiziJson);
							}
							if (this.OrderType == 3) {
								this.account_money = res.data.data.account_money;
								this.peiziJson = res.data.data;
								this.timeArray = res.data.data.month_use_time;
								this.rateCount = res.data.data.month_rate_a;
								this.dataName = '月';
								this.form.type = 3;
								console.log(this.peiziJson);
							}
						}
						uni.hideLoading();
					},
					complete: function() {
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						uni.showToast({
							title: "配资加载失败!",
							icon: "none"
						});
					}
				});
			},
			UpNumber(e) {
				e.target.value = e.target.value.replace(/[^\d]/g, "");
			},
			onInput(e) {
				console.log(typeof(e), e)
				this.form.freeze = e.target.value; //监听获取输入框改变值
				if (String(this.form.freeze).indexOf('.') > 0) this.form.freeze = '';
				this.$nextTick(() => { //这里
					this.form.freeze = String(this.form.freeze).replace(/\D/g, '');
				});
				if (!this.form.freeze.replace(/[^a-zA-Z]/)) {
					uni.showToast({
						title: "只能输入纯数字!",
						icon: "none"
					});
					this.form.freeze = this.form.freeze.replace(
						/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\·~！@#￥%……&*()——\-+={}|《》？：“”【】、；‘'，。、]/g, "");
					return;
				}
				this.form.freeze = parseInt(this.form.freeze.replace(/[^\d]/g, ''));
				var number = this.form.freeze;
				if (number.toString().length >= 13) {
					this.form.unitNumber = number / 1000000000000;
					this.form.unit = '万亿';
				} else if (number.toString().length >= 9) {
					this.form.unitNumber = number / 100000000;
					this.form.unit = '亿';
				} else if (number.toString().length >= 5) {
					this.form.unitNumber = number / 10000;
					this.form.unit = '万';
				} else {
					this.form.unitNumber = number;
					this.form.unit = '元';
				}
				//console.log(this.money);
			},
			bindTimeChange: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.form.time = this.timeArray[this.index] //将array【改变索引】的值赋给定义的picker变量
				//console.log("选择为：",this.time)//输出获取的值
			},
			onclick: function(multiple, e, index) {
				this.current = index;
				this.form.bigMoney = e * (this.form.freeze || 1);
				this.form.multiple = multiple;
				//console.log(index);

			},
			goNext: function() {
				if (!this.form.freeze) {
					uni.showToast({
						title: "请填写保证金",
						icon: "none"
					});
					return;
				}
				if (!this.form.time) {
					uni.showToast({
						title: "请选择操盘期限",
						icon: "none"
					});
					return;
				}
				if (!this.form.bigMoney) {
					uni.showToast({
						title: "请选择配资金额",
						icon: "none"
					});
					return;
				}
				this.applySave(loginRes[2], this.form);
			},
			/**
			 * 配资tab点击
			 */
			onOrderTab(type) {
				this.OrderType = type;
				// this.pickerDesc = this.pickerList[this.OrderType].item
				uni.redirectTo({
					url: '/pages/Peizi/Peizi?type=' + type,
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	@import 'Peizi.scss';

	.jvlxMk {
		position: relative;
		overflow: hidden;
		padding-bottom: 5px;
		margin-top: -30px;
	}

	.AaIAu {
		position: relative;
		z-index: 1;
		margin: 0px 15px;
		padding: 0.3rem .8rem;
		background-color: rgb(255, 255, 255);
		border-radius: 10px;
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
	}

	.AaIAu .item {
		flex: 1 1 0%;
		text-align: center;
		border-right: 1px solid rgb(226, 226, 226);
	}

	.AaIAu .item .hd {
		color: rgb(142, 142, 147);
		font-size: 15px;
	}

	.AaIAu .item .num {
		font-size: 17px;
		color: rgb(255, 69, 0);
	}

	.hpiOGL {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		overflow: auto;
		padding-bottom: 32px;
		background-color: white;
	}

	.am-whitespace.am-whitespace-md {
		height: 9px;
	}

	.am-wingblank.am-wingblank-lg {
		margin-left: 15px;
		margin-right: 15px;
	}

	.wHZBJ {
		margin: 0px 0px 15px;
		background-color: rgb(255, 255, 255);
		padding-left: 0px;
		border-radius: 4px;
	}

	.dJjmld {
		position: relative;
		min-height: 44px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		padding: 0px 10px;
		font-size: 14px;
	}

	.dJjmld>.title {
		font-size: 16px;
		flex: 1 1 0%;
		color: rgb(37, 37, 37);
	}

	.dJjmld>.bd {
		flex-basis: 65%;
		color: rgb(142, 142, 147);
	}

	.jDQKpL {
		font-size: 14px;
	}

	.jDQKpL .link {
		padding-left: 10px;
		color: rgb(142, 142, 147);
	}

	.cEvEJT {
		color: rgb(255, 69, 0);
	}

	.dZizzA {
		color: rgb(255, 255, 255);
		background-color: rgb(250, 68, 0);
		border-radius: 3px;
		padding: 0px 3px;
		font-size: 13px;
		display: inline-block;
		line-height: 20px;
		margin-left: 20px;
		position: relative;
		top: -2px;
	}

	.am-checkbox-input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		border: 0 none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	.jDQKpL .am-checkbox.am-checkbox-checked .am-checkbox-inner {
		background-color: rgb(255, 69, 0);
		border-color: rgb(255, 69, 0);
	}

	.am-checkbox-inner {
		position: absolute;
		right: 0;
		width: 21px;
		height: 21px;
		border: 1px solid #ccc;
		border-radius: 50%;
		-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.am-checkbox {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		width: 21px;
		height: 21px;
	}

	.am-checkbox.am-checkbox-checked .am-checkbox-inner:after {
		display: block;
		border-color: #fff;
	}

	.am-checkbox-inner:after {
		position: absolute;
		display: none;
		top: 1.5px;
		right: 6px;
		z-index: 999;
		width: 5px;
		height: 11px;
		border-style: solid;
		border-width: 0 1px 1px 0;
		content: " ";
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
