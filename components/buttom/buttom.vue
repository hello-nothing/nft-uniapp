<template>
  <view class="buttom">
    <view
      v-for="(item, index) in name"
      :class="['text', { active: activeIndex === index }]"
      :key="index"
      @tap="navTo(index)"
    >
      <view style="display: flex; flex-direction: column">
        <image
          mode="aspectFit"
          :src="require('@/static/' + icons[index])"
          style="height: 30px; width: 30px"
        >
        </image>
        <!-- <text>{{ item }}</text> -->
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      name: ["首页", "公告", "我的"],
      icons: [
        "ze-home-o.svg",
        // "ze-shopping-cart-o.svg",
        "ze-notice-o.svg",
        "ze-manager-o.svg",
      ],
      links: [
        "/pages/sys/index/index",
        // "/pages/sys/seller/seller",
        "/pages/sys/index/notice?index=2",
        "/pages/sys/my/index",
      ],
      activeIndex: 0,
    };
  },
  mounted(){
	this.activeIndex = this.$store.getters.activeItem
  },
  methods: {
    navTo(index) {
      // if (index === 1) {
      //   uni.showModal({
      //     content: "近期开放！",
      //     showCancel: false,
      //   });
      //   return;
      // }
	  this.$store.commit("SET_ACTIVE_ITEM", index)
      uni.redirectTo({
        url: this.links[index],
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.text {
  // padding: 0 20px;
  font-weight: 700;
  color: wheat;
  font-size: 18px;
  padding-bottom: 5px
}

.buttom {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 60%;
  height: 72px;
  background-color: rgb(33, 33, 33);
  z-index: 99;
  border-radius: 25px;
}
.active{
	border-bottom: 1px solid #fff;
}
</style>
