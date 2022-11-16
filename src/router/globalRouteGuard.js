import router from './router';
import store from '@/store/index';
import whiteList from './whiteList';

/* 导航守卫规则：
1. 登录状态判定
    1.1 未登录
        1.1.1 允许的页面：cart, addCartResult, login, register
        1.1.2 禁止的页面：trade
    1.2 已登录
        1.2.1 允许的页面：cart, addCartResult, trade
        1.2.2 禁止的页面: login, register
2. 全局白名单 home, search, detail, errors

*/

router.beforeEach((to, from, next) => {
  if (!store.state.user.token) {
    // 未登录
    if (
      to.matched.length > 0 &&
      to.matched.some((record) => whiteList.includes(record.path))
    ) {
      // 该路由不要求用户登录，或已打开登录页，继续导航至 to.path
      next();
    } else {
      // 用户未登录，且目标路由不在白名单中，重定向至登录页
      next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  } else {
    // 已登录
    if (!['/login', './register'].includes(to.path)) {
      // 已登录，且目标路由不是登录或注册页，继续导航至 to.path
      next();
    } else {
      // 登录后不允许进入登录页或注册页
      if (from.fullPath == '' || from.fullPath == '/') {
        // 用户已登录，重定向至首页
        next({ name: 'Home' });
      } else {
        next(from.fullPath);
      }
    }
  }
});
