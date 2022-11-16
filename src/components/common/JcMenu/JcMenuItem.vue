<template>
  <li
    v-if="isUnorderedList"
    class="jc-menu-item"
    :class="{ 'is-active': _isActive }"
    :style="{
      '--row-gap': rowGap + 'px',
      '--column-gap': columnGap + 'px',
      '--active-color': activeColor,
    }"
    @mouseenter="handleHover"
    @click="handleSelect"
  >
    <slot>{{ value }}</slot>
  </li>
</template>

<script>
import Emitter from '../../mixins/emitter';
import getParent from '../../mixins/getParent';
import { JcRadioItem } from '../JcRadioList';

export default {
  name: 'JcMenuItem',
  componentName: 'JcMenuItem',

  mixins: [Emitter, getParent],
  inject: {
    isUnorderedList: {
      default: true,
    },
    rowGap: {
      default: 0,
    },
    columnGap: {
      default: 0,
    },
    // lazy: {
    //   default: true,
    // },
    activeColor: {
      default: 'inherit',
    },
  },
  props: {
    value: [Number, String],
  },

  computed: {
    _isActive() {
      return this._JcMenu.value === this.value;
    },
    _menu() {
      return this.getParent('JcMenu');
    },
  },
  methods: {
    handleSelect() {
      this.$nextTick(() => {
        this.dispatch('JcMenu', 'JcMenuItemClick', this.value);
      });
    },
    handleHover() {
      this.$nextTick(() => {
        this.dispatch('JcMenu', 'JcMenuItemHover', this.value);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.jc-menu-item {
  &:not(:last-child) {
    margin-top: var(--row-gap);
    margin-right: var(--column-gap);
  }

  &.active {
    color: var(--active-color);
  }
}
</style>
