<script>
import { isCssColor } from '@/utils/validator/cssTypeValidator';

export default {
  name: 'JcCheckList',
  componentName: 'JcCheckList',

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
    // list props
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
    // onclick trigger or onmouseenter trigger, default onclick
    // lazy: {
    //   type: Boolean,
    //   default: true,
    // },
    // flex-direction
    direction: {
      type: String,
      default: 'row',
      validator: function (value) {
        return ['row', 'row-reverse', 'column', 'column-reverse'].includes(
          value
        );
      },
    },
    // list-item_title props
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: '',
    },
    // listItem props
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: [],
      checkedList: [],
    };
  },
  computed: {
    _isUnorderedList() {
      return this.listType === 'unordered';
    },
    _rowGap() {
      return this.direction.indexOf('column') > -1 ? this.gap : 0;
    },
    _columnGap() {
      return this.direction.indexOf('row') > -1 ? this.gap : 0;
    },
  },

  created() {
    this.$on('JcCheckItemClick', (value, params) => {
      this.value;
      this.$emit('input', value);
      this.$emit('check', value, params);
    });
    this.$on('JcCheckItemHover', (value, params) => {
      this.$emit('hover', value, params);
    });
  },

  render(h) {
    const { title, titleClass, direction } = this;
    const { default: defaultSlot, title: titleSlot } = this.$scopedSlots;
    const isUnorderedList = this._isUnorderedList;

    let listTag = 'ul',
      content = defaultSlot();
    if (!isUnorderedList) {
      (listTag = 'dl'),
        (content = [
          <dt class={['jc-check-list__title', titleClass]}>
            {titleSlot ? titleSlot({ title }) : title}
          </dt>,
          <div class="jc-check-list__wrap">{defaultSlot()}</div>,
        ]);
    }

    return h(
      listTag,
      {
        class: 'jc-check-list',
        style: { '--direction': direction },
      },
      content
    );
  },
};
</script>

<style lang="scss" scoped>
ul.jc-check-list,
dl > .jc-check-list__wrap {
  display: flex;
  flex-direction: var(--direction);
}
</style>
