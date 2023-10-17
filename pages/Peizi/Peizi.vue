<template>
	<view class="page">
		<!-- 配资tab -->
		<view class="" style="background-color: #f4e4b7;height: 80rpx;">
		</view>
		<view class="sc-jtggT jvlxMk">
			<view class="sc-ebFjAB ckTmlE">
				<view class="item"><button class="sc-kkGfuU hoqqAL new-button-small"
						:class="{'new-button-ghost':OrderType!=1}" @click="onOrderTab(1)">按天配资</button></view>
				<view class="item"><button class="sc-kkGfuU hoqqAL new-button-small "
						:class="{'new-button-ghost':OrderType!=2}" @click="onOrderTab(2)">VIP配资</button>
				</view>
				<view class="item"><button class="sc-kkGfuU hoqqAL new-button-small "
						:class="{'new-button-ghost':OrderType!=3}" @click="onOrderTab(3)">按月配资</button></view>
				<view class="item"><button class="sc-kkGfuU hoqqAL new-button-small "
						:class="{'new-button-ghost':OrderType!=0}" @click="onOrderTab(0)">免息配资</button></view>
			</view>
		</view>
		<!-- <view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>免费体验</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>按天配资</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>按周配资</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>按月配资</text>
				<text class="line"></text>
			</view>
		</view> -->
		<!--操作区-->


		<!-- 订单列表 -->
		<view class="order-list">
			<view class="list">
				<!-- <uni-section title="请输入保证金金额" subTitle="保证金为100的倍数且小于20000000" type="line" padding> -->
				<view class="sc-jAaTju hpiOGL">
					<view class="am-wingblank am-wingblank-lg">
						<view class="sc-qrIAp gtQAIG">
							<view class="title">请输入保证金金额</view><input v-model="form.freeze" type="number"
								:placeholder="this.priceList[this.OrderType].item" class="sc-iqzUVk fYFaPR">
						</view>
						<view class="lz-pos-rel">
							<picker class="lz-input fYFaPR" @change="bindTimeChange" :disabled="this.OrderType==0"
								:range="timeArray">
								<label v-if="index==null"
									class="normal ">{{this.pickerList[this.OrderType].item}}</label>
								<label v-else>{{timeArray[index]+" "+dataName}}</label>
							</picker>
						</view>
						<!-- <view class="sc-qrIAp gtQAIG">
							<view class="title">请选择操盘期限</view>
							<view><button class="sc-ipZHIp fmypNd">操盘期限介于 1 - 12 月之间 <svg
										class="am-icon am-icon-down am-icon-xxs">
										<use xlink:href="#down"></use>
									</svg></button></view>
						</view> -->
						<view class="sc-qrIAp gtQAIG">
							<view class="title">请选择配资金额</view>
							<view class="sc-dEoRIm hIMFYz">
								<view class="sc-iGrrsa sc-bmyXtO dZkSuS"
									:class="{ 'bgfff': form.freeze, 'color1': index == current }"
									v-for="(item,index) in peiziList"
									@click="onclick(index+1,item.idx,index)">
									<!-- <view class="sc-iGrrsa sc-bmyXtO dZkSuS" @click="onclick(index+1,free_set[0]*form.freeze,index)" v-for="item in peiziList"> -->
									<view class="hd" v-if="form.freeze"
										:class="{ 'color2': index == current }">{{rePeizi(item)}}
									</view>
									<view class="hd" v-else="">配资金额</view>
									<view class="num">{{item.idx}}倍</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="">
					请输入保证金金额
				</view>
				<view class="lz-pos-rel">
					<uni-icons custom-prefix="iconfont" type="icon-WDzichan" size="18" color="#959595"></uni-icons>
					<input type="number" v-model="form.freeze" focus="true" @input="onInput" class="lz-input"
						placeholder="保证金介于 300000 - 20000000 元之间">
				</view>
				</uni-section>
				<uni-section title="请选择操盘期限" subTitle="点击选择操盘期限" type="line" padding>
					<view class="lz-pos-rel">
						<uni-icons type="calendar-filled" size="18" color="#959595"></uni-icons>
						<picker class="lz-input" @change="bindTimeChange" :range="timeArray">
							<label v-if="index==null" class="normal">点击选择</label>
							<label v-else>{{timeArray[index]+" "+dataName}}</label>
						</picker>
					</view>
				</uni-section> -->
				<!-- 选择倍数 -->
				<!-- <view class="wallet">
					<view class="more">
						<text>配资金额</text>
					</view>
					<view class="wallet-list" v-if="this.OrderType == 0">
						<uni-tag type="primary" class="lz-wallet-tag uni-mx-5 uni-my-5"
							:text="(form.freeze>0)?((free_set[0]*form.unitNumber+form.unit)+' \n （ '+free_set[0]+'倍 ）'):('配资金额'+' \n （ '+free_set[0]+'倍 ）')"
							v-bind:class="{active:index==current}" inverted="true" v-for="(item,index) in ratefree"
							:key="index" size="normal" @click="onclick(index+1,free_set[0]*form.freeze,index)" />
					</view>
					<view class="wallet-list" v-else>
						<uni-tag type="primary" class="lz-wallet-tag uni-mx-5 uni-my-5"
							:text="(form.freeze>0)?((item*form.unitNumber+form.unit)+' \n （ '+item+'倍 ）'):('配资金额'+' \n （ '+item+'倍 ）')"
							v-bind:class="{active:index==current}" inverted="true" v-for="(item,index) in rateCount"
							:key="index" size="normal" @click="onclick(item,item*form.freeze,index)" />
					</view>
				</view> -->
			</view> 


			<view class="uni-py-10 uni-px-8">
				<button type="warn" style="width:100%;background-color: rgb(179, 141, 74);" class="uni-radius-5" v-if="form.freeze"
					@click="form.freeze?goNext():''">下一步</button>
				<button type="warn" style="width:100%;background-color: rgb(179, 141, 74)" class="uni-radius-5"  v-else disabled="true">下一步</button>
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
			this.OrderType = params.type;
			let barTitle
			switch (this.OrderType) {
				case "0":
					barTitle = '免费配资';
					break;
				case "1":
					barTitle = '按天配资';
					break;
				case "3":
					barTitle = '按月配资';
					break;
				default:
					break;
			}
			uni.setNavigationBarTitle({
				title: barTitle
			});
			_self = this;
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			console.log(loginRes);
			if (this.OrderType == 0) action = 'free_m';
			if (this.OrderType == 1 || this.OrderType == '') action = 'day';
			if (this.OrderType == 2) action = 'week';
			if (this.OrderType == 3) action = 'month';
			this.applyFree(action, loginRes[2]);
		},
		methods: {
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
								this.dataName = '月';
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
				if(!this.form.freeze){
					return
				}
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
				
				if (!this.form.time&&this.OrderType!=0) {
					uni.showToast({
						title: "请选择操盘期限",
						icon: "none"
					});
					return;
				}
				if(this.OrderType==0){
					this.form.time = 20
				}
				if (!this.form.bigMoney) {
					uni.showToast({
						title: "请选择配资金额",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/Peizi1/Peizi?freeze=' + this.form.freeze + '&multiple=' +(Number(this.form.multiple)+1)+ '&time=' +this.form.time+ '&type=' +this.OrderType,
				})
				// this.applySave(loginRes[2], this.form);
			},
			/**
			 * 配资tab点击
			 */
			onOrderTab(type) {
				this.OrderType = type;
				if(type==0){
					this.form.time = 20
				}
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
		margin-top: 16px;
		top: -30px;
	}

	.ckTmlE {
		position: relative;
		z-index: 1;
		margin: 0px 15px;
		padding: 0.3rem 0.4rem;
		background-color: rgb(255, 255, 255);
		border-radius: 10px;
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
	}

	.ckTmlE .item {
		flex: 1 1 0%;
		padding: 0 3px;
		text-align: center;
	}

	.hoqqAL.new-button,
	.hoqqAL.new-button-small {
		font-size: 14px;
		font-weight: 400;
		height: 30px;
	}

	.hoqqAL {
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

	.hoqqAL.new-button,
	.hoqqAL.new-button-ghost {
		background-color: transparent;
		border: 1px solid rgb(179, 141, 74);
		color: rgb(179, 141, 74);
		background-image: none;
	}

	.hoqqAL.new-button,
	.hoqqAL.new-button-small {
		font-size: 14px;
		font-weight: 400;
		height: 30px;
	}

	.hpiOGL {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		overflow: auto;
		padding-bottom: 32px;
		background-color: white;
	}

	.am-wingblank.am-wingblank-lg {
		margin-left: 15px;
		margin-right: 15px;
	}

	.gtQAIG {
		margin-bottom: 20px;
	}

	.gtQAIG .title {
		font-size: 16px;
		color: rgb(37, 37, 37);
		line-height: 30px;
		text-align: center;
		margin: 6px 0px;
	}

	.fYFaPR {
		font-size: 16px;
		color: rgb(37, 37, 37);
		padding: 5px 8px;
		text-align: center;
		line-height: 30px;
		border: 1px solid rgb(232, 232, 232);
		border-radius: 8px;
		width: 100%;
		box-sizing: border-box;
	}

	.gtQAIG {
		margin-bottom: 20px;
	}

	.gtQAIG .title {
		font-size: 16px;
		color: rgb(37, 37, 37);
		line-height: 30px;
		text-align: center;
		margin: 6px 0px;
	}

	.fmypNd {
		box-sizing: border-box;
		background-color: rgb(255, 255, 255);
		border-radius: 8px;
		position: relative;
		border: 1px solid rgb(232, 232, 232);
		padding: 5px 8px;
		text-align: center;
		width: 100%;
		line-height: 30px;
		font-size: 16px;
		color: rgb(90, 90, 98);
	}

	svg:not(:root) {
		overflow: hidden;
	}

	.am-icon-xxs {
		width: 15px;
		height: 15px;
	}

	.am-icon {
		fill: currentColor;
		background-size: cover;
		width: 22px;
		height: 22px;
	}

	.gtQAIG:last-child {
		margin-bottom: 0px;
	}

	svg:not(:root) {
		overflow: hidden;
	}

	.am-icon-xxs {
		width: 15px;
		height: 15px;
	}

	.am-icon {
		fill: currentColor;
		background-size: cover;
		width: 22px;
		height: 22px;
	}

	.gtQAIG:last-child {
		margin-bottom: 0px;
	}

	.gtQAIG .title {
		font-size: 16px;
		color: rgb(37, 37, 37);
		line-height: 30px;
		text-align: center;
		margin: 6px 0px;
	}

	.hIMFYz {
		display: flex;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.dZkSuS {
		border: 1px solid rgb(234, 234, 234);
		width: 30%;
		background-color: rgb(232, 232, 232);
		color: rgb(142, 142, 147);
		font-size: 14px;
		border-radius: 5px;
		text-align: center;
		margin-bottom: 15px;
		padding: 20px 0px;
	}

	.dZkSuS .hd {
		color: rgb(142, 142, 147);
	}

	.dZkSuS .hd {
		font-size: 18px;
		line-height: 30px;
		color: rgb(37, 37, 37);
	}

	.dZkSuS .num {
		font-size: 16px;
		line-height: 20px;
	}

	.dZkSuS .num {
		font-size: 16px;
		line-height: 20px;
	}

	.fYFaPR {
		font-size: 16px;
		color: rgb(37, 37, 37);
		padding: 5px 8px;
		text-align: center;
		line-height: 30px;
		border: 1px solid rgb(232, 232, 232);
		border-radius: 8px;
		width: 100%;
		height: 84rpx;
		box-sizing: border-box;
	}

	.bgfff {
		background-color: #fff !important;
	}

	.color1 {
		border-color: rgb(255, 69, 0);
		color: rgb(255, 69, 0) !important;
	}

	.color2 {
		color: rgb(255, 69, 0) !important;
	}
</style>
