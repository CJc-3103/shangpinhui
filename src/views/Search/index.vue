<template>
  <SphSectionGroup class="sph-search-main">
    <!-- 搜索条件 -->
    <SphSectionItem class="sph-search-main__breadcrumb">
      <div class="sph-search-main__breadcrumb-all">
        <a
          class="sph-search-main__breadcrumb-all-inner"
          @click="handleAllResult"
          >全部结果</a
        >
      </div>
      <ul class="sph-search-breadcrumb-list">
        <!-- 分类 -->
        <li v-show="queryCategoryName" class="sph-search-breadcrumb-item">
          <JcTag closable @close="handleCancelCategory"
            >当前分类: {{ queryCategoryName }}</JcTag
          >
        </li>
        <!-- 搜索的关键字 -->
        <li v-show="queryKeyword" class="sph-search-breadcrumb-item">
          <JcTag closable @close="handleCancelKeyword"
            >搜索关键词: {{ queryKeyword }}</JcTag
          >
        </li>
        <!-- 品牌 -->
        <li v-show="currentBrand" class="sph-search-breadcrumb-item">
          <JcTag closable @close="handleCancelBrand"
            >品牌: {{ currentBrand }}</JcTag
          >
        </li>
        <!-- 产品的其他属性 -->
        <li
          class="sph-search-breadcrumb-item"
          v-for="(
            { attrName, attrId, attrValue }, i
          ) in filteredCurrentAttrList"
          :key="i"
        >
          <JcTag closable @close="handleCancelAttr(attrId, attrName)">{{
            `${attrName}: ${attrValue}`
          }}</JcTag>
        </li>
      </ul>
    </SphSectionItem>

    <!--selector-->
    <SearchSelector
      :brandList="searchResult.trademarkList"
      :attrSelectorList="searchResult.attrsList"
      :currentBrand="currentBrand"
      :currentAttrList="currentAttrList"
      @updateCurrentBrand="handleUpdateCurrentBrand"
      @updateCurrentAttrList="handleUpdateCurrentAttrList"
    />

    <!-- sort tab navbar -->
    <SphSectionItem class="sph-search-main__sort-tab">
      <JcSortTab
        class="sph-search-sort-tab-menu"
        v-model="currentJcSortTab"
        @click="handleJcSortTabClick"
      >
        <JcSortTabItem
          class="sph-search-sort-tab-item"
          :value="i"
          :params="{ sortTypeId: id }"
          v-for="({ title, id }, i) in sortTabList"
          :key="i"
        >
          <a class="sph-search-sort-tab-item__inner">{{
            title
          }}</a></JcSortTabItem
        >
      </JcSortTab>
    </SphSectionItem>

    <!-- product list -->
    <SphSectionItem class="sph-search-main__product">
      <SphProductGroup
        class="sph-search-main__product-group"
        @click="handleProductClick"
      >
        <SphProductItem
          blockClass="sph-search-product-item"
          isPriceTop
          :title="title"
          :imgUrl="defaultImg"
          :price="price"
          :params="{ productId: id }"
          v-for="(
            { title, defaultImg, price, id }, i
          ) in searchResult.goodsList"
          :key="i"
        >
          <template #extra>
            <div
              class="sph-search-product-item__feedback sph-search-product-item__extra-inner"
            >
              <i
                >已有<span class="sph-search-product-item__feedback-count"
                  >2000</span
                >人评价</i
              >
            </div>
            <div
              class="sph-search-product-item__action sph-search-product-item__extra-inner"
            >
              <a
                href="javascript:void(0);"
                class="sph-search-product-item__btn-add-cart sph-search-product-item__btn"
                >加入购物车</a
              >
              <a
                href="javascript:void(0);"
                class="sph-search-product-item__btn-add-collection sph-search-product-item__btn"
                >收藏</a
              >
            </div>
          </template>
        </SphProductItem>
      </SphProductGroup>

      <!-- <ul class="product-list" @click="handleProductSelect">
          <li
            class="product-item"
            v-for="(
              { title, defaultImg, price, id }, i
            ) in searchResult.goodsList"
            :key="i"
          >
            <!== <JcLinkGroup>
                <div class="product_img">
                  <JcLink stop :params="{ id:id }">
                    <img :src="defaultImg" />
                  </JcLink>
                </div>
                <div class="product_price sph-search-product-item__extra-inner">
                  <em class="currency">¥</em
                  ><i class="price">{{ price.toFixed(2) }}</i>
                </div>
                <p class="product_title">
                  <JcLink stop :params="{ id:id }">
                    {{ title }}
                  </JcLink>
                </p>
                <div class="commit sph-search-product-item__extra-inner">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate sph-search-product-item__extra-inner">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn sph-search-product-item__btn btn-danger"
                    >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn sph-search-product-item__btn"
                    >收藏</a
                  >
                </div>
              </JcLinkGroup> ==>

            <div class="product_img">
              <a target="_blank"
                ><img :data-productid="id" :src="defaultImg"
              /></a>
            </div>
            <div class="product_price sph-search-product-item__extra-inner">
              <em class="currency">¥</em
              ><i class="price">{{ price.toFixed(2) }}</i>
            </div>
            <div class="product_title">
              <a target="_blank" :data-productid="id" :title="title">{{
                title
              }}</a>
            </div>
            <div class="commit sph-search-product-item__extra-inner">
              <i class="command">已有<span>2000</span>人评价</i>
            </div>
            <div class="operate sph-search-product-item__extra-inner">
              <a
                href="success-cart.html"
                target="_blank"
                class="sui-btn sph-search-product-item__btn btn-danger"
                >加入购物车</a
              >
              <a href="javascript:void(0);" class="sui-btn sph-search-product-item__btn"
                >收藏</a
              >
            </div>
          </li>
        </ul> -->
    </SphSectionItem>

    <!-- pagination -->
    <SphSectionItem>
      <JcPagination
        class="sph-search-pagination"
        hasPrev
        hasNext
        hasTotal
        hasTotalPages
        :total="searchResult.total"
        :currentPage="searchResult.pageNo"
        :pagerCount="pagerCount"
        :pageSize="searchResult.pageSize"
        :totalPages="searchResult.totalPages"
        @updateCurrentPage="handleUpdateCurrentPage"
      >
        <template #prev>上一页</template>
        <!-- <template v-slot:page="scope">{{ scope.page | numToHan }}</template> -->
        <template v-slot:page="scope">{{ scope.page }}</template>
      </JcPagination>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
