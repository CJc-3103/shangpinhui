export const isEmpty = function (val) {
  console.log('val', val);
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  // 注意这里 0 是 false
  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const isArray = (arr) => {
  return Array.isArray(arr);
};

export const isPrimitive = (value) => {
  if (
    value == null ||
    ['number', 'boolean'].includes(typeof value) ||
    Object.prototype.toString.call(value) === '[object String]'
  ) {
    return true;
  }
  return false;
};
