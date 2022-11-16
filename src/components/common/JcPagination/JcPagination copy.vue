<script>
import '../../theme-chalk/common/jc-pagination.scss';
import { isFlexJustify, isCssColor } from '@/utils/validator/cssTypeValidator';

const isColorValid = (color) => {
  if (!color) return true;
  return isCssColor(color);
};

export default {
  name: 'JcPagination',
  props: {
    //#region 数据项 --
    total: Number, // 数据总数
    currentPage: Number, // 当前页码数
    pageSize: Number, // 每页显示数据条数
    pagerCount: Number, // 允许同时显示的页码数
    totalPages: Number, // 页码总数
    //#endregion --

    //#region 功能组件 --
    hasPrev: Boolean,
    hasNext: Boolean,
    hasTotal: Boolean,
    hasTotalPages: Boolean,
    paginationButtonStyle: Object,
    //#endregion --

    // // 布局
    // paginationHeight: {
    //   type: Number,
    // },
    // paginationInnerHeight: {
    //   type: Number,
    //   default: 18,
    // },
    // fontSize: {
    //   type: Number,
    //   default: 14,
    // },
    // innerPadding: {
    //   type: Object,
    //   default() {
    //     return { top: 9, right: 18 };
    //   },
    //   validator(value) {
    //     // top 必填
    //     return value.hasOwnProperty('top');
    //   },
    // },
    // paginationAlign: {
    //   type: String,
    //   default: 'center',
    //   validator(value) {
    //     return isFlexJustify(value);
    //   },
    // },

    //#region 颜色 --

    // //#region 通用 ----
    // // 基础颜色
    // color: {
    //   type: String,
    //   require: true,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // backgroundColor: {
    //   type: String,
    //   require: true,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // borderColor: {
    //   type: String,
    //   require: true,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // // 激活颜色
    // activeColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // activeBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // activeBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // // 禁用颜色
    // disabledColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // //#endregion ----

    // //#region page ----
    // pageColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // pageBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // pageBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPageColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPageBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPageBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // //#endregion ----

    // //#region prev ----
    // prevColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // prevBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // prevBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPrevColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPrevBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledPrevBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // //#endregion ----

    // //#region next ----
    // nextColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // nextBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // nextBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledNextColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledNextBackgroundColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // disabledNextBorderColor: {
    //   type: String,
    //   validator(color) {
    //     return isColorValid(color);
    //   },
    // },
    // //#endregion ----

    //#endregion --
  },
  data() {
    return {
      pageList: [], // 中间区域显示的页码范围
      start: 0, // 中间区域显示的开始页码指针
      end: 0, // 中间区域显示的结束页码指针
      isShowPrevDot: false,
      isShowNextDot: false,
    };
  },
  computed: {
    resourceData() {
      return { total: this.total, currentPage: this.currentPage };
    },
    isPrevDisabled() {
      return this.currentPage === 1;
    },
    isNextDisabled() {
      return this.currentPage === this.totalPages;
    },
    // 总页数超过当前允许的同时显示页数，才有可能需要显示 ...
    isDotNeeded() {
      return this.totalPages > this.pagerCount;
    },

    // 布局
    innerTopPadding() {
      return this.innerPadding.top;
    },
    realInnerPadding() {
      const top = this.innerTopPadding;
      let { right, left, bottom } = this.innerPadding;
      right = right ?? top;
      bottom = bottom ?? top;
      left = left ? left : right ?? top;
      return `${top}px ${right}px ${bottom}px ${left}px`;
    },
    realPaginationHeight() {
      const paginationHeight = this.paginationHeight;
      const minHeight =
        this.paginationInnerHeight * 1.2 + (this.innerTopPadding + 1) * 2;
      const realPaginationHeight = paginationHeight
        ? Math.max(paginationHeight, minHeight)
        : minHeight;
      return realPaginationHeight + 'px';
    },
    //#region 颜色 --

    // //#region page ----
    // realPageColor() {
    //   return this.pageColor ?? this.color;
    // },
    // realPageBackgroundColor() {
    //   return this.pageBackgroundColor ?? this.backgroundColor;
    // },
    // realPageBorderColor() {
    //   return this.pageBorderColor ?? this.borderColor;
    // },
    // realActiveColor() {
    //   return this.activeColor ?? this.realPageColor;
    // },
    // realActiveBackgroundColor() {
    //   return this.activeBackgroundColor ?? this.realPageBackgroundColor;
    // },
    // realActiveBorderColor() {
    //   return this.activeBorderColor ?? this.realPageBorderColor;
    // },
    // realDisabledPageColor() {
    //   return this.disabledPageColor || this.disabledColor || this.realPageColor;
    // },
    // realDisabledPageBackgroundColor() {
    //   return (
    //     this.disabledPageBackgroundColor ||
    //     this.disabledBackgroundColor ||
    //     this.realPageBackgroundColor
    //   );
    // },
    // realDisabledPageBorderColor() {
    //   return (
    //     this.disabledPageBorderColor ||
    //     this.disabledBorderColor ||
    //     this.realPageBorderColor
    //   );
    // },
    // //#endregion ----

    // //#region prev ----
    // realPrevColor() {
    //   return this.prevColor ?? this.color;
    // },
    // realPrevBackgroundColor() {
    //   return this.prevBackgroundColor ?? this.backgroundColor;
    // },
    // realPrevBorderColor() {
    //   return this.prevBorderColor ?? this.borderColor;
    // },
    // realDisabledPrevColor() {
    //   return this.disabledPrevColor || this.disabledColor || this.realPrevColor;
    // },
    // realDisabledPrevBackgroundColor() {
    //   return (
    //     this.disabledPrevBackgroundColor ||
    //     this.disabledBackgroundColor ||
    //     this.realPrevBackgroundColor
    //   );
    // },
    // realDisabledPrevBorderColor() {
    //   return (
    //     this.disabledPrevBorderColor ||
    //     this.disabledBorderColor ||
    //     this.realPrevBorderColor
    //   );
    // },
    // //#endregion ----

    // //#region next ----
    // realNextColor() {
    //   return this.nextColor ?? this.color;
    // },
    // realNextBackgroundColor() {
    //   return this.nextBackgroundColor ?? this.backgroundColor;
    // },
    // realNextBorderColor() {
    //   return this.nextBorderColor ?? this.borderColor;
    // },
    // realDisabledNextColor() {
    //   return this.disabledNextColor || this.disabledColor || this.realPageColor;
    // },
    // realDisabledNextBackgroundColor() {
    //   return (
    //     this.disabledNextBackgroundColor ||
    //     this.disabledBackgroundColor ||
    //     this.realNextBackgroundColor
    //   );
    // },
    // realDisabledNextBorderColor() {
    //   return (
    //     this.disabledNextBorderColor ||
    //     this.disabledBorderColor ||
    //     this.realNextBorderColor
    //   );
    // },
    // //#endregion ----

    //#endregion --
  },
  methods: {
    // 根据开始和结束指针，重新生成中间区域的页码
    setupPageList(start, end) {
      let pageList = [];
      for (let i = start; i <= end; i++) {
        pageList.push(i);
      }
      return pageList;
    },
    // 根据操作后的当前页码，重新判定是否显示两侧的 ... ，以及更新中间区域的页码范围
    setupPagination(currentPage, totalPages, pagerCount) {
      // 初始化 start 和 end
      let start = 1,
        end = totalPages;
      if (this.isDotNeeded) {
        // 从当前页码开始，向左右两侧延伸 pagerCount 一半的距离
        let halfOffset = Math.floor(pagerCount / 2, 0);
        start = Math.max(1, currentPage - halfOffset);
        end = Math.min(totalPages, currentPage + halfOffset);
        // 若中间页码数量仍小于 pagerCount，先拉长到 pagerCount
        if (end - start + 1 < pagerCount) {
          if (end - pagerCount > -1) {
            // 左侧仍有剩余页码
            start = end - pagerCount + 1;
          } else {
            end = start + pagerCount - 1;
          }
        }
        // 根据延伸后的左右指针，判定是否需要显示左右两侧的 ...
        this.isShowPrevDot = start > 1;
        this.isShowNextDot = totalPages - end > 0;
      } else {
        this.isShowPrevDot = false;
        this.isShowNextDot = false;
      }
      // 根据 ... 的判定结果，赋值两侧指针的最终值
      this.start = Math.max(1, start + (this.isShowPrevDot ? 1 : 0));
      this.end = Math.min(totalPages, end - (this.isShowNextDot ? 1 : 0));
      // 根据最新的指针，生成中间区域的页码
      this.pageList = [].concat(this.setupPageList(this.start, this.end));
      // console.log('this.pageList', this.pageList);
    },
    autoSetupPagination() {
      this.$nextTick(() => {
        this.setupPagination(
          this.currentPage,
          this.totalPages,
          this.pagerCount
        );
      });
    },
    handlePrev() {
      const oldPage = this.currentPage;
      const newPage = Math.max(1, oldPage - 1);
      if (oldPage !== newPage) {
        this.updateCurrentPage(newPage);
        // 由于侦听器的存在，不需要手动触发分页器更新；next 与 select 同理
        // this.setupPagination(newPage);
      }
    },
    handleNext() {
      const oldPage = this.currentPage;
      const newPage = Math.min(this.totalPages, oldPage + 1);
      if (oldPage !== newPage) {
        this.updateCurrentPage(newPage);
      }
    },
    handlePageSelect(e) {
      const newPage = +e.target.dataset.page;
      this.updateCurrentPage(newPage);
    },
    // 通知父组件修改当前页
    updateCurrentPage(newPage) {
      this.$emit('updateCurrentPage', newPage);
    },
  },
  watch: {
    // currentPage: {
    //   immediate: true,
    //   handler() {
    //     this.$nextTick(() => {
    //       this.setupPagination(
    //         this.currentPage,
    //         this.totalPages,
    //         this.pagerCount
    //       );
    //     });
    //   },
    // },
    // total: {
    //   immediate: true,
    //   handler() {
    //     this.$nextTick(() => {
    //       this.setupPagination(
    //         this.currentPage,
    //         this.totalPages,
    //         this.pagerCount
    //       );
    //     });
    //   },
    // },
    resourceData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.setupPagination(
            this.currentPage,
            this.totalPages,
            this.pagerCount
          );
        });
      },
    },
  },

  render(h) {
    const {
      // 组件
      hasPrev,
      hasNext,
      hasTotal,
      hasTotalPages,
      // 数据
      total,
      totalPages,
      currentPage,
      start,
      end,
      isPrevDisabled,
      isNextDisabled,
      isShowPrevDot,
      isShowNextDot,
      // 事件处理器
      handlePrev,
      handleNext,
      handlePageSelect,
      // 样式
      // paginationInnerHeight,
      // fontSize,
      // paginationAlign,
      // realInnerPadding,
      // realPaginationHeight,
      // 颜色
      // color,
      // backgroundColor,
      // borderColor,
      // realActiveColor,
      // realActiveBackgroundColor,
      // realActiveBorderColor,
      // realPageColor,
      // realPageBackgroundColor,
      // realPageBorderColor,
      // realDisabledPageColor,
      // realDisabledPageBackgroundColor,
      // realDisabledPageBorderColor,
      // realPrevColor,
      // realPrevBackgroundColor,
      // realPrevBorderColor,
      // realDisabledPrevColor,
      // realDisabledPrevBackgroundColor,
      // realDisabledPrevBorderColor,
      // realNextColor,
      // realNextBackgroundColor,
      // realNextBorderColor,
      // realDisabledNextColor,
      // realDisabledNextBackgroundColor,
      // realDisabledNextBorderColor,
    } = this;
    // 插槽
    const {
      total: totalSlot,
      totalPages: totalPagesSlot,
      dotted: dottedSlot,
      page: pageSlot,
    } = this.$scopedSlots;

    // 总计信息子组件
    const setupTotalInfoCompo = (compoClassName, compoSlot, defaultInner) => {
      return (
        <div
          class={[
            'jc-pagination__total-info jc-pagination__component',
            compoClassName ? compoClassName : '',
          ]}
        >
          <span class={'jc-pagination__inner'}>
            {compoSlot ? compoSlot() : defaultInner}
          </span>
        </div>
      );
    };
    const totalCompo = setupTotalInfoCompo(
      'jc-pagination__total-data',
      totalSlot,
      `共${total}条数据`
    );
    const totalPagesCompo = setupTotalInfoCompo(
      'jc-pagination__total-pages',
      totalPagesSlot,
      `共${totalPages}页`
    );
    // 翻页子组件（前进/后退）
    const setupPageTurnCompo = (
      compoType,
      isDisabled,
      clickHandler,
      defaultText
    ) => {
      return (
        <div
          class={[
            `jc-pagination__component--${compoType} jc-pagination__component--page-turn jc-pagination__component--action jc-pagination__component`,
            isDisabled ? 'is-disabled' : '',
          ]}
          disabled={isDisabled}
          onClick={clickHandler}
        >
          <a class={'jc-pagination__inner'}>
            {this.$scopedSlots[compoType]
              ? this.$scopedSlots[compoType]()
              : defaultText}
          </a>
        </div>
      );
    };
    // 省略位子组件
    const dottedCompo = (
      <li class="jc-pagination__component--dotted jc-pagination__component">
        <span class={'jc-pagination__inner'}>
          {dottedSlot ? dottedSlot() : `...`}
        </span>
      </li>
    );
    // 页码子组件
    const setupPageCompo = (page, isActive, isCenterPage) => {
      // 激活页左侧或最后一页，需要显示右边框
      let isShowRightBorder = page === end || page === currentPage - 1;
      return (
        <li
          class={[
            'jc-pagination__component--page jc-pagination__component--action jc-pagination__component',
            isActive ? 'is-active' : '',
            isCenterPage ? 'is-center-page' : '',
            isShowRightBorder ? 'is-show-right-border' : '',
          ]}
          data-page={page}
          onClick={handlePageSelect}
        >
          <a class={'jc-pagination__inner'} data-page={page}>
            {pageSlot ? pageSlot({ page: page }) : page}
          </a>
        </li>
      );
    };
    const setupPageCompos = () => {
      let pageCompos = [];
      if (isShowPrevDot) {
        pageCompos.push(setupPageCompo(1));
        pageCompos.push(dottedCompo);
      }
      for (let i = start; i <= end; i++) {
        pageCompos.push(setupPageCompo(i, i === currentPage, true));
      }
      if (isShowNextDot) {
        pageCompos.push(dottedCompo);
        pageCompos.push(setupPageCompo(totalPages));
      }
      return h(
        'ul',
        {
          class: 'jc-pagination__page-group',
        },
        pageCompos
      );
    };
    // 中间区域的所有子组件：翻页、快速翻页、页码、...（省略位）等
    const setupActionCompos = () => {
      let centerCompos = [];
      if (hasPrev) {
        centerCompos.push(
          setupPageTurnCompo('prev', isPrevDisabled, handlePrev, '«上一页')
        );
      }
      centerCompos.push(setupPageCompos());
      if (hasNext) {
        centerCompos.push(
          setupPageTurnCompo('next', isNextDisabled, handleNext, '下一页»')
        );
      }

      return h(
        'div',
        {
          class: 'jc-pagination__action-group',
        },
        centerCompos
      );
    };

    const setupPaginationWrap = () => {
      let paginationWrapCompos = [];
      if (hasTotal) paginationWrapCompos.push(totalCompo);
      paginationWrapCompos.push(setupActionCompos());
      if (hasTotalPages) paginationWrapCompos.push(totalPagesCompo);

      return h(
        'div',
        {
          class: 'jc-pagination__wrap',
        },
        paginationWrapCompos
      );
    };

    return h(
      'div',
      {
        class: 'jc-pagination',
        style: {
          // '--pagination-font-size': fontSize + 'px',
          // '--pagination-height': realPaginationHeight,
          // '--pagination-inner-height': paginationInnerHeight + 'px',
          // '--pagination-inner-padding': realInnerPadding,
          // '--pagination-align': paginationAlign,
          // '--pagination-color': color,
          // '--pagination-bg-color': backgroundColor,
          // '--pagination-border-color': borderColor,
          // '--pagination-active-color': realActiveColor,
          // '--pagination-active-bg-color': realActiveBackgroundColor,
          // '--pagination-active-border-color': realActiveBorderColor,
          // '--pagination-page-color': realPageColor,
          // '--pagination-page-bg-color': realPageBackgroundColor,
          // '--pagination-page-border-color': realPageBorderColor,
          // '--pagination-disabled-page-color': realDisabledPageColor,
          // '--pagination-disabled-page-bg-color':
          //   realDisabledPageBackgroundColor,
          // '--pagination-disabled-page-border-color':
          //   realDisabledPageBorderColor,
          // '--pagination-page-turn-color': realPrevColor,
          // '--pagination-page-turn-bg-color': realPrevBackgroundColor,
          // '--pagination-page-turn-border-color': realPrevBorderColor,
          // '--pagination-disabled-page-turn-color': realDisabledPrevColor,
          // '--pagination-disabled-page-turn-bg-color':
          //   realDisabledPrevBackgroundColor,
          // '--pagination-disabled-page-turn-border-color':
          //   realDisabledPrevBorderColor,
        },
      },
      [setupPaginationWrap()]
    );
  },
};
</script>

