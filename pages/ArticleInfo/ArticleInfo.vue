<template>
	<view class="page">
		<view class="activity-list">
			<view class="list">
				<view class="item">
					<!--view class="title">
						<text class="doc-title">{{document.title}}</text>
					</view>
					<view class="describe">
						<text class="doc-content">{{document.create_time}}</text>
					</view-->
					<view class="describe">
						<rich-text :nodes="document.content"></rich-text>
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
				document: [],
			};
		},
		onLoad(params) {
			//this.id = params.id;
			var loginRes = this.checkLogin();
			if(!loginRes){return;}
			this.token = loginRes[2];
			this.getArticle(this.token,params.id,params.model);//文章内容
		},
		methods:{
			/*加载文章内容*/
			async getArticle(token,id,model){
				uni.request({
					url: this.apiServer+'/apicom/document/detail?id='+id+'&model='+model,
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.document = res.data.data;
							uni.setNavigationBarTitle({
								title:res.data.data.title
							})
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
	@import 'ArticleInfo.scss';
</style>
