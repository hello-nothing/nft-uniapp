<template>
  <view class="content textfff">
    <!-- <view class="flex rel align-center" v-if="option">
			<footers></footers>
			<view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">
				公告
			</view>
		</view> -->
    <view class="mt20 mb20">
      <!--  moment(createTime).format("YYYY-MM-DD HH:mm:ss")  -->
      <view
        v-for="(item, index) in list"
        class="mt20 noticeist"
        :key="item.id"
        @click="noticeInfo(index)"
      >
        <u--image
          :showLoading="true"
          :src="item.image"
          width="100%"
          height="180px"
          :fade="false"
          radius="15"
        >
        </u--image>
        <view class="mt10 mb10 pl10 pr10">{{ item.title }}</view>
        <view class="pb10 pl10 pr10">{{ com(item.createTime) }}</view>
      </view>
      <view style="margin-bottom: 100px;">
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
    <u-popup
      :show="popuoShow"
      @close="popuoShow = false"
      :closeable="true"
      round="20px"
      bgColor="#212121"
      class="textfff"
      ref="popupRef"
      :safeAreaInsetTop="false"
    >
      <view
        :style="{
          overflowY: 'scroll',
          maxHeight: popupRefHeight + 'px',
          padding: '45px 15px 15px',
          color: '#fff',
        }"
      >
        <u--image
          :showLoading="true"
          :src="popupData.image"
          width="100%"
          height="180px"
          :fade="false"
          radius="15"
        ></u--image>
        <view class="mt10 mb10 pl10 pr10">{{ popupData.title }}</view>
        <view class="pb10 pl10 pr10">{{ com(popupData.createTime) }}</view>
        <view
          class="pb10 pl10 pr10 richcontent ql-editor"
          v-html="popupData.content"
        ></view>
      </view>
    </u-popup>
    <buttom v-if="!option" />
  </view>
</template>

<script >
import moment from "@/common/moment";
import footers from "@/components/footers/footers.vue";
import buttom from "@/components/buttom/buttom.vue";
import { getNotice } from "@/api/index.js";
import "quill/dist/quill.core.css";
export default {
  name: "notice",
  components: {
    footers,
    buttom,
  },
  data() {
    return {
      list: [],
      com: (createTime) => {
        return moment(createTime).format("YYYY-MM-DD HH:mm:ss");
      },
      popuoShow: false,
      popupData: "",
      phone: false,
      option: false,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      status: "loading",
      loadingText: "努力加载中...",
      loadmoreText: "点击加载更多",
      nomoreText: "没有更多了",
      popupRefHeight: 700,
      // style2:{
      //  'maxHeight': () =>{
      //   console.log(uni.getWindowInfo().windowHeight * 0.8 + 'px')
      //   return uni.getWindowInfo().windowHeight * 0.8 + 'px'
      //  },
      //  'overflow-y': 'scroll',
      //  'padding': '45px 15px 15px',
      //  'box-sizing': 'border-box',
      //  'color': '#fff'
      // }
    };
  },
  onLoad(option) {
    const windowHeight = uni.getWindowInfo().windowHeight;
    this.popupRefHeight = windowHeight * 0.8;
    console.log(this.popupRefHeight);
    option.index ? (this.option = false) : (this.option = true);
    // 获取公告
    this.getNotices();
    console.log(uni.getSystemInfoSync().deviceType);
    uni.getSystemInfoSync().deviceType === "phone"
      ? (this.phone = true)
      : (this.phone = false);
  },
  methods: {
    async getNotices() {
      const params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
      };
      const {
        code,
        data: { list, total },
      } = await getNotice(params);
      this.page.total = total;
      this.list = this.list.concat(list);
      if (this.page.pageNo * this.page.pageSize >= this.page.total) {
        this.status = "nomore";
      } else {
        this.status = "loadmore";
      }
    },
    noticeInfo(index) {
      // this.$refs.popupRef
      console.log(this.$refs["popupRef"]);
      this.popupData = this.list[index];
      this.popuoShow = true;
    },
    loadmore() {
      this.status = "loading";
      this.page.pageNo++;
      this.getNotices();
    },
  },
};
</script>

<style lang="scss" scoped>
.noticeist {
  background-color: rgb(33, 33, 33);
  border-radius: 20px;

  &:nth-child(1) {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 70px;
  }
}

.richcontent {
  /deep/ img {
    width: 100%;
  }
}
</style>
