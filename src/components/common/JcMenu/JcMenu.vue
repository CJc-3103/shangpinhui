<template>
  <JcRadioList
    class="jc-menu"
    :direction="'vertical' ? 'column' : 'row'"
    @click="handleClick"
    @mouseenter="handleHover"
  >
    <slot></slot>
  </JcRadioList>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { isCssColor } from '@/utils/validator/cssTypeValidator';
// import { JcRadioList } from '../JcRadioList';

export default {
  name: 'JcMenu',
  componentName: 'JcMenu',

  mixins: [Emitter],

  provide() {
    return {
      isUnorderedList: this._isUnorderedList,
      isDefinitionList: this._isDefinitionList,
      rowGap: this._rowGap,
      columnGap: this._columnGap,
      activeColor: this.activeColor,
      lazy: this.lazy,
    };
  },

  props: {
    // menu props
    value: {
      type: [Number, String],
      require: true,
    },
    listType: {
      type: String,
      default: 'unordered',
      validator(value) {
        return ['unordered', 'definition'].includes(value);
      },
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: function (value) {
        return ['vertical', 'horizontal'].includes(value);
      },
    },
    // item props
    gap: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      validator(value) {
        return isCssColor(value);
      },
    },
  },
  computed: {},
  methods: {
    handleClick() {
      this.$nextTick(() => {
        this.dispatch('JcMenu', 'SortTabItemClick', [
          this.value,
          this.order,
          this.params,
        ]);
      });
    },
    handleHover() {
      this.$nextTick(() => {
        // 由于 emitter 方法实现时使用 apply 绑定作用域，因此多参数使用数组传递
        this.dispatch('JcMenu', 'SortTabItemHover', [
          this.value,
          this.order,
          this.params,
        ]);
      });
    },
  },
  created() {
    this.$on('JcMenuItemClick', (value) => {
      this.$emit('input', value);
      this.$emit('select', value);
    });
  },
};
</script>
