<script>
import '../../theme-chalk/globals/sph-product.scss';
import Emitter from '../../mixins/emitter';

export default {
  name: 'SphProductGroup',
  componentName: 'SphProductGroup',

  mixins: [Emitter],

  created() {
    this.$on('SphProductItemClick', (params) => {
      this.$emit('click', params);
    });
  },

  render(h) {
    const { default: defaultSlot } = this.$scopedSlots;
    return (
      <ul class={'sph-product-group'}>{defaultSlot ? defaultSlot() : ''}</ul>
    );
  },
};
</script>
