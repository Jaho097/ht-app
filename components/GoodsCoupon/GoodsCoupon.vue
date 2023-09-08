<template>
		<view class="cu-modal bottom-modal" :class="{'show':isShow}" @click="hide">
		  <view class="cu-dialog">
		    <view class="modal-title">
					<text>确认申请</text>
				</view>
				<!--view class="tips">大列表</view-->
				<view class="coupon-list">
					<view class="list">
						<view class="coupon-price br">
							<view class="full-reduction">
								<text>操盘总额</text>
							</view>
							<view class="discounts">
								<text class="min">￥</text>
								<text class="max">{{applyJson.init_money}}</text>
							</view>
						</view>
						<view class="coupon-price br">
							<view class="full-reduction">
								<text>保证金</text>
							</view>
							<view class="discounts">
								<text class="min">￥</text>
								<text class="max">{{applyJson.deposit_money}}</text>
							</view>
						</view>
						<view class="coupon-price">
							<view class="full-reduction">
								<text>配资金额</text>
							</view>
							<view class="discounts">
								<text class="min">￥</text>
								<text class="max">{{applyJson.borrow_money}}</text>
							</view>
						</view>
					</view>
					<!--view class="tips">小列表</view-->
					
					<!-- <uni-list style="text-align: left;">
						<uni-list-item title="操盘须知" rightText="股市有风险,入市需谨慎" />
						<uni-list-item title="预警线" :note="'(配资资金+保证金x'+applyJson.loss_warn+'%)'" :rightText="applyJson.warning" />
						<uni-list-item title="平仓线" :note="'(配资资金+保证金x'+applyJson.loss_close+'%)'" :rightText="applyJson.unwind" />
						<uni-list-item title="管理费" :note="'(配资资金x操盘期限x'+applyJson.rate+'%)'" :rightText="applyJson.ratemoney" />
						<uni-list-item title="操盘时间" :rightText="applyJson.borrow_duration+' '+applyJson.unit" />
						<uni-list-item title="实际应付" :rightText="applyJson.payable+' 元'" />
					</uni-list> -->
					
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">操盘须知</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="only-title">
									<text>股市有风险，入市需谨慎</text>
								</view>
							</view>							
						</view>
					</view>
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">预警线</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="tag">
									<text>{{applyJson.warning}}</text>
								</view>
								<view class="title">
									<text>(配资资金+保证金x{{applyJson.loss_warn}}%)</text>
								</view>
							</view>							
						</view>
					</view>
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">平仓线</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="tag">
									<text>{{applyJson.unwind}}</text>
								</view>
								<view class="title">
									<text>(配资资金+保证金x{{applyJson.loss_close}}%)</text>
								</view>
							</view>							
						</view>
					</view>
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">管理费</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="tag">
									<text>{{applyJson.ratemoney}}</text>
									<text>元</text>
								</view>
								<view class="title">
									<text>(配资资金x操盘期限x{{applyJson.rate}}%)</text>
								</view>
							</view>							
						</view>
					</view>
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">操盘时间</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="only-tag">
									<text>{{applyJson.borrow_duration}}</text>
									<text>{{applyJson.unit}}</text>
								</view>
								<!--view class="title">
									<text>(配资资金+保证金x50%)</text>
								</view-->
							</view>							
						</view>
					</view>
					<view class="list-min" style="height: 50px;">
						<view class="coupon-price">
							<view class="discounts">
								<text class="max">实际应付</text>
							</view>
						</view>
						<view class="coupon-info">
							<view class="info-title">
								<view class="only-tag">
									<text>{{applyJson.payable}}</text>
									<text>元</text>
								</view>
								<!--view class="title">
									<text>(保证金+管理费)</text>
								</view-->
							</view>							
						</view>
					</view>
				</view>
		  </view>
		  <!-- 确认申请 -->
		  <!-- <view class="uni-py-10 uni-px-8">
		  	<button type="warn" style="width:100%;" class="ConfirmSub uni-radius-5" @click="applySaveSub(token,subform)">确认申请</button>
		  </view> -->
		  <view class="ConfirmSub" @click="applySaveSub(token,subform)">
		  	<text>确认申请</text>
		  </view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				isPage: false,
				token:'',
				form:{},
				subform:{},
				applyJson:[],
			}
		},
		methods: {
			show(token,form){
				this.isPage = true;
				this.subform = form;//这是未做处理的提交表单用
				this.applySave(token,form);
				this.form = form;
				this.token= token;
				setTimeout(() =>{
					this.isShow = true;
					//this.applySave(form,token);
				},300)
			},
			hide(){
				this.isShow = false;
				setTimeout(() =>{
					this.isPage = false;
				},300)
			},
			/*计算单位*/
			calculate(number){
				number = parseInt(number);
				if(number==0 || !number)return 0;
				if(number.toString().length >= 13){
					var unit = (number/1000000000000).toFixed(2);
					return unit + '万亿';
				}else if(number.toString().length >= 9){
					var unit = (number/100000000).toFixed(2);
					return unit + '亿';
				}else if(number.toString().length > 4){
					var unit =  (number/10000).toFixed(2);
					return unit + '万';
				}else{
					var unit =  number.toFixed(2);
					return unit;
				}
			},
			async applySave(token,form){
				//uni.showLoading({'title':"加载中",icon:"none"});
				uni.request({
					url: this.apiServer+'/apicom/handle/applySave',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						type: form.type,
						multiple: form.multiple,
						borrow_duration:form.time,
						deposit_money:form.freeze,
					},
					success: res => {
						//uni.hideLoading();
						if(res.data.status == 1){
							this.applyJson = res.data.data;
							if(this.applyJson.type==1 || this.applyJson.type==5)this.applyJson.unit = '天';
							if(this.applyJson.type==2)this.applyJson.unit = '周';
							if(this.applyJson.type==3)this.applyJson.unit = '月';
							this.applyJson.warning = this.calculate(this.applyJson.borrow_money+(this.applyJson.deposit_money*this.applyJson.loss_warn/100));//预警线
							this.applyJson.unwind = this.calculate(this.applyJson.borrow_money+(this.applyJson.deposit_money*this.applyJson.loss_close/100));//平仓线
							this.applyJson.ratemoney = (this.applyJson.borrow_money*this.applyJson.borrow_duration*this.applyJson.rate/100).toFixed(3);//管理费
							this.applyJson.payable = Number(this.applyJson.deposit_money)+Number(this.applyJson.ratemoney);//应付金额（不能放到下面）
							this.applyJson.init_money   = this.calculate(this.applyJson.init_money);//操盘总额单位
							this.applyJson.deposit_money=this.calculate(this.applyJson.deposit_money);//保证金单位
							this.applyJson.borrow_money = this.calculate(this.applyJson.borrow_money);//配资金额单位
							console.log(this.applyJson);
						}
						//uni.hideLoading();
					},
					complete:function(){
					    uni.stopPullDownRefresh();
					},
					fail:function(e){
						uni.showToast({title:"配资加载失败!",icon:"none"});
					}
				});
			},
			async applySaveSub(token,subform){
				uni.showLoading({title:"配资申请中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/handle/applySaveSub',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token: token,
						type: subform.type,
						multiple: subform.multiple,
						borrow_duration:subform.time,
						deposit_money:subform.freeze,
					},
					success: res => {
							uni.showToast({title:res.data.message,duration:2500,icon:"none"});
							setTimeout(function () {
						       uni.reLaunch({
							      url:'/pages/home/home'
						          });
							}, 3000);						
					},
					complete:function(){
					    uni.hideLoading();
						uni.stopPullDownRefresh();
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"申请失败!",icon:"none"});
					}
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	@import 'GoodsCoupon.scss';
</style>
