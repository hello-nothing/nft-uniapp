<template>
	<div class="goodsSwiper rel">
		<u-swiper :indicator="false" :autoplay="false" :interval="3000" :duration="1000" :list="goods"
			keyName="detailImage" previousMargin="30px" nextMargin="30px" bgColor="transparent" :circular="true"
			@click="handleTap" @change="handleChange" height="100%" radius="20px">
		</u-swiper>
		<div class="info">
			<div v-for="(item, index) in goods" :key="item.id" @click="handleTap(index, index)">
				<div v-show="active === index" style="justify-content: space-between; display: flex">
					<div style="display: flex; flex-direction: column; max-width: 60%">
						<view class="sl">名称：{{ item.name }}</view>
						<text class="buyLimit">
							<text class="buyLimitText">首发限量</text>
							<text class="buyLimitNum">{{ item.totalStock }}</text>
						</text>
					</div>
					<div class="buyPrice">￥{{ item.price }}</div>

				</div>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Array,
				dafault: [],
			},
		},
		data() {
			return {
				active: 0,
			};
		},
		methods: {
			handleTap(index) {
				this.$emit("swiperItemClick", this.goods[index], index);
			},
			handleChange(data) {
				const {
					current
				} = data;
				this.active = current;
        this.$emit("swiperChange", this.goods[current]);
			},
		},
	};
</script>

<style scoped lang="scss">
	.u-swiper {
		height: 100% !important;

		v-deep .u-swiper__wrapper {
			height: 100% !important;
		}

		.u-swiper__wrapper__item__wrapper__image {
			height: 100% !important;
		}
	}

	.goodsSwiper {
		height: 250px;
		box-sizing: border-box;
		margin-bottom: 85px;

		.info {
			color: #fff;
			line-height: 35px;
			padding: 0 30px 20px;
			background: rgb(33, 33, 33);
			border-radius: 0 0 20px 20px;

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
			}
		}
	}
</style>
