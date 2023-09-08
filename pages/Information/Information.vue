<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<uni-list>
				<uni-list-item title="昵称" :note="nickname" showArrow link
					@click="onNickname"
					thumb="/static/touxiang.png"
					thumb-size="lg" rightText="点击修改昵称" />
				<!-- <uni-list-item showArrow link @click="onNickname" title="昵称" :rightText="nickname"/> -->
			</uni-list>
			
			<view class="list">
				<uni-list style="width: 100%;">
					<uni-list-item showArrow link title="性别" :rightText="sexText"/>
				</uni-list>
				<view class="picker">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexArray">
						<view class="uni-input" style="height: 84rpx;">{{sexText}}</view>
					</picker>
				</view>
			</view>
			<view class="list">
				<uni-list style="width: 100%;">
					<uni-list-item showArrow link title="出生日期" :rightText="birthday"/>
				</uni-list>
				<view class="picker">
					<picker @change="birthdayPickerChange" mode="date" :value="birthdayDate" :start="startDate" :end="endDate">
						<view class="uni-input" style="height: 84rpx;">{{birthdayDate}}</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				// 性别
				sexArray: ['男','女','保密'],
				sexIndex: 0,
				sexText: uni.getStorageSync('sexText'),
				// 生日
				birthdayDate: currentDate,
				startDate: this.getDate('start'),
				endDate: this.getDate('end'),
				birthday: uni.getStorageSync('birthday'),
				DialogBox: {},
				// 昵称
				nickname: uni.getStorageSync('nickname'),
			};
		},
		onLoad() {
		},
		methods:{
			/**
			 * 性别
			 * @param {Object} e
			 */
			sexPickerChange(e){
				this.sexIndex = e.detail.value;
				this.sexText = this.sexArray[this.sexIndex];
				uni.setStorageSync('sexText' , this.sexText);
			},
			/**
			 * 生日
			 * @param {Object} e
			 */
			birthdayPickerChange(e){
				this.birthday = e.detail.value;
				uni.setStorageSync('birthday' , this.birthday);
			},
			/**
			 * 获取日期
			 * @param {Object} type
			 */
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			/**
			 * 昵称点击
			 */
			onNickname(){
				this.$refs['DialogBox'].confirm({
					title: '更改昵称',
					placeholder: '请输入修改的昵称',
					value: this.nickname,
					DialogType: 'input',
					animation: 0
				}).then((res)=>{
					this.nickname = res.value;
					uni.setStorageSync('nickname' , this.nickname);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Information.scss';
// lz 样式
.user-list{border-radius: 0;padding:0;margin-top: 0;overflow: hidden;}
.user-list .list{border-bottom: none;height: auto;}
</style>
