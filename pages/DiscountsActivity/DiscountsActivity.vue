<template>
	<view class="page">
		<view class="activity-list">
			<view class="list" v-for="(item,index) in notice" :key="index" @click="onMessage(item.id,item.model)">
				<view class="item">
					<view class="title">
						<text class="one-omit">{{item.title}}</text>
					</view>
					<view class="describe">
						<text class="two-omit">{{item.shorttitle}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				notice: [],
			};
		},
		onLoad(params) {
			this.id = params.id;
			var loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getNotice(this.token,this.id,1);//获取子账号信息
		},
		methods:{
			/*加载消息*/
			async getNotice(token,id,page){
				uni.request({
					url: this.apiServer+'/apicom/column/index?id='+id+'&page='+page,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.notice = res.data.data;
							console.log(this.notice);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},
			onMessage(id,model){
				uni.navigateTo({
					url: '/pages/ArticleInfo/ArticleInfo?id='+id+'&model='+model,
				})			
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'DiscountsActivity.scss';
</style>
