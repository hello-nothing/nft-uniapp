<template>
	<view class="wrap h100  my-bgc">
		<!--国际化-->
		<!-- <js-lang title="login.title" :showBtn="true"></js-lang> -->

		<!-- <view class="logo">
			<u--image :showLoading="true" src="./../../../static/go.svg" width="80px" height="80px" :fade="false">
			</u--image>
		</view> -->
		<logo class="jusc" />
		<!--用户名密码登录-->
		<user-password :inviteCode="inviteCode" />

		<!-- #ifdef MP -->
		<button class="button" @click.stop="getUserProfile" :disabled="btnLoading" :loading="btnLoading">
			<text>{{ $t("login.vxLoginButton") }}</text>
		</button>
		<!-- #endif -->
		<view class="login-bottom-box">
			<view class="copyright">
				Copyright © 2022 hulianar.. All rights reserved.
			</view>
		</view>
		<buttom />
	</view>
</template>
<script>
	import userPassword from "./userPassword.vue";
	import buttom from "@/components/buttom/buttom.vue";
	export default {
		components: {
			userPassword,
			buttom
		},
		data() {
			return {
				btnLoading: false,
				inviteCode: ''
			};
		},
		onLoad(option) {
			//已经登录 跳转到首页
			if (this.$store.getters.hasLogin) {
				uni.reLaunch({
					url: "/pages/sys/index/index",
				});
			};
      if(option && option.inviteCode){
        this.inviteCode = option.inviteCode
        uni.setStorageSync('invite', option.inviteCode)
      }else {
        this.inviteCode = uni.getStorageSync('invite')
      }
		},
		methods: {
			getUserProfile() {
				this.btnLoading = true;
				//获取code，然后调用微信登录接口判断是否登录 401则跳转到绑定页面
				var tmp = this;
				uni.login({
					provider: "weixin",
					success: function(res) {
						console.log("code", res.code);

						let grant_type = "mobile";
						let code = res.code;

						tmp.$u.api
							.vxLogin({
								grant_type,
								code,
							}, {
								Authorization: "Basic c29jaWFsOnNvY2lhbA==",
							})
							.then((res) => {
								tmp.btnLoading = false;
								//提示
								tmp.$u.toast("恭喜您，登录成功！");

								// 登陆成功，存储相关信息
								tmp.$u.vuex("vuex_token", res.access_token);
								tmp.$u.vuex("vuex_refresh_token", res.refresh_token);
								tmp.$u.vuex("vuex_username", res.username);
								tmp.$u.vuex("vuex_userId", res.user_id);
								tmp.$u.vuex("vuex_client_id", res.client_id);

								//查询用户详细信息并储存
								tmp.$u.api.user.getUserInfo().then((res) => {
									console.log("获取用户信息:", res);
									tmp.$u.vuex("vuex_user", res.data.sysUser);
								});

								//跳转页面
								setTimeout(() => {
									uni.reLaunch({
										url: "/pages/sys/home/index",
									});
								}, 500);
							})
							.catch((e) => {
								tmp.btnLoading = false;
								if (e.statusCode === 401 || e.message === "用户不存在") {
									console.log(
										"用户未绑定，请使用 sys_user 表存在的手机号进行绑定"
									);
									tmp.$u.toast(
										"用户未绑定，请使用 sys_user 表存在的手机号进行绑定"
									);
									uni.reLaunch({
										url: "/pages/sys/login/bindUser",
									});
									console.log("页面跳转...");
								}
							});
					},
				});
			},
		},
	};
</script>
<style lang="scss">
	@import "index.scss";

	.logo {
		width: 80%;
		font-size: 64rpx;
		color: #497bff;
		margin: 50rpx auto 0;
		text-align: center;
	}

	.list-call-icon {
		color: #ff0000;
	}

	.currentPhone-box {
		text-align: center;
		padding: 40rpx 80rpx;

		.number-text {
			color: #000000;
			font-size: 60rpx;
		}

		.other-text {
			color: #999999;
			font-size: 26rpx;
			padding: 20rpx 0;
		}

		.u-btn {
			margin: 30rpx auto;
		}

		.u-hairline-border {
			border: 1px solid #fff;
		}
	}

	.register {
		display: inline-block;
		color: #497bff;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		float: right;
		margin-top: 6rpx;
	}

	.register-link {
		float: right;
		padding: 0 16rpx;
	}

	.reg-link {
		display: inline-block;
		color: #497bff;
	}

	.oauth2 {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 0rpx 100rpx 30rpx;

		image {
			height: 80rpx;
			width: 80rpx;
		}
	}

	.u-tabs {
		padding: 0 70rpx;
	}
</style>
