//#region 导入三方依赖 --
import Vue from 'vue';
import '@/plugins';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment';
//#endregion --

//#region 导入本地依赖 --

// 注册 vue 的全局过滤器、指令、组件
import '@/filters';
import '@/directives';
import '@/components';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
//#endregion --

// 引入 mock.js 的数据
import '@/mock';
// 初始化
import { recoverGlobalStateLocal } from '@/utils/storage/backupState/backupGlobalState';
recoverGlobalStateLocal(); // 刷新后，先从本地备份恢复状态
// 初始化路由历史监听
store.dispatch('history/INIT_HISTORY');

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Fragment.Plugin);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
