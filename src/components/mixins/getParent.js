export default {
  methods: {
    getParent(parentComponentName) {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== parentComponentName) {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
  },
};
