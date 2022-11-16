<script>
import extendClass from '../../mixins/extendClass';

export default {
  name: 'JcCard',
  props: {
    title: String,
    blockClass: String,
  },

  render(h) {
    const { blockClass, title } = this;
    const defaultBlockClass = 'jc-card';
    const elementClasses = {
      header: 'header',
      content: 'content',
    };
    const { realBlockClass, realElementClasses } = extendClass(
      defaultBlockClass,
      blockClass,
      elementClasses
    );

    const { header: headerSlot, default: defaultSlot } = this.$scopedSlots;

    return (
      <div class={realBlockClass}>
        <div class={realElementClasses.header}>
          {headerSlot ? headerSlot(title) : title}
        </div>
        <div class={realElementClasses.content}>
          {defaultSlot ? defaultSlot() : ''}
        </div>
      </div>
    );
  },
};
</script>
