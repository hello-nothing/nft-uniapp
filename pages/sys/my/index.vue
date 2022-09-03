<template>
  <view class="content">
    <view style="display: flex; flex-direction: column; flex: 1">
      <view v-if="!islogin" class="h100">
        <logo
          style="
            justify-content: center;
            position: fixed;
            top: 150px;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
          "
        />
        <view class="txtc w100 join">
          <view class="mt15">欢迎来到互联宇宙</view>
          <view style="margin: 20px 0 40px"
            >By connecting your wallet, you agree to our terms of Service and
            our Privacy Policy.</view
          >
          <u-button class="my-btn" @click="toLogin">进入世界</u-button>
        </view>
      </view>

      <view v-if="islogin" class="w100 h100">
        <view class="flex align-center">
          <view class="flex align-center w100" @tap="showPopup = true">
            <u-icon
                name="list"
                color="#fff"
                size="28px"
                :bold="true"

                v-if="islogin"
            ></u-icon>
<!--            <img src="../../../static/person.svg" alt="" srcset="" />-->
            <view>个人信息</view>
          </view>
          <view
            class="flex align-center w100"
            style="justify-content: flex-end"
          >
            <image
              src="@/static/edit.svg"
              alt=""
              style="width: 24px; height: 24px"
              @click="editInfo"
            />
            <image
              src="@/static/share.svg"
              alt=""
              class="ml20"
              @click="modalShow = true"
              style="width: 24px; height: 24px"
            />
          </view>
        </view>
        <view class="ytx w100 h100 rel" style="display: block">
          <u--image
            :src="background"
            height="140px"
            width="100%"
            :fade="false"
            radius="20px"
          ></u--image>
          <view class="abs avatar">
            <u-avatar :src="avatar" size="100"></u-avatar>
          </view>
        </view>
      </view>
      <view class="ytx2" v-if="islogin">
        <view class="name flex align-center">
          {{ name }}
          <view
            style="
              border-radius: 10px;
              padding: 3px 5px;
              box-sizing: border-box;
              font-size: 12px;
            "
            :class="[realPeopleStatus ? 'yes' : 'no', 'ml15']"
            @click="toRealPeople"
          >
            {{ realPeopleStatus ? "已实名" : "去实名" }}
          </view>
        </view>
        <!-- <view class="name mt15 flex align-center">
          邀请码：<u-parse :content="inviteCode" :selectable="true"></u-parse>
        </view> -->
        <view class="num flex align-center mt15 mb15">
          <view style="max-width: 75%" class="sl">
            <div ref="copyObj" class="sl">{{ nftaddress }}</div>
            <!-- <u-parse :content="nftaddress" :selectable="true"></u-parse> -->
          </view>
          <!-- <textarea id="input" class="absolute top-0 left-0 opacity-0 -z-1">
					                这是幕后黑手
					              </textarea> -->
          <image
            src="@/static/copy.svg"
            mode=""
            style="color: #fff; height: 20px; width: 20px; margin-left: 15px"
            @tap="copy"
          ></image>
        </view>
      </view>
      <view class="wrap" v-if="islogin">
        <view class="item-wrap">
          <view class="item" @tap="cashOut">
            <view>余额提现</view>
            <view class="mt10">{{ summary.amount }}</view>
          </view>
          <view class="item" @tap="compose">
            <u-notify ref="uNotify"></u-notify>
            <view>藏品合成</view>
            <!-- <view>藏品合成</view> -->
          </view>
        </view>
        <view class="item-wrap">
          <view class="item rel" @click="modalShow = true">
            <view>邀请</view>
            <view class="mt10">{{ summary.invite }}</view>
          </view>
          <view class="item" @tap="order">
            <view>交易订单</view>
            <view class="mt10">{{ summary.order }}</view>
          </view>
        </view>
      </view>

      <view v-if="islogin">
        <view
          style="
            display: flex;
            margin-bottom: 19px;
            justify-content: space-around;
          "
        >
          <view class="select">
            <u-picker
              :show="show"
              :columns="columns"
              :closeOnClickOverlay="true"
              @cancel="pickerCancel"
              @close="pickerCancel"
              @confirm="pickerConfirm"
              keyName="name"
              :defaultIndex="defaultIndex"
            >
            </u-picker>
            <!-- <u-button icon="arrow-down" @click="show = true">{{
              pickerText
            }}</u-button> -->
            <view
              class="textfff flex align-center"
              style="
                background-color: rgb(33, 33, 33);
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                box-sizing: border-box;
                justify-content: space-around;
              "
              icon="arrow-down"
              @click="show = true"
            >
              {{ pickerText }}
              <image
                src="@/static/zhankai.svg"
                style="width: 15px; height: 15px"
              ></image>
            </view>
          </view>
          <view class="select">
            <u-picker
              :show="show2"
              :columns="columns2"
              :closeOnClickOverlay="true"
              @cancel="pickerCancel2"
              @close="pickerCancel2"
              @confirm="pickerConfirm2"
              keyName="label"
              :defaultIndex="defaultIndex2"
            ></u-picker>
            <view
              class="textfff flex align-center"
              style="
                background-color: rgb(33, 33, 33);
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                box-sizing: border-box;
                justify-content: space-around;
              "
              icon="arrow-down"
              @click="show2 = true"
            >
              {{ pickerText2 }}
              <image
                src="@/static/zhankai.svg"
                style="width: 15px; height: 15px"
              ></image>
            </view>
          </view>
          <!-- <view class="select">
            <u-button text="积分商城"></u-button>
          </view> -->
          <view style="width: 20%">
            <!-- <u-button @click="reset">重置</u-button> -->
            <view
              class="textfff flex align-center"
              style="
                background-color: rgb(33, 33, 33);
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                box-sizing: border-box;
                justify-content: space-around;
              "
              icon="arrow-down"
              @click="reset"
            >
              重置
            </view>
          </view>
        </view>
        <view style="margin-bottom: 19px; width: 100%">
          <!-- @handle="handle(item)" -->
          <good-item
            v-for="(item, index) in shop"
            :item="item"
            :key="index"
            @handle="handle(item)"
          />
        </view>
      </view>
      <view>
        <u-loadmore
          color="rgb(200,200,200)"
          :status="status"
          :loading-text="loadingText"
          :loadmore-text="loadmoreText"
          :nomore-text="nomoreText"
          @loadmore="loadmore"
        />
      </view>
    </view>
    <buttom></buttom>
    <u-popup
      @touchmove.stop=""
      style="color: #000; width: 80%"
      :show="showPopup"
      @close="showPopup = false"
      @open="showPopup = true"
      mode="left"
      :safeAreaInsetTop="true"
      bgColor="rgb(239,239,239)"
    >
      <view style="padding: 50px 30px 0; min-width: 200px; font-weight: 700">
        <view class="flex" style="justify-content: space-between">
          <view>
            <image
              src="@/static/person.svg"
              mode="scaleToFill"
              style="width: 40px; height: 40px; position: relative; top: -4px"
            ></image>
          </view>
          <view>
            <view>实名认证</view>
            <view class="mt20">个人资料</view>
          </view>
          <view
            style="
              border-radius: 10px;
              padding: 3px 7px;
              box-sizing: border-box;
              height: 20px;
              font-size: 14px;
            "
            :class="[realPeopleStatus ? 'yes' : 'no', 'flex']"
            @click="toRealPeople"
          >
            {{ realPeopleStatus ? "已实名" : "未实名" }}
          </view>
        </view>
        <view class="mt30 mb30">
          <image
            src="@/static/zz.svg"
            mode=""
            style="width: 100%; height: 50px"
            @click="toGift"
          ></image>
        </view>
        <u-cell-group :border="false">
          <!-- <u-cell title="实名认证" @click="toRealPeople" class="mt5 mb5">
            <u-icon slot="icon" size="22" name="minus-people-fill"></u-icon>
            <view
              slot="right-icon"
              style="
                border-radius: 10px;
                padding: 3px 7px;
                box-sizing: border-box;
              "
              :class="realPeopleStatus ? 'yes' : 'no'"
            >
              {{ realPeopleStatus ? "已实名" : "未实名" }}
            </view>
          </u-cell> -->
          <u-cell
            title="隐私协议"
            class="mt5 mb5"
            size="large"
            @click="toClause('Privacy')"
          >
            <u-icon slot="icon" size="30" name="eye-off" class="mr15"></u-icon>
          </u-cell>
          <u-cell
            title="用户协议"
            class="mt5 mb5"
            size="large"
            @click="toClause('User')"
          >
            <u-icon
              slot="icon"
              size="30"
              name="account-fill"
              class="mr15"
            ></u-icon>
          </u-cell>
          <u-cell
            title="联系客服"
            @click="contact"
            class="mt5 mb5"
            size="large"
          >
            <u-icon
              slot="icon"
              size="30"
              name="server-fill"
              class="mr15"
            ></u-icon>
          </u-cell>
          <u-cell
            title="分享好友"
            class="mt5 mb5"
            size="large"
            @click="modalShow = true"
          >
            <u-icon
              slot="icon"
              size="30"
              name="share-square"
              class="mr15"
            ></u-icon>
          </u-cell>
        </u-cell-group>
        <view
          type="warning"
          text="退出登录"
          @click="loginOut"
          class="mt20"
          style="margin-left: 35px; line-height: 30px"
        >
          退出登录
        </view>
      </view>
    </u-popup>
    <view
      class="contact-wrap w100 h100"
      style="position: fixed; left: 0; top: 0; z-index: 999999; background: rgba(0, 0, 0, 0.5)"
      v-show="contactShow"
      @click="contactShow = false"
    >
      <view class="contact-content txtc rel textfff" style="top: 10%">
        <img src="@/static/contact.png" mode="aspectFit" style="width: 80%" />
        <view class="font18">任意点击关闭</view>
      </view>
    </view>
    <u-modal
        :show="modalShow"
        confirmText="关闭"
        :closeOnClickOverlay="true"
        @close="modalShow = false"
        @confirm="modalShow = false"
        class="invite"
      >
        <view class="slot-content">
          <!-- <img :src="imgurl" alt="" /> -->
          <img src="@/static/ddd.svg" alt="" />
          <view class="txtc mb20 mt20" style="font-size: 30px; color: #000">{{summary.invite}}</view>
          <view class="txtc mb20 mt20" style="font-size: 20px; color: #000">已实名：
            <span style="font-size: 30px;">{{summary.inviteReal}}</span></view>
          <view class="txtc mb20 mt20" style="font-size: 30px; color: #000">邀请码：{{inviteCode}}</view>
          <view class="incontent rel">
            <img
              src="@/static/eee.svg"
              alt=""
              class="abs"
              style="left: 0; top: 0"
            />
            <!-- <view class="code" style="overflow-wrap: break-word;"> -->
              <!-- http://h5.dev.nft.hulianar.com/#/pages/sys/login/index?inviteCode=T98Y0 -->
              <img :src="imgurl" alt="" style="border-radius: 20px;" />
            <!-- </view> -->

            <!-- <img src="@/static/fff.svg" alt="" @click="copyInvite" /> -->
          </view>
        </view>
      </u-modal>
