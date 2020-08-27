import axios from 'axios'

// const IP = "http://127.0.0.1:5000"
const IP = "http://172.16.15.138:5000"
axios.defaults.baseURL = IP


/* 获取商家 */
export var Seller = () => axios.get('/shop/seller')
/* 获取商品数据 */
export var Goods = () => axios.get('/goods/goods_list')
/* 获取评价数据 */
export var Ratings = () => axios.get('/shop/ratings')