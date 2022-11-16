import http from './http';
import httpMock from './httpMock';
import store from '@/store';

//#region 账号 --

// 登录
export function login(query) {
  return http.post('/user/passport/login', query);
}

// 获取验证码
export function getCode(phone) {
  return http.get(`/user/passport/sendCode/${phone}`);
}

// 注册
export function register(query) {
  return http.post(`/user/passport/register`, query);
}

// 获取用户信息
export function getUserInfo(params) {
  return http.get('/user/passport/auth/getUserInfo');
}

// 获取权限
export function fetchPermission() {
  return http.get('/permission?user=' + store.state.token);
}

// 退出
export function logout() {
  return http.get('user/passport/logout');
}

//#endregion --

//#region 通用 --

// 获取三级联动菜单
export function fetchCategory() {
  return http.get('/product/getBaseCategoryList');
}

//#endregion --

//#region 首页 --

// 获取首页第一屏广告资源，包括轮播图和右侧生活服务下的小幅广告
export function fetchTopAdList() {
  return httpMock.get('/top_ad');
}

// 获取推荐列表
export function fetchRecommendList() {
  return httpMock.get('/recommend');
}

// 获取排行列表
export function fetchRankList() {
  return httpMock.get('/rank');
}

// 获取猜你喜欢列表
export function fetchLikeList() {
  return httpMock.get('/like');
}

// 获取首页楼层
export function fetchFloorList() {
  return httpMock.get('/floor');
}

// 获取底部品牌列表
export function fetchBrandList() {
  return httpMock.get('/brand');
}

//#endregion --

//#region 搜索页 --

// 获取搜索结果
export function fetchSearchList(params = {}) {
  return http.post('/list', params);
}

// 获取筛选选项
export function fetchSearchSelectorList() {
  return httpMock.get('/search_selector');
}

// 测试 pager 功能
export function fetchPager() {
  return httpMock.get('/search_pager');
}

//#endregion --

//#region 详情页 --

// 获取商品详情
export function fetchProductDetail(skuId) {
  return http.get(`/item/${skuId}`);
}

// 获取详情底部数据
export function fetchProductDetailedDetail(skuId) {
  return httpMock.get(`/item`);
}

//#endregion --

//#region 购物车 --

// 添加到购物车
export function addToCart(skuId, skuNum) {
  return http.post(`/cart/addToCart/${skuId}/${skuNum}`);
}

// 获取购物车列表
export function fetchCartList() {
  // return http.get('/cart/cartList');
  return httpMock.get('/cart/cartList');
}

// 切换商品选中状态
export function changeProductChecked(skuId, isChecked) {
  return http.get(`/cart/checkCart/${skuId}/${+isChecked}`);
}
// 批量选择或不选的接口，若后端未提供特定接口的，可以在 API 层通过已有接口模拟，但不应在视图层模拟
export function bulkChangeProductChecked(skuIdList, isAllChecked) {
  const promises = skuIdList.map((skuId) =>
    changeProductChecked(skuId, isAllChecked)
  );
  console.log('promises', promises);
  return Promise.all(promises);
}

// 删除商品
export function deleteProduct(skuId) {
  return http.delete(`/cart/deleteCart/${skuId}`);
}
// 批量删除
export function bulkDeleteProduct(skuIdList) {
  const promises = skuIdList.map((skuId) => deleteProduct(skuId));
  return Promise.all(promises);
}

// 添加到收藏
export function addToCollection(skuId) {
  return http.get(`/collect/${skuId}`);
}

// 商品
export function removeOffStock(skuId) {
  return http.get(`/cart/removeOffStock/${skuId}`);
}

//#endregion --

//#region 交易(下单) --
// 获取收件人
export function fetchAddresseeList() {
  return http.get(`/user/userAddress/auth/findUserAddressList`);
}

// 获取将要生成的订单
export function fetchTradeInfo() {
  // return http.get(`/order/auth/trade`);
  return httpMock.get(`/order/auth/trade`);
}

// 提交订单
export function submitOrder(tradeNo, data) {
  return http.get(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
}

//#endregion --

//#region 支付 --

export function fetchPayInfo() {
  return httpMock.get(`/payment/weixin/createNative`);
  // return httpMock.get(`/payment/weixin/createNative/${orderId}`)
}

export function fetchPaymentStatus(orderId) {
  return httpMock.get(`/payment/weixin/queryPayStatus`);
  // return httpMock(`/payment/weixin/queryPayStatus/${orderId}`)
}

//#endregion --

//#region 个人中心 --

// 获取订单
export function fetchOrderList(page, limit) {
  return http.get(`/order/auth/${page}/${limit}`);
}

//#endregion --

//#region 各页面的推荐 --
// 搜索
export function fetchHotSaleRecommendList() {
  return httpMock.get(`/recommend/hotSale`);
}
// 个人中心猜你喜欢
export function fetchLikeRecommendList(productCount) {
  return httpMock.get(`/recommend/like/${productCount}`);
}

// 详情页相关推荐
export function fetchRelatedList() {
  return httpMock.get(`/recommend/related`);
}

//#endregion --
