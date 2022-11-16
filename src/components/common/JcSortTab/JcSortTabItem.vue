<template>
  <li
    :value="value"
    class="jc-sort-tab-item"
    :class="{
      'is-active': _isActive,
      'is-order-asc': _isOrderAsc,
      'is-order-desc': _isOrderDesc,
    }"
    :activeColor="activeColor"
    @click="handleClick"
    @hover="handleHover"
  >
    <slot>{{ value }}</slot>
  </li>
</template>

<script>
import Emitter from '../../mixins/emitter';
import getParent from '../../mixins/getParent';

export default {
  name: 'JcSortTabItem',
  componentName: 'JcSortTabItem',

  mixins: [Emitter, getParent],
  inject: {
    defaultOrder: {
      default: 'desc', // 未提供默认值就会提示 undefined
    },
    activeColor: {
      default: 'inherit',
    },
  },
  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    value: [Number, String],
  },

  data() {
    return {
      // order: '',
      order: this.defaultOrder,
    };
  },

  computed: {
    _sortTab() {
      return this.getParent('JcSortTab');
    },
    _isActive() {
      return this._sortTab.value === this.value;
    },
    _isOrderAsc() {
      return this.order === 'asc';
    },
    _isOrderDesc() {
      return this.order === 'desc';
    },
  },
  methods: {
    handleClick() {
      // 当前项已选中时，才允许修改排序状态
      if (this._isActive) {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
      }
      this.dispatch('JcSortTab', 'JcSortTabItemClick', [
        this.value,
        this.order,
        this.params,
      ]);
    },
    handleHover() {
      this.$nextTick(() => {
        // 由于 emitter 方法实现时使用 apply 绑定作用域，因此多参数使用数组传递
        this.dispatch('JcSortTab', 'JcSortTabItemHover', [
          this.value,
          this.order,
          this.params,
        ]);
      });
    },
  },
};
</script>
