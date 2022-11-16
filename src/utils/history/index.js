export function isPopStateBack(currentStateKey, newStateKey) {
  if (isNaN(newStateKey)) return false; // 地址栏输入时会触发 pushState 新增历史记录，但 state 为 null
  return currentStateKey > newStateKey;
}
