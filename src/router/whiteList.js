// 注意这里的搜索页路径，必须与 routes 中定义的完全一致，而不是 /search
const whiteList = ['/403', '/404', '/login', '/register', '/home', '/search/:keyword?', '/detail/:skuId'];
export default whiteList;