import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { mapState, mapMutations } from '@/utils/store';

// 忽略路由守卫拦截的路由在重复进入相同路由时的报错
// 最好固定以下写法，一旦去掉 catch 方法中的 log 方法就会失败
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  // return originalPush.call(this, location).catch((err) => console.log(err));
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return (
    originalReplace
      .call(this, location)
      // .catch((err) => console.log(err));
      .catch((err) => err)
  );
};

Vue.use(VueRouter);

// 通用的无限制路由去向/来源列表
const globalLimitedToList = ['Home', 'Search', 'Detail', 'Cart'],
  globalLimitedFromList = ['Home', 'Search', 'Detail'];

// 路由静态部分，不受权限影响
const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { requireAuth: false, title: '首页' },
    component: () => import('../layout/TheLayout.vue'),
    children: [
      // 主要模块
      // 首页
      {
        path: '/home',
        name: 'Home',
        meta: {
          hasFooter: true,
          hasCategory: true,
          defaultShowCategory: true,
          hasImportantLink: true,
        },
        component: () => import('@/views/Home/index.vue'),
      },
      // 搜索页
      {
        path: '/search/:keyword?', // 注意这里如果要接收 param 参数，必须写成 “/:参数” 的形式；若参数后加 ? 表示 param 是可选的
        name: 'Search',
        meta: { hasFooter: true, hasCategory: true, hasImportantLink: true },
        // 布尔值写法，route.params 将会被设置为组件属性
        // props: true,
        // 对象写法，传递静态参数
        // props: { newsletterPopup: false }, // 官网示例
        // 函数写法
        props: ({ params: { search }, query: { q } }) => {
          return { search, q };
        },
        component: () => import('@/views/Search/index.vue'),
      },
      // 产品详情
      {
        path: '/detail/:skuId',
        name: 'Detail',
        meta: { hasFooter: true, hasCategory: true, hasImportantLink: true },
        component: () => import('@/views/Detail/index.vue'),
      },
      // 购物车添加结果
      {
        path: '/add-cart-result',
        name: 'AddCartResult',
        meta: { hasFooter: true, hasCategory: true, hasImportantLink: true },
        component: () => import('@/views/AddCartResult/index.vue'),
        beforeEnter: (to, from, next) => {
          // console.log('beforeEnter triggered');
          //#region 思路备注 --

          // 参数  fromRoute, toRoute 变化
          // 1. (fromRoute = undefined, toRoute = undefined) => (fromRoute = 'Detail', toRoute = undefined)
          // 2.
          //    2.1 (fromRoute = 'Detail', toRoute = undefined)
          //    2.2/2.3 (fromRoute = 'Detail', toRoute = undefined) => (fromRoute = 'Detail', toRoute = 'Detail')
          // 3. (fromRoute = 'Detail', toRoute = 'OtherRoute') => (fromRoute = 'OtherRoute', toRoute = 'Detail')
          // 4. (fromRoute = 'OtherRoute', toRoute = 'Detail') => (fromRoute = 'Detail', toRoute = 'OtherRoute')

          // 需要判定以下 4 种情况
          // 1. 若是从特定页面第一次进入，则直接放行：next() ；其他页面一律拒绝：back()
          // 2. 若是从特定页进入后
          //    2.1 back() 到特定页，则不允许再次 forward 进入过渡页，但可以 back ：next(false)
          //    2.2 通过提供的链接跳转到特定页：若选择 back() 或 go(-1)，则后续处理与 2.1 相同；
          //         若选择push 一个新的路由记录，则的后续处理与 2.3 相同
          //    2.3 未通过提供的链接，而是直接覆盖地址跳转到特定页（push 一个新的路由记录），则 back 时返回到特定页的上一页：go(-2)

          // 3. 若是从过渡页离开去往其他页面（不论是通过按钮/链接或是地址栏输入），则返回时，会直接返回到特定页：router.go(-1)
          // 4. 第 3 种情况下，若是再次前往过渡页，则会跳过并导航至之前进入的其他页面：router.go(1)

          //#endregion --

          //#region 不考虑直接修改地址的情况 --
          const { fromRouteName, toRouteName } = mapState(
            store,
            'addCartRouteStatus',
            ['fromRouteName', 'toRouteName', 'fromRoutePath', 'toRoutePath']
          );
          const {
            SET_FROM_ROUTE_NAME: setFromRouteName,
            SET_FROM_ROUTE_PATH: setFromRoutePath,
          } = mapMutations(store, 'addCartRouteStatus', [
            'SET_FROM_ROUTE_NAME',
            'SET_FROM_ROUTE_PATH',
          ]);

          const { isPopStateBack, currentStateKey, resultViewStateKey } =
            mapState(store, 'history', [
              'isPopStateBack',
              'currentStateKey',
              'resultViewStateKey',
            ]);
          const updateCurrentStateKey = () =>
            store.dispatch('history/UPDATE_CURRENT_STATE_KEY');

          if (!fromRouteName) {
            // 情况 1
            if (from.name === 'Detail') {
              // console.log("指定页面首次进入，放行");
              setFromRouteName(from.name);
              setFromRoutePath(from.path);
              next();
            } else {
              // console.log('from 非指定的页面，不允许进入');
              // 禁止进入时最好不要用 next(false)，因为这时导航还是执行了，只是进入后重定向到了原地址，
              // 这会导致禁止的路由成为当前路由的上一个记录，可能导致无法使用 back
              router.back(); // 这里使用 back() 或 go(-1) 都可以
              // router.go(-1);
            }
          } else {
            if (!toRouteName) {
              // 情况 2
              // console.log('进入过渡页后 back 到指定页，拒绝再次进入过渡页');
              router.back();
            } else {
              if (isPopStateBack || currentStateKey === resultViewStateKey) {
                // 情况 3
                console.log('从过渡页离开去往其他页面，back 时，跳过过渡页');
                router.back();
              } else {
                // 情况 4
                console.log(
                  '从其他页面返回至特定页后，再次 forward，跳过过渡页'
                );
                router.forward();
              }
            }
          }
          updateCurrentStateKey();
          //#endregion --

          //#region 考虑可能修改地址栏的情况 --

          // 状态
          // const { fromRouteName, toRouteName, fromRoutePath, toRoutePath } =
          //     mapState(store, 'addCartRouteStatus', [
          //         'fromRouteName',
          //         'toRouteName',
          //         'fromRoutePath',
          //         'toRoutePath',
          //     ]);
          // const { isPopStateBack, currentStateKey, resultViewStateKey } =
          //     mapState(store, [
          //         'isPopStateBack',
          //         'currentStateKey',
          //         'resultViewStateKey',
          //     ]);
          // // 函数
          // const {
          //     SET_FROM_ROUTE_NAME: setFromRouteName,
          //     SET_TO_ROUTE_NAME: setToRouteName,
          //     SET_FROM_ROUTE_PATH: setFromRoutePath,
          //     SET_TO_ROUTE_PATH: setToRoutePath,
          // } = mapMutations(store, 'addCartRouteStatus', [
          //     'SET_FROM_ROUTE_NAME',
          //     'SET_TO_ROUTE_NAME',
          //     'SET_FROM_ROUTE_PATH',
          //     'SET_TO_ROUTE_PATH',
          // ]);
          // const updateCurrentStateKey = () =>
          //     store.dispatch('UPDATE_CURRENT_STATE_KEY');

          // if (!fromRouteName) {
          //     // 情况 1
          //     if (from.name === 'Detail') {
          //         // console.log("指定页面首次进入，放行");
          //         setFromRouteName(from.name);
          //         setFromRoutePath(from.path);
          //         next();
          //     } else {
          //         // console.log('from 非指定的页面，不允许进入');
          //         router.back();
          //     }
          // } else {
          //     if (!toRouteName) {
          //         // 情况 2
          //         // console.log('进入过渡页后 back 到指定页，拒绝再次进入过渡页');
          //         router.back();
          //     } else {
          //         if (isPopStateBack || currentStateKey === resultViewStateKey) {
          //             // 情况 3
          //             // console.log('从过渡页离开去往其他页面，back 时，跳过过渡页');
          //             router.back();
          //         } else {
          //             // 情况 4
          //             // console.log(
          //             //     '从其他页面返回至特定页后，再次 forward，跳过过渡页'
          //             // );
          //             router.forward();
          //         }
          //     }
          // }
          // updateCurrentStateKey();
          //#endregion --
        },
      },
      // 购物车
      {
        path: '/cart',
        name: 'Cart',
        meta: { hasFooter: true, hasCategory: true, hasImportantLink: true },
        component: () => import('@/views/Cart/index.vue'),
      },
      // 交易
      {
        path: '/trade',
        name: 'Trade',
        meta: { hasFooter: true, hasImportantLink: true },
        component: () => import('@/views/Trade/index.vue'),
        beforeEnter: (to, from, next) => {
          if (from.name === 'Cart') {
            next();
          } else {
            next(false);
          }
        },
      },
      // 支付
      {
        path: '/pay',
        name: 'Pay',
        meta: { hasFooter: true, hasImportantLink: true },
        component: () => import('@/views/Pay/index.vue'),
        beforeEnter: (to, from, next) => {
          if (from.name === 'Trade') {
            next();
          } else {
            next(false);
          }
        },
      },
      // 支付成功
      {
        path: '/payment-success',
        name: 'PaymentSuccess',
        meta: { hasFooter: true, hasImportantLink: true },
        component: () => import('@/views/PaymentSuccess/index.vue'),
        beforeEnter: (to, from, next) => {
          if (from.name === 'Pay') {
            next();
          } else {
            next(false);
          }
        },
      },
      // 个人中心
      {
        path: '/customer-center',
        name: 'CustomerCenter',
        redirect: { name: 'MyOrder' },
        meta: { hasFooter: true, hasImportantLink: true, notOnlyMain: true },
        component: () => import('@/views/CustomerCenter/index.vue'),
        children: [
          // 我的订单
          {
            path: 'my-order',
            name: 'MyOrder',
            meta: { hasFooter: true, hasImportantLink: true },
            component: () =>
              import('@/views/CustomerCenter/components/MyOrder.vue'),
          },
        ],
      },
      // 登录
      {
        path: '/login',
        name: 'Login',
        meta: { hasFooter: true },
        props: (route) => {
          let params = route.params,
            query = route.query; // 这里不能解构 route 对象，否则拿不到值
          const redirect = query.redirect;
          Reflect.deleteProperty(query, 'redirect'); // 原本的 query 对象不带 redirect 属性，因此需要删除
          return { redirect, params, query };
        },
        component: () => import('@/views/Login/index.vue'),
      },
      // 注册
      {
        path: '/register',
        name: 'Register',
        meta: { hasFooter: true },
        component: () => import('@/views/Register/index.vue'),
      },
      // 异常页面
      {
        path: '/403',
        name: '403',
        meta: {},
        component: () => import('@/views/errors/403.vue'),
      },
      {
        path: '/404',
        name: '404',
        meta: {},
        component: () => import('@/views/errors/404.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.baseURL,
  routes,
  // 返回顶部
  scrollBehavior() {
    return { y: 0 };
  },
});

export default router;
