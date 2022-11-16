// 模糊匹配，返回布尔值（-1表示未找到）
export function fuzzyMatch(keyword, fromStr) {
  let reg = new RegExp(keyword);
  return fromStr.search(reg) > -1;
  //   return fromStr.search(/keyword/iu) > -1;
}
