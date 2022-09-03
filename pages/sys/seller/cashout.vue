<template>
	<view class="content">
		<view class="flex rel align-center">
			<footers></footers>
			<view class="mt20" style="position: absolute;left: 50%;transform: translateX(-50%);">提现</view>
		</view>
		<view class="mt20">
			
			
		</view>
	</view>
</template>

<script>
	import footers from "@/components/footers/footers.vue";
	export default{
		name: 'cashout',
		components: {
			footers,
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		color: #fff;
	}
</style>