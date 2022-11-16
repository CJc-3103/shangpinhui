import { fetchCategory, fetchTopAdList } from '@/api';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [],
    topSmallAd: {},
  },
  getters: {},
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    SET_BANNER_LIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    SET_TOP_SMALL_AD(state, bannerList) {
      state.topSmallAd = bannerList;
    },
  },
  actions: {
    FETCH_CATEGORY_LIST({ commit }) {
      fetchCategory().then((list) => commit('SET_CATEGORY_LIST', list));
    },
    FETCH_TOP_AD({ commit }) {
      fetchTopAdList().then((data) => {
        commit('SET_BANNER_LIST', data.banners);
        commit('SET_TOP_SMALL_AD', data.topSmallAd);
      });
    },
  },
};
