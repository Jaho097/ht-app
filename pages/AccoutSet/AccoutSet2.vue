<template>
	<view class="page">
		<!-- 设置列表 -->
		<view class="setting-list">
			<uni-list>
				<uni-list-item
					@click="subwin = true" 
					title="申请单号" :rightText="details.order_id"/>
				<uni-list-item
					@click="subwin = true" 
					title="操盘期限" :rightText="details.verify_time+'至'+details.end_time"/>
				<uni-list-item showArrow link
					@click="onSetting('renewal',id)"
					title="自动续期" rightText="申请延期"/>
				<uni-list-item  link
					v-if="true||details.type_code==1||details.type_code==2||details.type_code==3"
					@click="onSetting('addmoney',id)" 
					title="保证金"  :rightText="calculate(details.deposit_money)"/>
					<!-- title="保证金" :note="calculate(details.deposit_money)" rightText="追加资金"/> -->
					
				<uni-list-item  link
					v-if="true||details.type_code==1||details.type_code==2||details.type_code==3"
					@click="onSetting('expend',id)"
					title="总操盘资金"  :rightText="calculate(details.init_money)" />
					
				<uni-list-item  link
					v-if="true||details.type_code==1||details.type_code==2||details.type_code==3"
					@click="onSetting('profit',id)"
					title="预计盈亏" :rightText="calculate(details.return_money)" />
					
			<!-- </uni-list>
			<uni-list> -->
				<uni-list-item @click="subwin = true" title="交易账户" :rightText="details.sub_account"/>
				<uni-list-item title="总资产" :rightText="details.avail"/>
				<uni-list-item title="警戒线" :rightText="calculate(details.loss_warn_money)"/>
				<uni-list-item title="平仓线" :rightText="calculate(details.loss_close_money)"/>
				<uni-list-item title="总利息" :rightText="calculate(details.borrow_interest)"/>
					
				
				<!-- <uni-list-item 
					@click="onSetting('account')"
					title="总资产" :rightText="calculate(accountInfo.total_money)"/>
									
				<uni-list-item 
					@click="subwin = true" 
					title="配资模式" :rightText="details.type"/>
				<uni-list-item 
					@click="subwin = true" 
					title="操盘状态" :rightText="details.status"/>
				<uni-list-item 
					@click="subwin = true" 
					title="交易账户" :rightText="details.sub_account"/>
				
				<uni-list-item showArrow link
					@click="onSetting('renewal',id)"
					title="自动续期" rightText="申请延期"/> -->
				<uni-list-item showArrow link
					style="color:blue"
					@click="onSetting('agreement')"
					title="查看合同" rightText="《平台操盘协议》"/>
				
				<view class="list uni-px-7">
					<view class="title">
						<text>自动续期</text>
					</view>
					<view class="more-content" v-if="details.type_code==1||details.type_code==2||details.type_code==3">
						<switch class="red sm" color="red !important" :checked="treatmentStatu.checked" @change="switchChange" style="transform:scale(0.8)"></switch>
						<text class="content left">{{details.renewal==1 ? '开启':'关闭'}}</text>
						<text class="content right" @click="onSetting('renewal',id)"><span>申请延期</span></text>
						<text class="iconfont icon-liuchengxiangdao"></text>
					</view>
				</view>
				
			</uni-list>
			
			
			
		</view>
		
		<!-- 按钮 -->
		<view class="uni-py-10 uni-px-8" style="display: flex;">
			<button type="warn" style="width:45%;    background-color: rgb(179, 141, 74);
    background-image: linear-gradient(112deg, rgb(220, 190, 127) 0%, rgb(179, 141, 74) 100%);" class="uni-radius-5" @click="onStot(token,id)">实盘交易</button>
			<button type="warn" style="width:45%;" class="uni-radius-5" v-if="details.status=='未通过'" @click="form.freeze?goNext():''" disabled="true">未通过</button>
			<button type="warn" style="width:45%;background: rgb(255, 69, 0);" class="uni-radius-5" v-else @click="onStot(token,id)">终止操盘</button>
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
	var _self,loginRes;
	export default {
		data() {
			return {
				myMobile: '',
				details: {},
				accountInfo:uni.getStorageSync('accountInfo'),
				token: '',
				id: '',
				treatmentStatu: { checked: false },
			};
		},
		onLoad(params){
			//console.log(params.token+" "+params.id)
			_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = params.token;
			this.id    = params.id;
			console.log(this.id, 'this.id');
			this.getDetails(params.token,params.id);
			//this.getacInfo(params.token,params.id);
		},
		methods:{
			/*获取操盘账户相关信息*/
			async getDetails(token,id){
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
							this.details  = res.data.data.result;
							if(res.data.data.result.renewal==1){
								this.$set(this.treatmentStatu, 'checked', true)
							}else{
								this.$set(this.treatmentStatu, 'checked', false)
							}
							console.log(this.details);
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
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					},
				});
			},
			/*自动续期按钮*/
			switchChange (e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value)   // 将点击改变的状态赋给treatmentStatu.checked
				uni.request({
					url: this.apiServer+'/apicom/financing/autorenewal',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : this.details.id,
						token: this.token
					},
					success: res => {
						if(res.data.status != 1){
							//this.renewal  = res.data.data;
							that.$set(that.treatmentStatu, 'checked', false)  // 手动修改switch的状态，视图会同步更新
							//console.log(res.data.message);
						}else{
							that.$emit('changePage', 1)
							//console.log(res.data.message);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/**
			 * 设置列表点击
			 * @param {String} type
			 */
			onSetting(type,id){
				console.log(type);
				switch(type) {
					case 'renewal':
						uni.navigateTo({
							url: '/pages/Renewal/Renewal?id='+id
						})
						break;
					case 'addmoney':
						uni.navigateTo({
							url: '/pages/Addmoney/Addmoney?id='+id
						})
						break;
					case 'expend':
						uni.navigateTo({
							url: '/pages/Expend/Expend?id='+id
						})
						break;
					case 'profit':
						uni.navigateTo({
							url: '/pages/Profit/Profit?id='+id
						})
						break;
					case 'agreement':
						uni.navigateTo({
							url: '/pages/Agreement/Agreement?id='+id
						})
						break;
				}
			},
			/*终止操盘点击*/
			onStot(token,id){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要终止操盘?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.request({
						url: this.apiServer+'/apicom/financing/stop',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							token: token,
							id   : id,
						},
						success: res => {
							if(res.data.status == 1){
								uni.showToast({title:res.data.message,icon:"none"});
							}else{
								uni.showToast({title:res.data.message,icon:"none"});
							}
						},
						complete:function(){
						    uni.stopPullDownRefresh();
						},
						fail:function(e){
							uni.showToast({title:"加载失败!",icon:"none"});
						}
					});
				})
			},
			/*计算单位*/
			calculate(number){
				//console.log(Math.abs(parseInt(number)));return;
				if(Math.abs(parseInt(number))==0)return number;
				if(Math.abs(parseInt(number)).toString().length >= 13){
					var unit = (parseInt(number)/1000000000000).toFixed(2) + '万亿';
					return unit;
				}else if(Math.abs(parseInt(number)).toString().length >= 9){
					var unit = (parseInt(number)/100000000).toFixed(2) + '亿';
					return unit;
				}else if(Math.abs(parseInt(number)).toString().length > 4){
					var unit =  (parseInt(number)/10000).toFixed(2) + '万';
					return unit;
				}else{
					var unit =  parseInt(number).toFixed(2);
					return unit;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'AccoutSet.scss';
// lz
.setting-list{padding: 0;margin-top: 0;}
</style>
