<!-- 版权市场 -->
<template>
  <view class="content">
    <!-- <footers></footers> -->
    <!--		<view class="detail">-->
    <!--			<view v-for="item in navtitle">-->
    <!--				{{item}}-->
    <!--			</view>-->
    <!--		</view>-->
    <view class="seller">
	  <view
	    v-for="(item, index) in list"
	    class="mt20 noticeist textfff"
	    :key="item.id"
	    @click="click(item.id)"
	  >
	    <u--image
	      :showLoading="true"
	      :src="item.image"
	      width="100%"
	      height="180px"
	      :fade="false"
	      radius="15"
	    ></u--image>
	    <view class="mt10 mb10 pl10 pr10 ">{{ item.issueStatus }}</view>
	    <view class="pb10 pl10 pr10">{{ item.name }}</view>
	  </view>
    </view>
    <!--		<view class="load">-->
    <!--			加载更多-->
    <!--		</view>-->
    <buttom></buttom>
  </view>
</template>

<script>
import buttom from "@/components/buttom/buttom.vue";
import footers from "@/components/footers/footers.vue";
import { getCateList, getSecondCateList } from "@/api/good.js";
export default {
  data() {
    return {
      navtitle: ["画廊", "实物", "价格", "流转市场"],
      imgtop: {
        img: require("@/static/ntfimg.png"),
      },
      // 顶级分类
      pList: [],
      // 二级分类
      list: [],
    };
  },
  onLoad() {
    // 初始化顶级分类
    this.initPCateList();
  },
  methods: {
    initCateList(id) {
      getSecondCateList(id).then((res) => {
        this.list = res.data;
      });
    },

    initPCateList() {
      getCateList({ pid: 0 }).then((res) => {
        this.pList = res.data;
        // 初始化二级分类
        this.initCateList(this.pList[0].id);
      });
    },

    click(id) {
		console.log(id)
		uni.redirectTo({
			url:`/pages/sys/seller/seller?cateId=${id}`
		})
	},
  },
  components: {
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
  background-color: rgb(21,21,21);
  min-height: 100vh;
  padding-bottom: 100px;
}

.detail {
  margin-top: 10px;
  justify-content: space-around;
  padding: 10px;
  display: flex;
  align-items: stretch;
  line-height: 20px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(61, 63, 80, 100);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);

  color: rgba(243, 245, 251, 100);
  font-size: 14px;
}

.trans {
  //   margin-top: 12px;
  //   margin-left: 6px;
  //   margin-right: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: auto;
  height: 34px;
  line-height: 34px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(187, 187, 187, 100);
  position: absolute;
  bottom: -17px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
}

.seller {
  margin-top: 10px;
  //display: flex;
  flex-direction: column;
}

.sellers {
  position: relative;
  margin-bottom: 30px;
  // height: $width;
}
.load {
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 36px;
  line-height: 20px;
  border-radius: 18px;
  background-color: rgba(138, 138, 138, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(187, 187, 187, 100);
}
.issueStatus {
  color: #000;
  z-index: 4;
  top: 5px;
  left: 5px;
  padding: 4px 6px;
  border: 1px solid;
  border-radius: 20px;
  box-sizing: border-box;
}

.noticeist {
  background-color: rgb(33,33,33);
  border-radius: 20px;
  &:nth-child(1) {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 70px;
  }
}
</style>
