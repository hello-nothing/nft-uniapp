<template>
	<view class="content">
		<!-- <footers></footers> -->
		<view class="rel">
			<u--image height="278px" width="100%" radius="16px" :src="goods.detailImage"></u--image>
			<view class="info">
				<view style="width: 45%;text-align: center" class="textfff">
					<view style="color:#BFBFC3">藏品名称</view>
					<view class="mt10 sl" style="max-width: 90%;font-size: 22px;">{{ goods.name }}</view>
				</view>
				<view style="width: 50%;text-align: center" class="textfff">
					<view style="color:#BFBFC3">首发数量</view> <!--  &nbsp;  -->
					<view class="mt10 sl" style="max-width: 90%;font-size: 22px;">
						{{goods.totalStock}}
					</view>
				</view>
			</view>
		</view>
		<view style="margin: 30px;"></view>
		<view v-if="goods.ownerInfo" class="detail align-center">
			<view v-if="goods.ownerInfo" class="flex avatar textfff font18 align-center">
				<u-avatar :src="goods.ownerInfo.avatar" size="50" style="margin-left: 10%"></u-avatar>
				<view class="ml15"> {{goods.ownerInfo.nickname}} </view>
			</view>
		</view>

		<view class="detail" style="margin-top: 20px;">
			<!--			<view class="title">-->
			<!--				{{ title }}-->
			<!--			</view>-->
			<!--			<view class="titleshe">-->
			<!--				<view class="she">-->
			<!--					限量-->
			<!--				</view>-->
			<!--				<view class="shet">-->
			<!--					{{ num }}份-->
			<!--				</view>-->
			<!--				<view class="she">￥{{ price }}</view>-->
			<!--			</view>-->
			<!-- 	<view class="price">

			</view> -->
			<!-- <view class="say">
				<image :src="haveimg" class="topimg"></image>
				<view class="top">
					{{have}}
				</view>
			</view> -->

			<view style="margin-top: 12px;display: flex;">
				链上交易哈希值：<view style="max-width: 60%; " class="sl">
					<div ref="copyObj" class="sl">{{ goods.transHash }}</div>
					<!--					<u-parse :content="goods.transHash" :tagStyle="style"></u-parse>-->
				</view>
				<image src="@/static/copy.svg" style="color: #fff; height: 20px; width: 20px;"
					@tap="copy(goods.transHash)" />
			</view>
			<view style="margin-top: 12px;display: flex;">
				链上对象标识：<view style="max-width: 60%; " class="sl">
					<div ref="copyObj" class="sl">{{ goods.transNftId ? goods.transNftId : '链上确认中....' }}</div>
					<!--					<u-parse :content="goods.transHash" :tagStyle="style"></u-parse>-->
				</view>
				<image src="@/static/copy.svg" style="color: #fff; height: 20px; width: 20px;"
					@tap="copy(goods.transNftId)" />
			</view>
			<!-- <view><u-parse :content="hax" :tagStyle="style" :selectable="true"></u-parse></view> -->
			<view style="margin-top: 5px;margin-bottom: 20px">
				认证时间：{{ goods.certDate }}
			</view>
    </view>
    <view class="detail align-center">
			<!-- 	<view class="detailgs">
				作品故事
			</view> -->
			<!-- <view style="padding-left: 9px; padding-right: 9px;"> -->
			<view v-html="goods.detail" ref="richcontent" class="richcontent"></view>
			<!-- </view> -->
		</view>
		<view class="detail mb20">
			<view class="detailgs">
				购买须知
			</view>
			<view>{{ xz }}</view>
		</view>
		<!-- <button class="trans">转售历史</button> -->
		<view class="btn-content" >
			<u-button :disabled="goods.ownerInfo || goods.status !== '1'" class="my-btn flex " @tap="toBuy">
				<view class="price ">
					<span>￥</span> {{ goods.price }}
				</view>
        <u-count-down v-show="startCountDown !== 0"
            :time=startCountDown
            format="DD天HH小时mm分ss秒"
            @finish="endStartCountDown()"
        ></u-count-down>
