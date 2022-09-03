<template>
	<view class="content">
		<logo style="align-self: center;flex: 1;"></logo>
		<view class="logo2">
			<view style="flex:1;width: 214px;height: 33px;margin-top: 34px;">
				<image style="width: 214px;height: 33px" src="@/static/go2.svg"></image>
			</view>
			
			<view style="flex:3;width: 266px;height: 43px;margin-top: 11.5px;">
				<image style="width: 266px;height: 43px;" src="@/static/go3.png"></image>
			</view>
			
			<view style="width: 224px;height: 64px;margin-bottom: 33px;"  @click="start()">
				<image style="width: 224px;height: 64px;" src="@/static/go4.svg"></image>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		components: {
		},
		data() {
			return {
			};
		},
		onLoad() {
		},
		methods: {
			start() {
				uni.$u.route('/pages/sys/start/profile')
			}
		}
	}
</script>

<style lang="scss">
	.logo2 {
		align-self: flex-end;
		width: 335px;
		height: 274px;
		background: rgb(21,21,21);
		box-shadow: 0px 20px 30px 1px rgba(0,0,0,0.4000);
		border-radius: 40px 40px 40px 40px;
		opacity: 1;
		filter: blur(0.1px);

		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
