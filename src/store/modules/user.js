import uuidToken from '@/storage/uuid';
import { login, logout } from '@/api';

export default {
  namespaced: true,
  state: {
    ...uuidToken,
    token: '',
    userName: '',
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
    },
  },
  actions: {
    LOGIN({ commit }, query) {
      return new Promise((res, rej) => {
        login(query)
          .then((data) => {
            // 不知道为什么 set 方法不能自动生效，手动也不行，只能先用 resource-manager 里的全局备份方法了
            commit('SET_TOKEN', data.token);
            commit('SET_USER_NAME', data.nickName);
            res(data);
          })
          .catch((err) => rej(err));
      });
    },
    LOGOUT({ commit }) {
      return logout().then(() => {
        commit('SET_TOKEN', '');
        commit('SET_USER_NAME', '');
      });
    },
  },
};
