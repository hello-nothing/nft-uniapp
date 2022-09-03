<template>
  <view class="content">
    <!-- 	<view class="flex rel align-center" v-if="phone">
			<footers></footers>
			<view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">我的订单</view>
		</view> -->
    <view class="mt20 nav">
      <u-tabs
        :list="list"
        @click="click"
        :activeStyle="{ color: '#fff' }"
        :inactiveStyle="{ color: '#aaa' }"
      >
      </u-tabs>
    </view>
    <view class="mt20 list">
      <!-- 下单时间，付款时间，订单号，短编号，详情图片  藏品名称，藏品价格 订单状态 链上hash   -->
      <view
        class="order-content flex mb15"
        v-for="item in orderLists"
        :key="item.id"
      >
        <view class="order-content-top flex">
          <view class="order-time">
            {{ com(item.createTime) }}
          </view>
        </view>
        <view class="order-info mt10"> 订单编号：{{ item.id }}</view>
        <view class="order-content-bottom mt10 flex">
          <view class="order-img flex">
            <u--image
              :fade="false"
              :src="item.goodsImg"
              width="80px"
              height="80px"
            >
            </u--image>
            <view class="order-name flex ml15">
              <view>{{ item.goodsName }}</view>
              <text class="buyLimit">
                <text class="buyLimitText">{{ item.shortNumber }}</text>
                <text class="buyLimitNum">{{ item.totalStock }}</text>
              </text>
            </view>
          </view>
        </view>
<!--        <view style="margin-top: 12px;display: flex;">-->
<!--          链上对象标识：<view style="max-width: 60%; " class="sl">-->
<!--          <div ref="copyObj" class="sl">{{ goods.transNftId }}</div>-->
<!--          &lt;!&ndash;					<u-parse :content="goods.transHash" :tagStyle="style"></u-parse>&ndash;&gt;-->
<!--        </view>-->
<!--          <image-->
<!--              src="@/static/copy.svg"-->
<!--              style="color: #fff; height: 20px; width: 20px;"-->
<!--              @tap="copy(goods.transNftId)"-->
<!--          />-->
<!--        </view>-->
        <view class="mt10 flex">
          链上交易Hash：<view class="sl" style="max-width: 50%">
            {{ item.transHash }}
          </view>
          <image
              src="@/static/copy.svg"
              style="color: #fff; height: 20px; width: 20px;"
              @tap="copy(goods.transNftId)"
          />
        </view>
        <view class="order-price order-name flex mt15">
          <view class="price">￥{{ item.price }}</view>
          <view :class="['order-status', class1[item.orderStatus], 'mt15']">
            {{ type[item.orderStatus] }}
          </view>
        </view>
        <view
          class="mt15"
          style="display: flex; justify-content: end"
          v-if="item.orderStatus === '1'"
        >
          <view class="flex">
            <u-button
              type="primary"
              text="去付款"
              size="mini"
              @click="toPay(item.id, item.goodsId)"
            >
            </u-button>
            <u-button
              class="ml15"
              type=""
              text="取消订单"
              size="mini"
              @click="handleModalShow(item.id)"
            >
            </u-button>
          </view>
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
    <u-modal
      :show="modalShow"
      :showCancelButton="true"
      title="确认取消订单？"
      confirmText="确定取消"
      cancelText="暂不取消"
      @cancel="modalShow = false"
      @confirm="cancel"
    ></u-modal>
    <!-- <buttom /> -->
  </view>
</template>

<script>
import footers from "@/components/footers/footers.vue";
import buttom from "@/components/buttom/buttom.vue";
import moment from "@/common/moment";
import { getOrderList, cancelOrder } from "@/api/user.js";
export default {
  name: "order",
  components: {
    footers,
    buttom,
  },
  data() {
    return {
      list: [
        {
          name: "全部",
        },
        {
          name: "进行中",
        },
        {
          name: "已完成",
        },
        {
          name: "取消",
        },
      ],
      type: {
        0: "已取消",
        1: "待付款",
        3: "已完成",
      },
      class1: {
        0: "gray",
        1: "yellow",
        3: "green",
      },
      orderId: "",
      orderStatus: "",
      orderLists: [],
      com: (createTime) => {
        return moment(createTime).format("YYYY-MM-DD HH:mm:ss");
      },
      modalShow: false,
      phone: false,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      status: "loading",
      loadingText: "努力加载中...",
      loadmoreText: "点击加载更多",
      nomoreText: "没有更多了",
    };
  },
  onLoad() {
    uni.getSystemInfoSync().deviceType === "phone"
      ? (this.phone = true)
      : (this.phone = false);
  },
  mounted() {
    this.getOrderLists();
  },
  methods: {
    async getOrderLists() {
      const params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        orderStatus: this.orderStatus,
      };
      const {
        code,
        data: { list, total },
      } = await getOrderList(params);
      this.page.total = total;
      this.orderLists = this.orderLists.concat(list);
      if (this.page.pageNo * this.page.pageSize >= this.page.total) {
        this.status = "nomore";
      } else {
        this.status = "loadmore";
      }
    },
    click(item) {
      const { index } = item;
      switch (index) {
        case 0:
          this.orderStatus = "";
          break;
        case 1:
          this.orderStatus = 1;
          break;
        case 2:
          this.orderStatus = 3;
          break;
        case 3:
          this.orderStatus = 0;
          break;
      }
      this.status = "loading";
      this.page.pageNo = 1;
      this.orderLists = [];
      this.getOrderLists();
      console.log(index, this.orderStatus);
    },
    handleModalShow(id) {
      this.modalShow = true;
      this.orderId = id;
    },
    async cancel() {
      const { code, data, success } = await cancelOrder({
        orderId: this.orderId,
      });
      if (code === 0) {
        uni.showToast({
          type: "success",
          title: "取消成功",
        });
        this.getOrderLists();
      } else {
        uni.showToast({
          type: "error",
          title: "取消失败，请重试",
        });
      }
      this.modalShow = false;
    },
    openModal(id) {
      ths.orderId = id;
    },
    toPay(id, goodId) {
      uni.navigateTo({
        url: `/pages/sys/seller/buycp?orderId=${id}&goodId=${goodId}`,
      });
    },
    loadmore() {
      this.status = "loading";
      this.page.pageNo++;
      this.getOrderLists();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
}

/deep/ .u-tabs__wrapper__nav__item {
  width: 19%;
}

.order-content {
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgb(33, 33, 33);
  border-radius: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &-top {
    justify-content: space-between;
  }

  &-bottom {
    justify-content: space-between;

    .order-name {
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .order-price {
    flex-direction: column;
    align-self: flex-end;
  }
}

.yellow {
  color: #f9ae3d;
}

.green {
  color: #5ac725;
}

.gray {
  color: gray;
}

.buyLimit {
  margin: 10px 0;
  font-weight: bolder;
}

.buyLimitText {
  background-color: rgb(255, 83, 161);
  padding: 4px;
  // border-radius: 4px 0 0 4px;
}

.buyLimitNum {
  background-color: #fff;
  color: rgb(255, 83, 161);
  padding: 4px;
  // border-radius: 0 4px 4px 0;
}
</style>
