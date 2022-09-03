<template>
  <view class="content">
 <!--   <view class="flex rel align-center">
      <footers></footers>
      <view class="mt20" style="position: absolute; left: 50%; transform: translateX(-50%)">账单</view>
    </view> -->
    <view class="mt20">

        <view
        class="order-content flex mb15"
        v-for="item in list"
        :key="item.id"
      >

        <view class="order-content-top flex">
          <view class="order-time">
             {{ com(item.createTime) }}
          </view>
<!--          <view class="order-info"> 订单编号</view>-->
        </view>

        <view class="order-content-bottom mt15 flex">
          <view class="order-img flex">
            <view class="order-name flex">
              <view class="sl" style="max-width: 200px;">
               {{ item.name }}
              </view>
            </view>
          </view>
        </view>

        <view class="order-price order-name mt15 flex">
          <view class="price">
             ￥{{ item.billAmount }}
          </view>

        </view>
<!--        <view class="order-content-bottom mt15 flex">-->
<!--          <view :class="['order-status', class1[item.orderStatus]]">-->
<!--            &lt;!&ndash; {{type[item.orderStatus]}} &ndash;&gt;-->
<!--            交易类型-->
<!--          </view>-->
<!--        </view>-->
      </view>
    </view>
  </view>
</template>

<script>
import moment from "@/common/moment";
import footers from "@/components/footers/footers.vue";
import { getBillList } from "@/api/user.js";
export default {
  name: "bill",
  components: {
    footers,
  },
  data() {
    return {
      list: [],
      com: (createTime) => {
        return moment(createTime).format("YYYY-MM-DD HH:mm:ss");
      },
      class1: {
        0: "gray",
        1: "yellow",
        3: "green",
      },
      type: {
        0: "已取消",
        1: "待付款",
        3: "已完成",
      },

    }
  },
  mounted() {
    this.getBillLists();
  },
  methods: {
    async getBillLists() {
      const {
        data: { list, total },
        code,
      } = await getBillList();
      this.list = list;
      console.log(code, list, total);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
}
.order-content {
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgb(33,33,33);
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
}
.yellow {
  color: #f9ae3d;
}

.green {
  color: #5ac725;
}

.gray {
  color: gray;
  align-self: end;
}
</style>
