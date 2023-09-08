<template>
  <div id="appWrap">
    <div class="time-box" style="padding-top: 100px;background-image: url('/static/trial_02.png'); height: 300px;background-repeat: no-repeat;">
    </div>
	<div class="time-box" style="padding-top: 25px;background-image: url('/static/trial_btn.png'); width: 72%; margin-left: 5%;background-repeat: no-repeat;" @click="applySave()">
	</div>
  </div>
</template>
 
<script>
	var _self,loginRes,action;
	import GoodsCoupon from '../../components/GoodsCoupon/GoodsCoupon.vue';
export default {
data() {
return {
}
},
mounted(){
},
onLoad(params) {
		
			_self = this;
			loginRes = this.checkLogin();
			if(!loginRes){return;}
			
		},
methods:{
	async applySave(token,form){
		uni.request({
			url: this.apiServer+'/apicom/handle/applySave',
			header: {'content-type' : "application/x-www-form-urlencoded"},
			method: 'POST',
			timeout: 5000,
			data:{
				token: loginRes[2],
				type: 4,
				multiple: 100,
				borrow_duration:2,
				deposit_money:100,
			},
			success: res => {
				//uni.hideLoading();
				if(res.data.status == 1){
					this.applyJson = res.data.data;
					this.$refs['GoodsCoupon'].show(token,form);
				}else{
					uni.showToast({title:res.data.message,icon:"none"});
					return;
				}
			},
			complete:function(){
			    uni.stopPullDownRefresh();
			},
			fail:function(e){
				uni.showToast({title:"配资加载失败!",icon:"none"});
			}
		});
	}
}
}
</script>
 
<style scoped>
/* 自定义css区域 */
.time-box{
  padding: 20px 50px;
}
.btn1{
  width:100%;
  background-color: #FF7C00; 
  border-radius: 20px; 
  color: #FFF;
  padding: 5px 20px 5px 100px;
  height: auto;
  border: none;
  font-size:14px;
}
.btn2{
  position: relative;
  top: -55px;
  left: -30px;
  padding: 10px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  text-align: center;
  background-color: #FF8A00;
  border: none;
}
.btn3{
  width: 100%;
  margin-top: 20px;
  /* background-color: #FF8E01; */
}
/deep/ .el-timeline-item__tail{
  border-left: 2px solid #FF7C00;
}
/deep/ .el-timeline-item:first-child{
  height: 80px;
}
/deep/ .el-timeline-item:first-child .el-timeline-item__wrapper{
  padding-left: 0;
}

/deep/ .el-timeline-item:first-child .el-timeline-item__wrapper .el-timeline-item__content{
  position: relative;
}
/deep/ .el-timeline-item__wrapper{
  top: -17px;
}
</style>