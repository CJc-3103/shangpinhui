<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>
import 'animate.css';
// 样式
import '@/styles/index.scss';
import { setGlobalStateLocal } from '@/utils/storage/backupState/backupGlobalState';

export default {
  name: 'App',
  created() {
    // 刷新前备份
    window.addEventListener('beforeunload', () => setGlobalStateLocal());
  },
};
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
