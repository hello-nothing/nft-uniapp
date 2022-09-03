<template>
	<view>
		<view class="list">
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="account"></u-icon>
				<input class="u-input" type="text" v-model="model.mobile" maxlength="32"
					:placeholder="$t('login.placeholderMobile')" />
			</view>
			<view class="list-call">
				<u-icon class="u-icon" size="40" name="coupon"></u-icon>
				<input class="u-input" type="text" v-model="model.code" maxlength="6" placeholder="手机验证码" />
				<u-button :disabled="smsCodeBtnDisabled" @click="getSmsCode">
					<text v-if="!smsCodeBtnDisabled">获取验证码</text>
					<text v-else>{{
					  `重新发送 (${codeSeconds})`
					}}
					</text>
				</u-button>

			</view>
			<view class="button" hover-class="button-hover" @click="toLogin">
				<text>绑定用户</text>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from '@/common/moment';

	export default {
		name: 'smsCode',
		data() {
			return {
				smsCodeBtnDisabled: false, //验证码按钮
				codeSeconds: 0, // 验证码发送时间间隔
				model: {
					mobile: '',
					code: ''
				}, //绑定的手机号、验证码数据
			};
		},
		onLoad() {
			//验证码发送间隔
			const time = moment().valueOf() / 1000 - uni.getStorageSync('loginSmsCodeTime');

			//是否允许重新发送验证码
			if (time < 60) {
				this.codeSeconds = 60 - parseInt(time, 10);
				this.handleSmsCodeTime(this.codeSeconds);
			} else {
				this.codeSeconds = 60
				this.smsCodeBtnDisabled = false;
				uni.removeStorageSync('loginSmsCodeTime');
			}
		},
		methods: {
			// 发送验证码并进入倒计时
			getSmsCode() {
				//表单校验
				if (this.model.mobile.length === 0) {
					this.$u.toast("请输入手机号");
					return;
				}

				this.$u.api.sendCode({
					mobile: this.model.mobile
				}, {
					'Authorization': 'Basic c29jaWFsOnNvY2lhbA=='
				}).then(r => {
					if (r.data) {
						this.$u.toast(`验证码发送成功!`);
						this.smsCodeBtnDisabled = true;
						uni.setStorageSync('loginSmsCodeTime', moment().valueOf() / 1000);
						this.handleSmsCodeTime(59);
						console.log(`验证码是${r.msg}`)
					} else {
						this.$u.toast(r.msg === '手机号未注册' ? '手机号未绑定账号' : r.msg);
					}
				})
			},
			handleSmsCodeTime(time) {
				let timer = setInterval(() => {
					if (time === 0) {
						clearInterval(timer);
						this.smsCodeBtnDisabled = false;
					} else {
						this.codeSeconds = time;
						this.smsCodeBtnDisabled = true;
						time--;
					}
				}, 1000);
			},
			// 提交表单
			async toLogin() {
				//表单校验
				if (this.model.mobile.length === 0) {
					this.$u.toast('请输入手机号');
					return;
				}
				if (this.model.code.length === 0) {
					this.$u.toast('请输入验证码');
					return;
				}

				//绑定用户信息
				await this.setUserBind()
			},

			// 微信绑定用户
			async setUserBind() {
				let ctx = this
				let mobile = this.model.mobile
				//获取code
				uni.login({
					provider: 'weixin',
					success: function(res) {
						let code = res.code
						console.log('vxCode:', code)
						//手机号登录
						ctx.$u.api.smsLogin({
							mobile,
							code
						}, {
							Authorization: 'Basic c29jaWFsOnNvY2lhbA=='
						}).then(res => {
							let token = res.access_token
							console.log('手机登录成功:', res)

							//储存用户信息
							ctx.$u.vuex('vuex_token', res.access_token)
							ctx.$u.vuex('vuex_refresh_token', res.refresh_token)
							ctx.$u.vuex('vuex_username', res.username)
							ctx.$u.vuex('vuex_userId', res.user_id)
							ctx.$u.vuex('vuex_client_id', res.client_id)

							//绑定用户
							ctx.$u.api.bingUser({
								code
							}, {
								'Authorization': 'Bearer ' + token
							}).then(res => {
								console.log('绑定用户成功')
								uni.reLaunch({
									url: '/pages/sys/home/index'
								});
							})
						})
					}
				})
			}

		}
	};
</script>


<style lang="scss">
	@import 'index.scss';

	.logo {
		width: 260rpx;
		height: 260rpx;
		//background: rgba(59, 121, 235, 1);
		//box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(45, 127, 235, 0.5);
		border-radius: 50%;
		margin: 70rpx auto 10rpx auto;
	}

	.logo image {
		width: 260rpx;
		height: 260rpx;
		border-radius: 50%;
	}

	.base-url js-select {
		width: 100%;
	}

	.button {
		margin: 30rpx auto 0;
	}

	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #46afff;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 35rpx;
		margin-top: 60rpx;
	}

	.footer text {
		font-size: 30rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.oauth2 {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 55rpx 100rpx;

		image {
			height: 100rpx;
			width: 100rpx;
		}
	}
</style>
