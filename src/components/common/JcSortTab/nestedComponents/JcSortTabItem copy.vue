<template>
  <JcRadioListItem
    :value="value"
    class="jc-sort-tab-item"
    :class="{
      'is-order-asc': _isOrderAsc,
      'is-order-desc': _isOrderDesc,
    }"
    :activeColor="activeColor"
    :hoverHandler="handleHover"
    :clickHandler="handleClick"
  >
    <slot>{{ value }}</slot>
  </JcRadioListItem>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { JcRadioListItem } from '../JcRadioList';

export default {
  name: 'JcSortTabItem',
  componentName: 'JcSortTabItem',

  components: {
    JcRadioListItem,
  },
  mixins: [Emitter],
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
      default: {},
    },
    value: [Number, String],
  },

  data() {
    return {
      order: '',
      // _isActive: false,
    };
  },

  computed: {
    _sortTab() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'JcSortTab') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    _isOrderAsc() {
      return this.order === 'asc';
    },
    _isOrderDesc() {
      return this.order === 'desc';
    },
  },
  methods: {
    handleClick(isActive) {
      console.log('isActive', isActive);
      // this.$nextTick(() => {
      console.log('tabItem 被点击了');
      // 当前项已选中时，才允许修改排序状态
      if (isActive) {
        // if (this._isActive) {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
        console.log('this.order', this.order);
      }
      this.dispatch('JcSortTab', 'JcSortTabItemClick', [
        this.value,
        this.order,
        this.params,
      ]);
      // });
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
  created() {
    this.order = this.defaultOrder;
    // this.$on('JcRadioListItemClick', (value, isActive) => {
    //   this._isActive = isActive;
    // });
  },
};
</script>
