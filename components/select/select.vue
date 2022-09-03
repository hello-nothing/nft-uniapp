<template>
	<view class="select">
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
				this.$mRount.back()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.select {
		height: 39px;
		display: flex;
		justify-content: space-between;
	}
</style>
