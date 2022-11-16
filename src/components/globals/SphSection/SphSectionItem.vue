<script>
export default {
  name: 'SphSectionItem',
  render(h) {
    return <div class={'sph-section-item'}>{this.$scopedSlots.default()}</div>;
  },
};
</script>
