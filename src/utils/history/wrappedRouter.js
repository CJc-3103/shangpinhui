import router from '@/router/router';
import store from '@/store';

// 包装所有路由操作，执行后将路由记录同步给 store 中的 history 数组，并同步更新 currentHistoryId
// const updateHistory = (history) => store.dispatch('history/UPDATE_HISTORY_RECORD',history);
// const updateCurrentHistory = (historyId) => store.dispatch('history/SET_CURRENT_HISTORY',historyId);

const history = {
  get() {
    return store.state.history.history;
  },
  set(history) {
    store.dispatch('history/UPDATE_HISTORY_RECORD', history);
  },
};
const currentHistoryId = {
  get() {
    return store.state.history.currentHistoryId;
  },
  set(historyId) {
    store.dispatch('history/SET_CURRENT_HISTORY', historyId);
  },
};

const isHistoryIdValid = (historyId) =>
  historyId > 0 && historyId < history.length;

export function wrappedPush(location) {
  router.push(location);
  //   updateHistory(location.path);
  //   const historyId = store.state.history.history.length +1;
  //   updateCurrentHistory(historyId);
  let tempHistory = [].concat(history);
  tempHistory.push(location.path);
  history = tempHistory;
  currentHistoryId = history.length + 1;
}
export function wrappedReplace(location) {
  router.replace(location);
  //   updateHistory(location.path);
  let tempHistory = [].concat(history);
  tempHistory[tempHistory.length] = location.path;
  history = tempHistory;
}
export function wrappedGo(steps) {
  router.go(steps);
  //   const historyId = store.state.history.currentHistoryId + steps;
  //   if(historyId>0 && historyId < store.state.history.history.length) {
  //     updateCurrentHistory(historyId);
  //   }
  const historyId = currentHistoryId + steps;
  if (isHistoryIdValid(historyId)) {
    currentHistoryId = historyId;
  }
}
export function wrappedBack() {
  router.back();
  const historyId = currentHistoryId - 1;
  if (isHistoryIdValid(historyId)) {
    currentHistoryId = historyId;
  }
}
export function wrappedForward() {
  router.forward();
  const historyId = currentHistoryId + 1;
  if (isHistoryIdValid(historyId)) {
    currentHistoryId = historyId;
  }
}
