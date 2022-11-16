import { isObjEmpty } from '@/utils/utils';

const searchParamsMixins = {
  methods: {
    //#region 工具 --
    // params 或 query 对象可能有属性，但值为空，所以还需要额外判断
    isEmpty(obj) {
      return isObjEmpty(obj);
    },
    //#endregion --

    //#region 路由参数处理 --
    // 用户操作视图后，调用事件处理器方法，获取更新
    // 将更新的内容以特定格式传入处理方法，转化为新的路由参数对象，并 push 到路由器对象
    // watch 侦听路由对象，一旦改变，立即获取路由中的参数，自动生成 API 参数并请求服务器

    /* 参数示例：
     * 全保留 { queryChanges: 'allReserve', paramsChanges: 'allReserve' }
     * 只保留 query 或 只保留 params，保留的给一个 'allReserve'，清空的给 undefined 或不给
     * 全清空 {}
     * 对 query 或 params 单独增、删、改，保留的参数给一个 'allReserve'，要增加的参数的属性直接给值，删除的给 undefined，修改的也是直接给值
     */

    /**
     *
     * @param {从路由对象获取旧的参数} oldParams
     * @param {根据用户输入，生成参数的更新值（不是完整的新参数）} paramsChanges
     * @param {参数的默认值，可选} defaultParams
     * @returns 返回更新后的完整 query 或 params 对象，用于路由显示参数
     */
    handleUpdateParams(oldParams, paramsChanges, defaultParams = {}) {
      let newParams = {}; // paramsChanges === undefined
      if (paramsChanges === 'allReserve') {
        newParams = oldParams;
      } else if (!this.isEmpty(paramsChanges)) {
        newParams = Object.assign({}, oldParams);
        for (const key in paramsChanges) {
          // 将同名参数重置为初始值
          if (Object.hasOwnProperty.call(paramsChanges, key)) {
            if (
              Object.hasOwnProperty.call(oldParams, key) &&
              paramsChanges[key] === undefined
            ) {
              newParams[key] = defaultParams?.[key]
                ? defaultParams[key]
                : undefined;
            } else {
              newParams[key] = paramsChanges[key];
            }
            // 假性值统一转化为 undefined ，避免将假性值传递给路由对象而导致跳转失败
            if (!newParams[key]) newParams[key] = undefined;
          }
        }
      }
      return newParams;
    },
    /**
     *
     * @param {查询组件在 router 中定义的 name} SearchRouterCompoName
     * @param {$route 对象中 query 和 params 对象的属性的变化} changes
     */
    handleUpdateRouteParams(
      SearchRouterCompoName,
      { queryChanges, paramsChanges }
    ) {
      if (SearchRouterCompoName) {
        let location = { name: SearchRouterCompoName };
        let newQuery = this.handleUpdateParams(this.$route.query, queryChanges),
          newParams = this.handleUpdateParams(
            this.$route.params,
            paramsChanges
          );
        // console.log('newParams', newParams)
        if (!this.isEmpty(newQuery)) location.query = newQuery;
        if (!this.isEmpty(newParams)) location.params = newParams;
        this.$router.push(location);
      }
    },
    //#endregion --

    //#region 生成请求参数 --
    // 为了确保在请求之前获取到最新的路由参数，此处通过方法在请求函数前同步执行，而不是通过计算属性获取
    setupSearchParams(route) {
      return Object.assign({}, route.params, route.query);
    },
    //#endregion --
  },
};

export default searchParamsMixins;
