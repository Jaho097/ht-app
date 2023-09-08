<template>
	<view class="page" v-if="show==1">
		<view class="address-input">
			<view class="list-input">
				<view class="title">
					<text>开户人</text>
				</view>
				<view class="content">
					<input type="text" :value="userInfo.name||''" disabled="disabled" placeholder="请填写开户人姓名">
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>选择银行</text>
				</view>
				<view class="content">
					<picker @change="bindBankChange" :range="bankArr">
						<label v-if="bankInfo.bank && index_b==null" class="normal">{{bankInfo.bank}}</label>
						<label v-else-if="index_b==null" class="normal">点击选择</label>
						<label v-else>{{bankList[index_b].name}}</label>
					</picker>
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>银行卡号</text>
				</view>
				<view class="content">
					<input :class="{'card':form.card}" type="text" v-model="form.card" placeholder="请填写银行卡号">
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>开户所在省</text>
				</view>
				<view class="content">
					<picker @change="bindProvChange" :range="provArr">
						<label v-if="bankInfo.province && index_p==null" class="normal">{{bankInfo.province}}</label>
						<label v-else-if="index_p==null" class="normal">点击选择</label>
						<label v-else>{{provList[index_p].name}}</label>
					</picker>
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>开户所在市</text>
				</view>
				<view class="content">
					<picker @change="bindCityChange" :range="cityArr">
						<label v-if="bankInfo.city && index_c==null" class="normal">{{bankInfo.city}}</label>
						<label v-else-if="index_c==null" class="normal">点击选择</label>
						<label v-else>{{cityList[index_c].name}}</label>
					</picker>
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>支行名称</text>
				</view>
				<view class="content">
					<input type="text" v-model="form.branch" placeholder="请输入支行名称">
				</view>
			</view>
		</view>
		<view class="footer-btn">
			<view class="uni-py-10 uni-px-8" style="width: 100%;">
				<button type="warn" style="width:100%;" class="uni-radius-5" @click="onSubmit(addressType)">{{addressType === '1' ? '确认修改':'确认添加'}}</button>
			</view>
			<!-- <view class="btn" @click="onSubmit(addressType)">
				<text>{{addressType === '1' ? '确认修改':'确认添加'}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				show:0,
				addressType: '2',
				userInfo: [],
				bankInfo: [],
				isReal: false,
				token:'',
				index_b: null,
				index_p: null,
				index_c: null,
				bankList: [],
				provList: [],
				cityList: [],
				bankIDs: [],
				bankArr: [],
				provArr: [],
				cityArr: [],
				form:{
					id      : '',
					bank    : '',
					branch  : '',
					card    : '',
					province: '',
					city    : '',
				}
			};
		},
		onLoad(params) {
			this.addressType = params.type||'2';
			this.form.id     = params.id||'';
			uni.setNavigationBarTitle({
				title: this.addressType === '1' ? '编辑银行卡':'新建银行卡'
			});
			loginRes = this.checkLogin();
			if(!loginRes)return;
			this.token = loginRes[2];
		},
		onReady() {
			this.addressType === '1' ? this.getEditBank():this.getUserInfo();
		},
		methods:{
			async getUserInfo(){
				this.show = 0;
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/member/userInfo',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{
						token : this.token,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status == 1){
							var userInfo = res.data.data;
							this.userInfo = userInfo; 
							//console.log(userInfo)
							if(userInfo.id_card!='' && userInfo.name!='' && userInfo.id_auth==1){
								this.getBanks();
								
							}else{
								uni.showToast({title: '您还没有实名认证！',icon: 'none'})
								setTimeout(() =>{
									uni.navigateBack();
								},2000)
							}
						}
					},
					complete: res => {
						this.getArea(1);//1：省份；2：城市
					}
				});
			},
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
							var bankList  = res.data.data.bank;
							this.bankList = bankList;
							for(let i in bankList){
								this.bankArr.push(bankList[i].name);
							}
							//console.log(this.bankArr)
						}
					}
				});
			},
			async getEditBank(){
				this.show = 0;
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/member/editBank',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id: this.form.id,
						token : this.token,
					},
					success: res => {
						if(res.data.status == 1){
							var bankInfo  = res.data.data.bankinfo;
							this.userInfo.name = res.data.data.name;
							this.bankInfo = bankInfo;
							//console.log(this.bankInfo)
							this.form.id       = bankInfo.id;
							this.form.bank     = bankInfo.bank_name;
							this.form.branch   = bankInfo.branch;
							this.form.card     = bankInfo.card;
							this.form.province = parseFloat(bankInfo.provinces_id);
							this.form.city     = parseFloat(bankInfo.city_id);
							
							this.bankList  = res.data.data.web_bank;
							for(let i in this.bankList){
								//this.bankIDs.push(i);
								this.bankArr.push(this.bankList[i].name);
							}
						}
					},
					complete: res => {
						this.getArea(1);//1：省份；2：城市
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			async getArea(reid){
				if(!parseFloat(reid))return;
				uni.request({
					url: this.apiServer+'/apicom/member/getArea',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						reid  : reid,
						token : this.token,
					},
					success: res => {
						uni.hideLoading();
						this.show = 1;//当显示状态为1时才显示
						if(res.data.status == 1){
							if(reid === 1){
								//this.provArr.splice(0,this.provArr.length);//清空数组
								this.provList = res.data.data;
								for(let i in this.provList){
									this.provArr.push(this.provList[i].name);
								}
							}else{
								this.index_c = null;//当重新选择省份时，将城市ID默认第一个
								this.cityArr.splice(0,this.cityArr.length);//清空城市数组
								this.cityList = res.data.data;
								for(let c in this.cityList){
									this.cityArr.push(this.cityList[c].name);
								}
							}
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
				
			},
			async onSubmit(type){
				if(!this.form.bank){uni.showToast({title:"请选择银行!",icon:"none"});return;}
				if(!this.form.card){uni.showToast({title:"请填写卡号或账号!",icon:"none"});return;}
				if(!this.form.province){uni.showToast({title:"请选择省份!",icon:"none"});return;}
				if(!this.form.city){uni.showToast({title:"请选择城市!",icon:"none"});return;}
				if(!this.form.branch){uni.showToast({title:"请填写支行地址!",icon:"none"});return;}
				if(type === '1'){
					var action = 'doEdit';
				}else{
					var action = 'addBank';
				}
				uni.request({
					url: this.apiServer+'/apicom/member/'+action,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id      : this.form.id,
						bank    : this.form.bank,
						branch  : this.form.branch,
						card    : this.form.card,
						province: this.form.province,
						city    : this.form.city,
						token   : this.token,
					},
					success: res => {
						if(res.data.status == 1){
							uni.showToast({title:res.data.message,icon:"none"});
							setTimeout(() =>{
								uni.navigateBack();
							},2000)
						}else{
							uni.showToast({title:res.data.message,icon:"none"});
						}
					}
				});
			},
			bindBankChange(e){
				this.index_b = e.target.value;//将数组改变索引赋给定义的index变量
				this.form.bank  = this.bankList[this.index_b].id;//将array【改变索引】的值赋给定义的picker变量
				console.log(this.bankList[this.index_b].name);
				console.log("bank：",this.form.bank);//输出获取的值
			},
			bindProvChange(e){
				this.index_p = e.target.value;//将数组改变索引赋给定义的index变量
				this.form.province  = this.provList[this.index_p].id;//将array【改变索引】的值赋给定义的picker变量
				this.getArea(this.form.province);//1：省份；2：城市
				console.log("province：",this.form.province);//输出获取的值
			},
			bindCityChange(e){
				this.index_c = e.target.value;//将数组改变索引赋给定义的index变量
				this.form.city  = this.cityList[this.index_c].id;//将array【改变索引】的值赋给定义的picker变量
				console.log("city：",this.form.city);//输出获取的值
			},
			//查询对应的银行名称
			findBank(bank){
				var arr = this.bankList;
				for (let i = 0; i < arr.length; i++) {
				  if(bank == arr[i].id) return arr[i].name;
				}
			},
			//查询对应的省份名称
			findProv(province){
				var arr = this.provList;
				for (let i = 0; i < arr.length; i++) {
				  if(province == arr[i].id) return arr[i].name;
				}
				this.getArea(province);//1：省份；2：城市
			},
			//查询对应的城市名称
			findCity(city){
				var arr = this.cityList;
				for (let i = 0; i < arr.length; i++) {
				  if(city == arr[i].id) return arr[i].name;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'AddressEdit.scss';
</style>
