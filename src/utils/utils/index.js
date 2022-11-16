export const noop = () => {};

/**
 * 获取嵌套对象中的 {对象，键，值}
 * @param {源对象} obj
 * @param {通过.分隔的字符串类型的 key 路径} path
 * @param {严格模式，} strict
 */
export function getNestedObjByPath(obj, path, strict) {
  let tempObj = obj,
    key = path;
  if (key === '') {
    console.warn('[Component Warn][FormItem] object key path is empty');
  } else {
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyList = path.split('.');
    for (let i = 0, len = keyList.length; i < len - 1; ++i) {
      if (!tempObj && !strict) break;
      let key = keyList[i];
      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        if (strict) {
          throw new Error('please transfer a valid object key path!');
        }
        break;
      }
    }
  }
  return {
    o: tempObj,
    k: key,
    v: tempObj ? tempObj[key] : null,
  };
}

export function isObjEmpty(obj, strict = false) {
  if (!strict) {
    return !obj; // {} return true; null return false
  }
  // lodash.isEmpty 无法排除对象有属性，但属性值为空的情况
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function isArrayEmpty(arr) {
  return !(arr && arr instanceof Array && arr.length > 0);
}