//#region 依赖 --
import '@/styles/modules/search/index.scss';
import {
  JcPagination,
  JcTag,
  JcSortTab,
  JcSortTabItem,
  JcLinkGroup,
  JcLink,
} from '@/components/common';
import { SphProductGroup, SphProductItem } from '@/components/globals';
// 子组件
import { SearchSelector } from './components';

import { fetchSearchList, fetchSearchSelectorList } from '@/api';
import searchParamsMixins from '@/mixins/common/searchParams';
import updateSearchRoute from '@/mixins/modules/updateSearchRoute';

//#endregion --

export default {
  name: 'Search',
  components: {
    SearchSelector,
    JcPagination,
    JcTag,
    JcSortTab,
    JcSortTabItem,
    JcLinkGroup,
    JcLink,
    SphProductGroup,
    SphProductItem,
  },

  // 将阿拉伯数字转为中文数字，不是按照位数替换，因此不适用于大于十的页码
  // filters: {
  //   numToHan(value) {
  //     const hanList = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  //     return hanList[value] ?? value;
  //   },
  // },

  mixins: [searchParamsMixins, updateSearchRoute],

  data() {
    return {
      //#region 请求结果 --
      searchResult: {},
      //#endregion --

      //#region 视图构建 --
      // 排序
      currentJcSortTab: 0,
      sortTabList: [
        {
          title: '综合',
          id: 1,
          order: 'desc',
        },
        {
          title: '销量',
          order: 'desc',
        },
        {
          title: '新品',
          order: 'desc',
        },
        {
          title: '评价',
          order: 'desc',
        },
        {
          title: '价格',
          id: 2,
          order: 'desc',
        },
      ],
      // 分页
      pagerCount: 11,
      //#endregion --

      //#region 数据模型 --
      // 向服务端请求时的参数对象
      // searchParams: {
      //   categoryName: '',
      //   category1Id: '',
      //   category2Id: '',
      //   category3Id: '',
      //   keyword: '',
      //   order: '1:desc',
      //   pageNo: 1,
      //   pageSize: 10,
      //   props: [],
      //   trademark: '',
      // },
      // searchParams: {
      //   keyword: '',
      // },
      // 各参数的默认值
      defaultParams: {
        categoryName: undefined,
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        keyword: undefined,
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: undefined,
      },
      //#endregion --
    };
  },
  computed: {
    // searchParams() {
    //   return Object.assign({}, this.$route.params, this.$route.query);
    // },
    // 解构路由参数
    // 用户操作后，将数据更新到路由，然后从路由参数中获取更新后的数据，并重新渲染到视图
    routeQuery() {
      return this.$route.query;
    },
    queryKeyword() {
      return this.$route.params?.keyword;
    },
    queryProps() {
      let props = this.routeQuery?.props;
      if (props instanceof Array) {
        return props;
      } else if (typeof props === 'string') {
        return [props];
      }
      return [];
    },
    queryCategoryName() {
      return this.routeQuery.categoryName;
    },
    currentBrand() {
      return this.routeQuery?.trademark;
    },
    currentAttrList() {
      const props = this.queryProps;
      let currentAttrList = [];
      if (props.length > 0) {
        currentAttrList = props.map((prop) => {
          let splits = this.decodeSearchQueryProps(prop);
          return {
            attrName: splits[2],
            attrId: splits[0],
            attrValue: splits[1],
          };
        });
      }
      return currentAttrList;
    },
    // 过滤属性选中结果列表中为空的元素，显示到面包屑
    filteredCurrentAttrList() {
      const filteredList = this.currentAttrList.filter(
        ({ attrName, attrId, attrValue }) => {
          if (attrName) {
            return { attrName, attrId, attrValue };
          }
        }
      );
      return filteredList;
    },
  },

  methods: {
    //#region 事件处理器 --
    // 排序
    encodeSearchParamTheOrder() {
      return;
    },
    handleJcSortTabClick(value, order, params) {
      // const { sortTypeId } = params;
      // // 接口只有 1 2 两种排序类型，因此其他类型只有视图切换效果，不会发请求
      // if ([1, 2].includes(sortTypeId)) {
      //   this.handleUpdateSearchRoute({
      //     queryChanges: { order: `${sortTypeId}:${order}` },
      //   });
      // }
    },
    // 点击商品
    handleProductClick(params) {
      console.log('params', params);
      const { productId } = params;
      let location = { name: 'Detail', params: { skuId: productId } };
      this.$router.push(location);
    },
    // 选择/取消品牌
    handleUpdateCurrentBrand(brand) {
      this.handleUpdateSearchRoute({
        queryChanges: { trademark: brand },
        paramsChanges: 'allReserve',
      });
    },
    handleCancelBrand() {
      this.handleUpdateSearchRoute({
        queryChanges: { trademark: undefined },
        paramsChanges: 'allReserve',
      });
    },
    // 选择/取消其他属性参数
    encodeSearchQueryProps(attrName, attrId, attrValue) {
      return `${attrId}:${attrValue}:${attrName}`;
    },
    decodeSearchQueryProps(prop) {
      return prop.split(':');
    },
    findAttrIdx(props, attrName) {
      return props.findIndex(
        (prop) => this.decodeSearchQueryProps(prop)[2] === attrName
      );
    },
    handleUpdateCurrentAttrList(attrName, attrId, attrValue) {
      const oldProps = this.queryProps;
      let props = oldProps instanceof Array ? [].concat(oldProps) : [];
      const newProp = this.encodeSearchQueryProps(attrName, attrId, attrValue);
      const attrNameIdx = this.findAttrIdx(props, attrName);
      if (attrNameIdx > -1) {
        props[attrNameIdx] = newProp;
      } else {
        props.push(newProp);
      }
      this.handleUpdateSearchRoute({
        queryChanges: { props },
        paramsChanges: 'allReserve',
      });
    },
    handleCancelAttr(attrId, attrName) {
      let props = [].concat(this.queryProps);
      const attrNameIdx = this.findAttrIdx(props, attrName);
      props.splice(attrNameIdx, 1);
      this.handleUpdateSearchRoute({
        queryChanges: { props: props },
        paramsChanges: 'allReserve',
      });
    },
    // 取消分类选中
    handleCancelCategory() {
      // debugger;
      this.handleUpdateSearchRoute({
        queryChanges: {
          categoryName: '',
          category1Id: '',
          category2Id: '',
          category3Id: '',
        },
        paramsChanges: 'allReserve',
      });
    },
    // 取消关键词
    handleCancelKeyword() {
      this.handleUpdateSearchRoute({
        queryChanges: 'allReserve',
        paramsChanges: { keyword: undefined },
      });
    },
    // 显示全部结果，也就是取消所有搜索参数
    handleAllResult() {
      this.handleUpdateSearchRoute({});
    },
    handleUpdateCurrentPage(newPage) {
      this.$set(this.searchResult, 'pageNo', newPage);
      // this.handleUpdateSearchRoute({ queryChanges: { pageNo: newPage } });
    },
    //#endregion --

    //#region 请求处理 --
    // 请求搜索结果
    fetchSearchResult(searchParams) {
      fetchSearchList(searchParams)
        .then((data) => {
          if (!this.isEmpty(data)) this.searchResult = data;
        })
        .catch((err) => {
          this.$message('获取搜索结果失败');
          console.log(err);
        });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        let searchParams = this.setupSearchParams(newRoute);
        this.fetchSearchResult(searchParams);
        // fetchSearchSelectorList().then((data) => {
        //   this.$set(this.searchResult, 'trademarkList', data.brandList);
        //   this.$set(this.searchResult, 'attrsList', data.attrsList);
        // });
      },
    },
  },
  created() {
    // 由于设置了路由的立即侦听器，这里不需要再手动发请求和初始化数据
    // this.setupSearchParams(this.$route);
    // this.fetchSearchResult(this.searchParams);
  },
};
</script>
