/**
 *
 * @param {*} userRoutes 后台返回的用户实际权限范围
 * @param {*} allRoutes 前端配置好的所有权限
 * @returns realRoutes 过滤后的符合用户权限的实际路由
 */
export function filterRoutes(userRoutes = [], allRoutes = []) {
  let realRoutes = [];
  allRoutes.forEach((route) => {
    userRoutes.forEach((userRoute) => {
      if (userRoute.name === route.meta.name) {
        if (userRoutes.children && userRoutes.children.length > 0) {
          // if (userRoutes?.children?.length > 0) {
          route.children = filterRoutes(userRoute.children, route.children);
        }
        realRoutes.push(route);
      }
    });
  });
  return realRoutes;
}

// 在添加路由配置对象前，先优化配置对象的重定向属性
export function setRedirectRoutes(routes) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      // if (route?.children?.length > 0) {
      // 当前路由拥有子路由时，重定向为第一个子路由
      route.redirect = { name: route.children[0].name };
      setRedirectRoutes(route.children);
    }
  });
}
