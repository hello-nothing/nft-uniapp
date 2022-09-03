<template>
  <view class="content">
    <u-notify ref="uNotify"></u-notify>
    <!-- <view class="flex rel align-center">
			<footers></footers>
			<view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">合成/兑换藏品</view>
		</view> -->
    <view class="mt20">
      <view v-for="item in materialLists" class="goodItem rel">
        <view class="abs"> {{ item.current }} / {{ item.total }} </view>
        <u--image
          :showLoading="true"
          :src="item.metaGoods.detailImage"
          width="100%"
          height="95px"
          class="goodImg"
          radius="20"
          :fade="false"
        >
        </u--image>
        <view style="margin-top: 5px" class="sl">
          {{ item.metaGoods.name }}
        </view>
      </view>
    </view>
    <u-icon
      name="arrow-right-double"
      color="#fff"
      size="28"
      class="mt30"
      style="
        transform: rotateZ(90deg);
        align-items: center;
        justify-content: center;
      "
    ></u-icon>
    <view class="mt20">
      <u--image
        :showLoading="true"
        :src="goods.detailImage"
        width="270px"
        height="270px"
        radius="10"
        class="goodImg"
        :fade="false"
      >
      </u--image>
      <view style="margin-top: 5px" class="txtc">
        {{ goods.name }}
      </view>
    </view>
    <view class="mt20" style="padding: 0 30px; box-sizing: border-box">
      <view class="txtc" style="color: rgb(131, 131, 131)">
        集齐以上藏品即可进行合成/兑换
      </view>
      <u-button type="primary" @click="start" class="my-btn mt10"
        >立即合成/兑换</u-button
      >
    </view>
  </view>
</template>

<script>
import footers from "@/components/footers/footers.vue";
import { composeSetting, materialList, startCompose } from "@/api/user.js";
export default {
  name: "compose",
  components: {
    footers,
  },
  data() {
    return {
      list: [],
      goods: {},
      materialLists: [],
    };
  },
  onLoad() {
    this.getComposeSetting();
  },
  mounted() {},
  methods: {
    async getComposeSetting() {
      const {
        code,
        msg,
        data: { enable, goods },
      } = await composeSetting();
      if (enable) {
        this.getMaterialList();
        this.goods = goods;
      } else {
      }
    },
    async getMaterialList() {
      const { code, data } = await materialList();
      this.materialLists = data;
    },
    async start() {
      const { code, msg, data, success } = await startCompose();
      if (success) {
        this.$refs.uNotify.show({
          top: 40,
          type: "success",
          color: "#fff",
          message: "恭喜！合成/兑换成功！",
          duration: 1000 * 1.5,
          fontSize: 20,
          safeAreaInsetTop: true,
        });
      } else {
        this.$refs.uNotify.show({
          top: 40,
          type: "error",
          color: "#fff",
          message: "合成/兑换失败，请重试！",
          duration: 1000 * 1.5,
          fontSize: 20,
          safeAreaInsetTop: true,
        });
      }
      this.getComposeSetting();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
}

.goodItem {
  float: left;
  margin: 2%;
  box-sizing: border-box;
  text-align: center;
  width: 29.3%;

  .abs {
    z-index: 1;
    color: #fff;
    background-color: rgb(116, 116, 116);
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 700;
    min-width: 50%;
    left: 50%;
    transform: translateX(-50%);
    top: -12px;
  }
}

.goodImg {
  align-items: center;
}
</style>
