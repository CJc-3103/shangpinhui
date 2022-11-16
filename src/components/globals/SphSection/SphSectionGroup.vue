<script>
import '../../theme-chalk/globals/sph-section.scss';
export default {
  name: 'SphSectionGroup',
  render(h) {
    return (
      <section class={'sph-section-group'}>
        <div class={'sph-section-group__wrap'}>
          {this.$scopedSlots.default()}
        </div>
      </section>
    );
  },
};
</script>
