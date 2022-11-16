import Vue from 'vue';
// 按需导入 element 组件
import { MessageBox, } from 'element-ui';

Vue.prototype.$alert = MessageBox.alert;