<template>
	<view class="page">
		<!-- 设置选项 -->
		<view class="setting-head">
			<view class="title">扩大配资金额</view>
			<view class="form">
				<input type="number" :class="{'text-bold red':form.freeze}" v-model="form.freeze" 
				@keyup="UpNumber" @keydown="UpNumber" @input="onInput" 
				placeholder="请输入扩大保证金金额">
			</view>
			<view></view>
		</view>	
		<!-- 设置列表 -->
		<view class="setting-list">
			<view class="list">
				<view class="title">
					<text>操盘期限</text>
				</view>
				<view class="more-content">
					<!--text class="content left"></text-->
					<text class="content right">{{details.create_time_end}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title" style="width: 55%;">
					<text>扩大配资金额</text>
					<text class="min">(扩大保证金 x {{details.multiple}}倍杠杆率)</text>
				</view>
				<view class="more-content" style="width: 45%;">
					<text class="content left"></text>
					<text class="content right">{{form.emoney}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>当前操盘资金</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{details.init_money}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>扩大后操盘资金</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{form.total}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>账户余额</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right red">{{memberMoney.account}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>产生利息</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right green" @click="getRate(form.freeze)">{{form.rated}}元</text>
				</view>
			</view>
			<view class="list" @click="onSetting('invoice')">
				<view class="title">
					<text>应付金额</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right red text-bold">{{form.payable}}元</text>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="form.payable?onSubmit(token,id):getRate(form.freeze)">{{form.payable?'提交续期申请':'下一步'}}</button>
		</view>
		<!-- <view class="quit-login" @click.stop="form.payable?onSubmit(token,id):getRate(form.freeze)">
			<text>{{form.payable?'提交续期申请':'下一步'}}</text>
		</view> -->
		<view style="height: 20rpx;background-color: #f6f6f6;"></view>
		
		<!-- 申请记录 -->
		<!-- <view class="setting-list">
			<view class="list">
				<view class="title">
					<text>申请记录</text>
				</view>
				<view class="more-content justify-between">
					<text class="content left"></text>
					<text class="basis-sm cu-btn cuIcon-refresh" @click="getDetails(token,id)">刷新</text>
				</view>
			</view>
		</view> -->
		<view class="setting-list">
			<view class="list">
				<uni-section title="申请记录" type="line" style="margin-top: 0;"></uni-section>
				<view>
					<uni-tag text="刷新" type="error" @click="getDetails(token,id)" />
				</view>
			</view>
		</view>
		<view class="position">
			<view class="title">
				<text>扩大保证金</text>
				<text>产生利息</text>
				<text>申请时间</text>
				<text>申请状态</text>
			</view>
			<view class="list nothing" v-if="!expend"><text class="none">没有记录</text></view>
			<view class="list" v-else v-for="(item,index) in expend" :key="index">
				<view class="info"><text class="big">{{item.money}}</text></view>
				<view class="info"><text class="big">{{item.borrow_interest}}</text></view>
				<view class="info">
					<text class="big">{{item.create_time_m}}</text>
					<text>{{item.create_time}}</text>
				</view>
				<view class="info"><text class="big">{{item.status}}</text></view>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				index: null,
				details: {},
				expend: {},
				token: '',
				id: '',
				accountInfo:{},
				memberMoney:[],
				interest:'',//单独设置利息值
				form:{
					freeze : '',
					rated  : 0,
					payable: 0,
					total  : 0,
					emoney : 0,
				},
				
			};
		},
		onLoad(params){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			console.log(loginRes);
			this.token = loginRes[2];
			this.id    = params.id;//子账户ID
			this.gstMember(this.token);
			this.getDetails(this.token,this.id);//获取子账号信息
		},
		methods:{
			/*获取会员信息*/
			async gstMember(token){
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
							this.memberMoney  = res.data.data.money;
							//console.log(this.memberMoney);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取操盘账户相关信息*/
			async getDetails(token,id){
				this.renewal = '',
				uni.request({
					url: this.apiServer+'/apicom/financing/details?id='+id,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{token:token},
					success: res => {
						if(res.data.status == 1){
							this.details = res.data.data.result;
							this.expend  = res.data.data.addfinancing;
							this.form.total  = parseInt(this.details.init_money);//扩大后的资金
							console.log(this.details);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			async getRate(freeze){
				if(freeze){
					uni.request({
						url: this.apiServer+'/apicom/financing/calculate_rate',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							deposit_money: freeze,
							endTime      : this.details.end_time_st,
							multiple     : this.details.multiple,
							rate         : this.details.rate,
							type         : this.details.type_code,
							token        : this.token,
						},
						success: res => {
							if(res.data.status == 1){
								var data = res.data.data;
								this.form.rated   = data;
								this.form.payable = parseFloat(this.form.freeze) + data;//应付金额
								console.log(this.form.rated)
							}
						},
					});
				}
			},
			UpNumber(e) {
				e.target.value = e.target.value?e.target.value.replace(/[^\d]/g,""):0;
			},
			onInput(e) {
				var freeze = e.target.value||0;//监听获取输入框改变值
				this.form.freeze = parseInt(freeze?freeze.replace(/[^\d]/g,''):0);
				this.form.total  = parseInt(this.details.init_money)+parseInt(freeze);//扩大后
				this.form.emoney = parseInt(freeze*this.details.multiple);//需要扩大的资金
			},
			/*提交申请点击*/
			onSubmit(token,id){
				if(!this.form.freeze){
					uni.showToast({title:"请输入扩大保证金金额",icon:"none"});
					return;
				}
				//this.form.deposit_money  = this.details.deposit_money;
				//console.log("提交的数据：",this.form);
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要扩大配资?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.request({
						url: this.apiServer+'/apicom/financing/expend',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							deposit_money: this.form.freeze,
							id           : this.id,
							token        : this.token,
						},
						success: res => {
							if(res.data.status == 1){
								uni.showToast({title:res.data.message,icon:"none"});
							}else{
								uni.showToast({title:res.data.message,icon:"none"});
							}
						},
						fail:function(e){
							uni.showToast({title:"加载失败!",icon:"none"});
						}
					});
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Expend.scss';
</style>
