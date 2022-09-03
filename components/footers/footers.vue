<template>
	<view class="footer">
		<view>
			<image @click="returnclick()" src="@/static/return.svg" style="height: 24px;width: 24px;"></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			returnclick() {
				// this.$mRount.back()
				uni.navigateBack()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.footer {
		height: 24px;
		width: 24px;
		margin-top: 20px;
	}
</style>
