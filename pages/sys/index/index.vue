<template>
  <view class="content">
    <logo class="ml20 mt20"></logo>
    <u-notice-bar
      :text="notices"
      mode="link"
      direction="column"
      bgColor="#212121 "
      color="white"
      fontSize="15px"
      @click="toNotice"
      style="margin: 20px -17px 0"
    ></u-notice-bar>
    <u-swiper
      :list="bannere"
      @change="change"
      @click="bannerClick"
      circular
      indicator
      radius="20px"
      height="193px"
      class="mt20"
    ></u-swiper>
    <view style="display: flex; flex-direction: column; position: relative;z-index: 99;" class="mt15">
      <view class="rel textfff">
        <image
          src="@/static/title.svg"
          style="height: 26px; width: 26px"
        ></image>
        <view v-if="sellStatus === '即将开售'" class="flex align-center abs" style="font-size: 16px;left: 13px;bottom: -9px;">
          {{sellStatus}}
          <u-count-down
            :time=sellCountDown
            format="DD天HH小时mm分ss秒"
          ></u-count-down>
        </view>
      </view>
      <goods-swiper :goods="goods" @swiperItemClick="swiperItemClick" @swiperChange="swiperChange" class="mt30" style="background: rgb(33,33,33);padding-top: 14px;box-sizing: border-box;border-radius: 20px 20px 0 0;">
      </goods-swiper>
    </view>
    <view class="flex w100 ssss" style="height: 220px;">
     <!-- <view class="leftcc" @click="gotoIpPage">版权品</view>
      <view class="leftcc">衍生品</view>
      <view class="leftcc">实物藏品</view> -->
      <view class="flex rel" style="width: 50%;flex-direction: column;">
		  <u--image src="../../../static/zhanguan.svg" mode="scaleToFill" width="110%" class="abs w100" style="z-index: 1;" @click="gotoMarketPage(5)"></u--image>
		  <u--image src="../../../static/banquan.svg" mode="scaleToFill" width="110%" class="abs w100" style="left: -36px;top: 103px;z-index: 2;"  @click="gotoIpPage"></u--image>
	  </view>
	  <view class="rel" style="width: 50%;">
		  <u--image src="../../../static/shiwu.svg" mode="scaleToFill" width="110%" height="140%" class="abs w100 h100" @click="gotoMarketPage(2)" ></u--image>
	  </view>
    </view>
    <view style="height:200px;"></view>
    <buttom></buttom>
  </view>
</template>

<script>
import buttom from "@/components/buttom/buttom.vue";
import goodsSwiper from "@/components/swiper/swiper.vue";
import * as homeApi from "@/api/index.js";
import moment from '@/common/moment.js'
export default {
  data() {
    return {
      sellStatus: "即将开售",
      sellCountDown: 0,
      bannere: [],
      bannerList: [],
      notices: [],
      banner: ["欢迎加入梦幻数藏"],
      banner2: ["购买数字藏品"],
      banner3: ["去了解"],
      goods: [],
      select: 0,
      time: "01:03:12",
      name: "核心",
      author: "Connected universe",
      num: "5000",
      price: "19.9",
      nowseller: require("@/static/bg1.png"),
    };
  },
  onLoad() {
    // 获取首页顶部轮播
    this.getBannerData();
    // 获取首页轮播藏品
    this.getGoodsLists();
    // 获取公告
    this.getNotices();
  },
  mounted() {},
  methods: {
    async getBannerData() {
      homeApi.getBannerData().then( res => {
        this.bannerList = res.data
        res.data.map( b => {
          this.bannere.push(b.imgUrl);
        })
      })
    },
    async getGoodsLists() {
      const params = {
        pageNo: 1,
        pageSize: 100,
      };
      const {
        code,
        data: { list, total },
      } = await homeApi.getTopGoodsData(params);
      this.goods = list;
      this.swiperChange(list[0])
    },
    getNotices() {
      homeApi.getNotice().then(res => {
        res.data.list.map((item) => {
          let time = moment(item.createTime).format("MM-DD HH:mm");
          this.notices.push(time + "  " +item.title);
        });
      })
    },
    click() {
      console.log(1);
    },
    change() {},
    navTo(route) {
      this.$mRouter.push({
        route,
      });
    },
    bannerClick(index){
      const item = this.bannerList[index]
      if(item.jumpUrl !==''){
        uni.navigateTo({
          url: item.jumpUrl,
        });
      }
    },
    swiperChange(current){
      console.log("item",current)
      if(!current){
        return ;
      }
      let status = current.status;
      this.sellStatus = current.statusDesc
      if(status === '7'){
        this.sellStatus = '即将开售'
        this.sellCountDown = current.buyStartTime - new Date().getTime()
        console.log(this.sellCountDown);
      }
    },
    swiperItemClick(item, index) {
      console.log(item, index);
      const { id } = item;
      uni.navigateTo({
        url: `/pages/sys/index/good?id=${id}`,
      });
      // this.$mRouter.push({
      // 	route: this.$mRoutesConfig.goodsDetails.path,
      // 	query: {
      // 		id
      // 	}
      // })
    },
    gotoMarketPage(type){
      uni.navigateTo({
        url: `/pages/sys/seller/seller?type=`+type,
      });
    },
    gotoIpPage(){
      uni.navigateTo({
        url: `/pages/sys/seller/bqseller`,
      });
    },
    toNotice() {
      uni.navigateTo({
        url: `/pages/sys/index/notice`,
      });
    },
  },
  components: {
    buttom,
    goodsSwiper,
  },
};
</script>

