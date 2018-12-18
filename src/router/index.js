import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/orderDetail', component: _import('transaction/orderDetail'), hidden: true},
  {
    path: '/index',
    component: Layout,
    // redirect: '/dashboard',
    name: '首页',
    icon: 'zujian',
    noDropdown: true,
    // component: _import('dashboard/index')
    // hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index'), name: '首页' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/merchantAuth',
    component: Layout,
    name: '设置',
    icon: 'zujian',
    meta: { role: ['temporary', 'agents'] },
    children: [
      {
        path: 'index',
        component: _import('authentication/merchantAuth'),
        name: '商户认证',
        meta: { role: ['temporary', 'agents'] }
      },
      {
        path: 'sellerInfo',
        component: _import('authentication/sellerInfo'),
        name: '商户信息',
        meta: { role: ['agents'] }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    name: '商品',
    icon: 'zujian',
    meta: { role: ['agents'] },
    children: [
      { path: 'publish', name: '发布商品', icon: 'zonghe', component: _import('goods/publishGoods'), meta: { role: ['agents'] } },
      { path: 'sell', name: '出售中的商品', icon: 'zonghe', component: _import('goods/sellGoods') , meta: { role: ['agents'] }},
      { path: 'entrepot', name: '仓库中的商品', icon: 'zonghe', component: _import('goods/entrepotGoods'),meta: { role: ['agents'] } },
    ]
  },
  {
    path: '/transaction',
    component: Layout,
    name: '交易管理',
    icon: 'zujian',
    meta: { role: ['agents'] },
    children: [
      { path: 'order', name: '订单管理', icon: 'zonghe', component: _import('transaction/orderList'), meta: { role: ['agents'] }},
      { path: 'score', name: '评价管理', icon: 'zonghe', component: _import('transaction/score'), meta: { role: ['agents'] }}
    ]
  },
  {
    path: '/manage',
    component: Layout,
    name: '管理',
    icon: 'zujian',
    meta: { role: ['terminal'] },
    children: [
      { path: 'classify', name: '分类管理', icon: 'zonghe', component: _import('manage/classify'), meta: { role: ['terminal'] }},
      { path: 'commercialTenant', name: '商户管理', icon: 'zonghe', component: _import('manage/commercialTenant'), meta: { role: ['terminal'] }},
      { path: 'news', name: '新闻管理', icon: 'zonghe', component: _import('manage/news'), meta: { role: ['terminal'] }},
      { path: 'publish', name: '发布新闻', icon: 'zonghe', component: _import('manage/newsPublish'), meta: { role: ['terminal'] }},
      { path: 'complaints', name: '投诉管理', icon: 'zonghe', component: _import('manage/complaints'), meta: { role: ['terminal'] }}
    ]
  },
  {
    path: '/verify',
    component: Layout,
    name: '审核',
    icon: 'zujian',
    meta: { role: ['terminal'] },
    children: [
      { path: 'authentication', name: '认证审核', icon: 'zonghe', component: _import('verify/authentication'), meta: { role: ['terminal'] } },
      { path: 'orders', name: '提交订单审核', icon: 'zonghe', component: _import('verify/orders'), meta: { role: ['terminal'] } }
    ]
  },
  {
    path: '/website',
    component: Layout,
    name: '网站详情修改',
    icon: 'zujian',
    meta: { role: ['terminal'] },
    children: [
      { path: 'connection', name: '修改联系方式', icon: 'zonghe', component: _import('website/connection'), meta: { role: ['terminal'] } },
      { path: 'index', name: '首页详情', icon: 'zonghe', component: _import('website/index'), meta: { role: ['terminal'] } },
      { path: 'join', name: '加盟页详情', icon: 'zonghe', component: _import('website/join'), meta: { role: ['terminal'] } },
      { path: 'company', name: '公司页面详情', icon: 'zonghe', component: _import('website/company'), meta: { role: ['terminal'] } }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    name: '认证文件上传',
    noDropdown: true,
    icon: 'zonghe',
    children: [
      { path: 'authentication', name: '认证文件上传', icon: 'zonghe', component: _import('upload/authentication'), meta: { role: ['terminal'] } }
    ],
    meta: { role: ['terminal'], noCache: true }
  },
  { path: '*', redirect: '/404', hidden: true }
]
