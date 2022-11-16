<template>
  <span class="jc-checkbox">
    <input
      class="jc-checkbox__inner-check"
      v-bind="$attrs"
      type="checkbox"
      :placeholder="placeholder"
      v-model="innerValue"
      @change="handleChange"
      @blur="handleBlur"
    />
    <span class="jc-checkbox__text" @click="handleLabelClick">
      <slot></slot>
    </span>
  </span>
</template>

<script>
import '../../theme-chalk/common/jc-checkbox.scss';
import emitter from '../../mixins/emitter';

export default {
  name: 'JcCheckbox',

  mixins: [emitter],

  props: {
    value: {
      require: true,
    },
    placeholder: String,
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: this.value,
    };
  },

  watch: {
    value() {
      if (this.validateEvent) {
        this.dispatch('JcFormItem', 'FiledChange');
      }
    },
  },
  methods: {
    handleUpdate() {
      this.$emit('input', this.innerValue);
      this.$emit('change', this.innerValue);
    },
    handleLabelClick() {
      this.innerValue = !this.innerValue;
      this.handleUpdate();
    },
    handleChange() {
      this.handleUpdate();
    },
    handleBlur() {
      this.dispatch('JcFormItem', 'FieldBlur');
    },
  },
};
</script>
