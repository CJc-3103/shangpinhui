<template>
  <JcRadioList v-model="localValue" :activeColor="activeColor" class="sort-tab"
    ><slot></slot
  ></JcRadioList>
</template>

<script>
import Emitter from '../../mixins/emitter';
import isCssColor from '@/utils/validator/isCssColor';
import { JcRadioList } from '../JcRadioList';

export default {
  name: 'SortTab',
  componentName: 'SortTab',

  components: {
    JcRadioList,
  },
  mixins: [Emitter],

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
  data() {
    return {
      localValue: '',
    };
  },
  created() {
    this.localValue = this.value;
    this.$on('JcSortTabItemClick', (value, order, params) => {
      console.log(`value: ${value}, order: ${order}, params: ${params}`);
      this.$emit('input', value);
      this.$emit('click', value, order, params);
    });
  },
};
</script>
