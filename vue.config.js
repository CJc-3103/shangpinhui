const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  productionSourceMap: false, // 不输出 .js.map 文件
  // 无法在独立的 .scss 文件中使用，只适用于组件
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       // 全局引入变量和 mixin
  //       prependData: `
  //         @import "~@/styles/common/vars.scss";
  //         @import "~@/styles/modules/bem-mixins.scss";
  //         @import "~@/styles/modules/vars.scss";
  //       `,
  //     },
  //   },
  // },
  transpileDependencies: true,
  lintOnSave: false,
  // 切换到官方服务器
  devServer: {
    proxy: {
      api: {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
});
