import Mock from 'mockjs';
// 导入mock数据

const mock = (url, respond) => Mock.mock(`/mock/api${url}`, respond);

//#region 首页 --
import topAds from './home/topAd.json';
import recommends from './home/recommends.json';
import ranks from './home/ranks.json';
import homeLikes from './home/likes.json';
import floors from './home/floors.json';
import brands from './home/brands.json';

mock('/top_ad', { code: 200, data: topAds });
mock('/recommend', { code: 200, data: recommends });
mock('/rank', { code: 200, data: ranks });
mock('/like', { code: 200, data: homeLikes });
mock('/floor', { code: 200, data: floors });
mock('/brand', { code: 200, data: brands });
//#endregion --

//#region 搜索页 --
import selectors from './search/selectors.json';

mock('/search_selector', { code: 200, data: selectors });

import pager from './search/pager.json';

mock('/search_pager', { code: 200, data: pager });
//#endregion --

//#region 购物车 --

import carts from './cart/carts.json';

mock('/cart/cartList', { code: 200, data: carts });

//#endregion --

//#region 交易 --

import tradeInfo from './trade/tradeInfo.json';
import addressees from './user/addressees.json';

tradeInfo.userAddressList = addressees[0].addresseeList;

mock('/order/auth/trade', { code: 200, data: tradeInfo });

//#endregion --

//#region 支付 --

mock('/payment/weixin/createNative', {
  code: 200,
  data: { total: '17654', payUrl: 'weixin://wxpay/bizpayurl?pr=ZuHaocUzz' },
});

mock('/payment/weixin/queryPayStatus', { code: 200, data: { code: '200' } });

//#endregion --

//#region 详情 --

import detail from './item/detail.json';

mock('/item', { code: 200, data: detail });

//#endregion --

//#region 各页面的推荐 --

// 搜索
import searchRecommends from './recommend/search.json';

mock('/recommend/hotSale', { code: 200, data: searchRecommends });

import likes from './recommend/likes.json';

mock('/recommend/like/6', { code: 200, data: likes });

let smallLies = likes.slice(0, 4);
mock('/recommend/like/4', { code: 200, data: smallLies });

import related from './recommend/related.json';

mock('/recommend/related', { code: 200, data: related });
//#endregion --
