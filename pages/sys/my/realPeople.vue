<template>
	<view class="content textfff">
		<!-- <view class="flex rel align-center">
			<footers></footers>
			<view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">
				实名认证
			</view>
		</view> -->
		<view class="mt20">
			<u--form labelPosition="top" :model="model" :rules="rules" ref="uForm" labelWidth="150"  :borderBottom="false" :labelStyle="labelStyle">
				<u-form-item label="姓名："  prop="idCardName" :borderBottom="false" ref="item1">
					<u--input :disabled="this.realPeopleStatus?true:false" v-model="model.idCardName" placeholder="请输入姓名" color="#fff" :customStyle="customStyle"></u--input>
				</u-form-item>
				<u-form-item label="手机号：" prop="bankMobile" :borderBottom="false" ref="item2">
					<u--input :disabled="this.realPeopleStatus?true:false" v-model="model.bankMobile" placeholder="请输入银行预留手机号" color="#fff"
						maxlength="11" :customStyle="customStyle"></u--input>
				</u-form-item>
				<u-form-item v-if="!this.realPeopleStatus" label="验证码：" prop="code" :borderBottom="false" ref="item3">
					<u-input v-model="model.code" placeholder="请输入验证码" color="#fff" :customStyle="customStyle">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒后重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="primary" size="mini" style="border-radius: 20px;background-color: rgb(19,200,255);color: #000;font-weight: 700;"></u-button>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="银行卡号：" prop="bankNo" :borderBottom="false" ref="item4">
					<u--input :disabled="this.realPeopleStatus?true:false" v-model="model.bankNo" placeholder="请输入银行卡号" color="#fff" :customStyle="customStyle"></u--input>
				</u-form-item>
				<u-form-item label="身份证号：" prop="idCardNo" :borderBottom="false" ref="item5">
					<u--input :disabled="this.realPeopleStatus?true:false" v-model="model.idCardNo" placeholder="请输入身份证号" color="#fff" :customStyle="customStyle"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view v-if="!this.realPeopleStatus" class="flex mt20">
			<u-button type="warning" class="mr15 my-btn" @click="cancle" style="height: 40px;font-weight:700;border-radius:30px;">取消</u-button>
			<u-button type="primary" @click="submit" class="my-btn" style="height: 40px;font-weight:700;border-radius:30px;">认证</u-button>
		</view>
	</view>
</template>

<script>
	import footers from "@/components/footers/footers.vue";
	import {
		getRealPhoneCode,
		toRealPeople,
    realPeopleInfo
	} from "@/api/user.js";
	export default {
		name: "realPeople",
		components: {
			footers,
		},
		data() {
			return {
        realPeopleStatus: true,
				model: {
					bankMobile: "", //银行预留手机号
					bankNo: "", //银行卡号
					code: "", //验证码
					idCardName: "", //姓名
					idCardNo: "", // 身份证号
				},
				rules: {

					'idCardName': {
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					},
					'bankMobile': [{
							required: !realPeopleInfo,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
					],
					'code': {
						required: !realPeopleInfo,
						message: '请输入验证码',
						trigger: ['change', 'blur']
					},
					'bankNo': {
						required: true,
						message: '请输入银行卡号',
						trigger: ['change', 'blur']
					},
					'idCardNo': {
						required: true,
						message: '请输入身份证号',
						trigger: ['change', 'blur']
					}
				},
				tips: "获取验证码",
				customStyle:{
					border: 'none',
					backgroundColor: 'rgb(33,33,33)',
					borderRadius: '20px'
				},
				labelStyle:{
					fontSize: '17px'
				}
			};
		},
    async onLoad() {
      realPeopleInfo().then( res => {
        this.model = res.data;
        this.realPeopleStatus = res.data.realPeopleStatus;
      });
    },
    methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.model.bankMobile.length === 0) {
					uni.$u.toast("请输入银行预留手机号");
					return false;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: "正在获取验证码",
					});
					getRealPhoneCode({
						phone: this.model.bankMobile,
					}).then((res) => {
						const {
							code,
							data,
							msg
						} = res;
						console.log(code, data, msg);
						uni.hideLoading();
						uni.$u.toast("验证码已发送");
						this.$refs.uCode.start();
					});
				} else {
					uni.$u.toast("倒计时结束后再发送");
				}
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					// console.log(this.model)
					this.realPeople()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			cancle() {
				uni.navigateBack()
			},
			async realPeople() {
				const {
					code,
					msg,
					data
				} = await toRealPeople(this.model)
				console.log(code, msg, data)
				if (code === 0) {
					uni.$u.toast('认证成功！即将返回！')
					setTimeout(() => {
            uni.navigateTo({
              url: `/pages/sys/my/index`,
            });
					}, 500);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content{
		background-color: #131313;
	}
	/deep/ .u-form-item__body__left__content__label {
		color: rgb(191,191,191);
	}
</style>
