import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
// import uuidToken from '@/storage/uuid'
// import token from '@/storage/token';
// import userName from '@/storage/userName';
// import { login, logout } from '@/api';
// import { isPopStateBack } from '@/utils/history';
// import user from '@/utils/storage/user';

// 热更新所有模块
// function loadModules() {
//   const context = require.context('./modules', false, /([a-z_]+)\.js$/i);

//   const modules = context
//     .keys()
//     .map((key) => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
//     .reduce(
//       (modules, { key, name }) => ({
//         ...modules,
//         // [name]: context(key),
//         [name]: context(key).default,
//       }),
//       {}
//     );

//   return { context, modules };
// }

// const { context, modules } = loadModules();

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
});

// if (module.hot) {
//   // 在任何模块发生改变时进行热重载。
//   module.hot.accept(context.id, () => {
//     const { modules } = loadModules();

//     store.hotUpdate({
//       modules,
//     });
//   });
// }

export default store;

// const crateStore = () => {
//   const store = new Vuex.Store({
//     // state: {
//     //   ...uuidToken,
//     //   token: '',
//     //   userName: '',
//     //   // ...token,
//     //   // ...userName,
//     //   // ...user.userName,

//     //   // 路由状态监听
//     //   // hasPopStateListener: false,
//     //   // stagedStateKey: 0, // 刷新时缓存最新的 key，重新载入时加上缓存值
//     //   // currentStateKey: 0,
//     //   // tempCurrentStateKey: 0,
//     //   // resultViewStateKey: 0,
//     //   // isPopStateBack: false,
//     //   // currentHistory: -1,
//     //   // history: [],
//     // },
//     // getters: {},
//     // mutations: {
//     //   SET_TOKEN(state, token) {
//     //     state.token = token;
//     //   },
//     //   SET_USER_NAME(state, userName) {
//     //     state.userName = userName;
//     //   },
//     //   // SET_HISTORY(state, history) {
//     //   //   state.history = history;
//     //   // },
//     //   // SET_CURRENT_HISTORY(state, historyId) {
//     //   //   state.currentHistory = historyId;
//     //   // },
//     //   // SET_POP_STATE_LISTENER(state, hasPopStateListener) {
//     //   //   state.hasPopStateListener = hasPopStateListener;
//     //   // },
//     //   // SET_POP_STATE(state, isPopStateBack) {
//     //   //   state.isPopStateBack = isPopStateBack;
//     //   // },
//     //   // SET_CURRENT_STATE_KEY(state, stateKey) {
//     //   //   state.currentStateKey = stateKey;
//     //   // },
//     //   // SET_TEMP_CURRENT_STATE_KEY(state, stateKey) {
//     //   //   state.tempCurrentStateKey = stateKey;
//     //   // },
//     //   // SET_RESULT_VIEW_STATE_KEY(state, stateKey) {
//     //   //   state.resultViewStateKey = stateKey;
//     //   // },
//     //   // SET_STAGED_STATE_KEY(state, stateKey) {
//     //   //   state.stagedStateKey = stateKey;
//     //   // },
//     // },
//     // actions: {
//     //   LOGIN({ commit }, query) {
//     //     return new Promise((res, rej) => {
//     //       login(query).then((data) => {
//     //         // 不知道为什么 set 方法不能自动生效，手动也不行，只能先用 resource-manager 里的全局备份方法了
//     //         commit('SET_TOKEN', data.token);
//     //         commit('SET_USER_NAME', data.nickName);
//     //         res(data);
//     //       }).catch(err => rej(err));
//     //     })
//     //   },
//     //   LOGOUT({ commit }) {
//     //     return logout().then(() => {
//     //       commit('SET_TOKEN', '');
//     //       commit('SET_USER_NAME', '');
//     //     })
//     //   },
//     //   // INIT_POS_STATE({ commit }) {
//     //   //   commit('SET_POP_STATE', false);
//     //   //   commit('SET_CURRENT_STATE_KEY', 0);
//     //   // },
//     //   // IS_POP_STATE_BACK({ commit, state }, newStateKey) {
//     //   //   let result = isPopStateBack(state.tempCurrentStateKey, newStateKey)
//     //   //   commit('SET_POP_STATE', result)
//     //   //   commit('SET_TEMP_CURRENT_STATE_KEY', newStateKey)
//     //   // },
//     //   // UPDATE_CURRENT_STATE_KEY({ commit, state }) {
//     //   //   commit('SET_CURRENT_STATE_KEY', state.tempCurrentStateKey)
//     //   // },
//     //   // SET_HISTORY_RECORD({ state, commit }, stateId, stateKey) {
//     //   //   let history = [...state.history];
//     //   //   if (stateId <= history.length) {
//     //   //     history[stateId] = stateKey;
//     //   //   } else {
//     //   //     history.push(stateKey);
//     //   //   }
//     //   //   commit('SET_HISTORY', history)
//     //   // },
//     //   // START_POP_STATE_LISTENER({ state, commit, dispatch }) {
//     //   //   if (!state.hasPopStateListener) {
//     //   //     dispatch('INIT_POS_STATE');
//     //   //     // 程序运行期间不会重新添加监听器，因此可以不必 remove
//     //   //     //   而且， removeEventListener 要求所传的函数对象必须与  addEventListener 引用内存中的同一个函数，那么就不能使用匿名函数
//     //   //     //   而此处需要给回调函数传入 event 和 state/dispatch ，要么像下面这样在匿名函数内部直接通过闭包引用，或者通过匿名函数包装一层，并在内部的实际处理函数调用时传入参数，而不论哪一种都与上述要求冲突了
//     //   //     // window.addEventListener('popstate', popStateHandler(state, dispatch));
//     //   //     window.addEventListener('popstate', function (event) {
//     //   //       console.log(window.history);
//     //   //       // popstate 事件比路由的进入和离开更早被触发
//     //   //       // console.log('popstate triggered');
//     //   //       // const StateKey = +event.state.key;
//     //   //       const StateKey = +window.history.state.key;
//     //   //       const fromRouteName = state.addCartRouteStatus.fromRouteName,
//     //   //         toRouteName = state.addCartRouteStatus.toRouteName;
//     //   //       dispatch('IS_POP_STATE_BACK', StateKey);
//     //   //       if (fromRouteName === 'Detail' && toRouteName === 'Detail') {
//     //   //         dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_NAME');
//     //   //         dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_PATH');
//     //   //       }
//     //   //     });
//     //   //     commit('SET_POP_STATE_LISTENER', true);
//     //   //   }
//     //   // },
//     //   // STOP_POP_STATE_LISTENER({ commit, dispatch }) {
//     //   //   dispatch('INIT_POS_STATE');
//     //   //   // window.removeEventListener('popstate', popStateHandler);
//     //   //   commit('SET_POP_STATE_LISTENER', false);
//     //   // },
//     // },
//     modules: modules,
//   });

