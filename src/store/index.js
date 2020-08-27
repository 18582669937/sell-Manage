import Vue from 'vue'
import Vuex from 'vuex'

//在当前vue项目用Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  //状态：要交互的数据
  state: {
    goodsList: []
  },
  //改变，改变state值的唯一方式//初始化购物车数据
  mutations: {
    initgoodslist(state, newarr) {
      state.goodsList = newarr
    },
    changeNum(state, params) {
      for (let obj of state.goodsList) {
        for (let item of obj.foods) {
          if (item.id == params.id) {
            item.num += params.num
            return
          }
        }
      }
    },
    alterNum(state) {
      for (let obj of state.goodsList) {
        for (let item of obj.foods) {
          item.num = 0
        }
      }
    }
  },
  getters: {
    shopCarList(state) {
      let arr = []
      for (let obj of state.goodsList) {
        for (let item of obj.foods) {
          if (item.num > 0) {
            arr.push(item)
          }
        }
      }
      return arr
    }
  },
  actions: {
  },
  modules: {
  }
})
