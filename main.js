import Vue from 'vue';
import App from './App';
import Base64 from 'base-64';
// 弹出框
import DialogBox from './components/DialogBox/DialogBox';
Vue.config.productionTip = false
// 全局组件
Vue.component('DialogBox', DialogBox);
//mescroll
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.checkLogin  = function(){
	var UID    = uni.getStorageSync('UID');
	var MOBILE = uni.getStorageSync('MOBILE');
	var TOKEN  = uni.getStorageSync('TOKEN');
	if(UID == '' || MOBILE == '' || TOKEN == ''){
		uni.reLaunch({url: '/pages/login/login'});
		return false;
	}
	return [UID, MOBILE, TOKEN];
}
// Vue.prototype.appToken  = '79cfd3c12612f849317a20ec1ded2094';//APP通信秘钥
// Vue.prototype.appSerip  = Base64.decode('MTcyLjI5LjcyLjg5');//服务器IP地址aHR0cDovL3FrbC5scGZlcC50b3A6ODA4OQ==
Vue.prototype.appSerip  = Base64.decode('aHR0cDovLzExMC40Mi4xLjI0OTo5Mzc5Lw==');//服务器IP地址111
//Vue.prototype.appSerip  = Base64.decode('aHR0cHM6Ly93ZWIxLjYwODAub25saW5lLw==');//服务器IP地址222
// Vue.prototype.apiServer = Base64.decode('aHR0cDovL3N0b2NrLmZnaW1heC52aXBucHMudmlw');//通讯地址
//Vue.prototype.apiServer = Base64.decode('aHR0cHM6Ly93ZWIxLjYwODAub25saW5lLw==');//通讯地址222
Vue.prototype.apiServer = Base64.decode('aHR0cDovLzExMC40Mi4xLjI0OTo5Mzc5Lw==');//通讯地址111
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
