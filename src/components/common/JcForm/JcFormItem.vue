<template>
  <div
    class="jc-form-item"
    :class="[
      {
        'jc-form-item--feedback': _form && _form.statusIcon,
        ['is-' + _validateState]: _validateState,
        // 'is-error': _validateState === 'error',
        // 'is-validating': _validateState === 'validating',
        // 'is-success': _validateState === 'success',
        'is-required': _isRequired || required,
        'is-no-asterisk': _form && _form.hideRequiredAsterisk,
      },
      sizeClass ? 'jc-form-item--' + sizeClass : '',
    ]"
  >
    <JcLabelWrap
      :is-auto-width="_labelStyle && _labelStyle.width === 'auto'"
      :update-all="_form.labelWidth === 'auto'"
    >
      <label
        :for="_labelFor"
        class="jc-form-item__label"
        :style="_labelStyle"
        v-if="label || $slots.label"
      >
        <slot name="label">{{ label + _form.labelSuffix }}</slot>
      </label>
    </JcLabelWrap>
    <div class="jc-form-item__content" :style="_contentStyle">
      <slot></slot>
      <transition name="zoom-in-top">
        <slot
          v-if="_validateState === 'error' && showMessage && _form.showMessage"
          name="error"
          :error="_validateMessage"
        >
          <div
            class="jc-form-item__error"
            :class="{
              'jc-form-item__error--inline':
                typeof inlineMessage === 'boolean'
                  ? inlineMessage
                  : (_form && _form.inlineMessage) || false,
            }"
          >
            {{ _validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '../../mixins/emitter';
import {
  noop,
  getNestedObjByPath,
  isObjEmpty,
  isArrayEmpty,
} from '@/utils/utils';
import JcLabelWrap from './JcLabelWrap';

export default {
  name: 'JcFormItem',
  componentName: 'JcFormItem',
  components: {
    // use this component to calculate auto width
    JcLabelWrap,
  },

  mixins: [emitter],

  provide() {
    return {
      formItem: this,
      labelFor: this._labelFor,
    };
  },

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array],
    error: String,
    // validateStatus: String, // 未被使用的变量
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: '',
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
  },

  data() {
    return {
      _validateState: '',
      _validateMessage: '',
      _validateDisabled: false, // 未知用途的变量
      // validator: {}, // 未被使用的变量
      _isNested: false,
      _computedLabelWidth: '',
    };
  },
  computed: {
    // 标签相关
    _labelFor() {
      return this.for || this.prop;
    },
    _labelStyle() {
      const style = {};
      if (this._form.labelPosition === 'top') return style;
      const labelWidth = this.labelWidth || this._form.labelWidth;
      if (labelWidth) {
        style.width = labelWidth;
      }
      return style;
    },
    // 计算标签右侧输入组件的 left-margin
    _contentStyle() {
      const style = {};
      const label = this.label;
      if (this._form.labelPosition === 'top') return style;
      // if (this._form.labelPosition === 'top' || this._form.inline) return style;
      if (!label && !this.labelWidth && this._isNested) return style;
      const labelWidth = this.labelWidth || this._form.labelWidth;
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          style.marginLeft = this._computedLabelWidth;
        } else if (this._form.labelWidth === 'auto') {
          style.marginLeft = this._form.autoLabelWidth;
        }
      } else {
        style.marginLeft = labelWidth;
      }
      return style;
    },
    // 引用父组件实例
    _form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'JcForm') {
        if (parentName === 'JcFormItem') {
          this._isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    // 字段值
    _fieldValue() {
      if (this.prop) {
        const model = this._form.model;
        if (!model || !this.prop) {
          return;
        }

        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getNestedObjByPath(model, path, true, this.label).v;
      }
      return undefined;
    },
    //
    _isRequired() {
      let rules = this.props ? this._getRules() : null;
      let _isRequired = false;

      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            _isRequired = true;
            return false;
          }
          return true;
        });
      }
      return _isRequired;
    },
    // 尺寸规格
    _formSize() {
      return this._form.size;
    },
    _formItemSize() {
      return this.size || this._formSize;
    },
    sizeClass() {
      return this._formItemSize || (this.$ELEMENT || {}).size;
    },
  },
  watch: {
    rules(rules) {
      if ((!rules || rules.length === 0) && this.required === undefined) {
        this.clearValidate();
      }
    },
    error: {
      immediate: true,
      handler(value) {
        this._validateMessage = value;
        this._validateState = value ? 'error' : '';
      },
    },
  },
  methods: {
    _isPropEmpty() {
      if ([undefined, ''].includes(this.prop)) {
        console.warn('[Component Warn][FormItem] prop path is empty');
        return false;
      }
      return true;
    },
    _isRulesEmpty(rules) {
      return isArrayEmpty(rules);
      // if (isArrayEmpty(rules)) {
      //   console.warn('[Component Warn][FormItem] empty rules!');
      //   return true;
      // }
      // return false;
    },
    // 获取校验规则
    _getRules() {
      console.log('this.prop', this.prop);
      let formRules = this._form.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : [];

      // if (this._isPropEmpty() || this.isObjEmpty(formRules)) {
      if (isObjEmpty(formRules)) {
        formRules = [];
      } else {
        const nested = getNestedObjByPath(formRules, this.prop || ''); // 为空则返回原规则对象
        // formRules = formRules ? nested.o[nested.k || ''] || nested.v : []; // 这一步不理解为什么需要分两步取值
        formRules = nested.v || [];
      }

      // return [].concat(selfRules || formRules || []).concat(requiredRule);
      return [].concat(selfRules || formRules || [], requiredRule);
    },
    _getFilteredRules(trigger) {
      const rules = this._getRules();

      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger === '') return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((rule) => Object.assign({}, rule));
    },
    // 验证与清除验证
    validate(trigger, callback = noop) {
      if (this.prop) {
        this._validateDisabled = false;
        const rules = this._getFilteredRules(trigger);

        if (this._isRulesEmpty(rules)) {
          callback();
          return true;
        }

        this._validateState = 'validating';

        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach((rule) => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this._fieldValue;
        validator.validate(
          model,
          { firstFields: true },
          (
            errors,
            invalidField /* { name: [{message: '', field: 'name'}] } */
          ) => {
            this._validateState = !errors ? 'success' : 'error';
            this._validateMessage = errors ? errors[0].message : ''; // 若有多条验证未通过，仅返回第一条

            console.log('this._validateState', this._validateState);

            callback(this._validateMessage, invalidField);
            this._form &&
              this._form.$emit(
                'validate',
                this.prop,
                !errors,
                this._validateMessage || null
              );
          }
        );
      }
    },
    clearValidate() {
      if (this.prop) {
        this._validateState = '';
        this._validateMessage = '';
        this._validateDisabled = false;
      }
    },
    // 重置字段
    resetField() {
      if (this.prop) {
        this._validateState = '';
        this._validateMessage = '';

        let model = this._form.model;
        let value = this._fieldValue;
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        let nested = getNestedObjByPath(model, path, true);

        this._validateDisabled = true;
        if (Array.isArray(value)) {
          nested.o[nested.k] = [].concat(this.initialValue);
        } else {
          nested.o[nested.k] = this.initialValue;
        }

        // reset _validateDisabled after _onFieldChange triggered
        this.$nextTick(() => {
          this._validateDisabled = false;
        });

        this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue);
      }
    },
    // 事件 handlers
    _onFieldBlur() {
      this.validate('blur');
    },
    _onFieldChange() {
      if (this._validateDisabled) {
        this._validateDisabled = false;
        return;
      }

      this.validate('change');
    },
    // 更新 label 宽度
    updateComputedLabelWidth(width) {
      this._computedLabelWidth = width ? `${width}px` : '';
    },
    // 自定义事件监听器
    addValidateEvents() {
      const rules = this._getRules();
      if (rules.length || this.required !== undefined) {
        this.$on('FieldBlur', this._onFieldBlur);
        this.$on('FiledChange', this._onFieldChange);
      }
    },
    removeValidateEvents() {
      this.$off();
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('JcForm', 'AddFormField', [this]);

      let initialValue = this._fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue,
      });

      this.addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch('JcForm', 'RemoveFormField', [this]);
  },
};
</script>

<!-- <style scoped lang="scss">
.jc-form-item {
  .jc-form-item__content {
    .jc-form-item__error {
      display: none;
    }
  }
  &.is-error {
    .jc-form-item__content {
      .jc-form-item__error {
        display: block;
      }
    }
  }
}
</style> -->
