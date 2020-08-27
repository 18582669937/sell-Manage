<template>
  <div class="detail">
    <div class="img">
      <img :src="goods.imgUrl" alt />
    </div>
    <p @click="returnBtn()" class="return">
      <van-icon name="arrow-left" />商品详情
    </p>
    <!-- <van-nav-bar left-text="商品详情" left-arrow @click-left="onClickLeft" /> -->
    <div class="content">
      <h1>{{goods.name}}</h1>
      <p class="sell">月售{{goods.sellCount}}份 好评率{{goods.rating}}%</p>
      <div class="price">
        <p class="price_num">
          <span class="price_label">￥</span>
          {{goods.price}}
          <del>￥90</del>
        </p>
        <div class="car">
          <span class="iconfont icon-huabanfuben"></span>
          <span>加入购物车</span>
        </div>
      </div>
    </div>
    <div class="ccc"></div>
    <!-- 商品介绍 -->
    <div class="introduce">
      <h1>商品介绍</h1>
      <p class="intro">{{goods.goodsDesc}}</p>
    </div>
    <div class="ccc"></div>
    <!-- 全部 满意 不满意 -->
    <div class="all">
      <van-tabs type="card" color="#FFC300">
        <van-tab title="全部">
          <div class="content" v-for="(item,index) in goods.ratings" :key="index">
            <img :src="item.avatar" alt />
            <div class="right_content">
              <p class="name">
                <span class="username">{{item.username}}</span>
                <span class="time">{{item.rateTime}}</span>
              </p>
              <van-rate
                v-model="item.score"
                :size="15"
                allow-half
                void-icon="star"
                color="#fe9900"
                void-color="#eee"
                readonly
              />
              <span class="detime">{{item.deliveryTime}}分钟送达</span>
              <p class="text">{{item.text}}</p>
              <span class="recommend" v-for="v in item.recommend" :key="v">{{v}}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Goods } from "@/api/apis";
import { getChinatime } from "@/utils/date";
export default {
  data() {
    return {
      goods: {},
    };
  },
  created() {
    // console.log(this.$route.params.v);
    Goods().then((res) => {
      console.log(res.data.goodsList);
      let arr = res.data.goodsList;
      for (let obj of arr) {
        for (let item of obj.foods) {
          if (item.id == localStorage.id) {
            this.goods = item;
            console.log(this.goods);
            break;
          }
        }
      }
      /* 处理时间 */
      for (let obj of this.goods.ratings) {
        obj.rateTime = getChinatime(new Date(obj.rateTime));
      }
    });
  },
  methods: {
    // returnBtn() {
    //   this.$router.go(-1);
    // },
    returnBtn() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  flex-direction: column;
  position: relative;
  .return {
    padding: 8px;
    position: absolute;
    width: 100%;
    top: 0;
    border-bottom: transparent;
    background-color: transparent;
  }
  .img {
    flex: 0 0 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    background-color: #fff;
    padding: 20px 20px;
    box-sizing: border-box;
    h1 {
      // margin-top: 20px;
      font-size: 24px;
    }
    .sell {
      color: #888;
      margin-top: 5px;
    }
    .price {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price_num {
        color: red;
        font-size: 24px;
        font-weight: bold;
        .price_label {
          font-size: 14px;
        }
        del {
          font-size: 14px;
          color: #888;
        }
      }
      .car {
        padding: 10px;
        border-radius: 20px;
        box-sizing: border-box;
        background-color: #ffc300;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          margin-right: 5px;
          font-size: 20px;
          color: #000;
        }
      }
    }
  }
  .ccc {
    width: 100%;
    height: 25px;
    background-color: #f4f5f7;
  }
  .introduce {
    padding: 20px;
    h1 {
      font-size: 22px;
      font-weight: normal;
    }
    .intro {
      padding: 20px 0 0 0;
    }
  }
  .all {
    width: 100%;
    height: 100%;
    // border-top: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    .content {
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      // border-bottom: 1px solid #ccc;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50% 50%;
        background-color: pink;
      }
      .right_content {
        margin-left: 15px;
        flex: 1;
        .name {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .username {
            font-weight: bold;
            // font-size: 16px;
          }
          .time {
            color: #888;
            font-size: 14px;
          }
        }
        .detime {
          font-size: 14px;
          color: #888;
        }
        .text {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .recommend {
          font-size: 10px;
          color: #888;
          display: inline-block;
          border: 1px solid #888;
          padding: 2px;
          box-sizing: border-box;
          margin-right: 10px;
          margin-bottom: 5px;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>