<!--        <u-count-down v-if="endCountDown !== 0"-->
<!--            :time=endCountDown-->
<!--            format="DD天HH小时mm分ss秒"-->
<!--            @end="()=>startCountDown===0"-->
<!--        ></u-count-down>-->
				<span v-if="goods.status === '8'" class="">已结束</span>
				<span v-if="goods.status === '2'" class="">已售罄</span>
				<span v-if="goods.status === '1'" class="">立即支付</span>
			</u-button>
		</view>

		<!-- <buttom></buttom> -->
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue"
	import footers from "@/components/footers/footers.vue"
	import moment from '@/common/moment.js'
	import {
		creatOrder
	} from "@/api/good.js"
	import {
		getGoodsDetails
	} from '@/api/index.js'
  import UButton from "../../../uni_modules/uview-ui/components/u-button/u-button";
	export default {
		data() {
			return {
				id: '',
				goods: {},
				startCountDown: 0,
				fastbuyStartCountDown: 0,
				status: '',
				title: '',
				num: 99,
				price: 19.9,
				haveimg: '',
				detailimg: '',
				have: '元气艺术',
				hax: '12D4c46h54435E4545n34',
				time: '2022-03-06  15:00',
				xz: ' 数字藏品为虚拟数字商品，坚决反对一切形式的数字藏品炒作，坚决抵制任何形式的以数字藏品为名，实为虚拟货币相关活动的违法违规行为；坚决抵制任何形式的数字藏品商品价格恶意炒作，用技术手段确保商品价格反映市场合理需求；坚决抵制任何形式将数字藏品进行权益类交易、标准化合约交易等违法违规行为，反对数字藏品金融产品化。',
				style: {
					// 字符串的形式
					p: 'color: red;font-size:32rpx',
					span: 'font-size: 30rpx'
				}
			}
		},
		onLoad(option) {
			// console.log(option.id); //打印出上个页面传递的参数。
			this.id = option.id;
			this.getGoodsInfo()
		},
		beforeMount() {
			// setTimeout(() => {
			// 	this.$refs.richcontent.$el.getElementsByTagName("img")[0].style.width = '100%';
			// }, 800);
		},
		methods: {
      endStartCountDown(){
        this.startCountDown = 0
        this.getGoodsInfo()
      },
			// 复制藏号
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						//调用方法成功
						uni.$u.toast("复制成功！");
					}
				})
			},
			getGoodsInfo() {
				getGoodsDetails({
					id: this.id
				}).then(res => {
					this.goods = res.data
					this.goods.certDate = this.goods.certDate ? moment(this.goods.certDate).format("YYYY-MM-DD HH:mm:ss") : '链上确认中....'

          // 已售罄、已下架、已结束
          if(res.data.status !== '7'){
            return
          }

          // 预售
					if(res.data.buyStartTime){
					  this.startCountDown = res.data.buyStartTime - new Date().getTime()
					}

					// if(res.data.status === '1' && res.data.buyEndTime){
					//   this.endcountDown = res.data.buyEndTime - new Date().getTime()
					// }

          // // 优先购
          // if(!res.data.fastbuy && res.data.fastbuy){
          //
          // }

				})
			},
			async toBuy() {
				// this.$u.vuex("vuex_token", 'e31c1c1960074bfcae72096ed8948e4c')
				const {
					data: {
						id,
						payOrderId
					},
					code
				} = await creatOrder({
					goodsId: this.id,
					appId: 100
				})
				// console.log(orderId, payOrderId, code)
				// if(code)
				// 使用
				uni.navigateTo({
					url: `/pages/sys/seller/buycp?orderId=${id}&goodId=${this.id}`
				});
			}
		},
		components: {
      UButton,
			buttom,
			footers
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		padding-right: 17px;
		background-color: rgb(21, 21, 21);
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
		background-color: rgb(33, 33, 33);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);

		color: rgba(243, 245, 251, 100);
		font-size: 12px;
		text-align: left;
		overflow: hidden;


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

		.js {
			align-self: center;
			height: 20px;
			color: rgba(237, 223, 188, 100);
			font-size: 14px;
			text-align: left;
		}
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

	.richcontent {
		text-align: center;

		/deep/ img {
			width: 100%;
		}
	}

	.my-btn {

		background-image: url('@/static/btngb.svg');
		justify-content: space-around;
		align-items: center;
		height: 100%;
		font-size: 24px;
	}

	.btn-content {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgb(48, 48, 48);
		border-radius: 20px 20px 0 0;
		padding: 20px 0 15px;
		box-sizing: border-box;
		height: 100px;
	}

	.info {
		position: absolute;
		bottom: -60px;
		background: rgb(47, 47, 47);
		border-radius: 30px;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		padding: 20px 0 20px 35px;
		box-sizing: border-box;
		border: 3px solid rgb(50, 50, 50);
	}

	.avatar {
		border-radius: 50%;
		// border: 3px solid rgb(33, 33, 33);
		//bottom: -54px;
		left: 20%;
		//transform: translateX(-50%);
	}
</style>
