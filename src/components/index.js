import Vue from 'vue';

import { SphSectionGroup, SphSectionItem } from './globals/SphSection';

const components = {
  SphSectionGroup,
  SphSectionItem,
};

export default components;

// 注册失败，找不到组件
Vue.use({
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, Vue.extend(components[key]));
    });
    // 第二种形式
    // Object.values(components).forEach((component) => {
    //   Vue.component(component.name, component);
    // });
  },
});