<style lang="scss" scoped>
.banner2 {
  margin-left: 40px;
  height: 121px;
  display: flex;
}

.notice {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 12px;

  height: 27px;
  color: rgba(136, 136, 136, 100);
  font-size: 14px;
  text-align: left;
  border: 1px solid rgba(187, 187, 187, 100);
  line-height: 27px;
  vertical-align: middle;
}

.showname {
  position: absolute;
  top: 12px;
  left: 27px;
  width: 122px;
  height: 24px;
  color: rgba(243, 246, 251, 100);
  font-size: 16px;
  text-align: left;
}

.showauthor {
  position: absolute;
  top: 36px;
  left: 32px;
  height: 24px;
  color: rgba(243, 246, 251, 100);
  font-size: 12px;
}

.shownum {
  position: absolute;
  top: 59px;
  left: 30px;
  display: flex;
  align-items: baseline;
}

.shownum1 {
  width: 36px;
  height: 16px;
  line-height: 17px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 12px;
  text-align: center;
}

.shownum2 {
  width: 67px;
  height: 16px;
  line-height: 17px;
  background-color: rgba(3, 9, 42, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 12px;
  text-align: center;
}

.shownum3 {
  width: 81px;
  height: 40px;
  color: rgba(238, 238, 238, 100);
  font-size: 28px;
  text-align: left;
}

.show {
  position: absolute;
  top: 510px;
  z-index: 2;
  width: 217px;
  height: 107px;
  line-height: 10px;
  background-color: rgba(68, 49, 243, 100);
  color: rgba(255, 255, 255, 100);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
}

.content {
  display: flex;
  flex-direction: column;
  padding-left: 17px;
  padding-right: 17px;
  background-color: rgb(21,21,21);
  min-height: 100vh;
}

.banner {
  margin-top: 44px;
  height: 120px;
  width: 100%;
  border-radius: 16px 16px 16px 16px;
  position: relative;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.bannertext {
  position: absolute;
  left: 20px;
  top: 60px;
  height: 26px;
  color: rgba(243, 246, 251, 100);
  font-size: 18px;
  text-align: left;
}

.bannertext2 {
  position: absolute;
  left: 20px;
  top: 89px;
  height: 17px;
  color: rgba(181, 164, 164, 100);
  font-size: 12px;
  text-align: left;
}

.bannertext3 {
  position: absolute;
  left: 120px;
  top: 89px;
  height: 17px;
  color: rgba(181, 164, 164, 100);
  font-size: 12px;
  text-align: left;
}

.selltext {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 9px;
  text-align: left;
  height: 24px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
}

.u-notice-bar {
  flex: 0;
}
/deep/ .u-count-down__text {
  margin-left: 10px;
  color: #fff;
}
/deep/ .u-notice__swiper{
  height: 30px;
}
</style>
