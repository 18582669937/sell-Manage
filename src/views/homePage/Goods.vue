<template>
  <div class="goods">
    <div class="left">
      <div>
        <keep-alive>
          <ul class="item-ul">
            <li
              v-for="(item,index) in goodsList_x"
              :key="item.name"
              :class="{order_left_box: true , selected: curtabindex == index}"
              @click="clickTab(index)"
            >{{item.name}}</li>
          </ul>
        </keep-alive>
      </div>
    </div>
    <div class="right">
      <div>
        <div class="content" v-for="(item,index) in goodsList_x" :key="index" :id="index">
          <h1 class="title">{{item.name}}</h1>
          <ul class="food-content">
            <li v-for="(v,index) in item.foods" :key="index">
              <img :src="v.imgUrl" alt @click="ListBtn(v.id)" />
              <div class="dec">
                <div @click="ListBtn(v.id)">
                  <p class="name">{{v.name}}</p>
                  <p class="goodsDesc">{{v.goodsDesc}}</p>
                  <p class="month">月售{{v.sellCount}}份&nbsp;好评率{{v.rating}}%</p>
                </div>
                <div class="price">
                  <p>
                    ￥{{v.price}}
                    <del>￥24.8</del>
                  </p>
                  <p>
                    <span class="red" v-show="v.num>0" @click="clickAdd(-1,v.id)">-</span>
                    <span v-show="v.num>0" class="vnum">{{v.num}}</span>
                    <span class="add" @click="clickAdd(1,v.id)">+</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Goods } from "@/api/apis";
export default {
  data() {
    return {
      foods: [],
      goods: [],
      curtabindex: 0,
    };
  },
  methods: {
    clickTab(index) {
      // 保存点击的索引
      this.curtabindex = index;

      //点击某个选项卡,则让右侧滚动到对应的div上
      //crollToElement(el, time, offsetX, offsetY, easing)
      // el 滚动到的目标元素
      this.rightScroll.scrollToElement(document.getElementById(index), 600);
    },
    ListBtn(id) {
      // this.$router.push({ name: "shopdetail", params: v });
      localStorage.setItem("id", id);
      this.$router.push("/shopdetail");
    },
    clickAdd(num, id) {
      this.$store.commit("changeNum", { num, id });
    },
  },
  created() {
    Goods().then((res) => {
      //往对象里面添加
      for (let obj of res.data.goodsList) {
        for (let item of obj.foods) {
          item.num = 0;
        }
      }
      console.log(res.data.goodsList);

      //初始化vuex数据
      this.$store.commit("initgoodslist", res.data.goodsList);
    });
  },
  mounted() {
    new BScroll(".left", { click: true });
    this.rightScroll = new BScroll(".right", {
      click: true, //允许滚动面板点击
      probeType: 3, //实时派发滚动事件
    });
    // console.log(this.rightScroll);
    this.rightScroll.on("scroll", (obj) => {
      // _y当前滚动距离
      let _y = Math.abs(obj.y);
      console.log(_y);
      // 循环判断区间值， 设置选项卡选中索引
      for (let obj of this.getdivarr) {
        if (_y >= obj.startY && _y < obj.endY) {
          this.curtabindex = obj.index;
          break;
        }
      }
    });
  },
  computed: {
    getdivarr() {
      // [189, 105, 525, 315, 525, 315, 567, 609, 882, 357]
      // 0-189   0
      // 189-294 1
      // 294-819 2

      // 之前div高度总和 -  (之前div高度总和+自己的高度)   当前div索引
      // {startY:  endY:  index:  }
      let total = 0;
      let arr = [];
      for (let i = 0; i < this.goodsList_x.length; i++) {
        let curdivHeight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: curdivHeight, index: i });
        total += curdivHeight;
      }
      return arr;
    },
    //从vuex里面获取数据goodslist
    goodsList_x() {
      return this.$store.state.goodsList;
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100% !important;
  // overflow-y: scroll;
  overflow: hidden;
  .left {
    width: 80px;
    overflow-y: scroll;
    height: 100%;
    font-size: 14px;
    background: #f5f5f5;
    padding-bottom: 50px;
    box-sizing: border-box;
    .order_left_box {
      font-size: 14px;
      padding: 10px 10px 20px 10px;
    }
    .selected {
      background-color: #fff;
    }
    // .item-ul {
    //   li {
    //     padding: 20px 10px;
    //     box-sizing: border-box;
    //     background-color: #f7f8fa;
    //     &.active {
    //       background-color: #fff;
    //     }
    //   }
    // }
  }
  .right {
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 50px;
    box-sizing: border-box;
    width: 100%;
    .content {
      width: 100%;
      height: 100%;
      .title {
        width: 100%;
        background-color: #f7f8fa;
        font-size: 14px;
        font-weight: normal;
        height: 30px;
        line-height: 30px;
        padding: 0 0 0 10px;
        box-sizing: border-box;
      }
      .food-content {
        li {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          img {
            width: 100px;
            height: 100px;
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
              margin-top: 5px;
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
}
</style>