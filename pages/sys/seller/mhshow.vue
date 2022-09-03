<template>
	<view class="content">
		<!-- <footers></footers> -->
		<view class="detail">
			<view v-for="item in navtitle">
				{{item}}
			</view>
		</view>
		<image class="banner" :src="imgarr"></image>
		<view style="display: flex;"><text style="flex:1;color:#646477 ">合约地址：</text><text
				style="color: #4064A8;margin-right: 5px;">{{link}}</text><image style="height:23px;width:20px;" src="@/static/fz.png"></image></view>
		<view class="detail2"><text>{{num}}</text><text>{{auth}}</text></view>
		<view class="detail2"><text>{{selectcontent}}</text></view>
		<view class="detail2"><text>{{sellercontent}}</text></view>
		<buttom></buttom>
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue"
	import footers from "@/components/footers/footers.vue"
	export default {
		data() {
			return {
				selectcontent:"这是一个说明",
				sellercontent:"这是一个故事",
				num:999,
				auth:"小熊",
				mhsrc: require('@/static/ntfimg.png'),
				navtitle: [],
				link: "ashdi12@ncanna",
				imgarr: [{
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}, {
					img: require('@/static/ntfimg.png'),
					name: '盲盒名称',
					price: '盲盒价格'
				}]
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {
			buttom,
			footers
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		padding-right: 17px;
		background-color: rgb(21,21,21);
		min-height: 100vh;
		padding-bottom: 100px;
	}

	.detail {
		margin-top: 10px;
		justify-content: space-around;
		padding: 10px;
		display: flex;
		align-items: stretch;
		line-height: 20px;
		border-radius: 10px 10px 10px 10px;
		background-color: rgba(61, 63, 80, 100);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);

		color: rgba(243, 245, 251, 100);
		font-size: 14px;

	}

	.trans {
		margin-top: 12px;
		margin-left: 6px;
		margin-right: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 33px;
		line-height: 20px;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 100);
	}

	.seller {
		display: flex;
		flex-flow: row wrap;
	}

	.sellers {
		padding: 10px;
		$width: 42%;
		width: $width;
		// height: $width;
	}

	.banner {
		margin-left: 44px;
		margin-right: 44px;
		height: 40px;	
	}
	.detail2 {
		padding-left: 10px;
		padding-top: 8px;
		padding-right: 10px;
		padding-bottom: 12px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 16px;
		line-height: 20px;
		border-radius: 10px 10px 10px 10px;
		background-color: rgba(61, 63, 80, 100);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
	
		color: rgba(243, 245, 251, 100);
		font-size: 12px;
		text-align: left;
		}
</style>
