<template>
	<view class="content">
		<!-- <view class="flex rel align-center">
			<footers></footers>
			<view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">钱包详情</view>
		</view> -->
		<view class="flex info">
			<view> 账户余额 </view>
			<view class="mt20 mb20"> ￥{{ balance }}</view>
			<view class="flex w100 btn-group mt20">
				<!-- :disabled="num==0" -->
				<u-button shape="circle" text="提现" @click="tixian"></u-button>
				<u-button shape="circle" text="账单" @click="bill"></u-button>
			</view>
		</view>
		<view class="abs" style="bottom: 40px; left: 50%; transform: translateX(-50%); color: gray">
			常见问题
		</view>
		<u-notify ref="uNotify"></u-notify>
		<u-modal :show="show" title="请填写信息" :showCancelButton="true" @confirm="confirm" @cancel="cancel" @close="cancel"
			:borderBottom="false">
			<view class="slot-content w100">
				<u--form labelPosition="top" :model="chargeInfo" :rules="rules" ref="uForm" labelWidth="170"
					:labelStyle="labelStyle">
					<u-form-item label="提现金额：" prop="amount" :borderBottom="false" ref="item1">
						<u--input v-model="chargeInfo.amount" disabled :customStyle="customStyle" color="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="手续费(0.2%)：" prop="charge" :borderBottom="false" ref="item3">
						<u--input v-model="chargeInfo.charge" disabled :customStyle="customStyle" color="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="姓名：" prop="idCardName" :borderBottom="false" ref="item2">
						<u--input v-model="chargeInfo.idCardName" disabled :customStyle="customStyle" color="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="联系电话：" prop="bankMobile" :borderBottom="false" ref="item2">
						<u--input v-model="chargeInfo.bankMobile" :customStyle="customStyle" color="#fff"></u--input>
					</u-form-item>
					<u-form-item label="卡号：" prop="idCardName" :borderBottom="false" ref="item2">
						<u--input v-model="chargeInfo.bankNo" :customStyle="customStyle" color="#fff"></u--input>
					</u-form-item>
					<u-form-item label="开户行：" prop="bankName" :borderBottom="false" ref="item2">
						<u--input v-model="chargeInfo.bankName" :customStyle="customStyle" color="#fff"></u--input>
					</u-form-item>
					<!--          <u-form-item label="收款方式：" prop="type" :borderBottom="false" ref="item4">-->
					<!--            &lt;!&ndash; <u&#45;&#45;input v-model="model.type"></u&#45;&#45;input> &ndash;&gt;-->
					<!--            <u-radio-group v-model="model.type" placement="row" @change="groupChange" class="flex">-->
					<!--              <u-radio :customStyle="{ margin: '8px' }" v-for="(item, index) in radiolist" :key="index"-->
					<!--                :label="item.name" :name="item.name" :disabled="item.disabled">-->
					<!--              </u-radio>-->
					<!--            </u-radio-group>-->
					<!--          </u-form-item>-->
				</u--form>
			</view>
		</u-modal>
		<u-modal :show="show2" title="确认信息" content='确认提现信息无误？错误信息将导致提现失败:' confirmText="确认提现" :showCancelButton="true"
			cancelText="返回修改" @confirm="toCashOut" @cancel="show = true; show2 = false;">
		</u-modal>
	</view>
</template>

