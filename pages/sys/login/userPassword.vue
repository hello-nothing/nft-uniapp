<template>
  <view>
    <view class="list">
      <!-- <view class="list-call">
				<input class="u-input" type="text" v-model="userInfo.username" maxlength="11" placeholder="请输入手机号" />
			</view> -->
      <u--input
        placeholder="请输入手机号"
        border="bottom"
        class="mt20"
        v-model="userInfo.username"
        type="number"
        maxlength="11"
        color="#fff"
      >
      </u--input>
      <u-input
        placeholder="请输入验证码"
        border="bottom"
        class="mt20"
        maxlength="8"
        v-model="userInfo.password"
        color="#fff"
      >
        <template slot="suffix">
          <u-code
            ref="uCode"
            @change="codeChange"
            seconds="60"
            changeText="X秒后重新获取"
          ></u-code>
          <u-button
            @tap="getCode"
            :text="tips"
            type="primary"
            size="mini"
          ></u-button>
        </template>
      </u-input>
      <!-- <u-button text="注册邀请码"></u-button> -->
      <u-collapse @close="close" :border="false" class="mt20">
        <u-collapse-item
          title="邀请码"
          name="Docs guide"
          :border="false"
          style="padding: 0"
        >
          <u--input
            placeholder="请输入邀请码（选填）"
            border="bottom"
            class="mt20"
            v-model="userInfo.inviteCode"
            maxlength="11"
            color="#fff"
          >
          </u--input>
        </u-collapse-item>
      </u-collapse>
    </view>
    <!-- <view class="button" hover-class="button-hover" @click="login">
       <text>{{ $t("login.loginButton") }}</text>
      <text>登录</text>
    </view> -->
    <view class="agreement">
      <checkbox-group @change="checkboxChange" class="u-checkbox">
        <checkbox value="true" >
          <span>阅读并同意</span>
          <a href="#/pages/sys/my/clause?Type=Privacy">《隐私协议》</a>
          <span>/</span>
          <a href="#/pages/sys/my/clause" >《使用协议》</a>
        </checkbox>
      </checkbox-group>
    </view>
    <u-button class="my-btn mt20" @click="login">登录</u-button>
  </view>
</template>

<script>
// import { encryption } from "@/utils";
import { getSmsCode, smsLogin } from "@/api/auth.js";
import { getUserInfo } from "@/api/user.js";
export default {
  name: "userPassword",
  props: {
    inviteCode: String || Number,
    default: "",
  },
  data() {
    return {
      agreement: false,
      userInfo: {
        username: "",
        password: "",
        inviteCode: this.inviteCode,
      },
      showPassword: false,
      remember: true,
      baseUrl: "",
      tips: "获取验证码",
    };
  },
  onLoad(option){
    if(option && option.inviteCode){
      this.inviteCode = option.inviteCode
      uni.setStorageSync('invite', option.inviteCode)
    } else {
      let invite = uni.getStorageSync('invite')
      if (invite && invite !== '') {
        this.inviteCode = invite
      }
    }
  },
  methods: {
    checkboxChange(e) {
      if(e.detail && e.detail.value && e.detail.value[0] === 'true') {
        this.agreement = true;
      }else {
        this.agreement = false;
      }
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.userInfo.username.length === 0) {
        uni.$u.toast("请输入手机号");
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        getSmsCode({
          mobile: this.userInfo.username,
          scene: 1,
        }).then((res) => {
          const { code, data, msg } = res;
          console.log(code, data, msg);
          uni.hideLoading();
          uni.$u.toast("验证码已发送");
          this.$refs.uCode.start();
        });
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
    change(e) {
      console.log("change", e);
    },
    showPass() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      // 使用协议
      if(!this.agreement){
        uni.$u.toast("请先阅读并同意《隐私协议》/《用户协议》");
        return;
      }
      //表单校验
      if (this.userInfo.username.length === 0) {
        uni.$u.toast("请输入手机号");
        return;
      }
      if (this.userInfo.password.length === 0) {
        uni.$u.toast("请输入验证码");
        return;
      }

      this.$store
        .dispatch("Login", {
          type: 1,
          data: {
            code: this.userInfo.password,
            inviteCode: this.userInfo.inviteCode,
            mobile: this.userInfo.username,
          },
        })
        .then(() => {
          getUserInfo().then(res => {

            // uni.clearStorageSync('invite')
            // 首次登录跳转修改个人资料页
            if (res.data.background && res.data.background !== '') {
              uni.navigateTo({
                url: "/pages/sys/my/index",
              });
            } else {
              uni.navigateTo({
                url: '/pages/sys/my/editinfo',
              });
            }
          });
        });
    },
    //登录
    submit() {
      //表单校验
      if (this.userInfo.username.length === 0) {
        uni.$u.toast("请输入手机号");
        return;
      }
      if (this.userInfo.password.length === 0) {
        uni.$u.toast("请输入验证码");
        return;
      }

      //构造登录参数
      // const user = encryption({
      //   data: this.userInfo,
      //   key: "pigxpigxpigxpigx",
      //   param: ["password"],
      // });

      let grant_type = "password";

      //登录接口
      this.$u.api
        .login(
          {
            username: userInfo.username,
            password: userInfo.password,
            grant_type,
          },
          {
            Authorization: "Basic c29jaWFsOnNvY2lhbA==",
            "content-type": "application/x-www-form-urlencoded",
            isToken: false,
            "TENANT-ID": "1",
          }
        )
        .then((res) => {
          //提示
          this.$u.toast("恭喜您，登录成功！");

          // 登陆成功，存储相关信息
          this.$u.vuex("vuex_token", res.access_token);
          this.$u.vuex("vuex_refresh_token", res.refresh_token);
          this.$u.vuex("vuex_username", res.username);
          this.$u.vuex("vuex_userId", res.user_id);
          this.$u.vuex("vuex_client_id", res.client_id);

          //查询用户详细信息并储存
          this.$u.api.user.getUserInfo().then((res) => {
            console.log("获取用户信息:", res);
            this.$u.vuex("vuex_user", res.data.sysUser);
          });

          //跳转页面
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/sys/home/index",
            });
          }, 500);
        })
        .catch((e) => {
          this.$u.toast(e);
        });
    },
    close() {
      // this.userInfo.inviteCode = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
/deep/ .u-cell__body {
  padding: 6px 9px;
  .u-cell__title-text {
    color: #fff;
  }
}
/deep/ .u-cell--clickable {
  background-color: transparent;
}

.agreement {
  text-align: center;
  margin:30px 0 15px;
  span{
    display: inline-block;
    line-height: .53333rem;
    color: #999;
    font-size: 12px;
  }
  /deep/ .van-checkbox__icon--checked .van-icon{
    border-color: #fdb428;
    background-color: #fdb428;
  }
  a{
    display: inline-block;
    line-height: 12px;
    color: #fdb428;
    font-size: 12px;
  }

}
</style>
