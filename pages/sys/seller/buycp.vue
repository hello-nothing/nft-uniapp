<!-- 确认支付 -->
<template>
	<view class="content">

		<!--    跳转默认浏览器遮罩层-->
		<view v-show="showTip" id="weixinTip" ref="weixin" class="wxtip">
      <u-image src="@/static/payTips.png"/>
			<p class="wxtip-txt">
				在微信中无法使用支付宝支付，请使用默认浏览器打开
			</p>
		</view>

		<!-- <view class="flex rel align-center">
      <footers></footers>
      <view class="mt20">订单确认</view>
    </view> -->
		<view class="rel">
			<u--image :fade="false" height="278px" width="100%" radius="16px" :src="detailimg"></u--image>
			<view class="info">
				<view style="width: 45%">
					<view>名称：</view>
					<view class="mt15 sl" style="max-width: 90%">{{ name }}</view>
				</view>
				<view style="width: 50%">
					<view>序列号：</view>
					<view class="mt15 sl" style="max-width: 90%">{{ shortNumber }}</view>
				</view>
			</view>
		</view>
		<!-- <view class="detail">藏品价格：{{price}} 元<br />商品名称：{{name}} <br /> 订单编号：{{orderid}} </view>
		<view class="detail">支付宝<br />微信</view> -->
		<view style="
        margin-top: 60px;
        padding: 30px;
        background-color: rgb(21,21,21);
        border-radius: 16px;
      ">
			<view> 支付方式： </view>
			<view class="mb30 mt30">
				<u-radio-group v-model="payment" placement="row">
					<u-radio v-for="(item, index) in paymentlist" :key="index" :label="item.name" :name="item.label"
						:disabled="item.disabled" @change="radioPayment" class="mr20" labelColor="#fff"></u-radio>
				</u-radio-group>
			</view>
			<view class="mb30">
				<u-divider lineColor="#D8D8D8"></u-divider>
			</view>
			<view class="flex">
				<u-switch v-model="agree" style="border: 3px solid rgb(78, 78, 78); box-sizing: content-box"
					@change="change"></u-switch>
				<view class="ml15">
          <view class="flex align-center font18">我已同意<a href="#/pages/sys/my/clause" >互联宇宙使用条款</a>
					</view>
					<!-- <u-popup :show="show" @close="close" @open="open" mode="bottom">
            <view>
                <text>出淤泥而不染，濯清涟而不妖</text>
            </view>
			</u-popup>
			<u-button @click="show = true">打开</u-button> -->
					<view>
						By connecting your wallet, you agree to our terms of Service and our
						Privacy Policy.
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="my-btn" @tap="toPays">立即支付</view> -->
		<view class="btn-content">
			<view class="my-btn flex " @tap="toPays">
				<view class="price ">
					<span>￥</span> {{ price }}
				</view>
				<view class="">
          <view v-if="off && off !== 0" style="font-size: 10px">
            随机立减：￥{{off}}
          </view>
          <view>
            立即支付
          </view>
        </view>
			</view>
		</view>
		<view v-html="resHtml"></view>
		<u-toast ref="uToast"></u-toast>
		<u-loading-page :loading="loading" loadingText="请稍等..." bgColor="rgb(205,205,205)" color="#000">
		</u-loading-page>
		<!-- <buttom></buttom> -->
	</view>
</template>

