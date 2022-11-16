<script>
import Emitter from '../../mixins/emitter';
import getParent from '../../mixins/getParent';

export default {
  name: 'JcRadioItem',
  componentName: 'JcRadioItem',

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
    clickHandler: Function,
    hoverHandler: Function,
    disabled: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    _isActive() {
      return this._radioList.value === this.value;
    },
    _radioList() {
      return this.getParent('JcRadioList');
    },
  },
  methods: {
    handleClick() {
      this.dispatch('JcRadioList', 'JcRadioItemClick', [
        this.value,
        this.params,
      ]);
      if (this.clickHandler) this.clickHandler(this._isActive);
    },
    handleHover() {
      this.dispatch('JcRadioList', 'JcRadioItemHover', [
        this.value,
        this.params,
      ]);
    },
  },

  render(h) {
    const { value, rowGap, columnGap, activeColor, _isActive } = this;
    let itemTag = 'li';
    if (!this.isUnorderedList) itemTag = 'dd';

    return h(
      itemTag,
      {
        class: ['jc-radio-item', _isActive ? 'is-active' : ''],
        style: {
          '--row-gap': rowGap + 'px',
          '--column-gap': columnGap + 'px',
          '--active-color': activeColor,
        },
        on: {
          click: this.handleClick,
          hover: this.handleHover,
        },
      },
      [this.$scopedSlots.default()]
    );
  },
};
</script>

<!-- <style lang="scss" scoped>
.jc-radio-item {
  &:not(:last-child) {
    margin-top: var(--row-gap);
    margin-right: var(--column-gap);
  }

  &.is-active {
    color: var(--active-color);
  }
}
</style> -->
