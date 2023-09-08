<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default{
		data(){
			return {
				confData:{},
				url: '',
			}
		},
		onLoad(params) {
			if(!params.url){
				this.getconf();
			}else{
				this.url = params.url;
			}
		},
		methods:{
			async getconf(){
				uni.request({
					url: this.apiServer+'/apicom/index/getconf',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.confData = res.data.data; 
							this.url = res.data.data.web_chat_link;
							window.location.href = this.url;
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
		}
	}
</script>