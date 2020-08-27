import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import ShopDetail from '@/views/ShopDetail'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'default',
        component: () => import('@/views/homePage/Goods')
      },
      {
        path: '/ratings',
        component: () => import('@/views/homePage/Ratings')
      },
      {
        path: '/seller',
        component: () => import('@/views/homePage/Seller')
      }

    ]
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    component: ShopDetail,
  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
