# shangpinhui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## description

这是“shangpinhui”项目的练习 Demo，

以下是与原版的差异：
- 借用了 element-ui 对 BEM 规范的实现来构造 css 的选择器，避免嵌套层级过深：
  - 每个页面作为最上层模块，拥有独立的模块命名，其下要么是以模块名为前缀的 Element ，要么是嵌套在根选择器之下的 Block，避免样式冲突
  - 优化了部分 mixins ：when() 和 pseudo() 原本不支持分组选择器参数，优化后改成与 e() 和 m() 一样支持分组，方便批量设置相同的样式
- 对常用业务组件进行封装：
  - Section 布局组件（SectionGroup、SectionItem）：SectionGroup 是全屏等宽容器，SectionItem 是固定宽度容器 1200px
  - 产品组件（sphProductGroup、SphProductItem）：包括产品主图、标题、价格、额外取（加购、收藏等）
  - 猜你喜欢（TheLike）：由于该组件没有相应的后端接口，因此只是 mock 了一些数据（详情页是6个产品，个人中心-我的订单页是4个产品）
- 对部分基础组件进行封装（组件只添加了最核心的布局样式，其他样式包括颜色、字体、字号、间距、尺寸等都是在业务组件中添加，因为各组件在不同模块中使用时很少有全局通用的样式）。其中，部分组件为了方便开发，使用了 render 函数或 jsx 编写模板
  - 分页器：Pagination
  - 表单：Form/FormItem（验证没问题，但验证通过或失败时，FormItem 上的 is-error 类是反的，也就是通过时反而会显示验证失败的提示
  - 最基本的输入组件：Input/Checkbox，只实现了最核心的双向绑定和表单验证事件分发两大功能
  - 卡片：Card
  - 单选组：RadioList/RadioItem，常用于各类 Nav、Tab 的选中
  - 标签页：Tab/TabItem（头部位置嵌套了上述单选组组件，避免重复开发相同功能）
  - 排序条：SortTab/SortTabItem
  - 标签：Tag
  - 图片放大器：Zoom
  - 轮播图：Swiper（基于 Swiper.js 的简单封装）
- 对部分业务逻辑进行封装：
  - 搜索模块中，“视图层-数据层-路由层-请求层” 的数据流向优化：/mixins/common/searchParams ，该封装是通用的，不止适用于搜索模块，其他具有相同多层级数据流向开发需求的模块都可以使用或借鉴
  - 监听浏览器用户的前进后退，并在路由导航守卫中应用：/store/modules/history
- 一些通用工具的封装（以下功能可以自己封装，也可以使用现成的工具库）：
  - vuex 状态持久化：/utils/storage/backupState
  - 类型校验：css 值类型校验，js 数据类型校验
  - 自定义指令 directives：v-permission、v-lazy-load
  - 自定义混入 mixins：主要是上面提到的 searchPrams
  - 自定义过滤器 filters：currency，全局导入（除了部分使用 jsx 编写的组件需要调用函数外，在业务组件中使用时，基本都是通过管道操作符在 template 中直接插入）