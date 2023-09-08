<template>
	<view class="page">
		<view class="message-list">
			<!-- <uni-list>
				<uni-list-item title="公告信息" clickable showArrow 
					:note="notice.title"
					:rightText="messgae.create_time"
					:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'shop-filled'}"
					@click="onMessage('activity',notice.cid)" />
				
				<uni-list-item title="系统通知" clickable showArrow 
					:note="messgae.title" 
					:rightText="messgae.create_time"
					:show-extra-icon="true"  :extra-icon="{color: '#DE4A29',size: '22',type: 'notification-filled'}"
					@click="onMessage('inform')" />
			</uni-list> -->

			<!-- <view class="list" @click="onMessage('activity',notice.cid)">
				<view class="icon-data">
					<view class="icon">
						<image src="/static/tz-mess.png" mode=""></image>
					</view>
					<view class="data">
						<view class="title">
							<text>公告信息</text>
						</view>
						<view class="describe">
							<text>{{notice.title}}</text>
						</view>
					</view>
				</view>
				<view class="more">
					<text class="time">{{messgae.create_time}}</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="list" @click="onMessage('inform')">
				<view class="icon-data">
					<view class="icon" style="background-color: rgba(255, 125, 88, 1);">
						<image src="/static/tz-mess.png" mode=""></image>
					</view>
					<view class="data">
						<view class="title">
							<text>系统通知</text>
						</view>
						<view class="describe">
							<text>{{messgae.title}}</text>
						</view>
					</view>
				</view>
				<view class="more">
					<text class="time">{{messgae.create_time}}</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view> -->
			<div class="am-list">
				<div class="am-list-body">
					<div class="am-list-item sc-fOICqy hhqWiV am-list-item-top" @click="onMessage('inform')">
						<div class="am-list-thumb"><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGQTM5NTQ2Njg1QjExRTg5NjI3RDNGNjUxMTFCQzBFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGQTM5NTQ3Njg1QjExRTg5NjI3RDNGNjUxMTFCQzBFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkZBMzk1NDQ2ODVCMTFFODk2MjdEM0Y2NTExMUJDMEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkZBMzk1NDU2ODVCMTFFODk2MjdEM0Y2NTExMUJDMEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6kAZU3AAAGrklEQVR42uydfUxVZRzHf+cc3oQrkIkCirwVCINoTOdqWbMmqz9oMUZAulzDlcxmW1lbc9HSWitb0/5A7cWRkzStVvZPL05cy/UiiayGvIkoSYhEyGvAvef0e855uJd7zz3d13M5997nu32H4zns3udznpff73mOz+FmzxaCn5SG3oBeg85FZ6CXouPQ0bAwmkGPo4fQvegOdDO6Cd3njw/gfAS4Cr0FXYXOh+BSG/o4+gj6aqABFqF3ocvRPAS3RPTn6DfQrZ7+saeVX4ZuQLegK0IA3hyDClqnBlpHXQBW0DGEdFkOQk8crVsHravfAEah69En0IkQ+kqkdT1A6+4TQBP6a3QthJ+20bqbvAUYi/4OXQLhqxLKINZTgFGU/j3ARBic0urOWgD3oR9k7Kx6CL3fXYCVYTrmuTMmVrkCmIo+yFhp6gBlpAlwb5iEKr6EOHu1ABajqxkjl6qmrFQA60I0w9AjY6lzBJiOLmVs3BZhlTkf4OYQWRgI5ALEU/MBbmJMPFblHECykpzHeHisHHQWzzIOn7SBAFzDOHitu3naFJm8Uy4BmM04eC15DEwybMS6KA2EwnqIeOAiCEUf4S8iDJfakW8UbzxyAvArtwCfUYtxgrKlzCWuBc60GqSxP4z0TRcb7pZyiwuAz3kVYeWqC4VFbt8AkCyB+LpRxsk+hFjgs18Cofioc3jupggZ2yHi/hYQVr+OIPWvniFaILfkPhByXgGITvFLC5Z/Ln8UePMEiN1v6p7TLZyibgch7215ovAHPCKx512A2RGlciuqgUt6OIhbIM6aXBxGSRHqeYqLzQQ+c4fTMl8kTXSBpW0nCHe9L3dhIWcXmEd+Qaj/BBFABMenb8OZ9Akc20wBb9jSyK8g9h0GftVWrGEC3qhnQezcEyRdmNz1gv0I8Gnd4fGraiBi3TfALXtE3ZWvHgSYHlCuSy732xChO0A+tQonhfWBmXySywBiUkHI3YNDQoYDwRmE+IH1psq9IRgAcinlgeuqfR/TWkRhCPSiuhUOfIFj37ByyfJSXcIa/wOMDVxqLf71GUi3WmgotF6ZsOwIW0Ac/Fb5d+QS4OKLgmMMDOB0AeK1D+27tOMVQ6dt5QnFIRYH+gPh8DlrNyUBuapczp1FpdyUzwA66chy2KIMH1lySmgnyxRIk/QR6LgsBtB58Nxt66YxK9QXzNyk4Wk8A+hUNHVTUgMnkMxj2mUMoNy27Lq0drnEADpVZKK6tdmVJ2iXMYDYvuLusE0oU3+qL4hSdi2k2VEG0FncySWuo5NJDzL8175ciJP3VmRNdjGAKn4k76ZdWBr+UV0eX2AdA6WxtiAAKIkBnTz49GdsHz3wpfqKpRtt5TTtMzRAabI7YPj4lZusS/jS0Bn87B4HepHAJ5VYY0Fp9PcgANh/InAA02ro3DGtLOU7lqeUWbu3OHBKI8QxGEB5hQRbQ0CSuBtfAUzfAEv7yzj7XnOoWbSyIi3fVTOI/cf1uYl6jIGWtudBvPKefYagB8CefWD+eSNIN0+rK5axHSA6Wbmu/6QMWg/psyeCEMkyE9mX4GLSnG+Ix90JQvZO7GK36TAz34vd+0ma5g2D2Fuv203Ud1dOIoGtxn8GH28H898/AJ/9AvDJj/kPnikPhPx3rJ3L0rkbM5Bb+o3DCxrEYcXEjjqwtG5Vj2HeVog8T0M3s8S+Bt3HY0ME0mQ9z9Jcrqwu+/hMizTUhDdmHMTrx+QxUvdIdPZsoQQGEodjI5/7mjW+my9Law3CPm+oTMhwqZz8ZMGFzSB2v4XEJhwIThnt684QgKNgOOEsfr0RzOfLMET5XlmWHz4H0vglo33RcdKFSe7FHvP1TpdJC7zMOHitHgKwk3HwWh0EYDPj4LUuEoBnGAev1UQAklPMLjEWHqtrbgwkamQ8PNan8wPpRtBjtTF0RVgdng+wF5SDdpjcE2F1xTGVIw8RS4yN62wTvdtZLvwb+hjj41KE0QWtxQTynOwIY6SpEcoItAD2Azv26f9USxlpAiQi21fs+Ce1DlE24Aog0XMsQ7ETYbHDWYEWQHL+Mjlc5ifGTmZQSpm4DZBoEmwnOIar5k7wnNS6wNWS/jilfyhMx7xSygC8BTjXncnhg4+HSYhD6lhJ6zzj6mJPNpVOgnJG/pEQzVgkWjdSR7efkPJ0V24QlMOqiynQUFiAEGldimndBj35Y3+9jIAcShhs52+1oz+BBXoZgRZM8jqMtaCchpQByuswyHMWkQsEaRbsX4dB9n/Izjx5HYZfniX5T4ABACaNw9RHP/trAAAAAElFTkSuQmCC"
								alt="icon" style="width: 40px; height: 40px;"></div>
						<div class="am-list-line am-list-line-multiple">
							<div class="am-list-content">公告信息 <div class="am-list-brief">端午股市休市时间</div>
							</div>
							<div class="am-list-extra">2023-06-10 13:56</div>
						</div>
						<div class="am-list-ripple" style="display: none;"></div>
					</div>
					<div class="am-list-item sc-fOICqy hhqWiV am-list-item-top" @click="onMessage('inform')">
						<div class="am-list-thumb"><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGNDkwNDI5Njg1QjExRTg5RTBCQ0ZENThDOUU3NDQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGNDkwNDJBNjg1QjExRTg5RTBCQ0ZENThDOUU3NDQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkY0OTA0Mjc2ODVCMTFFODlFMEJDRkQ1OEM5RTc0NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkY0OTA0Mjg2ODVCMTFFODlFMEJDRkQ1OEM5RTc0NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ZsVA5AAAIF0lEQVR42uyd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"
								alt="icon" style="width: 40px; height: 40px;"></div>
						<div class="am-list-line am-list-line-multiple">
							<div class="am-list-content">系统通知 <div class="am-list-brief">配资审核通知</div>
							</div>
							<div class="am-list-extra">2023-09-06 17:05</div>
						</div>
						<div class="am-list-ripple" style="display: none;"></div>
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: [],
				messgae: [],
			};
		},
		onLoad() {
			var loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.token = loginRes[2];
			this.getMessage(this.token); //获取子账号信息
		},
		methods: {
			/*加载消息*/
			async getMessage(token) {
				uni.request({
					url: this.apiServer + '/apicom/message/messageList',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						if (res.data.status == 1) {
							var list = res.data.data;
							this.notice = list.ggao;
							this.messgae = list.messgae;
							//uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					complete: () => {
						this.setReadall(token);
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
			},
			/*设置为已读*/
			async setReadall(token) {
				uni.request({
					url: this.apiServer + '/apicom/message/readall',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						if (res.data.status == 1) {
							//uni.showToast({title:res.data.message,icon:"none"});
						}
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
			},
			/**
			 * 消息点击
			 * @param {String} type
			 */
			onMessage(type, id) {
				switch (type) {
					case 'activity':
						uni.navigateTo({
							url: '/pages/DiscountsActivity/DiscountsActivity?id=' + id,
						})
						break;
					case 'inform':
						uni.navigateTo({
							url: '/pages/NotificationMessage/NotificationMessage',
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'Message.scss';
</style>