<!--    <u-modal-->
<!--      :show="loginShow"-->
<!--      title="提示"-->
<!--      :showCancelButton="true"-->
<!--      content="您还没登录"-->
<!--      confirmText="去登录"-->
<!--      @confirm="toLogin"-->
<!--      @cancel="loginShow = false"-->
<!--    ></u-modal>-->
  </view>

</template>

<script>
import buttom from "@/components/buttom/buttom.vue";
import footers from "@/components/footers/footers.vue";
import goodItem from "@/components/goodItem.vue";
import { getCateTree } from "@/api/good.js";
import { getDictList } from "@/api/index.js";
import {
  getUserInfo,
  myGoods,
  composeSetting,
  userSummary,
} from "@/api/user.js";
export default {
  data() {
    return {
      gnum: 2,
      nftaddress: "Ox45e6fd8sks45hj2dD1D",
      islogin: false,
      name: "藏家_5sexxmdf98",
      istrush: false,
      avatar: "",
      background: "",
      shop: [],
      cateId: "",
      type: "",
      tximg: require("@/static/rightdl.svg"),
      defaultIndex: [],
      defaultIndex2: [],
      show: false,
      show2: false,
      columns: [],
      columns2: [],
      pickerText: "IP",
      pickerText2: "类型",
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      status: "loading",
      loadingText: "努力加载中...",
      loadmoreText: "点击加载更多",
      nomoreText: "没有更多了",
      showPopup: false,
      inviteCode: "",
      inviteImg: "",
      summary: {
        invite: 0,
        inviteReal: 0,
        order: 0,
        amount: 0,
      },
      imgurl: "",
      modalShow: false,
      loginShow: false,
      realPeopleStatus: false, // 实名状态
      contactShow: false,
    };
  },
  onLoad(option) {
    // this.islogin = false;
    this.getInfo();
    this.getClassLists();
    this.islogin = this.$store.getters.hasLogin;
    this.islogin ? this.getDictLists() : "";
    this.islogin ? this.getGoodsLists() : "";
    this.getUserSummary();
    if(option && option.inviteCode){
      this.inviteCode = option.inviteCode
    }
  },
  methods: {
    toGift(){
      this.showPopup = false
      uni.showModal({
        content: "转增功能近期开放，敬请期待！",
        showCancel: false
      })
    },
    getUserSummary() {
      userSummary().then((res) => {
        this.summary = res.data;
      });
    },
    getInfo() {
      // 每次进来，获取最新用户信息
      //查询用户详细信息并储存
      getUserInfo()
        .then((res) => {
          console.log("获取用户信息:", res);
          const user = res.data;
          this.$store.dispatch("ObtainUserInfo");
          this.nftaddress = user.transHash;
          this.name = user.nickname;
          this.inviteCode = user.inviteCode;
          this.inviteImg = user.inviteImg;
          this.avatar = user.avatar;
          this.background = user.background
          this.realPeopleStatus = user.realPeopleStatus;
          this.islogin = true;
          this.inviteImg ? this.invite() : "";
        })
        .catch((r) => {
          uni.$u.toast("请先登陆")
          this.status = ''
          this.loadingText = ''
          this.nomoreText = ''
          this.realPeopleStatus = false;
          this.loginShow = true;
          this.islogin = false;
        });
    },
    async getDictLists() {
      const { data, code } = await getDictList({
        code: "nft_goods_type",
      });
      this.columns2 = [data];
    },
    async getClassLists() {
      const { code, data } = await getCateTree();
      let a = [];
      data.map((item) => {
        if (item.children && item.children.length > 0) {
          item.children.map((i) => {
            a.push(i);
          });
        }
      });
      console.log([a]);
      this.columns = [a];
      //   console.log(this.columns);
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
        data: { list, total },
      } = await myGoods(params);
      this.page.total = total;
      if (this.page.pageNo === 1) {
        this.shop = list;
      } else {
        this.shop = this.shop.concat(list);
      }
      if (list.length < this.page.pageSize) {
        this.status = "nomore";
      } else {
        this.status = "loadmore";
      }
    },
    moveHandle() {
      return true;
    },
    handle(item) {
      uni.navigateTo({
        url: `/pages/sys/index/good?id=${item.id}`, // ${id}藏品ID
        // url: `/pages/sys/index/good?id=15474`,
      });
    },
    // 复制藏号
    copy() {
      uni.setClipboardData({
        data: this.nftaddress,
        success: function () {
          //调用方法成功
          uni.$u.toast("复制成功！");
        }
      })
    },
    change(e) {
      console.log("e:", e);
    },
    pickerCancel() {
      this.show = false;
    },
    pickerConfirm(e) {
		this.page.pageNo = 1;
      // console.log(e);
      const { indexs, value } = e;
      console.log("confirm", indexs, value);
      const { id, name } = value[0];
      this.defaultIndex = indexs;
      this.pickerText = name;
      this.cateId = id;
      this.getGoodsLists();
      this.show = false;
    },

    pickerCancel2() {
      this.show2 = false;
    },
    pickerConfirm2(e) {
		this.page.pageNo = 1;
      const { indexs, value } = e;
      console.log("confirm", indexs, value[0]);
      this.pickerText2 = value[0].label;
      this.type = value[0].value;
      this.defaultIndex2 = indexs;
      this.show2 = false;
      this.getGoodsLists();
    },
    reset() {
      this.pickerText = "IP";
      this.pickerText2 = "类型";
      this.cateId = this.type = "";
      this.page.pageNo = 1;
      this.page.pageSize = 10;
      this.getGoodsLists();
    },
    cashOut() {
      uni.navigateTo({
        url: `/pages/sys/my/walleDetails`,
      });
    },
    order() {
      uni.navigateTo({
        url: `/pages/sys/my/order`,
      });
    },
    invite() {
      this.imgurl = this.getBase64(this.inviteImg);
    },
    getBase64(base64) {
      const changebase64 = base64.replace(/[\r\n]/g, "");
      //   console.log(changebase64);
      return changebase64;
    },
    async compose() {
      const {
        code,
        msg,
        data: { enable },
      } = await composeSetting();
      if (enable) {
        uni.navigateTo({
          url: `/pages/sys/my/compose`,
        });
      } else {
        this.$refs.uNotify.show({
          top: 40,
          type: "error",
          color: "#fff",
          message: "活动还未开始！",
          duration: 1000 * 1.5,
          fontSize: 20,
          safeAreaInsetTop: true,
        });
      }
    },
    toLogin() {
      uni.reLaunch({
        url: "/pages/sys/login/index?inviteCode="+this.inviteCode,
      });
      this.$store.commit("CLEAR_LOGIN_INFO");
    },
    loginOut() {
      this.$store.dispatch("Logout");
      this.islogin = false;
      this.showPopup = false;
    },
    toRealPeople() {
      // if (this.realPeopleStatus) {
      //   return false;
      // }
      uni.navigateTo({
        url: `/pages/sys/my/realPeople`,
      });
    },
    contact() {
      console.log("联系客服");
      this.contactShow = true;
    },
    loadmore() {
      this.status = "loading";
      this.page.pageNo++;
      this.getGoodsLists();
    },
    copyInvite() {
      uni.$u.toast("复制成功！");
    },
    editInfo() {
      uni.navigateTo({
        url: `/pages/sys/my/editinfo`,
      });
    },
    toClause(type) {
      uni.navigateTo({
        url: `/pages/sys/my/clause?type=${type}`,
      });
    },
  },
  components: {
    buttom,
    footers,
    goodItem,
  },
};
</script>

