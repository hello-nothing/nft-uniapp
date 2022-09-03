<template>
	<view class="content">
		<view class="sf">
			<image style="height: 100%;width: 100%;" src="@/static/profile.svg"></image>
		</view>
		<view class="sf2">
			<view class="id">
				<text>互联ID卡</text>
			</view>
			
			<view class="svg">
				<image style="height: 100%;width: 100%;"  src="@/static/profile1.svg"></image>
			</view>
		</view>
		<view style="margin-top:46px">
		<sinput title="姓名：" text="Type something"/>
		<sinput title="联系电话：" text="125xxxxxxxxxxxx"/>
		<sinput title="验证码：" text="Type something"/>
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
		}
	}
</script>

<style lang="scss">
	.sf{
		margin-top: 16px;
		margin-left: 40px;
		margin-right: 40px;
		height: 107px;
		font-size: 40px;
		font-weight: normal;
		color: #FFFFFF;
		line-height: 54px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	.sf2{
		margin-top: 26px;
		height: 187px;
		background: linear-gradient(45deg, #FFD840 0%, #F3ACFF 56%, #8AECFF 100%);
		border-radius: 24px 24px 24px 24px;
		opacity: 1;
		.id{
			position: relative;
			margin: 0 auto;
			top: 50px;
			width: 145px;
			height: 48px;
			background: rgba(108,108,108,0.2000);
			border-radius: 20px 20px 20px 20px;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			> text {
				font-size: 14px;
				font-weight: normal;
				color: #000000;
				line-height: 20px;
				text-align: center;
			}
			
		}
		.svg{
			margin: 0 auto;
			position: relative;
			
			top: 83px;
			width: 130px;
			height: 130px;
			// background: rgb(21,21,21);
			// box-shadow: 0px 20px 30px 1px rgba(0,0,0,0.4000);
		}
		// filter: blur(1px);
	}
	.logo2 {
		align-self: flex-end;
		width: 335px;
		height: 274px;
		background: rgb(21,21,21);
		box-shadow: 0px 20px 30px 1px rgba(0, 0, 0, 0.4000);
		border-radius: 40px 40px 40px 40px;
		opacity: 1;
		filter: blur(0.1px);

		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
