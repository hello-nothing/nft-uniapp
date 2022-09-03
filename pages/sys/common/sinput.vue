<template>
	<view>
		<template v-if="title">
			<text class="title" v-text="title"></text>
		</template>
		<view class="sinput">
			<text class="text" v-text="text"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
			    type: String,
			    default: undefined
			},
			text: {
			    type: String,
			    default: undefined
			}
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
	.text{
		font-size: 14px;
		font-weight: normal;
		color: #BFBFC3;
		line-height: 24px;
		-webkit-background-clip: text;
		margin-left: 20px;
	}
	.title{
		height: 33px;
		font-size: 14px;
		font-weight: normal;
		color: #BFBFC3;
		line-height: 33px;
	}
	.sinput{
		display: flex;
		align-items: center;
		height: 56px;
		background: rgb(21,21,21);
		border-radius: 20px 20px 20px 20px;
		opacity: 1;
		filter: blur(0.1px);
	}
</style>