<!-- <template>
  <div class="jc-pagination">
    <div class="jc-pagination_wrap">
      <div v-if="hasTotal" class="jc-pagination_total-data pagination_info">
        <span name="total">共{{ total }}条数据</span>
      </div>
      <div class="jc-pagination_action-group">
        <div
          v-if="hasPrev"
          class="jc-pagination_action-prev jc-pagination_action"
          :class="{
            disabled: isPrevDisabled,
          }"
          :disabled="isPrevDisabled"
          @click="handlePrev"
        >
          <a><slot name="prev">«上一页</slot></a>
        </div>
        <ul class="jc-pagination_page-group" @click="handlePageSelect">
          <template v-if="isShowPrevDot">
            <li class="jc-pagination_action">
              <a data-page="1"><slot name="page" :page="1">1</slot></a>
            </li>
            <li class="jc-pagination_dotted">
              <span><slot name="dotted">...</slot></span>
            </li>
          </template>
          <li
            class="jc-pagination_action center-pages"
            :class="{
              active: currentPage === i,
            }"
            v-for="i in pageList"
            :key="i"
          >
            <a :data-page="i"
              ><slot name="page" :page="i">{{ i }}</slot></a
            >
          </li>
          <template v-if="isShowNextDot">
            <li class="jc-pagination_dotted">
              <span><slot name="dotted">...</slot></span>
            </li>
            <li class="jc-pagination_action">
              <a :data-page="totalPages"
                ><slot name="page" :page="totalPages">{{ totalPages }}</slot></a
              >
            </li>
          </template>
        </ul>
        <div
          v-if="hasNext"
          class="jc-pagination_action-next jc-pagination_action"
          :class="{
            disabled: isNextDisabled,
          }"
          :disabled="isNextDisabled"
          @click="handleNext"
        >
          <a><slot name="prev">下一页»</slot></a>
        </div>
      </div>
      <div
        v-if="hasTotalPages"
        class="jc-pagination_total-pages jc-pagination_info"
      >
        <span
          ><slot name="totalPages">共{{ totalPages }}页</slot></span
        >
      </div>
    </div>
  </div>
