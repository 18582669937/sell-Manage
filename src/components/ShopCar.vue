<template>
  <div class="shopCar">
    <div class="Car">
      <div class="face">
        <img src="../assets/imgs/1.png" alt />
        <p class="tell">联系商家</p>
      </div>
      <div class="middle">
        <van-icon
          name="shopping-cart"
          size="40"
          :color="shopCarList_x.length > 0 ? '#FFCA4C' : '#C4C4C4'"
        />
        <div class="text">
          <p class="price">{{totalprice}}</p>
          <p>另需配送费￥4元|支持自取</p>
        </div>
      </div>
      <p
        :class="{total:true,bgcolor:shopCarList_x.length > 0 ?true:false}"
      >{{shopCarList_x.length > 0 ? '去结算':'15元起送'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    shopCarList_x() {
      return this.$store.getters.shopCarList;
    },
    totalprice() {
      let total = 0;
      for (let item of this.shopCarList_x) {
        total += item.num * item.price;
      }
      return total.toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
.bgcolor {
  background-color: #ffca4c;
}
.shopCar {
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 0 10px;
  .Car {
    width: 100%;
    height: 50px;
    background-color: #222222;
    border-radius: 30px;
    display: flex;
    align-items: center;
    .face {
      height: 100%;
      text-align: center;
      border-right: 2px solid #fff;
      padding: 5px 10px;
      box-sizing: border-box;
      img {
        width: 20px;
        height: 20px;
      }

      .tell {
        color: #ccc;
        font-size: 10px;
        line-height: 4px;
      }
    }
    .middle {
      padding-left: 10px;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      align-items: center;
      display: flex;
      .img {
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
        background-color: #323232;
        text-align: center;
        img {
          margin-top: 10px;
          width: 55%;
          height: 55%;
        }
      }
      .text {
        margin-left: 10px;
        color: #ccc;
        font-size: 10px;
        .price {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
    .total {
      width: 80px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      // margin-right: 10px;
      color: #fff;
      margin-right: 0;
      border-radius: 0 30px 30px 0;
    }
  }
  .model {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>