<style lang="scss" scoped>
.cpt {
  margin-top: 52px;
  height: 15px;
  color: rgba(134, 134, 134, 100);
  font-size: 12px;
  text-align: left;
}

.bt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  color: rgba(243, 246, 251, 100);
  font-size: 14px;
  text-align: left;
}

.ljdl {
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 40px;
  margin-right: 40px;
  font-weight: bold;
  height: 39px;
  border-radius: 4px;
  background-color: rgba(237, 223, 188, 100);
  color: rgba(68, 69, 75, 100);
  font-size: 14px;
  text-align: center;
}

.tx2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tx2 text {
  margin-top: 9px;
  color: rgba(134, 134, 134, 100);
  font-size: 12px;
  text-align: left;
}

.ytx2 {
  /* justify-content: space-around; */
  margin-top: 70px;
  display: flex;
  // align-items: center;
  flex-direction: column;
  .name {
    font-size: 20px;
  }
}

.lg2 {
  color: rgba(238, 238, 238, 100);
  font-size: 12px;
  text-align: left;
  margin-top: 8px;
}

.lg {
  color: rgba(238, 238, 238, 100);
  font-size: 16px;
  text-align: left;
}

.ytx {
  margin-top: 13px;
  display: flex;
  align-items: center;
}

.jx {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 49px;
  line-height: 20px;
  border-radius: 30px 30px 30px 30px;
  background-color: rgba(204, 204, 204, 100);
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  padding-left: 17px;
  padding-right: 17px;
  background-color: rgb(21, 21, 21);
  min-height: 100vh;
  padding-bottom: 100px;
  color: #fff;
}

