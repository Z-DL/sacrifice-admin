// import Vue from 'vue'
// import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
// // in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

// /* layout */
// import Layout from '../views/layout/Layout'

// Vue.use(Router)

// /* 
// * terminal:首页、商户管理、商品、投诉管理、认证审核、成交订单审核
// * temporary:首页、商户认证
// * agents:首页、商户认证（该菜单名变成“更改商户认证”)、商户信息、发布商品、出售中的商品、仓库中的商品、已卖出的商品、评价管理
// * 临时：xXzRg97h，38696824
// * 代理：tieshiganggongmu，123456
// * admin，admin
// */

// /**
//  * icon : the icon show in the sidebar
//  * hidden : if `hidden:true` will not show in the sidebar
//  * redirect : if `redirect:noredirect` will not redirct in the levelbar
//  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
//  * meta : `{ role: ['admin'] }`  will control the page role
//  **/
// export const constantRouterMap = [
//   { path: '/login', component: _import('login/index'), hidden: true },
//   { path: '/404', component: _import('404'), hidden: true },
// ]

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// export const asyncRouterMap = [
//   {
//     path: '/example',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'Example',
//     icon: 'zujian',
//     children: [
//       { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
//     ]
//   },
//   {
//     path: '/table',
//     component: Layout,
//     redirect: '/table/index',
//     icon: 'tubiao',
//     noDropdown: true,
//     children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     name: '首页',
//     noDropdown: true,
//     children: [{ path: 'dashboard', name: 'dashboard', component: _import('dashboard/index'), meta: { role: ['admin'] } }]
//   },
//   {
//     path: '/merchantAuth',
//     component: Layout,
//     name: '设置',
//     icon: 'zujian',
//     children: [
//       {
//         path: 'index',
//         component: _import('authentication/merchantAuth'),
//         name: '商户认证',
//         meta: { title: '商品认证', role: ['admin'] }
//       },
//       {
//         path: 'sellerInfo',
//         component: _import('authentication/sellerInfo'),
//         name: '商户信息',
//         meta: { title: '商户信息', role: ['admin'] }
//       }
//     ]
//   },
//   {
//     path: '/goods',
//     component: Layout,
//     redirect: 'noredirect',
//     name: '商品',
//     icon: 'zujian',
//     children: [
//       { path: 'publish', name: '发布商品', icon: 'zonghe', component: _import('goods/publishGoods'), meta: { role: ['admin'] }},
//       { path: 'sell', name: '出售中的商品', icon: 'zonghe', component: _import('goods/sellGoods') , meta: { role: ['agents'] }},
//       { path: 'entrepot', name: '仓库中的商品', icon: 'zonghe', component: _import('goods/entrepotGoods') , meta: { role: ['admin'] }},
//     ]
//   },
//   {
//     path: '/transaction',
//     component: Layout,
//     name: '交易管理',
//     icon: 'zujian',
//     children: [
//       {path: 'order', name: '订单管理', icon: 'zonghe', component: _import('transaction/order')},
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]
