<template>
  <div class="main">
    <!-- 头部 -->
    <header class="header">
      <div class="img">
        <img src="../assets/imgs/111.jpg" alt />
      </div>
      <div class="title_content">
        <img :src="seller.avatar" alt />
        <p class="title">{{seller.name}}</p>
        <p class="send">
          <span>美团专送</span>
          约{{seller.deliveryTime}}分钟送达·月售3025
        </p>
        <p class="bulletin">
          <van-notice-bar left-icon="volume-o">{{seller.bulletin}}</van-notice-bar>
        </p>
        <p class="active">
          <span class="supports">{{supports}}</span>
          <span @click="discounts">优惠 ></span>
        </p>
      </div>
    </header>
    <van-sticky z-index="2000">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" :class="{active:curhash=='/'}">商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ratings" :class="{active:curhash=='/ratings'}">评价</router-link>
        </li>
        <li class="nav-item">
          <router-link to="seller" :class="{active:curhash=='/seller'}">商家</router-link>
        </li>
      </ul>
    </van-sticky>
    <!-- 主体 -->
    <main class="main">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </main>
    <!-- 模态框 -->
    <div class="model_box" v-show="show">
      <p class="title">{{seller.name}}</p>
      <p class="star">
        <van-rate
          v-model="value2"
          :size="15"
          allow-half
          void-icon="star"
          color="#fe9900"
          void-color="#eee"
          readonly
        />
      </p>
      <div class="detail-supports">
        <div class="message">
          <p class="line"></p>
          <p class>优惠信息</p>
          <p class="line"></p>
        </div>
        <p class="supports" v-for="item in seller.supports" :key="item">{{item}}</p>
      </div>
      <div class="detail-bulletin">
        <div class="message">
          <p class="line"></p>
          <p class>商家公告</p>
          <p class="line"></p>
        </div>
        <p class="bulletin">{{seller.bulletin}}</p>
      </div>

      <!-- 关闭按钮 -->
      <div class="close">
        <van-icon name="cross" @click="closeBtn" />
      </div>
    </div>
    <!-- 购物车弹出蒙层 -->
    <div class="shopCar_model" v-show="Car">
      <CarModel />
    </div>
    <div class="foot" @click="CarBtn">
      <ShopCar />
    </div>
  </div>
</template>

<script>
import { Seller } from "@/api/apis.js";
import ShopCar from "@/components/ShopCar";
import CarModel from "@/components/CarModel";
export default {
  components: {
    ShopCar,
    CarModel,
  },
  data() {
    return {
      Car: false,
      show: false,
      seller: {},
      value2: 5,
      supports: "",
      curhash: "",
    };
  },
  async created() {
    let res = await Seller();
    this.seller = res.data.data;
    console.log(res.data.data);
    this.supports = res.data.data.supports.join(",");
    this.curhash = this.$route.path;
  },
  methods: {
    discounts() {
      this.show = true;
    },
    closeBtn() {
      this.show = false;
    },
    CarBtn() {
      if (this.shopCarList_x.length > 0) {
        this.Car = !this.Car;
      } else {
        this.Car = false;
      }
    },
  },
  computed: {
    shopCarList_x() {
      return this.$store.getters.shopCarList;
    },
  },
  watch: {
    $route(to) {
      this.curhash = to.path;
      console.log(this.$route.path);
    },
    shopCarList_x(newvalue) {
      if (newvalue.length == 0) {
        this.Car = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  font-weight: bold;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .header {
    flex: 0 0 145px;
    position: relative;
    .img {
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title_content {
      padding: 10px 10px;
      box-sizing: border-box;
      width: 90%;
      height: 110px;
      background-color: #fff;
      position: absolute;
      top: 40px;
      left: 50%;
      margin-left: -45%;
      border-radius: 6px;
      box-shadow: 0px 0px 5px #ccc;
      img {
        width: 70px;
        height: 50px;
        position: absolute;
        right: 5px;
        border-radius: 5px;
      }
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .send {
        font-size: 10px;
        color: #333333;
        span {
          text-align: center;
          display: inline-block;
          width: 55px;
          background-color: #e5f8ff;
          color: #39bbf0;
          border-radius: 4px;
        }
      }
      .active {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #ff6600;
        margin-top: 3px;
        .supports {
          width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #ff6600;
        }
        span {
          color: #888;
        }
      }
      .bulletin {
        margin-top: 5px;
        font-size: 8px;
        color: #888;
        .van-notice-bar {
          height: 20px;
          padding: 0;
          color: #888;
          font-size: 10px;
        }
      }
    }
  }
  .nav {
    flex: 0 0 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 0 10px;
    box-sizing: border-box;
    justify-content: space-around;
    .nav-item {
      // width: 60px;
      /deep/a {
        line-height: 40px;
        height: 100%;
        width: 100%;
        color: #000;
      }
    }
  }
  .main {
    display: flex;
    flex: 1;
    overflow-y: scroll;
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
      transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
      transition: all 0 ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(50px);
      opacity: 0;
    }
  }

  .model_box {
    z-index: 1000;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);

    color: #fff;
    .title {
      margin-top: 40px;
      font-weight: bold;
      text-align: center;
    }
    .star {
      text-align: center;
      margin-top: 15px;
    }
    .close {
      position: absolute;
      bottom: 10px;
      margin-left: 45%;
      width: 30px;
      height: 30px;
      // background-color: royalblue;
      text-align: center;
      line-height: 35px;
      border-radius: 50% 50%;
      border: 1px solid #ccc;
      color: #ccc;
    }
    .detail-supports {
      padding: 10px;
      box-sizing: border-box;
      .message {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .line {
          width: 35%;
          height: 1px;
          background-color: #ccc;
          margin-top: 10px;
        }
      }
      .supports {
        padding-left: 10px;
        line-height: 5px;
        font-size: 14px;
        line-height: 30px;
      }
    }
    .detail-bulletin {
      padding: 10px;
      box-sizing: border-box;
      .message {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .line {
          width: 35%;
          height: 1px;
          background-color: #ccc;
          margin-top: 10px;
        }
      }
      .bulletin {
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
  .foot {
    position: absolute;
    width: 95%;
    bottom: 10px;
    z-index: 100;
    background-color: transparent;
  }
}
</style>