<script>
import Emitter from '../../mixins/emitter';
import getParent from '../../mixins/getParent';

export default {
  name: 'JcTabPane',
  componentName: 'JcTabPane',

  mixins: [Emitter, getParent],

  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    label: String,
  },

  computed: {
    __isActive() {
      // console.log('this.__tabContainer.value', this.__tabContainer.value);
      return this.__tabContainer.activeTab === this.name;
    },
    __tabContainer() {
      return this.getParent('JcTab');
    },
  },

  mounted() {
    this.dispatch('JcTab', 'AddTabPane', [this.name, this.label ?? this.name]);
  },
  beforeDestroy() {
    this.dispatch('JcTab', 'RemoveTabPane', [this.name]);
  },
};
</script>

<template>
  <div class="jc-tab-pane" :class="{ 'is-active': this.__isActive }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.jc-tab-pane {
  display: none;
  &.is-active {
    display: block;
  }
}
</style>
