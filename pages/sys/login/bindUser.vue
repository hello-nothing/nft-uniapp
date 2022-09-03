<template>
  <view class="wrap">

    <!--logo-->
    <view class="logo">
      <image src="/static/custom/logoPig.png"></image>
    </view>

    <!--发送短信验证码-->
     <sms-code/>

  </view>
</template>
<script>
import smsCode from "./smsCode";

export default {
  components: {smsCode},
  data() {
    return {
    };
  },
  onLoad() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import 'index.scss';

.logo {
  width: 260rpx;
  height: 260rpx;
  //background: rgba(59, 121, 235, 1);
  //box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(45, 127, 235, 0.5);
  border-radius: 50%;
  margin: 70rpx auto 10rpx auto;
}

.logo image {
  width: 260rpx;
  height: 260rpx;
  border-radius: 50%;
}

.base-url js-select {
  width: 100%;
}

.button {
  margin: 30rpx auto 0;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #46afff;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 35rpx;
  margin-top: 60rpx;
}

.footer text {
  font-size: 30rpx;
  margin-left: 25rpx;
  margin-right: 25rpx;
}

.oauth2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 55rpx 100rpx;

  image {
    height: 100rpx;
    width: 100rpx;
  }
}
</style>
