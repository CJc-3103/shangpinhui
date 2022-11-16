<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'JcLin',
  componentName: 'JcLin',

  inject: {
    stop: {
      default: false,
    },
  },

  mixins: [Emitter],

  props: {
    href: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    params: Object,
  },

  computed: {
    _linkGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'JcLinkGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
  },
  methods: {
    handleClick(event) {
      const { stop, disabled, href, params, _linkGroup } = this;
      if (stop) {
        event.stopPropagation();
      }
      if (!disabled) {
        if (!href) {
          if (_linkGroup) {
            this.dispatch('JcLinkGroup', 'JcLinClick', href, event, params);
          }
          this.$emit('click', href, event, params);
        }
      }
    },
  },

  render(h) {
    const { stop } = this;

    return h(
      'a',
      {
        class: 'jc-link',
        on: {
          click: this.handleClick,
        },
      },
      <span class="jc-link_inner">{this.$scopedSlots.default()}</span>
    );
  },
};
</script>

<!-- <template>
  <a v-if="stop" class="jc-link" @click.stop="handleClick">
    <span class="jc-link_inner"><slot></slot></span>
  </a>
  <a v-else class="jc-link" @click="handleClick">
    <span class="jc-link_inner"><slot></slot></span>
  </a>
</template> -->
