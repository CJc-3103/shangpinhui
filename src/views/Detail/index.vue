<template>
  <SphSectionGroup class="sph-product-detail">
    <SphSectionItem>
      <!-- breadcrumb -->
      <div
        class="sph-product-detail__breadcrumb"
        @click="handleBreadcrumbSelect"
      >
        <a
          class="sph-breadcrumb-item"
          v-if="breadcrumbs?.category1Id"
          :data-category1Id="breadcrumbs.category1Id"
          :data-category1Name="breadcrumbs.category1Name"
          >{{ breadcrumbs.category1Name }}</a
        >
        <a
          class="sph-breadcrumb-item"
          v-if="breadcrumbs?.category2Id"
          :data-category2Id="breadcrumbs.category2Id"
          :data-category2Name="breadcrumbs.category2Name"
          >{{ breadcrumbs.category2Name }}</a
        >
        <a
          class="sph-breadcrumb-item"
          v-if="breadcrumbs?.category3Id"
          :data-category3Id="breadcrumbs.category3Id"
          :data-category3Name="breadcrumbs.category3Name"
          >{{ breadcrumbs.category3Name }}</a
        >
      </div>
    </SphSectionItem>

    <SphSectionItem class="sph-product-detail__main">
      <!-- 左侧放大镜区域 -->
      <div class="sph-product-detail__picture">
        <!--放大镜效果-->
        <JcZoom :imgUrl="mainImgUrl" />
        <!-- 小图列表 -->
        <OverviewImgList :imgList="overviewImgList" @select="handleImgSelect" />
      </div>

      <!-- 右侧选择区域布局 -->
      <div class="sph-product-detail__main-info">
        <h3 class="sph-product-detail__title">{{ productInfo?.skuName }}</h3>

        <p class="sph-product-detail__description">
          {{ productInfo?.skuDesc }}
        </p>

        <div class="sph-product-detail__sales-container">
          <div class="sph-product-detail__sales-wrap">
            <!-- 售价 -->
            <div class="sph-product-info-item sph-product-detail__sales-price">
              <div class="sph-product-info-item__header">
                <span class="sph-product-info-item__title">价格</span>
              </div>
              <div class="sph-product-info-item__description">
                <i class="sph-product-detail__sales-price-currency">¥</i>
                <em class="sph-product-detail__sales-price-number">{{
                  productInfo?.price | currency('')
                }}</em>
                <span class="sph-product-detail__sales-price-notify"
                  >降价通知</span
                >
              </div>
            </div>
            <!-- 评价 -->
            <div>
              <i>累计评价</i>
              <em class="sph-product-detail__feedback">65545</em>
            </div>
          </div>
          <!-- 促销活动 -->
          <div
            class="sph-product-info-item sph-product-detail__sales-wrap sph-product-detail__promotion"
          >
            <div class="sph-product-info-item__header">
              <i class="sph-product-info-item__title">促销</i>
            </div>
            <div class="sph-product-info-item__description">
              <i class="sph-product-detail__promotion-title">加价购</i>
              <em class="sph-product-detail__promotion-detail"
                >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
              >
            </div>
          </div>
        </div>
        <!-- 支持 -->
        <div class="sph-product-detail__support">
          <div class="sph-product-info-item sph-product-support-item">
            <div class="sph-product-info-item__header">
              <span class="sph-product-info-item__title">支持</span>
            </div>
            <div class="sph-product-info-item__description">
              以旧换新，闲置手机回收 4G套餐超值抢 礼品购
            </div>
          </div>
          <div class="sph-product-info-item sph-product-support-item">
            <div class="sph-product-info-item__header">
              <span class="sph-product-info-item__title">配送至</span>
            </div>
            <div class="sph-product-info-item__description">
              广东省 深圳市 宝安区
            </div>
          </div>
        </div>
        <!-- sku 选择器 -->
        <div class="sph-product-detail__sku-selector">
          <div>
            <JcTag
              :text="value"
              closable
              @close="handleCancelSelector(id)"
              class="sph-product-detail__sku-selected"
              v-for="({ value, id }, i) in filteredSelectedAttrList"
              :key="i"
            ></JcTag>
          </div>

          <JcRadioList
            v-model="selectedAttrList[i]"
            class="sph-product-detail__sku-selector-group sph-product-info-item"
            listType="definition"
            :title="title"
            titleClass="sph-selector-item-group__title sph-product-info-item__header"
            @select="(value) => handleAttrSelect(value, i)"
            v-for="({ title, options }, i) in attrSelectionList"
            :key="i"
          >
            <!-- 测试插槽 -->
            <!-- <template v-slot:title="{ title }">{{ title }}111</template> -->

            <JcRadioItem
              class="sph-product-detail__sku-selector-item"
              :value="option"
              v-for="(option, j) in options"
              :key="j"
              >{{ option }}</JcRadioItem
            >
          </JcRadioList>
        </div>

        <!-- 数量与加购 -->
        <div class="sph-product-info-item">
          <span
            class="sph-product-detail__amount_wrap sph-product-info-item__header"
          >
            <!-- 此处如果使用 v-bind 绑定是无法实现输入框重置非法值的功能的 -->
            <input
              v-model.number="productAmount"
              autocomplete="off"
              class="sph-product-detail__amount-input"
              @change="handleAmountChange"
            />
            <a
              class="sph-btn-amount sph-product-detail__btn-plus"
              @click="handleAmountPlus"
              >+</a
            >
            <a
              class="sph-btn-amount sph-product-detail__btn-minus"
              @click="handleAmountMinus"
              >-</a
            >
          </span>
          <a
            class="sph-product-detail__btn-add-cart"
            @click="handleAddToCart(skuId, productAmount)"
            >加入购物车</a
          >
        </div>
      </div>
    </SphSectionItem>

    <!-- 详情页下半 -->
    <SphSectionItem class="sph-product-detail__body">
      <!-- 侧边栏 -->
      <aside class="sph-product-detail__aside">
        <JcTab blockClass="sph-aside-tab" v-model="activeAsideTab">
          <template v-slot:nav="{ label }"
            ><h4 class="sph-aside-tab__nav-item-inner">
              {{ label }}
            </h4></template
          >
          <JcTabPane class="sph-aside-tab-pane" name="相关分类">
            <ul class="sph-related-category-list">
              <li
                class="sph-related-category-item"
                v-for="(category, i) in relatedCategoryList"
                :key="i"
              >
                {{ category }}
              </li>
            </ul>

            <SphProductGroup class="sph-related-product-list">
              <SphProductItem
                productClass="sph-related-product-item"
                v-for="({ title, imgUrl, price }, i) in relatedProductList"
                :key="i"
                :title="title"
                :imgUrl="imgUrl"
                :price="price"
                :params="{ productId: i }"
              >
                <template #extra>
                  <span class="sph-related-product-item__action"
                    ><a @click="handleAddToCart(skuId, productAmount)"
                      >加入购物车</a
                    ></span
                  >
                </template></SphProductItem
              >
            </SphProductGroup>
          </JcTabPane>
          <JcTabPane class="sph-aside-tab-pane" name="推荐品牌">
            <h4 class="sph-tab-nav-item">推荐品牌</h4></JcTabPane
          >
        </JcTab>
      </aside>
      <!-- 真正详情 -->
      <div class="sph-product-detail__body-main">
        <JcCard blockClass="sph-product-suit" v-if="suitList.length > 0">
          <template #header><h4>选择搭配</h4></template>
          <!-- 主产品（本页产品） -->
          <div class="sph-product-suit__master">
            <div class="sph-product-suit__img">
              <img :src="skuImageList?.[0]?.imgUrl" />
            </div>
            <p class="sph-product-suit__price">
              {{ productInfo?.price | currency('') }}
            </p>
          </div>
          <i class="sph-product-suit__icon-plus">+</i>
          <!-- 套装列表 -->
          <ul class="sph-product-suit-list">
            <li
              class="sph-product-suit-item"
              v-for="({ imgUrl, title, price }, i) in suitList"
              :key="i"
            >
              <div class="sph-product-suit__img">
                <img :src="imgUrl" />
              </div>
              <p>{{ title }}</p>
              <label>
                <input type="checkbox" value="39" v-model="checkedList[i]" />
                <span>{{ price | currency }}</span>
              </label>
            </li>
          </ul>
          <!-- 套装选择结果 -->
          <div class="sph-product-suit__result">
            <div class="sph-product-suit__checked-count">
              已选购 {{ totalSuitChecked }} 件商品
            </div>
            <div class="sph-product-suit__suit-title">套餐价</div>
            <div class="sph-product-suit__total-price">
              {{ totalSuitPrice | currency }}
            </div>
            <button class="sph-product-suit__add-cart">加入购物车</button>
          </div>
        </JcCard>

        <JcTab blockClass="sph-detail-tab" v-model="activeDetailTab">
          <!-- <JcTabPane
            v-for="(tab, i) in detailTabList"
            :key="i"
            :label="tab"
            :name="i"
            >{{ tab }}</JcTabPane
          > -->
          <JcTabPane name="商品介绍">
            <ul
              v-if="paramList?.length"
              class="sph-product-detail__detailed-param-group"
            >
              <li
                class="sph-product-detail__detailed-param-item"
                v-for="(param, i) in paramList"
                :key="i"
              >
                {{ param }}
              </li>
            </ul>
            <ul v-if="detailImgList?.length">
              <li
                class="sph-product-detail__detailed-img-item"
                v-for="(imgUrl, i) in detailImgList"
                :key="i"
              >
                <img :src="imgUrl" alt="" />
              </li>
            </ul>
          </JcTabPane>
          <JcTabPane name="规格与包装">规格与包装</JcTabPane>
          <JcTabPane name="售后保障">售后保障</JcTabPane>
          <JcTabPane name="商品评价">商品评价</JcTabPane>
          <JcTabPane name="手机社区">手机社区</JcTabPane>
        </JcTab>
      </div>
    </SphSectionItem>

    <SphSectionItem> <TheLike :productCount="6" /></SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/detail/index.scss';