<script>
	import buttom from "@/components/buttom/buttom.vue";
	import footers from "@/components/footers/footers.vue";
	import {
		getOrderDetails,
		getOpenId
	} from "@/api/index.js";
	import {
		toPay
	} from "@/api/good.js";
  import UImage from "../../../uni_modules/uview-ui/components/u--image/u--image";
  export default {
		data() {
			return {
        // 当前客户端类型
        platform: 'h5',
				// 微信openid-微信支付使用
				wx_openId: '',
				// 浏览器跳转遮罩层
				showTip: false,
				navtitle: ["产品分类", "价格"],
				detailimg: require("@/static/goodimg.png"),
				price: 20,
				off: 0,
				name: "藏品1",
				nameid: "10/1000",
				orderId: '',
				buyaddress: "收货地址",
				buywhat: "购买需要注意！",
				shortNumber: "",
				imgarr: [{
						img: require("@/static/goodimg.png"),
						name: "实物名称",
						price: "价格",
					},
					{
						img: require("@/static/goodimg.png"),
						name: "实物名称",
						price: "价格",
					},
				],
				payOrderId: "",
				goodId: "",
				resHtml: "",
				loading: false,
				payment: "alipay",
				paymentlist: [{
						label: "alipay",
						name: "支付宝",
					},
					// {
					// 	label: "wx",
					// 	name: "微信支付",
					// },
				],
				agree: false,
				show: false,
        payPlatform: {
          // WX_PUB:
          // WX_LITE:
          // WX_APP:
          // WX_NATIVE:
          // ALIPAY_WAP
          // ALIPAY_QR:
          // ALIPAY_APP
          // ALIPAY_PC:
          // wx_pub,
          // wx_app,
          // alipay_wap,
          // alipay_pub
        }
			};
		},
		onShow() {
			if (this.orderId !== '') {
				this.getOrderInfo(this.orderId)
			}
		},
		onLoad(option) {
			console.log(option);
      // 当前运行环境
      this.getPlatform().then(() => this.getWxOpenId(option) );
			this.orderId = option.orderId;
			this.goodId = option.goodId;
			this.getOrderInfo(option.orderId);
			// this.toPays()
		},
		// 先跳转获取微信环境openid
		methods: {
			getWxOpenId(option) {
				if (!this.isWeiXin()) {
					return;
				}
        let openid = uni.getStorageSync('wx_openid')
        if(openid && openid !== ''){
          this.wx_openId = openid
          // 增加微信支付
          this.paymentlist.push({
            label: "wx",
            name: "微信支付",
          });
          return;
        }
				// 先判断是否有state和code
				// http://localhost:8081/?code=041Pkt0w31jYYY2tae1w3uYPFC0Pkt0m&state=#/pages/sys/seller/buycp?orderId=20220269&goodId=15561

				// 路径中是否包含code
				const url = window.location.href;
				if (!url.includes("code=")) {
					// 跳转微信snsapi_base授权页
					const host = encodeURIComponent(url)
					const toUrl =
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2662f7e71e37edf8&redirect_uri=' +
						host + '&response_type=code&scope=snsapi_base#wechat_redirect';
					window.location.href = toUrl
					return;
				}

				const codeUrl = url.split("?code=")[1];
				const code = codeUrl.split("&state=")[0];
				// 从后端获取openid
				getOpenId({
					"code": code,
					"state": code[1],
					'type': 31
				}).then(res => {
					this.wx_openId = res.data.openId
					console.log("从微信获取openid", res.data)
          if(res.data.openId) {
            // 增加微信支付
            this.paymentlist.push({
              label: "wx",
              name: "微信支付",
            });
          }
          uni.setStorageSync('wx_openid', res.data.openId)
				}).catch(res => {
					console.log("从后端获取openid失败", res.data)
        }).then( () =>{
					// 删调code
        // debugger
				// 	// window.location.href = url.split("?code=")[0] + url.split("&state=")[1]
				// 	if(!this.wx_openId || this.wx_openId === ''){
  			// 		window.location.href = url.split("?code=")[0] + url.split("&state=")[1]
        // }
				})

			},
			// 获取订单详情
			async getOrderInfo(orderId) {
				const {
					data: {
						goodsImg,
						payOrderId,
						goodsId,
						transHash,
						goodsName,
						buyLimit,
						price,
            off,
						detail,
						pid,
						shortNumber,
						orderStatus,
						id,
					},
				} = await getOrderDetails(orderId);
				// 判断是否已经支付
				if (orderStatus !== "1") {
          if (orderStatus === "3") {
            uni.$u.toast("订单已支付", 1000);
          }
          if (orderStatus === "0") {
            uni.$u.toast("订单已关闭!", 1000);
          }
					// 跳转到订单列表
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/sys/my/index'
						});
					}, 1000);
				}

				// 数据填充
				// this.hax = transHash;
				this.name = goodsName;
				this.detailimg = goodsImg;
				this.shortNumber = shortNumber;
				this.payOrderId = payOrderId
				this.goodId = goodsId;
				this.orderId = id;
				this.price = price;
				this.off = off;
				// this.detail = detail;
				// this.pid = pid;
			},
      createPayParam(){

        const payParam = {
          channelCode: this.payment,
          channelExtras: {
            "openid": this.wx_openId
          },
          id: this.payOrderId,
        }

        // WX_PUB:
        // WX_LITE:
        // WX_APP:
        // WX_NATIVE:
        // ALIPAY_WAP
        // ALIPAY_QR:
        // ALIPAY_APP
        // ALIPAY_PC:

        // h5
        if(this.platform === 'h5') {
          payParam.channelCode = 'alipay_wap'

          if (this.payment === "alipay") {
            if (this.isWeiXin()) {
              //如果是微信环境，就弹出遮罩层
              this.showTip = true
              return null;
            }
          }
          if (this.payment === 'wx') {
            payParam.channelCode = 'wx_pub'
            if (!this.wx_openId || this.wx_openId === '') {
              if (!this.isWeiXin()) {
                console.log("没有openid，无法微信支付")
                this.$refs.uToast.show({
                  type: "warning",
                  message: "请在微信中使用！！",
                })
                // setTimeout(() => {
                //   window.location.reload()
                // }, 2000);
                return null;
              }
            }
            payParam.channelExtras.openid = this.wx_openId
          }
          return payParam;
        }

        // 安卓app支付请求构建
        if(this.platform === 'android'){
          if(this.payment === 'alipay'){
            payParam.channelCode = 'alipay_app'
          }
          if(this.payment === 'wx'){
            payParam.channelCode = 'wx_app'
          }
          return payParam
        }

        // ios支付请求构建
        if(this.platform === 'ios'){
          if(this.payment === 'alipay'){
            payParam.channelCode = 'alipay_app'
          }
          if(this.payment === 'wx'){
            payParam.channelCode = 'wx_app'
          }
          return payParam;
        }
      },
			toPays() {
				if (!this.agree) {
					this.$refs.uToast.show({
						type: "warning",
						message: "请先同意使用条款！",
					});
					return;
				}
        // 构建支付参数
        const payParam = this.createPayParam();
        if(!payParam){
          // uni.$u.toast("请选择别的支付方式！")
          return;
        }
				this.loading = true;
				toPay(payParam).then((res) => {
          console.log(res);
          if (this.platform === 'h5'){
            if (this.payment.includes("alipay")) {
              this.toAlipayH5(res)
            }

            if (this.payment.includes("wx")) {
              this.toWxJsPayH5(res)
            }
            return;
          }

          // 安卓支付
          if (this.payment === "alipay") {
            this.toAppPay(res, 'alipay')
          }

          if (this.payment === "wx") {
            this.toAppPay(res, 'wxpay')
          }
				}).catch( res => {
          uni.$u.toast("支付请求失败！请刷新页面选择别的支付方式！", 1000)
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
			},

      // app支付
      toAppPay(res, type) {
        const data = res.data.invokeResponse.body;
        console.log('开始app支付, 支付方式：'+ type, data)
        uni.requestPayment({
          provider: type,
          orderInfo: data,
          success: (res) => {
            uni.$u.toast("支付成功！", 1000);
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/sys/my/index'
              });
            }, 1000);
          },
          fail: (res) => {
            uni.showModal({
              content: "支付失败,原因为: " + res
                  .errMsg,
              showCancel: false
            })
          },
          complete: () => {
            this.loading = false;
          }
        })
			},
      // h5微信js支付
      toWxJsPayH5(res) {
        console.log("开始微信jsapi支付", res)
        let data = res.data.invokeResponse;
        let wx = require('jweixin-module')
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timeStamp,
          nonceStr: data.nonceStr,
          signature: data.paySign,
          jsApiList: ['chooseWXPay']
        })

        wx.ready(function() {
          wx.chooseWXPay({
            appId: data.appId,
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageValue,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
              console.log("微信支付成功")
              uni.$u.toast("支付成功！", 1000);
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages/sys/my/index'
                });
              }, 1000);
            },
            cancel: function (res) {
              uni.$u.toast('用户取消支付~')
            },
            // 支付失败回调函数
            fail: function (res) {
              uni.$u.toast('支付失败~')
            }
          });
        })

      },
      // 支付宝h5支付
			toAlipayH5(res) {
        console.log('开始支付宝h5支付', res)
				const {
					code,
					data: {
						invokeResponse
					},
				} = res;
				if (code === 0) {
					if (invokeResponse.success) {
						this.resHtml = invokeResponse.body;
					} else {
						this.resHtml = JSON.parse(invokeResponse).body;
					}
					// console.log(this.resHtml)
					setTimeout(() => {
						this.loading = false;
						document.forms[0].submit();
					}, 1000);
				} else {
					this.loading = false;
				}
			},
			radioPayment(n) {
				this.payment = n;
			},
			change(e) {
				this.agree = e;
			},
      async getPlatform(){
        const systemInfo = await uni.getSystemInfoSync();

        if(systemInfo.uniPlatform === 'web'){
          console.log('当前运行h5web环境')
          this.platform = 'h5'
          return ;
        }

        // 增加微信支付
        this.paymentlist.push({
          label: "wx",
          name: "微信支付",
        });

        if(systemInfo.osName === 'android') {
          console.log('运行在android上')
          this.platform = 'android'
          return
        }

        if(systemInfo.osName === 'ios'){
            console.log('运行在IOS上')
            this.platform = 'ios'
        }
      },
			isWeiXin() {
        if(this.platform !== 'h5'){
          return false
        }
        console.log("判断微信运行环境",this.platform)
				// 判断微信浏览器环境
				const {
					userAgent
				} = window.navigator
				return !!/MicroMessenger/i.test(userAgent)
			}
		},
		components: {
      UImage,
			buttom,
			footers,
		},
	};
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
		color: #fff;
		position: relative;
	}

	.detail {
		margin-top: 20px;
		justify-content: space-around;
		padding: 10px;
		display: flex;
		align-items: center;
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

	.info {
		position: absolute;
		bottom: -40px;
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

	.sl {
		font-size: 20px;
		font-weight: 700;
	}


	.wxtip {
		background: rgba(0, 0, 0, 0.8);
		text-align: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999999;

		img {
			width: 100%;
		}

		wxtip-txt {
			margin-top: 107px;
			color: #fff;
			font-size: 20px;
			line-height: 1.8;
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
</style>