<script>
	import footers from "@/components/footers/footers.vue";
	import {
		getBillBalance,
		getBillCharge,
		cashOut
	} from "@/api/user.js";
	export default {
		name: "walleDetails",
		components: {
			footers,
		},
		data() {
			return {
				balance: 0,
				show: false,
				show2: false,
				model: {
				  // account: '', // 账号
				  // mobile: "", // 手机号码
				  // person: '', // 联系人
				  // type: '支付宝' //  收款方式
				},
				// 提现信息
				chargeInfo: {
					amount: 0,
					charge: '',
					realAmount: '',
					bankNo: '',
					bankName: '',
					bankMobile: '',
					idCardName: ''
				},
				// radiolist: [
				//   {
				//     name: '微信',
				//     label: 'weChat',
				//     disabled: true
				//   },
				//   {
				//     name: '支付宝',
				//     label: 'Alipay',
				//     disabled: false
				//   }
				// ],
				rules: {
					'bankNo': {
						type: 'string',
						required: true,
						message: '请填写卡号',
						trigger: ['blur', 'change']
					},
					'bankMobile': {
						type: 'string',
						required: true,
						message: '请填写联系电话',
						trigger: ['blur', 'change']
					},
					'bankName': {
						type: 'string',
						required: true,
						message: '请填写开户行',
						trigger: ['blur', 'change']
					},
					// 'mobile': [
					//   {
					//     required: true,
					//     message: '请输入手机号',
					//     trigger: ['change', 'blur'],
					//   },
					//   {
					//     // 自定义验证函数，见上说明
					//     validator: (rule, value, callback) => {
					//       // 上面有说，返回true表示校验通过，返回false表示不通过
					//       // uni.$u.test.mobile()就是返回true或者false的
					//       return uni.$u.test.mobile(value);
					//     },
					//     message: '手机号码不正确',
					//     // 触发器可以同时用blur和change
					//     trigger: ['change', 'blur'],
					//   }
					// ]
				},
				customStyle: {
					border: 'none',
					backgroundColor: 'rgb(33,33,33)',
					borderRadius: '20px'
				},
				labelStyle: {
					fontSize: '17px',
					color: 'rgb(191,191,191)'
				}
			};
		},
		async onLoad() {
			getBillBalance().then(res => {
				this.balance = res.data.balance;
			})

		},
		methods: {
			async toCashOut() {
				const {
					code,
					success,
					data
				} = await cashOut(this.chargeInfo)
				console.log(code, success, data)
				if (code === 0) {
					this.$refs.uNotify.show({
						top: 40,
						type: "success",
						color: "#fff",
						message: "恭喜！已提现成功！",
						duration: 1000 * 1.5,
						fontSize: 20,
						safeAreaInsetTop: true,
					});
					this.show2 = false;

				}
			},
			bill() {
				uni.navigateTo({
					url: `/pages/sys/my/bill`,
				});
			},
			groupChange(e) {
				console.log(e)
			},
			confirm() {
				this.$refs.uForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					// console.log(this.model)
					this.show2 = true;
					this.show = false
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})

			},
			cancel() {
				this.show = false;
				this.$refs.uForm.resetFields();
				for (let key in this.model) {
					this.model[key] = ''
				}
			},
			tixian() {
				if (this.balance > 0) {
					this.show = true
					getBillCharge().then(res => {
						this.chargeInfo = res.data;
					});
				} else {
					this.$refs.uNotify.show({
						top: 40,
						type: "error",
						color: "#fff",
						message: "金额为0，无法为您提现！",
						duration: 1000 * 1.5,
						fontSize: 20,
						safeAreaInsetTop: true,
					});
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		color: #fff;
	}

	.info {
		flex-direction: column;
		align-items: center;
		background: rgb(21, 21, 21);
		border-radius: 20px;
		padding: 20px;
		margin-top: 30px;

		.btn-group {
			.u-button {
				width: 30%;
			}
		}
	}

	/deep/.u-popup__content {
		background: #303133;
		border-radius: 20px !important;
		padding-bottom: 10px;

		.u-modal {

			.u-modal__title {
				color: #fff;
			}

			.u-line {
				border: none !important;
			}

			.u-modal__button-group__wrapper--cancel,.u-modal__button-group__wrapper--confirm {
				background-image: url('@/static/btn.svg');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				border: none;
				outline-style: none;
				background-color: transparent;
				margin: 0 15px;

				span {
					color: #000
				}
			}
		}
	}
</style>
