<template>
  <div class="jc-input">
    <input
      class="jc-input__inner"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
    />
  </div>
</template>

<script>
import '../../theme-chalk/common/jc-input.scss';
import emitter from '../../mixins/emitter';

export default {
  name: 'JcInput',

  mixins: [emitter],

  props: {
    value: {
      require: true,
    },
    type: String,
    placeholder: String,
    lazy: {
      type: Boolean,
      default: false,
    },
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
      // if (this.validateEvent) {
      //   this.dispatch('JcFormItem', 'FiledChange');
      // }
    },
  },
  methods: {
    handleInput() {
      if (!this.lazy) {
        this.$emit('input', this.innerValue);
      }
    },
    handleChange() {
      if (this.lazy) {
        this.$emit('input', this.innerValue);
        this.$emit('change', this.innerValue);
        if (this.validateEvent) {
          this.dispatch('JcFormItem', 'FiledChange');
        }
      }
    },
    handleBlur() {
      this.dispatch('JcFormItem', 'FieldBlur');
    },
  },
};
</script>
