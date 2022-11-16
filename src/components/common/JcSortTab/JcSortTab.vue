<template>
  <ul class="sort-tab">
    <slot></slot>
  </ul>
</template>

<script>
import { isCssColor } from '@/utils/validator/cssTypeValidator';

export default {
  name: 'JcSortTab',
  componentName: 'JcSortTab',

  provide() {
    return {
      activeColor: this.activeColor,
      defaultOrder: this.defaultOrder,
    };
  },

  props: {
    // menu props
    value: {
      type: [Number, String],
      require: true,
    },
    defaultOrder: {
      type: String,
      default: 'desc',
      validator(value) {
        return ['desc', 'asc'].includes(value);
      },
    },
    // item props
    activeColor: {
      type: String,
      validator(value) {
        return isCssColor(value);
      },
    },
  },
  created() {
    this.$on('JcSortTabItemClick', (value, order, params) => {
      this.$emit('input', value);
      this.$emit('click', value, order, params);
    });
  },
};
</script>
