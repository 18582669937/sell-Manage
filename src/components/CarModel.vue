<template>
  <div class="car">
    <div class="car_model"></div>
    <div class="shop">
      <div class="delete">
        <p>购物车</p>
        <span @click="delBtn()">清空购物车</span>
      </div>
      <ul class="food-content">
        <li v-for="(v,index) in shopCarList_x" :key="index">
          <img :src="v.imgUrl" alt />
          <div class="dec">
            <p class="name">{{v.name}}</p>
            <div class="price">
              <p>
                ￥{{v.price}}
                <del>￥24.8</del>
              </p>
              <p>
                <span class="red" @click="clickAdd(-1,v.id)">-</span>
                <span class="vnum">{{v.num}}</span>
                <span class="add" @click="clickAdd(1,v.id)">+</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {};
  },
  computed: {
    shopCarList_x() {
      return this.$store.getters.shopCarList;
    },
  },
  methods: {
    CarBtn() {
      this.Car = false;
    },
    clickAdd(num, id) {
      this.$store.commit("changeNum", { num, id });
    },
    delBtn() {
      Dialog.confirm({
        title: "清空购物车",
        // message: "弹窗内容",
      })
        .then(() => {
          this.$store.commit("alterNum");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  height: 100%;
  position: relative;
  .car_model {
    width: 100%;
    height: 90%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    right: 0;
  }
  .shop {
    width: 100%;
    // height: 200px;
    padding-bottom: 60px;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    bottom: 0px;
    .delete {
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
    .food-content {
      li {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        img {
          width: 80px;
          height: 80px;
          border-radius: 3px;
        }
        .dec {
          width: 100%;
          margin-left: 10px;
          .name {
            font-weight: bold;
            font-size: 14px;
          }
          .goodsDesc {
            font-size: 11px;
            color: #888;
            margin-top: 5px;
            width: 190px;
            // height: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .month {
            margin-top: 5px;
            font-size: 10px;
            color: #888;
          }

          .price {
            width: 100%;
            margin-top: 15px;
            color: #ff4a34;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            .vnum {
              margin: 0 8px;
            }
            del {
              font-size: 10px;
              color: #888;
              font-weight: normal;
            }
            .red {
              display: inline-block;
              font-size: 16px;
              text-align: center;
              width: 20px;
              height: 20px;
              border: 1px solid #ccc;
              border-radius: 50% 50%;
              color: #ccc;
            }
            .add {
              display: inline-block;
              font-size: 16px;
              text-align: center;
              width: 20px;
              height: 20px;
              border: 1px solid #ffc300;
              background-color: #ffc300;
              color: #000;
              line-height: 20px;
              border-radius: 50% 50%;
            }
          }
        }
      }
    }
  }
}
</style>