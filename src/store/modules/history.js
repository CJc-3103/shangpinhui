import { isPopStateBack } from '@/utils/history';

export default {
  namespaced: true,
  state: {
    //
    hasPopStateListener: false, // 避免重复添加事件监听器
    currentStateKey: 0, // 最新触发的 popState 事件中获取的值
    tempCurrentStateKey: 0, // 当需要在导航守卫中更新 currentStateKey 值时，先暂存在这里
    resultViewStateKey: 0, // 离开过渡页时，根据是后退还是前进，保存一个在 currentStateKey 值基础上 -1 或 +1 的值
    // stagedStateKey: 0, // 刷新时缓存最新的 key，重新载入时加上缓存值
    // 历史记录（暂未使用）
    isPopStateBack: false,
    currentHistoryId: -1,
    history: [],
  },
  getters: {},
  mutations: {
    SET_HISTORY(state, history) {
      state.history = history;
    },
    SET_CURRENT_HISTORY(state, historyId) {
      state.currentHistoryId = historyId;
    },
    SET_POP_STATE_LISTENER(state, hasPopStateListener) {
      state.hasPopStateListener = hasPopStateListener;
    },
    SET_POP_STATE(state, isPopStateBack) {
      state.isPopStateBack = isPopStateBack;
    },
    SET_CURRENT_STATE_KEY(state, stateKey) {
      state.currentStateKey = stateKey;
    },
    SET_TEMP_CURRENT_STATE_KEY(state, stateKey) {
      state.tempCurrentStateKey = stateKey;
    },
    SET_RESULT_VIEW_STATE_KEY(state, stateKey) {
      state.resultViewStateKey = stateKey;
    },
    // SET_STAGED_STATE_KEY(state, stateKey) {
    //   state.stagedStateKey = stateKey;
    // },
    // IS_POP_STATE_BACK({ commit, state }, newStateKey) {
    //   let result = isPopStateBack(state.tempCurrentStateKey, newStateKey);
    //   commit('SET_POP_STATE', result);
    //   commit('SET_TEMP_CURRENT_STATE_KEY', newStateKey);
    // },
  },
  actions: {
    INIT_POP_STATE({ commit }) {
      commit('SET_POP_STATE', false);
      commit('SET_CURRENT_STATE_KEY', 0);
    },
    UPDATE_CURRENT_STATE_KEY({ commit, state }) {
      commit('SET_CURRENT_STATE_KEY', state.tempCurrentStateKey);
    },
    UPDATE_HISTORY_RECORD({ commit, state }, newRoute) {
      // let history = commit('SET_CURRENT_STATE_KEY', state.tempCurrentStateKey);
    },
    INIT_HISTORY({ commit, dispatch }) {
      commit('SET_HISTORY', []);
      commit('SET_CURRENT_HISTORY', -1);
      dispatch('INIT_POP_STATE');
      dispatch('STOP_POP_STATE_LISTENER');
      dispatch('START_POP_STATE_LISTENER');
    },
    SET_HISTORY_RECORD({ state, commit }, stateId, stateKey) {
      let history = [...state.history];
      if (stateId <= history.length) {
        history[stateId] = stateKey;
      } else {
        history.push(stateKey);
      }
      commit('SET_HISTORY', history);
    },
    START_POP_STATE_LISTENER({ state, rootState, commit, dispatch }) {
      if (!state.hasPopStateListener) {
        // dispatch('INIT_POP_STATE');
        // 程序运行期间不会重新添加监听器，因此可以不必 remove
        //   而且， removeEventListener 要求所传的函数对象必须与  addEventListener 引用内存中的同一个函数，那么就不能使用匿名函数
        //   而此处需要给回调函数传入 event 和 state/dispatch ，要么像下面这样在匿名函数内部直接通过闭包引用，或者通过匿名函数包装一层，并在内部的实际处理函数调用时传入参数，而不论哪一种都与上述要求冲突了
        // window.addEventListener('popstate', popStateHandler(state, dispatch));
        window.addEventListener('popstate', function (event) {
          // popstate 事件比路由的进入和离开更早被触发
          // console.log('popstate triggered');
          // const StateKey = +event.state.key;
          // const { stateKey } = +window.history?.state;
          const stateKey = +window.history?.state?.key;
          const fromRouteName = rootState.addCartRouteStatus.fromRouteName,
            toRouteName = rootState.addCartRouteStatus.toRouteName;
          // commit('IS_POP_STATE_BACK', stateKey);
          let result = isPopStateBack(state.tempCurrentStateKey, stateKey);
          commit('SET_POP_STATE', result);
          commit(
            'SET_TEMP_CURRENT_STATE_KEY',
            isNaN(stateKey) ? state.tempCurrentStateKey + 1 : stateKey
          );

          if (fromRouteName === 'Detail' && toRouteName === 'Detail') {
            dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_NAME', undefined, {
              root: true,
            });
            dispatch('addCartRouteStatus/CLEAR_TO_ROUTE_PATH', undefined, {
              root: true,
            });
          }
        });
        commit('SET_POP_STATE_LISTENER', true);
      }
    },
    STOP_POP_STATE_LISTENER({ commit, dispatch }) {
      // dispatch('INIT_POP_STATE');
      // window.removeEventListener('popstate', popStateHandler);
      commit('SET_POP_STATE_LISTENER', false);
    },
  },
};
