<template>
  <div class="ratings">
    <!-- 评分 -->
    <div class="score">
      <div class="left">
        <p class="p1">3.9</p>
        <p class="p2">综合评分</p>
        <p class="p3">高于周边商家69.2%</p>
      </div>
      <div class="right">
        <p>
          <span>服务态度</span>
          <van-rate
            class="star"
            v-model="value1"
            :size="15"
            allow-half
            void-icon="star"
            color="#fe9900"
            void-color="#eee"
            readonly
          />
          <span class="num">4.5</span>
        </p>
        <p>
          <span>服务态度</span>
          <van-rate
            class="star"
            v-model="value2"
            :size="15"
            allow-half
            void-icon="star"
            color="#fe9900"
            void-color="#eee"
            readonly
          />
          <span class="num">3.9</span>
        </p>
        <p class="time">
          送达时间
          <span>44分钟</span>
        </p>
      </div>
    </div>
    <!-- 全部 满意 不满意 -->
    <div class="all">
      <van-tabs type="card" color="#FFC300">
        <van-tab :title="'全部'+ratings.length">
          <div class="content" v-for="(item,index) in ratings" :key="index">
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
        <van-tab :title="'满意'+satisfy.length">
          <div class="content" v-for="(item,index) in satisfy" :key="index">
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
              <span class="detime">{{item.deliveryTime}}</span>
              <p class="text">{{item.text}}</p>
              <span class="recommend" v-for="v in item.recommend" :key="v">{{v}}</span>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'不满意'+unsatisfy.length">
          <div class="content" v-for="(item,index) in unsatisfy" :key="index">
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
              <span class="detime">{{item.deliveryTime}}</span>
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
import { Ratings } from "@/api/apis";
import { getChinatime } from "@/utils/date";
export default {
  data() {
    return {
      value1: 4,
      value2: 3,
      /* 复选框 */
      checked: false,
      ratings: [],
      satisfy: [],
      unsatisfy: [],
    };
  },
  async created() {
    let res = await Ratings();
    for (let obj of res.data.data) {
      obj.rateTime = getChinatime(new Date(obj.rateTime));
    }
    console.log(res.data.data);
    this.ratings = res.data.data;
    this.satisfy = res.data.data.filter((item) => item.score > 3);
    this.unsatisfy = res.data.data.filter((item) => item.score <= 3);
  },
};
</script>

<style lang="less" scoped>
.ratings {
  .score {
    font-size: 10px;
    display: flex;
    padding: 20px 0;
    box-sizing: border-box;

    .left {
      text-align: center;
      flex: 2;
      border-right: 1px solid #ccc;
      .p1 {
        font-size: 24px;
        color: #fe9900;
      }
      .p2 {
        margin-top: 8px;
      }
      .p3 {
        margin-top: 8px;
        font-size: 10px;
        color: #ccc;
      }
    }
    .right {
      margin-left: 20px;
      flex: 4;
      line-height: 25px;
      .star {
        margin: 0 15px;
      }
      .num {
        color: #fe9900;
      }
      .time {
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
  .all {
    width: 100%;
    height: 100%;
    border-top: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    .content {
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
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