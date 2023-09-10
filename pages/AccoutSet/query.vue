<template>
	<view class="page">
		<!-- 旧代码 -->
		<!-- head -->
		<!-- 用户信息 -->
		<view class="head-navbar" style="position: relative;">
			<view class="back pos-absl" @click="onBack">
				<text></text>
			</view>
			<view class="nav-title">{{titleList[OrderType]}} </view>
			<view class="nav-btnbox" v-if="myMobile">
				<text>{{sub_account}}</text>
				<!-- <text class="nav-btn" @click="subwin = true">
					{{sub_account||'选择操盘账户'}}
					<uni-icons custom-prefix="iconfont" type="icon-paixujiantouxia" color="#FFF"></uni-icons>
				</text> -->
			</view>
			<view class="nav-btnbox" v-else>
				<!-- <text class="nav-btn" @click="onUserInfo">登录/注册</text> -->
			</view>
		</view>
		<view class="" style="position: absolute;top: -100px;">
			<uni-datetime-picker type="date" :show="true" ref="picker1" @change="change1" />
			<uni-datetime-picker type="date" :show="true" ref="picker2" @change="change2" />
		</view>
		<view class="sc-jAaTju hpiOGL">
			<view class="sc-RefOD vGBOp">
				<view class="sc-iQKALj hCTrJd">

					<view @click="show1">
						<view class="sc-ibxdXY cTPCUg">
							<view class="label">开始时间</view>
							<view class="value">
								<!-- <uni-dateformat :format="'yyyy-MM-dd'" :date="time1 - 7200000"></uni-dateformat> -->
								{{time1}}
							</view>
						</view>
					</view>
					<view class="gutter"><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZFNEI0QjZBNjIzRDExRTg4NzcyRkE1RjIwMDVDREI5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZFNEI0QjZCNjIzRDExRTg4NzcyRkE1RjIwMDVDREI5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkU0QjRCNjg2MjNEMTFFODg3NzJGQTVGMjAwNUNEQjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkU0QjRCNjk2MjNEMTFFODg3NzJGQTVGMjAwNUNEQjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nv4PaAAAEyElEQVR42syZe4hVVRTGzz1zFXUeRo0IimjWmDaTD0bIdNRErQQ1MfCBQzhEyi0S8a/UVDRH/EdBpMRSlALNosQsR9G0fDBZaT7GZ2Mpg0KZpuaYD4bpW8y3dXm4+5x7rufoLPjB3fuevfd399177bXXSSxdutx5AMsFZWAweBZ0A+1BHr+/Dv4Ep8FxsBvsAfXZDpjMok0CvAwqwCjQ2ufZx0kP8CqYCf4Dm8EasA00hhncDSl2LPgVVIFxAWJt1pptq9jXmDhm+CmwAgxP810N+A5Ug5OgjkvB4dLoBJ4B/cFQUKLa9gIbwXaQAmeiEDwefAQKVF096+RvPerT9jI5DD5n3XNcTlO4BxxOxEEwFXyW7ZKQtbqQHRixDUB2aRcwI0CszY6ybWf21cB6GWM9x0yEFZxgZ7NV3W/gBTAN/O08uF1iX/3Yt7HZXH6JMIIXgbdVWTZIX/CzE739wr6rVN1UashI8ATwripvoEu65sRn1zjGBlUnGiYGCRZvsFKVxV++Du448dsdjrVZ1a2kJqvgFWqD1YJycNtnkFZ0S7KRWkYg+jbHrGU5n5rSCh6r/GwDl4bfMmgDvqbjb+u3s7NYHhOU9xhObfcJlsHmemb6QIDYb9hZHQ+EWxEuDxn7Q1WeZybECH6Jp44JWOb7dCZ/01YwBJwDL3rcUlS2QJ2YPRm/3BVcoR5c5eNn29L9DAR/UOzvMW1C0fCxKk82gnPpUoyttnTwGKOrAdwUElKejdlzaC2iMddlPNuKlccYzKQLE3eA58EpzmzdQ3B1Wo9oLEtypoxttzTcAkr5uVOWMUQmGy1dNLhDRXiDk55w70dLZy09HqJNDIKfsNRrTSUiuEhVnLA0KuUajtOuWOq1piIR3E5VXLA0kmvMP86jsfPqczuXftXYv07zM60p300zk83aXM8vKGiGGu9bASL4oqro0AwFd1SfL7qeOKCHj2tpjJn9lrG762ua6znZ+vnEqXFbjqVea6pxmT4yNszSaBDDuyjpoHzsIfCKZWytabfLXNdNc5KA4oe0LndxCR5gPJ0uQixmHsOhxj0ukyKb1ENvxCxWYpHvmQ3azxm8bHlWa5HbTb3xw2vVF2+CwpjESgLmB/A02Meg3HYkF1KLozUawRLnHlH5sLkxiO3KmX2Sy3AEuOrz/BznXtr2CG85dwU3eq5Fb6lwMgqTaG8n01O7uMH8woBSTyJngTmF9dH8lYqHc5jniurkS3DTfAtGghs+z5ocW46Kh7+05SVS6pdL2PkpaBGB4Fs8AILEtuCYRSrwSfklUiQ/O0WVR4NPIhIdZEbsaE+OrTYotybp1cWeXNummAOjAo4xXtUt5tIITAaKzQIfqLLsaJNljNr6su8RnpzaLFt4abthvAMq9fXEaXotsMzn/hX2DreMfeprWiXXbWMYwUb0e2CSyrHJlWoa8xFLPBfYTK2Ybc+yr6TKqZVzTOtFIpN3HOvAT8y3DVOHywxSQ9dTzZxFnfI0+TyK5f1df7YvsVzlU94Nlq1ghx1JzuA1noI99dWbTM9ituVlzfvaz2ZyRQpj0nFvbpAvVJQXxm6yrfTRJ4zYMDPsXdtbSR5TXYM4y7J5vK9u/3KaXt0eY+Cz17mXlQxt/wswABAIG1z4uVI5AAAAAElFTkSuQmCC"
							alt="gutter"></view>
					<view @click="show1">
						<view class="sc-ibxdXY cTPCUg">
							<view class="label">结束时间</view>
							<view class="value">
								<!-- <uni-dateformat :format="'yyyy-MM-dd'" :date="time2 - 7200000"></uni-dateformat> -->
								{{time2}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="sc-bwCtUz dgMBqP"><button class="sc-kkGfuU hoqqAL item new-button-small"
					:class="{'new-button-ghost':idx!=1}" @click="changeIdx(1)">当日</button><button
					class="sc-kkGfuU hoqqAL item new-button-small " :class="{'new-button-ghost':idx!=2}"
					@click="changeIdx(2)">近1周</button><button class="sc-kkGfuU hoqqAL item new-button-small "
					:class="{'new-button-ghost':idx!=3}" @click="changeIdx(3)">近1月</button></view>
			<table class="sc-jhAzac ikhgZz" style="width:100%">
				<thead>
					<!-- 交割 -->
					<tr v-show="OrderType==1">
						<th label="名称/委托价" class="sc-fBuWsC kTZnlD">名称/委托价</th>
						<th label="委托量/成交量" class="sc-fBuWsC kTZnlD">委托量/成交量</th>
						<th label="时间" class="sc-fBuWsC kTZnlD">时间</th>
						<th label="操作" class="sc-fBuWsC kTZnlD">操作</th>
					</tr>
					<!-- 委托 -->
					<tr v-show="OrderType==3">
						<th label="名称/成交价" class="sc-fBuWsC kTZnlD">名称/成交价</th>
						<th label="委托量/成交量" class="sc-fBuWsC kTZnlD">成交金额/成交量</th>
						<th label="时间" class="sc-fBuWsC kTZnlD">时间</th>
						<th label="操作" class="sc-fBuWsC kTZnlD">操作</th>
					</tr>
					<!-- 成交 -->
					<tr v-show="OrderType==2">
						<th label="名称/成交价" class="sc-fBuWsC kTZnlD">名称/成交价</th>
						<th label="委托量/成交量" class="sc-fBuWsC kTZnlD">成交金额/成交量</th>
						<th label="时间" class="sc-fBuWsC kTZnlD">时间</th>
						<th label="操作" class="sc-fBuWsC kTZnlD">操作</th>
					</tr>
				</thead>
				<!-- 交割 -->
				<tbody v-show="OrderType==3">
					<tr class="sc-gwVKww bLsDll" v-for="item in deliveryList">
						<td>{{item.gupiao_name}}<br>{{item.deal_price}}</td>
						<td>{{item.residual_quantity}}<br>{{item.volume }}</td>
						<td>{{toDate(item.deal_date)}}
							<div>{{toDate(item.deal_date,1)}}</div>
						</td>
						<td>{{item.business_name}}
							<br>{{Number(item.transfer_fee)+Number(item.stamp_duty)+Number(item.commission)}}</td>
					</tr>
				</tbody>
				<tfoot v-show="OrderType==3&&deliveryList==[]">
					<tr>
						<td colspan="4" class="empty">
							<view class="sc-hrWEMg eaPlaU">
								<image src="/static/new/none.png"></image> <br>暂无数据
							</view>
						</td>
					</tr>
				</tfoot>
				<!-- 委托 -->
				<tbody v-show="OrderType==1">
					<tr class="sc-gwVKww bLsDll" v-for="item in trustList">
						<td>{{item.gupiao_name}}<br>{{item.trust_price}}</td>
						<td>{{item.trust_count}}<br>{{item.volume }}</td>
						<td>{{toDate(item.add_time)}}
							<div>{{toDate(item.add_time,1)}}</div>
						</td>
						<td>{{item.flag2}}
							<br>{{item.status}}</td>
					</tr>
				</tbody>
				<tfoot v-show="OrderType==1&&trustList==[]">
					<tr>
						<td colspan="4" class="empty">
							<view class="sc-hrWEMg eaPlaU">
								<image src="/static/new/none.png"></image> <br>暂无数据
							</view>
						</td>
					</tr>
				</tfoot>
				<!-- 成交 -->
				<tbody v-show="OrderType==2">
					<tr class="sc-gwVKww bLsDll" v-for="item in dealList">
						<td>{{item.gupiao_name}}<br>{{item.amount}}</td>
						<td>{{item.trust_count}}<br>{{item.mini_trans }}</td>
						<td>{{toDate(item.deal_date)}}
							<div>{{toDate(item.deal_date,1)}}</div>
						</td>
						<td>{{item.flag2}}
							<br>{{item.status}}</td>
					</tr>
				</tbody>
				<tfoot v-show="OrderType==2&&dealList==[]">
					<tr>
						<td colspan="4" class="empty">
							<view class="sc-hrWEMg eaPlaU">
								<image src="/static/new/none.png"></image> <br>暂无数据
							</view>
						</td>
					</tr>
				</tfoot>
			</table>
		</view>
		<!-- 订单tab -->
		<!-- 查询列表 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption" :top="0">
			<view class="order-list">


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
									<text class="iconfont"
										:class="accounId===item.id?'icon-checked action':'icon-check'"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	var _self, loginRes;
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				deliveryList: [],
				dataList: [],
				idx: 1,
				titleList: [
					'成交记录',
					'委托记录',
					'成交记录',
					'交割查询',
					'除权除息',
				],
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				downOption: {}, // 下拉刷新的配置(可选, 绝大部分情况无需配置)
				upOption: {
					use: false
				}, // 上拉加载的配置(可选, 绝大部分情况无需配置)
				OrderType: 0,
				token: '',
				index: null,
				subwin: false,
				myMobile: '',
				subId: '',
				beginday: this.getDayDate(0),
				endday: this.getDayDate(0),
				accountData: uni.getStorageSync('accountData'),
				accounId: uni.getStorageSync('accounId') || '',
				sub_account: uni.getStorageSync('sub_account') || '',
				positionList: [],
				cancelList: [],
				trustList: [],
				dealList: [],
				deliveryList: [],
				DateIndex: 0,
				DateList: [{
					index: 0,
					date: '当天'
				}, {
					index: 1,
					date: '本周'
				}, {
					index: 2,
					date: '本月'
				}, {
					index: 3,
					date: '一年'
				}, ],
				time1: '',
				time2: '',
				positionList: [],
				cancelList: [],
				trustList: [],
				dealList: [],
				deliveryList: [],
				accountData: '',
				sub_account: ''
			};
		},
		onLoad(params) {
			this.OrderType = params.type;
			this.accounId = 430
			switch (this.OrderType) {
				case '1':
					this.action = 'trust';
					break;
				case '3':
					this.action = 'delivery';
					break;
				case '2':
					this.action = 'deal_stock';
					break;
					
			}
			this.getnow()
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			if (!this.accountData) {
				this.getSubAccount(this.token); //加载子账户信息
			}
			// 	this.getOrderList(this.token, this.accounId, this.OrderType); //accList[0].id是子账户ID
		},
		methods: {
			getData() {
				uni.request({
					url: this.apiServer + '/market/trade/' + this.action,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						beginday: this.time1,
						endday: this.time2,
						token: this.token,
						id: this.accounId,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status) {
							console.log(this.OrderType, 'this.OrderType')
							if (this.OrderType == 1) this.trustList = res.data.data.list; //委托
							if (this.OrderType == 2) this.dealList = res.data.data; //成交
							if (this.OrderType == 3) this.deliveryList = res.data.data; //交割
							if (this.OrderType == 4) this.dealList = res.data.data; //撤单
							if (this.OrderType == 5) this.positionList = res.data.data; //交割
							//console.log(res.data.data.list);
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
			getnow() {
				this.time1 = this.getFormat(Date.now())
				this.time2 = this.getFormat(Date.now())
				return this.getFormat(Date.now())
			},
			getDates(daysBack) {
				let today = new Date();
				let dateBack = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);

				let year = dateBack.getFullYear();
				let month = (dateBack.getMonth() + 1).toString().padStart(2, '0');
				let day = dateBack.getDate().toString().padStart(2, '0');

				return `${year}-${month}-${day}`
			},
			getDates7Days() {
				console.log(this.getDates(7), '123123')
				return this.getDates(7);
			},
			getDates30Days() {
				return this.getDates(30);
			},
			getFormat(time) {
				var now = new Date(time);
				var year = now.getFullYear();
				var month = (now.getMonth() + 1).toString().padStart(2, '0');
				var day = now.getDate().toString().padStart(2, '0');
				var formattedDate = year + '-' + month + '-' + day;
				return formattedDate
			},
			show1() {
				this.$refs.picker1.show()
			},
			show2() {
				this.$refs.picker2.show()
			},
			change1(e) {
				this.time1 = e
				this.getData()
				console.log(this.time1, '123123')
			},
			change2(e) {
				this.getData()
				this.time2 = e
			},
			changeIdx(id) {
				this.idx = id
				if (id == 1) {
					this.getnow()
				}
				if (id == 2) {
					this.time2 = this.getnow()
					this.time1 = this.getDates7Days()
				}
				if (id == 3) {
					this.time2 = this.getnow()
					this.time1 = this.getDates30Days()
				}
				this.getData()
			},
			toQuery(id) {
				console.log(123123)
				uni.navigateTo({
					url: '/pages/AccoutSet/query?type=' + id
				})
			},
			/*获取交易账户信息*/
			async getSubAccount(token) {
				this.accountData = '';
				uni.showLoading({
					'title': "更新账户列表中"
				});
				uni.removeStorageSync('accountData'); //清除子账户缓存数据
				uni.request({
					url: this.apiServer + '/market/index/getSubAccount',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1 && res.data.data.length != 0) {
							this.accountData = res.data.data;
							uni.setStorageSync('accountData', this.accountData); //子账户数据缓存到本地
							this.accounId = this.accountData[0].id; //默认获取第一个账号的信息
							// this.getacInfo(this.token, this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account', this.sub_account);
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
				uni.hideLoading();
			},
			/*获取持仓信息*/
			async getOrderList(token, id, type) {
				debugger
				if (type == 1) {
					var action = 'position';
				} //持仓this.positionList = '';
				if (type == 2) {
					var action = 'deal_stock';
				} //撤单this.cancelList = '';
				if (type == 3) {
					var action = 'trust';
				} //委托this.trustList = '';
				if (type == 4) {
					var action = 'deal_stock';
				} //成交this.dealList = '';
				if (type == 5) {
					var action = 'delivery';
				} //交割this.deliveryList = '';
				uni.showLoading({
					title: "加载中",
					icon: "loading"
				});
				uni.request({
					url: this.apiServer + '/market/trade/' + action,
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						beginday: this.beginday,
						endday: this.endday,
						token: token,
						id: id,
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status) {
							if (type == 1) this.positionList = res.data.data.list; //持仓
							if (type == 2) this.cancelList = res.data.data.list; //撤单
							if (type == 3) this.trustList = res.data.data.list; //委托
							if (type == 4) this.dealList = res.data.data; //成交
							if (type == 5) this.deliveryList = res.data.data; //交割
							//console.log(res.data.data.list);
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
			async onCancel(order) {
				uni.showLoading({
					title: "撤单申请中",
					icon: "loading"
				});
				uni.request({
					url: this.apiServer + '/market/trade/cancel_order',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 20000,
					data: {
						trust_no: order,
						token: this.token,
						id: this.accounId,
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({
							title: res.data.message,
							icon: "none"
						});
						if (res.data.status) {
							setTimeout(() => {
								this.getOrderList(this.token, this.accounId, this
									.OrderType); //accList[0].id是子账户ID
							}, 1000)
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
			onSubwin(i) {
				/*if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}*/
				this.accounId = this.accountData[i].id; //将array【改变索引】的值赋给定义的picker变量
				this.sub_account = this.accountData[i].sub_account;
				uni.setStorageSync('accounId', this.accounId);
				uni.setStorageSync('sub_account', this.sub_account);
				this.subwin = false;
				// this.getOrderList(this.token, this.accounId, this.OrderType);
				//this.getacInfo(this.token,this.accounId);
				console.log(this.accounId, this.sub_account)
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				//this.getSubAccount(this.token);//获取子账号信息
				// this.getOrderList(this.token, this.accounId, this.OrderType);
				this.getData();
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				setTimeout(() => {
					this.mescroll.endByPage(10, 20);
				}, 2000)
			},
			/*选择查询时间*/
			onDateList(item, index) {
				this.DateIndex = index;
				if (this.DateIndex == 0) {
					this.beginday = this.getDayDate(0);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 1) {
					this.beginday = this.getDayDate(7);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 2) {
					this.beginday = this.getDayDate(30);
					this.endday = this.getDayDate(0);
				}
				if (this.DateIndex == 3) {
					this.beginday = this.getDayDate(365);
					this.endday = this.getDayDate(0);
				}
				this.getOrderList(this.token, this.accounId, this.OrderType);
			},
			/*返回点击*/
			onBack() {
				uni.navigateBack();
			},
			/*订单tab点击*/
			onOrderTab(type) {
				this.OrderType = type;
				this.getOrderList(this.token, this.accounId, type);
				// #ifdef H5
				/*uni.redirectTo({
					url: '/pages/MyOrderList/MyOrderList?type=' + type,
				})*/
				//#endif
			},
			/*股票列表点击*/
			toDeails(code) {
				uni.navigateTo({
					//url: '/pages/GoodsDetails/Candle?code='+code,
					url: '/pages/MarketDetails/MarketDetails?code=' + code,
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			},
			/*获取时间*/
			getDayDate(n) {
				var day = new Date();
				day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * n);
				var dataTime = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
				return dataTime;
			},
			/*获取时间*/
			toDate(timestamp, num = 0) { //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
				timestamp = timestamp + '';
				timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
				var date = new Date(timestamp);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				if (num == 0) {
					return y + '-' + m + '-' + d;
				} else {
					return h + ':' + minute + ':' + second;
				}
			},
			/*识别股票所属交易所*/
			getHouse(code) {
				var str = code.toString();
				var code = str.slice(0, 1);
				var codeName = code >= 6 ? "SH" : "SZ";
				return codeName;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'query.scss';

	/*lz自定义*/
	.order-tab {
		top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));
		height: 88rpx;
	}

	.order-tab .tab {
		height: 100%;
	}

	.order-list {
		margin-top: 100rpx;
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
		padding: 12rpx 0;
		height: auto;
	}

	// tags标签
	// .user-info .date-list .size-list .action{background-color: rgba(233, 59, 61, 0.3);border: 1px solid #fe3b0f;}
	.date-tags {
		display: inline-block;
		padding: 8rpx 26rpx;
		background-color: #EEEEEE;
		margin: 0 8rpx;
		/*border-radius: 44rpx;*/
		box-sizing: border-box;
		border: 1px solid #ddd;
		width: 22%;
		color: #959595;
		text-align: center;
	}

	.date-tags.on {
		background: rgb(233, 59, 61);
		border: 1px solid #fe3b0f;
		color: #FFF;
	}

	//顶部导航栏
	.head-navbar {
		display: flex;
		color: #000;
		height: 88rpx;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center top;
		background-image: url('/static/new/sub-banner.png');

		.pos-absl {
			// position: absolute;top: 0;left: 0;
			// width: 44px;height: 44px;
			position: absolute;
			left: 0;
			top: 0;
			/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
			/* #endif */
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100%;

			text {
				width: 20rpx;
				height: 20rpx;
				border-left: 4rpx solid #ffffff;
				border-bottom: 4rpx solid #ffffff;
				transform: rotate(45deg);
			}

		}

		.nav-title,
		.nav-btnbox {
			flex: 1;
			padding: 0 10rpx;
		}

		.nav-title {
			text-align: right;
			line-height: 88rpx;
			font-weight: 600;
			font-size: 32rpx;
		}

		.nav-btnbox {
			text-align: left;
			display: flex;
			align-items: center;
			font-size: 28rpx;
		}

		.nav-btn {
			padding: 0 20rpx;
			border: #FFF 1px solid;
			border-radius: 10rpx;
		}
	}

	.hpiOGL {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
		overflow: auto;
		padding-bottom: 32px;
		background-color: white;
	}

	.vGBOp {
		background-color: rgb(255, 255, 255);
		padding: 15px 0px 0px;
	}

	.hCTrJd {
		justify-content: space-around;
		padding: 0px 15px 10px;
		display: flex;
		background-color: rgb(255, 255, 255);
		-webkit-box-align: center;
		align-items: center;
	}

	.cTPCUg {
		flex: 1 1 0%;
		text-align: center;
	}

	.cTPCUg .label {
		color: rgb(142, 142, 147);
	}

	.cTPCUg .value {
		font-size: 18px;
		line-height: 1;
	}

	.hCTrJd .gutter {
		width: 0.8rem;
	}

	.hCTrJd .gutter image {
		max-width: 100%;
		max-height: 100%;
	}

	.cTPCUg {
		flex: 1 1 0%;
		text-align: center;
	}

	.cTPCUg .label {
		color: rgb(142, 142, 147);
	}

	.cTPCUg .value {
		font-size: 18px;
		line-height: 1;
	}

	.dgMBqP {
		text-align: center;
		background-color: rgb(255, 255, 255);
		padding: 10px 0px;
	}

	.dgMBqP .item {
		display: inline-block;
		margin: 0px 10px;
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
		line-height: 30px;
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

	.ikhgZz tbody td {
		background-color: rgb(255, 255, 255);
		padding: 5px 3px;
		line-height: 1.2;
		color: rgb(37, 37, 37);
		font-size: 14px;
		text-align: center
	}

	.bLsDll td {
		padding: 10px 0px;
		border-bottom: 1px solid rgb(232, 232, 232);
	}

	.eaPlaU {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;

		image {
			width: 12rem;
			height: 6rem;
		}
	}
</style>
