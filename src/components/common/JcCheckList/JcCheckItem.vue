<script>
import Emitter from '../../mixins/emitter';
import getParent from '../../mixins/getParent';

export default {
  name: 'JcCheckItem',
  componentName: 'JcCheckItem',

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
    activeColor: {
      default: 'inherit',
    },
  },
  props: {
    value: Boolean,
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
    _checkList() {
      return this.getParent('JcCheckList');
    },
  },
  methods: {
    handleClick() {
      this.dispatch('JcCheckList', 'JcCheckItemClick', [
        this.value,
        this.params,
      ]);
      if (this.clickHandler) this.clickHandler(this._isActive);
    },
  },

  render(h) {
    const { value, rowGap, columnGap, activeColor, _isActive } = this;
    let itemTag = 'dd';
    if (this._isUnorderedList) itemTag = 'li';

    return h(
      itemTag,
      {
        class: ['jc-check-item', _isActive ? 'is-checked' : ''],
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
      this.$scopedSlots.default({ value })
    );
  },
};
</script>

<style lang="scss" scoped>
.js-check-item {
  &:not(:last-child) {
    margin-top: var(--row-gap);
    margin-right: var(--column-gap);
  }

  &.is-checked {
    color: var(--active-color);
  }
}
</style>
