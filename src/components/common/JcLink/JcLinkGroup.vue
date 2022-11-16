<template>
  <div class="jc-link-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JcLinkGroup',
  componentName: 'JcLinkGroup',

  provide() {
    return {
      stop: true,
    };
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {},
  created() {
    this.$on('JcLinkClick', (href, event, params) => {
      this.$emit('click', href, event, params);
    });
  },
};
</script>
