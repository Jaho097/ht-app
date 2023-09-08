<template>
	<view class="page">
		<!-- 设置选项 -->
		<view class="setting-head">
			<view class="title">请输入要提取的盈利额</view>
			<view class="form">
				<input type="number" v-model="form.freeze" @keyup="UpNumber" @keydown="UpNumber"
				:class="{'red text-bold':form.freeze}"
				@input="onInput" placeholder="请输入金额">
			</view>
			<view class="tip">
				<text>可提盈利：{{revSult.return_money}}元</text>
				<text class="blue" @click="CopyMoney(revSult.return_money)">全部提取</text>
			</view>
			
		</view>	
		<!-- 设置列表 -->
		<view class="setting-list">
			<view class="list">
				<view class="title">
					<text>可用余额</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{revSult.avail?revSult.avail.toFixed(2):0.00}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>账号总资产</text>
					<!--text class="min">(当前{{details.units}}利息 x 延期{{details.units}}数)</text-->
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{accountInfo.total_money}}元</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>总操盘资金</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right">{{revSult.init_money}}元</text>
				</view>
			</view>
			<view class="list" @click="onSetting('invoice')">
				<view class="title">
					<text>提盈后可用余额</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right red">{{revSult.avail?(revSult.avail-form.freeze).toFixed(2):0.00}}元</text>
				</view>
			</view>
			<view class="list" @click="onSetting('invoice')">
				<view class="title">
					<text>确认提盈</text>
				</view>
				<view class="more-content">
					<text class="content left"></text>
					<text class="content right red text-bold">{{form.freeze}}元</text>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="onSubmit(token,id)">提交提取盈利申请</button>
		</view>
		<!-- <view class="quit-login" @click="onSubmit(token,id)">
			<text>提交提取盈利申请</text>
		</view> -->
		<view style="height: 20rpx;background-color: #f6f6f6;"></view>
		
		<!-- 申请记录 -->
		<view class="setting-list">
			<view class="list">
				<uni-section title="申请记录" type="line"></uni-section>
				<view>
					<uni-tag text="刷新" type="error" @click="getDetails(token,id)" />
				</view>
			</view>
		</view>
		<view class="position">
			<view class="title">
				<text>提取盈利</text>
				<text>申请时间</text>
				<text>申请状态</text>
			</view>
			<view class="list" v-for="(item,index) in revExtr" :key="index">
				<view class="info"><text class="big">{{item.money}}</text></view>
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
				revExtr: {},
				token: '',
				id: '',
				memberMoney:[],
				accountInfo:uni.getStorageSync('accountInfo'),
				revSult:'',
				form:{
					freeze:''
				},
				
			};
		},
		onLoad(params){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.id    = params.id;//子账户ID
			this.gstMember(this.token);
			//this.getacInfo(this.token,this.id);
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
			/*获取会员资金相关信息*/
			async getacInfo(token,id){
				if(token=='' || id==''){return;}
				uni.request({
					url: this.apiServer+'/market/trade/account_info',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						id:    id,
					},
					success: res => {
						if(res.data.status == 1){
							this.accountInfo  = res.data.data;
							this.getDetails(this.token,this.id);//获取子账号信息
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					},
				});
			},
			/*获取操盘账户相关信息*/
			async getDetails(token,id){
				this.revExtr = '',
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
							this.revSult = res.data.data.result;
							this.revExtr = res.data.data.rev_extraction;
							//console.log(this.accountInfo.total_money);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			UpNumber(e) {
				e.target.value = e.target.value?e.target.value.replace(/[^\d]/g,""):0;
			},
			onInput(e) {
				var freeze = e.target.value||0;//监听获取输入框改变值
				this.form.freeze=parseInt(freeze?freeze.replace(/[^\d]/g,''):0);
				this.form.close = (this.details.init_money-this.details.loss_close_money+parseInt(freeze)).toFixed(2);//平仓线
				this.form.warn  = (this.details.init_money-this.details.loss_warn_money +parseInt(freeze)).toFixed(2);//警戒线
				this.form.init  = (this.details.init_money+parseInt(freeze)).toFixed(2);//追加后
			},
			/*提交申请点击*/
			onSubmit(token,id){
				if(!this.form.freeze){
					uni.showToast({title:"请输入要提取的盈利额",icon:"none"});
					return;
				}
				if(this.form.freeze<=100){
					uni.showToast({title:"提取股票盈利需满足盈利金额大于100元",icon:"none"});
					return;
				}
				if(this.form.freeze>this.accountInfo.return_money){
					uni.showToast({title:"提取股票盈利额不得大于可提盈利额",icon:"none"});
					return;
				}
				//console.log("提交的数据：",this.form);
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要提取的盈利额?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.request({
						url: this.apiServer+'/apicom/financing/drawprofit',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							money: this.form.freeze,
							id   : this.id,
							token: this.token,
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
			},
			CopyMoney(value){
				this.form.freeze = parseInt(value);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Profit.scss';
	
// lz
// 标题
.setting-list .list{overflow: hidden;}
// 申请列表
.position .list{
	height: auto;
	.info{display: flex;align-items: center;}
	.info:nth-child(2){
		flex-direction: column;
	}
}
</style>
