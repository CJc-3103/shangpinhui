import Vue from 'vue';

import permission from './permission';
import lazyLoad from './lazyLoad';

const directives = {
  permission,
  lazyLoad,
};
// 若默认导出一个对象，对象需包含 install 方法。内部通过循环遍历 directives，并通过 vue.directive 批量注册指令
// export default {
//     install(Vue) {
//         Object.keys(directives).forEach(key => {
//             Vue.directive(key, directives[key])
//         })
//     }
// }

export default directives;

Vue.use({
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
});