</template> -->

<!-- <style scoped lang="scss">
.jc-pagination {
  width: 100%;
  height: var(--pagination-height);
  display: flex;
  justify-content: var(--pagination-align);
  align-items: center;
  overflow: hidden;

  $borderWidth: 1px;

  .jc-pagination_wrap {
    display: flex;
    justify-content: center;

    .jc-pagination_component {
      vertical-align: middle;
      color: var(--pagination-color);
      background-color: var(--pagination-bg-color);
      padding: var(--pagination-inner-padding);
      text-decoration: none;
      .jc-pagination_inner {
        font-size: var(--pagination-font-size);
        line-height: var(--pagination-inner-height);
      }
    }

    // 中间区域所有子组件的容器
    .jc-pagination_action-group {
      display: flex;

      // 所有页码以及省略位、快速翻页键的容器
      .jc-pagination_page-group {
        display: flex;
      }
      .jc-pagination_component.jc-pagination_action {
        border: $borderWidth solid var(--pagination-border-color);
        cursor: pointer;

        // page
        &.jc-pagination_action-page {
          color: var(--pagination-page-color);
          background-color: var(--pagination-page-bg-color);
          border-color: var(--pagination-page-border-color);

          &.is-center-page {
            border-right-width: 0;

            &.is-show-right-border {
              border-right-width: $borderWidth;
            }
          }
          &.is-active {
            color: var(--pagination-active-color);
            background-color: var(--pagination-active-bg-color);
            border-color: var(--pagination-active-border-color);
          }

          &.disabled {
            color: var(--pagination-disabled-page-color);
            background-color: var(--pagination-disabled-page-bg-color);
            border-color: var(--pagination-disabled-page-border-color);
          }
        }

        // prev & next
        &.jc-pagination_action-page-turn {
          color: var(--pagination-page-turn-color);
          background-color: var(--pagination-page-turn-bg-color);
          border-color: var(--pagination-page-turn-border-color);
          &.disabled {
            color: var(--pagination-disabled-page-turn-color);
            background-color: var(--pagination-disabled-page-turn-bg-color);
            border-color: var(--pagination-disabled-page-turn-border-color);
          }
        }
      }

      .jc-pagination_dotted {
        border-width: 0;
      }
    }

    // 总计信息子组件
    .jc-pagination_total-info {
      background-color: transparent;

      &.jc-pagination_total-data {
        margin-right: var(--gap-primary);
        border-right: none;
      }

      &.jc-pagination_total-pages {
        margin-left: var(--gap-primary);
        border-left: none;
      }
    }
  }
}
</style> -->
