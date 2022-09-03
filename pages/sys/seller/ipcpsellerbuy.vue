<template>
	<view class="content">
		<!-- <footers></footers> -->
		<view>
			<image style="height: 278px;width: 100%;border-radius: 16px 16px 16px 16px;" src="@/static/twyh.png">
			</image>
		</view>
		<view class="detail">
			<view class="title">
				{{title}}
			</view>
			<view class="titleshe">
				<view class="she">
					限量
				</view>
				<view class="shet">
					{{num}}份
				</view>
			</view>
			<view class="say">
				<image :src="haveimg" class="topimg"></image>
				<view class="top">
					{{have}}
				</view>
			</view>
			<view style="margin-top: 12px;">
				藏品哈希值：{{hax}}
			</view>
			<view style="margin-top: 5px;">
				认证时间：{{time}}
			</view>
			<view class="detailgs">
				作品故事
			</view>
			<view style="padding-left: 9px;
			padding-right: 9px;">
				<image class="detailgsimg" :src="detailimg"></image>
			</view>
			<view class="js">
				作品介绍
			</view>
			<view style="margin-top: 12px;">
				{{js}}
			</view>
			<view class="js">
				藏品意义
			</view>
			<view style="margin-top: 12px;">
				{{yy}}
			</view>
		</view>
		<view class="detail">
			{{bqsm}}
		</view>
		<view class="detail">
			<image style="width: 100%;" :src="swzs"></image>
		</view>
		<view class="detail">
			<view class="detailgs">
				购买须知
			</view>
			<view>{{xz}}</view>
		</view>
		<button class="trans">转售历史</button> 
		<view class="detail">
			<view style="align-self: center;">立即购买</view>
		</view>
		<buttom></buttom>
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue"
	import footers from "@/components/footers/footers.vue"
	export default {
		data() {
			return {
				bqsm:"版权说明+版权收益说明",
				swzs:require(`@/static/have.png`),
				title: '天宫数字空间站',
				num: 99,
				haveimg: require(`@/static/have.png`),
				detailimg: require(`@/static/twyh.png`),
				have: '元气艺术',
				hax: '12D4c46h54435E4545n34',
				time: '2022-03-06  15:00',
				js:'中国空间站（天宫空间站，英文名称：China Space Station）一般指的是中华人民共和国计划中的一个空间站系统。预计在2022年前后建成。空间站轨道高度为400~450公里，倾角42~43度，设计寿命为10年，长期驻留3人，总重量可达180吨 [48]  ，以进行较大规模的空间应用。</p>',
				yy:'  空间科学研究的应用前景十分广阔。张伟分类介绍说，比如空间生物学研究应用方面，可以为培育优良物种、探索疾病机理、研发生物药物、改进人类健康而服务;微重力流体与燃烧研究应用方面，可以促进新型清洁能源开发、改善地球环境;空间材料研究应用方面，开展空间材料加工、先进材料制备等研究，探索和揭示材料物理和化学过程规律，可以改进地面材料加工与生产工艺，研发与生产先进材料，推动工业技术进步',
				xz:' 数字藏品为虚拟数字商品，坚决反对一切形式的数字藏品炒作，坚决抵制任何形式的以数字藏品为名，实为虚拟货币相关活动的违法违规行为；坚决抵制任何形式的数字藏品商品价格恶意炒作，用技术手段确保商品价格反映市场合理需求；坚决抵制任何形式将数字藏品进行权益类交易、标准化合约交易等违法违规行为，反对数字藏品金融产品化。'
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
		padding-left: 10px;
		padding-top: 8px;
		padding-right: 10px;
		padding-bottom: 12px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin-top: 16px;
		line-height: 20px;
		border-radius: 10px 10px 10px 10px;
		background-color: rgba(61, 63, 80, 100);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);

		color: rgba(243, 245, 251, 100);
		font-size: 12px;
		text-align: left;

		.title {
			align-self: center;
			left: 110px;
			margin-top: 11px;
			// width: 140px;
			height: 28px;
			color: rgba(243, 246, 251, 100);
			font-size: 20px;
			text-align: left;
		}

		.titleshe {
			margin-top: 8px;
			display: flex;
			align-self: center;
			align-items: center;

			.she {
				height: 16px;
				// width: 36px;
				padding: 1px 2px;
				line-height: 17px;
				background-color: rgba(211, 211, 211, 100);
				color: rgba(16, 16, 16, 100);
				font-size: 12px;
				text-align: center;
			}

			.shet {
				// width: 67px;
				height: 16px;
				padding: 1px 4px;
				line-height: 17px;
				background-color: rgba(68, 69, 75, 100);
				color: rgba(237, 223, 188, 100);
				font-size: 12px;
				text-align: center;
			}
		}

		.say {
			display: flex;
			margin-top: 10px;

			.topimg {
				width: 25px;
				height: 26px;
			}

			.top {
				margin-left: 5px;
			}
		}

		.detailgs {
			margin-top: 16px;
			height: 25px;
			color: rgba(243, 246, 251, 100);
			font-size: 18px;
			text-align: left;
		}

		.detailgsimg {
			margin-top: 9px;
			width: 100%;
		}
		.js{
			align-self: center;
			height: 20px;
			color: rgba(237, 223, 188, 100);
			font-size: 14px;
			text-align: left;
		}
	}
	
	.trans{
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
</style>
