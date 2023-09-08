<template>
	<view class="page">
		<!-- 设置列表 -->
		<view class="setting-list">
			<uni-list>
				<uni-list-item showArrow link @click="clearCache" title="清除缓存图片" :rightText="cacheSize||'已清空清除缓存图片'"/>
				<uni-list-item showArrow link @tap="onClear" title="清理使用记录" :rightText="calculate(sizeInfo)||'记录已清空'"/>
			
			
			<!-- #ifdef APP-PLUS -->
				<uni-list-item showArrow link @click="onSetting('about')" v-if="vNumber>nNumber" title="发现新版本！" />
				<uni-list-item showArrow link @click="onSetting('about')" v-else title="已是最新版本" />
			<!-- #endif -->
			
			
				<uni-list-item showArrow link @click="onSetting('about')" title="关于我们" />
			</uni-list>
		</view>
		<!-- 退出 -->
		<view class="uni-py-10 uni-px-8">
			<button type="warn" style="width:100%;" class="uni-radius-5" @click="onQuitLogin">退出登录</button>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self,loginRes;
	import { resolveFile, getDirSize, removeDir, formatSize, storage } from '@/components/img-cache';
	// #ifdef APP-PLUS
	import APPUpdate, { getCurrentNo } from '@/js_sdk/APPUpdate/APPUpdate/index.js';
	// #endif
	export default {
		data() {
			return {
				//myMobile : '',
				sizeInfo : '',
				cacheSize: '0B' ,// 图片缓存大小
				phone    : uni.getSystemInfoSync().platform,
				upgrade  : [],
				confData : uni.getStorageSync('confData'),
				version  : '',
				vNumber  : '',//云端版本
				nNumber  : '',//当前版本
			};
		},
		onLoad(){
			_self = this;
			loginRes = _self.checkLogin();
			if(!loginRes){return;}
			_self.token = loginRes[2];
			_self.gatUpgrade();
			//_self.myMobile = loginRes[1];
		},
		onReady(){
			_self = this;
			uni.getStorageInfo({
				success: function (res) {
					_self.version  = res.versionCode;
					_self.sizeInfo = res.currentSize;
				}
			});
			// #ifdef APP-PLUS
				getCurrentNo(res => {
					_self.nNumber = res.versionCode;
					//_self.nNumber = parseInt(res.versionName.replace(/\./g,''));
					//console.log('当前版本:',this.nNumber);
				});
			// #endif
		},
		onShow() {
			this.getCacheSize()
		},
		methods:{
			// 检查APP是否有新版本
			onAPPUpdate() {
				if(this.nNumber<this.vNumber){
					APPUpdate(true,this.upgrade);
				}else{
					uni.showToast({title:"已是最新版本!",icon:"none"});
				}
			},
			async gatUpgrade(){
				uni.request({
					url: this.apiServer+'/apicom/index/upgrade',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.upgrade = res.data.data;
							this.vNumber = this.upgrade[this.phone+'_version'];
							//this.vNumber = parseInt(number.replace(/\./g,''));
							//console.log('云端版本:',this.phone,this.vNumber);
						}
					}
				});
			},
			async getconf(){
				uni.request({
					url: this.apiServer+'/apicom/index/getconf',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'GET',
					timeout: 5000,
					success: res => {
						if(res.data.status == 1){
							this.confData = res.data.data; 
							this.isLoginCode = this.confData.web_reg_code;
							this.isReg = this.confData.is_reg;
							//uni.setStorageSync('confData' , res.data.data);
							//console.log(this.confData);
						}
					}
				});
			},
			// 获取缓存大小
			async getCacheSize() {
				// 根据缓存目录获取该目录的大小，返回的是字节数值
				const size = await getDirSize('_doc/imgcache/')
				// 将字节数值格式化文字
				this.cacheSize = formatSize(size)
			},
			// 清除缓存
			clearCache() {
				removeDir('_doc/imgcache/').then(() => {
					this.cacheSize = '0B'; // 直接把缓存大小文字改为 0B
					// this.getCacheSize(); // 重新获取缓存大小（不建议这样，因为明知清完为 0 了，还重新获取）
				});
				uni.showToast({
					title: '缓存清除成功',
					icon: 'success'
				})
			},
			// 获取存储的缓存数据
			getStorage() {
				// 查询缓存（还有其他方法，请在 components/img-cache/storage.js 查看源码）
				const cache = storage.select()
				/*console.log(cache)
				uni.showToast({
					title: '请在 HBuilderX 控制台查看',
					icon: 'none'
				})*/
			},
			/*计算单位*/
			calculate(number){
				if(number==0)return number;
				if(number.toString().length >= 8){
					var unit = (number/1024*1024).toFixed(2);
					return unit;
				}else if(number.toString().length >= 4){
					var unit = (number/1024).toFixed(2);
					return unit + 'MB';
				}else{
					var unit = number.toFixed(2);
					return unit + 'KB';
				}
			},
			
			/**
			 * 设置列表点击
			 * @param {String} type
			 */
			onSetting(type){
				switch(type) {
					case 'about':
						uni.navigateTo({
							url: '/pages/AboutUs/AboutUs'
						})
						break;
				}
			},
			/*清理缓存*/
			onClear(){
				this.$refs['DialogBox'].confirm({
					title: '警告',
					content: '清理使用记录后需要重新登录账号，是否继续?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					try {
					    uni.clearStorageSync();
						setTimeout(function(){
							uni.reLaunch({url: '/pages/login/login'});
						}, 1000);
					} catch (e) {
					    uni.showToast({title:e,icon:"none"});
					}
				})
				//uni.clearStorage();//全部清除
				//uni.removeStorageSync('swiperList');//清除轮播
				//uni.removeStorageSync('confData');//清除设置
				//uni.showToast({title:'清理成功！',icon:"none"});
			},
			/**
			 * 退出点击
			 */
			onQuitLogin(){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要退出登录?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.clearStorageSync();
					/*uni.removeStorageSync('UID');//清除账号ID
					uni.removeStorageSync('MOBILE');//清除账号
					uni.removeStorageSync('TOKEN');//清除TOKEN
					uni.removeStorageSync('accountData');//清除子账户缓存数据*/
					setTimeout(function(){
						uni.reLaunch({url: '/pages/login/login'});
					}, 1000);
					//uni.navigateBack();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Setting.scss';
	
// lz
.setting-list{padding: 0;border-radius: 0;margin-top: 0;}
</style>
