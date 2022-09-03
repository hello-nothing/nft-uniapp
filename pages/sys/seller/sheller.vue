<template>
	<view class="content">
		<!-- <footers></footers> -->
		<view v-for="item in text">
			{{item}}
		</view>
		<!-- <view class="detail">
			<view v-for="item in navtitle">
				{{item}}
			</view>
		</view>
		<view class="seller">
			<template v-for="item in imgarr">
				<view class="sellers">
					<image :src="item.img" style="width: 100%;">
						
					</image>
					<view class="trans">
						{{item.name}} {{item.price}}￥
					</view>
				</view>
			</template>
		</view> -->
		<buttom></buttom>
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue"
	import footers from "@/components/footers/footers.vue"
	export default {
		data() {
			return {
				text:['IP市场','艺术家市场','版权市场','盲盒市场'],
				navtitle: ['全部系列', '全部藏品', '价格升序','流转市场'],
				imgarr: [{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
				},{
					img:require('@/static/goodimg.png'),
					name:'藏品名称',
					price:'藏品价格'
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
		height: $width;
	}
</style>
