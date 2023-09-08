<template>
	<view class="page">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	var _self,loginRes;
	export default {
		data() {
			return {
				content : '',
			};
		},
		onLoad(params){
			//_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getAgreement(params.id);//点击合同协议
		},
		methods:{
			/*点击合同协议*/
			async getAgreement(id,token){
				uni.request({
					url: this.apiServer+'/apicom/financing/contract',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : id,
						token: this.token
					},
					success: res => {
						if(res.data.status == 1){
							var title   = res.data.message;
							this.content = res.data.data;
							console.log(content)
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
				
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'Agreement.scss';
</style>
