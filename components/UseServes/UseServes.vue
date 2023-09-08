<template>
	<view class="page-total" v-show="isPage">
		<view class="dialog" :class="{'show':isShow}">
			<view class="info-head">
				<view class="off cuIcon-close icon_20"  @click="hide"></view>
			</view>
			<!-- 填写区 -->
			<view class="input-info">
				<view class="info">
					<view class="">账号：</view>
					<input type="tel" 
					:class="{'max':form.phone}" v-model="form.phone" maxlength="11" placeholder="手机号">
				</view>
				<view class="info">
					<view class="">密码：</view>
					<input :class="{'max':form.password}" maxlength="26" v-model="form.password" placeholder="请输入密码">
				</view>
				<view class="info">
					<view class="">确认：</view>
					<input :class="{'max':form.passwordb}" maxlength="26" v-model="form.passwordb" placeholder="请确认密码">
				</view>
				<view class="info"><text class="text-gray">支付密码默认为手机后六位</text></view>
			</view>
			<!-- 按钮 -->
			<view class="btn-info">
				<view class="btn" :style="isRegister?'opacity:1':'opacity:0.4'" @click="isRegister?onRegister():''">
					<text>注册开户</text>
				</view>
			</view>
			<DialogBox ref="DialogBox"></DialogBox>
		</view>
	</view>
</template>

<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				isShow: false,
				isPage: false,
				isRegister: false,
				form:{
					phone: '',
					code: '',
					password: '',
					passwordb:''
				},
				system:'代理开户',
			};
		},
		watch:{
			form:{
				handler(newValue, oldValue) {
					if(newValue.phone && newValue.password && newValue.passwordb){
						this.isRegister = true;
					}else{
						this.isRegister = false;
					}
				},
				deep: true
			}
		},
		methods:{
			/*注册*/
			onRegister(){
				uni.request({
					url: this.apiServer+'/apicom/user/register',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data: {
						mobile     : this.form.phone,
						sms_code   : this.form.code,
						password   : this.form.password,
						re_password: this.form.passwordb,
						recommend  : this.form.agent,
						recom_id   : this.form.agent,
						regdomain  : this.system,
					},
					success: res => {
						var res = res.data;
						if(res.status == 1){
							this.isRegister = false;
							uni.showToast({title:res.message,icon:"none"});
							uniCopy({
								content:'账号：'+this.form.phone+' 密码：'+this.form.password+' 支付密码默认手机后六位',
								success:(res)=>{
									uni.showToast({title: "账号密码已复制",icon:'none',duration:3000});
								}
							})
						}else{
							this.isRegister = false;
							uni.showToast({title:res.message,icon:"none"});
							return;
						}
					},
					fail: (e) => {
						uni.showToast({title:"注册失败，或连接超时!",icon:"none"});
						console.log(e);
					}
				});
			},
			show(rande){
				this.form.agent = rande;
				this.isPage = true;
				setTimeout(()=>{
					this.isShow = true;
				},200)
			},
			hide(){
				if(this.isRegister == true){
					this.$refs['DialogBox'].confirm({
						title: '警告',
						content: '关闭窗口后将无法再次查看账号密码，确定要现在关闭吗?',
						DialogType: 'conText',
						animation: 0
					}).then(()=>{
						this.isShow = false;
						setTimeout(()=>{
							this.isPage = false;
						},200)
					})
				}else{
					this.isShow = false;
					setTimeout(()=>{
						this.isPage = false;
					},200)
				}				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'UseServes.scss';
</style>
