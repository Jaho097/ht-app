<template>
	<view class="page">

		<view class="my-top" style="padding-top: 0;">

			<!-- 旧代码 -->
			<!-- head -->
			<!-- 用户信息 -->
			<view class="head-navbar">
				<view class="nav-title" style="color:#000">交易账户</view>
				<!-- <view class="nav-btnbox" v-if="myMobile">
					<text class="nav-btn" @click="subwin = true">
						{{sub_account||'选择操盘账户'}}
						<uni-icons custom-prefix="iconfont" type="icon-paixujiantouxia" color="#FFF"></uni-icons>
					</text>
				</view>
				<view class="nav-btnbox" v-else>
					<text class="nav-btn" @click="onUserInfo">登录/注册</text>
				</view> -->
			</view>
			<view class="sc-gGBfsJ fjxMiP">
				<view class="sc-hqyNC iIkmEj">
					<view style="width: 100%;">
						<view class="sc-jqCOkK kpfyFB">
							<view style="display: flex; width: 100%; align-items: center;">
								<view class="sc-bbmXgH bBbpYy">
									<image style="width:100rpx;height:100rpx" src="/static/default-avatar.png" mode="">
									</image>
								</view>
								<view class="jiaoyi-picker">
									<view>
										<view extra="60813023 [天]"
											style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
											<view>
												<view class="title" style="color:#000">扬帆证券</view><span
													class="sc-dNLxif lhwzuD"><span
														class="sc-uJMKN ldyfba">子账号({{sub_account||'选择操盘账户'}})
														<image src="/static/new/down.png" mode=""
															style="height: 32rpx;width:32rpx;margin-left: 10px;">
														</image>
													</span> </span>
											</view>
											<svg @click="subwin = true" class="am-icon am-icon-down am-icon-s"
												style="position: relative; margin-left: 2px; color: rgb(41, 30, 3); border: 1px solid rgba(255, 251, 241, 0.5); border-radius: 4px;">
												<!-- <use xlink:href="#down"></use> -->
											</svg>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 子账号信息 -->
			<!-- <view class="focus-area">
				<view class="list">
					<view class="num">
						<text
							style="font-size: 60rpx;line-height: normal;font-weight:normal;">{{''+calculate(accountInfo.total_money)}}</text>
					</view>
					<view class="title">
						<text>账户资产(元)</text>
					</view>
				</view>
			</view> -->
			<!-- 黑色资金信息 -->
			<view class="sc-gxMtzJ iTMaeS">
				<view class="sc-iyvyFf iQhmBv">
					<view class="account-title">总资产(元)</view>
					<view class="account-num"> {{''+calculate(accountInfo.freeze_amount)}}</view>
				</view>
				<view class="sc-iyvyFf iQhmBv">
					<view class="account-title">持仓市值</view>
					<view class="account-num">{{''+calculate(accountInfo.market_value)}}</view>
				</view>
			</view>
			<view class="sc-gxMtzJ iTMaeS">
				<view class="sc-iyvyFf iQhmBv">
					<view class="account-title">可用金额</view>
					<view class="account-num">{{''+calculate(accountInfo.avail)}}</view>
				</view>
				<view class="sc-iyvyFf iQhmBv">
					<view class="account-title">冻结金额</view>
					<view class="account-num">{{''+calculate(accountInfo.freeze_amount)}}</view>
				</view>
			</view>


		</view>

		<!-- 订单信息 -->
		<view class="order-info">
			<view class="list" style="width:25%" @click="onSkipOrder(item.idx)" v-for="(item,index) in iconList">
				<view class="icon">
					<image class="iconfont" style="height: 60rpx;width:60rpx;" :src="item.icon" mode=""></image>
				</view>
				<view class="title">
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- <view class="list" style="width: 25%;" @click="onSkipOrder(1)" v-for="(item,index) in iconList" v-if="index>3">
				<view class="icon">
					<image class="iconfont" style="height: 60rpx;width:60rpx;" :src="item.icon" mode=""></image>
				</view>
				<view class="title">
					<text>{{item.name}}</text>
				</view>
			</view> -->
			<!-- <view class="list" @click="onSkipOrder(3)">
				<view class="icon">
					<text class="iconfont icon-daipingjia"></text>
				</view>
				<view class="title">
					<text>委托</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(4)">
				<view class="icon">
					<text class="iconfont icon-daifahuo"></text>
				</view>
				<view class="title">
					<text>成交</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(5)">
				<view class="icon">
					<text class="iconfont icon-daifahuo"></text>
				</view>
				<view class="title">
					<text>交割</text>
				</view>
			</view> -->
		</view>
		<view class="sc-iELTvK ikCSQL">
			<view class="sc-cmTdod kTszrt" @click="onWarnTip(1)">
				<view class="sc-jwKygS eaOZDH">{{calculate(accountInfo.loss_warn_money)}}</view>
				<view class="sc-btzYZH fsrSGa">
					<view style="display: flex; align-items: center;"><span>警戒线</span><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
							alt="???"
							style="margin-left: 2px; width: 0.7rem; height: 0.7rem; position: relative; left: 0.04rem;">
					</view>
				</view>
			</view>
			<view class="sc-cmTdod kTszrt" @click="onWarnTip(2)">
				<view class="sc-jwKygS eaOZDH">{{calculate(accountInfo.loss_close_money)}}</view>
				<view class="sc-btzYZH fsrSGa">
					<view style="display: flex; align-items: center;"><span>平仓线</span><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
							alt="???"
							style="margin-left: 2px; width: 0.7rem; height: 0.7rem; position: relative; left: 0.04rem;">
					</view>
				</view>
			</view>
			<view class="sc-cmTdod kTszrt" @click="onWarnTip(3)">
				<view class="sc-jwKygS eaOZDH">--</view>
				<view class="sc-btzYZH fsrSGa">
					<view style="display: flex; align-items: center;"><span>距离警戒线</span><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
							alt="???"
							style="margin-left: 2px; width: 0.7rem; height: 0.7rem; position: relative; left: 0.04rem;">
					</view>
				</view>
			</view>
			<view class="sc-cmTdod kTszrt" @click="onWarnTip(4)">
				<view class="sc-jwKygS eaOZDH">--</view>
				<view class="sc-btzYZH fsrSGa">
					<view style="display: flex; align-items: center;"><span>距离平仓线</span><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
							alt="???"
							style="margin-left: 2px; width: 0.7rem; height: 0.7rem; position: relative; left: 0.04rem;">
					</view>
				</view>
			</view>
		</view>
		<view class="am-card page-module-card" style="margin-top: 16px;position: relative;top: -60px;" >
			<view class="sc-lhVmIH kUGkvE">
				<view class="sc-jtRfpW cWRzkj" @click="onWarnTip(5)">
					<view class="account-num">-21.32</view>
					<view class="account-title" style="display: flex; justify-content: center;">
						<view style="display: flex; align-items: center;"><span>累计盈亏</span><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEWOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpOOjpMAAADAoxyZAAAASHRSTlMAHni54/jz17ghpvz6/U7ymUgUAxlGlFlv/p0VEppxV/ldWlsREKVF9kSnHxOWkXc17u84lQYE5GT7GEeYIJzbDVhcm3OXAiJc2JqmAAAAAWJLR0RJhwXkfAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGCA8mKs6VwKkAAAEUSURBVCjPZVLrWsIwDM02VyeuOm5qFF2BKTrQeR+ICKho3v+JXOk68kl/rOfkfEvSkwCY47jeji92A3cP+HFq+0QU6o+sOZv4wSGJqN6AZqt9VMBjGz+ReHpmSeec8MLAGFWX5+0pjNf5BfZNJLk0d5+ErnNFkeED//rGoIhSgKEUI0Nvie4MGgk5hMz+APcPj08lfKYMAqrbqi+vFrUpgJwalo7HVc+Ugx9WfSpVQV9xgcii5kTxVBvhrUjl0XRb0MUzet8WdLszKTr/heKBM4CUPko+nwOzhJm4WJQm4tpEWKL65LbHCpfVoL6qnpMI8ZuPdjVN4Kc10KPtsWVIZbEHaqKXIXV4Xr0+eRjmnvtbBv4A8tkhotnooa8AAAAASUVORK5CYII="
								alt="???"
								style="margin-left: 2px; width: 0.7rem; height: 0.7rem; position: relative; left: 0.04rem;">
						</view>
					</view>
				</view>
				<view class="sc-jtRfpW cWRzkj">
					<view class="account-num">{{accountInfo.end_time}}</view>
					<view class="account-title">有效期<span class="sc-bYSBpT fvzeeK">自动续期</span></view>
				</view>
			</view>
			<view class="am-list sc-kTUwUJ gDLPwr"  >
				<view class="am-list-body">
					<view class="am-list-item am-list-item-middle">
						<view class="am-list-line">
							<view class="am-list-content" style="width:100%">
								<view class="sc-dqBHgY hpTydy">
									<view class="item" @click="goDetails(token,accountInfo.borrow_id)"><button
											
											class="sc-kkGfuU hoqqAL new-button-small new-button-ghost">追加资金</button>
									</view>
									<view class="item" @click="goDetails(token,accountInfo.borrow_id)"><button
											class="sc-kkGfuU hoqqAL new-button-small new-button-ghost">扩大配资</button>
									</view>
									<view class="item" @click="goDetails(token,accountInfo.borrow_id)"><button
											class="sc-kkGfuU hoqqAL new-button-small new-button-ghost">申请延期</button>
									</view>
									<view class="item" @click="goDetails(token,accountInfo.borrow_id)"><button
											class="sc-kkGfuU hoqqAL new-button-small new-button-ghost">查看详情</button>
									</view>
								</view>
							</view>
						</view>
						<view class="am-list-ripple" style="display: none;"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 设置 -->
		<view class="my-service">
			<uni-list>
				<!-- <uni-list-item showArrow link
					@click="onUserInfo"
					:note="(myMobile.substr(0,3))+'****'+(myMobile.substr(7,11))"
					thumb="/static/touxiang.png"
					thumb-size="lg" /> -->

				<!-- <uni-list-item 
					:show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'refresh-filled'}"
					title="预计盈亏" :rightText="''+calculate(accountInfo.return_money)"/> -->

				<!-- <uni-list-item showArrow link v-if="myMobile" :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'refresh-filled'}" @click="subwin = true"
					title="交易账户" :rightText="sub_account||'选择操盘账户'" />
				<uni-list-item showArrow link v-else :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'undo-filled'}" @click="onUserInfo" title="交易账户"
					rightText="先去登录/注册" />


				<uni-list-item showArrow link :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'circle-filled'}" @click="onWarnTip(1)" title="预警线"
					:rightText="''+calculate(accountInfo.loss_warn_money)" />

				<uni-list-item showArrow link :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'circle-filled'}" @click="onWarnTip(2)" title="平仓线"
					:rightText="''+calculate(accountInfo.loss_close_money)" />

				<uni-list-item :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'calendar-filled'}" title="配资模式"
					:rightText="accountInfo.typeName" />

				<uni-list-item :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'notification-filled'}" title="到期时间"
					:rightText="accountInfo.end_time" /> -->

				<!--type = 1:天；2:周；3:月；5:免息-->
				<!--view class="service-list" v-if="accountInfo.type < 4">
					<view class="title">
						<text>自动续期</text>
					</view>
					<view class="switch-setting">
						<switch class="red sm" color="red !important" :checked="treatmentStatu.checked" @change="switchChange"></switch>
					</view>
				</view-->


				<!-- <uni-list-item showArrow link :show-extra-icon="true"
					:extra-icon="{color: '#DE4A29',size: '30',type: 'redo-filled'}"
					@click="accountInfo.borrow_id?goDetails(token,accountInfo.borrow_id):''" title="我的操盘"
					rightText="进入设置" /> -->


			</uni-list>
		</view>
		<!-- 预警，平仓警告弹窗 -->
		<view class="serve-hotline" @click="isHotline = false">
			<view class="cu-modal bottom-modal" :class="{'show':isHotline}">
				<view class="cu-dialog">
					<view class="contact-list">
						<view class="list">
							<text>{{isHotTitle}}</text>
						</view>
						<view class="list">
							<text style="color: #959595;">{{isHotText}}</text>
						</view>
						<view class="list">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 子账户选择窗口 -->
		<view class="sub-win" @click="subwin = false">
			<view class="cu-modal bottom-modal" :class="{'show':subwin}">
				<view class="cu-dialog">
					<view class="pay-list">
						<view class="list" v-for="(item,index) in accountData" :key="index"
							@click.stop="onSubwin(index)">
							<view class="pay flex">
								<text class="flex-twice text-bold text-df">账号：{{item.sub_account}}</text>
								<text class="flex-sub text-sm">状态：{{item.status?'正常':'不可用'}}</text>
							</view>
							<view class="check" v-if="item.status > 0">
								<text class="iconfont"
									:class="accounId===item.id?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- tabbar -->
		<TabBar :tabBarShow="3"></TabBar>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	var _self, loginRes;
	import TabBar from '../../components/TabBar/TabBar.vue';
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				iconList: [{
					name: '买入',
					idx:3,
					icon: '/static/new/mairu.svg'
				}, {
					name: '卖出',
					idx:4,
					icon: '/static/new/maichu.svg'
				}, {
					name: '撤单',
					idx:2,
					icon: '/static/new/chedan.svg'
				}, {
					name: '委托',
					idx:4,
					icon: '/static/new/weituo.svg'
				}, {
					name: '持仓',
					idx:1,
					icon: '/static/new/chicang.svg'
				}, {
					name: '成交记录',
					idx:6,
					icon: '/static/new/chengjiao.svg'
				}, {
					name: '交割查询',
					idx:7,
					icon: '/static/new/jiaoge.svg'
				}, {
					name: '查询',
					idx:8,
					icon: '/static/new/chaxun.svg'
				}],
				scrollTop: 0,
				subwin: false,
				isHotline: false,
				isHotTitle: '',
				isHotText: '',
				token: '',
				index: null,
				myMobile: '',
				isChecked: false,
				memberMoney: {},
				accountInfo: {},
				accounId: uni.getStorageSync('accounId') || '',
				sub_account: uni.getStorageSync('sub_account') || '',
				accountData: [],
				treatmentStatu: {
					checked: false
				},
			};
		},
		onLoad() {
			//_self = this;
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			//console.log(loginRes);
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			//this.getMember(this.token);
			this.getSubAccount(this.token); //获取子账号信息
		},
		onShow() {
			loginRes = this.checkLogin();
			if (!loginRes) {
				return;
			}
			this.token = loginRes[2];
			this.myMobile = loginRes[1];
			this.getSubAccount(this.token); //获取子账号信息
			this.accounId = uni.getStorageSync('accounId');
			this.sub_account = uni.getStorageSync('sub_account');
			this.getacInfo(this.token, this.accounId);
			console.log(this.accounId, this.sub_account)
		},
		onReady() {
			uni.hideTabBar();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			toAccountSet(){
				uni.navigateTo({
					url:'/pages/AccountSet/AccountSet'
				})
			},
			/*获取会员信息*/
			async getMember(token) {
				uni.request({
					url: this.apiServer + '/apicom/member',
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
							this.memberInfo = res.data.data.info;
							this.memberMoney = res.data.data.money;
							console.log(res.data.data);
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
			/*获取交易账户信息*/
			async getSubAccount(token) {
				this.accountData = '';
				uni.showLoading({
					'title': "更新账户列表中"
				});
				uni.removeStorageSync('accountData'); //清除子账户缓存数据
				uni.request({
					url: this.apiServer + '/market/index/getSubAccount',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token
					},
					success: res => {
						uni.hideLoading();
						if (res.data.status == 1 && res.data.data.length != 0) {
							this.accountData = res.data.data;
							uni.setStorageSync('accountData', this.accountData); //子账户数据储存缓存到本地
							this.accounId = this.accountData[0].id; //默认获取第一个账号的信息
							this.getacInfo(this.token, this.accounId);
							this.sub_account = this.accountData[0].sub_account;
							uni.setStorageSync('sub_account', this.sub_account);
							uni.setStorageSync('accounId', this.accounId);
							uni.setStorageSync('sub_account', this.sub_account);
							this.subwin = false;
						}
					},
					fail: function(e) {
						uni.hideLoading();
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					}
				});
				uni.hideLoading();
			},
			/*获取会员资金相关信息*/
			async getacInfo(token, id) {
				if (token == '' || id == '') {
					return;
				}
				uni.removeStorageSync('accountInfo'); //清除子账户缓存数据
				uni.request({
					url: this.apiServer + '/market/trade/account_info',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					method: 'POST',
					timeout: 5000,
					data: {
						token: token,
						id: id,
					},
					success: res => {
						if (res.data.status == 1) {
							this.accountInfo = res.data.data;
							/*if(res.data.data.b_status!=1){
								this.getSubAccount(this.token);//获取子账号信息
							}*/
							if (res.data.data.renewal == 1) {
								this.$set(this.treatmentStatu, 'checked', true)
							} else {
								this.$set(this.treatmentStatu, 'checked', false)
							}
						}
					},
					fail: function(e) {
						uni.showToast({
							title: "加载失败!",
							icon: "none"
						});
					},
					complete: res => {
						if (this.accountInfo.type == 1) this.accountInfo.typeName = '按天配资';
						if (this.accountInfo.type == 2) this.accountInfo.typeName = '按周配资';
						if (this.accountInfo.type == 3) this.accountInfo.typeName = '按月配资';
						if (this.accountInfo.type == 5) this.accountInfo.typeName = '免息配资';
						uni.setStorageSync('accountInfo', res.data.data); //子账户数据储存缓存到本地
					}
				});
			},
			onSubwin(i) {
				/*if(!this.accounId){
					uni.showToast({title:"请先申请配资账户!",icon:"none"});
					return;
				}*/
				this.accounId = this.accountData[i].id; //将array【改变索引】的值赋给定义的picker变量
				this.sub_account = this.accountData[i].sub_account;
				uni.setStorageSync('accounId', this.accounId);
				uni.setStorageSync('sub_account', this.sub_account);
				this.subwin = false;
				this.getacInfo(this.token, this.accounId);

			},
			/*自动续期按钮*/
			/*switchChange (e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value)   // 将点击改变的状态赋给treatmentStatu.checked
				uni.request({
					url: this.apiServer+'/apicom/financing/autorenewal',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					method: 'POST',
					timeout: 5000,
					data:{
						id   : this.accountInfo.borrow_id,
						token: this.token
					},
					success: res => {
						if(res.data.status != 1){
							//this.renewal  = res.data.data;
							that.$set(that.treatmentStatu, 'checked', false)  // 手动修改switch的状态，视图会同步更新
							console.log(res.data.message);
						}else{
							that.$emit('changePage', 1)
							console.log(res.data.message);
						}
					},
					fail:function(e){
						uni.showToast({title:"加载失败!",icon:"none"});
					}
				});
			},*/
			/*计算单位*/
			calculate(number) {
				number = parseInt(number);
				if (number == 0 || !number) return 0;
				if (number.toString().length >= 13) {
					var unit = (number / 1000000000000).toFixed(2);
					return unit + '万亿';
				} else if (number.toString().length >= 9) {
					var unit = (number / 100000000).toFixed(2);
					return unit + '亿';
				} else if (number.toString().length > 4) {
					var unit = (number / 10000).toFixed(2);
					return unit + '万';
				} else {
					var unit = number.toFixed(2);
					return unit;
				}
			},
			goDetails(token, id) {
				if (!this.accounId) {
					uni.showToast({
						title: "请先申请配资账户!",
						icon: "none"
					});
					return;
				} else {
					uni.navigateTo({
						url: '/pages/AfterSalesOrder/AfterSalesOrder',
					})
				}
			},
			/*查询订单*/
			onSkipOrder(type) {
				if (!this.accounId) {
					uni.showToast({
						title: "请先申请配资!",
						icon: "none"
					});
					return;
				} else {
					if(type==4||type==6||type==7){
						let id 
						switch(type){
							case 4:
								id  = 1
							break
							case 6:
								id  = 2
							break
							case 7:
								id  = 3
							break
						}
						uni.navigateTo({
							url: '/pages/AccoutSet/query?type=' + id,
						})
					}else{
						uni.navigateTo({
							url: '/pages/MyOrderList/MyOrderList?type=' + type,
						})
					}
					
				}
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onWarnTip(type) {
				// this.isHotline = true;

				switch (type) {
					case 1:
						this.isHotTitle = '警戒线提示';
						this.isHotText = '总操盘资金低于预警线后，该账号禁止继续买入股票';
						break;
					case 2:
						this.isHotTitle = '平仓线提示';
						this.isHotText = '总操盘资金低于平仓线后，持仓股票将会被强制平仓';
						break;
					case 3:
						this.isHotTitle = '距离警戒线';
						this.isHotText = '';
						break;
					case 4:
						this.isHotTitle = '距离平仓线';
						this.isHotText = '';
						break;
					case 5:
						this.isHotTitle = '累计盈亏';
						this.isHotText = '累计盈亏已卖出股票盈亏（包含提盈）';
						break;
				}
				uni.showModal({
					title: this.isHotTitle,
					showCancel: false,
					content: this.isHotText,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/**
			 * 用户信息点击
			 * @param {Number} type
			 */
			onUserInfo() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			/*onWarnTip(i){
				if(i==1){
					var title = '警戒线';
					var content = '总操盘资金低于预警线后，该账号禁止继续买入股票';
				}
				if(i==2){
					var title = '平仓线';
					var content = '总操盘资金低于平仓线后，持仓股票将会被强制平仓';
				}
				this.$refs['DialogBox'].confirm({
					title: title,
					content: content,
					DialogType: 'inquiry',
					Cancel: 'none',
					animation: 0
				})
			}*/
		}
	}
</script>

<style scoped lang="scss">
	@import 'Account.scss';

	// lz
	.box-bg {
		background-color: #FFF;
		padding: 10rpx 0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		width: 100%;
	}

	// 自选、行情 tabs
	.lz-tabsbtn-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// width: 500rpx;
		flex: 1;
		border-radius: 10rpx;
		flex-wrap: nowrap;
		margin: 14rpx 0;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.tabsbtn-box {
		width: 65%;
		text-align: center;
		display: flex;
	}

	//顶部导航栏
	.my-top {
		padding-top: 0;
	}

	.head-navbar {
		display: flex;
		color: #FFF;
		height: 88rpx;
		background-image: url('/static/new/sub-banner.png');
	}

	.head-navbar .nav-title,
	.head-navbar .nav-btnbox {
		flex: 1;
		padding: 0 10rpx;
	}

	.head-navbar .nav-title {
		text-align: center;
		line-height: 88rpx;
		font-weight: 600;
		font-size: 32rpx;
	}

	.head-navbar .nav-btnbox {
		text-align: left;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}

	.head-navbar .nav-btn {
		padding: 0 20rpx;
		border: #FFF 1px solid;
		border-radius: 10rpx;
	}

	// 账户总余额
	.my-top .focus-area {
		height: auto;
		padding-top: 60rpx;
	}

	/*三宫格*/
	.my-top .vip-info {
		height: 100rpx;
		padding: 40rpx 0;
		background: none !important;
	}

	.bdrlr {
		border-left: #e5e5e5 1px solid;
		border-right: #e5e5e5 1px solid;
	}

	.my-top .vip-info .vip uni-text {
		color: #FFF;
	}

	.fjxMiP {
		display: flex;
		flex-direction: column;
	}

	.iIkmEj {
		color: rgb(255, 255, 255);
		flex: 1 1 0%;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
	}

	.iIkmEj view {
		text-align: center;
	}

	.iIkmEj view {
		text-align: center;
	}

	.kpfyFB {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
		background-image: linear-gradient(270deg, rgba(245, 223, 178, 0.6) 0%, rgba(255, 244, 222, 0.8) 100%);
		padding: 10px 18px;
	}

	.bBbpYy {
		background-color: rgb(255, 255, 255);
		border: 1px solid rgb(237, 218, 176);
		flex-shrink: 0;
		-webkit-box-flex: 0;
		flex-grow: 0;
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-right: 18px;
		background-image: url("/wap-fe-static/yangfan/logo-q.svg");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.kpfyFB .jiaoyi-picker {
		flex-shrink: 1;
		-webkit-box-flex: 1;
		flex-grow: 1;
	}

	.lhwzuD {
		font-size: 12px;
		color: rgb(255, 255, 255);
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		line-height: 20px;
		white-space: nowrap;
		border-radius: 4px;
	}

	.ldyfba {
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		text-align: center;
		letter-spacing: -0.3px;
		color: rgb(67, 50, 9);
		display: flex;
		flex-direction: row;
		-webkit-box-align: center;
		align-items: center;
	}

	.am-icon {
		fill: currentColor;
		background-size: cover;
		width: 22px;
		height: 22px;
	}

	.iTMaeS {
		display: flex;
		flex-direction: row;
		margin-top: 24px;
	}

	.iQhmBv {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
	}

	.iQhmBv .account-title {
		padding-left: 30px;
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 17px;
		color: rgb(141, 99, 15);
		margin-bottom: 12px;
	}

	.iQhmBv .account-num {
		padding-left: 30px;
		font-family: D-DIN;
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 20px;
		color: rgb(41, 30, 3);
	}

	.iQhmBv {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
	}

	.iQhmBv .account-title {
		padding-left: 30px;
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 17px;
		color: rgb(141, 99, 15);
		margin-bottom: 12px;
	}

	.iQhmBv .account-num {
		padding-left: 30px;
		font-family: D-DIN;
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 20px;
		color: rgb(41, 30, 3);
	}

	.ikCSQL {
		display: flex;
		margin: 16px 12px 10px;
		padding: 18px 6px;
		background: linear-gradient(rgba(255, 255, 255, 0.86) 0%, rgba(255, 255, 255, 0.86) 100%);
		border: 1px solid rgb(255, 255, 255);
		backdrop-filter: blur(7.5px);
		border-radius: 4px;
		position: relative;
		top: -60px
	}

	.kTszrt {
		flex: 1 1 0%;
	}

	.eaOZDH {
		font-weight: 700;
		font-size: 18px;
		text-align: center;
		margin-bottom: 8px;
	}

	.fsrSGa {
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
	}
	.page-v2-account-index .page-module-card {
	    margin: 16px 12px 0;
	    min-height: unset;
	    padding-bottom: 0;
	}
	.am-card:not(.am-card-full) {
	    border-radius: 5px;
	}
	.am-card {
	    min-height: 96px;
	    padding-bottom: 6px;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex-direction: column;
	    flex-direction: column;
	    background-color: #fff;
	}
	.kUGkvE {
	    display: flex;
	    flex-direction: row;
	    padding: 17px 0px;
	}
	.cWRzkj {
	    flex: 1 1 0%;
	    display: flex;
	    flex-direction: column;
	}
	.cWRzkj .account-num {
	    font-family: D-DIN;
	    font-style: normal;
	    font-weight: 700;
	    font-size: 18px;
	    line-height: 20px;
	    text-align: center;
	    letter-spacing: -0.3px;
	    color: rgb(19, 19, 19);
	    margin-bottom: 10px;
	}
	.cWRzkj .account-title {
	    font-family: "PingFang SC";
	    font-style: normal;
	    font-weight: 400;
	    font-size: 14px;
	    line-height: 17px;
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    justify-content: center;
	    letter-spacing: -0.3px;
	    color: rgb(130, 130, 130);
	}
	.am-list-body {
	    position: relative;
	    background-color: #fff;
		border-top:1px solid #eee;
	}
	.am-list-item {
	    position: relative;
	    display: -ms-flexbox;
	    display: flex;
	    padding-left: 15px;
	    min-height: 44px;
	    background-color: #fff;
	    vertical-align: middle;
	    overflow: hidden;
	    -webkit-transition: background-color .2s;
	    -o-transition: background-color .2s;
	    transition: background-color .2s;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.am-list-item .am-list-line {
	    position: relative;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex: 1;
	    flex: 1 1;
	    -ms-flex-item-align: stretch;
	    align-self: stretch;
	    padding-right: 15px;
	    overflow: hidden;
	}
	.am-list-item.am-list-item-middle .am-list-line {
	    -ms-flex-align: center;
	    align-items: center;
	}
	.am-list-item .am-input-control input, .am-list-item .am-input-label, .am-list-item .am-list-line .am-list-content {
		width:100%;
	    font-size: 16px!important;
	}
	.am-list-item .am-list-line .am-list-content, .am-list-item .am-list-line .am-list-extra {
	    line-height: 1.5;
	    width: auto;
	    overflow: hidden;
	    -o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    padding-top: 7px;
	    padding-bottom: 7px;
	}
	.hpTydy {
	    display: flex;
	    padding: 16px 0px;
	}
	.hpTydy .item {
	    flex: 1 1 0%;
	    text-align: center;
	}
	.hoqqAL.new-button, .hoqqAL.new-button-ghost {
	    background-color: transparent;
	    border: 1px solid rgb(179, 141, 74);
	    color: rgb(179, 141, 74);
	    background-image: none;
		width:160rpx;
		height:60rpx;
		font-size: 24rpx;
	}
	.fvzeeK {
	    display: inline-block;
	    background: rgb(245, 221, 175);
	    border: 1px solid rgb(238, 212, 163);
	    border-radius: 2px;
	    font-family: "PingFang SC";
	    font-style: normal;
	    font-weight: 400;
	    font-size: 12px;
	    line-height: 12px;
	    text-align: center;
	    padding: 2px;
	    color: rgb(179, 141, 74);
	    margin-left: 4px;
	}
</style>