//   if (module.hot) {
//     module.hot.accept(['./module'], () => {
//       const modules = require('./module').default;

//       store.hotUpdate({
//         modules
//       })
//     })
//   }

//   return store;
// }

// export default crateStore();

// export default new Vuex.Store({
//   state: {
//     ...uuidToken,
//     token: '',
//     userName: '',
//     // ...token,
//     // ...userName,
//     // ...user.userName,

//     // 路由状态监听
//     // hasPopStateListener: false,
//     // stagedStateKey: 0, // 刷新时缓存最新的 key，重新载入时加上缓存值
//     // currentStateKey: 0,
//     // tempCurrentStateKey: 0,
//     // resultViewStateKey: 0,
//     // isPopStateBack: false,
//     // currentHistory: -1,
//     // history: [],
//   },
//   getters: {},
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token;
//     },
//     SET_USER_NAME(state, userName) {
//       state.userName = userName;
//     },
//     // SET_HISTORY(state, history) {
//     //   state.history = history;
//     // },
//     // SET_CURRENT_HISTORY(state, historyId) {
//     //   state.currentHistory = historyId;
//     // },
//     // SET_POP_STATE_LISTENER(state, hasPopStateListener) {
//     //   state.hasPopStateListener = hasPopStateListener;
//     // },
//     // SET_POP_STATE(state, isPopStateBack) {
//     //   state.isPopStateBack = isPopStateBack;
//     // },
//     // SET_CURRENT_STATE_KEY(state, stateKey) {
//     //   state.currentStateKey = stateKey;
//     // },
//     // SET_TEMP_CURRENT_STATE_KEY(state, stateKey) {
//     //   state.tempCurrentStateKey = stateKey;
//     // },
//     // SET_RESULT_VIEW_STATE_KEY(state, stateKey) {
//     //   state.resultViewStateKey = stateKey;
//     // },
//     // SET_STAGED_STATE_KEY(state, stateKey) {
//     //   state.stagedStateKey = stateKey;
//     // },
//   },
//   actions: {
//     LOGIN({ commit }, query) {
//       return new Promise((res, rej) => {
//         login(query).then((data) => {
//           // 不知道为什么 set 方法不能自动生效，手动也不行，只能先用 resource-manager 里的全局备份方法了
//           commit('SET_TOKEN', data.token);
//           commit('SET_USER_NAME', data.nickName);
//           res(data);
//         }).catch(err => rej(err));
//       })
//     },
//     LOGOUT({ commit }) {
//       return logout().then(() => {
//         commit('SET_TOKEN', '');
//         commit('SET_USER_NAME', '');
//       })
//     },
//     // INIT_POS_STATE({ commit }) {
//     //   commit('SET_POP_STATE', false);
//     //   commit('SET_CURRENT_STATE_KEY', 0);
//     // },
//     // IS_POP_STATE_BACK({ commit, state }, newStateKey) {
//     //   let result = isPopStateBack(state.tempCurrentStateKey, newStateKey)
//     //   commit('SET_POP_STATE', result)
//     //   commit('SET_TEMP_CURRENT_STATE_KEY', newStateKey)
//     // },
//     // UPDATE_CURRENT_STATE_KEY({ commit, state }) {
//     //   commit('SET_CURRENT_STATE_KEY', state.tempCurrentStateKey)
//     // },
//     // SET_HISTORY_RECORD({ state, commit }, stateId, stateKey) {
//     //   let history = [...state.history];
//     //   if (stateId <= history.length) {
//     //     history[stateId] = stateKey;
//     //   } else {
//     //     history.push(stateKey);
//     //   }
//     //   commit('SET_HISTORY', history)
//     // },
//     // START_POP_STATE_LISTENER({ state, commit, dispatch }) {
//     //   if (!state.hasPopStateListener) {
//     //     dispatch('INIT_POS_STATE');
//     //     // 程序运行期间不会重新添加监听器，因此可以不必 remove
//     //     //   而且， removeEventListener 要求所传的函数对象必须与  addEventListener 引用内存中的同一个函数，那么就不能使用匿名函数
//     //     //   而此处需要给回调函数传入 event 和 state/dispatch ，要么像下面这样在匿名函数内部直接通过闭包引用，或者通过匿名函数包装一层，并在内部的实际处理函数调用时传入参数，而不论哪一种都与上述要求冲突了
//     //     // window.addEventListener('popstate', popStateHandler(state, dispatch));
//     //     window.addEventListener('popstate', function (event) {
//     //       console.log(window.history);
//     //       // popstate 事件比路由的进入和离开更早被触发
//     //       // console.log('popstate triggered');
//     //       // const StateKey = +event.state.key;
//     //       const StateKey = +window.history.state.key;
//     //       const fromRouteName = state.addCartRouteStatus.fromRouteName,
//     //         toRouteName = state.addCartRouteStatus.toRouteName;
//     //       dispatch('IS_POP_STATE_BACK', StateKey);
//     //       if (fromRouteName === 'Detail' && toRouteName === 'Detail') {
//     //         dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_NAME');
//     //         dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_PATH');
//     //       }
//     //     });
//     //     commit('SET_POP_STATE_LISTENER', true);
//     //   }
//     // },
//     // STOP_POP_STATE_LISTENER({ commit, dispatch }) {
//     //   dispatch('INIT_POS_STATE');
//     //   // window.removeEventListener('popstate', popStateHandler);
//     //   commit('SET_POP_STATE_LISTENER', false);
//     // },
//   },
//   modules: modules,
// });
