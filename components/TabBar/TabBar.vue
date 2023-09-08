<template>
	<view class="page-total">
		<view class="tab-list">
			<view class="list" v-for="(item,index) in TabBarList" 
			@click="onTabBar(item,index)"
			:key="index">
				<image :src="item.acImg" mode="widthFix" v-show="tabBarShow === index"></image>
				<image :src="item.img" mode="widthFix" v-show="tabBarShow != index"></image
				<text mode="widthFix" v-show="tabBarShow === index"></text>
				<text mode="widthFix" v-show="tabBarShow != index"></text>
				<text :class="{'action':tabBarShow===index}">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabBarList:[
					{
						index: 0,
						name: '首页',
						img: '/static/tabBar/home.svg',
						acImg: '/static/tabBar/home-s.svg',
						// iconClass: 'iconfont icon-shouye icon_24',
						// actiClass: 'iconfont icon-shouye icon_24 action'
					},
					{
						index: 1,
						name: '在线客服',
						img: '/static/tabBar/server.svg',
						acImg: '/static/tabBar/server.svg',
						// iconClass: 'iconfont icon-zixuan icon_24',
						// actiClass: 'iconfont icon-zixuan icon_24 action'
					},
					{
						index: 2,
						name: '行情',
						img: '/static/tabBar/quotation.svg',
						acImg: '/static/tabBar/quotation-s.svg',
						// iconClass: 'iconfont icon-dianboxindiantu icon_24',
						// actiClass: 'iconfont icon-dianboxindiantu icon_24 action'
					},
					{
						index: 3,
						name: '交易',
						img: '/static/tabBar/trade.svg',
						acImg: '/static/tabBar/trade-s.svg',
						// iconClass: 'iconfont icon-yingli icon_24',
						// actiClass: 'iconfont icon-yingli icon_24 action'
					},
					{
						index: 4,
						name: '我的',
						img: '/static/tabBar/my.svg',
						acImg: '/static/tabBar/my-s.svg',
						// iconClass: 'iconfont icon-wode1 icon_24',
						// actiClass: 'iconfont icon-wode1 icon_24 action'
					},
				],
				codeheight: 0,
				isOverall: 0,
				phoneModel: '',
			};
		},
		props:{
			tabBarShow: {
				type: Number,
				default: 0,
			}
		},
		mounted() {
			try {
			    const res = uni.getSystemInfoSync();
					let that = this;
			    // 获取系统信息
			    uni.getSystemInfo({
			    	success(res) {
			    		//console.log(res.brand) //手机牌子
			    		//console.log(res.model) //手机型号
			    		//console.log(res.screenWidth) //屏幕宽度
			    		//console.log(res.screenHeight) //屏幕高度
						that.codeheight = Math.round(res.screenHeight);
						that.phoneModel =res.model
						if(res.model.search('iPhone')){
							that.isOverall = 0;
						}else if(Math.round(res.screenHeight)>740){
						 that.isOverall = 1;
						}
						//console.log(that.isOverall);
			    	}
			    });
			} catch (e) {
			    // error
			}
		},
		methods:{
			/**
			 * @param {Object} item
			 * @param {Number} index
			 */
			onTabBar(item,index){
				// this.tabBarShow = index;
				switch (index){
					case 0:
						wx.switchTab({
							url:'/pages/home/home'
						})
						break;
					case 1:
						wx.switchTab({
							url:'/pages/WebOnline/WebOnline'
						})
						break;
					case 2:
						wx.switchTab({
							url:'/pages/discover/discover'
						})
						break;
					case 3:
						wx.switchTab({
							url:'/pages/Account/Account'
						})
						break;
					case 4:
						wx.switchTab({
							url:'/pages/my/my'
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'TabBar.scss';
</style>