import _ from 'lodash';
// 全局组件
import {
  JcRadioList,
  JcRadioItem,
  JcCard,
  JcTab,
  JcTabPane,
  JcTag,
  JcZoom,
} from '@/components/common';
import { SphProductGroup, SphProductItem, TheLike } from '@/components/globals';
// 子组件
import OverviewImgList from './components/OverviewImgList';
// api
import {
  fetchProductDetail,
  addToCart,
  fetchRelatedList,
  fetchProductDetailedDetail,
} from '@/api';

export default {
  name: 'Detail',

  components: {
    OverviewImgList,
    JcZoom,
    JcRadioList,
    JcRadioItem,
    JcTag,
    SphProductGroup,
    SphProductItem,
    JcCard,
    JcTab,
    JcTabPane,
    TheLike,
  },

  data() {
    return {
      // 请求结果
      detailResult: {}, // 真实 api
      productDetail: {}, // mock 详情底部数据
      relatedCategoryList: [],
      relatedProductList: [],
      //#region 数据模型 --
      selectedAttrList: [], // sku
      activeImgId: -1, // 主图
      // 数量
      productAmount: 1,
      minAmount: 1,
      maxAmount: 99,
      // 侧边栏
      asideTabList: ['相关分类', '推荐品牌'],
      // 激活的标签页
      activeAsideTab: 0,
      activeDetailTab: 0,
      // 搭配套餐
      checkedList: [],
      totalSuitChecked: 0,
      totalSuitPrice: 0,
      //#endregion --
    };
  },
  computed: {
    skuId() {
      let skuId = this.$route.params?.skuId ?? '';
      if (skuId) {
        return skuId;
      }
      // console.error('skuId is necessary');
    },
    //#region 解构 API 响应 --
    // 商品分类面包屑
    breadcrumbs() {
      return this.detailResult?.categoryView || [];
    },
    // SKU 选项
    skuAttrGroupList() {
      return this.detailResult?.spuSaleAttrList || [];
    },
    // 产品信息
    productInfo() {
      return this.detailResult?.skuInfo ?? '';
    },
    // 主图对象列表
    skuImageList() {
      return this.productInfo?.skuImageList || [];
    },
    attrSelectionList() {
      let attrSelectionList = [];
      if (this.skuAttrGroupList?.length > 0) {
        this.skuAttrGroupList.forEach((attrGroup) => {
          let selectionGroup = {};
          selectionGroup.title = attrGroup.saleAttrName;
          let options = [];
          attrGroup.spuSaleAttrValueList.forEach((attr) =>
            options.push(attr.saleAttrValueName)
          );
          selectionGroup.options = options;
          attrSelectionList.push(selectionGroup);
        });
      }
      return attrSelectionList;
    },
    // 搭配套餐
    suitList() {
      return this.productDetail?.suitList || [];
    },
    // 详情参数
    paramList() {
      return this.productDetail?.paramList || [];
    },
    // 详情图片
    detailImgList() {
      return this.productDetail?.detailImgList || [];
    },
    //#endregion --

    //#region 根据 API 响应，生成前端数据结构 --
    // 主图
    mainImgUrl() {
      let activeImgId = this.activeImgId;
      let url =
        activeImgId === -1
          ? this.productInfo?.skuDefaultImg
          : this.overviewImgList[activeImgId]?.imgUrl;
      // console.log('url', url);
      return url;
    },
    overviewImgList() {
      let overviewImgList = [];
      if (this.skuImageList?.length > 0) {
        this.skuImageList?.forEach((imgObj) => {
          overviewImgList.push({ imgUrl: imgObj.imgUrl });
        });
      }
      return overviewImgList;
    },
    //#endregion --

    // 已选中的 sku 类型列表
    filteredSelectedAttrList() {
      return this.selectedAttrList.filter((attr) => attr !== '');
    },
  },

  watch: {
    checkedList(newList) {
      let totalChecked = 0,
        totalPrice = this.productInfo.price;
      const suitList = this.suitList;
      const len = suitList?.length || 0;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          if (newList[i]) {
            totalChecked += 1;
            totalPrice += suitList[i]?.price;
          }
        }
        this.totalSuitChecked = totalChecked;
        this.totalSuitPrice = totalPrice;
      }
    },
  },

  methods: {
    // 点击分类标签，返回搜索页
    handleBreadcrumbSelect(e) {
      let {
        category1id: category1Id,
        category2id: category2Id,
        category3id: category3Id,
        category1name: category1Name,
        category2name: category2Name,
        category3name: category3Name,
      } = e.target.dataset;
      if (category1Id || category2Id || category3Id) {
        let categoryName = category1Name || category2Name || category3Name;
        this.$router.push({
          name: 'Search',
          query: {
            categoryName: categoryName,
            category1Id: category1Id,
            category2Id: category2Id,
            category3Id: category3Id,
          },
        });
      }
    },

    // 主图切换显示
    handleImgSelect(imgId) {
      this.activeImgId = imgId;
    },

    // SKU 选择与取消
    handleAttrSelect(value, id) {
      this.$set(this.selectedAttrList, id, { value, id });
    },
    handleCancelSelector(id) {
      this.$set(this.selectedAttrList, id, '');
    },

    //#region 产品数量 --
    // 检查用户输入是否为整数
    isAmountValid(amount) {
      return (
        _.isInteger(amount) &&
        amount >= this.minAmount &&
        amount <= this.maxAmount
      );
    },
    // 限制用户输入必须为整数
    limitProductAmount(amount) {
      return Math.min(Math.max(amount, this.minAmount), this.maxAmount);
    },
    // 数量+1
    handleAmountPlus() {
      this.productAmount = this.limitProductAmount(this.productAmount + 1);
    },
    // 数量-1
    handleAmountMinus() {
      this.productAmount = this.limitProductAmount(this.productAmount - 1);
    },
    // 手动输入数量
    handleAmountChange(e) {
      let amount = +e.target.value;
      if (!this.isAmountValid(amount)) {
        this.productAmount = 1; // 非法输入全部重置为 1
      }
      // 合法输入由双向绑定自动更新
    },
    //#endregion --

    //#region 添加购物车 --
    handleAddToCart(skuId, amount) {
      addToCart(skuId, amount)
        .then(() => {
          // 路由跳转前，先存储产品数据
          let attrSelectionList = this.attrSelectionList;
          let productInfo = {
            skuId: skuId,
            title: this.productInfo.skuName,
            imgUrl: this.productInfo.skuDefaultImg,
          };
          let selectedAttrList = [];
          this.filteredSelectedAttrList.forEach(({ value, id }) => {
            selectedAttrList.push({
              title: attrSelectionList[id].title,
              value: value,
            });
          });
          productInfo.selectedAttrList = selectedAttrList;
          sessionStorage.setItem('productInfo', JSON.stringify(productInfo));

          this.$store
            .dispatch('addCartRouteStatus/CLEAR_ALL_ROUTE')
            .then(() => {
              this.$router.push({
                name: 'AddCartResult',
                params: { skuNum: amount },
              });
            });
        })
        .catch((error) => console.log(error));
    },
    //#endregion --
  },

  created() {
    fetchProductDetail(this.skuId)
      .then((data) => {
        this.detailResult = data;
        this.totalSuitPrice = data.skuInfo?.price || 0;
      })
      .catch(() => {
        console.log('详情获取失败');
      });
    fetchProductDetailedDetail(this.skuId)
      .then((data) => {
        this.productDetail = data;
      })
      .catch((err) => err);
    fetchRelatedList()
      .then((data) => {
        this.relatedCategoryList = data.relatedCategoryList;
        this.relatedProductList = data.relatedProductList;
      })
      .catch((err) => {
        console.log('推荐列表获取失败');
      });
  },
};
</script>
