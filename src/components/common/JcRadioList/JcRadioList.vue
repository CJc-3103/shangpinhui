<script>
import { isCssColor } from '@/utils/validator/cssTypeValidator';

export default {
  name: 'JcRadioList',
  componentName: 'JcRadioList',

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
    this.$on('JcRadioItemClick', (value, params) => {
      this.$emit('input', value);
      this.$emit('select', value, params);
    });
    this.$on('JcRadioItemHover', (value, params) => {
      this.$emit('hover', value, params);
    });
  },

  render(h) {
    const {
      title,
      titleClass,
      direction,
      _isUnorderedList: isUnorderedList,
    } = this;
    const { default: defaultSlot, title: titleSlot } = this.$scopedSlots;

    let listTag = 'ul',
      content = defaultSlot ? defaultSlot() : '';
    if (!isUnorderedList) {
      listTag = 'dl';
      content = [
        <dt class={['jc-radio-list__title', titleClass]}>
          {titleSlot ? titleSlot({ title }) : title}
        </dt>,
        <div class="jc-radio-list__content">
          {defaultSlot ? defaultSlot() : ''}
        </div>,
      ];
    }

    return h(
      listTag,
      {
        class: 'jc-radio-list',
        style: { '--direction': direction },
      },
      content
    );

    // 通过两次判定，统一在 h() 中执行 vnode 渲染过程
    // return h(
    //   isUnorderedList ? 'ul' : 'dl',
    //   {
    //     class: 'jc-radio-list',
    //     style: { '--direction': direction },
    //   },
    //   isUnorderedList
    //     ? defaultSlot()
    //     : [
    //         titleSlot ? (
    //           titleSlot({ title })
    //         ) : (
    //           <dt class={['jc-radio-list_title', titleClass]}>{title}</dt>
    //         ),
    //         <div class="jc-radio-list_wrap">
    //           <slot></slot>
    //         </div>,
    //         // h('div', { class: 'jc-radio-list_wrap' }, defaultSlot()),
    //       ]
    // );
  },
};
</script>

<style lang="scss" scoped>
ul.jc-radio-list,
dl > .jc-radio-list__content {
  display: flex;
  flex-direction: var(--direction);
}
</style>
