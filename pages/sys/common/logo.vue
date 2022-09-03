<template>
	<view class="logo">
	<image style="width: 60px;height: 60px" src="@/static/go.svg"></image>
		<view class="cent"></view>
		<image style="width: 60px;height: 60px" src="@/static/go1.svg"></image>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.logo {
		display: flex;
		align-items: center;
		height: 60px;
	
		.cent {
			margin-left: 22px;
			margin-right: 22px;
			width: 2px;
			height: 25px;
			background: #707070;
			border-radius: 0px 0px 0px 0px;
			opacity: 1;
		}
	}
</style>