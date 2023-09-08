<template>
	<view class="page">
		<!-- 地址列表 -->
		<view class="address-list"  id="bank-card">
			<uni-list v-for="(item,index) in banks" :key="index">
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box bank-name">
							{{findBank(item.bank)}} 
							<!-- 银行标识图标 {{item.bank}} -->
							<uni-tag :text="item.bank" circle="true" type="error" size="mini"/>
							<!-- <uni-icons custom-prefix="iconfont" v-if="item.bank === 'ABC'" type="icon-nongyeyinhang" size="14" color="#148F79"></uni-icons> -->
						</view>
					</template>
					<template v-slot:footer>
						<view class="slot-box">
							<text class="bank-khh">开户行:</text>
							<text class="bank-area">{{item.branch}}</text>
						</view>						
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box bank-num">卡号：{{item.card.substr(0,3)+"***********"+item.card.substr(15,19)}}</view>
					</template>
					<template v-slot:footer>
						<view class="slot-box">
							<uni-tag inverted="true" text="修改" @click="onAddressEdit(1,item.id)"
								custom-style="border-color: rgba(0,0,0,0); color: #2979FF;"
								type="primary" size="mini" class="bank-btn uni-mr-4"/>
								
							<uni-tag inverted="true" text="删除"  @click="onAddressDel(item.id)"
								custom-style="border-color: rgba(0,0,0,0); color: #E43D33;"
								size="mini" class="bank-btn"/>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			
			
						
			<!-- <view class="list" v-for="(item,index) in banks" :key="index">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">{{findBank(item.bank)}}</text>
						<text class="tag">{{item.bank}}</text>
					</view>
					<view class="phone">
						<text>卡号：{{item.card.substr(0,3)+"***********"+item.card.substr(15,19)}}</text>
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text>开户支行：{{item.branch}}</text>
					</view>
					<view class="edit" @click.stop="onAddressEdit(1,item.id)">
						<text class="iconfont icon-edit1"></text>
					</view>
					<view class="edit" @click.stop="onAddressDel(item.id)">
						<text class="iconfont icon-close1 icon_14"></text>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 添加地址 -->
		
		<view class="add-address">
			<view class="uni-py-10 uni-px-8" style="width: 100%;">
				<button type="warn" style="width:100%;" class="uni-radius-5" @click="onAddressEdit(2)">添加新银行卡</button>
			</view>
			<!-- <view class="btn" @click="onAddressEdit(2)">
				<text>添加新银行卡</text>
			</view> -->
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
				token:'',
				bankL :[],
				banks:[],
			};
		},
		/*onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes)return;
			this.token = loginRes[2];
			this.getBanks();
		},*/
		onShow() {
			loginRes = this.checkLogin();
			if(!loginRes)return;
			this.token = loginRes[2];
			this.getBanks();
		},
		methods:{
			async getBanks(){
				uni.request({
					url: this.apiServer+'/apicom/member/bankInfo',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						token : this.token,
					},
					success: res => {
						if(res.data.status == 1){
							this.bankL = res.data.data.bank;
							this.banks = res.data.data.banks;
						}
					}
				});
			},
			findBank(bank){
				var arr = this.bankL;
				for (let i = 0; i < arr.length; i++) {
				  if(bank == arr[i].id) return arr[i].name;
				}
			},
			/* 编辑点击*/
			onAddressEdit(type,id){
				uni.navigateTo({
					url: '/pages/AddressEdit/AddressEdit?type='+type+'&id='+id,
				})
			},
			async onAddressDel(id){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要删除银行卡?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.request({
						url: this.apiServer+'/apicom/member/delBank',
						header: {'content-type' : "application/x-www-form-urlencoded"},
						method: 'POST',
						timeout: 5000,
						data:{
							id    : id,
							token : this.token,
						},
						success: res => {
							if(res.data.status == 1){
								uni.showToast({title: res.data.message,icon: 'none'})
								setTimeout(() =>{
									this.getBanks();
								},2000)
							}
						},
						fail:function(e){
							uni.showToast({title:"与服务器失去联系!",icon:"none"});
						}
					});
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'AddressList.scss';
	
	
// lz 自定义
.bank-name,.bank-khh,.bank-num{color: #323233;}
.bank-area{color: #969799;}
.bank-name,.bank-khh,.bank-num,.bank-area{font-size: 30rpx;}
.bank-btn{font-size: 30rpx;font-weight: 700;}
</style>
