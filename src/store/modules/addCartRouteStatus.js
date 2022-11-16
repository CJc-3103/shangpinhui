export default {
  namespaced: true,
  state: {
    fromRouteName: '',
    toRouteName: '',
    fromRoutePath: '',
    toRoutePath: '',
  },
  getters: {},
  mutations: {
    SET_FROM_ROUTE_NAME(state, name) {
      state.fromRouteName = name;
    },
    SET_TO_ROUTE_NAME(state, name) {
      state.toRouteName = name;
    },
    SET_FROM_ROUTE_PATH(state, path) {
      state.fromRoutePath = path;
    },
    SET_TO_ROUTE_PATH(state, path) {
      state.toRoutePath = path;
    },
  },
  actions: {
    CLEAR_FROM_ROUTE_NAME({ commit }) {
      commit('SET_FROM_ROUTE_NAME', '');
    },
    CLEAR_TO_ROUTE_NAME({ commit }) {
      commit('SET_TO_ROUTE_NAME', '');
    },
    CLEAR_FROM_ROUTE_PATH({ commit }) {
      commit('SET_FROM_ROUTE_PATH', '');
    },
    CLEAR_TO_ROUTE_PATH({ commit }) {
      commit('SET_TO_ROUTE_PATH', '');
    },
    CLEAR_ALL_ROUTE({ dispatch }) {
      dispatch('CLEAR_FROM_ROUTE_NAME');
      dispatch('CLEAR_TO_ROUTE_NAME');
      dispatch('CLEAR_FROM_ROUTE_PATH');
      dispatch('CLEAR_TO_ROUTE_PATH');
    },
  },
};
