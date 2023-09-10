<template>
	<view class="page">
		<view class="head-back">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="title">
				<text>我的推广</text>
			</view>
			<view class="more-icon" @click="onShareList">
				<view class="icon-list">
					<text class="iconfont icon-liuchengxiangdao"></text>
				</view>
			</view>
		</view>
		<view class="banner">
			<image src="../../static/img/share_banner.png" mode="aspectFill"></image>
		</view>
		<view class="card-data">
			<!-- 会员 -->
			<view class="member-data">
				<view class="phone">
					<text>已邀请人数</text>
				</view>
				<view class="vip-level">
					<text>{{ConfData.count_m}}</text>
				</view>
			</view>
			<!-- 余额 -->
			<view class="balance-data">
				<view class="data">
					<view class="price" @click="isPirce = !isPirce">{{isPirce?ConfData.count:'*****'}}</view>
					<view class="title" @click="isPirce = !isPirce">
						<text>（佣金比例：<font color='red'>{{ConfData.agent_rate}}%</font>） 已获得佣金</text>
						<text class="iconfont" :class="isPirce?'icon-xianshikejian':'icon-yincangbukejian'"></text>
					</view>
				</view>
			</view>
			<!-- 付款码 -->
			<view class="payment-code">
				<!-- <view class="number" @click="isNumber = !isNumber">
					<text>{{isNumber?'7118 5881 7024 5795':'7118 **** **** 5795'}}</text>
					<text>查看数字</text>
				</view>
				<view class="code">
					<image src="/static/img/code.png" mode=""></image>
				</view> -->
				<view class="hint">
					<text>1. 邀请码是您对外界进行推广的密钥，您可以通过朋友、QQ、 微信、博客、论坛或自己的网站进行推广 </text>
				</view>
				<view class="hint">
					<text>2. 所有通过该邀请码过来注册的人，注册后都属于您的用户。</text>
				</view>
				<view class="hint">
					<text>3. 当这些用户在本站配资时，您就可以赚取上述比例的佣金。</text>
				</view>
			</view>
			<!-- 按钮组 -->
			<view class="uni-mt-10 uni-px-8" style="text-align:center;">
				<button type="warn" style="width:100%;margin-bottom:30rpx;" class="uni-radius-5" @click="isPayWay = true">立即推广</button>
				<uni-tag text="查看明细" @click="onShareList"
						custom-style="background-color: #fff; border-color: #fff; color: #555555;">
				</uni-tag>
			</view>
		</view>
		<!-- 支付方式选择窗口 -->
		<view class="pay-way-win" @click="isPayWay = false">
			<view class="cu-modal bottom-modal" :class="{'show':isPayWay}">
				<view class="cu-dialog">
					<view class="pay-list">
						<view class="hint">
							<text class="h3">您的邀请码</text>
						</view>
						<view class="list" @click.stop="onCopy(ConfData.rande)">
							<view class="pay">
								<text type="text" class="link">{{ConfData.rande}}</text>
							</view>
						</view>
						<view class="code">
							<img-cache :src="ConfData.qrcode" mode="aspectFill" @longpress="savePhoto(ConfData.qrcode)"></img-cache>
						</view>
						<view class="hint" v-if="ConfData.share_title">
							<text>{{ConfData.share_title}}</text>
						</view>
						<view class="hint" v-if="ConfData.share_content">
							<text>{{ConfData.share_content}}</text>
						</view>
						<view class="check">
							<text class="iconfont" @click.stop="savePhoto(ConfData.qrcode)">保存到相册</text>
							<text class="iconfont" @click.stop="onCopy(ConfData.rande)">复制邀请码</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self,loginRes;
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				token : '',
				isPayWay: false,
				PayWay: 0,
				PayWayText: '余额支付',
				// 数字
				isNumber: false,
				// 金额
				isPirce: false,
				ConfData: [],
			};
		},
		onLoad() {
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.getConf(loginRes[2]);
			//this.getQrcode(loginRes[2]);
		},
		methods:{
			async getConf(token){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/apicom/Invite/conf',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.ConfData = res.data.data; 
						}
					},
					complete:function(){
					    //uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			async getQrcode(token){
				//uni.showLoading({'title':"加载中"});
				uni.request({
					url: this.apiServer+'/apicom/Invite/view',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 50000,
					data:{
						token: token
					},
					success: res => {
						if(res.data.status == 1){
							this.Qrcode = res.data.data; 
						}
					},
					complete:function(){
					    //uni.stopPullDownRefresh();
					},
					fail: (e) => {
						uni.showToast({title:"加载失败!",icon:"none"});
						console.log(e);
					}
				});
			},
			/* 返回点击*/
			onBack(){
				uni.navigateBack();
			},
			/*复制链接*/
			onCopy(value) {
				uniCopy({
					content:value,
					success:(res)=>{
						this.isPayWay = false;//关闭弹出层
						uni.showToast({title: "复制成功"});
					},
					error:(e)=>{
						uni.showToast({title: e,icon: 'none',duration:3000,})
					}
				})
			},
			//下载图片并保存到相册
			savePhoto(url) {
			    uni.downloadFile({
			        url,
			        success: (res) => {
			          // 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.isPayWay = false;//关闭弹出层
								uni.showToast({title: "保存成功！",});
							},
							fail: () => {
								uni.showToast({title: "保存失败",icon:"none"});
							},
						});
			        },
			    });
			},
			onShareList(){
				uni.navigateTo({
					url: '/pages/ShareList/ShareList?type=0',
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyShare.scss';

/*lz*/ 
/* 立即推广弹框 */ 
.pay-way-win .pay-list .list{border-radius: 10rpx;background-color: rgba(230,67,64,.2);border: 1px solid #e64340;color: #e64340;}
.pay-way-win .pay-list .list .pay uni-text{color:#e64340;}
.pay-way-win .pay-list .check uni-text{background-color: #e64340;}
</style>
