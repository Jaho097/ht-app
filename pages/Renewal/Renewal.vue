<template>
	<view class="page">
		<!-- 设置选项 -->
		<view class="setting-head">
			<view class="title">请选择续期期限</view>
			<view class="form">
				<picker @change="bindTimeChange" :range="timeArray">
					<label v-if="index==null" class="normal">选择续期时间</label>
					<label :class="{'red':index!=null}" v-else>{{timeArray[index]+" "+details.units}}</label>
				</picker>
			</view>
		</view>	
		<!-- 设置列表 -->
		<view class="setting-list">
			<view class="list">
				<view class="title">
					<text>操盘期限</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{details.create_time_end}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title" style="width: 55%;">
					<text>续期产生利息</text>
					<text class="min">(当前{{details.units}}利息 x 延期{{details.units}}数)</text>
				</view>
				<view class="more-content" style="width: 45%;">
					<text class="content left"></text>
					<text class="content right green">{{interest}}元</text>
				</view>
			</view>
			<view class="list" @click="onSetting('invoice')">
				<view class="title">
					<text>账户余额</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right red">{{memberMoney.account}}元</text>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="onSubmit(token,id)">提交续期申请</button>
		</view>
		<!-- <view class="quit-login" @click="onSubmit(token,id)">
			<text>提交续期申请</text>
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
				<text>延期期限</text>
				<text>延期总利息</text>
				<text>申请时间</text>
				<text>申请状态</text>
			</view>
			<view class="list" v-for="(item,index) in renewal" :key="index">
				<view class="info"><text class="big">{{item.borrow_duration}}</text></view>
				<view class="info"><text class="big">{{item.borrow_fee}}</text></view>
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
				renewal: {},
				token: '',
				id: '',
				timeD:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
				timeW:['1','2','3','4','5','6','7'],
				timeM:['1','2','3','4','5','6','7','8','9','10','11','12'],
				timeArray:[],	
				memberMoney:[],
				//typeC:{'按天配资':1,'按周配资':2,'按月配资':3},
				interest:'',//单独设置利息值
				form:{},
				
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
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.details = res.data.data.result;
							if(this.details.units=='天')this.timeArray = this.timeD;
							if(this.details.units=='周')this.timeArray = this.timeW;
							if(this.details.units=='月')this.timeArray = this.timeM;
							this.renewal = res.data.data.renewal;
							console.log(this.details);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			bindTimeChange: function(e) {//改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value//将数组改变索引赋给定义的index变量
				this.form.duration  = this.timeArray[this.index]//将array【改变索引】的值赋给定义的picker变量
				this.interest = this.details.deposit_money*this.details.rate*this.form.duration*this.details.multiple/100;
				console.log("选择为：",this.interest)//输出获取的值
			},
			/*提交申请点击*/
			onSubmit(token,id){
				if(!this.form.duration){
					uni.showToast({title:"请选择续期期限",icon:"none"});
					return;
				}
				this.form.deposit_money  = this.details.deposit_money;
				//console.log("提交的数据：",this.form);
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要申请延期?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.request({
						url: this.apiServer+'/apicom/financing/renewal',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							duration: this.form.duration,
							id      : this.id,
							token   : this.token,
						},
						success: res => {
							if(res.data.status == 1){
								uni.showToast({title:res.data.message,icon:"none"});
								uni.navigateTo({
									url: '/pages/Account/Account'
								})
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
	@import 'Renewal.scss';
</style>
