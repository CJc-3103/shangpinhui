// 将多条件对应相同返回值的对象反向转换成一对一映射的对象
export function transOpsObj(options) {
  let newOptions = {};
  for (const action in options) {
    options[action].forEach((condition) => (newOptions[condition] = action));
  }
  return newOptions;
}

export function transOpsMap(options) {
  let newOptions = new Map();
  for (const [action, conditions] of [...options.entries()]) {
    conditions.forEach((condition) => newOptions.set(condition, action));
  }
  return newOptions;
}
