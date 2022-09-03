<template>
	<view class="content">
		<!-- <view class="input">
			<u--input placeholder="请输入您想查找的内容" suffixIcon="search" prefixIconStyle="font-size: 22px;color: #fff">
			</u--input>
		</view>
		<view class="hot">
			热门推荐：
			<view class="md">墨刀系列</view>
			<view class="md">太空系列</view>
			<view class="md">空投系列</view>
			<image src="@/static/filter.svg" style="height: 24px;width: 24px;"></image>
		</view>
		<view class="seller">
			<view class="sellers">
				<image style="height: 30px;width: 30px;" src="@/static/ipseller.svg">IP市场</image>
			</view>
			<view class="sellers">
				<image style="height: 30px;width: 30px;" src="@/static/ntfseller.svg">艺术家市场</image>
			</view>
		</view>
		<view class="seller">
			<view class="sellers">
				<image style="height: 30px;width: 30px;" src="@/static/bqseller.svg">版权市场</image>
			</view>
			<view class="sellers">
				<image style="height: 30px;width: 30px;" src="@/static/mhseller.svg">盲盒市场</image>
			</view>
		</view>
		<view class="tans">
			流转市场
		</view> -->
		<view style="display: flex; margin-bottom: 19px; justify-content: space-between">
			<view class="select">
				<u-picker :show="show" :columns="columns" :closeOnClickOverlay="true" @cancel="pickerCancel"
					@close="pickerCancel" @confirm="pickerConfirm" keyName="name" :defaultIndex="defaultIndex">
				</u-picker>
				<view class="textfff flex align-center"
					style="background-color: rgb(33,33,33);height: 40px;line-height: 40px;border-radius: 20px;box-sizing: border-box;justify-content: space-around;"
					icon="arrow-down" @click="show = true">
					{{ pickerText }}
					<image src='@/static/zhankai.svg' style="width: 15px; height: 15px;"></image>
				</view>
			</view>
			<view class="select">
				<u-picker :show="show2" :columns="columns2" :closeOnClickOverlay="true" @cancel="pickerCancel2"
					@close="pickerCancel2" @confirm="pickerConfirm2" keyName="label" :defaultIndex="defaultIndex2">
				</u-picker>
				<!-- <u-button icon="arrow-down" @click="show2 = true">{{ pickerText2 }}</u-button> -->
				<view class="textfff flex align-center"
					style="background-color: rgb(33,33,33);height: 40px;line-height: 40px;border-radius: 20px;box-sizing: border-box;justify-content: space-around;"
					icon="arrow-down" @click="show2 = true">
					{{ pickerText2 }}
					<image src='@/static/zhankai.svg' style="width: 15px; height: 15px;"></image>
				</view>
			</view>
			<view style="width: 20%;">
				<!-- <u-button @click="reset">重置</u-button> -->
				<view class="textfff flex align-center"
					style="background-color: rgb(33,33,33);height: 40px;line-height: 40px;border-radius: 20px;box-sizing: border-box;justify-content: space-around;"
					icon="arrow-down" @click="reset">
					重置
				</view>
			</view>
		</view>

		<view style="margin-bottom: 19px; width: 100%">
			<good-item v-for="(item, index) in shop" :key="index" :item="item" @handle="handle(item)"></good-item>
		</view>
		<view>
			<u-loadmore color="rgb(200,200,200)" :status="status" :loading-text="loadingText"  :loadmore-text="loadmoreText"  :nomore-text="nomoreText" @loadmore="loadmore" />
		</view>
		<buttom></buttom>
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue";
	import footers from "@/components/footers/footers.vue";
	import goodItem from "@/components/goodItem.vue";
	import {
		getCateTree
	} from "@/api/good.js";
	import {
		getGoodsData,
		getDictList
	} from "@/api/index.js";
	export default {
		data() {
			return {
				defaultIndex: [],
				defaultIndex2: [],
				show: false,
				show2: false,
				columns: [],
				columns2: [
          [
            {'label':"首发",'value':0},
            {'label':"实物藏品",'value':2},
            {'label':"盲盒",'value':4},
            {'label':"衍生品",'value':5},
          ]
        ],
				pickerText: "IP",
				pickerText2: "类型",
				value: 0,
				wi: 20,
				shop: [],
				cateId: "",
				type: "",
				page: {
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
				status: 'loading',
				loadingText: '努力加载中...',
				loadmoreText: '点击加载更多',
				nomoreText: '没有更多了'
			};
		},
		onLoad(option) {
      this.getClassLists(option);

      // 跳转数据接收
			if(option){
        if(option.type && option.type !== ''){
          const type = option.type
          this.columns2[0].map( t=> {
            if(t.value+'' === type+'') {
              this.pickerText2 = t.label;
              this.type = type;
            }
          })
        }

			}

      this.getGoodsLists();
    },
		methods: {
			async getDictLists() {
				// const {
				// 	data,
				// 	code
				// } = await getDictList({
				// 	code: "nft_goods_type"
				// });
				// this.columns2 = [data];
			},
			async getClassLists(option) {
				const {
					code,
					data
				} = await getCateTree();
				let a = [];
				data.map((item) => {
					if (item.children && item.children.length > 0) {
						item.children.map((i) => {
							a.push(i);

              // 初始化传参分类
              if(option && option.cateId && option.cateId !== ''){
                const cateId = option.cateId
                if(i.id+'' === cateId+'') {
                  this.pickerText = i.name;
                  this.cateId = cateId;
                }
              }

						});
					}
				});
				console.log([a]);
				this.columns = [a];
				//   console.log(this.columns);
			},
			pickerCancel() {
				this.show = false;
			},
			pickerConfirm(e) {
				// console.log(e);
				const {
					indexs,
					value
				} = e;
				console.log("confirm", indexs, value);
				const {
					id,
					name
				} = value[0];
				this.defaultIndex = indexs;
				this.pickerText = name;
				this.cateId = id;
				this.getGoodsLists();
				this.show = false;
			},
			async getGoodsLists() {
				// cateId
				const params = {
					pageNo: this.page.pageNo,
					pageSize: this.page.pageSize,
					cateId: this.cateId,
					type: this.type,
				};
				const {
					code,
					data: {
						list,
						total
					},
				} = await getGoodsData(params);
				this.page.total = total
        if(this.page.pageNo === 1){
          this.shop = list
        }else{
          this.shop = this.shop.concat(list);
        }
        if (list.length < this.page.pageSize) {
          this.status = "nomore";
        } else {
          this.status = "loadmore";
        }
			},
			pickerCancel2() {
				this.show2 = false;
			},
			pickerConfirm2(e) {
				const {
					indexs,
					value
				} = e;
				console.log("confirm", indexs, value[0]);
				this.pickerText2 = value[0].label;
				this.type = value[0].value;
				this.defaultIndex2 = indexs;
				this.show2 = false;
				this.getGoodsLists();
			},
			handle(item) {
				uni.navigateTo({
					url: `/pages/sys/index/good?id=${item.id}`, // ${id}藏品ID
					// url: `/pages/sys/index/good?id=15474`,
				});
			},
			reset() {
				this.pickerText = "IP";
				this.pickerText2 = "类型";
				this.cateId = this.type = "";
				this.page.pageNo = 1;
				this.page.pageSize = 10;
				this.getGoodsLists();
			},
			loadmore(){
				this.status='loading'
				this.page.pageNo++;
				this.getGoodsLists();
			}
		},
		mounted() {},
		components: {
			buttom,
			footers,
			goodItem,
		},
	};
</script>

<style lang="scss" scoped>
	$width: 42%;

	.shell {
		z-index: 5;
		left: $width;
		height: -12px;
		width: 81px;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;

		width: 81px;
		height: 32px;
		line-height: 17px;
		border-radius: 16px 3px 3px 16px;
		background-color: rgba(15, 15, 15, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 12px;
		text-align: center;
	}

	.item {
		height: 167px;
		/* width: 167px; */
		padding-left: 10px;
		padding-right: 10px;
	}

	// .sellers2 {
	// 	position: relative;
	// 	padding: 10px;
	// 	width: 49%;
	// 	background-color: rgb(32, 32, 32);
	// 	box-sizing: border-box;
	// 	color: #fff;
	// 	border-radius: 15px;
	// }

	.tans {
		margin-top: 19px;
		margin-left: 39px;
		margin-right: 39px;
		height: 51px;
		justify-content: center;
		align-items: center;
		display: flex;
		line-height: 20px;
		background-color: rgba(255, 255, 255, 100);

		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 100);
	}

	.seller {
		// display: flex;
		/* flex-flow: row wrap; */
		// justify-content: space-between;
		width: 100%;
	}

	// .sellers {
	// 	flex: 1;
	// 	padding: 5px;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	/* $width: 60%;
	// 	width: $width;
	// 	height: $width; */
	// 	color: rgba(255, 255, 255, 100);
	// 	font-size: 14px;
	// 	text-align: left;
	// }

	.hot {
		margin-top: 16px;
		align-self: center;
		margin-top: 19px;
		display: flex;
	}

	.md {
		justify-content: center;
		align-items: center;
		margin-left: 2.5px;
		margin-right: 2.5px;
		border-radius: 4px;
		background-color: rgba(50, 69, 95, 100);
		color: rgba(165, 169, 173, 100);
		font-size: 12px;
		text-align: center;
	}

	.search {
		border-radius: 16px;
		background-color: rgb(21, 21, 21);
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(243, 245, 251, 100);

		color: rgba(255, 255, 255, 100);
		font-size: 14px;
		text-align: left;
	}

	.input {
		margin-top: 10px;
		display: flex;
		border-radius: 16px;
		background-color: rgb(21, 21, 21);
		text-align: left;
		box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.4);
		// border: 1px solid rgba(243, 245, 251, 100);

		color: rgba(194, 199, 204, 100) !important;
		color: #fff !important;
		font-size: 14px;
		text-align: left;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		padding-right: 17px;
		background-color: rgb(21, 21, 21);
		min-height: 100vh;
		padding-bottom: 100px;
	}

	// /deep/ .uni-input-input {
	//   color: #fff;
	// }

	// /deep/ .uicon-search {
	//   color: #fff !important;
	// }

	.select {
		min-width: 30%;
		//   &:nth-child(3){
		// 	  min-width: 50px;
		//   }
	}

	// .buyLimit {
	// 	margin: 10px 0;
	// 	font-weight: bolder;
	// }

	// .buyLimitText {
	// 	background-color: rgb(255, 83, 161);
	// 	padding: 4px;
	// 	// border-radius: 4px 0 0 4px;
	// }

	// .buyLimitNum {
	// 	background-color: #fff;
	// 	color: rgb(255, 83, 161);
	// 	padding: 4px;
	// 	// border-radius: 0 4px 4px 0;
	// }

	// .buyPrice {
	// 	align-self: center;
	// 	font-size: 20px;
	// 	display: flex;
	// }
</style>
