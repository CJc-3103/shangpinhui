<template>
  <SphSectionGroup class="sph-category">
    <SphSectionItem class="sph-category-section">
      <div
        class="sph-category__panel"
        @mouseenter="handleEnterCategory"
        @mouseleave="handleLeaveCategory"
      >
        <!-- 
          这里的 mouseenter 需要加在标题和三级分类菜单的父元素上，而不是标题元素上
          若是加在标题元素上，快速移出菜单时再次进入，菜单项的 hover 样式可能加不上，因为 sph-category__header 上没有该事件
        -->
        <h2 class="sph-category__header">全部商品分类</h2>
        <!-- 三级联动菜单 -->
        <!-- 添加显示与隐藏的过渡动画 -->
        <transition
          name="stretch"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div class="sph-category__group-container" v-show="isShowCategory">
            <div
              class="sph-category-group--level-1"
              @click="handleClickCategory"
            >
              <template v-if="categoryList?.length > 0">
                <!-- <JcRadioList
                    v-model="activeTab"
                    class="rank-tab-list"
                    listType="definition"
                    :title="title"
                    @select="handleTabSelect"
                  >
                    <JcRadioListItem
                      class="tab-item"
                      :value="i"
                      v-for="({ icon, title }, i) in tabList"
                      :key="i"
                    >
                      <i class="icon" :class="icon"></i>
                      <p class="title">{{ title }}</p>
                    </JcRadioListItem>
                  </JcRadioList> -->

                <div
                  class="sph-category-item--level-1"
                  :class="{ 'is-hover': i === currentCategory }"
                  v-for="(
                    { categoryName: nameC1, categoryChild: sndCategoryList }, i
                  ) in categoryList"
                  :key="i"
                >
                  <h3
                    class="sph-category-item__title--level-1"
                    @mouseenter="handleHoverCategory(i)"
                  >
                    <a
                      class="sph-category-item__txt--level-1"
                      :data-categoryName="nameC1"
                      :data-category1Id="i"
                      >{{ nameC1 }}</a
                    >
                  </h3>
                  <!-- 二、三级菜单 -->
                  <!-- 通过 js 控制面板的显示与隐藏 -->
                  <div
                    class="sph-category-group--level-2"
                    v-if="sndCategoryList?.length > 0"
                    v-show="i === currentCategory"
                  >
                    <div
                      class="sph-category-item--level-2"
                      v-for="(
                        {
                          categoryName: nameC2,
                          categoryChild: trdCategoryList,
                        },
                        j
                      ) in sndCategoryList"
                      :key="j"
                    >
                      <dl class="sph-category-group--level-3">
                        <dt class="sph-category-group__title--level-3">
                          <a
                            :data-categoryName="nameC2"
                            :data-category2Id="j"
                            >{{ nameC2 }}</a
                          >
                        </dt>
                        <dd
                          v-if="trdCategoryList?.length > 0"
                          class="sph-category-item--level-3"
                        >
                          <em
                            class="sph-category-item__title--level-3"
                            v-for="(
                              { categoryName: nameC3 }, k
                            ) in trdCategoryList"
                            :key="k"
                          >
                            <a
                              :data-categoryName="nameC3"
                              :data-category3Id="k"
                              >{{ nameC3 }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </transition>
      </div>

      <nav class="sph-category-nav-list">
        <a
          class="sph-category-nav-item"
          href="javascript(0);"
          v-for="(nav, i) in navList"
          :key="i"
          >{{ nav }}</a
        >
      </nav>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/category/index.scss';
import { mapState } from 'vuex';
import { throttle, isEmpty } from 'lodash';
import searchParamsMixins from '@/mixins/common/searchParams';
import updateSearchRoute from '@/mixins/modules/updateSearchRoute';
// import { JcRadioList, JcRadioListItem } from '@/components/common/JcRadioList';

export default {
  name: 'TheCategory',
  mixins: [searchParamsMixins, updateSearchRoute],
  // components: { JcRadioList, JcRadioListItem },
  data() {
    return {
      // 视图构建
      navList: [
        '服装城',
        '美妆馆',
        '尚品汇超市',
        '全球购',
        '闪购',
        '团购',
        '有趣',
        '秒杀',
      ],
      isCategoryHover: false,
      currentCategory: -1,
      defaultShowCategory: true,
      isShowCategory: true,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 15), // 最新的接口提供的数据超了，用 slice 切掉一部分
    }),
    routePath() {
      return this.$route.path;
    },
  },
  watch: {
    $route(to) {
      this.initIsShowCategory(to);
    },
  },
  methods: {
    // 首次进入页面、刷新后重进、以及路由切换时，都需要判定当前路由地址并设置三级联动菜单面板的显示与否
    initIsShowCategory(route) {
      const meta = this.getRouteMeta(route);

      this.defaultShowCategory = meta?.defaultShowCategory || false;
      this.isShowCategory = meta?.defaultShowCategory;

      // this.isShowCategory = this.getIsShowCategory(route);
    },
    getRouteMeta(route) {
      return route ? route.meta : this.$route.meta;
    },
    // 添加事件监听，当鼠标移入三级菜单时高亮，离开菜单（且离开标题“全部商品分类”）时取消高亮
    // css 的 :hover 只适用于菜单本身范围的进入和离开判定；js 的方式可以实现一些特殊需求
    handleHoverCategory: throttle(function (id) {
      // console.log('节流');
      if (this.isCategoryHover) this.currentCategory = id;
    }, 100),
    // 搜索页，进入标题“全部商品分类”时显示一级菜单面板；离开时隐藏
    handleEnterCategory() {
      // console.log('进入菜单');
      this.isCategoryHover = true;
      if (!this.defaultShowCategory) {
        this.isShowCategory = true;
      }
    },
    // 鼠标移出时，关闭二、三级菜单面板
    handleLeaveCategory() {
      // console.log('离开菜单');
      this.isCategoryHover = false;
      this.currentCategory = -1;
      if (!this.defaultShowCategory) {
        this.isShowCategory = false;
      }
    },
    // 点击分类菜单，跳转到搜索页
    handleClickCategory(e) {
      const ele = e.target;
      const { categoryname, category1id, category2id, category3id } =
        ele.dataset;
      if (categoryname) {
        let queryChanges = { categoryName: categoryname };
        queryChanges = Object.assign(queryChanges, {
          category1Id: category1id,
          category2Id: category2id,
          category3Id: category3id,
        });
        this.handleUpdateSearchRoute({
          queryChanges,
          paramsChanges: 'allReserve',
        });
      }
    },
  },
  created() {
    if (this.categoryList.length === 0) {
      this.$store.dispatch('home/FETCH_CATEGORY_LIST');
    }
    this.initIsShowCategory();
  },
};
</script>
