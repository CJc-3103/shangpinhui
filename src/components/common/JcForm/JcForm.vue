<template>
  <form
    class="jc-form"
    :class="[
      labelPosition ? 'jc-form--label-' + labelPosition : '',
      { 'jc-form--inline': inline },
    ]"
  >
    <slot></slot>
  </form>
</template>

<script>
import '../../theme-chalk/common/jc-form.scss';
import { isWidth } from '@/utils/validator/cssTypeValidator';

export default {
  name: 'JcForm',

  componentName: 'JcForm',

  provide() {
    return {
      form: this,
      // labelPosition: this.labelPosition,
      // inline: this.inline,
      // labelWidth: this.labelWidth,
      // autoLabelWidth: this.autoLabelWidth,
    };
  },

  props: {
    // 验证
    model: Object,
    rules: Object,
    // 标签
    labelPosition: {
      type: String,
      default: 'right',
      validator(value) {
        return ['left', 'top', 'right'].includes(value);
      },
    },
    labelWidth: {
      type: String,
      validator(value) {
        return isWidth(value);
      },
    },
    labelSuffix: {
      type: String,
      default: '',
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fieldList: [], // <JcFormItem>[]
      potentialLabelWidthArr: [], // use this array to calculate auto width
    };
  },
  computed: {
    // 为了确保所有标签对齐，取所有字段标签宽度的最大值
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0;
      const max = Math.max(...this.potentialLabelWidthArr);
      return max ? `${max}px` : '';
    },
  },
  watch: {
    rules() {
      // remove then add event listeners on form-item after form rules change
      this.fieldList.forEach((field) => {
        field.removeValidateEvents();
        field.addValidateEvents();
      });

      if (this.validateOnRuleChange) {
        this.validate(() => {});
      }
    },
  },
  methods: {
    _isModelValid(funcName) {
      if (!this.model) {
        console.warn(
          `[Component Warn][Form] model is required for ${funcName} to work!`
        );
        return false;
      }
      return true;
    },
    _getFilteredFieldList(props) {
      props = [].concat(props);
      const filteredFieldList = this.fieldList.filter(
        (field) => props.indexOf(field.prop) > -1
      );
      if (!filteredFieldList.length) {
        console.warn('[Component Warn] please pass correct props!');
        return [];
      }
      return filteredFieldList;
    },
    _validate(fieldList, callback) {
      if (!this._isModelValid('validate')) {
        return;
      }

      let promise;
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (valid, invalidFields) {
            valid ? resolve(valid) : reject(invalidFields);
          };
        });
      }

      let valid = true;
      let count = 0; // current validating field
      // 如果需要验证的 fieldList 为空，调用验证时立刻返回 callback
      if (fieldList.length === 0 && callback) {
        callback(true);
      }
      let invalidFields = {};
      fieldList.forEach((field) => {
        field.validate(
          '',
          (
            message,
            invalidField /* { name: [{message: '', field: 'name'}] } */
          ) => {
            if (message) {
              valid = false;
            }
            invalidFields = Object.assign({}, invalidFields, invalidField);
            if (
              typeof callback === 'function' &&
              ++count === fieldList.length
            ) {
              callback(valid, invalidFields);
            }
          }
        );
      });

      if (promise) {
        return promise;
      }
    },
    validateAll(callback) {
      return this._validate(this.fieldList, callback);
    },
    validateFields(props, callback) {
      const filteredFieldList = this._getFilteredFieldList(props);
      return this._validate(filteredFieldList, callback);
    },
    // validateField(props, cb) {
    //   props = [].concat(props);
    //   const filteredFieldList = this.fieldList.filter(
    //     (field) => props.indexOf(field.prop) !== -1
    //   );
    //   if (!filteredFieldList.length) {
    //     console.warn('[Component Warn] please pass correct props!');
    //     return;
    //   }

    //   filteredFieldList.forEach((field) => {
    //     field.validate('', cb);
    //   });
    // },
    clearValidate(props = []) {
      let filteredFieldList = [];
      if (!props.length) {
        // 默认清除全部验证
        filteredFieldList = this.fieldList;
      } else {
        filteredFieldList = this._getFilteredFieldList(props);
      }
      filteredFieldList.forEach((field) => {
        field.clearValidate();
      });
    },
    resetFields() {
      if (this._isModelValid('resetFields')) {
        this.fieldList.forEach((field) => {
          field.resetField();
        });
      }
    },
    // 计算 label 宽度
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width);
      if (index === -1) {
        throw new Error('[JcForm]unexpected width ', width);
      }
      return index;
    },
    // 新增或替换标签宽度记录；已存在相同宽度则跳过
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal);
        this.potentialLabelWidthArr.splice(index, 1, val);
      } else if (val) {
        this.potentialLabelWidthArr.push(val);
      }
    },
    // 删除标签宽度记录
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val);
      this.potentialLabelWidthArr.splice(index, 1);
    },
  },
  created() {
    this.$on('AddFormField', (field) => {
      if (field) {
        this.fieldList.push(field);
      }
    });
    this.$on('RemoveFormField', (field) => {
      if (field.prop) {
        let fieldList = this.fieldList;
        fieldList.splice(fieldList.indexOf(field), 1);
      }
    });
  },
};
</script>
