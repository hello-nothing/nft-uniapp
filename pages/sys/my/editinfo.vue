<template>
  <view class="content textfff">
    <view class="mb20 font18" style="text-align: right" @click="save">
      保存
    </view>
    <view  class="mt30" style="margin-bottom: 30px;">
      <view style="color: rgb(191, 191, 191)">昵称</view>
      <view class="mt10">
        <input
            type="text"
            v-model="nickname"
            style="
            background-color: rgb(33, 33, 33);
            border-radius: 20px;
            padding: 5px 10px;
          "
        />
      </view>
    </view>
    <view class="rel textfff">
      <image src="@/static/title.svg" style="height: 26px; width: 26px"></image>
      <view
        class="flex align-center abs"
        style="font-size: 16px; left: 13px; bottom: -9px"
      >
        背景选择
      </view>
    </view>
    <view class="mt30 mb30">
      <u-scroll-list
        :indicator="true"
        indicatorColor="#444444"
        indicatorActiveColor="#666"
      >
        <view
          v-for="(item, index) in bgList"
          :key="index"
          :class="[activeBgIndex === index ? 'active' : '', 'mr15', 'bg']"
        >
          <image
            :src="item.thumb"
            style="border-radius: 20px"
            @click="activeBgIndex = index"
          ></image>
        </view>
      </u-scroll-list>
    </view>
    <view class="rel textfff">
      <image src="@/static/title.svg" style="height: 26px; width: 26px"></image>
      <view
        class="flex align-center abs"
        style="font-size: 16px; left: 13px; bottom: -9px"
      >
        头像选择
      </view>
    </view>
    <view class="mt30 mb30">
	  <view  style='display: flex;flex-direction: row;flex-wrap: wrap;'>
		<u-avatar v-for="(item,index) in avatarList" shape="square" :src="item" size="75" :class="[activeAvIndex==index ? 'active' : '', 'av']" @click="activeAvIndex=index" style="margin: 0 5px 5px 0pt;" ></u-avatar>
	  </view>
    </view>

  </view>
</template>

<script>
import {
  getUserInfo,
  updateUserInfo
} from "@/api/user.js";
export default {
  data() {
    return {
      nickname: "nickName", // 昵称
      bgDatas: [], //背景
      avatarDatas: [], //头像
      bgList: [
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/ce72c36e492ab1c98e3db15a41f5cb56.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/4e7a698c63bbd7007ece5e39da3c1d42.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/e29b08716e98328a6deea2f32c94a7cb.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/517b013f01f089f795b3d42c02390ae3.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/13914c914c43a5fcb6b4d2af9cab7ca9.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/7dcb9932e374c0721216b07043b254bc.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/b90ab643a60f017d0c558ea89bbd4a89.png",
        },
        {
          thumb: "https://hulianar.oss-cn-shenzhen.aliyuncs.com/1723299c28534333d4b83416ea476714.png"
        },
      ],
      avatarList: [
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/385b3e2cec886820f2d1c994816b3839.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/b4889523416bc5ed0546614d2ff62859.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/37e6dae305eeb59c3001283f652ce0dd.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/a80508070ed353951d9c2812632592c3.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/8a2e647c518560881a085275c96b4193.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/cb25d303f565b31207bf6c5ec7bc0951.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/9744163e81e75eb3672f670e8cbb7241.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/dc223bef313139ba95555fbeaf394f53.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/c57b756b7c114bf12ff3f42c3b2b4ecb.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/1ad72bebdffd3c090fdaba47716118ff.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/e9d3c597ceba9633f90f48d1b659a1a5.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/d3be7172113a7320493a53eedc913908.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/01c70f04e4456195f6493e24df56225e.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/368a782f1f3f65cadb43d36069e8d80c.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/cf0b5ca28db762f53c8a27df120ba6d8.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/883e02f340035a6b19a40e830e7f2881.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/86571e49aed87bfdb8edc5047758c9d9.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/4770b962b0e7b8fd4808b4a6f6603adc.png",
        "https://hulianar.oss-cn-shenzhen.aliyuncs.com/714dcfad79f2dbc239f394cbe94d8237.png",
      ],
      activeBgIndex: 0,
      activeAvIndex: 0,
    };
  },
  onLoad(){
    getUserInfo().then(res => {
        this.nickname = res.data.nickname
    })
  },
  methods: {
    save() {
      let avatar = this.avatarList[this.activeAvIndex];
      let background = this.bgList[this.activeBgIndex];
      updateUserInfo({"avatar": avatar, "background": background.thumb, "nickname":this.nickname}).then(res => {
        setTimeout(() => {
          uni.navigateTo({
            url: `/pages/sys/my/index`,
          });
        }, 500);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  border: 1px solid rgb(151,151,151);
  border-radius: 20px;
}
.bg.active,.av.active {
  border-color: #fff;
}

/deep/.u-avatar-group__item{
	margin: 0 5px 5px 0 ;
}
/deep/.u-avatar__image--square{
	border-radius: 10px;
}
.av {
  border: 2px solid rgb(151,151,151);
  border-radius: 10px;
}
</style>