.avatar {
  border-radius: 50%;
  border: 3px solid rgb(33, 33, 33);
  bottom: -54px;
  left: 50%;
  transform: translateX(-50%);
}

.wrap {
  display: flex;
  flex-direction: column;

  .item-wrap {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  .item {
    display: flex;
    text-align: center;
    width: 45%;
    height: 108px;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(33, 33, 33);
    border-radius: 20px;
    cursor: pointer;
    font-size: 18px;
  }
}

.select {
  width: 30%;
}

.yes {
  background-color: #1c9120;
  color: #fff;
}

.no {
  font-size: 14px;
  background-color: #fff;
  background-image: linear-gradient(rgb(75, 75, 75), #a3a3a3);
  color: #fff;
}

.join {
  position: fixed;
  bottom: 100px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 30px;
  background: #212121;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  .mt15 {
    font-size: 24px;
  }
}
/deep/.invite {
  .u-fade-enter-active {
    z-index: 10170 !important;
  }
  .u-fade-zoom-enter-active {
    z-index: 10175 !important;
  }
  .u-popup__content {
    background-color: rgb(33, 33, 33);
    background: url("@/static/inviteBg.svg") no-repeat center center;
    background-size: cover;
    border-radius: 20px !important;
    .u-modal__content {
      padding-bottom: 0;
      .slot-content {
        width: 100%;
        text-align: center;
      }
    }
    .u-modal__title {
      color: #fff;
    }
    .u-line {
      border: none !important;
    }
    .u-modal__button-group__wrapper--hover {
      background-color: transparent;
    }
    .u-modal__button-group__wrapper__text {
      color: #fff !important;
    }
    .incontent {
      background-color: rgb(230, 230, 230);
      color: #000;
      padding: 40px;
      border-radius: 20px;
    }
  }
}
.contact-wrap {
  animation: mymove 0.8s normal;
}
@keyframes mymove {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
