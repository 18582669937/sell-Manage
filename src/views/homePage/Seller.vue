<template>
  <div class="seller">
    <!-- 店铺 费用 -->
    <div class="store-fell">
      <div class="about">
        <div class="left">
          <div class="name">{{seller.name}}</div>
          <div class="score">
            <p class="star">
              <van-rate
                v-model="value1"
                :size="15"
                readonly
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
            </p>
            <p class="star-de">(661)</p>
            <p class="star-de">月售690单</p>
          </div>
        </div>
        <div class="right">
          <van-rate v-model="value2" icon="like" void-icon="like-o" :count="1" />
          <p style="font-size:10px">已收藏</p>
        </div>
      </div>
      <div class="message">
        <div class="message1">
          <p class="title">起送价</p>
          <p class="price">
            20
            <span>元</span>
          </p>
        </div>
        <div class="message2">
          <p class="title">商家配送</p>
          <p class="price">
            4
            <span>元</span>
          </p>
        </div>
        <div class="message3">
          <p class="title">平均配送时间</p>
          <p class="price">
            39
            <span>元</span>
          </p>
        </div>
      </div>
    </div>
    <div class="ccc"></div>
    <!-- 公告与活动 -->
    <div class="bulletin-active">
      <div class="active">
        <h2>公告与活动</h2>
        <p class="bulletin">{{seller.bulletin}}</p>
      </div>
      <p class="supports" v-for="item in seller.supports" :key="item">{{item}}</p>
    </div>
    <div class="ccc"></div>
    <!-- 商家实景 -->
    <div class="pics">
      <h2>商家实景</h2>
      <div class="img">
        <div v-for="pic in seller.pics" :key="pic" class="pic">
          <img width="50" height="50" :src="pic" alt />
        </div>
      </div>
    </div>
    <div class="ccc"></div>
    <!-- 商家信息 -->
    <div class="store-message">
      <h2>公告与活动</h2>
      <p class="store-message1">该商家支持开发票，请在下单时填好发票抬头</p>
      <p class="store-message2">品类：其他菜系，包子粥店</p>
      <p>地址：北京市。。。。。。</p>
      <p v-if="seller.date">营业时间：{{seller.date[0]}}-{{seller.date[1]}}</p>
    </div>
  </div>
</template>

<script>
import { getChinatime } from "@/utils/date";
import { Seller } from "@/api/apis";
export default {
  data() {
    return {
      seller: {},
      value1: 3,
      value2: 1,
    };
  },
  async created() {
    let res = await Seller();
    console.log(res.data.data);
    this.seller = res.data.data;
    this.seller.date[0] = getChinatime(res.data.data.date[0]);
    this.seller.date[1] = getChinatime(res.data.data.date[1]);
  },
};
</script>

<style lang="less" scoped>
.seller {
  .store-fell {
    padding: 0 20px;
    .about {
      padding: 20px 0 20px 0px;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px solid #ccc;
      .left {
        flex: 4;
        .score {
          display: flex;
          padding-top: 10px;
          box-sizing: border-box;
          .star {
            display: inline-block;
          }
          .star-de {
            // margin-top: 4px;
            display: inline-block;
            font-size: 10px;
            margin-left: 10px;
          }
        }
      }
      .right {
        text-align: center;
        flex: 1;
        justify-self: flex-end;
        p {
          margin-top: 5px;
        }
      }
    }
    .message {
      display: flex;
      justify-content: space-around;
      padding: 20px 0 20px 0;
      .message1,
      .message2 {
        border-right: 1px solid #ccc;
      }
      .message1,
      .message2,
      .message3 {
        flex: 1;
        text-align: center;
        .title {
          font-size: 12px;
          color: #999;
        }
        .price {
          margin-top: 5px;
          font-size: 22px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  .ccc {
    height: 30px;
    background-color: #f4f5f7;
    // border-bottom: 1px solid #ccc;
    // border-top: 1px solid #ccc;
  }
  .bulletin-active {
    padding: 0 20px;
    .active {
      padding: 15px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      h2 {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .bulletin {
        margin-left: 15px;
        font-size: 14px;
        color: brown;
        line-height: 20px;
      }
    }
    .supports {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
    }
  }

  .pics {
    padding: 20px 0 20px 20px;
    h2 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .img {
      display: flex;
      width: 60px;
    }
  }
  .store-message {
    padding: 0 15px;
    h2 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      border-top: 1px solid #ccc;
      line-height: 40px;
      font-size: 14px;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
}
</style>