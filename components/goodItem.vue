<template>
	<view @tap="handle(item)" class="sellers2">
    <!-- 已售罄图标 -->
    <view  class="abs" style="top:15px;left:15px;z-index: 101">
      <img  v-if="item.status === '2'" src="@/static/goods/status/empty.svg" />
      <img v-if="item.status === '7'" src="@/static/goods/status/pre.svg"  />
      <img v-if="item.status === '8'" src="@/static/goods/status/end.svg"  />
      <img v-if="item.status === '21'" src="@/static/goods/status/destroy.svg"  />
    </view>
    <view  class="abs"  style="margin: 15px -30px; height:20px;z-index: 100">
      <image mode="aspectFit" style="height: 20px" v-if="item.type === '2'" src="@/static/goods/type/reword.svg" />
      <image mode="aspectFit" style="height: 20px" v-if="item.type === '3'" src="@/static/goods/type/card.svg"  />
      <image mode="aspectFit" style="height: 20px" v-if="item.type === '4'" src="@/static/goods/type/box.svg"  />
      <image mode="aspectFit" style="height: 20px" v-if="item.type === '5'" src="@/static/goods/type/design.svg"  />
    </view>
		<u--image :src="item.detailImage" mode="aspectFill" width="100%" height="135px" radius="20px"></u--image>
		<view style="line-height: 30px">
			<view class="sl">{{ item.name }}</view>
			<text class="buyLimit">
				<text class="buyLimitText">{{ item.shortNumber }}</text>
				<text class="buyLimitNum">{{ item.totalStock }}</text>
			</text>
			<div class="buyPrice">
				<text style="font-size: 10px; color: #bfbfc3">Reserve price</text>
				<text style="color: #68d2f2">￥{{ item.price }}</text>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodItem",
		props: {
			item: {
				type: Object,
				dafault: {
					img: require("@/static/bg1.png"),
					sellered: 0,
					num: 999,
					name: 222,
					totalStock: 777,
					total: 999,
					price: 666,
				}
			}
		},
		mounted() {
			// console.log(this.item)
		},
		data() {
			return {

			};
		},
		methods: {
			handle(item) {
				this.$emit('handle', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sellers2 {
		position: relative;
		padding: 15px 15px 10px;
		width: 49%;
		background-color: rgb(32, 32, 32);
		box-sizing: border-box;
		color: #fff;
		border-radius: 15px;
		margin-right: 2%;
		margin-bottom: 15px;
		float: left;

		&:nth-child(even) {
			margin-right: 0;
		}
	}

	.buyLimit {
		margin: 10px 0;
		font-weight: bolder;
	}

	.buyLimitText {
		background-color: rgb(255, 83, 161);
		padding: 4px;
		// border-radius: 4px 0 0 4px;
	}

	.buyLimitNum {
		background-color: #fff;
		color: rgb(255, 83, 161);
		padding: 4px;
		// border-radius: 0 4px 4px 0;
	}

	.buyPrice {
		align-self: center;
		font-size: 20px;
		display: flex;
		justify-content: space-between;
	}
</style>
