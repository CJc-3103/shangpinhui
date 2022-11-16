const digitsRegex = /(d{3})(?=d)/g;
/**
 * value  金额
 * currency 货币符号
 * decimals  保留位数
 */
function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency ?? '￥';
  decimals = parseInt(decimals);
  decimals = isNaN(decimals) ? 2 : decimals < 0 ? 2 : decimals;
  // 小数格式化
  const stringified = Math.abs(value).toFixed(decimals);
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  // 千分位格式化
  const i = _int.length % 3;
  // 整数部分的千分位格式化
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  // 小数部分的千分位格式化
  const _float = decimals ? stringified.slice(-1 - decimals) : '';
  // 正负数格式化
  const sign = value < 0 ? '-' : '';
  return (
    sign + currency + head + _int.slice(i).replace(digitsRegex, '$1,') + _float
  );
}

export default currency;
