<template>
	<view class="page">
		<view class="my-top">
			<!-- head -->
			<view class="head" :style="scrollTop>20?'background: linear-gradient(to left,#39b54a, #1cbbb4);':''">
				<view class="back" @click="onBack()">
					<text></text>
				</view>
				<view class="heat-title">代理中心</view>
				<view class="title">
					<text v-show="scrollTop>20"></text>
				</view>
				<view class="setting-mess">
					<view class="mess">
						<!--text class="iconfont icon-xiaoxi"></text>
						<text class="num">{{memberInfo.msg_num}}</text-->
					</view>
				</view>
			</view>
			<!-- 用户信息 -->
			<view class="user-info"></view>
			<!-- 子账号信息 -->
			<view class="focus-area">
				<view class="list">
					<view class="num">
						<text>{{ConfData.count_m||'0'}}</text>
					</view>
					<view class="title">
						<text>团队成员(人)</text>
					</view>
				</view>
				<view class="list">
					
					<view class="num">
						<text>{{ConfData.count||'0.00'}}</text>
					</view>
					<view class="title">
						<text>赚取佣金(元)</text>
					</view>
				</view>
			</view>
			<view class="order-info">
				<view class="order-li" v-if="item.show"
				v-for="(item,index) in navList" :key="index" 
				@click="item.id==1?getInvite(token,1):item.id==2?openAcc():''">
					<view class="icon"><text :class="item.icon"></text></view>
					<view class="title"><text>{{item.name}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="my-info">
			<!-- 列表 -->
			<view class="my-service">
				<view class="service-list" v-for="(item,index) in InviteList" :key="index">
					<view class="title">
						<view class="name">{{item.name||'未实名'}}</view>
						<view class="mobile">账号：{{item.mobile}}</view>
						<view class="mobile text-sm">注册时间：{{item.create_time+' '+item.create_time_m}}</view>
					</view>
					<view class="more">
						<view class="list" :hover-class="action" :hover-stay-time="100" 
						@click="getOrderList(1,token,item.id,item.mobile)">
							<text class="icon cuIcon-rank"></text>
							<text class="title">持仓</text>
						</view>
						<view class="list" :hover-class="action" :hover-stay-time="100" 
						@click="getMoneyList(2,token,0,item.id,item.mobile,1)">
							<text class="icon cuIcon-form"></text>
							<text class="title">明细</text>
						</view>
						<view class="list" :hover-class="action" :hover-stay-time="100"
						@click="getOrderList(5,token,item.id,item.mobile)">
							<text class="icon cuIcon-calendar"></text>
							<text class="title">交割</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<use-coupon ref="UseCoupon"></use-coupon>
		<use-serves ref="UseServes"></use-serves>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	import UseCoupon from '../../components/UseCoupon/UseCoupon.vue';
	import UseServes from '../../components/UseServes/UseServes.vue'
	export default {
		components:{
			//详情
			UseCoupon,UseServes
		},
		data() {
			return {
				scrollTop: 0,
				isHotline: false,
				isHotTitle : '',
				isHotText : '',
				token: '',
				index: null,
				myMobile: '',
				isChecked:false,
				accountInfo:{},
				ConfData : {},
				InviteList : '',
				navList: [
					{
						id: 1,name: '查看下级',show: 1,icon:'cuIcon-peoplelist icon_20'
					},{
						id: 2,name: '下级开户',show: 1,icon:'cuIcon-rank icon_20'
					},{
						id: 3,name: '账目明细',show: 0,icon:'cuIcon-form icon_20'
					},{
						id: 4,name: '下级交割',show: 0,icon:'cuIcon-calendar icon_20'
					}
				],
				treatmentStatu: { checked: false },
				action : 'action',
				beginday:this.getDayDate(30),
				endday  :this.getDayDate(0),
			};
		},
		onLoad(){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			this.getConf(this.token);
			this.getInvite(this.token,1);
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			async getConf(token){
				uni.request({
					url: this.apiServer+'/apicom/Invite/conf',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{token: token},
					success: res => {
						if(res.data.status == 1){
							this.ConfData = res.data.data;
							if(!res.data.data.agent_id){
								uni.showToast({title:"您不是代理!",icon:"none"});
								this.onBack();
							}
						}else{
							this.onBack();
						}
					},
					fail: (e) => {
						uni.showToast({title:"加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			/*获取持仓信息*/
			async getOrderList(type,token,id,mobile){
				if(type==1){var action = 'agent_position';this.pList = '';}//持仓
				if(type==5){var action = 'agent_delivery';this.deList = '';}//交割
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/market/trade/'+action,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						beginday: this.beginday,
						endday  : this.endday,
						token   : token,
						id      : id,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status){
							var datalist = res.data.data;
							this.$refs['UseCoupon'].show(type,mobile,datalist);
							//console.log(res.data.data.list);
						}else{
							uni.showToast({title:"没有数据!",icon:"none"});
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取操盘信息*/
			async getMoneyList(type,token,keyword,id,mobile,page){
				uni.showLoading({title:"加载中",icon:"loading"});
				this.MoneyList = '';
				if(keyword==0)keyword='';
				uni.request({
					url: this.apiServer+'/apicom/moneylog/agent_index',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						_search_field : "type",
						keyword : keyword,
						token   : token,
						page    : page,
						id      : id,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status){
							var datalist = res.data.data;
							this.$refs['UseCoupon'].show(type,mobile,datalist);
						}else{
							uni.showToast({title:"没有数据!",icon:"none"});
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*获取下级信息*/
			async getInvite(token,page){
				uni.showLoading({title:"加载中",icon:"loading"});
				uni.request({
					url: this.apiServer+'/apicom/Invite',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 20000,
					data:{
						order : '0',
						page  : page,
						token : token,
					},
					success: res => {
						uni.hideLoading();
						if(res.data.status==1){
							var list = res.data.data;
							this.InviteList = list;
							console.log(res.data.data);
						}
					},
					fail:function(e){
						uni.hideLoading();
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			/*下级开户*/
			openAcc(){
				this.$refs['UseServes'].show(this.ConfData.rande);
			},
			/*获取时间*/
			getDayDate(n){
				var day = new Date();
				day.setTime(day.getTime()-24*60*60*1000*n);
				var dataTime = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
				return dataTime;
			},
			/* 返回点击*/
			onBack(){
				uni.navigateBack();
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'Agents.scss';
</style>
